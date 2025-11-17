import db from "@/server/utils/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { class_id, chain_id } = query;
  if (!class_id || !chain_id) {
    return {
      success: false,
      message: "Invalid request",
      data: [],
    };
  }

  const queryClass = await db.query({
    badge_classes: {
      $: {
        where: { class_id: class_id.toString(), chain_id: Number(chain_id) },
      },
    },
  });

  if (queryClass.badge_classes.length === 0) {
    return {
      success: false,
      message: "Class not found",
      data: null,
    };
  }

  return {
    success: true,
    message: "Class fetched successfully",
    data: queryClass.badge_classes[0],
  };
});
