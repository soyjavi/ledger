import { bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView } from 'react-native';

import { Footer, Header, Heading } from '../../components';
import { Consumer } from '../../context';
import { Viewport } from '../../reactor/components';
import { VaultItem } from './components';
import styles from './Settings.style';

class Settings extends PureComponent {
  static propTypes = {
    backward: bool,
    navigation: shape({}),
    visible: bool,
  };

  static defaultProps = {
    backward: false,
    navigation: undefined,
    visible: true,
  };

  state = {
    scroll: true,
  };

  _onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    const { state } = this;
    const scroll = y > 58;
    if (scroll !== state.scroll) this.setState({ scroll });
  }

  render() {
    const {
      _onScroll, props: { visible, ...inherit }, state: { scroll },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        { visible && (
          <Consumer>
            { ({ l10n, navigation, store: { vaults } }) => (
              <Fragment>
                <Header
                  highlight={scroll}
                  title={l10n.SETTINGS}
                  visible={visible}
                />
                <ScrollView onScroll={_onScroll} scrollEventThrottle={40} contentContainerStyle={styles.container}>
                  <Heading breakline subtitle={`${l10n.ACTIVE} ${l10n.VAULTS}`} />
                  { vaults.map(vault => <VaultItem key={vault.hash} {...vault} />)}
                </ScrollView>

                <Footer onBack={navigation.goBack} />

              </Fragment>
            )}
          </Consumer>
        )}

      </Viewport>
    );
  }
}

export default Settings;
