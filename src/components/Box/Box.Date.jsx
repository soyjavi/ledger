import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Text } from 'reactor/components';

import { Box } from './Box';
import styles from './Box.style';
import { verboseMonth } from './modules';

const { COLOR, FONT } = THEME;

const BoxDate = ({ l10n, timestamp, ...inherit }) => (
  <Box {...inherit} outlined style={styles.date}>
    <Text caption>{new Date(timestamp || null).getDate()}</Text>
    <Text color={COLOR.LIGHTEN} style={FONT.LEGEND}>
      {verboseMonth(timestamp, l10n)}
    </Text>
  </Box>
);

BoxDate.propTypes = {
  l10n: PropTypes.shape({}),
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape()]),
};

export { BoxDate };
