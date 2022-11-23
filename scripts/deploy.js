const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const PlanToNFT = await hre.ethers.getContractFactory('PlanToNFT');
  const planToNFT = await PlanToNFT.deploy();
  await planToNFT.deployed();
  console.log('PlanToNFT deployed to:', planToNFT.address);

  fs.writeFileSync(
    './config.js',
    `
    export const planToNFTAddress = "${planToNFT.address}"
    `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
