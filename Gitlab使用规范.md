# GitLab使用规范

技术团队统一使用[Gitlab](https://about.gitlab.com/)私服托管代码仓库。

## 账号设置
为方便协作开发，制定以下规则：

要素 | 规则 | 例
---- | --- | ---
姓名 | 真实姓名 | -
用户名 | `姓名全拼_工号`/公司域账号 | zhangsan_19091601
邮箱 | 企业个人邮箱 | zhangsan@companymail.com
头像 | 请设置具有个人标志的头像 | -
全名 | 请填写个人真实姓名 | 张三

本地需配置用户名和邮箱，作为提交时的用户信息：
```bash
git config --global user.name zhangsan_17070022
git config --global user.email zhangsan@companymail.com
```
方便进行查阅，以及团队代码提交量和贡献度统计。

## 项目分类

项目分为**个人项目**与**企业项目**。

个人项目存放在个人代码库中，企业项目`必须`存放在`项目组群组`中。

## 仓库管理

### 群组
以项目为第一维度，建立群组（Group）。

一个群组，托管所有该项目的代码，包括前端、后端、移动端等。

### 命名
#### 分组命名
群组名以项目英文名或英文缩写为标准（缩写时应使用大写字母），多个英文单词之间用连字符`-`连接。
例：alibaba-taobao

#### 仓库命名
命名结构：前端为`子项目描述 + 终端`，后端为`子项目描述 + 服务类型`。

- 子项目描述：采用语义化的子项目名，结构建议为`用户群+功能描述`。

用户群通常分为HQ端、B端、C端。功能描述如admin、store等。

例：

hq-admin（总部后台）、merchant-admin（商户后台）、c-ministore（用户端微店）

- 终端：一般分为网页端（web，wap）、手机、pad移动端APP（ios/android/内嵌h5）、微信端（公众号、企业号、小程序、小游戏）和其他一些智能设备（如收银机、电视等）。使用规则：
  - 手机APP：mobile，可细分为mobile-android、mobile-ios、mobile-h5
  - 微信端：wechat，可细分为wechat-h5、wechat-miniapp
  - pad端：pad，可细分为pad-android、pad-ios、pad-h5
  - pos端：pos，可细分为pos-android、pos-ios、pos-web
  - 浏览器端：pc端web、手机端h5

- 服务类型：service（Java 服务）、api（Node服务）、job（定时任务）等。

### 注释
在群组和项目描述中，注明项目组名称或群组用途。

### 权限
仓库权限涉及到企业核心资产保护，所以需要严格管理。

成员角色

角色 | 描述
---|---
Owner / 所有者 | Git 系统管理员（专人）
Master / 主程序员 | 项目管理员（限制为1人或专人）
Developer | 开发人员
Reporter | 报告者
Guest | 访客

::: tip 提示
如需了解对应权限，请查看**GitLab官方权限说明**
:::



由系统管理员或技术负责人创建群组。

若某人的工作涉及到此分组下的所有代码仓库，则给此人加`Group`相应权限。否则，只能加项目权限。

非项目核心开发人员开通代码权限，需要通过公司正式申请流程（工单、邮件等）申请。
