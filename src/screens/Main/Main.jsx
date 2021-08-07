import { Footer, FooterItem } from '@lookiero/aurora';
import { Router } from '@lookiero/router';
import { useRouter } from '@lookiero/router';
import React, { useRef, useState } from 'react';

import { L10N, ROUTE } from '@common';
import { Header, ScrollView, Viewport } from '@components';

import { Dashboard } from '../Dashboard';
import { Settings } from '../Settings';
import { Stats } from '../Stats';
import { Vaults } from '../Vaults';
import { style } from './Main.style';

const TITLE = {
  [ROUTE.TAB_DASHBOARD]: L10N.DASHBOARD,
  [ROUTE.TAB_STATS]: L10N.ACTIVITY,
  [ROUTE.TAB_ACCOUNTS]: L10N.VAULTS,
  [ROUTE.TAB_SETTINGS]: L10N.SETTINGS,
};

const Container = (inherit) => {
  const scrollview = useRef(null);
  const { basePath, go, route: { params: { tab } } = {} } = useRouter();

  const value = `/${tab}`;

  const [scroll, setScroll] = useState(false);

  const handleChange = (next) => {
    const isDifferent = next !== value;

    if (isDifferent) go({ path: `${basePath}${next}` });
    scrollview.current.scrollTo({ y: 0, animated: !isDifferent });
  };

  return (
    <Viewport path={ROUTE.MAIN_TAB}>
      <Header isVisible={scroll || value !== ROUTE.TAB_DASHBOARD} title={TITLE[value]} />

      <ScrollView onScroll={setScroll} ref={scrollview}>
        {inherit.children}
      </ScrollView>

      <Footer style={style.footer} value={value} onChange={handleChange}>
        <FooterItem icon="home" text={L10N.DASHBOARD} value={ROUTE.TAB_DASHBOARD} />
        <FooterItem icon="bar-chart" text={L10N.ACTIVITY} value={ROUTE.TAB_STATS} />
        <FooterItem icon="stack" text={L10N.VAULTS} value={ROUTE.TAB_ACCOUNTS} />
        <FooterItem icon="settings" text={L10N.SETTINGS} value={ROUTE.TAB_SETTINGS} />
      </Footer>
    </Viewport>
  );
};

export const Main = () => {
  const { route: { path } = {} } = useRouter();

  return (
    <Router
      basePath={ROUTE.MAIN}
      container={Container}
      memoize
      routes={[
        { path: '/dashboard', component: Dashboard, preload: path === ROUTE.MAIN_TAB },
        { path: '/stats', component: Stats },
        { path: '/accounts', component: Vaults },
        { path: '/settings', component: Settings },
      ]}
    />
  );
};
