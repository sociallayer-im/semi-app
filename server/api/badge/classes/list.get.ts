import { getProfileId } from "@/server/utils";
import db from "@/server/utils/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { chain_id, wallet_address } = query;
  if (!wallet_address || !chain_id) {
    return {
      success: false,
      message: "Invalid request",
      data: [],
    };
  }

  const profile_id = getProfileId(wallet_address as string, Number(chain_id));
  const queryClasses = await db.query({
    badge_classes: {
      $: { where: { profile_id, chain_id: Number(chain_id) } },
    },
  });

  return {
    success: true,
    message: "Classes fetched successfully",
    data: queryClasses,
  };
});
