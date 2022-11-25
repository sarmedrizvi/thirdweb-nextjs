import {
  ChainId,
  ConnectWallet,
  useAddress,
  useContract,
  useMintNFT,
  useNetwork,
  useNetworkMismatch,
  useNFTBalance,
  useNFTs,
  useUser,
} from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "constant";
// 0x998b46068fbf14Bb7189089B624aA6487d39236B
import React, { useEffect, useState } from "react";

export default function HomePage() {
  // Wallet & Network Information
  const { user } = useUser();
  const address = useAddress();
  const [loading, setLoading] = useState(false);
  const [nftDetails, setNftDetails] = useState();
  // const [, switchNetwork] = useNetwork();
  const { contract } = useContract(
    //   // '0x47c45872096d18B42481FFF079cBD926629E4b16' // replace this with your contract address
    // "0xb4df7F15431dF96F9597D22C52c21e3D0FE26A54",
    CONTRACT_ADDRESS,
    "nft-drop"
  );
  // const networkMismatch = useNetworkMismatch();

  // ALL NFT'S FROM DASHBOARD
  const { data: nfts, isLoading: isReadingNfts } = useNFTs(contract);
  // USER NFT'S
  const { data: ownerBalance } = useNFTBalance(contract, address);

  // console.log({ nfts, ownerBalance: ownerBalance.toNumber() });
  useEffect(() => {
    const run = async () => {
      const getAllClaimed = await contract.getAllClaimed();
      const getAllUnClaimed = await contract.getAllUnclaimed();
      setNftDetails({
        getAllClaimed,
        getAllUnClaimed,
      });
    };
    if (contract) run();
  }, [contract]);

  const handleMintNft = async () => {
    try {
      setLoading(true);
      console.log(contract.claimTo, address);
      const tx = await contract.claimTo(address, 1);
      const receipt = tx[0].receipt; // the transaction receipt
      const claimedTokenId = tx[0].id; // the id of the NFT claimed
      const claimedNFT = await tx[0].data(); // (optional) get the claimed NFT metadata
      alert(`You have claimed NFT: ${claimedNFT?.metadata?.name}`);
    } catch (error) {
      console.log("error in claiming NFT", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <p className="text-lg font-semibold">
        Your Claimed Courses:{" "}
        <span className="text-primary">{ownerBalance?.toNumber()}</span>
      </p>
      {isReadingNfts || loading ? (
        <p>Loading...</p>
      ) : (
        <div className="my-3">
          <div className="flex justify-between">
            <p className="mb-4">
              Claimed Nfts:{" "}
              <strong className="text-primary">
                {nftDetails?.getAllClaimed.length}
              </strong>{" "}
              | UnClaimed Nfts:{" "}
              <strong className="text-primary">
                {nftDetails?.getAllUnClaimed.length}
              </strong>
            </p>
            {nftDetails?.getAllClaimed.length !==
              nftDetails?.getAllUnClaimed.length &&
              address &&
              user && (
                <button
                  type="button"
                  onClick={handleMintNft}
                  className="inline-flex items-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-s focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Mint
                </button>
              )}
          </div>
          <div className="flex flex-wrap text-white">
            {(nfts || []).map((nft, index) => (
              <div key={index} className="mx-2">
                <img
                  src={nft.metadata.image}
                  className="w-52 h-52"
                  width={200}
                  height={200}
                />
                <p className=" uppercase mt-2">{nft.metadata.name}</p>
                <p className="text-primary font-light tracking-widest">
                  {/^0x0+$/.test(nft.owner) && "Available to mint"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
