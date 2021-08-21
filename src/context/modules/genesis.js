export const genesis = (blocks = []) => {
  const [firstBlock = {}] = blocks;
  const data = 'Genesis Block';

  return firstBlock.data === data ? blocks : [{ ...firstBlock, data, previousHash: undefined }, ...blocks];
};
