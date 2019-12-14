import {
  func, node, shape, string,
} from 'prop-types';
import React from 'react';

import { ConsumerL10N, ProviderL10N } from '../reactor/context/L10N';

import { ConnectionProvider, useConnection } from './connection';
import { NavigationProvider, useNavigation } from './navigation';
import { SettingsProvider, useSettings } from './settings';

import { ConsumerStore, ProviderStore } from './store';

const Consumer = ({ children }) => (
  <ConsumerL10N>
    { ({ l10n }) => (
      <ConsumerStore>
        { (store) => children({ l10n, store })}
      </ConsumerStore>
    )}
  </ConsumerL10N>
);

Consumer.propTypes = {
  children: func.isRequired,
};

const Provider = ({ children, dictionary, language }) => (
  <ProviderL10N dictionary={dictionary} language={language}>
    <ConnectionProvider>
      <NavigationProvider>
        <ProviderStore>
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </ProviderStore>
      </NavigationProvider>
    </ConnectionProvider>
  </ProviderL10N>
);

Provider.propTypes = {
  children: node.isRequired,
  dictionary: shape({}).isRequired,
  language: string.isRequired,
};

export {
  Consumer,
  Provider,
  ConsumerStore,
  ProviderStore,

  ConnectionProvider,
  NavigationProvider,
  SettingsProvider,

  useConnection,
  useNavigation,
  useSettings,
};
