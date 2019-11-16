import React, {Component} from 'react';
import {
    Alert,
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
    Thumbnail,
    Text,
    Title,
    Form,
    Item,
    Label,
    Input,
} from 'native-base';
import http from 'src/utils/HttpRequestUtils';
import AsyncStorageUtil from 'src/utils/AsyncStorageUtils';

// import {actionCreators} from './store';

class CityManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityList: [],
        };
    }

    render() {
        return (
            <Container>
                <Header transparent>
                    <Left>
                        <Button onPress={() => {
                            this.props.navigation.goBack();
                        }} transparent>
                            <Icon name='arrow-back' style={{color: '#000000'}}/>

                        </Button>
                    </Left>
                    <Body>
                        <Title>城市管理</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => {
                            this.props.navigation.navigate('SearchCity');
                        }}>
                            <Icon name="add" style={{color: '#000000'}}/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <List>
                        {
                            this.state.cityList.map((item, index) => {
                                return (
                                    <ListItem key={index} avatar>
                                        <Left>
                                            {/*<Thumbnail source={{uri: 'Image URL'}}/>*/}
                                        </Left>
                                        <Body>
                                            <Text>{item.location}</Text>
                                            <Text note>{item.parent_city},{item.admin_area}</Text>
                                        </Body>
                                        <Right>
                                            <Text note>3:43 pm</Text>
                                        </Right>
                                    </ListItem>
                                );
                            })
                        }
                    </List>
                </Content>
            </Container>
        );
    }


    componentDidMount() {
        didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                if (payload.type === 'didFocus') {
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
        didBlurSubscription.remove();
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
        flex: 1,
    },

});
