<!--
 -  2019/1/14  lize
 -->
<template>
  <div class = "answerSheet">

    <van-swipe v-if = "result.length>0" ref = "Swipe" @change = "onChange" :loop = "false" :show-indicators = "false" :touchable = "false">

      <van-swipe-item  v-for = "(item,index) in result" :key = "index+1">

        <Text-tem v-if="item!=null && item.type == 'text'"  :data = "item"></Text-tem>

        <Radio-tem v-if="item!=null && item.type == 'radio'" :data = "item"></Radio-tem>

        <Checkbox-tem v-if="item!=null && item.type == 'checkbox'" :data = "item"></Checkbox-tem>

      </van-swipe-item>

    </van-swipe>

    <van-button v-if = "result.length>0 && SwipeIndex< result.length-1" class = "btn" block type="primary" size="normal" @click = "next">下一题</van-button>

    <van-button v-if = "result.length>0 && !(SwipeIndex< result.length-1)" class = "btn" block type="primary" size="normal" @click = "next">查看答案</van-button>

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

                    max:1,

                    min:1

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
                      {
                        id:'3-5',

                        title:'哈密瓜',

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

                SwipeIndex:0

            }

        },
        components:{

          TextTem:() => import('../components/TextTem'),

          RadioTem:() => import('../components/RadioTem'),

          CheckboxTem:() => import('../components/CheckboxTem')

        },
        mounted () {

          this.initialize();

        },
        methods: {

          initialize(){

              this.result.forEach((i,v) =>{

                for(let t = 0,Maxt = i.max; t< Maxt ;t++){

                  if(i.type == 'text'){

                    i.value.push({title:'',message:''});

                  }else if(i.type == 'radio'){

                    i.value.push({radio:''});


                  }

                }

              });

//             this.result = [];

            if(this.result.length<=0){

              this.$dialog.alert({

                message: '服务器错误！'

              }).then(() => {

                this.$router.push('/')

              });

            }

          },

          linkTo(){

              this.$router.push('/')

          },

          onChange(val){

            this.SwipeIndex = val;

          },

          next(){

              console.log(this.result[this.SwipeIndex]);

              let flag = this.verification(this.result[this.SwipeIndex]);

              if(flag){

                if(this.SwipeIndex<this.result.length-1){

                  this.SwipeIndex++;

                  this.$refs.Swipe.swipeTo(this.SwipeIndex)

                }else{

                  console.log(this.result)

                }

              }else{

                this.verification(this.result[this.SwipeIndex]);

              }

          },

          verification(obj){

              let flag = true;

              let Ary = obj.value;

              if(!Ary){

                flag = false;

              }else{

                if(obj.type == "text"){

                  let NewAry = [];

                  Ary.forEach((i,v) =>{

                      if(i.title!=="" && i.message==""){

                        NewAry.push(i);

                      }

                  });

                  if(NewAry.length<obj.min || NewAry.length>obj.max){

                    flag = false;

                    this.$toast(`该项最少需要填${this.result[this.SwipeIndex].min}项,最多能填${this.result[this.SwipeIndex].max}项！`);

                  }

                }else if(obj.type == "radio"){

                    let radio = obj.value[0].radio;

                    if(radio == ""){

                      flag = false;

                      this.$toast(`该项最少需要选择${this.result[this.SwipeIndex].min}项,最多选择${this.result[this.SwipeIndex].max}项！`);

                    }

                }else {

                  if(Ary.length<obj.min || Ary.length>obj.max){

                    flag = false;

                    this.$toast(`该项最少需要选择${this.result[this.SwipeIndex].min}项,最多选择${this.result[this.SwipeIndex].max}项！`);

                  }

                }

              }

              return flag;

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
