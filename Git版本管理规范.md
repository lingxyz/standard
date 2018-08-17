# `Git` 版本管理规范

采用[禅道](http://www.zentao.net/)做为项目管理工具。

## 仓库

### 仓库命名

见[命名规范](命名规范.md)。

### 仓库权限
由技术经理或项目技术负责人创建代码仓库`Group`。

在`Group`下根据[命名规范](命名规范.md)创建项目代码仓库。

若一人的工作涉及到此分组下的所有代码仓库，则给此人加`Group`权限。否则，只能加项目权限。

分配成员角色

角色 | 描述 
---|---
 Owner| Git 系统管理员（专人）
 Master | 项目管理员（限制为1人或专人）
 Developer | 开发人员
 Reporter | 测试人员
 Guest | 访客

## 分支
### `Git`分支种类和名称

种类 | 名称 | 命名规则 | checkout from | merge to
---|---|---|---|---
主干 | master | - | - | -
版本 | release | release/创建时间（YYYYMMDD） | master | master
功能 | feature | feature/功能点名称 | master | release
紧急修复 | hotfix | hotfix/禅道bug号 | master | master

### 分支权限
- `master` 分支

`master` 分支必须设置分支保护，并且由专人管理。

对`master`分支，只有`pull`、`merge`权限，没有`push`权限。

- `release`分支

在一次迭代开发完成后，将所有代码合并进`release`分支，并设置分支保护。

`release`分支只能`merge`，不能直接`push`。

一旦封版，`release`分支必须冻结，不允许任何形式的代码改动。

## 开发

- 从`master`拉出一个功能分支`feature/xxx`
- 每天至少一次拉取、合并、提交操作，使代码分支与远程同步
- 功能开发完毕，合并进相应的`release`分支
- 当有新迭代上线，`master`分支代码发生变化时，未上线的分支必须同步一次

## 测试
### 同步禅道版本
`release`分支名定下来后，在禅道相应的`项目=>版本`中创建相应的版本信息，作为分支记录和发版依据。

### 修复`Bug`
测试分支一般为`release`；

当开发人员接收到`Bug`，先在其相应功能分支修改，自测，最后合并到`release`分支，让测试验证。

## 发布
生产环境由运维发布，发布对象为本次迭代的`release`分支。

### 打标签
项目发布，将`release`分支合并到`master`分支。

第二天，在`master`分支上打上`tag`，作为发布记录，同时便于回滚。

例：
```bash
$ git tag -a v0.1.0 -m '初始版本'
$ git push origin --tags
```
查看历史tag信息列表：
```bash
$ git tag -n
```
补打标签：
```bash
# 给指定commit打标签
$ git tag -a v0.1.0 49e0cd2 -m '初始版本'
```
打错标签：
```bash
# 本地删除
$ git tag -d v0.1.0
```
删除早期标签：
```bash
# 远程删除
$ git push origin :refs/tags/v0.1.0
$ git push origin --delete tag v0.1.0
```

## 版本号说明
版本号为三位以‘.’分割的数字，如1.0.1。

从前到后的三位数字分别为大版本迭代，一般迭代，紧急修复。
