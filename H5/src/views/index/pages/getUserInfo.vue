<!--
 -  2019/1/14  lize
 -->
<template>

  <div class = "getUserInfo">

    <!--<mt-popup v-model="popupVisible" :closeOnClickModal="false" popup-transition="popup-fade">-->

      <!--<img @click = "linkTo" src="../../../assets/logo.png" alt="">-->

    <!--</mt-popup>-->

    <van-popup v-model="popupVisible" :close-on-click-overlay="false">

      <img @click = "linkTo" src="../../../assets/logo.png" alt="">

    </van-popup>

  </div>

</template>

<script>

    export default {

        data () {

            return {

              popupVisible:true,

            }

        },
        mounted () {

        },
        methods: {

          linkTo(){

              this.$router.push('/answerSheet')

          }

        }

    }
</script>

<style scoped lang="scss">

</style>
