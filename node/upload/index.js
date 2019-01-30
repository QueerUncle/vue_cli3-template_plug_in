/**
 *  2018/6/27  lize
 */
const fs = require('fs');

const path = require('path');

const FormData = require('form-data');

const SHA1 = require('../public/SHA');

const http = require('../public/axios');

exports.upload = function(option,callback){
  
  let userId = "534445901041635328";
  
  let EntCode = "306195346550165505";
  
  let config ={
  
    headers:{
  
      appid:global.con.Custom.SettlementAPIAppid,
  
      sign:'',
  
      ts:'',
  
      userId:userId,
  
      EntCode:EntCode,
  
      'Content-Type':'multipart/form-data;'
  
    }
    
  };
  
  let T =  new Date().getTime();
  
  let obj = {
    
    T:T,
    
    appKey:global.con.Custom.SettlementAPIKey,
    
    path:option.body.uri
    
  };
  
  SHA1.SHA1(obj,(r) => {
    
    config.headers.sign = r;
    
    config.headers.ts = T;
  
    const { path: filePath, originalFilename } = option.files.file;
  
    const newPath = path.join(path.dirname(filePath), originalFilename);
  
    fs.rename(filePath, newPath, function (err) {
    
      if (err) {
      
        return;
      
      } else {
      
        const file = fs.createReadStream(newPath);
      
        const form = new FormData();
      
        form.append('file', file);
      
        let hostname = global.con.Custom.SettlementServer;
      
        let path = option.body.uri;
      
        let url = hostname+path;
      
        config.headers['Content-Type'] = "multipart/form-data;boundary= "+form.getBoundary();
      
        http.post(url,form,config)
        
          .then((e) =>{
          
            callback ? callback(e) : console.log(e);
          
          })
        
          .catch((er) =>{
          
            callback ? callback(er) : console.log(er);
          
          })
      
      }
    
    })
    
  });
  
};
