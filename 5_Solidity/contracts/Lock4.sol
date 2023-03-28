// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Lock4 {
    uint256 immutable public unlockTime;
    address payable public owner;
    string constant public name = "My Name";
    uint256 public blockNumber;
    uint constant canWithdraw = 1;

    mapping (address => uint) public ownersMap;
    uint public numOwners = 0;

    event Withdrawal(uint amount, uint when);
    event WithdrawalAttempt(address withddraw);

    constructor() payable {
        console.log("I'm in the LOCK Constructor!");
        unlockTime = 1679479934;
        owner = payable(msg.sender);
        blockNumber = block.number;
        addOwner(msg.sender);
    }

    function addOwner(address addr)  public {
        // Update the value at this address
        
        if (ownersMap[addr]== 0){      // if owner not registered yet
            numOwners += 1;
            ownersMap[addr] = 1;
        }
        return;
    }

    function getOwner(address addr) public view returns (uint){
        return ownersMap[addr];
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        emit WithdrawalAttempt(owner);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        // require(msg.sender == owner, "You aren't the owner");
        // require(ownersMap[owner] == canWithdraw, "Cannot withdraw more than once!!!");

        emit Withdrawal(address(this).balance, block.timestamp);
        uint toWithdraw = address(this).balance / numOwners;

        console.log("Balance:", address(this).balance / (10**18));
        console.log("withdrawable:", toWithdraw / (10**18)); // convert wei to ether

        if (ownersMap[owner] == canWithdraw){
            ownersMap[owner] += 1;
            owner.transfer(toWithdraw);
            numOwners -= 1;
        } else {
            console.log("Cannot withdraw more than once!!!");
        }
        
        
    }
}
