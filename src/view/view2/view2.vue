<!--
 -  2018/10/17  lize
 -->
<template>
    <div>
      <h1>ivew2</h1>
      <a href="index.html">富文本编辑器</a>
      <a href="ccc.html">excel导入、导出</a>
      <a href="view1.html">CBIMPlayer</a>
      <a href="cbimIndex.html?ToIndex=0&secondTouch=1&threeTouch=0#/pageIndexContent?dddddd=0">CBIM2.0Test</a>
      <a href="javascript:;" @click = "linkTo('/giftest')">giftest</a>
      <a href="javascript:;" @click = "linkTo('/inputTest')">inputTest</a>
      <a href="javascript:;" @click = "linkTo('/iviewTree')">iviewTree</a>
      <a href="javascript:;" @click = "linkTo('/buttonCss')">buttonCss</a>
      <a href="javascript:;" @click = "linkTo('/splitTemplate')">splitTemplate</a>
      <a href="javascript:;" @click = "linkTo('/calendar')">calendar</a>
      <a href="javascript:;" @click = "linkTo('/canvas')">canvas</a>
      <a href="javascript:;" @click = "linkTo('/muse')">muse</a>
      <a href="javascript:;" @click = "linkTo('/transitionTemplate')">transitionTemplate</a>
      <a href="javascript:;" @click = "linkTo('/elementuiTree')">elementuiTree</a>
      <a href="javascript:;" @click = "linkTo('/phaser')">phaser</a>
      <a href="javascript:;" @click = "linkTo('/cbimtree')">cbimtree</a>
      <a href="javascript:;" @click = "linkTo('/iviewRenderTable')">iviewRenderTable</a>
      <a href="javascript:;" @click = "linkTo('/chdckedBoxTemplate')">chdckedBoxTemplate</a>
      <br/>
      <a href="javascript:;" @click = "linkTo('/elementModel')">elementModel</a>
      <a href="javascript:;" @click = "linkTo('/iviewUpload')">iviewUpload</a>
      <a href="javascript:;" @click = "linkTo('/elementTable')">elementTable</a>
      <a href="javascript:;" @click = "linkTo('/elementUIMume')">elementUIMume</a>
      <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                a:0
            }
        },
        mounted () {

        },
      //提供给子组件的变量
      provide(){
        return {
          getMap: this.a
        }
      },
        methods: {
          linkTo(path){

            this.$router.push(path)

          }
        }
    }
</script>

<style scoped lang="scss">

  a{
    margin-left: 15px;
    color:blue;
  }
</style>
