import { usePluginApi } from "@dicetable/plugin-shell";
import type { constants } from "@/constants";

export function useAcPluginApi(){
    return usePluginApi<typeof constants.PLUGIN_ID>();
}
