import { POPULAR_ERC20_TOKENS, type TokenMetadata } from "./tokens";
import { createPublicClient, http, type Address, type Chain, erc20Abi } from "viem";
import { RPC_URL } from "~/utils/config";
import type { TokenClass } from "~/utils/semi_api";

export async function getBalance(address: Address, chain: Chain) {
  const client = createPublicClient({
    chain,
    transport: http(RPC_URL[chain.id]),
  });
  const balance = await client.getBalance({ address });
  return balance;
}

export async function getErc20Balance(address: Address, tokenAddress: Address, chain: Chain) {
  const client = createPublicClient({
    chain,
    transport: http(RPC_URL[chain.id]),
  });
  const balance = await client.readContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address],
  });

  return balance;
}

export interface ERC20Balance {
  token: TokenClass;
  balance: bigint;
}

export async function getPopularERC20Balance(
  tokenClasses: TokenClass[],
  address: Address,
  chain: Chain
): Promise<ERC20Balance[]> {
  const client = createPublicClient({
    chain,
    transport: http(RPC_URL[chain.id]),
  });

  const balances = await Promise.all(
    tokenClasses.map(async (token) => {
      const balance = await client.readContract({
        address: token.address as `0x${string}`,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address],
      });
      return {
        token,
        balance,
      };
    })
  );

  return balances;
}
