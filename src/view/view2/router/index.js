/**
 *  2018/10/17  lize
 */
import Vue from 'vue'

import Router from 'vue-router'

import giftest from '../components/gifAnmition'

Vue.use(Router)

export default  new Router({

  routes:[

    {

      path: '/',

      component:(resolve) =>{ import('../components/iviewTree').then(e => resolve(e))},

      // component:(resolve) =>{ require(['../components/iviewTree'],resolve)},

      // component: iviewTree,

    },

    {

      path: '/iviewTree',

      component: (e) => require(['../components/iviewTree'],e),
    },
    {
      path:'/inputTest',

      component: (e) => require(['../components/inputTest'],e),

    },
    {

      path:'/giftest',

      component: (e) => require(['../components/gifAnmition'],e)

    },
    {

      path:'/buttonCss',

      component: (e) => require(['../components/buttonCss'],e)

    },
    {
    
      path:'/splitTemplate',
    
      component: () => import('../components/spiltTemplate')
    
    },
    {
    
      path:'/calendar',
    
      component: () => import('../components/calendar')
    
    },
    {
    
      path:'/canvas',
    
      component: () => import('../components/canvas')
    
    },
    {
    
      path:'/muse',
    
      component: () => import('../components/muse')
    
    },
    {
    
      path:'/transitionTemplate',
    
      component: () => import('../components/transitionTemplate')
    
    },
    {
    
      path:'/elementuiTree',
    
      component: () => import('../components/elementuiTree')
    
    },
    {
    
      path:'/phaser',
    
      component: () => import('../components/phaser')
    
    },
    {
    
      path:'/cbimtree',
    
      component: () => import('../components/cbimtree')
    
    },
    {
    
      path:'/iviewRenderTable',
    
      component: () => import('../components/iviewRenderTable')
    
    },
    {
    
      path:'/chdckedBoxTemplate',
    
      component: () => import('../components/chdckedBoxTemplate')
    
    },
    
  ]
  
})
