import { node, shape, string } from 'prop-types';
import React from 'react';

import { L10NProvider, useL10N } from '../reactor/context/L10N';

import { ConnectionProvider, useConnection } from './connection';
import { NavigationProvider, useNavigation } from './navigation';
import { SettingsProvider, useSettings } from './settings';
import { SnackBarProvider, useSnackBar } from './snackbar';
import { StoreProvider, useStore } from './store';

const Provider = ({ children, dictionary, language }) => (
  <L10NProvider dictionary={dictionary} language={language}>
    <ConnectionProvider>
      <NavigationProvider>
        <StoreProvider>
          <SettingsProvider>
            <SnackBarProvider>
              {children}
            </SnackBarProvider>
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
  Provider,

  useConnection,
  useL10N,
  useNavigation,
  useSettings,
  useSnackBar,
  useStore,
};
