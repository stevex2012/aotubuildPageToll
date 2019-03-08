import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Layout } from "antd";
import styles from "./index.scss";

import FloorPanel from "../FloorPanel";
//import Console from "../Console";

// 引入 切割模块
import CuttingZone from "../CuttingZone/CuttingZone.js";

@inject("UIStore")
@observer
class OptPanel extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (id, index) => {
    console.log("floorHandleClick");
    this.props.UIStore.floorActive(id, index);
  };

  render() {
    // 如果 没有切割 那么显示整张图片，切割了显示 楼层
    // 根据 楼层来判断 
    let isShowSplitLine = this.props.UIStore.isShowSplitLine;
    // 显示 楼层，还是显示 整张图片 
    let isShowFloors = this.props.UIStore.imgSrc.length;
    // 返回的插件
    let renderComponent = '';
    if( !isShowFloors ){//显示张图片
      
      renderComponent =  <CuttingZone 
        src = { this.props.UIStore.wholeImgSource.src }
        id={ this.props.UIStore.wholeImgSource.id }/>;
      
    }else{//显示楼层
      renderComponent = this.props.UIStore.imgSrc.map((elm, idx) => {
          var tProps = {
            id: elm.id,
            src: elm.src,
            clkArr: this.props.UIStore.clickSrc[elm.id] || []//elm.clkArr
          };
          return (
            <FloorPanel
              key={elm.id}
              index={idx}
              dragOnId={this.props.UIStore.dragOnId}
              isActive={!!(this.props.UIStore.floorOnId == elm.id)}
              handleClick={this.handleClick}
              {...tProps}
            />
          );
        });
    }
    // var floors = this.props.UIStore.imgSrc.map((elm, idx) => {
    //   var tProps = {
    //     id: elm.id,
    //     src: elm.src,
    //     clkArr: this.props.UIStore.clickSrc[elm.id] || []//elm.clkArr
    //   };
    //   return (
        
    //     <CuttingZone 
    //     src = { this.props.UIStore }
    //     id="2305834508"/>
    //     // <FloorPanel
    //     //   key={elm.id}
    //     //   index={idx}
    //     //   dragOnId={this.props.UIStore.dragOnId}
    //     //   isActive={!!(this.props.UIStore.floorOnId === elm.id)}
    //     //   handleClick={this.handleClick}
    //     //   {...tProps}
    //     // />
    //   );
    // });

    // var tt = this.props.UIStore.getDragItem();
    // var logs = {
    //   id: tt.id || "",
    //   left: tt.left || 0,
    //   top: tt.top || 0,
    //   width: tt.width || 0,
    //   height: tt.height || 0
    // };

    return (<Layout className={styles.imgCoporation}>
      {renderComponent}
      {/* {tt && <Console {...logs} />} */}
    </Layout>);
  }
}
export default OptPanel;
