const assert = require('assert'),
      ganache = require('ganache-cli'),
      Web3 = require('web3'),
      web3 = new Web3(ganache.provider());

// get the compiled versions
const compiledPostFactory = require('../ethereum/build/PostFactory.json');
const compiledPost = require('../ethereum/build/Post.json');

// declare reusable variables
let accounts; // all accounts on our local network
let postFactory; // deployed instance of the factory
let postAddress;
let post;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  // deploy an instance of the PostFactory contract
  postFactory = await new web3.eth.Contract(JSON.parse(compiledPostFactory.interface)) // pass in the ABI
    .deploy({ data: compiledPostFactory.bytecode }) // pass in the bytecode
    .send({ from: accounts[0], gas: '6000000' }); // this is the payer

  // create an instance of a Post
  await postFactory.methods.createPost('Post Instance 0', 'Description', web3.utils.toWei('1', 'ether'), 25, 0, 1, 0)
    .send({ from: accounts[0], gas: '6000000' });

  // const addresses = await postFactory.methods.getDeployedPosts().call(); // view function = call
  // postAddress = addresses[0];

  // like the above example, but destructured
  [postAddress] = await postFactory.methods.getDeployedPosts().call(); // view function = call

  post = await new web3.eth.Contract(
    JSON.parse(compiledPost.interface),
    postAddress
  );
});

// which behaviours do we want to test?
describe('Posts', () => {

  it('should deploy a PostFactory and a Post', () => {
    assert.ok(postFactory.options.address);
    assert.ok(post.options.address);
  });

  /* POST FACTORY */
  it('should return all deployed instances of Post', async () => {
    const allDeployedPosts = await postFactory.methods.getDeployedPosts().call();
    const allDeployedPostsLength = allDeployedPosts.length;

    assert.equal(allDeployedPosts, postAddress);
    assert.equal(1, allDeployedPostsLength);
  });

  it('should return all instances of Post created by the calling User', async () => {
    const userPosts = await postFactory.methods.getOwnPosts().call();
    assert.equal(userPosts, postAddress);
  });

  it('should return all instances of Post created by a specific User', async () => {
    const userPosts = await postFactory.methods.getUserPosts(accounts[0]).call();
    assert.equal(userPosts, postAddress);
  });

  it('when a Post is created, the postsCount is to be incremented', async () => {
    let postsCount = await postFactory.methods.postsCount().call();
    assert.equal(1, postsCount);
  });

  it('should increment a User\'s postCount when a Post is created', async () => {
    const userPostsCount = await postFactory.methods.userPostsCount(accounts[0]).call();
    assert.equal(1, userPostsCount);
  });

  /* POST */
  it('should mark the caller as the Post Owner', async () => {
    const owner = await post.methods.owner().call();
    assert.equal(accounts[0], owner);
  });

  it('should allow a User to increase the Post\'s pool', async () => {
    await post.methods.increasePool().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });
    const postBalance = await web3.eth.getBalance(postAddress);

    assert.equal(web3.utils.toWei('10', 'ether'), postBalance);
  });

  // works, but not really...
  /*
  it('returns the correct Post summary', async () => {
    const postSummary = await post.methods.getPostSummary().call();

    // console.log('postSummary: ', postSummary);

    const supposed = "Result" + {
      "0": accounts[0],
      "1": "Post Instance 0",
      "2": "0",
      "3": "0",
      "4": "100",
      "5": "0",
      "6": "0",
      "7": "0",
      "8": "1",
      "9": "0",
    };

    // console.log('supposed: ', supposed);

    // assert.equal(supposed, postSummary);
  });
  */

  it('should allow a Post to be viewed and flag the User as a Viewer', async () => {
    // the contract *must* be funded first
    await post.methods.increasePool().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });

    const view = await post.methods.viewPost().send({
      from: accounts[1],
      gas: '1000000'
    });

    const hasViewed = await post.methods.viewers(accounts[1]).call();

    assert.equal(hasViewed, true);
  });

  it('should revert viewPost when the Post\'s balance is less than the viewFee', async () => {
    await post.methods.increasePool().send({ from: accounts[0], value: '100' });
    let revert;

    try {
      await post.methods.viewPost().send({ from: accounts[1], gas: '1000000' });
    } catch (error) {
      revert = error;
    }

    assert.ok(revert instanceof Error);
  });

  it('should not allow two views per unique User', async () => {
    await post.methods.increasePool().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });
    let err;

    try {
      const firstView = await post.methods.viewPost().send({
        from: accounts[1],
        gas: '1000000'
      });

      const firstHasViewed = await post.methods.viewers(accounts[1]).call();

      const secondView = await post.methods.viewPost().send({
        from: accounts[1],
        gas: '1000000'
      });
    } catch (error) {
      err = error;
    }

    assert.ok(err instanceof Error);
  });

  it('should send the viewFee to the User, and increment the View count', async () => {
    await post.methods.increasePool().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });

    let initialBalance = await web3.eth.getBalance(accounts[1]);

    await post.methods.viewPost().send({ from: accounts[1], gas: '1000000' });
    let finalBalance = await web3.eth.getBalance(accounts[1]);
    let difference = finalBalance - initialBalance;

    assert(difference > web3.utils.toWei('0.7', 'ether'));

    let viewCount = await post.methods.views().call();
    assert.equal(1, viewCount);
  });

  it('should not increment upvote when a User has not yet Viewed a Post', async () => {
    let err;

    try {
      await post.methods.upVote().send({ from: accounts[0], gas: '1000000' });
    } catch (error) {
      err = error;
    }

    assert.ok(err instanceof Error);
  });

  it('should not increment downvote when a User has not yet Viewed a Post', async () => {
    let err;

    try {
      await post.methods.downVote().send({ from: accounts[1], gas: '1000000' });
    } catch (error) {
      err = error;
    }

    assert.ok(err instanceof Error);
  });

  it('should increment upvotes and mark the User as a voter', async () => {
    await post.methods.increasePool().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });

    let initialUpVotes = await post.methods.upVotes().call();

    await post.methods.viewPost().send({ from: accounts[1], gas: '1000000' });
    await post.methods.upVote().send({ from: accounts[1], gas: '1000000' });

    let finalUpVotes = await post.methods.upVotes().call();
    let hasVoted = await post.methods.hasVoted(accounts[1]).call();

    assert.equal(0, initialUpVotes);
    assert.equal(1, finalUpVotes);
    assert.equal(true, hasVoted);
  });

  it('should increment downvotes and mark the User as a voter', async () => {
    await post.methods.increasePool().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });

    let initialDownVotes = await post.methods.downVotes().call();

    await post.methods.viewPost().send({ from: accounts[1], gas: '1000000' });
    await post.methods.downVote().send({ from: accounts[1], gas: '1000000' });

    let finalDownVotes = await post.methods.downVotes().call();
    let hasVoted = await post.methods.hasVoted(accounts[1]).call();

    assert.equal(0, initialDownVotes);
    assert.equal(1, finalDownVotes);
    assert.equal(true, hasVoted);
  });

  it('should revert when a User tries to upvote twice', async () => {
    await post.methods.increasePool().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });
    let revert;

    await post.methods.viewPost().send({ from: accounts[1], gas: '1000000' });
    await post.methods.upVote().send({ from: accounts[1], gas: '1000000' });

    try {
      await post.methods.upVote().send({ from: accounts[1], gas: '1000000' });
    } catch (error) {
      revert = error;
    }

    assert.ok(revert instanceof Error);
  });

  it('should revert when a User tries to down twice', async () => {
    await post.methods.increasePool().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });
    let revert;

    await post.methods.viewPost().send({ from: accounts[1], gas: '1000000' });
    await post.methods.downVote().send({ from: accounts[1], gas: '1000000' });

    try {
      await post.methods.downVote().send({ from: accounts[1], gas: '1000000' });
    } catch (error) {
      revert = error;
    }

    assert.ok(revert instanceof Error);
  });

  it('should update the Post title when the Owner is the function caller', async() => {
    let initialTitle = await post.methods.title().call();

    await post.methods.updatePostTitle('New Title').send({ from: accounts[0], gas: '1000000' });

    let finalTitle = await post.methods.title().call();

    assert.notEqual(initialTitle, finalTitle);
  });

  it('should revert and not update the Post title when the caller is not the Post Owner', async() => {
    let revert;

    try {
      await post.methods.updatePostTitle('New Title').send({ from: accounts[1], gas: '1000000' });
    } catch (error) {
      revert = error;
    }

    assert.ok(revert instanceof Error);
  });

  it('should update the Post description when the Owner is the function caller', async() => {
    let initialDescription = await post.methods.description().call();

    await post.methods.updatePostDescription('New Description').send({ from: accounts[0], gas: '1000000' });

    let finalDescription = await post.methods.description().call();

    assert.notEqual(initialDescription, finalDescription);
  });

  it('should revert and not update the Post description when the caller is not the Post Owner', async() => {
    let revert;

    try {
      await post.methods.updatePostDescription('New Description').send({ from: accounts[1], gas: '1000000' });
    } catch (error) {
      revert = error;
    }

    assert.ok(revert instanceof Error);
  });

  it('should update the Post viewFee when the Owner is the function caller', async() => {
    let initialViewFee = await post.methods.viewFee().call();

    await post.methods.updatePostViewFee(web3.utils.toWei('2', 'ether')).send({ from: accounts[0], gas: '1000000' });

    let finalViewFee = await post.methods.viewFee().call();

    assert.notEqual(initialViewFee, finalViewFee);
  });

  it('should revert and not update the Post viewFee when the caller is not the Post Owner', async() => {
    let revert;

    try {
      await post.methods.updatePostViewFee(web3.utils.toWei('2', 'ether')).send({ from: accounts[1], gas: '1000000' });
    } catch (error) {
      revert = error;
    }

    assert.ok(revert instanceof Error);
  });

  it('should update the Post viewFeePercentage when the Owner is the function caller', async() => {
    let initialViewFeePercentage = await post.methods.viewFeePercentage().call();

    await post.methods.updatePostViewFeePercentage('40').send({ from: accounts[0], gas: '1000000' });

    let finalViewFeePercentage = await post.methods.viewFeePercentage().call();

    assert.notEqual(initialViewFeePercentage, finalViewFeePercentage);
  });

  it('should revert and not update the Post viewFeePercentage when the caller is not the Post Owner', async() => {
    let revert;

    try {
      await post.methods.updatePostViewFeePercentage('40').send({ from: accounts[1], gas: '1000000' });
    } catch (error) {
      revert = error;
    }

    assert.ok(revert instanceof Error);
  });
  
  it('should update the Post paymentOption when the Owner is the function caller', async() => {
    let initialPaymentOption = await post.methods.paymentOption().call();

    await post.methods.updatePostPaymentOption(1).send({ from: accounts[0], gas: '1000000' });

    let finalPaymentOption = await post.methods.paymentOption().call();

    assert.notEqual(initialPaymentOption, finalPaymentOption);
  });

  it('should revert and not update the Post paymentOption when the caller is not the Post Owner', async() => {
    let revert;

    try {
      await post.methods.updatePostPaymentOption(1).send({ from: accounts[1], gas: '1000000' });
    } catch (error) {
      revert = error;
    }

    assert.ok(revert instanceof Error);
  });

  it('should update the Post state when the Owner is the function caller', async() => {
    let initialPostState = await post.methods.postState().call();

    await post.methods.updatePostState(0).send({ from: accounts[0], gas: '1000000' });

    let finalPostState = await post.methods.postState().call();

    assert.notEqual(initialPostState, finalPostState);
  });

  it('should revert and not update the Post state when the caller is not the Post Owner', async() => {
    let revert;

    try {
      await post.methods.updatePostState(0).send({ from: accounts[1], gas: '1000000' });
    } catch (error) {
      revert = error;
    }

    assert.ok(revert instanceof Error);
  });

  it('should update the Post category when the Owner is the function caller', async() => {
    let initialPostCategory = await post.methods.postCategory().call();

    await post.methods.updatePostCategory(1).send({ from: accounts[0], gas: '1000000' });

    let finalPostCategory = await post.methods.postCategory().call();

    assert.notEqual(initialPostCategory, finalPostCategory);
  });

  it('should revert and not update the Post state when the caller is not the Post Owner', async() => {
    let revert;

    try {
      await post.methods.updatePostCategory(1).send({ from: accounts[1], gas: '1000000' });
    } catch (error) {
      revert = error;
    }

    assert.ok(revert instanceof Error);
  });

});