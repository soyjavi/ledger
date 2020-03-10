import { node, string } from 'prop-types';
import React from 'react';

import { Col, Row, Text } from '../../reactor/components';

const Heading = ({ children, value = '', ...others }) => (
  <Row marginBottom="XS" {...others}>
    <Col>
      <Text color={others.color} subtitle>
        {value.toUpperCase()}
      </Text>
    </Col>
    <Col width="auto">{children}</Col>
  </Row>
);

Heading.propTypes = {
  children: node,
  value: string,
};

export { Heading };
