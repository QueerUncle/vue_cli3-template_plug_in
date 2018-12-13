<!--
 -  2018/10/17  lize
 -->
<template>
    <div>
      <h1>ivew2</h1>
      <a href="index.html">富文本编辑器</a>
      <a href="ccc.html">excel导入、导出</a>
      <a href="view1.html">CBIMPlayer</a>
      <a href="javascript:;" @click = "linkTo('/giftest')">giftest</a>
      <a href="javascript:;" @click = "linkTo('/inputTest')">inputTest</a>
      <a href="javascript:;" @click = "linkTo('/iviewTree')">iviewTree</a>
      <a href="javascript:;" @click = "linkTo('/buttonCss')">buttonCss</a>
      <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        mounted () {

        },
        methods: {
          linkTo(path){

            this.$router.push(path)


            // asdasdadsasdasd

          }
        }
    }
</script>

<style scoped lang="scss">

  a{
    margin-left: 15px;
  }
</style>
