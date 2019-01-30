<!--
 -  2019/1/14  lize
 -->
<template>
  <div class = "answerSheet">

    <transition name="fade">

      <Text-tem v-if="data!=null && type == 'text'"  :data = "data"></Text-tem>

      <Radio-tem v-if="data!=null && type == 'radio'" :data = "data"></Radio-tem>

      <Checkbox-tem v-if="data!=null && type == 'checkbox'" :data = "data"></Checkbox-tem>

    </transition>

    <!--<transition v-if="data!=null && data.type == 'text'" name="van-fade">-->

      <!--<Text-tem :data = "data"></Text-tem>-->

    <!--</transition>-->
    <!--<transition v-if="data!=null && data.type == 'radio'" name="van-fade">-->

      <!--<Radio-tem  :data = "data"></Radio-tem>-->

    <!--</transition>-->
    <!--<transition v-if="data!=null && data.type == 'checkbox'" name="van-fade">-->

      <!--<Checkbox-tem  :data = "data"></Checkbox-tem>-->

    <!--</transition>-->

    <van-button class = "btn" block type="primary" size="normal" @click = "next">下一题</van-button>

  </div>

</template>

<script>
    export default {
        data () {
            return {

                result:[

                  {

                      id:1,

                      title:'你叫什么名字？',

                      type:'text',

                      option:[],

                      subscript:1,

                      value:[],

                      Remarks:{

                        content:true,

                        required:true,

                        value:'',

                      },

                      max:5,

                      min:5

                  },
                  {

                    id:2,

                    title:'以下人员中，你认为最帅的是哪一位？',

                    type:'radio',

                    option:[

                      {
                        id:'1-1',

                        title:'李泽',

                        checked:false

                      },
                      {
                        id:'1-2',

                        title:'纪金池',

                        checked:false

                      },
                      {
                        id:'1-3',

                        title:'吴伟',

                        checked:false

                      },
                      {
                        id:'1-4',

                        title:'李新星',

                        checked:false

                      },

                      {
                        id:'1-5',

                        title:'宋艳',

                        checked:false

                      },
                      {
                        id:'1-6',

                        title:'丁长晓',

                        checked:false

                      },

                    ],

                    subscript:2,

                    value:[],

                    Remarks:{

                      content:false,

                      required:false,

                      value:'',

                    },

                    max:5,

                    min:5

                  },
                  {

                    id:3,

                    title:'你喜欢吃什么？',

                    type:'checkbox',

                    option:[

                      {
                        id:'3-1',

                        title:'苹果',

                        checked:false

                      },
                      {
                        id:'3-2',

                        title:'火龙果',

                        checked:false

                      },
                      {
                        id:'3-3',

                        title:'香蕉',

                        checked:false

                      },
                      {
                        id:'3-4',

                        title:'橘子',

                        checked:false

                      },

                    ],

                    subscript:3,

                    value:[],

                    Remarks:{

                      content:false,

                      required:true,

                      value:'',

                    },

                    max:5,

                    min:5

                  }

                ],

                data:null,

                type:null,


            }
        },
        components:{

          TextTem:() => import('./TextTem'),

          RadioTem:() => import('./RadioTem'),

          CheckboxTem:() => import('./CheckboxTem')

        },
        mounted () {

          this.initialize();

        },
        methods: {

          initialize(){

              this.result.forEach((i,v) =>{

                  for(let t = 0,Maxt = i.max; t< Maxt ;t++){

                      i.value.push({id:'',title:''});

                  }

              });

              this.type = this.result[0].type;

              this.data = this.result[0];

          },

            linkTo(){

                this.$router.push('/')

            },
          next(){

              if(this.data.subscript < this.result.length){

                  this.type = this.result[this.data.subscript].type;

                  setTimeout(() =>{

                    this.data = this.result[this.data.subscript];

                  },1000);


              }else{



              }

          }

        }

    }
</script>

<style scoped lang="scss">
.btn{

  background: #000000;

  color: #ffffff;

  width: 90%;

  margin: 50px auto 0;

}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
