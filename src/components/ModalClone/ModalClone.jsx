import {
  ALIGN,
  COLOR,
  FLEX_DIRECTION,
  SIZE as SPACE,
  // components
  Text,
  Modal,
  View,
} from '@lookiero/aurora';
import { useEvent } from '@lookiero/event';
import React, { useEffect, useState } from 'react';

import { C, EVENTS, exchange, L10N, onHardwareBackPress, verboseTime } from '@common';
import { Button } from '@components';
import { useStore } from '@context';

import { BoxDate } from '../Box';
import { HeatMap } from '../HeatMap';
import { PriceFriendly } from '../PriceFriendly';
import { cloneTx } from './helpers';
import { style } from './ModalClone.style';

const {
  TIMEOUT,
  TX: {
    TYPE: { EXPENSE, INCOME },
  },
} = C;

const ModalClone = () => {
  const { subscribe } = useEvent();
  const store = useStore();

  const {
    settings: { baseCurrency },
    vaults,
    rates,
  } = store;

  const [busy, setBusy] = useState(false);
  const [dataSource, setDataSource] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    subscribe({ event: EVENTS.SHOW_TRANSACTION }, (props) => {
      setVisible(() => {
        setDataSource(props);
        return true;
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onHardwareBackPress(visible, handleClose);
    return () => onHardwareBackPress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
  };

  const handleSubmit = async ({ wipe = false } = {}) => {
    setBusy(true);
    // ! @TODO: Research why we need this
    setTimeout(async () => {
      await cloneTx({ dataSource, store, wipe });
      setBusy(false);
      handleClose();
    }, TIMEOUT.BUSY);
  };

  const { category, currency, vault, value, location, title = '', timestamp, type = EXPENSE } = dataSource;
  const operator = type === EXPENSE ? -1 : 1;
  const vaultInfo = vaults.find(({ hash }) => hash === vault);

  return (
    <Modal color={COLOR.INFO} contentStyle={style.modalContent} isVisible={visible} swipeable onClose={handleClose}>
      <View alignItems={ALIGN.CENTER} marginBottom={SPACE.L}>
        <Text color={COLOR.GRAYSCALE_L} heading level={2}>
          {L10N.TRANSACTION[type]}
        </Text>
        <Text heading level={1}>
          {title}
        </Text>
      </View>
      <View alignItems={ALIGN.CENTER} flexDirection={FLEX_DIRECTION.ROW} wide>
        <BoxDate timestamp={timestamp} marginRight={SPACE.S} highlight />
        <View flex={SPACE.XL}>
          <Text numberOfLines={1}>{vaultInfo ? vaultInfo.title : undefined}</Text>
          <Text color={COLOR.GRAYSCALE_L} detail level={2} numberOfLines={1}>
            {`${verboseTime(new Date(timestamp))} - ${L10N.CATEGORIES[type][category]}`}
          </Text>
        </View>
        <View alignItems={ALIGN.END}>
          <PriceFriendly
            color={type === INCOME ? COLOR.PRIMARY : undefined}
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
              level={2}
              maskAmount={false}
              operator={type === EXPENSE}
              value={exchange(value * operator, currency, baseCurrency, rates)}
            />
          )}
        </View>
      </View>

      {location && (
        <View marginTop={SPACE.S}>
          <HeatMap caption={location.place} points={[[location.longitude, location.latitude]]} small />
        </View>
      )}

      <View flexDirection={FLEX_DIRECTION.ROW} marginTop={SPACE.XL}>
        <Button disabled={busy} marginRight={SPACE.M} secondary onPress={() => handleSubmit({ wipe: true })}>
          {L10N.WIPE.toUpperCase()}
        </Button>
        <Button disabled={busy} onPress={() => handleSubmit()}>
          {L10N.CLONE.toUpperCase()}
        </Button>
      </View>
    </Modal>
  );
};

ModalClone.displayName = 'ModalClone';

ModalClone.propTypes = {};

export { ModalClone };
