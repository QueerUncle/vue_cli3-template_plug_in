<!--
 -  2019/1/14  lize
 -->
<template>

  <div class = "SelectTem">

    <div class = "Select-test-questions-title">

      <!--<van-cell style = "font-size: 16px;" >{{data.subscript+'、'+data.title}}（最多填{{data.max}}个，最少填{{dara.min}}个）</van-cell>-->

      <p  style = "margin-bottom: 10px;padding: 10px 10px;border-bottom: 1px solid #ebedf0;font-size: 16px;">标题：{{selectData.title}}</p>

    </div>

    <div class = "Select-test-questions-operation">

      <div  v-for="(item,index) in selectData.max" :key = "index+1">

        <van-cell-group>

          <van-field

            style = "font-size: 14px;"

            v-model="selectData.value[index].title"

            :label="index | textFn"

            type="textarea"

            placeholder="请选择"

            :error-message = "selectData.value[index].message"

            rows="1"

            autosize

            @blur = "onBlur(selectData.value[index],index,selectData.subscript)"

            @focus = "onFocus(selectData.value[index],index,selectData.subscript)"

          >

            <van-icon v-if = "selectData.value[index].title" slot="button" name="close" @click = "clickRightIcon(selectData.value[index])"/>

          </van-field>

        </van-cell-group>

        <div class = "Remarks-div">

          <van-cell-group>

            <van-field

              v-model="selectData.value[index].remarks.value"

              type="textarea"

              label="入选理由"

              placeholder="请输入留言"

              rows="1"

              :error-message ="selectData.value[index].remarks.message"

              @blur = "RemarksOnBlur(selectData.value,selectData.value[index].title,selectData.value[index].remarks)"

              :autosize = "{maxHeight:200,minHeight:50}"

              :required = "data.remarks.force_explanation ? true : false "

            >

            </van-field>

          </van-cell-group>

        </div>

      </div>

    </div>

    <!--<van-button v-if = "selectData.subscript" class = "btn" block type="primary" size="normal" @click = "next">下一题</van-button>-->

    <!--<van-button v-if = " result.length>0 && !( SwipeIndex < result.length-1 ) && flag" :loading = "loading" class = "btn" block type="primary" size="normal" @click = "next">提交答案</van-button>-->

  </div>

</template>

<script>

  import fs from '../../../extend/fs'

  export default {

    props:['data','inputValue','overallLnegth'],

    data () {

      return {

          selectData:{

            subscript:null,

            title:null,

            max:null,

            min:null

          },

          itemIndex:0,

      }
    },
    watch:{

      data(n){

        this.selectData = n;

      }

    },
    mounted () {

      this.initialize();

    },
    filters:{

      textFn(val){

        return `第${val+1}个：`;

      }

    },
    methods: {

      //初始化
      initialize(){

          this.selectData = this.$props.data;

      },
      //失去焦点
      onBlur(item,index,subscript){

        this.itemIndex = "";

        this.$emit('on-focus',true,index,subscript);

      },
      //获取焦点
      onFocus(item,index,subscript){

        this.itemIndex = index;

        this.$emit('on-focus',true,index,subscript);

        document.activeElement.blur();

      },
      //富文本失去焦点
      RemarksOnBlur(data,title,obj){

        console.log(title,obj,data);

        obj.value.replace(/\s+/g,"");

        if( obj.force_explanation || title ){

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

      clickRightIcon(data){

        data.title = "";

      }

    }

  }
</script>

<style scoped lang="scss">
  .SelectTem{
    background: #ffffff;
  }
  .Remarks-div{

    margin-top: 30px;

    padding: 0 10px;

  }
</style>
