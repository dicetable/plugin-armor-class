import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

/**
 * Per default, the t-function is not memoized. This is fixes that.
 */
export function useT(key?: string): { t: TFunction; lang: string } {
    const { t: _t, i18n } = useTranslation(key);

    const lang = i18n.language;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => ({ t: _t, lang }), [lang]);
}
