<!--
 -  2019/1/16  lize
 -->
<template>

    <div>

      <element-dialog

        :dialogVisible = "dialogVisible"

        :data = "list"

        :num = "num"

        @cleanl = "cleanl"

        @serve = "serve"

      >

      </element-dialog>

      <el-button

        type="text"

        @click="open"

      >点击打开 Dialog</el-button>

    </div>
</template>

<script>
    export default {
        data () {
            return {

              dialogVisible:false,

              num:2,

              list:[
                {name:'lize'},
                {name:'jjc'},
                {name:'ww'},
                {name:'lxx'},
                {name:'sy'},
              ]

            }
        },
        components:{

          elementDialog:() => import('./childerComponents/elementDialog')

        },
        mounted () {

        },
        methods: {

          open(){

            this.dialogVisible = true;

          },

          cleanl(flag){

            this.dialogVisible = flag;

          },

          serve(flag){

            this.dialogVisible = flag;

          }

        }
    }
</script>

<style scoped lang="scss">

</style>
