# HTML规范

> `HTML`作为描述网页结构的超文本标记语言，在前端一直有着广泛的应用。本文档的目标是使 HTML 代码风格保持一致，容易被理解和被维护。

## 缩进

**使用`2`个空格做为一个缩进层级**

对于非 HTML 标签之间的缩进，比如 script 或 style 标签内容缩进，与 script 或 style 标签的缩进同级。

``` html
<!-- 样式内容的第一级缩进与所属的 style 标签对齐 -->
<style>
ul {
  padding: 0;
}
</style>
<ul>
  <li>first</li>
  <li>second</li>
</ul>
```

::: tip 提示
**建议每行不得超过 `120` 个字符**
过长的代码不容易阅读与维护，但是考虑到`HTML`的特殊性不做硬性要求
:::

## 命名

**`Class`命名遵循BEM规范**

`id`建议单词全字母小写，单词间以`-`分隔，必须保持风格一致。

``` html
<!-- bad -->
<div class="left"></div>
<ul class="nav">
  <li class="item">home</li>
  <li class="item">about</li>
</ul>

<!-- good -->
<div class="sidebar"></div>

<ul class="nav">
  <li class="nav__item">home</li>
  <li class="nav__item">about</li>
</ul>
```

<p class="tip">**禁止**创建无样式信息的`class`
不允许 `class` 只用于让 JavaScript 选择某些元素，`class` 应该具有明确的语义和样式。否则容易导致`class`泛滥。</p>

### **`id`命名必须唯一**

IE 浏览器会混淆元素的 `id`和`name`属性，`document.getElementById`可能获得不期望的元素。所以在对元素的`id`与`name`属性的命名需要非常小心。一个比较好的实践是，为 `id` 和 `name` 使用不同的命名法。

```html
<input name="foo">
<div id="foo"></div>
<script>
// IE6 将显示 INPUT
alert(document.getElementById('foo').tagName);
</script>
```

## 标签

### 标签名小写命名

常见无需自闭合标签有 `input`、`br`、`img`、`hr` 等。

``` html
<!-- good -->
<P>Hello StyleGuide!</P>

<!-- bad -->
<p>Hello StyleGuide!</p>
```

### 标签闭合

**对于无需自闭合的标签，不允许自闭合**

```html
<!-- good -->
<input type="text" name="title">

<!-- bad -->
<input type="text" name="title" />
```

**除`HTML5`中规定的自闭合的标签，不允许省略闭合标签**

对代码体积要求非常严苛的场景，可以例外。比如：第三方页面使用的投放系统。

```html
<!-- good -->
<ul>
    <li>first</li>
    <li>second</li>
</ul>

<!-- bad -->
<ul>
    <li>first
    <li>second
</ul>
```

### 使用正确标签嵌套规则

> 比如`div`不得置于`p`中，`tbody`必须置于`table`中详细的标签嵌套规则参见[HTML DTD](http://www.cs.tut.fi/~jkorpela/html5.dtd)中的`Elements`定义部分。

### 标签语义化使用

> 在兼容性允许的情况下应尽量保持语义正确性。对网格对齐和拉伸性有严格要求的场景允许例外，如多列复杂表单。

**建议：**

- 在`CSS`可以实现相同需求的情况下不得使用表格进行布局
- 标签的使用应尽量简洁，减少不必要的标签

```html
<!-- good -->
<p>
  Esprima serves as an important
  <strong> building block </strong>
  for some JavaScript language tools.
</p>

<!-- bad -->
<div>
  Esprima serves as an important
  <span class="strong"> building block </span>
  for some JavaScript language tools.
</div>

<!-- good -->
<img class="avatar" src="image.png">

<!-- bad -->
<span class="avatar">
  <img src="image.png">
</span>
```

**语义化标签：**

- `p` - 段落
- `h1,h2,h3,h4,h5,h6` - 层级标题
- `strong,em` - 强调
- `ins` - 插入
- `del` - 删除
- `abbr` - 缩写
- `code` - 代码标识
- `cite` - 引述来源作品的标题
- `q` - 引用
- `blockquote` - 一段或长篇引用
- `ul` - 无序列表
- `ol` - 有序列表
- `dl,dt,dd` - 定义列表

## 属性

### 属性名使用小写字母

示例：

```html
<!-- good -->
<table cellspacing="0">...</table>

<!-- bad -->
<table cellSpacing="0">...</table>
```

### 属性值用双引号包围

示例：

```html
<!-- good -->
<script src="esl.js"></script>

<!-- bad -->
<script src='esl.js'></script>
<script src=esl.js></script>
```

### 布尔类型的属性不添加属性值

示例：

```html
<input type="text" disabled>
<input type="checkbox" value="1" checked>
```

### 自定义属性以`data-`为前缀

解释：

使用前缀有助于区分自定义属性和标准定义的属性

示例：

```html
<ol data-ui-type="Select"></ol>
```

## 通用

### 使用`HTML5`的`DOCTYPE`

**使用`HTML5`的`DOCTYPE`来启用标准模式**

示例：

```html
<!DOCTYPE html>
```

### 启用`IE Edge`模式

示例：

```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
```

### 在`html`标签上设置`lang`属性

**有助于提高页面的可访问性，如：让语音合成工具确定其所应该采用的发音，令翻译工具确定其翻译语言等。**

示例：

```html
<html lang="zh-CN">
```

## 编码

### 指定页面字符编码

解释：

见 [HTML5 Charset能用吗](http://www.qianduan.net/html5-charset-can-it.html) 一文。

示例：

```html
<!DOCTYPE html>
  <head>
    <meta charset="UTF-8">
    ......
  </head>
</html>
```

### `HTML`禁止使用`BOM`的`UTF-8`编码

解释：

`UTF-8`编码具有更广泛的适应性。`BOM`在使用程序或工具处理文件时可能造成不必要的干扰。

### 引入`CSS`时指明`rel="stylesheet"`

示例：

```html
<link rel="stylesheet" href="page.css">
```

### 引入`CSS`和`JavaScript`时指明`type`属性

解释：

`text/css` 和 `text/javascript` 是 `type` 的默认值。

### 在 `head`中引入所有`CSS`资源

解释：

在页面渲染的过程中，新的CSS可能导致元素的样式重新计算和绘制，页面闪烁。

### `JavaScript`应当放在页面末尾

解释：

将 `script` 放在页面中间将阻断页面的渲染。出于性能方面的考虑，如非必要，请遵守此条建议。

示例：

```html
<body>
  <!-- a lot of elements -->
  <script src="init-behavior.js"></script>
</body>
```

### 外部资源链接协议前缀

**移动环境或只针对现代浏览器设计的 Web 应用，如果引用外部资源的 `URL` 协议部分与页面相同，建议省略协议前缀**

解释：

使用`protocol-relative URL`引入`CSS`，在`IE7/8`下，会发两次请求。是否使用 `protocol-relative URL` 应充分考虑页面针对的环境。

示例：

```html
<script src="//s1.bdstatic.com/cache/static/jquery-1.10.2.min_f2fb5194.js"></script>
```

## `head`

### 页面必须包含`title`标签

### `title`必须紧随 `charset` 声明之后

解释：

`title` 中如果包含 ASCII 之外的字符，浏览器需要知道字符编码类型才能进行解码，否则可能导致乱码。

示例：

```html
<head>
    <meta charset="UTF-8">
    <title>页面标题</title>
</head>
```

### 保证 `favicon` 可访问

解释：

在未指定 favicon 时，大多数浏览器会请求 Web Server 根目录下的 `favicon.ico` 。为了保证 favicon 可访问，避免 404，必须遵循以下两种方法之一：

1. 在 Web Server 根目录放置 `favicon.ico` 文件。
2. 使用 `link` 指定 favicon。

示例：

```html
<link rel="shortcut icon" href="path/to/favicon.ico">
```

### 支持移动设备需指定页面的`viewport`

解释：

viewport meta tag 可以设置可视区域的宽度和初始缩放大小，避免在移动设备上出现页面展示不正常。

比如，在页面宽度小于 `980px` 时，若需 iOS 设备友好，应当设置 viewport 的 `width` 值来适应你的页面宽度。同时因为不同移动设备分辨率不同，在设置时，应当使用 `device-width` 和 `device-height` 变量。

另外，为了使 viewport 正常工作，在页面内容样式布局设计上也要做相应调整，如避免绝对定位等。关于 viewport 的更多介绍，可以参见 [Safari Web Content Guide的介绍](https://developer.apple.com/library/mac/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html#//apple_ref/doc/uid/TP40006509-SW26)

## 图片

### 禁止`img`的`src`取值为空

解释：

`src` 取值为空，会导致部分浏览器重新加载一次当前页面，参考：<https://developer.yahoo.com/performance/rules.html#emptysrc>

### 为`img`添加`title`属性

解释：

多余的 `title` 影响看图体验，并且增加了页面尺寸。

#### 为重要图片添加`alt`属性

解释：

可以提高图片加载失败时的用户体验。

## 表单

### 控件标题`label`

**有文本标题的控件必须使用`label`标签将其与其标题相关联**

解释：

有两种方式：

1. 将控件置于`label`内
2. `label`的`for`属性指向控件的`id`

推荐使用第一种，减少不必要的 `id`，如果 DOM 结构不允许直接嵌套，则应使用第二种。

示例：

```html
<label>
  <input type="checkbox" name="confirm" value="on">
  我已确认上述条款
</label>

<label for="username">用户名：</label>
<input type="textbox" name="username" id="username">
```

### `button`标签指明`type`属性

解释：

`button`元素的默认`type`为`submit`，如果被置于`form`元素中，点击后将导致表单提交。为显示区分其作用方便理解，必须给出`type`属性。

示例：

```html
<button type="submit">提交</button>
<button type="button">取消</button>
```

### 按钮类元素的`name`属性

解释：

由于浏览器兼容性问题，使用按钮的`name`属性会带来许多难以发现的问题，尽量不要使用。具体情况可参考[此文](http://w3help.org/zh-cn/causes/CM2001)。

### `button`按钮的顺序

解释：

负责主要功能的按钮应相对靠前，以提高可访问性。如果在`CSS`中指定了``float: right``则可能导致视觉上主按钮在前，而 DOM 中主按钮靠后的情况。

示例：

```html
<!-- good -->
<style>
.buttons .button-group {
    float: right;
}
</style>

<div class="buttons">
  <div class="button-group">
    <button type="submit">提交</button>
    <button type="button">取消</button>
  </div>
</div>

<!-- bad -->
<style>
.buttons button {
  float: right;
}
</style>

<div class="buttons">
  <button type="button">取消</button>
  <button type="submit">提交</button>
</div>
```

### 使用原生提交功能

解释：

不使用原生提交功能，当浏览器`JS`运行错误或关闭`JS`时，提交功能将无法工作。如果正确指定了`form`元素的`action`属性和表单控件的`name`属性时，提交仍可继续进行。

示例：

```html
<form action="/login" method="post">
  <p><input name="username" type="text" placeholder="用户名"></p>
  <p><input name="password" type="password" placeholder="密码"></p>
</form>
```

### 指定`input`的`type`属性

解释：

根据内容类型指定输入框类型，能获得能友好的输入体验。

示例：

```html
<input type="date">
```

### 多媒体标签

- 使用`audio`以及`video`标签应当注意资源格式
- 优先使用`audio`和`video`标签定义媒体元素
- 使用退化到插件的方式来对多浏览器进行支持
- 只在必要的时候开启音视频的自动播放
- 在`object`标签内部提供指示浏览器不支持该标签的说明

音频应尽可能覆盖到如下格式：

- MP3
- WAV
- Ogg

视频应尽可能覆盖到如下格式：

- MP4
- WebM
- Ogg

示例：

```html
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  <object width="100" height="50" data="audio.mp3">
    <embed width="100" height="50" src="audio.swf">
  </object>
</audio>

<video width="100" height="50" controls>
  <source src="video.mp4" type="video/mp4">
  <source src="video.ogg" type="video/ogg">
  <object width="100" height="50" data="video.mp4">
    <embed width="100" height="50" src="video.swf">
  </object>
</video>

<object width="100" height="50" data="something.swf">DO NOT SUPPORT THIS TAG</object>
```

## 模板中的 HTML

### 模板缩进

**模板代码的缩进优先保证`HTML`代码的缩进规则**

示例：

```html
<!-- good -->
{if $display == true}
<div>
  <ul>
  {foreach $item_list as $item}
    <li>{$item.name}<li>
  {/foreach}
  </ul>
</div>
{/if}

<!-- bad -->
{if $display == true}
  <div>
    <ul>
  {foreach $item_list as $item}
    <li>{$item.name}<li>
  {/foreach}
    </ul>
  </div>
{/if}
```

### 模板标签

**模板代码应以保证`HTML`单个标签语法的正确性为基本原则**

示例：

```html
<!-- good -->
<li class="{if $item.type_id == $current_type}focus{/if}">{ $item.type_name }</li>

<!-- bad -->
<li {if $item.type_id == $current_type} class="focus"{/if}>{ $item.type_name }</li>
```

### 模板循环

**在循环处理模板数据构造表格时，若要求每行输出固定的个数，建议先将数据分组，之后再循环输出**

示例：

```html
<!-- good -->
<table>
  {foreach $item_list as $item_group}
  <tr>
    {foreach $item_group as $item}
    <td>{ $item.name }</td>
    {/foreach}
  <tr>
  {/foreach}
</table>

<!-- bad -->
<table>
<tr>
  {foreach $item_list as $item}
  <td>{ $item.name }</td>
    {if $item@iteration is div by 5}
  </tr>
  <tr>
    {/if}
  {/foreach}
</tr>
</table>
```
