# NPM 包管理规范
为了方便管理和维护组织内越来越多的 npm 公用包，以及良好的生态环境，特制定此规范

## 目录结构
```
package-name
 ┣ build      // webpack 配置
 ┣ dist       // 编译过的文件
 ┣ docs       // 文档
 ┣ examples   // 使用示例
 ┣ src        // 源文件
 ┣ test       // 测试
 ┣ README.md
 ┣ index.js   // 入口
 ┣ index.d.ts // TypeScript 类型定义文件
 ┗ package.json
```


## package.json
`package.json` 基础模板
```json
{
  "name": "my_package",
  "description": "awsome package",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/ashleygwilliams/my_package.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/ashleygwilliams/my_package/issues"
  },
  "homepage": "https://github.com/ashleygwilliams/my_package"
}
```
### name 
必须使用小写，多词之间使用 `连字符 - ` 间隔

并且必须满足以下条件
 - 唯一的
 - 描述性质的
 - 非攻击性词汇
 - 非商标类词汇
 - 非别人拥有的名字
 - 非已有包名的简写
 - 非已有包名的类似名字混搅

 示例：`uploader`, `milk-finder`, `one-to-three`


### description
包的简单描述

### version
包版本号，默认为 1.0.0
 - 1.0.1 `通常为 bug fix`
 - 1.1.0 `新的功能，但向后兼容`
 - 2.0.0 `新的功能，不再向后兼容`

### main
默认入口，默认为根目录 `index.js` 
> 全局包需要在 `index.js` 的第一行添加 `#!/usr/bin/env node` 否则 `windows` 系统中可能不会以 `nodejs` 去执行入口

### scripts
快捷的脚本地址
```bash
npm run test
```

### repository
包的仓库地址

### keywords
包的关键字，其他开发者在 `npmjs.org` 查看你的包时以标签形式展示 

### author
包作者 

示例： Your Name <email@example.com> (http://example.com)

### license
代码许可标识，默认 `ISC`

### bugs
使用过程中遇到 `bug` 时，提交或者解决问题的地址

### bin
配置全局安装包执行的命令，及执行文件地址
```json
{
  "xxx": "index.js"
}
```
全局安装后，可以在命令行 `xxx` 执行到对应文件

### dependencies
生产环境需要的依赖包
> 提示：仅限配置生产环境需要的依赖, 开发&测试环境需要的依赖包配置到 `devDependencies`

### devDependencies
测试环境用到的依赖包

## modules
应考虑兼容到 `CommonJS` `AMD` `CMD` 以及 `浏览器` 直接引入使用

## 测试
必须包含所有功能的测试在 `test` 文件夹中

## README.md
为了帮助其他开发人员, 使用你的包时有更好的体验, 推荐在根目录添加 `readme.md` 描述如何安装、配置和使用你的包

## 发布
发布时需设置 `域` 名称

个人发布使用自己姓名全拼做域名 `@<name>`

```bash
# 设置包域名为姓名全拼
npm init --scope=@CookX
```

项目组发布以项目组名 `@<project-name>` 作为域名

```bash
# 设置包域名为项目名称 @arch
npm init --scope=@arch
```

非项目组的包名应以部门 `@<depart-name>` 作为域名

```bash
# 设置包域名为部门 @financial
npm init --scope=@financial
```

执行发布

```bash
npm publish --access public
```
> 开发人员应避免包中含敏感信息。例: npm 账号密码、私有 keys 、私人资料、信用卡信息

## 依赖包更新与检测
定期使用 `npm audit` 命令检测 `package.json` 依赖包是否有漏洞


