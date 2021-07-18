import { Footer, FooterItem } from '@lookiero/aurora';
import { BlurView } from 'expo-blur';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { C, L10N } from '@common';
import { Viewport } from '@components';

import { Dashboard } from '../Dashboard';
import { Settings } from '../Settings';
import { Stats } from '../Stats';
import { Vaults } from '../Vaults';
import { style } from './Main.style';

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
    if (!screens[screen]) setScreens({ ...screens, [screen]: undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  const handleChange = (next) => {
    setScreen(next);
    setTimestamp(next === screen ? new Date().getTime() : undefined);
  };

  console.log('  <Main>', { visible, screen, screens });

  const props = { timestamp };

  return (
    <>
      <Viewport {...inherit} visible={visible}>
        {visible && (
          <>
            {screen === DASHBOARD && <Dashboard {...props} />}
            {screen === STATS && <Stats {...props} />}
            {screen === VAULTS && <Vaults {...props} />}
            {screen === SETTINGS && <Settings {...props} />}

            <Footer
              // ? TODO: Research the way for get a <BlurView> with a fixed height
              // container={({ children }) => (
              //   <BlurView intensity={100} style={style.blur} tint="dark">
              //     {children}
              //   </BlurView>
              // )}
              style={style.footer}
              value={screen}
              onChange={handleChange}
            >
              <FooterItem icon="home" text={L10N.DASHBOARD} value={DASHBOARD} />
              <FooterItem icon="bar-chart" text={L10N.ACTIVITY} value={STATS} />
              <FooterItem icon="stack" text={L10N.VAULTS} value={VAULTS} />
              <FooterItem icon="settings" text={L10N.SETTINGS} value={SETTINGS} />
            </Footer>
          </>
        )}
      </Viewport>
    </>
  );
};

Main.propTypes = {
  backward: PropTypes.bool,
  visible: PropTypes.bool,
};

export { Main };
