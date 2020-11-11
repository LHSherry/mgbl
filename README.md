<!--
 * @Description:
 * @Author: zhao
 * @Date: 2020-04-28 13:35:19
 * @LastEditors: zhao
 * @LastEditTime: 2020-06-18 21:11:48
 -->
### 准备
## 安装环境
[nodejs](http://nodejs.cn/)
[yarn](https://yarn.bootcss.com/) (可选)

## 项目命令
1. 安装依赖包 yarn install 或 npm install

2. 开发调试 yarn start 或 npm start

3. 生产dist文件 yarn build 或 npm build

### 项目说明
## 前端应用框架采用[umijs框架](https://umijs.org/zh-CN/docs/getting-started)
## 前端组件库[Ant Design](https://ant.design/docs/react/introduce-cn)

### Project structure
```html
|--dist             打包生成的文件
|--public           服务器下的静态资源
|--src              源文件
  |--assets         项目资源打包到js
  |--components     通用组件
  |--const      	常量
  |--layouts		布局样式
  |--models         全局model
  |--pages			页面
  |--services       服务api
  |--utils          工具
  |--app.js      	入口文件
```

### 特别说明
.umirc.ts 项目配置文件 路由在此文件中配置
src/pages/authorized 路由跳转时 可用来权限验证
