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
      <div className="w-5/6 flex pb-20">
        <div className="w-1/6"></div>
        <div className="w-1/2 flex flex-col pb-12 text-center">
          <p className="mt-8 border rounded p-4">My task lists</p>
          <div className="text-left mt-4 border rounded p-4">
            <div className=" border rounded bg-gray-100 p-2">
              <p>taskName : test task1</p>
              <p>taskId : NmpmTDNEMVdFOElpRl91RQ</p>
            </div>
            <div className="mt-2 border rounded bg-gray-100 p-2">
              <p>taskName : test task2</p>
              <p>taskId : X2M1U3ZWNlBwRzFvSkJITg</p>
            </div>
            <div className="mt-2 border rounded bg-gray-100 p-2">
              <p>taskName : test task3</p>
              <p>taskId : eTlnbHpnblF4Y0NHY3FveA</p>
            </div>
            <div className="mt-2 border rounded bg-gray-100 p-2">
              <p>taskName : test task4</p>
              <p>taskId : ckRQVFU1UE9uOGgzc0ZCTQ</p>
            </div>
            <div className="mt-2 border rounded bg-gray-100 p-2">
              <p>taskName : test task5</p>
              <p>taskId : V204WkNMdG9SY2Z6LWJUYw</p>
            </div>
          </div>
        </div>
        <div className="w-1/6"></div>
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
            Mint sample Tracker
          </button>
        </div>
        <div className="w-1/6"></div>
      </div>
    </div>
  );
}
