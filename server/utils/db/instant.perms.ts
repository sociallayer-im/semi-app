// instant.perms.ts
import type { InstantRules } from "@instantdb/admin";

const rules = {
  profiles: {
    allow: {
      view: "true",
      create: "false",
      update: "false",
      delete: "false",
    },
  }
} satisfies InstantRules;

export default rules;
