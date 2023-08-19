import Head from "next/head";
import Footer from "../components/Footer";
import { domainName, ThirdwebclientID } from "../const/yourDetails";
import "../styles/globals.css";
import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  paperWallet,
} from "@thirdweb-dev/react";
// This is the chain your dApp will work on.
const activeChain = "polygon";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      authConfig={{
        domain: domainName,
        authUrl: "/api/auth",
        clientID: ThirdwebclientID,
      }}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        localWallet(),
        paperWallet({
          paperClientId: "PAPER_CLIENT_ID",
        }),
      ]}
    >
      <Head>
        <title>NFT Gated Website</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Learn how to use the thirdweb Auth SDK to create an NFT Gated Website"
        />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </ThirdwebProvider>
  );
}

export default MyApp;
