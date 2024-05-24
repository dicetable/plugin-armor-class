import { ArrayHelper } from '@ainias42/js-helper';
import {
    EditableText,
    IconThree,
    VisibleEnum,
    hasRight,
    isVisibleFor,
    useMe,
    useTokenBoundingBox,
    useTokens,
} from '@dicetable/plugin-shell';
import { faShield } from '@fortawesome/free-solid-svg-icons';
import { useAcPluginApi } from '@/useAcPluginApi';
import { useShallow } from 'zustand/react/shallow';
import { withMemo } from '@ainias42/react-bootstrap-mobile';
import React, { useCallback, useMemo } from 'react';

export type ArmorClassSymbolProps = { tokenId: number };

export const ArmorClassSymbol = withMemo(function ArmorClassSymbol({ tokenId }: ArmorClassSymbolProps) {
    // Refs

    // States/Variables/Selectors
    const api = useAcPluginApi();
    const { usePluginTokenData } = api.stores();
    const me = useMe();
    const token = useTokens((s) => s.tokens[tokenId]);
    const canEditToken = useMemo(() => hasRight(token?.editors ?? [], me), [me, token?.editors]);

    const boundingBox = useTokenBoundingBox();
    const dimension = boundingBox.getDimension();

    const acs = usePluginTokenData(
        tokenId,
        useShallow((s) => ArrayHelper.noUndefined(s?.armorClasses ?? []).filter((ac) => ac !== null))
    );

    let selectedAc = usePluginTokenData(tokenId, (s) => s?.armorClassIndex ?? 0);
    selectedAc = Math.min(Math.max(selectedAc, 0), acs.length - 1);
    const visibleFor = usePluginTokenData(tokenId, (s) => s?.visibleFor ?? VisibleEnum.EDITORS);

    // Dispatch

    // Callbacks
    const updateAc = useCallback(
        (newAc: string) => {
            let newAcValue: undefined | number;

            if (newAc.trim() === '') {
                return;
            }

            const acNumber = parseInt(newAc, 10);
            if (Number.isNaN(acNumber)) {
                return;
            }

            const currentAc = acs[selectedAc] ?? 0;
            newAcValue = acNumber;
            if (newAc.startsWith('+') || newAc.startsWith('-')) {
                newAcValue = currentAc + acNumber;
            }

            const newAcs: (number | undefined)[] = [...acs];
            newAcs[selectedAc] = newAcValue;
            usePluginTokenData.setState(tokenId, { armorClasses: newAcs });
        },
        [acs, selectedAc, tokenId, usePluginTokenData]
    );

    const changeAc = useCallback(() => {
        const newSelectedAc = (selectedAc + 1) % acs.length;
        usePluginTokenData.setState(tokenId, { armorClassIndex: newSelectedAc });
    }, [acs.length, selectedAc, tokenId, usePluginTokenData]);

    // Effects

    // Other
    if (!isVisibleFor(visibleFor, token?.editors ?? [], me) || acs.length === 0) {
        return null;
    }

    const ac = acs[selectedAc];

    const diff = {
        x: -5,
        y: 5,
    };
    let width = Math.min(dimension.x / 2, 30);
    if (dimension.x > 100) {
        width = 40;
        diff.x = 0;
        diff.y = 0;
    }
    const height = width;
    // RenderFunctions

    return (
        <group position-x={diff.x} position-y={dimension.y + diff.y} position-z={0.00001}>
            <IconThree
                icon={faShield}
                position={{
                    x: 0,
                    y: 0,
                }}
                color="#000000"
                size={width}
                anchorX="left"
                anchorY="top"
            />
            <EditableText
                onEditText={canEditToken ? updateAc : undefined}
                startPosition={{ x: 0, y: -height }}
                endPosition={{ x: width, y: 0 }}
                onClick={canEditToken && acs.length >= 2 ? changeAc : undefined}
                text={`${ac}`}
                height={0.00001}
                expandForText={true}
                fontSize={width / 2}
            />
        </group>
    );
});
