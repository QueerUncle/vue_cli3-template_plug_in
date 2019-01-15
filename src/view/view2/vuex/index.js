/**
 *  2018/12/24  lize
 */
import Vue from 'vue';

import vuex from 'vuex'

Vue.use(vuex);

export default new vuex.Store({
  
  state:{
    
    count:0
    
  },
  mutations: {
    
    //添加移除class
    inputAddAndRemoveClass (state,asdasd) {
  
      state.count++;
      
      if(asdasd.flag){

        asdasd.this.$refs[asdasd.refName].classList.add(asdasd.className);

      }else{
  
        asdasd.this.$refs[asdasd.refName].classList.remove(asdasd.className);

      }
      
    }
    
  }
  
})
