import { bool, shape } from 'prop-types';
import React, { Fragment, useState } from 'react';
import { View } from 'react-native';
import { THEME } from '../../reactor/common';
import { Button, Dialog, Text } from '../../reactor/components';

import { C, exchange, verboseMonthShort, verboseTime } from '../../common';
import { useNavigation, useL10N, useSnackBar, useStore } from '../../context';
import { createTx } from '../../services';
import { Box } from '../Box';
import { HeatMap } from '../HeatMap';
import { PriceFriendly } from '../PriceFriendly';
import styles from './DialogClone.style';

const {
  TX: {
    TYPE: { INCOME, EXPENSE },
  },
  WIPE,
} = C;
const { COLOR } = THEME;

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

  const onSubmit = async (wipe = false) => {
    setBusy(true);
    const tx = await createTx(store, snackbar, {
      vault,
      category,
      value,
      title,
      type,
      ...(wipe ? { category: WIPE, tx: hash, type: type === EXPENSE ? INCOME : EXPENSE } : { location }),
    });
    setBusy(false);
    if (tx) showTx();
  };

  const color = type === EXPENSE ? COLOR.EXPENSE : COLOR.INCOME;
  const operator = type === EXPENSE ? -1 : 1;
  const buttonProps = { activity: busy, color, disabled: busy, large: true, style: styles.button };

  return (
    <Dialog
      {...inherit}
      highlight
      onClose={() => showTx(undefined)}
      style={styles.frame}
      styleContainer={styles.dialog}
      title={type === EXPENSE ? l10n.EXPENSE : l10n.INCOME}
      visible={visible}
    >
      <View style={styles.container}>
        <View style={[styles.content, styles.row]}>
          <Box color={color} style={styles.box} opacity={0.25} small>
            <View style={styles.boxContent}>
              <Text bold color={color}>
                {new Date(timestamp || null).getDate()}
              </Text>
              <Text bold style={styles.month}>
                {verboseMonthShort(timestamp, l10n)}
              </Text>
            </View>
          </Box>
          <View style={styles.texts}>
            <Text bold numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            <Text caption lighten numberOfLines={1}>
              {`${verboseTime(new Date(timestamp))} - ${l10n.CATEGORIES[type][category]}`}
            </Text>
          </View>
          <View style={styles.prices}>
            <PriceFriendly
              currency={baseCurrency}
              operator
              value={
                baseCurrency !== currency ? exchange(value * operator, currency, baseCurrency, rates) : value * operator
              }
            />
            {currency !== baseCurrency && (
              <PriceFriendly caption color={COLOR.TEXT_LIGHTEN} currency={currency} operator value={value * operator} />
            )}
          </View>
        </View>

        {location && (
          <Fragment>
            <HeatMap color={color} points={[[location.longitude, location.latitude]]} />
            <Text caption lighten style={styles.content}>
              {location.place}
            </Text>
          </Fragment>
        )}
      </View>

      <View style={styles.row}>
        <Button
          {...buttonProps}
          contained={false}
          onPress={() => onSubmit(true)}
          outlined
          title={!busy ? l10n.WIPE : undefined}
        />
        <View style={styles.buttonSeparator} />
        <Button {...buttonProps} onPress={() => onSubmit(false)} title={!busy ? l10n.CLONE : undefined} />
      </View>
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
