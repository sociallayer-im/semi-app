export default defineEventHandler(async (event) => {
  try {
    const { safeAddress, chainId, timezone } = getQuery(event); // 获取查询参数

    const result = await fetch(
      `https://safe-client.safe.global/v1/chains/${chainId}/safes/${safeAddress}/transactions/history?timezone=${timezone}&trusted=true&imitation=false`
    );

    if (!result.ok) {
      throw createError({
        statusCode: result.status,
        message: `API request failed: ${result.statusText}`,
      });
    }

    const data = await result.json();

    return data;
  } catch (error) {
    console.error("Error in actions.get:", error);
    throw createError({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});
