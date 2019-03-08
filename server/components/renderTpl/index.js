// 使用ejs 生产点击块 的dom结构

const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
// 配置表，没有js 的模块，需要拼接 html
const noJsModule = ['jumpUrl', 'phoneCall'];
//const tplObj = require( './getTpl.js' );

// 根据 data.zoneType 判断，jumpUrl   phoneCall
//
//const render = (data) => ejs.render( tplObj[data.zoneType],{data:data} );

const render = data => {
    // 读取文件
    try {
        const isHasJs = noJsModule.includes(data.zoneType);
        if (isHasJs) {
            const pathT = path.resolve(__dirname, `../AutoBuild/modular/${data.zoneType}/${data.pageType}/index.html`);
            const tpl = fs.readFileSync(pathT).toString();
            console.log(`传过来的数据：${data}`);
            return ejs.render(tpl, { data });
        }else{
            return '';
        }

    } catch (e) {
        console.log(`读取模块html文件失败;error:${e}`);
        return '';
    }
}

module.exports = {
    render: render
}