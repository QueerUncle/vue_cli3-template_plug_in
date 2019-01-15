/**
 *  2018/10/17  lize
 */
const glob = require("glob");

const fs = require("fs");

const path = require('path');

const PAGE_PATH = './src/view';  // 注意是./ 而不是../ 这可能和commen.js的加载有关系

module.exports = {
  
  getPages: () => {
    
    //  首先得到包含view文件夹里面符合条件的路径数组
    let entryHtml = glob.sync(PAGE_PATH + '/*/*.html');
    
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
  },
  getPagestwo: () => {
    
    let entryHtml = glob.sync('.' + PAGE_PATH + '/*/*');
    
    let pages = {};
    
    entryHtml.forEach((filePath) => {
      
      let fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
      
      if(!fileName.includes('.')){
        
        let paths = filePath+'/conf.json';
        
        let data = JSON.parse(fs.readFileSync(paths,'utf-8'));
        
        pages[data.filename] = {
          
          entry: `${filePath}/main.js`,
          
          template: `${filePath}/index.html`,
          
          filename: `${data.filename}.html`,
          
          title:`${data.title}`,
          
        };
        
      }
      
    });
    
    return pages;
    
  },
  asdasd:() =>{
    
    const [
      globPathHtml,
      globPathJs,
      pages,
      tempSet
    ] = [
      ['./src/**/index.html', 'template'], // 入口模板正则
      ['./src/**/main.js', 'entry'], // 入口脚本正则
      Object.create(null),
      new Set()
    ];
    const getMultiPageConf = (globPath, keyName) => {
      
      console.log(globPath,keyName,'333333333333333333')
      let [fileList, tempArr, modName] = [glob.sync(globPath), [], null]
      console.log(fileList,'fileListfileListfileListfileList')
      if (fileList.length !== 0) {
        for (let entry of fileList) {
          tempArr = path.dirname(entry, path.extname(entry)).split('/')
          
          console.log(tempArr,'999999999999999999999999');
          modName = tempArr[tempArr.length - 1];
          if (tempSet.has(modName)) {
            Object.assign(pages[modName], { [keyName]: entry, 'filename': `${modName}.html` })
          } else {
            Reflect.set(pages, modName, { [keyName]: entry }) && tempSet.add(modName)
          }
        }
        return true
      } else {
        if (keyName === 'template') {
          throw new Error('无法获取多页入口模板')
        } else if (keyName === 'entry') {
          throw new Error('无法获取多页入口脚本')
        } else {
          throw new Error('无法获取多页信息')
        }
      }
    }
    
    try {
      while (getMultiPageConf(...globPathHtml) && getMultiPageConf(...globPathJs)) return pages
    } catch (err) {
      console.log('获取多页数据错误：', err)
    }
    
    console.log(pages)
    
  },
  getPagesFn:() =>{
  
    const globPathHtml = ['./src/**/index.html']; // 入口模板正则
  
    const globPathJs = ['./src/**/main.js']; // 入口脚本正则
  
    const splitArray = (list) =>{
    
      let newAry = [];
    
      if(list.length>0){
      
        for(let entry of list){
        
          entry = entry.substring(0,entry.lastIndexOf('/'));
        
          newAry.push(entry);
        
        }
      
      }
    
      return newAry;
    
    };
  
    let pages = {};
  
    let confDemo = {};
  
    let fileHtmlList = splitArray(glob.sync(...globPathHtml));
  
    let fileJsList = splitArray(glob.sync(...globPathJs));
  
    for(let entry of fileHtmlList){
    
      if(fileJsList.indexOf(entry)>=0){
      
        if(!entry.includes('demo')){
        
          let paths = entry+'/conf.json';
        
          let data = JSON.parse(fs.readFileSync(paths,'utf-8'));
        
          pages[data.filename] = {
          
            entry: `${entry}/main.js`,
          
            template:`${entry}/index.html`,
          
            filename: `${data.filename}.html`,
          
            title:`${data.title}`,
          
          };
        
          confDemo[data.filename] = `${data.filename}.html`;
        
        }
      
      }
    
    };
  
    fs.exists('./public',(publicxists) =>{
    
      let path = './public/RouterInfo.conf.json';
    
      if(publicxists){
      
        fs.writeFile(path,JSON.stringify({data:confDemo}),'utf8',(error) =>{
        
          if(error) return console.log(error);
        
        })
      
      }else{
      
        fs.mkdir('./public', (err) => {
        
          if (err) return console.error(err);
        
          fs.writeFile(path,JSON.stringify(confDemo),'utf8',(error) =>{
          
            if(error) return console.log(error);
          
          })
        
        });
      
      }
    
    });
  
    console.log(pages,'这里是单页对象');
  
    console.log(confDemo,'这里是配置模板');
  
    return pages;
    
  },
  setConfig(){
  
    // fs.readdir('./', (err, files) => {
    //
    //    if (err) return console.log(err);
    //
    //    if(files.includes('public')){
    //
    //      fs.readdir('./public', (publicerr, publicfiles) => {
    //
    //        if (publicerr) return console.log(publicerr);
    //
    //        fs.writeFile('./public/conf.json',JSON.stringify(confDemo),'utf8',(error) =>{
    //
    //          if(error) return console.log(error);
    //
    //          console.log('写入成功');
    //
    //        })
    //
    //      })
    //
    //    }else{
    //
    //      console.log("没有public");
    //
    //      fs.mkdir('./public', function (err) {
    //
    //         if (err) return console.error(err);
    //
    //         console.log('目录创建成功');
    //
    //        fs.writeFile('./public/conf.json',JSON.stringify(confDemo),'utf8',(error) =>{
    //
    //          if(error) return console.log(error);
    //
    //          console.log('写入成功');
    //
    //        })
    //
    //      });
    //
    //    }
    //
    // });
    
  }
};

