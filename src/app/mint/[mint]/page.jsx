"use client";
import React from "react";
import { useState, useEffect, useMemo } from "react";
import {
  GiftIcon,
  CheckCircleIcon,
  XMarkIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import {
  ConnectionProvider,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
require("@solana/wallet-adapter-react-ui/styles.css");
import toast, { Toaster } from "react-hot-toast";

function notify(props) {
  const { title, message, type } = props;
  let _title = title ? title : "";

  if (type === "success" && !title) _title = "Success";
  if (type === "error" && !title) _title = "Error";

  const isMobile = window.innerWidth <= 768;

  toast.custom((t) => (
    <div
      className={`${
        t.visible
          ? `md:animate-toast-enter-desktop animate-toast-enter`
          : "md:animate-toast-leave-desktop animate-toast-leave"
      } bg-white/80 transition-all p-5 md:w-[280px] max-w-full rounded-xl border-1 border-white/20 shadow-lg relative`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-2">
          {type === "success" && (
            <CheckCircleIcon
              className="h-8 w-8 "
              color="green"
              aria-hidden="true"
            />
          )}

          {type === "error" && (
            <XCircleIcon className="h-8 w-8 " color="red" aria-hidden="true" />
          )}
        </div>

        <div className="md:text-sm px-2 text-xs text-black max-h-[calc(1.25rem*5)] overflow-hidden text-ellipsis line-clamp-5 md:mt-[1px] mt-[3px]">
          {message}
        </div>
      </div>
    </div>
  ));
}

export default function MintPage({ params }) {
  const [image, setImage] = useState(null);

  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], [network]);

  useEffect(() => {
    const fetchImage = async () => {
      const url = `https://so-lfie-backend.vercel.app/image/${params.mint}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setImage(data.imageUrl);
      } catch (error) {
        window.location.reload();
      }
    };
    fetchImage();
  }, [params.mint]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <MintComponent image={image} mint={params.mint} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

function MintComponent({ image, mint }) {
  const wallet = useWallet();
  const [mintSuccess, setMintSuccess] = useState(false);

  async function handleMint(wallet) {
    if (!image) {
      alert("Image is invalid");
      return;
    }

    if (!wallet.publicKey) {
      notify({ message: "Connect your wallet first.", type: "error" });
      return;
    }

    const formData = { wallet: wallet.publicKey.toString(), uuid: mint };

    try {
      const response = await fetch("https://so-lfie-backend.vercel.app/mint", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        notify({ message: "NFT minted successfully.", type: "success" });
        setMintSuccess(true);
      } else {
        setMintSuccess(false);
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  }

  return (
    <div className="flex bg-white bg-center relative flex-col items-center pb-12 w-full min-h-[900px] max-md:px-5">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Superteam</span>
              <img
                alt=""
                src="/images/superteam-ftext.png"
                className="h-[100%] w-[50%] object-cover object-center"
              />
            </a>
          </div>
        </nav>
      </header>

      <div className="mx-auto flex w-full max-w-[1113px]">
        <div className="bg-white">
          <div className="max-w-2xl sm:px-3 sm:py-32 lg:px-8">
            <div className="relative h-[650px] isolate overflow-hidden bg-orange/90 px-2 pt-26 shadow-2xl sm:rounded-3xl sm:px-25 md:pt-14 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
              <div className="mx-auto text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Mint Your SOLFie
                </h2>
                <div className="flex items-center justify-center gap-x-6 lg:justify-start">
                  {image && !mintSuccess && (
                    <div className="mt-5 flex items-center justify-center gap-x-6">
                      <WalletMultiButton />
                      <button
                        onClick={() => handleMint(wallet)}
                        className="flex items-center gap-2 rounded-md bg-white px-5 py-3.5 text-sm font-semibold text-black"
                      >
                        <GiftIcon className="h-5 w-5" aria-hidden="true" />
                        Mint
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative mt-16 h-80 lg:mt-8">
                {mintSuccess && (
                  <div className="flex ml-[10%] text-3xl text-white text-bold flex-col items-center mt-4 mb-10">
                    <img
                      src={"/images/success.gif"}
                      alt="Captured"
                      className="w-[100%] max-w-[900px] rounded-lg"
                    />
                    NFT WAS MINTED SUCCESSFULLY!
                  </div>
                )}

                {image && !mintSuccess && (
                  <div className="flex flex-col items-center mt-4 mb-10">
                    <img
                      src={image}
                      alt="Captured"
                      className="w-[100%] max-w-[1200px] rounded-lg"
                    />
                  </div>
                )}

                {!image && !mintSuccess && (
                  <div className="flex flex-col items-center mt-4 mb-10">
                    <img
                      src={"/images/loading.gif"}
                      alt="Captured"
                      className="w-[20%] rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster
        position={"bottom-center"}
        toastOptions={{
          duration: 4000,
          style: {
            animation: "none",
          },
        }}
      />
    </div>
  );
}
