import React, {Component} from 'react';
import {
    StatusBar,
    View,
    StyleSheet, TouchableHighlight, TouchableOpacity, Animated, Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {
    Container,
    Header,
    Content,
    Icon,
    Button,
    List,
    ListItem,
    Left,
    Body,
    Right,
    Thumbnail,
    Text,
    Title,
    Toast,
    Item,
    Label,
    Input,
} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import http from 'src/utils/HttpRequestUtils';
import AsyncStorageUtil from 'src/utils/AsyncStorageUtils';

// import {actionCreators} from './store';

class CityManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityList: [],
            titleCenter: false,
        };
    }

    render() {
        return (
            <Container style={{flex: 1}}>
                <Header style={{paddingTop: 20, height: 76, backgroundColor: '#7BB2E1'}}>
                    <Left>
                        <Button onPress={() => {
                            this.props.navigation.goBack();
                        }} transparent>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>城市管理</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => {
                            this.props.navigation.navigate('SearchCity');
                        }}>
                            <Icon name="add"/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <SwipeListView
                        data={this.state.cityList}
                        renderItem={data => (
                            <View
                                style={[styles.rowFront]}>
                                <Text style={{alignItems: 'center'}}>
                                    {data.item.location}
                                </Text>
                                <Text style={{fontSize: 10}}>
                                    {data.item.parent_city},{data.item.admin_area}
                                </Text>
                            </View>
                        )}
                        keyExtractor={(item: any, index: number) => item.cid}
                        renderHiddenItem={(data, rowMap) => (
                            <View style={styles.rowBack}>
                                <TouchableOpacity
                                    style={[
                                        styles.backRightBtn,
                                        styles.backRightBtnRight,
                                    ]}
                                    onPress={() => {
                                        let cityList = this.state.cityList;
                                        cityList.splice(data.index, 1);
                                        this.setState({
                                            cityList: cityList,
                                        });
                                        AsyncStorageUtil.save('cityList', cityList).then(data => {
                                            Toast.show({
                                                text: '删除成功',
                                                buttonText: 'OK',
                                                type: 'success',
                                            });
                                        });
                                    }
                                    }>
                                    <Icon name="trash"/>
                                </TouchableOpacity>
                            </View>
                        )}
                        rightOpenValue={-75}
                        previewRowKey={'location'}
                        disableRightSwipe={true}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                        onRowDidOpen={(key) => {
                            // console.log(key);
                            // let index = this.state.cityList.findIndex(item => item.cid == key);
                            // console.log(index);
                            // let cityList = this.state.cityList;
                            // let city = this.state.cityList[index];
                            // city.isOpen = true;
                            // cityList[index] = city;
                            // this.setState({
                            //     cityList: cityList,
                            // });
                        }}
                        onSwipeValueChange={(data) => {

                        }}
                    />
                    {/*      <Text>{data.item.parent_city},{data.item.admin_area} </Text>*/}
                </Content>
            </Container>
        );
    }


    componentDidMount() {
        this.didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                if (payload.type === 'willFocus') {
                    AsyncStorageUtil.get('cityList').then(data => {
                        setTimeout(() => {
                            this.setState({
                                cityList: data,
                            });
                        }, 0);
                    });
                }
            },
        );
    }


    componentWillUnmount() {
        this.didBlurSubscription.remove();
    }
}

let didBlurSubscription = null;

const mapStateToProps = state => ({
    geoPosition: state.home.geoPosition,
    nowWeather: state.home.nowWeather,
});

const mapDispatchToProps = dispatch => ({
    // getCurrentPosition() {
    //     dispatch(actionCreators.getCurrentPosition());
    // },
});

export default connect(mapStateToProps, mapDispatchToProps)(CityManager);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        margin: 10,
        alignItems: 'center',
        marginLeft: 75,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        right: 0,
    },

});
