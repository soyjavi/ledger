import { bool, shape } from 'prop-types';

import React, { useState } from 'react';
import { THEME } from 'reactor/common';
import { Button, Col, Dialog, Row, Text } from 'reactor/components';

import { C, exchange, verboseTime } from '@common';
import { useL10N, useStore } from '@context';

import { BoxDate } from '../Box';
import { HeatMap } from '../HeatMap';
import { PriceFriendly } from '../PriceFriendly';
import { createTx } from './DialogClone.controller';

const {
  DELAY_PRESS_MS,
  TX: {
    TYPE: { EXPENSE },
  },
} = C;
const { COLOR } = THEME;

const DialogClone = ({ dataSource = {}, ...inherit }) => {
  const { category, currency, value, location, title, timestamp, type = EXPENSE } = dataSource;

  const l10n = useL10N();
  const store = useStore();
  const {
    settings: { baseCurrency },
    rates,
  } = store;

  const [busy, setBusy] = useState(false);

  const handleSubmit = ({ wipe = false } = {}) => {
    setBusy(true);
    createTx({ dataSource, store, wipe });
    inherit.onClose();
    setBusy(false);
  };

  const operator = type === EXPENSE ? -1 : 1;
  const buttonProps = { delay: DELAY_PRESS_MS, disabled: busy, wide: true };

  return (
    <Dialog {...inherit} position="bottom">
      <Text marginTop="S" marginBottom="M" subtitle>
        {type === EXPENSE ? l10n.EXPENSE : l10n.INCOME}
      </Text>
      <Row>
        <Col marginRight="S" width="auto">
          <BoxDate l10n={l10n} timestamp={timestamp} />
        </Col>
        <Col>
          <Row>
            <Col>
              <Text bold numberOfLines={1}>
                {title}
              </Text>
            </Col>
            <Col width="auto">
              <PriceFriendly
                bold
                currency={baseCurrency}
                maskAmount={false}
                operator
                value={
                  baseCurrency !== currency
                    ? exchange(value * operator, currency, baseCurrency, rates)
                    : value * operator
                }
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
                  currency={currency}
                  maskAmount={false}
                  operator
                  value={value * operator}
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

      <Row marginTop="M">
        <Button
          {...buttonProps}
          color={COLOR.BASE}
          colorText={COLOR.TEXT}
          onPress={() => handleSubmit({ wipe: true })}
          marginRight="M"
          title={l10n.WIPE}
        />
        <Button {...buttonProps} colorText={COLOR.BACKGROUND} onPress={() => handleSubmit()} title={l10n.CLONE} />
      </Row>
    </Dialog>
  );
};

DialogClone.propTypes = {
  dataSource: shape({}),
  visible: bool,
};

export { DialogClone };
