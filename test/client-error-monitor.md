# 应用错误收集与分析

使用第三方工具 [Fundebug](https://www.fundebug.com/) 和 [Sentry](https://docs.sentry.io) 进行客户端的错误日志收集，发生错误的用户行为记录，协助前端解决不同用户客户端的错误问题。

其中，对外项目推荐使用 Fundebug（需购买付费套餐）；对于数据私密性要求较高的内部项目，推荐对 Sentry 进行私有部署。

Fundebug 和 Sentry 都支持主流编程语言和框架。

## Fundebug 使用

由于 Fundebug 付费，使用见[官方文档](https://docs.fundebug.com/)或咨询客服即可。

建议充分利用[属性配置]()来区分不同环境和版本，便于在后台快速筛选问题：

- apikey：项目区分标识
- appversion：应用版本，建议配置编译时自动获取package.json中的应用版本号
- releasestage：应用开发阶段，如 `dev`, `test`, `uat`, `prd`

通过环境变量区分配置示例：

`package.json`：
```json
"scripts": {
  "dev": "cross-env NODE_ENV=dev nuxt",
  "generate:test": "cross-env NODE_ENV=test nuxt generate",
  "generate:uat": "cross-env NODE_ENV=uat nuxt generate",
  "generate:prd": "cross-env NODE_ENV=prd nuxt generate"
},
```
`webpack`：
```js
// 将node环境变量NODE_ENV传递给浏览器端
NODE_ENV: process.env.NODE_ENV
```
配置文件`config.js`：
```js
const config = {
  // dev 环境配置
  dev: {
    fundebugSilent: true, // fundebug 开启静默模式
    fundebugApiKey: '', // fundebug api key
  },
  // test 环境配置
  test: {
    fundebugSilent: true,  // fundebug 开启静默模式
    fundebugApiKey: '', // fundebug api key
  },
  // uat 环境配置
  uat: {
    fundebugSilent: true,  // fundebug 开启静默模式
    fundebugApiKey: '', // fundebug api key
  },
  // prd 环境配置
  prd: {
    fundebugSilent: true,  // fundebug 开启静默模式
    fundebugApiKey: '', // fundebug api key
  }
}[process.env.NODE_ENV]

export const fundebugSilent = config.fundebugSilent
export const fundebugApiKey = config.fundebugApiKey
```
`fundebugInit.js`：
```js
fundebug.apikey = fundebugApiKey
fundebug.appVersion = Package.version
fundebug.releasestage = process.env.NODE_ENV
fundebug.silent = fundebugSilent
```


## Sentry 接入

接入 `Sentry` 需要引入 `SDK` ，配置 `DSN` 并初始化

`DSN` 在 [创建项目](#创建项目) 时获取

`DSN` 包括
- PROTOCOL 协议
- PUBLIC_KEY 公钥
- HOST 服务地址
- PROJECT_ID 项目ID

```js
'{PROTOCOL}://{PUBLIC_KEY}@{HOST}/{PROJECT_ID}'

// 示例
'https://4485cc17d56e5fcdb33d494e43e5d564@sentry.io/1227621'
```

### 接入引导
 - [浏览器原生 JavaScript](https://docs.sentry.io/error-reporting/quickstart/?platform=browser)
 - [Vue](https://docs.sentry.io/platforms/javascript/vue/)
 - [NodeJS](https://docs.sentry.io/platforms/node/?platform=node)
 - [Angular](https://docs.sentry.io/platforms/javascript/angular/)
 - [React](https://docs.sentry.io/platforms/javascript/react/)
 - [Cordova](https://docs.sentry.io/platforms/javascript/cordova/)
 - [Java](https://docs.sentry.io/clients/java/)
 - [其他](https://docs.sentry.io/platforms/)


### 小程序中接入
因小程序 `ajax` 请求方式不同，须下载并引入第三方文件插件。
[Raven-weapp](https://github.com/youzan/raven-weapp)

```js
var Raven = require('./utils/raven.min')

// 初始化 `协议` `公钥` `服务地址` `项目ID`
var options = {
  release: '1.0.0', // 当前小程序版本
  environment: 'production', // 指定为production才会上报
  allowDuplicates: true, // 允许相同错误重复上报
  sampleRate: 0.5 // 采样率
}
Raven.config('{PROTOCOL}://{PUBLIC_KEY}@{HOST}/{PROJECT_ID}', options).install()

// app.js 监控并收集错误
onError(msg) {
  Raven.captureException(msg, {
    level: 'error'
  })
}
```