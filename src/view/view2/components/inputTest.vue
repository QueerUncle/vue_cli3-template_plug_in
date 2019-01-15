<!--
 -  2018/12/12  lize
 -->
<template>
  <div>
    <list-test :data = "arr"></list-test>
  </div>
</template>

<script>
    export default {
        data() {
            return {
              arr:[
                {name:"纪金池",key:"jjc"},
                {name:"李泽",key:"lz"},
                {name:"吴伟",key:"ww"},
                {name:"李新星",key:"lxx"},
              ]
            }
        },
      components:{

        listTest : (resolve) =>{ require(['../listTest'],resolve)}

      },
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped lang="scss">

</style>
