import React, {Component} from 'react';
import {
    View,
    Button,
    Text,
    StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import ShiDu from 'src/static/svg/weather/basic/ShiDu.svg';
import Feng from 'src/static/svg/weather/basic/Feng.svg';
import WenDu from 'src/static/svg/weather/basic/WenDu.svg';
import {scaleSize} from 'src/utils/ScreenUtil';

class BasicWeather extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {geoPosition, nowWeather} = this.props;
        if (!nowWeather.update) {
            return null;
        }
        return (
            <View style={styles.container}>

                <View style={styles.updateTimeContainer}>
                    <Text>
                        <Text style={{}}> 更新时间：{nowWeather.update.loc}</Text>
                    </Text>
                </View>
                <View style={styles.temperatureContainer}>
                    <Text style={{}}>
                        <Text style={{fontSize: 60}}> {nowWeather.now.tmp}</Text>℃
                    </Text>
                    <Text style={{alignSelf: 'center'}}> {nowWeather.now.cond_txt}</Text>
                </View>
                <View style={styles.extWeatherContainer}>
                    <View style={styles.extWeatherInfoContainer}>
                        <ShiDu style={styles.extWeatherInfoIcon} width={30} height={30}/>
                        <View>
                            <Text>
                                空气湿度
                            </Text>
                            <Text style={{alignSelf: 'center'}}>
                                {nowWeather.now.hum}°
                            </Text>
                        </View>
                    </View>
                    <View style={styles.extWeatherInfoContainer}>
                        <Feng style={styles.extWeatherInfoIcon} width={30} height={30}/>
                        <View>
                            <Text>
                                {nowWeather.now.wind_dir}
                            </Text>
                            <Text style={{alignSelf: 'center'}}>
                                {nowWeather.now.wind_sc}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.extWeatherInfoContainer}>
                        <WenDu style={styles.extWeatherInfoIcon} width={30} height={30}/>
                        <View>
                            <Text>
                                体感温度
                            </Text>
                            <Text style={{alignSelf: 'center'}}>
                                {nowWeather.now.fl}℃
                            </Text>
                        </View>
                    </View>
                </View>

            </View>
        );
    }

    componentDidMount() {
    }

}

const mapStateToProps = state => ({
    geoPosition: state.home.geoPosition,
    nowWeather: state.home.nowWeather,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BasicWeather);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: '#FFFFFF',
    },
    updateTimeContainer: {
        height: 40,
        flexDirection: 'row-reverse',
        margin: 20,
    },
    temperatureContainer: {
        height: 200,
        alignSelf: 'center',
    },
    extWeatherContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    extWeatherInfoContainer: {
        width: scaleSize(90),
        height: 50,
        margin: 20,
        flexDirection: 'row',
    },
    extWeatherInfoIcon: {
        marginRight: 10,
    },
});
