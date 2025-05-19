import { formatUnits } from 'viem'
import bignumber from 'bignumber.js'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)


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

export interface ActionPreview {
    from: string
    to: string
    value: bigint
    date: string,
    status: string,
    direction: string,
    token: string | 'NATIVE_COIN'
    type: string
    txHex: string
}

export function parseActions(history: any[]) {
    const actions: ActionPreview[] = []
    history
    .filter((item) => item.type === 'TRANSACTION' && item.transaction.txInfo.type !== 'Creation')
    .forEach((item) => {
        console.log('item', item)
        actions.push({
            from: item.transaction.txInfo.sender.value,
            to: item.transaction.txInfo.recipient.value,
            value: item.transaction.txInfo.transferInfo.value,
            date: item.transaction.timestamp,
            status: item.transaction.txStatus,
            direction: item.transaction.direction,
            token: item.transaction.txInfo.transferInfo.type,
            type: item.transaction.txInfo.type,
            txHex: item.transaction.txHash,
        })
    })

    return actions
}

export function displayDate(date: string) {
    return dayjs(date).fromNow()
}
