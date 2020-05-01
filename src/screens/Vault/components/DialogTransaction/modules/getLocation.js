import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { getPlace } from '@services';

export default async (setLocation) => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status === 'granted') {
    const { coords } = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    const { latitude, longitude } = coords;

    if (coords) {
      setLocation({
        coords,
        place: await getPlace({ latitude, longitude }),
      });
    }
  }
};
