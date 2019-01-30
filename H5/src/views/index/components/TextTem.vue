<!--
 -  2019/1/14  lize
 -->
<template>

  <div class = "TextTem">

    <div class = "Text-test-questions-title">

      <!--<van-cell style = "font-size: 16px;" >{{data.subscript+'、'+data.title}}（最多填{{data.max}}个，最少填{{dara.min}}个）</van-cell>-->

      <p  style = "margin-bottom: 10px;padding: 10px 10px;border-bottom: 1px solid #ebedf0;font-size: 16px;">{{data.title}}（最多填{{data.max}}个，最少填{{data.min}}个）</p>

    </div>

    <div class = "Text-test-questions-operation">

      <van-cell-group>

        <van-field

          style = "font-size: 14px;"

          v-for="(item,index) in data.max"

          :key = "index+1"

          v-model="data.value[index].title"

          :label="index | textFn"

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

    <div class = "Remarks-div">

      <van-cell-group>

        <van-field

          v-model="data.remarks.value"

          type="textarea"

          label="选择的理由"

          placeholder="请输入留言"

          rows="1"

          :error-message ="data.remarks.message"

          @blur = "RemarksOnBlur(data.remarks)"

          :autosize = "{maxHeight:200,minHeight:50}"

          :required = "data.remarks.force_explanation ? true : false "

        >

      </van-field>

      </van-cell-group>

    </div>

  </div>

</template>

<script>
    import fs from '../../../extend/fs'

    export default {

        props:['data','overallLnegth'],

        data () {
            return {}
        },
        mounted () {

        },
        filters:{

            textFn(val){

                return `第${val+1}个：`;

            }

        },
        methods: {
          //失去焦点
          onBlur(item){

            item.title.replace(/\s+/g,"");

            if(!item.title){

              item.message = "格式错误！";

              return

            }else{

              if(this.$fs.isChinese(item.title)){

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

          },
          //富文本失去焦点
          RemarksOnBlur(obj){

            obj.value.replace(/\s+/g,"");

            if(obj.force_explanation){

              if(!obj.value){

                obj.message = "格式错误！";

                return

              }else{

                if(this.$fs.isChinese(obj.value)){

                  obj.message = "格式错误！";

                  return

                }else{

                  obj.message = "";

                  return

                }

              }

            }

          },

        }

    }
</script>

<style scoped lang="scss">
  .TextTem{
    background: #ffffff;
  }
  .Remarks-div{

    margin-top: 30px;

    padding: 0 10px;

  }
</style>
