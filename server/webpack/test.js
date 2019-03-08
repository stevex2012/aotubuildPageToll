const { exec } = require('child_process');

exec('npm run build',(error, stdout, stderr)=>{
    console.log('error----------------');
    console.log(error);
    console.log('----------------');
    console.log(stdout);
    console.log('----------------');
    console.log(stderr);

    if(error) throw new Error(error,'构建失败');
    console.log(stdout,stderr,'传输成功');
});