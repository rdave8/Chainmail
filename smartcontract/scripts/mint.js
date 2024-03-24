const hre = require("hardhat");

async function main() {
    const contractAddress = "0xc5d06666509f1010b77500c92FC9A1d4324C7964";
    const myContract = await hre.ethers.getContractAt("AuditToken", contractAddress);
    
    const mintToken = await myContract.mint(["Reentrancy", "Old Compiler Version", "No Access Control"], 56, 40);

    console.log("Trx hash:", mintToken.hash);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });