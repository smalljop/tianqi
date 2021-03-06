import axios from 'axios';
import {
    Alert,
    StyleSheet,
} from 'react-native';

const http = axios.create({
    timeout: 1000 * 30,
    // withCredentials: true,
    // headers: {
    //     'Content-Type': 'application/json; charset=utf-8',
    // },
});

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
    // config.headers['token'] = .cookie.get('token'); // 请求头带上token
    return config;
}, error => {
    Alert.alert(error)
    return Promise.reject(error);
});

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
    return response;
}, error => {
    Alert.alert(error)
    return Promise.reject(error);
});

export default http;
