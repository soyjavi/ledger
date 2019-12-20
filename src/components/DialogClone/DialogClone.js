import { bool, shape } from 'prop-types';
import React, { Fragment, useState } from 'react';
import { View } from 'react-native';
import { THEME } from '../../reactor/common';
import { Button, Dialog, Text } from '../../reactor/components';

import {
  C, exchange, verboseMonthShort, verboseTime,
} from '../../common';
import { useL10N, useStore } from '../../context';
import Box from '../Box';
import HeatMap from '../HeatMap';
import PriceFriendly from '../PriceFriendly';
import styles from './DialogClone.style';

const { TX: { TYPE: { INCOME, EXPENSE } }, WIPE } = C;
const { COLOR } = THEME;

const DialogClone = ({
  dataSource: {
    category, currency, hash, value, vault, location, title, timestamp, type = EXPENSE,
  },
  visible,
  ...inherit
}) => {
  const l10n = useL10N();
  const {
    baseCurrency, onTx, onSelectTx, rates,
  } = useStore();
  const [busy, setBusy] = useState(false);

  const onSubmit = async (wipe = false) => {
    setBusy(true);
    await onTx({
      vault,
      category,
      value,
      title,
      type,
      ...(wipe ? { category: WIPE, tx: hash, type: type === EXPENSE ? INCOME : EXPENSE } : { location }),
    });
    setBusy(false);
  };

  const color = type === EXPENSE ? COLOR.EXPENSE : COLOR.INCOME;
  const operator = type === EXPENSE ? -1 : 1;

  return (
    <Dialog
      {...inherit}
      highlight
      onClose={() => onSelectTx(undefined)}
      style={styles.frame}
      styleContainer={styles.dialog}
      title={type === EXPENSE ? l10n.EXPENSE : l10n.INCOME}
      visible={visible}
    >
      <View style={styles.container}>
        <View style={[styles.content, styles.row]}>
          <Box color={color} style={styles.icon} opacity={0.15} small>
            <Text bold color={color} style={styles.date}>{(new Date(timestamp || null)).getDate()}</Text>
            <Text style={styles.month}>{verboseMonthShort(timestamp, l10n)}</Text>
          </Box>
          <View style={styles.texts}>
            <Text bold numberOfLines={1} style={styles.title}>{title}</Text>
            <Text caption lighten numberOfLines={1}>
              {`${verboseTime(new Date(timestamp))} - ${l10n.CATEGORIES[type][category]}`}
            </Text>
          </View>
          <View style={styles.prices}>
            <PriceFriendly
              currency={baseCurrency}
              operator
              bold
              value={baseCurrency !== currency
                ? exchange(value * operator, currency, baseCurrency, rates)
                : value * operator}
            />
            { currency !== baseCurrency && (
              <PriceFriendly caption color={COLOR.TEXT_LIGHTEN} currency={currency} operator value={value * operator} />
            )}
          </View>
        </View>

        { location && (
          <Fragment>
            <HeatMap color={color} points={[[location.longitude, location.latitude]]} />
            <Text caption lighten style={styles.content}>{location.place}</Text>
          </Fragment>
        )}
      </View>

      <View style={styles.row}>
        <Button
          activity={busy}
          color={color}
          contained={false}
          disabled={busy}
          onPress={() => onSubmit(true)}
          outlined
          style={styles.button}
          title={!busy ? l10n.WIPE : undefined}
        />
        <View style={styles.buttonSeparator} />
        <Button
          activity={busy}
          color={color}
          disabled={busy}
          onPress={() => onSubmit(false)}
          shadow
          style={styles.button}
          title={!busy ? l10n.CLONE : undefined}
        />
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

export default DialogClone;
