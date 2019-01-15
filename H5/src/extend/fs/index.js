/**
 *  2019/1/11  lize
 */

import pinyinUnicode from './pinyinUnicode'

const fs = {
  //调用方法
  transitionNum(params){
    
    let result = '';
    
    if(typeof params == "number"){
      
      result =  fs.toChinesNum(params)
      
    }else{
  
      result =  fs.ChineseToNumber(params)
      
    }
    
    return result;
    
  },
  //汉字转数字
  ChineseToNumber(chnStr){
  
    let chnNumChar = {
      零:0,
      一:1,
      二:2,
      三:3,
      四:4,
      五:5,
      六:6,
      七:7,
      八:8,
      九:9
    };
  
    let chnNameValue = {
      
      十:{value:10, secUnit:false},
      
      百:{value:100, secUnit:false},
      
      千:{value:1000, secUnit:false},
      
      万:{value:10000, secUnit:true},
      
      亿:{value:100000000, secUnit:true}
      
    };
  
    let rtn = 0;
    
    let section = 0;
    
    let number = 0;
    
    let secUnit = false;
    
    let str = chnStr.split('');
  
    for(let i = 0; i < str.length; i++){
      
      let num = chnNumChar[str[i]];
      
      if(typeof num !== 'undefined'){
        
        number = num;
        
        if(i === str.length - 1){
          
          section += number;
          
        }
        
      }else{
        
        let unit = chnNameValue[str[i]].value;
        
        secUnit = chnNameValue[str[i]].secUnit;
        
        if(secUnit){
          
          section = (section + number) * unit;
          
          rtn += section;
          
          section = 0;
          
        }else{
          
          section += (number * unit);
          
        }
        
        number = 0;
        
      }
      
    }
    
    return rtn + section;
   
  },
  //数字转汉字
  toChinesNum(num){
  
    let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    
    let unit = ["", "十", "百", "千", "万"];
    
    num = parseInt(num);
    
    let getWan = (temp) => {
      
      let strArr = temp.toString().split("").reverse();
      
      let newNum = "";
      
      for (let i = 0; i < strArr.length; i++) {
        
        newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
      
      }
      
      return newNum;
      
    };
    
    let overWan = Math.floor(num / 10000);
    
    let noWan = num % 10000;
    
    if (noWan.toString().length < 4) noWan = "0" + noWan;

    return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
    
  },
  // 汉字转拼音
  ConvertPinyin(l1){
    
    let l2 = l1.length;
    
    let I1 = "";
    
    let reg = new RegExp('[a-zA-Z0-9\- ]');
    
    for (let i = 0; i < l2; i++) {
      
      let val = l1.substr(i, 1);
      
      let name = fs.arraySearch(val, pinyinUnicode);
      
      if (reg.test(val)) {
        
        I1 += val;
        
      } else if (name !== false) {
        
        I1 += name;
        
      }
      
    }
    
    I1 = I1.replace(/ /g, '-');
    
    while (I1.indexOf('--') > 0) {
      
      I1 = I1.replace('--', '-');
      
    }
    
    return I1;
    
  },
  // 在对象中搜索
  arraySearch(l1, pinyinUnicode){
    
    for (let name in pinyinUnicode) {
      
      if (pinyinUnicode[name].indexOf(l1) != -1) {
        
        return fs.ucfirst(name);
        
        break;
        
      }
      
    }
    
    return false;
    
  },
  // 首字母大写
  ucfirst(l1){
    
    let str = '';
    
    if (l1.length > 0) {
      
      let first = l1.substr(0, 1).toUpperCase();
      
      let spare = l1.substr(1, l1.length);
      
      str =  first + spare;
      
    }
    
    return str;
    
  }
  
};

export default fs
