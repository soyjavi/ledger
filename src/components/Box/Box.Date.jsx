import PropTypes from 'prop-types';
import React from 'react';
import {
  // helpers
  COLOR,
  // components
  Text,
} from '@lookiero/aurora';

import { Box } from './Box';
import { style } from './Box.style';
import { verboseMonth } from './helpers';

const BoxDate = ({ highlight, l10n, timestamp, ...inherit }) => (
  <Box {...inherit} color={highlight ? COLOR.CONTENT : COLOR.BASE} outlined={highlight} style={style.date}>
    <Text action>{new Date(timestamp || null).getDate()}</Text>
    <Text detail>{verboseMonth(timestamp, l10n)}</Text>
  </Box>
);

BoxDate.propTypes = {
  highlight: PropTypes.bool,
  l10n: PropTypes.shape({}),
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape()]),
};

export { BoxDate };
