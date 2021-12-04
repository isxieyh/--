/**
 * 实现一个简单的commonjs 模块加载器，偏浏览器端的实现
 * 
 * 指导准则：COMMONJS 规范 -- mozila的一个工程师
 * 
 * 2 个部分：
 * 
 * 1、模块加载器：解析文件地址，有一个寻找的规则，目的是找到文件
 * 2、模块解析器：执行文件的内容的，Node 里面是使用了 v8 执行的
 * 
 */

class Module {
    constructor(moduleName,source) {
        // 暴露数据
        this.exports = {};
        // 保存一下模块的信息
        this.moduleName = moduleName;
        //缓存
        this.$cacheModule = new Map();
        //源代码
        this.source = source;
    }

    /**
     * require
     * 
     * useage: require('./a.js')
     * 
     * @param {string} moduleName 模块的名称，其实就是路径信息
     * @param {string} source 文件的源代码，因为省略了加载器部分的实现，所以这里直接传入文件源代码
     * 
     * @return {object} require 返回的结果就是 exports 的引用
     */
    require = (moduleName,source) => {
        //每一次require 都执行文件内容的话，开销太大，所以加载缓存
        if (this.$cacheModule.has(moduleName)) {
            return this.$cacheModule.get(moduleName).exports;
        }
        
        //创建模块
        const moudle = new Module(moduleName,source);

        //执行文件
        const exports = this.compile(module,source);

        //缓存
        this.$cacheModule.set(moduleName,moudle);

        //返回 exports
        return exports;
    }

    /**
     * $wrap  拼一个闭包出来，IIFE
     * 
     * @param {string} code 代码字符串
     */
    $wrap = (code) => {
        const wrapper =[
            'return (function (module, exports, require{',
            '\n});'
        ];

        return wrapper[0] + code + warpper[1];
    }

    /**
     * 简单实现一个能在浏览器跑的解释器 runInThisContext
     * 核心的点是要创建一个隔离的沙箱环境，来执行我们的代码
     * 
     * 隔离：不能访问闭包的变量，不能访问全局的变量，只能访问我们传入的变量
     * 
     * eval: 可以访问全局/闭包，但是需要解释执行，ES5之后，如果是间接使用eval
     *      ->(0,eval)('var a = b + 1');X
     * new Function: 不可以访问闭包，可以访问全局，只编译一次
     * with :with 包裹的对象，会被放到原型链的顶部，而且底层是通过in操作符判断的
     *      如果通过with塞入我们传入的数据
     *      不管是啥属性，都从我们塞入的对象取值，取不到就返回undefined，这样就永远不会访问全局的域
     * @param {string} code 代码字符串
     */
    $runInThisContext = (code) => {

    }

    /**
     * 执行文件内容，入参数是文件源代码字符串
     */
    compile = (moudle,source) => {
        //TODO
    }


}