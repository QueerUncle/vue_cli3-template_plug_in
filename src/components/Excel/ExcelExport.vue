<!--
 -  2018/11/26  lize
 -
 -  Excel导出
 -->
<template>

  <div class = "Excel_Export" style="overflow: hidden;height: 100%;">

    <img style="height: 100%;width: 100%;cursor: pointer" v-if="ExportImgUrlFn!=''" :src="ExportImgUrlFn">

    <Button style="width: 100%;height: 100%;" v-else ><slot>数据导出</slot></Button>

    <excel-export-pop

      @cloce = "cloce"

      v-if="ExcelData!=null"

      :SheetsAry = SheetsAry

      :ExcelPopFlag = ExcelPopFlag

      :ExcelData = ExcelData>

    </excel-export-pop>

  </div>

</template>

<script>

  import XLSXs from 'xlsx'

  import XLSX from 'xlsx-style'

  import 'blob.js'

  import ExcelExportPop from './Pop/Excel_Export_Pop'

    export default {

        data() {

            return {

              ExcelPopFlag:false,

              ExcelData:null,

              ExportData:[],

              fileName:"dowload.xlsx",

              fileSuffix:"xlsx",

              fileSize:null,

              fileType:null,

              ExportTypeS:'xlsx',

              SheetsAry:[],

            }
        },

        components:{

          ExcelExportPop

        },

        props:['ExportImgUrl','ExportType','ExportFileName',"modalShow"],

        computed:{

          ExportImgUrlFn(){

            let exportImgUrl = '';

            if(this.$props.ExportImgUrl!=undefined && this.$props.ExportImgUrl!=null){

              exportImgUrl = this.$props.ExportImgUrl

            }

            return exportImgUrl

          },
          ExportTypeFn(){

            let o = this.ExportTypeS;

            let n = this.$props.ExportType;

            if(n!=undefined && n!=null && n!=""){

              o = n;

            }

            return o;

          },
          ExportFileNameFn(){

            let o = this.fileName;

            let n = this.$props.ExportFileName;

            if(n!=undefined && n!=null && n!=""){

              o = n;

            }

            return o;

          },
          modalShowFn(){

            let flag = true;

            if(this.$props.modalShow!=undefined && this.$props.modalShow!=null){

              flag = this.$props.modalShow

            }

            return flag

          },

        },

        mounted() {},

        methods: {
          //点击导出按钮
          ExportFile(ArrayData){

            this.SheetsAry = [];

            let flag = false;

            if(ArrayData && ArrayData.length>0){

              for(let sheet = 0; sheet <ArrayData.length; sheet++){

                  if(ArrayData[sheet].headData && ArrayData[sheet].headData.length>0){

                    if(ArrayData[sheet].bodyData && ArrayData[sheet].bodyData.length>0){

                      flag = true;

                    }else{

                      flag = false;

                      return

                    }

                  }else{

                    flag = false;

                    return

                  }

                  if(ArrayData[sheet].fileSuffix){

                    this.fileSuffix = ArrayData[sheet].fileSuffix;

                  }

                  if(ArrayData[sheet].fileSize){

                    this.fileSize = ArrayData[sheet].fileSize;

                  }

                  if(ArrayData[sheet].fileType){

                    this.fileType =  ArrayData[sheet].fileType

                  }

              }

            }else{

              flag = false;

              return

            }

            if(flag){

              ArrayData.forEach((i,v) =>{

                i.bodyData.forEach((k,y) =>{

                  for(let p in k){

                    if(k[p] == undefined || k[p] == null){

                      k[p] = "";

                    }

                  }

                })

              });

              this.ExportData = ArrayData;

              this.ExcelData = this.disposeData(this.ExportData);

              if(this.ExcelData!==null){

                  if(this.modalShowFn){

                    this.ExcelPopFlag = true;

                  }else{

                    let SheetAry = [];

                    let newAry = JSON.parse(JSON.stringify(this.ExportData));

                    for(let i = 0; i<newAry.length;i++){

                      newAry[i].bodyData.unshift(newAry[i].headData[1]);

                      SheetAry.push(newAry[i].bodyData)

                    }

                    //不带样式
                    this.downloadMater(SheetAry);

                  }

              }else{

                this.$Message.error("数据格式错误,解析失败,请检查Excel数据");

              }

            }else{

              this.$Message.error("数据格式错误,解析失败,请检查Excel数据");

              return

            }

          },
          // 处理显示数据
          disposeData(ExPortArray){

            let RETURNARRAY = [];

            let awaitArray = JSON.parse(JSON.stringify(ExPortArray))

            if(awaitArray){

              for(let sheet = 0; sheet <awaitArray.length;sheet++ ){

                let headAry = awaitArray[sheet].headData;

                let Ary = awaitArray[sheet].bodyData;

                let formattingHeadAry = awaitArray[sheet].formattingHeadAry

                let newAry = [];

                for(let i = 0; i<Ary.length; i++){

                  let index = i;

                  let arr = [];

                  let c = 0;

                  for (let j in Ary[i]){

                    let obj = {

                      name:Ary[i][j],

                      row:index,

                      col:c

                    };

                    arr.push(obj);

                    c++

                  }

                  newAry.push(arr);

                }

                let obj = {

                  tHead:headAry,

                  tBody:newAry,

                  formattingHeadAry:formattingHeadAry

                };

                RETURNARRAY.push(obj);

                this.SheetsAry.push({sheet:'Sheet'+(Number(sheet)+1)});

              }

            }

            return RETURNARRAY;

          },
          //关闭弹窗
          cloce(flag){

            if(flag){

              let SheetAry = [];

              console.log(this.ExportData)

              let newAry = JSON.parse(JSON.stringify(this.ExportData));

              for(let i = 0; i<newAry.length;i++){

                newAry[i].bodyData.unshift(newAry[i].headData[1]);

                SheetAry.push(newAry[i].bodyData)

              }

              //不带样式
              this.downloadMater(SheetAry);


//              console.log(SheetAry,'SheetArySheetArySheetArySheetArySheetArySheetArySheetArySheetArySheetArySheetAry')
              //带样式
//              this.downloadMaterStyle(SheetAry);

              this.ExcelPopFlag = false;

            }else{

              this.ExcelPopFlag = false;

            }

          },
          //创建下载链接
          saveAs(obj, fileName) {//当然可以自定义简单的下载文件实现方式

            var tmpa = document.createElement("a");

            tmpa.download = fileName || "下载";

            tmpa.href = URL.createObjectURL(obj); //绑定a标签

            tmpa.click(); //模拟点击实现下载

            setTimeout(function () { //延时释放

              URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL

            }, 100);

          },
          //导出xlsx
          downloadMater (Ary){

            try{

              const wopts = { bookType:this.ExportTypeFn, bookSST:true, type:'binary',cellStyles: true,showGridLines: true};

              const wb = { SheetNames: [], Sheets: {}, Props: {} };

              if(Ary){

                for(let i = 0 ;i < Ary.length; i++){

                  wb.SheetNames.push('Sheet'+(i+1));

                  wb.Sheets['Sheet'+(i+1)] = XLSXs.utils.json_to_sheet(Ary[i])

                }

              }

              //创建二进制对象写入转换好的字节流

              let tmpDown =  new Blob([this.s2ab(XLSX.write(wb, wopts))], { type: 'application/octet-stream' });

              this.saveAs(tmpDown,this.ExportFileNameFn)

            }
            catch (er) {

              console.log(er);

              this.ExcelPopFlag = false;

              this.$Message.error("下载格式设置错误,无法进行下载，请联系管理员！");

            }

          },
          //导出xlsx--带样式
          downloadMaterStyle (Ary){

            const defaultCellStyle = {

              alignment: {

                vertical: "center",

                wrapText:true,

                horizontal:'center'

              },

              border: {

                top:{

                  style:'thin',

                },
                right:{

                  style:'thin',

                },
                bottom:{

                  style:'thin',

                },
                left:{

                  style:'thin',

                }

              },

              font: {

                name: '宋体',

                sz: 14,

                bold: true,

                vertAlign: true,

              },

              fill: {

                bgColor: {

                  indexed: 64

                }

              }

            };

            const specialStyle = {

              alignment: {

                vertical: "center",

                wrapText:true,

                horizontal:'center'

              },

              border: {

                top:{

                  style:'thin',

                },
                right:{

                  style:'thin',

                },
                bottom:{

                  style:'thin',

                },
                left:{

                  style:'thin',

                },

              },

              font: {

                name:'宋体',

                sz: 18,

                bold: true,

                color: {

                  rgb:"ffffff"

                }

              },

              fill: {

                bgColor: {

                  indexed: 64

                },

                fgColor: {

                  rgb: "ff5000"

                }

              }

            };
            try{

              const wopts = { bookType:this.ExportTypeFn, bookSST:true, type:'binary',cellStyles: true, defaultCellStyle:defaultCellStyle,showGridLines: true};

              const wb = { SheetNames: [], Sheets: {}, Props: {} };

              if(Ary){

                for(let i = 0 ;i < Ary.length; i++){

                    wb.SheetNames.push('Sheet'+(i+1));

                    wb.Sheets['Sheet'+(i+1)] = XLSXs.utils.json_to_sheet(Ary[i])

                }

              }

              let opt =500;

              let colsWidthAry = [];

              let rowHeight = [];

              let Sheet = wb.Sheets;

              for(let i in Sheet){

                  for(let j in Sheet[i]){

                      if(Sheet[i][j].t!=undefined && Sheet[i][j].v!=undefined){

                          let s = j.match(/^[a-z|A-Z]+/gi);

                          let n = j.match(/\d+$/gi);

                          if(n<=2){

                            Sheet[i][j].s = specialStyle;

                            colsWidthAry.push({wpx:120});

                            rowHeight.push({hpx:60})

                          }else{

                            Sheet[i][j].s = defaultCellStyle;

                          }

                      }else{

                        opt = opt*Number(Sheet[i][j].split(':')[1].match(/\d+$/gi));

                      }

                  }

                  Sheet[i]["!cols"] = colsWidthAry;

                  Sheet[i]["!rows"] = rowHeight;

                  console.log(wb);

                  console.log(wopts);

              }

              setTimeout(() =>{

                //创建二进制对象写入转换好的字节流

                let tmpDown =  new Blob([this.s2ab(XLSX.write(wb, wopts))], { type: 'application/octet-stream' });

                this.saveAs(tmpDown,this.ExportFileNameFn)


              },opt)

            }
            catch (er) {

              console.log(er);

              this.ExcelPopFlag = false;

              this.$Message.error("下载格式设置错误,无法进行下载，请联系管理员！");

            }

          },
          //字符串转字符流
          s2ab (s) {

            if (typeof ArrayBuffer !== 'undefined') {

              var buf = new ArrayBuffer(s.length);

              var view = new Uint8Array(buf);

              for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;

              return buf;

            } else {

              var buf = new Array(s.length);

              for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;

              return buf;

            }

          },

        }

    }
</script>

<style scoped lang="scss">

</style>
