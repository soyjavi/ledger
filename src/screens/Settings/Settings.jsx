import React from 'react';

import { ROUTE } from '@common';
import { Viewport } from '@components';

import { Appearance, BaseCurrency, QR } from './components';

const Settings = () => (
  <Viewport path={ROUTE.TAB_SETTINGS} stackMode={false}>
    <QR />
    <BaseCurrency />
    <Appearance />
  </Viewport>
);

Settings.displayName = 'Settings';

export { Settings };
