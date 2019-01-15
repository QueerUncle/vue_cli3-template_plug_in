/**
 *  2018/12/13  lize
 */
import Vue from 'vue'

import Router from 'vue-router'

import pageIndex from './pageIndex'

Vue.use(Router)

export default new Router({

  routes:[

    {
      path:'/',

      redirect : '/pageIndex',

    },

    pageIndex,

  ],

})
