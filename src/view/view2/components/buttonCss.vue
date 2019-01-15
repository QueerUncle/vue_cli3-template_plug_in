mu-text-field mu-input-content<!--
 -  2018/12/12  lize
 -->
<template>
  <div>
    <h6>button——css测试</h6>
    <Button class = "a" type="primary">Primary</Button>
    <Button class = "b" type="primary">Primary</Button>
    <Button class = "c" type="primary">Primary</Button>
    <Button class = "d" type="primary">Primary</Button>
    <Button class = "e" type="primary">Primary</Button>
    <Button class = "f" type="primary">Primary</Button>
    <Button class = "g" type="primary">Primary</Button>
    <Button class = "h" type="primary">Primary</Button>
    <Button class = "i" type="primary">Primary</Button>
    <Button class = "j" type="primary">Primary</Button>
    <Button class = "k" type="primary">Primary</Button>
    <Button class = "l" type="primary">Primary</Button>

    <div class="icontent">
      <div class="logincontent">
        <h3>师生互动-登录</h3>
        <input type="text" v-model="username" placeholder="请输入手机号或邮箱">
        <input type="password" v-model="password" placeholder="请输入密码">
        <div class="loginb" @click="loginb($event)">Login 登录</div>
      </div>
    </div>
      </div>
</template>

<script>
    export default {
        data() {
            return {

              username: '17012345678',
              password: '123456'
            }
        },
        mounted() {

        },
        methods: {

          loginb(e) {
            // this.$router.push({ name: 'cousermanager', params: { pagenum: pagenum }})
            // this.$router.push({ name: 'groupwork'})
          }
        }
    }
</script>

<style scoped lang="scss">
  .a {
    background: -webkit-linear-gradient(left, red , greenyellow, blue); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, red, greenyellow, blue); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, red, greenyellow, blue); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, red , greenyellow, blue); /* 标准的语法 */
    border-radius:10px;
    width:500px;
  &:hover{
     background: -webkit-linear-gradient(red, greenyellow, blue); /* Safari 5.1 - 6.0 */
     background: -o-linear-gradient(red, greenyellow, blue); /* Opera 11.1 - 12.0 */
     background: -moz-linear-gradient(red, greenyellow, blue); /* Firefox 3.6 - 15 */
     background: linear-gradient(red, greenyellow, blue); /* 标准的语法 */
     box-shadow: 10px 10px 5px #888888;
     border-radius:50px;
   }

  }
  .b {
    background: -webkit-linear-gradient(left top, red , blue); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient( bottom  right, red, blue); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom  right, red, blue); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom  right, red , blue); /* 标准的语法 */
    border-radius:10px;
    width:500px;
  &:hover{
     background: -webkit-linear-gradient(45deg, red, blue); /* Safari 5.1 - 6.0 */
     background: -o-linear-gradient(45deg, red, blue); /* Opera 11.1 - 12.0 */
     background: -moz-linear-gradient(45deg, red, blue); /* Firefox 3.6 - 15 */
     background: linear-gradient(45deg, red, blue); /* 标准的语法 */
     box-shadow: 10px 10px 5px #888888;
     border-radius:50px;
   }

  }
  .c{
    /* Safari 5.1 - 6.0 */
    background: -webkit-linear-gradient(left,red,orange,yellow,green,blue,indigo,violet);
    /* Opera 11.1 - 12.0 */
    background: -o-linear-gradient(left,red,orange,yellow,green,blue,indigo,violet);
    /* Firefox 3.6 - 15 */
    background: -moz-linear-gradient(left,red,orange,yellow,green,blue,indigo,violet);
    /* 标准的语法 */
    background: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet);

    border-radius:10px;

    width:500px;

  }
  .d{
    background: -webkit-linear-gradient(left,rgba(255,0,0,0),rgba(255,0,0,1)); /* Safari 5.1 - 6 */
    background: -o-linear-gradient(right,rgba(255,0,0,0),rgba(255,0,0,1)); /* Opera 11.1 - 12*/
    background: -moz-linear-gradient(right,rgba(255,0,0,0),rgba(255,0,0,1)); /* Firefox 3.6 - 15*/
    background: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1)); /* 标准的语法 */
    border-radius:10px;
    width:500px;
  }
  .e{
    /* Safari 5.1 - 6.0 */
    background: -webkit-repeating-linear-gradient(red, yellow 10%, green 20%);
    /* Opera 11.1 - 12.0 */
    background: -o-repeating-linear-gradient(red, yellow 10%, green 20%);
    /* Firefox 3.6 - 15 */
    background: -moz-repeating-linear-gradient(red, yellow 10%, green 20%);
    /* 标准的语法 */
    background: repeating-linear-gradient(red, yellow 10%, green 20%);
    border-radius:10px;
    width:500px;

  }
  .f{
    background: -webkit-radial-gradient(red, green, blue); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(red, green, blue); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(red, green, blue); /* Firefox 3.6 - 15 */
    background: radial-gradient(red, green, blue); /* 标准的语法 */

    border-radius:10px;
    width:500px;
  }
  .g{
    background: -webkit-radial-gradient(red 5%, green 15%, blue 60%); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(red 5%, green 15%, blue 60%); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(red 5%, green 15%, blue 60%); /* Firefox 3.6 - 15 */
    background: radial-gradient(red 5%, green 15%, blue 60%); /* 标准的语法 */
    border-radius:10px;
    width:500px;
  }
  .h{
    background: -webkit-radial-gradient(circle, red, yellow, green); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(circle, red, yellow, green); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(circle, red, yellow, green); /* Firefox 3.6 - 15 */
    background: radial-gradient(circle, red, yellow, green); /* 标准的语法 */
    border-radius:10px;
    width:500px;
  }
  /*.i{*/
    /*!* Safari 5.1 - 6.0 *!*/
    /*background: -webkit-radial-gradient(60% 55%,closest-side,blue,green,yellow,black);*/
    /*!* Opera 11.6 - 12.0 *!*/
    /*background: -o-radial-gradient(60% 55%, closest-side,blue,green,yellow,black);*/
    /*!* Firefox 3.6 - 15 *!*/
    /*background: -moz-radial-gradient(60% 55%, closest-side,blue,green,yellow,black);*/
    /*!* 标准的语法 *!*/
    /*background: radial-gradient(60% 55%, closest-side,blue,green,yellow,black);*/
    /*border-radius:10px;*/
    /*width:500px;*/
  /*}*/
  /*.j{*/
    /*!* Safari 5.1 - 6.0 *!*/
    /*background: -webkit-radial-gradient(60% 55%, farthest-side,blue,green,yellow,black);*/
    /*!* Opera 11.6 - 12.0 *!*/
    /*background: -o-radial-gradient(60% 55%, farthest-side,blue,green,yellow,black);*/
    /*!* Firefox 3.6 - 15 *!*/
    /*background: -moz-radial-gradient(60% 55%, farthest-side,blue,green,yellow,black);*/
    /*!* 标准的语法 *!*/
    /*background: radial-gradient(60% 55%, farthest-side,blue,green,yellow,black);*/
    /*border-radius:10px;*/
    /*width:500px;*/
  /*}*/
  .k{
    /* Safari 5.1 - 6.0 */
    background: -webkit-repeating-radial-gradient(red, yellow 10%, green 15%);
    /* Opera 11.6 - 12.0 */
    background: -o-repeating-radial-gradient(red, yellow 10%, green 15%);
    /* Firefox 3.6 - 15 */
    background: -moz-repeating-radial-gradient(red, yellow 10%, green 15%);
    /* 标准的语法 */
    background: repeating-radial-gradient(red, yellow 10%, green 15%);
    border-radius:10px;
    width:500px;
  }



  .container{

    width: 100%;
    padding-right: 8px;
    padding-left: 8px;
    margin-right: auto;
    margin-left: auto;
    max-width: 540px;
    margin-top: 50px;

    .mu-input{

      font-size: 16px;
      width: 256px;
      min-height: 48px;
      display: inline-block;
      position: relative;
      color: rgba(0,0,0,.54);
      margin-bottom: 16px;
      padding-bottom: 12px;
      padding-top: 4px;

      .mu-input-content {
        height: 100%;
        position: relative;
      }
      .mu-text-field {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 100%;
        .mu-text-field-input {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          outline: none;
          border: none;
          background: none;
          border-radius: 0 0 0 0;
          -webkit-box-shadow: none;
          box-shadow: none;
          display: block;
          padding: 0;
          margin: 0;
          width: 100%;
          height: 32px;
          font-style: inherit;
          font-variant: inherit;
          font-weight: inherit;
          font-stretch: inherit;
          font-size: inherit;
          color: rgba(0,0,0,.87);
          font-family: inherit;
          position: relative;
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          &:focus{
            color:#2196f3
          }
        }
      }

    }
    .mu_fouse{

      color:#2196f3

    }

  }
  .icontent{
    width: 90%;
    height: 100%;
    margin: 0 5% 0 5%;
    overflow: hidden;
  }
  .logincontent{
    width: 90%;
    height: 100%;
    margin: 50px 5% 0 5%;
    overflow: hidden;
    text-align: center;
  }
  .logincontent input{
    width: 100%;
    height: 35px;
    padding: 3px;
    margin-top: 20px;
    /* 这里是去除掉input的默认样式然后修改为自己的 */
    background:none;
    outline:none;
    border:0px;
    /* 这里是修改为自己的样式 */
    border-bottom: 2px solid #dcdcdc;
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
    /* 使用怪异盒模型，也可以不使用 */
    box-sizing: border-box;
    transition:border-bottom 0.3s !important;
  }
  /* 这里是设置input获得焦点时的变化 */
  .logincontent input:focus{
    transition:border-bottom 0.3s !important;
    border-bottom: 2px solid #0F996B;
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;

  }
  /* 为登录div设置样式 */
  .loginb{
    margin-top: 20px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: rgb(7, 187, 127);
    border-radius: 5px;
    font-size: 18px;
    color: #ffffff;
  }
  /* 设置登录div被点击时改变一下背景色 */
  .loginb:active{
    background-color: #0F996B;
  }


</style>
