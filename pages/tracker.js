import { useState } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';

import { planToNFTAddress } from '../config';

import PlanToNFT from '../artifacts/contracts/PlanToNFT.sol/PlanToNFT.json';

export default function tracker() {
  const [formInput, updateFormInput] = useState({
    taskId: '',
  });
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

    let transaction = await contract.makeTracker(formInput.taskId);
    await transaction.wait();

    router.replace('/');
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Task Id"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, taskId: e.target.value })
          }
        />
        <button
          onClick={mintNFT}
          className="font-bold mt-4 bg-gray-500 text-black rounded p-4 shadow-lg"
        >
          Mint sample Tracker1
        </button>
      </div>
    </div>
  );
}
