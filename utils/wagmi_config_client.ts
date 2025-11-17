import { createConfig } from "@wagmi/core";
import { mainnet, sepolia, optimism } from "viem/chains";
import { http } from "viem";

export const client = createConfig({
  chains: [mainnet, sepolia, optimism],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
  },
});
