import { useAccountBalance } from "../hooks/useAccountBalance";
// import { useEffect } from "react";
// import { createPublicClient, custom } from "viem";
import * as chains from "viem/chains";

type TBalanceProps = {
  address?: string;
  chainId: string;
  className?: string;
};

// Displays balance of an ETH address in terms of the chain's native currency and in USD
export const Balance = ({
  address,
  chainId,
  className = "",
}: TBalanceProps) => {
  const { balance, price, isError, isLoading, onToggleBalance, isEthBalance } =
    useAccountBalance(address);
  const currentChain = Object.values(chains).find(
    (chain) => chain.id === Number(chainId)
  );

  // useEffect(() => {
  //   let publicClient: ReturnType<typeof createPublicClient> | undefined;
  //   if (typeof window !== "undefined" && window.ethereum) {
  //     publicClient = createPublicClient({
  //       transport: custom(window.ethereum),
  //     });
  //   } else {
  //     throw new Error("Window ethereum is undefined!");
  //   }
  // }, []);

  if (!address || isLoading || balance === null) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-300 h-6 w-6"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 bg-slate-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={`border-2 border-gray-400 rounded-md px-2 flex flex-col items-center max-w-fit cursor-pointer`}
      >
        <div className="text-warning">Error</div>
      </div>
    );
  }

  return (
    <button
      className={`btn btn-sm btn-ghost flex flex-col font-normal items-center hover:bg-transparent ${className}`}
      onClick={onToggleBalance}
    >
      <div className="w-full flex items-center justify-center">
        {isEthBalance ? (
          <>
            <span>{balance?.toFixed(4)}</span>
            <span className="text-[0.8em] font-bold ml-1">
              {currentChain.nativeCurrency.symbol}
            </span>
          </>
        ) : (
          <>
            <span className="text-[0.8em] font-bold mr-1">$</span>
            <span>{((balance * price) / 1e8).toFixed(2)}</span>
          </>
        )}
      </div>
    </button>
  );
};
