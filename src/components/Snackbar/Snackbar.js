import { func, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Button, Dialog, Text } from '../../reactor/components';
import styles from './Snackbar.style';

const Snackbar = ({
  button, caption, onPress, ...inherit
}) => (
  <Dialog {...inherit} background={false} styleContainer={styles.dialogContainer} style={styles.dialog}>
    <View style={styles.container}>
      <Text level={2} style={styles.text}>{caption}</Text>
      <Button
        contained={false}
        onPress={onPress}
        secondary
        small
        style={styles.button}
        title={button.toUpperCase()}
      />
    </View>
  </Dialog>
);

Snackbar.propTypes = {
  button: string,
  caption: string,
  onPress: func,
};

Snackbar.defaultProps = {
  button: undefined,
  caption: undefined,
  onPress() {},
};

export default Snackbar;
