// 组件： 对应，点击区域的配置 ，不同类型的点击区域，对应不同的组件显示。
// 这个组件 ，被应用组件：view/home 
import React, { Component } from "react";
// 引入 输入电话号码模块
import InputTel from "../InputTel";
//
import JumpConfig from "../JumpConfig";
///配置json 
import configData from "../SelectZoneType/select.json";



// 引入 mobx 监听
import { inject, observer } from "mobx-react";

@inject("UIStore")
@observer

class ZoneConfig extends Component{
    constructor(props){
        super(props);
        // 吧 数据监听 源，adress 赋给 this.strore
        this.store = props.UIStore;
    }
    //
    getCom( zoneType ){
        
    }
    render(){
        // 获取选中 配置块 的属性
        const data = this.store.getDragItem(this.props.UIStore.dragOnId);
        const zoneType = data.zoneType;
        
        //
        const dragOnId = !!this.props.UIStore.dragOnId;
        //  是否有选中的 配置块
        //<Async load={import("./views/Home")} />
        if(dragOnId){ 
            switch(zoneType){
                case 'phoneCall'://配置块，拨打电话
                return  <InputTel />;
                break;
                case 'leaveMsg'://配置块，拨打电话
                return  '此区域是生成用户留资';
                break;
                default:
                //判断显示pc ，还app配置
                return <JumpConfig/>;
            }

        }
        return '';
    }
}


export default ZoneConfig;