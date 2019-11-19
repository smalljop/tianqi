import React, {Component} from 'react';
import {
    View,
    StyleSheet,
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
    Card,
    Text,
    Title,
    Form,
    Item,
    Badge,
    Input,
} from 'native-base';
import http from 'src/utils/HttpRequestUtils';
import Constants from 'src/utils/Constants';
import AsyncStorageUtil from 'src/utils/AsyncStorageUtils';


const key = 'cityList';

class CityManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotCityList: [],
            showClose: false,
            citySearchValue: '',
            showHotCity: true,
            searchCityList: [],
            cityList: [],
        };
        this.handleCitySearch = this.handleCitySearch.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.saveCity = this.saveCity.bind(this);
        this.cityInclude = this.cityInclude.bind(this);
    }

    render() {
        return (
            <Container style={{flex: 1}}>
                <Header searchBar rounded style={{paddingTop: 20, height: 76, backgroundColor: '#7BB2E1'}}>
                    <Item>
                        <Icon name="arrow-back" onPress={() => {
                            this.props.navigation.goBack();
                        }}/>
                        <Input value={this.state.citySearchValue} onChangeText={this.handleCitySearch}
                               placeholder="Search"/>
                        {
                            this.state.showClose ? <Icon onPress={this.handleClose} name="close"/> : null
                        }
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <Content>
                    {this.state.showHotCity ? <View>
                        <Text style={{margin: 6}}>热门城市</Text>
                        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                            {
                                this.state.hotCityList.map((item, index) => {
                                    let include = this.cityInclude(item.cid);
                                    return (
                                        <Button onPress={(ev) => {
                                            if (!include) {
                                                this.saveCity(ev, item);
                                            }
                                        }} key={index} transparent light small
                                                style={{
                                                    borderWidth: 0.1,
                                                    borderColor: 'rgba(123,178,225,0.13)',
                                                    margin: 5,
                                                    backgroundColor: 'rgba(123,178,225,0.13)',
                                                }}>
                                            <Text
                                                style={{color: include ? '#00b4eb' : '#000000'}}>{item.location}</Text>
                                        </Button>
                                    );
                                })
                            }
                        </View>
                    </View> : null}
                    {
                        this.state.searchCityList ? <List>
                            {
                                this.state.searchCityList.map((item, index) => {
                                    let include = this.cityInclude(item.cid);
                                    return (
                                        <ListItem onPress={(ev) => {
                                            if (!include) {
                                                this.saveCity(ev, item);
                                            }
                                        }} key={index}>
                                            <Left>
                                                <Text>{item.location}—{item.parent_city},{item.cnty}</Text>
                                            </Left>
                                            <Body>

                                            </Body>
                                            <Right>
                                                {
                                                    include ? <Text note>已添加</Text> : null
                                                }

                                            </Right>
                                        </ListItem>
                                    );
                                })
                            }
                        </List> : null
                    }

                </Content>
            </Container>
        );
    }

    componentDidMount() {
        this.getHotCity();
        AsyncStorageUtil.get(key).then(data => {
            this.setState({
                cityList: data,
            });
            console.log(this.state.cityList);
        });

    }

    cityInclude(cid) {
        let city = this.state.cityList ? this.state.cityList.find((item) => {
            if (item.cid === cid) {
                return true;
            }
        }) : null;
        return city ? true : false;
    }

    handleCitySearch(val) {
        this.setState({
            showClose: true,
            citySearchValue: val,
            showHotCity: false,
        });
        this.searchCity(val);
    }


    saveCity(ev, city) {

        if (!city) {
            return;
        }
        AsyncStorageUtil.get(key).then(data => {
            if (!data) {
                AsyncStorageUtil.save(key, [city]);
            } else {
                data.push(city);
                AsyncStorageUtil.save(key, data);
            }
            this.props.navigation.goBack();
        }).catch(e => {
            console.log('e' + e);
        });
    }


    handleClose() {
        this.setState({
            citySearchValue: '',
            showClose: false,
            showHotCity: true,
            searchCityList: [],
        });

    }


    searchCity(searchVal) {
        if (!searchVal) {
            return;
        }
        let url = `https://search.heweather.net/find?location=${searchVal}&key=${Constants.hfWeatherKey}&group=cn`;
        http.get(url).then(res => {
            let data = res.data.HeWeather6;
            if (data) {
                data = data[0].basic;
                this.setState({
                    searchCityList: data,
                });
            }
        });
    }

    getHotCity() {
        let url = `https://search.heweather.net/top?group=cn&number=50&&key=${Constants.hfWeatherKey}`;
        http.get(url).then(res => {
            let data = res.data.HeWeather6;
            if (data) {
                data = data[0].basic;
                this.setState({
                    hotCityList: data,
                });
            }
        });
    }


}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    // getCurrentPosition() {
    //     dispatch(actionCreators.getCurrentPosition());
    // },
});

export default connect(mapStateToProps, mapDispatchToProps)(CityManager);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});
