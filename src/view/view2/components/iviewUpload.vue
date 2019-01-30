<!--
 -  2019/1/16  lize
 -->
<template>

  <div>

    <Upload

      multiple

      :before-upload="handleUpload"

      ref = "upload"

      :data = "data"

      :show-upload-list = false

      :on-success = "success"

      :on-progress = "onProgress"

      action="http://127.0.0.1:3001/api/upload">

      <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>

    </Upload>

    <div v-if="files.length>0">Upload file: {{ files.name }}

    <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button>

    </div>

    <div>

      <p style="width: 100%;float: left">

        <span style="float: left;width: 20%;">我是待上传列表</span>

        <span @click="upload"  style="float: left;width: 20%;cursor: pointer;color: #aa00aa">上传</span>

      </p>

      <!--<div style="width: 75%;float: left">-->
        <!--<ul style="overflow:hidden; "  v-for="(i,index) in files">-->

          <!--<li style=" list-style:none;float: left;width: 40%;">{{i.name}}</li>-->

          <!--<li style="list-style:none;float: left;width: 20%;">{{i.size}}</li>-->

          <!--<li style="list-style:none;float: left;width: 20%;">{{i.type}}</li>-->

        <!--</ul>-->
      <!--</div>-->

      <!--<div style="width: 20%;float: left">-->

        <!--<ul  style="overflow: hidden" v-if="uploadFlag" v-for="(i,index) in fileList">-->

          <!--<li  style="list-style:none;float: left;width: 100%;">-->

            <!--<Progress :percent="i.percentage" />-->

          <!--</li>-->

        <!--</ul>-->

      <!--</div>-->

      <ul style="overflow:hidden;float: left;width: 100%; "  v-for="(i,index) in files">

        <li style=" list-style:none;float: left;width: 40%;">{{i.name}}</li>

        <li style="list-style:none;float: left;width: 20%;">{{i.size}}</li>

        <li style="list-style:none;float: left;width: 20%;">{{i.lastModified}}</li>

        <li style="list-style:none;float: left;width: 20%;">

          <Progress v-if="fileList.length>0 && per.indexOf(i.name) >0 " :percent=" fileList[per.indexOf(i.name)].percentage " />

        </li>

      </ul>

    </div>

    <div>

      <img style="height:400px;float: left " v-for="(item,index) in srcAry"  :src="srcUrl+item.src" alt="">

    </div>

  </div>

</template>

<script>
    export default {
        data () {
            return {

              per:[],

              files: [],

              loadingStatus: false,

              data:{a:''},

              srcUrl:'http://127.0.0.1:3001/',

              srcAry:[],

              fileList:[],

              uploadFlag:false,

            }
        },
        mounted () {

        },
        methods: {

          handleUpload(file){

            this.files.push(file);

            return false;

          },
          upload () {

              for(let i = 0,iMax = this.files.length; i<iMax; i++){

                  this.data.a = i;

                  this.$refs.upload.post(this.files[i])

//                  this.files.splice(i,1);
//
//                  i--;
//
//                  this.files.length--;


              }


//            this.files.map((item,index) =>{this.$refs.upload.post(item,"aaaaaaaaaaa")});

//            this.files = [];

          },

          success(res,file,filelist){

            res.ids.forEach((i,v) =>{

              this.srcAry.push({src:i});

            });

            this.per = [];

            this.fileList = [];

            this.files = [];

          },

          onProgress(e,file,fileList){

            for(let i of fileList){

                if(this.per.indexOf(i.name)<0){

                  this.per.push(i.name);

                }

            }

            this.fileList = fileList;

            this.uploadFlag = true;

          }

        }

    }
</script>

<style scoped lang="scss">

</style>
