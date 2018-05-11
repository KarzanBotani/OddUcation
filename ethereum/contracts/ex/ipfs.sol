// https://ethereum.stackexchange.com/questions/39141/creating-a-form-in-ipfs-for-users-to-enter-data/39205?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

// Front end:
async function createPost() {
  const { title, description, language, date, length, views, viewFee, viewFeePercentage, paymentOption, state, type, level, image } = this.state;

  const data = JSON.stringify({
    title: title,
    description: description,
    image: image,
    language: language,
    date: date,
    length: length,
    viewFee: viewFee,
    viewFeePercentage: viewFeePercentage,
    paymentOption: paymentOption,
    state: state,
    type: type,
    level: level
  });

  // 2. Send to IPFS:
  const postHash = await ipfs.add(data);

  // 3. Send postHash to contract:
  await factory.methods.createPost(postHash).send({ from: accounts[0] });
}

async function fetchPost() {
  // 1. Fetch postHash from contract
  let fetchHashFromContract = await factory.methods.postHashes('input...').call();

  // 2. Query IFPS:
  let fetchDataFromIpfs = JSON.parse(await ipfs.cat(returnedHash));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Back end:
contract PostStorage {
  using SafeMath for uint256;

  string[] public postHashes;
  uint256 public postsCount;

  mapping (uint256 => address) public postToUser;
  mapping (address => uint256) public userPostsCount;
  mapping (string => uint256) public postBalances;

  event OnCreatePost (address User, string Hash);
  event OnSetPost (address User, string NewHash);
  event OnSetPostBalance (address Funder, uint256 Value);

  function createPost(string _hash) public {
    postHashes.push(_hash);
    postsCount = postsCount.add(1);

    postToUser[postsCount] = msg.sender;
    userPostsCount[msg.sender] = userPostsCount[msg.sender].add(1);

    emit OnCreatePost(msg.sender, _hash);
  }

  function setPost(uint256 _index, string _newHash) public {
    postHashes[_index] = _newHash;
    emit OnSetPost(msg.sender, _newHash);
  }

  function setPostBalance(string _post) public payable {
    postBalances[_post] = msg.value;
    emit OnSetPostBalance(msg.sender, msg.value);
  }
}

contract PostViewers is PostStorage {
  mapping (string => address) viewers;
  
  event OnView(address indexed User, string indexed Post);

  function storeView(address _user, string _post) public {
    viewers[_post] = _user;
  }

  function logView(address _user, string _post) public {
    emit OnView(_user, _post);
  }
}

contract PostVoters is PostViewers {
  mapping (string => address) voters;

  event OnVote(address indexed User, string indexed Post, bool indexed Value);

  function storeVoter(address _user, string _post) public {
    require(!voters[_user]);
    voters[_post] = _user;
  }

  function logVote(address _user, string _post, bool _value) public {
    emit OnVote(_user, _post, _value);
  }
}