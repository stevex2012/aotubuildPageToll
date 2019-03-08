define([
    //  '../../../../../components/AutoBuild/modular/test/index.html',
    //  '../../../../../components/AutoBuild/modular/test/index.css'
    './index.html',
    './index.css'
], function(tpl) {
    'use strict';
   console.log(tpl);
    function init(id){
        console.log(id);
        document.body.innerHTML = tpl;
    }
    return{
        init:init
    }
});