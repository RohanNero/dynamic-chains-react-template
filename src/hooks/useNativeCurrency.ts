import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import { fetchPriceFromUniswap } from "../utils/fetchPrice";
import { useNetwork } from "wagmi";

const enablePolling = false;

/**
 * Get the price of Native Currency based on Native Token/DAI trading pair from Uniswap SDK
 * @returns nativeCurrencyPrice: number
 */
export const useNativeCurrencyPrice = () => {
  const [nativeCurrencyPrice, setNativeCurrencyPrice] = useState(0);
  const { chain } = useNetwork();

  // Get the price of ETH from Uniswap on mount
  useEffect(() => {
    if (!chain || !chain.id) {
      console.log("chain is undefined!");
      return;
    }
    (async () => {
      const price = await fetchPriceFromUniswap(chain.id);
      setNativeCurrencyPrice(price);
    })();
  }, []);

  // Get the price of ETH from Uniswap at a given interval
  useInterval(
    async () => {
      const price = await fetchPriceFromUniswap();
      setNativeCurrencyPrice(price);
    },
    enablePolling ? 30000 : null
  );

  return nativeCurrencyPrice;
};
