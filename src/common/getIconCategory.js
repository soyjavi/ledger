const CATEGORIES = [
  {
    0: 'trash',
    1: 'cup',
    3: 'plane',
    4: 'badge',
    5: 'speedometer',
    6: 'puzzle',
    7: 'bag',
    8: 'energy',
    9: 'heart',
    10: 'user',
    11: 'earphones-alt',
    12: 'doc',
    13: 'question',
    99: 'shuffle',
  },
  {
    0: 'trash',
    1: 'briefcase',
    2: 'speedometer',
    3: 'calendar',
    4: 'doc',
    5: 'question',
    99: 'shuffle',
  },
];

export default ({ type, category } = {}) => CATEGORIES[type][category];
