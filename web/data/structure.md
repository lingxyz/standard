# JavaScript 数据结构规范

## 数据类型及规范

### Boolean

值为 `true` 或者 `false`

`禁止以对象方式声明` 因为封包解包可能会带来意想不到的效果

```javascript
 // bad
 let bol = new Boolean(false)
 let bol2 = new Boolean(bol) // 意外的结果

 // good
 let bol = true
```

### Null

空值，表示这里什么都没有。

判断时使用三个等号，规避隐式转换的问题

```javascript
 let empty = null

 // bad
 empty == undefined // 意外的结果

 // good
 empty === null
```

### Undefined

声明并且未赋值的变量、调用没有 `return` 值的方法、调用不存在的属性获得该值

判断时使用三个等号，规避隐式转换的问题

```javascript
 let foo

 // bad
 foo == undefined

 // good
 foo === undefined
```

> 不建议用 `undefined` 直接量, 因为它可以被赋予其他的值, 并且各厂商实现方式不同, 请使用 `void 0` 或者自定义 `getUndefined()` 来获取

### Number

数字类型，包含 `整数` 和 `浮点数`

赋值应使用直接量

```javascript
 // bad
 let count = new Number(0)

 // good
 let count = 0
```

使用 `Number` 函数可以将 `String` 转换为 `Number`，参数不合法返回 `NaN`，非字符串参数会尝试先转换成字符串再转换数字

使用 `Number.parseInt` 函数将合法字符串转换为整数 `Number`，全部非法返回 `NaN` ，字符前部分包含合法数字则只转换合法部分

使用 `Number.parseFloat` 函数将合法字符串转换为浮点数 `Number`，全部非法返回 `NaN` ，字符前部分包含合法数字则只转换合法部分

### String

字符类型，用于处理字符串 文本

字符串应使用 `单引号字面量` 赋值，禁止使用 String 对象创建，规避解包封包问题

```javascript
 // bad
 let str = new String('hello world')
 str === 'hello world' // 意外的结果

 // good
 var str = 'hello world'
```

#### 关于 String 转换 Number

转换分为显示转换、显示隐式转换、隐示隐式转换

建议使用显示转换、显示隐式转换

```javascript
 var str = '100.2'
 // 显式转换
 Number.parseFloat(str)
 Number(str)


 // 显式隐式转换
 +str
 str * 1


 // 隐式隐式转换，会给 debug 增加难度
 str >> n
 str * n
 str / n
 str - n
```

## 常用对象及规范

### JSON

永远使用直接量创建 `JSON` 对象，避免使用 `new Object()` 声明。

`JSON` 中 `key` 应按照驼峰命名，

并且应当保证语义化与简洁

```javascript
 // bad
 let data = {
   "0": 0, // 虽然合法，但是以下 key 语义不明
   "_": "_",
   "$-1": ""
 }
 // good
 let data = {
   key: 'value',
   data: {
     powerList: [1, 2, 3]
   },
   code: 0
 }

 // 特殊情况
 let nameList = ['苹果', '苹果', '苹果', '雪梨', '雪梨', '雪梨', 1, 2, 3, 1, 2, 3]
 let counter = {
   "苹果": 3,
   "雪梨": 3,
   "1": 2,
   "2": 2,
   "3": 2,
 }
```

#### 拷贝 JSON

```javascript
var obj = {
 numb: 100
}

// bad
var obj2 = JSON.parse(JSON.stringify(obj)) // 会造成性能问题

// good
var obj2 = { 
  ...obj 
}

// 深拷贝请使用递归
```

#### 合并 JSON

```javascript
 let obj = {
   price: 100,
   name: 'tom'
 }
 let obj2 = {
   price: 80,
   age: 30
 }

 // bad
 for(let key in obj2) {
   obj[key] = obj2[key]
 }
 // normal
 Object.assign(obj, obj2)

 // good
 {
   ...obj,
   ...obj2
 }
```

#### 关于后端返回的 JSON 数据

后端返回 JSON 数据应严格按照上述要求，禁止夹带字符串格式的对象和数组

并且 key 应当用双引号包括

```javascript
 // bad
 {
   "someData": "{\"name\": 1, \"age\": 2}"
 }
 // bad
 {
   "someData": "[1, 2, 3]"
 }
 // bad
 {
   "非英文 KEY": "[1, 2, 3]"
 }
```

**为什么要给 key 加双引号包括?**

因为大括号还可以表示一个代码块

```javascript
 // 作为一个对象字面量
 let obj = {}

 // 作为一个代码块
 {
   alert('test')
   thisway: console.log('hello') // goto 节点
 }
```

考虑到 `JSPNP` 在 `key` 不加双引号的情况，

`key` 会对解释器造成困惑，因为 `key` : 有可能是一个 goto 的节点，

从而造成 { } 被认为是一个代码块执行。

`key` 被双引号包括后，解释器则明确知道，这是一个 `key`

### Array

数组，由于 `Array` 构造函数的参数存在不同的语义， 建议创建数组使用直接量

```javascript
 // bad
 let arr = new Array()
 // good
 let arr = []
```

#### 复制与合并

```javascript
let arr = [1, 2, 3]

// copy
let arr2 = [...arr]
// concat
let arr3 = [...arr2, ...arr]
```

### Error

JS 定义了六种类型的错误

* ReferenceError
* TypeError
* RangeError
* SyntaxError
* EvalError 
* URIError

  不建议操作原生 Error 对象

  需要抛出异常时，自定义异常对象

  ```javascript
  // bad
  throw '这里出现了已知的异常'

  // good
  class MyError extends Error {
  constructor(...args) {
    super(...args)
    this.otherData = {}
  }
  }

  throw new MyError('这里出现了已知的异常')
  ```

### NaN

表示 `not a number` ， 不等于任何值包括自己。

数字运算遇到非法数值时返回。

可以使用 `Number.isNaN` 方法判断是否 `not a number`

```javascript
 Number.isNaN('test') // true

 Number.isNaN(NaN) // true
```

但如果判断是否已经产生 `NaN` 的运算结果, 只能用不等于自己的方式判断

```javascript
 let foo = 'test' - 1 // NaN

 foo ===  foo // false
```

请不要在代码中赋 `NaN` 做任何用途

### Date

时间对象，可以传入时间戳、字符串获得对应的时间对象，无参数以浏览器时间为准

由于各浏览器厂商支持度，不建议直接传入 `各种格式的字符串` 转换时间对象。

```javascript
 // bad
 let date = new Date('yyyy/MM/dd hh:mm:ss')
 // bad
 let date = new Date('yyyy')
 // bad
 let date = new Date('yyyy/MM/dd')

 // good
 let date = new Date()
 // good
 let date = new Date(1541411873158)
 // good
 let date = new Date('yyyy-MM-dd hh:mm:ss')
```

### Promise

创建 `Promise` 时，传入构造函数的方法参数的定义应该为 `resolve` `reject`

```javascript
 // bad
 new Promise((ok, notOk) => {
   ...
 })
 // good
 new Promise((resolve, reject) => {
   ...
 })
```

禁止多层嵌套 `Promise`，操作父级的 `resolve` `reject`

```javascript
// bad
new Promise((resolve, reject) => {
  ...
  new Promise((resolve2, reject2) => {
    resolve()
  })
})
```

### Proxy

Proxy 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。

禁止对未定义的属性返回固定或随机的值

`get` `set` 必须成对出现

```javascript
// bad
var obj = {
  name: '',
  age: 100
}

var proxy = new Proxy(obj, {
    get(target, key) {
      return target[key] || 'safe value'
    }
})

obj.name
obj.other

// good
var obj = {
  name: '',
  age: 100
}

var proxy = new Proxy(obj, {
    get(target, key) {
      return target[key] || 'safe value'
    },
    set(target, key, value) {
      target[key] = value
    }
})

obj.name
obj.other
```

### Map

`Map` 是 键-值 对, 其中的键不只是字符串/原生类型, 也可以是对象

由于键可以是对象, 所以当对象销毁之后将无法再获值, 而值会一直存在于 `Map` 实例中

```javascript
let map = new Map()

// bad
map.set({a: 1}, true) // true 将无法再取出

// good
let keyObj = {a: 1}
map.set(keyObj, true)
```

### WeakMap

`WeakMap` 为 `Map` 变体, 当键值对象销毁时, `WeakMap` 会自动移除这个值

### Set

`Set` 是成员值唯一的列表, 通过 `add` `delete` `has` 插入， 移除, 判断是否存在

同 `Map` 一样, 如果成员对象被销毁, 将无法再判断是否拥有

```javascript
let set = new Set()

// bad
map.add({a: 1})
map.has({a: 1}) // false

// good
let keyObj = {a: 1}
map.add(keyObj)
map.has(keyObj) // true
```

### WeakSet

`WeakSet` 为 `Set` 变体, 当成员对象销毁时, `WeakSet` 会自动移除这个成员

## 前后端交互规范

返回数据模板

```javascript
{
  "code": 0, // 请求响应状态
  "message": "", // 请求出错时返回错误原因
  "data": {} // 返回的数据体, 可以是任意数据
}
```

关于状态的可能值

* `0` 请求正常返回
* `-1` 请求出错
* `-99` 未登录

