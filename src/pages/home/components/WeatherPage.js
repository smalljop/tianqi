import React, {Component} from 'react';
import {
    ScrollView,
    Button,
    StyleSheet,
    RefreshControl, Text,
} from 'react-native';
import {connect} from 'react-redux';
import BasicWeather from './BasicWeather';
import HourWeather from './HourWeather';
import DailyForecastList from './DailyForecastList';
import AirQuality from './AirQuality';
import SunriseAndSunset from './SunriseAndSunset';
import Lifestyle from './Lifestyle';
import {actionCreators} from '../store';
import {View} from 'react-native-animatable';

class WeatherPage extends Component {
    propTypes: {
        longitude: PropTypes.string,
        latitude: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {refreshing: false};
    }

    render() {
        return (
            <View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            title={'下拉刷新'}
                            refreshing={this.state.refreshing}
                            colors={['rgb(255, 176, 0)', '#ffb100']}
                            onRefresh={this.onRefresh}
                        />
                    }>
                    <BasicWeather index={this.props.index}/>
                    <View animation="fadeInLeft" delay={3000} style={{height: 250}}>
                        <HourWeather/>
                    </View>
                    <View animation="fadeInLeft" delay={3000} style={{height: 300}}>
                        <DailyForecastList/>
                    </View>
                    <View>
                        <AirQuality/>
                    </View>
                    <View>
                        <SunriseAndSunset/>
                    </View>
                    <View>
                        <Lifestyle/>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 14, color: '#FFFFFF'}}>数据来自于和风天气</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        let {longitude, latitude} = this.props;
        this.props.getAllWeatherInfo(longitude, latitude);
        this.setState({refreshing: false});
    };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    getAllWeatherInfo(longitude, latitude, index) {
        dispatch(actionCreators.getAllWeatherInfo(longitude, latitude, index));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherPage);

const styles = StyleSheet.create({

    basicWeatherContainer: {
        // flex: 1,
        // flexDirection: 'row',
        // alignSelf: 'center',
        // height: 400,
        // justifyContent: 'flex-start',//水平居中
    },
    dailyForecastListContainer: {
        // flex: 1,
        // marginTop: 190,
        // flexDirection: 'row',
        // alignSelf: 'center',
        justifyContent: 'flex-start',//水平居中
    },

});
