import {
  ConnectWallet,
  useAddress,
  Web3Button,
  useClaimConditions,
  useContract,
} from "@thirdweb-dev/react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { contractAddress } from "../const/yourDetails";
import logo from "../assets/codebyste-logo.gif";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Login() {
  const address = useAddress(); // Get the user's address
  const router = useRouter();
  const message = router.query.message;
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useClaimConditions(contract, undefined, {
    withAllowlist: true,
  });

  console.log("data", data);
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>codebySte - NFT Gated Content</h1>
      <Image
        src={logo}
        alt="codebySte"
        width={250}
        height={220}
        className={styles.logo}
      />

      <p className={styles.explain}>
        You cannot access the{" "}
        <Link className={styles.purple} href="/">
          main page
        </Link>{" "}
        unless you own an NFT from our collection!
      </p>

      <hr className={styles.divider} />

      <>
        {message ? decodeURIComponent(message) : ""}
        {address ? (
          <p>
            Welcome, {address?.slice(0, 5)}...{address?.slice(-5)}
          </p>
        ) : (
          <p>Please connect your wallet to continue.</p>
        )}
        <ConnectWallet accentColor="#F213A4" />
        <br />
        <Web3Button
          contractAddress={contractAddress}
          action={(contract) => contract.erc1155.claim(0, 1)}
          accentColor="#F213A4"
        >
          Claim NFT
        </Web3Button>
      </>
    </div>
  );
}
