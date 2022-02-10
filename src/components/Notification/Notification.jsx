import { Icon, Notification as AuroraNotification, Text, View } from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { style } from './Notification.style';

const Notification = ({ text, ...others }) => {
  return (
    <AuroraNotification {...others} style={style.container}>
      <View style={style.content}>
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
