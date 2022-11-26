import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import React from "react";
// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      desiredChainId={activeChainId}
      // authConfig={{
      //   // Set this to your domain to prevent signature malleability attacks.
      //   domain: "http://localhost:3000/",
      //   authUrl: "/api/auth",
      // }}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
