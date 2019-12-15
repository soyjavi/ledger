import {
  func, node, shape, string,
} from 'prop-types';
import React from 'react';

import { L10NProvider, useL10N } from '../reactor/context/L10N';

import { ConnectionProvider, useConnection } from './connection';
import { NavigationProvider, useNavigation } from './navigation';
import { SettingsProvider, useSettings } from './settings';

import { StoreConsumer, StoreProvider, useStore } from './store';

import { L10N } from '../common';

const Consumer = ({ children }) => (
  <StoreConsumer>
    { (store) => children({ l10n: L10N['en-EN'], store })}
  </StoreConsumer>
);

Consumer.propTypes = {
  children: func.isRequired,
};

const Provider = ({ children, dictionary, language }) => (
  <L10NProvider dictionary={dictionary} language={language}>
    <ConnectionProvider>
      <NavigationProvider>
        <StoreProvider>
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </StoreProvider>
      </NavigationProvider>
    </ConnectionProvider>
  </L10NProvider>
);

Provider.propTypes = {
  children: node.isRequired,
  dictionary: shape({}).isRequired,
  language: string.isRequired,
};

export {
  Consumer,
  Provider,

  // ConnectionProvider,
  // L10NProvider,
  // NavigationProvider,
  // SettingsProvider,

  useConnection,
  useL10N,
  useNavigation,
  useSettings,
  useStore,
};
