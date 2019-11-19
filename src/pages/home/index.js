import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Alert,
    Image, findNodeHandle, Text,
} from 'react-native';
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {Container, Header, Left, Body, Right, Button, Icon, Title} from 'native-base';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import WeatherPage from './components/WeatherPage';
import {BlurView} from '@react-native-community/blur';
import WeatherTabBar from 'src/components/weather/WeatherTabBar';
import AsyncStorageUtils from 'src/utils/AsyncStorageUtils';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewRef: null,
            refreshing: false,
            currentCityIndex: 0,
            cityList: [],
            cityNumber: 0,
            address: '',
        };
    }


    render() {
        let {geoPosition} = this.props;
        let {cityList} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.blurViewContainer}>
                    <Image
                        ref={(img) => {
                            this.backgroundImage = img;
                        }}
                        source={require('src/static/img/background.png')}
                        style={styles.blurViewWrapper}
                        onLoadEnd={this.imageLoaded.bind(this)}
                    />
                    {this.state.viewRef && <BlurView
                        style={styles.blurViewWrapper}
                        viewRef={this.state.viewRef}
                        blurType="light"
                        blurAmount={9}/>}
                </View>
                <View style={{flex: 1}}>
                    <Header transparent>
                        <Left>
                            <Button onPress={() => {
                                this.props.navigation.navigate('City');
                            }} transparent>
                                <Icon name='menu'/>
                            </Button>
                        </Left>
                        <Body style={{alignItems: 'center'}}>
                            <Title>{this.state.address}</Title>
                        </Body>
                        <Right>
                            <Button onPress={() => {
                                console.log(this.state.cityList);
                                Alert.alert(JSON.stringify(this.state.cityList));
                            }} transparent>
                                <Icon name='more'/>
                            </Button>
                        </Right>
                    </Header>
                    <WeatherTabBar style={{height: 10}} activeIndex={this.state.currentCityIndex}
                                   tabBarItemNumber={this.state.cityNumber + 1}/>
                    <ScrollableTabView
                        style={{marginTop: 20}}
                        initialPage={0}
                        renderTabBar={false}
                        onChangeTab={(obj) => {
                            const index = obj.i;
                            let address = '';
                            let city = null;
                            if (cityList) {
                                city = cityList[index - 1];
                            }
                            if (index == 0) {
                                address = geoPosition.addressComponent.district + '.' + geoPosition.addressComponent.township;
                                this.props.getAllWeatherInfo(geoPosition.longitude, geoPosition.latitude);
                            } else {
                                address = city ? city.location : '';
                                if (city) {
                                    this.props.getAllWeatherInfo(city.lon, city.lat);
                                }
                            }
                            this.setState({
                                currentCityIndex: index,
                                address: address,
                            });
                        }}>
                        <WeatherPage index={0}/>
                        {
                            cityList.map((item, index) => {
                                return <WeatherPage index={index}/>;
                            })
                        }
                    </ScrollableTabView>
                </View>
            </View>
        );
    }


    componentDidMount() {
        this.didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                this.props.getCurrentPosition();
                AsyncStorageUtils.get('cityList').then(data => {
                    this.setState({
                        cityList: data,
                        //保存城市+当前定位
                        cityNumber: data.length,
                    });
                });
            },
        );
    }


    componentWillUnmount() {
        this.didBlurSubscription.remove();
    }


    imageLoaded() {
        this.setState({viewRef: findNodeHandle(this.backgroundImage)});
    }


}

const mapStateToProps = state => ({
    geoPosition: state.home.geoPosition,
    nowWeather: state.home.nowWeather,
});

const mapDispatchToProps = dispatch => ({
    getCurrentPosition() {
        dispatch(actionCreators.getCurrentPosition());
    },
    getNowWeather(longitude, latitude) {
        dispatch(actionCreators.getNowWeather(longitude, latitude));
    },
    getAllWeatherInfo(longitude, latitude, index) {
        dispatch(actionCreators.getAllWeatherInfo(longitude, latitude, index));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: '#ffffff',
    },
    blurViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 10,
    },
    blurViewWrapper: {
        position: 'absolute',
        top: 0, left: 0, bottom: 0, right: 0,
    },
});
