import type { PluginManifestType } from '@dicetable/plugin-shell';

export default {
    apiVersion: 2,
    id: 'example.dicetable.plugin-ac',
    label: {
        en: 'Armor Class',
        de: 'Armor Class',
    },
    description: {
        en: 'Show armor class on the tokens.',
        de: 'Zeige Armor Class am Token.',
    },
    version: '1.0.2',
} as const satisfies PluginManifestType;
