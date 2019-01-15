<template>

  <div id = "app">

    <mt-header v-if="!flag" style="background: #000000" fixed :title="$route.meta.title">

      <router-link v-if ="$route.path!=='/'"  to="/" slot="left">

        <mt-button icon="back"></mt-button>

        <mt-button>close</mt-button>

      </router-link>

      <mt-button v-if ="$route.path!=='/'" icon="more" slot="right"></mt-button>

    </mt-header>

    <van-nav-bar

      v-if = "flag"

      style="background: #000000;color:#ffffff"

      :title="$route.meta.title"

      class="van-ellipsis"

      fixed

      right-text="按钮"

      @click-left="onClickLeft"

      >

      <van-icon style = "font-size: 24px;" name="ellipsis" slot="right" />

    </van-nav-bar>

    <router-view class = "ContentLayout"></router-view>

  </div>

</template>

<script>

  export default {

    data () {

      return {

        flag:true

      }

    },

    mounted () {

      let url = `./RouterInfo.conf.json`;

      let data = undefined;

      this.$http.get(url)

        .then((e) =>{

          console.log(e)

        })
        .catch((er) =>{

          console.log(er)

        });

      let url1 = './RouterInfo.conf1.json';

      this.$http.get(url1)

        .then((e) =>{

          console.log(e)

        })
        .catch((er) =>{

          console.log(er)

        });

      setTimeout(() =>{

        this.$cancel({url:url,data:data});

      },0);

      console.log(this.$fs.transitionNum("二百二十九"));

      console.log(this.$fs.ConvertPinyin("李泽"))

    },
    methods: {

      onClickLeft(){

          this.$router.go(-1);

      }

    }

  }
</script>

<style scoped lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
  background: #ffffff;
}
.van-icon,.van-nav-bar__text{

  color: #ffffff!important;

}
.van-nav-bar__title{

  max-width: 35%;

}
</style>
