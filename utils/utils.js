/**
 *  2018/10/17  lize
 */
const glob = require("glob");
const PAGE_PATH = './src/view';  // 注意是./ 而不是../ 这可能和commen.js的加载有关系

module.exports = {
  getPages: () => {
    
    //  首先得到包含pages文件夹里面符合条件的路径数组
    let entryHtml = glob.sync(PAGE_PATH + '/*/*.html');
    
    console.log(entryHtml,'entryHtmlentryHtmlentryHtml')
    
    //  pages就是vue.config.js里面pages选项的值，是一个对象
    let pages = {};
    
    //  遍历得到的路径数组，从字符串中分割出需要的页面名字
    entryHtml.forEach((filePath) => {
      let fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'));
      
      //  组建pages需要的值
      pages[fileName] = {
        entry: `src/view/${fileName}/${fileName}.js`,
        template: `src/view/${fileName}/${fileName}.html`,
        filename: `${fileName}.html`
      }
    });
    
    console.log(pages)
    return pages;
  }
};

