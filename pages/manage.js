import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import { planToNFTAddress } from '../config';

import PlanToNFT from '../artifacts/contracts/PlanToNFT.sol/PlanToNFT.json';

export default function tracker() {
  const [srcs, setSrcs] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  useEffect(() => {
    loadInformation();
  }, []);

  async function loadInformation() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      planToNFTAddress,
      PlanToNFT.abi,
      signer
    );

    const fetchMyNFTs = await contract.fetchMyNFTs();
    const fetchAllNFTs = await contract.fetchAllNFTs();
    const fetchOthersNFTs = await contract.fetchOthersNFTs();

    console.log('function fetchMyNFTs');
    const items = await Promise.all(
      fetchMyNFTs.map(async (i) => {
        return i.slice(55);
      })
    );
    console.log(items);
    /*
    console.log('function fetchAllNFTs');
    for (let item of fetchAllNFTs) {
      console.log(item);
    }
    console.log('function fetchOthersNFTs');
    for (let item of fetchOthersNFTs) {
      console.log(item);
    }
    */
    setSrcs(items);
    setLoadingState('loaded');
  }

  if (loadingState === 'loaded' && !srcs.length)
    return <h1 className="px-20 py-10 text-3xl">No items in dashboard</h1>;
  return (
    <div>
      <h1>Look at the console.</h1>
      {/*
      <div>
        {srcs.map((src, i) => (
          <div key={i} className="border shadow rounded-xl overflow-hidden">
            <p>a</p>
            <Image src={'/' + src} alt="Pic" width={500} height={500} />
          </div>
        ))}
      </div>
        */}
    </div>
  );
}
