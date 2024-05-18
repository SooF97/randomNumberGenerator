"use client";
import axios from "axios";
import FormData from "form-data";
import { useState } from "react";

import { ethers } from "ethers";
import randomNumber from "./randomNumber.json";

import { ConnectWallet, useAddress, useSigner } from "@thirdweb-dev/react";

const page = () => {
  const userAddress = useAddress();
  const signer = useSigner();

  const [userInput, setUserInput] = useState("");
  const [hashFromIpfs, setHashFromIpfs] = useState("");
  const [randomNumero, setRandomNumero] = useState();

  const API_KEY = "0c61222bc1ea3c068ab4";
  const API_SECRET =
    "ad8d7ccf60595dc5af6149eac18b1f6556a64f61bcf82c27903d2761e3a472b2";
  // the endpoint needed to upload the file
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  async function handleChange(e) {
    console.log(e.target.value);
    setUserInput(e.target.value);
  }

  const uploadToIpfs = async () => {
    try {
      // Convert the metadata object to a JSON string
      const metadataJSON = JSON.stringify(userInput);

      // Convert the JSON string to a Blob
      const metadataBlob = new Blob([metadataJSON], {
        type: "application/json",
      });

      // Create FormData and append the metadata Blob
      const formData = new FormData();
      formData.append("file", metadataBlob, "metadata.json");

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: API_KEY,
          pinata_secret_api_key: API_SECRET,
        },
      });
      console.log("metadata", `${response.data.IpfsHash}`);
      setHashFromIpfs(response.data.IpfsHash);
      return response.data.IpfsHash;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  async function generate() {
    const dataHashed = uploadToIpfs();
    console.log(dataHashed);
    try {
      const contract = new ethers.Contract(
        randomNumber.address,
        randomNumber.abi,
        signer
      );
      const transaction = await contract.generateRandomNumber(dataHashed);
      await transaction.wait();
      console.log(transaction);
    } catch (error) {
      console.log(error);
    }
  }

  async function getRandomNumber() {
    try {
      const contract = new ethers.Contract(
        randomNumber.address,
        randomNumber.abi,
        signer
      );
      const _num = await contract.randomNum();
      console.log(_num);
      setRandomNumero(_num.toString());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col p-6 border-black items-center justify-center gap-4">
      <label htmlFor="id" />
      Enter your unique identifier (Card Id Number, Passeport Number...)
      <input
        type="text"
        id="id"
        name="id"
        placeholder="Enter Id"
        className="w-1/2 h-10"
        onChange={handleChange}
        required
      />
      <ConnectWallet btnTitle="Sign in" modalTitle="Sign in" />
      <button
        onClick={generate}
        className="w-60 h-10 bg-black text-gray-100 p-2 rounded-2xl"
      >
        Generate Random Number
      </button>
      <button
        onClick={getRandomNumber}
        className="w-60 h-10 bg-black text-gray-100 p-2 rounded-2xl"
      >
        Get Random Number
      </button>
      <p>{randomNumero}</p>
    </div>
  );
};

export default page;
