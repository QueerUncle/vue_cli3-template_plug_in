<!--
 -  2018/11/22  lize
 -
 -  Excel导入
  -->
<template>

  <div class = "Excel_Import" style="overflow: hidden;height: 100%;">

    <input type = "file" @change="importFile(this)" id = "imFile" style = "display: none"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />

    <img style="height: 100%;width: 100%;cursor: pointer" v-if="ImportImgUrlFn!=''" :src="ImportImgUrlFn" @click = "uploadFile">

    <Button type="primary" v-else style="width: 100%;height: 100%;"  @click = "uploadFile" :disabled="disabled"><slot>数据导入</slot></Button>

    <excel-import-pop

      :ExcelData = "ExcelData"

      :SheetsAry = "SheetsAry"

      @cloce = "cloce"

      :ExcelPopFlag = "ExcelPopFlag"

      :SuccessColor = SuccessColor

      :ExcelRegulation = ExcelRegulation

      :ErrorColor = ErrorColor>

    </excel-import-pop>

  </div>

</template>

<script>

  import XLSX from 'xlsx'

  import ExcelImportPop from './Pop/Excel_Import_Pop'

  import fs from './fs'

    export default {

        data() {

            return {

              ExcelPopFlag: false,

              imFile: "", // 导入文件el

              errorMsg: "", // 错误信息内容

              primitiveExcelData:null,

              ExcelData:[],

              SuccessColor:"#000000",

              ErrorColor:"#ff5000",

              fileName:null,

              fileSuffix:null,

              fileSize:null,

              fileType:null,

              importImgUrl:'',

              SheetsAry:[],

            }

        },
        components:{

          ExcelImportPop

        },
        props:['excelRegDataAry','succColor','errColor','ImportImgUrl' ,"disabled","modalShow"],

        computed:{

          ExcelRegulation(){

            let r = [];

            if(this.$props.excelRegDataAry!=undefined && this.$props.excelRegDataAry!=null){

              r = this.$props.excelRegDataAry;

            }

            return r;

          },

          successColor(){

            if(this.$props.succColor){

              this.SuccessColor = this.$props.succColor;

            }

            return this.SuccessColor;

          },

          errorColor(){

              if(this.$props.errColor){

                this.ErrorColor = this.$props.errColor;

              }

              return this.ErrorColor;

          },

          ImportImgUrlFn(){

            let importImgUrl = '';

            if(this.$props.ImportImgUrl!=undefined && this.$props.ImportImgUrl!=null){

              importImgUrl = this.$props.ImportImgUrl

            }

            return  importImgUrl;

          },

          modalShowFn(){

              let flag = true;

              if(this.$props.modalShow!=undefined && this.$props.modalShow!=null){

                  flag = this.$props.modalShow

              }

              return flag

          }

        },

        mounted() {

          this.imFile = document.getElementById("imFile");

        },

        methods: {

          //关闭弹窗
          cloce(flag){

            if(flag){

              let fg = this.onServe(this.ExcelData);

              if(fg!==false){

                console.log('我走了这里')

                let isCallBack = false;

                let f = this.$emit("on-seve-click",fg,e =>{

                  console.log(e,'我是混掉');

                  isCallBack = true;

                  let infoData = e;

                  if(!infoData.success && infoData.info && infoData.info.length){

                    if(infoData.info.length && this.ExcelData.length){

                      infoData.info.forEach((i,v) =>{

                        this.ExcelData.forEach((j,y) =>{

                          if(i.sheet.split('sheet')[1]-1 == y){

                            if(i.errorInfo){

                              i.errorInfo.forEach((o,p) =>{

                                j.tBody[o.row][o.col].color = this.errorColor;

                                j.tBody[o.row][o.col].flag = false;

                                j.tBody[o.row][o.col].errorInfo = o.info;

                              })

                            }

                          }

                        })

                      })

                    }

                  }

                });

                if(!isCallBack){

                  this.ExcelPopFlag = false;

                  this.ExcelData = [];

                }

              }

            }else{

              this.$emit("on-clear-click",true);

            }

          },
          //点击导入按钮
          uploadFile(){

            // 点击导入按钮
            this.imFile.click();

          },
          //解析xlsx
          importFile(){

            this.$Spin.show({

              render: (h) => {

                return h('div', [

                  h('Icon', {

                    'class': 'demo-spin-icon-load',

                    props: {

                      type: 'ios-loading',

                      size: 18

                    }

                  }),

                  h('div', 'Loading')

                ])

              }

            });

            let $t = this;

            setTimeout(function(){

              $t.analysisXlsx($t)

            },3000)

          },
          analysisXlsx(_this){

            let $t = _this;

            let persons = []; // 存储获取到的数据

            let SheetsAry = []; // 存储获取到的标签

            let workbook = null; //二进制的表格内容

            let fromTo = ""; //表格范围，可用于判断表头是否数量是否正确

            let obj = $t.imFile;

            if (!obj.files) {

              $t.$Message.error('文件获取失败，请联系管理员！');

              return;

            }
            let f = obj.files[0];

            if(f.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || f.type == 'application/vnd.ms-excel') {

              $t.fileName = f.name;

              $t.fileSuffix = $t.fileName.substring($t.fileName.lastIndexOf(".")+1,$t.fileName.length);

              $t.fileSize = f.size;

              $t.fileType = f.type;

              let fileReader = new FileReader();

              //读取开始时
              fileReader.onloadstart = function(e){

                console.log('开始读取文件……')

              };

              //读取成功时
              fileReader.onload = function(e) {

                console.log("读取完毕，解析中……")

                try{

                  let data = e.target.result;

                  if (this.rABS) {

                    workbook = XLSX.read(btoa(this.fixdata(data)), {

                      // 手动转化
                      type: "base64"

                    });


                  }else{

                    workbook =$t.wb = XLSX.read(data, {

                      type: "binary"

                    });

                  }

                } catch (er) {

                  $t.$Spin.hide();

                  $t.$Message.error("文件类型不正确,读取失败！");

                  return

                }

                // 遍历每张表读取
                for (let sheet in workbook.Sheets) {

                  let sheetAry = [];

                  if (workbook.Sheets.hasOwnProperty(sheet)) {

                    fromTo = workbook.Sheets[sheet]['!ref'];

                    if(fromTo!=undefined){

                      sheetAry = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

                    }

                    // break; // 如果只取第一张表，就取消注释这行

                  }

                  if(sheetAry.length>0){

                    persons.push(sheetAry)

                    SheetsAry.push({sheet:sheet})

                  }

                }

                $t.primitiveExcelData = persons;

                $t.SheetsAry = SheetsAry;


//                console.log($t.primitiveExcelData,'$t.primitiveExcelData$t.primitiveExcelData$t.primitiveExcelData')

                // let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]]);

                // $t.primitiveExcelData = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]]);

                $t.dealFile($t.primitiveExcelData); // analyzeData: 解析导入数据

              };

              //读取失败时
              fileReader.onerror = function(er){

                console.log("文件读取失败……")

                _this.$Spin.hide();

                _this.$Message.error("表格中有错误数据");

              }

              if (this.rABS) {

                fileReader.readAsArrayBuffer(f);

              } else {

                fileReader.readAsBinaryString(f);

              }

            }else{

              $t.$Spin.hide();

              $t.$Message.error("文件格式错误,读取失败！");

              return

            }

          },
          //处理解析后的xlsx
          dealFile(e){

            this.imFile.value = "";

            if (e.length <= 0) {

              this.$Spin.hide();

              this.$Message.error("请导入正确信息");

            }else{

              console.log("文件解析成功，渲染中……")

              this.$Spin.hide();

              let Edata = JSON.parse(JSON.stringify(e))

                this.ExcelData = fs.pluralSheerAssemblyData(Edata,this.ExcelRegulation,this.successColor,this.errorColor);

              this.$store.state.ivewTableData = this.ExcelData;

              if(this.ExcelData == "000000"){

                this.$Message.error("表结构错误！第一行不能有中文字符！");

                return

              }

              if(this.ExcelData.length<=0){

                this.$Message.error("数据处理错误,请联系管理员！");

                return

              }

              this.ExcelData[0].fileName = this.fileName;

              this.ExcelData[0].fileSuffix = this.fileSuffix;

              this.ExcelData[0].fileSize = this.fileSize;

              this.ExcelData[0].fileType = this.fileType;

              if(this.modalShowFn){

                this.ExcelPopFlag = true;

                this.$emit('on_excel_change',this.ExcelData);

              }else{

                  this.$emit('on_excel_change',this.ExcelData)

              }

              console.log("文件渲染成功！")

            }

          },
          // 文件流转BinaryString
          fixdata(data) {
            var o = "";

            var l = 0;

            var w = 10240;

            for (; l < data.byteLength / w; ++l) {

              o += String.fromCharCode.apply(

                null,

                new Uint8Array(data.slice(l * w, l * w + w))

              );

            }

            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));

            return o;

          },
          //确定函数处理
          onServe(Ary){

            let newAry = [];

            if(Ary && Ary.length>0){

              for(let sheet = 0; sheet<Ary.length; sheet++){

                let formattingHeadAry =  Ary[sheet].tHead;

                let headAry = JSON.parse(JSON.stringify(formattingHeadAry));

                headAry[1] = this.primitiveExcelData[sheet][0]

                let bodyAry = Ary[sheet].tBody;

                let objData = {

                  headData:headAry,

                  formattingHeadAry:formattingHeadAry,

                  bodyData:[],

                  fileName:this.fileName,

                  fileSuffix:this.fileSuffix,

                  fileSize:this.fileSize,

                  fileType:this.fileType,

                };

                if(bodyAry.length>0){

                  for(let i = 0; i<bodyAry.length; i++){

                    let obj = {};

                    for(let j = 0; j<bodyAry[i].length;j++){

                      if(bodyAry[i][j].flag){

                        obj[bodyAry[i][j].key] = bodyAry[i][j].innerText;

                      }else{

                        this.$Message.error("表格中有错误数据");

                        this.ExcelPopFlag = true;

                        return false;

                      }

                    }

                    objData.bodyData.push(obj);

                  }

                }

                newAry.push(objData);

              }

            }

            return  newAry;

          }

        }

    }
</script>

<style scoped lang="scss">
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
