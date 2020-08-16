import PropTypes from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';
import { Col, Row, Text } from 'reactor/components';

const { COLOR } = THEME;

const Heading = ({ children, small, value = '', ...others }) => (
  <Row {...others}>
    <Col>
      <Text bold={small} caption={small} color={small ? COLOR.LIGHTEN : undefined} subtitle={!small}>
        {small ? value.toUpperCase() : value}
      </Text>
    </Col>
    <Col width="auto">{children}</Col>
  </Row>
);

Heading.propTypes = {
  children: PropTypes.node,
  small: PropTypes.bool,
  value: PropTypes.string,
};

export { Heading };
