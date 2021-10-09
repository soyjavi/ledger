import {
  // helpers,
  COLOR,
  // components
  Text,
  Touchable,
  View,
} from '@lookiero/aurora';
import React, { useLayoutEffect, useState } from 'react';

import { getSyncStatus, L10N, syncNode } from '@common';
import { Heading } from '@components';
import { useConnection, useStore } from '@context';

import { style } from './Blockchain.style';

const Blockchain = () => {
  const { connected } = useConnection();
  const store = useStore();

  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState({});

  useLayoutEffect(() => {
    if (connected) (async () => setStatus(await getSyncStatus(store)))();
  }, [connected, store]);

  const handleSync = async () => {
    setBusy(true);
    const nextStatus = await syncNode(store);
    // if (synced)
    setStatus(nextStatus);
    setBusy(false);
  };

  const { txs, vaults } = store;
  const { synced, node } = status;

  return (
    <View style={style.container}>
      <Heading value={L10N.BLOCKCHAIN_STATE}>
        {connected && synced === false && (
          <Touchable onPress={handleSync}>
            <Text action color={!busy ? COLOR.PRIMARY : undefined}>
              {!busy ? L10N.SYNC : L10N.SYNCING}
            </Text>
          </Touchable>
        )}
      </Heading>
      <View style={[style.offset, style.row]}>
        <View style={style.box}>
          <Text color={COLOR.GRAYSCALE_L} detail level={2} numberOfLines={1} upperCase>
            Accounts
          </Text>
          <Text color={node && vaults.length !== node.vaults.length ? COLOR.GRAYSCALE_L : undefined} heading level={1}>
            {vaults.length}
          </Text>
        </View>

        <View style={style.box}>
          <Text color={COLOR.GRAYSCALE_L} detail level={2} numberOfLines={1} upperCase>
            Transactions
          </Text>
          <Text color={node && txs.length !== node.txs.length ? COLOR.GRAYSCALE_L : undefined} heading level={1}>
            {txs.length}
          </Text>
        </View>
      </View>
    </View>
  );
};

export { Blockchain };
