<!--
 -  2018/11/19  lize
 -->
<template>

    <div class = "CBIM_PLAYER" id="CBIM_PLAYER">

        <div v-if="videoDataFn.flag" class = "video_player" :id = "videoDataFn.idName" style = "width:100%;height:auto"></div>

        <div v-if="!videoDataFn.flag" class = "video_player video_player_error" :id = "videoDataFn.idName" style = "width:100%;height:auto">

          CBIM_PLATER 初始化失败

        </div>

    </div>

</template>

<script>

  export default {

      data() {

          return {

            TcPlayer:'',

          }

      },

      created(){},

      props:['videoData'],

      computed:{

        videoDataFn(){

          const m3u8 = (/^http:\/\/\S*.m3u8$/i);

          const mp4 = (/^http:\/\/\S*.mp4$/i);

          const flv = (/^http:\/\/\S*.flv$/i);

          const rtmp = (/^rtmp:\/\/\S*$/i);

          let coverpic = {

            "src":"https://test-tools.cbim.org.cn/api/download/v1/download?fileId=group1/M00/00/43/rBNM4VvykUKAIFUaAAAi5sWDNXU257.jpg",

              "style":"cover"

          };

          let obj = {

            "autoplay": true,  //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的

            "width": '100%',//视频的显示宽度，请尽量使用视频分辨率宽度

            "height": '100%',//视频的显示高度，请尽量使用视频分辨率高度，

            "controls":"default",  //是否显示控件。

            "flag":true,

            "flash":false,

          };

          let videoData = this.$props.videoData;


          if(videoData){

            obj = this.extend(obj,videoData,true);

          }

          if(videoData.videoUrl){

            if(m3u8.test(videoData.videoUrl)){

              obj = Object.assign(obj,{'m3u8':videoData.videoUrl})

            }else if(mp4.test(videoData.videoUrl)){

              obj = Object.assign(obj,{'mp4':videoData.videoUrl})

            }else if(flv.test(videoData.videoUrl)){

              obj = Object.assign(obj,{'flv':videoData.videoUrl})

            }else if(rtmp.test(videoData.videoUrl)){

              obj = Object.assign(obj,{'rtmp':videoData.videoUrl})

            }

          }else{

            obj.flag = false;

          }

          if(!obj.coverpic){

              obj.coverpic = coverpic

          }else{

            if(!obj.coverpic.src){obj.coverpic.src = coverpic.src};

            if(!obj.coverpic.style){obj.coverpic.style = coverpic.style};

          }

          if(!obj.pauseMetodName){obj.pauseMetodName = "on-pause"}

          if(!obj.playEndMethodName){obj.playEndMethodName = "on-playEnd"}

          if(!obj.idName){obj.idName = `CbimPlayer_${new Date().getTime()}`;}

          let parameter = {

            obj :obj,

            "flag":obj.flag,

            idName:obj.idName,

            pauseMetodName:obj.pauseMetodName,

            playEndMethodName:obj.playEndMethodName,

          };

          console.log(parameter,'asdasdadsasdasdasd')

          return parameter

        },

      },

      mounted() {

        this.initializeTcPlayer();

      },

      methods: {
        //初始化Tc-Player（普通）
        initializeTcPlayer(){

          import('tcplayer/TcPlayer').then((e) => {

            const TcPlayer = e.TcPlayer;

            let _this = this;

            if(this.videoDataFn.flag){

              this.TcPlayer = new TcPlayer(this.videoDataFn.idName,this.videoDataFn.obj);

              this.TcPlayer.listener = function(e){

                if(e.type == 'pause'){  //暂停

                  if(_this.getCurrentTime()< _this.getDuration()){

                    _this.$emit(_this.videoDataFn.pauseMetodName,_this.getCurrentTime())

                  }

                }else if(e.type == "load"){   //加载完毕

                  _this.getDuration();

                }else if(e.type == "play"){  //开始播放

                  _this.getCurrentTime();

                }else if(e.type == "ended"){  //播放结束

                  _this.$emit(_this.videoDataFn.playEndMethodName,_this.getCurrentTime())

                }

              }

            }

          })

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
        //播放视频
        play(){

          return this.TcPlayer.play();

        },
        //暂停视频
        pause(){

          return this.TcPlayer.pause();

        },
          //获取时间
        getCurrentTime(){

          return this.TcPlayer.currentTime()

        },
        //设置时间
        setCurrentTime(num){

          this.TcPlayer.currentTime(num)

          this.pause();

        },
        //获取音量
        getVolume(){

          return this.TcPlayer.volume()//获取音量

        },
        //设置音量
        setVolume(num){

          this.TcPlayer.volume(num)

        },
        //获取视频总长
        getDuration(){

          return this.TcPlayer.duration()//获取视频总长

        },
        //销毁实例
        destroy(){

          this.TcPlayer.destroy();

        },
        //检查视频是否在播放中
        playing(){

          return this.TcPlayer.playing();

        },
        //设置静音状态
        mute(f){

          let t;

          if(f && f !== "" && f != undefined && f != null){

            this.TcPlayer.mute(f)

            t = f;

          }else{

            t = this.TcPlayer.mute()

          }

          return t;

        },
        //设置是否全屏
        fullscreen(f){

          let t;

          if(f && f !== "" && f != undefined && f != null){

            this.TcPlayer.fullscreen(f)

            t = f;

          }else{

            t = this.TcPlayer.fullscreen()

          }

          return t;

        },
        //获取视频缓冲书百分比
        getBuffered(){

          return this.TcPlayer.buffered()

        },
        //加载视频
        loadVideo(uri){

          this.TcPlayer.load(uri)

        }

      }

    }
</script>

<style scoped lang="scss">

.CBIM_PLAYER{

  width: 100%;

  height: 100%;

  overflow: hidden;

  .video_player{

    width: 100%;

    height: 100%!important;

  }

  .video_player_error{

    text-align: center;

    padding-top: 30%;

    color: red;

    background: #3b4249;

  }

}
</style>
