"use client";
import { Inter } from "next/font/google";
import "./globals.css";

import {
  ThirdwebProvider,
  coinbaseWallet,
  embeddedWallet,
  metamaskWallet,
  phantomWallet,
  rainbowWallet,
  safeWallet,
  smartWallet,
  trustWallet,
} from "@thirdweb-dev/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ThirdwebProvider
      clientId="fb9b59614209d1a16bb3c1ab6ad6dcc1"
      activeChain="mumbai"
      supportedWallets={[
        smartWallet(
          embeddedWallet(), // any personal wallet
          {
            factoryAddress: "0xc71C480225b8D097d7C445807524379859B94a53", // your deployed factory address
            gasless: true, // enable or disable gasless transactions
          }
        ),
        metamaskWallet(),
        coinbaseWallet(),
        trustWallet(),
        phantomWallet(),
        rainbowWallet(),
        safeWallet(),
      ]}
    >
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="Blockchain and web 3.0 solution for digital products in form of NFT"
          />
          <meta
            name="keywords"
            content="blockchain, web3.0, smart contracts, nft, defi"
          />
          <meta name="author" content="Soufiane MASAD" />
          <title>Random number generator</title>
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </ThirdwebProvider>
  );
}
