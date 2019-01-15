<!--
 -  2018/12/27  lize
 -->
<template>

  <div class = "CbimTreeNode">

    <p class = "Cbim-tree-p">

      <span v-if="!subscript" @click = "recover" title = "收起">

          <Icon style="font-size: 20px;margin-bottom: 4px;" type="ios-menu" />

      </span>

    </p>

    <ul class = "ivu-select-dropdown-list CbimTreeNode-list">

      <li class = "ivu-select-item" v-for="(item,index) in TreeData.data" :class = "{select : touch == index}">

        <Checkbox style="float: left" :indeterminate = "item.indeterminate" v-model="item.checked" @on-change = onChange(item,index)></Checkbox>

        <span :title = "item.name" class = "text" @click = "clickSelf(item,index)">{{item.name}}</span>

        <span class = "icon">

          <Icon v-if="!item.showLoading && item.open!=null" type="ios-arrow-forward" @click = "loadData(item,index)" :class = "{rotate90 : item.open }" />

          <Icon v-if="item.showLoading" type="ios-loading" class="ivu-load-loop"></Icon>

        </span>

      </li>

    </ul>

    <div class = "pages" v-if="TreeData.count>TreeData.pageSize">

      <Page :current="TreeData.pageNo" :total="TreeData.count" :page-size = "TreeData.pageSize" size = "small" simple @on-change = "onPageNoChange"/>

    </div>

  </div>

</template>

<script>

    export default {

      name: 'Node',

      data () {

            return {

                touch:null,

            }

        },

      props:['data','subscript'],

      computed:{

          TreeData(){

              let propsTreeData = this.$props.data;

              return propsTreeData

          },

      },

      methods: {

        //加载下一级数据
        loadData(item,index){

          this.$set(item,'showLoading',true);

          this.$set(item,'open',true);

          this.TreeData.data.forEach(node =>{if(node.id!=item.id&&node.open!=null){this.$set(node,'open',false)}});

          item.val = 1;

          this.$parent.$parent.loadData(item,callBack =>{

            let renderData = this.$parent.$parent.nodeData;

            if(callBack.data.length<=0){this.$set(item,'showLoading',false);this.$set(item,'open',null);return};

            this.$set(item,'childer',callBack.data);

            callBack.data.forEach((node,index) =>{

                node.parent = item;

                node.parentIndex = item.level-1;

                node.nodeKey = `${item.nodeKey}-${node.id}.${callBack.pageNo}.${index}`;

                if(this.$parent.$parent.checkedAry.includes(node.nodeKey)){this.$set(node,'checked',!node.checked)};//根据记录状态设置初始状态

            });

            if(item.level<renderData.length){//删除点击元素的所有自己

              renderData.splice(item.level,renderData.length-item.level);

            }

            setTimeout( ()=>{

              this.$set(item,'showLoading',false);

              renderData.push(callBack);

            },500)

          });

          console.log(this.$parent.$parent.nodeData,'this.$parent.nodeDatathis.$parent.nodeDatathis.$parent.nodeDatathis.$parent.nodeData')

        },
        //点击自己
        clickSelf(item,index){

          this.touch = index;

          this.$emit('on-click-node',item)

        },
        //发生变化的时候
        onChange(item,index,){

          this.$emit('on-checkbox-change',item);

        },
        //页码发生改变
        onPageNoChange(val){

            let nodeKey = this.TreeData.data[0].nodeKey.split('-');

            nodeKey.pop();

            let renderData = this.$parent.$parent.nodeData;

            let obj = {

                val:val,

                subscript:this.$props.subscript,

                level:this.$props.subscript,

                nodeKey:nodeKey.join('-'),

                parent:renderData[this.$props.subscript>0?this.$props.subscript-1:0].data.find((item) =>{return item.open})

            };

            this.$emit('on-pageNo-change',obj);

        },
        //恢复数据为第一级
        recover(){

          this.$parent.$parent.nodeData.splice(1,this.$parent.$parent.nodeData.length-1);

          this.$parent.$parent.nodeData.forEach((i,v) =>{

              for(let j of i.data){

                  this.$set(j,'open',false)

              }

          })

        }

      }

    }
</script>

<style scoped lang="scss">

.CbimTreeNode{

  width: 140px;

  overflow: hidden;

  background: #ffffff;

  box-sizing: border-box;

  border-radius: 4px;

  box-shadow: 0 1px 6px rgba(0,0,0,.2);

  .Cbim-tree-p{

    background: #515a6e;

    width: 100%;

    height: 30px;

    line-height: 30px;

    color:#ffffff;

    text-align: right;

    padding-right: 10px;

    font-size:14px;

    span{

      cursor: pointer!important;

    }

  }

  .CbimTreeNode-list{

    margin-top: 20px;

    margin-bottom: 20px;

    max-height: 400px;

    overflow-y: auto;

    li{

      padding: 10px;

      overflow: hidden;

      .text{

        margin-left: 5px;

        float: left;

        display:block;/*内联对象需加*/

        width:54px;

        word-break:keep-all;/* 不换行 */

        white-space:nowrap;/* 不换行 */

        overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */

        text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/

      }

      .icon{

        width: 18px;

        height: 20px;

        float: right;

        padding-left: 5px;

      }

    }

  }
  .pages{

    margin-bottom: 20px;

    ul{

      padding-left: 5px;

      /deep/ .ivu-page-prev{

        min-width: 1px!important;

      }
      /deep/ .ivu-page-next{

        min-width: 1px!important;

      }

      /deep/ .ivu-page-simple-pager{

        margin-right: 4px;

         input{

           width: 20px!important;

           padding: 5px 3px ;

           margin: 0 4px;

         }

        span{

          padding: 0 2px 0 2px

        }

      }

    }

  }

}
.rotate90{

  transform: rotate(90deg);

  color:#2d8cf0

}
.select{

  background: #d5e8fc;

}

</style>
