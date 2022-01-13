import {
  // helpers
  COLOR,
  // components
  Text,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { Box } from './Box';
import { verboseMonth } from './helpers';

const BoxDate = ({ timestamp, ...inherit }) => (
  <Box {...inherit} color={COLOR.CONTENT}>
    <Text color={COLOR.BASE} action level={2}>
      {new Date(timestamp || null).getDate()}
    </Text>
    <Text color={COLOR.BASE} detail>
      {verboseMonth(timestamp)}
    </Text>
  </Box>
);

BoxDate.propTypes = {
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape()]),
};

export { BoxDate };
