import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Button, Viewport } from 'reactor/components';

import { BANNERS } from '@assets';
import { C } from '@common';
import { Banner } from '@components';
import { useNavigation, useL10N, useStore } from '@context';
import { Session } from '@screens/Session';

import styles from './Onboarding.style';
import { FirstVault } from './components';

const { SCREEN } = C;
const style = { scroll: false, styleContent: styles.container };

const WELCOME = 1;
const PIN_CODE = 2;
const VAULT = 3;
const COMPLETED = 4;

export const Onboarding = ({ ...others }) => {
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
    // navigation.go(SCREEN.VAULT, vaults[0]);
  };

  console.log('<OnBoarding>');

  return (
    <>
      <Viewport {...style} visible={step >= WELCOME} backward={step > WELCOME}>
        <Banner align="left" image={BANNERS.SEND} marginBottom="XL" title={l10n.SLOGAN} caption={l10n.ELEVATOR_PITCH} />
        <Button onPress={handleStep} title={l10n.GET_STARTED} />
      </Viewport>

      <Session
        backward={step > PIN_CODE}
        onProfile={authorization ? handleComplete : handleStep}
        visible={others.authorization === true || step >= PIN_CODE}
      />

      <FirstVault {...style} backward={step > VAULT} onVault={handleStep} visible={step >= VAULT} />

      <Viewport {...style} backward={step > COMPLETED} visible={step >= COMPLETED}>
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
