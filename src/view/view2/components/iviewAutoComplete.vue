<!--
 -  2019/3/1  lize
 -->
<template>
  <div>
    <AutoComplete
      v-model="value4"
      icon="ios-search"
      placeholder="input here"
      style="width:300px">
      <div class="demo-auto-complete-item" v-for="item in data5">
        <div v-if="item.childrens.length>0" class="demo-auto-complete-group" >
          <div>{{ item.name }}</div>
          <div style="padding-left: 10px;" v-for="(j,indexs) in item.childrens">
            <div v-if="j.childrens.length>0">
              <div>{{j.name}}</div>
              <div style="padding-left: 10px">



              </div>


            </div>
            <Option v-if="j.childrens.length<=0" :value="j.name" :key="j.name">
              <span class="demo-auto-complete-title">{{ j.name }}</span>
            </Option>
          </div>
        </div>
        <Option v-if="item.childrens.length<=0" :value="item.name" :key="item.name">
          <span class="demo-auto-complete-title">{{ item.name }}</span>
        </Option>
      </div>
    </AutoComplete>
  </div>
</template>

<script>
    export default {
        data () {
            return {

              value4: '',

              data5:[
                {
                  "coding":"01",
                  "id":"608074545835806720",
                  "name":"土地出让金1",
                  "type":"工程类",
                  "status":"using",
                  "rank":"end",
                  "remark":"阿斯达所多",
                  "level":1,
                  "childrens":[
                    {
                      "coding":"0101",
                      "id":"618587276556898304",
                      "name":"1111",
                      "type":"工程类科目",
                      "status":"using",
                      "rank":"summary",
                      "remark":"11",
                      "level":2,
                      "childrens":[
                        {
                          "coding":"010101",
                          "id":"618610007847473152",
                          "name":"333",
                          "type":"工程类科目",
                          "status":"using",
                          "rank":"end",
                          "remark":"333",
                          "level":3,
                          "_disableExpand":true,
                          "childrens":[]


                        }
                      ]
                    },
                    {
                      "coding":"0102",
                      "id":"618587276556898305",
                      "name":"111wrr1",
                      "type":"工程类科目",
                      "status":"using",
                      "rank":"summary",
                      "remark":"11",
                      "level":2,
                      "childrens":[
                        {
                          "coding":"010201",
                          "id":"618610007847473154",
                          "name":"333",
                          "type":"工程类科目",
                          "status":"using",
                          "rank":"end",
                          "remark":"333",
                          "level":3,
                          "_disableExpand":true,
                          "childrens":[]


                        }
                      ]
                    }
                  ]
                },
                {
                  "coding":"02",
                  "id":"601137355159506944",
                  "name":"低价款",
                  "type":"非工程类",
                  "status":"using",
                  "rank":"summary",
                  "level":1,
                  "_disableExpand":true,
                  "childrens":[]


                },
                {
                  "coding":"03",
                  "id":"601137355188867072",
                  "name":"缴纳的契税",
                  "type":"非工程类",
                  "status":"using",
                  "rank":"end",
                  "level":1,
                  "_disableExpand":true,
                  "childrens":[]

                },
                {
                  "coding": "04",
                  "id": "601137355218227200",
                  "name": "市政配置",
                  "type": "预备费",
                  "status": "using",
                  "rank": "summary",
                  "level": 1,
                  "childrens": [{
                    "coding": "0401",
                    "id": "601137355247587328",
                    "name": "土地使用税",
                    "type": "工程类",
                    "status": "stop",
                    "rank": "summary",
                    "level": 2,
                    "_disableExpand": true,
                    "childrens": []


                  }]
                }
              ],
              data4: [
                {
                  title: '话题',
                  children: [
                    {
                      title: 'iView',
                      count: 10000,

                    },
                    {
                      title: 'iView UI',
                      count: 10600,

                    }
                  ]
                },
                {
                  title: '问题',
                  children: [
                    {
                      title: 'iView UI 有多好',
                      count: 60100,

                    },
                    {
                      title: 'iView 是啥',
                      count: 30010,

                    }
                  ]
                },
                {
                  title: '文章',
                  children: [
                    {
                      title: 'iView 是一个设计语言',
                      count: 100000,

                    }
                  ]
                }
              ]

            }
        },
        mounted () {

        },
        methods: {}
    }
</script>

<style scoped lang="scss">

  .demo-auto-complete-item{
    padding: 4px 0;
    border-bottom: 1px solid #F6F6F6;
  }
  .demo-auto-complete-group{
    font-size: 12px;
    padding: 4px 6px;
  }
  .demo-auto-complete-group span{
    color: #666;
    font-weight: bold;
  }
  .demo-auto-complete-group a{
    float: right;
  }
  .demo-auto-complete-count{
    float: right;
    color: #999;
  }
  .demo-auto-complete-more{
    display: block;
    margin: 0 auto;
    padding: 4px;
    text-align: center;
    font-size: 12px;
  }
</style>

