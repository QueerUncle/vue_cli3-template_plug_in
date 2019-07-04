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
  
    const globPathHtml = ["./src/**/index.html"]; // 入口模板正则
  
    const globPathJs = ["./src/**/main.js"]; // 入口脚本正则
  
    const splitArray = list => {
    
      let newAry = [];
    
      if (list.length > 0) {
      
        for (let entry of list) {
        
          entry = entry.substring(0, entry.lastIndexOf("/"));
        
          newAry.push(entry);
        
        }
      
      }
    
      return newAry;
    
    };
  
    const WriteFileFn = (src, path, writeContent) => {
    
      fs.exists(src, publicxists => {
      
        if (publicxists) {
        
          fs.writeFile(path, writeContent, "utf8", error => {
          
            if (error) return console.log(error);
          
          });
        
        } else {
        
          fs.mkdir(src, err => {
          
            if (err) return console.error(err);
          
            fs.writeFile(path, writeContent, "utf8", error => {
            
              if (error) return console.log(error);
            
            });
          
          });
        
        }
      
      });
    
    };
  
    const fileExist = (filePath)=>{
    
      return fs.existsSync(filePath,(exist) =>{
      
        return exist;
      
      })
    
    };
  
    const uniqueArr = (arr1,arr2) =>{
    
      let arr3 = arr1.concat(arr2);
    
      let arr4 = [];
    
      for(let i=0,len=arr3.length; i<len; i++) {
      
        if(arr4.indexOf(arr3[i]) === -1) {
        
          arr4.push(arr3[i])
        
        }
      
      }
    
      return arr4;
    
    };
  
    let iSError = false;
  
    let pages = {};
  
    let PageDetal = "";
  
    let PageCount = {};
  
    let confDemo = {};
  
    let PageNameList = [];
  
    let CBIMPACKAGECONF = { AllPAGEAGE: false };
  
    let fileHtmlList = splitArray(glob.sync(...globPathHtml));
  
    let fileJsList = splitArray(glob.sync(...globPathJs));
  
    CBIMPACKAGECONF = fs.readFileSync("./src/cbim.package.conf.json", "utf-8") ? JSON.parse(fs.readFileSync("./src/cbim.package.conf.json", "utf-8")) : CBIMPACKAGECONF;
  
    for (let entry of fileHtmlList) {
    
      if (fileJsList.indexOf(entry) >= 0) {
      
        if (!entry.includes("demo")) {
        
          let paths = entry + "/conf.json";
        
          let data = {
          
            "title": entry.split("/")[entry.split("/").length - 1],
          
            "filename": entry.split("/")[entry.split("/").length - 1],
          
            "description": entry.split("/")[entry.split("/").length - 1],
          
            "package": true,
          
          };
        
          if(fileExist(paths)){
          
            data = JSON.parse(fs.readFileSync(paths, "utf-8"));
          
          }else{
          
            fs.writeFile(paths, JSON.stringify(data), "utf8", error => {
            
              if (error) return console.log(error);
            
            });
          
          }
        
          if (!CBIMPACKAGECONF.AllPAGEAGE || !CBIMPACKAGECONF) {
          
            if (data.package == undefined) {
            
              data.package = true;
            
            }
          
            if ((data.package || data.package == undefined) && data.package != null) {
            
              if (!PageNameList.includes(data.filename)) {
              
                PageNameList.push(data.filename);
              
                pages[data.filename] = {
                
                  entry: `${entry}/main.js`,
                
                  template: `${entry}/index.html`,
                
                  filename: `${data.filename}.html`,
                
                  title: `${data.title}`
                
                };
              
                if(data.chunks && CBIMPACKAGECONF.chunks){
                
                  pages[data.filename].chunks = uniqueArr(data.chunks,CBIMPACKAGECONF.chunks).concat([data.filename]);
                
                }else{
                
                  if(data.chunks){
                  
                    pages[data.filename].chunks = data.chunks.concat([data.filename]);
                  
                  }else if(CBIMPACKAGECONF.chunks){
                  
                    pages[data.filename].chunks = CBIMPACKAGECONF.chunks.concat([data.filename])
                  
                  }
                
                }
                confDemo[data.filename] = `${data.filename}.html`;
              
                PageCount[entry.split("/")[entry.split("/").length - 1]] = data;
              
                PageDetal += "#### " + entry.split("/")[entry.split("/").length - 1] + "：" + data.title + "\n>`\n文件名：" + data.filename + "\n`\n\n>`\n文件描述：" + data.description + "\n`\n";
              
              } else {
              
                iSError = true;
              
                break;
              
              }
            
            }
          
          } else {
          
            if (!PageNameList.includes(data.filename)) {
            
              PageNameList.push(data.filename);
            
              pages[data.filename] = {
              
                entry: `${entry}/main.js`,
              
                template: `${entry}/index.html`,
              
                filename: `${data.filename}.html`,
              
                title: `${data.title}`
              
              };
            
              if(data.chunks && CBIMPACKAGECONF.chunks){
              
                pages[data.filename].chunks = uniqueArr(data.chunks,CBIMPACKAGECONF.chunks).concat([data.filename]);
              
              }else{
              
                if(data.chunks){
                
                  pages[data.filename].chunks = data.chunks.concat([data.filename]);
                
                }else if(CBIMPACKAGECONF.chunks){
                
                  pages[data.filename].chunks = CBIMPACKAGECONF.chunks.concat([data.filename])
                
                }
              
              }
            
              confDemo[data.filename] = `${data.filename}.html`;
            
              PageCount[entry.split("/")[entry.split("/").length - 1]] = data;
            
              PageDetal += "#### " + entry.split("/")[entry.split("/").length - 1] + "：" + data.title + "\n>`\n文件名：" + data.filename + "\n`\n\n>`\n文件描述：" + data.description + "\n`\n";
            
            } else {
            
              iSError = true;
            
              break;
            
            }
          
          }
        
        }
      
      }
    
    }
  
    if (iSError) {
    
      throw new Error("The page name is not unique");
    
    } else {
    
      let stringConfdemo = JSON.stringify({
      
        code: 200,
      
        success: true,
      
        message: "",
      
        data: confDemo
      
      });
    
      WriteFileFn("./public", "./public/RouterInfo.conf.json", stringConfdemo);
    
      WriteFileFn("./src/pages", "./src/pages/Page.description.md", PageDetal);
    
      console.log(pages, "这里是单页对象");
    
      console.log(confDemo, "这里是配置模板");
    
      return pages;
    
    }
    
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

