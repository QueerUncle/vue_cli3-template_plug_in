/**
 *  2018/10/17  lize
 */
import Vue from 'vue'

import Router from 'vue-router'

import Home from '../views/home.vue'

Vue.use(Router)

export default  new Router({
  
  mode:'history',
  
  base:process.env.BABEL_ENV,
  
  routes:[
    
    {
      path:'',
      
      component:Home
      
    }
  ]
  
})
