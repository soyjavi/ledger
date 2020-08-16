import PropTypes from 'prop-types';

import React from 'react';
import { Button, Viewport } from 'reactor/components';

import { BANNERS } from '@assets';
import { Banner } from '@components';
import { useL10N } from '@context';

const Welcome = ({ onPress, ...inherit }) => {
  const l10n = useL10N();

  return (
    <Viewport {...inherit}>
      <Banner align="left" image={BANNERS.SEND} marginBottom="XL" title={l10n.SLOGAN} caption={l10n.ELEVATOR_PITCH} />
      <Button onPress={onPress} title={l10n.GET_STARTED} />
    </Viewport>
  );
};

Welcome.propTypes = {
  onPress: PropTypes.func,
};

export { Welcome };
