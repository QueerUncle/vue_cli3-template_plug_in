<!--
 -  2018/11/22  lize
 -->
<template>

  <Modal

    title="查看下载的数据"

    draggable

    v-model="ExcelPop"

    class-name="vertical-center-modal"

    @on-cancel = "close"

    width = "1000">

    <div class = "table-cont-export" id = table-cont-export>

      <table cellspacing="0" cellpadding="0" border="0" class = "table" width="100%">

        <thead v-if="ExcelPopData.formattingHeadAry">

        <tr v-if="index!=0" v-for="(item,index) in ExcelPopData.formattingHeadAry">

          <th v-for="(key,value) in item" v-html="key"></th>

        </tr>

        </thead>

        <thead v-else>

        <tr v-if="index!=0" v-for="(item,index) in ExcelPopData.tHead">

          <th v-for="(key,value) in item" v-html="key"></th>

        </tr>

        </thead>

        <tbody>

        <tr v-for="(item,index) in ExcelPopData.tBody">

          <td v-for="(i,indexs) in item">{{i.name}}</td>

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

    export default {

        data() {

            return {

              ExcelPop:false,

              active:0,

              propsExcelData:[],

              ExcelPopData:{

                tHead:[],

                tBody:[],

              },

            }

        },
        props:['ExcelPopFlag','ExcelData','SheetsAry'],

        watch:{

          'ExcelPopFlag'(n){

            this.ExcelPop = n;

          },

          ExcelData(n){

            this.propsExcelData = n;

            this.ExcelPopData = n[this.active]

          }

        },

        computed:{

          SheetsAryFn(){

            return this.$props.SheetsAry

          }

        },
        mounted() {

          this.propsExcelData = this.$props.ExcelData

          this.ExcelPopData = this.propsExcelData[this.active];

          this.ExcelPop = this.$props.ExcelPopFlag;

          this.$nextTick(() => {

            const el = document.querySelector('.table-cont-export');

            el.onscroll = () => {

              const scrollTop = el.scrollTop;

              document.querySelector(".table-cont-export thead").style.transform = 'translateY(' + scrollTop + 'px)';

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
  .table-cont-export{

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

           border-right: 1px solid #dcdee2;

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
