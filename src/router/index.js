import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import AppLaunch from '../pages/launch/AppLaunch';
import Home from '../pages/home';
import Test from '../pages/test';


const AppNavigator = createStackNavigator({
    AppLaunch: {
        screen: AppLaunch,
    },
    Home: {
        screen: Home,
    },
    Test: {
        screen: Test,
    },
}, {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none',
});

export default createAppContainer(AppNavigator);
