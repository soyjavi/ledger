import { ServiceNode } from '@services';

export const getBlockchain = async ({ qr, store: { settings } }) =>
  await ServiceNode.blockchain({ blockchain: qr, settings });
