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

    <!--<div class = "table">-->

      <!--<div class = "t_head" v-for = "(item,index) in ExceldataFn.tHead" style="width: 100%;overflow: hidden;">-->

        <!--<ul v-for="(key,value) in item">-->

          <!--<li >{{key}}</li>-->

        <!--</ul>-->

      <!--</div>-->

      <!--<div class = "t_body" >-->

        <!--<div v-for="(item,index) in ExceldataFn.tBody" style="width: 100%;overflow: hidden;">-->

          <!--<ul v-for="(i,indexs) in item">-->

            <!--<li :style = "{color:i.color}">{{i.name}}</li>-->

          <!--</ul>-->

        <!--</div>-->

      <!--</div>-->

    <!--</div>-->

    <div class = "table-cont-export" id = table-cont-export>

      <table class = "table" width="100%">

        <thead>

        <tr v-if="index!=0" v-for="(item,index) in ExceldataFn.tHead">

          <th v-for="(key,value) in item" v-html="key"></th>

        </tr>

        </thead>

        <tbody>

        <tr v-for="(item,index) in ExceldataFn.tBody">

          <td v-for="(i,indexs) in item">{{i.name}}</td>

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

    export default {

        data() {

            return {

              ExcelPop:false,

            }

        },
        props:['ExcelPopFlag','ExcelData'],

        computed:{

          ExceldataFn(){

            return this.$props.ExcelData;

          }

        },
        mounted() {

          this.ExcelPop = this.$props.ExcelPopFlag;

          this.$nextTick(() => {

            const el = document.querySelector('.table-cont-export');

            el.onscroll = () => {

              const scrollTop = el.scrollTop;

              document.querySelector(".table-cont-export thead").style.transform = 'translateY(' + scrollTop + 'px)';

            };

          });

        },
        watch:{

            'ExcelPopFlag'(n){

              this.ExcelPop = n;

            }

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
  .table-cont-export{

    /**make table can scroll**/
    max-height: 500px;

    overflow: auto;

    /** add some style**/

    /*padding: 2px;*/

    background: #ddd;

    margin: 20px 10px;

    border: 1px solid #ddd;

  }


  /*.table{*/

    /*width: 100%;*/

    /*height: 100%;*/

    /*overflow:scroll;*/

  /*.t_head{*/

      /*width: 100%;*/

      /*height: 100%;*/

      /*overflow: hidden;*/

      /*ul{*/

        /*width: 150px;*/

        /*height: 100%;*/

        /*overflow: hidden;*/

        /*float: left;*/

        /*li{*/

          /*height: 40px;*/

          /*line-height: 40px;*/

          /*text-align: center;*/

          /*overflow: hidden;*/

        /*}*/

      /*}*/

    /*}*/
  /*.t_body{*/

    /*width: 100%;*/

    /*overflow: hidden;*/

    /*float: left;*/

    /*margin-bottom:20px;*/

    /*ul{*/

      /*width: 150px;*/

      /*height: 100%;*/

      /*overflow: hidden;*/

      /*float: left;*/

    /*li{*/


          /*height: 40px;*/

          /*line-height: 40px;*/

          /*text-align: center;*/

        /*}*/

      /*}*/

    /*}*/

  /*}*/
</style>
