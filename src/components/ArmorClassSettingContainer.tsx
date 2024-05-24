import { Flex, Grow, HoverMenu, Icon, Input, Text, withMemo } from '@ainias42/react-bootstrap-mobile';
import { VisibleEnum, VisibleForMenuEntry } from '@dicetable/plugin-shell';
import { constants } from '@/constants';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { formatArrayLength } from '@/helpers/formatArrayLength';
import { useAcPluginApi } from '@/useAcPluginApi';
import { useShallow } from 'zustand/react/shallow';
import { useT } from '@/useT';
import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import styles from '@/components/armorClassSettingContainer.scss';
import type { ChangeEvent } from 'react';
import type { ClientTokenType} from '@dicetable/plugin-shell';

export type ArmorClassSettingContainerProps = { token: ClientTokenType };

export const ArmorClassSettingContainer = withMemo(function ArmorClassSettingContainer({
    token,
}: ArmorClassSettingContainerProps) {
    const { t } = useT();

    // Refs

    // States/Variables/Selectors
    const api = useAcPluginApi();
    const { usePluginTokenData } = api.stores();

    const acs = usePluginTokenData(
        token.id,
        useShallow((s) => s?.armorClasses ?? [])
    );
    const usedAcs = useMemo(() => formatArrayLength(acs, constants.MAX_ARMOR_CLASSES), [acs]);

    let selectedAc = usePluginTokenData(token.id, (s) => s?.armorClassIndex ?? 0);
    selectedAc = Math.min(Math.max(selectedAc, 0), constants.MAX_ARMOR_CLASSES - 1);
    const visibleFor = usePluginTokenData(token.id, (s) => s?.visibleFor ?? VisibleEnum.EDITORS);

    // Callbacks
    const updateAc = useCallback(
        (ev: ChangeEvent<HTMLInputElement>, index: number, local: boolean) => {
            const newAc = ev.target.value ? Number(ev.target.value) ?? undefined : undefined;
            const newAcs = [...acs];
            newAcs.splice(index, 1, newAc);
            if (local) {
                usePluginTokenData.setLocalState(token.id, { armorClasses: newAcs });
            } else {
                usePluginTokenData.setState(token.id, { armorClasses: newAcs });
            }
        },
        [acs, token.id, usePluginTokenData]
    );

    const updateAcLocally = useCallback(
        (ev: ChangeEvent<HTMLInputElement>, index: number) => {
            updateAc(ev, index, true);
        },
        [updateAc]
    );

    const updateAcForAll = useCallback(
        (ev: ChangeEvent<HTMLInputElement>, index: number) => {
            updateAc(ev, index, false);
        },
        [updateAc]
    );

    const updateVisibleFor = useCallback(
        (newVisibleFor: VisibleEnum) => {
            usePluginTokenData.setState(token.id, { visibleFor: newVisibleFor });
        },
        [token.id, usePluginTokenData]
    );

    // Effects

    // Other
    const menuItems = useMemo(
        () => [
            <VisibleForMenuEntry
                label={t('armor-class.settings.visible-for')}
                value={visibleFor}
                onChange={updateVisibleFor}
            />,
        ],
        [t, updateVisibleFor, visibleFor]
    );

    // RenderFunctions

    return (
        <>
            <Flex horizontal={true}>
                <Grow>
                    <Text>{t('armor-class.settings.label')}</Text>
                </Grow>
                <HoverMenu items={menuItems} openToSide={true} className={styles.menuIcon}>
                    <Icon icon={faEllipsisV} />
                </HoverMenu>
            </Flex>
            <Flex horizontal={true}>
                {usedAcs.map((ac, index) => (
                    <Input
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        type="number"
                        value={ac}
                        onChange={updateAcLocally}
                        onChangeData={index}
                        onChangeDone={updateAcForAll}
                        onChangeDoneData={index}
                        className={classNames(styles.acInput, { [styles.active]: index === selectedAc })}
                        label={t('armor-class.settings.item-label', { index: index + 1 })}
                    />
                ))}
                <Grow />
            </Flex>
        </>
    );
},
styles);
