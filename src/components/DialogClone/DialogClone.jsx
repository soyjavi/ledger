import { bool, shape } from 'prop-types';
import React, { useState } from 'react';

import { THEME } from '../../reactor/common';
import { Button, Col, Dialog, Row, Text } from '../../reactor/components';

import { C, exchange, verboseMonthShort, verboseTime } from '../../common';
import { useNavigation, useL10N, useSnackBar, useStore } from '../../context';
import { createTx } from '../../services';
import { Box } from '../Box';
import { HeatMap } from '../HeatMap';
import { PriceFriendly } from '../PriceFriendly';
import styles from './DialogClone.style';

const {
  DELAY_PRESS_MS,
  TX: {
    TYPE: { INCOME, EXPENSE },
  },
  WIPE,
} = C;
const { COLOR, OPACITY } = THEME;

const DialogClone = ({
  dataSource: { category, currency, hash, value, vault, location, title, timestamp, type = EXPENSE },
  visible,
  ...inherit
}) => {
  const l10n = useL10N();
  const store = useStore();
  const snackbar = useSnackBar();
  const { baseCurrency, rates } = store;
  const { showTx } = useNavigation();
  const [busy, setBusy] = useState(false);
  const [wipe, setWipe] = useState(false);

  const onSubmit = async (nextWipe = false) => {
    setWipe(nextWipe);
    setBusy(true);
    const tx = await createTx(store, snackbar, {
      vault,
      category,
      value,
      title,
      type,
      ...(wipe ? { category: WIPE, tx: hash, type: type === EXPENSE ? INCOME : EXPENSE } : location),
    });
    setBusy(false);
    if (tx) showTx();
  };

  const color = type === EXPENSE ? COLOR.EXPENSE : COLOR.INCOME;
  const operator = type === EXPENSE ? -1 : 1;
  const buttonProps = {
    activity: busy && wipe,
    color,
    delay: DELAY_PRESS_MS,
    disabled: busy,
    style: styles.button,
  };

  return (
    <Dialog {...inherit} highlight onClose={() => showTx(undefined)} position="bottom" visible={visible}>
      <Text subtitle color={color}>
        {type === EXPENSE ? l10n.EXPENSE : l10n.INCOME}
      </Text>
      <Row marginTop="M">
        <Col marginRight="S" width="auto">
          <Box color={color} style={styles.boxContent} opacity={OPACITY.S} small>
            <Text bold color={color} style={styles.day}>
              {new Date(timestamp || null).getDate()}
            </Text>
            <Text color={color} style={styles.month}>
              {verboseMonthShort(timestamp, l10n)}
            </Text>
          </Box>
        </Col>
        <Col>
          <Row>
            <Col>
              <Text numberOfLines={1}>{title}</Text>
            </Col>
            <Col width="auto">
              <PriceFriendly
                currency={baseCurrency}
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
                <PriceFriendly caption color={COLOR.LIGHTEN} currency={currency} operator value={value * operator} />
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      {location && (
        <Col marginTop="S">
          <HeatMap caption={location.place} color={color} points={[[location.longitude, location.latitude]]} />
        </Col>
      )}

      <Row marginTop="M">
        <Button
          {...buttonProps}
          onPress={() => onSubmit(true)}
          outlined
          marginRight="M"
          title={!(busy && wipe) ? l10n.WIPE : undefined}
        />
        <Button
          {...buttonProps}
          colorText={COLOR.BACKGROUND}
          onPress={() => onSubmit(false)}
          title={!(busy && !wipe) ? l10n.CLONE : undefined}
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
