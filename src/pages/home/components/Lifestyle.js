import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import Air from 'src/static/svg/weather/lifestyle/air.svg';
import Comf from 'src/static/svg/weather/lifestyle/comf.svg';
import Cw from 'src/static/svg/weather/lifestyle/cw.svg';
import Drsg from 'src/static/svg/weather/lifestyle/drsg.svg';
import Flu from 'src/static/svg/weather/lifestyle/flu.svg';
import Sport from 'src/static/svg/weather/lifestyle/sport.svg';
import Uv from 'src/static/svg/weather/lifestyle/uv.svg';
import Trav from 'src/static/svg/weather/lifestyle/trav.svg';

const lifestyleType = {
    comf: '生活指数类型',
    drsg: '穿衣指数',
    flu: '感冒指数',
    sport: '运动指数',
    trav: '旅游指数',
    uv: '紫外线指数',
    cw: '洗车指数',
    air: '空气污染扩散条件指数',
};

class Lifestyle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {lifestyle} = this.props;
        console.log(lifestyle);
        return (
            <View style={styles.container}>
                {
                    lifestyle.map((item, index) => {
                        return (
                            <View key={index} style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{margin: 20}}>
                                    {this.getLifestyleIcon(item.type)}
                                </View>
                                <View style={{margin: 10}}>
                                    <Text>
                                        {lifestyleType[item.type]}{item.brf}
                                    </Text>
                                    <Text>
                                        {item.txt}
                                    </Text>
                                </View>
                            </View>
                        );
                    })
                }

            </View>
        );
    }

    getLifestyleIcon(type) {
        switch (type) {
            case 'comf':
                return <Comf width={30} height={30}/>;
                break;
            case 'drsg':
                return <Drsg width={30} height={30}/>;
                break;
            case 'flu':
                return <Flu width={30} height={30}/>;
                break;
            case 'sport':
                return <Sport width={30} height={30}/>;
                break;
            case 'trav':
                return <Trav width={30} height={30}/>;
                break;
            case 'uv':
                return <Uv width={30} height={30}/>;
                break;
            case 'cw':
                return <Cw width={30} height={30}/>;
                break;
            case 'air':
                return <Air width={30} height={30}/>;
                break;
            default:
                return null;
                break;
        }

    }

    componentDidMount() {
    }

}

const mapStateToProps = state => ({
    lifestyle: state.home.lifestyle,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Lifestyle);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});
