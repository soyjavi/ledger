import { Slider } from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { C, L10N } from '@common';
import { Card, CARD_SIZE, Header, Heading, ScrollView } from '@components';
import { useNavigation, useStore } from '@context';

import { VaultItem } from './components';
import { filter, query } from './modules';
import { style } from './Vaults.style';

const { SCREEN } = C;

const Vaults = ({ timestamp }) => {
  const navigation = useNavigation();
  const scrollview = useRef(null);
  const { overall, vaults } = useStore();

  const [currencies, setCurrencies] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [selected, setSelected] = useState();

  useLayoutEffect(() => {
    setCurrencies(query(vaults));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timestamp) scrollview.current.scrollTo({ y: 0, animated: true });
  }, [timestamp]);

  const hasCurrencies = currencies.length > 0;

  return (
    <>
      <Header visible={scroll} title={L10N.VAULTS} />

      <ScrollView onScroll={setScroll} ref={scrollview}>
        {hasCurrencies && (
          <>
            <Heading value={L10N.CURRENCIES} />

            <Slider horizontal snapInterval={CARD_SIZE} style={style.slider}>
              {currencies.map(({ base, currency, ...item }, index) => (
                <Card
                  {...item}
                  key={currency}
                  currency={currency}
                  highlight={currency === selected}
                  operator={false}
                  percentage={(base * 100) / overall.currentBalance}
                  title={L10N.CURRENCY_NAME[currency] || currency}
                  style={index === 0 ? style.firstCard : style.card}
                  onPress={() => setSelected(currency !== selected ? currency : undefined)}
                />
              ))}
            </Slider>
          </>
        )}

        {hasCurrencies && <Heading value={L10N.VAULTS} />}
        {filter(vaults, selected).map((vault) => (
          <VaultItem key={vault.hash} dataSource={vault} onPress={() => navigation.go(SCREEN.VAULT, vault)} />
        ))}
      </ScrollView>
    </>
  );
};

Vaults.propTypes = {
  timestamp: PropTypes.number,
  visible: PropTypes.boolean,
};

export { Vaults };
