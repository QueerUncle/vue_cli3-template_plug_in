<!--
 -  2019/1/14  lize
 -->
<template>
  <div class = "CheckboxTem">

    <div class = "Radio-test-questions-title">

      <van-cell style = "font-size: 16px;" :value="data.subscript+'、'+data.title" />

    </div>

    <div class = "checkbox-test-questions-operation">

      <van-checkbox-group v-model="data.value">

        <van-checkbox v-for="(item, index) in data.option" :key="index+1" :name="item">{{item.title}}</van-checkbox>

      </van-checkbox-group>

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
  .CheckboxTem{
    background: #ffffff;
  }
  .van-cell{

    border-bottom: 1px solid #ebedf0;

  }
.checkbox-test-questions-operation{

  padding: 0 15px;

  .van-checkbox-group{

    .van-checkbox{

      margin-bottom: 10px;

      padding: 10px 0;

      border-bottom: 1px solid #ebedf0;

    }

  }

}
</style>
