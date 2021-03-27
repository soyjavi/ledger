import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Viewport } from 'reactor/components';

import { C } from '@common';
import { Footer } from '@components';

import { Dashboard } from '../Dashboard';
import { Settings } from '../Settings';
import { Stats } from '../Stats';
import { Vaults } from '../Vaults';

const { SCREEN } = C;

const Main = ({ visible, ...inherit }) => {
  const [screen, setScreen] = useState(SCREEN.DASHBOARD);

  console.log('  <Main>', { visible, screen });

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      {visible && (
        <>
          {screen === SCREEN.DASHBOARD && <Dashboard />}
          {screen === SCREEN.STATS && <Stats />}
          {screen === SCREEN.VAULTS && <Vaults />}
          {screen === SCREEN.SETTINGS && <Settings />}
        </>
      )}

      <Footer current={screen} visible={visible} onScreen={setScreen} />
    </Viewport>
  );
};

Main.propTypes = {
  backward: PropTypes.bool,
  visible: PropTypes.bool,
};

export { Main };
