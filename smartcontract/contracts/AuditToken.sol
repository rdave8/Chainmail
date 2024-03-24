// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AuditToken is ERC721 {
    uint256 public tokenCounter;

    struct TokenMetadata {
        string[] vulnerabilities;
        uint32 securityScore;
        uint32 gasScore;
    }

    mapping(uint256 => TokenMetadata) public tokenMetadata;

    constructor() ERC721("Audit Proof Token", "APT") {
        tokenCounter = 0;
    }

    function mint(string[] memory _vulnerabilities, uint _securityScore, uint _gasScore) public returns (address) {
        _safeMint(msg.sender, tokenCounter);
        tokenMetadata[tokenCounter] = TokenMetadata({
            vulnerabilities: _vulnerabilities,
            securityScore: uint32(_securityScore),
            gasScore: uint32(_gasScore)
        });
        tokenCounter++;
        address tokenAddress = address(this);
        return tokenAddress;
    }
}
