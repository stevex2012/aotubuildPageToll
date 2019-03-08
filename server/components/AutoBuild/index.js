/**
 * Created by gone with wind on 2017/8/22.
 */
// 引入所需模块=================================
var fs = require('fs');// 文件某块
var image = require('images');//图片，获取片宽高，
var path = require('path');
var cheerio = require('cheerio');// 获取html字符串，操作dom cheerio.load()

//引入图片复制模块
const copyFile = require('../../utils/copyFile.js');
// 引入 生产 配置块 区域
//const constructZone = require('../utils/template/index.js');
const constructZone = require('../renderTpl/index.js');
// 引入 ejs 
const ejs = require('ejs');

// 所有数据的集合，变量
var imgUrl = [];
// title,discription,kewword;
var headHTMLAttr = {};

const SRC = `${path.resolve(__dirname, '../../components/build')}`;//'./components/build';
const DIST = `${path.resolve(__dirname, '../../components/AutoBuild/public')}`;//'./components/AutoBuild/public';

function buildHtml(opt) {
  const basePath = `${path.resolve(__dirname, `../../build/${opt.hash}`)}`;//./build/${opt.hash}
  //console.log(opt, opt.configData);
  //编译版本，app还是pc============
  var edition = opt.pageType;

  console.log('开始生成' + edition + '专题页...');
  // 所有数据的集合，变量
  //var imgUrl=[];
  // title,discription,kewword;
  //var headHTMLAttr={};
  /// 执行所有方法，get page==================================
  imgUrl = getImgAtr(`${basePath}/${edition}/img`);

  // 得到配置 json ，吧 imgUrl 和json组合起来  //'autoBuild/src/json/'
  combinationData(getConfigureJson, opt.configData || `${path.resolve(__dirname, `../../components/AutoBuild/json/${edition}.json`)}`);//./components/AutoBuild/json/${edition}.json`);
  // 生成 css，文件
  //createScss(`${DIST}/${edition}/css/index.css`, buildScssData);
  //createScss(`${basePath}/${edition}/css/index.css`, buildScssData);
  //创建 img文件夹=====
  //createAdir(`${DIST}/${edition}/img`);
  // 复制图片====
  //copyImg(`${SRC}/img/${edition}`, `${DIST}/${edition}/img`);

  ///读取 html 模板文件========================
  var contHTML = fs.readFileSync(`${path.resolve(__dirname, `../../components/AutoBuild/tpl/${edition}.html`)}`);//./components/AutoBuild/tpl/${edition}.html

  $ = cheerio.load(contHTML);
  // 操作html，模板===================，填充内容 ，这步可以得到生成页面用了哪些模块

  const zoneTypsArr = initHTML(imgUrl, edition);
  // 生成 css，文件
  createScss(`${basePath}/${edition}/css/index.css`, buildScssData,zoneTypsArr.totalHeight,edition);
  //生成 目标，html
  createHTML(`${basePath}/${edition}/index.html`);

  // 执行回调，返回生成 文件夹的路径============
  //const tragetPath = `${DIST}/${edition}`;

  // 读取 webpack 入口js，动态添加 require；
  const webpackEntryPath = `${basePath}/${edition}/js/index.js`
  console.log('开始动态生成webpack入口文件');
  assembleEntance(webpackEntryPath, zoneTypsArr.allZoneTypes, edition);

  //复制 不同 模块下面的 不同 图片
  const moduleImgEntry = `${basePath}/${edition}/img`;
  copyModuleImg(zoneTypsArr.allZoneTypes, moduleImgEntry, edition);
  typeof opt.callback === 'function' && opt.callback();
}

/*
* 1,获取 node 命令，生成app，还是pc，process
*
*
* */
///// 读取图片
// 生成 html 的函数
// 组合配置，数据==========================
// 拼接 html字符串 函数
// 获取，img文件下面图片，函数 获取引用地址，
// 获取，图片w，h 函数 图片路径，
// 获取 跳转地址 json
// 获取图片属性======================================
/*
 * [ { width: 900, height: 535, url: 'img/img_01.jpg' },
 { width: 900, height: 402, url: 'img/img_02.jpg' },
 { width: 900, height: 313, url: 'img/img_03.jpg' },
 { width: 900, height: 419, url: 'img/img_04.jpg' } ]
 *
 *
 * */
// 读取图片宽，高，url=================================
function getImgAtr(path) {
  console.log('开始读取图片属性...');
  // fs 模块 读取img 文件下面所有的图片，
  var files = fs.readdirSync(path);// 文件读取顺序 、？？？
  console.log(`读取到上传图片的 ：${files}`);
  var imgUrl = [];
  files.forEach(function (item, index) {
    const tPath = path + '/' + item;
    const stat = fs.statSync(tPath);
    if (stat.isFile()) {
      var width = image(tPath).width(),
        height = image(tPath).height(),
        imgAttr = {
          width: width,
          height: height,
          imgUrl: 'img/' + item + '?ver=' + new Date().getTime()
        };
      imgUrl.push(imgAttr);
    }
  })
  return imgUrl;
}
////  获取点击区域 配置json 生成 scss====
function getConfigureJson(path) {
  console.log('读取配置json文件...');
  // var file = fs.readFileSync(path, 'utf-8'),
  //     configData=JSON.parse(file);

  // headHTMLAttr={
  //     title:configData.title,
  //     description:configData.description,
  //     keyword:configData.keyword
  // };
  var configData = '';
  // 判断传入的是 ，路径，还是 数据（对象）
  if (typeof path == 'object') {
    configData = path || '';

  } else {
    var file = fs.readFileSync(path, 'utf-8'),
      configData = JSON.parse(file);
  }
  headHTMLAttr = {
    title: configData.title || '买车用车上长安商城',
    description: configData.description || '买车用车上长安商城',
    keyword: configData.keyword || '买车用车上长安商城'
  };
  return configData.data;
}
///// 组合配置，数据=====================================
function combinationData(getConfigJson, path) {
  console.log('组合配置json文件，和图片信息');
  var clickZone = getConfigJson(path);
  //console.log(clickZone);
  clickZone.length && clickZone.forEach(function (item) {// 给需要，添加点击区域的添加点击的url
    //console.log(item.data,item.index);
    var i = Number(item.index) - 1;
    imgUrl[i].data = item.data;
  });
  console.log(imgUrl);
}
// // 根据数组，组合返回样式===============================
function getEachCss(obj) {
  //var width =edition=='pc' ? '1180':obj.width,
  var width = obj.width,
    height = obj.height,
    arr = [];
  obj.data.forEach(function (item) {
    var cssObj = {
      left: item.left || (item.x / width * 100).toFixed(2) + '%',
      top: item.top || (item.y / height * 100).toFixed(2) + '%',
      width: item.width.indexOf('%') != -1 && item.width || (item.width / width * 100).toFixed(2) + '%',
      height: item.height.indexOf('%') != -1 && item.height || (item.height / height * 100).toFixed(2) + '%'
    }
    arr.push(cssObj);
  });
  return arr;
}
// 生成 scss 文件======================================
function buildScssData() {
  // 根据json 数据，生成scss /btn 没有分组
  var scss = [];
  imgUrl.forEach(function (item) {
    var tem = item.data && getEachCss(item);
    if (tem) {
      scss = scss.concat(tem);
    }
  });
  return scss;
}
/// // 根据scss 数据，拼接 字符串=================
function createScss(dst, fn,heihgt,edition) {
  console.log('生成目标css文件...');
  var scssString = '';
  var scssArr = fn();
  scssArr.forEach(function (item, index) {
    var temStr = JSON.stringify(item);
    scssString += '.btn' + (index + 1) + '' + temStr
  });
  var distCss = scssString.replace(/\"/ig, '').replace(/\,/ig, ';')
  var mediaCss = `@media (width:768px){
    .box{
      min-width: 768px !important;
      height:${heihgt*768/1180}px !important;
   }
   .box .inner-box{
     width: -webkit-calc(1920px*768/1180) !important;
     margin-left:-webkit-calc(1920px*768*(-1)/1180/2) !important;
   }
  }
  @media (width:1024px){
    .box{
      min-width: 1024px !important;
      height:${heihgt*1024/1180}px !important;
      
   }
   .box .inner-box{
     width: -webkit-calc(1920px*1024/1180) !important;
     margin-left:-webkit-calc(1920px*1024*(-1)/1180/2) !important;
   }
  }`
  edition == 'pc' ? distCss += mediaCss : '';
  // 正则替换 "",and  , 符号===============
  fs.writeFileSync(dst, distCss)
}
// //创建 文件 夹==============================
function createAdir(path) {
  // 文件夹    ========是否存在
  var ist = fs.existsSync(path);
  if (ist) {// 存在 下面是否有文件，有文件，删除，
    var files = fs.readdirSync(path);
    files.length && files.forEach(function (item) {
      var curentPath = path + '/' + item;
      delFiles(curentPath);
    })
  } else {
    fs.mkdirSync(path, function (err) {
      if (err) {
        console.log('failed to create a dir');
      }
    })
  }
  //
}
// 复制 图片====================================
function copyImg(src, dst) {
  console.log('开始复制图片到目标目录...');
  var files = fs.readdirSync(src);
  files.forEach(function (item) {
    var dstPath = dst + '/' + item;//文件筛选
    //fs.writeFileSync(dstPath)
    image(src + '/' + item).save(dstPath);
  })
}
// 删除文件夹 下面的所有文件========================
function delFiles(path) {
  if (fs.statSync(path).isDirectory()) {//文件夹

  } else {
    fs.unlinkSync(path)
  }
}
// 操作html 模板，===================================
function initHTML(data, isPc) {
  console.log('操作模板html，填充数据...')
  var html = '',
    totalHeight = 0;

  // 判断有没有 app 弹框 ====
  var isHasAppDialog = '';
  // 存储所有的zoneType
  const allZoneTypes = [];
  data.forEach(function (item, index) {// 如果是app，则根据iframe 来
    var ahtml = '';

    if (isPc) {
      totalHeight += Number(item.height * (1920 / item.width));
    } else {
      totalHeight += Number(item.height);
    }

    if (String(totalHeight).indexOf(".") > -1) {
      totalHeight = Math.round(totalHeight);
    }

    //根据 zoneType 字段 和 phoneNumber 字段，生产不同的标签
    // zoneType:phoneCall,h5 打电话   jumpUrl ,跳转链接 app 才有
    item.data && item.data.length && item.data.forEach(function (list, idx) {

      var clkElemt = '';
      list.pageType = isPc;
      // 获取 需要调用的模板，名字，存储下载，改变webpack 的index.js 完成动态入口 
      //!allZoneTypes.includes(list.zoneType) && allZoneTypes.push(list.zoneType);
      // 普通跳转模块 不记录
      allZoneTypes.push({
        name: list.zoneType,
        id: `${list.zoneType}${index}-${idx}`
      })
      //{name:'',id:'index'+idx}
      // 调用 初始化模板的方法 得到 dom 字符串
      // 能不能在这里动态require 模板，有js 有渲染 dom ？

      //const modules = require(`./modular/${list.zoneType}/${isPc}/index.js`);
      //const tpl = modules.render();
      ahtml += constructZone.render(list) || `<div class="btn" id="${list.zoneType}${index}-${idx}"></div>`;
      //ahtml += ejs.render(tpl,{data:list});
      //ahtml += constructZone.render(list);

    });
    html += '<div class="img-box"><img src="' + item.imgUrl + '" alt="">' + ahtml + '</div>'

  });

  $('.content').html(html);

  isHasAppDialog && $('body').append(isHasAppDialog);

  var allClkA = $('.img-box .btn');
  var arr = Array.prototype.slice.apply(allClkA)
  arr.forEach(function (item, index) {
    $(item).addClass('btn' + (index + 1));
  });

  //设置总高度
  isPc == 'pc' ? $('.box').css('height', totalHeight + 'px') : '';
  // 设置，head title 和meta属性
  $('title').text(headHTMLAttr.title);
  $("meta[name='description']").attr('content', headHTMLAttr.description);
  $("meta[name='keyword']").attr('content', headHTMLAttr.keyword)
  //给样式文件增加版本号====================
  var cssDom = $("link");
  var linkDomArr = Array.prototype.slice.call(cssDom);
  console.log('修改样式文件版本号');
  (function () {
    for (var i = 0; i < linkDomArr.length; i++) {
      var oldVer = $(linkDomArr[i]).attr('href');
      var newVer = oldVer + '?ver=' + new Date().getTime();
      $(linkDomArr[i]).attr('href', newVer)
    }
  })();
  console.log('修改js文件版本号');
  // 修改js 文件 版本号==change-version 需要修改的类名
  var jsDom = Array.from($('.change-version'));
  //console.log(jsDom);
  jsDom.forEach((elm, idx) => {
    ///console.log(elm);
    var oldVer = $(elm).attr('src');
    var newVer = oldVer + '?ver=' + new Date().getTime();
    $(elm).attr('src', newVer)
  });
  return {
    allZoneTypes:allZoneTypes,
    totalHeight:totalHeight
  }
}
// 生成 目标html 文件===================
function createHTML(path) {
  console.log('生成目标html...');
  fs.writeFileSync(path, $.html(), function (err, data) {
    if (err) {
      console.log('failed to write a file');
      throw err;
    }
  });
  console.log('生成专题页完成...请在' + path + '目录下面查看');
}
// 拼接  webpack 文件入口 
// 利用fs 读取文件 转为字符串，拼接字符串，在写入新文件
function assembleEntance(rRath, modules, pageType) {

  try {
    // 原入口文件
    const file = fs.readFileSync(rRath).toString();
    // 新的入口文件
    let newFile = '';
    // 动态拼接 define 入口 文件
    const modulePath = [];
    //别名
    const moduleAlias = [];
    // 初始化函数 ==
    const initArr = [];
    modules.length && modules.forEach((elm, idx) => {
      const readPath = `${path.resolve(__dirname, `../../components/AutoBuild/modular/${elm.name}/${pageType}/index.js`)}`;
      console.log(`读取入口文件的js${readPath}`);
      //const readPath = `../../../../components/AutoBuild/modular/${elm}/${pageType}/index.js`;
      try {
        fs.readFileSync(readPath);
        modulePath.push(`"${readPath.replace(/\\/g,'/')}"`);
        moduleAlias.push(elm.name);
        initArr.push(`${elm.name}.init("${elm.id}");`);
        // replace(/\\/g,'/') 把这里路径转化为，webpack 能够读取的文件
        //newFile += `require('${readPath.replace(/\\/g,'/')}')`;
        //newFile += `define([${readPath}],function(${elm.name}){${elm.name}.init(${elm.domId})})`
        // 写入新的文件  
      } catch (e) {// 没有这个而文件
        console.log(`这个模块{${elm}}没有js文件`);
      }

    });

    newFile += file
    // 写入新文件
    try {
      console.log('写入新的入口文件---------=========');
      console.log(modulePath,moduleAlias,initArr);
      const entryFileJs = `define([${modulePath}],function(${moduleAlias.join()}){${initArr.join().replace(/,/g,'')}${file}})`
     // fs.writeFileSync(rRath, newFile);
      fs.writeFileSync(rRath, entryFileJs);

    } catch (e) {
      throw Error(`写入新的webpack入口文件失败:${e}`);
    }

  } catch (e) {
    throw Error(`读取${rRath}下面的文件，失败，错误：${e}`);
  }

}
// 复制 不同模块模块下面 img 文件夹
function copyModuleImg(modules, writePath, pageType) {

  modules.length && modules.forEach((moduleName) => {
    const srcPath = `${path.resolve(__dirname, `../../components/AutoBuild/modular/${moduleName}/${pageType}/img`)}`;
    copyFile(srcPath, writePath);
  });
}

module.exports = {
  buildHtml: buildHtml
}
