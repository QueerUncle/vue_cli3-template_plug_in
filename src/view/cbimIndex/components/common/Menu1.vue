<!--
 -  2018/12/13  lize
 -->
<template>

  <div class = "Menu">

    <div class = "classChunk" style="position: relative;height: 100%;">

      <div class = "IconWarp" style="height: 100%;" :class = " isCollapsed ? 'firstActive' : 'firstActiveFalse'" >

        <div @mouseenter = "onmouseenter(index_first)" @mouseleave = "onmouseleave" :title = " isCollapsed ? item.name  : '' " style="width: 48px;height: 44px; text-align: center" v-for="(item,index_first) in MenuData" :class = "{active:index_first == active || hover == index_first}" @click = "transformModality(item,index_first)">

          <div style="height: 100%;width: 100%;">

            <Icon color = "white" :type= "item.icon" />

          </div>

        </div>

      </div>

      <div class = "TextWarp" style="height: 100%;" :class = "{TextWarpActive : isCollapsed}">

        <div @mouseenter = "onmouseenter(index_first)"  @mouseleave = "onmouseleave" :class = "{active:hover == index_first}" v-if="!isCollapsed"   v-for="(item,index_first) in MenuData"  @click = "transformModality(item,index_first)">

          <div :title = "item.name" class = "firstTitle" style="font-size: 14px; color: white;border-bottom: none">

            <span>{{item.name}}</span>

          </div>

        </div>

        <div v-if="isCollapsed" style="padding: 0 6px;">

          <div v-if=" active < MenuData.length " class = "firstTitle" style="font-size: 13px;cursor:auto">

            <span>{{MenuData[active].name}}</span>

            <Icon v-if = "isCollapsed" style = "margin:0 10px;cursor: pointer" @click.native="collapsedSider" class = "rotateIcon" type="md-menu" size="17"></Icon>

          </div>

          <div class = "secondLevel" v-if=" active < MenuData.length ">

            <div  v-for="(item,index_second) in MenuData[active].children" @click = "chnagesecond(item,index_second)">

              <div style="overflow: hidden" :class = "{secondTouch : secondTouch ==index_second }">

                <span style="float: left">{{item.name}}</span>

                <span style="float: right">

                  <Icon style = 'color:#7a7c8d' :class ="{ rotate90 : secondTouch ==index_second}"  v-if="item.children && item.children.length>0" type="ios-arrow-forward" />

                </span>

                <!--<i v-if="item.children"></i>-->

              </div>

              <ul class = "threelevel" v-if="secondTouch == index_second">

                <li :class = "{threeTouch:threeTouch == index}" v-for="(i,index) in item.children" @click.stop = 'changeThree(i,index)'>

                  <span>{{i.name}}</span>

                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<script>

    export default {

        data() {

            return {

              isCollapsed:false,

              active:null,  //一级选中

              hover:null,

              secondTouch:0,  //二级选中

              threeTouch:0,  //三级选中

            }

        },
        computed: {

          rotateIcon() {

            return [

              'menu-icon',

              this.isCollapsed ? 'rotate-icon' : ''

            ]

          }

        },
        watch:{

          '$route.query.ToIndex'(n){

            if(n>=0){

              this.active = n;

            }

          },
          '$route.query.secondTouch'(n){

            if(n>=0){

              this.secondTouch = n;

            }

          },
          '$route.query.threeTouch'(n){

            if(n>=0){

              this.threeTouch = n;

            }

          },

        },
        mounted() {

          this.initialize();

        },
        methods: {

          //初始化
          initialize(){

            let parame = this.getUrlparame();

            let routeQuery = this.$route.query;

            this.active = routeQuery.ToIndex && routeQuery.ToIndex >= 0 ? routeQuery.ToIndex :

              parame.ToIndex && parame.ToIndex >= 0 ? parame.ToIndex : null;

            this.active = this.active < this.MenuData.length ? this.active : null;

            this.isCollapsed = this.active ? true : false;

            this.secondTouch = routeQuery.secondTouch && routeQuery.secondTouch >= 0 ? routeQuery.secondTouch :

              parame.secondTouch && parame.secondTouch >= 0 ? parame.secondTouch : null;

            this.threeTouch = routeQuery.threeTouch && routeQuery.threeTouch >= 0 ? routeQuery.threeTouch :

              parame.threeTouch && parame.threeTouch >= 0 ? parame.threeTouch : null;

            console.log(this.active,this.secondTouch,this.threeTouch)


          },
          //点击展开二级菜单
          transformModality(item,index){

            this.isCollapsed = true;

            this.active = index;

            this.linkTo(item,index);

          },
          //点击收起二级菜单
          collapsedSider(){

            this.isCollapsed = false;

            this.active = null;

          },
          //点击二级菜单
          chnagesecond(item,index){

            this.secondTouch = index;

            this.linkTo(item,index);

          },
          //点击三级菜单
          changeThree(item,index){

            this.threeTouch = index;

            this.linkTo(item,index);

          },
          //页面跳转
          linkTo(item,index){

            console.log(item);

            let path = "";

            let children = item.children;

            console.log(children,'length为：',children.length);

            if(children.length>0){

              let childNode =children[0];

              let childNodeList = children[0].children;

              console.log(childNodeList,'childNodeList',childNodeList.length)

              if(childNodeList.length>0){

                console.log('点击一级其该的二级有三级节点')
                //点击一级其他的二级有三级节点。
                if((childNodeList[0].href && childNodeList[0].router) || (childNodeList[0].href && !childNodeList[0].router)){

                  path = `${childNodeList[0].href}${childNodeList[0].router}`;

                  window.location.href = path;

                }else{

                  console.log('我只有router');

                  path = childNodeList[0].router;

                  this.$router.push({path:path,query:{ToIndex:index,secondTouch:0,threeTouch:0}});

                }

              }else{

                console.log('点击二级或者该一级的二级下没有节点');
                //点击二级或者该一级的二级下没有节点
                if((childNode.href && childNode.router) || (childNode.href && !childNode.router)){

                  path = `${childNode.href}${childNode.router}`;

                  window.location.href = path;

                }else{

                  path = childNode.router;

                  this.$router.push({path:path,query:{ToIndex:this.actice,secondTouch:index,threeTouch:0}});

                }


              }

            }else{

                console.log('三级')

              if((item.href && item.router) || (item.href && !item.router)){

                console.log('children==0，，，，，，href、router都存在')

                path = `${item.href}${item.router}`;

                    window.location.href = path;

                }else{

                console.log('children==0，，，，，，只存在router')

                path = item.router;

                this.$router.push({path:path,query:{ToIndex:this.actice,secondTouch:this.secondTouch,threeTouch:index}});

                }

            }

          },
          //鼠标移入
          onmouseenter(index){

            this.hover = index;

          },
          //鼠标离开
          onmouseleave(){

            this.hover = null

          },
          //解析url参数
          getUrlparame(){

            let search = window.location.search.replace('?','').split('&');

            let obj = {};

            for(let i = 0; i<search.length;i++){

              search[i] = search[i].split('=');

              obj[search[i][0]] = search[i][1];

            }

            return obj;

          },

        }

    }
</script>

<style scoped lang="scss">
  .Menu{

    width: 172px;

    height: 100%;

    color:white;

    background-image: linear-gradient(180deg, #3c3f45 0%, #1e2025 100%), linear-gradient(#22252a, #22252a);

    background-blend-mode: normal, normal;

    .classChunk{

      width: 172px;

      height: 44px;

      line-height:44px;

      cursor:pointer;

      .IconWarp{

        float: left;

        width: 74px;

        height: 100%;

        float: left;

        padding-left: 26px;

      }

      .TextWarp{

        width: 98px;

        float: left;

        .firstTitle {

          color: #a2a3b4;

          border-bottom: 1px solid #484b50;

          padding-left: 5px;

        }

        .secondLevel{

          font-family: MicrosoftYaHei;

          font-size: 12px;

          font-weight: normal;

          font-stretch: normal;

          line-height: 32px;

          letter-spacing: 0.1px;

          color: #ffffff;

          padding-left: 6px;

          .threelevel{

            padding-left: 20px;

            li{

              &:hover{

                 color:#46a6ff;

               }

            }

          }

        }

      }

    }

  }

  .TextWarpActive{

    width:124px!important;

    /*padding: 0 6px!important;*/

  }
  .firstActive{

    transition:padding-left 0.3s!important;

    -moz-transition:padding-left 0.3s!important; /* Firefox 4 */

    -webkit-transition:padding-left 0.3s!important; /* Safari and Chrome */

    -o-transition:padding-left 0.3s!important; /* Opera */

    width: 48px!important;

    padding-left: 0px!important;


  }
  .firstActiveFalse{

    transition:padding-left 0.3s!important;

    -moz-transition:padding-left 0.3s!important; /* Firefox 4 */

    -webkit-transition:padding-left 0.3s!important; /* Safari and Chrome */

    -o-transition:padding-left 0.3s!important; /* Opera */

    padding-left: 26px!important;

  }
  .active{

    background:#3e98ec!important;

  }

  .rotate-icon{

    transform: rotate(-90deg);

  }
  .rotate90{

    transform: rotate(90deg);
  }
  .secondTouch{

    color:orangered;

  }
  .threeTouch{

    color:#46a6ff;

  }
</style>
