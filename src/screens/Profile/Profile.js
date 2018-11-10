import { bool } from 'prop-types';
import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';

import { Header } from 'containers';
import { ConsumerNavigation } from 'context';
import { Viewport } from 'reactor/components';
import styles from './Profile.style';

const DEFAULT_FORM = {
  currency: 'USD',
  balance: '0',
};

class Profile extends PureComponent {
  static propTypes = {
    visible: bool,
  };

  static defaultProps = {
    visible: false,
  };

  state = {
    busy: false,
  };

  render() {
    const {
      props: { visible, ...inherit },
      state: {
        busy,
      },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <ConsumerNavigation>
          { ({ goBack }) => (
            <Header
              busy={busy}
              left={{ title: '$back', onPress: () => goBack() }}
              title="$Profile"
              right={{ title: '$save', onPress: () => console.log('profile:save') }}
              visible
            />
          )}
        </ConsumerNavigation>

        <ScrollView style={styles.scroll} />

      </Viewport>
    );
  }
}

export default Profile;
