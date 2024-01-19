import "@dicetable/plugin-shell";
import type { ArmorClassObjectData } from "@/ArmorClassObjectData";
import type { constants } from "@/constants";

declare module "@dicetable/plugin-shell" {
    interface PluginObjectData {
        [constants.PLUGIN_ID]: ArmorClassObjectData
    }
}
