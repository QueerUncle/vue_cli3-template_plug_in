<!--
 -  2018/11/22  lize
 -
 -  Excel导入
  -->
<template>

  <div class = "Excel_Import" style="overflow: hidden;height: 100%;">

    <input type = "file" @change="importFile(this)" id = "imFile" style = "display: none"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />

    <img style="height: 100%;width: 100%;cursor: pointer" v-if="ImportImgUrlFn!=''" :src="ImportImgUrlFn" @click = "uploadFile">

    <Button type="primary" v-else style="width: 100%;height: 100%;"  @click = "uploadFile"><slot>数据导入</slot></Button>

    <excel-import-pop

      v-if="ExcelData.length>0"

      :ExcelData = "ExcelData"

      :SheetsAry = "SheetsAry"

      @cloce = "cloce"

      :ExcelPopFlag = ExcelPopFlag

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

              ExcelPopFlag:false,

              imFile: "", // 导入文件el

              errorMsg: "", // 错误信息内容

              primitiveExcelData:null,

              ExcelData:[],

              SuccessColor:"#000000",

              ErrorColor:"red",

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
        props:['excelRegDataAry','succColor','errColor','ImportImgUrl'],

        computed:{

          ExcelRegulation(){

            let r = [];

            if(this.$props.excelRegDataAry!=undefined && this.$props.excelRegDataAry!=null){

              r = this.$props.excelRegDataAry;

            }

            return r;

          },

          successColor(){

            this.SuccessColor = this.$props.succColor

            return this.$props.succColor;

          },

          errorColor(){

              this.ErrorColor = this.$props.errColor;

              return this.$props.errColor;

          },

          ImportImgUrlFn(){

            let importImgUrl = '';

            if(this.$props.ImportImgUrl!=undefined && this.$props.ImportImgUrl!=null){

              importImgUrl = this.$props.ImportImgUrl

            }

            return  importImgUrl;

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

                this.$emit("on-seve-click",fg);

              }

            }else{

              this.$emit("on-clear-click",true);

              this.ExcelPopFlag = false;

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

              console.log($t.wb,'奥术大师大所大所大所多');

              // 遍历每张表读取
              for (let sheet in workbook.Sheets) {

                let sheetAry = [];

                if (workbook.Sheets.hasOwnProperty(sheet)) {

                  fromTo = workbook.Sheets[sheet]['!ref'];

                  console.log(fromTo);

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

              if(this.ExcelData == "000000"){

                this.$Message.error("表结构错误！第一行不能有中文字符！");

                return

              }

              if(this.ExcelData.length<=0){

                this.$Message.error("数据处理错误,请联系管理员！");

                return

              }

              this.ExcelPopFlag = true;

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

                console.log(this.primitiveExcelData)

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

            this.ExcelPopFlag = false;

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
