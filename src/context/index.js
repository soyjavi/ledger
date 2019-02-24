import {
  func, node, shape, string,
} from 'prop-types';
import React from 'react';

import { ConsumerL10N, ProviderL10N } from '../reactor/context/L10N';
import { ConsumerEvents, ProviderEvents } from './events';
import { ConsumerStore, ProviderStore } from './store';
import { ConsumerNavigation, ProviderNavigation } from './navigation';

const Consumer = ({ children }) => (
  <ConsumerL10N>
    { ({ l10n }) => (
      <ConsumerNavigation>
        { navigation => (
          <ConsumerEvents>
            { events => (
              <ConsumerStore>
                { store => children({
                  l10n, navigation, events, store,
                })}
              </ConsumerStore>
            )}
          </ConsumerEvents>
        )}
      </ConsumerNavigation>
    )}
  </ConsumerL10N>
);

Consumer.propTypes = {
  children: func.isRequired,
};

const Provider = ({
  children, dictionary, language, ...events
}) => (
  <ProviderL10N dictionary={dictionary} language={language}>
    <ProviderNavigation>
      <ProviderEvents {...events}>
        <ProviderStore>
          {children}
        </ProviderStore>
      </ProviderEvents>
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
  ConsumerEvents,
  ProviderEvents,
  ConsumerStore,
  ProviderStore,
  ConsumerNavigation,
  ProviderNavigation,
};
