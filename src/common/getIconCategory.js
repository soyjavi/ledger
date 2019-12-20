// {
//     0: wipe,
//     1: foodAndDrinks,
//     3: travel,
//     4: debt,
//     5: investment,
//     6: entertainment,
//     7: shopping,
//     8: utilities,
//     9: healthcare,
//     10: personal,
//     11: services,
//     12: transfer,
//     13: others,
//     99: vaultTransfer,
//   },
//   {
//     0: wipe,
//     1: salary,
//     2: investment,
//     3: pasives,
//     4: transfer,
//     5: others,
//     99: vaultTransfer,
//   },

export default ({ type, category, title = '' } = {}) => (
  'question-circle'
  // CATEGORIES[type][title.toLowerCase()] || CATEGORIES[type][category]
);
