<!--
 -  2018/12/27  lize
 -->
<template>

  <div class = "CbimTreeNode">

    <ul class = "ivu-select-dropdown-list CbimTreeNode-list">

      <li class = "ivu-select-item" v-for="(item,index) in TreeData" :class = "{select : select == index && item.select}">

        <Checkbox style="float: left" :indeterminate = "item.indeterminate" v-model="item.checked" @on-change = onChange(item,index)></Checkbox>

        <span :title = "item.title" class = "text" @click = "clickSelf(item,index)">{{item.title}}</span>

        <span class = "icon">

          <Icon v-if="item.isLoadData" type="ios-arrow-forward" @click = "loadData(item,index)" :class = "{rotate90 : select == index && item.select }" />

        </span>

      </li>

    </ul>

    <div class = "pages">

      <Page :current="2" :total="50" simple @on-change = "onPageNoChange"/>

    </div>

  </div>

</template>

<script>

    export default {

        data () {

            return {

              select:null,

              indeterminate:false,

            }

        },

        props:['data','subscript'],

        watch:{

          checkAllGroup(n,o){

              console.log(n);

          },

        },

        computed:{

            TreeData(){

                let propsTreeData = this.$props.data;

                return propsTreeData

            },

        },
        mounted () {

        },
        methods: {

          //加载下一级数据
          loadData(item,index){

            console.log(item);

            this.disposeUnselectedTreeData(this.TreeData,index);

            item.select = !item.select;

            this.select = index;

            this.$emit('on-select-change',item)

          },
          //点击自己
          clickSelf(item,index){

            console.log(item);

            this.$emit('on-click-node',item)

            console.log(this.$parent,'this.$parentthis.$parentthis.$parentthis.$parent')

            this.$parent.loadData(item,children =>{

                console.log(item,'item');

                console.log(children,'children')

            });

            return

          },
          //发生变化的时候
          onChange(item,index){

            console.log(item);

            this.$emit('on-checkbox-change',item);


          },
          //页码发生改变
          onPageNoChange(val){

              console.log(val);

              console.log(this.$props.subscript);

              let obj = {

                  val:val,

                  subscript:this.$props.subscript,

                  level:this.$props.subscript+1

              };

              this.$emit('on-pageNo-change',obj);

          },
          //处理未选中数组
          disposeUnselectedTreeData(NewAry,index){

            for(let node = 0; node < NewAry.length; node++ ){

                if(node == index){

                  NewAry[node].select == true

                }else{

                  NewAry[node].select == false;

                }

            }

          }

        }

    }
</script>

<style scoped lang="scss">

.CbimTreeNode{

  width: 165px;

  overflow: hidden;

  background: #ffffff;

  box-sizing: border-box;

  border-radius: 4px;

  box-shadow: 0 1px 6px rgba(0,0,0,.2);

  .CbimTreeNode-list{

    margin-top: 20px;

    margin-bottom: 20px;

    li{

      padding: 10px;

      overflow: hidden;

      .text{

        margin-left: 5px;

        float: left;

        display:block;/*内联对象需加*/

        width:70px;

        word-break:keep-all;/* 不换行 */

        white-space:nowrap;/* 不换行 */

        overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */

        text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/


      }

      .icon{

        width: 30px;

        height: 20px;

        float: right;

        padding-left: 5px;

      }

    }

  }
  .pages{

    margin-bottom: 20px;
  }

}
.rotate90{

  transform: rotate(90deg);

}
.option0{

  opacity: 0;

}
.select{

  background: #515a6e;

  color:#ffffff;

}

</style>
