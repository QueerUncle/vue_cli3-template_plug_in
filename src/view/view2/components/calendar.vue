<!--
 -  2018/12/19  lize
 -->
<template>

  <div class = "calendarTemplate">

    <div class = "calendar">

        <div class = "month">

          <ul>

            <li @click="pickPre(currentYear,currentMonth)"><</li>

            <li @click="pickYear(currentYear,currentMonth)">

              <span>{{ currentYear }}</span>

              <span>{{ currentMonth }}月</span>

            </li>

            <li @click="pickYear(currentYear,currentMonth)">></li>

          </ul>

        </div>

        <div class = "weekdays">

          <ul>

            <li v-for="(item,index) in weekdaysData">

              <span>{{item}}</span>

            </li>

          </ul>

        </div>

        <div class = "days">

          <ul>

            <li v-for="dayobject in days">

              <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>

              <span v-else>
          <!--今天  同年同月同日-->
                <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()" class="active">{{ dayobject.day.getDate() }}</span>

                <span v-else>{{ dayobject.day.getDate() }}</span>

              </span>

            </li>

          </ul>


        </div>

    </div>

  </div>

</template>

<script>
    export default {
        data () {
            return {

              weekdaysData:['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],

              currentDay: 1,

              currentMonth: 1,

              currentYear: 1970,

              currentWeek: 1,

              days: [],

            }
        },
        mounted () {

          this.initData(null);

        },
        methods: {

          initData(cur) {

            let leftcount=0; //存放剩余数量

            let date;

            if (cur) {

              date = new Date(cur);

            } else {

              let now=new Date();

              let d = new Date(this.formatDate(now.getFullYear() , now.getMonth() , 1));

              d.setDate(35);

              date = new Date(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));

              console.log(date)

            }

            this.currentDay = date.getDate();

            this.currentYear = date.getFullYear();

            this.currentMonth = date.getMonth() + 1;

            this.currentWeek = date.getDay(); // 1...6,0

            console.log(this.currentDay,this.currentYear,this.currentMonth,this.currentWeek);

            if (this.currentWeek == 0) {

              this.currentWeek = 7;

            }

            let str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);

            console.log(str)

            this.days.length = 0;

            // 今天是周日，放在第一行第7个位置，前面6个
            //初始化本周
            for (let  i = this.currentWeek - 1; i >= 0; i--) {

              let d = new Date(str);

              d.setDate(d.getDate() - i);

              let dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性

              dayobject.day=d;

              this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用

            }
            //其他周
            for( let  i = 1; i <= 35 - this.currentWeek; i++) {

              let d = new Date(str);

              d.setDate(d.getDate() + i);

              let dayobject={};

              dayobject.day=d;

              this.days.push(dayobject);

            }

          },
          pickPre(year, month) {

            // setDate(0); 上月最后一天
            // setDate(-1); 上月倒数第二天
            // setDate(dx) 参数dx为 上月最后一天的前后dx天
            let d = new Date(this.formatDate(year , month , 1));

            d.setDate(0);

            this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));

          },
          pickNext(year, month) {

            let d = new Date(this.formatDate(year , month , 1));

            d.setDate(35);

            this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));

          },

          pickYear(year, month) {

            alert(year + "," + month);

          },

          // 返回 类似 2016-01-02 格式的字符串
          formatDate(year,month,day){

            let y = year;

            let m = month;

            if(m<10) m = "0" + m;

            let d = day;

            if(d<10) d = "0" + d;

            return y+"-"+m+"-"+d

          },

        }
    }
</script>

<style scoped lang="scss">
  .calendar{

    width: 500px;

    overflow: hidden;

    margin:0 auto;

    background-color: gray;

    ul {

      width: 100%;

      overflow: hidden;

      li{

        list-style: none;

        cursor: pointer;

      }

    }

    .month{

      width: 100%;

      float: left;

      overflow: hidden;

      background-color: #00a0e9;

      ul{

        li{

          float: left;

          width: 20%;

          height: 40px;

          text-align: center;

          line-height: 40px;

          &:nth-child(2){

            width: 58%;

          }

        }

      }

    }
    .weekdays{

      width: 100%;

      float: left;

      overflow: hidden;

      background-color: #00ff00;

      ul{

        li{

          width: 14%;

          height: 30px;

          float: left;

          line-height: 30px;

          text-align: center;

        }

      }

    }

    .days{

      width: 100%;

      float: left;

      overflow: hidden;

      background-color: #ffffff;

      ul{

        li{

          width: 14.27%;

          float: left;

          height: 60px;

          text-align: center;

          line-height: 60px;

          border: 1px solid gray;

          border-right:none ;

          &:nth-child(7){

            border-right: 1px solid gray;

          }
          &:nth-child(14){

            border-right: 1px solid gray;

          }
          &:nth-child(21){

            border-right: 1px solid gray;

          }
          &:nth-child(28){

            border-right: 1px solid gray;

          }
          &:nth-child(35){

            border-right: 1px solid gray;

          }

        }

      }

    }

  }
</style>
