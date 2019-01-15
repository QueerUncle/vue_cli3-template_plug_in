<!--
 -  2018/12/24  lize
 -->
<template>

  <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>-->

  <div id="flip-list-demo" class="demo">

    <button v-on:click="shuffle">Shuffle</button>

    <transition-group name="flip-list" tag="ul">

      <li v-for="item in items" v-bind:key="item">

        {{ item }}

    </li>

    </transition-group>

  </div>

</template>

<script>
  import 'lodash'
    export default {
        data () {
            return {
              items: [1,2,3,4,5,6,7,8,9]
            }
        },
        mounted () {

        },
        methods: {

          shuffle: function () {

            this.items = _.shuffle(this.items)

          }
        }
    }
</script>

<style scoped lang="scss">
  .flip-list-move {
    transition: transform 1s;
  }
</style>
