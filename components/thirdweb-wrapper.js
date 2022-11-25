import React from "react";
import { ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react";
import Link from "next/link";
import { CONTRACT_ADDRESS } from "constant";
const ThirdWebWrapper = ({ children }) => {
  const { contract } = useContract(
    //   // '0x47c45872096d18B42481FFF079cBD926629E4b16' // replace this with your contract address
    // "0xb4df7F15431dF96F9597D22C52c21e3D0FE26A54",
    CONTRACT_ADDRESS,
    "nft-drop"
  );
  const address = useAddress();

  return (
    <>
      <div className="flex justify-between mt-3 items-center">
        <Link href="/">
          <h3 className="primary my-3 text-xl font-medium text-center">
            Course Minting Platform
          </h3>
        </Link>
        <ConnectWallet />
        <Link href="/courses">
          <span className="cursor-pointer inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-primary shadow-s focus:outline-none focus:ring-2 focus:ring-offset-2">
            My Courses
          </span>
        </Link>
      </div>
      {address && children({ contract, address })}
    </>
  );
};

export default ThirdWebWrapper;
