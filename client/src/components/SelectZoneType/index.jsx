// 该组件位，在ant -desing Select 外面，包裹一层，
// 实现功能，下拉框 功能 
import React, { Component } from "react";
// 引入 ant-design
import { Form, Select } from "antd";
// 引入 mobx 监听
import { inject, observer } from "mobx-react";

// 引入配置 下拉框 选择 文件
import selectData from "./select.json";

// ant-design 布局初始化  配置=========================
const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 12 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 }
    }
  };
  // form 表单提示语
const FORMTIP = "*选择点击区域类型";
// 下拉款 默认选项值


//======================
@inject("UIStore")
@observer
class SelectZoneType extends Component {
    constructor(props){
        super(props);
        // 吧 数据监听 源，adress 赋给 this.strore
        this.store = props.UIStore;
    }

    // 得到 下拉框选项
    getSelectOptions(){
        let children = [];
        for(var key in selectData){
            console.log(selectData);
            children.push(
                <Select.Option value={key} key={key} >
                  {selectData[key]["value"]}
                </Select.Option>
              );
        }
        return children;
    }
    //得到默认 下拉框选项
    getDefaultVal(){
        return selectData[0].value;
    }
    // 处理 下拉框 变化
    hanleCg = val=>{
       //console.log(val);
       //设置 这个点击区域 的zoneType 属性
       this.store.setDragData({
        zoneType: val
      });
      const dragId = this.store.dragOnId; 
      this.store.setDragId('');
      this.store.setDragId(dragId);
    }
    render(){
        // 获取 下拉款配置
        const options = this.getSelectOptions();
        // 根据 点击区域id 获取 dataType 属性等。。。
        const sourceData = this.store.getDragItem(this.props.UIStore.dragOnId);
        const value = sourceData.zoneType;
        // 得到默认 下拉框选项
        const defaultVal = value;
        console.log(value);
        // 获取
        // console.log('=====');
        // console.log('点击快 信息' + JSON.stringify(sourceData));
        // console.log('=====');
        
        return (
        <Form> 
            <Form.Item  label={FORMTIP}>
                <Select
                   defaultValue = {defaultVal}
                   value = {defaultVal}
                   onChange = {this.hanleCg}
                >
                    {options}
                </Select>
            </Form.Item>
        </Form>
        );
    }
}


export default SelectZoneType;