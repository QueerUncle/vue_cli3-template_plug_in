<!--
 -  2019/1/18  lize
 -->
<template>

  <div>

    <div>

      <div class="van-coupon" v-for="(i,index) in testQueryListFn">

        <div class="van-coupon__content" style="" @click = "linkTo(i)">

          <div class="van-coupon__head">

            <img style="width: 60px;margin-left: 10px;" :src="i.thumbnail | imgSrc">

          </div>

          <div class="van-coupon__body" style="">

            <h2  style="width: 86%;">{{i.title}}</h2>

            <p>有效期：{{i.startTime | formatDate}} - {{i.endTime | formatDate}}</p>

          </div>

        </div>

        <p class="van-coupon__description" :title = "i.describe"><span style="color: #666666">描述信息 : </span>{{i.describe}}</p>

        <div class = "tagdiv" :class = "i.status | tagName">

          <span v-if="i.status == 0" class = "tag">未完成</span>

          <span v-if="i.status == 1" class = "tag">已完成</span>

          <span v-if="i.status == 2" class = "tag">已过期</span>

        </div>

      </div>

      <div class="van-list__finished-text">没有更多了</div>

    </div>

  </div>

</template>

<script>
    export default {
        props:['testQueryList'],

        data () {
            return {

            }
        },
        computed:{

          testQueryListFn(){

            this.$props.testQueryList.forEach((i,v) =>{

                if(i.endTime < new Date().getTime()){

                    i.status = 2

                }


            });

            return this.$props.testQueryList

          },

        },
        filters:{

            tagName(status){

                return 'tag'+status;

            },
            //格式化日期
            formatDate(val) {

              let newdata = new Date(val);

              let y = newdata.getFullYear();

              let m = newdata.getMonth() + 1;

              m = m < 10 ? '0' + m : m;

              let d = newdata.getDate();

              d = d < 10 ? '0' + d : d;

              return `${y}-${m}-${d}`;

            },

          imgSrc(val){

                let src = '/static/vote_h.png';

                if(val!== ""){

                    src = val;

                }

                return src

          }

        },
        mounted () {

        },
        methods: {

          linkTo(item){

              if(item.status == 1){

                this.$toast({message:'该投票已完成',duration:1500});

              }else if(item.status == 1){

                this.$toast({message:'该投票已过期',duration:1500});

              }else{

                this.$router.push({path:'/answerSheet',query:{id:item.id,openid:this.$store.state.userInfo.id,title:item.title}})

              }

          },

        }

    }
</script>

<style scoped lang="scss">
  .van-coupon{

    position: relative;

    &:first-child{

      margin-top: 15px;

    }

  }
  .tagdiv{
    position: absolute;
    top:0;
    right:0;
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    span{
      position: absolute;
      right: -1px;
      top: -43px;
      display: block;
      width: 40px;
      z-index:3;
      transform: rotate(45deg);
      color: #fff;
      font-size: 12px;
      text-align: right;
      font-weight: normal;
    }
  }
  .tag0{
    border-top:50px solid #ff8f45;
  }
  .tag1{
    border-top:50px solid #0079f3;
  }
  .tag2{
    border-top:50px solid gray;
  }
  .van-coupon p{
    white-space: inherit
  }
  .van-coupon__head{

    min-width: 80px;

  }
  .van-coupon__content{

    padding: 24px 0 0 0px;

    display: -webkit-box;

  }
</style>
