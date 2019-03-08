

//test code
const fs = require('fs');
const ejs = require('ejs');



// //console.log( html)
var jumpTpl = fs.readFileSync(__dirname+'/tpl/jumpUrl.html').toString();
var phoneCallTpl = fs.readFileSync(__dirname+'/tpl/phoneCall.html').toString();
//读取 留资 模板
var leaveMsgTpl = fs.readFileSync(__dirname+'/tpl/leaveMsg.html').toString();



// 读取所有 模板 返回 模板
module.exports = {
    jumpUrl:jumpTpl,
    phoneCall:phoneCallTpl,
    leaveMsg:leaveMsgTpl
}