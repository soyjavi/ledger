import { THEME } from '../../../reactor/common';

const {
  MOTION: { DURATION },
} = THEME;

export const onPin = ({ handleHandshake, setPin, store }, pin) => {
  setPin(pin);

  if (pin.length === 4) {
    setTimeout(() => {
      if (store.pin === undefined || store.pin === pin) handleHandshake(pin);
      else setPin('');
    }, DURATION / 2);
  }
};
