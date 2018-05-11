pragma solidity ^0.4.23;

import "browser/DataPacking.sol";
import "browser/SafeMath.sol";
import "browser/UserOverall.sol";

contract PostStorage is UserRegular {
    using SafeMath for uint256;
    using DataPacking for bytes32;
    
    string[] public postHashes;
    uint256 public postCount;
    
    mapping (uint256 => address) public postOwner;
    mapping (uint256 => bytes32) public base;
    mapping (uint256 => bytes32) public votes;
    
    function createPost(string _hash, uint256 _viewPrice, uint256 _viewPricePercentage) public payable {
        require(users[msg.sender].role != Users.Role(0));
        postHashes.push(_hash);
        postOwner[postCount] = msg.sender;
        
        bytes32 packedBase;
        packedBase = packedBase.setData(msg.value, 0, 64);
        packedBase = packedBase.setData(_viewPrice, 64, 32);
        packedBase = packedBase.setData(_viewPricePercentage, 95, 8);
        
        base[postCount] = packedBase;
        postCount = postCount.add(1);
    }
    
    function unpackPost(uint256 _postId) public view returns (string, uint256, uint256, uint256, uint256, uint256) {
        bytes32 packedBase = base[_postId];
        bytes32 packedVotes = votes[_postId];
        
        return (
            postHashes[_postId],
            packedBase.getData(0, 64),
            packedBase.getData(64, 32),
            packedBase.getData(95, 8),
            packedVotes.getData(0, 128), // upvotes
            packedVotes.getData(128, 128) // downvotes
        );
    }
}

contract PostBalance is PostStorage {
    event OnDeposit (uint256 postId, uint256 amount, address caller);
    event OnWithdraw (uint256 postId, uint256 amount, address caller);
    
    function deposit(uint256 _postId) public payable {
        bytes32 packedBase = base[_postId];
        uint256 balance = packedBase.getData(0, 64);
        
        balance = balance.add(msg.value);
        packedBase = packedBase.setData(balance, 0, 64);
        base[_postId] = packedBase;
        
        emit OnDeposit(_postId, msg.value, msg.sender);
    }
    
    function withdraw(uint256 _postId, uint256 _amount) public {
        require(postOwner[_postId] == msg.sender);
        bytes32 packedBase = base[_postId];
        uint256 balance = packedBase.getData(0, 64);
        require(balance >= _amount);
        
        balance = balance.sub(_amount);
        packedBase = packedBase.setData(balance, 0, 64);
        base[_postId] = packedBase;
        
        emit OnWithdraw(_postId, _amount, msg.sender);
        msg.sender.transfer(_amount);
    }
}

contract PostView is PostBalance {
    mapping (uint256 => mapping (address => bool)) public hasViewed;
    
    event OnView (uint256 indexed postId, address indexed caller);
    
    function viewPost(uint256 _postId) public {
        _payViewer(_postId);
        _storeView(_postId);
    }
    
    function _storeView(uint256 _postId) private {
        hasViewed[_postId][msg.sender] = true;
        emit OnView(_postId, msg.sender);
    }
    
    function _payViewer(uint256 _postId) private {
        require(!hasViewed[_postId][msg.sender]);
        bytes32 packedBase = base[_postId];
        uint256 balance = packedBase.getData(0, 64);
        uint256 viewPrice = packedBase.getData(64, 32);
        
        require(balance >= viewPrice);
        
        balance = balance.sub(viewPrice);
        packedBase = packedBase.setData(balance, 0, 64);
        base[_postId] = packedBase;
        
        msg.sender.transfer(viewPrice);
    }
}

contract PostVote is PostView {
    event OnVote (uint256 indexed postId, bool indexed value, address indexed caller);
    
    function vote(uint256 _postId, bool _value) public {
        require(users[msg.sender].role != Users.Role(0));
        bytes32 packedVotes = votes[_postId];
        uint256 upvotes = packedVotes.getData(0, 128);
        uint256 downvotes = packedVotes.getData(128, 128);
        
        if (_value) {
            upvotes = upvotes.add(1);
            packedVotes = packedVotes.setData(upvotes, 0, 128);
        } else {
            downvotes = downvotes.add(1);
            packedVotes = packedVotes.setData(downvotes, 128, 128);
        }
        
        votes[_postId] = packedVotes;
        emit OnVote(_postId, _value, msg.sender);
    }
}

contract PostSet is PostVote {
    function setHash(uint256 _postId, string _newHash) public {
        require(postOwner[_postId] == msg.sender);
        postHashes[_postId] = _newHash;
    }
    
    function setViewPrice(uint256 _postId, uint256 _newViewPrice) public {
        require(postOwner[_postId] == msg.sender);
        bytes32 packedBase = base[_postId];
        packedBase = packedBase.setData(_newViewPrice, 64, 32);
        base[_postId] = packedBase;
    }
    
    function setViewPricePercentage(uint256 _postId, uint256 _newViewPricePercentage) public {
        require(postOwner[_postId] == msg.sender);
        bytes32 packedBase = base[_postId];
        packedBase = packedBase.setData(_newViewPricePercentage, 95, 8);
        base[_postId] = packedBase;
    }
    
    /* transaction cost: 41 069 -/- execution cost: 18 325 */
    function setPost(uint256 _postId, string _newHash, uint256 _newViewPrice, uint256 _newViewPricePercentage) public {
        require(postOwner[_postId] == msg.sender);
        postHashes[_postId] = _newHash;
        bytes32 packedBase = base[_postId];
        packedBase = packedBase.setData(_newViewPrice, 64, 32);
        packedBase = packedBase.setData(_newViewPricePercentage, 95, 8);
        base[_postId] = packedBase;
    }
}

contract PostDelete is PostSet {
    event OnDelete(uint256 postId, address caller);
    
    function deletePost(uint256 _postId) public {
        require(postOwner[_postId] == msg.sender);
        bytes32 packedBase = base[_postId];
        uint256 balance = packedBase.getData(0,  64);
        emit OnDelete(_postId, msg.sender);
        msg.sender.transfer(balance);
        delete postHashes[_postId];
        delete base[_postId];
        delete votes[_postId];
    }
}