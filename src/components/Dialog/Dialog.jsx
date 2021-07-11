import {
  // helpers
  COLOR,
  FLEX_DIRECTION,
  SIZE,
  // components
  Button,
  Modal,
  Text,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { style } from './Dialog.style';

const Dialog = ({ accept, cancel, text, onAccept, onCancel, title, ...others }) => (
  <Modal {...others} color={COLOR.INFO} swipeable onClose={onCancel}>
    <View>
      <Text heading level={2}>
        {title}
      </Text>
      {text && <Text>{text}</Text>}
    </View>
    <View flexDirection={FLEX_DIRECTION.ROW} marginTop={SIZE.XL}>
      {cancel && onCancel && (
        <Button marginRight={SIZE.M} outlined onPress={onCancel}>
          {cancel}
        </Button>
      )}
      <Button color={COLOR.CONTENT} onPress={onAccept}>
        {accept}
      </Button>
    </View>
  </Modal>
);

Dialog.propTypes = {
  accept: PropTypes.string,
  cancel: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export { Dialog };
