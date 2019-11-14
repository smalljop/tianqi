import React from 'react';
import {StyleSheet, View, Text, FlatList, Button} from 'react-native';
import Constants from 'src/utils/Constants';
import WeatherLineWidget from 'src/components/weather/WeatherLine';
import {Container, Header, Content, Toast} from 'native-base';
import {connect} from 'react-redux';
import {actionCreators} from '../home/store';
import ToastUtils from 'src/utils/ToastUtils';

class App extends React.Component {
    render() {
        return (
            <View style={{backgroundColor: 'blue'}}>
                {/*<FlatList*/}
                {/*    data={this.props.dailyForecastList}*/}
                {/*    showsHorizontalScrollIndicator={false}*/}
                {/*    keyExtractor={this.keyExtractor}*/}
                {/*    renderItem={({item, index}) => {*/}
                {/*        return this.convert(item, index);*/}
                {/*    }}*/}
                {/*    horizontal={true}/>*/}
                <Button onPress={() => {
                    ToastUtils.danger('11212');
                }} title='1212'></Button>
                {/*<Button onPress={() => {*/}
                {/*    Toast.show({*/}
                {/*        text: 'Wrong password!',*/}
                {/*        buttonText: 'Okay',*/}
                {/*    });*/}
                {/*}} title='1212'></Button>*/}
            </View>
        );
    }

    keyExtractor = (item, index) => index.toString();

    convert = (item, index) => {
        const forecast15 = this.props.dailyForecastList;
        const dailyMaxAndMinTempObj = this.calDailyMaxAndMinTemp(forecast15);
        const {dailyDayMaxTemp, dailyDayMinTemp, dailyNightMaxTemp, dailyNightMinTemp} = dailyMaxAndMinTempObj;
        const currentDayTemp = item.tmp_max;
        const currentNightTemp = item.tmp_min;
        let WeatherDayLineBean, WeatherNightLineBean;
        if (index === 0) {
            WeatherDayLineBean = this.generateWeatherLineBean(dailyDayMaxTemp, dailyDayMinTemp,
                currentDayTemp, -1, forecast15[1].tmp_max);
            WeatherNightLineBean = this.generateWeatherLineBean(dailyNightMaxTemp, dailyNightMinTemp,
                currentNightTemp, -1, forecast15[1].tmp_min);
        } else if (index === forecast15.length - 1) {
            WeatherDayLineBean = this.generateWeatherLineBean(dailyDayMaxTemp, dailyDayMinTemp,
                currentDayTemp, forecast15[forecast15.length - 2].tmp_max, -1);
            WeatherNightLineBean = this.generateWeatherLineBean(dailyNightMaxTemp, dailyNightMinTemp,
                currentNightTemp, forecast15[forecast15.length - 2].tmp_min, -1);
        } else {
            WeatherDayLineBean = this.generateWeatherLineBean(dailyDayMaxTemp, dailyDayMinTemp,
                currentDayTemp, forecast15[index - 1].tmp_max, forecast15[index + 1].tmp_max);
            WeatherNightLineBean = this.generateWeatherLineBean(dailyNightMaxTemp, dailyNightMinTemp,
                currentNightTemp, forecast15[index - 1].tmp_min, forecast15[index + 1].tmp_min);
        }


        return (
            <View style={{
                width: Constants.commonParam.SCREEN_WIDTH / 6,
                paddingBottom: 16,
                alignItems: 'center',
            }}>
                <Text>
                    {item.cond_txt_d}
                </Text>
                <Text>
                    {item.cond_txt_d}
                </Text>
                <Text style={{
                    fontSize: 11,
                    marginTop: 4,
                }}>{item.date}</Text>
                <WeatherLineWidget
                    WeatherLineBean={WeatherDayLineBean}/>
                <WeatherLineWidget
                    WeatherLineBean={WeatherNightLineBean}/>
            </View>
        );
    };

    calDailyMaxAndMinTemp = (forecast15) => {
        let dailyDayMaxTemp = 0, dailyDayMinTemp = 0,
            dailyNightMaxTemp = 0, dailyNightMinTemp = 0;

        if (forecast15) {
            dailyDayMaxTemp = forecast15[0].tmp_max;
            dailyDayMinTemp = dailyDayMaxTemp;

            dailyNightMaxTemp = forecast15[0].tmp_min;
            dailyNightMinTemp = dailyNightMaxTemp;
            const size = forecast15.length;
            let i;
            for (i = 1; i < size; i++) {
                const dayMaxTemp = forecast15[i].tmp_max;
                const dayMinTemp = forecast15[i].tmp_max;
                if (dayMaxTemp > dailyDayMaxTemp) {
                    dailyDayMaxTemp = dayMaxTemp;
                }
                if (dayMinTemp < dailyDayMinTemp) {
                    dailyDayMinTemp = dayMinTemp;
                }

                const nightMaxTemp = forecast15[i].tmp_min;
                const nightMinTemp = forecast15[i].tmp_min;
                if (nightMaxTemp > dailyNightMaxTemp) {
                    dailyNightMaxTemp = nightMaxTemp;
                }
                if (nightMinTemp < dailyNightMinTemp) {
                    dailyNightMinTemp = nightMinTemp;
                }
            }
        }
        return {
            dailyDayMaxTemp: dailyDayMaxTemp,
            dailyDayMinTemp: dailyDayMinTemp,
            dailyNightMaxTemp: dailyNightMaxTemp,
            dailyNightMinTemp: dailyNightMinTemp,
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

    componentDidMount() {
        // this.props.getCurrentPosition();
    }
}

const mapStateToProps = state => ({
    // dailyForecastList: state.home.dailyForecastList,
});

const mapDispatchToProps = dispatch => ({
    getCurrentPosition() {
        dispatch(actionCreators.getCurrentPosition());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
    },
});
