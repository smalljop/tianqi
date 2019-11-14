import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import WeatherSunriseAndSunset from 'src/components/weather/WeatherSunriseAndSunset';
import {connect} from 'react-redux';

class SunriseAndSunset extends Component {

    render() {
        let {dailyForecastList} = this.props;
        let sr, ss;
        if (dailyForecastList) {
            let current = this.props.dailyForecastList[0];
            if (current) {
                sr = current.sr;
                ss = current.ss;
            } else {
                return null;
            }
        } else {
            return null;
        }

        return (
            <View style={styles.container}>
                <Text style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 14,
                    paddingTop: 12,
                    paddingBottom: 12,
                }}>日出和日落</Text>
                <WeatherSunriseAndSunset
                    sunrise={sr} sunset={ss}/>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    dailyForecastList: state.home.dailyForecastList,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SunriseAndSunset);
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
