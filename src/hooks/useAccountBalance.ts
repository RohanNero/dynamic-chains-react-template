import { useCallback, useEffect, useState } from "react";
import { useBalance, useNetwork } from "wagmi";
import { useGlobalState } from "../config/globalState";
// import { getTargetNetwork } from "~~/utils/scaffold-eth";
import {
  encodeFunctionData,
  decodeFunctionResult,
  createPublicClient,
  http,
} from "viem";
import aggregatorV3InterfaceABI from "../abi/pricefeedAbi";
import { chainData } from "../config/chainData";

export function useAccountBalance(address?: string) {
  const [isEthBalance, setIsEthBalance] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  // const price = useGlobalState((state) => state.nativeCurrencyPrice);
  const { chain } = useNetwork();

  console.log("chain:", chain?.id);
  // console.log("price:", price);

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

  const fetchPrice = async () => {
    if (!chain || !chain.id) {
      console.log("Error fetching price: chain is undefined.");
    }
    // let publicClient: ReturnType<typeof createPublicClient> | undefined;
    // if (typeof window !== "undefined" && window.ethereum) {
    const publicClient = createPublicClient({
      // transport: custom(window.ethereum),
      transport: http(process.env.NEXT_PUBLIC_MAINNET_RPC_URL),
    });

    console.log("abi:", aggregatorV3InterfaceABI);
    const data = encodeFunctionData({
      abi: aggregatorV3InterfaceABI,
      functionName: "latestRoundData",
    });
    console.log("data:", data);
    console.log("to:", chainData[chain.id].priceFeed);
    console.log("chain:", chain);

    const priceData = await publicClient.call({
      data: data,
      to: chainData[chain.id].priceFeed,
      // to: "0xFF3EEb22B5E3dE6e705b44749C2559d704923FD7",
    });
    console.log("priceData:", priceData);
    if (!priceData || !priceData.data) {
      console.log("priceData is undefined...");
      return;
    }
    const decodedPriceData = decodeFunctionResult({
      abi: aggregatorV3InterfaceABI,
      functionName: "latestRoundData",
      data: priceData.data,
    });
    console.log("decoded price:", decodedPriceData);
    setPrice(Number(decodedPriceData[1]));
    // } else {
    //   throw new Error("Window ethereum is undefined!");
    // }
  };

  const onToggleBalance = useCallback(() => {
    console.log("toggle reached");
    console.log("toggle price:", price);
    fetchPrice();
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

  useEffect(() => {
    console.log("use effect reached!");
    fetchPrice();
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
