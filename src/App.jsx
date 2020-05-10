import React from 'react';
import { LayoutView } from 'reactor/components';

import { C, L10N } from '@common';
import { Provider } from '@context';

import { Router } from './App.router';
import styles from './App.style';

const { LANGUAGE } = C;

const App = () => {
  console.log('<App>');

  return (
    <Provider dictionary={L10N} language={LANGUAGE}>
      <LayoutView style={styles.container}>
        <Router />
      </LayoutView>
    </Provider>
  );
};

export { App };
