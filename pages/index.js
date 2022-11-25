import React from "react";
import HomePage from "components/home";
import { useAddress } from "@thirdweb-dev/react";
import styles from "styles/Home.module.css";
import { Header } from "components/header";

export default function Home() {
  const address = useAddress();
  console.log(address);
  return (
    <div className={styles.container + " container mx-auto"}>
      <Header />
      <HomePage address={address} />
    </div>
  );
}
