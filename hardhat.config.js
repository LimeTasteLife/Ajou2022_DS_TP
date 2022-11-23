/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-waffle');
const fs = require('fs');
const infuraId = fs.readFileSync('.infuraid').toString().trim() || '';

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${infuraId}`,
      chainId: 5,
    },
  },
  solidity: '0.8.4',
};
