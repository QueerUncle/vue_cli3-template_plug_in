/**
 *  2019/1/11  lize
 */
import Vue from 'vue'

import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  
  routes:[
  
    {
      
      path:'/',
      
      meta:{
        
        title:'首页'
        
      },
  
      component:() =>import('../pages/getUserInfo.vue')
      
    },
    {
    
      path:'/answerSheet',
  
      meta:{
    
        title:'答题页'
    
      },
    
      component:() =>import('../pages/answerSheet1.vue')
    
    },
  
  ]

})
