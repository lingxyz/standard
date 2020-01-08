# Git提交信息规范

在使用`Git`进行代码的分布式版本控制时，规范化`commit message`可以帮助程序猿在多人开发协作中更好的理解他人对代码的改动信息，避免大家按照各自的理解和习惯（甚至是随意）书写，而对他人和自己造成困惑，从而增加代码审查和纠错的时间成本。

本规范基于 [Angular 规范](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.greljkmo14y0)，这是目前`commit message`使用最广的写法，比较合理和系统化，并且有配套的工具。

## 作用

一个规范化的`commit message`，具有以下作用：

- 提供更多的历史信息，方便快速浏览
- 可以过滤某些`commit`（比如文档改动），便于快速查找信息
- 可以直接从`commit`生成`CHANGELOG.md`

## 格式

使用`git commit`可以提交多行，包括三个部分：

- **Header【必填】**
- Body【选填】
- Footer【选填】

```html
<type>(<scope>): <subject> <!-- header -->
<!-- 空一行 -->
<body>
<!-- 空一行 -->
<footer>
```

说明：
![image.png](/assets/git-commit-message.png)

任意一行都不应该超过100字符，这样的信息在`github`和各种各样的`git`工具上能有更好的可读性。

> Header 是必填，_Body 和 Footer 是选填

### `Header`

`Header`包括三个字段：

- **type（必填）**
- scope（选填）
- **subject（必填）**

```html
<type>(<scope>): <subject>
```

#### Type

用于说明`commit`的类别，只允许使用下面`7`个标识（`feat`、`fix`包含在`CHANGELOG.md`中）：

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style：格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

#### Scope

用于说明 `commit` 影响的范围，比如数据层、控制层、视图层等等

#### Subject

用于对`commit`目的的简短描述，不超过50个字符

以动词开头，使用第一人称现在时，比如`change`，而不是`changed`或`changes`第一个字母小写结尾不加句号（.）

```bash
# 示例一
fix(login): 修改登录账号加密方式

# 示例二
fix: 去除登录页面console代码
```

### `Body`

`Body`部分是对本次`commit`的详细描述，可以分成多行。下面是一个范例：

```bash
更加详细的解释文字，可以添加多行。

- 可使用列表列出详细问题
- 开头为连字符加一个空格

# 示例一
本次修改utils.js中的fetch函数，增加了两个特性：

- 参数showLoading控制请求是否显示加载中
- 参数quite控制请求出错是否使用全局提示
```

### `Footer`

`Footer`部分只用于两种情况：

- 不兼容变动

如果当前代码与上一个版本不兼容，则`Footer`部分以`BREAKING CHANGE`开头，后面是对变动的描述、以及变动理由和迁移方法。
- 关闭`Issue`

如果当前`commit`针对某个`issue`，那么可以在`Footer`部分关闭这个`issue`

```bash
# 示例一
Closes #123, #456, #789

# 示例二
BREAKING CHANGE: fetch函数将在此次新版中不再支持回调函数，请注意修改相关代码

旧版使用
fetch({
  success () {
    console.log('success')
  },
  error () {
    console.error('error')
  }
})

新版使用
try {
  await fetch()
  console.log('success')
} catch (err) {
  console.error('error')
}
```

## 示例

### `feature`示例

```bash
# 详细版
feat(login): 新增登录验证和记录机制

针对登录成功失败进行验证，并对问题进行记录，以分析具体用户具体的活动

# 简化版
feat(login): 新增登录验证和记录机制
```

### `fix`示例

```bash
# 详细版
fix(login): 修复了登录失败的问题

因登录接口对数据的接受格式不对，造成部分用户登录登录失败

Closes #9527, #5386

# 简化版
fix(login): 修复了登录失败的问题
```

### `refactore`示例

```bash
# 详细版
refactor: 修改请求代理组件

修改请求代理以减少代码中对baseUrl的依赖，所有的请求地址为直接的API

BREAKING CHANGE
旧版
$get(BASE_URL + '/api/get')

新版
$get('/api/get')

# 简化版
refactor: 修改请求代理组件由$get(BASE_URL + 'api')改为$get('api')
```

## 提交工具

### 信息填写辅助

#### 命令行提交

在命令行中，使用工具 [commitizen](https://www.npmjs.com/package/commitizen) 来辅助格式化`git commit message`，它提供了一种问询式的方式去获取所需信息。

**安装**

```bash
$ npm install -g commitizen
```

**使用**

```bash
# 直接使用执行提交
$ git cz
```

或

```bash
# package.json 添加配置
{
  "script": {
    "commit": "npx git-cz"
  }
}
# 使用nodejs调用执行
$ npm run commit
```
操作示例：

![image.png](/assets/git-commit.jpg)

#### GUI工具提交

在 `VsCode` 编辑器 `Extensions` 里面搜索 [Visual Studio Code Commitizen Support]() (或点击此链接进行安装)。

**使用方式：**

- 打开命令面板 (ctrl+shift+p or command+shift+p) 输入 'conventional commit'；
- 选择此次提交类型 (type, scope, subject, body, breaking changes, closed issues)；
- 然后按步骤填写对应的信息。

::: tip 提示
提交过程中可以按 `[ESC]` 键退出此次提交
:::

_使用 `SourceTree` 这款软件提交信息也需要按规范填写。_

### 信息验证

信息验证和代码格式验证一样是强制执行的，错误格式的提交信息是不允许的。

在验证提交信息是否符合规范时这里会用到三个东西：

- Git提交信息钩子：[husky](https://www.npmjs.com/package/husky)
- 提交信息验证工具：[@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli)
- 提交信息规范：[@commitlint/config-angular](https://github.com/marionebl/commitlint/tree/master/@commitlint/config-angular)

```javascript
// package.json 中的配置
{
  "husky": {
    "hooks": {
      // 提交信息钩子：执行信息验证。通过则提交成功，不通过则提交失败
      "commit-msg": "commitlint -e $GIT_PARAMS"
    }
  },
  "commitlint": {
    "extends": [
      // 使用angular提交规范
      "@commitlint/config-angular"
    ]
  }
}
```

在执行 `git` 提交信息时触发 `commit-msg` 钩子进行信息验证。**通过验证正常提交，未通过查看错误信息修改并重新修改**。

![image.png](/assets/git-commit-update.jpg)

## 结果展示

可使用工具`conventional-changelog-cli`生成此次发版包含的提交内容。

```bash
$ conventional-changelog -p angular -i CHANGELOG.md -s
# 将在根目录生成CHANGELOG.md文件
```

> 以下内容为某系统提交记录生成

### Bug Fixes

- deploy-line.png路径调整 ([16c6ba4](http://10.211.62.41:8081/framework/it/web/commits/16c6ba4))
- git提交信息 ([4141d0c](http://10.211.62.41:8081/framework/it/web/commits/4141d0c))
- html文档的兼容性问题 ([e6c8f28](http://10.211.62.41:8081/framework/it/web/commits/e6c8f28))
- 产品与设计空间首页 ([772af49](http://10.211.62.41:8081/framework/it/web/commits/772af49))
- 修复一些问题 ([72e599b](http://10.211.62.41:8081/framework/it/web/commits/72e599b))
- 修复部分语言不存在的问题 ([a8dc929](http://10.211.62.41:8081/framework/it/web/commits/a8dc929))
- 修改公告文档 ([7f16f77](http://10.211.62.41:8081/framework/it/web/commits/7f16f77))
- 修改博客页面问题 ([910a88a](http://10.211.62.41:8081/framework/it/web/commits/910a88a))
- 修改配置文件 ([b6e020a](http://10.211.62.41:8081/framework/it/web/commits/b6e020a))
- 内容修改 ([4dd146f](http://10.211.62.41:8081/framework/it/web/commits/4dd146f))
- 前端首页链接 ([3bc1994](http://10.211.62.41:8081/framework/it/web/commits/3bc1994))
- 文档日期中文和格式化 ([4ff2902](http://10.211.62.41:8081/framework/it/web/commits/4ff2902))
- 文档细节问题 ([940adc0](http://10.211.62.41:8081/framework/it/web/commits/940adc0))
- 部分文档调整 ([1cecad4](http://10.211.62.41:8081/framework/it/web/commits/1cecad4))
- **home:** 修改默认值 ([c3b476f](http://10.211.62.41:8081/framework/it/web/commits/c3b476f))
- **home:** 活动预告样式问题 ([9a05a52](http://10.211.62.41:8081/framework/it/web/commits/9a05a52))
- **home:** 首页底部背景图位置问题 ([36658b6](http://10.211.62.41:8081/framework/it/web/commits/36658b6))
- **home:** 鸣谢去除分号 ([347ae54](http://10.211.62.41:8081/framework/it/web/commits/347ae54))
- 样式和错误内容调整 ([26f4c09](http://10.211.62.41:8081/framework/it/web/commits/26f4c09))
- 移除dist文件 ([6910713](http://10.211.62.41:8081/framework/it/web/commits/6910713))
- 组件名称问题和添加首页头部 ([7e94789](http://10.211.62.41:8081/framework/it/web/commits/7e94789))
- 评论加载问题 ([2629d8b](http://10.211.62.41:8081/framework/it/web/commits/2629d8b))
- 首页添加点击链接 ([a38fc45](http://10.211.62.41:8081/framework/it/web/commits/a38fc45))
- 鸣谢改为数组循环 ([2c14bc3](http://10.211.62.41:8081/framework/it/web/commits/2c14bc3))
- 修改博客首页内容 ([15e7e14](http://10.211.62.41:8081/framework/it/web/commits/15e7e14))
- 修改博客首页布局 ([5eb0fa4](http://10.211.62.41:8081/framework/it/web/commits/5eb0fa4))
- 处理文本溢出的情况 ([b260f7d](http://10.211.62.41:8081/framework/it/web/commits/b260f7d))

### Features

- 修改组件BlogBadge并加入最近更新 ([46d6690](http://10.211.62.41:8081/framework/it/web/commits/46d6690))
- 博客按标签查看 ([baf4108](http://10.211.62.41:8081/framework/it/web/commits/baf4108))
- 博客文档添加简要信息 ([4090d27](http://10.211.62.41:8081/framework/it/web/commits/4090d27))
- 博客页面跳转和调整 ([71b9773](http://10.211.62.41:8081/framework/it/web/commits/71b9773))
- 新增文档和修复一些问题 ([36e4ee2](http://10.211.62.41:8081/framework/it/web/commits/36e4ee2))
- 新增评论和博客页面 ([ab3f61f](http://10.211.62.41:8081/framework/it/web/commits/ab3f61f))
- 新的网站首页 ([377c6a3](http://10.211.62.41:8081/framework/it/web/commits/377c6a3))
- 更新mini-program ([097e5a5](http://10.211.62.41:8081/framework/it/web/commits/097e5a5))
- 更新博客规则 ([748410b](http://10.211.62.41:8081/framework/it/web/commits/748410b))
- 更新博客页面 ([978883a](http://10.211.62.41:8081/framework/it/web/commits/978883a))
- 用vuepress初始化 ([2b5bea5](http://10.211.62.41:8081/framework/it/web/commits/2b5bea5))
- 调整网站整体结构 ([e5841eb](http://10.211.62.41:8081/framework/it/web/commits/e5841eb))
- 首页导出图片 ([28b83f8](http://10.211.62.41:8081/framework/it/web/commits/28b83f8))
- 首页导出添加头部尾部 ([4c0d1bd](http://10.211.62.41:8081/framework/it/web/commits/4c0d1bd))
- **newsletter:** 上传快报内容 ([480803b](http://10.211.62.41:8081/framework/it/web/commits/480803b))
