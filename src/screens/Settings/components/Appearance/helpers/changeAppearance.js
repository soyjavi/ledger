import { Theme } from '@lookiero/aurora';

import { ShieldTheme } from '@theming';

export const changeAppearance = async ({ color, updateSettings }) => {
  Theme.set({ ...ShieldTheme, $colorPrimary: color });

  await updateSettings({ appearance: color });
};
