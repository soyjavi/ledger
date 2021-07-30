import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { ServiceLocation } from '@services';

export default async ({ online, setLocation }) => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status === 'granted') {
    let { coords } = (await Location.getCurrentPositionAsync({ enableHighAccuracy: true })) || {};

    console.log('>>>>', { coords });
    if (coords)
      setLocation({
        coords,
        place: online ? await ServiceLocation.getPlace(coords) : undefined,
      });
  }
};
