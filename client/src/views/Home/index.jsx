import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "./index.scss";

import { Layout, Collapse, Divider } from "antd";

import Title from "../../components/Title";
import MainPanel from "../../components/MainPanel";
import InfoPanel from "../../components/InfoPanel";
import FuncPanel from "../../components/FuncPanel";
import CfgPanel from "../../components/CfgPanel";
import PcCfgPanel from "../../components/PcCfgPanel";
//引入 选择 点击区域 类型下拉框组件
import SelectZoneType from "../../components/SelectZoneType";
// 配置块，组件
import ZoneConfig from "../../components/ZoneConfig";


const { Content, Sider } = Layout;
const Panel = Collapse.Panel;

@inject("UIStore")
@observer
class Home extends Component {
  render() {
    return (
      <Layout>
        <Sider style={{ backgroundColor: "#fff" }}>
          <Collapse bordered={false} defaultActiveKey={["1"]}>
            <Panel
              showArrow={false}
              header={<Title iconType="profile" content="专题信息" />}
              key="1"
            >
              <InfoPanel />
            </Panel>
          </Collapse>
        </Sider>
        <Content>
          <MainPanel />
        </Content>
        <Sider style={{ backgroundColor: "#fff" }}>
          <Collapse bordered={false} defaultActiveKey={["1"]}>
            <Panel
              showArrow={false}
              header={<Title iconType="appstore-o" content="模块信息" />}
              key="1"
            >
              {!!this.props.UIStore.dragOnId && <SelectZoneType/>}
              {/* {!!this.props.UIStore.dragOnId && (this.props.UIStore.pageType == 'app' && <CfgPanel /> || <PcCfgPanel />) } */}
              <ZoneConfig/>
            </Panel>
          </Collapse>
          <Divider>编辑功能区</Divider>
          <FuncPanel />
        </Sider>
      </Layout>
    );
  }
}

export default Home;
