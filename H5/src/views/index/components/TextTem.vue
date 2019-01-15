<!--
 -  2019/1/14  lize
 -->
<template>

  <div class = "TextTem">

    <div class = "Text-test-questions-title">

      <van-cell style = "font-size: 16px;" :value="data.subscript+'、'+data.title" />

    </div>

    <div class = "Text-test-questions-operation">

      <van-cell-group>

        <van-field

          style = "font-size: 14px;"

          v-for="(item,index) in data.max"

          :key = "index+1"

          v-model="data.value[index].title"

          :label="'第'+(index+1)+'个'"

          type="textarea"

          placeholder="请输入姓名"

          :error-message = "data.value[index].message"

          rows="1"

          autosize

          @blur = "onBlur(data.value[index])"

          @focus = "onFocus(data.value[index])"

        >

        </van-field>

      </van-cell-group>

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
        methods: {
          //失去焦点
          onBlur(item){

//            console.log(item);

            item.title.replace(/\s+/g,"");

            console.log(this.isChinese(item.title));

            if(!item.title){

              item.message = "格式错误！";

              return

            }else{

              if(this.isChinese(item.title)){

                item.message = "格式错误！";

                return

              }else{

                item.message = "";

                return

              }

            }

          },
          //获取焦点
          onFocus(item){

//              console.log(item);

          },
          //判断里面是全英文
          isChinese(value){

            let t = value;

            let reg = new RegExp("^[a-zA-Z]+$");

            return reg.test(t);

          },

        }

    }
</script>

<style scoped lang="scss">
  .TextTem{
    background: #ffffff;
  }
</style>
