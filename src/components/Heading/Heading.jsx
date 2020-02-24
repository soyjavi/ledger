import { node, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Image } from 'react-native';

import { Col, Row, Text } from '../../reactor/components';
import styles from './Heading.style';

const Heading = ({ children, image, value, ...others }) => (
  <Row marginBottom="XS" {...others}>
    {image && (
      <Col marginRight="S" width="auto">
        <Image source={image} resizeMode="contain" style={styles.image} />
      </Col>
    )}
    <Col>
      {value && (
        <Text color={others.color} subtitle>
          {value.toUpperCase()}
        </Text>
      )}
    </Col>
    <Col width="auto">{children}</Col>
  </Row>
);

Heading.propTypes = {
  children: node,
  image: oneOfType([number, string]),
  value: string,
};

export { Heading };
