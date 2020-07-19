import { bool, shape } from 'prop-types';

import React, { useEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Button, Col, Dialog, Row, Text } from 'reactor/components';

import { C, exchange, verboseTime } from '@common';
import { useNavigation, useL10N, useSnackBar, useStore } from '@context';

import { BoxDate } from '../Box';
import { HeatMap } from '../HeatMap';
import { PriceFriendly } from '../PriceFriendly';
import { onSubmit } from './modules';

const {
  DELAY_PRESS_MS,
  TX: {
    TYPE: { EXPENSE },
  },
} = C;
const { COLOR } = THEME;

const DialogClone = ({ dataSource, visible, ...inherit }) => {
  const { category, currency, value, location, title, timestamp, type = EXPENSE } = dataSource;

  const l10n = useL10N();
  const store = useStore();
  const snackbar = useSnackBar();
  const { baseCurrency, rates } = store;
  const navigation = useNavigation();

  const [busy, setBusy] = useState(false);
  const [wipe, setWipe] = useState(false);

  useEffect(() => {
    if (!visible) {
      setBusy(false);
      setWipe(false);
    }
  }, [visible]);

  const bindings = { dataSource, navigation, snackbar, setBusy, setWipe, store };
  const handleClone = onSubmit.bind(undefined, bindings);
  const handleWipe = onSubmit.bind(undefined, { ...bindings, wipe: true });

  const operator = type === EXPENSE ? -1 : 1;
  const buttonProps = { delay: DELAY_PRESS_MS, disabled: busy, wide: true };

  return (
    <Dialog {...inherit} highlight onClose={() => navigation.showTx(undefined)} position="bottom" visible={visible}>
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
          busy={busy && wipe}
          color={COLOR.BASE}
          colorText={COLOR.TEXT}
          onPress={handleWipe}
          marginRight="M"
          title={l10n.WIPE}
        />
        <Button
          {...buttonProps}
          busy={busy && !wipe}
          colorText={COLOR.BACKGROUND}
          onPress={handleClone}
          title={l10n.CLONE}
        />
      </Row>
    </Dialog>
  );
};

DialogClone.propTypes = {
  dataSource: shape({}),
  visible: bool,
};

DialogClone.defaultProps = {
  dataSource: {},
  visible: false,
};

export { DialogClone };
