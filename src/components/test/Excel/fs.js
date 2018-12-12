/**
 *  2018/11/23  lize
 */
import Regular from './Regular_Tmplate'

const fs = {

  assemblyData(dataAry,regulationAry,succColor,errColor){

    let list = dataAry;

    let newAry = [];

    let newhead = list.splice(0,1);

    let hObj = {};

    //处理头部
    for(let i in newhead[0]){

      if(newhead[0][i].indexOf("（") >-1){

        let bef = newhead[0][i].substring(0,newhead[0][i].indexOf("（"));

        let aft = newhead[0][i].substring(newhead[0][i].indexOf("（"),newhead[0][i].length);

        newhead[0][i] = "<font color = 'red'>"+bef + "</font><br/>"+aft;

      }else if(newhead[0][i].indexOf("(") >-1){

        let bef = newhead[0][i].substring(0,newhead[0][i].indexOf("("));

        let aft = newhead[0][i].substring(newhead[0][i].indexOf("("),newhead[0][i].length);

        newhead[0][i] = "<font color = 'red'>"+bef + "</font><br/>"+aft;

      }

      if(!Regular.isChinese(i)){

        console.log(i);

        return "000000"

      }

      hObj[i] = i;

    }

    newhead.unshift(hObj)

    let head = newhead[0];

    let H = [];

    for( let i in head){

      H.push(i);

    }

    for( let i = 0; i<list.length; i++){

      let index = i;

      let Ary = [];

      let c = 0;

      //处理表格中的空值；
      for( let j = 0; j<H.length; j++){

        if(list[i][H[j]] == undefined){

          let t = JSON.stringify(list[i]).slice(1);

          let g = t.substring(0,t.length-1)

          let hj = g.split(',')

          let r = '"'+H[j]+'":'+ null;

          hj.splice(j,0,r);

          hj[0] = "{" + hj[0];

          hj[hj.length-1] = hj[hj.length-1] + "}"

          list[i] = JSON.parse(hj.join(","));

        }

      }

      //  变成二维数组并添加属性
      for(let km in list[i]){

        let obj = {

          name:list[i][km],

          key: km,

          row:index,

          col:c,

          color:succColor,

          flag:true,

          innerText:list[i][km],

        };

        let regObj = {

          name:list[i][km],

          col:obj.col,

          row:obj.row,

        };

        if(list[i][km]!=null){

          if(typeof list[i][km] == "number"){

            obj.name = Number(String(list[i][km]).replace(/\s+/g,""));

            obj.innerText = Number(String(list[i][km]).replace(/\s+/g,""));

            regObj.name = Number(String(list[i][km]).replace(/\s+/g,""));

          }else{

            obj.name = list[i][km].replace(/\s+/g,"");

            obj.innerText = list[i][km].replace(/\s+/g,"");

            regObj.name = list[i][km].replace(/\s+/g,"");

          }

        }

        let flag = fs.verifier(regulationAry,regObj)

        if(!flag){

            obj.color = errColor;

            obj.flag = false;

        }

        Ary.push(obj);

        c++;

      }

      newAry.push(Ary);

    }

    let obj = {

      tHead:newhead,

      tBody:newAry

    }

    return obj;

  },
  verifier(regulationAry,regobj){

    let name = regobj.name;

    let col = regobj.col;

    let row = regobj.row;

    let reg = [];

    let flag = true;

    if(regulationAry!=undefined && regulationAry!=null){

      for(let i = 0; i< regulationAry.length; i++ ){

        if(regulationAry[i].index == col){

          reg = regulationAry[i].reg;

          if(name!==null || name!=undefined){

            for( let j = 0; j<reg.length; j++){

              flag = Regular[reg[j].name](name);

            }

          }else{

            flag = false;

          }

        }

      }

    }

    return flag;

  },

  verifiers(regulationAry,regobj){

    let promise = new Promise((resolve, reject) =>{

      let name = regobj.name;

      let col = regobj.col;

      let row = regobj.row;

      let reg = [];

      let flag = true;

      if(regulationAry!=undefined && regulationAry!=null){

        for(let i = 0; i< regulationAry.length; i++ ){

          if(regulationAry[i].index == col){

            reg = regulationAry[i].reg;

            if(name!==null || name!=undefined){

              for( let j = 0; j<reg.length; j++){

                flag = Regular[reg[j].name](name);

              }

            }else{

              flag = false;

            }

          }

        }

        resolve(flag);

      }else{

        reject(new Error("出错啦！"))

      }

    })

    return promise

  }

}

export default fs;
