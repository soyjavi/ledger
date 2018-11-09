import { func, node } from 'prop-types';
import React from 'react';

import { ConsumerL10N, ProviderL10N } from 'reactor/context/L10N';
import { ConsumerStore, ProviderStore } from './store';
import { ConsumerNavigation, ProviderNavigation } from './navigation';

const Consumer = ({ children }) => (
  <ConsumerL10N>
    { ({ l10n }) => (
      <ConsumerNavigation>
        { navigation => (
          <ConsumerStore>
            { store => children({ l10n, navigation, store })}
          </ConsumerStore>
        )}
      </ConsumerNavigation>
    )}
  </ConsumerL10N>

);

Consumer.propTypes = {
  children: func.isRequired,
};

const Provider = ({ children, ...l10n }) => (
  <ProviderL10N {...l10n}>
    <ProviderNavigation>
      <ProviderStore>
        {children}
      </ProviderStore>
    </ProviderNavigation>
  </ProviderL10N>
);

Provider.propTypes = {
  children: node.isRequired,
};

export {
  Consumer,
  Provider,
  ConsumerStore,
  ProviderStore,
  ConsumerNavigation,
  ProviderNavigation,
};
