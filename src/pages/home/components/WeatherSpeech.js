import React, {Component} from 'react';
import {
    View,
    Alert,
    StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'native-base';
import Sound from 'react-native-sound';
import {actionCreators} from '../store';
import http from 'src/utils/HttpRequestUtils';
import RNFS from 'react-native-fs';

class WeatherSpeech extends Component {


    constructor(props) {
        super(props);
        this.state = {token: '', url: ''};
        this.playWeatherForecast = this.playWeatherForecast.bind(this);
    }

    render() {
        return (
            <View style={{with: 90, height: 45, alignContent: 'center'}}>
                <Icon onPress={this.playWeatherForecast}
                      name='volume-high'/>
                {/*<Sound></Sound>*/}
            </View>
        );
    }

    componentDidMount() {
        http.get('https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=khhUC02qNgReBtROEWjdIHQF&client_secret=IV2uKgAbeZN280pSd64dl44pfx9fMhnC').then(res => {
            setTimeout(() => {
                this.setState({
                    token: res.data.access_token,
                });
            }, 0);
        });
        // this.downloadFile();
    }


    playWeatherForecast() {
        let text = this.getWeatherSpeechVoice();
        let timer = setInterval(() => {
            text = this.getWeatherSpeechVoice();
            if (text) {
                console.log(this.state.token);
                let url = `https://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=${this.state.token}&tex=${text}&vol=9&per=0&spd=5&pit=5&aue=3`;
                url = encodeURI(url);
                let whoosh = new Sound(url, null, err => {
                    if (err) {
                        return console.log(err);
                    }
                    whoosh.play(success => {
                        if (success) {
                            console.log('远程文件播放成功');
                        } else {
                            console.log('远程文件播放失败');
                        }
                    });
                });
                clearInterval(timer);
            }
        }, 100);
    }

    /*下载文件*/
    downloadFile() {
        // 音频
        const downloadDest = `${RNFS.DocumentDirectoryPath}/${((Math.random() * 1000) | 0)}.mp3`;
        // http://wvoice.spriteapp.cn/voice/2015/0902/55e6fc6e4f7b9.mp3
        let formUrl = '';
        let text = this.getWeatherSpeechVoice();
        let timer = setInterval(() => {
            text = this.getWeatherSpeechVoice();
            if (text) {
                formUrl = `http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=24.f76f5cc53e7511c8e923e66bcb6d3d36.2592000.1576891905.282335-17811905&tex=${text}&vol=9&per=0&spd=5&pit=5&aue=3`;
                formUrl = encodeURI(formUrl);
                const options = {
                    fromUrl: formUrl,
                    toFile: downloadDest,
                    background: true,
                    begin: (res) => {
                        console.log('begin', res);
                        console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
                    },
                    progress: (res) => {
                        let pro = res.bytesWritten / res.contentLength;
                    },
                };
                try {
                    console.log(formUrl);
                    const ret = RNFS.downloadFile(options);
                    ret.promise.then(res => {
                        console.log('success', res);
                        console.log('file://' + downloadDest);
                        // 例如保存图片
                        this.setState({
                            url: downloadDest,
                        });
                    }).catch(err => {
                        console.log('err', err);
                    });
                } catch (e) {
                    console.log(error);
                }
                clearInterval(timer);
            }
        }, 100);

    }


    getWeatherSpeechVoice() {
        let {geoPosition, nowWeather} = this.props;
        if (!nowWeather) {
            return null;
        }
        let {now} = nowWeather;
        let text = `今天天气${now.cond_txt},温度${now.tmp}摄氏度,体感温度${now.fl}摄氏度,
           风向${now.wind_dir},风力${now.wind_sc},相对湿度${now.hum},降水量${now.pcpn}，大气压强${now.pres}`;
        return text;
    }

}


const mapStateToProps = state => ({
    geoPosition: state.home.geoPosition,
    nowWeather: state.home.nowWeather,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherSpeech);

const styles = StyleSheet.create({});
