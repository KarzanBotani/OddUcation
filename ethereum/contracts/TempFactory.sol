pragma solidity ^0.4.21;

contract Ownable {
  address public owner;

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  function Ownable() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0));
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }
}

library SafeMath {

  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}

contract Authentication is Ownable {
  using SafeMath for uint256;

  enum Role { NONE, REGULAR, ORGANIZATION }

  struct User {
    Role role;
    bytes32 name;
    bytes32[3] socialMedia;
    address[] posts;
    address[] members;
  }

  mapping (address => User) public users;
  mapping (address => uint256) public usersIndex;
  mapping (address => uint256) public membersIndex;
  mapping (address => address) public memberOf;

  address[] public usersArray;

  event OnSignup(address _userAddress, uint256 _role);
  event OnSetName(address _userAddress, bytes32 _newName, address _caller);
  event OnSetSocialMedia(address _userAddress, uint256 _socialMediaIndex, bytes32 _newSocialMedia, address _caller);
  event OnSetRole(address _userAddress, uint256 _newRole, address _caller);
  event OnDeleteAccount(address _userAddress, address _caller);
  event OnAddMember(address _organizationAddress, address _memberAddress, address _caller);
  event OnRemoveMember(address _organizationAddress, address _memberAddress, address _caller);

  modifier notSignedUp {
    require(users[msg.sender].role == Role.NONE);
    _;
  }
  
  modifier isUser(address _userAddress) {
    require(_userAddress != address(0));
    require(users[_userAddress].role != Role.NONE);
    _;
  }

  modifier onlyOrganization (address _organizationAddress) {
    require(_organizationAddress != address(0));
    require(users[_organizationAddress].role == Role.ORGANIZATION);
    _;
  }

  modifier addressNotMember(address _userAddress) {
    require(_userAddress != address(0));
    require(users[_userAddress].role == Role.REGULAR);
    require(memberOf[_userAddress] == address(0));
    _;
  }

  function signup(uint256 _roleValue, bytes32 _name) public notSignedUp returns(uint256, bytes32, bytes32[3], address[], address[]) {
    require(_roleValue != 0);
    
    if (_roleValue == uint256(Role.ORGANIZATION)) {
      require(_name != 0x0);
    }

    uint256 userId = usersArray.push(msg.sender) - 1;
    usersIndex[msg.sender] = userId;
    
    User storage user = users[msg.sender];
    user.role = Role(_roleValue);
    user.name = _name;
  
    emit OnSignup(msg.sender, uint256(user.role));
  
    /*
    return (
      uint256(user.role),
      user.name,
      user.socialMedia,
      user.posts,
      user.members
    );
    */
  }
  
  function getProfile(address _userAddress) public view isUser(_userAddress) returns(uint256, bytes32, bytes32[3], address[], address[]) {
    User memory user = users[msg.sender];
    
    return(
      uint256(user.role),
      user.name,
      user.socialMedia,
      user.posts,
      user.members
    );
  }

  function getMembersLength(address _organizationAddress) public view returns (uint) {
    require(users[_organizationAddress].role == Role.ORGANIZATION);
    return users[_organizationAddress].members.length;
  }
  
  function deleteAccount() public {
    _deleteAccount(msg.sender, msg.sender);
  }

  function proxyDeleteAccount(address _userAddress) public onlyOwner {
    _deleteAccount(_userAddress, msg.sender);
  }
  
  function addMember(address _userAddress) public { 
    _addMember(msg.sender, _userAddress, msg.sender);
  }
  
  function proxyAddMember(address _organizationAddress, address _userAddress) public  onlyOwner {
    _addMember(_organizationAddress, _userAddress, msg.sender);
  }
  
  function removeMember(address _userAddress) public {
    _removeMember(msg.sender, _userAddress, msg.sender);
  }
  
  function proxyRemoveMember(address _organizationAddress, address _userAddress) public onlyOwner {
    _removeMember(_organizationAddress, _userAddress, msg.sender);
  }
  
  function setName(bytes32 _newName) public {
    _setName(msg.sender, _newName, msg.sender);
  }
  
  function proxySetName(address _userAddress, bytes32 _newName) public onlyOwner {
    _setName(_userAddress, _newName, msg.sender);
  }
  
  function setRole(uint256 _roleValue) public {
    _setRole(msg.sender, _roleValue, msg.sender);
  }
  
  function proxySetRole(address _userAddress, uint256 _roleValue) public onlyOwner {
    _setRole(_userAddress, _roleValue, msg.sender);
  }
  
  function setSocialMedia(uint256 _socialMediaIndex, bytes32 _newSocialMedia) public {
    _setSocialMedia(msg.sender, _socialMediaIndex, _newSocialMedia, msg.sender);
  }
  
  function proxySetSocialMedia(address _userAddress, uint256 _socialMediaIndex, bytes32 _newSocialMedia1) public onlyOwner {
    _setSocialMedia(_userAddress, _socialMediaIndex, _newSocialMedia1, msg.sender);
  }
  
  /* privates */
  function _deleteAccount(address _userAddress, address _caller) private isUser(_userAddress) {
    uint256 userId = usersIndex[_userAddress];
    delete usersArray[userId];
    emit OnDeleteAccount(_userAddress, _caller);
  }
    
  function _addMember(address _organizationAddress, address _userAddress, address _caller) private addressNotMember(_userAddress) {
    require(users[_organizationAddress].role == Role.ORGANIZATION);
    memberOf[_userAddress] = _organizationAddress;
    uint256 memberId = users[_organizationAddress].members.push(_userAddress) - 1;
    membersIndex[_userAddress] = memberId;
    emit OnAddMember(_organizationAddress, _userAddress, _caller);
  }
    
  function _removeMember(address _organizationAddress, address _userAddress, address _caller) private {
    require(users[_organizationAddress].role == Role.ORGANIZATION);
    require(users[_organizationAddress].members.length > 0);
    require(memberOf[_userAddress] == _organizationAddress);
    memberOf[_userAddress] = 0x0;

    for (uint256 i = membersIndex[_userAddress]; i < users[_organizationAddress].members.length.sub(1); i = i.add(1)) {
      users[_organizationAddress].members[i] = users[msg.sender].members[i.add(1)];
    }

    users[_organizationAddress].members.length = users[_organizationAddress].members.length.sub(1);
    delete membersIndex[_userAddress];

    emit OnRemoveMember(_organizationAddress, _userAddress, _caller);
  }
  
  function _setName(address _userAddress, bytes32 _newName, address _caller) private isUser(_userAddress) {
    if (users[_userAddress].role == Role.ORGANIZATION) {
      require(_newName != 0x0);
    }
    
    users[_userAddress].name = _newName;
    emit OnSetName(_userAddress, users[_userAddress].name, _caller);
  }
  
  function _setRole(address _userAddress, uint256 _roleValue, address _caller) private isUser(_userAddress) {
    require(_roleValue != 0);

    if (_roleValue == uint256(Role.ORGANIZATION)) {
      require(users[_userAddress].name != 0x0);
    }
    
    users[_userAddress].role = Role(_roleValue);
    emit OnSetRole(_userAddress, uint256(users[_userAddress].role), _caller);
  }

  function _setSocialMedia(
    address _userAddress,
    uint256 _socialMediaIndex,
    bytes32 _newSocialMedia,
    address _caller
  )
    private
    isUser(_userAddress)
  {
    users[_userAddress].socialMedia[_socialMediaIndex] = _newSocialMedia;
    emit OnSetSocialMedia(_userAddress, _socialMediaIndex, users[_userAddress].socialMedia[_socialMediaIndex], _caller);
  }

}

contract Factory is Authentication {
  using SafeMath for uint256;

  address[] public deployedPosts;
  uint256 public postsCount;

  mapping (address => uint256) public userPostsCount;

  function createPost(
    bytes32 _title,
    bytes32 _description, 
    bytes32 _contentHash,
    bytes32 _language,
    uint256 _date,
    uint256 _length,
    uint256 _viewFee,
    uint256 _viewFeePercentage,
    uint256 _paymentOption,
    uint256 _state,
    uint256 _category,
    uint256 _pType,
    uint256 _level
  )
    public
    isUser(msg.sender)
  {
    address newPost = new Post(
      msg.sender,
      _title,
      _description,
      _contentHash,
      _language,
      _date,
      _length,
      _viewFee,
      _viewFeePercentage,
      _paymentOption,
      _state,
      _category,
      _pType,
      _level
    );

    deployedPosts.push(newPost);
    postsCount = postsCount.add(1);

    users[msg.sender].posts.push(newPost);
    userPostsCount[msg.sender] = userPostsCount[msg.sender].add(1);
  }
  
  function getDeployedPosts() public view returns (address[]) {
    return deployedPosts;
  }
  
  function getUserPosts(address _userAddress) public view isUser(_userAddress) returns (address[]) {
    return users[_userAddress].posts;
  }
  
}

contract Post is Ownable {
  using SafeMath for uint256;
    
  enum PaymentOption { REGULAR, ORGANIZATION }
  enum State { DRAFT, PUBLISHED, ARCHIVED }
  enum Category { PROGRAMMING, MATH }
  enum PType { AUDIO, TEXT, VIDEO }
  enum Level { INTRODUCTORY, BEGINNER, INTERMEDIATE, ADVANCED }

  bytes32 public title;
  bytes32 public description;
  bytes32 public contentHash; // content IPFS hash
  bytes32 public language;
  uint256 public date; // date uploaded
  uint256 public length; // in seconds
  uint256 public views;
  uint256 public viewFee; // The amount of WEI to be sent to a Viewer (User) per unique View
  uint256 public viewFeePercentage; // The amount of WEI to be sent to the Post creator if s/he is a Member of of an Organization
  uint256 public upVotes;
  uint256 public downVotes;
  PaymentOption public paymentOption;
  State public state;
  Category public category;
  PType public pType;
  Level public level;

  mapping(address => bool) public viewers; // Keep track of unique viwers
  mapping(address => bool) public hasVoted; // Keep track of who has voted

  event OnPoolIncreased(address _payer, uint256 _value);
  event OnView(address _postAddress, address _viewerAddress, uint256 _viewsCount);
  event OnPay(address _postAddress, address _payTo, uint256 _viewFee, uint256 _viewFeePercentage, uint256 _postBalance);
  event OnVote(address _postAddress, address _voterAddress, bool _voteVal, uint256 _voteCount);

  /* updates */
  event OnSetTitle(address _postAddress, bytes32 _newTitle);
  event OnSetDescription(address _postAddress, bytes32 _newDescription);
  event OnSetContentHash(address _postAddress, bytes32 _newContentHash);
  event OnSetLanguage(address _postAddress, bytes32 _newContentHash);
  event OnSetDate(address _postAddress, uint256 _newDate);
  event OnSetLength(address _postAddress, uint256 _newLength);
  event OnSetViewFee(address _postAddress, uint256 _newViewFee);
  event OnSetViewFeePercentage(address _postAddress, uint256 _newViewFeePercentage);
  event OnSetPaymentOption(address _postAddress, uint256 _newPaymentOption);
  event OnSetState(address _postAddress, uint256 _newState);
  event OnSetCategory(address _postAddress, uint256 _newCategory);
  event OnSetType(address _postAddress, uint256 _newPType);
  event OnSetLevel(address _postAddress, uint256 _newLevel);

  function Post(
    address _creator,
    bytes32 _title,
    bytes32 _description,
    bytes32 _contentHash,
    bytes32 _language,
    uint256 _date,
    uint256 _length,
    uint256 _viewFee,
    uint256 _viewFeePercentage,
    uint256 _paymentOption,
    uint256 _state,
    uint256 _category,
    uint256 _pType,
    uint256 _level
  )
    public
  {
    owner = _creator;
    title = _title;
    description = _description;
    contentHash = _contentHash;
    language = _language;
    date = _date;
    length = _length;
    viewFee = _viewFee;
    viewFeePercentage = _viewFeePercentage;
    paymentOption = PaymentOption(_paymentOption);
    state = State(_state);
    category = Category(_category);
    pType = PType(_pType);
    level = Level(_level);
  }

  function increasePool() payable public {
    emit OnPoolIncreased(msg.sender, msg.value);
  }
  
  function getPostSummary() public view returns(
    address,
    bytes32,
    bytes32,
    bytes32,
    bytes32,
    uint256,
    uint256,
    uint256,
    uint256,
    uint256,
    uint256,
    uint256
  ) {
    return(
      owner,
      title,
      description,
      contentHash,
      language,
      address(this).balance,
      date,
      length,
      views,
      viewFee,
      upVotes,
      downVotes
    );
  }
  
  function getPostSummaryEnums() public view returns(
    uint256,
    uint256,
    uint256,
    uint256,
    uint256
  )
  {
    return(
      uint256(paymentOption),
      uint256(state),
      uint256(category),
      uint256(pType),
      uint256(level)
    );
  }

  function viewPost() public  {
    if (!viewers[msg.sender]) {
      _pay();
      views = views.add(1);
      emit OnView(address(this), msg.sender, views);
    } else {
      views = views.add(1);
      emit OnView(address(this), msg.sender, views);
    }
  }
  
  function _pay() private {
    require(address(this).balance > viewFee);
      
    if (paymentOption == PaymentOption.ORGANIZATION) {
      msg.sender.transfer(viewFee);
      owner.transfer((viewFee / 100) * viewFeePercentage);
      emit OnPay(address(this), msg.sender, viewFee, viewFeePercentage, address(this).balance);
    } else {
      msg.sender.transfer(viewFee);
      emit OnPay(address(this), msg.sender, viewFee, viewFeePercentage, address(this).balance);
    }
    
    viewers[msg.sender] = true;
  }
  
  function vote(bool _voteVal) public {
    require(viewers[msg.sender]);
    require(!hasVoted[msg.sender]);
    hasVoted[msg.sender] = true;
    
    if (_voteVal) {
        upVotes = upVotes.add(1);
        emit OnVote(address(this), msg.sender, _voteVal, upVotes);   
    } else {
        downVotes = downVotes.add(1);
        emit OnVote(address(this), msg.sender, _voteVal, downVotes);
    }
  }

  function setTitle(bytes32 _newTitle) public onlyOwner {
    title = _newTitle;
    emit OnSetTitle(address(this), title);
  }

  function setDescription(bytes32 _newDescription) public onlyOwner {
    description = _newDescription;
    emit OnSetDescription(address(this), description);
  }

  function setContentHash(bytes32 _newContentHash) public onlyOwner {
    contentHash = _newContentHash;
    emit OnSetContentHash(address(this), contentHash);
  }

  function setLanguage(bytes32 _newLanguage) public onlyOwner {
    language = _newLanguage;
    emit OnSetLanguage(address(this), language);
  }

  function setDate(uint256 _newDate) public onlyOwner {
    date = _newDate;
    emit OnSetDate(address(this), date);
  }

  function setLength(uint256 _newLength) public onlyOwner {
    length = _newLength;
    emit OnSetLength(address(this), length);
  }
  
  function setViewFee(uint256 _newViewFee) public onlyOwner {
    viewFee = _newViewFee;
    emit OnSetViewFee(address(this), viewFee);
  }

  function setViewFeePercentage(uint256 _newViewFeePercentage) public onlyOwner {
    viewFeePercentage = _newViewFeePercentage;
    emit OnSetViewFeePercentage(address(this), viewFeePercentage);
  }

  function setPaymentOption(uint256 _newPaymentOption) public onlyOwner {
    paymentOption = PaymentOption(_newPaymentOption);
    emit OnSetPaymentOption(address(this), uint256(paymentOption));
  }

  function setState(uint256 _newState) public onlyOwner {
    state = State(_newState);
    emit OnSetState(address(this), uint256(state));
  }

  function setCategory(uint256 _newCategory) public onlyOwner {
    category = Category(_newCategory);
    emit OnSetCategory(address(this), uint256(category));
  }

  function setType(uint256 _newPType) public onlyOwner {
    pType = PType(_newPType);
    emit OnSetType(address(this), uint256(pType));
  }

  function setLevel(uint256 _newLevel) public onlyOwner {
    level = Level(_newLevel);
    emit OnSetLevel(address(this), uint256(level));
  }
    
}