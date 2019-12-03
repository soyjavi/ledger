import { bool, func, string } from 'prop-types';
import React, { PureComponent } from 'react';

import { Consumer } from '../../../../context';
import { THEME } from '../../../../reactor/common';
import { Button, Dialog, Text } from '../../../../reactor/components';
import styles from './DialogFork.style';

const { COLOR } = THEME;

class DialogFork extends PureComponent {
  static propTypes = {
    onClose: func.isRequired,
    onForked: func.isRequired,
    query: string,
    visible: bool,
  };

  static defaultProps = {
    query: undefined,
    visible: false,
  };

  constructor(props) {
    super(props);

    this.state = { busy: false };
  }

  _onSubmit = async ({ onFork }) => {
    const { props: { onClose, onForked, query } } = this;

    this.setState({ busy: true });
    const fork = await onFork(query);
    this.setState({ busy: false });

    if (fork) onForked();
    else onClose();
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
            title={l10n.WARNING}
            visible={visible}
          >
            <Text>{l10n.TRANSFER_TXS_IMPORT}</Text>
            <Button
              activity={busy}
              color={COLOR.PRIMARY}
              disabled={busy}
              onPress={() => _onSubmit(store)}
              shadow
              style={styles.button}
              title={!busy ? l10n.IMPORT : undefined}
            />
          </Dialog>
        )}
      </Consumer>
    );
  }
}

export default DialogFork;
