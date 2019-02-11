import { bool, func, shape } from 'prop-types';
import React, { PureComponent } from 'react';

import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Button, Dialog, Text } from '../../reactor/components';

import styles from './DialogClone.style';

const { COLOR } = THEME;

class DialogClone extends PureComponent {
  static propTypes = {
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
      props: { onClose, visible },
      state: { busy },
    } = this;

    return (
      <Consumer>
        { ({ l10n, store }) => (
          <Dialog
            onClose={onClose}
            style={styles.frame}
            styleContainer={styles.dialog}
            title={`${l10n.CLONE} ${l10n.TRANSACTION}`}
            visible={visible}
          >
            <Text lighten level={2}>
              {l10n.CLONE_CAPTION}
            </Text>
            <Button
              activity={busy}
              color={COLOR.PRIMARY}
              disabled={busy}
              onPress={() => _onSubmit(store)}
              rounded
              shadow
              style={styles.button}
              title={l10n.ACCEPT}
            />
          </Dialog>
        )}
      </Consumer>
    );
  }
}

export default DialogClone;
