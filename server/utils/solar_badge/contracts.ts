export const sola_badge_contract_address = {
    '11155111': {
        profile_registry: '0x7bC3Fd7c2DaED3b783D2a90C90b6F2776Bd4C40F',
        badgeUnbounded: '0x01e82Be7Bd59482Ae63338Fe790376452Fe59778',
        badgeBounded: '0x2B0eA2951395C4F0bc4b1c15B207dCE1758cd467' 
    }
} as {
    [key: string]: {
        profile_registry: `0x${string}`;
        badgeUnbounded: `0x${string}`;
        badgeBounded: `0x${string}`;
    }
}