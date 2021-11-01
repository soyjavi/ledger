import { C } from './constants';

const { VAULT_TRANSFER } = C;

export const isInternalTransfer = (tx = {}) => tx.category === VAULT_TRANSFER;
