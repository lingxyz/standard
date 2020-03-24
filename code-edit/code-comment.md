# 代码注释规范

## 通用注释

### 单行注释

双斜线前后以空格分割

good

```javascript
var user = new User(); // 实例化一个用户
```

bad

```javascript
var user = new User(); /*实例化一个用户*/
var user = new User(); //实例化一个用户
```

### 区块注释

最少三行, `*`后跟一个空格

good

```javascript
/*
 * 实例化一个用户
 * anything...
 */
var user = new User();
```

bad

```javascript
//  实例化一个用户
//  anything...
var user = new User();
```

### 字段/属性

* 字段/属性上方双斜线注释
* 双斜线后面加空格，注释上方要空行

```java
// JAVA

public class EmailBody {

  // id
  private String id;

  // 发送人姓名
  private String senderName;

  // 标题 不能超过 120 个中文字符
  private String title;

  // 邮件正文
  private String content;

  // 0 不删除 1 删除
  private Integer isDelete;

  // 创建时间
  private Date createTime;
}
```

```javascript
// JS

class EmailBody {
  constructor(option) {

    // id
    this.id = option.id;

    // 发送人姓名
    this.senderName = option.senderName;

    // 标题 不能超过 120 个中文字符
    this.title = option.title;

    // 邮件正文
    this.content = option.content;

    // 0 不删除 1 删除
    this.isDelete = option.isDelete;

    // 创建时间
    this.createTime = option.createTime;
  }
}
```

### 方法

```java
// JAVA

/**
 * @desc 函数描述
 * @param a 参数a
 * @param b=10 参数b的默认值为10
 * @param [c] 参数c为可选参数
 * @return 返回值描述
 */
public String foo(String a,Number b,Boolean... c){
  ...
}
```

```javascript
// JS (vscode 可以使用 Document This 插件快速生成)

/**
 * 函数描述
 * @param {String} a 参数a
 * @param {Number} b=10 参数b的默认值为10
 * @param {Boolean} [c] 参数c为可选参数
 * @param {Object} d.e  参数d的e属性
 * @return {String} 返回值描述
 */
function foo(a, b, c, d) {
  ...
}
```

### 类/接口

* 必须添加类/接口的描述、作者、创建时间
* 必须为类的构造函数添加注释
* 构造函数注明@constructor 标签

```java
// JAVA

/**
 * 类的描述
 * @author 作者
 * @date 2012-11-2014:49:01
 */
public class Test Button {
  /**
   * @constructor
   * @param a 参数a
   */
  public Test(String a) {
    ......
  }
}
```

```javascript
// JS

/**
 * 类的描述
 * @author 作者
 * @date 2012-11-2014:49:01
 */
class Test Button {
  /**
   * @constructor
   * @param {String} a 参数a
   */
  constructor(a) {
    ......
  }
}
```

### 全局变量

全局变量必须写明注释，避免多人开发时理解不一致

### 文件注释

必须注释文件说明、作者、创建时间，其他各类标签请参考：[jsDoc](https://en.wikipedia.org/wiki/JSDoc) 或 [JavaDoc](https://en.wikipedia.org/wiki/Javadoc)

```javascript
/**
 * 文件说明
 * @author 作者
 * @date 2012-10-17 18:32
 */
```

### 特殊标记

* TODO

待办事宜 （TODO） 表示需要实现，但目前还未实现的功能

```javascript
// TODO: 深度优先算法实现
```

* FIXME

错误，不能工作 （FIXME） 在注释中用 FIXME 标记某代码是错误的，而且不能工作，需要及时纠正的情况

```javascript
// FIXME: 逻辑与实际业务不符
```

### 其他

* 中英文规范

  与其“半吊子”英文来注释，不如用中文注释把问题说清楚专有名词与关键字保持英文原文即可

good

```javascript
TCP_TIMEOUT; // tcp连接超时
```

bad

```javascript
TCP_TIMEOUT; // 传输控制协议连接超时
```

* 复杂的逻辑 复杂的代码请写明注释 对于别的程序员能够迅速了解到代码背后的信息 对于自己即使隔很长时间，也能清晰理解当时的思路
* 算法 使用了某种算法请写明注释，能够让阅读者快速意图

## 前端注释

### html

* 单行注释

```markup
<!-- 注释内容 -->
<div>...</div>
```

* 多行注释

```markup
<!--
<div>
  <div>...</div>
</div>
-->
```

### stylus

* 单行注释

```css
// Modal header
.modal-header {
  ...
}
```

* 多行注释

```css
/**
  * Modal header
  */
.modal-header {
  ...
}
```

### 组件（Vue）

必须注释组件说明、作者、创建时间

```markup
<!--
 * @desc 组件描述
 * @author 组件作者
 * @date 2020-12-05
-->
```

