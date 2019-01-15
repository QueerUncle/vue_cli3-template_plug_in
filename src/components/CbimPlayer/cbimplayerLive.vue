<!--
 -  2018/12/17  lize
 -->
<template>

  <div class = "CBIM_PLAYER" id="CBIM_PLAYER_LIVE">

    <div v-if="videoDataFn.flag && !error" class = "video_player" :id = "videoDataFn.idName" style = "width:100%;height:auto"></div>

    <div v-if="!videoDataFn.flag" class = "video_player video_player_error"  style = "width:100%;height:auto">

      CBIM_PLATER 初始化失败

    </div>

    <div v-if="error" class = "video_player video_player_error_flash" style = "width:100%;height:auto;color: #3b4249">

      <div class="flash_install" style="width: 100%;position: relative;top: 120px;background: #3b4249">

        <a style="color:#cccccc;font-size:16px;text-decoration:underline;" href="http://www.adobe.com/go/getflashplayer_cn" onfocus="this.blur()">

          <img src="http://player.cntv.cn/flashplayer/logo/get_adobe_flash_player.png">

          <p style="margin-top:8px;color:#cccccc">请点此安装最新Flash</p>

        </a>

      </div>

    </div>

  </div>

</template>

<script>
    export default {

        data () {

            return {

              TcPlayer:'',

              error:false,

            }

        },
        props:['videoData'],
        computed:{

          videoDataFn(){

            const m3u8 = (/^http:\/\/\S*.m3u8$/i);

            const mp4 = (/^http:\/\/\S*.mp4$/i);

            const flv = (/^http:\/\/\S*.flv$/i);

            const rtmp = (/^rtmp:\/\/\S*$/i);


            let startPatch = {

              url:"https://test-tools.cbim.org.cn/api/download/v1/download?fileId=group1/M00/00/43/rBNM4VvykUKAIFUaAAAi5sWDNXU257.jpg",

              stretch:false,

            };

            let obj = {

                flag:true,

                "channel_id":'',

                "app_id":"",

                "live_url":"",  //播放地址1

                "live_url2":'', // 播放地址2

                https:0,

                "hide_volume_tips	":0,

            };

            let videoData = this.$props.videoData;

            if(videoData){

              obj = this.extend(obj,videoData,true);

            }

            if(obj.channel_id && obj.app_id){

                delete obj.live_url;

                delete obj.live_url2;

            }else{

              if(obj.live_url){

                if(!m3u8.test(obj.live_url) && !flv.test(obj.live_url) && !rtmp.test(obj.live_url) ){

                  obj.live_url = "";

                }

              }

              if(obj.live_url2){

                if(!m3u8.test(obj.live_url2) && !flv.test(obj.live_url2) && !rtmp.test(obj.live_url2) ){

                  obj.live_url2 = "";

                }

              }

              if(!obj.live_url && !obj.live_url2){obj.flag = false;}else{delete obj.channel_id;delete obj.app_id}

            }

            if(!obj.h5_start_patch){

              obj.h5_start_patch = startPatch;

            }else{

              if(!obj.h5_start_patch.url){obj.h5_start_patch.url = startPatch.url};

              if(!obj.h5_start_patch.stretch){obj.h5_start_patch.stretch = startPatch.stretch};

            }


            if(!obj.pauseMetodName){obj.pauseMetodName = "on-pause-live"}

            if(!obj.playEndMethodName){obj.playEndMethodName = "on-playEnd-live"}

            if(!obj.idName){obj.idName = `CbimPlayer_${new Date().getTime()}_live`;}

            let parameter = {

              obj :obj,

              flag:obj.flag,

              idName:obj.idName,

              pauseMetodName:obj.pauseMetodName,

              playEndMethodName:obj.playEndMethodName,

            };

            console.log(parameter,'我是通用');

            return parameter

          },

        },
        mounted () {


            this.$nextTick(


              this.loadHLSScript()

            )

        },
        methods: {
          //加载hls.js
          loadHLSScript(){

            let _this = this;

            let script   = document.createElement('script');

            script.type = "text/javascript";

            script.src = "//qzonestyle.gtimg.cn/open/qcloud/video/live/h5/live_connect.js";

            script.onload = function(e){

              _this.initializeTcPlayerlive();

            };

            document.getElementById("CBIM_PLAYER_LIVE").appendChild(script);

          },
          //初始化Tc-Player（点播）
          initializeTcPlayerlive(){

            let _this = this;

            if(this.videoDataFn.flag){

              this.TcPlayer = new qcVideo.Player(this.videoDataFn.idName,this.videoDataFn.obj,{playStatus:(status,type) =>{

                  console.log(status,type,'111')

                  if(type.code == -1){

                      this.error = true;

                  }

              }});

            }

          },
          //合并参数
          extend(o,n,override) {

            for(let key in n){

              if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){

                if(n[key]!=""){

                  o[key]=n[key];

                }

              }

            }

            return o;

          },
          //开始播放
          play(){

              return this.TcPlayer.play();

          },
          //停止播放
          stop(){

              return this.TcPlayer.stop();

          },
          //暂停
          pause(){

              return this.TcPlayer.pause();

          },
          //回复播放
          resume(){

              return this.TcPlayer.resume();

          },
          //添加弹幕
          addBarrage(barrage){

            return this.TcPlayer.addBarrage(barrage);

          },
          //关闭弹幕
          closeBarrage(){

              this.TcPlayer.closeBarrage();

          }

        }
    }
</script>

<style scoped lang="scss">
  .CBIM_PLAYER {

    width: 100%;

    height: 100%;

    overflow: hidden;

    .video_player {

      width: 100%;

      height: 100% !important;

    }

    .video_player_error {

      text-align: center;

      padding-top: 30%;

      color: red;

      background: #3b4249;

    }
    .video_player_error_flash {

      text-align: center;

      color: red;

      background: #3b4249;

    }
  }
</style>
