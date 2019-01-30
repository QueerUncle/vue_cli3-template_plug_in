<!--
 -  2019/1/23  lize
 -->
<template>
  <div>

    <Modal

      v-model="modal1"

      title="Common Modal dialog box title"

      @on-ok="ok"

      @on-cancel="cancel">

      <div>

        <input type="text" v-model="msg">

      </div>

    </Modal>

  </div>
</template>

<script>
    export default {
        props:['flag','data'],
        data () {
            return {

                msg:null,

                modal1:false,

            }
        },
        mounted () {

          this.modal1 = this.$props.flag;


          this.msg = this.$props.data ? this.$props.data.row.name : "" ;

        },
        watch:{

            flag(n){

              this.modal1 = n

            },
            data(n){

              this.msg = n.row.name

            }

        },
        methods: {

          ok () {
            this.$Message.info('点击了确定');

            this.$emit('close',true,this.$props.data,this.msg);
          },
          cancel () {
            this.$Message.info('点击了取消');

            this.$emit('close',false,this.$props.data,this.msg);

          }

        }
    }
</script>

<style scoped lang="scss">

</style>
