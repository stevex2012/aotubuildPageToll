// 组件：输入电话号码。
//
import React, { Component } from "react";
// 引入 ant-design
import { Form, Input } from "antd";
// 引入 mobx 监听
import { inject, observer } from "mobx-react";
// 引入 正则 工具 去掉所有空格
import {removeAllSpace} from "../RegRule/index.js";

// 设置 输入框提示语
const INPUTTIP = "请输入电话号码";
const INPUTBEFORETEXT = "电话号码";
@inject("UIStore")
@observer
class InputTel extends Component{
    constructor(props){
        super(props);
        // 吧 数据监听 源，adress 赋给 this.strore phoneNumber
        this.store = props.UIStore;
    }
    //处理 输入
    handleCg = e =>{
        //console.log(val);
        this.store.setDragData({
            phoneNumber: removeAllSpace(e.target.value)
        });
        const dragId = this.store.dragOnId;
        this.store.setDragId('');
        this.store.setDragId(dragId);
    }
    render(){
        // 根据 点击区域id 获取 dataType 属性等。。。
        const sourceData = this.store.getDragItem(this.props.UIStore.dragOnId);
        const phoneVal = sourceData.phoneNumber ||'';

        return(
        <Form> 
            <Form.Item  label={INPUTTIP}>
                <Input placeholder={INPUTTIP} value={phoneVal} onChange = {this.handleCg.bind(this)}/>
            </Form.Item>
        </Form>
        );
    }
}

export default InputTel;