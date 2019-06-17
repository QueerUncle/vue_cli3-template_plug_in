<!--
 -  2018/10/17  lize
 -->
<template>
  <div id = "QUILLWAARP" class = "quill">
    <div class = "quill_Content">
      <div class = "avatar-uploader">
        <input :class = "touchtime" :multiple="multiplefn"  @change="importFile($event)" type="file" accept="image/*">
      </div>
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event,content)"
        @focus="onEditorFocus($event,content)"
        @ready="onEditorReady($event,content)"
        @change="onEditorChange($event,0,MaxWordsFn)"
      >
      </quill-editor>
    </div>
    <div class = "tip" v-if="MaxWordsFn && !isLook">

      <p style="padding-left: 10px;">还可以输入{{tipNum}}个字</p>

    </div>
    <!--<button @click = "getRichTextContent">获取内容HTML</button>-->
    <!--<button @click = "setContents">设置内容HTML</button>-->
    <!--<button @click = "getRichTextTxt">获取内容TEXT</button>-->
    <!--<button @click = "setText">设置内容TEXT</button>-->
    <!--<button @click = "setOnBlur">失去焦点</button>-->
    <!--<button @click = "setOnFocus">获得焦点</button>-->
    <!--<button @click = "clearRichText">清空文本</button>-->
    <!--<button @click = "getnowLength">获取文本长度</button>-->
    <!--<button @click = "setRichTextdisabled">设置不可用</button>-->
    <!--<button @click = "setsetRichTextcontainer">是否隐藏工具栏</button>-->
    <!--<button @click = "getRichTxtContentAry">获取文本数组</button>-->
    <!--<button @click = "getSelection">获取用户选中的鼠标位置</button>-->
    <!--<button @click = "setSelection">设置鼠标选中的位置</button>-->
    <!--<button @click = "hasFocus">检查编辑器是否具有焦点</button>-->
    <!--<button @click = "getBounds">检索给定位置处的像素位置</button>-->
    <!--<button @click = "format">格式化当前用户选中文本的格式</button>-->
    <!--<button @click = "formatText">设置给定出所含文本的格式</button>-->
    <!--<button @click = "getFormat">检索给定范围内文本的常见格式</button>-->
    <!--<button @click = "removeFormat">删除给定范围内的所有格式和嵌入</button>-->
    <!--<button @click = "getModule">获取模块</button>-->
    <!--<button @click = "FindQuillTmplate">寻找编辑器中模板</button>-->
    <!--<button @click = "insertText">向编辑器内插入文本</button>-->
    <!--<div class = "Quill_mask" v-if="imgClickFlag">-->

      <!--<img :src="clickImgSrc" alt="">-->

      <!--<span @click = "close_Pop">X</span>-->

    <!--</div>-->

    <Modal title="View Image from Quill" v-model="imgClickFlag" @on-cancel="cancel" footer-hide width="850px" draggable>

      <img :src="clickImgSrc" v-if="imgClickFlag"  style="max-height: 750px;max-width:100%;margin: auto;">

    </Modal>

    <div class = "mack"></div>

  </div>

</template>

<script>

//  (function(){
//
//    var script = document.createElement('script');
//
//    script.type = 'text/javascript';
//
//    script.src = '/node_modules/quill-image-resize-module/image-resize.min.js';
//
//    document.getElementsByTagName('head')[0].appendChild(script);
//
//    script.onload = (e) =>{
//
//        console.log(e,'我是eeeeeeeeeeeee')
//
//    }
//
//  })();

//  var ImageResize = require('quill-image-resize-module');

  import { quillEditor } from "vue-quill-editor"; //调用编辑器

  import * as Quill from 'quill'  //引入编辑器

  import ImageResize from 'quill-image-resize-module';

  import 'quill/dist/quill.core.css'

  import 'quill/dist/quill.snow.css'

  import 'quill/dist/quill.bubble.css'

  import './font.css'

  import {toolbarOptions} from './quill.conf'

//  import { ImageResize } from 'quill-image-resize-module';

  //quill编辑器的字体
  const fonts = ['SimSun', 'SimHei','Microsoft-YaHei','KaiTi','FangSong','Arial','Times-New-Roman','sans-serif'];

  const Font = Quill.import('formats/font');

  import { Modal,Spin } from "iview";

  Font.whitelist = fonts; //将字体加入到白名单

  Quill.register(Font, true);

  //quill图片可拖拽上传
//  import { ImageDrop } from 'quill-image-drop-module';
//
//  Quill.register('modules/imageDrop', ImageDrop);

  Quill.register('modules/imageResize',  ImageResize );

   export default {

      props:['data','toolbar','MaxWords','incident','multiple','placeholder','upload',"disabled"],
      data() {

        return {

          imgClickFlag:false,

          clickImgSrc:'',

          tipNum:10,

          quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示

          content: null,

          isLook:false,

          editorOption: {

            placeholder: this.$props.toolbar
              ? ""
              : this.$props.placeholder
                ? this.$props.placeholder
                : "",

            imageResize: {

              modules: [ 'Resize', 'DisplaySize', 'Toolbar' ],

            },

            theme: 'snow',  // or 'bubble'

            modules: {

//              imageDrop:true,

              imageResize:true,

              toolbar: {

                container: toolbarOptions,

                handlers: {

                  'image': function (value) {

                    if (value) {

//                        console.log(dataTime,'3333333333333333333333333')
                      console.log(this)

//                      let str = `.${touchtime}`;
//
//
//                      console.log(str);
//
//                      document.querySelector(str).click();
                      console.log(this.container.offsetParent.firstChild.childNodes[0].childNodes[0])

                      const input = this.container.offsetParent.firstChild.childNodes[0].childNodes[0]

                      input.click();


//                      const input = this.container.offsetParent.nextSibling.nextElementSibling.childNodes[0].childNodes[0];

//                        console.log(input);

//                        console.log(document.querySelector(str));



                      // 触发input框选择图片文件
//                      document.querySelector('.avatar-uploader input').click();


                    } else {

                      this.quill.format('image', false);

                    }

                  },
                  'link':function(value){

                    if(value){

                      var href = prompt('请输入url');

                      this.quill.format('link', href);

                    }else{

                      this.quill.format('link', false);

                    }

                  }

                }

              }

            },

          },

          touchtime:new Date().getTime()

        }

      },
      components: {

       quillEditor

      },
     watch:{

       data(n){

         if(n){

           this.content =n;

//           this.$refs.myQuillEditor.quill.setContents(this.$props.data)

//           this.$refs.myQuillEditor.quill.root.innerHTML=this.$props.data;


//           this.$refs.myQuillEditor.quill.setText(this.$props.data)



//           window.scrollTo(0,0);

//           setTimeout(() =>{

//             this.quill.setSelection(this.quill.getLength())  // 调整光标到最后

//             this.$refs.myQuillEditor.quill.enable(true);

//             this.$refs.myQuillEditor.quill.blur();

//           },0);

         };

       },

       value(n){

         this.content = n

       },

     },
      computed: {

       quill() {

         return this.$refs.myQuillEditor.quill

       },

       toolbarFn(){

         let flag = false;

         if(this.$props.toolbar !=undefined){

           flag = this.$props.toolbar

         }

         this.$refs.myQuillEditor.quill.theme.modules.toolbar.container.hidden = flag;

          this.$refs.myQuillEditor.quill.enable(!flag)

         this.isLook = flag;

       },

       MaxWordsFn(){

           let t = false;

           if(this.$props.MaxWords){

             t = Number(this.$props.MaxWords)+1

           }

         return t

       },

       incidentFn(){

           this.touchtime = new Date().getTime();

         let incident = this.$props.incident;

         let obj = {

           "onBlur":"on-blur",

           "onFocus":"on-focus",

           "onReady":"on-ready",

           "onFocus":"on-change",

           "onClickImg":"on-click-img"

         };

         if(incident){

            if(incident.onBlur!==undefined && incident.onBlur != null && incident.onBlur !=''){

              obj.onBlur = incident.onBlur;

            }

           if(incident.onFocus!==undefined && incident.onFocus != null && incident.onFocus !=''){

             obj.onFocus = incident.onFocus;

           }

           if(incident.onReady!==undefined && incident.onReady != null && incident.onReady !=''){

             obj.onReady = incident.onReady;

           }

           if(incident.onChange!==undefined && incident.onChange != null && incident.onChange !=''){

             obj.onChange = incident.onChange;

           }

           if(incident.onClickImg!==undefined && incident.onClickImg != null && incident.onClickImg !=''){

             obj.onClickImg = incident.onClickImg;

           }

         }else{

             obj = {};

         }

         return obj

        },

       multiplefn(){

           let flag = false;

           if(this.$props.multiple!=undefined){

               flag = 'multiple';

           }

           return flag

       },

        disabledFn(){

          let flag = false;

          if(this.$props.disabled != undefined){

            flag = true;

          }

          return flag

        },

     },
      mounted(){

//          console.log()

        this.initialize();
        //监听文字变化
        this.quill.on('text-change',(delta, oldDelta, source) =>{

          // console.log(delta)
          //
          // console.log(oldDelta)
          //
          // console.log(source)

        });
        //监听文字第一次变化
        this.quill.once('text-change',(e) =>{});
        //监听富文本框发生变化
        this.quill.on('editor-change', function(eventName, ...args) {

          if (eventName === 'text-change') {

            // console.log(...args,'woshitext-change ')

          } else if (eventName === 'selection-change') {

            // console.log(...args,'woshi selection-change')

          }

        });

      },
      methods: {

        cancel(e){

          this.imgClickFlag = false;

          this.clickImgSrc = '';

        },

        //初始化
        initialize(){

            console.log(Quill.sources.USER,'Quill.sources.USERQuill.sources.USERQuill.sources.USER')

          this.setOnBlur();

          if(this.$props.data){

//              this.$refs.myQuillEditor.quill.setContents(this.$props.data)

//              this.$refs.myQuillEditor.quill.setText(this.$props.data)

            this.$refs['myQuillEditor'].quill.root.innerHTML=this.$props.data;

//              this.content =this.$props.data;

//            window.scrollTo(0,0);

//            setTimeout(() =>{

//                this.quill.setSelection(this.quill.getLength())  // 调整光标到最后

//                this.$refs.myQuillEditor.quill.enable(true);

//                this.$refs.myQuillEditor.quill.blur();

//            },0)

          };

          this.toolbarFn;

          this.tipNum = this.MaxWordsFn ? this.MaxWordsFn-1 : false ;

        },
        //input发生改变的时候
        importFile(e){

          this.$Spin.show();

          let files = e.target.files;

          try{

            if(files.length){

              this.$props.upload(files,callBack =>{

                this.$Spin.hide();

                console.log(callBack,'callBackcallBackcallBack')

                if(callBack.success && callBack.data && callBack.data.length>0){

                  for(let i of callBack.data){

                      console.log(this.quill,'444444444444444444444444444444444444444')

                      console.log(this.quill.getSelection(),'444444444444444444444444444444444444444')

                    let length = this.quill.getSelection().index; // 获取光标所在位置

//                    this.quill.insertEmbed(length, 'image',i,{alt:i},{"maxWidth":"200px;maxHeight:200px;"}); // 插入图片  res.url为服务器返回的图片地址

                    this.quill.insertEmbed(length, 'image',i,Quill.sources.USER); // 插入图片  res.url为服务器返回的图片地址

                    this.quill.setSelection(length + 1)  // 调整光标到最后

                  }

                }else{

                  this.$Message.error('图片插入失败')

                }

              });

            }else{

              this.$Spin.hide();

            }

          } catch (er) {

            this.$Spin.hide();

            console.log(er);

          }

        },
        // 关闭弹窗
        close_Pop(){

          this.imgClickFlag = false;

          this.clickImgSrc = '';

        },
        //onEditorReady
        onEditorReady({editor,conent}){

            if(this.incident && this.incident.onReady){this.$emit(this.incident.onReady,editor)}

        },
        //onEditorBlur
        onEditorBlur(editor,content){

            if(this.incidentFn && this.incidentFn.onBlur){this.$emit(this.incidentFn.onBlur,content)}

        },
        //onEditorFocus
        onEditorFocus(editor,content){

            if(this.incidentFn && this.incidentFn.onFocus){this.$emit(this.incidentFn.onFocus,content)}

        },
        //富文本内容发生改变
        onEditorChange(e,strValue,decimalNum){

          if(decimalNum){

            e.quill.deleteText(decimalNum-1,1,strValue);//保留 strValue 的 前 decimalNum 位字符，

            this.tipNum = decimalNum- this.quill.getLength();

          }

          this.disposeIMGMethod();

          if(this.incidentFn && this.incidentFn.onChange){this.$emit(this.incidentFn.onChange,this.content)}

        },
        //获取富文本内容HTML
        getRichTextContent(){

          let exportHtml = this.content;

          // document.querySelectorAll("P").forEach((i,v) =>{
          //
          //   if(i.innerText.indexOf("<"+"script"+">")>=0 || i.innerText.indexOf("</"+"script"+">")>=0 || i.innerText.indexOf("function")>=0){
          //
          //     exportHtml = false;
          //
          //   }
          //
          // })

          return exportHtml
          // return this.htmlEncode(exportHtml);

        },
        //设置HTML内容
        setContents(ary){

          ary = [
            { insert: 'Hello ' },
            { insert: 'World!', attributes: { bold: true } },
            { insert: '\n' }
          ]

          this.quill.setContents(ary);

        },
        //获取富文本内容TXT
        getRichTextTxt(){

          console.log(this.quill.getText())

          return this.quill.getText()

        },
        //设置文本内容
        setText(str){

          str = 'Hello'

          this.quill.setText('Hello');

        },
        //设置失去焦点
        setOnBlur(){

          this.quill.blur();

        },
        //获取焦点
        setOnFocus(){

          this.quill.focus();

        },
        //清空富文本内容
        clearRichText(){

          this.content = null;

        },
        //获取文本长度
        getnowLength(){

          return this.$refs.myQuillEditor.quill.getLength();

        },
        //设置不可编辑
        setRichTextdisabled(flag){

          this.quill.enable(flag);//设置不可用（true）为可用

        },
        //设置是否隐藏工具栏
        setsetRichTextcontainer(){

          this.$refs.myQuillEditor.quill.theme.modules.toolbar.container.hidden = true; // 隐藏工具栏

        },
        //获取文本内容数组
        getRichTxtContentAry(){

          console.log(this.quill.getContents())  //获取文本内容数组

        },
        //设置文本
        setText(str){

          this.quill.setText(str);

        },
        //获取用户选中的鼠标位置
        getSelection(){

          console.log(this.quill)
          console.log(this.quill.getSelection)

          return this.quill.getSelection()

        },
        //设置鼠标选中的位置
        setSelection(){

          this.quill.setSelection(0,5)

        },
        //检查编辑器是否具有焦点
        hasFocus(){

          console.log(this.quill.hasFocus())

        },
        //检索给定位置处的像素位置
        getBounds(){

          console.log(this.quill.getBounds(1))

        },
        //格式化当前用户选中文本的格式
        format(){

          this.quill.format("color","red");

        },
        //设置给定出所含文本的格式
        formatText(obj,a){

          obj = obj == undefined ? {'bold': false, 'color': 'red'} : obj ;

          a = a == undefined ? this.getSelection() : a ;

          console.log(obj,a)

          this.quill.formatText(a.index, a.length,obj);

        },
        //检索给定范围内文本的常见格式
        getFormat(obj){

          if(obj){

            console.log(this.quill.getFormat(obj.index,obj.length));

          }else{

            console.log(this.quill.getFormat());

          }

        },
        //删除给定范围内的所有格式和嵌入
        removeFormat(){

          let a = this.getSelection();

          this.quill.removeFormat(a.index,a.length);

        },
        //讲文本插入到制定位置
        insertText(txt){

          this.quill.insertText(txt);

        },
        //获取模块
        getModule(tmp){

          tmp = "toolbar";

          console.log(this.quill.getModule(tmp))

          return this.quill.getModule(tmp)

        },
        //寻找指定Dom节点
        FindQuillTmplate(FindNode){

          FindNode = document.querySelector('img');

          let Node = Quill.find(FindNode);

          console.log(Node);

          return Node;

        },
        //给所有imgdom绑定样式及事件
        disposeIMGMethod(){

          let QuillWarp = document.querySelector("#QUILLWAARP");

          let Img_Node = QuillWarp.querySelectorAll("img");

          Img_Node.forEach((i,v) =>{

            let _this = this;

            let style = {

                maxWidth:200+'px',

                maxHeight:200 + 'px'

            };

            i.setAttribute('style','max-width:200px;max-height:200px');

//            i.style.maxWidth = "200px";
//
//            i.style.maxHeight = "200PX";

//            i.style.minWidth = "200PX";
//
//            i.style.minHeight = "200PX";

            i.onclick = null;

            i.onclick = () =>{

              if(_this.incidentFn && _this.incidentFn.onClickImg){ _this.$emit(_this.incidentFn.onClickImg,i.currentSrc);}

              _this.clickImgSrc = i.currentSrc;

              _this.imgClickFlag = true;

            }

          })

        },

      }

    }
</script>
<style lang="scss" scoped>

  .mack{

    width: 100%;

    height: 100%;

    background: #dedede;

    opacity: 0.3;

    position: absolute;

    top:0;

    left: 0;

  }

  .quill{

    position:relative;

    height: 100%;

    width: 100%;

    .quill_Content{

      height: 100%;

      .avatar-uploader{

        display: none;

      }

      .quill-editor{

        height: calc( 100% - 42px);

        width: 100%;

        border-top: 1px solid #cccccc;

        /deep/ .ql-container{

          height: 91.5%;

        }

        /deep/ .ql-snow{

          border-top: 1px solid #ccc;

        }

      }

    }
    .tip{

      height: 6%;

      text-align: right;

      color: #9cb945;

      padding-right: 20px;

      line-height: 30px;

      border: 1px solid #ccc;

      border-top: none;

    }
    .Quill_mask{

      width: 100%;

      height: 100%;

      position:fixed;

      left:0;

      top:0;

      background: rgba(0, 0, 0, 0.5);

      z-index: 100;

      display: flex;

      justify-content: center;

      align-items: center;

      span{

        float: right;

        color: white;

        display: inline-block;

        width: 40px;

        height: 40px;

        text-align: center;

        line-height: 40px;

        font-size: 20px;

        cursor: pointer;

      }

      img{

        width:90%;

        height: 90%;

        position: relative;

      }

    }

  }

  /deep/ .ivu-modal-body{

    text-align: center;

  }

  .quill-code {
    border: none;
    height: auto;
    > code {
      width: 100%;
      margin: 0;
      padding: 1rem;
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0;
      height: 10rem;
      overflow-y: auto;
      resize: vertical;
    }
  }
  .ql-align-center{
    margin: 0 auto!important;
  }
  /*.ql-editor img{*/
  /*max-width:90%!important;*/
  /*}*/
</style>
