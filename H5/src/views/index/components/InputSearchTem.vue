<!--
 -  2019/1/14  lize
 -->
<template>

  <div class = "SelectTem">

    <div class = "Select-test-questions-title">

      <p  style = "margin-bottom: 10px;padding: 10px 10px;border-bottom: 1px solid #ebedf0;font-size: 16px;">标题：{{selectData.title}}</p>

    </div>

    <div class = "Select-test-questions-operation">

      <div  v-for="(item,index) in selectData.max" :key = "index+1">

        <div style="padding: 10px;">

          <mu-select

            :label="index | textFn"

            filterable v-model="selectData.value[index].title"

            full-width>

            <mu-option

              v-for="(item,index) in selectData.content"

              :key="item.title"

              :label="item.title"

              :value="item.title"

            ></mu-option>

          </mu-select>

        </div>

        <div class = "Remarks-div">

          <mu-text-field

            :error-text = "selectData.value[index].remarks.message"

            @change = "RemarksOnBlur(selectData.value,selectData.value[index].title,selectData.value[index].remarks)"

            multi-line

            :rows="3"

            :rows-max="6"

            v-model="selectData.value[index].remarks.value">

            <div slot = "prepend" style="width: 40%">

              <span style="color: red">*</span>

              <span>入选理由</span>

            </div>

          </mu-text-field>

        </div>

      </div>

    </div>

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

          console.log(this.selectData,'this.selectDatathis.selectDatathis.selectData')

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

    margin-top: 10px;

    padding: 0 10px;

  }
  .mu-input.has-label{

    padding-bottom: 0px;

    margin-bottom: 0px;

  }
  .mu-input{

    width: 100%;

  }
  .mu-text-field-multiline{

    padding-left: 5px;

  }
</style>
