import { bool, shape } from 'prop-types';
import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';

import { FORM } from 'common';
import { Header } from 'containers';
import { Consumer, ConsumerStore } from 'context';
import {
  Form, Text, Viewport,
} from 'reactor/components';
import hydrateForm from './modules/hydrateForm';
import styles from './Transaction.style';

const DEFAULT_FORM = {
  // value: '0',
};

class Transaction extends PureComponent {
  static propTypes = {
    dataSource: shape({}),
    visible: bool,
  };

  static defaultProps = {
    dataSource: undefined,
    visible: false,
  };

  state = {
    busy: false,
    error: undefined,
    form: DEFAULT_FORM,
    valid: false,
  };

  _onChange = form => this.setState({ form })

  _onSubmit = async ({
    navigation,
    store: { latestTransaction: { hash: previousHash }, onTransaction, vaults },
  }) => {
    const { state: { form: { value, vault, ...props } } } = this;

    this.setState({ busy: true });
    const response = await onTransaction({
      ...props,
      previousHash,
      value: parseFloat(value, 10),
      vault: vault
        ? vaults.find(item => item.title === vault).hash
        : vaults[0].hash,
    });
    this.setState({ busy: false });

    if (response) navigation.goBack();
  }

  _onValid = valid => this.setState({ valid })

  render() {
    const {
      _onChange, _onSubmit, _onValid,
      props: { dataSource, visible, ...inherit },
      state: { busy, form, valid },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({ navigation, store, l10n }) => (
            <Header
              busy={busy}
              left={{ title: '$back', onPress: () => navigation.goBack() }}
              title={l10n.TRANSACTION}
              right={!dataSource && valid
                ? { title: '$save', onPress: () => _onSubmit({ navigation, store }) }
                : undefined}
              visible
            />
          )}
        </Consumer>

        <ScrollView style={styles.scroll}>
          <ConsumerStore>
            { ({ vaults }) => (
              !dataSource
                ? (
                  <Form
                    attributes={hydrateForm(FORM.TRANSACTION, 'vault', vaults)}
                    onValid={_onValid}
                    onChange={_onChange}
                    style={styles.form}
                    value={form}
                  />)
                : <Text>{dataSource.hash}</Text>
            )}
          </ConsumerStore>
        </ScrollView>
      </Viewport>
    );
  }
}

export default Transaction;
