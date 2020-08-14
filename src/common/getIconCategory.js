const CATEGORIES = [
  {
    0: 'trash-can-outline',
    1: 'silverware-fork-knife',
    3: 'airplane',
    4: 'office-building',
    5: 'resize',
    6: 'cards-playing-outline',
    7: 'store',
    8: 'lightbulb-outline',
    9: 'medical-bag',
    10: 'account',
    11: 'taxi',
    12: 'arrow-left-bold-outline',
    13: 'cloud-question',
    99: 'arrow-left-right-bold-outline',
  },
  {
    0: 'trash-can-outline',
    1: 'bank',
    2: 'expand-all-outline',
    3: 'timer-sand',
    4: 'arrow-right-bold-outline',
    5: 'cloud-question',
    99: 'arrow-left-right-bold-outline',
  },
];

export default ({ type, category, title = '' } = {}) => {
  let value;
  let parsedTitle = title.toLowerCase().trim();

  if (parsedTitle === 'coffee') value = 'coffee';
  else if (parsedTitle === 'beer') value = 'beer';
  else value = CATEGORIES[type][category];

  return value;
};
