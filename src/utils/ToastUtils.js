import React, {Component} from 'react';
import {Root, Header, Content, Text, Button, Toast} from 'native-base';

export default class ToastUtils {
    // static default(message, btnText = 'OK') {
    //     Toast.show({
    //         text: message,
    //         buttonText: btnText,
    //     });
    // }

    static success(message, btnText = 'OK') {
        Toast.show({
            text: message,
            buttonText: btnText,
            type: 'success',
        });
    }

    static warning(message, btnText = 'OK') {
        Toast.show({
            text: message,
            buttonText: btnText,
            type: 'warning',
        });
    }

    static danger(message, btnText = 'OK') {
        Toast.show({
            text: message,
            buttonText: btnText,
            type: 'danger',
        });
    }

}

