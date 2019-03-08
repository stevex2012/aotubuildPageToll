
import React, { Component } from "react";
import Dragger from "react-dragger-r";
import Transfer, { notification } from 'antd';
import "./index.scss";
//-----------consot-----------------------------------
const ldAllBox={
    width: "100%",
    height: "20px",
    backgroundColor: "transparent",
    cursor: "pointer",
   
};
const fuck={position:`absolute`,top:"60px"};
const ldliner={
     width:"100%",     
     position:"absolute",
     top:"25px",
     left:"0",
     zIndex:"10"    
};
const shown={
  width:"100%",     
     position:"absolute",
     top:"25px",
     left:"0",
     zIndex:"10",
  cursor: "pointer",
  position:"fixed",
  top:"90px"
};
const none={
  display:"none",
  width:"100%",     
  position:"absolute",
  top:"25px",
  left:"0",
  zIndex:"10",
  cursor: "pointer",
   position:"fixed",
    top:"90px"
};
const positionXY={ //这个用来临时存储当前切割线的位置
  x:"",
  y:""
};
const positionArray=[];//这个用来存储最终切割的位置；
const mine=this;
//-------------component------------------------------

class LineDragger extends Component {
    //-------------function--------------
    drakStart=(e)=>{
        //根据props.top的值设置初始的移动值
    }
    dragMove = (e,x,y) => {
        //在此之前我们做一个css的适应
        
        //console.log(x + ":" + y);
        //console.log(y);//相对于原始点移动的y
        //console.log(x);//相对于原始的点移动的x
        positionXY.x=x;
        positionXY.y=y;   
      };
      dragEnd =(e,x,y) => {

        this.setState({
          shown:false
        });
        //alert(this.props.index);
        if(positionXY.y<35){//1.判断是否移除
          this.openNotification();
          //只要切割线曾经移动过，结束时不在图片上，我们就将之移除
         
          this.props.addOneLine();  
        }else{

       //2.判断是否新增
       if(!this.state.new){

       }else{
      //仅当我们新使用一条切割线是才增加（新切割线始终保持两条）
      this.props.addOneLine();    
      }
          //这步说明本次移动成功，将之设置一个标志
          this.setState({
            new:false
          });
          //03.28新的方式，将图片的同一层级新加一个LD组件

          var newPosition=positionXY;
          newPosition.LineIndex=this.props.index;
          this.props.addShowLine(positionXY);



          //开始整理数据
    //       var onenchi={
    //         have:false,
    //         index:""
    //       };
    //      //在此之前我们先进行等比例的换算
    //      var honmonoY=Number((((positionXY.y-35)*(this.props.natural.height))/(900)).toFixed(0));
    //      var honmonoX=0;

    //       const LinePosi={
    //         index:this.props.index,
    //         x:honmonoX,
    //         y:honmonoY
    //       };
    //       if(positionArray.length>0){
    //         for(let u=0;u<positionArray.length;u++){
    //           if(positionArray[u].index==LinePosi.index){
    //             onenchi.have=true;
    //             onenchi.index=LinePosi.index;
    //             break;
    //           }else{}
    //         }
    //         if(onenchi.have){
    //           positionArray[onenchi.index]=LinePosi;
    //         }else{
    //           positionArray.push(LinePosi); 
    //         }
    //       }else{
    //         positionArray.push(LinePosi);
    //       }
    //       //对这个东西排序
    //       positionArray.sort(this.compareIndex('y'));
    //       this.props.doneOneLine(positionArray);
    //     }
    //    console.log(positionArray);
    // }
    // compareIndex(property){
    //   return function(a,b){
    //     var value1 = a[property];
    //     var value2 = b[property];
    //     return value1 - value2;
     };
    } 
    openNotification(){
      const args = {
        message: '提示',
        description: '请将切割线移动到图片内哦',
        duration: 1,
      };
      notification.open(args);
    } 


    //-----------------------------------
    constructor() {
        super();
        this.state = {
          ref: null,
          dragState: 'waiting',
          itemLocation: {
            top: 10,
            left: 260,
          },
          new:true,
          // transfersY:this.props.top
          
        };
      }
    componentWillMount(){
      this.setState({
        shown:true
      });
    }   
    render(){
       
       return(
          //  <div className="ld_allBox" style={this.state.shown?shown:none}>

           <Dragger
           className="kizui"
          //   x={0}
          //  y={this.props.top}
           allowX={false}
           onMove={this.dragMove}
           onDragEnd={this.dragEnd.bind(this)}
           onDragStart={this.drakStart.bind(this)}
           //riginY={this.props.top}
           
           >
           <div className={this.state.shown?"shown":"none"}></div>
           </Dragger>
           
       );
       

    }
}
export default LineDragger;