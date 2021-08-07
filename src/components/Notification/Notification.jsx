import { Notification as AuroraNotification, Text } from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

const Notification = ({ text, ...others }) => {
  return (
    <AuroraNotification {...others}>
      <Text detail level={1}>
        {text}
      </Text>
    </AuroraNotification>
  );
};

Notification.displayName = 'Notification';

Notification.propTypes = {
  text: PropTypes.string.isRequired,
};

export { Notification };
