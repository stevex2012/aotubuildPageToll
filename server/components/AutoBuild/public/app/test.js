const fs = require('fs');

console.log(456456);
try {
    const file = fs.readFileSync('./input.txt');
    //console.log(file.toString());
    let newFile = file.toString();
    const parts = ['jumpUrl']
    let requires = '';
    parts.forEach( (elm,idx)=>{
        requires += `require('${elm}')`;
    } );
    requires += newFile;
    console.log(requires);
    fs.writeFileSync('./input.txt',requires);
} catch(e){
    console.log('none find');
    //throw Error(e);
}


