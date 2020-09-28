import PropTypes from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';
import { Text } from 'reactor/components';

import { verboseMonthShort } from '@common';

import { Box } from '../Box';
import styles from './BoxDate.style';

const { COLOR, FONT } = THEME;

export const BoxDate = ({ l10n, timestamp, ...inherit }) => (
  <Box {...inherit} outlined style={styles.container}>
    <Text caption>{new Date(timestamp || null).getDate()}</Text>
    <Text color={COLOR.LIGHTEN} style={FONT.LEGEND}>
      {verboseMonthShort(timestamp, l10n)}
    </Text>
  </Box>
);

BoxDate.propTypes = {
  l10n: PropTypes.shape(),
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape()]),
};
