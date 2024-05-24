import { ArmorClassSettingContainer } from '@/components/ArmorClassSettingContainer';
import { ArmorClassSymbol } from '@/components/ArmorClassSymbol';
import { Events, TokenWindowTab, registerPlugin, useGlobalSettings } from '@dicetable/plugin-shell';
import { translationPromise } from '@/initI18n';
import i18n from 'i18next';
import manifest from '@/manifest';

registerPlugin(manifest.id, (api) => {
    // First add the input for the AC to the token window
    api.addTokenWindowElement({
        order: 250,
        tab: TokenWindowTab.SETTINGS,
        id: 'armor-class-settings', // This has to be unique within the plugin, as it is prefixed with the plugin id,
        renderer: ArmorClassSettingContainer,
    });

    // Then we add the AC-Object for the token
    api.addTokenElement({
        id: 'armor-class-symbol', // This has to be unique within the plugin, as it is prefixed with the plugin id,
        renderer: ArmorClassSymbol,
    });

    translationPromise.then(() => {
        // Set the current language
        i18n.changeLanguage(useGlobalSettings.getState().language);
        api.on(Events.CHANGE_LANGUAGE, ({ data: language }) => {
            i18n.changeLanguage(language);
        });
    });
});
