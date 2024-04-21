import React from "react";
import { useEffect } from "react";
import * as chains from "viem/chains";
import { useAccount, useSwitchChain } from "wagmi";
import { RainbowKitCustomConnectButton } from "./ConnectButton";
import { includedChains, chainData } from "../config/chainData";

export const Header = () => {
  const { switchChain } = useSwitchChain();
  const { chain } = useAccount();

  useEffect(() => {
    if (!chain || !chain.id) return;
    console.log(`Switching to chainId ${chain.id}...`);
    switchChain?.(chain.id);
  }, [chain]);

  return (
    <div className="top-0 border-b border-gray-400 min-h-0 flex flex-row gap-3 items-center justify-end">
      <div className="mr-4 my-4">
        <select
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
            console.log("Switching to chain:", +id);
            switchChain?.({ chainId: +id });
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
