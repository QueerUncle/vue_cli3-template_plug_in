<!--
 -  2018/11/22  lize
 -->
<template>

  <Modal

    title="查看、修改所导入的数据"

    draggable

    v-model="ExcelPop"

    @on-cancel = "close"

    class-name="vertical-center-modal"

    width = "1000">

    <!--<div class = "table">-->

      <!--<div class = "t_head">-->

        <!--<div v-for="(item,index) in ExceldataFn.tHead" style="">-->

          <!--<ul v-for="(key,value) in item">-->

            <!--<li>{{key}}</li>-->

          <!--</ul>-->

        <!--</div>-->

      <!--</div>-->

      <!--<div class = "t_body" >-->

        <!--<div v-for="(item,index) in ExceldataFn.tBody" style="">-->

          <!--<ul v-for="(i,indexs) in item">-->

            <!--<li :style = "{color:i.color}" contentEditable = "plaintext-only" @blur = onBlur(i,$event)>{{i.name}}</li>-->

          <!--</ul>-->

        <!--</div>-->

      <!--</div>-->

    <!--</div>-->

    <div class = "table-cont" id = table-cont>

      <table class = "table" width="100%">

        <thead>

        <tr v-if="index!=0"  v-for="(item,index) in ExceldataFn.tHead">

          <th v-for="(key,value) in item">{{key}}</th>

        </tr>

        </thead>

        <tbody>

        <tr v-for="(item,index) in ExceldataFn.tBody">

          <td title = "点击修改" :style = "{color:i.color}" contentEditable = "plaintext-only" @focus = "onFocus($event)"  @blur = onBlur(i,$event) v-for="(i,indexs) in item">{{i.name}}</td>

        </tr>

        </tbody>

      </table>

    </div>

    <div slot="footer">

      <Button size="large" @click="cancel">取消</Button>

      <Button type="primary"  size="large" @click="serve">确定</Button>

    </div>

  </Modal>

</template>

<script>

  import fs from '../fs.js'

    export default {

        data() {

            return {

              ExcelPop:false,

              Exceldata:[],

              SuccColor:"#000000",

              ErrColor:"red"

            }

        },
        props:['ExcelPopFlag','ExcelData','SuccessColor','ErrorColor','ExcelRegulation'],
        watch:{

          'ExcelPopFlag'(n){

            this.ExcelPop = n

          },
          'ExcelData'(n){

            this.Exceldata = n;

          },
          'SuccessColor'(){

            this.SuccColor = this.$props.SuccessColor;

          },

          'ErrorColor'(){

            this.ErrColor = this.$props.ErrorColor;

          },

          'ExcelRegulation'(){

            return this.$props.ExcelRegulation

          }

        },
        computed:{

          ExceldataFn(){

            return this.$props.ExcelData;

          }

        },
        mounted() {

          this.ExcelPop = this.$props.ExcelPopFlag;

          this.SuccColor = this.$props.SuccessColor;

          this.ErrColor = this.$props.ErrorColor;

          this.$nextTick(() => {

            const el = document.querySelector('.table-cont');

            el.onscroll = () => {

              const scrollTop = el.scrollTop;

              document.querySelector(".table-cont thead").style.transform = 'translateY(' + scrollTop + 'px)';

            };

          });

        },
        methods: {

          //点击弹窗确定
          serve(){

            this.$emit("cloce",true);

          },
          //点击弹窗关闭
          cancel(){

            this.$emit("cloce",false);

          },
          //关闭
          close(){

            this.$emit("cloce",false);

          },
          //失去焦点
          onBlur(item,evn){

            evn.target.style.cursor = "pointer"

            if(evn.target.innerHTML!=null){

              item.innerText = evn.target.innerHTML.replace(/\s+/g,"");

              evn.target.innerHTML = evn.target.innerHTML.replace(/\s+/g,"");

            }else{

              item.innerText = evn.target.innerHTML;

              evn.target.innerHTML = evn.target.innerHTML;

            }

            let obj = {

              name:item.innerText,

              col:item.col,

              row:item.row

            }

            let flag = fs.verifier(this.ExcelRegulation,obj);

            if(flag){

              evn.target.style.color = this.SuccColor;

              item.color = this.SuccColor

              item.flag = true;

            }else{

              evn.target.style.color = this.ErrColor;

              item.color = this.ErrColor

              item.flag = false;

            }

          },
          //获取焦点
          onFocus(evn){

            evn.target.style.cursor = "text"

          }
        }

    }
</script>

<style scoped lang="scss">
  .vertical-center-modal{

    display: flex;

    align-items: center;

    justify-content: center;

    .ivu-modal{

      top: 0;

    }

  }
  ul li{

    list-style: none;

  }

  .table{

    width:100%;

    max-width: 100%;

  }

  .table>thead>tr{

    background: #edf7ff;

  }

  .table>thead>tr>th {

    white-space: nowrap;

    padding: 8px;

    line-height: 1.42857143;

  }

  .table>tbody>tr>td{

    padding: 0 5px;

    cursor: pointer;

    min-width: 100px;

  }

  .table>tbody>tr:nth-child(odd){

    background: #fff;

  }
  .table>tbody>tr:nth-child(even){

    background: #f7f7f7;

  }

  .table>tbody>tr:hover{

    background: #e3ecfc;

  }
  .table-cont{

    /**make table can scroll**/
    max-height: 500px;

    overflow: auto;

    /** add some style**/

    /*padding: 2px;*/

    background: #ddd;

    margin: 20px 10px;

    border: 1px solid #ddd;

  }
</style>
