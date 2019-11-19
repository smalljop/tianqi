import Geolocation from '@react-native-community/geolocation';
import * as constants from './constants';
import http from 'src/utils/HttpRequestUtils';


const GdGeoBaseUrl = 'https://restapi.amap.com';
const GdGeoKey = '3778bfe7d8ee5d83dc8015b85ae062c3';
/**
 * 添加当前定位
 * @param result
 * @returns {{type: *, geoPosition: *}}
 */
const addCurrentPosition = (result) => ({
    type: constants.ADD_CURRENT_POSITION,
    geoPosition: result,
});
/**
 * 获取当前定位信息
 * @returns {Function}
 */
export const getCurrentPosition = () => {
    return (dispatch) => {
        Geolocation.getCurrentPosition(info => {
                //纬度
                let latitude = info.coords.latitude;
                //经度
                let longitude = info.coords.longitude;
                let convertUrl = `${GdGeoBaseUrl}/v3/assistant/coordinate/convert?locations=${longitude},${latitude}&coordsys=gps&output=json&key=${GdGeoKey}`;
                http.get(convertUrl).then((res) => {
                    let newVar = res.data.locations.split(',');
                    let regeoUrl = `${GdGeoBaseUrl}/v3/geocode/regeo?key=${GdGeoKey}&location=${newVar[0]},${newVar[1]}`;
                    http.get(regeoUrl).then((res) => {
                        const result = res.data;
                        console.log(result);
                        let geoPosition = {
                            longitude: newVar[0],
                            latitude: newVar[1],
                            addressComponent: result.regeocode.addressComponent,
                            formatted_address: result.regeocode.formatted_address,
                        };
                        dispatch(addCurrentPosition(geoPosition));
                        dispatch(getAllWeatherInfo(newVar[0], newVar[1]));
                    });
                });
            },
        );
    };
};

const weatherBaseUrl = 'https://free-api.heweather.net';
const weatherKey = 'ddad161b09e64802916099a9cecfe28b';

/**
 * 保存当前天气情况
 * @param result
 * @returns {{type: *, geoPosition: *}}
 */
const addNowWeather = (result) => ({
    type: constants.ADD_NOW_WEATHER,
    nowWeather: result,
});

/**
 * 获取天气全部信息
 * @param longitude
 * @param latitude
 * @returns {Function}
 */
export const getAllWeatherInfo = (longitude, latitude) => {
    return (dispatch) => {
        dispatch(getNowWeather(longitude, latitude));
        dispatch(getDailyForecastList(longitude, latitude));
        dispatch(getLifestyle(longitude, latitude));
        dispatch(getWeatherAir(longitude, latitude));
        dispatch(getWeatherHourly(longitude, latitude));
    };
};

/**
 * 获取现在天气
 *
 * @returns {Function}
 */
export const getNowWeather = (longitude, latitude) => {
    return (dispatch) => {
        let nowWeatherUrl = `${weatherBaseUrl}/s6/weather/now?key=${weatherKey}&location=${longitude},${latitude}`;
        http.get(nowWeatherUrl).then((res) => {
            console.log(res);
            let result = res.data.HeWeather6;
            if (result) {
                result = result[0];
            }
            dispatch(addNowWeather(result));
        });
    };
};


/**
 * 获取未来天气
 * @returns {Function}
 */
export const getDailyForecastList = (longitude, latitude) => {
    return (dispatch) => {
        let nowWeatherUrl = `${weatherBaseUrl}/s6/weather/forecast?key=${weatherKey}&location=${longitude},${latitude}`;
        http.get(nowWeatherUrl).then((res) => {
            let result = res.data.HeWeather6;
            if (result) {
                result = result[0];
                if (result) {
                    result = result.daily_forecast;
                }
            }
            dispatch({
                type: constants.ADD_DAILY_FORECAST,
                dailyForecastList: result,
            });
        });
    };
};


/**
 * 获取生活指数
 * @param longitude
 * @param latitude
 */
export const getLifestyle = (longitude, latitude) => {
    return (dispatch) => {
        let lifestyleUrl = `${weatherBaseUrl}/s6/weather/lifestyle?key=${weatherKey}&location=${longitude},${latitude}`;
        http.get(lifestyleUrl).then((res) => {
            let result = res.data.HeWeather6;
            if (result) {
                result = result[0];
                if (result) {
                    result = result.lifestyle;
                }
            }
            dispatch({
                type: constants.ADD_TODAY_LIFESTYLE,
                lifestyle: result,
            });
        });
    };
};

let weatherAirKey = 'c1a9b922da2f4affb9ebe3bb6c6f351f';
let weatherAirBaseUrl = 'https://api.heweather.net';

/**
 *获取空气质量信息
 * @param longitude
 * @param latitude
 * @returns {Function}
 */
export const getWeatherAir = (longitude, latitude) => {
        return (dispatch) => {
            let airUrl = `${weatherAirBaseUrl}/s6/air/now?key=${weatherAirKey}&location=${longitude},${latitude}`;
            http.get(airUrl).then((res) => {
                let result = res.data.HeWeather6;
                console.log(result);
                if (result) {
                    result = result[0];
                    if (result) {
                        result = result.air_now_city;
                    }
                }
                dispatch({
                    type: constants.ADD_AIR_NOW_CITY,
                    airNowCity: result,
                });
            });
        };
    }
;

/**
 * 逐小时天气
 * @param longitude
 * @param latitude
 */
export const getWeatherHourly = (longitude, latitude) => {
    return (dispatch) => {
        let nowWeatherUrl = `${weatherBaseUrl}/s6/weather/hourly?key=${weatherKey}&location=${longitude},${latitude}`;
        http.get(nowWeatherUrl).then((res) => {
            let result = res.data.HeWeather6;
            if (result) {
                result = result[0];
                if (result) {
                    result = result.hourly;
                }
            }
            dispatch({
                type: constants.ADD_HOURLY_WEATHER,
                hourlyList: result,
            });
        });
    };
};
