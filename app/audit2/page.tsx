'use client'
import React, { useState } from 'react';
import Navbar from "../components/Navbar";

interface Vulnerability {
  title: string;
  description: string;
 
}

const vulnerabilities: Vulnerability[] = [
  {
    title: 'Reentrancy in CashOut Function',
    description: 'The use of msg.sender.call.value(_am)() for sending Ether allows for reentrancy attacks. This is because the call is made before the sender\'s balance is updated (balances[msg.sender]-=_am;). An attacker could recursively call the CashOut function within a fallback function to drain the contract\'s funds.',
   
  },
  {
    title: 'Outdated Compiler Version',
    description: 'The contract specifies the use of Solidity version 0.4.19, which is outdated and lacks many security improvements and features found in later versions. Using an old compiler version can expose the contract to known vulnerabilities and limit its efficiency and security.',
    
  },
  {
    title: 'Lack of Access Control',
    description: 'The AddMessage function in the Log contract is public and does not restrict who can call it. This might lead to spam or manipulation of the log by unauthorized parties.',
    
  },
  {
    title: 'Use of now for Timestamps',
    description: 'The use of now (alias for block.timestamp) for logging time is manipulable by miners to a certain degree and should not be relied upon for critical time-sensitive logic.',

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
          <h2 className="text-2xl font-bold">Vulnerabilities & Security Issues <span className="text-red-500 text-3xl">56</span></h2>
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
          <h2 className="text-2xl font-bold">Optimization Recommendations <span className="text-red-500 text-3xl">40</span></h2>
            <div className="bg-gray-600 p-3 rounded-md hover:bg-gray-500 my-2">
              <p>Upgrade the Solidity compiler version to incorporate latest security features and optimizations.</p>
              <p>Implement function modifiers for input validation and ensuring that the contracts state is correct before proceeding with execution.</p>
              <p>Replace the now keyword with block.timestamp, and consider implications of miner-controlled timestamp manipulation.</p>
              <p>Secure the CashOut function against reentrancy attacks by updating the contracts state before calling external contracts.</p>
            </div>
            <a href="https://sepolia.arbiscan.io/token/0xc5d06666509f1010b77500c92fc9a1d4324c7964?a=1#code" className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4 lg:mr-20">
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
                      
                      interface ILog {
                          function AddMessage(address _adr, uint _val, string calldata _data) external;
                      }
                      
                      contract Private_Bank {
                          mapping(address => uint) public balances;
                          uint public MinDeposit = 1 ether;
                          ILog private TransferLog;
                      
                          constructor(address _log) {
                              TransferLog = ILog(_log);
                          }
                      
                          function Deposit() external payable {
                              require(msg.value >= MinDeposit, "Deposit must be at least 1 ether");
                              balances[msg.sender] += msg.value;
                              TransferLog.AddMessage(msg.sender, msg.value, "Deposit");
                          }
                      
                          function CashOut(uint _am) external {
                              require(_am <= balances[msg.sender], "Insufficient funds");
                              balances[msg.sender] -= _am; // Update the balance first to prevent reentrancy
                              (bool sent,) = msg.sender.call{value: _am}("");
                              require(sent, "Failed to send Ether");
                              TransferLog.AddMessage(msg.sender, _am, "CashOut");
                          }
                      
                          // Fallback function to accept Ether.
                          receive() external payable {}
                      }
                      
                      contract Log {
                          struct Message {
                              address Sender;
                              string Data;
                              uint Val;
                              uint Time;
                          }
                      
                          Message[] public History;
                      
                          function AddMessage(address _adr, uint _val, string calldata _data) external {
                              History.push(Message({
                                  Sender: _adr,
                                  Data: _data,
                                  Val: _val,
                                  Time: block.timestamp
                              }));
                          }
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
