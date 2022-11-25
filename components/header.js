import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";

export const Header = () => {
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
      <Link href="/courses">
        <span className="cursor-pointer inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-primary shadow-s focus:outline-none focus:ring-2 focus:ring-offset-2">
          My Courses
        </span>
      </Link>
    </div>
  );
};
