import PropTypes from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';
import { Text } from 'reactor/components';

import { Box } from '../Box';
import styles from './BoxDate.style';
import { verboseMonth } from './modules';

const { COLOR, FONT } = THEME;

export const BoxDate = ({ l10n, timestamp, ...inherit }) => (
  <Box {...inherit} outlined style={styles.container}>
    <Text caption>{new Date(timestamp || null).getDate()}</Text>
    <Text color={COLOR.LIGHTEN} style={FONT.LEGEND}>
      {verboseMonth(timestamp, l10n)}
    </Text>
  </Box>
);

BoxDate.propTypes = {
  l10n: PropTypes.shape(),
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape()]),
};
