<template>

  <div id = "app">

    <div id = "pdfDom" style="overflow: hidden">

      <div class = "vote_title" v-if="voteInfo">

        <span>{{voteInfo.title}}（应投人数

          <span style="font-size: 30px;">{{voteInfo.finished_num+voteInfo.unfinished_num}}</span>人，已投：

          <span style="font-size: 30px;">{{voteInfo.finished_num}}</span>人，未投:

          <span style="font-size: 30px;">{{voteInfo.unfinished_num}}</span>人）。

        </span>

        <!--<mu-button-->

          <!--flat-->

          <!--color="primary"-->

          <!--style="margin-left: 50px;position: absolute;right:20px;top:23px;"-->

          <!--@click = "downloadPdf"-->

        <!--&gt;导出为Pdf</mu-button>-->

      </div>

      <div style="overflow: hidden">

        <div style="float:right;width:116px;height: 36px;margin: 30px; ">

          <Export-pdf :params = params @error = "export_PDF_error"></Export-pdf>

        </div>

      </div>

      <div>

        <div style="width: 1000px;margin: 60px auto">

          <Ve-chart @on-look-click = onLookDetail v-if="chartDataAry.length>0" v-for="(item,index) in chartDataAry" :key = index+1 :chartData = item></Ve-chart>

        </div>

      </div>

      <mu-dialog

        title="查看评论"

        width="1000"

        max-width="80%"

        :lock-scroll = "true"

        :esc-press-close="false"

        :overlay-close="false"

        :open.sync="openAlert">

        <mu-data-table

          border

          height="500"

          :min-col-width = "200"

          no-data-text = "暂无数据"

          :columns="columns"

          :sort.sync="sort"

          @sort-change="handleSortChange"

          :data="list">

          <template slot-scope="scope">

            <td class="is-center">{{scope.row.选项}}</td>

            <td class="is-center">{{scope.row.票数}}</td>

            <td>

              <p v-for="(item,index) in scope.row.reasonAry">理由{{index+1}}：{{item.reason}}</p>

            </td>

          </template>

        </mu-data-table>

        <mu-button slot="actions" flat color="primary" @click="clear">关闭</mu-button>

        <mu-button slot="actions" flat color="primary" @click="sever">下载</mu-button>

      </mu-dialog>

    </div>

  </div>

</template>

<script>

  import XLSX from 'xlsx'

  export default {

    data () {

      return {

        topicInfo:null,

        voteInfo:null,

        chartData: {},

        chartDataAry:[],

        openAlert:false,

        sort: {

          name: '',

          order: 'asc'

        },

        columns: [

          { title: '选项', width: 170, name: '选项',align: 'center' },

          { title: '票数', name: '票数', width: 170, align: 'center', sortable: true },

          { title: '入选理由', name: 'reason', width: 600},

        ],

        list: [],

        params:{

            el:"#pdfDom"

        }

      }

    },
    components:{

      VeChart:() => import('./components/VeChart.vue'),

      ExportPdf:() => import('../../extend/jsPdf/ExportPdf.vue'),

    },
    mounted () {

      this.initialize();

    },
    methods: {
      //初始化
      initialize(){

        let urlParams = this.getUrlparame();

        this.getStatisticsData(urlParams);

        this.getType(urlParams.voteId);

      },
      //获取统计数据
      getStatisticsData(urlParams){

        let url = process.env.VUE_APP_getStatisticsData;

        let data = {

          voteId:urlParams.voteId

        };

        this.$http.post(url,data)

          .then((e) =>{

            this.chartDataAry =  this.processingData(e.data);

            setTimeout(() =>{

              this.getStatisticsData(urlParams)

            },2000)

          })

          .catch((er) =>{

            console.log(er)

          });


      },
      //解析url参数
      getUrlparame(){

        let search = window.location.search.replace('?','').split('&');

        let obj = {};

        for(let i = 0; i<search.length;i++){

          search[i] = search[i].split('=');

          obj[search[i][0]] = search[i][1];

        }

        return obj;

      },
      //处理数据
      processingData(opt){

        let newAry = [];

        for(let item of opt.chips){

            if(item.type == "text" || item.type == "select"){

              let obj = this.Completion(item,opt);

              const sortId = (a,b) =>{

                  return b.票数-a.票数;

              };

              obj.chartData.rows.sort(sortId);

              if(obj.chartData.rows.length>20){

                obj.chartData.rows.splice(20,obj.chartData.rows.length-20);

              }

              newAry.push(obj);

            }else{

              newAry.push(this.choiceQuestion(item));

            }

        }

        return  newAry

      },
      //填空题
      Completion(self,opt){

        let options = [];

        let qwer = [];

        let reasonAry = [];

        let St = {

          title:self.title,

          type:self.type,

          desc:self.desc

        };

        let obj = {};

        obj.columns = ['人员','票数'];

        obj.rows = [];

        for(let j of self.answer){

          let newAry = [];

          let reason = [];

          let newTitleAry = [];

          j.content.forEach((i,v) =>{

            if(!newAry.includes(i.title) && i.title!==''){

              newTitleAry.push(i.title);

              newAry.push(i);

              if(JSON.parse(j.reason) instanceof Array){

                reason.push(JSON.parse(j.reason)[v]);

              }

            }

          });

          for(let j = 0; j<newAry.length; j++){

            options.push(newAry[j].title);

            let obj = {

                title:newAry[j].title,

                reason: reason[j]

            };

            qwer.push(obj);

          }

        }

        let temporary_One = [];

        qwer.forEach((i) =>{

          if(!temporary_One.includes(i.title)){

            temporary_One.push(i.title);

          }

        });

        temporary_One.forEach((i) =>{

          let obj = {};

          obj.title = i;

          obj.reasonAry = [];

          qwer.forEach((j) =>{

              if(j.title == i){

                  let d = {

                    reason:j.reason

                  };

                obj.reasonAry.push(d);

              }

          });

          reasonAry.push(obj)

        });

        let newObj = this.arrayCnt(options);

//        for(let i = 0,iMax=newObj.newAry.length; i<iMax; i++){
//
//            for(let j = 0,jMax=opt.users.length; j<jMax; j++){
//
//                if(newObj.newAry[i] == opt.users[j].nickname){
//
//                  let d = {};
//
//                  d[obj.columns[0]] = newObj.newAry[i];
//
//                  d[obj.columns[1]] = newObj.statistics[i];
//
//                  obj.rows.push(d);
//
//                }
//
//            }
//
//        }

        newObj.newAry.forEach((i,v) =>{

          opt.users.forEach((j) =>{

            if(i == j.nickname){

              let d = {};

              d[obj.columns[0]] = i;

              d[obj.columns[1]] = newObj.statistics[v];

              reasonAry.forEach((l) =>{

                  if(i == l.title){

                      d.reasonAry = l.reasonAry;

                  }

              });

              obj.rows.push(d);

            }

          });

        });

        St.chartData = obj;

        return St;

      },
      //单选或者多选
      choiceQuestion(opt){

        let St = {

          title:opt.title,

          type:opt.type,

          desc:opt.desc

        };

        let obj = {};

        obj.columns = ['选项','票数'];

        obj.rows = [];

        for(let i of opt.content){

          let d = {};

          d[obj.columns[0]] = i.title;

          d[obj.columns[1]] = 0;

          d.reasonAry = [];

          obj.rows.push(d);

        }

        for(let i of opt.answer){

          if(opt.type == "radio"){

            let t = i.content[0].radio.title;

            for(let j of obj.rows){

              if(j[obj.columns[0]] == t){

                j[obj.columns[1]]+=1;

                let p = {};

                p.reason = i.reason;

                j.reasonAry.push(p);

              }

            }

          }else if(opt.type == "checkbox"){

            for(let j of i.content){

              let t = j.title;

              for(let r of obj.rows){

                if(r[obj.columns[0]] == t){

                  r[obj.columns[1]]+=1;

                  let p = {};

                  p.reason = i.reason;

                  r.reasonAry.push(p);

                }

              }

            }

          }

        }

        St.chartData = obj;

        return St;

      },
      //去重统计
      arrayCnt(arr) {

        let newArr = [];
        //使用set进行数组去重
        newArr = [...new Set(arr)];

        let newarr2 = new Array(newArr.length);

        for(let t = 0; t < newarr2.length; t++) {

          newarr2[t] = 0;

        }

        for(let p = 0; p < newArr.length; p++) {

          for(let j = 0; j < arr.length; j++) {

            if(newArr[p] == arr[j]) {

              newarr2[p]++;

            }

          }

        }

        let obj = {

            newAry:newArr,

            statistics:newarr2

        };

        return obj;

      },
      //关闭
      clear(){

        this.openAlert = false;

        this.topicInfo = null;

        this.list = [];

      },
      //确定
      sever(){

        this.openAlert = false;

        this.assemblyDownloadDara(this.list);

        this.topicInfo = null;

        this.list = [];

      },
      //排序
      handleSortChange ({name, order}) {
        this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
      },
      //改变数据
      transformData(data){

          if(data.type == "checkbox" || data.type == "radio"){

            this.list = data.chartData.rows;

          }else{

            let newAry = [];

            data.chartData.rows.forEach((i,v) =>{

                let obj = {

                    "选项":i.人员,

                    "票数":i.票数,

                    "reasonAry":i.reasonAry

                };

              newAry.push(obj);

            });

            this.list = newAry;

          }

      },
      //监听子组件
      onLookDetail(data){

          this.topicInfo = data;

          this.transformData(data);

          this.openAlert = true;

      },
      //获取投票类型及人员分析
      getType(voteId){

        let url = process.env.VUE_APP_finishStatus;

        let data = {

          voteId:voteId,

          openid:"oJotX0ytmUnv9vQ1qxIwNfDlxAM8"

        };

        this.$http.post(url,data)

          .then((e) =>{

            if(e.success){

              this.voteInfo = e.data;

            }

          })

          .catch((er) =>{

            console.log(er);

          })

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

        console.log(Ary,'AryAryAryAryAryAryAryAryAryAryAryAryAryAryAryAryAryAryAryAryAryAryAryAryAryAryAryAryAryAryAry')

        // const defaultCellStyle =  { font: { name: "Verdana", sz: 11, color: "FF00FF88"}, fill: {fgColor: {rgb: "FFFFAA00"}}};

        // const wopts = { bookType:'xlsx', bookSST:false, type:'binary', defaultCellStyle: defaultCellStyle, showGridLines: false};

        try{

          // const wopts = { bookType:this.ExportTypeFn, bookSST:true, type:'binary'};
          //
          // const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
          //
          // wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(Ary)

          const wopts = { bookType:"xlsx", bookSST:true, type:'binary'};

          const wb = { SheetNames: [], Sheets: {}, Props: {} };

          if(Ary){

            for(let i = 0 ;i < Ary.length; i++){

              wb.SheetNames.push('Sheet'+(i+1));

              wb.Sheets['Sheet'+(i+1)] = XLSX.utils.json_to_sheet(Ary[i])

            }

          }

          //创建二进制对象写入转换好的字节流
          let tmpDown =  new Blob([this.s2ab(XLSX.write(wb, wopts))], { type: "application/octet-stream" })

          this.saveAs(tmpDown,this.topicInfo.title+'.xlsx')

        }
        catch (er) {

          console.log(er);

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
      //组装下载数据
      assemblyDownloadDara(Arr){

          let newAry = [];

          Arr.forEach((i) =>{

              let t = '\n';

              i.reasonAry.forEach((j) =>{

                  t+=j.reason+'\n';

              });

              i.入选原因 = t;

          });


          let newAry_two = JSON.parse(JSON.stringify(Arr));

          newAry_two.forEach((i) =>{

              delete i.reasonAry;

          });

          newAry.push(newAry_two);

          console.log(newAry,'ArrArrArrArrArrArrArrArrArrArrArrArrArr');

          this.downloadMater(newAry);

      },
      //下载为pdf
      downloadPdf(){

        let obj = {

          title:document.title,

          el:"#pdfDom"

        };

        this.exportPdf(obj);

      },
      //export_PDF_error
      export_PDF_error(str){

          console.log(str);

      }

    }

  }
</script>

<style scoped lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
  background: #ffffff;
  height: 100%;
  overflow: auto;
}
.wrapper{
  width: 700px;
  height: 500px;
}
  .vote_title{

    height: 80px;

    text-align: center;

    line-height: 80px;

    font-size: 20px;

    background: #ff5000;

    color: #ffffff;

  }
</style>
