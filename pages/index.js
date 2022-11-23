import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { planToNFTAddress } from '../config';

import PlanToNFT from '../artifacts/contracts/PlanToNFT.sol/PlanToNFT.json';

export default function Home() {
  const [trackers, setTrackers] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  useEffect(() => {
    loadTrackers();
  }, []);
  const router = useRouter();

  async function loadTrackers() {
    /** provider 연결 없이 그냥 contract call 했더니 동작 안 했음. */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      planToNFTAddress,
      PlanToNFT.abi,
      signer
    );

    const data = await contract.fetchMyTrackers();
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

  async function updateTracker(string) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      planToNFTAddress,
      PlanToNFT.abi,
      signer
    );

    const tokenId = string.split(':')[1].slice(0, 1);
    //console.log(tokenId);
    const transaction = await contract.updateTracker(parseInt(tokenId));
    await transaction.wait();
    router.push('/');
  }

  if (loadingState === 'loaded' && !trackers.length)
    return <h1 className="px-20 py-10 text-3xl">No items in my dashboard</h1>;
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {trackers.map((tracker, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={tracker.image} />
              <div className="p-4">
                <p
                  style={{ height: '32px' }}
                  className="text-l font-semibold"
                  id={{ i }}
                >
                  tokenId : {tracker.tokenId}
                </p>
                <p style={{ height: '32px' }} className="text-l font-semibold">
                  owner address :
                </p>
                <p style={{ height: '32px' }} className="text-l font-semibold">
                  {tracker.owner}
                </p>
                <p style={{ height: '32px' }} className="text-l font-semibold">
                  {tracker.achievement}% completed
                </p>
                <button
                  onClick={(e) => {
                    updateTracker(e.target.innerText);
                  }}
                  className="font-bold mt-4 bg-gray-500 text-black rounded p-4 shadow-lg"
                >
                  update tracker (id:{i + 1})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
