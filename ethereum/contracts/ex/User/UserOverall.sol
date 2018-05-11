pragma solidity ^0.4.23;

import "browser/UserGeneral.sol";

contract UserModerator is UserGeneral {
    modifier onlyModerator {
        require(users[msg.sender].role == Users.Role(3));
        _;
    }
    
    /**
     * @dev "2-in-1" create and update user
     * @param _user User address
     * @param _role User role
     * @param _profile User profile (ipfs hash)
     */
    function moderatorSet(address _user, uint256 _role, string _profile) public onlyModerator {
        setUser(_user, _role, _profile);
    }
    
    /**
     * @dev update User role
     * @param _user User address
     * @param _role new User role
     */
    function moderatorSetRole(address _user, uint256 _role) public onlyModerator {
        setRole(_user, _role);
    }
    
    /**
     * @dev update User profile
     * @param _user User address
     * @param _profile new User profile (ipfs hash)
     */
    function moderatorSetProfile(address _user, string _profile) public onlyModerator {
        setProfile(_user, _profile);
    }
    
    /**
     * @dev add Members to Organization
     * @param _organization Organzation address
     * @param _toAdd User address
     */
    function moderatorAddMember(address _organization, address[] _toAdd) public onlyModerator {
        addMembers(_organization, _toAdd);
    }
    
    /**
     * @dev remove Members from Organzation
     * @param _organization Organization address
     * @param _toRemove User address
     */
    function moderatorRemoveMember(address _organization, address[] _toRemove) public onlyModerator {
        removeMembers(_organization, _toRemove);
    }
    
    /**
     * @dev delete Organization
     * @param _organization Organization address
     */
    function moderatorDeleteOrganization(address _organization) public onlyModerator {
        for (uint256 i = 0; i < users[_organization].members.length; i++) {
            delete memberOf[users[_organization].members[i]];
            delete memberIndex[users[_organization].members[i]];
            delete managerOf[users[_organization].members[i]];
        }
        del(_organization);
    }
    
    /**
     * @dev delete User
     * @param _user User address
     */
    function moderatorDeleteRegular(address _user) public onlyModerator {
        del(_user);
    }
}

contract UserOrganization is UserModerator {
    
    /**
     * @dev add Manager to Organization
     * @param _user User address
     */
    function organizationAddManager(address _user) public {
        require(memberOf[_user] == msg.sender &&  managerOf[_user] == 0x0);
        managerOf[_user] = msg.sender;
    }
    
    /**
     * @dev remove Manager from Organization
     * @param _user User address
     */
    function organizationRemoveManager(address _user) public {
        require(memberOf[_user] == msg.sender && managerOf[_user] == msg.sender);
        delete managerOf[_user];
    }
    
    /**
     * @dev add Members to Organization
     * @param _toAdd User address
     */
    function organizationAddMember(address[] _toAdd) public {
        require(memberOf[msg.sender] == managerOf[msg.sender] || managerOf[msg.sender] == msg.sender);
        addMembers(managerOf[msg.sender], _toAdd);
    }
    
    /**
     * @dev remove Members from Organzation
     * @param _toRemove User address
     */
    function organizationRemoveMember(address[] _toRemove) public {
        require(memberOf[msg.sender] == managerOf[msg.sender] || managerOf[msg.sender] == msg.sender);
        removeMembers(managerOf[msg.sender], _toRemove);
    }
    
    /**
     * @dev delete Organization
     */
    function deleteOrganization() public {
        require(users[msg.sender].role == Users.Role(2));
        for (uint256 i = 0; i < users[msg.sender].members.length; i++) {
            delete memberOf[users[msg.sender].members[i]];
            delete memberIndex[users[msg.sender].members[i]];
            delete managerOf[users[msg.sender].members[i]];
        }
        del(msg.sender);
    }
    
}

contract UserRegular is UserOrganization {
    
    /**
     * @dev "2-in-1" create and update user
     * @param _role User role
     * @param _profile User profile (ipfs hash)
     */
    function set(uint256 _role, string _profile) public {
        require(_role == 1 || _role == 2);
        setUser(msg.sender, _role, _profile);
    }
    
    /**
     * @dev update User role
     * @param _role new User role
     */
    function setRole(uint256 _role) public {
        require(_role == 1 || _role == 2);
        setRole(msg.sender, _role);
    }
    
    /**
     * @dev update User profile
     * @param _profile new User profile (ipfs hash)
     */
    function setProfile(string _profile) public {
        setProfile(msg.sender, _profile);
    }
    
    /**
     * @dev delete User
     */
    function deleteRegular() public {
        delete memberOf[msg.sender];
        delete memberIndex[msg.sender];
        delete managerOf[msg.sender];
        del(msg.sender);
    }
    
}