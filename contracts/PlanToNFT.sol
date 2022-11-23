// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/*import "./ChainlinkExample.sol";*/

contract PlanToNFT is ERC721URIStorage, Pausable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint cycle1;
    uint cycle2;

    string[][5] IpfsUri = [
        [
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/QmeDP128Fhm9f1R9kKfEoHKWsLvuYN3ESohNVhFNBFDmEp",
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/QmaApXNyyb8ZoVByqzAToKywf6VVHUFkD7XuHcBf9CFeio",
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/QmQN8EPVkWwUzvsbk1gRnrRVXtaacnb8eRYm1Ayxbf4Q5s",
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/QmZbWBJbSFWGk4Eur1isiTdm5Rmf41695AKTt5XfCG5i9m",
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/QmWgzk4cgSeSEhCCS7KVFpXKktnCtU3Y6D7x8QTc4j1RW5"
        ],
        [
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/QmYGSSjpZHe8qTRYHm6JgL8FoNwbeRPKFJU8rrGoGJhtam",
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/QmYqn6s8wocvFvJa4aDyCgygCLvcUeVdtmrVWnxcs1ry7J",
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/Qmbno5RKVXjDtKoNdreu4X2BWsKoGajkuumn5eNXn3KzRi",
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/QmTVQwYwA1DfY7k68b7qN9AUL9vqeyMEVpPo3FyfEoEqjR",
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/Qma16vbepLNuy188zKKYT4mMoGE2sY4D53YnL8mV8MgoUv"
        ],
        [
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/QmQyjzPRou7DDXjYWvHnUjb9aQMGiMtNSRoDaqygzCFhPD",
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/QmSpLFgQCmAyHmzz5zzyYUMNqpZQ8PKNqSxzqjvFbbdoBV",
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/QmSxwrq85kkPrksczq93JQ22cdsBTEWfo2Ep63eFnG8H6o",
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/QmacLK2CBU4kcVXfSsU4CDsbSttWz71eUxpH9CpLkABAdM",
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/QmSwcdWSCTgrYaicCVzNxZG2aG6yUjNhztSNhJie6uoCyi"
        ],
        [
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/QmP5hGmFfnSxd81bqCiZycTpNakER7uixXp8p8Zj86Cd4D",
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/QmbKPZKPtnKXabEBiqxvHXrJWSpHH4SQcTjWhs9bF4H9vR",
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/QmZLDc5pmv4YaxD8qrDEwt61AXmAUgUVMtaB2JvLbRT1Yj",
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/QmXxJH16wznw2KA89nhEisATE7AYMxVFHDsVfzZDjqbvGx",
            "https://testing-nftmarketplace-joo.infura-ipfs.io/ipfs/QmXX3Bpk1MNNqK18w1TAYgziVkw35QfHPVQSP6yhbBxG92"
        ]
    ];

    mapping(uint256 => uint8) typeOfNFT;
    mapping(address => uint256) idToToken;

    constructor() ERC721("PlanToNFT", "PT-NFT") {
        cycle1 = 0;
        cycle2 = 0;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint() public payable returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        if (cycle1 >= 4) cycle1 -= 4;
        for (uint i = 0; i < 4; i++) {
            if (cycle1 == i) {
                _setTokenURI(newTokenId, IpfsUri[i][0]);
                typeOfNFT[newTokenId] = uint8(i + 1);
            }
        }
        cycle1 += 1;
        return newTokenId;
    }

    function changeNFT(uint256 tokenId)
        public
        payable
        onlyOwner
        returns (bool)
    {
        uint8 typeNFT = typeOfNFT[tokenId];
        if (cycle2 >= 5) cycle2 -= 5;
        for (uint i = 1; i <= 5; i++) {
            if (i == typeNFT) {
                _setTokenURI(tokenId, IpfsUri[typeNFT - 1][cycle2]);
            }
        }
        cycle2 += 1;
        return true;
    }

    function fetchMyNFTs() public view returns (string[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint currentIndex = 0;
        uint itemCount = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (ownerOf(i + 1) == msg.sender) {
                itemCount += 1;
            }
        }

        string[] memory items = new string[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (ownerOf(i + 1) == msg.sender) {
                uint currentId = i + 1;
                string memory currentItem = tokenURI(currentId);
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchAllNFTs() public view returns (string[] memory) {
        uint itemCount = _tokenIds.current();

        string[] memory items = new string[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            string memory currentURI = tokenURI(i + 1);
            items[i] = currentURI;
        }

        return items;
    }

    function fetchOthersNFTs() public view returns (string[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint currentIndex = 0;
        uint itemCount = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (ownerOf(i + 1) == msg.sender) {
                itemCount += 1;
            }
        }
        itemCount = totalItemCount - itemCount;

        string[] memory items = new string[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (ownerOf(i + 1) != msg.sender) {
                uint currentId = i + 1;
                string memory currentItem = tokenURI(currentId);
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
