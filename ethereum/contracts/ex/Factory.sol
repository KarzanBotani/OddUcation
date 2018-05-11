pragma solidity ^0.4.23;

import "browser/Post.sol";
import "browser/Ownable.sol";

contract Factory is Ownable, PostDelete {

    /**
     * @dev assign msg.sender the role of Moderator
     */
    constructor() public {
        setUser(msg.sender, 3, "unset");
    }
}