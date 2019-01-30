<!--
 -  2019/1/18  lize
 -->
<template>

  <div>

    <div class="weui_msg">

      <div class="weui_icon_area">

        <i class="weui_icon_info weui_icon_msg"></i>

      </div>

      <div class="weui_text_area">

        <h4 class="weui_msg_title">{{$store.state.hintStr}}</h4>

      </div>

    </div>

    <van-button v-if = "!$store.state.isgetUserInfo" class = "btn" block type="primary" size="normal" @click = "linkToIndex($route.query.path)">

      <span>前往{{$route.query.title}}</span>

  </van-button>

  </div>

</template>

<script>
    var FromPage = null;

    export default {
        data () {
            return {

                flag:false,

            }
        },
        mounted () {

          this.initialize();

        },
        beforeRouteEnter(to, from, next) {

            FromPage = from;

            next();

        },
        methods: {

          initialize(){

            if(this.$store.state.isgetUserInfo){

              this.$store.state.hintStr = "请在移动端打开连接";

            }

          },
          linkToIndex(path){

            this.$store.state.hintStr = null;

            this.$store.state.isgetUserInfo = true;

            if(!path){

              this.$router.push('/');

            }else{

              this.$router.push({path:path,query:FromPage.query});

            }

          }

        }

    }
</script>

<style scoped lang="scss">
  .btn{

    background: #4875AE;

    color: #ffffff;

    width: 90%;

    margin: 50px auto;

  }
  .weui_icon_info:before {

    color: #4875AE;

  }
</style>
