import React from 'react';

import { Appearance, BaseCurrency, QR } from './components';

const Settings = () => (
  <>
    <QR />
    <BaseCurrency />
    <Appearance />
  </>
);

Settings.displayName = 'Settings';

export { Settings };
