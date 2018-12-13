<!--
 -  2018/10/17  lize
 -->
<template>
  <div>
    <h1>ivew1</h1>
    <a href="index.html">富文本编辑器</a>
    &nbsp;
    &nbsp;
    &nbsp;
    &nbsp;
    <a href="ccc.html">excel导入、导出</a>
    &nbsp;
    &nbsp;
    &nbsp;
    &nbsp;
    <a href="view2.html">测试用例</a>

    <zxc :masg = "masg" @ddd = "ddd"></zxc>
    <br/>
    <br/>
    <div style="overflow: hidden">
      <div style="width:650px;height: 400px;float: left;overflow: hidden">
        <cbim-player ref = "plauer1" :videoData = videoData @on-pause = pause></cbim-player>
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
    <br/>
    <br/>
    <div style="overflow: hidden">
      <div style = "width:480px;height:320px;float: left;overflow: hidden">
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

  </template>

<script>
  import zxc from './aaaa.vue'
  import cbimPlayer from '@/components/CbimPlayer/index'
    export default {
        data () {
            return {
                Ary:[],

                mas:{"status":200,"msg":"系统正常","data":{"moneytype":{"1":"供热费","2":"分户计量费","3":"运行基础费","4":"蒸汽计量费","5":"滞纳金","6":"预收费"},"paymentchannel":{"0":"全部","1":"公众号","2":"APP","3":"大厅","4":"物业"},"usertype":{"1":"住宅","2":"门市","3":"公企"},"audittype":{"0":"房屋面积变更审核","1":"房屋供暖状态审核","2":"房屋费用减免审核","3":"房屋类型变更审核","4":"批量收费审核","5":"退费审核"},"invoiceState":{"1":"已开发票","2":"未开收据","3":"已开收据"},"fromtype":{"1":"手机app","2":"微信公众号","3":"大厅端","4":"触摸屏","5":"银行代收","6":"物业代收"},"taxratio":{"0.1":"2018","0.11":"2017"},"hotstatus":{"1":"用热","2":"拆网","3":"锁闭"},"moneyway":{"1":"微信公众号","2":"支付宝","3":"银联","4":"POS","6":"现金支付","51":"微信扫码","52":"支付宝扫码"}}},

              masg:'fromtype',

              videoData:{

                coverpic:{

                  "src": "https://test-tools.cbim.org.cn/api/download/v1/download?fileId=group1/M00/00/43/rBNM4VvykUKAIFUaAAAi5sWDNXU257.jpg",

                  "style": "cover"

                },

                controls:"default",

                vodeoUrl:"http://1256993030.vod2.myqcloud.com/d520582dvodtransgzp1256993030/7732bd367447398157015849771/v.f40.mp4",

                pauseMetodName:"on-pause",

                // idName:'id_test_video'

              },
            videoDatas:{

              coverpic:{

                "src": "https://test-tools.cbim.org.cn/api/download/v1/download?fileId=group1/M00/00/43/rBNM4VvykUKAIFUaAAAi5sWDNXU257.jpg",

                  "style": "cover"

              },

              // vodeoUrl:"http://1256993030.vod2.myqcloud.com/d520582dvodtransgzp1256993030/7732bd367447398157015849771/v.f40.mp4",

                pauseMetodName:"on-pausess",

                idName:"id_test_videos"

            }

            }

        },
        mounted () {

            this.init(this.mas);

        },
        components:{
          zxc,
          cbimPlayer
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

          }

        }

    }
</script>

<style scoped lang="scss">

</style>
// host: '172.16.200.119',
      // password: '123456',

