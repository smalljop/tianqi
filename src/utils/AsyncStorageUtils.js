import AsyncStorage from '@react-native-community/async-storage';

export default class AsyncStorageUtil {

    /**
     * 获取数据
     *
     * @param key
     * @returns {Promise<T>|*|Promise.<TResult>}
     */
    static get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            let jsonValue = JSON.parse(value);
            return jsonValue;
        });
    }

    /**
     * 保存数据
     *
     * @param key
     * @param value
     * @returns {*}
     */
    static save(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * 更新数据
     *
     * @param key
     * @param value
     * @returns {Promise<T>|Promise.<TResult>}
     */
    static update(key, value) {
        return AsyncStorageUtil.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JSON.stringify(value));
        });
    }


    /**
     * 删除数据
     * @param key
     * @returns {*}
     */
    static delete(key) {
        return AsyncStorage.removeItem(key);
    }

    /**
     * 获取多条数据
     *
     * @param {*} arr
     */
    static getMulti(arr) {
        return AsyncStorage.multiGet(arr)
            .then(stores => {
                let value = [];
                stores.map((result, i, store) => {
                    value.push(JSON.parse(store[i][1]));
                });
                return value;
            });
    }

    /**
     * 获取索引集合
     */
    static getKeys() {
        return AsyncStorage.getAllKeys();
    }

    /**
     * 删除多条数据
     *
     * @param {*} arr
     */
    static deleteMulti(arr) {
        return AsyncStorage.multiRemove(arr);
    }

    /**
     * 清除
     */
    static clear() {
        return AsyncStorage.clear();
    }

}
