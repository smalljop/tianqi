import React, {Component} from 'react';
import {findNodeHandle, Image, StyleSheet, Text, TouchableOpacity, Alert, View} from 'react-native';
import {connect} from 'react-redux';

import {Body, Button, Header, Icon, Left, Right, Title} from 'native-base';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {BlurView} from '@react-native-community/blur';
import CodePush from 'react-native-code-push';
import Modal from 'react-native-modal';
import WeatherPage from './components/WeatherPage';
import About from '../about/index';
import WeatherTabBar from 'src/components/weather/WeatherTabBar';
import {actionCreators} from './store';
import AsyncStorageUtils from 'src/utils/AsyncStorageUtils';
import Constants from 'src/utils/Constants';

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
            slideMoreMenuModal: false,
            aboutModal: false,
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
                            <Title>{this.state.address ? this.state.address :
                                geoPosition.addressComponent.district + '.' + geoPosition.addressComponent.township}</Title>
                        </Body>
                        <Right style={{position: 'relative'}}>
                            <Button onPress={() => {
                                this.setState({
                                    slideMoreMenuModal: true,
                                });
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
                        <WeatherPage longitude={geoPosition.longitude} latitude={geoPosition.latitude} index={0}/>
                        {
                            cityList.map((item, index) => {
                                return <WeatherPage key={index} longitude={item.lon} latitude={item.lat}
                                                    index={index}/>;
                            })
                        }
                    </ScrollableTabView>
                </View>
                <Modal
                    backdropColor='rgba(0, 0, 0, 0.1)'
                    // coverScreen={true}
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                    }}
                    animationIn='slideInDown'
                    onBackdropPress={() => {
                        this.setState({
                            slideMoreMenuModal: false,
                        });
                    }}
                    isVisible={this.state.slideMoreMenuModal}>
                    <View style={{
                        backgroundColor: 'white',
                        padding: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 4,
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                    }}>
                        <TouchableOpacity onPress={() => [
                            Alert.alert('e'),
                        ]}>
                            <Text style={{fontSize: 15, lineHeight: 40}}>分享天气</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.checkUpdate();
                        }}>
                            <Text style={{fontSize: 15, lineHeight: 40}}>检查更新</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => [
                            this.setState({
                                slideMoreMenuModal: false,
                                aboutModal: true,
                            }),
                        ]}>
                            <Text style={{fontSize: 15, lineHeight: 40}}>关于我们</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                    backdropColor='rgba(0, 0, 0, 0.1)'
                    onBackdropPress={() => {
                        this.setState({
                            aboutModal: false,
                        });
                    }}
                    isVisible={this.state.aboutModal}>
                    <About/>
                </Modal>

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


    checkUpdate() {
        CodePush.checkForUpdate()
            .then((update) => {
                if (!update) {
                    Alert.alert('app是最新版了');
                } else {
                    CodePush.sync({
                        updateDialog: {
                            optionalIgnoreButtonLabel: '稍后',
                            optionalInstallButtonLabel: '后台更新',
                            optionalUpdateMessage: '有新版本了，是否更新？',
                            title: '更新提示',
                        },
                        installMode: CodePush.InstallMode.IMMEDIATE,
                    });
                }
            });
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
