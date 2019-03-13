<!--
 -  2018/10/17  lize
 -->
<template>
  <div>
    <h1>index</h1>
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
    <a href="ccc.html">excel导入、导出</a>





    <a href="cbimIndex.html">CBIM2.0Test</a>

    &nbsp;
    &nbsp;
    &nbsp;
    &nbsp;
    <button @click = "getContent">获取</button>

    <button @click="getContentLength">获取长度</button>

    <div style="width: 1300px;height: 500px;margin: 1800px auto">

      <quill

        :data = "divHtml"

        placeholder = "1234567"

        :toolbar = false

        :incident = incident

        multiple

        :upload = upload

        ref = "quill"

        @on-blur = "onEditorBlur"

        @on-focus = "onEditorFocus"

        @on-ready = "onEditorReady"

        @on-change = "onEditorChange"

        @on-click-img = "onEditorImg"

      >

      </quill>

    </div>

    <div v-html = "divHtml"></div>

    <button @click = "axiosGet">axiosGet</button>

  </div>

  </template>

<script>

  // import obj from '/obj'

  // const obj = require('/obj')

  console.log(process.env,'我是process.env.NODE_ENVprocess.env.NODE_ENVprocess.env.NODE_ENV')

  import quill from '@/components/quill/index'

  // import axios from '../../axios'

  export default {
        data () {
            return {
                divHtml:'',
                masgs:`<h2 class="ql-align-center"><span class="ql-size-huge" style="color: rgb(230, 0, 0);">这是是回显的数据。</span></h2><p class="ql-align-center"><img src="https://test-tools.cbim.org.cn/api/download/v1/download?fileId=group1/M00/00/43/rBNM4VvyFfuAA-GgAABSMRfRKRQ702.jpg"></p><p class="ql-align-center"><br></p><p><strong>关注我们获得更多精彩内容</strong></p><p><br></p><p><strong>金秋十月</strong></p><p>走进了十月的金秋，天高云淡，爽风拂面，大自然舞动着画笔，在天山之巅、在奎河之畔，在浩瀚大漠边关，在胡杨林的深处，秋叶血染山谷的壮观，在缀满暮色婉约的小径上，尽情挥豪，喷洒浸染。</p><p><strong>怀旧</strong></p><p><strong>秋天是个怀旧的季节，很多的故事和人都在不经意中被勾连，悄悄的</strong></p><p><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;说声想念，似乎总是在这样一个凉气渐深的秋天，蓦然回首，发金色的秋天，仿佛一夜之间来临，漫卷尘埃，飞扬阡陌，席卷心的城池</strong></p><p><br></p><p><strong>代表秋天的植物</strong></p><p><br></p><p>1</p><p><strong>菊花</strong></p><p>不是花中偏爱菊，</p><p>此花开尽更无花。</p><p>— 元稹《菊花》</p><p>2</p><p><strong>枫树</strong></p><p>停车坐爱枫林晚，</p><p>霜叶红于二月花。</p><p>—杜牧《山行》</p><p><img src="https://test-tools.cbim.org.cn/api/download/v1/download?fileId=group1/M00/00/43/rBNM4VvyFiWAIVacAC3MlnYGlng111.jpg"></p><p>3</p><p><strong>银杏</strong></p><p>天师洞前有银杏，</p><p>罗列青城百八景。</p><p>-李善济《银杏歌》</p><p><strong>扫描二维码关注我们</strong></p>`,
                content:'我是李泽',
                incident:{

                  "onBlur":"on-blur",

                  "onFocus":"on-focus",

                  "onReady":"onready",

                  "onChange":"on-change",

                  "onClickImg":"on-click-img"

                },
            }
        },
      components:{

        quill,

      },
        mounted () {

//          console.log(process.env)

//          console.log(parmes,'parmes')

//          this.divHtml = this.masgs

//          this.divHtml = 'asdasdasdasdasdasdasdasdasdasd'

        },
        methods: {

          upload(files,callBack){

            console.log(files);

            let formdata=new FormData();// 创建form对象

            formdata.append('file',files[0]);

            let config = {

              headers: {

                'Content-Type':'multipart/form-data'

              }

            };

            let url = 'http://127.0.0.1:3001/api/upload';

            this.$http.post(url,formdata,config)

              .then((e) =>{

                console.log(e);

                let newAry = [];

                for(let i of e.ids){

                  let t = `http://127.0.0.1:3001/${i}`;

                  newAry.push(t);

                }

                let obj = {

                    success:true,

                    data:newAry

                };

                callBack(obj);

              })

              .catch((er) =>{

                console.log(er);

                let obj = {

                  success:false,

                  data:[]

                };

                callBack(obj);

              })

          },

          //点击图片
          onEditorImg(e){

//            console.log(e)

          },
          //失去焦点
          onEditorBlur(e){

            console.log(e)

          },
          //获取焦点
          onEditorFocus(e){

//            console.log(e)

          },
          //内容发生变化
          onEditorChange(e){

//             console.log(e)

          },
          //readr
          onEditorReady(e){

            console.log(e)

          },
          //获取内容
          getContent(){

              console.log(this.$refs.quill.getRichTextContent());

              this.divHtml = this.$refs.quill.getRichTextContent()

          },
          //获取长度
          getContentLength(){

            console.log(this.$refs.quill.getnowLength(),'我是长度！')

          },

          axiosGet(){

            this.$http({

              url:'/queryAarticle',

              method:'get'

            })

              .then((e) =>{

                console.log(e);

              })

            // axios.AXIOS.get('/queryAarticle')
            //
            //   .then((e) =>{
            //
            //     console.log(e)
            //
            //   })
            //   .catch((er) =>{
            //
            //     console.log(er);
            //
            //   })

          }

        }

    }
</script>

<style scoped lang="scss"></style>
