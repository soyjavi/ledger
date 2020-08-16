import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { getPlace } from '@services';

export default async ({ connected, setLocation }) => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status === 'granted') {
    const { coords } = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    let location = { coords };

    if (coords) {
      if (connected) location.place = await getPlace(coords);
      setLocation(location);
    }
  }
};
