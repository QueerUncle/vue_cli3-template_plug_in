<!--
 -  2018/12/13  lize
 -->
<template>

  <div :class = "classs" >

    <div class = "classChunk" style="position: relative;height: 100%;">

      <div class = "IconWarp" style="height: 100%;" :class = " isCollapsed ? 'firstActive' : 'firstActiveFalse'" >

        <div class = "firstDiv" @mouseenter = "onmouseenter(index_first)" @mouseleave = "onmouseleave" :title = " isCollapsed ? item.title  : '' " v-for="(item,index_first) in MenuDataFn" :class = "index_first == active || hover == index_first ? `active${Colors}` : ''" @click = "transformModality(item,index_first,MenuDataFn)">

          <div style="height: 100%;width: 100%;">

            <i class = "iconfont iconi" :class = "item.icon"></i>

          </div>

        </div>

      </div>

      <div class = "TextWarp" style="height: 100%;" :class = "{TextWarpActive : isCollapsed}">

        <div @mouseenter = "onmouseenter(index_first)"  @mouseleave = "onmouseleave" :class = " hover == index_first ? `active${Colors}`: ``" v-if="!isCollapsed"   v-for="(item,index_first) in MenuDataFn"  @click = "transformModality(item,index_first,MenuDataFn)">

          <div :title = "item.title" class = "firstTitle" style="font-size: 14px; color: white;border-bottom: none">

            <span>{{item.title}}</span>

          </div>

        </div>

        <div v-if="isCollapsed" class = "unfoldDiv">

          <div v-if=" active < MenuDataFn.length " class = "firstTitle" style="font-size: 14px;cursor:auto">

            <span>{{MenuDataFn[active].title}}</span>

            <Icon v-if = "isCollapsed" style = "margin-left:6px;cursor: pointer;" @click.native="collapsedSider" class = "rotateIcon" type="md-menu" size="17"></Icon>

          </div>

          <div class = "secondLevel" v-if=" active < MenuDataFn.length ">

            <div  :class = "item.children.length<=0 && secondTouch ==index_second ?   `threeTouch${Colors}` : '' " v-for="(item,index_second) in MenuDataFn[active].children" @click = "chnagesecond(item,index_second,MenuDataFn[active].children)">

              <div style="overflow: hidden">

                <span style="float: left">{{item.title}}</span>

                <span style="float: right">

                  <Icon style = 'color:#7a7c8d;' :class ="{ rotate90 : secondTouch ==index_second}"  v-if="item.children && item.children.length>0" type="ios-arrow-forward" />

                </span>

                <!--<i v-if="item.children"></i>-->

              </div>

              <transition title="slide-fade">

                <ul class = "threelevel" v-if="secondTouch == index_second" >

                  <li :class = " threeTouch == index ? `threeTouch${Colors}` : '' " v-for="(i,index) in item.children" @click.stop = 'changeThree(i,index,item.children)'>

                    <span>{{i.title}}</span>

                  </li>

                </ul>

              </transition>

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

              isCollapsed:false, // 收起展开的按钮

              active:null,  //一级选中

              hover:null, //鼠标滑过

              secondTouch:null,  //二级选中

              threeTouch:null,  //三级选中

              color:'#3e98ec',  //主题颜色默认

              size:'Dafault', //默认大小

            }

        },
        props:['MenuData','MenuCoordinate','Size','Color','RouterConfig'],
        computed: {
          rotateIcon() {

            return [

              'menu-icon',

              this.isCollapsed ? 'rotate-icon' : ''

            ]

          },
          MenuDataFn(){

              let Coordinate = this.$props.MenuCoordinate;

              let MenuData = this.$props.MenuData;

              if(Coordinate && Coordinate.length>0){

                  if(MenuData && MenuData.length>0){

                      if(MenuData[Coordinate[0]]){

                        MenuData[Coordinate[0]].select = true;

                        if(MenuData[Coordinate[0]].children[Coordinate[1]]){

                          MenuData[Coordinate[0]].children[Coordinate[1]].select = true;

                          if(MenuData[Coordinate[0]].children[Coordinate[1]].children[Coordinate[2]]){

                            MenuData[Coordinate[0]].children[Coordinate[1]].children[Coordinate[2]].select = true;

                          }

                        }

                      }

                  }

              }

              if(!MenuData){

                MenuData = [];

              }

              return MenuData;

          },
          classs(){

              let Size = this.size;

              if(this.$props.Size){

                  Size = this.$props.Size;

              }

              return [

                `Menu${Size}`

              ]

          },
          Colors(){

              let Color = this.color;

              if(this.$props.Color){

                  Color = this.$props.Color;

              }

              return Color.split('#')[1];

          }
        },
        watch:{

          '$props.MenuCoordinate'(n){

            this.initialize(n);

          },

        },
        mounted() {

          this.initialize();

        },
        methods: {

          //初始化
          initialize(Coordinate){

            let MenuCoordinate = Coordinate ? Coordinate : this.$props.MenuCoordinate;

            if(MenuCoordinate && MenuCoordinate.length>0){

              this.active = MenuCoordinate[0] != undefined && MenuCoordinate[0] !=null && MenuCoordinate[0] !=="" && MenuCoordinate[0]>-1 ? MenuCoordinate[0] : null;

              this.active = this.active < this.MenuDataFn.length ? this.active : null;

              this.isCollapsed = this.active >=0 ? true : false;

              this.secondTouch = MenuCoordinate[1] !=undefined && MenuCoordinate[1] !=null && MenuCoordinate[1] !=="" &&  MenuCoordinate[1]>-1 ? MenuCoordinate[1] : null;

              this.threeTouch = MenuCoordinate[2]!=undefined &&  MenuCoordinate[2]!=null &&  MenuCoordinate[2]!=="" && MenuCoordinate[2]>-1 ? MenuCoordinate[2] : null;

            }

            console.log(this.active,this.secondTouch,this.threeTouch)

          },
          //点击展开二级菜单
          transformModality(item,index,parent){

            this.isCollapsed = true;

            this.active = index;

            this.secondTouch = null;

            this.threeTouch = null;

            this.reset(parent,index);

          },
          //点击收起二级菜单
          collapsedSider(){

            this.isCollapsed = false;

            this.active = null;

          },
          //点击二级菜单
          chnagesecond(item,index,parent){

            item.select = !item.select;

            this.secondTouch = item.children.length>0 ? item.select ? index : null : index ;

            this.linkTo(item,index,2);

            this.threeTouch = null;

            this.reset(parent,index);

          },
          //点击三级菜单
          changeThree(item,index,parent){

            this.threeTouch = index;

            this.linkTo(item,index,3);

            this.reset(parent,index);

          },
          //页面跳转
          linkTo(item,index,num){

            console.log(item,index);

            let path = "";

            let children = item.children;

            if(children.length<=0){

              console.log(children,'children');


              if((item.href && item.router) || (item.href && !item.router)){

                path = `${this.$props.RouterConfig[item.href]}${item.router}`;

                let obj = {

                  MenuCoordinate :[this.active,index,0],

                  data:item,

                };

                if(num ==2){

                  obj.MenuCoordinate = [this.active,index,0];

                }else if(num == 3){

                  obj.MenuCoordinate = [this.active,this.secondTouch,index];

                }

                this.$emit('on-toggle-page',obj);

                window.location.href = path;

              }else{

                path = item.router;

                let obj = {

                  MenuCoordinate :[this.active,this.secondTouch,index],

                  data:item,

                };

                if(num ==2){

                  obj.MenuCoordinate = [this.active,index,0];

                }else if(num == 3){

                  obj.MenuCoordinate = [this.active,this.secondTouch,index];

                }

                this.$emit('on-toggle-page',obj);

                this.$router.push({path:path,query:{ToIndex:this.active,secondTouch:this.secondTouch,threeTouch:index}});

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
          //处理非点击节点
          reset(parentAry,index){

            parentAry.forEach((i,v) =>{if(v!=index){i.select = false;}});

          }

        }

    }

</script>

<style scoped lang="scss">

  .MenuDafault{

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

        .firstDiv{

          width: 48px;

          height: 44px;

          text-align: center;

          .iconi{

            font-size: 16px;

          }

        }

      }

      .TextWarp{

        width: 98px;

        float: left;

        .unfoldDiv{

          padding: 0 6px;

        }

        .firstTitle {

          color: #a2a3b4;

          border-bottom: 1px solid #484b50;

          padding-left: 5px;

        }

        .secondLevel{

          margin-top: 8px;

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
    .TextWarpActive{

      width:124px!important;

      background: #34373d;

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

      background: -webkit-linear-gradient(#3c3f45,#1e2025); /* Safari 5.1 - 6.0 */

      background: -o-linear-gradient(#3c3f45,#1e2025); /* Opera 11.1 - 12.0 */

      background: -moz-linear-gradient(#3c3f45,#1e2025); /* Firefox 3.6 - 15 */

      background: linear-gradient(#3c3f45,#1e2025); /* 标准的语法 */

    }

  }

  .MenuLarge{

    width: 206px;

    height: 100%;

    color:white;

    background-image: linear-gradient(180deg, #3c3f45 0%, #1e2025 100%), linear-gradient(#22252a, #22252a);

    background-blend-mode: normal, normal;

    .classChunk{

      width: 206px;

      height: 56px;

      line-height:56px;

      cursor:pointer;

      .IconWarp{

        float: left;

        width: 79px;

        height: 100%;

        float: left;

        padding-left: 23px;

        .firstDiv{

          width: 56px;

          height: 56px;

          text-align: center;

          .iconi{

            font-size: 18px;

          }

        }

      }

      .TextWarp{

        width: 127px;

        float: left;

        .unfoldDiv{

          padding: 0 10px;

        }

        .firstTitle {

          color: #a2a3b4;

          border-bottom: 1px solid #484b50;

          padding-left: 7px;

        }

        .secondLevel{

          margin-top: 8px;

          font-family: MicrosoftYaHei;

          font-size: 12px;

          font-weight: normal;

          font-stretch: normal;

          line-height: 32px;

          letter-spacing: 0.1px;

          color: #ffffff;

          padding-left: 10px;

          .threelevel{

            padding-left: 20px;

            li{

              &:hover{

                color:#ff5100;

              }

            }

          }

        }

      }

    }

    .TextWarpActive{

      width:150px!important;

      background: #34373d;

      /*padding: 0 15px!important;*/

    }
    .firstActive{

      transition:padding-left 0.3s!important;

      -moz-transition:padding-left 0.3s!important; /* Firefox 4 */

      -webkit-transition:padding-left 0.3s!important; /* Safari and Chrome */

      -o-transition:padding-left 0.3s!important; /* Opera */

      width: 56px!important;

      padding-left: 0px!important;


    }
    .firstActiveFalse{

      transition:padding-left 0.3s!important;

      -moz-transition:padding-left 0.3s!important; /* Firefox 4 */

      -webkit-transition:padding-left 0.3s!important; /* Safari and Chrome */

      -o-transition:padding-left 0.3s!important; /* Opera */

      padding-left: 23px!important;

      background: -webkit-linear-gradient(#3c3f45,#1e2025); /* Safari 5.1 - 6.0 */

      background: -o-linear-gradient(#3c3f45,#1e2025); /* Opera 11.1 - 12.0 */

      background: -moz-linear-gradient(#3c3f45,#1e2025); /* Firefox 3.6 - 15 */

      background: linear-gradient(#3c3f45,#1e2025); /* 标准的语法 */

    }

  }

  .active3e98ec{

    background:#3e98ec!important;

  }

  .activeff5100{

    background:#ff5100!important;

  }

  .rotate-icon{

    transform: rotate(-90deg);

  }

  .rotate90{

    transform: rotate(90deg);
  }

  .threeTouch3e98ec{

    color:#3e98ec;

  }

  .threeTouchff5100{

    color:#ff5100;

  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }

</style>
