export const sola_badge_contract_address = {
  "11155111": {
    profile_registry: "0xC1B1157b9DE39AaE9658787dF96a685971146074",
    badgeUnbounded: "0x19ef0b28A2f2F75403F3D7dDE79A2bBADC37bFDb",
    badgeBounded: "0x8C33d5a518d8fe9F4609ec28Ca3143267A7B25B8",
  },
  "10": {
    profile_registry: "0xbC98c6ae42E9F18E4AB58C73D85990aEf2c0f5f6",
    badgeUnbounded: "0x5145Ba5d5330cc701d45272c62bDa2916beE5CD0",
    badgeBounded: "0xe944B14B2Ea934BBbf57bAf395d8a3B6527c928E",
  },
} as {
  [key: string]: {
    profile_registry: `0x${string}`;
    badgeUnbounded: `0x${string}`;
    badgeBounded: `0x${string}`;
  };
};
