import { init } from '@instantdb/admin';
import schema from './instant.schema';

export function createDb(appId: string, adminToken: string) {
  return init({
    appId: appId,
    adminToken: adminToken,
    schema
  });
}

const db = createDb(process.env.INSTANT_APP_ID!, process.env.INSTANT_APP_ADMIN_TOKEN!);

export type InstantDb = ReturnType<typeof createDb>;

export default db