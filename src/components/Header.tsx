import React from "react";
import { useEffect } from "react";
import * as chains from "viem/chains";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { RainbowKitCustomConnectButton } from "./ConnectButton";
import { includedChains, chainData } from "../config/chainData";

export const Header = () => {
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  // const { connect, connectors, error, isLoading, pendingConnector } =
  //   useConnect();

  // const [network, setNetwork] = useState("");

  useEffect(() => {
    if (!chain || !chain.id) return;
    console.log(`Switching to chainId ${chain.id}...`);
    switchNetwork?.(chain.id);
  }, [chain]);

  return (
    <div className="top-0 border-b border-gray-400 min-h-0 flex flex-row gap-3 items-center justify-end">
      <div className="mr-4 my-4">
        <select
          defaultValue={
            chain?.id && includedChains.includes(chain?.id)
              ? undefined
              : "Select Network"
          }
          value={
            chain?.id && includedChains.includes(chain?.id)
              ? undefined
              : "Select Network"
          }
          className="select select-sm sm:w-fit w-20 mr-2"
          style={{
            borderWidth: 1,
            borderColor: chain?.id
              ? chainData[chain.id]?.color?.toString()
              : "#bbbbbb",
          }}
          onChange={(event) => {
            const [, id] = event.target.value.split("|");
            switchNetwork?.(+id);
          }}
        >
          <option disabled>Select Network</option>
          {Object.entries(chains)
            .filter(([, chainValue]) => includedChains.includes(chainValue.id))
            .map(([chainKey, chainValue]) => (
              <option
                key={chainKey}
                value={`${chainKey}|${chainValue.id}`}
                style={{
                  color:
                    chainData[chainValue.id]?.color?.toString() || "#bbbbbb",
                }}
                selected={chain?.id === chainValue.id}
              >
                {chainValue.name}
              </option>
            ))}
        </select>
      </div>
      <div className="mr-4">
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};
