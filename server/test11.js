const cp = require('child_process');

// cp.exec('node log.js',{cwd:'./build/123/pc'},(err,stdout,stderr)=>{
//     console.log(234)
//     if(err) throw Error(err);
//     console.log(stdout);
// });

cp.exec('webpack',{cwd:'build/123/pc'},(err,stdout,stderr)=>{
    if(err) throw Error(err);
    console.log(stdout);
}) 
// const fs = require('fs');
// const child_process = require('child_process');

// var workerProcess=child_process.exec('node test.js fuck',function(err,stdout,stderr){
//     console.log(234);
//     console.log('stdout: ' + stdout);
// });

// workerProcess.on('exit', function (code) {
//     console.log('子进程已退出，退出码 '+code);
// });