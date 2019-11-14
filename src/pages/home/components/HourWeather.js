import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet, Image,
} from 'react-native';
import {connect} from 'react-redux';
import momentUtils from 'src/utils/MomentUtils';
import WeatherIcon from 'src/static/img/cond-icon-heweather/weatherIcon';
import Constants from 'src/utils/Constants';
import WeatherLineWidget from 'src/components/weather/WeatherLine';

class HourWeather extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {hourlyList} = this.props;
        return (
            <View style={styles.container}>
                <Text style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 14,
                    paddingTop: 12,
                    paddingBottom: 12,
                }}>每小时</Text>
                <FlatList
                    data={hourlyList}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={this.keyExtractor}
                    renderItem={({item, index}) => {
                        return this.convert(item, index);
                    }}
                    horizontal={true}/>
            </View>
        );
    }

    convert = (item, index) => {
        const hourlyList = this.props.hourlyList;
        const currentTemp = item.tmp;
        let WeatherLineBean;
        if (index === 0) {
            WeatherLineBean = this.generateWeatherLineBean(currentTemp, -1, hourlyList[1].tmp);
        } else if (index === hourlyList.length - 1) {
            WeatherLineBean = this.generateWeatherLineBean(currentTemp,
                hourlyList[hourlyList.length - 2].tmp, -1);
        } else {
            WeatherLineBean = this.generateWeatherLineBean(currentTemp,
                hourlyList[index - 1].tmp, hourlyList[index + 1].tmp);
        }
        return (
            <View style={{
                width: Constants.commonParam.SCREEN_WIDTH / 7,
                paddingBottom: 16,
                alignItems: 'center',
            }}>
                <Text style={{alignSelf: 'center'}}>
                    {momentUtils(item.time).format('HH:mm')}
                </Text>
                <Text style={{alignSelf: 'center'}}>
                    {item.cond_txt}
                </Text>
                <Image style={{width: 30, height: 30, alignSelf: 'center'}} resizeMethod='scale'
                       resizeMode='cover'
                       source={WeatherIcon[item.cond_code]}/>
                <WeatherLineWidget
                    WeatherLineBean={WeatherLineBean}/>
            </View>
        );
    };

    keyExtractor = (item, index) => index.toString();

    generateWeatherLineBean = (currentTemp, preTemp, nextTemp) => {
        let tmpArr = [];
        this.props.hourlyList.map((item => {
            tmpArr.push(item.tmp);
        }));
        tmpArr.sort((a, b) => {
            return a - b;
        });
        return {
            maxTemp: tmpArr[tmpArr.length - 1],
            minTemp: tmpArr[0],
            currentTemp: currentTemp,
            preTemp: preTemp,
            nextTemp: nextTemp,
        };
    };

    componentDidMount() {
    }
}

const mapStateToProps = state => ({
    hourlyList: state.home.hourlyList,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HourWeather);
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
