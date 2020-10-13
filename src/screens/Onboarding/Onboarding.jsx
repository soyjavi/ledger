import PropTypes from 'prop-types';
import React, { useState, useLayoutEffect } from 'react';
import { THEME } from 'reactor/common';

import { C } from '@common';
import { useNavigation, useStore } from '@context';

import { FirstVault, Completed, Session, Welcome } from './components';
import styles from './Onboarding.style';

const { SCREEN } = C;
const { MOTION } = THEME;
const style = { scroll: false, styleContent: styles.container };

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
    setStep(onboarded ? SESSION : WELCOME);
    setTimeout(() => setMounted(true), MOTION.EXPAND);
  }, [onboarded]);

  const handleComplete = () => {
    navigation.go(SCREEN.DASHBOARD);
    // navigation.go(SCREEN.VAULT, vaults[0]);
  };

  const handleSession = () => {
    vaults.length === 0 ? nextStep() : handleComplete();
  };

  const nextStep = () => setStep(step + 1);

  console.log('<OnBoarding>', { step });

  return mounted ? (
    <>
      {step <= SESSION && <Welcome {...style} backward={step > WELCOME} onPress={nextStep} visible={step >= WELCOME} />}
      <Session visible={step >= SESSION} backward={step > SESSION} onSession={handleSession} />
      {step > SESSION && (
        <>
          <FirstVault {...style} visible={step >= VAULT} backward={step > VAULT} onVault={nextStep} />
          <Completed {...style} visible={step >= COMPLETED} backward={step > COMPLETED} onPress={handleComplete} />
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
