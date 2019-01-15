<!--
 -  2018/10/17  lize
 -->
<template>
  <div>
    <h1>ivew1</h1>
    <div class = "tagDiv">
      <a href="index.html">富文本编辑器</a>
      <a href="ccc.html">excel导入、导出</a>
      <a href="view2.html">测试用例</a>
      <a href="cbimIndex.html">CBIM2.0Test</a>
    </div>
    <div>
      <audio src="http://www.170mv.com/kw/sg.sycdn.kuwo.cn/resource/n2/34/42/3794345206.mp3" controls="controls">
        Your browser does not support the audio element.
        </audio>
    </div>
    <div class = "Content">

      <div class = "defaultVideo">

        <p style="color: red">普通浏览器</p>

        <div class = "Video" >
          <div style="width:100%;height:350px;overflow: hidden">
            <cbim-player ref = "plauer1" :videoData = videoData @on-playEnd = "playEnd" @on-pause = pause></cbim-player>
          </div>
          <div style="float: left">
            <button @click = "getCurrentTime">获取时间</button>
            <button @click = "setCurrentTime">设置时间</button>
            <button @click = "getVolume">获取音量</button>
            <button @click = "setVolume">设置音量</button>
            <button @click = "getDuration">获取视频总长</button>
            <button @click = "destroyFn">销毁实例</button>
            <button @click = "play">开始播放</button>
            <button @click = "pausePlay">暂停播放</button>
            <button @click = "playing">检查视频是否在播放中</button>
            <button @click = "mute">设置、查询视频音量是否静音</button>
            <button @click = "fullscreen">设置、查询视频是否全屏</button>
            <button @click = "getBuffered">获取视频缓冲数百分比</button>
            <button @click = "loadVideo">设置加载视频</button>
          </div>
        </div>

        <div class = "Video" >
          <div style = "width:100%;height:350px;overflow: hidden">
            <cbim-player :videoData = videoDatas @on-pausess = pauses></cbim-player>
          </div>
          <div style="float: left">
            <button >获取时间</button>
            <button >设置时间</button>
            <button >获取音量</button>
            <button >设置音量</button>
            <button >获取视频总长</button>
            <button >销毁实例</button>
            <button >检查视频是否在播放中</button>
            <button >设置、查询视频音量</button>
            <button >设置、查询视频是否全屏</button>
            <button >获取视频缓冲数百分比</button>
            <button >设置加载视频</button>
          </div>
        </div>

      </div>

      <div class = "demandVideo">

        <p style="color: red">点播浏览器</p>

        <div class = "Video" >
          <div id = "demandVideoTest" style = "width:100%;height:350px;overflow: hidden">
            <cbim-player-dp ref = "tcplayerDP" :videoData = demandData @on-playEnd-demand = "playEnddemand"  @on-pause-demand = pausesdemand></cbim-player-dp>
          </div>
          <div style="float: left">
            <button @click = "getCurrentTime1">获取时间</button>
            <button @click = "setCurrentTime1">设置时间</button>
            <button @click = "getVolume1">获取音量</button>
            <button @click = "setVolume1">设置音量</button>
            <button @click = "getDuration1">获取视频总长</button>
            <button @click = "destroyFn1">销毁实例</button>
            <button @click = "play1">开始播放</button>
            <button @click = "pausePlay1">暂停播放</button>
            <!--<button @click = "getWidth">获取视频宽</button>-->
            <!--<button @click = "getHeight">获取高度</button>-->
            <button @click = "getVideoWidth">获取视频分辨率宽度</button>
            <button @click = "getvideoHeight">获取视频分辨率高度</button>
            <button @click = "getBuffered1">获取视频缓冲数百分比</button>
            <button @click = "loadVideo1">设置加载视频</button>
          </div>
        </div>

      </div>

      <div class = "liveVideo">

        <p style="color: red">直播浏览器</p>

        <div class = "Video" >
          <div id = "liveTest" style = "width:100%;height:350px;overflow: hidden">
            <cbim-player-live ref = "tcplayerlive" :videoData = liveData ></cbim-player-live>
          </div>
          <div style="float: left">
            <button @click = "getCurrentTime1">获取时间</button>
            <button @click = "setCurrentTime1">设置时间</button>
            <button @click = "getVolume1">获取音量</button>
            <button @click = "setVolume1">设置音量</button>
            <button @click = "getDuration1">获取视频总长</button>
            <button @click = "destroyFn1">销毁实例</button>
            <button @click = "play1">开始播放</button>
            <button @click = "pausePlay1">暂停播放</button>
            <!--<button @click = "getWidth">获取视频宽</button>-->
            <!--<button @click = "getHeight">获取高度</button>-->
            <button @click = "getVideoWidth">获取视频分辨率宽度</button>
            <button @click = "getvideoHeight">获取视频分辨率高度</button>
            <button @click = "getBuffered1">获取视频缓冲数百分比</button>
            <button @click = "loadVideo1">设置加载视频</button>
          </div>
        </div>

        <div class = "Video" >
          <div id = "liveTest2" style = "width:100%;height:350px;overflow: hidden">
            <cbim-player-live ref = "tcplayerlive2" :videoData = liveData2 ></cbim-player-live>
          </div>
          <div style="float: left">
            <button @click = "getCurrentTime1">获取时间</button>
            <button @click = "setCurrentTime1">设置时间</button>
            <button @click = "getVolume1">获取音量</button>
            <button @click = "setVolume1">设置音量</button>
            <button @click = "getDuration1">获取视频总长</button>
            <button @click = "destroyFn1">销毁实例</button>
            <button @click = "play1">开始播放</button>
            <button @click = "pausePlay1">暂停播放</button>
            <!--<button @click = "getWidth">获取视频宽</button>-->
            <!--<button @click = "getHeight">获取高度</button>-->
            <button @click = "getVideoWidth">获取视频分辨率宽度</button>
            <button @click = "getvideoHeight">获取视频分辨率高度</button>
            <button @click = "getBuffered1">获取视频缓冲数百分比</button>
            <button @click = "loadVideo1">设置加载视频</button>
          </div>
        </div>

      </div>

    </div>

  </div>

  </template>

<script>
  import zxc from './aaaa.vue'
    export default {
        data () {
            return {
                Ary:[],

                mas:{"status":200,"msg":"系统正常","data":{"moneytype":{"1":"供热费","2":"分户计量费","3":"运行基础费","4":"蒸汽计量费","5":"滞纳金","6":"预收费"},"paymentchannel":{"0":"全部","1":"公众号","2":"APP","3":"大厅","4":"物业"},"usertype":{"1":"住宅","2":"门市","3":"公企"},"audittype":{"0":"房屋面积变更审核","1":"房屋供暖状态审核","2":"房屋费用减免审核","3":"房屋类型变更审核","4":"批量收费审核","5":"退费审核"},"invoiceState":{"1":"已开发票","2":"未开收据","3":"已开收据"},"fromtype":{"1":"手机app","2":"微信公众号","3":"大厅端","4":"触摸屏","5":"银行代收","6":"物业代收"},"taxratio":{"0.1":"2018","0.11":"2017"},"hotstatus":{"1":"用热","2":"拆网","3":"锁闭"},"moneyway":{"1":"微信公众号","2":"支付宝","3":"银联","4":"POS","6":"现金支付","51":"微信扫码","52":"支付宝扫码"}}},

                masg:'fromtype',

                type1:"default",

                type2:'demand',

                type3:'live',

                videoData:{

                  coverpic:{

                    "src": "https://test-tools.cbim.org.cn/api/download/v1/download?fileId=group1/M00/00/43/rBNM4VvykUKAIFUaAAAi5sWDNXU257.jpg",

                    "style": "cover"

                  },

                  controls:"default",

//                  videoUrl:"http://1256993030.vod2.myqcloud.com/d520582dvodtransgzp1256993030/7732bd367447398157015849771/v.f40.mp4",

                  videoUrl:"http://223.110.245.151/ott.js.chinamobile.com/PLTV/3/224/3221225562/index.m3u8",

//                  videoUrl:"http://movie.ks.js.cn/flv/other/1_0.mp4",

//                    videoUrl:"http://www.170mv.com/kw/sg.sycdn.kuwo.cn/resource/n2/34/42/3794345206.mp4",

//                  videoUrl:"blob:https://v.qq.com/efadd2b4-327a-4e04-a037-71137434ca75",
//                  videoUrl:"http://pgc.cdn.xiaodutv.com/3367561314_4142709317_20181027074543.mp4",

//                  pauseMetodName:"on-pause",  //暂停播放事件

//                  playEndMethodName:"on-playEnd", // 播放完毕事件

                   idName:'id_test_video'

                },
                videoDatas:{

                  coverpic:{

                    "src": "https://test-tools.cbim.org.cn/api/download/v1/download?fileId=group1/M00/00/43/rBNM4VvykUKAIFUaAAAi5sWDNXU257.jpg",

                      "style": "cover"

                  },

                  videoUrl:"http://221.228.226.23/11/t/j/v/b/tjvbwspwhqdmgouolposcsfafpedmb/sh.yinyuetai.com/691201536EE4912BF7E4F1E2C67B8119.mp4",

                    pauseMetodName:"on-pausess",  //暂停播放事件

                    playEndMethodName:"on-playEnd", // 播放完毕事件

                    idName:"id_test_videos"

                },
                demandData:{

                  appID:'1258117017',

//                  fileID:'5285890783632995918',

                  fileID:'5285890783692473110',

                  poster:'',  //封面图片地址

                  controls:true,//是否显示播放器控制栏

                  t: '',   //后台返回

                  us: '',  //后台返回

                  sign:'', //后台返回

                  exper:'',  // 试看功能

                  lastPlayTime:'', //上次播放时间

                  pauseMetodName:"on-pause-demand",  //暂停播放事件

                  playEndMethodName:"on-playEnd-demand", // 播放完毕事件

                },
                liveData:{

//                  "channel_id":'1de78969ad',
//
//                  "app_id":'1258117017',

                  "h5_start_patch":{

                      url:'',

                      stretch:"",

                  },

                  "live_url":"http://223.110.245.151/ott.js.chinamobile.com/PLTV/3/224/3221225562/index.m3u8", //视频播放地址

//                  "live_url":"rtmp://221.120.177.59/livestream/ucagm8kk", //视频播放地址

                  "live_url2":"",  //视频播放地址2

                  idName:"",

                  pauseMetodName:"on-pause-Live",  //暂停播放事件

                  playEndMethodName:"on-playEnd-live", // 播放完毕事件

                },
                liveData2:{

                  "channel_id":'1de78969ad',

                  "app_id":'1258117017',

                "h5_start_patch":{

                  url:'',

                  stretch:"",

                },

//                "live_url":"http://223.110.245.151/ott.js.chinamobile.com/PLTV/3/224/3221225562/index.m3u8", //视频播放地址

//                  "live_url":"rtmp://221.120.177.59/livestream/ucagm8kk", //视频播放地址

                "live_url2":"",  //视频播放地址2

                idName:"",

                pauseMetodName:"on-pause-Live",  //暂停播放事件

                playEndMethodName:"on-playEnd-live", // 播放完毕事件

              }

            }

        },
        mounted () {

            this.init(this.mas);

        },
        components:{

          cbimPlayer: (resolve) =>{require(['@/components/CbimPlayer/index'],resolve)},

          cbimPlayerDp: (resolve) =>{require(['@/components/CbimPlayer/cbimplayerDP'],resolve)},

          cbimPlayerLive: (resolve) =>{require(['@/components/CbimPlayer/cbimplayerLive'],resolve)},

        },
        methods: {

          init(obj){

                let Copy_Obj = obj;

                if(Copy_Obj.status == 200){

                    let Fromtype_Data = Copy_Obj.data.fromtype;

                    if(Fromtype_Data!='' && Fromtype_Data!=undefined && Fromtype_Data!=null){

                      for( let i in Fromtype_Data){

                        this.Ary.push(Fromtype_Data[i])

                      }

                    }

//                    if(object.keys(data).length == 0){
//
//                        console.log('空对象')
//
//                    }else{
//
//                        console.log("不是空对象");
//
//                    }

                }

                  console.log(this.Ary);

            },

          initData(){

            api.formType('')

              .then((e) =>{

                if(e.status ==200){

                  if(e.data.fromtype){

                    let Fromtype_Data = e.data.fromtype;

                    for (let i in Fromtype_Data){

                      this.fromTypeSelect.push(Fromtype_Data[i]);

                    }

                  }

                }

              })

          },

          getSelectValue(str){

              let NewStr = str;

              let NewAry = [];

              if(NewStr){

                api.formType('')

                  .then((e) =>{

                    if(e.status ==200){

                      if(e.data.NewAry){

                        let Fromtype_Data = e.data.NewStr;

                        for (let i in Fromtype_Data){

                          NewAry(Fromtype_Data[i]);

                        }

                      }

                    }

                  })

              }

              return NewAry;

          },

          ddd(val){

              console.log(val);

          },

          //playEnd
          playEnd(e){

            console.log(e);

          },

          play(){

            this.$refs.plauer1.play()

          },

          pausePlay(){

            this.$refs.plauer1.pause()

          },

          pause(e){

              console.log(e,'我是非s的')

          },
          pauses(e){

              console.log(e,'我是s的')

          },
          //getCurrentTime
          getCurrentTime(){

            console.log(this.$refs.plauer1.getCurrentTime())

          },

          //setCurrentTime
          setCurrentTime(){

            this.$refs.plauer1.setCurrentTime(18.908502);

          },
          //getVolume
          getVolume(){

            console.log(this.$refs.plauer1.getVolume());

          },
          //setVolume
          setVolume(){

            this.$refs.plauer1.setVolume(0.3);

          },
          //getDuration
          getDuration(){

            console.log(this.$refs.plauer1.getDuration());

          },
          //destroyFn
          destroyFn(){

            this.$refs.plauer1.destroy();

          },
          //playing
          playing(){

            console.log(this.$refs.plauer1.playing());

          },
          //mute
          mute(){

            console.log(this.$refs.plauer1.mute());

          },
          //fullscreen
          fullscreen(){

            console.log(this.$refs.plauer1.fullscreen());

          },
          //getBuffered
          getBuffered(){

            console.log(this.$refs.plauer1.getBuffered());

          },
          //loadVideo
          loadVideo(){

            let uri = "http://1256993030.vod2.myqcloud.com/d520582dvodtransgzp1256993030/7732bd367447398157015849771/v.f30.mp4";

            this.$refs.plauer1.loadVideo(uri);

          },


          /******************************************************************************************************/

          //暂停
          pausesdemand(e){

              console.log(e)

          },
          //播放完毕
          playEnddemand(e){

            console.log(e);

          },

          play1(){

            this.$refs.tcplayerDP.play()

          },

          pausePlay1(){

            this.$refs.tcplayerDP.pause()

          },

          //getCurrentTime
          getCurrentTime1(){

            console.log(this.$refs.tcplayerDP.getCurrentTime())

          },

          //setCurrentTime
          setCurrentTime1(){

            this.$refs.tcplayerDP.setCurrentTime(18.908502);

          },
          //getVolume
          getVolume1(){

            console.log(this.$refs.tcplayerDP.getVolume());

          },
          //setVolume
          setVolume1(){

            this.$refs.tcplayerDP.setVolume(0.3);

          },
          //getDuration
          getDuration1(){

            console.log(this.$refs.tcplayerDP.getDuration());

          },
          //destroyFn
          destroyFn1(){

            this.$refs.tcplayerDP.dispose();

          },
          //获取宽度
          getWidth(){

              console.log(this.$refs.tcplayerDP.getWidth())

          },
          //获取高度
          getHeight(){

            console.log(this.$refs.tcplayerDP.getHeight())

          },
          //playing
          getVideoWidth(){

            console.log(this.$refs.tcplayerDP.getVideoWidth());

          },
          //mute
          getvideoHeight(){

            console.log(this.$refs.tcplayerDP.getvideoHeight());

          },
          //fullscreen
          fullscreen1(){

            console.log(this.$refs.tcplayerDP.fullscreen());

          },
          //getBuffered
          getBuffered1(){

            console.log(this.$refs.tcplayerDP.getBuffered());

          },
          //loadVideo
          loadVideo1(){

            let uri = "http://1256993030.vod2.myqcloud.com/d520582dvodtransgzp1256993030/7732bd367447398157015849771/v.f30.mp4";

            this.$refs.tcplayerDP.loadVideoByID(uri);

          }

        }

    }
</script>

<style scoped lang="scss">

  .tagDiv{

    width: 100%;

    float: left;

    a{

      margin-left: 20px;

    }

  }

  .Content{

    width: 100%;

    float: left;

    margin-top: 30px;

    .defaultVideo{

      width: 100%;

      float: left;

    }
    .demandVideo{

      width: 100%;

      float: left;

    }

  }
  .Video{

    width: 600px;

    height: 500px;

    overflow: hidden;

    float: left;

    margin-left: 20px;

  }
</style>


