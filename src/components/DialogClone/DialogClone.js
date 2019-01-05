import {
  bool, func, shape, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { Consumer } from '../../context';
import { Button, Dialog, Text } from '../../reactor/components';

import styles from './DialogClone.style';

class DialogClone extends PureComponent {
  static propTypes = {
    color: string.isRequired,
    dataSource: shape({}),
    onClose: func.isRequired,
    visible: bool,
  };

  static defaultProps = {
    dataSource: {},
    visible: false,
  };

  state = {
    busy: false,
  };

  _onSubmit = async ({ onTransaction }) => {
    const {
      dataSource: {
        vault, category, location, value, title, type,
      },
      onClose,
    } = this.props;

    this.setState({ busy: true });
    const tx = await onTransaction({
      vault, category, value, title, type, ...location,
    });
    this.setState({ busy: false });

    if (tx) onClose();
  }

  render() {
    const {
      _onSubmit,
      props: { color, onClose, visible },
      state: { busy },
    } = this;

    return (
      <Consumer>
        { ({ l10n, store }) => (
          <Dialog style={styles.frame} styleContainer={styles.dialog} visible={visible}>
            <Text color={color} headline level={5} style={styles.title}>
              {`${l10n.CLONE} ${l10n.TRANSACTION}`}
            </Text>
            <Text lighten level={2}>
              {l10n.CLONE_CAPTION}
            </Text>
            <View style={styles.buttons}>
              <Button color={color} outlined onPress={onClose} rounded style={styles.button} title={l10n.CANCEL} />
              <Button
                activity={busy}
                color={color}
                disabled={busy}
                onPress={() => _onSubmit(store)}
                rounded
                shadow
                style={styles.button}
                title={l10n.ACCEPT}
              />
            </View>
          </Dialog>
        )}
      </Consumer>
    );
  }
}

export default DialogClone;
