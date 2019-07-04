<!--
 -  2018/11/22  lize
 -->
<template>

  <Modal

    title="查看、修改所导入的数据 （预览中高亮显示为错误数据，有错误数据将无法导入）"

    draggable

    v-model="ExcelPop"

    @on-cancel = "close"

    class-name="vertical-center-modal"

    width = "1000">

    <div class = "table-cont" id = table-cont>

      <table cellspacing="0" cellpadding="0" border="0" class = "table" width="100%">

        <thead>

        <tr v-if="index!=0 && ExcelPopData.tHead"  v-for="(item,index) in ExcelPopData.tHead">

          <th v-for="(key,value) in item" v-html="key"></th>

        </tr>

        </thead>

        <tbody>

        <tr v-if="ExcelPopData.tBody" v-for="(item,index) in ExcelPopData.tBody">

          <td :ref ="'td-'+index+'-'+indexs" title = "点击修改" :style = "i.flag ? {color:i.color} : {backgroundColor:i.color}" style="color: #ffffff;" contentEditable = "plaintext-only" @focus = "onFocus($event)"  @blur = onBlur(i,$event,index,indexs) v-for="(i,indexs) in item">{{i.name}}</td>

          <!--<td :ref ="'td-'+index+'-'+indexs" v-if="!i.flag" title = "点击修改" :style = "{backgroundColor:i.color}" style="color: #ffffff;" contentEditable = "plaintext-only" @focus = "onFocus($event)"  @blur = onBlur(i,$event,index,indexs) v-for="(i,indexs) in item">{{i.name}}</td>-->

          <!--<td :ref ="'td-'+index+'-'+indexs" v-if="i.flag" title = "点击修改" :style = "{color:i.color}" contentEditable = "plaintext-only" @focus = "onFocus($event)"  @blur = onBlur(i,$event,index,indexs) v-for="(i,indexs) in item">{{i.name}}</td>-->

        </tr>

        </tbody>

      </table>

    </div>

    <div v-if="SheetsAryFn.length>1" class = "labelDiv" style="overflow: hidden">

      <ul style="overflow: hidden">

        <li @click = "selectLabel(index)" :class="{active:index == active}"  v-for="(i,index) in SheetsAryFn">{{i.sheet}}</li>

      </ul>

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

              ExcelPopData:{

                tHead:[],

                tBody:[],

              },

              propsExcelData:[],

              SuccColor:"#000000",

              ErrColor:"#ff5000",

              active:0

            }

        },
        props:['ExcelPopFlag','ExcelData','SuccessColor','ErrorColor','ExcelRegulation','SheetsAry'],
        watch:{

          'ExcelPopFlag'(n){

            console.log(n,'222222222222222222222222')

            this.ExcelPop = n;

          },
          'ExcelData'(n){

            this.propsExcelData = n;

            this.ExcelPopData = n.length>0 ? n[this.active] : {

              tHead:[],

              tBody:[],

            };

          },
          'SuccessColor'(n){

              if(n){

                this.SuccColor = this.$props.SuccessColor;

              }

          },

          'ErrorColor'(n){

              if(n){

                this.ErrColor = this.$props.ErrorColor;

              }

          },

          'ExcelRegulation'(){

            return this.$props.ExcelRegulation

          }

        },
        computed:{

          SheetsAryFn(){

            return this.$props.SheetsAry;

          }

        },
        mounted() {

          this.propsExcelData = this.$props.ExcelData;

          this.ExcelPopData = this.propsExcelData.length>0 ? this.propsExcelData[this.active]: {

            tHead:[],

            tBody:[],

          };

          this.ExcelPop = this.$props.ExcelPopFlag;

          this.SuccColor = this.$props.SuccessColor ? this.$props.SuccessColor : this.SuccColor ;

          this.ErrColor = this.$props.ErrorColor ? this.$props.ErrorColor : this.ErrColor ;

          this.$nextTick(() => {

            const el = document.querySelector('.table-cont');

            el.onscroll = () => {

              const scrollTop = el.scrollTop;

              document.querySelector(".table-cont thead").style.transform = 'translateY(' + scrollTop + 'px)';

            };

          });

          console.log(this.ExcelPop,'this.ExcelPopthis.ExcelPopthis.ExcelPopthis.ExcelPop')

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
          onBlur(item,evn,index,indexs){

            evn.target.style.cursor = "pointer";

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

              row:item.row,

              sheet:item.sheet,

            };

            let flag = item.isVerify ? fs.verifier(this.ExcelRegulation,obj) : false ;

            let h = `td-${index}-${indexs}`;

            this.$refs[h][0].innerHTML = evn.target.innerHTML;

            item.name = evn.target.innerHTML;

            if(flag){

              this.$refs[h][0].style.backgroundColor = "";

              this.$refs[h][0].style.color = this.SuccColor;

              item.color = this.SuccColor;

              item.flag = true;

            }else{

              this.$refs[h][0].style.backgroundColor = this.ErrColor;

              this.$refs[h][0].style.color = '#ffffff';

              item.color = this.ErrColor;

              item.flag = false;

            }

          },

          //获取焦点
          onFocus(evn){

            evn.target.style.cursor = "text"

            // #f8f8f9

          },

          //切换标签
          selectLabel(index){

            this.active = index;

            this.ExcelPopData = this.propsExcelData[index]

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

    /*background: #edf7ff;*/
    background: #f8f8f9;

  }

  .table>thead>tr>th {

    white-space: nowrap;

    padding: 8px;

    font-size: 12px;

    line-height: 1.42857143;

    color: #515a6e;

    border-right: 1px solid #e8eaec;

  }

  .table>tbody>tr>td{

    /*padding: 0 5px;*/

    padding: 8px;

    cursor: pointer;

    min-width: 100px;

    border-right: 1px solid #e8eaec;

    border-bottom: 1px solid #e8eaec;

  }

  /*.table>tbody>tr:nth-child(odd){*/

    /*background: #fff;*/

  /*}*/
  /*.table>tbody>tr:nth-child(even){*/

    /*background: #f7f7f7;*/

  /*}*/

  .table>tbody>tr:hover{

    background: #e3ecfc;

  }
  .table-cont{

    /**make table can scroll**/
    max-height: 500px;

    overflow: auto;

    /** add some style**/

    /*padding: 2px;*/

    /*background: #ddd;*/

    background: #ffffff;

    margin: 20px 10px;

    /*border: 1px solid #ddd;*/
    border: 1px solid #e8eaec;

  }
  .labelDiv{

    margin: 0 10px;

    ul{

      width:100%;

      border-bottom:1px solid #dcdee2;

      li{

        height:30px;

        line-height: 30px;

        width: 60px;

        text-align: center;

        border: 1px solid #dcdee2;

        float: left;

        border-top:none ;

        border-right:none ;

        background:#f8f8f9;

        margin-left: 1px;

        border-radius: 4px 4px 0 0;

        cursor:pointer;

        &:nth-child(0){

           margin-left:0;

        };
        &:nth-last-child(1){

           border-right: 1px solid #dcdee2

        };

        &:hover{

          color:#2d8cf0;

        }

      }

    }

  }
  .active{

    color:#2d8cf0 !important;

    background:#fff !important;

  }
</style>
