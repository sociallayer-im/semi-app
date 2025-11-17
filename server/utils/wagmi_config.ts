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

export const admin_account = (chain_id: number) => {
  switch (chain_id) {
    case 11155111:
      return privateKeyToAccount(
        process.env.SEPOLIA_SOLA_BADGE_ADMIN_WALLET_PRIVATE_KEY as `0x${string}`
      );
    case 10:
      return privateKeyToAccount(
        process.env.OP_SOLA_BADGE_ADMIN_WALLET_PRIVATE_KEY as `0x${string}`
      );
    default:
      throw new Error("ACCOUNT_NOT_FOUND: Invalid chain id");
  }
};

export const wagmi_config = {
  client,
  admin_account,
};
