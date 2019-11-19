import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'native-base';


export default class WeatherTabBar extends Component {
    propTypes: {
        activeIndex: PropTypes.number,
        tabBarItemNumber: PropTypes.number
    };

    render() {
        let {activeIndex, tabBarItemNumber} = this.props;
        let barComponents = [];
        for (let i = 0; i < tabBarItemNumber; i++) {
            if (i === 0) {
                barComponents.push(
                    <View key={i} style={{alignSelf: 'center'}}>
                        <Icon name='pin'
                              style={{
                                  alignSelf: 'center',
                                  fontSize: 8,
                                  marginRight: 3,
                                  color: activeIndex == i ? '#157DFF' : 'rgb(255,255,255)',
                              }}/>
                    </View>,
                );
            } else {
                barComponents.push(
                    <View key={i} style={{
                        alignSelf: 'center',
                        margin: 3,
                        width: 4,
                        height: 4,
                        backgroundColor: activeIndex == i ? '#157DFF' : 'rgb(255,255,255)',
                        borderColor: 'green',
                        borderStyle: 'solid',
                        borderRadius: 15,
                        paddingBottom: 2,
                    }}>
                    </View>,
                );
            }
        }
        return (
            <View style={styles.barContainer}>
                {barComponents}
            </View>
        );
    }

}


const styles = StyleSheet.create({
    barContainer: {
        height: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },

});
