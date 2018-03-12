pragma solidity ^0.4.21;

import "./zeppelin-solidity/Ownable.sol";
import "./zeppelin-solidity/SafeMath.sol";


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

  modifier onlyValidRole(uint256 _roleValue) {
    require(_roleValue != 0);
    require(uint256(Role.ORGANIZATION) >= _roleValue);
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
  
  /** @dev Login form.
  * @dev Using modifiers: 
  * isUser (only an existing User can access this function)
  */
  function login() public view isUser(msg.sender)
    returns(
      uint256,
      bytes32,
      bytes32[3],
      address[],
      address[]
    )
    {
      User memory user = users[msg.sender];
        
      return (
        uint256(user.role),
        user.name,
        user.socialMedia,
        user.posts,
        user.members
      );
  }

  function signup(uint256 _roleValue, bytes32 _name)
    public
    notSignedUp
    onlyValidRole(_roleValue)
    returns(
      uint256,
      bytes32,
      bytes32[3],
      address[],
      address[]
    )
    {
      if (_roleValue == uint256(Role.ORGANIZATION)) {
        require(_name != 0x0);
      }

      uint256 userId = usersArray.push(msg.sender) - 1;
      usersIndex[msg.sender] = userId;
      
      User storage user = users[msg.sender];
      user.role = Role(_roleValue);
      user.name = _name;
    
      return (
        uint256(user.role),
        user.name,
        user.socialMedia,
        user.posts,
        user.members
      );
      
      emit OnSignup(msg.sender, uint256(user.role));
  }
  
  function getProfile(address _userAddress)
    public
    view
    isUser(_userAddress) 
    returns(
      uint256,
      bytes32,
      bytes32[3],
      address[],
      address[]
    )
    {
    User memory user = users[msg.sender];
    
    return(
      uint256(user.role),
      user.name,
      user.socialMedia,
      user.posts,
      user.members
    );
  }
  
  function deleteAccount() public {
    _deleteAccount(msg.sender, msg.sender);
  }

  function proxyDeleteAccount(address _userAddress) public onlyOwner {
    _deleteAccount(_userAddress, msg.sender);
  }
  
  function addMember(address _userAddress) public onlyOrganization(msg.sender) { 
    _addMember(msg.sender, _userAddress, msg.sender);
  }
  
  function proxyAddMember(
    address _organizationAddress,
    address _userAddress
  )
    public
    onlyOwner
    onlyOrganization(_organizationAddress)
  {
    _addMember(_organizationAddress, _userAddress, msg.sender);
  }
  
  function removeMember(address _userAddress) public onlyOrganization(msg.sender) {
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
  
  
  function proxySetRole(address _userAddress, uint256 _roleValue) public onlyOwner {
    _setRole(_userAddress, _roleValue, msg.sender);
  }
  
  function setSocialMedia(uint256 _socialMediaIndex, bytes32 _newSocialMedia) public {
    _setSocialMedia(msg.sender, _socialMediaIndex, _newSocialMedia, msg.sender);
  }
  
  function proxySetSocialMedia(
    address _userAddress,
    uint256 _socialMediaIndex,
    bytes32 _newSocialMedia1
  )
    public
    onlyOwner
  {
    _setSocialMedia(_userAddress, _socialMediaIndex, _newSocialMedia1, msg.sender);
  }
  
  /* privates */
  function _deleteAccount(address _userAddress, address _caller) private isUser(_userAddress) {
    uint256 userId = usersIndex[msg.sender];
    delete usersArray[userId];
    emit OnDeleteAccount(_userAddress, _caller);
  }
    
  function _addMember(
    address _organizationAddress,
    address _userAddress,
    address _caller
  )
    private
    addressNotMember(_userAddress)
  {
    memberOf[_userAddress] = _organizationAddress;
    uint256 memberId = users[_organizationAddress].members.push(_userAddress) - 1;
    membersIndex[_userAddress] = memberId;
    emit OnAddMember(_organizationAddress, _userAddress, _caller);
  }
    
  function _removeMember(
    address _organizationAddress,
    address _userAddress,
    address _caller
  )
    private
  {
    require(users[_organizationAddress].members.length > 0);
    require(memberOf[_userAddress] != address(0));

    for (uint256 i = membersIndex[_userAddress]; i < users[_organizationAddress].members.length.sub(1); i = i.add(1)) {
      users[_organizationAddress].members[i] = users[msg.sender].members[i.add(1)];
    }

    users[_organizationAddress].members.length = users[_organizationAddress].members.length.sub(1);
    
    emit OnRemoveMember(_organizationAddress, _userAddress, _caller);
  }
  
  function _setName(
    address _userAddress,
    bytes32 _newName,
    address _caller
  )
    private
    isUser(_userAddress)
  {
    if (users[_userAddress].role == Role.ORGANIZATION) {
      require(_newName != 0x0);
    }
    
    users[_userAddress].name = _newName;
    emit OnSetName(_userAddress, users[_userAddress].name, _caller);
  }
  
  function _setRole(
    address _userAddress,
    uint256 _roleValue,
    address _caller
  )
    private
    isUser(_userAddress)
    onlyValidRole(_roleValue)
  {
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