export default async ({
  props: { vault = {}, type },
  state: {
    coords: { latitude, longitude } = {},
    form: { category, value, title = '' },
    place,
  },
  store: { addTx },
}) =>
  addTx({
    category: parseInt(category, 10),
    title,
    type,
    value: parseFloat(value, 10),
    vault: vault.hash,
    location:
      latitude && longitude
        ? { latitude: parseFloat(latitude, 10), longitude: parseFloat(longitude, 10), place }
        : undefined,
  });
