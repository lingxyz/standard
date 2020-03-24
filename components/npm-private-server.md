# NPM 私服使用规范

由于企业中前端项目需要使用npm安装私有依赖，所以需要建立`NPM私服`。

推荐使用开源项目[verdaccio](https://github.com/verdaccio)搭建`NPM私服`。

_Tip：如果需要在npm官方镜像发布包，需要切回npm官方镜像。_

## 注册登录

推荐使用邮箱申请，私服维护者统一注册。注册请将个人信息按照以下格式向[FE Arch.](mailto:fe-arch@companydomain.com?subject=NPM私服账号注册申请)提交申请：

* 用户名：默认为 `姓名全拼_工号`，非正式员工建议用`身份证后八位`代替工号
* 默认密码：`用户名后8位`

## 初始化 NPM 包

1. 初始化项目为一个npm包 `npm init`
2. 官方包直接以`包名`命名，项目或个人包命名格式`项目名首字母-包名`
3. 在package.json的autor填写作者名称，官方包则为`FE Arch.`

## NPM 修改镜像

> 使用[nrm](https://www.npmjs.com/package/nrm)管理和切换镜像

```bash
# 安装
npm i nrm -g
# 添加镜像
nrm add COMPANY_NAME http://IP:PORT/
# 切换镜像
nrm use COMPANY_NAME
```

> 其它

```bash
# 删除镜像
nrm del COMPANY_NAME
# 切换回默认镜像
nrm use npm
# 或
nrm use cnpm
```

## 项目依赖安装

> `npm`会先以`COMPANY_NAME`私服为镜像源，安装依赖。若未找到该依赖，会到`taobao`镜像源下载。
>
> 目前私服可解决全部的依赖安装，不必来回切换镜像。

### 安装单个依赖

```bash
npm i MODULE_NAME -S
```

### 批量安装项目依赖

```bash
npm i
```

### 使用`Git`地址为镜像源的老项目

```bash
cd PROJECT_ROOT_DIR

# 删除package-lock.json
rm  package-lock.json

# 删除已安装的git镜像源项目
npm uninstall MODULE_NAME

# 安装COMPANY_NAME私服依赖项目
npm install MODULE_NAME
```

## 发布公用包到`npm`私服

_Tip：大多数同学不用发布，可忽略此处。发布包必须登录。_

### 发布

```bash
npm addUser # 按照要求填写用户名、密码邮箱
npm publish
```

### 取消发布\(半小时内执行\)

```bash
npm unpublish -f
```

## NPM 安装 Git 仓库

npm 安装 git 仓库基于以下协议：

```bash
<protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]
```

