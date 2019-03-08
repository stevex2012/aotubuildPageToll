define([
    './index.html',
    './index.css'
], function (Tpl) {
    'use strict';
    function init(domId) {
        /// 获取页面高度，
        var bodyHeight = getBodyHeight();
        //获取屏幕高度
        var screemHeight = getScreemHeight();
        if (bodyHeight * 2 > screemHeight) {
            var elm = document.createElement('div');
            elm.innerHTML = Tpl;
            //document.body.innerHTML += Tpl;
            //避免 重写body html 结构，导致原
            document.body.appendChild(elm);
            bodyScroll();
            clkFun();
        }
    }
    //body 高度
    function getBodyHeight() {
        return document.body.offsetHeight;
    }
    // 屏幕高度
    function getScreemHeight() {
        return document.documentElement.clientHeight;
    }
    // 获取滚动条高度
    function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }
    //绑定滚动事件
    function bodyScroll() {
        var scrollFn = debounce(function () {
            var scrollHeight = getScrollTop();
            var screemHeight = getScreemHeight();
            // 滚动条高度 大于一屏幕时候出现放回顶部
            if (scrollHeight > screemHeight) {
                document.querySelector('#caec-theme-page-go-top').style.display = 'block';
            } else {
                document.querySelector('#caec-theme-page-go-top').style.display = 'none';
            }
        }, 200)
        document.body.onscroll = scrollFn;
    }
    //绑定点击
    function clkFun() {
        var dom = document.querySelector('#caec-theme-page-go-top');
        dom.onclick = function () {
            var distance = document.documentElement.scrollTop || document.body.scrollTop;
            animate(distance, 500);
        }
    }
    // 动画
    function animate(distance, time) {
        // 动画间隔
        var interval = 50;
        // 50ms一个动画 
        // 移动的距离，每个
        var speed = distance / time;
        var total = 0;
        var timer = setInterval(function () {
            var dis = speed * interval;
            distance -= dis;
            if (distance <= 0) {
                clearInterval(timer);
            }
            //document.documentElement.scrollTop = distance;
            //document.body.scrollTop = distance
            if(document.documentElement.scrollTop){
                document.documentElement.scrollTop = distance;
            }else if(document.body.scrollTop){
                document.body.scrollTop = distance
            }
        }, interval);
    }
    //防抖
    function debounce(fn, time) {
        var timer = null;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(this, arguments);
            }, time);
        }
    }
    return {
        init: init
    }
});