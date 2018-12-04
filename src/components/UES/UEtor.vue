<!--
 -  2018/10/15  lize
 -->
<!--富文本编辑器组件-->
<template>

    <div class = "UEtor" ref = "editor" id = "editor"></div>

</template>

<script>

//  import '../../assets/UE/ueditor.config'
//
//  import '../../assets/UE/ueditor.all'
//
//  import '../../assets/UE/lang/zh-cn/zh-cn'
//
//  import '../../assets/UE/themes/default/css/ueditor.css'

    export default {

        data () {

            return {

              id:'ueditorId'+Math.random().toString(16).substring(2) ,

              editor:null

            }

        },
      props: {

        defaultMsg: {

          type: String

        },

        config: {

          type: Object,

          default: {},

        }

      },

        watch:{

          value(val,oldVal) {

            this.editor = window.UE.getEditor(this.id, this.config);

            if (val !== null) {

              this.editor.setContent(val);

            }

          },

        },
        mounted () {

            console.log(window.UE)

          this.$nextTick(function f1() {

            // 保证 this.$el 已经插入文档

            this.$refs.editor.id = this.id;

            this.editor= window.UE.getEditor(this.id, this.config);

            this.editor.ready(function f() {

              this.editor.setContent(this.defaultMsg); // 确保UE加载完成后，放入内容。

            }.bind(this));

          });

        },
        methods: {

          getUEContent: function () { //对外暴露的获取富文本内容接口

            return this.editor.getContent();

          },

          setUEContent: function (data) {  //对外暴露的获取富文本内容接口

            this.editor.ready(function f() {

              this.editor.setContent('<p>'+data+'</p>', false);

            }.bind(this));

          },

          destroyUE(){ //对外暴露销毁组件接口

             this.editor1.destroy();

          }

        }

    }
</script>

<style scoped lang="scss">

</style>
