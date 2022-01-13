import React from 'react';

import { C, ROUTE } from '@common';
import { Viewport } from '@components';

import { BaseCurrency, Blockchain, Developer, QR } from './components';

const { IS_DEV } = C;

const Settings = () => (
  <Viewport path={ROUTE.TAB_SETTINGS} stackMode={false}>
    {IS_DEV && <Developer />}
    <Blockchain />
    <QR />
    <BaseCurrency />
  </Viewport>
);

Settings.displayName = 'Settings';

export { Settings };
