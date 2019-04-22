import debt from './category-debt.png';
import entertainment from './category-entertainment.png';
import foodAndDrinks from './category-food-and-drinks.png';
import healthcare from './category-healthcare.png';
import investment from './category-investment.png';
import others from './category-others.png';
import pasives from './category-pasives.png';
import personal from './category-personal.png';
import salary from './category-salary.png';
import services from './category-services.png';
import shopping from './category-shopping.png';
import transfer from './category-transfer.png';
import travel from './category-travel.png';
import utilities from './category-utilities.png';
import vaultTransfer from './category-vault-transfer.png';
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

import optionExpense from './option-expense.png';
import optionIncome from './option-income.png';

const CATEGORIES = [
  {
    0: wipe,
    1: foodAndDrinks,
    3: travel,
    4: debt,
    5: investment,
    6: entertainment,
    7: shopping,
    8: utilities,
    9: healthcare,
    10: personal,
    11: services,
    12: transfer,
    13: others,
    99: vaultTransfer,
  },
  {
    0: wipe,
    1: salary,
    2: investment,
    3: pasives,
    4: transfer,
    5: others,
    99: vaultTransfer,
  },
];

const FLAGS = {
  AUD, BTC, EUR, HKD, JPY, KRW, MYR, THB, GBP, USD, VND,
};

const OPTIONS = {
  expense: optionExpense,
  income: optionIncome,
  transfer: vaultTransfer,
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
