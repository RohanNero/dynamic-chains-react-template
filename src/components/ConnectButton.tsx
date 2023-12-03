import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { QRCodeSVG } from "qrcode.react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDisconnect, useSwitchNetwork } from "wagmi";
import {
  ArrowLeftOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { Balance } from "./Balance";
import { useAutoConnect } from "../hooks/useAutoConnect";
import { getBlockExplorerAddressLink } from "../utils/getBlockExplorer";
import { includedChains, chainData } from "../config/chainData";

// Custom Wagmi Connect Button (watch balance + custom design)
export const RainbowKitCustomConnectButton = () => {
  useAutoConnect();
  const { disconnect } = useDisconnect();
  // const { chain } = useNetwork();
  // const chainId = chain?.id;
  const { switchNetwork } = useSwitchNetwork();
  const [addressCopied, setAddressCopied] = useState(false);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;
        console.log("chain:", chain);
        console.log("chain id:", chain?.id);
        console.log("account:", account);
        const blockExplorerAddressLink =
          account && chain && chain.id
            ? getBlockExplorerAddressLink(chain.id, account.address)
            : undefined;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported || !includedChains.includes(chain?.id)) {
                return (
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-error btn-sm dropdown-toggle gap-1"
                    >
                      <span>Wrong network</span>
                      <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 mt-1 shadow-center shadow-accent bg-slate-200 rounded-box gap-1"
                    >
                      <li>
                        <button
                          className="btn-sm !rounded-xl flex py-3 gap-3"
                          type="button"
                          onClick={() => {
                            if (chain.id) switchNetwork?.(1); // Hard-coded to mainnet Ethereum
                          }}
                        >
                          <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
                          <span className="whitespace-nowrap">
                            Switch to{" "}
                            <span
                              style={{
                                color:
                                  chainData[chain?.id]?.color?.toString() ||
                                  "#bbbbbb",
                              }}
                            >
                              {"Ethereum"}
                            </span>
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="menu-item text-error btn-sm !rounded-xl flex gap-3 py-3"
                          type="button"
                          onClick={() => disconnect()}
                        >
                          <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" />{" "}
                          <span>Disconnect</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                );
              }
              return (
                <div className="px-2 flex gap-3 justify-end items-center">
                  <div className="flex flex-col items-center mr-1">
                    <Balance
                      address={account.address}
                      chainId={chain.id}
                      className="min-h-0 h-auto"
                    />
                    <span
                      className="text-s"
                      style={{
                        color:
                          chainData[chain?.id]?.color?.toString() || "#bbbbbb",
                      }}
                    >
                      {chain?.name}
                    </span>
                  </div>
                  <div className="dropdown dropdown-end leading-3">
                    <label
                      tabIndex={0}
                      style={{
                        backgroundColor:
                          chainData[chain?.id]?.color?.toString(),
                      }}
                      className="btn btn-sm pl-0 pr-2 shadow-md dropdown-toggle gap-0 !h-auto"
                    >
                      <span className="ml-2 mr-1">{account.displayName}</span>
                      <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu z-[2] p-2 mt-2 shadow-center shadow-accent bg-slate-200 rounded-box gap-1"
                    >
                      <li>
                        {addressCopied ? (
                          <div className="btn-sm !rounded-xl flex gap-3 py-3">
                            <CheckCircleIcon
                              className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                              aria-hidden="true"
                            />
                            <span className=" whitespace-nowrap">
                              Copy address
                            </span>
                          </div>
                        ) : (
                          <CopyToClipboard
                            text={account.address}
                            onCopy={() => {
                              setAddressCopied(true);
                              setTimeout(() => {
                                setAddressCopied(false);
                              }, 800);
                            }}
                          >
                            <div className="btn-sm !rounded-xl flex gap-3 py-3">
                              <DocumentDuplicateIcon
                                className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                                aria-hidden="true"
                              />
                              <span className=" whitespace-nowrap">
                                Copy address
                              </span>
                            </div>
                          </CopyToClipboard>
                        )}
                      </li>
                      <li>
                        <label
                          htmlFor="qrcode-modal"
                          className="btn-sm !rounded-xl flex gap-3 py-3"
                        >
                          <QrCodeIcon className="h-6 w-4 ml-2 sm:ml-0" />
                          <span className="whitespace-nowrap">
                            View QR Code
                          </span>
                        </label>
                      </li>
                      <li>
                        {/* Button that links to user's address on block explorer */}
                        <button
                          className="menu-item btn-sm !rounded-xl flex gap-3 py-3"
                          type="button"
                        >
                          <ArrowTopRightOnSquareIcon className="h-6 w-4 ml-2 sm:ml-0" />
                          <a
                            target="_blank"
                            href={blockExplorerAddressLink}
                            rel="noopener noreferrer"
                            className="whitespace-nowrap"
                          >
                            View on Block Explorer
                          </a>
                        </button>
                      </li>
                      <li>
                        <button
                          className="menu-item text-error btn-sm !rounded-xl flex gap-3 py-3"
                          type="button"
                          onClick={() => disconnect()}
                        >
                          <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" />{" "}
                          <span>Disconnect</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="qrcode-modal"
                      className="modal-toggle"
                    />
                    <label
                      htmlFor="qrcode-modal"
                      className="modal cursor-pointer"
                    >
                      <label className="modal-box relative">
                        {/* Dummy input to capture event onclick on modal box */}
                        <input className="h-0 w-0 absolute top-0 left-0" />
                        <label
                          htmlFor="qrcode-modal"
                          className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
                        >
                          ✕
                        </label>
                        <div className="space-y-3 py-6">
                          <div className="flex space-x-4 flex-col items-center gap-6">
                            <QRCodeSVG value={account.address} size={256} />
                            <div className="font-mono bg-blue-300 border-black rounded p-2 hover:-translate-y-1 hover:shadow-lg">
                              <a href={blockExplorerAddressLink}>
                                {account.address}
                              </a>
                            </div>
                          </div>
                        </div>
                      </label>
                    </label>
                  </div>
                </div>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
