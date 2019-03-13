<!--
 -  2019/3/6  lize
 -->
<template>

  <div style="margin-top: 40px;">

    <!--<div v-for="(i,index) in data">-->

      <!--<Upload-->

        <!--action="http://10.80.2.32:3001/api/upload"-->

        <!--:on-progress = "onProgress"-->

        <!--:on-success = "onSuccess"-->

        <!--:on-error = "onError"-->

        <!--:show-upload-list="false"-->

        <!--:before-upload="handleBeforeUpload"-->

      <!--&gt;-->

        <!--<Button icon="ios-cloud-upload-outline" @click = "ewrew(index)">上传图片</Button>-->

      <!--</Upload>-->

      <!--<div>-->

        <!--<Progress :percent="i.progressa" />-->

        <!--<div style="width: 400px;height: 200px;">-->

          <!--<img style="width: 100%;height: 100%;" :src="i.src" alt="">-->

        <!--</div>-->

      <!--</div>-->

    <!--</div>-->

    <div ref="mbMenu">

      <input type="text" :value = "value" @click = "flag = true">

      <ul v-if="flag">

        <li v-for="(i,index) in data" @click = "value=index;flag = false;">

          123 --- wer

        </li>

      </ul>

    </div>

  </div>

</template>

<script>
    export default {
        data () {
            return {

                flag:false,

                value:'',

                data:[

                  {

                    src:'',

                    progressa:0,

                    uid:''

                  },

                  {

                    src:'',

                    progressa:0,

                    uid:''


                  },

                  {

                    src:'',

                    progressa:0,

                    uid:''


                  },

                  {

                    src:'',

                    progressa:0,

                    uid:''


                  },


                ],

              num:''

            }
        },
        mounted () {

          document.addEventListener('click', (e) => {

            if (!this.$refs.mbMenu.contains(e.target)) {

              this.flag = false

            }

          })

        },
        methods: {

          handleBeforeUpload(file){

              console.log(file);

              console.log(file.uid)


          },

          onProgress(event, file, fileList){

            console.log(event, file, fileList);

          },

          onSuccess(response, file, fileList){

            console.log(response, file, fileList)

          },

          onError(error, file, fileList){

            console.log(error, file, fileList)

          },

          ewrew(index){

              this.num = index;

          }

        }
    }
</script>

<style scoped lang="scss">

</style>
