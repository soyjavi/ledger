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
  const [timestamp, setTimestamp] = useState();

  const handlePress = (next) => {
    setScreen(next);
    setTimestamp(next === screen ? new Date().getTime() : undefined);
  };

  console.log('  <Main>', { visible, screen });

  const props = { timestamp };

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      {visible && (
        <>
          {screen === SCREEN.DASHBOARD && <Dashboard {...props} />}
          {screen === SCREEN.STATS && <Stats {...props} />}
          {screen === SCREEN.VAULTS && <Vaults {...props} />}
          {screen === SCREEN.SETTINGS && <Settings {...props} />}
        </>
      )}

      <Footer current={screen} visible={visible} onScreen={handlePress} />
    </Viewport>
  );
};

Main.propTypes = {
  backward: PropTypes.bool,
  visible: PropTypes.bool,
};

export { Main };
