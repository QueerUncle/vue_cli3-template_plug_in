<!--
 -  2019/1/14  lize
 -->
<template>
  <div class = "CheckboxTem">

    <div class = "Radio-test-questions-title">

      <!--<van-cell style = "font-size: 16px;" >{{data.subscript+'、'+data.title}}（最多选择{{data.max}}个，最少选择{{dara.min}}个）</van-cell>-->

      <p  style = "margin-bottom: 10px;padding: 10px 10px;border-bottom: 1px solid #ebedf0;font-size: 16px;">标题：{{data.title}}</p>

    </div>

    <div class = "checkbox-test-questions-operation">

      <van-checkbox-group v-model="data.value" :max="data.max">

        <van-checkbox v-for="(item, index) in data.content" :key="index+1" :name="item">{{item.title}}</van-checkbox>

      </van-checkbox-group>

    </div>

    <div class = "Remarks-div">

      <!--<van-cell-group>-->

        <!--<van-field-->

          <!--v-model="data.remarks.value"-->

          <!--type="textarea"-->

          <!--label="入选理由"-->

          <!--placeholder="请输入留言"-->

          <!--rows="1"-->

          <!--:error-message ="data.remarks.message"-->

          <!--@blur = "RemarksOnBlur(data.remarks)"-->

          <!--:autosize = "{maxHeight:200,minHeight:50}"-->

          <!--:required = "data.remarks.force_explanation ? true : false "-->

        <!--&gt;-->

        <!--</van-field>-->

        <mu-text-field

          style = "width: 100%;"

          :error-text = "data.remarks.message"

          @change = "RemarksOnBlur(data.remarks)"

          multi-line

          :rows="3"

          :rows-max="6"

          v-model="data.remarks.value">

          <div slot = "prepend" style="width: 40%">

            <span v-if="data.remarks.force_explanation" style="color: red">*</span>

            <span>入选理由</span>

          </div>

        </mu-text-field>

      <!--</van-cell-group>-->

    </div>

  </div>

</template>

<script>
    export default {

        props:['data','overallLnegth'],

        data () {

            return {}
        },
        mounted () {

        },
        methods: {
          //富文本失去焦点
          RemarksOnBlur(obj){

            obj.value.replace(/\s+/g,"");

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

          },

        }

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
  .Remarks-div{

    margin-top: 30px;

    padding: 0 10px;

  }
</style>
