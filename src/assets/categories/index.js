import debt from './debt.png';
import entertainment from './entertainment.png';
import foodAndDrinks from './food-and-drinks.png';
import healthcare from './healthcare.png';
import investment from './investment.png';
import others from './others.png';
import pasives from './pasives.png';
import personal from './personal.png';
import salary from './salary.png';
import services from './services.png';
import shopping from './shopping.png';
import transfer from './transfer.png';
import travel from './travel.png';
import utilities from './utilities.png';
import vaultTransfer from './vault-transfer.png';
import wipe from './wipe.png';

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

export default CATEGORIES;
