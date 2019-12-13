import {
  func, node, shape, string,
} from 'prop-types';
import React from 'react';

import { ConsumerL10N, ProviderL10N } from '../reactor/context/L10N';
import { ConnectionProvider, useConnection } from './connection';
import { SettingsProvider, useSettings } from './settings';
import { ConsumerStore, ProviderStore } from './store';
import { ConsumerNavigation, ProviderNavigation } from './navigation';

const Consumer = ({ children }) => (
  <ConsumerL10N>
    { ({ l10n }) => (
      <ConsumerNavigation>
        { (navigation) => (
          <ConsumerStore>
            { (store) => children({ l10n, navigation, store })}
          </ConsumerStore>
        )}
      </ConsumerNavigation>
    )}
  </ConsumerL10N>
);

Consumer.propTypes = {
  children: func.isRequired,
};

const Provider = ({ children, dictionary, language }) => (
  <ProviderL10N dictionary={dictionary} language={language}>
    <ProviderNavigation>
      <ConnectionProvider>
        <ProviderStore>
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </ProviderStore>
      </ConnectionProvider>
    </ProviderNavigation>
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
  ConsumerNavigation,
  ProviderNavigation,

  ConnectionProvider,
  SettingsProvider,

  useConnection,
  useSettings,
};
