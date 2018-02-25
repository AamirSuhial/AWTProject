pragma solidity ^0.4.17;

contract Adoption {
    address[16] public adopters;
    string constant staticHash = "QmNmSbUmvMcQoD2B2q9HozjRyT3WKjxAWNMC4yTXzv3z9y";
    
    // Adopting a Music
    function adopt(uint musicId) public returns (uint) {
        require(musicId >= 0 && musicId <= 15);

        adopters[musicId] = msg.sender;

        return musicId;
    }
    
    // Retrieving the adopters
    function getAdopters() public view returns (address[16]) {
        return adopters;
    }

    function getMusicHash() public pure returns (string) {
        return staticHash;
    }
}