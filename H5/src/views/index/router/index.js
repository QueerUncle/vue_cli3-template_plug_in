/**
 *  2019/1/11  lize
 */
import Vue from 'vue'

import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  
  routes:[
  
    {
      
      path: '/',
      
      meta:{
        
        title:/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? '中设调查 - - 首页' : '提示页'
        
      },
  
      component:() => /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? import('../pages/getUserInfo.vue') :  import('../pages/hintTem.vue')
      
    },
    {
    
      path:'/answerSheet',
  
      meta:{
    
        title:'答题页'
    
      },
    
      component:() =>import('../pages/answerSheet.vue')
    
    },
    {
    
      path:'/hintTem',
    
      meta:{
      
        title:'中设调查 - - 提示页'
      
      },
    
      component:() =>import('../pages/hintTem.vue')
    
    },
  
  ]

})
