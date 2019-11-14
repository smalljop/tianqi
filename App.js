import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import AppContainer from './src/router';
import {Root} from 'native-base';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Root>
                    <AppContainer/>
                </Root>
            </Provider>
        );
    }
}
