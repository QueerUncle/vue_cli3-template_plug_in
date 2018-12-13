<!--
 -  2018/12/7  lize
 -->
<template>
  <div class = "inputDiv">
    <label>
      <span>姓名：</span>
      <input class = "textInput" type="text" v-model="inputText">
    </label>
    <label>
      <span>key:</span>
      <input class = "textInput" type="text" v-model="inputkeyText">
    </label>

    <ul>
      <li :class = "{active:i.checked}" v-if="i.isShow" v-for="(i,index) in listData" @click = "clickLi(i)">{{i.name}}</li>
    </ul>

    <label style="cursor: pointer">
      <input class = "checkInpt" type="checkbox" v-model="checkedInput">
      <span>显示已选中人员</span>
    </label>

  </div>
</template>

<script>
    export default {
        data() {
            return {
              inputText:null,
              inputkeyText:null,
              checkedInput:false,
              listData:[],
              PropListData:[]
            }
        },
        props:['data'],

      mounted() {

        let NewAry = this.$props.data;

        NewAry.forEach((i,v) =>{

          this.$set(i,'checked',false);

          this.$set(i,'isShow',true);

        })

        console.log(NewAry,'初始化');

        this.PropListData = JSON.parse(JSON.stringify(NewAry));

        this.listData = NewAry;
      },

      watch:{

          '$prop.data'(n){


            let NewAry = n;

            NewAry.forEach((i,v) =>{

              this.$set(i,'checked',false);

              this.$set(i,'isShow',true);

            })

            console.log(NewAry,'发生变化')

            this.PropListData = JSON.parse(JSON.stringify(NewAry));

            this.listData = NewAry;

          },


        //是否显示选中人员
        checkedInput(n){

          console.log(n,'是否显示选中');

          this.processing(this.inputText,n,this.listData,this.inputkeyText);

        },

        //搜索
        inputText(n){

          console.log(n,'搜索')

          this.processing(n,this.checkedInput,this.listData,this.inputkeyText);

        },
        //key搜索
        inputkeyText(n){

          console.log(n)

          this.processing(this.inputText,this.checkedInput,this.listData,n);

        }

      },
        methods: {

          //点击每个li
          clickLi(item){

            console.log(item)

            item.checked = !item.checked

            this.processing(this.inputText,this.checkedInput,this.listData,this.inputkeyText);

          },

          processing(name,flag,list,keyName){
            //name为第一个搜索框的值，flag为是否显示选中，list为数据源，keyName为第二个搜索框的值
            if(name){
                if(flag){
                  list.forEach((i,v) =>{
                    if(i.name.indexOf(name)>=0){
                      if(keyName){
                        if(i.key.indexOf(keyName)>=0){
                          if(i.checked){
                            i.isShow = true;
                          }else{
                            i.isShow = false;
                          }
                        }else{
                          i.isShow = false;
                        }
                      }else{
                        if(i.checked){
                          i.isShow = true;
                        }else{
                          i.isShow = false;
                        }
                      }

                    }else{
                      i.isShow = false;
                    }
                  })
                }else{
                  list.forEach((i,v) =>{
                    if(i.name.indexOf(name)>=0){
                      if(keyName){
                        if(i.key.indexOf(keyName)>=0){
                          i.isShow = true;
                        }else{
                          i.isShow = false;
                        }
                      }else{
                        i.isShow = true;
                      }
                    }else{
                      i.isShow = false;
                    }
                  })
                }
            }else{
              if(flag){
                list.forEach((i,v) =>{
                  if(keyName){
                    if(i.key.indexOf(keyName)>=0){
                      i.isShow = true;
                    }else{
                      i.isShow = false;
                    }
                  }else{
                    if(i.checked){
                      i.isShow = true;
                    }else{
                      i.isShow = false;
                    }
                  }
                })
              }else{
                list.forEach((i,v) =>{
                  if(keyName){
                    if(i.key.indexOf(keyName)>=0){
                      i.isShow = true;
                    }else{
                      i.isShow = false;
                    }
                  }else{
                    i.isShow = true;
                  }
                })
              }
            }
          }
        }
    }
</script>

<style scoped lang="scss">
.inputDiv{

  margin-left:300px;

  .textInput{

    width: 400px;

    height: 40px;

    margin-bottom: 20px;
  }

  ul{

    width:500px;

    li{

      width: 100%;

      height: 40px;

      line-height: 40px;

      background:#2D64B3;

      color: white;

      cursor: pointer;

      padding-left:20px;

      &:hover{

        background: #9cb945;

       }

    }

    margin-bottom:30px;

  }

.checkInpt{

  width: 50px;

  height: 50px;

  cursor: pointer;

}

span{

  font-size: 20px;
}

}

.active{

  background: black !important;

  color:#aa00aa !important;

}
</style>
