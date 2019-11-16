import React, {Component} from 'react';
import {View, ImageBackground, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import http from 'src/utils/HttpRequestUtils';

export default class AppLaunch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            backgroundImg: 'http',
            content: '',
            assignDate: '',
            translation: '',
            times: 5,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <StatusBar barStyle="light-content"/>
                </View>
                <ImageBackground style={styles.backgroundImage}
                                 source={{uri: this.state.backgroundImg}}>
                    <TouchableOpacity style={styles.touchButton}
                                      onPress={() => {
                                          this.gotoHome();
                                      }}>
                        <Text style={styles.touchButtonText}>
                            <Text style={{width: 10}}>{this.state.times}</Text>
                            跳过</Text>
                    </TouchableOpacity>
                    <LinearGradient start={{x: 0.25, y: 0.25}} end={{x: 0.75, y: 0.75}}
                                    colors={['rgba(0,0,238,0.05)', 'rgba(0,0,0,0.36)', '#000']}
                                    style={styles.linearGradient}>

                    </LinearGradient>
                    <View style={styles.contentContainer}>
                        <View style={styles.assignDateContainer}>
                            <Text
                                style={[styles.assignDateText, styles.assignDateDayText]}>{this.state.assignDate ? new Date(this.state.assignDate).getDay() : ''}</Text>
                            <Text
                                style={[styles.assignDateText]}>{this.state.assignDateMonth}.</Text>
                            <Text
                                style={[styles.assignDateText]}>{this.state.assignDate ? new Date(this.state.assignDate).getFullYear() : ''}</Text>
                        </View>
                        <Text style={styles.contentText}> {this.state.content}</Text>
                        <Text style={styles.contentText}>{this.state.translation}</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }


    componentDidMount() {
        http.get('https://api.tecchen.xyz/api/quote/').then((res) => {
            console.log(res);
            if (res.data) {
                let data = res.data.data;
                console.log(data);
                let date = new Date(data.assignDate);
                // setTimeout(() => {
                this.setState({
                    backgroundImg: data.originImgUrls[0],
                    content: data.content,
                    assignDate: data.assignDate,
                    translation: data.translation,
                    assignDateMonth: date.toDateString().split(' ')[1],
                });
                // }, 0);
            }
        });
        this.timer = setInterval(() => {
            this.setState((prevState) => {
                return {times: prevState.times - 1};
            });
            if (this.state.times === 0) {
                this.gotoHome();
            }
        }, 1000);
    }

    gotoHome() {
        this.props.navigation.replace('Home');
    }


    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

}
const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        //祛除内部元素的白色背景
        backgroundColor: 'rgba(0,0,0,0)',
    },
    contentMaskContainer: {
        position: 'absolute',
        height: 100,
        bottom: 0,
    },
    contentContainer: {
        position: 'absolute',
        bottom: 20,
        zIndex: 2,
    },
    contentText: {
        margin: 2,
        fontSize: 20,
        color: 'hsla(0,0%,93.3%,0.8)',
        fontFamily: 'Lantinghei SC Extralight,Lantinghei SC,Arial,Hiragino Sans GB,Microsoft Yahei,"\\9ED1\\4F53",sans-serif',
        textShadowColor: '0 0 1 rgba(0,0,0,.5)',
        textShadowRadius: 1,
    },
    assignDateContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    assignDateText: {
        margin: 4,
        fontSize: 28,
        lineHeight: 50,
        color: '#38c6aa',
    },
    assignDateDayText: {
        fontSize: 45,
    },
    linearGradient: {
        height: 180,
        flex: 1,
        borderRadius: 0,
        width: 600,
        position: 'absolute',
        left: 0,
        bottom: 0,
        zIndex: 1,
    },
    touchButton: {
        height: 30,
        width: 60,
        position: 'absolute',
        right: 10,
        top: 25,
        borderRadius: 20,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    touchButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});
