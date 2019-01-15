<!--
 -  2018/12/13  lize
 -->
<template>
    <div class = "indexPage">

      <div class = "menuRegion">

        <!--<navigation :Color = "Color" :size = "Size" @on-toggle-page = "onTpgglePage" :MenuData = MenuData :MenuCoordinate = MenuCoordinate></navigation>-->

        <navigation @on-toggle-page = "onTpgglePage" :MenuData = MenuData :MenuCoordinate = MenuCoordinate :RouterConfig = RouterConfig></navigation>

      </div>

      <div class = "contentRegion">

        <router-view></router-view>

      </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {

              MenuData:[

                {

                  icon:'icon-tongyongpeizhi',

                  name:"项目驾驶舱",

                  selected:false,

                  children:[

                    {

                      name:'进度列表',

                      href:'',

                      selected:false,

                      router:'',

                      children:[

                        {

                          name:'主合同台账',

                          router:'/pageIndexContent1',

                          selected:false,

                          href:'',

                          children:[],

                        },
                        {

                          name:'补充合同',

                          router:'/pageIndexContent3',

                          selected:false,

                          href:'',

                          children:[],

                        },
                        {

                          name:'费用台账',

                          router:'/pageIndexContent2',

                          selected:false,

                          href:'',

                          children:[],

                        },
                        {

                          name:'几本台账',

                          router:'/pageIndexContent3',

                          selected:false,

                          href:'',

                          children:[],

                        },

                      ],

                    },
                    {

                      name:'是地方撒地方',

                      href:'',

                      selected:false,

                      router:'',

                      children:[

                        {

                          name:'1',

                          router:'/pageIndexContent2',

                          selected:false,

                          href:'',

                          children:[],

                        },

                      ],

                    },

                  ],

                },
                {

                  icon:'icon-yigoupingtai',

                  name:"项目首页",

                  selected:false,

                  children:[

                    {

                      name:'首页列表',

                      href:'',

                      selected:false,

                      router:'',

                      children:[

                        {

                          name:'2',

                          router:'',

                          href:'view2',

                          selected:false,

                          children:[],

                        }

                      ],

                    }

                  ],

                },
                {

                  icon:'icon-xiaoxi',

                  name:"多方协同",

                  selected:false,

                  children:[

                    {

                      name:'协同列表',

                      href:'',

                      selected:false,

                      router:'',

                      children:[

                        {

                          name:'3',

                          router:'/pageIndexContent2',

                          selected:false,

                          href:'',

                          children:[],

                        }

                      ],

                    }

                  ],

                },
                {

                  icon:'icon-tongyongpeizhi',

                  name:"香米设计",

                  selected:false,

                  children:[

                    {

                      name:'相聚列表',

                      href:'',

                      selected:false,

                      router:'',

                      children:[

                        {

                          name:'4',

                          router:'/pageIndexContent2',

                          selected:false,

                          href:'',

                          children:[],

                        }

                      ],

                    }

                  ],

                },
                {

                  icon:'icon-yigoupingtai',

                  name:"项目招财",

                  selected:false,

                  children:[

                    {

                      name:'招财列表',

                      href:'',

                      selected:false,

                      router:'',

                      children:[

                        {

                          name:'5',

                          router:'/pageIndexContent1',

                          selected:false,

                          href:'',

                          children:[],

                        }

                      ],

                    }

                  ],

                },
                {

                  icon:'icon-xiaoxi',

                  name:"动态成本",

                  selected:false,

                  children:[

                    {

                      name:'成本列表',

                      href:'',

                      selected:false,

                      router:'/pageIndexContent3',

                      children:[],

                    },
                    {

                      name:'成本列表2',

                      href:'',

                      selected:false,

                      router:'/pageIndexContent2',

                      children:[],

                    }

                  ],

                },
              ],

              MenuCoordinate:[5,1,0],

              RouterConfig:{

                view2:'view2.html'

              },

              Size:'Large',

              Color:'#ff5100',

//              Color:'#3e98ec',

            }
        },
        components:{

//          navigation:(e) =>{ require(['../components/common/Menu'],e)},

          navigation:() => import('../components/common/Menu')

        },
        mounted() {


        },
        methods: {

          //跳转回调
          onTpgglePage(e){

            console.log(e);

          }

        }
    }
</script>

<style scoped lang="scss">
.indexPage{

  width:100%;

  height:100%;

  .menuRegion{

    float: left;

  }
  .contentRegion{

    float: left;

    width: -webkit-calc(100%  - 206px);

  }

}
</style>
