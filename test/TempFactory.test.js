const assert = require('assert'),
      ganache = require('ganache-cli'),
      Web3 = require('web3'),
      web3 = new Web3(ganache.provider());

// this is the compiled TempFactory. A file with *all* the contracts.
// Why? Because of compilation errors. "Not finding the imported files"...
const compiledFactory = require('../ethereum/build/Factory.json');
const compiledPost = require('../ethereum/build/Post.json');
const compiledAuthentication = require('../ethereum/build/Authentication.json');

// reusable variable
let accounts,
    factory,
    user,
    postAddress,
    post;

let title = web3.utils.fromAscii("Post 0"), // title
    description = web3.utils.fromAscii("Description 0"), // description
    contentHash = web3.utils.fromAscii("QmTKZXse"), // contentHash
    language = web3.utils.fromAscii("Swedish"), // language
    date = 20180313, // date
    length = 45, // length
    viewFee = web3.utils.toWei('1', 'ether'), // viewFee
    viewFeePercentage = 25, // viewFeePercentage
    paymentOption = 0, // paymentOption
    state = 1, // state
    category = 0, // category
    pType = 1, // pType
    level = 0; //level

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  // deploy an instance of Factory
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface)) // interface = ABI
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '5000000' });

  // signup
  await factory.methods.signup(2, web3.utils.fromAscii("Admin")).send({ from: accounts[0], gas: '1000000' });
  user = await factory.methods.usersArray(0).call();

  // create an instance of Post
  await factory.methods.createPost(
    title, description, contentHash, language, date, length, viewFee, viewFeePercentage, paymentOption, state, category, pType, level
  ).send({ from: user, gas: '5000000' });

  [postAddress] = await factory.methods.getDeployedPosts().call();

  post = await new web3.eth.Contract(
    JSON.parse(compiledPost.interface),
    postAddress
  );
});

describe('Contract: Factory', () => {
  it('should deploy a Factory', () => {
    assert.ok(factory.options.address);
    // assert.ok(post.options.address);
  });

  describe('createPost()', () => {
    it('should revert when the caller has not signed up yet', async () => {
      let revert;

      try {
        const newPost = await factory.methods.createPost(
          title, description, contentHash, language, date, length, viewFee, viewFeePercentage, paymentOption, state, category, pType, level
        ).send({ from: accounts[2], gas: '5000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should push the new Post into the deployedPosts array, and increment the postsCount', async () => {
      const postsCount = await factory.methods.postsCount().call();

      const newPost = await factory.methods.createPost(
        title, description, contentHash, language, date, length, viewFee, viewFeePercentage, paymentOption, state, category, pType, level
      ).send({ from: user, gas: '5000000' });

      const postsCount2 = await factory.methods.postsCount().call();

      assert.notEqual(postsCount, postsCount2);
    });

    it('should push the new Post onto the User, and increment the userPostsCount', async () => {
      const userPostsCount = await factory.methods.userPostsCount(user).call();
      const userPosts = await factory.methods.getUserPosts(user).call();

      const newPost = await factory.methods.createPost(
        title, description, contentHash, language, date, length, viewFee, viewFeePercentage, paymentOption, state, category, pType, level
      ).send({ from: user, gas: '5000000' });

      const userPostsCount2 = await factory.methods.userPostsCount(user).call();
      const userPosts2 = await factory.methods.getUserPosts(user).call();

      assert.notEqual(userPostsCount, userPostsCount2);
      assert.notEqual(userPosts, userPosts2);
    });
  });

  describe('getDeployedPosts()', async () => {
    it('should return addresses of created Post instances', async () => {
      const allPosts = await factory.methods.getDeployedPosts().call();
      const allPostsLength = await factory.methods.postsCount().call();

      assert.equal(allPosts, postAddress);
      assert.equal(1, allPostsLength);
    });
  });

  describe('getUserPosts()', () => {
    it('should return all Posts and postCount created by a specific User', async () => {
      const userPosts = await factory.methods.getUserPosts(user).call();
      assert.equal(userPosts, postAddress);

      const userPostCount = await factory.methods.userPostsCount(user).call();
      assert.equal(userPosts.length, userPostCount)
    });
  });
});

describe('Contract: Post', () => {
  it('should assign ownership to the Post creator', async () => {
    const owner = await post.methods.owner().call();
    assert.equal(accounts[0], owner);
  });

  describe('increasePool()', () => {
    it('should increase the contract\'s balance', async () => {
      const initialBalance = await web3.eth.getBalance(postAddress);
      await post.methods.increasePool().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether' ) });
      const finalBalance = await web3.eth.getBalance(postAddress);
      
      assert.notEqual(initialBalance, finalBalance);
    });
  });

  describe('getPostSummary()', () => {
    it('should return a summary of the post', async () => {
      const summary = await post.methods.getPostSummary().call();
    });
  });
  
  describe('viewPost()', () => {
    it('should revert when the Post\'s balance is less than the viewFee', async () => {
      const postBalance = await web3.eth.getBalance(postAddress);
      let revert;

      try {
        await post.methods.viewPost().send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should allow a Post to be viewed and flag the User as a Viewer', async () => {
      await post.methods.increasePool().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });

      const initialPostBalance = await web3.eth.getBalance(postAddress);
      const view = await post.methods.viewPost().send({
        from: accounts[1],
        gas: '1000000'
      });

      const hasViewed = await post.methods.viewers(accounts[1]).call();
      const finalPostBalance = await web3.eth.getBalance(postAddress);
      assert.equal(hasViewed, true);
      assert.notEqual(initialPostBalance, finalPostBalance);
    });

    it('should revert when a user tries to view twice', async () => {
      let revert;

      try {
        await post.methods.viewPost().send({ from: accounts[1], gas: '1000000' });
        await post.methods.viewPost().send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }
      
      assert.ok(revert instanceof Error);
    });

    it('should send the viewFee to the User, and increment the viewCount', async () => {
      let regularAddress = accounts[2];

      await post.methods.increasePool().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });
      let initialBalance = await web3.eth.getBalance(postAddress);
      
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });
      let initialRegularAddressBalance = await web3.eth.getBalance(regularAddress);

      await post.methods.viewPost().send({ from: regularAddress, gas: '1000000' });
      let finalBalance = await web3.eth.getBalance(postAddress);
      let finalRegularAddressBalance = await web3.eth.getBalance(regularAddress);

      assert.notEqual(finalBalance, initialBalance);
      assert.notEqual(finalRegularAddressBalance, initialRegularAddressBalance);
    });

    it('should fire event: OnPay', async () => {
      await post.methods.increasePool().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });
      let initialBalance = await web3.eth.getBalance(postAddress);

      const logs = await post.methods.viewPost().send({ from: accounts[1], gas: '1000000' }),
            event = logs.events.OnPay.returnValues,
            _postAddress = event._postAddress,
            _payTo = event._payTo,
            _viewFee = event._viewFee,
            _viewFeePercentage = event._viewFeePercentage,
            _postBalance = event._postBalance;

      assert.equal(postAddress, _postAddress);
      assert.equal(_payTo, accounts[1]);
      assert.equal(_viewFee, viewFee);
      assert.equal(_viewFeePercentage, viewFeePercentage);
      assert.notEqual(_postBalance, initialBalance);
    });

    it('should fire event: OnView', async () => {
      await post.methods.increasePool().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });
      let initialBalance = await web3.eth.getBalance(postAddress);
      let initialViews = await post.methods.views().call();

      const logs = await post.methods.viewPost().send({ from: accounts[1], gas: '1000000' });
            event = logs.events.OnView.returnValues,
            _postAddress = event._postAddress,
            _viewerAddress = event._viewerAddress,
            _viewsCount = event._viewsCount;

      let finalViews = await post.methods.views().call();

      assert.equal(postAddress, _postAddress);
      assert.equal(_viewerAddress, accounts[1]);
      assert.notEqual(_viewsCount, initialViews);
      assert.equal(_viewsCount, finalViews);
    });
  });

  describe('upVote()', () => {
    it('should revert when called by a User which has not yet Viewed the Post', async () => {
      let revert;
      await post.methods.increasePool().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });

      try {
        await post.methods.vote(true).send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should revert when called twice by the same User', async () => {
      let revert;
      await post.methods.increasePool().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });
      await post.methods.viewPost().send({ from: accounts[1], gas: '1000000' });

      try {
        await post.methods.vote(true).send({ from: accounts[1], gas: '1000000' });
        await post.methods.vote(true).send({ from: accounts[1], gas: '1000000' });        
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should increment votes and mark the User as a voter', async () => {
      await post.methods.increasePool().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });

      let initialUpVotes = await post.methods.upVotes().call();
      
      await post.methods.viewPost().send({ from: accounts[1], gas: '1000000' });
      await post.methods.vote(true).send({ from: accounts[1], gas: '1000000' });
      
      let finalUpVotes = await post.methods.upVotes().call();
      
      assert.notEqual(initialUpVotes, finalUpVotes);
    });

    it('should log events', async () => {
      await post.methods.increasePool().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });

      let initialUpVotes = await post.methods.upVotes().call();
      await post.methods.viewPost().send({ from: accounts[1], gas: '1000000' });

      const logs = await post.methods.vote(true).send({ from: accounts[1], gas: '1000000' });
      const event = logs.events.OnVote.returnValues;
      const event0 = event._postAddress;
      const event1 = event._voterAddress;
      const event2 = event._voteVal;
      const event3 = event._voteCount;

      assert.equal(postAddress, event0);
      assert.equal(accounts[1], event1);
      assert.equal(true, event2);
      assert.notEqual(initialUpVotes, event3);
    });
  });

  describe('setTitle()', () => {
    it('should revert when called by any other than the Owner', async () => {
      let revert;

      try {
        await post.methods.setTitle(web3.utils.fromAscii("New Title, Yo!")).send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should update the title', async () => {
      let initialTitle = await post.methods.title().call();
      await post.methods.setTitle(web3.utils.fromAscii("New Title, Yo!")).send({ from: accounts[0], gas: '1000000' });
      let finalTitle = await post.methods.title().call();

      assert.notEqual(initialTitle, finalTitle);
    });

    it('should log events', async () => {
      let initialTitle = await post.methods.title().call();

      const logs = await post.methods.setTitle(web3.utils.fromAscii("New title, Yo!")).send({ from: accounts[0], gas: '1000000' });
      const event = logs.events.OnSetTitle.returnValues;
      const event0 = event._postAddress;
      const event1 = event._newTitle;

      assert.equal(postAddress, event0);
      assert.notEqual(initialTitle, event1);
    });
  });

  describe('setDescription()', () => {
    it('should revert when called by any other than the Owner', async () => {
      let revert;

      try {
        await post.methods.setDescription(web3.utils.fromAscii("New Description, Dude!")).send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should update the description', async () => {
      let initialDescription = await post.methods.description().call();
      await post.methods.setDescription(web3.utils.fromAscii("New Description, Dude!")).send({ from: accounts[0], gas: '1000000' });
      let finalDescription = await post.methods.description().call();

      assert.notEqual(initialDescription, finalDescription);
    });

    it('should log events', async () => {
      let initialDescription = await post.methods.description().call();

      const logs = await post.methods.setDescription(web3.utils.fromAscii("New Description, Dude!")).send({ from: accounts[0], gas: '1000000' });
      const event = logs.events.OnSetDescription.returnValues;
      const event0 = event._postAddress;
      const event1 = event._newDescription;

      assert.equal(postAddress, event0);
      assert.notEqual(initialDescription, event1);
    });
  });

  describe('setContentHash()', () => {
    it('should revert when called by any other than the Owner', async () => {
      let revert;

      try {
        await post.methods.setContentHash(web3.utils.fromAscii("newhashhh")).send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should update the content hash', async () => {
      let initialHash = await post.methods.contentHash().call();
      await post.methods.setContentHash(web3.utils.fromAscii("newhashhh")).send({ from: accounts[0], gas: '1000000' });
      let finalHash = await post.methods.contentHash().call();

      assert.notEqual(initialHash, finalHash);
    });

    it('should log events', async () => {
      let initialHash = await post.methods.contentHash().call();

      const logs = await post.methods.setContentHash(web3.utils.fromAscii("newhashhh")).send({ from: accounts[0], gas: '1000000' });
      const event = logs.events.OnSetContentHash.returnValues;
      const event0 = event._postAddress;
      const event1 = event._newContentHash;

      assert.equal(postAddress, event0);
      assert.notEqual(initialHash, event1);
    });
  });

  describe('setLanguage()', () => {
    it('should revert when called by any other than the Owner', async () => {
      let revert;

      try {
        await post.methods.setLanguage(web3.utils.fromAscii("Spanish")).send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should update the language', async () => {
      let initialLanguage = await post.methods.language().call();
      await post.methods.setLanguage(web3.utils.fromAscii("Spanish")).send({ from: accounts[0], gas: '1000000' });
      let finalLanguage = await post.methods.language().call();

      assert.notEqual(initialLanguage, finalLanguage);
    });

    it('should log events', async () => {
      let initialLanguage = await post.methods.language().call();

      const logs = await post.methods.setLanguage(web3.utils.fromAscii("Spanish")).send({ from: accounts[0], gas: '1000000' });
      const event = logs.events.OnSetLanguage.returnValues;
      const event0 = event._postAddress;
      const event1 = event._newLanguage;

      assert.equal(postAddress, event0);
      assert.notEqual(initialLanguage, event1);
    });
  });

  describe('setDate()', () => {
    it('should revert when called by any other than the Owner', async () => {
      let revert;

      try {
        await post.methods.setDate(20180420).send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should update the date', async () => {
      let initialDate = await post.methods.date().call();
      await post.methods.setDate(20180420).send({ from: accounts[0], gas: '1000000' });
      let finalDate = await post.methods.date().call();

      assert.notEqual(initialDate, finalDate);
    });

    it('should log events', async () => {
      let initialDate = await post.methods.date().call();

      const logs = await post.methods.setDate(20180420).send({ from: accounts[0], gas: '1000000' });
      const event = logs.events.OnSetDate.returnValues;
      const event0 = event._postAddress;
      const event1 = event._newDate;

      assert.equal(postAddress, event0);
      assert.notEqual(initialDate, event1);
    });
  });

  describe('setLength()', () => {
    it('should revert when called by any other than the Owner', async () => {
      let revert;

      try {
        await post.methods.setLength(11111).send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should update the length', async () => {
      let initialLength = await post.methods.length().call();
      await post.methods.setLength(11111).send({ from: accounts[0], gas: '1000000' });
      let finalLength = await post.methods.length().call();

      assert.notEqual(initialLength, finalLength);
    });

    it('should log events', async () => {
      let initialLength = await post.methods.length().call();

      const logs = await post.methods.setLength(11111).send({ from: accounts[0], gas: '1000000' });
      const event = logs.events.OnSetLength.returnValues;
      const event0 = event._postAddress;
      const event1 = event._newLength;

      assert.equal(postAddress, event0);
      assert.notEqual(initialLength, event1);
    });
  });

  describe('setViewFee()', () => {
    it('should revert when called by any other than the Owner', async () => {
      let revert;

      try {
        await post.methods.setViewFee(web3.utils.toWei('15', 'ether')).send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should update the view fee', async () => {
      let initialViewFee = await post.methods.viewFee().call();
      await post.methods.setViewFee(web3.utils.toWei('15', 'ether')).send({ from: accounts[0], gas: '1000000' });
      let finalViewFee = await post.methods.viewFee().call();

      assert.notEqual(initialViewFee, finalViewFee);
    });

    it('should log events', async () => {
      let newViewFee = web3.utils.toWei('15', 'ether');

      const logs = await post.methods.setViewFee(newViewFee).send({ from: accounts[0], gas: '1000000' });
      const event = logs.events.OnSetViewFee.returnValues;
      const event0 = event._postAddress;
      const event1 = event._newViewFee;

      assert.equal(postAddress, event0);
      assert.equal(newViewFee, event1);
    });
  });

  describe('setViewFeePercentage()', () => {
    it('should revert when called by any other than the Owner', async () => {
      let revert;

      try {
        await post.methods.setViewFeePercentage(12).send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should update the view fee', async () => {
      await post.methods.setViewFeePercentage(12).send({ from: accounts[0], gas: '1000000' });
      let finalViewFeePercentage = await post.methods.viewFeePercentage().call();

      assert.equal(12, finalViewFeePercentage);
    });

    it('should log events', async () => {
      const logs = await post.methods.setViewFeePercentage(12).send({ from: accounts[0], gas: '1000000' });
      const event = logs.events.OnSetViewFeePercentage.returnValues;
      const event0 = event._postAddress;
      const event1 = event._newViewFeePercentage;

      assert.equal(postAddress, event0);
      assert.equal(12, event1);
    });
  });

  describe('setPaymentOption()', () => {
    it('should revert when called by any other than the Owner', async () => {
      let revert;

      try {
        await post.methods.setPaymentOption(1).send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should update the payment option', async () => {
      await post.methods.setPaymentOption(1).send({ from: accounts[0], gas: '1000000' });
      let finalPaymentOption = await post.methods.paymentOption().call();

      assert.equal(1, finalPaymentOption);
    });

    it('should log events', async () => {
      const logs = await post.methods.setPaymentOption(1).send({ from: accounts[0], gas: '1000000' });
      const event = logs.events.OnSetPaymentOption.returnValues;
      const event0 = event._postAddress;
      const event1 = event._newPaymentOption;

      assert.equal(postAddress, event0);
      assert.equal(1, event1);
    });
  });

  describe('setState()', () => {
    it('should revert when called by any other than the Owner', async () => {
      let revert;

      try {
        await post.methods.setState(0).send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should update the payment option', async () => {
      await post.methods.setState(0).send({ from: accounts[0], gas: '1000000' });
      let finalState = await post.methods.paymentOption().call();

      assert.equal(0, finalState);
    });

    it('should log events', async () => {
      const logs = await post.methods.setState(0).send({ from: accounts[0], gas: '1000000' });
      const event = logs.events.OnSetState.returnValues;
      const event0 = event._postAddress;
      const event1 = event._newState;

      assert.equal(postAddress, event0);
      assert.equal(0, event1);
    });
  });

  describe('setCategory()', () => {
    it('should revert when called by any other than the Owner', async () => {
      let revert;

      try {
        await post.methods.setCategory(1).send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should update the category', async () => {
      await post.methods.setCategory(1).send({ from: accounts[0], gas: '1000000' });
      let finalCategory = await post.methods.category().call();

      assert.equal(1, finalCategory);
    });

    it('should log events', async () => {
      const logs = await post.methods.setCategory(1).send({ from: accounts[0], gas: '1000000' });
      const event = logs.events.OnSetCategory.returnValues;
      const event0 = event._postAddress;
      const event1 = event._newCategory;

      assert.equal(postAddress, event0);
      assert.equal(1, event1);
    });
  });

  describe('setType()', () => {
    it('should revert when called by any other than the Owner', async () => {
      let revert;

      try {
        await post.methods.setType(0).send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should update the type', async () => {
      await post.methods.setType(0).send({ from: accounts[0], gas: '1000000' });
      let finalType = await post.methods.pType().call();

      assert.equal(0, finalType);
    });

    it('should log events', async () => {
      const logs = await post.methods.setType(0).send({ from: accounts[0], gas: '1000000' });
      const event = logs.events.OnSetType.returnValues;
      const event0 = event._postAddress;
      const event1 = event._newPType;

      assert.equal(postAddress, event0);
      assert.equal(0, event1);
    });
  });
  
  describe('setLevel()', () => {
    it('should revert when called by any other than the Owner', async () => {
      let revert;

      try {
        await post.methods.setLevel(1).send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should update the type', async () => {
      await post.methods.setLevel(1).send({ from: accounts[0], gas: '1000000' });
      let finalLevel = await post.methods.level().call();

      assert.equal(1, finalLevel);
    });

    it('should log events', async () => {
      const logs = await post.methods.setLevel(1).send({ from: accounts[0], gas: '1000000' });
      const event = logs.events.OnSetLevel.returnValues;
      const event0 = event._postAddress;
      const event1 = event._newLevel;

      assert.equal(postAddress, event0);
      assert.equal(1, event1);
    });
  });
});

describe('Contract: Authentication', () => {
  describe('signup()', () => {
    it('should revert if the chosen role is "NONE"', async () => {
      let revert;

      try {
        await factory.methods.signup(0, web3.utils.fromAscii("Gertrud Storman")).send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should add a new REGULAR user', async () => {
      let index0 = await factory.methods.usersArray(0).call();
      
      await factory.methods.signup(1, web3.utils.fromAscii("Gertrud Storman")).send({ from: accounts[1], gas: '1000000' });

      // get the user's index by address
      let userIndex = await factory.methods.usersIndex(accounts[1]).call();

      // get the user's address by index
      let array = await factory.methods.usersArray(1).call();
      
      assert.notEqual(index0, userIndex);
      assert.equal(array, accounts[1]);
    });

    it('should fire events', async () => {
      const logs = await factory.methods.signup(1, web3.utils.fromAscii("Gertrud Storman")).send({ from: accounts[1], gas: '1000000' });
      const event = logs.events.OnSignup.returnValues;
      const event0 = event._userAddress;
      const event1 = event._role;

      assert.equal(accounts[1], event0);
      assert.equal(1, event1);
    });

    it('should revert if the chosen role is "ORGANIZATION" and the name input is empty', async () => {
      let revert;

      try {
        await factory.methods.signup(2, web3.utils.fromAscii("")).send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }
      
      assert.ok(revert instanceof Error);
    });

    it('should revert if I try to sign up twice', async () => {
      let revert;

      try {
        await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: accounts[1], gas: '1000000' });
        await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });
  });

  describe('getProfile()', () => {
    it('should revert if address searched for doesn\'t exist', async () => {
      let revert;

      try { 
        await factory.methods.getProfile(accounts[5]).call();
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    // double check the output from profile[1]
    it('should return return the user\'s profile', async () => {
      let profile = await factory.methods.getProfile(accounts[0]).call();
      assert.equal(2, profile[0]);
      assert.ok(web3.utils.fromAscii("Admin"), profile[1]);
    });
  });

  describe('deleteAccount()', () => {
    it('should delete a User\'s account', async () => {
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: accounts[2], gas: '1000000' });

      let getIndex = await factory.methods.usersIndex(accounts[2]).call();
      let isInArray = await factory.methods.usersArray(1).call();

      await factory.methods.deleteAccount().send({ from: accounts[2], gas: '1000000' });

      let isNotInArray = await factory.methods.usersArray(1).call();

      assert.equal(accounts[2], isInArray);
      assert.notEqual(accounts[2], isNotInArray);
    });

    it('should fire events', async () => {
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: accounts[2], gas: '1000000' });
      const logs = await factory.methods.deleteAccount().send({ from: accounts[2], gas: '1000000' });
      const events = logs.events.OnDeleteAccount.returnValues;
      const event0 = events._userAddress;
      const event1 = events._caller;

      assert.equal(event0, accounts[2]); 
      assert.equal(event1, accounts[2]); 
    });
  });

  describe('proxyDeleteAccount()', () => {
    it('should revert when not called by the Owner', async () => {
      let revert;

      try {
        await factory.methods.proxyDeleteAccount(accounts[0]).send({ from: accounts[1], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should revert when the input address is not a user', async () => {
      let revert;

      try {
        await factory.methods.proxyDeleteAccount(accounts[2]).send({ from: accounts[0], gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should delete a user', async () => {
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: accounts[2], gas: '1000000' });

      let getIndex = await factory.methods.usersIndex(accounts[2]).call();
      let isInArray = await factory.methods.usersArray(getIndex).call();

      await factory.methods.proxyDeleteAccount(accounts[2]).send({ from: accounts[0], gas: '1000000' });

      let isNotInArray = await factory.methods.usersArray(getIndex).call();

      assert.equal(accounts[2], isInArray);
      assert.notEqual(accounts[2], isNotInArray);
    });

    it('should fire events', async () => {
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: accounts[2], gas: '1000000' });
      const logs = await factory.methods.proxyDeleteAccount(accounts[2]).send({ from: accounts[0], gas: '1000000' });
      const event = logs.events.OnDeleteAccount.returnValues;
      const event0 = event[0];
      const event1 = event[1];

      assert.equal(accounts[2], event0);
      assert.equal(accounts[0], event1);
    });
  });

  describe('addMember()', () => {
    it('should revert when called by a non-Organization user', async () => {
      let revert;
      let regularAddress = accounts[6]
      let nonOrganization = accounts[7];

      // create a regular user...
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });

      // ... and one more.
      await factory.methods.signup(1, web3.utils.fromAscii("Daniel Radcliffe")).send({ from: nonOrganization, gas: '1000000' });

      // now try to add a member to a non-Organization user
      try {
        await factory.methods.addMember(regularAddress).send({ from: nonOrganization, gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });
    
    it('should revert when trying to add a member which is already member of an organization', async () => {
      let revert;
      let organizationAddressOne = accounts[5];
      let organizationAddressTwo = accounts[7];
      let regularAddress = accounts[6];

      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddressOne, gas: '1000000' });
      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddressTwo, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });

      // organizationAddressOne adds regularAddress
      await factory.methods.addMember(regularAddress).send({ from: organizationAddressOne, gas: '1000000' });
      
      // organizationAddressTwo tries to add regularAddress
      try {
        await factory.methods.addMember(regularAddress).send({ from: organizationAddressTwo, gas: '1000000' });
      } catch (error) {
        revert = error;
      }
      
      assert.ok(revert instanceof Error);
    });

    it('should add a user as a member of the calling organization', async () => {
      let organizationAddress = accounts[5];
      let regularAddress = accounts[6];

      // create an Organization user from accounts[5]
      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });
      await factory.methods.usersIndex(organizationAddress).call(); // 1
      
      // create a Regular user from accounts[5]
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });
      let initialMemberOf = await factory.methods.memberOf(accounts[6]).call();

      // check the memberId before adding the user
      // outputs to 0, because the user is not yet a member
      let initialMemberId = await factory.methods.membersIndex(regularAddress).call();

      // add Regular to Organization
      await factory.methods.addMember(regularAddress).send({ from: organizationAddress, gas: '1000000' });
      let finalMemberOf = await factory.methods.memberOf(regularAddress).call();

      // check the new member's index
      // outputs to 0. array.push - 1
      let finalMemberId = await factory.methods.membersIndex(regularAddress).call();

      assert.notEqual(initialMemberOf, finalMemberOf);
      assert.equal(organizationAddress, finalMemberOf);
      assert.equal(initialMemberId, finalMemberId);
    });

    it('should fire event: OnAddMember', async () => {
      let organizationAddress = accounts[5];
      let regularAddress = accounts[6];

      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });
      const logs = await factory.methods.addMember(regularAddress).send({ from: organizationAddress, gas: '1000000' });
      const event = logs.events.OnAddMember.returnValues;
      const event0 = event[0];
      const event1 = event[1];
      const event2 = event[2];

      assert.equal(organizationAddress, event0);
      assert.equal(regularAddress, event1);
      assert.equal(organizationAddress, event2);
    });
  });

  describe('proxyAddMember()', () => {
    it('should revert when not called by the Owner', async () => {
      let revert;
      let organizationAddress = accounts[5];
      let regularAddressOne = accounts[6];
      let regularAddressTwo = accounts[7];

      // create two regular users
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddressOne, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("Ping-Pong")).send({ from: regularAddressTwo, gas: '1000000' });

      // create an organization
      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });

      // try to call proxyAddMember from regularAddressTwo
      try {
        await factory.methods.proxyAddMember(organizationAddress, regularAddressTwo).send({ from: regularAddressTwo, gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should revert when trying to add a member which is already member of an organization', async () => {
      let revert;
      let owner = await factory.methods.owner().call();
      let organizationAddressOne = accounts[5];
      let organizationAddressTwo = accounts[7];
      let regularAddress = accounts[6];

      // create an organization
      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddressOne, gas: '1000000' });
      await factory.methods.signup(2, web3.utils.fromAscii("Lernia")).send({ from: organizationAddressTwo, gas: '1000000' });

      // create a regular user
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });
      let initialMemberOf = await factory.methods.memberOf(regularAddress).call();

      // add regularAddress to organizationAddressOne
      await factory.methods.proxyAddMember(organizationAddressOne, regularAddress).send({ from: owner, gas: '1000000' });
      let finalMemberOf = await factory.methods.memberOf(regularAddress).call();

      // try to add regularAddress to organizationAddressTwo
      try {
        await factory.methods.proxyAddMember(organizationAddressTwo, regularAddress).send({ from: owner, gas: '1000000' });
      } catch (error) {
        revert = error;
      }
      
      assert.ok(revert instanceof Error);
      assert.notEqual(initialMemberOf, finalMemberOf);
      assert.equal(organizationAddressOne, finalMemberOf);
    });

    it('should add a user as a member an organization', async () => {
      let owner = await factory.methods.owner().call();
      let organizationAddress = accounts[5];
      let regularAddress = accounts[6];

      // signup
      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });
      let initialMemberOf = await factory.methods.memberOf(regularAddress).call();

      // add
      await factory.methods.proxyAddMember(organizationAddress, regularAddress).send({ from: owner, gas: '1000000' });
      let finalMemberOf = await factory.methods.memberOf(regularAddress).call();
      let finalMemberId = await factory.methods.membersIndex(regularAddress).call();

      assert.notEqual(initialMemberOf, finalMemberOf);
      assert.equal(organizationAddress, finalMemberOf);
      assert.equal(0, finalMemberId);
    });

    it('should fire event: OnAddMember', async () => {
      let owner = await factory.methods.owner().call();
      let organizationAddress = accounts[5];
      let regularAddress = accounts[6];

      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });
      const logs = await factory.methods.proxyAddMember(organizationAddress, regularAddress).send({ from: owner, gas: '1000000' });
      const event = logs.events.OnAddMember.returnValues;
      const event0 = event[0];
      const event1 = event[1];
      const event2 = event[2];

      assert.equal(organizationAddress, event0);
      assert.equal(regularAddress, event1);
      assert.equal(owner, event2);
    });
  });

  describe('removeMember()', () => {
    it('should revert if the role Organization is not set to organizationAddress', async () => {
      let revert;
      let organizationAddress = accounts[5];
      let regularAddress = accounts[6];

      await factory.methods.signup(1, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });

      try {
        await factory.methods.removeMember(regularAddress).send({ from: organizationAddress, gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should revert if the organizationAddress\' member length is 0', async () => {
      let revert;
      let organizationAddress = accounts[5];
      let regularAddress = accounts[6];

      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });

      try {
        await factory.methods.removeMember(regularAddress).send({ from: organizationAddress, gas: '1000000' });
      } catch (error) {
        revert = error;
      }
      
      assert.ok(revert instanceof Error);
    });

    it('should revert if the regularAddress is not a member of organizationAddress', async () => {
      let revert;
      let organizationAddressOne = accounts[5];
      let organizationAddressTwo = accounts[7];
      let regularAddressOne = accounts[6];
      let regularAddressTwo = accounts[8];

      // signup
      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddressOne, gas: '1000000' });
      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddressTwo, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddressOne, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddressTwo, gas: '1000000' });

      // add regularAddressOne to organizationAddressOne
      await factory.methods.addMember(regularAddressOne).send({ from: organizationAddressOne, gas: '1000000' });

      // add regularAddressTwo to organizationAddressTwo
      await factory.methods.addMember(regularAddressTwo).send({ from: organizationAddressTwo, gas: '1000000' });

      // check which organization they're members of ...
      let regularAddressOneMemberOf = await factory.methods.memberOf(regularAddressOne).call();
      let regularAddressTwoMemberOf = await factory.methods.memberOf(regularAddressTwo).call();

      // ... and assert.
      assert.equal(regularAddressOneMemberOf, organizationAddressOne);
      assert.equal(regularAddressTwoMemberOf, organizationAddressTwo);

      // try to remove wrong member from your organization
      try {
        await factory.methods.removeMember(regularAddressTwo).send({ from: organizationAddressOne, gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should remove a member from an organization', async () => {
      let organizationAddress = accounts[5];
      let regularAddressOne = accounts[6];
      let regularAddressTwo = accounts[8];

      // signup
      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddressOne, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("Ping-Pong")).send({ from: regularAddressTwo, gas: '1000000' });

      await factory.methods.addMember(regularAddressOne).send({ from: organizationAddress, gas: '1000000' });
      await factory.methods.addMember(regularAddressTwo).send({ from: organizationAddress, gas: '1000000' });

      // check which organization they're members of ...
      let initialRegularAddressOneMemberOf = await factory.methods.memberOf(regularAddressOne).call();
      let regularAddressTwoMemberOf = await factory.methods.memberOf(regularAddressTwo).call();

      assert.equal(initialRegularAddressOneMemberOf, organizationAddress);
      assert.equal(regularAddressTwoMemberOf, organizationAddress);

      // get their membersIndex ...
      let initialRegularAddressOneMembersIndex = await factory.methods.membersIndex(regularAddressOne).call();
      let initialRegularAddressTwoMembersIndex = await factory.methods.membersIndex(regularAddressTwo).call();

      assert.equal(0, initialRegularAddressOneMembersIndex);
      assert.equal(1, initialRegularAddressTwoMembersIndex);

      // get organization's members length
      let membersLength = await factory.methods.getMembersLength(organizationAddress).call();
      assert.equal(2, membersLength);

      // delete regularAddressOne, which has memberIndex0 0
      await factory.methods.removeMember(regularAddressOne).send({ from: organizationAddress, gas: '1000000' });
      let finalMembersLength = await factory.methods.getMembersLength(organizationAddress).call();
      let finalRegularAddressOneMemberOf = await factory.methods.memberOf(regularAddressOne).call();

      let finalRegularAddressOneMembersIndex = await factory.methods.membersIndex(regularAddressOne).call();
      let finalRegularAddressTwoMembersIndex = await factory.methods.membersIndex(regularAddressTwo).call();

      assert.equal(1, finalMembersLength);
      assert.notEqual(finalRegularAddressOneMemberOf, organizationAddress);
    });

    it('should fire event: OnRemoveMember', async () => {
      let organizationAddress = accounts[5];
      let regularAddress = accounts[6];

      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });

      await factory.methods.addMember(regularAddress).send({ from: organizationAddress, gas: '1000000' });

      let logs = await factory.methods.removeMember(regularAddress).send({ from: organizationAddress, gas: '1000000' });
      let event = logs.events.OnRemoveMember.returnValues;
      let event0 = event[0];
      let event1 = event[1];
      let event2 = event[2];

      assert.equal(event0, organizationAddress);
      assert.equal(event1, regularAddress);
      assert.equal(event2, organizationAddress);
    });
  });
  
  describe('proxyRemoveMember()', () => {

    it('should revert when not called by the Owner', async () => {
      let revert;
      let organizationAddress = accounts[5];
      let regularAddressOne = accounts[6];
      let regularAddressTwo = accounts[7];

      // create two regular users
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddressOne, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("Ping-Pong")).send({ from: regularAddressTwo, gas: '1000000' });

      // create an organization
      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });

      // add regularAddressOne to organizationAddress
      await factory.methods.addMember(regularAddressOne).send({ from: organizationAddress, gas: '1000000' });

      // try to call proxyRemoveMember from regularAddressTwo
      try {
        await factory.methods.proxyRemoveMember(organizationAddress, regularAddressOne).send({ from: regularAddressTwo, gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should revert if the organizationAddress member length is 0', async () => {
      let revert;
      let owner = await factory.methods.owner().call();
      let organizationAddress = accounts[5];
      let regularAddress = accounts[6];

      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });

      try {
        await factory.methods.proxyRemoveMember(organizationAddress, regularAddress).send({ from: owner, gas: '1000000' });
      } catch (error) {
        revert = error;
      }
      
      assert.ok(revert instanceof Error);
    });

    it('should revert if the regularAddress is not a member of organizationAddress', async () => {
      let revert;
      let owner = await factory.methods.owner().call();
      let organizationAddressOne = accounts[5];
      let organizationAddressTwo = accounts[7];
      let regularAddressOne = accounts[6];
      let regularAddressTwo = accounts[8];

      // signup
      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddressOne, gas: '1000000' });
      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddressTwo, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddressOne, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddressTwo, gas: '1000000' });

      // add regularAddressOne to organizationAddressOne
      await factory.methods.addMember(regularAddressOne).send({ from: organizationAddressOne, gas: '1000000' });

      // add regularAddressTwo to organizationAddressTwo
      await factory.methods.addMember(regularAddressTwo).send({ from: organizationAddressTwo, gas: '1000000' });

      // check which organization they're members of ...
      let regularAddressOneMemberOf = await factory.methods.memberOf(regularAddressOne).call();
      let regularAddressTwoMemberOf = await factory.methods.memberOf(regularAddressTwo).call();

      // ... and assert.
      assert.equal(regularAddressOneMemberOf, organizationAddressOne);
      assert.equal(regularAddressTwoMemberOf, organizationAddressTwo);

      // try to remove wrong member from the organization
      try {
        await factory.methods.proxyRemoveMember(organizationAddressOne, regularAddressTwo).send({ from: owner, gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should remove a member from an organization', async () => {
      let owner = await factory.methods.owner().call();
      let organizationAddress = accounts[5];
      let regularAddressOne = accounts[6];
      let regularAddressTwo = accounts[8];

      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddressOne, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("Ping-Pong")).send({ from: regularAddressTwo, gas: '1000000' });

      await factory.methods.addMember(regularAddressOne).send({ from: organizationAddress, gas: '1000000' });
      await factory.methods.addMember(regularAddressTwo).send({ from: organizationAddress, gas: '1000000' });

      let initialRegularAddressTwoMemberOf = await factory.methods.memberOf(regularAddressTwo).call();

      await factory.methods.proxyRemoveMember(organizationAddress, regularAddressTwo).send({ from: owner, gas: '1000000' });

      let finalRegularAddressTwoMemberOf = await factory.methods.memberOf(regularAddressTwo).call();
      let finalRegularAddressTwoMemberIndex = await factory.methods.membersIndex(regularAddressTwo).call();

      assert.notEqual(initialRegularAddressTwoMemberOf, finalRegularAddressTwoMemberOf);
      assert.equal(0, finalRegularAddressTwoMemberIndex);
    });

    it('should fire event: OnRemoveMember', async () => {
      let owner = await factory.methods.owner().call();
      let organizationAddress = accounts[5];
      let regularAddress = accounts[6];

      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });
      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });

      await factory.methods.addMember(regularAddress).send({ from: organizationAddress, gas: '1000000' });

      let logs = await factory.methods.proxyRemoveMember(organizationAddress, regularAddress).send({ from: owner, gas: '1000000' });
      let event = logs.events.OnRemoveMember.returnValues;
      let event0 = event[0];
      let event1 = event[1];
      let event2 = event[2];

      assert.equal(event0, organizationAddress);
      assert.equal(event1, regularAddress);
      assert.equal(event2, owner);
    });

  });

  describe('setName()', () => {
    it('should revert if the caller has not signed up yet', async () => {
      let revert;
      let regularAddressOne = accounts[6];

      try {
        await factory.methods.setName(web3.utils.fromAscii("Pähr")).send({ from: regularAddressOne, gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should revert if the user is an Organization trying to set an empty name', async () => {
      let revert;
      let organizationAddress = accounts[5];

      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });

      try {
        await factory.methods.setName(web3.utils.fromAscii("")).send({ from: organizationAddress, gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should update the user\'s name', async () => {
      let organizationAddress = accounts[5];

      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });
      let initialName = await factory.methods.users(organizationAddress).call();
      initialName = initialName.name;

      await factory.methods.setName(web3.utils.fromAscii("Got Milk?")).send({ from: organizationAddress, gas: '1000000' });
      let finalName = await factory.methods.users(organizationAddress).call();
      finalName = finalName.name;
      
      assert.notEqual(initialName, finalName);
    });

    it('should fire event: OnSetName', async () => {
      let organizationAddress = accounts[5];

      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });
      
      let logs = await factory.methods.setName(web3.utils.fromAscii("Got Milk?")).send({ from: organizationAddress, gas: '1000000' });
      let event = logs.events.OnSetName.returnValues;
      let event0 = event[0];
      let event1 = event[1];
      let event2 = event[2];

      let finalName = await factory.methods.users(organizationAddress).call();
      finalName = finalName.name;

      assert.equal(event0, organizationAddress);
      assert.equal(event1, finalName);
      assert.equal(event2, organizationAddress);
    });
  });

  describe('proxySetName()', () => {
    it('should revert if the user has not signed up yet', async () => {
      let revert;
      let owner = await factory.methods.owner().call();
      let regularAddressOne = accounts[6];

      try {
        await factory.methods.proxySetName(regularAddressOne, web3.utils.fromAscii("Pähr")).send({ from: owner, gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should revert if the caller is not the Owner', async () => {
      let revert;
      let owner = await factory.methods.owner().call();
      let regularAddressOne = accounts[6];
      let regularAddressTwo = accounts[7];

      await factory.methods.signup(1, web3.utils.fromAscii("Pähr")).send({ from: regularAddressOne, gas: '1000000' });

      try {
        await factory.methods.proxySetName(regularAddressOne, web3.utils.fromAscii("Pähr")).send({ from: regularAddressTwo, gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should revert if trying to set an empty name for an Organization', async () => {
      let revert;
      let owner = await factory.methods.owner().call();
      let organizationAddress = accounts[5];

      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });

      try {
        await factory.methods.proxySetName(organizationAddress, web3.utils.fromAscii("")).send({ from: owner, gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should update the user\'s name', async () => {
      let owner = await factory.methods.owner().call();
      let organizationAddress = accounts[5];

      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });
      let initialName = await factory.methods.users(organizationAddress).call();
      initialName = initialName.name;

      await factory.methods.proxySetName(organizationAddress, web3.utils.fromAscii("Got Milk?")).send({ from: owner, gas: '1000000' });
      let finalName = await factory.methods.users(organizationAddress).call();
      finalName = finalName.name;
      
      assert.notEqual(initialName, finalName);
    });

    it('should fire event: OnSetName', async () => {
      let owner = await factory.methods.owner().call();
      let organizationAddress = accounts[5];

      await factory.methods.signup(2, web3.utils.fromAscii("Odd Hill")).send({ from: organizationAddress, gas: '1000000' });
      
      let logs = await factory.methods.proxySetName(organizationAddress, web3.utils.fromAscii("Got Milk?")).send({ from: owner, gas: '1000000' });
      let event = logs.events.OnSetName.returnValues;
      let event0 = event[0];
      let event1 = event[1];
      let event2 = event[2];

      let finalName = await factory.methods.users(organizationAddress).call();
      finalName = finalName.name;

      assert.equal(event0, organizationAddress);
      assert.equal(event1, finalName);
      assert.equal(event2, owner);
    });
  });

  describe('setRole()', () => {
    it('should revert if the user has not signed up yet', async () => {
      let revert;
      let regularAddress = accounts[6];

      try {
        await factory.methods.setRole(1).send({ from: regularAddress, gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should revert if a REGULAR user with an empty name changes role to Organization', async () => {
      let revert;
      let regularAddress = accounts[6];

      await factory.methods.signup(1, web3.utils.fromAscii("")).send({ from: regularAddress, gas: '1000000' });

      try {
        await factory.methods.setRole(2).send({ from: regularAddress, gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should change role', async () => {
      let regularAddress = accounts[6];

      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });
      let initialRole = await factory.methods.users(regularAddress).call();
      initialRole = initialRole.role;

      await factory.methods.setRole(2).send({ from: regularAddress, gas: '1000000' });
      let finalRole = await factory.methods.users(regularAddress).call();
      finalRole = finalRole.role;

      assert.equal(1, initialRole);
      assert.equal(2, finalRole);
      assert.notEqual(finalRole, initialRole);
    });

    it('should fire event: OnSetRole', async () => {
      let regularAddress = accounts[6];

      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });

      let logs = await factory.methods.setRole(2).send({ from: regularAddress, gas: '1000000' });
      let event = logs.events.OnSetRole.returnValues;
      let event0 = event[0];
      let event1 = event[1];
      let event2 = event[2];

      let finalRole = await factory.methods.users(regularAddress).call();
      finalRole = finalRole.role;

      assert.equal(event0, regularAddress);
      assert.equal(event1, finalRole);
      assert.equal(event2, regularAddress);
    });
  });

  describe('proxySetRole()', () => {
    it('should revert if the user has not signed up yet', async () => {
      let revert;
      let owner = await factory.methods.owner().call();
      let regularAddress = accounts[6];

      try {
        await factory.methods.proxySetRole(regularAddress, 1).send({ from: owner, gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should revert if trying to change the role of a Regular user with an empty nme to Organization', async () => {
      let revert;
      let owner = await factory.methods.owner().call();
      let regularAddress = accounts[6];

      await factory.methods.signup(1, web3.utils.fromAscii("")).send({ from: regularAddress, gas: '1000000' });

      try {
        await factory.methods.proxySetRole(regularAddress, 2).send({ from: owner, gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should change role', async () => {
      let owner = await factory.methods.owner().call();
      let regularAddress = accounts[6];

      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });
      let initialRole = await factory.methods.users(regularAddress).call();
      initialRole = initialRole.role;

      await factory.methods.proxySetRole(regularAddress, 2).send({ from: owner, gas: '1000000' });
      let finalRole = await factory.methods.users(regularAddress).call();
      finalRole = finalRole.role;

      assert.equal(1, initialRole);
      assert.equal(2, finalRole);
      assert.notEqual(finalRole, initialRole);
    });

    it('should fire event: OnSetRole', async () => {
      let owner = await factory.methods.owner().call();
      let regularAddress = accounts[6];

      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });

      let logs = await factory.methods.proxySetRole(regularAddress, 2).send({ from: owner, gas: '1000000' });
      let event = logs.events.OnSetRole.returnValues;
      let event0 = event[0];
      let event1 = event[1];
      let event2 = event[2];

      let finalRole = await factory.methods.users(regularAddress).call();
      finalRole = finalRole.role;

      assert.equal(event0, regularAddress);
      assert.equal(event1, finalRole);
      assert.equal(event2, owner);
    });
  });

  describe('setSocialMedia()', () => {
    it('should revert if the user has not signed up yet', async () => {
      let revert;
      let regularAddress = accounts[6];

      try {
        await factory.methods.setSocialMedia(0, web3.utils.fromAscii("LinkedIn")).send({ from: regularAddress, gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should update socialMedia', async () => {
      let revert = false;
      let regularAddress = accounts[6];

      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });
      
      try {
        await factory.methods.setSocialMedia(0, web3.utils.fromAscii("LinkedIn")).send({ from: regularAddress, gas: '1000000' });
      } catch (error) {
        if (error) {
          revert = true;
        }
      }
      
      assert.equal(false, revert);
    });

    it('should fire event: OnSetSocialMedia', async () => {
      let regularAddress = accounts[6];

      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });
      
      let logs = await factory.methods.setSocialMedia(0, web3.utils.fromAscii("LinkedIn")).send({ from: regularAddress, gas: '1000000' });
      let event = logs.events.OnSetSocialMedia.returnValues;
      let userAddress = event._userAddress;
      let socialMediaIndex = event._socialMediaIndex;
      let newSocialMedia = event._newSocialMedia;
      let caller = event._caller;

      assert.equal(regularAddress, userAddress);
      assert.equal(0, socialMediaIndex);
      assert.ok(web3.utils.fromAscii("LinkedIn"), newSocialMedia);
      assert.equal(regularAddress, caller);
    });
  });

  describe('proxySetSocialMedia()', () => {
    it('should revert if the user has not signed up yet', async () => {
      let revert;
      let owner = await factory.methods.owner().call();
      let regularAddress = accounts[6];

      try {
        await factory.methods.proxySetSocialMedia(regularAddress, 0, web3.utils.fromAscii("LinkedIn")).send({ from: owner, gas: '1000000' });
      } catch (error) {
        revert = error;
      }

      assert.ok(revert instanceof Error);
    });

    it('should update socialMedia', async () => {
      let revert = false;
      let owner = await factory.methods.owner().call();
      let regularAddress = accounts[6];

      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });
      
      try {
        await factory.methods.proxySetSocialMedia(regularAddress, 0, web3.utils.fromAscii("LinkedIn")).send({ from: owner, gas: '1000000' });
      } catch (error) {
        if (error) {
          revert = true;
        }
      }
      
      assert.equal(false, revert);
    });

    it('should fire event: OnSetSocialMedia', async () => {
      let owner = await factory.methods.owner().call();
      let regularAddress = accounts[6];

      await factory.methods.signup(1, web3.utils.fromAscii("John-John")).send({ from: regularAddress, gas: '1000000' });
      
      let logs = await factory.methods.proxySetSocialMedia(regularAddress, 0, web3.utils.fromAscii("LinkedIn")).send({ from: owner, gas: '1000000' });
      let event = logs.events.OnSetSocialMedia.returnValues;
      let userAddress = event._userAddress;
      let socialMediaIndex = event._socialMediaIndex;
      let newSocialMedia = event._newSocialMedia;
      let caller = event._caller;

      assert.equal(regularAddress, userAddress);
      assert.equal(0, socialMediaIndex);
      assert.ok(web3.utils.fromAscii("LinkedIn"), newSocialMedia);
      assert.equal(owner, caller);
    });
  });

});
