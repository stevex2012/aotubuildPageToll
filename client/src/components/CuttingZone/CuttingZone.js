import React, { Component } from "react";
import { Button, notification } from 'antd';
import{Icon}from "antd";
import LineDragger from "../LineDragger/lineDragger";
import LineDraggerShow from "../LineDrager_show/LineDrager_show";
import { inherits } from "util";
import "./style.scss";

import { observer, inject } from "mobx-react";
// canvas 切割图片插件，返回一个 promise 对象
let  splitImg  = require(  "../SplitImg/index.js" );

//------------const------
var naturalSize={};
const botStyle={
    width: "66px",
    height: "66px",
    borderRadius: "50px",
    textAlign: "center",
    whiteSpace: "initial",
    position: "fixed",
    bottom: "0",
    right: "0",
};
var positionArray=[];//这个用来存储最终切割的位置,其子<LineDragger/>和<LineDragerShow/>共同决定其最终值
var  one2one="";
var haveImg=false;
// use UIStroe to observer 
@inject("UIStore")
@observer
//---------component-----------
class CuttingZone extends Component {
    
    constructor(props) {
      super(props);
      this.state={
          length:1,
          showLength:0,
          cuttingArray:{},
          naturalSize:{},
          top:0,
          y:"",
          index:"",
          isShowJH:false
      };     
    }
    componentWillMount(){
        // this.setState({
        //     lineCuter:[
        //       <LineDragger key={Math.random(3)} addOneLine={this.add()}/>,
        //       <LineDragger key={Math.random(3)} addOneLine={this.add()}/>
        //     ]
        // });
    }
    add(){
     var ori_line=this.state.length;
     this.setState({
        length:ori_line+1  
     });

    }
    dones(line){
        this.setState({
            cuttingArray:{
                base:this.props.src,
                ori_width:this.state.naturalSize.width,
                ori_height:this.state.naturalSize.height,
                LineArray:line
            },
            
        });
    }
    onWheelEvent(e){
        let clientHeight = this.refs.bodyBox.clientHeight; //可视区域高度
        let scrollTop  = this.refs.bodyBox.scrollTop;  //滚动条滚动高度
        let scrollHeight =this.refs.bodyBox.scrollHeight; //滚动内容高度
        //console.log(scrollTop);
        this.setState({
            top:Number(scrollTop)
        });
        
    }
    openAlert(detail){
        notification.open({
            message: '提示',
            description:detail,
            duration:2
          });
    }

    doneCutting(e){
        //判断用户是否至少拉了一条线
        if(!haveImg){
          
            this.openAlert("请先选择图片哦。");
            
          
        }else{

        this.setState({
            isShowJH:true
        });
        var allData={}; 
        //遍历数组，转化数字
        for(let k=0;k<positionArray.length;k++){
            
            var cutheight=positionArray[k].y;
            if(positionArray[k].index=="end"){}else{
                positionArray[k].y=this.transFormation(cutheight-25);
            }
            
        }
        //排序
        positionArray.sort(this.compareIndex('y'));  
        allData.base=this.props.src;
        allData.ori_height=this.state.naturalSize.height;
        allData.ori_width=this.state.naturalSize.width;
        allData.LineArray=positionArray;

        //组装其他参数,最终数据就是allData，直接用起
        console.log( allData );
        // 根据 切割数据，设置 imgSrc
        const opt = {
            width:allData.ori_width,
            height:allData.ori_height,
            data:allData.LineArray,
            base64:allData.base
        };

        const _this = this;
        //得到 图片 楼层的高度，应为宽度固定====；盒子宽度为900
        // 
        const staticW = 900;
        splitImg.splitImg( opt ).then( data=>{
            console.log( data );
            let imgSrc = [];
            let timeId = Number( new Date().getTime() );
            
            
            data.forEach( ( elm,idx )=>{

                // 创建 虚拟 dom img 得到w h
                
                // 回调得到 原始图片的 w，h，在根据 比例计算
                imgSrc.push( {
                    id:timeId ++ ,
                    src:elm.base64,
                    width:staticW,
                    height:Number( (elm.height* staticW) /elm.width ).toFixed(2),
                    isActive:false
                } );
                // _this.props.UIStore.floorDataPush({
                //     id:timeId ++ ,
                //     src:elm
                // });
            } );
        
            console.log(imgSrc);

            _this.props.UIStore.setImgSrc( imgSrc ).then(()=>{
                // successful callback
                //hide the big juhua
                this.state.isShowJH=false;
                  
            }).catch((e)=>{
                // err callback
                throw new Error(e);
            });
            // refresh
           // _this.props.UIStore.floorDataPush(imgSrc);

        } );
    }

        
    }
    compareIndex(property){
        return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
        };
    }

    transFormation(num){
        // ori_width:this.state.naturalSize.width,
        // ori_height:this.state.naturalSize.height,
        var oriData=((num*Number(this.state.naturalSize.width))/900).toFixed(0);
        return oriData;
    }
    addshow(y){
       var length=this.state.showLength;
       one2one=y.LineIndex; 
       this.setState({
           showLength:length+1,
           y:y.y,
       });
       //拼凑数据..(这是完成新拉一条线时的数据，绿线-->蓝线)
        var lineData={};
        var xp=0;
        var yp=y.y+this.state.top;
        var indexp=y.LineIndex;
        lineData.x=xp;
        lineData.y=yp;
        lineData.index=indexp;
        positionArray.push(lineData);
        console.log(positionArray);
    }
    MoveLine(data){
       //改变数据..(这是在已经完成的线再次移动改变其位置，蓝线-->蓝线)
        var index=data.index;
        for(let i=0;i<positionArray.length;i++){
            if(positionArray[i].index==index){
                positionArray[i].x=data.x;
                positionArray[i].y=data.y;
                break;
            }
        }
        console.log(positionArray); 
    }
    deletData(index){
      var pre_index=index;
      for(let f=0;f<positionArray.length;f++){
          if(positionArray[f].index==pre_index){
              positionArray.splice(f,1);
          }
        }
        console.log(positionArray); 
    }
    imgOnload(e){
        console.log(e.target.offsetWidth, e.target.offsetHeight);
        const trgt = e.target;
        const id = trgt.id;
        const width = trgt.offsetWidth;
        const height = trgt.offsetHeight;


        //我们可以拿到该图片的原始大小
        this.setState({
            naturalSize:{
            height:trgt.naturalHeight,
            width:trgt.naturalWidth
            }       
        });
        haveImg=true;
        positionArray=[{x:0,y:trgt.naturalHeight,index:"end"}];
    }
    render(){
       //1.拼凑结构
       const ElementShowArray=[];
       const ElementArray=[];
       for(let y=0;y<this.state.length;y++){
           const elements=<LineDragger
             top={this.state.top}
             key={y} natural={this.state.naturalSize}
             //index={Math.random().toString(36).substr(2)}
             index={y}
             doneOneLine={this.dones.bind(this)}
             addOneLine={this.add.bind(this)}
             addShowLine={this.addshow.bind(this)}/>;
           ElementArray.push(elements);
       }

       if(this.state.showLength>0){
           for(let p=0;p<this.state.showLength;p++){
               const elementsShow=<LineDraggerShow
                key={p} 
                position={this.state.y+this.state.top} 
                index={p}
                doMoveLine={this.MoveLine.bind(this)}
                deletData={this.deletData.bind(this)}
                />;
                
                
               ElementShowArray.push(elementsShow);
           }  
       }
       return(
           <div className="TransformBox">
           {/* 此乃菊花 */}
          <div className={this.state.isShowJH?"chrysanthemum":"also_chrysanthemum"}>
           <Icon className="chrysanLoading" type="sync" />
           {/* <Icon type="smile-circle" /> */}
          </div>
           <div className="topBack"></div>
           <div className="floatBox" style={haveImg?{display:"none"}:{display:"block"}}></div>
             {ElementArray}
           <div className="CuttingZoneStyle" onScroll={this.onWheelEvent.bind(this)}   ref="bodyBox">
             {ElementShowArray}
           <div className="imgZoneStyle" >
           <img
            src={this.props.src}
            alt=""
            id={this.props.id}
            onLoad={this.imgOnload.bind(this)}
            draggable="false"
            style={{
                // position:"absolute",
                zIndex:"-1",
                width:"900px",
                height:"auto",
                margin:"50px auto 0 auto",
                display:"block",
                position:"relative"
            }}
          />
          </div>
          <Button style={botStyle} type="primary" onClick={this.doneCutting.bind(this)}>完成裁切</Button>
           </div>
         </div>  
           
         
       );
       

    }
}
export default CuttingZone;


