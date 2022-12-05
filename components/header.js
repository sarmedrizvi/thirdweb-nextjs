import { ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "constant";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const Header = () => {
  const { contract } = useContract(CONTRACT_ADDRESS, "nft-drop");
  const address = useAddress();
  const [isOwner, setOwner] = useState();
  useEffect(() => {
    const call = async () => {
      const rolesAndMembers = await contract.roles.get("admin");
      setOwner(rolesAndMembers.includes(address));
    };
    if (address) call();
  }, [address]);

  return (
    <div className="flex justify-between mt-3 items-center">
      <Link href="/">
        <h3 className="primary my-3 text-xl font-medium text-center cursor-pointer">
          Course Minting Platform
        </h3>
      </Link>
      <div className="flex justify-center mt-3 items-center">
        <ConnectWallet />
      </div>
      <div>
        {address && (
          <Link href="/courses">
            <span className="cursor-pointer inline-flex items-center rounded-md border border-transparent mx-2 py-3 text-base font-medium text-primary shadow-s focus:outline-none focus:ring-2 focus:ring-offset-2">
              My Courses
            </span>
          </Link>
        )}
        {isOwner && (
          <Link href="/upload-courses">
            <h3
              title="Courses can be uploaded by admin only"
              className="cursor-pointer inline-flex items-center rounded-md border border-transparent mx-2 py-3 text-base font-medium text-primary shadow-s focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Upload Courses
            </h3>
          </Link>
        )}
        {isOwner && (
          <Link href="/settings">
            <h3
              title="Courses can be uploaded by admin only"
              className="cursor-pointer inline-flex items-center rounded-md border border-transparent mx-2 py-3 text-base font-medium text-primary shadow-s focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Settings
            </h3>
          </Link>
        )}
      </div>
    </div>
  );
};
