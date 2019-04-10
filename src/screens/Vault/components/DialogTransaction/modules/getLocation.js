import { fetch } from '../../../../../common';

export default async (component, getLocationAsync) => {
  component.setState({ coords: undefined, location: true, place: undefined });

  const coords = await getLocationAsync();
  const { place } = await fetch({
    service: `place?latitude=${coords.latitude}&longitude=${coords.longitude}`,
  });
  component.setState({ coords, place });
};
