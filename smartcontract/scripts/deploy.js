const hre = require("hardhat");

async function main() {
  try {

    const [deployer] = await ethers.getSigners();

    const Contract = await hre.ethers.getContractFactory("AuditToken");

    const contract = await Contract.deploy();

    const address = await contract.getAddress();

    console.log(address);

  } catch (error) {
        console.error(error);
    process.exit(1);
  }
}

main();