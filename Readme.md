# 专题可视化构建工具

提供一套可供运营人员操作的专题页构建工具。

### 技术特性

- 基于ES 6/7标准语法

- 基于scss / css modules样式处理

- 基于公共主题可配置

- 基于antd UI 框架

- 基于react前端框架

- 基于mobx状态管理

- 基于Fetch数据请求

- 基于koa后端框架（node）

- 基于自动化构建（webpack）

- 未来将支持服务端渲染。

  ?

### 代码SVN 

先从svn获取代码， 仅支持内网checkout。

svn地址：http://src.changan.com/svn/CAEC/trunk/Ext/toCMS/AutoBuild



### 目录结构

-- client					**前端**

?	-- public				公共静态文件

?	-- src				源码

?	-- .eslintrc			eslint配置

?	-- .gitignore			github忽略项配置

?	-- config-overrides.js	脚手架配置	

?	-- jsconfig.json		脚手架配置

?	-- package.json		项目依赖包配置文件	

?	-- package-lock.json	项目依赖包npm方式版本锁定

?	-- yarn.lock			项目依赖包yarn方式版本锁定

?	-- server.js			node服务器文件

?	-- server.test.js		node服务器文件	

?	-- README.md		前端项目说明文件

-- server					**后端**

?	-- components		组件目录

?	-- config				项目环境配置文件	

?	-- lib				第三方库文件

?	-- utils				工具类

?	-- .gitignore			github忽略项配置

?	-- config.js			脚手架配置

?	-- package.json		项目依赖包配置文件

?	-- package-lock.json	项目依赖包npm方式版本锁定

?	-- server.js			node服务器文件

-- ecosystem.config.js  	pm2配置文件

-- package.json			项目依赖包配置文件

-- Readme.md			项目说明文件



### 安装部署

该项目支持分端部署和 pm2 一键部署。

#### 执行环境

- node 8+
- chrome 50+

#### 前端项目安装部署

- npm install：安装依赖包：进入对应目录，执行该命令
- npm start：运行开发环境
- npm run build： 打包服务
- node server：运行build打包后的服务器

#### 后端项目安装部署

- npm install：安装依赖包：进入对应目录，执行该命令
- node server：运行node服务器

> 在config目录中配置，包括dev/prod/test环境。

#### pm2一键部署

除了可以采用分端部署的形式外，推荐使用pm2一键部署。

- npm run pm2-start：启动所有允许pm2监控的服务
- npm run pm2-stop：停止所有pm2正在监控的服务
- pm2 delete all： 清除所有pm2正在监控的服务
- pm2 monit：监控服务状态
- pm2 logs： 查看日志

> 前端项目存在更新，需先重新打包前端项目；
>
> 本项目中依赖了sass和image模块，需要在线连接github中对应的lib库，安装前请确保当前网络环境能够正常连接github。



### 版本更新

#### 1.1 Stable版

- 在线切图，在线切图，在线切图
- 提供移动端外部分享地址转换工具

#### 1.0 Stable版

- 可视化编辑

- 支持代码自动压缩
- 支持图片自动压缩
- 支持发布前预览
- 支持构建后直接下载专题包


