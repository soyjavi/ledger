import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import { L10N } from '@common';
import { Header, ScrollView } from '@components';

import { Appearance, BaseCurrency, QR } from './components';

const Settings = ({ timestamp }) => {
  const scrollview = useRef(null);

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    if (timestamp) scrollview.current.scrollTo({ y: 0, animated: true });
  }, [timestamp]);

  return (
    <>
      <Header visible={scroll} title={L10N.SETTINGS} />

      <ScrollView onScroll={setScroll} ref={scrollview}>
        <QR />
        <BaseCurrency />
        <Appearance />
      </ScrollView>
    </>
  );
};

Settings.propTypes = {
  timestamp: PropTypes.number,
};

export { Settings };
