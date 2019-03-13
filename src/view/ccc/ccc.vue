<!--
 -  2018/10/17  lize
 -->
<template>
  <div>
    <h1>ccc</h1>
    <a href="index.html">富文本编辑器</a>
    &nbsp;
    &nbsp;
    &nbsp;
    &nbsp;
    <a href="view1.html">CBIMPlayer</a>
    &nbsp;
    &nbsp;
    &nbsp;
    &nbsp;
    <a href="view2.html">测试用例</a>
    &nbsp;
    &nbsp;
    &nbsp;
    &nbsp;
    <a href="cbimIndex.html">CBIM2.0Test</a>



    <div style = "width: 200px;height: 40px;">

      <excel-import class = "excelImport" @on-clear-click = "onClearClick" :ImportImgUrl = ImportImgUrl @on-seve-click = "onServeClick" :excelRegDataAry = excelRegDataAry :succColor = succColor :errColor = errColor>数据导入</excel-import>

    </div>

    <div style = "width: 200px;height: 40px" @click = "ExcelExportFn">

      <excel-export :ExportImgUrl = ExportImgUrl ref = "ExcelExport" :ExportFileName = "ExportFileName" :ExportType = ExportType>数据导出</excel-export>

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

              excelRegDataAry:[

                {

                  sheet:"sheet1",

                  info:[

                    {

                      index:0,

                      reg:[

                        {

                          name: "len10"

                        },

                      ]

                    },

//                    {
//
//                      index: 4,
//
//                      reg:[
//
//                        {
//
//                          name:"isEmail"
//
//                        }
//
//                      ]
//
//                    },

                  ]

                }

              ],
              // excelRegDataAry:[],

              excelData:null,

              // ImportImgUrl:'./img/moveUp.png',
              ImportImgUrl:'',

              // ExportImgUrl:'./img/moveDown.png',
              ExportImgUrl:'',

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

//            console.log(data,'onClearClickonClearClickonClearClick')

          },
          //下载
          ExcelExportFn(){

            this.$refs.ExcelExport.ExportFile(this.excelData)

          }

        }
    }
</script>

<style scoped lang="scss">
.excelImport{

  /deep/ button{

    background-color: red;

    &:hover{

      background-color: #0000cc;

    }

  }

}
</style>
