<!--
 -  2018/10/17  lize
 -->
<template>
  <div class = "quill">
    <div class = "quill_Content">
      <Upload
        multiple
        :headers="header"
        :show-file-list="false"
        :action="serverUrl"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        name = "data"
        class = "avatar-uploader"
      >
        <Button icon="ios-cloud-upload-outline">Upload files</Button>
      </Upload>
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
    <div class = "tip">

      <p style="padding-left: 10px;">还可以输入{{tipNum}}个字</p>

    </div>
    <button @click = "getRichTextContent">获取内容HTML</button>
    <button @click = "setContents">设置内容HTML</button>
    <button @click = "getRichTextTxt">获取内容TEXT</button>
    <button @click = "setText">设置内容TEXT</button>
    <button @click = "setOnBlur">失去焦点</button>
    <button @click = "setOnFocus">获得焦点</button>
    <button @click = "clearRichText">清空文本</button>
    <button @click = "getnowLength">获取文本长度</button>
    <button @click = "setRichTextdisabled">设置不可用</button>
    <button @click = "setsetRichTextcontainer">是否隐藏工具栏</button>
    <button @click = "getRichTxtContentAry">获取文本数组</button>
    <button @click = "getSelection">获取用户选中的鼠标位置</button>
    <button @click = "setSelection">设置鼠标选中的位置</button>
    <button @click = "hasFocus">检查编辑器是否具有焦点</button>
    <button @click = "getBounds">检索给定位置处的像素位置</button>
    <button @click = "format">格式化当前用户选中文本的格式</button>
    <button @click = "formatText">设置给定出所含文本的格式</button>
    <button @click = "getFormat">检索给定范围内文本的常见格式</button>
    <button @click = "removeFormat">删除给定范围内的所有格式和嵌入</button>
    <button @click = "getModule">获取模块</button>
    <button @click = "FindQuillTmplate">寻找编辑器中模板</button>
    <button @click = "insertText">向编辑器内插入文本</button>
    <div class = "Quill_mask" v-if="imgClickFlag">

      <img :src="clickImgSrc" alt="">

      <span @click = "close_Pop">X</span>

    </div>
  </div>

</template>

<script>

  import { quillEditor } from "vue-quill-editor"; //调用编辑器

  import * as Quill from 'quill'  //引入编辑器

  import 'quill/dist/quill.core.css'

  import 'quill/dist/quill.snow.css'

  import 'quill/dist/quill.bubble.css'

  import {toolbarOptions} from './quill.conf'

  //quill编辑器的字体
  const fonts = ['SimSun', 'SimHei','Microsoft-YaHei','KaiTi','FangSong','Arial','Times-New-Roman','sans-serif'];

  const Font = Quill.import('formats/font');

  Font.whitelist = fonts; //将字体加入到白名单

  Quill.register(Font, true);

  //quill图片可拖拽上传
  import { ImageDrop } from 'quill-image-drop-module';

  Quill.register('modules/imageDrop', ImageDrop);

   export default {

      data() {

        return {

          imgClickFlag:false,

          clickImgSrc:'',

          tipNum:10,

          quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示

          content: null,

          editorOption: {

            placeholder: '',

            imageResize: {},

            theme: 'snow',  // or 'bubble'

            modules: {

              imageDrop:true,

              toolbar: {

                container: toolbarOptions,

                handlers: {

                  'image': function (value) {

                    if (value) {

                      // 触发input框选择图片文件
                      document.querySelector('.avatar-uploader input').click();

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

          serverUrl:'https://test-tools.cbim.org.cn/api/upload/v1/upload',  // 这里写你要上传的图片服务器地址

          header: {

            Authorization: "Bearer "+'29047046a1e3659a6ffe23dfe0b29a8520752134354e8e15b5dc18232c852e20',

          }

        }

      },
       components: {
         quillEditor
       },
      props:['masg','toolbar','MaxWords','incident'],
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

       },

       MaxWordsFn(){

         return Number(this.$props.MaxWords)+1

       },

        incidentFn(){

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

         }

         return obj

        }

     },
      mounted(){

        this.toolbarFn;

        this.tipNum = this.MaxWordsFn-1;

        //监听文字变化
        this.quill.on('text-change',(delta, oldDelta, source) =>{

          // console.log(delta)
          //
          // console.log(oldDelta)
          //
          // console.log(source)

        });

        //监听文字第一次变化
        this.quill.once('text-change',(e) =>{

          // console.log(e,'woshi diyic')

        });

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

        // 关闭弹窗
        close_Pop(){

          this.imgClickFlag = false;;

          this.clickImgSrc = '';

        },
        //onEditorReady
        onEditorReady({editor,conent}){

          this.$emit(this.incident.onReady,editor)

        },
        //onEditorBlur
        onEditorBlur(editor,content){

          this.$emit(this.incidentFn.onBlur,content)

        },
        //onEditorFocus
        onEditorFocus(editor,content){

          this.$emit(this.incidentFn.onFocus,content)

        },
        //富文本内容发生改变
        onEditorChange(e,strValue,decimalNum){

          e.quill.deleteText(decimalNum-1,1,strValue);//保留 strValue 的 前 decimalNum 位字符，

          this.tipNum = decimalNum- this.quill.getLength()

          this.disposeIMGMethod();

          this.$emit(this.incidentFn.onChange,this.content)

        },
        //上传文件之间
        beforeUpload(res,file) {

          console.log(res,file)

          // 显示loading动画
          this.$Spin.show();

        },
        //图片上传成功
        uploadSuccess(res, file) {

          // loading动画消失
          this.$Spin.hide();

          let quill = this.$refs.myQuillEditor.quill;

          if ( res.data ) {

            let length = this.quill.getSelection().index; // 获取光标所在位置

            let url = `https://test-tools.cbim.org.cn/api/download/v1/download?fileId=${res.data}`;

            this.quill.insertEmbed(length, 'image',url,{"width":"100%"}); // 插入图片  res.url为服务器返回的图片地址

            this.quill.setSelection(length + 1)  // 调整光标到最后

          } else {

            this.$Message.error('图片插入失败')

          }

        },
        // 图片上传失败
        uploadError() {

          this.$Spin.hide();   // loading动画消失

          this.$Message.error('图片插入失败1');

        },
        //获取富文本内容HTML
        getRichTextContent(){

          console.log(this.content)

          return this.content;

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

          console.log(this.quill.getSelection())

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

          let Img_Node = document.querySelectorAll("img")

          console.log(Img_Node);

          Img_Node.forEach((i,v) =>{

            let _this = this;

            i.style.maxWidth = "800px";

            i.style.maxHeight = "500PX";

            i.onclick = null;

            i.onclick = function(){

              _this.$emit(_this.incidentFn.onClickImg,i.currentSrc);

              _this.clickImgSrc = i.currentSrc;

              _this.imgClickFlag = true;;

            }

          })

        }

      }

    }
</script>

<style lang="scss">

  .quill{

    position:relative;

    height: 100%;

    width: 100%;

    .quill_Content{

      height: 95%;

      .avatar-uploader{

        display: none;

      }

      .quill-editor{

        height: 100%;

        width: 100%;

        border-top: 1px solid #cccccc;

        .ql-container{

          height: 90%;

        }

        .ql-snow{

          border-top: 1px solid #ccc;

        }

      }

    }
    .tip{

      height: 5%;

      text-align: right;

      color: #9cb945;
    }
    .Quill_mask{

      width: 100%;

      height: 100%;

      position:absolute;

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
