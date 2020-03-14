import { bool, node, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Image } from 'react-native';

import { Col, Motion, Row } from '../../reactor/components';

import { LOGO } from '../../assets';
import { Heading } from '../Heading';
import styles, { HEADER_HEIGHT } from './Header.style';

export { HEADER_HEIGHT };

export const Header = ({ children, highlight = false, image = LOGO, title }) => (
  <Row paddingRight="S" style={styles.container}>
    <Col>
      <Motion timeline={[{ property: 'opacity', value: highlight ? 1 : 0 }]}>
        <Row align="center" marginLeft="M">
          <Image source={image} resizeMode="contain" style={styles.image} />
          <Heading marginLeft="S" value={title} marginBottom={null} />
        </Row>
      </Motion>
    </Col>
    <Col width="auto">{children}</Col>
  </Row>
);

Header.propTypes = {
  children: node,
  highlight: bool,
  image: oneOfType([number, string]),
  title: string,
};
