<!--
 -  2018/12/24  lize
 -->
<template>
  <div class = "transitionTemplate">

    <div class = "one">

      <transition-one></transition-one>

    </div>

    <div class = "two">

      <transition-two></transition-two>

    </div>

    <div class = "three">

      <transition-three></transition-three>

    </div>

    <div class = "four">

      <transition-four></transition-four>

    </div>

  </div>

</template>

<script>
    export default {
        data () {
            return {}
        },
        components:{

          transitionOne:() => import('./childerComponents/transitionOne'),

          transitionTwo:() => import('./childerComponents/transitionTwo'),

          transitionThree:() => import('./childerComponents/transitionThree'),

          transitionFour:() => import('./childerComponents/transitionFour'),

        },
        mounted () {

        },
        methods: {

        }
    }
</script>

<style scoped lang="scss">

</style>
