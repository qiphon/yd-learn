# 我的前端学习笔记

- 基础
- 前端架构能力
- 框架原理（webpack/vue2/vue3/react16.8+/ssr/redux/hooks/fiber）
- 学历 
- spa 、mpa 、spa + mpa 、 mpa -> spa
- 前端工程化
    - webpack gulp rollup tests CI/CD 代码缺陷检测 Linux  JS -> SHELL
    
- 性能优化
- css
- 前端跨界（nwjs/electron/iot/flutter/reactNative/PWA）
- C/C++ FOR Node 
- webkit 原理
- docker/k8s/deno/rust
- 数据结构和算法
- 前端图形学（游戏、数据可视化、3d、webrtc、web二进制）
- 设计模式&黑客安全（xss、CSRF、web渗透、靶机）
- 人工智能

    ```js
    {
        function init(){}
        init = 2 
        console.log(typeof init)   // number
    }
    console.log(typeof init)    // function

    ```

- 前端为什么要懂后端

    - 对系统来讲，前后端都不是孤立的
    - 前后端的合作很重要
    - 想做全栈，不明白后端就是一个笑话
    - 可以更快了解到问题的位置

- 前端与后端
    - 网络系统的演进
    - 前端与大前端
    - 后端都有啥
    - 前后端分离的意义

- 大前端语言和技术

    - ES5 ES6 ES7 ....                // 语言基础
    - HTML5 & CSS3                    // 页面基础
    - less & sass                     // css预编译
    - SVG & CANVAS & D3.js            // 图形可视化
    - webGL & three.js                // 3d 场景
    - CMD & AMD & CommonJS            // 语言标准
    - requireJS & SeaJS               // ES 模块化
    - coffeeScript & Typescript       // ES 语言风格库
    - Node & express & Koa            // node web 服务

- 需要前后分离的情况
    - 页面布局复杂，使用主题和样式
    - 需要较高的页面渲染效果
    - 前端页面中包含复杂的业务罗技
    - 页面需要渲染的数据量较大

- 典型应用场景
    - H5游戏
    - Native开发的移动APP
    - 浏览器插件
    - 微信小程序
    - Electron 开发的桌面应用
    - 各类大型网站 。。。

- 前后分离的意义
    - 前后端各司其职， 各有分工
    - 提高开发效率
    - 完美应对需求的变化
    - 增加代码的可维护性

- 接口交互形式
    - RESTful & graphQL
    - REST 是 “呈现状态转移（REpresentational State Transfer）” 的缩写，一种API 的架构风格，在客户端和服务端之间通过呈现状态的转移来驱动应用状态的演进
    - 使用 get 、post 、put、delete 这几种请求模式
    - get （select）从服务器抽取资源
    - post（create）在服务创建取资源
    - put （update）在服务更新取资源
    - delete（delete）在服务删除取资源

- 数据接口流程
    1. 定制接口         // 定义规范
    2. 前后台开发       // mock数据 、后端自测
    3. 联调            // 校验格式
    4. 提测            // 自动化测试

- 后端常用语言和方案
    - PHP (中小型网站为主)
    - Java 
    - c# （商业性语言，主要用于windows）
    - python 
    - go （Google发明）

- 世界上最好的语言 [PHP](php.net)
    - 开放源码，免费
    - 开发快捷，入门快
    - 跨平台，配置简单
    - 开源框架丰富
    - 面向对象
    - 多线程支持不好
    - 代码规范不统一
    - 语法不太严谨
    - 属于脚本语言，类 C 语言
    - 适合大中小型网站
    - 变量的生存周期是页面级的
    - LAMP 体系是绝配 （linux apache mysql php）

- 应用范围
    - 网站 
    - cms
    - 后台接口
    - 与前端结合紧密

- PHP 框架
    - thinkPHP
    - Yii
    - Laravel

- 宝刀不老 [Java](oracle.com/java/index.html)
    - 重量级开放语言
    - 面向对象
    - 强类型，动态语言
    - 跨平台，高移植性
    - 稳定，安全性高 (由于这个特定，Java被大量使用)
    - 各种类库十分丰富
    - Java 语言特性：
    - 适用各种应用开发
    - JavaSE、java EE、java ME
    - 编译性和解释性
    - 语言规范十分严格
    - 做前端开发常用 jsp

- Java适用范围
    - 大型网站的前后端
    - 后台服务
    - 桌面程序
    - 嵌入式
    - 追求安全和稳定的商业系统
    - 各种商业中间件

- Java 经典框架
    - struts
    - spring 家族
    - hibernate
    - mybatis (ibatis)

- 微软的亲儿子 C#
    - 微软公司发布
    - 安全稳定
    - 面向对象
    - 开发高效
    - 依赖 .NET Framework
    - 语言特性：
    - 在windows平台支持非常好
    - 强类型语言
    - 依赖 .NET Framework 虚拟机
    - 做前端开发常用 .NET ASP

- c# 适用范围
    - 网站系统
    - 后台服务系统
    - 桌面程序

- 万能胶 Python
    - 免费开源
    - 完全面向对象
    - 语法简洁清晰
    - 语言本身是可扩充的
    - 扩展类十分丰富
    - 某些情况下跨平台特性稍差
    - 语言特性：
    - 简单易学
    - 属于胶水语言
    - 解释性语言
    - 可以嵌入其他语言中
    - 运行速度快（仅次于c++）

- Python 适用范围
    - web 开发
    - 服务端后台
    - 图形、数学、文本处理功能强大
    - 桌面程序
    - 黑客比较喜欢

- 后起之秀 Go
    - Google亲儿子
    - 全新语言，后起之秀
    - 编译型语言
    - 运行速度接近 C 语言
    - 充满野心的语言，在浏览器端可能挑战js
    - 语言特性：
    - 编译和执行速度快
    - 静态类型语言
    - 支持完全垃圾回收
    - 支持多核CPU预算
    - 非常适合后端大型程序
    


- [options 请求 触发条件](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

    - 跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。

    1. 使用下面任意一种 http 方法
        - PUT/DELETE/CONNECT/OPTIONS/TRACE/PATCH
    2.  人为设置了以下集合之外首部字段：
        - Accept/Accept-Language/Content-Language/Content-Type/DPR/Downlink/Save-Data/Viewport-Width/Width
    3. Content-Type 的值不属于下列之一:
        - application/x-www-form-urlencoded、multipart/form-data、text/plain


## 优秀书籍

1. 你不知道JavaScript 上中下
2. 学习V8的好地方 https://v8.dev/blog/
3. HTML5 Canvas核心技术:图形、动画与游戏开发
4. Webkit技术内幕
5. 小灰算法之旅 
6. 大话数据结构 啊哈算法
7. 3D数学基础 图形与游戏开发
8. 函数式编程 https://github.com/MostlyAdequate/mostly-adequate-guide
9. 自制编译器 自制COU系列