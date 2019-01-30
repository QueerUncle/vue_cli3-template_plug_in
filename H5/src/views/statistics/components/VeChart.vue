<!--
 -  2019/1/26  lize
 -->
<template>

  <div style="width: 100%;">

    <p style="text-align: center">{{chartData.title}}</p>

    <p>{{chartData.desc}}</p>

    <p v-if="switchFn" style="text-align: right" >

      <button   @click="changeType">切换图表类型</button>

    </p>

    <p style="text-align: right" >

      <mu-button color="primary" @click = "lookDetail(chartData)">查看评选原因</mu-button>

    </p>

    <ve-chart :extend = chartExtend  :judge-width = "true" v-if="chartData.chartData.rows.length>0" :data="chartData.chartData" :settings="chartSettings"></ve-chart>

    <div style="height: 400px;text-align: center;line-height: 400px;" v-if="!chartData.chartData.rows.length>0">

      数据初始化错误,或数据来源未知！

    </div>

  </div>

</template>

<script>
    export default {

        props:['chartData','switch'],

        data () {

          this.typeArr = ['histogram','pie','line'];

          this.index = 0;

          return {

            chartSettings: {

              type: this.typeArr[this.index],

            },

            chartExtend:{

              series:{

                barWidth:20,

                label: { show: true, position: "top" }

              },

              color:"#ff5000",

              'xAxis.0.axisLabel.rotate': 65

            }

          }

        },
        mounted () {

        },
        computed:{

          switchFn(){

              let t = false;

              if(this.$props.switch!=null){

                  t = this.$props.switch

              }

              return t

          }

        },
        methods: {
          changeType() {

            this.index++;

            if (this.index >= this.typeArr.length) { this.index = 0 }

            this.chartSettings = {

              type: this.typeArr[this.index]

            }

          },
          //查看评论详情
          lookDetail(chartData){

            this.$emit('on-look-click',chartData)

          }

        }

    }
</script>

<style scoped lang="scss">

</style>
