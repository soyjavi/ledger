import PropTypes from 'prop-types';

import React from 'react';
import { Row } from 'reactor/components';

import styles, { HEADER_HEIGHT } from './Footer.style';

export { HEADER_HEIGHT };

export const Footer = ({ children }) => <Row style={styles.container}>{children}</Row>;

Footer.propTypes = {
  children: PropTypes.node,
};
