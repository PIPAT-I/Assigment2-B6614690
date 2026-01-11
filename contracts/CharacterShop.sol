// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CharacterShop {
    
    struct Character {
        uint id;
        string name;
        uint price;
        address lastOwner;
        uint purchaseCount;
    }
    
    Character[] public characters;
    
    event CharacterPurchased(
        address indexed buyer,
        uint characterId,
        string name,
        uint timestamp
    );
    
    constructor() {
        characters.push(Character(1, "Cthoni", 0.001 ether, address(0), 0));
        characters.push(Character(2, "Engin", 0.002 ether, address(0), 0));
        characters.push(Character(3, "Fu", 0.003 ether, address(0), 0));
        characters.push(Character(4, "Guita", 0.004 ether, address(0), 0));
        characters.push(Character(5, "Jabber", 0.005 ether, address(0), 0));
        characters.push(Character(6, "Riyo", 0.006 ether, address(0), 0));
        characters.push(Character(7, "Rudo", 0.007 ether, address(0), 0));
        characters.push(Character(8, "Tamsy", 0.008 ether, address(0), 0));
        characters.push(Character(9, "Zanka", 0.009 ether, address(0), 0));
        characters.push(Character(10, "Zodyl", 0.01 ether, address(0), 0));
    }
    
    function buyCharacter(uint _id) public payable {
        require(_id >= 1 && _id <= 10, "Character does not exist");
        
        uint index = _id - 1;
        Character storage character = characters[index];
        
        require(msg.value == character.price, "Incorrect payment amount");
        
        character.lastOwner = msg.sender;
        character.purchaseCount++;
        
        emit CharacterPurchased(msg.sender, _id, character.name, block.timestamp);
    }
    
    function getAllCharacters() public view returns (Character[] memory) {
        return characters;
    }
    
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
