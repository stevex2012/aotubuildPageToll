//-----------import---------------------
import React, { Component } from "react";
import Dragger from "react-dragger-r";
import "./LineDrager_show.scss";
import del from "./LineDelet.png";

//----------const-----------------------
const twiceRemovePosition={
    x:"",
    y:""
};


//--------component---------------------
class LineDraggerShow extends Component {
    constructor() {
        super();
        this.state = {
            isLine:true
        };
      }
    componentWillMount(){
      
    }

    dragMove(e,x,y){
         twiceRemovePosition.x=x;
         twiceRemovePosition.y=y;
         twiceRemovePosition.index=this.props.index;
    }

    dragEnd(e,x,y){
         this.props.doMoveLine(twiceRemovePosition);
         console.log(twiceRemovePosition);
    }

    delMine(){
         //将此条line干掉
         this.setState({
            isLine:false
         });
         //在父组件中将数据删除
         this.props.deletData(this.props.index);  
    }

    render(){
        return(
            //  <div className="ld_allBox" style={this.state.shown?shown:none}>
  
             <Dragger
             hasCancelHandle={true}//设置内部的不可拖动区域,(图片位置)
             className="kizu"
              x={0}
              y={this.props.position}
             allowX={false}
             onMove={this.dragMove.bind(this)}
             onDragEnd={this.dragEnd.bind(this)}
             >
             <div className={this.state.isLine?"LineShowStyle":"LineUnshowStyle"}>
             <img src={del} className="del_img cancle"
             onClick={this.delMine.bind(this)}
             />
             </div>
             </Dragger>
             
        );
    } 

}

export default LineDraggerShow;