import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import momentUtils from 'src/utils/MomentUtils';
import WeatherIcon from 'src/static/img/cond-icon-heweather/weatherIcon';
import Constants from 'src/utils/Constants';
import WeatherLineWidget from 'src/components/weather/WeatherLine';

class DailyForecastList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {dailyForecastList} = this.props;
        return (
            <View>
                <Text style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 14,
                    paddingTop: 12,
                    paddingBottom: 12,
                }}>未来7天预报</Text>
                <View style={styles.container}>
                    {
                        dailyForecastList.map((item, index) => {
                            return (
                                <View key={index} style={styles.dailyForecastListWrapper}>
                                    <Text style={{alignSelf: 'center'}}>
                                        {
                                            momentUtils().format('dddd') == momentUtils(item.date).format('dddd') ?
                                                '今天' : momentUtils(item.date).format('dddd')
                                        }
                                    </Text>
                                    <Text style={{alignSelf: 'center'}}>
                                        {momentUtils(item.date).format('MM-DD')}
                                    </Text>
                                    <Text style={{alignSelf: 'center'}}>
                                        {item.cond_txt_d}
                                    </Text>
                                    <Image style={{width: 30, height: 30, alignSelf: 'center'}} resizeMethod='scale'
                                           resizeMode='cover'
                                           source={WeatherIcon[item.cond_code_d]}/>
                                    <View>
                                        {this.convert(item, index)}
                                    </View>
                                    <Image style={{width: 30, height: 30, alignSelf: 'center'}} resizeMethod='scale'
                                           resizeMode='cover'
                                           source={WeatherIcon[item.cond_code_n]}/>
                                    <Text style={{alignSelf: 'center'}}>
                                        {item.cond_txt_n}
                                    </Text>
                                </View>
                            );
                        })
                    }
                </View>
            </View>

        );
    }

    componentDidMount() {
    }


    convert = (item, index) => {
        const {dailyForecastList} = this.props;
        const dailyMaxAndMinTempObj = this.calDailyMaxAndMinTemp(dailyForecastList);
        const {dailyDayMaxNumMaxTemp, dailyDayMaxNumMinTemp, dailyDayMinNumMaxTemp, dailyDayMinNumMinTemp} = dailyMaxAndMinTempObj;
        const currentDayTemp = item.tmp_max;
        const currentNightTemp = item.tmp_min;
        let WeatherMaxLineBean, WeatherMinLineBean;
        if (index === 0) {
            WeatherMaxLineBean = this.generateWeatherLineBean(dailyDayMaxNumMaxTemp, dailyDayMaxNumMinTemp,
                currentDayTemp, -1, dailyForecastList[1].tmp_max);
            WeatherMinLineBean = this.generateWeatherLineBean(dailyDayMinNumMaxTemp, dailyDayMinNumMinTemp,
                currentNightTemp, -1, dailyForecastList[1].tmp_min);
        } else if (index === dailyForecastList.length - 1) {
            WeatherMaxLineBean = this.generateWeatherLineBean(dailyDayMaxNumMaxTemp, dailyDayMaxNumMinTemp,
                currentDayTemp, dailyForecastList[dailyForecastList.length - 2].tmp_max, -1);
            WeatherMinLineBean = this.generateWeatherLineBean(dailyDayMinNumMaxTemp, dailyDayMinNumMinTemp,
                currentNightTemp, dailyForecastList[dailyForecastList.length - 2].tmp_min, -1);
        } else {
            WeatherMaxLineBean = this.generateWeatherLineBean(dailyDayMaxNumMaxTemp, dailyDayMaxNumMinTemp,
                currentDayTemp, dailyForecastList[index - 1].tmp_max, dailyForecastList[index + 1].tmp_max);
            WeatherMinLineBean = this.generateWeatherLineBean(dailyDayMinNumMaxTemp, dailyDayMinNumMinTemp,
                currentNightTemp, dailyForecastList[index - 1].tmp_min, dailyForecastList[index + 1].tmp_min);
        }

        return (
            <View style={{
                width: Constants.commonParam.SCREEN_WIDTH / 7,
                paddingBottom: 0,
                alignItems: 'center',
            }}>
                <WeatherLineWidget
                    WeatherLineBean={WeatherMaxLineBean}/>
                <WeatherLineWidget
                    WeatherLineBean={WeatherMinLineBean}/>
            </View>
        );
    };

    calDailyMaxAndMinTemp = (dailyForecastList) => {

        let maxNumArr = [];
        let minNumArr = [];
        dailyForecastList.map((item => {
            maxNumArr.push(item.tmp_max);
            minNumArr.push(item.tmp_min);
        }));
        maxNumArr.sort((a, b) => {
            return a - b;
        });
        minNumArr.sort((a, b) => {
            return a - b;
        });
        console.log('maxNumArr' + maxNumArr + 'minNumArr' + minNumArr);
        return {
            dailyDayMaxNumMaxTemp: maxNumArr[maxNumArr.length - 1],
            dailyDayMaxNumMinTemp: maxNumArr[0],
            dailyDayMinNumMaxTemp: minNumArr[minNumArr.length - 1],
            dailyDayMinNumMinTemp: minNumArr[0],
        };
    };

    generateWeatherLineBean = (maxTemp, minTemp, currentTemp, preTemp, nextTemp) => {
        return {
            maxTemp: maxTemp,
            minTemp: minTemp,
            currentTemp: currentTemp,
            preTemp: preTemp,
            nextTemp: nextTemp,
        };
    };
}

const mapStateToProps = state => ({
    dailyForecastList: state.home.dailyForecastList,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DailyForecastList);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    dailyForecastListWrapper: {
        flex: 1,
        width: 50,
        height: 100,
        flexDirection: 'column',
    },

});
