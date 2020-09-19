import { bool, shape } from 'prop-types';

import React, { useEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Button, Col, Dialog, Row, Text } from 'reactor/components';

import { C, exchange, onHardwareBackPress, verboseTime } from '@common';
import { useL10N, useStore } from '@context';

import { BoxDate } from '../Box';
import { HeatMap } from '../HeatMap';
import { PriceFriendly } from '../PriceFriendly';
import { createTx } from './DialogClone.controller';

const {
  DELAY_PRESS_MS,
  TX: {
    TYPE: { EXPENSE, INCOME },
  },
} = C;
const { COLOR } = THEME;

const DialogClone = ({ dataSource = {}, ...inherit }) => {
  const { category, currency, vault, value, location, title, timestamp, type = EXPENSE } = dataSource;

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
  const buttonProps = { delay: DELAY_PRESS_MS, disabled: busy, wide: true };

  const vaultInfo = vaults.find(({ hash }) => hash === vault);

  return (
    <Dialog {...inherit} position="bottom">
      <Row justify="center" marginTop="L">
        <Text subtitle>{l10n.TRANSACTION[type]}</Text>
      </Row>
      <Row justify="center" marginBottom="L">
        <Text bold headline>
          {title ? title : ''}
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

      <Row marginTop="XL">
        <Button
          {...buttonProps}
          marginRight="M"
          onPress={() => handleSubmit({ wipe: true })}
          outlined
          text={l10n.WIPE.toUpperCase()}
        />
        <Button
          {...buttonProps}
          colorText={COLOR.BACKGROUND}
          onPress={() => handleSubmit()}
          text={l10n.CLONE.toUpperCase()}
        />
      </Row>
    </Dialog>
  );
};

DialogClone.propTypes = {
  dataSource: shape({}),
  visible: bool,
};

export { DialogClone };
