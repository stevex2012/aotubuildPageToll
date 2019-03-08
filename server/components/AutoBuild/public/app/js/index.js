
// _hmt.push(['_trackEvent', metions, action, str]);
// addClickListen();
require('../css/index.css');
require('../css/base.css');

// 初始化返回顶部按钮
//这里的路劲是个问题，那就是是基于 build 文件夹下面相对路径
var goTop = require('../../../../components/AutoBuild/modular/goTop/app/index.js');
goTop.init();

var btns = document.querySelectorAll('.btn');
for (var i = 0, len = btns.length; i < len; i++) {
    // btns[i].onclick = function () {
    //     console.log('专题页 测试统计');
    //     var pageName = document.title;
    //     var action = '专题页点击'
    //     statistics(pageName, action);
    // }
    btns[i].addEventListener('click',function(){
        console.log('专题页 测试统计');
        var pageName = document.title;
        var action = '专题页点击'
        statistics(pageName, action);
    });
}
// 统计代码 
function statistics(pageName, action) {
    // pageName  网页名称
    //, action,  事件统计
    //str  统计 字段 拼接
    var biz = request('biz') || '';
    var str = '';
    if (!biz) {
        biz = window.inWeChat ? '5' : '6';
    }
    str += 'biz=' + biz + getUrlParams(['trail_channel_from', 'gp', 'tp','store']);
    window._hmt && window._hmt.push(["_trackEvent", pageName, action, str])
    window._paq && window._paq.push(["trackEvent", pageName, action, str])
}
// 获得统计数据
function getUrlParams(needParamArr) {
    var str = ''
    Object.prototype.toString.call(needParamArr) === '[object Array]' &&
        needParamArr.length &&
        run(needParamArr);
    function run(arr) {
        for (var j = 0, len = arr.length; j < len; j++) {
            var urlParam = request(arr[j]).split('#')[0] || localStorage.getItem(arr[j]) || localStorage.getItem('caecapp-'+arr[j]) || '';
            //  ie 8 不支持 window.atob
            if (arr[j] == 'tp' && 　window.atob) {
                urlParam = urlParam ? window.atob(urlParam) : '';
            }
            str += urlParam ? '&' + arr[j] + '=' + urlParam : '';
        }
    }
    return str;
}
// 获取url 参数
function request(paras) {
    var url = decodeURI(location.href);
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var returnValue;
    for (i = 0; i < paraString.length; i++) {
        var tempParas = paraString[i].split('=')[0];
        var parasValue = paraString[i].split('=')[1];
        if (tempParas === paras)
            returnValue = parasValue;
    }
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}
// 绑定 弹框 事件
