<!--
 -  2018/12/13  lize
 -->
<template>
  <div class = "pageIndexContent" id = "pageIndexContent">

    <p>我是content</p>

    <ExportPdfAndImg

      type = "img"

      el = "#app"

      title = "test">

    </ExportPdfAndImg>

    <button @click = "downloadpdf">下载</button>

  </div>
</template>

<script>
  import Down from '../downloadImg'

  const DownPdf = new Down();

    export default {
        data() {
            return {}
        },
        components:{

              ExportPdfAndImg:() =>import('../ExportPdfAndImg.vue')

        },
        mounted() {

        },
        methods: {

          downloadpdf(){

              let obj ={

                el:'#app',

                title:'test',

                type:'pdf'

              };

            DownPdf.CreatedImg(obj)

          },

        }

    }
</script>

<style scoped lang="scss">

</style>
