import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { fetch } from '../../../../../common';

export default async (state, setState) => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status === 'granted') {
    const { coords } = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    const { latitude, longitude } = coords;


    setState({ coords: undefined, location: true, place: undefined });
    if (coords) {
      const { place } = await fetch({ service: `place?latitude=${latitude}&longitude=${longitude}` });
      setState({
        ...state, location: true, coords, place,
      });
    }
  }
};
