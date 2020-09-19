import PropTypes from 'prop-types';

import React from 'react';
import { Col, Row, Text } from 'reactor/components';

const Heading = ({ children, value = '', ...others }) => (
  <Row marginBottom="XS" {...others}>
    <Col>
      <Text>{value}</Text>
    </Col>
    <Col width="auto">{children}</Col>
  </Row>
);

Heading.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
};

export { Heading };
