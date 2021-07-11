import {
  ALIGN,
  COLOR,
  FLEX_DIRECTION,
  SIZE as SPACE,
  // components
  Button,
  Text,
  Modal,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { C, exchange, L10N, onHardwareBackPress, verboseTime } from '@common';
import { useStore } from '@context';

import { BoxDate } from '../Box';
import { HeatMap } from '../HeatMap';
import { PriceFriendly } from '../PriceFriendly';
import { createTx } from './DialogClone.controller';
import styles from './DialogClone.style';

const {
  TX: {
    TYPE: { EXPENSE, INCOME },
  },
} = C;

const DialogClone = ({ dataSource = {}, ...inherit }) => {
  const { category, currency, vault, value, location, title = '', timestamp, type = EXPENSE } = dataSource;

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
  const vaultInfo = vaults.find(({ hash }) => hash === vault);

  return (
    <Modal {...inherit} color={COLOR.INFO} swipeable>
      <View alignItems={ALIGN.CENTER} marginBottom={SPACE.L}>
        <Text color={COLOR.GRAYSCALE_L} heading level={2}>
          {L10N.TRANSACTION[type]}
        </Text>
        <Text heading level={1}>
          {title}
        </Text>
      </View>
      <View flexDirection={FLEX_DIRECTION.ROW} wide>
        <BoxDate timestamp={timestamp} marginRight={SPACE.S} highlight />
        <View flex={SPACE.XL}>
          <Text numberOfLines={1}>{vaultInfo ? vaultInfo.title : undefined}</Text>
          <Text color={COLOR.GRAYSCALE_L} detail numberOfLines={1}>
            {`${verboseTime(new Date(timestamp))} - ${L10N.CATEGORIES[type][category]}`}
          </Text>
        </View>
        <View alignItems={ALIGN.END}>
          <PriceFriendly
            color={type === INCOME ? COLOR.BRAND : undefined}
            currency={currency}
            highlight={type === INCOME}
            maskAmount={false}
            operator={type === EXPENSE}
            value={value * operator}
          />
          {currency !== baseCurrency && (
            <PriceFriendly
              color={COLOR.GRAYSCALE_L}
              currency={baseCurrency}
              detail
              maskAmount={false}
              operator={type === EXPENSE}
              value={exchange(value * operator, currency, baseCurrency, rates)}
            />
          )}
        </View>
      </View>

      {location && (
        <View marginTop={SPACE.XS}>
          <HeatMap caption={location.place} points={[[location.longitude, location.latitude]]} small />
        </View>
      )}

      <View flexDirection={FLEX_DIRECTION.ROW} marginTop={SPACE.XL}>
        <Button disabled={busy} marginRight={SPACE.M} outlined onPress={() => handleSubmit({ wipe: true })}>
          {L10N.WIPE.toUpperCase()}
        </Button>
        <Button color={COLOR.CONTENT} disabled={busy} onPress={() => handleSubmit()}>
          {L10N.CLONE.toUpperCase()}
        </Button>
      </View>
    </Modal>
  );
};

DialogClone.propTypes = {
  dataSource: PropTypes.shape({}),
  visible: PropTypes.bool,
};

export { DialogClone };
