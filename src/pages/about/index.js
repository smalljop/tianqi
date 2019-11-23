import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

class About extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('src/static/img/logo.png')}/>
                <Text>天气</Text>
                <Text>{DeviceInfo.getVersion()}</Text>
                <View style={{height: 50}}>
                    <Text>smalljop 版权所有 </Text>
                </View>
                <Text style={{fontSize: 12}}>
                    数据来源于和风天气
                </Text>
            </View>
        );
    }

    componentDidMount() {

    }

}


export default About;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        height: 200,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
});
