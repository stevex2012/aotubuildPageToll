// 跳转链接 配置 组件

// 引用组件 ：components/JumpConifg
//
import React, { Component } from "react";
// app 跳转 模块
import CfgPanel from "../CfgPanel";
// pc 跳转模块
import PcCfgPanel from "../PcCfgPanel";
// 引入 mobx 监听
import { inject, observer } from "mobx-react";


@inject("UIStore")
@observer
 
class JumpConfig extends Component{
    constructor(props){
        super(props);
        // 吧 数据监听 源，adress 赋给 this.strore
        this.store = props.UIStore;
    }
    render(){
        //根据 配置块，zoneType 显示对应的组件
        const pageType = this.props.UIStore.pageType; 
        return(
            pageType === 'app' ? <CfgPanel /> : <PcCfgPanel />
        );
    }
}

export default JumpConfig;