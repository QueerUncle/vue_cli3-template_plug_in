<!--
 -  2018/12/18  lize
 -->
<template>
  <div style="overflow: hidden">
    <div class="demo-split">
      <Split v-model="split1">
        <div slot="left" class="demo-split-pane">
          Left Pane
        </div>
        <div slot="right" class="demo-split-pane">
          Right Pane
        </div>
      </Split>
    </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {

              split1: 0.5

            }
        },
        mounted () {

        },
        methods: {}
    }
</script>

<style scoped lang="scss">
  .demo-split{
    /*height: 100%;*/
    height: 200px;
    overflow: hidden;
    border: 1px solid #dcdee2;
  }
  .demo-split-pane{
    padding: 10px;
  }
</style>
