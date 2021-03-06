
define([
    '../../../../../components/AutoBuild/modular/dialog/app/index.html',
    '../../../../../components/AutoBuild/modular/dialog/app/index.css'
],function(Tpl){
    //吧dom 结构
    function renderDom(){
        var div = document.createElement('div');
        div.innerHTML = Tpl;
        document.body.appendChild(div);
    }
    // 绑定 事件
    function bindClik(cb){
        var sureBtn =  document.querySelector('#caec-dialog-wrap .dialog-btn span');
        sureBtn.addEventListener('click',function(){
            hide(cb);
        },false);
    }
    function createDialog(opt){
        renderDom();
        bindClik(opt.cb || '');
        // title 
        document.querySelector('#caec-dialog-wrap .dialog-header').innerHTML = opt.title || '提示';
        document.querySelector('#caec-dialog-wrap .dialog-content').innerHTML = opt.content || '';
        document.querySelector('#caec-dialog-wrap .dialog-btn span').innerHTML = opt.btnTxt || '确定';
        var dialog = document.querySelector('#caec-dialog-wrap');
        return {
            show:show,
            hide:hide
        }
    }
    function show(){
        document.querySelector('#caec-dialog-wrap').style.display = 'block';
    }
    function hide(cb){
        document.querySelector('#caec-dialog-wrap').parentNode.remove();
        cb && typeof cb === 'function' && cb();
    }

    return {
        createDialog:createDialog,
    }
})