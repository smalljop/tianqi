***
使用react-native 开发的一款天气预报项目 项目使用了和风天气的接口
作为初学react-native的练习项目，实现了基本功能

***


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


#使用技术
* art 绘制天气折线图 日落图
* async-storage  数据持久化
* react-native-blur  高斯模糊
* axios 异步请求
* moment 处理时间
* native-base UI库
* react-native-animatable 动画库
* react-native-code-push 热更新
* react-native-device-info 获取设备信息
* react-native-fs 操作文件 下载上传文件
* react-native-linear-gradient 颜色渐变库
* react-native-modal modal弹窗
* react-native-scrollable-tab-view 左右滑动页
* react-native-vector-icons 图标
* react-native-swipe-list-view  右划列表
* react-native-sound 音频播放
* react-native-svg svg图片
* react-native-vector-icons icon图标库
* react-navigation  导航路由
* react-redux 全局状态管理
