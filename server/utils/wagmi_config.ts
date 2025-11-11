import { createConfig } from "@wagmi/core";
import { mainnet, sepolia, optimism } from "viem/chains";
import { http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

export const client = createConfig({
  chains: [mainnet, sepolia, optimism],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
  },
});

export const account = privateKeyToAccount(process.env.SOLA_BADGE_ADMIN_WALLET_PRIVATE_KEY as `0x${string}`);

export const wagmi_config = {
    client,
    account
}
