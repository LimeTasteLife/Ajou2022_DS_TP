import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { planToNFTAddress } from '../config';

import PlanToNFT from '../artifacts/contracts/PlanToNFT.sol/PlanToNFT.json';

export default function dashboard() {
  const [trackers, setTrackers] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  useEffect(() => {
    loadTrackers();
  }, []);

  async function loadTrackers() {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.JSON_RPC_PROVIDER
    );
    const contract = new ethers.Contract(
      planToNFTAddress,
      PlanToNFT.abi,
      provider
    );
    const data = await contract.fetchOthersTrackers();
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await contract.tokenURI(i.tokenId);
        let item = {
          tokenId: i.tokenId.toNumber(),
          owner: i.owner,
          image: tokenUri,
          achievement: i.achievement,
        };
        return item;
      })
    );
    setTrackers(items);
    setLoadingState('loaded');
  }

  if (loadingState === 'loaded' && !trackers.length)
    return <h1 className="px-20 py-10 text-3xl">No items in dashboard</h1>;
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {trackers.map((tracker, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={tracker.image} />
              <div className="p-4">
                <p
                  style={{ height: '64px' }}
                  className="text-2xl font-semibold"
                >
                  {tracker.tokenId}
                </p>
                <p
                  style={{ height: '64px' }}
                  className="text-2xl font-semibold"
                >
                  {tracker.owner}
                </p>
                <p
                  style={{ height: '64px' }}
                  className="text-2xl font-semibold"
                >
                  {tracker.achievement}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
