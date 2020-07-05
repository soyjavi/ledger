import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';
import { Button, Viewport } from 'reactor/components';

import { BANNERS } from '@assets';
import { C } from '@common';
import { Banner } from '@components';
import { useNavigation, useL10N, useStore } from '@context';
import { Session } from '@screens/Session';

import { FirstVault } from './components';
import styles from './Onboarding.style';

const { SCREEN } = C;
const style = { scroll: false, styleContent: styles.container };

const WELCOME = 1;
const PIN_CODE = 2;
const VAULT = 3;
const COMPLETED = 4;

export const Onboarding = () => {
  const l10n = useL10N();
  const navigation = useNavigation();
  const { authorization, vaults = [] } = useStore();

  const [step, setStep] = useState();

  useEffect(() => {
    setStep(authorization ? (vaults.length === 0 ? VAULT : PIN_CODE) : WELCOME);
  }, [authorization]);

  const handleStep = () => setStep(step + 1);

  const handleComplete = () => {
    navigation.go(SCREEN.DASHBOARD);
    // navigation.go(SCREEN.STATS, vaults[1]);
  };

  const signed = authorization !== undefined;

  console.log('<OnBoarding>');

  return (
    <>
      <Viewport {...style} visible={!signed || step >= WELCOME} backward={step > WELCOME}>
        <Banner align="left" image={BANNERS.SEND} marginBottom="XL" title={l10n.SLOGAN} caption={l10n.ELEVATOR_PITCH} />
        <Button onPress={handleStep} title={l10n.GET_STARTED} />
      </Viewport>

      <Session
        visible={signed || step >= PIN_CODE}
        backward={step > PIN_CODE}
        onProfile={authorization ? handleComplete : handleStep}
      />

      <FirstVault {...style} visible={step >= VAULT} backward={step > VAULT} onVault={handleStep} />

      <Viewport {...style} visible={step >= COMPLETED} backward={step > COMPLETED}>
        <Banner
          align="right"
          image={BANNERS.RECEIVE}
          marginBottom="XL"
          title="You did it!"
          caption="Successfully created account"
        />
        <Button onPress={handleComplete} style={styles.buttonRight} title={l10n.CONTINUE} />
      </Viewport>
    </>
  );
};

Onboarding.propTypes = {
  backward: PropTypes.bool,
  visible: PropTypes.bool,
};
