// import ICON_GLYPHS from '../../assets/fonts/Shield-Icons.json';

// const glyphs = Object.keys(ICON_GLYPHS);

const CATEGORY_ICON = [
  {
    // Expenses
    0: 'trash',
    1: 'restaurant',
    3: 'plane',
    4: 'bank',
    5: 'percent',
    6: 'game',
    7: 'shopping',
    8: 'lightbulb',
    9: 'hospital',
    10: 'heart',
    11: 'customer-service',
    12: 'arrow-left-down',
    13: 'question',
    99: 'arrow-left-right',
  },
  {
    // Incomes
    0: 'trash',
    1: 'building',
    2: 'percent',
    3: 'calendar',
    4: 'arrow-right-up',
    5: 'question',
    99: 'arrow-left-right',
  },
];

export const getIcon = ({ type, category, title } = {}) => {
  const contains = (samples) => samples.filter((value) => captions.includes(value)).length > 0;

  let captions = title ? title.trim().toLowerCase().split(' ') : undefined;

  if (captions) {
    // Food & Drinks
    if (contains(['water'])) return 'water';
    if (contains(['coffee', 'tea'])) return 'cup';
    // Healthcare
    if (contains(['pill', 'medicine', 'vitamine'])) return 'capsule';
    // shopping
    if (contains(['clothes', 'clothing', 'uniqlo', 'jacket', 'pants', 'trousers', 't-shirt', 'shirt']))
      return 'clothing';
    // entertainment
    if (contains(['movie', 'film', 'cinema'])) return 'film';
    if (contains(['music', 'concert'])) return 'music';
    // Utilities
    if (contains(['gasoline', 'gas station'])) return 'gas-station';
    if (contains(['phone', 'smartphone', 'iphone'])) return 'smartphone';
    if (contains(['villa', 'house', 'condo'])) return 'home';
    if (contains(['wifi'])) return 'home-wifi';
    // ??
    if (contains(['car'])) return 'car';
    // Brands
    else if (contains(['apple', 'iphone', 'icloud'])) return 'apple';
    else if (contains(['spotify'])) return 'spotify';
    else if (contains(['paypal'])) return 'paypal';
  }

  return CATEGORY_ICON[type][category] || 'question';
};
