<!--
 -  2019/6/17  lize
 -->

<!--

-  name:  导出PDF和IMG组件

-  parames:

-      <el: String类型 （需要导出div的ID 默认#app  例如#app

-      title: String类型 （需要导出文件的名称 默认dowload   例如 test）

-   type: String类型 （需要导出的文件格式(pdf or img)  默认pdf   仅支持pdf和img俩种。）

-->

<template>

  <div class = "ExportPdfAndImg" @click="ExportPdfAndImg">

    <slot>

      <button class = "defaultButtonCSS"><span>导出未PDF</span></button>

    </slot>

  </div>

</template>

<script>

  import html2Canvas from 'html2canvas'

  import JsPDF from 'jspdf'

  export default {

    props:{

      styles:{

        type:String,

      },

      type:{

        type:String,

        default:'pdf'

      },

      el:{

        type:String,

        default:'#app'

      },

      title:{

        type:String,

        default:'dowload'

      }

    },

    name:'ExportPdfAndImg',

    methods:{

      //下载方法
      saveFile(data, filename){

        let  save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');

        save_link.href = data;

        save_link.download = filename;

        let  event = document.createEvent('MouseEvents');

        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

        save_link.dispatchEvent(event);

      },
      //处理方法
      ExportPdfAndImg(){

        html2Canvas(document.querySelector(this.$props.el), {allowTaint: true})

          .then((canvas) =>{

            try{

              let pageData = canvas.toDataURL('image/jpeg', 1.0);

              this.$emit('on_created_ImgeSrc',pageData);

              if(this.$props.type == 'pdf'){

                let contentWidth = canvas.width;

                let contentHeight = canvas.height;

                let pageHeight = contentWidth / 592.28 * 841.89;

                let leftHeight = contentHeight;

                let position = 0;

                let imgWidth = 595.28;

                let imgHeight = 592.28 / contentWidth * contentHeight;

                let PDF = new JsPDF('', 'pt', 'a4');

                if (leftHeight < pageHeight) {

                  PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);

                } else {

                  while (leftHeight > 0) {

                    PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);

                    leftHeight -= pageHeight;

                    position -= 841.89;

                    if (leftHeight > 0) {

                      PDF.addPage();

                    }

                  }

                }

                PDF.save(`${this.$props.title}.pdf`)

              }else if(this.$props.type == 'img'){

                this.saveFile(pageData,`${this.$props.title}.png` );

              }

            }

            catch(er){

              console.log(er);

            }

          })

          .catch((er) =>{

            console.log(er);

          })

      },
    }

  }
</script>

<style lang = "scss" scoped>

  .ExportPdfAndImg{

    width:100%;

    height: 100%;

    .defaultButtonCSS{

      color: #fff;

      background-color: #1890ff;

      border-color: #1890ff;

      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);

      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);

      outline: 0;

      line-height: 1.499;

      display: inline-block;

      font-weight: 400;

      text-align: center;

      touch-action: manipulation;

      cursor: pointer;

      background-image: none;

      border: 1px solid transparent;

      white-space: nowrap;

      padding: 0 15px;

      font-size: 14px;

      border-radius: 4px;

      height: 32px;

      -webkit-user-select: none;

      -moz-user-select: none;

      -ms-user-select: none;

      user-select: none;

      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

      position: relative;

      margin-right: 8px;

      margin-bottom: 12px;

      -webkit-appearance: button;

      span{

        pointer-events: none;

        display: inline-block;

      }

      &:hover{

        color: #fff;

        background-color: #40a9ff;

        border-color: #40a9ff;

        /*background: #fff;*/

      }

    }

  }
</style>
