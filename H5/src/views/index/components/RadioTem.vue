<!--
 -  2019/1/14  lize
 -->
<template>

  <div class = "RadioTem">

    <div class = "Radio-test-questions-title">

      <van-cell style = "font-size: 16px;" :value="data.subscript+'、'+data.title" />

    </div>

    <div class = "Radio-test-questions-operation">

      <van-radio-group v-model="data.value[0].radio" class="demo-radio-group">

        <van-radio v-for="(item,index) in data.option" :name="item" :key = "index+1">{{item.title}}</van-radio>

      </van-radio-group>

    </div>

  </div>

</template>

<script>
    export default {
        props:['data'],

        data () {
            return {}
        },
        mounted () {

        },
        methods: {}
    }
</script>

<style scoped lang="scss">
  .RadioTem{

    background: #ffffff;

  }

  .van-cell{

    border-bottom: 1px solid #ebedf0;

  }
  .Radio-test-questions-operation{

    padding: 0 15px;

    .van-radio-group{

      .van-radio{

        margin-bottom: 10px;

        padding: 10px 0;

        border-bottom: 1px solid #ebedf0;

      }

    }

  }

  .van-radio{

    margin-bottom: 20px;

  }
</style>
