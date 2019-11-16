import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import AppLaunch from 'src/pages/launch/AppLaunch';
import Home from 'src/pages/home';
import City from 'src/pages/city';
import Test from 'src/pages/test';
import SearchCity from 'src/pages/city/components/SearchCity';

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
    City: {
        screen: City,
    },
    SearchCity: {
        screen: SearchCity,
    },
}, {
    initialRouteName: 'Test',
    mode: 'modal',
    headerMode: 'none',
});

export default createAppContainer(AppNavigator);
