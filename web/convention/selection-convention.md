# 技术选型公约

## 目的
在`多职能 * 多项目`的组织架构下，使团队技术栈相对统一，以便于：

1. 降低职能团队转换项目时的**学习成本**，更加灵活应对**跨项目**开发和技术攻坚。
2. 整个团队专注与某一技术体系，便于统一管理和技术交流，持续加强**技术深度**。

## 技术选型

从前端工程师（Web前端、iOS、Android、Node.js）、Java工程师（后端、大数据）等技术线的角度，按照语言、框架、编辑器等模块分别定义选用的技术和框架。

| **模块** | **前端** | **iOS** | **Android** | **Node** | **Java** |
| --- | --- | --- | --- | --- | --- |
| 语言 | HTML/CSS/JavaScript | Object-C/Swift/Flutter | Java/Kotlin/Flutter | JavaScript | Java |
| 预处理 | HTML: Pug CSS: Stylus JS：TypeScript | Object-C:AutoLayout Swift: UI:SnapKit flutter: - | - | TypeScript |  |
| 图标处理 | iconfont + SVG（设计师无法导入到iconfont的特殊彩色icon） |  |  |  |  |
| 基础框架 | Vue3🔥 | Alamofire / Kingfisher | Retrofit / Glide | Express | Spring Boot |
| 产品化框架 | web: Vue3-template 小程序：uniapp | - | - | Nest.js | springboot-template |
| 组件库 | PC: @shinhotech/sh-ui H5: mint-ui 小程序：iview | UIKit | androidx google-material | - | common包 |
| 微前端/微服务 | qiankun.js |  |  | 注册中心：nacos🔥 配置管理：Apollo 分布式协调：ZooKeeper🔥 链路追踪：SkyWalking |  |
| 数据存储 | Chrome | SQLLite | SQLLite | Mysql v8.0🔥 Redis Elasticsearch ClickHouse🔥 S3 |  |
| 接口查看、模拟与测试 | Swagger + YApi + Mock.js |  |  |  |  |
| 项目编译 | Node + Webpack Vite | LVVM（Xcode 自带） | Gradle | ES6: Babel TS: TSC | Maven |
| 代码校验 | ESLint | Alignment For Xcode | Android Lint | ESLint | SonarQube |
| 单元测试 | Karma + Mocha + Chai | Unit Test / UI Test | JUnit / Espresso | Mocha | JUnit |
| 编辑器 | Visual Studio Code | Xcode | AndroidStudio | Visual Studio Code | IDEA |
| 代码管理 | Gitlab |  |  |  |  |
| 持续集成 | Jenkins + Pipeline / Gitlab-ci |  |  |  |  |
| 部署 | web: Docker + Nginx + CDN 小程序：微信平台 | APPStore 企业CDN + S3 | 应用市场 企业CDN + S3 | Docker + Nginx | Docker + Tomcat |
| 服务端脚本 | Shell、Node.js |  |  |  |  |
| 错误收集 | 外部项目：Fundebug，内部项目：Sentry私有部署 |  |  |  | ELK |
