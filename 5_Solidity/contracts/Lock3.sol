// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Lock3 {
    uint256 immutable public unlockTime;
    address payable public owner;
    string constant public name = "My Name";
    uint256 public blockNumber;

    event Withdrawal(uint amount, uint when);
    event WithdrawalAttempt(address withddraw);

    constructor() payable {
        console.log("I'm in the LOCK Constructor!");
        unlockTime = 1679479934;
        owner = payable(msg.sender);
        blockNumber = block.number;
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        emit WithdrawalAttempt(owner);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
