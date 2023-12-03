import { useCallback, useEffect, useState } from "react";
import { useBalance, useNetwork } from "wagmi";
import {
  encodeFunctionData,
  decodeFunctionResult,
  createPublicClient,
  http,
} from "viem";
import aggregatorV3InterfaceABI from "../abi/pricefeedAbi";
import { chainData } from "../config/chainData";

// This hook gets the user's balance using wagmi's `useBalance()`
// and gets the user's balance in terms of USD using chainlink's pricefeeds.
export function useAccountBalance(address?: string) {
  const [isEthBalance, setIsEthBalance] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const { chain } = useNetwork();

  const targetNetworkId = chain?.id;

  const {
    data: fetchedBalanceData,
    isError,
    isLoading,
    refetch,
  } = useBalance({
    address: address as `0x${string}` | undefined,
    watch: true,
    chainId: targetNetworkId,
  });

  const fetchPrice = async () => {
    if (!chain || !chain.id) {
      console.log("Error fetching price: chain is undefined.");
    }
    // Easier to use mainnet Ethereum pricefeeds instead of swapping URL everytime the user switches chains.
    // For chains that don't have a native token/USD pricefeed on Ethereum mainnet,
    // you must pass an rpc url for the chain explicity.

    let url = "";
    const listedUrl = chain?.id ? chainData[chain.id].url : undefined;
    if (listedUrl) {
      console.log(`Url found: ${listedUrl}!`);
      console.log(`Using publicClient for ${chain?.name}...`);
      url = listedUrl;
    } else {
      url = process.env.NEXT_PUBLIC_MAINNET_RPC_URL || "";
    }
    const publicClient = createPublicClient({
      transport: http(url),
    });

    const data = encodeFunctionData({
      abi: aggregatorV3InterfaceABI,
      functionName: "latestRoundData",
    });
    const priceData = await publicClient.call({
      data: data,
      to: (chainData[chain?.id]?.priceFeed as `0x${string}`) || "",
    });
    if (!priceData || !priceData.data) {
      console.log("priceData is undefined...");
      return;
    }
    const decodedPriceData = decodeFunctionResult({
      abi: aggregatorV3InterfaceABI,
      functionName: "latestRoundData",
      data: priceData.data,
    });
    console.log("price:", decodedPriceData[1]);
    setPrice(Number(decodedPriceData[1]));
  };

  const onToggleBalance = useCallback(() => {
    fetchPrice();
    if (price > 0) {
      setIsEthBalance(!isEthBalance);
    }
  }, [isEthBalance, price]);

  useEffect(() => {
    console.log("use effect reached!");
    console.log("fetchedBalance:", fetchedBalanceData);
    if (fetchedBalanceData?.formatted) {
      setBalance(Number(fetchedBalanceData.formatted));
    }
    fetchPrice();
  }, [fetchedBalanceData]);

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
