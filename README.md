
#react-native network显示网络请求

把node_modules/react-native/libraries/core/setUpXHR.js文件中的

polyfillGlobal('XMLHttpRequest', () => require('XMLHttpRequest'));


#code-push打包发布更新

    code-push release-react tianqiApp android 
 * 默认发布测试环境


    code-push release-react tianqiApp android  --t 1.0.0 --dev false --d Production --des "1.优化操作流程" --m true
 * --t为二进制(.ipa与apk)安装包的的版本
 * --dev为是否启用开发者模式(默认为false)
 * --d是要发布更新的环境分Production与Staging(默认为Staging)
 * --des为更新说明；
 * --m 是强制更新
