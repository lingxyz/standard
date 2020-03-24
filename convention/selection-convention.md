# 技术选型公约

当团队规模变得复杂，由一个几人的团队发展到横跨数个项目的几十人的前端团队，项目与项目开发人员之间的交流会渐渐变少。如果公司的组织架构以项目/业务线为主，每个项目/业务线的负责人不同，那么同样的工种之间的隔阂会越来越大，技术差异也越来越大。

为了便于人员调动后快速上手，提高团队的机动性和人员利用率，在技术栈大方向上的统一显得尤为必要。

## 目的

* 使前端团队技术栈相对统一
* 便于统一管理和技术交流
* 便于跨项目技术攻坚，提升项目的可控性
* 降低前端工程师转换项目时的学习成本
* 加强某一技术体系的纵向深度

## 技术选型

从前端工程师、iOS工程师、Android工程师、Node.js工程师等技术线的角度，按照语言、框架、编辑器等模块分别定义选用的技术和框架

| 模块 | 前端 | iOS | Android | Node |
| :--- | :--- | :--- | :--- | :--- |
| 语言 | HTML/CSS/JavaScript | Object-C/Swift/Flutter | Java/Flutter | JavaScript |
| \[预处理\] |  HTML: Pug CSS: Stylus JS：TypeScript | Object-C:AutoLayout Swift: UI:SnapKit flutter: - | - | TypeScript |
| 图标处理 | iconfont + SVG（设计师无法导入到iconfont的特殊彩色icon） |  |  |  |
| 基础框架 | Vue | - | - | Koa/Express |
| 产品化框架 | web: Vue-cli、Nuxt 小程序：mpvue | - | - | 单项目：Egg.js 微服务：Nest.js |
| 组件库 | PC: element-ui H5: mint-ui 小程序：iview | UIKit | androidx google-material | - |
| 接口查看、模拟与测试 | Swagger + YApi + Mock.js |  |  |  |
| 项目编译 | Node + Webpack（Gulp） | LVVM（Xcode 自带） | Gradle | ES6: Babel TS: TSC |
| 代码校验 | ESLint | Alignment For Xcode | Android Lint | ESLint |
| 单元测试 | Karma + Mocha + Chai | Unit Test / UI Test | JUnit / Espresso | Mocha |
| 编辑器 | Visual Studio Code | Xcode | AndroidStudio | Visual Studio Code |
| 代码管理 | Gitlab |  |  |  |
| 持续集成 | Jenkins + Pipeline |  |  |  |
| 部署 | web: Docker + Nginx + CDN 小程序：微信平台 | APPStore 企业CDN + S3 | 应用市场 企业CDN + S3 | Docker + Nginx |
| 服务端脚本 | Shell、Node.js |  |  |  |
| 错误收集 | 外部项目：Fundebug，内部项目：Sentry私有部署 |  |  |  |

