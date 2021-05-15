import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Col, Row, Text } from 'reactor/components';

const { COLOR } = THEME;

const Heading = ({ children, color = COLOR.LIGHTEN, value = '', ...others }) => (
  <Row marginBottom="XS" {...others}>
    <Col>
      <Text bold color={color}>
        {value.toUpperCase()}
      </Text>
    </Col>
    <Col width="auto">{children}</Col>
  </Row>
);

Heading.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  value: PropTypes.string,
};

export { Heading };
