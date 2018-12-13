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

    }

  ]
  
})
