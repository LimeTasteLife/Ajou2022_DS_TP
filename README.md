# Distributed System Team Project Front

# Quick Start

+ dependency

   - nodejs 16 LTS
   - metamask
   - infura

+ download package
```
npm i
```
+ create env files
```
cd ds-tp && touch .env && touch .infuraid
```
   + example of .env
```
JSON_RPC_PROVIDER="http://127.0.0.1:8545"
```
   + example of .infuraid
```
justyourid
```
+ start local node
```
npx hardhat node
```
+ deploy your contract
```
npx hardhat run scripts/deploy.js --network localhost
```
+ run the project
```
npm run build // if you need
npm run dev
```
---
# NOTIFICATION

Do not change the version of NEXT.js!

It should be '12.1.6'. or crush.

---
