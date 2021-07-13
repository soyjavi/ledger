import {
  // helpers
  COLOR,
  // components
  Progress,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React, { useState, useLayoutEffect } from 'react';

import { C } from '@common';
import { useNavigation, useStore } from '@context';

import { FirstVault, Completed, Session, Welcome } from './components';
import { style } from './Onboarding.style';

const { SCREEN } = C;

const WELCOME = 1;
const SESSION = 2;
const VAULT = 3;
const COMPLETED = 4;

const Onboarding = () => {
  const navigation = useNavigation();
  const { settings: { onboarded } = {}, vaults = [] } = useStore();

  const [step, setStep] = useState();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setStep(onboarded ? VAULT : WELCOME);
    setTimeout(() => setMounted(true), 300);
  }, [onboarded]);

  const handleComplete = () => {
    navigation.go(SCREEN.DASHBOARD);
  };

  const handleSession = () => {
    vaults.length === 0 ? nextStep() : handleComplete();
  };

  const nextStep = () => setStep(step + 1);

  return mounted ? (
    <>
      {navigation.stack.length <= 1 && (
        <Progress
          active={step - 1}
          activeColor={COLOR.PRIMARY}
          inactiveColor={COLOR.GRAYSCALE_XL}
          length={4}
          style={style.progress}
        />
      )}
      {step <= SESSION && <Welcome backward={step > WELCOME} visible={step >= WELCOME} onPress={nextStep} />}
      <Session backward={step > SESSION} visible={step >= SESSION} onSession={handleSession} />
      {step > SESSION && (
        <>
          <FirstVault backward={step > VAULT} visible={step >= VAULT} onVault={nextStep} />
          <Completed backward={step > COMPLETED} visible={step >= COMPLETED} onPress={handleComplete} />
        </>
      )}
    </>
  ) : (
    <></>
  );
};

Onboarding.propTypes = {
  backward: PropTypes.bool,
};

export { Onboarding };
