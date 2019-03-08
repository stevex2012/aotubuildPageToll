



require('./index.css');


function addEvent(target,action,fn){
    if(window.attachEvent){
        target.attachEvent(`on${action}`,fn);
    }else{  
        target.addEventListener('click',fn);
    }   
}
function click(){
    var btn = document.querySelector('.btn');
    addEvent(btn,'click',e=>{
        console.log(234)
    });
    
}
click();
module.exports = {
    click:click
}
// export {
//     click
// } 