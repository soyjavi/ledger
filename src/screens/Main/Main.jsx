import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Viewport } from 'reactor/components';

import { C } from '@common';
import { Footer } from '@components';

import { Dashboard } from '../Dashboard';
import { Settings } from '../Settings';
import { Stats } from '../Stats';
import { Vaults } from '../Vaults';

const {
  SCREEN: { DASHBOARD, STATS, VAULTS, SETTINGS },
} = C;

const Main = ({ visible, ...inherit }) => {
  const [screen, setScreen] = useState(DASHBOARD);
  const [screens, setScreens] = useState({
    [DASHBOARD]: Dashboard,
    [SETTINGS]: Settings,
    [STATS]: Stats,
    [VAULTS]: Vaults,
  });
  const [timestamp, setTimestamp] = useState();

  useEffect(() => {
    if (!screens[screen]) {
      setScreens({ ...screens, [screen]: undefined });
    }
  }, [screen]);

  const handlePress = (next) => {
    setScreen(next);
    setTimestamp(next === screen ? new Date().getTime() : undefined);
  };

  console.log('  <Main>', { visible, screen, screens });

  const props = { timestamp };

  Object.keys((screens) => {});

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      {visible && (
        <>
          {screen === DASHBOARD && <Dashboard {...props} />}
          {screen === STATS && <Stats {...props} />}
          {screen === VAULTS && <Vaults {...props} />}
          {screen === SETTINGS && <Settings {...props} />}
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
