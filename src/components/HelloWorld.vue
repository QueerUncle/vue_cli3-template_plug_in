<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>

    <Page :total="100"  class-name = "www"/>

    <i-editor v-model="content"></i-editor>

    <div class = "info">

      <!--<ueditor-one :defaultMsg=defaultMsg :config=config ref="ue"></ueditor-one>-->

    </div>

    <P @click = "getUEContent2">获取元素</P>

    <quill ref = "quill"></quill>

    <div v-html="asd"></div>
    <button @click = "sss">11111111111111111111111111111</button>


    <!--<qqq></qqq>-->



  </div>
</template>

<script >
  import ueditorOne from './UES/UEtor.vue'
  import quill from '@/components/quill/index'
//  import qqq from '@/components/test/test'
  export default {
  name: 'HelloWorld',
  data(){

      return {

          asd:'',

        content:'',

        defaultMsg:'这里是测试内容',

        config:{
          initialFrameWidth: null,

          initialFrameHeight: 350

        }

      }
  },
  props: {
    msg: String
  },
    components:{

      ueditorOne,

      quill,

//      qqq

    },
    methods:{

      getUEContent2() {

        let content = this.$refs.ue.getUEContent();

        console.log(content)

      },

      sss(){

          console.log(this.$refs.quill.getRichTextContent());

//          this.asd = this.$refs.quill.getRichTextContent

      },

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.www {
    /*width: 100px!important;*/
    /*height: 100px!important;*/
  background: red;
  }
.hello .www .ivu-page-item{
    background-color: greenyellow;

    font-size: 100px;
  }
  .info {
    border-radius: 10px;
    line-height: 20px;
    padding: 10px;
    margin: 10px;
    background-color: #ffffff;
  }

</style>
