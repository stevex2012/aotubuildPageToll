// 使用ejs 生产点击块 的dom结构

const ejs = require( "ejs" );

//const tplObj = require( './getTpl.js' );

// 根据 data.zoneType 判断，jumpUrl   phoneCall
//
const render = (data) => ejs.render( tplObj[data.zoneType],{data:data} );

const render = data =>{
    // 读取文件
    try{
        const path =`${__dirname}/tpl/${data.pageType}/${data.zoneType}.html`;
        const tpl = fs.readFileSync(path).toString();
        return ejs.render(tp,data);
    }catch(e){
        console.log(`读取模块文件失败;error:${e}`);
    }
}
   
module.exports = {
    render:render
}