import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { getPlace } from '../../../../../services';

export default async (state, setState) => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status === 'granted') {
    const { coords } = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    const { latitude, longitude } = coords;


    setState({
      ...state, coords: undefined, location: true, place: undefined,
    });
    if (coords) {
      const place = await getPlace({ latitude, longitude });
      setState({
        ...state, location: true, coords, place,
      });
    }
  }
};
