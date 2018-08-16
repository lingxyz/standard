# 开发规范

- [命名规范](命名规范.md)
- [包结构规范](https://github.com/ecomfe/spec/blob/master/package.md)
- [项目目录结构规范](项目目录结构规范.md)
- [模块和加载器规范](模块和加载器规范.md)
- [HTML编码规范](HTML编码规范.md)
- [CSS编码规范](CSS编码规范md)
- [stylus编码规范](stylus编码规范.md)
- [JavaScript编码规范](JavaScript编码规范.md)
- [前后端数据传输标准](前后端数据传输标准.md)
- [Vue编码规范](Vue编码规范.md)
- [编辑器配置和构建检查](编辑器配置和构建检查.md)

- [Git版本管理规范](Git版本管理规范.md)

- [发布规范](发布规范.md)


参考资料：https://www.zhihu.com/question/28376083

草稿：
``关键点``

接口参数注释
方法、参数注释
变量注释
方法唯一性
变量唯一性

todo注释

stylus 不用冒号

1.readme
	目录结构
	quickstart
	开发 测试 部署
2.注释
	页面注释：每个文件html,css,js最上方 页面功能 作者 修改时间
	没写完的功能，加todo list
	每个小模块 加一句注释
3.空格/换行
	模块间 空1行
	tab代替四个空格
	一行末尾去除多余tab 空行
	文件最后一行空行 不要
4.原则：代码量越少越好 寻找最优解 能公用就不要再写一遍
5. Components
	用UI Components的项目 不要再自己写 除非无法满足需求
	用公用css cover Components
	页面的组件 在相应模块下创建components目录

7.编码规范：html css js vue stylus pug es6等 待更新
8.变量 常量首字母大写

9. 组件要以事业名开头 xsy