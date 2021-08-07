import { Theme } from '@lookiero/aurora';

import { ShieldTheme } from '@theming';

export const changeAppearance = async ({ color, updateSettings }) => {
  Theme.set({ ...ShieldTheme, $theme: `shield-${color.toString()}`, $colorPrimary: color });

  if (updateSettings) await updateSettings({ appearance: color });
};
