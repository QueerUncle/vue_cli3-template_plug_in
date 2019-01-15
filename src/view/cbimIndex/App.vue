<!--
 -  2018/12/13  lize
 -->
<template>

  <div id = "app">

    <project-top></project-top>

    <router-view class = "ContentLayout"></router-view>

    <project-footer></project-footer>

    <!--<Layout>-->
      <!--<Header>Header</Header>-->
      <!--<Layout class = "ContentLayout">-->
        <!--<Sider width = "172" hide-trigger>-->
          <!--&lt;!&ndash;<conent-left></conent-left>&ndash;&gt;-->
          <!--<menu></menu>-->
        <!--</Sider>-->
        <!--<Content>-->
          <!--<router-view></router-view>-->
        <!--</Content>-->
      <!--</Layout>-->
      <!--<Footer>Footer</Footer>-->
    <!--</Layout>-->

  </div>

</template>

<script>

    export default {

        data() {

            return {

            }

        },
        components:{

          projectTop: (resolve) =>{ require(['./components/common/projectTop'],resolve) },

          projectFooter: (resolve) =>{ require(['./components/common/projectFooter'],resolve) },

          // conentLeft: (resolve) =>{ require(['./components/common/conentLeft'],resolve) },

        },
        mounted() {

        },
        methods: {}
    }
</script>

<style scoped lang="scss">
#app{

    width:100%;

    height:100%;

    .ContentLayout{

      height: -webkit-calc(100%  - 160px);

      min-height: -webkit-calc(100%  - 160px);

      display: flex;

    }

}
</style>
