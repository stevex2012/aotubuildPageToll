// use to build a header
import React, { Component } from "react";
import "./index.scss";
import { Divider,Input ,Button} from 'antd';
import Clipborad from 'clipboard';
const Search = Input.Search;
const clipboard = new Clipborad('#copyBtn');  //必须实例化

class UrlChange extends Component{
    constructor(props){
        super(props);
        this.state={
            resultUrl:"",
            setUrl:"",
            setTitle:"",
            doBtn:"hide-btn"
        };
    }
    getUrl = (event)=>{
      this.setState({setUrl:event.target.value});
    }
    getTitle = (event)=>{
        this.setState({setTitle:event.target.value});
    }
    doCreate = ()=>{
        let urlInfo = this.state.setUrl;
        let rightUrl;
        let titleInfo = this.state.setTitle;
        let stringUrl = "https://cloud.mall.changan.com.cn/caecapp/main/index.html#main/container-self.html?href=";
        if(!titleInfo || !urlInfo){
            this.setState({resultUrl:"*您还有信息没有输入，请检查！"});
            return;
        }
        //判断setUrl是否是cloud
       if(!urlInfo.includes("cloud")){
           let changeUrl = urlInfo.split("//"),str,
           replaceUrl = changeUrl[1].split('/');
           replaceUrl[0] = "cloud.mall.changan.com.cn";
           rightUrl = "https://";
           replaceUrl.map((item,index)=>{
               if(index == replaceUrl.length-1){
                   str =item;
                 }
               else{
                  str =item +"/";
               }
            rightUrl += str;
              
           });
       }
       else{
           rightUrl = urlInfo;
       }
        this.setState({resultUrl:stringUrl+rightUrl+"&title="+encodeURIComponent(titleInfo)+"&isShare=true"});
        this.setState({doBtn:"copy-btn"});
    }
    doCopy=()=>{
     alert("复制成功");
    }
    render(){
        return (
            <div className="about">
                <div className="content">
                <h2>微信、H5地址转换工具<span className="desc">根据您输入的地址自动转换成用于外链地址。</span></h2>
                <Divider />
                <div className="cont">
                 <Input className="url-input" size="large" placeholder="请输入您要转换的地址" onChange={this.getUrl} />
                 <Input className="title-input" size="large" placeholder="请输入专题页标题" onChange={this.getTitle} />
                 <Button className="sure-btn" type="primary" size="large" onClick={this.doCreate}>确定</Button>
                 <div className="show-created" id="foo">{this.state.resultUrl}</div>
                 <Button id="copyBtn" className={`${this.state.doBtn}`} type="primary" onClick={this.doCopy} size="large" data-clipboard-target="#foo" >复制</Button>  
                </div>
                <Divider />
                <h3>欢迎使用该工具，有任何使用上的疑问或发现bug等，直接反馈给电商前端团队！</h3>
                </div>
          </div>  
       );
  }
};

export default UrlChange;
