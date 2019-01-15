/**
 *  2019/1/10  lize
 */
var a = {
  
  b:1,
  
  asdf(parent){
  
    parent.list.some(key =>{key.checked}) ? arr.push(parent) : '';
  
    for(let i = 0,iMax=arr.length; i<iMax; i++){
    
      let list = arr[i].list;
    
      if(list.length>0){
      
        for(let j = 0,jMax=list.length;j<jMax;j++){
        
          if(!list[j].checked){
          
            list.splice(j,1);
          
            jMax--;
          
            j--;
          
          }
        
        }
      
      }else{
      
        arr.splice(i,1);
      
        i--;
      
        iMax--;
      
      }
    
    }
    
  }
  
};

export default a

