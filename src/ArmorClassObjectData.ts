import type { VisibleEnum } from '@dicetable/plugin-shell';

export type ArmorClassObjectData = {
    armorClasses: (number | undefined)[];
    armorClassIndex: number;
    visibleFor: VisibleEnum;
};
