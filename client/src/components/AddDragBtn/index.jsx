import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Icon, Button } from "antd";
import "./index.scss";
// 引入 点击区域 类型json数据 ，目的：设置点击框的 默认类型
import zoneConfigJson from "../SelectZoneType/select.json";

//击框的 默认类型
const defaultZoneType = "jumpUrl";

@inject("UIStore")
@observer
class AddDrag extends Component {
  constructor(props) {
    super(props);
  }
  handleClickAdd = e => {
    console.log("add");
    // 得到选中中的 id this.state.floorOnId, 找到这数据中额id 向这里对象中添加 数据
    // 设置添加对象=============   
    var obj = {
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      id: new Date().getTime() + "",
      //添加点击区域类型属性  ，
      zoneType:defaultZoneType,
      phoneNumber:'',
      parentId:this.props.UIStore.floorOnId
    };
    var tFloorOnId = this.props.UIStore.floorOnId;
    this.props.UIStore.floorActive("");
    this.props.UIStore.floorActive(tFloorOnId);
    this.props.UIStore.addDragData(obj);
  };

  render() {
    return (
      <Button
        className={this.props.isActive ? "func show" : "func"}
        data-type={this.props.type}
        onClick={this.handleClickAdd}
      >
        {this.props.val}
      </Button>
    );
  }
}
export default AddDrag;
