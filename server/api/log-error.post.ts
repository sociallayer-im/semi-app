import db from '@/server/utils/db';
import { id } from '@instantdb/admin';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { error, href, info, wallet_address } = body;
    console.error(error);
    await db.transact([
        db.tx.errors[id()].create({
            error: error,
            href: href,
            info: JSON.stringify(info),
            wallet_address: wallet_address,
            created_at: new Date(),
        }),
    ]);
    return { success: true, message: "Error logged successfully" };
});