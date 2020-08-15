import PropTypes from 'prop-types';

import React from 'react';
import { Button, Viewport } from 'reactor/components';

import { BANNERS } from '@assets';
import { Banner } from '@components';
import { useL10N } from '@context';

const Completed = ({ onPress, ...inherit }) => {
  const l10n = useL10N();

  return (
    <Viewport {...inherit}>
      <Banner
        align="right"
        image={BANNERS.RECEIVE}
        marginBottom="XL"
        title={l10n.ONBOARDING_COMPLETED_TITLE}
        caption={l10n.ONBOARDING_COMPLETED_CAPTION}
      />
      <Button
        onPress={onPress}
        // style={styles.buttonRight}
        title={l10n.CONTINUE}
      />
    </Viewport>
  );
};

Completed.propTypes = {
  onPress: PropTypes.func,
};

export { Completed };
