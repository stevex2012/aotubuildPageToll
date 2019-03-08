import React, { Component } from "react";
import Async from "react-code-splitting";
import { HashRouter, Route, NavLink ,Redirect } from "react-router-dom";
import { useStrict } from "mobx";
import { Provider } from "mobx-react";
import rootStore from "./stores/RootStore";

import { LocaleProvider, Layout } from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/lib/locale-provider/zh_CN";

import Head from "./components/Header";
import Foot from "./components/Footer";
import DonePanel from "./components/DonePanel";
import "./App.scss";
//import Home from './views/Home';
useStrict(true);

const { Header, Footer } = Layout;

// 全局名称显示头部信息
const UIConfig = {
  header: {
    content: "专题可视化构建工具"
  },
  footer: {
    content: "Design ©2018 Created by CAEC-FED"
  }
};

class App extends Component {
  render() {
    return (
      <Provider {...rootStore}>
        <HashRouter>
          <LocaleProvider locale={zhCN}>
            <Layout>
              <Header>
                <Head>{UIConfig.header.content}</Head>
                <DonePanel />
              </Header>
              <Route
                path="/"
                exact
                render={() => <Redirect to="/home" />}
              />
              <Route
                path="/home"
                exact
                //component = {Home}
                component={() => <Async load={import("./views/Home")} />}
                />
              <Route
                path="/about"
                exact
                component={() => <Async load={import("./views/about")} />}
              />
              <Route
                path="/urlChange"
                exact
                component={() => <Async load={import("./views/urlChange")} />}
              />
              {/* <Route
                path="/mine"
                exact
                component={() => <Async load={import("./views/Mine")} />}
              />              
              <Route
                path="/login"
                exact
                component={() => <Async load={import("./views/Login")} />}
              />
              <Route
                path="/es6"
                exact
                component={() => <Async load={import("./App.ES6")} />}
              />
              <Route
                path="/esnext"
                exact
                component={() => <Async load={import("./App.ESNext")} />}
              /> */}

              <Footer>
                <ul className="router">
                  <li>
                    <NavLink activeClassName="active-li-item" to="/home">首页</NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="active-li-item" to="/urlChange">地址转换</NavLink>
                  </li>
                  
                  <li>
                    <NavLink activeClassName="active-li-item" to="/about">关于</NavLink>
                  </li>
                  {/* <li>
                    <Link to="/mine">使用须知</Link>
                  </li>
                  <li>
                    <Link to="/login">登录</Link>
                  </li>
                  <li>
                    <Link to="/es6">Mobx ES6</Link>
                  </li>
                  <li>
                    <Link to="/esnext">Mobx ESNext</Link>
                  </li> */}
                </ul>
                <Foot>{UIConfig.footer.content}</Foot>
              </Footer>
            </Layout>
          </LocaleProvider>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
