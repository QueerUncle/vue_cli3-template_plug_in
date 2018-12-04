<!--
 -  2018/10/17  lize
 -->
<template>
  <div>
    <h1>ccc</h1>
    <a href="index.html">index</a>
    &nbsp;
    &nbsp;
    &nbsp;
    &nbsp;
    <a href="view1.html">view1</a>
    &nbsp;
    &nbsp;
    &nbsp;
    &nbsp;
    <a href="view2.html">view2</a>

    <div style = "width: 200px;height: 40px;">

      <excel-import @on-clear-click = "onClearClick" :ImportImgUrl = ImportImgUrl @on-seve-click = "onServeClick" :excelRegDataAry = excelRegDataAry :succColor = succColor :errColor = errColor></excel-import>

    </div>

    <div style = "width: 200px;height: 40px;" @click = "ExcelExportFn">

      <excel-export :ExportImgUrl = ExportImgUrl ref = "ExcelExport" :ExportFileName = "ExportFileName" :ExportType = ExportType></excel-export>

    </div>

  </div>

  </template>

<script>
  import ExcelImport from '../../components/Excel/ExcelImport'
  import ExcelExport from '../../components/Excel/ExcelExport'
    export default {
        data () {
            return {

              succColor:"#000000",

              errColor:"pink",

              // excelRegDataAry:[
              //
              //   {
              //
              //     index:0,
              //
              //     reg:[
              //
              //       {
              //
              //         name: "len10"
              //
              //       },
              //
              //     ]
              //
              //   },
              //   {
              //
              //     index: 1,
              //
              //     reg:[
              //
              //       {
              //
              //         name:"isEmail"
              //
              //       }
              //
              //     ]
              //
              //   },
              //
              // ],
              excelRegDataAry:[],

              excelData:null,

              ImportImgUrl:'./img/moveUp.png',

              ExportImgUrl:'./img/moveDown.png',

              ExportType:"",

              ExportFileName:"lize.xlsx"

            }
        },
        components:{

          ExcelImport,

          ExcelExport

        },
        mounted () {

        },
        methods: {

          onServeClick(data){

            console.log(data,'onServeClickonServeClickonServeClick')

            this.excelData = data;

          },

          onClearClick(data){

            console.log(data,'onClearClickonClearClickonClearClick')

          },
          //下载
          ExcelExportFn(){

            this.$refs.ExcelExport.ExportFile(this.excelData)

          }

        }
    }
</script>

<style scoped lang="scss">

</style>
