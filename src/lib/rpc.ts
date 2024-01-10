import { isServer } from "@/lib/environment";
import { createPublicClient, http } from "viem";

export const mainnetRpcUrl =  isServer
  ? `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
  : `${window.location.origin}/rpc/ethereum`;

export const publicClient = createPublicClient({
  transport: http(mainnetRpcUrl),
  batch: {
    multicall: {
      wait: 1,
    },
  },
});
