/**
 *  2018/12/13  lize
 */
export default {

  path:'/pageIndex',

  component : (e) =>{ require(['../page/index'],e)},

  redirect:'/pageIndexContent',

  children:[

    {

      path:'/pageIndexContent',

      component:(e) =>{require(['../components/pageIndex/index'],e)}

    },
    {

      path:'/pageIndexContent1',

      component:(e) =>{require(['../components/pageIndex/index1'],e)}

    },
    {

      path:'/pageIndexContent2',

      component:(e) =>{require(['../components/pageIndex/index2'],e)}

    },
    {

      path:'/pageIndexContent3',

      component:(e) =>{require(['../components/pageIndex/index3'],e)}

    },

  ]

}
