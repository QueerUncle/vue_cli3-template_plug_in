/**
 *  2018/10/17  lize
 */
const glob = require("glob");

const fs = require("fs");

const path = require('path');

module.exports = {
  
  getPages(prefix){
    
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
  
    prefix = prefix ? prefix : '' ;
  
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

          confDemo[data.filename] = `${prefix}${data.filename}.html`;
          
        }
        
      }

    };
  
    fs.exists('./public',(publicxists) =>{
      
      let path = './public/RouterInfo.conf.json';
      
      if(publicxists){
        
        fs.writeFile(path,JSON.stringify({code:200,message:"",success:true,data:confDemo}),'utf8',(error) =>{
    
          if(error) return console.log(error);
          
        })
        
      }else{
        
        fs.mkdir('./public', (err) => {
    
          if (err) return console.error(err);
          
          fs.writeFile(path,JSON.stringify({code:200,message:"",success:true,data:confDemo}),'utf8',(error) =>{
      
            if(error) return console.log(error);
            
          })
    
        });
        
      }
      
    });
    
    console.log(pages,'这里是单页对象');

    console.log(confDemo,'这里是配置模板');
    
    return pages;
    
  }
  
};

