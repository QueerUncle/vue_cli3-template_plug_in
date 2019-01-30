<!--
 -  2019/1/14  lize
 -->
<template>

  <div class = "getUserInfo">

    <van-notice-bar

      v-if = "testQueryList.length>0"

      style = "margin-top: 5px;"

      left-icon="volume-o">

      预祝中设数字技术股份有限公司年会圆满成功！！！

    </van-notice-bar>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style = "height:calc(100% - 50px)">

      <Type-list :testQueryList = testQueryList v-if="flag == false"></Type-list>

    </van-pull-refresh>

    <div class = "mack" v-if="flag"><van-loading class = "vanLoading"/></div>

  </div>

</template>

<script>

    export default {

        data () {

            return {

              popupVisible:false,

              flag:null,

              testQueryList:[],

              isLoading:false,


            }

        },
        beforeRouteLeave (to, from, next) {
          // 导航离开该组件的对应路由时调用
          // 可以访问组件实例 `this`
          to.meta.title = "中设调查 - - "+to.query.title;

          next();
        },
        mounted () {

            this.initialize();

        },

        components:{

            TypeList:() =>import('../components/typeList.vue')

        },

        methods: {

          initialize(){

            if(!this.$store.state.userInfo){

//              this.$dialog.confirm({
//
//                title: '提示',
//
//                message: '该应用想要获取您的用户信息，是否允许',
//
//                confirmButtonText:'允许'
//
//              }).then(() => {
//
//                this.getUserInfo();
//
//              }).catch(() =>{
//
//                this.flag = true;
//
//                setTimeout(() =>{
//
//                  this.flag = null;
//
//                  this.$dialog.confirm({
//
//                    title: '提示',
//
//                    message: '该应用想要获取您的用户信息，是否允许',
//
//                    confirmButtonText:'允许'
//
//                  }).then(() => {

                    this.getUserInfo();

//                  }).catch(() =>{
//
//                    this.flag = true;
//
//                    this.$store.state.hintStr = "无法获取您的用户信息";
//
//                    this.$store.state.isgetUserInfo = false;
//
//                    setTimeout(() =>{
//
//                      this.$router.push({path:'/hintTem',query:{title:this.$route.meta.title,path:this.$route.path}})
//
//                    },500);
//
//                  })
//
//                },1000);

//              })

            }else{

              this.flag = true;

              this.getTestQueryListAjax();

            }

          },

          linkTo(){

              this.$router.push('/answerSheet')

          },
          //获取试题列表
          getTestQueryListAjax(){

//            let url = "http://api.china-bim.org/mock/25/api/getVoteItemList";

//            let url = "/api/getVoteItemList";

            let url = process.env.VUE_APP_getVoteItemList;


            let data = {

                openid:this.$store.state.userInfo.id,

            };

            this.$http.post(url,data)

              .then((e) =>{

                  let now = new Date().getTime()

                  this.testQueryList = e.data.filter(item =>{return  item.startTime <= now} );

                  this.flag = false;

                  if(this.isLoading){

                    this.$toast({message:'刷新成功',duration:1500});

                    this.isLoading = false;

                  }


              })

              .catch(()=>{

                this.$store.state.hintStr = "服务器错误";

                this.$store.state.isgetUserInfo = false;

                this.$router.push({path:'/hintTem',query:{title:this.$route.meta.title,path:this.$route.path}})

              });

          },
          //下拉刷新
          onRefresh() {

            this.getTestQueryListAjax();

          },
          //获取用户信息
          getUserInfo(){

//            let url = "http://api.china-bim.org/mock/25/api/getUserInfo";

//            let url = "/api/getUserInfo";

            let url = process.env.VUE_APP_getUserInfo;

            this.$http.get(url)

              .then((e) =>{

                  this.$store.state.userInfo = e.data;

                  this.flag = true;

                  this.getTestQueryListAjax();

              })

              .catch(() =>{

                this.$store.state.hintStr = "服务器错误";

                this.$store.state.isgetUserInfo = false;

                this.$router.push({path:'/hintTem',query:{title:this.$route.meta.title,path:this.$route.path}})

              })

          },

          asad(){

            this.show = true;

          }

        }

    }
</script>

<style scoped lang="scss">
.mack{

  width: 100%;

  height:100vh;

  position: fixed;

  top: 0px;

  left: 0px;

  z-index: 100;

  /*background: rgba(0.5, 0.5, 0.5, 0.5);*/

  background: #ffffff;

  .vanLoading{

    position: fixed;

    top: 50%;

    left: 50%;

    transition: 0.3s ease-out;

    transform: translate3d(-50%, -50%, 0);

  }

}
</style>
