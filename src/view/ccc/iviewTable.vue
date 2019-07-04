<!--
 -  2019/7/3  lize
 -->
<template>

  <div class = "iviewTableWrap">

    <Table border :columns="columns" :data="data6">

      <template v-for="(item,index) in columns" slot-scope="{ row,column,index }" :slot="item.slot">

        <div v-if="item.slot === 'customAction'">

          <slot name = "customAction" v-bind="{row,column,index}">

            <Button  type="primary" @click = "delExcelData(row,column,index)">删除</Button>

          </slot>

        </div>

        <Input v-else @on-blur = "onBlur(row[item.slot])" :class = "row[item.slot].flag ? 'successClass' : 'errorClass' " v-model="row[item.slot].name"  placeholder="Enter something..." style="width:100%" />

      </template>

    </Table>

  </div>

</template>

<script>

  import fs from '../../components/Excel/fs'

    export default {

        props:["excelInfos","excelRegDataAry",'actionBarTitle','callBackData'],

        data () {

            return {

              columns: [],

              data6:[],

            }

        },
        mounted () {

            this.initialize();

        },
        computed:{
          //验证规则
          ExcelRegulation(){

            let r = [];

            if(this.$props.excelRegDataAry!=undefined && this.$props.excelRegDataAry!=null){

              r = this.$props.excelRegDataAry;

            }

            return r;

          },
          //操作栏名称
          actionBarTitleFn(){

              let str = "操作";

              if(this.$props.actionBarTitle){

                  str = "this.$props.actionBarTitle"

              }

              return str;

          },

        },
        watch:{

          //tableRanderData
          'excelInfos'(n){

            let data = n && n.length ? n : [];

            this.transformExcelData(data);

          },

          'callBackData'(n){

              this.setErrorData(n);

          },

        },
        methods: {

          //initialize
          initialize(){

            let data = this.$props.excelInfos && this.$props.excelInfos.length ? this.$props.excelInfos : [];

            this.transformExcelData(data);

          },
          //onBlur
          onBlur(target){

            target.innerText = target.name;

            let obj = {

              name:target.innerText,

              col:target.col,

              row:target.row,

              sheet:target.sheet,

            };

            let flag = target.isVerify ? fs.verifier(this.ExcelRegulation,obj) : false ;

            if(flag){

              target.color = '#000000'

            }else{

              target.color = "pink"

            }

            target.flag = flag;

            this.data6[target.row][target.key] = target;

            this.detectionExcelData();

          },
          //删除导入表格数据
          delExcelData(row,column,index){

            this.data6.splice(index,1);

          },
          //处理excel数据
          transformExcelData(Ary){

            if(Ary.length){

              let renderObj = Ary[0];

              if(renderObj.tHead && renderObj.tBody){

                let tableHeaders = [];

                let tableBodys = [];

                for(let i in renderObj.tHead[1]){

                  let obj = {

                    title:renderObj.tHead[1][i],

                    key:i,

                    slot:i,

                  };

                  tableHeaders.push(obj);

                }

                tableHeaders.push({title:this.actionBarTitleFn,key:'customAction',slot:'customAction'});

                this.columns = tableHeaders;

                for(let i = 0; i<renderObj.tBody.length;i++){

                  let rowObj = {};

                  for(let j = 0;j<renderObj.tBody[i].length;j++){

                    rowObj[renderObj.tBody[i][j].key] = renderObj.tBody[i][j]

                  }

                  tableBodys.push(rowObj);

                };

                this.data6 = tableBodys

              }

            }

            this.detectionExcelData();

          },
          //反选错误数据
          setErrorData(data){

            let infoData = data;

            if(!infoData.success && infoData.info && infoData.info.length){

              if(infoData.info.length && this.data6.length){

                let firstsheetObj = infoData.info[0];

                if(firstsheetObj.errorInfo){

                    for(let i = 0; i<firstsheetObj.errorInfo.length;i++){

                        let target = this.data6[firstsheetObj.errorInfo[i].row][this.columns[firstsheetObj.errorInfo[i].col].key];

                        target.color = 'pink';

                        target.flag = false;

                        target.errorInfo = firstsheetObj.errorInfo[i].info;

                    }

                }

              }

              this.$emit('on_detection_excelInfo',false);

            }

          },
          //检测数据
          detectionExcelData(){

            let flag = true;

            if(this.data6.length){

              for(let i = 0; i<this.data6.length;i++){

                for(let j in this.data6[i]){

                  if(!this.data6[i][j].flag){

                    flag = false;

                    break;

                  }
                }

              }

            }else{

                flag = false;

            }

            this.$emit('on_detection_excelInfo',flag);

          },
          //获取excel数据
          getExcelContents(type){

            let exportAry = [];

            let excelobj = {

              headData:this.$props.excelInfos[0].tHead,

              bodyData:[],

              fileName:this.$props.excelInfos[0].fileName,

              fileSuffix:this.$props.excelInfos[0].fileSuffix,

              fileSize:this.$props.excelInfos[0].fileSize,

              fileType:this.$props.excelInfos[0].fileType,

            };

            let tableBodyAry = JSON.parse(JSON.stringify(this.data6));

            for(let i = 0; i<tableBodyAry.length;i++){

              let obj = {};

              for(let j in tableBodyAry[i]){

                obj[j] = tableBodyAry[i][j].innerText;

                if(type == 'dowload' && !tableBodyAry[i][j].flag){

                  obj[j] = `${tableBodyAry[i][j].innerText}(错误)`

                }

              }

              excelobj.bodyData.push(obj);

            }

            exportAry.push(excelobj);

            return exportAry

          }

        }

    }
</script>

<style scoped lang="scss">

.successClass{

  /deep/input{

    color:#000000;

  }
}
.errorClass{

  /deep/input{

    color:pink

  }

}
</style>
