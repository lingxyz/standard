# HTML-Vue规范

#### `template`中`this`的用法

- 被[eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)包含在: `plugin:vue/recommended`

#### 不推荐

``` html
<a :href="this.url">
  {{ this.text }}
</a>
```

#### 推荐

``` html
<a :href="url">
  {{ text }}
</a>
```

## 指令

### `v-on`修饰器`exact`使用

- 被[eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)包含在: `plugin:vue/essential`

#### 不推荐

``` html
<template>
  <button v-on:click="foo" v-on:click.ctrl="foo"></button>
</template>
```

#### 推荐

``` html
<template>
  <button @click="foo" :click="foo"></button>
  <button v-on:click.exact="foo" v-on:click.ctrl="foo"></button>
</template>
```

### `v-bind`指令风格

- 被[eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)包含在: `plugin:vue/strongly-recommended` 和 `plugin:vue/recommended`

#### 不推荐

``` html
<div v-bind:foo="bar"/>
```

#### 推荐

``` html
<div :foo="bar"/>
```

### `v-on`指令风格

- 被[eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)包含在: `plugin:vue/strongly-recommended` 和 `plugin:vue/recommended`

#### 不推荐

``` html
<div v-on:click="foo"/>
```

#### 推荐

``` html
<div @click="foo"/>
```

### `v-for`设置键值

**总是用 `key` 配合 `v-for`。**

在组件上*总是*必须用 `key` 配合 `v-for`，以便维护内部组件及其子树的状态。甚至在元素上维护可预测的行为，比如动画中的[对象固化 (object constancy)](https://bost.ocks.org/mike/constancy/)，也是一种好的做法。

假设你有一个待办事项列表：

``` js
data: function () {
  return {
    todos: [
      {
        id: 1,
        text: '学习使用 v-for'
      },
      {
        id: 2,
        text: '学习使用 key'
      }
    ]
  }
}
```

然后你把它们按照字母顺序排序。在更新 DOM 的时候，Vue 将会优化渲染把可能的 DOM 变动降到最低。即可能删掉第一个待办事项元素，然后把它重新加回到列表的最末尾。

这里的问题在于，不要删除仍然会留在 DOM 中的元素。比如你想使用 `<transition-group>` 给列表加过渡动画，或想在被渲染元素是 `<input>` 时保持聚焦。在这些情况下，为每一个项目添加一个唯一的键值 (比如 `:key="todo.id"`) 将会让 Vue 知道如何使行为更容易预测。

根据我们的经验，最好*始终*添加一个唯一的键值，以便你和你的团队永远不必担心这些极端情况。也在少数对性能有严格要求的情况下，为了避免对象固化，你可以刻意做一些非常规的处理。


#### 不推荐

``` html
<ul>
  <li v-for="todo in todos">
    {{ todo.text }}
  </li>
</ul>
```

#### 推荐

``` html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

### 避免`v-if`和`v-for`用在一起

**永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上。**

一般我们在两种常见的情况下会倾向于这样做：

- 为了过滤一个列表中的项目 (比如 `v-for="user in users" v-if="user.isActive"`)。在这种情形下，请将 `users` 替换为一个计算属性 (比如 `activeUsers`)，让其返回过滤后的列表。

- 为了避免渲染本应该被隐藏的列表 (比如 `v-for="user in users" v-if="shouldShowUsers"`)。这种情形下，请将 `v-if` 移动至容器元素上 (比如 `ul`, `ol`)。

当 Vue 处理指令时，`v-for` 比 `v-if` 具有更高的优先级，所以这个模板：

``` html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

将会经过如下运算：

``` js
this.users.map(function (user) {
  if (user.isActive) {
    return user.name
  }
})
```

因此哪怕我们只渲染出一小部分用户的元素，也得在每次重渲染的时候遍历整个列表，不论活跃用户是否发生了变化。

通过将其更换为在如下的一个计算属性上遍历：

``` js
computed: {
  activeUsers: function () {
    return this.users.filter(function (user) {
      return user.isActive
    })
  }
}
```

``` html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

我们将会获得如下好处：

- 过滤后的列表*只*会在 `users` 数组发生相关变化时才被重新运算，过滤更高效。
- 使用 `v-for="user in activeUsers"` 之后，我们在渲染的时候*只*遍历活跃用户，渲染更高效。
- 解藕渲染层的逻辑，可维护性 (对逻辑的更改和扩展) 更强。

为了获得同样的好处，我们也可以把：

``` html
<ul>
  <li
    v-for="user in users"
    v-if="shouldShowUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

更新为：

``` html
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

通过将 `v-if` 移动到容器元素，我们不会再对列表中的*每个*用户检查 `shouldShowUsers`。取而代之的是，我们只检查它一次，且不会在 `shouldShowUsers` 为否的时候运算 `v-for`。

#### 不推荐

``` html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

``` html
<ul>
  <li
    v-for="user in users"
    v-if="shouldShowUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

#### 推荐

``` html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

``` html
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

### 没有在`v-if`/`v-else-if`/`v-else`中使用`key`

**如果一组 `v-if` + `v-else` 的元素类型相同，最好使用 `key` (比如两个 `<div>` 元素)。**

默认情况下，Vue 会尽可能高效的更新 DOM。这意味着其在相同类型的元素之间切换时，会修补已存在的元素，而不是将旧的元素移除然后在同一位置添加一个新元素。如果本不相同的元素被识别为相同，则会出现[意料之外的副作用](https://jsfiddle.net/chrisvfritz/bh8fLeds/)。

#### 不推荐

``` html
<div v-if="error">
  错误：{{ error }}
</div>
<div v-else>
  {{ results }}
</div>
```

#### 推荐

``` html
<div
  v-if="error"
  key="search-status"
>
  错误：{{ error }}
</div>
<div
  v-else
  key="search-results"
>
  {{ results }}
</div>
```

``` html
<p v-if="error">
  错误：{{ error }}
</p>
<div v-else>
  {{ results }}
</div>
```


### 禁止使用`v-html`

<p class="tip">禁用此功能防止`XSS`攻击</p>

- 被[eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)包含在: `plugin:vue/recommended`

#### 不推荐

``` html
<template>
  <div v-html="someHTML"></div>
</template>
```

#### 推荐
``` html
<template>
    <div>{{someHTML}}</div>
</template>
```

## 标签

### `<textarea>`标签插值

- 被[eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)包含在: `plugin:vue/essential`, `plugin:vue/strongly-recommended` 和 `plugin:vue/recommended`

::: tip 提示
`textarea`标签插值将不起作用，用`v-model`方式
:::


#### 不推荐

``` html
<textarea>{{ message }}</textarea>
```

#### 推荐

``` html
<textarea v-model="message"/>
```


### `<template>`不可设置`key`属性

- 被[eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)包含在: `plugin:vue/essential`, `plugin:vue/strongly-recommended` 和 `plugin:vue/recommended`


#### 不推荐
``` html
<template key="foo"> ... </template>
<template v-bind:key="bar"> ... </template>
<template :key="baz"> ... </template>
```



#### 推荐
``` html
<template> ... </template>
<template lang="pug"> ... </template>
```


### 自闭合和无内容标签

- 被[eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)包含在: `plugin:vue/strongly-recommended` 和 `plugin:vue/recommended`


#### 不推荐
``` html
<div></div>
<img/>
<img></img>
<MyComponent/></MyComponent>
<svg><path d=""></path></svg>
```



#### 推荐
``` html
<div/>
<img>
<MyComponent/>
<svg><path d=""/></svg>
```


### 闭合非自闭合标签

- 被[eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)包含在: `plugin:vue/strongly-recommended` 和 `plugin:vue/recommended`


#### 不推荐
``` html
<div>
<p>
<p>
<input></input>
<br></br>
```



#### 推荐
``` html
<div></div>
<p></p>
<p></p>
<input>
<br>
```


### 标签闭合方括号前换行


#### 不推荐
``` html
<div id="foo" class="bar"
>

<div
  id="foo"
  class="bar">
```



#### 推荐
``` html
<div
  id="foo"
  class="bar"
>
```


### 模板中组件名使用帕斯卡命名法


#### 不推荐
``` html
<template>
  <the-component />
  <theComponent />
  <The-component />
</template>
```



#### 推荐
``` html
<template>
  <TheComponent />
</template>
```


### 单文件组件的顶级元素的顺序

**单文件组件应该总是让 `<script>`、`<template>` 和 `<style>` 标签的顺序保持一致。且 `<style>` 要放在最后，因为另外两个标签至少要有一个。**


#### 不推荐

``` html
<style>/* ... */</style>
<script>/* ... */</script>
<template>...</template>
```

``` html
<!-- ComponentA.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```



#### 推荐

``` html
<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```


### 单行元素内容前后换行


#### 不推荐

``` html
<div attr>content</div>

<tr attr><td>{{ data1 }}</td><td>{{ data2 }}</td></tr>

<div attr><!-- comment --></div>
```



#### 推荐

``` html
<div attr>
  content
</div>

<tr attr>
  <td>
    {{ data1 }}
  </td>
  <td>
    {{ data2 }}
  </td>
</tr>

<div attr>
  <!-- comment -->
</div>
```

## 属性和插值

### 不允许声明冗余变量

- 被[eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)包含在: `plugin:vue/essential`, `plugin:vue/strongly-recommended` 和 `plugin:vue/recommended`


#### 不推荐
``` html
<template>
  <ol v-for="i in 5"><!-- "i"被声明却未使用. -->
    <li>item</li>
  </ol>
</template>
```



#### 推荐
``` html
<template>
  <ol v-for="i in 5">
    <li>{{i}}</li><!-- "i"声明并使用. -->
  </ol>
</template>
```


### 等号两边不可存在空格

<p class="tip">`HTML5`允许等号两边的空格。但是无空格更易于阅读，并且可以更好地将实体组合在一起</p>


#### 不推荐
``` html
<div class = "item">
```



#### 推荐
``` html
<div class="item">
```


### 不允许多空格

- 被[eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)包含在: `plugin:vue/strongly-recommended` 和 `plugin:vue/recommended`


#### 不推荐
``` html
<div     class="foo"
      :style="bar"         />
```



#### 推荐
``` html
<div
  class="foo"
  :style="bar"
/>
```


### 不允许重复的属性

- 被[eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)包含在: `plugin:vue/essential`, `plugin:vue/strongly-recommended` 和 `plugin:vue/recommended`


#### 不推荐
``` html
<MyComponent
  :foo="def"
  foo="abc"
/>
```



#### 推荐
``` html
<MyComponent :foo="abc"/>
```


### 模板变量

- 被[eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)包含在: `plugin:vue/strongly-recommended` 和 `plugin:vue/recommended`


#### 不推荐
``` html
<div>{{   text   }}</div>
<div>{{text}}</div>
```



#### 推荐
``` html
<div>{{ text }}</div>
```


### 多行元素换行


#### 不推荐
``` html
<div>multiline
  content</div>

<div
  attr
>multiline start tag</div>

<tr><td>multiline</td>
  <td>children</td></tr>

<div><!-- multiline
  comment --></div>

<div
></div>
```



#### 推荐
``` html
<div>
  multiline
  content
</div>

<div
  attr
>
  multiline start tag
</div>

<tr>
  <td>multiline</td>
  <td>children</td>
</tr>

<div>
  <!-- multiline
       comment -->
</div>

<div
>
</div>

<div attr>singleline element</div>
```


### 多个特性的元素

- 被[eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)包含在: `plugin:vue/strongly-recommended` 和 `plugin:vue/recommended`

**多个特性的元素应该分多行撰写，每个特性一行。**

在 JavaScript 中，用多行分隔对象的多个属性是很常见的最佳实践，因为这样更易读。模板和JSX值得我们做相同的考虑。


#### 不推荐

``` html
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo">
```

``` html
<MyComponent foo="a" bar="b" baz="c"/>
```



#### 推荐

``` html
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
```

``` html
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```


### 模板中简单的表达式

**组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。**

复杂表达式会让你的模板变得不那么声明式。我们应该尽量描述应该出现的*是什么*，而非*如何*计算那个值。而且计算属性和方法使得代码可以重用。


#### 不推荐


``` html
fullName.split(' ').map(function (word) {
  return word[0].toUpperCase() + word.slice(1)
}).join(' ') 
```

#### 推荐

``` html
<!-- 在模板中 -->
{{ normalizedFullName }}
```

``` js
// 复杂表达式已经移入一个计算属性
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```


### 属性值使用双引号

- 被[eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)包含在: `plugin:vue/recommended`


#### 不推荐
``` html
<img src='./logo.png'>
<img src=./logo.png>
```



#### 推荐
``` html
<img src="./logo.png">
```


### 使用相同的缩进

- 被[eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)包含在: `plugin:vue/strongly-recommended` 和 `plugin:vue/recommended`


#### 不推荐
``` html
<template>
 <div class="foo">
   Hello.
    </div>
</template>
```



#### 推荐
``` html
<template>
  <div class="foo">
    Hello.
  </div>
  <div class="foo"
       :foo="bar"
  >
    World.
  </div>
  <div
    id="a"
    class="b"
    :other-attr="{
      aaa: 1,
      bbb: 2
    }"
    @other-attr2="
      foo();
      bar();
    "
  >
    {{
      displayMessage
    }}
  </div>
</template>
```


### 属性值排序

它们被划分为几大类，所以你也能知道新添加的自定义特性和指令应该放到哪里。

1. **定义** (提供组件的选项)
  - `is`

2. **列表渲染** (创建多个变化的相同元素)
  - `v-for`

3. **条件渲染** (元素是否渲染/显示)
  - `v-if`
  - `v-else-if`
  - `v-else`
  - `v-show`
  - `v-cloak`

4. **渲染方式** (改变元素的渲染方式)
  - `v-pre`
  - `v-once`

5. **全局感知** (需要超越组件的知识)
  - `id`

6. **唯一的特性** (需要唯一值的特性)
  - `ref`
  - `key`
  - `slot`

7. **双向绑定** (把绑定和事件结合起来)
  - `v-model`

8. **其它特性** (所有普通的绑定或未绑定的特性)

9. **事件** (组件事件监听器)
  - `v-on`

10. **内容** (覆写元素的内容)
  - `v-html`
  - `v-text`


#### 不推荐
``` html
<div
  ref="header"
  v-for="item in items"
  v-once
  id="uniqueID"
  v-model="headerData"
  my-prop="prop"
  v-if="!visible"
  is="header"
  @click="functionCall"
  v-text="textContent">
</div>
```



#### 推荐
``` html
<div
  is="header"
  v-for="item in items"
  v-if="!visible"
  v-once
  id="uniqueID"
  ref="header"
  v-model="headerData"
  my-prop="prop"
  @click="functionCall"
  v-text="textContent">
</div>
```

```html
<div
  v-for="item in items"
  v-if="!visible"
  prop-one="prop"
  :prop-two="prop"
  prop-three="prop"
  @click="functionCall"
  v-text="textContent">
</div>
```


### Prop名大小写

- 被[eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)包含在: `plugin:vue/strongly-recommended` 和 `plugin:vue/recommended`

**在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和JSX中应该始终使用 kebab-case。**

我们单纯的遵循每个语言的约定。在 JavaScript 中更自然的是 camelCase。而在 HTML 中则是 kebab-case。


#### 不推荐

``` js
props: {
  'greeting-text': String
}
```

``` html
<WelcomeMessage greetingText="hi"/>
```



#### 推荐

``` js
props: {
  greetingText: String
}
```

``` html
<WelcomeMessage greeting-text="hi"/>
```

### 完整单词的组件名

**组件名应该倾向于完整单词而不是缩写。**

编辑器中的自动补全已经让书写长命名的代价非常之低了，而其带来的明确性却是非常宝贵的。不常用的缩写尤其应该避免。


#### 不推荐

```
components/
|- SdSettings.vue
|- UProfOpts.vue
```

#### 推荐

```
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```
