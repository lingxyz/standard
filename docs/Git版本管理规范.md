# Git版本管理规范

## 分支

### 概览

| 分支类型 | 命名规则 | 创建自 | 合入到 | 说明 |
| --- | --- | --- | --- | --- |
| master | master | - | - | 主分支 |
| release | release/sprint标记 | master | master | 待发布的版本 |
| feature | feature/功能点名称 | master | release | 新功能分支 |
| hotfix | hotfix_bug号 | master | master | 生产环境紧急bug修复 |
| tag | vx.x.x | master | - | master分支的标签 |

> 注意：<br>
> 若发布流程中使用 `docker build -t <name>:<tag> .`来创建镜像，并且tag的取值为此次发布的分支名称，则分支命名不可使用【release/sprint标记、feature/功能点名称】规则。<br>
> 标签名称只支持**小写字母**、**数字**、**连字符**、**下划线**四种，因此建议将斜杠`/`改为下划线`_`进行连接。

注释：

- **sprint标记**：格式为 `sprint次数[-title]`，例如`sprint22-map`。若项目不采用敏捷管理方式，此字段可替代为预发布时间，例如`2019-05-20`，完整分支名 `release/2019-05-20`；
- **功能点名称**：格式为小写连字符 `-`，例如：用户详情 `feature/user-details`；
- **bug号**：为修复对应的 [Jira](https://www.atlassian.com/software/jira) Bug编号。

### 说明

#### `master`分支

- `master`主分支是线上当前发布的版本，是稳定可用的版本
- 必须设置分支保护，并且由专人管理
- 只有`pull`、`merge`权限，没有`push`权限
- 发布后需打上`tag`

#### `release`分支

- 主要作用是给当前版本提测以及修复bug使用
- 在一次迭代开发完成后，将所有自测通过的功能分支代码合并`release`分支，并设置分支保护
- 只能`merge`，不能直接`push`
- 一旦封版，`release`分支必须冻结，不允许任何形式的代码改动

#### `feature`分支

- `feature`分支作为完成某个特定功能的分支，从master拉取
- `feature`分支的划分应综合业务和技术模块垂直切分，彼此互不影响
- 只有开发自测通过的`feature`分支可以合并`release`分支
- 项目发布生产环境后，需删除相应的`feature`分支

#### `hotfix`分支

- 为了修复线上版本紧急的bug拉的分支
- 从`master`拉取，测试后合并`master`发布
- `hotfix`分支的命名应该与项目`bug`管理系统的`bug号`关联起来

#### `tag`标签

- 设立的目的是作为发布记录，同时便于回滚
- 由`版本号 + 描述信息`组成
- 版本号为三位以‘.’分割的数字，从0.0.1开始，每一位依次向上叠加
- 从前到后的三位数字分别为大版本迭代，一般迭代，紧急Bug修复
- 当小数点前的版本数字加1时，小数点之后的所有数字归零

## 工作流

![image.png](assets/git-workflow.png)

### 需求开发

- 将新需求/迭代拆分成不同的功能模块后，按模块从`master`新建功能分支`feature/功能分支名`
- 每天至少一次拉取、合并、提交操作，使代码分支与远程同步
- 功能开发完毕，合并进相应的`release`分支
- 当有新迭代上线，`master`分支代码发生变化时，未上线的分支必须同步一次

### 发布测试

- 从`master`主分支新建分支`release/YYYY-MM-DD`
- 在项目管理工具相应的**发布版本管理**模块中，创建相应的版本信息（记录版本号和描述），作为分支记录和发版依据
- 更改项目框架代码中的`version`字段为当前版本号。例如前端改动`package.json`文件中的`version`字段
- 将开发自测通过的功能分支合并到`release/YYYY-MM-DD`分支，由运维人员发布测试
- 当开发人员接收到`Bug`，先在其相应功能分支修改，自测，最后合并到`release`分支，发布后通知测试验证

### 生产发布

- 生产环境由运维发布，发布对象为本次迭代的`release`分支
- 项目发布第二天，项目管理员将`release`分支合并到`master`分支
- 在`master`分支上打上`tag`，作为发布记录，同时便于回滚

### 生产环境紧急`Bug`修复

- 从master新建分支`hotfix_bug号`进行bug修复
- 修复完毕并测试通过后，将分支`hotfix_bug号`合并`master`分支发布
- 在`master`分支上打上`tag`

## 附：Git标签操作

### 打标签并推送

```bash
$ git tag -a v0.1.0 -m '初始版本'
$ git push origin --tags
```

### 查看所有tag信息

```bash
$ git tag -n
```

### 补打标签

```bash
# 给指定commit打标签
$ git tag -a v0.1.0 49e0cd2 -m '初始版本'
```

### 打错标签

```bash
# 本地删除
$ git tag -d v0.1.0
```

### 删除标签

```bash
# 远程删除
$ git push origin :refs/tags/v0.1.0
$ git push origin --delete tag v0.1.0
```
