import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Image,
    findNodeHandle,
    StyleSheet,
    RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {Container, Header, Left, Body, Right, Button, Icon, Title} from 'native-base';
import BasicWeather from './components/BasicWeather';
import DailyForecastList from './components/DailyForecastList';
import SunriseAndSunset from './components/SunriseAndSunset';
import AirQuality from './components/AirQuality';
import Lifestyle from './components/Lifestyle';
import HourWeather from './components/HourWeather';
import {BlurView} from '@react-native-community/blur';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {viewRef: null};
    }


    imageLoaded() {
        this.setState({viewRef: findNodeHandle(this.backgroundImage)});
    }

    render() {
        let {geoPosition, nowWeather} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.blurViewContainer}>
                    <Image
                        ref={(img) => {
                            this.backgroundImage = img;
                        }}
                        source={require('../../static/img/background.jpeg')}
                        // style={styles.blurViewWrapper}
                        onLoadEnd={this.imageLoaded.bind(this)}
                    />
                    {this.state.viewRef && <BlurView
                        style={styles.blurViewWrapper}
                        viewRef={this.state.viewRef}
                        blurType="light"
                        blurAmount={10}/>}
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            title={'下拉刷新'}
                            refreshing={this.state.refreshing}
                            colors={['rgb(255, 176, 0)', '#ffb100']}
                            onRefresh={() => {
                                this.props.getCurrentPosition();
                            }}
                        />
                    }>
                    <Header transparent>
                        <Left>
                            <Button transparent>
                                <Icon name='menu'/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>{geoPosition.addressComponent.district + '.' + geoPosition.addressComponent.township}</Title>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Icon name='arrow-back'/>
                            </Button>
                        </Right>
                    </Header>
                    <BasicWeather/>
                    <View style={{height: 250}}>
                        <HourWeather/>
                    </View>
                    <View style={{height: 300}}>
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
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        this.props.getCurrentPosition();
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: '#FFFFFF',
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
