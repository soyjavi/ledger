import investment from './category-investment.png';
import others from './category-others.png';
import transfer from './category-transfer.png';
import wipe from './category-wipe.png';

import AUD from './flag-australia.png';
import BTC from './flag-bitcoin.png';
import EUR from './flag-europe.png';
import HKD from './flag-hong-kong.png';
import JPY from './flag-japan.png';
import KRW from './flag-south-korea.png';
import MYR from './flag-malaysia.png';
import THB from './flag-thailand.png';
import GBP from './flag-united-kingdom.png';
import USD from './flag-united-states.png';
import VND from './flag-vietnam.png';

import add from './icon_add.png';
import back from './icon_back.png';
import expense from './icon_expense.png';
import fingerprint from './icon_fingerprint.png';
import income from './icon_income.png';
import logo from './logo.png';


const CATEGORIES = [
  {
    0: wipe,
    1: require('./category-food-and-drinks.png'),
    3: require('./category-travel.png'),
    4: require('./category-debt.png'),
    5: investment,
    6: require('./category-entertainment.png'),
    7: require('./category-shopping.png'),
    8: require('./category-utilities.png'),
    9: require('./category-healthcare.png'),
    10: require('./category-personal.png'),
    11: require('./category-services.png'),
    12: transfer,
    13: others,
  },
  {
    0: wipe,
    1: require('./category-salary.png'),
    2: investment,
    3: require('./category-pasives.png'),
    4: transfer,
    5: others,
  },
];

const FLAGS = {
  AUD, BTC, EUR, HKD, JPY, KRW, MYR, THB, GBP, USD, VND,
};

const OPTIONS = {
  expense: require('./option-expense.png'),
  income: require('./option-income.png'),
  transfer: require('./option-transfer.png'),
};

export { CATEGORIES, FLAGS, OPTIONS };

export default {
  add,
  back,
  expense,
  fingerprint,
  income,
  logo,
};
