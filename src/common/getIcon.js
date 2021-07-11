// import ICON_GLYPHS from '../../assets/fonts/Shield-Icons.json';

// const glyphs = Object.keys(ICON_GLYPHS);

const CATEGORY_ICON = [
  {
    // Expenses
    0: 'trash',
    1: 'cup',
    3: 'plane',
    4: 'badge',
    5: 'speedometer',
    6: 'puzzle',
    7: 'shopping',
    8: 'energy',
    9: 'hospital',
    10: 'user',
    11: 'earphones-alt',
    12: 'doctor',
    13: 'question',
    99: 'shuffle',
  },
  {
    // Incomes
    0: 'trash',
    1: 'briefcase',
    2: 'speedometer',
    3: 'calendar',
    4: 'doc',
    5: 'question',
    99: 'shuffle',
  },
];

export const getIcon = ({ type, category, title } = {}) => {
  const contains = (samples) => samples.filter((value) => captions.includes(value)).length > 0;

  let captions = title ? title.trim().toLowerCase().split(' ') : undefined;

  if (captions) {
    // Food & Drinks
    if (contains(['water'])) return 'water';
    if (contains(['car'])) return 'car';
    if (contains(['gasoline', 'gas station'])) return 'gas-station';
    if (contains(['coffee', 'tea'])) return 'cup';
    // Healthcare
    if (contains(['pill', 'medicine'])) return 'medicine';
    // shopping
    if (contains(['clothes', 'clothing'])) return 'clothing';
    // entertainment
    if (contains(['movie', 'film', 'cinema'])) return 'film';
    if (contains(['music', 'concert'])) return 'music';

    if (contains(['villa', 'house'])) return 'house';
    // Brands
    else if (contains(['apple', 'iphone', 'icloud'])) return 'apple';
    else if (contains(['spotify'])) return 'spotify';
    else if (contains(['paypal'])) return 'paypal';
  }

  return CATEGORY_ICON[type][category] || 'question';
};
