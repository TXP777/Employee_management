const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
    //Implement on-demand packaging for antd; Pack according to import(use babel-plugin-import)
    fixBabelImports('import',{
        libraryName:'antd',
        libraryDirectory:'es',
        style: true ,//Automatically pack related styles
    }),

    //Use less-loader to re-specify the less variable in the source code
    addLessLoader({
        javascriptEnabled : true,
        modifyVars:{'@primary-color': '#1DA57A'},
    }),
);