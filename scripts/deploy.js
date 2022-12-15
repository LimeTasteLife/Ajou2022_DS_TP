const hre = require('hardhat');
const fs = require('fs');
const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  const PlanToNFT = await hre.ethers.getContractFactory('PlanToNFT');
  const planToNFT = await PlanToNFT.deploy();
  await planToNFT.deployed();
  console.log('PlanToNFT deployed to:', planToNFT.address);

  const PlanToNFTOracle = await hre.ethers.getContractFactory(
    'PlanToNFTOracle'
  );
  const planToNFTOracle = await PlanToNFTOracle.deploy();
  await planToNFTOracle.deployed();
  console.log('PlanToNFTOracle deployed to:', planToNFTOracle.address);

  fs.writeFileSync(
    './config.js',
    `
    export const planToNFTAddress = "${planToNFT.address}"
    export const oracleAddress = "${planToNFTOracle.address}"
    `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
