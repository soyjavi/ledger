import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Button, Col, Dialog, Row, Text } from 'reactor/components';

import { C, exchange, onHardwareBackPress, verboseTime } from '@common';
import { useL10N, useStore } from '@context';

import { BoxDate } from '../Box';
import { HeatMap } from '../HeatMap';
import { PriceFriendly } from '../PriceFriendly';
import { createTx } from './DialogClone.controller';
import styles from './DialogClone.style';

const {
  DELAY_PRESS_MS,
  TX: {
    TYPE: { EXPENSE, INCOME },
  },
} = C;
const { COLOR } = THEME;

const DialogClone = ({ dataSource = {}, ...inherit }) => {
  const { category, currency, vault, value, location, title = '', timestamp, type = EXPENSE } = dataSource;

  const l10n = useL10N();
  const store = useStore();
  const {
    settings: { baseCurrency },
    vaults,
    rates,
  } = store;

  const [busy, setBusy] = useState(false);

  useEffect(() => {
    onHardwareBackPress(inherit.visible, inherit.onClose);
    return () => onHardwareBackPress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inherit.visible]);

  const handleSubmit = ({ wipe = false } = {}) => {
    setBusy(true);
    createTx({ dataSource, store, wipe });
    inherit.onClose();
    setBusy(false);
  };

  const operator = type === EXPENSE ? -1 : 1;
  const button = { delay: DELAY_PRESS_MS, disabled: busy, wide: true };

  const vaultInfo = vaults.find(({ hash }) => hash === vault);

  return (
    <Dialog {...inherit} position="bottom">
      <Row justify="center" marginTop="L">
        <Text bold subtitle>
          {l10n.TRANSACTION[type]}
        </Text>
      </Row>
      <Row justify="center" marginBottom="L">
        <Text style={styles.title} headline>
          {title}
        </Text>
      </Row>
      <Row>
        <Col marginRight="S" width="auto">
          <BoxDate l10n={l10n} timestamp={timestamp} />
        </Col>
        <Col>
          <Row>
            <Col>
              <Text numberOfLines={1}>{vaultInfo ? vaultInfo.title : undefined}</Text>
            </Col>
            <Col width="auto">
              <PriceFriendly
                color={type === INCOME ? COLOR.BRAND : undefined}
                currency={currency}
                highlight={type === INCOME}
                maskAmount={false}
                operator={type === EXPENSE}
                value={value * operator}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Text caption color={COLOR.LIGHTEN} numberOfLines={1}>
                {`${verboseTime(new Date(timestamp))} - ${l10n.CATEGORIES[type][category]}`}
              </Text>
            </Col>
            <Col width="auto">
              {currency !== baseCurrency && (
                <PriceFriendly
                  caption
                  color={COLOR.LIGHTEN}
                  currency={baseCurrency}
                  maskAmount={false}
                  operator={type === EXPENSE}
                  value={exchange(value * operator, currency, baseCurrency, rates)}
                />
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      {location && (
        <Col marginTop="S">
          <HeatMap caption={location.place} points={[[location.longitude, location.latitude]]} small />
        </Col>
      )}

      <Row marginTop="XL" marginBottom="M">
        <Button
          {...button}
          marginRight="M"
          outlined
          text={l10n.WIPE.toUpperCase()}
          onPress={() => handleSubmit({ wipe: true })}
        />
        <Button {...button} text={l10n.CLONE.toUpperCase()} onPress={() => handleSubmit()} />
      </Row>
    </Dialog>
  );
};

DialogClone.propTypes = {
  dataSource: PropTypes.shape({}),
  visible: PropTypes.bool,
};

export { DialogClone };
