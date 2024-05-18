//SPDX-License-Identifier:MIT

pragma solidity ^0.8.20;

contract randomness {
    uint256 public randomNum;

    function generateRandomNumber(string memory _ipfsHash) public {
        bytes memory ipfsHashByte = bytes(_ipfsHash);
        randomNum = uint256(keccak256(abi.encodePacked(ipfsHashByte)));
    }
}
