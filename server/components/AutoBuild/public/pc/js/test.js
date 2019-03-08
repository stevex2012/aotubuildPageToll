/*
 * Created by KirK-Jiang on 2015/4/13.
 */
require.config({
    baseUrl: '',
    urlArgs: "ver=&",
    paths: {
        // require.js plugins
        text: '../rock/com/requirejs-text/text',
        json: '../rock/com/requirejs-json/json',
        c: '../rock/com/requirejs-css/css',
        a: '../rock/com/requirejs-domready/domReady',
        // lib
        b: '../rock/com/jquery/jquery-1.11.2.min',       
    },
    waitSeconds: 0,
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore','jquery'],
            exports: 'backbone'
        },
        bootstrap:{
        	deps: ['jquery'],
            exports: 'bootstrap'
        }       
    }
});

var AlisArr = [];
var ObjArr = [];
if()

require([
    #if($help_json)
    'json!$help_json',
    #end
    'jquery',
    'domReady!',
    'lazyload',
    'baseClient',
    'placeholder',
    'checkbox',
    'cartMenu',
    'user',
    #if($target.equals("result"))
    'isFixedFooter',
    #end
    #if($utils_paging)
    'pagePaging',
    'pageDataSource',
    #end
    #if($utils_raty)
    'raty',
    #end
    #if($frag_goback)
    'feedback',
    'goBack',
    #end
    #if($utils_location)
    'location',
    #end
    #if(!$target.equals("home"))
    'dialog',
    #end
    #if($target.equals("finance"))
    'District',
    #end
    #if($target.equals("comment"))
    '../rock/js/plupload/plupload.full.min',
    #end
    #if($page_search)
    'siteSearch',
    #end
    #if($target.equals("vip"))
    'pointsGoodsCats',
    #end
    #if($target.equals("usedCar"))
    'locationSelect',
    #end
    'underscore'
    #if($utils_recommend)
    ,'recommend'
    #end
    #if($utils_searchPage)
        ,'Dopaging'
    #end
    #if($frag_slider || $utils_slider)
    ,'flexslider'
    #end
    #if($utils_video)
    ,'videoJs'
    ,'css!../rock/com/jquery-videojs/video-js.css'
    #end
    #if($frag_primaryNav)
    ,'../rock/js/nav-main'
    #end
    #if($utils_datePicker)
    ,'datepicker'
    ,'css!../rock/com/datetimepicker/css/bootstrap-datetimepicker.css'
    #end
],
function (
    #if($help_json)
    helpData,
    #end
    $,
    domReady,
    lazyload,
    BaseClient,
    placeholder,
    Checkbox,
    CartMenu,
    User,
    #if($target.equals("result"))
    isFixedFooter,
    #end
    #if($utils_paging)
    Paging,
    DataSource,
    #end
    #if($utils_raty)
    Raty,
    #end
    #if($frag_goback)
    Feedback,
    GoBack,
    #end
    #if($utils_location)
    LocationS,
    #end
    #if(!$target.equals("home"))
    Dialog,
    #end
    #if($target.equals("finance"))
        District,
    #end
    #if($target.equals("comment"))
    Plupload,
    #end
    #if($page_search)
    siteSearch,
    #end
    #if($target.equals("vip"))
    PointsGoodsCats,
    #end
    #if($target.equals("usedCar"))
    LocationSelect,
    #end
    _
   #if($utils_recommend)
    ,Recommend
   #end
    #if($utils_searchPage)
        ,Dopaging
    #end
) {
    #if($frag_slider)
    //页面轮播相关
        #if($frag_slider_from_json)
            #set ($channelId = $frag_slider_from_json)

            BaseClient.ajax({
                url: BaseClient.basePath+'main/actives/list?channelId=$channelId&status=0',
                type: 'get'})
                .done(function (data) {
                    if(data) {
                        if (data.result == "0") {
                            var tDom = '';
                            var href = '';
                            //渲染整图
                            _.each(data.data, function (item) {
                                if (item.img) {
                                    if (item.href) {
                                        href = 'href="' + item.href + '" target="_blank"';
                                    }
                                    tDom += '<li class="slider-item"><a class="slider-item-img"' + href + '><img src="' + item.img + '" alt="" /></a></li>';
                                    href= '';
                                }
                            });
                            tDom && $("#tSlides").html(tDom);
                        }

                        $('.flexslider', "#js-caSiteNav").flexslider({
                            animation: "fade", // slide or fade
                            keyboard: false,
                            pauseOnAction: true,            // Boolean: 用户操作时停止自动播放
                            pauseOnHover: true,            // Boolean: 悬停时暂停自动播放
                            touch: true,
                            start: function (slider) {
                                slider.parent().removeClass('no-js');
                            }
                        });
                    }
                })
                .fail(function(){
                });
        #else
            $('.flexslider', "#js-caSiteNav").flexslider({
                animation: "fade", // slide or fade
                keyboard: false,
                pauseOnAction: true,            // Boolean: 用户操作时停止自动播放
                pauseOnHover: true,            // Boolean: 悬停时暂停自动播放
                touch: true,
                start: function (slider) {
                    slider.parent().removeClass('no-js');
                }
            });
        #end
    #end

    #if($page_search)
    //整站搜索框相关
    siteSearch.init({
        container: "#siteSearch",
        body: ".search-box",
        placeholder: "搜索商品 / 品牌",
        cb_input: function (data) {
            var target = $("#siteSearchClick");
            var tUrlStr = "../result/index.html";
            var showTabType = $('#caec_pc_tabs .tab-title li.ac').attr('data-type') || '';

            var tSearchStr = "";
            if (data) {
                tSearchStr = "?search=" + $.trim(data)+(showTabType ? '&type='+showTabType : '');
                target.attr("href", encodeURI(tUrlStr + tSearchStr));
            }else{
                target.removeAttr("href");
            }
        }
    });

    (function () {
        var target = $("#siteSearchClick");
        if (!target[0]) {
        	#if(!$target.equals("result"))
            $("#siteSearch").append(
                $("<a id='siteSearchClick' class='btn-search-shadow' target='_blank'></a>")
            );
        	#else
    		$("#siteSearch").append(
                $("<a id='siteSearchClick' class='btn-search-shadow' " +
                    "href='../result/index.html"+window.location.search+"' target='_self'></a>")
            );
        	#end
        }
    })();

    $(document).on("keyup", ".js-keyword", function(e){
        if(e.keyCode == 13){
           $("#siteSearchClick")[0].click();
        }
    });
    #end

    #if($utils_bootstrap)
    require(['bootstrap'],function(){});
    #end

    #if($utils_video)
        videojs.options.flash.swf = "../rock/com/jquery-videojs/video-js.swf";
    #end

    #if($page_js)
        #parse("$page_js")
    #end

    // 返回顶部-预约试驾等悬浮板块
    #if($frag_goback)
        // 在线客服跳转处理(暂未引入live800Url.js)
        // live800Url.init({
        //     id:"#js-live800Side"
        // });

        // 意见反馈
        $("#js-feedback").on("click", function(){
            Feedback.showFeedback();
        });

        // 你想要啥
        $("#js-needWhat").on("click", function(){
            Feedback.showFeedback('needWhat');
        });

        // 返回顶部
        GoBack.init({
            id: "#js-siteGoTop"
        });
    #end

    CartMenu.reload();

    // $(".nav-brand-search a").on('click',function(){
    //     this.href = "../search/index.html?search="+encodeURI($(".nav-brand-search input").val());
    // });
    //
    // $(".nav-brand-search input").on('keyup',function(e) {
    //     var theEvent = e || window.event;
    //     var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    //     if (code == 13) {
    //         var btn = $(".nav-brand-search a")[0];
    //         btn.href = "../search/index.html?search="+encodeURI($(".nav-brand-search input").val());
    //         btn.click();
    //     }
    // });
});