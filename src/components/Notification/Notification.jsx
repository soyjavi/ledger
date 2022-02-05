import {
  // helpers
  ALIGN,
  FLEX_DIRECTION,
  // components
  Icon,
  Notification as AuroraNotification,
  Text,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { style } from './Notification.style';

const Notification = ({ text, ...others }) => {
  return (
    <AuroraNotification {...others}>
      <View alignItems={ALIGN.CENTER} flexDirection={FLEX_DIRECTION.ROW}>
        <Icon name="info" style={style.icon} />
        <Text detail level={1}>
          {text}
        </Text>
      </View>
    </AuroraNotification>
  );
};

Notification.displayName = 'Notification';

Notification.propTypes = {
  text: PropTypes.string.isRequired,
};

export { Notification };
