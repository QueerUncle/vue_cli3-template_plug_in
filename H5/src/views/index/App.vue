<template>

  <div id = "app" :style = {height:height}>

    <transition name="van-fade">

      <router-view style = "height: 100%;" class = "ContentLayout"></router-view>

    </transition>

  </div>

</template>

<script>

  export default {

    data () {

      return {

        flag:true,

        height:"100%",

      }

    },

    mounted () {

      this.initialize();

    },
    methods: {
      //初始化
      initialize(){

        console.log(process.env,'process.envprocess.envprocess.envprocess.env');

        window.onresize = () =>{

            this.height = document.body.clientHeight

        }

      },
      //测试
      test(){

        let url = `./RouterInfo.conf.json`;

        let data = undefined;

        this.$http.get(url)

          .then((e) =>{

            console.log(e)

          })
          .catch((er) =>{

            console.log(er)

          });

        let url1 = './RouterInfo.conf1.json';

        this.$http.get(url1)

          .then((e) =>{

            console.log(e)

          })
          .catch((er) =>{

            console.log(er)

          });

        setTimeout(() =>{

          this.$cancel({url:url,data:data});

        },0);

        console.log(this.$fs.transitionNum("二百二十九"));

        console.log(this.$fs.ConvertPinyin("李泽"))

      },
      //初始化微信
      initWxConfig(pageUrl){

          let params = {

            url:pageUrl

          };

          let url = "http://api.china-bim.org/mock/25/getSignature";

          this.$http.get(url,params)

            .then((e) =>{

              console.log(e,'我是权限接口');

              e.data.jsApiList = [];

              this.wxConfig(e.data);

            })
            .catch((er) =>{

              console.log(er);

            })

      },
      //wx权限验证
      wxConfig(data){

        wx.config({

          beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题

          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。

          appId: data.appId, // 必填，企业微信的corpID

          timestamp: data.timestamp, // 必填，生成签名的时间戳

          nonceStr: data.nonceStr, // 必填，生成签名的随机串

          signature: data.signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法

          jsApiList: data.jsApiList // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来

        });

        wx.ready((e) =>{

          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

          let jsApiList = ['openUserProfile'];

          this.judgeWxJsPort(jsApiList);

        });

        wx.error((res) =>{

          console.log("调用微信jsapi返回的状态:"+res.errMsg);

        });

      },
      //判断当前客户端是否支持自定js接口
      judgeWxJsPort(jsApiList){

        wx.checkJsApi({

          jsApiList: jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,

          success: (res) => {

            console.log(res);

            this.initWxAgentConfig(jsApiList);

          }

        });

      },
      //初始化应用权限
      initWxAgentConfig(jsApiList){

          let params = {

              url:''

          };

          let url = "";

          this.$http.get(url,params)

            .then((e) =>{

              console.log(e);

              e.data.jsApiList = jsApiList;

              this.wxAgentConfig(e.data);

            })

            .catch((er) =>{

              console.log(er);

            })

      },
      //注入应用的权限
      wxAgentConfig(data){

        wx.agentConfig({

          corpid: data.corpid, // 必填，企业微信的corpid，必须与当前登录的企业一致

          agentid: data.agentid, // 必填，企业微信的应用id

          timestamp: data.timestamp, // 必填，生成签名的时间戳

          nonceStr: data.nonceStr, // 必填，生成签名的随机串

          signature: data.signature,// 必填，签名，见附录1

          jsApiList: data.signature, //必填

          success: (res) => {


          },
          fail: (res) => {

            if(res.errMsg.indexOf('function not exist') > -1){

              alert('版本过低请升级')

            }

          }

        });

      },
      //获取用户信息
      getUserInfo(){

        let url = "http://api.china-bim.org/mock/25/getUserInfo";

        this.$http.get(url)

          .then((e) =>{

              console.log(e);

              this.$store.state.userInfo = e.data;

          })

          .catch((er) =>{

              console.log(er);

          })

      },
      //点击左箭头
      onClickLeft(){

          this.$router.go(-1);

      }

    }

  }
</script>

<style scoped lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
  background: #ffffff;
  height: 100%;
  overflow: auto;
}
.van-icon,.van-nav-bar__text{

  color: #ffffff!important;

}
.van-nav-bar__title{

  max-width: 35%;

}
</style>
