# 前端工程化
前端工程化在不同阶段可以有不同的理解。

- 单人开发，用一些工具来提升自己的开发效率，这是工程化最初的阶段（工具化）
- 多人协同开发的时候，大家需要约定一些规范，所有人都需要遵守（规范化）
- 当协同规模再大一些，规范的落地变得困难，通过一个流程的方式来保障规范的执行（流程化）
- 当协同人员数量到几百甚至几千，就会形成一个小技术圈子，开始出现能力的重复建设和内耗，这个时候需要对日常研发过程中的所需能力进行分层，抽象出来的基础能力通过某个平台来承载，其它业务或团队定制部分基于抽象出来的能力进行二次开发（中台化）。

工具化——规范化——流程化——中台化是不同团队规模阶段的不同工程实践方向。

前端工程化没有一个明确的定义，但是可以肯定的是：一切能提高前端开发效率，提高前端应用质量的手段和工具都是前端工程化。

### 前端工程化的优势：
- 极大的提高开发效率
- 降低大型项目的开发难度
    前端工程化提倡**模块化、组件化**

    模块化的思想：将大型项目按功能拆解成一个个独立的模块。基于版本控制工具 git，多个开发者并行开发，提高开发效率。项目在后期迭代的时候，每个模块相互独立，耦合性低。

    前端工程化提倡用完善的流程规范和代码规范来保证应用的质量和可维护性

    使用 ESlint 对代码进行自动校验，通过评审、详细设计、开发、联调、测试、上线等每个环节的控制，确保项目的高质量和按时交付。向主分支合并代码必须经过 code review。
因此，**前端工程化可以更好的规避风险，分散流程压力，降低开发难度**。


前端工程化有四个特点：模块化、组件化、自动化、规范化。

### 模块化
模块化就是将一个大文件拆分成一个个小文件，再进行统一的拼装和加载。
- JS 模块化
    ES6 之前，JS 没有模块系统。社区中制定了一些模块加载方案，比如 CommonJS AMD CMD
    ES6在语言层面上规定了模块系统
- CSS 模块化
    虽然 Sass Less Stylus 等预处理器实现了 CSS 的拆分，但没有解决 CSS 模块化的**选择器全局污染**的问题
    理论上来说，一个模块化的文件要隐藏内部作用域，只暴露少量接口给使用者。而按照目前预处理器的方式，导入一个 CSS 模块之后，已存在的样式有被覆盖的风险。虽然重写样式是 CSS 的一个优势，但这不利于多人协作。
    为了避免全局选择器的冲突，各大公司制定了 CSS命名风格（规则）
    - BEM 风格
    - 。。。
    但这些都是弱约束。工具层面，社区创造出 CSS in JS 和 CSS Modules 等解决方案。
    - CSS in JS 彻底抛弃 CSS, 使用 JS 或 JSON来写样式。这种方式过于激进，不能利用现有的 CSS 技术，处理伪类等问题困难
    - CSS Modules 仍然使用 CSS,用 JS 来管理依赖。能够最大化的结合 CSS 生态和 JS 模块化能力，是目前最佳的解决方案。
- 资源的模块化
    资源模块化后的好处
    - 依赖关系单一化
    - 资源处理集成化
    - 项目结构清晰化

### 组件化

组件化≠模块化
模块化是文件层面，对代码或资源的拆分
组件化是设计层面，对 UI （用户界面）的拆分
从 UI 拆分下来的每个包含模板 + 样式 + 逻辑功能的结构单元，称之为组件

### 规范化
模块化和组件化确定了开发模型，而这些东西的实现就需要规范去落实。
项目初期规范制定的好坏直接影响后期的开发质量。

例如：
- 目录结构的制定
- 编码规范
- 前后端接口规范
- 文档规范
- 组件管理
- Git分支管理
- Commit描述规范
- 定期CodeReview
- 视觉图标规范

### 自动化
任何简单机械的重复劳动都应该让机器完成
- 图标合并
- 持续集成
- 自动化构建
- 自动化部署
- 自动化测试