
const fs = require('fs')
var path = require('path');
const { exec } = require('child_process');

function copyWebpackConfig(rRath) {
    //判断 这个文件存在
    const copyPath = path.resolve(__dirname,'./js/webpack.config.js');
    fs.copyFileSync(copyPath, `${rRath}/webpack.config.js`);

}

const doWebpack = (path) => {
    return new Promise(function(resolve,reject){
         exec(`webpack`,{cwd:path}, (err,stdout,strerr) => {
            if (err) {
                reject(err);
                throw Error(err)
            }
            console.log(stdout)
            resolve();
        })
    });
   
    // new Promise((resolve, reject) => {
        
    // });
}

module.exports = {
    copyWebpackConfig,
    doWebpack
}