define([
    // '../../../../../components/AutoBuild/modular/leaveMsg/app/index.html',
    // '../../../../../components/AutoBuild/modular/dialog/app/index.js',
    // '../../../../../components/AutoBuild/modular/leaveMsg/app/index.css'
    './index.html',
    '../../dialog/app/index.js',
    './index.css'
], function (Tpl, Dialog) {
    'use strict';
    //接口 省市
    var LOCATIONDATAUrl;
    var LEAVEMSGURL;
    function init(domId) {
        document.body.innerHTML += Tpl;
        const dom = document.querySelector(`#${domId}`);
        render();
        const leaMsgDom = document.querySelector('#caec-app-leave-msg');
        const moduleLayer = document.querySelector('#caec-app-leave-msg .module-layer');
        dom.addEventListener('click', function () {

            leaMsgDom.style.zIndex = 5;
            leaMsgDom.style.opacity = 1;
        }, false);
        moduleLayer.addEventListener('click', function () {
            
            leaMsgDom.style.opacity = 0;
            leaMsgDom.style.zIndex = -1;
        }, false);
    }
    function render() {
        var allProvinces = [];
        var currentCity = [];
        var postInfo = {
            cityId: '',
            cityName: '',
            provinceId: '',
            provinceName: '',
            name: '',
            phone: ''
        };
        var totalData;
        var phone = document.querySelector("#input-phone");
        var name = document.querySelector("#input-name");
        var provinceBox = document.querySelector("#province");
        var cityBox = document.querySelector("#city");
        var selectProvince = document.querySelectorAll('.select')[0];
        var selectCity = document.querySelectorAll('.select')[1];
        var provinceUl = document.querySelector("#province-ul");
        var cityUl = document.querySelector("#city-ul");
        var submit = document.querySelectorAll('.sub-btn')[0];
        var labelName = document.querySelector("#label-name");
        var labelPhone = document.querySelector("#label-phone");


        function isEmptyObject(e) {
            for (var t in e) {
                return !1;
            }
            return !0;
        }

        //添加指定类
        function addClassName(tagName, addName) {
            var classArr = new Array();
            var classList = tagName.getAttribute("class");
            if (classList == "" || classList == null) {
                classList = addName;
            } else {
                if (classList.indexOf(" ") == -1) {
                    classList += " " + addName;

                } else {
                    classArr = classList.split(" ");
                    for (var i = 0; i < classArr.length; i++) {
                        if (classArr[i] !== addName) {
                            if (i == classArr.length - 1) {
                                classList += " " + addName;
                            }
                        } else {
                            break;
                        }
                    }
                }
                tagName.setAttribute("class", classList);
            }
        }


        //删除指定类
        function removeClassName(tagName, removeName) {
            var classArr = new Array();
            var classList = tagName.getAttribute("class");
            if (classList == "" || classList == null) {
                return;
            } else {
                if (classList.indexOf(" ") == -1) {
                    classArr = classList;
                } else {
                    classArr = classList.split(" ");
                    for (var i = 0; i < classArr.length; i++) {
                        if (classArr[i] == removeName) {
                            classArr.splice(i, 1);
                        }
                    }
                    classList = "";
                    if (classArr.length > 0) {
                        for (var j = 0; j < classArr.length; j++) {
                            classList += " " + classArr[j];
                        }
                    }
                }
                tagName.setAttribute("class", classList);
            }

        }


        //填充当前用户号码到输入框
        function addPhone() {
            var phone = getCookie("umobile");
            if (!!phone) {
                document.querySelector('#input-phone').value = phone;
            }
        }


        //获取cookie
        function getCookie(key) {
            var arr = document.cookie.match(new RegExp("(^| )" + key
                + "=([^;]*)(;|$)"));
            if (arr != null)
                return unescape(arr[2]);
            return null;

        }

        //格式化参数
        function formatParams(data) {
            var arr = [];
            for (var name in data) {
                arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
            }
            arr.push(("v=" + Math.random()).replace(".", ""));
            return arr.join("&");
        }

        //获取当前省的市信息
        function getCity(provinceId) {
            for (var i in totalData) {
                if (totalData[i].areaid == provinceId) {
                    var data = totalData[i].al;
                    currentCity = [];
                    for (var j in data) {
                        currentCity.push({
                            id: data[j].areaid,
                            name: data[j].areaname
                        })
                    }
                }
            }
        }

        //添加市列表
        function addCity() {
            var childs = cityUl.childNodes;
            for (var p = childs.length - 1; p >= 0; p--) {
                cityUl.removeChild(childs[p]);
            }
            for (var i = 0; i < currentCity.length; i++) {
                var newNode = document.createElement("li");
                newNode.innerHTML = currentCity[i].name;
                newNode.setAttribute("data-id", currentCity[i].id);
                cityUl.appendChild(newNode);
            }
            var cityList = cityUl.childNodes;
            for (var j = 0; j < cityList.length; j++) {
                cityList[j].setAttribute("class", "city-li");
            }
            removeClassName(provinceUl, "show");

        }

        function ajax(options) {
            options = options || {};
            options.method = (options.method || "GET").toUpperCase();
            options.dataType = options.dataType || "json";
            var params = formatParams(options.data);

            //创建 - 非IE6 - 第一步
            if (window.XMLHttpRequest) {
                var xhr = new XMLHttpRequest();
            } else { //IE6及其以下版本浏览器
                var xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }

            //接收 - 第三步
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    var status = xhr.status;
                    if (status >= 200 && status < 300) {
                        options.success && options.success(xhr.responseText, xhr.responseXML);
                    } else {
                        options.error && options.error(status);
                    }
                }
            };

            //连接 和 发送 - 第二步
            if (options.method == "GET") {
                xhr.open("GET", options.url + "?" + params, true);
                if (options.dataType == 'json') {
                    xhr.setRequestHeader('Accept', 'application/json');
                }
                options.sendBefore && options.sendBefore();
                xhr.send(null);
            } else if (options.method == "POST") {
                xhr.open("POST", options.url, true);
                if (options.dataType == 'json') {
                    xhr.setRequestHeader('Accept', 'application/json');
                }
                //设置表单提交时的内容类型
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(params);
            }
        }

        //placeholder兼容ie8
        if (!('placeholder' in document.createElement('input'))) {

            labelName.setAttribute("class", "show");
            labelPhone.setAttribute("class", "show");
            name.onfocus = function () {
                labelName.setAttribute("class", "");
            }
            phone.onfocus = function () {
                labelPhone.setAttribute("class", "");
            }
        }
        //添加用户电话到电话输入框
        addPhone();

        //请求省市信息
        ajax({
            method: 'get',
            url: LOCATIONDATAUrl,
            data: {},
            cache: true,
            sendBefore: function (xhr) {

            },
            success: function (data) {
                var alldata = JSON.parse(data).data;
                totalData = JSON.parse(data).data;
                //将省信息存入provinces
                for (var p in alldata) {
                    allProvinces.push({
                        id: alldata[p].areaid,
                        name: alldata[p].areaname
                    })
                }
                for (var i = 0; i < allProvinces.length; i++) {
                    var newNode = document.createElement("li");
                    newNode.innerHTML = allProvinces[i].name;
                    newNode.setAttribute("data-id", allProvinces[i].id);
                    provinceUl.appendChild(newNode);
                }
                var provinceList = provinceUl.childNodes;
                for (var j = 0; j < provinceList.length; j++) {
                    provinceList[j].setAttribute("class", "province-li");
                }

            },
            error: function (status) {

            }
        });

        //输入电话失焦
        phone.onblur = function (event) {
            event = event || window.event;
            var current = event.srcElement ? event.srcElement : event.currentTarget;
            var prove = /^[1][0-9]{10}$/;
            if (current.value != "") {
                if (!('placeholder' in document.createElement('input'))) {
                    removeClassName(labelPhone, "show");
                }
                if (!prove.test(current.value)) {
                    addClassName(current, "error-border");
                } else {
                    removeClassName(current, "error-border");
                    postInfo.phone = current.value;
                }
            } else {
                if (!('placeholder' in document.createElement('input'))) {
                    labelPhone.setAttribute("class", "show");
                }
                removeClassName(current, "error-border");
            }

        }

        //输入姓名失焦
        name.onblur = function (event) {
            event = event || window.event;
            var current = event.srcElement ? event.srcElement : event.currentTarget;
            var prove = /^[\u4e00-\u9fa5]{2,6}$/;
            if (current.value != "") {
                if (!('placeholder' in document.createElement('input'))) {
                    removeClassName(labelName, "show");
                }
                if (!prove.test(current.value)) {
                    addClassName(current, "error-border");
                } else {
                    removeClassName(current, "error-border");
                    postInfo.name = current.value;
                }
            } else {
                if (!('placeholder' in document.createElement('input'))) {
                    labelName.setAttribute("class", "show");
                }
                removeClassName(current, "error-border");
            }
        }


        //点击页面其他位置隐藏省市列表框
        document.onclick = function () {
            removeClassName(provinceUl, "show");
            removeClassName(cityUl, "show");
        };
        // document.addEventListener('click',function(){
        //     removeClassName(provinceUl, "show");
        //     removeClassName(cityUl, "show");
        // },false)
        //点击选择省
        selectProvince.onclick = function (event) {
            //停止事件冒泡
            if (event)
                event.stopPropagation();
            else
                window.event.cancelBubble = true;
            addClassName(provinceUl, "show");
            removeClassName(cityUl, "show");
        };

        //渲染选择的省到页面
        provinceUl.onclick = function (event) {
            event = event || window.event;
            var target = event.srcElement ? event.srcElement : event.target;
            //重新渲染省时，初始化市为空
            cityBox.querySelectorAll("span")[0].textContent = "请选择市";
            cityBox.querySelectorAll("span")[0].innerText = "请选择市";
            cityBox.querySelectorAll("span")[0].setAttribute("class", "");
            removeClassName(cityUl, "show");
            //判断当前点击的是否为省列表
            if (target.className.indexOf('province-li') !== -1) {
                var provinceName = target.textContent || target.innerText;
                var provinceId = target.getAttribute("data-id");
                postInfo.provinceId = provinceId;
                postInfo.provinceName = provinceName;
                provinceBox.querySelectorAll("span")[0].textContent = provinceName;
                provinceBox.querySelectorAll("span")[0].innerText = provinceName;
                provinceBox.querySelectorAll("span")[0].setAttribute("class", "black-font");
                removeClassName(provinceUl, "show");
            }
            getCity(provinceId);
            addCity();
            //点击选择市
            selectCity.onclick = function (event) {
                addClassName(cityUl, "show");
                removeClassName(provinceUl, "show");
                //停止事件冒泡
                if (event)
                    event.stopPropagation();
                else
                    window.event.cancelBubble = true;
            }

        };

        //渲染选择的市到页面
        cityUl.onclick = function (event) {
            event = event || window.event;
            var target = event.srcElement ? event.srcElement : event.target;
            //判断当前点击的是否为市列表
            if (target.className.indexOf('city-li') !== -1) {
                var cityName = target.textContent || target.innerText;
                var cityId = target.getAttribute("data-id");
                postInfo.cityId = cityId;
                postInfo.cityName = cityName;
                cityBox.querySelectorAll("span")[0].textContent = cityName;
                cityBox.querySelectorAll("span")[0].innerText = cityName;
                cityBox.querySelectorAll("span")[0].setAttribute("class", "black-font");
            }
            removeClassName(cityUl, "show");
        }

        //提交信息
        submit.onclick = function () {
            //test code here

            for (var key in postInfo) {
                if (postInfo.hasOwnProperty(key))   {
                    if (!postInfo[key]) {
                        var dialog = Dialog.createDialog({
                            title: '提示',
                            content: '请完善信息后提交!',
                            btnTxt: '确定'
                        })
                        dialog.show();
                        return;
                    }
                }
            }
            var channel = sessionStorage.getItem("trail_channel_from");
            addClassName(name, "placeholder");
            addClassName(phone, "placeholder");
            var biz_channel = "";
            if (channel) {
                biz_channel = "&trail_channel_from=" + channel;
            } else {
                biz_channel = "&trail_channel_from=";
            }
            //这个来区分 ，不同的专题页 留资
            var productName = document.querySelector('title').innerHTML || '长安专题页';
            ajax({
                method: 'post',
                url:LEAVEMSGURL,
                async: true,
                data: {
                    cityId: postInfo.cityId,
                    cityName: postInfo.cityName,
                    provinceId: postInfo.provinceId,
                    provinceName: postInfo.provinceName,
                    name: postInfo.name,
                    phone: postInfo.phone,
                    productName:productName,
                    advertisersSource: biz_channel,
                    source: 3
                },
                cache: false,
                sendBefore: function (xhr) {

                },
                success: function (data) {
                    var data = JSON.parse(data);
                    if (data.result == 0) {
                        console.log("上传成功！");
                        var dialog = Dialog.createDialog({
                            title: '提示',
                            content: '提交成功！',
                            btnTxt: '确定',
                            cb: function () {
                                document.querySelector('#caec-app-leave-msg').style.opacity = 0;
                                document.querySelector('#caec-app-leave-msg').style.zIndex = -1
                            
                            }
                        })
                        dialog.show();
                    } else if (data.result === '3') {
                        var dialog = Dialog.createDialog({
                            title: '提示',
                            content: '您的信息已提交成功!',
                            btnTxt: '确定',
                            cb: function () {
                                document.querySelector('#caec-app-leave-msg').style.opacity = 0;
                                document.querySelector('#caec-app-leave-msg').style.zIndex = -1
                                
                            }
                        })
                        dialog.show();
                    }

                },
                error: function (status) {
                    var dialog = Dialog.createDialog({
                        title: '提示',
                        content: '提交失败，请稍后重试！',
                        btnTxt: '确定'
                    })
                    dialog.show();
                }
            });
        }
    }
    return {
        init: init
    }
});