import { useContract } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "constant";
import React, { useState } from "react";

const TransferNft = ({ setLoading, nft, refetch }) => {
  const { contract } = useContract(CONTRACT_ADDRESS, "nft-drop");

  const [transfer, setTransfer] = useState({
    input: "",
    show: false,
  });
  const transferNft = async (metadata) => {
    try {
      setLoading(true);
      const result = await contract.transfer(transfer.input, +metadata.id);
      refetch();
      return result;
    } catch (error) {
      console.log("error in burning nft", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {!transfer.show ? (
        <p
          onClick={() => setTransfer({ show: true })}
          className="text-primary font-light tracking-widest text-center cursor-pointer caret-blue-900 mt-2"
        >
          Transfer
        </p>
      ) : (
        <div className="flex justify-center">
          <input
            name="transfer"
            className="p-1"
            onChange={(e) =>
              setTransfer((prev) => ({
                ...prev,
                input: e.target.value,
              }))
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                // Cancel the default action, if needed
                event.preventDefault();
                // Trigger the button element with a click
                transferNft(nft.metadata);
              }
            }}
          />
        </div>
      )}
    </>
  );
};

export default TransferNft;
