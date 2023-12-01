import { useCallback, useEffect, useState } from "react";
import { useBalance, useNetwork } from "wagmi";
import { useGlobalState } from "../config/globalState";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

export function useAccountBalance(address?: string) {
  const [isEthBalance, setIsEthBalance] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);
  const price = useGlobalState((state) => state.nativeCurrencyPrice);
  const { chain } = useNetwork();

  console.log("chain:", chain?.id);

  const targetNetworkId = chain?.id;

  const {
    data: fetchedBalanceData,
    isError,
    isLoading,
    refetch,
  } = useBalance({
    address,
    watch: true,
    chainId: targetNetworkId,
  });

  const onToggleBalance = useCallback(() => {
    if (price > 0) {
      setIsEthBalance(!isEthBalance);
    }
  }, [isEthBalance, price]);

  useEffect(() => {
    console.log("fetchedBalance:", fetchedBalanceData);
    if (fetchedBalanceData?.formatted) {
      setBalance(Number(fetchedBalanceData.formatted));
    }
  }, [fetchedBalanceData]);

  // console.log("balance:", balance);
  // console.log("isLoading:", isLoading);

  return {
    balance,
    price,
    isError,
    isLoading,
    onToggleBalance,
    isEthBalance,
    refetch,
  };
}
