import { createStackNavigator, createAppContainer } from 'react-navigation';

import {
  Session, Dashboard, Stats, Vault,
} from './src/screens';

const StackNavigator = createStackNavigator(
  {
    Session: { screen: Session },
    Dashboard: { screen: Dashboard },
    Stats: { screen: Stats },
    Vault: { screen: Vault },
  },
  {
    initialRouteName: 'Session',
    defaultNavigationOptions: {
      header: null,
    },
    // transitionConfig: () => ({
    //   screenInterpolator: sceneProps => CardStackStyleInterpolator.forHorizontal(sceneProps),
    // }),
  },
);

export default createAppContainer(StackNavigator);
