// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/admin";

const _schema = i.schema({
  entities: {
    $files: i.entity({
      path: i.string().unique().indexed(),
      url: i.string().optional(),
    }),
    $users: i.entity({
      email: i.string().unique().indexed().optional(),
      imageURL: i.string().optional(),
      type: i.string().optional(),
    }),
    profiles: i.entity({
      profile_id: i.string().unique().indexed(),
      wallet_address: i.string().indexed(),
      chain_id: i.number().indexed(),
      tx_hash: i.string().indexed(),
    }),
    badge_classes: i.entity({
      class_id: i.string().unique().indexed(),
      chain_id: i.number().indexed(),
      profile_id: i.string().indexed(),
      wallet_address: i.string().indexed(),
      badge_contract_address: i.string().indexed(),
      metadata: i.json(),
      tx_hash: i.string().indexed(),
    }),
    badges: i.entity({
      badge_id: i.string().unique().indexed(),
      class_id: i.string().indexed(),
      wallet_address: i.string().indexed(),
      metadata: i.json(),
      chain_id: i.number().indexed(),
      tx_hash: i.string().optional().indexed(),
      status: i.string().indexed(),
      created_at: i.date(),
    }),
    errors: i.entity({
      error: i.json().optional(),
      href: i.string().indexed().optional(),
      info: i.json().optional(),
      created_at: i.date().indexed().optional(),
      wallet_address: i.string().indexed().optional(),
    }),
  },
  links: {},
  rooms: {},
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
