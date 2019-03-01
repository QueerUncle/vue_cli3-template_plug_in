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

                  title:"项目驾驶舱",

                  select:false,

                  children:[

                    {

                      title:'进度列表',

                      href:'',

                      select:false,

                      router:'',

                      children:[

                        {

                          title:'主合同台账',

                          router:'/pageIndexContent1',

                          select:false,

                          href:'',

                          children:[],

                        },
                        {

                          title:'补充合同',

                          router:'/pageIndexContent3',

                          select:false,

                          href:'',

                          children:[],

                        },
                        {

                          title:'费用台账',

                          router:'/pageIndexContent2',

                          select:false,

                          href:'',

                          children:[],

                        },
                        {

                          title:'几本台账',

                          router:'/pageIndexContent3',

                          select:false,

                          href:'',

                          children:[],

                        },

                      ],

                    },
                    {

                      title:'是地方撒地方',

                      href:'',

                      select:false,

                      router:'',

                      children:[

                        {

                          title:'1',

                          router:'/pageIndexContent2',

                          select:false,

                          href:'',

                          children:[],

                        },

                      ],

                    },

                  ],

                },
                {

                  icon:'icon-yigoupingtai',

                  title:"项目首页",

                  select:false,

                  children:[

                    {

                      title:'首页列表',

                      href:'',

                      select:false,

                      router:'',

                      children:[

                        {

                          title:'2',

                          router:'',

                          href:'view2',

                          select:false,

                          children:[],

                        }

                      ],

                    }

                  ],

                },
                {

                  icon:'icon-xiaoxi',

                  title:"多方协同",

                  select:false,

                  children:[

                    {

                      title:'协同列表',

                      href:'',

                      select:false,

                      router:'',

                      children:[

                        {

                          title:'3',

                          router:'/pageIndexContent2',

                          select:false,

                          href:'',

                          children:[],

                        }

                      ],

                    }

                  ],

                },
                {

                  icon:'icon-tongyongpeizhi',

                  title:"香米设计",

                  select:false,

                  children:[

                    {

                      title:'相聚列表',

                      href:'',

                      select:false,

                      router:'',

                      children:[

                        {

                          title:'4',

                          router:'/pageIndexContent2',

                          select:false,

                          href:'',

                          children:[],

                        }

                      ],

                    }

                  ],

                },
                {

                  icon:'icon-yigoupingtai',

                  title:"项目招财",

                  select:false,

                  children:[

                    {

                      title:'招财列表',

                      href:'',

                      select:false,

                      router:'',

                      children:[

                        {

                          title:'5',

                          router:'/pageIndexContent1',

                          select:false,

                          href:'',

                          children:[],

                        }

                      ],

                    }

                  ],

                },
                {

                  icon:'icon-xiaoxi',

                  title:"动态成本",

                  select:false,

                  children:[

                    {

                      title:'成本列表',

                      href:'',

                      select:false,

                      router:'/pageIndexContent3',

                      children:[],

                    },
                    {

                      title:'成本列表2',

                      href:'',

                      select:false,

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
