import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Text } from 'reactor/components';

import { Box } from './Box';
import styles from './Box.style';
import { verboseMonth } from './modules';

const { COLOR, FONT } = THEME;

const BoxDate = ({ highlight = false, l10n, timestamp, ...inherit }) => (
  <Box
    //
    {...inherit}
    outlined={highlight}
    color={highlight ? COLOR.TEXT : COLOR.BASE}
    style={styles.date}
  >
    <Text
      caption
      bold

      // color={highlight ? COLOR.BACKGROUND : undefined}
    >
      {new Date(timestamp || null).getDate()}
    </Text>
    <Text
      // color={highlight ? COLOR.BACKGROUND : COLOR.LIGHTEN}
      style={FONT.LEGEND}
    >
      {verboseMonth(timestamp, l10n)}
    </Text>
  </Box>
);

BoxDate.propTypes = {
  color: PropTypes.string,
  highlight: PropTypes.bool,
  l10n: PropTypes.shape({}),
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape()]),
};

export { BoxDate };
