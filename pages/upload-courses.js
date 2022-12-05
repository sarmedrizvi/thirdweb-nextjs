import { useAddress, useContract } from "@thirdweb-dev/react";
import { Header } from "components/header";
import { CONTRACT_ADDRESS } from "constant";
import React, { useState } from "react";
import styles from "styles/Home.module.css";

const UploadCourses = () => {
  const { contract } = useContract(
    //   // '0x47c45872096d18B42481FFF079cBD926629E4b16' // replace this with your contract address
    // "0xb4df7F15431dF96F9597D22C52c21e3D0FE26A54",
    CONTRACT_ADDRESS,
    "nft-drop"
  );

  const address = useAddress();
  const [loading, setLoading] = useState(false);
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const { image, description, name } = e.target.elements;
      setLoading(true);
      const results = await contract.createBatch([
        {
          name: name.value,
          description: description.value,
          image: image.value, // This can be an image url or file
        },
      ]); // uploads and creates the NFTs on chain
      const firstTokenId = results[0].id; // token id of the first created NFT
      const firstNFT = await results[0].data(); // (optional) fetch details of the first created NFT
      alert("Courses has been added! id:" + firstTokenId);
    } catch (error) {
      console.log(error);
      alert(error?.toString());
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container + " container mx-auto"}>
      <Header />
      {loading ? (
        <p className="text-center text-primary mt-10">Loading...</p>
      ) : address ? (
        <div className="flex flex-col mt-5">
          <form onSubmit={handleUpload} className="flex flex-col">
            <input
              name="name"
              placeholder="name"
              className="mb-1 px-2"
              required
            />
            <textarea
              name="description"
              placeholder="description"
              className="mb-1 px-2"
              required
            />
            <input
              name="image"
              placeholder="Image link"
              className="mb-1 px-2"
            />
            <button type="submit" className="bg-primary">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <p className="text-center text-primary mt-10">
          Please connect wallet to add courses
        </p>
      )}
    </div>
  );
};

export default UploadCourses;
