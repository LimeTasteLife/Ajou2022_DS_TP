import { useState } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';

import { planToNFTAddress } from '../config';

import PlanToNFT from '../artifacts/contracts/PlanToNFT.sol/PlanToNFT.json';

export default function tracker() {
  const router = useRouter();

  async function mintNFT() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      planToNFTAddress,
      PlanToNFT.abi,
      signer
    );

    let transaction = await contract.safeMint();
    await transaction.wait();

    router.replace('/');
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <button
          onClick={mintNFT}
          className="font-bold mt-4 bg-grey-500 text-white rounded p-4 shadow-lg"
        >
          Mint my tracking NFT
        </button>
      </div>
    </div>
  );
}
