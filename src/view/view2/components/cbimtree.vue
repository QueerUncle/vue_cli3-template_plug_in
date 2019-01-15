<!--
 -  2018/12/27  lize
 -->
<template>

  <div style="width: 1300px;margin: 0 auto;margin-top: 50px;">

    <cbimtree

      v-if="data"

      :data = data

      :loadData = loadData

      :pageData = pageData

       @on-select-change = "onSelectChage"

       @on-pageNo-change = "onPageNoChange"

      @on-click-self = "onClickSelf">

    </cbimtree>

  </div>

</template>

<script>
  import a from '../../../../public/wer.js'

    export default {

        data () {

            return {

                data:null,

                arr:[],

                params:{

                  groupId:1,

                  modelId:null,

                  level:null,

                  type:null,

                  plevel:0,

                  pageNo:1,

                  pageSize:30,

                }

            }
        },
        components:{

            cbimtree: () => import('../../../components/CBIMTREE1/index'),

        },
        mounted () {

            console.log(a,'222222222222222222222222222222')

            this.initialize();

        },
        methods: {
          //初始化
          initialize(){

            let params = {

              groupId:1,

              plevel:0,

              pageNo:1,

              pageSize:30,

            };

            this.requestTreeAjax(params).then((e) =>{

//                console.log(e.data.result,'我是eeeeeeee');

                this.data = e.data.result;

            });

          },
          //点击下拉剪头
          onSelectChage(data){

              console.log(data,'我是页面，点击下拉情况');

              if (data.level <5){

                  this.data = {

                  pageSize:10,

                  pageNo:1,

                  pageTotal:100,

                  count:1000,

                  data:this.wedc(data.level),

                };

              }else{

                  this.data = [];

              }

          },
          //点击分页
          onPageNoChange(data){

            console.log(data,'我是页面，点击分页的情况');

            if (data.level <5){

              this.data = this.wedc(data.level);

            }else{

              this.data = [];

            }

          },
          //自动生成数据
          wedc(data){

              let Ary = [];

              if(data.level<5){

                for(let i= 0; i<6; i++){

                  let obj = {

                    id : `${i}${data.level}${data.val}`,

                    title : `第${i}${data.level}${data.val}个`,

                    level:data.level+1,

                    checked:true,

                    extend:false,

                    showLoading:false,

                  };

                  if(data.type){

                    obj.level = data.subscript+1

                  }

                  Ary.push(obj);

                }

              }

              return Ary;

          },
          //分页自动生成数据
          wedcs(data){

            let Ary = [];

            if(data.level<5){

              for(let i= 0; i<6; i++){

                let obj = {

                  id : `${i}${data.level}${data.val}${data.val}`,

                  title : `第${i}${data.level}${data.val}${data.val}个`,

                  level:data.level+1,

                  checked:true,

                  extend:false,

                  showLoading:false,

                };

                if(data.type){

                  obj.level = data.subscript+1

                }

                Ary.push(obj);

              }

            }

            return Ary;

          },
          //异步加载方法
          loadData(item,callback){

//            console.log(item.level,'我是咯ading');

            if(item.level == 1){

              let params = {

                groupId:1,

                plevel:item.level,

                pageNo:1,

                pageSize:30,

              };

              this.requestTreeAjax(params).then((e) =>{

//                console.log(e.data.result,'我是eeeeeeee');

                callback(e.data.result)

              });

            }else if(item.level == 2){

              this.params.modelId = item.type;

              let params = {

                groupId:1,

                plevel:item.level,

                modelId:item.type,

                pageNo:1,

                pageSize:30,

              };

              this.requestTreeAjax(params).then((e) =>{

//                console.log(e.data.result,'我是eeeeeeee');

                callback(e.data.result)

              });

            }else if(item.level == 3){

              this.params.level = item.floor;

              let params = {

                groupId:1,

                plevel:item.level,

                modelId:this.params.modelId,

                level:item.floor,

                pageNo:1,

                pageSize:30,

              };

              this.requestTreeAjax(params).then((e) =>{

//                console.log(e.data.result,'我是eeeeeeee');

                callback(e.data.result)

              });


            }else if(item.level == 4){

              this.params.level = item.floor;

              let params = {

                groupId:1,

                plevel:item.level,

                modelId:this.params.modelId,

                level:this.params.level,

                type:item.type,

                pageNo:1,

                pageSize:30,

              };

              this.requestTreeAjax(params).then((e) =>{

//                console.log(e.data.result,'我是eeeeeeee');

                callback(e.data.result)

              });

            }else if(item.level == 5) {

                console.log()

              this.params.level = item.floor;

              this.params.type = item.type;

              let params = {

                groupId: 1,

                plevel: item.level,

                modelId: this.params.modelId,

                level: this.params.level,

                type: item.type,

                pageNo: 1,

                pageSize: 30,

              };

              this.requestTreeAjax(params).then((e) => {

//                console.log(e.data.result, '我是eeeeeeee');

                callback(e.data.result)

              });

            }

          },
          //分页加载
          pageData(item,callback){

//            console.log(item,'我是分页');

            if(item.level == 1){

              let params = {

                groupId:1,

                plevel:item.level,

                pageNo:item.val,

                pageSize:30,

              };

              this.requestTreeAjax(params).then((e) =>{

//                console.log(e.data.result,'我是eeeeeeee');

                callback(e.data.result)

              });

            }else if(item.level == 2){

              let params = {

                groupId:1,

                plevel:item.level,

                modelId:item.type,

                pageNo:item.val,

                pageSize:30,

              };

              this.requestTreeAjax(params).then((e) =>{

//                console.log(e.data.result,'我是eeeeeeee');

                callback(e.data.result)

              });

            }else if(item.level == 3){

              let params = {

                groupId:1,

                plevel:item.level,

                modelId:this.params.modelId,

                level:item.floor,

                pageNo:item.val,

                pageSize:30,

              };

              this.requestTreeAjax(params).then((e) =>{

//                console.log(e.data.result,'我是eeeeeeee');

                callback(e.data.result)

              });


            }else if(item.level == 4){

              let params = {

                groupId:1,

                plevel:item.level,

                modelId:this.params.modelId,

                level:this.params.level,

                type:item.parent.type,

                pageNo:item.val,

                pageSize:30,

              };

              this.requestTreeAjax(params).then((e) =>{

//                console.log(e.data.result,'我是eeeeeeee');

                callback(e.data.result)

              });

            }else if(item.level == 5) {

              let params = {

                groupId: 1,

                plevel: item.level,

                modelId: this.params.modelId,

                level: this.params.level,

                type: item.parent.type,

                pageNo:item.val,

                pageSize: 30,

              };

              this.requestTreeAjax(params).then((e) => {

//                console.log(e.data.result, '我是eeeeeeee');

                callback(e.data.result)

              });

            }






//            item.type = 'page';
//
//            let data = {
//
//              pageSize:10,
//
//              pageNo:item.val,
//
//              pageTotal:100,
//
//              count:1000,
//
//              data:this.wedcs(item),
//
//            };
//
//            callBack(data)

          },
          //点击自身
          onClickSelf(Ary){

              console.log(Ary,'我是页面返回值')

          },
          // 去重
          Distinct(dataAry,keyName){

              let keyAty = [];

              let newAry = [];

              for(let item of dataAry){

                  if(keyAty.includes(item[keyName])){

                    keyAty.push(item[keyName]);

                    newAry.push(item);

                  }

              }

              return newAry;

          },
          //请求树Ajax封装
          requestTreeAjax(params){

            let url = "/api/dp/v2/component/tree/level/multiple/page";

            return this.$http.get(url,{params:params});

          }

        }

    }
</script>

<style scoped lang="scss">

</style>
