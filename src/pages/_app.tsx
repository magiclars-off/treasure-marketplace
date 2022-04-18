import "../css/tailwind.css";

import { Fragment, useEffect, useState } from "react";
import { ChainId, DAppProvider } from "@usedapp/core";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { resolveValue, Toaster } from "react-hot-toast";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";
import { SSRProvider } from "@react-aria/ssr";
import { ThemeProvider } from "next-themes";

import Header from "../components/Header";
import { Spinner } from "../components/Spinner";
import { MagicProvider } from "../context/magicContext";
import Footer from "../components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 2500,
      refetchOnWindowFocus: false,
    },
  },
});

const config = {
  readOnlyChainId: ChainId.Arbitrum,
  readOnlyUrls: {
    [ChainId.ArbitrumRinkeby]:
      "https://arb-rinkeby.g.alchemy.com/v2/PDUCdHLoNrdDJwgVvCNPTx7MrHuQ0uBg",
    [ChainId.Arbitrum]: `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider attribute="class">
        <SSRProvider>
          <DAppProvider config={config}>
            <MagicProvider>
              <QueryClientProvider client={queryClient}>
                <Main Component={Component} pageProps={pageProps} />
                <ReactQueryDevtools />
              </QueryClientProvider>
            </MagicProvider>
          </DAppProvider>
          <Toaster position="bottom-left">
            {(t) => (
              <Transition
                show={t.visible}
                as={Fragment}
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-center items-center">
                      <div className="flex-shrink-0">
                        {(() => {
                          switch (t.type) {
                            case "success":
                              return (
                                <CheckCircleIcon className="h-6 w-6 text-green-500" />
                              );
                            case "error":
                              return (
                                <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
                              );
                            case "loading":
                              return (
                                <Spinner className="h-6 w-6 text-blue-500" />
                              );
                            default:
                              return (
                                <CheckCircleIcon className="h-6 w-6 text-yellow-500" />
                              );
                          }
                        })()}
                      </div>
                      <div className="ml-3 w-0 flex-1">
                        <p className="text-sm text-gray-500">
                          {resolveValue(t.message, t)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            )}
          </Toaster>
        </SSRProvider>
      </ThemeProvider>
    </>
  );
}

const Main = ({ pageProps, Component }) => {
  return (
    <div className="min-h-screen relative flex flex-col dark:bg-gray-900">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

export default MyApp;
