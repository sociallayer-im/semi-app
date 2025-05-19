export default defineEventHandler(async (event) => {
    const {safeAddress, chainId, timezone} = getQuery(event) // 获取查询参数
    
    const result = await fetch(`https://safe-client.safe.global/v1/chains/${chainId}/safes/${safeAddress}/transactions/history?timezone=${timezone}&trusted=true&imitation=false`)

    const data = await result.json()

    return data
  })