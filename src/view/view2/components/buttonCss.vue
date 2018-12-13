<!--
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
  </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        mounted() {

        },
        methods: {}
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
</style>
