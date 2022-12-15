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
      accounts: [
        '557e05817f357f409bac02983d083ef68fc908c05ca75b7d62e2936006978ea6',
      ],
    },
  },
  solidity: '0.8.4',
};
