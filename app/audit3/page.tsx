'use client'
import React, { useState } from 'react';
import Navbar from "../components/Navbar";

interface Vulnerability {
  title: string;
  description: string;
 
}

const vulnerabilities: Vulnerability[] = [
  {
    title: 'Approval and TransferFrom Mechanisms',
    description: 'The contract includes an approveAndCall function, allowing tokens to be spent and notifying the contract in a single transaction. While this is a useful feature, its crucial to be aware of the potential for reentrancy attacks if interacting with untrusted contracts. It seems to handle calls securely by setting allowances before making external calls, minimizing the risk.',
   
  },
  
  // Add other vulnerabilities as needed
];

const optimizations: string[] = [
  'Upgrade the Solidity compiler version to incorporate latest security features and optimizations.',
  // Add other optimizations as needed
];

const AuditReport: React.FC = () => {
  const [showCodePopup, setShowCodePopup] = useState<boolean>(false);

  return (
    <><Navbar></Navbar>  
    <div className="bg-gray-800 text-white font-sans min-h-screen p-5">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Smart Contract Audit Summary</h1>
        <p>An overview of the audit findings, vulnerabilities, and optimization suggestions for the smart contract.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h2 className="text-2xl font-bold">Vulnerabilities & Security Issues <span className="text-green-500 text-3xl">94</span></h2>
          {vulnerabilities.map((vul, index) => (
            <>
            <div key={index} className="bg-gray-600 p-3 rounded-md hover:bg-gray-500 my-2">
              <h3 className="font-bold">{vul.title}</h3>
              <p>{vul.description}</p>
            </div>
            
            </>
          ))}
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h2 className="text-2xl font-bold">Optimization Recommendations <span className="text-green-500 text-3xl">97</span></h2>
            <div className="bg-gray-600 p-3 rounded-md hover:bg-gray-500 my-2">
              <p>Redundant SafeMath: Since Solidity ^0.8.0 includes overflow checks, the explicit use of SafeMath could be removed to optimize gas costs. Although it doesn't hurt security, it's not necessary and adds to the contract's complexity and deployment cost.</p>
              <p>While useful, the ability to freeze accounts introduces centralization risk. This feature's necessity should be carefully weighed against the token's intended use case. Consideration for a decentralized governance model for such actions might be more favorable for community trust.</p>
            </div>
            <a href="https://sepolia.arbiscan.io/token/0xc5d06666509f1010b77500c92fc9a1d4324c7964?a=2#inventory" className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4 lg:mr-20">
              View Token
            </a>

            <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowCodePopup(true)}>
              View Improved Code
            </button>
        </div>
      </div>

      {showCodePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-gray-700">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-white">Improved Contract Code</h3>
              <div className="mt-2 px-7 py-3 bg-gray-800 text-white rounded-lg text-left">
                {/* Improved contract code here, properly formatted */}
                <pre className="overflow-x-auto">
                  <code>
                    {`
                      // SPDX-License-Identifier: MIT
                      pragma solidity ^0.8.0;
                      
                      contract Owned {
                          address public owner;
                      
                          event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
                      
                          constructor() {
                              owner = msg.sender;
                          }
                      
                          modifier onlyOwner() {
                              require(msg.sender == owner, "Caller is not the owner");
                              _;
                          }
                      
                          function transferOwnership(address newOwner) public onlyOwner {
                              require(newOwner != address(0), "Invalid address");
                              emit OwnershipTransferred(owner, newOwner);
                              owner = newOwner;
                          }
                      }
                      
                      interface TokenRecipient {
                          function receiveApproval(address _from, uint256 _value, address _token, bytes calldata _extraData) external;
                      }
                      
                      contract TokenERC20 {
                          string public name;
                          string public symbol;
                          uint8 public decimals = 18;
                          uint256 public totalSupply;
                      
                          mapping(address => uint256) public balanceOf;
                          mapping(address => mapping(address => uint256)) public allowance;
                      
                          event Transfer(address indexed from, address indexed to, uint256 value);
                          event Approval(address indexed owner, address indexed spender, uint256 value);
                      
                          constructor(string memory tokenName, string memory tokenSymbol) {
                              name = tokenName;
                              symbol = tokenSymbol;
                          }
                      
                          function _transfer(address _from, address _to, uint256 _value) internal {
                              require(_to != address(0), "Transfer to the zero address");
                              require(balanceOf[_from] >= _value, "Insufficient balance");
                              require(balanceOf[_to] + _value >= balanceOf[_to], "Transfer amount overflows");
                              balanceOf[_from] -= _value;
                              balanceOf[_to] += _value;
                              emit Transfer(_from, _to, _value);
                          }
                      
                          function transfer(address _to, uint256 _value) public returns (bool success) {
                              _transfer(msg.sender, _to, _value);
                              return true;
                          }
                      
                          function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
                              require(_value <= allowance[_from][msg.sender], "Insufficient allowance");
                              allowance[_from][msg.sender] -= _value;
                              _transfer(_from, _to, _value);
                              return true;
                          }
                      
                          function approve(address _spender, uint256 _value) public returns (bool success) {
                              allowance[msg.sender][_spender] = _value;
                              emit Approval(msg.sender, _spender, _value);
                              return true;
                          }
                      
                          function approveAndCall(address _spender, uint256 _value, bytes memory _extraData) public returns (bool success) {
                              TokenRecipient spender = TokenRecipient(_spender);
                              if (approve(_spender, _value)) {
                                  spender.receiveApproval(msg.sender, _value, address(this), _extraData);
                                  return true;
                              }
                          }
                      }
                      
                      contract MyAdvancedToken is Owned, TokenERC20 {
                          mapping(address => bool) public frozenAccount;
                      
                          event FrozenFunds(address target, bool frozen);
                      
                          constructor(string memory tokenName, string memory tokenSymbol) TokenERC20(tokenName, tokenSymbol) {}
                      
                          function _transfer(address _from, address _to, uint256 _value) internal override {
                              require(!frozenAccount[_from], "Sender account is frozen");
                              require(!frozenAccount[_to], "Recipient account is frozen");
                              super._transfer(_from, _to, _value);
                          }
                      
                          function freezeAccount(address target, bool freeze) public onlyOwner {
                              frozenAccount[target] = freeze;
                              emit FrozenFunds(target, freeze);
                          }
                      
                          // Additional functions such as 'mint', 'burn' could be added here to extend functionality further, ensuring to include proper access controls and emitting events where appropriate.
                      }
                      
                      
                    `}
                  </code>
                </pre>
              </div>
              <div className="items-center px-4 py-3">
                <button onClick={() => setShowCodePopup(false)} className="px-4 py-2 bg-red-500 p-3 rounded-lg text-white hover:bg-red-400">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default AuditReport;
