import { wagmi_config } from "@/server/utils/wagmi_config";
import {
    writeProfileRegistrySetContractAllowed,
} from "@/server/utils/solar_badge";
import { sola_badge_contract_address } from "@/server/utils/solar_badge/contracts";

export default defineEventHandler(async (event) => {
    const hash = await writeProfileRegistrySetContractAllowed(wagmi_config.client,{
        account: wagmi_config.account,
        address: sola_badge_contract_address['11155111'].profile_registry,
        args: [
            sola_badge_contract_address['11155111'].badgeUnbounded,
            true,
        ],
        chainId: 11155111,
    })

    return {
        success: true,
        message: "Contract allowed set successfully",
        data: {
            hash,
        },
    };
});