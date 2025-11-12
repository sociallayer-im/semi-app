import db from "@/server/utils/db";

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);
  let { token_address, token_id } = params;

  // bigint string to hash
  if (token_id.endsWith("n")) {
    token_id = token_id.slice(0, -1);
  }

  const token_id_hash = "0x" + BigInt(token_id).toString(16);

  const queryBadge = await db.query({
    badges: {
      $: {
        where: {
          badge_id: token_id_hash,
        },
      },
    },
  });

  if (queryBadge.badges.length === 0) {
    return {
      success: false,
      message: "invalid token id",
    };
  }

  const badge = queryBadge.badges[0];

  return {
    name: badge.metadata.badge_name,
    description: badge.metadata.badge_description,
    image: badge.metadata.badge_image_url,
  };
});
