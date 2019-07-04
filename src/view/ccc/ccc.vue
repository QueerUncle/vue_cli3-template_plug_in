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

        <excel-import

        class = "excelImport"

        :modalShow = false

        @on_excel_change = "onExcelChange"

        @on-clear-click = "onClearClick"

        :ImportImgUrl = ImportImgUrl

        @on-seve-click = "onServeClick"

        :excelRegDataAry = excelRegDataAry

        :succColor = succColor

        :errColor = errColor>

        数据导入

      </excel-import>

    </div>

    <div style = "width: 200px;height: 40px" @click = "ExcelExportFn">

      <excel-export

        :modalShow = false

        :ExportImgUrl = ExportImgUrl

        ref = "ExcelExport"

        :ExportFileName = "ExportFileName"

        :ExportType = ExportType>

        数据导出

      </excel-export>

    </div>

    <h3>excel简版</h3>

    <div style = "width: 200px;height: 40px" @click = "ExcelExportFn">

      <ExcelImportSimple class = "excelImport" @on-clear-click = "onClearClick" :ImportImgUrl = ImportImgUrl @on-seve-click = "onServeClick" :excelRegDataAry = excelRegDataAry :succColor = succColor :errColor = errColor>数据导入</ExcelImportSimple>

    </div>

    {{disabled}}

    <Button

      :disabled = "!disabled"

      type="primary"

      @click = "saveExcelData">

      提交

    </Button>

    <Button

      type="primary"

      @click = "dowloadExcelData">

      下载

    </Button>

    <ivewTableTem

      :excelInfos = "excelInfos"

      ref = "excelTable"

      :callBackData = "CallBackData"

      @on_detection_excelInfo = "onDetectionExcelInfo"

      :excelRegDataAry = "excelRegDataAry">

      <template v-slot:customAction="{ row,column,index }">

        <Button slot = "customAction" @click = "delExcelData(row,column,index)">删除1</Button>

      </template>

    </ivewTableTem>

  </div>

  </template>

<script>
  import ExcelImport from '../../components/Excel/ExcelImport'
  import ExcelImportSimple from '../../components/Excel/ExcelImportSimple.vue'
  import ExcelExport from '../../components/Excel/ExcelExport'
    export default {
        data () {
            return {

              excelInfos:[],

              disabled:false,

              CallBackData:[],

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
                        {

                            name:'notNull'

                        }

                      ]

                    },
                    {

                      index:1,

                      reg:[

                        {

                          name: "len10"

                        }

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

              ExportFileName:"lize.xlsx",

              num:0

            }
        },
        components:{

          ExcelImport,

          ExcelExport,

          ExcelImportSimple,

          ivewTableTem:() => import('./iviewTable.vue')

        },
        mounted () {

          if (document.createElement("input").webkitSpeech === undefined) {

          }

        },
        methods: {

          //删除数据
          delExcelData(row,column,index){

            this.$refs.excelTable.delExcelData(row,column,index)

          },
          //提交数据
          saveExcelData(){

//            if(this.num<1){

              this.CallBackData ={

                success:false,

                info:[

                  {

                    sheet:"sheet1",

                    errorInfo:[

                      {

                        row:0,

                        col:2,

                        info:'与数据库不符'

                      },
                      {

                        row:1,

                        col:3,

                        info:'与数据库不符'

                      },
                      {

                        row:2,

                        col:3,

                        info:'与数据库不符'

                      },
                      {

                        row:0,

                        col:4,

                        info:'与数据库不符'

                      },

                    ]

                  }

                ]

              };

//            }else{

//              this.CallBackData ={
//
//                success:true,
//
//                info:[]
//
//              };

//            }

            console.log(this.$refs.excelTable.getExcelContents())

          },

          //下载数据
          dowloadExcelData(){

            let dataAry = this.$refs.excelTable.getExcelContents('dowload');

            console.log(dataAry,'我是下载数据')

            this.$refs.ExcelExport.ExportFile(dataAry)

          },

          onExcelChange(data){

              console.log(data,'222222222222')

              this.excelInfos = data;

          },

          onServeClick(data,callBack){

            console.log(data,'onServeClickonServeClickonServeClick')

            this.excelData = data;

            this.CallBackData ={

              success:false,

              info:[

                {

                  sheet:"sheet1",

                  errorInfo:[

                    {

                      row:0,

                      col:2,

                      info:'与数据库不符'

                    },
                    {

                      row:1,

                      col:4,

                      info:'与数据库不符'

                    },
                    {

                      row:2,

                      col:3,

                      info:'与数据库不符'

                    },
                    {

                      row:0,

                      col:4,

                      info:'与数据库不符'

                    },

                  ]

                }

              ]

            };

            if(this.num<1){

              callBack(this.CallBackData);

              this.num++;

            }

          },

          onDetectionExcelInfo(flag){

              this.disabled = flag;

          },

          onClearClick(data){

            console.log(data,'onClearClickonClearClickonClearClick')

          },
          //下载
          ExcelExportFn(){

              console.log(this.excelData,'this.excelDatathis.excelDatathis.excelDatathis.excelData')

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
