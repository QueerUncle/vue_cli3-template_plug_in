<!--
 -  2019/1/14  lize
 -->
<template>

  <div class = "answerSheet" style="margin-top: 46px;">

      <van-nav-bar

        fixed

        :left-text = "SwipeIndex+1+'/'+ result.length"

        :right-text="SwipeIndex+1 == result.length ? '提交' : '下一题' "

        @click-right="next"

      >

      </van-nav-bar>

      <van-swipe v-if = "result.length>0" style = "height:100%;overflow-y: auto"  ref = "Swipe"  @change = "onChange" :loop = "false" :show-indicators = "false" :touchable = "false">

        <van-swipe-item  v-for = "(item,index) in result" :key = "index+1">

          <!--<Select-tem style="margin-bottom: 30px;" @on-focus = "ChildNodeOnFocus" v-if="item!=null && item.type == 'select'" :overallLnegth = "result.length"  :data = "item"></Select-tem>-->

          <Input-search-tem style="margin-bottom: 30px;" @on-focus = "ChildNodeOnFocus" v-if="item!=null && item.type == 'select'" :overallLnegth = "result.length"  :data = "item"></Input-search-tem>

          <Text-tem style="margin-bottom: 30px;" v-if="item!=null && item.type == 'text'" :overallLnegth = "result.length"  :data = "item"></Text-tem>

          <Radio-tem style="margin-bottom: 30px;"  v-if="item!=null && item.type == 'radio'" :overallLnegth = "result.length" :data = "item"></Radio-tem>

          <Checkbox-tem style="margin-bottom: 30px;" v-if="item!=null && item.type == 'checkbox'" :overallLnegth = "result.length" :data = "item"></Checkbox-tem>

        </van-swipe-item>

      </van-swipe>

      <!--<van-button v-if = " result.length>0 && SwipeIndex < result.length-1 && flag" class = "btn" block type="primary" size="normal" @click = "next">下一题</van-button>-->

      <!--<van-button v-if = " result.length>0 && !( SwipeIndex < result.length-1 ) && flag" :loading = "loading" class = "btn" block type="primary" size="normal" @click = "next">提交答案</van-button>-->

      <div v-if="hintFlag" style="margin: 50px auto 0;text-align: center">

        <p>没有更多了……</p>

      </div>

      <div class = "mack" v-if="loading"><van-loading class = "vanLoading"/></div>

      <van-popup v-model="show" position="bottom">

        <van-picker

          show-toolbar

          title="请选择"

          :columns="columns"

          @cancel="onCancel"

          @confirm="onConfirm"

        >

        </van-picker>

    </van-popup>

  </div>

</template>

<script>
    export default {
        data () {
            return {

                result:[],

                SwipeIndex:0,

                flag:false,

                loading:false,

                hintFlag:false,

                columns: [],

                show:false,

                inputValue:{},

                itemIndex:"",

                subscript:0,

            }

        },
        components:{

          TextTem:() => import('../components/TextTem'),

          RadioTem:() => import('../components/RadioTem1'),

          CheckboxTem:() => import('../components/CheckboxTem1'),

          SelectTem:() =>import('../components/SelectTem'),

          InputSearchTem:() => import('../components/InputSearchTem')

        },
        mounted () {

          this.initialize();

        },
        methods: {

          onConfirm(value, index) {

            this.result[this.subscript-1].value[this.itemIndex].title = value;

            this.result[this.subscript-1].value[this.itemIndex].message = "";

            this.show = false;

          },

          onCancel() {

            this.show = false;

//            if(!this.result[this.subscript-1].value[this.itemIndex].title){

//              this.result[this.subscript-1].value[this.itemIndex].message = "格式错误";
//
//            }

          },

          ChildNodeOnFocus(flag,index,subscript){

              this.show = flag;

              if(flag){

                this.itemIndex = index;

                this.subscript = subscript;

              }

          },

          //初始化
          initialize(){

              if(!this.$store.state.userInfo){

                  this.$router.push('/')

              }else{

                this.getTestQueryDetail();

              }

          },
          //页面跳转
          linkTo(){

              this.$router.push('/')

          },
          //切换Swipe
          onChange(val){

            this.SwipeIndex = val;

          },
          //下一题
          next(){

              let flag = this.verification(this.result[this.SwipeIndex]);

              if(flag){

                if(this.SwipeIndex<this.result.length-1){

                  this.SwipeIndex++;

                  this.$refs.Swipe.swipeTo(this.SwipeIndex)

                }else{

                  this.loading = true;

                  this.getUserInfo();

                }

              }else{

                this.verification(this.result[this.SwipeIndex]);

              }

          },
          //验证
          verification(obj){

              let flag = true;

              let Ary = obj.value;

              let Remarks = obj.remarks;

              if(!Ary){

                flag = false;

              }else{

                if(obj.type == "text"){

                  let NewAry = [];

                  Ary.forEach((i) =>{

                      if(i.title!=="" && i.message==""){

                        NewAry.push(i);

                      }

                  });

                  if(NewAry.length<obj.min || NewAry.length>obj.max){

                    flag = false;

                    this.$toast(`该项最少需要填${this.result[this.SwipeIndex].min}项,最多能填${this.result[this.SwipeIndex].max}项！`);

                  }else{

                    if(Remarks.force_explanation){

                        if(!Remarks.value || Remarks.message!="" ){

                            flag = false;

                            this.$toast(`请填写备注项！`);

                        }

                    }

                  }

                }else if (obj.type == "select"){

                  let NewAry = [];

                  let remarksAry = [];

                  console.log(Ary);

                  Ary.forEach((i) => {

                    if (Remarks.force_explanation) {

                      if (i.title !== "" && i.message == "" && i.remarks.value !== "" && i.remarks.message == "") {

                        NewAry.push(i);

                      }

                    } else {

                      if (i.title !== "" && i.message == "") {

                        NewAry.push(i);

                      }

                    }

                  });

                  if(NewAry.length<obj.min || NewAry.length>obj.max){

                    flag = false;

                    this.$toast(`该项最少需要填${this.result[this.SwipeIndex].min}项,最多能填${this.result[this.SwipeIndex].max}项,理由也必须填写！！`);

                  }else{

                    NewAry.forEach((i) =>{

                      remarksAry.push(i.remarks.value);

                      delete i.remarks;

                    });

                    obj.remarks.value = JSON.stringify(remarksAry);

                    Ary.forEach((i) =>{

                      if(i.remarks){

                        delete i.remarks;

                      }

                    })

                  }

                }else if(obj.type == "radio"){

                    let radio = obj.value[0].radio;

                    if(radio == ""){

                      flag = false;

                      this.$toast(`该项最少需要选择${this.result[this.SwipeIndex].min}项,最多选择${this.result[this.SwipeIndex].max}项！`);

                    }else{

                      if(Remarks.force_explanation){

                        if(!Remarks.value || Remarks.message!="" ){

                            flag = false;

                            this.$toast(`请填写备注项！`);

                        }

                      }


                    }

                }else if(obj.type == "checkbox"){

                  if(Ary.length<obj.min || Ary.length>obj.max){

                    flag = false;

                    this.$toast(`该项最少需要选择${this.result[this.SwipeIndex].min}项,最多选择${this.result[this.SwipeIndex].max}项！`);

                  }else{

                    if(Remarks.force_explanation){

                      if(!Remarks.value || Remarks.message!="" ){

                        flag = false;

                        this.$toast(`请填写备注项！`);

                      }

                    }

                  }

                }

              }

              return flag;

          },
          //获取试题详情
          getTestQueryDetail(){

              let url = process.env.VUE_APP_getProblemsList;

              let data = {

                  id:this.$route.query.id,

                  openid:this.$route.query.openid

              };

              this.$http.post(url,data)

                .then((e) =>{

                  console.log(e.data);

                  if(!e.success){

                    this.$dialog.alert({

                      message: '服务器错误！'

                    }).then(() => {

                      this.$router.push('/')

                    });

                  }else{

                    if(e.data == null){

                        e.data = [];

                        this.hintFlag = true;

                        return

                    }

                    this.dataInit(e.data);

                    this.result = e.data;

                    this.flag = true;

                  }

                })
                .catch(() =>{

                  this.$store.state.hintStr = "服务器错误";

                  this.$store.state.isgetUserInfo = false;

                  this.$router.push({path:'/hintTem',query:{title:this.$route.meta.title,path:this.$route.path}})


                })

          },
          //处理数据
          dataInit(Ary){

             Ary.forEach((i) =>{

              for(let t = 0,Maxt = i.max; t< Maxt ;t++){

                if(i.type == 'text'){

                  i.value.push({title:'',message:''});

                }else if(i.type == 'radio'){

                  i.value.push({radio:''});

                }else if(i.type == "select" ){

                  i.value.push({title:'',message:'',remarks:{force_explanation:1,value:"",message:''}});

                }

              }

              if(i.type == "select"){

                  for(let i of i.content){

                      this.columns.push(i.title);

                  }

              }

            });

          },
          //提交数据
          postTestQuery(obj){

//              let url = "http://api.china-bim.org/mock/25/api/postAnswers";

//              let url = "/api/postAnswers";

            let url = process.env.VUE_APP_postAnswers;

            this.$http.post(url,obj)

                .then((e) =>{

                  if(e.success){

                    this.loading = false;

                    this.backIndex();

                  }else{

                    this.loading = false;

                    this.$toast({message:'提交失败，请稍后重试！',duration:1500});

                  }

                })

                .catch(() =>{

                  this.$store.state.hintStr = "服务器错误";

                  this.$store.state.isgetUserInfo = false;

                  this.$router.push({path:'/hintTem',query:{title:this.$route.meta.title,path:this.$route.path}})

                })

          },
          //返回首页
          backIndex(){

            this.$dialog.alert({

              message: '提交成功,返回首页。',

              confirmButtonText: '好的'

            }).then(() => {

              this.$router.push('/');

            })

          },

          getUserInfo(){

//            let url = "http://api.china-bim.org/mock/25/api/getUserInfo";

//            let url = "/api/getUserInfo";

            let url = process.env.VUE_APP_getUserInfo;

            this.$http.get(url)

              .then((e) =>{

                let obj = {

                  userInfo:e.data,

                  answer:this.result

                };

                this.postTestQuery(obj);

              })

              .catch(() =>{

                this.$store.state.hintStr = "服务器错误";

                this.$store.state.isgetUserInfo = false;

                this.$router.push({path:'/hintTem',query:{title:this.$route.meta.title,path:this.$route.path}})

              })

          },

        }

    }
</script>

<style scoped lang="scss">
.answerSheet{

  .btn{

    background: #4875AE;

    color: #ffffff;

    width: 90%;

    margin: 50px auto;

  }
  .mack{

    width: 100%;

    height:100vh;

    position: fixed;

    top: 0px;

    left: 0px;

    z-index: 100;

    background: rgba(0, 0, 0, 0.5);

    .vanLoading{

      position: fixed;

      top: 50%;

      left: 50%;

      transition: 0.3s ease-out;

      transform: translate3d(-50%, -50%, 0);

    }

  }

}

</style>
