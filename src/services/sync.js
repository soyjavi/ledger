import { apiCall } from './modules';

export const getSyncState = async ({ settings: { authorization, secret }, snackbar }) =>
  apiCall({
    service: 'state',
    headers: { authorization, secret },
  }).catch((error) => snackbar.error(error.message));

export const sync = async ({ block, blocks, settings: { authorization, secret }, snackbar }) => {
  const response = await apiCall({
    method: 'POST',
    service: 'sync',
    headers: { authorization, secret },
    block,
    blocks,
  }).catch((error) => snackbar && snackbar.error(error.message));

  return response ? true : false;
};
