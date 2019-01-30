<!--
 -  2019/1/16  lize
 -->
<template>
  <div class = "elementDialog">

    <el-dialog

      title="提示"

      :visible="sadfa"

      width="30%"

      @close = "close"

      :before-close="handleClose">

      <span>这是一段信息</span>

      <ul>

        <li v-for="(item,index) in list">

          {{item.name}}

        </li>

      </ul>

      <span slot="footer" class="dialog-footer">

        <el-button @click="close">取 消</el-button>

        <el-button type="primary" @click="serve">确 定</el-button>

      </span>

    </el-dialog>

  </div>

</template>

<script>
    export default {
        props:['dialogVisible','data','num'],
        data () {
            return {

                flag:false,


                list:[]

            }
        },
        computed:{
            sadfa:{

                get(){

                    return this.dialogVisible

                },
                set(){

                }

            }
        },
        watch:{

          dialogVisible(n){

              this.flag = n ? true :false;

          }

        },
        mounted () {

            this.flag = this.dialogVisible ? true :false ;

              let data = this.$props.data;

              for(let i of data){

                i.name+="1"

              }

            this.list = data;
        },
        methods: {

          handleClose(done) {

            this.$confirm('确认关闭？')

              .then(_ => {

                done();

              })

              .catch(_ => {});

          },

          close(){

              console.log(111);

              this.$emit('cleanl',false)


          },

          serve(){

            this.$emit('serve',false)

          }

        }
    }
</script>

<style scoped lang="scss">

</style>
