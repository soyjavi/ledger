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

import debtNightMode from './debt-nightmode.png';
import entertainmentNightMode from './entertainment-nightmode.png';
import foodAndDrinksNightMode from './food-and-drinks-nightmode.png';
import healthcareNightMode from './healthcare-nightmode.png';
import investmentNightMode from './investment-nightmode.png';
import othersNightMode from './others-nightmode.png';
import pasivesNightMode from './pasives-nightmode.png';
import personalNightMode from './personal-nightmode.png';
import salaryNightMode from './salary-nightmode.png';
import servicesNightMode from './services-nightmode.png';
import shoppingNightMode from './shopping-nightmode.png';
import transferNightMode from './transfer-nightmode.png';
import travelNightMode from './travel-nightmode.png';
import utilitiesNightMode from './utilities-nightmode.png';
import vaultTransferNightMode from './vault-transfer-nightmode.png';
import wipeNightMode from './wipe-nightmode.png';

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

const CATEGORIES_NIGHTMODE = [
  {
    0: wipeNightMode,
    1: foodAndDrinksNightMode,
    3: travelNightMode,
    4: debtNightMode,
    5: investmentNightMode,
    6: entertainmentNightMode,
    7: shoppingNightMode,
    8: utilitiesNightMode,
    9: healthcareNightMode,
    10: personalNightMode,
    11: servicesNightMode,
    12: transferNightMode,
    13: othersNightMode,
    99: vaultTransferNightMode,
  },
  {
    0: wipeNightMode,
    1: salaryNightMode,
    2: investmentNightMode,
    3: pasivesNightMode,
    4: transferNightMode,
    5: othersNightMode,
    99: vaultTransferNightMode,
  },
];

export { CATEGORIES, CATEGORIES_NIGHTMODE };
