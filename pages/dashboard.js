import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { planToNFTAddress } from '../config';

import PlanToNFT from '../artifacts/contracts/PlanToNFT.sol/PlanToNFT.json';

export default function dashboard() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.JSON_RPC_PROVIDER
    );
    const contract = new ethers.Contract(
      planToNFTAddress,
      PlanToNFT.abi,
      provider
    );
    const data = await contract.fetchOthersNFTs();
    setNfts(data);
    setLoadingState('loaded');
  }

  if (loadingState === 'loaded' && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in dashboard</h1>;
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={nft} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
