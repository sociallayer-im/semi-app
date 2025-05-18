import { formatEther } from 'viem'
import { formatUnits } from 'viem'
import bignumber from 'bignumber.js'


export function formatAddress(address: string) {
    return address.slice(0, 6) + '...' + address.slice(-4)
}

export function displayBalance(wei: bigint, fixed=4, decimals=18) {
    const value = formatUnits(wei, decimals)
    console.log('value', value)
    const str =  new bignumber(value).toFormat(fixed, 1)
    // remove trailing zeros
    console.log('str', str)
    return str.replace(/\.?0+$/, '')
}
