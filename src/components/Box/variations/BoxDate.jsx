import PropTypes from 'prop-types';
import React from 'react';

import { THEME } from '../../../reactor/common';
import { Text } from '../../../reactor/components';

import { Box } from '../Box';
import { verboseMonthShort } from '../../../common';
import styles from './BoxDate.style';

const { COLOR } = THEME;

export const BoxDate = ({ l10n, timestamp, ...inherit }) => (
  <Box {...inherit} outlined style={styles.boxContent}>
    <Text bold style={styles.day}>
      {new Date(timestamp || null).getDate()}
    </Text>
    <Text color={COLOR.LIGHTEN} style={styles.month}>
      {verboseMonthShort(timestamp, l10n)}
    </Text>
  </Box>
);

BoxDate.propTypes = {
  l10n: PropTypes.shape(),
  timestamp: PropTypes.shape(),
};
