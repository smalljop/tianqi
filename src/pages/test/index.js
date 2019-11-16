import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import FaceBookTabBar from 'src/components/weather/FaceBookTabBar.js'
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';

class Test extends React.Component {

    render() {
        return (
            <ScrollableTabView
                style={{marginTop: 20}}
                initialPage={0}
                renderTabBar={() => <FaceBookTabBar/>}
            >
                <View tabLabel='Tab #1'>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 10,
                        height: 10,
                        backgroundColor: '#f76260',
                        borderColor: 'green',
                        borderStyle: 'solid',
                        borderRadius: 15,
                        paddingBottom: 2,
                    }}>
                    </View>
                </View>
                <Text tabLabel='Tab #2'>favorite</Text>
                <Text tabLabel='Tab #3'>project</Text>
            </ScrollableTabView>
        );
    }

}

export default Test;
