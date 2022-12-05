import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "constant";
import React, { useState } from "react";
import TransferNft from "./transfer-nft";

const CourseManager = () => {
  const { contract } = useContract(
    //   // '0x47c45872096d18B42481FFF079cBD926629E4b16' // replace this with your contract address
    // "0xb4df7F15431dF96F9597D22C52c21e3D0FE26A54",
    CONTRACT_ADDRESS,
    "nft-drop"
  );
  const address = useAddress();
  const [loading, setLoading] = useState();
  const {
    data: ownedNFTs,
    isLoading,
    refetch,
  } = useOwnedNFTs(contract, address);

  const burnNft = async (metadata) => {
    try {
      setLoading(true);
      const result = await contract.burn(+metadata.id);
      return result;
    } catch (error) {
      console.log("error in burning nft", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap text-white">
        {isLoading || loading ? (
          "loading..."
        ) : (
          <>
            {ownedNFTs?.length ? (
              <div className="mt-6 flex">
                {(ownedNFTs || []).map((nft, index) => (
                  <div key={index} className="mx-2">
                    <img
                      src={nft.metadata.image}
                      className="w-52 h-52"
                      width={200}
                      height={200}
                    />
                    <p className=" uppercase mt-2">{nft.metadata.name}</p>
                    <p
                      onClick={() => burnNft(nft.metadata)}
                      className="text-primary font-light tracking-widest text-center cursor-pointer caret-blue-900"
                    >
                      Burn
                    </p>
                    <TransferNft
                      nft={nft}
                      setLoading={setLoading}
                      refetch={refetch}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No Nft</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CourseManager;
