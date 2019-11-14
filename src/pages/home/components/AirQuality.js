import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import WeatherAirQuality from 'src/components/weather/WeatherAirQuality';
import {connect} from 'react-redux';

const airKeys = [
    'pm25', 'pm10', 'no2', 'so2', 'co', 'o3',
];

class AirQuality extends Component {

    render() {
        let {airNowCity} = this.props;
        if (!airNowCity || !airNowCity.aqi) {
            return null;
        }
        return (
            <View style={styles.container}>
                <Text style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 14,
                    paddingTop: 12,
                    paddingBottom: 24,
                }}>空气质量</Text>
                <WeatherAirQuality
                    evnBean={airNowCity}/>
                <View style={{flex: 1, alignContent: 'center'}}>
                    <View style={styles.airIndexContainer}>
                        {
                            airKeys.map((item, index) => {
                                return (
                                    <View key={index} style={styles.airIndexWrapper}>
                                        <Text style={styles.indexTitle}>
                                            {item}
                                        </Text>
                                        <Text style={styles.indexValue}>
                                            {airNowCity[item]}
                                        </Text>
                                    </View>
                                );
                            })
                        }
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    airNowCity: state.home.airNowCity,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AirQuality);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    airIndexContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 450,
    },
    airIndexWrapper: {
        width: 150,
        height: 56,
        alignSelf: 'center',
        borderColor: '#FFFFFF',
        borderTopWidth: 0.3,
    },
    indexTitle: {
        textAlign: 'center',
        fontSize: 18,
    },
    indexValue: {
        textAlign: 'center',
    },
});
