import { bool, func } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { Consumer } from '../../../../context';
import { THEME } from '../../../../reactor/common';
import { Button, Dialog, Text } from '../../../../reactor/components';
import styles from './DialogFork.style';

const { COLOR } = THEME;

class DialogFork extends PureComponent {
  static propTypes = {
    onClose: func.isRequired,
    visible: bool,
  };

  static defaultProps = {
    visible: false,
  };

  constructor(props) {
    super(props);

    this.state = { busy: false };
  }

  _onSubmit = () => {

  }

  render() {
    const {
      _onSubmit, props: { onClose, visible, ...inherit }, state: { busy },
    } = this;

    return (
      <Consumer>
        { ({ l10n, store }) => (
          <Dialog
            {...inherit}
            highlight
            onClose={onClose}
            style={styles.frame}
            styleContainer={styles.dialog}
            title={`${l10n.NEW} ${l10n.VAULT}`}
            visible={visible}
          >
            <Text _lighten level={2}>
              { l10n.FIRST_VAULT_CAPTION }
            </Text>
            <View style={styles.form}>

            </View>
            <Button
              activity={busy}
              color={COLOR.PRIMARY}
              disabled={busy}
              onPress={() => _onSubmit(store)}
              shadow
              style={styles.button}
              title={!busy ? l10n.SAVE : undefined}
            />
          </Dialog>
        )}
      </Consumer>
    );
  }
}

export default DialogFork;
