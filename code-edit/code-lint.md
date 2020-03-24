# 代码检测规范

## 风格规范

采用 `Standard` 风格标准，具体规范指南：

* `Javascript` 检测：[JavaScript Standard Style](https://standardjs.com/)；
* `Vue.js` 风格检测：[Vue Style Guide](https://vuejs.github.io/eslint-plugin-vue/rules/)。

## 检测工具

使用 `ESlint` 工具及其套件

* 检测工具：
  * [eslint](https://www.npmjs.com/package/eslint)。
* 关联包：
  * [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)；
  * [eslint-plugin-node](https://www.npmjs.com/package/eslint-plugin-node)；
  * [eslint-plugin-promise](https://www.npmjs.com/package/eslint-plugin-promise)。
* 风格预设：
  * [eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard)；
  * [eslint-plugin-standard](https://www.npmjs.com/package/eslint-plugin-standard)；
  * [eslint-plugin-vue](https://vuejs.github.io/eslint-plugin-vue/user-guide/)：`Vue.js` 组件检测使用。

## 检测配置

### 基础配置

```javascript
// .eslintrc 取自 vue-cli3.0
{
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "standard"
  ],
  "rules": {},
  "parserOptions": {
    "parser": "babel-eslint"
  }
}
```

### `Vue.js` 项目配置

```javascript
// .eslintrc 取自 vue-cli3.0
{
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "@vue/standard",
    "plugin:vue/recommended"
  ],
  "rules": {},
  "parserOptions": {
    "parser": "babel-eslint"
  }
}
```

### 忽略不需检测文件

在项目根目录添加 `.eslintignore` 文件，填写需要忽略检测的文件夹。

\`\`\`bash {1} !.vuepress/ \# 在文件或文件夹前添加感叹号表示不忽略 node\_modules/ dist/ public/

```text
### 忽略不需检测代码

```js
// === 临时在一段代码中取消规则的检查 ===

/* eslint-disable */

// Disables all rules between comments
alert('foo');

/* eslint-enable */

// === 临时在一段代码中取消个别规则的检查（如no-alert, no-console）===

/* eslint-disable no-alert, no-console */

// Disables no-alert and no-console warnings between comments
alert('foo');
console.log('bar');

/* eslint-enable no-alert, no-console */

// === 在整个文件中取消检查 ===

/* eslint-disable */

// Disables all rules for the rest of the file
alert('foo');

// === 在整个文件中禁用某一项规则的检查===

/* eslint-disable no-alert */

// Disables no-alert for the rest of the file
alert('foo');

// === 针对某一行禁用eslint检查 ===

alert('foo'); // eslint-disable-line

// eslint-disable-next-line
alert('foo');

// === 针对某一行的某一具体规则禁用检查 ===

alert('foo'); // eslint-disable-line no-alert

// eslint-disable-next-line no-alert
alert('foo');

// === 针对某一行禁用多项具体规则的检查 ===

alert('foo'); // eslint-disable-line no-alert, quotes, semi

// eslint-disable-next-line no-alert, quotes, semi
alert('foo');
```

## 代码检测

### 编辑器实时检测

使用 `vscode` 编辑器并安装插件 [ESLint](https://github.com/CookX/fe-standard/tree/7a7861dda6f5f0676a26729f880269303623e254/frontend/standard/editor.html#eslint) 可实现实时检测。

#### 编辑器扩展\(VSCode\)

* 代码风格检查扩展：[ESlint（点击安装）](vscode:extension/dbaeumer.vscode-eslint)；
* 编辑器设置扩展：[EditorConfig for VS Code（点击安装）](vscode:extension/EditorConfig.EditorConfig)；
* 编辑器设置推荐：[编辑器相关推荐](https://github.com/CookX/fe-standard/tree/7a7861dda6f5f0676a26729f880269303623e254/frontend/standard/editor.html)。

#### 安装插件优点

* 自动根据项目 `.eslintrc` 配置文件进行代码检测；
* 自动更加项目 `.editorconfig` 文件设置编辑器；
* 实时检测和提醒代码风格问题；
* 早一步发现代码中一些不必要的错误；
* 帮助养成规范编码的习惯。

### `Webpack` 检测

在提供的开发模板中内置并默认启用（_具体配置请参照以下代码_）。

```javascript
// webpack.config.js配置文件

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        // 需要检测的文件夹
        include: [resolve('src'), resolve('test')],
        options: {
          // 以格式化后错误显示（错误更好看）
          formatter: require('eslint-friendly-formatter'),
          // 是否在页面上以overlay形式展示错误
          emitWarning: true
        }
      }
    ]
  }
}
```

### Git代码提交检测

使用的工具 [husky](https://www.npmjs.com/package/husky) 提供提交检查支持。_以下配置和工具会在脚手架中默认支持及启用。_

```javascript
{
  "script": {
    // vue-cli 3.0 之前
    "lint": "eslint --ext .js,.vue --ignore-path .gitignore ."
    // vue-cli 3.0 以后
    "lint": "vue-cli-service lint"
  },
  "husky": {
    "hooks": {
      // 提交验证
      "pre-commit": "npm run lint"
    }
  }
}
```

