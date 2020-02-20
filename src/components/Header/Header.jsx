import { bool, node, number, oneOfType, string } from 'prop-types';
import React from 'react';

import { Col, Motion, Row } from '../../reactor/components';

import { LOGO } from '../../assets';
import { Heading } from '../Heading';
import styles from './Header.style';

const Header = ({ children, highlight, image, title }) => (
  <Row paddingRight="S" style={styles.container}>
    <Col>
      <Motion timeline={[{ property: 'opacity', value: highlight ? 1 : 0 }]}>
        <Heading subtitle={false} paddingLeft="M" value={title} image={image} />
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

Header.defaultProps = {
  children: undefined,
  highlight: false,
  image: LOGO,
  title: undefined,
};

export { Header };
