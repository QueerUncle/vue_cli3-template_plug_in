<!--
 -  2019/1/30  lize
 -->
<template>

  <div class = "exportPdf" style="width: 100%;height: 100%;overflow: hidden">

    <button :style = "{backgroundColor:backgroundColor}" class = "exportPdfBtn" @click = "exportBtn"><slot>导出为PDF</slot></button>

  </div>

</template>

<script>
  import html2Canvas from 'html2canvas'

  import JsPDF from 'jspdf'

    export default {
        props:['params','Color'],
        data () {
            return {

            }
        },
        mounted () {

        },
        computed:{

            exportPdfParams(){

                let obj = {

                  title:document.title

                };

                let params = this.$props.params;

                if(!params.el){

                    this.$emit('error','el not defined!');

                    return false;

                }else{

                    obj.el = params.el;

                    if(params.title){

                        obj.title = params.title;

                    }

                }


                return obj;


            },

            backgroundColor(){

                let c = this.$props.Color ? this.$props.Color : "#2196f3";

                return c;

            }

        },
        methods: {
          //按钮点击
          exportBtn(){

            this.exportPdf(this.exportPdfParams);

          },
          //导出PDF--Function
          exportPdf(opt) {

            let title = opt.title;

            html2Canvas(document.querySelector(opt.el), {allowTaint: true})

              .then((canvas) =>{

                let contentWidth = canvas.width;

                let contentHeight = canvas.height;

                let pageHeight = contentWidth / 592.28 * 841.89;

                let leftHeight = contentHeight;

                let position = 0;

                let imgWidth = 595.28;

                let imgHeight = 592.28 / contentWidth * contentHeight;

                let pageData = canvas.toDataURL('image/jpeg', 1.0);

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

                PDF.save(title + '.pdf')

              })

              .catch((er) =>{

                console.log(er);

              })

          }

        }
    }
</script>

<style scoped lang="scss">

.exportPdfBtn{

  background-color: #2196f3;

  font-size: 14px;

  /*min-width: 88px;*/

  /*height: 36px;*/

  /*line-height: 36px;*/

  width: 100%;
  height: 100%;

  border-radius: 2px;

  color: #ffffff;

  -webkit-box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);

  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);

  display: inline-block;

  overflow: hidden;

  -webkit-transition-duration: .3s;

  transition-duration: .3s;

  -webkit-transition-timing-function: cubic-bezier(.23,1,.32,1);

  transition-timing-function: cubic-bezier(.23,1,.32,1);

  text-decoration: none;

  text-align: center;

  border: none;

  -webkit-appearance: none;

  -moz-appearance: none;

  appearance: none;

  outline: none;

  text-transform: uppercase;

  margin: 0;

  cursor: pointer;

  -webkit-box-flex: 0;

  -webkit-flex-shrink: 0;

  -ms-flex: 0 0 auto;

  -ms-flex-negative: 0;

  flex-shrink: 0;

  opacity: .89;

  padding: 0 18px;

  &:hover{

    opacity: 1;

  }

}
</style>
