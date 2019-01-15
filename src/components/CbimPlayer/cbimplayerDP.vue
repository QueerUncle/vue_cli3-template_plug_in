<!--
 -  2018/12/17  lize
 -->
<template>

  <div class = "CBIM_PLAYER" id="CBIM_PLAYER_DP">

    <video  class = "cbimplayerDP" :id="id" preload="auto" playsinline webkit-playsinline></video>

  </div>

</template>

<script>

  export default {

    data() {

      return {

        id:`CbimPlayer_${new Date().getTime()}_DP`,

        TcPlayer:'',

      }

    },

    created(){

    },

    props:['videoData'],

    computed:{

      videoDataFn(){

        let obj = {

          appID:'',

          fileID:'',

          width: '100%',//视频的显示宽度，请尽量使用视频分辨率宽度

          height: '100%',//视频的显示高度，请尽量使用视频分辨率高度，

          controls:true,  //是否显示播放器控制栏

          poster:'https://test-tools.cbim.org.cn/api/download/v1/download?fileId=group1/M00/00/43/rBNM4VvykUKAIFUaAAAi5sWDNXU257.jpg',  //封面图片地址

          posterImage:true, //是否显示封面

          autoplay:true,  //是否自动播放

          bigPlayButton:true,//是否显示居中的播放按钮

          playbackRates:[0.5, 1, 1.25, 1.5, 2],  //设置变速播放倍率选项，仅 H5 有效

          loop:false, //是否循环播放

          muted:false, //是否静音播放

          preload:"auto",  //是否需要预加载。auto"，"meta"，"none"

          flash:{

            swf:'',//Flash 播放器 swf 文件的 URL

          },

          language:'zh-CN',  //设置语言

          languages:{}, //设置多语言词典

          plugins:{  //设置插件功能属性的参数组合

            ProgressMarker: true,  //开启进度条标记

            ContextMenu: {

              mirror: true   //开启右键镜像功能

            },
            ContinuePlay:{

              auto:false,// 是否在播放时自动续播

              text: '上次看到 ', // 提示文案

              btnText: '恢复播放' // 按钮文案

            },

          },

          flag:true

        };

        let videoData = this.$props.videoData;

        if(videoData){

          obj = this.extend(obj,videoData,true);

        }

        if(!obj.appID || !obj.fileID){obj.flag = false;}

        if(obj.lastPlayTime){

          window.localStorage.setItem(`tcplayer-lpt-${obj.fileID}`,obj.lastPlayTime);

        }else{

            window.localStorage.removeItem(`tcplayer-lpt-${obj.fileID}`);

        }

        if(!obj.pauseMetodName){obj.pauseMetodName = "on-pause";}

        if(!obj.playEndMethodName){obj.playEndMethodName = "on-playEnd";}

        let parameter = {

          obj :obj,

          flag:obj.flag,

          pauseMetodName:obj.pauseMetodName,

          playEndMethodName:obj.playEndMethodName

        };

        return parameter

      },

    },
    mounted() {

        this.$nextTick(

          this.loadHLSScript()

        );

    },

    methods: {

      //加载hls.js
      loadHLSScript(){

        let _this = this;

        let script   = document.createElement('script');

        script.type = "text/javascript";

        script.src = "//imgcache.qq.com/open/qcloud/video/tcplayer/lib/hls.min.0.8.8.js";

        script.onload = function(e){

          _this.loadTcplayerDPScript();

        };

        document.getElementById("CBIM_PLAYER_DP").appendChild(script);

      },
      //加载点播tcplayer.min.js
      loadTcplayerDPScript(){

        let _this = this;

        let script   = document.createElement('script');

        script.type = "text/javascript";

        script.src = "//imgcache.qq.com/open/qcloud/video/tcplayer/tcplayer.min.js";

        script.onload = function(e){

          _this.initializeTcPlayerBP();

        };

        document.getElementById("CBIM_PLAYER_DP").appendChild(script);

      },
      //初始化Tc-Player（点播）
      initializeTcPlayerBP(){

        let _this = this;

        if(this.videoDataFn.flag){

          this.TcPlayer = TCPlayer(this.id,this.videoDataFn.obj);

          //已经开始播放，调用 play() 方法或者设置了 autuplay 为 true 且生效时触发，这时 paused 属性为 false
          this.TcPlayer.on('play', function(e){

              console.log(e);

          });

          //暂停时触发
          this.TcPlayer.on('pause', function(e){

            console.log(e);

            _this.$emit(_this.videoDataFn.pauseMetodName,_this.getCurrentTime())

          });

          //视频播放已结束时触发。此时 currentTime 值等于媒体资源最大值
          this.TcPlayer.on('ended', function(e){

            console.log(e);

            _this.$emit(_this.videoDataFn.playEndMethodName,_this.getCurrentTime())

          });

          //视频播放出现错误时触发
          this.TcPlayer.on('error', function(e){

            console.log(e);

          });
          //播放速率变更时触发
          this.TcPlayer.on('ratechange', function(e){

            console.log(e);

          });
          //设置音量或者 muted 属性值变更时触发
          this.TcPlayer.on('volumechange', function(e){

            console.log(e);

          });
          //全屏状态切换时触发
          this.TcPlayer.on('fullscreenchange', function(e){

            console.log(e);

          });

          /**********************************************************************************************/
          //因缓冲而暂停或停止后恢复播放时触发，paused 属性为 false 。通常用这个事件来标记视频真正播放，play 事件只是开始播放，画面并没有开始渲染
          this.TcPlayer.on('playing', function(e){

//            console.log(e);

          });

          //开始加载数据时触发
          this.TcPlayer.on('loadstart', function(e){

//            console.log(e);

          });

          //视频的时长数据发生变化时触发
          this.TcPlayer.on('durationchange', function(e){

//            console.log(e);

          });

          //已加载视频的 metadata
          this.TcPlayer.on('loadedmetadata', function(e){

//            console.log(e);

          });

          //当前帧的数据已加载，但没有足够的数据来播放视频的下一帧时，触发该事件
          this.TcPlayer.on('loadeddata', function(e){

//            console.log(e);

          });

          //在获取到媒体数据时触发
          this.TcPlayer.on('progress', function(e){

//            console.log(e);

          });

          //当播放器能够开始播放视频时触发
          this.TcPlayer.on('canplay', function(e){

//            console.log(e);

          });

          //当播放器预计能够在不停下来进行缓冲的情况下持续播放指定的视频时触发
          this.TcPlayer.on('canplaythrough', function(e){

//            console.log(e);

          });

          //搜寻指定播放位置结束时触发
          this.TcPlayer.on('seeked', function(e){

//            console.log(e);

          });

          //搜寻指定播放位置开始时触发
          this.TcPlayer.on('seeking', function(e){

//            console.log(e);

          });
          //当前播放位置有变更，可以理解为 currentTime 有变更
          this.TcPlayer.on('timeupdate', function(e){

//            console.log(e);

          });

          //播放停止，下一帧内容不可用时触发
          this.TcPlayer.on('waiting', function(e){

//            console.log(e);

          });

          //清晰度切换进行中
          this.TcPlayer.on('resolutionswitching', function(e){

//            console.log(e);

          });
          //清晰度切换完毕
          this.TcPlayer.on('resolutionswitched', function(e){

//            console.log(e);

          });

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

        this.TcPlayer.currentTime(num);

        this.pause();

      },
      //获取视频总长
      getDuration(){

        return this.TcPlayer.duration()//获取视频总长

      },
      //获取音量
      getVolume(){

        return this.TcPlayer.volume()//获取音量

      },
      //设置音量
      setVolume(num){

        this.TcPlayer.volume(num)

      },
      //获取视频封面
      getPoster(){

        return this.TcPlayer.poster();

      },
      //获取视频封面
      getPoster(src){

        if(src){

          this.TcPlayer.poster(src);

        }

      },
      //设置视频全屏
      setRequestFullscreen(){

          this.TcPlayer.requestFullscreen();

      },
      //设置退出全屏
      setExitFullscreen(){

          this.TcPlayer.exitFullscreen();

      },
      //获取书否进入全屏
      getIsFullscreen(){

        return this.TcPlayer.isFullscreen();

      },
      //获取视频缓冲书百分比
      getBuffered(){

        return this.TcPlayer.buffered()

      },
      //获取缓冲视频占总视频时长的百分比
      getbufferedPercent(){

          return this.TcPlayer.bufferedPercent();

      },
      //获取播放区域的宽度
      getWidth(){

          return this.TcPlayer.width();

      },
      //设置播放去宽度
      setWidth(num){

          let t = Number(num);

          this.TcPlayer.width(t);

      },
      //获取播放区域的高度
      getHeight(){

        return this.TcPlayer.height();

      },
      //设置播放去高度
      setHeight(num){

        let t = Number(num);

        this.TcPlayer.height(t);

      },
      //获取视频分辨率的宽度
      getVideoWidth(){

        return this.TcPlayer.videoWidth();

      },
      //获取视频分辨率的高度
      getvideoHeight(){

          return this.TcPlayer.videoHeight();

      },
      //销毁实例
      dispose(){

        this.TcPlayer.dispose();

      },
      //加载视频
      loadVideoByID(options){

//        if(options.fileID && options.appID){

        options= {mp4:"http://1256993030.vod2.myqcloud.com/d520582dvodtransgzp1256993030/7732bd367447398157015849771/v.f30.mp4"};


        this.TcPlayer.loadVideoByID(options)

//        }

      }

    }

  }
</script>

<style scoped lang="scss">

  @import url("//imgcache.qq.com/open/qcloud/video/tcplayer/tcplayer.css");

  .CBIM_PLAYER{

    width: 100%;

    height: 100%;

    overflow: hidden;

    .cbimplayerDP{

      width: 100%!important;

      height: 100%!important;

    }

  }
</style>
