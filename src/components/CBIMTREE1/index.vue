<!--
 -  2018/12/27  lize
 -->
<template>

  <div class = "mask">

    <div class = "cbim-tree-alertWarp">

      <div class = "CbimTree">

        <transition-group name="list" tag = "div" style = "width: 100%;height: 100%;">

          <Node

            v-drag

            v-for="(item,index) in nodeData"

            :data = "item"

            :key = "index+1"

            :subscript = index

            class = "TreeNode"

            :style = "{left: index*childerNodeWidth+'px',top:index*potionTop+'px' }"

            @on-checkbox-change = "onCheckboxChange"

            @on-click-node = "onClickNode"

            @on-select-change = "onSelectChange"

            @on-pageNo-change = "onPageNoChange">

          </Node>

        </transition-group>

      </div>

    </div>

  </div>

</template>

<script>

    export default {

        data () {

            return {

                nodeData:[], //渲染的数组

                childerNodeWidth:140, //每个node节点的告诉

                potionTop:30,//每一级相差的高度

                checkedAry:[],//操作过的数组

            }

        },

        components:{

          Node:() =>import('./components/node')

        },

        directives:{

          drag(el){

            let oDiv = document.querySelector('.cbim-tree-alertWarp');

            let OdIV_P = el.children[0];

            OdIV_P.style.cursor = "move";

            OdIV_P.onmousedown = function(ev){

              let disX = ev.clientX -oDiv.offsetLeft;

              let disY = ev.clientY - oDiv.offsetTop;

              document.onmousemove = function(ev){

                let l = ev.clientX-disX;

                let t = ev.clientY-disY;

                if(l < 0) {

                  l = 0;

                }else if(l > document.documentElement.clientWidth) {

                  l = document.documentElement.clientWidth;

                }
                if(t < 0) {

                  t = 0;

                }else if(t > document.documentElement.clientHeight) {

                  t = document.documentElement.clientHeight;
                }

                oDiv.style.left = l+'px';

                oDiv.style.top = t+'px';

              };

              document.onmouseup = function(){

                document.onmousemove=null;

                document.onmouseup=null;

              };

            };

          }

        },

        props:['data','loadData','pageData'],

        computed:{

            NodeData(){

                let PropsNodeData = this.$props.data; //新传进来的数据

                console.log(PropsNodeData);

                PropsNodeData.data.forEach((node,index) =>{node.nodeKey = `${node.id}.${PropsNodeData.pageNo}.${index}`});

                return PropsNodeData;

            },

        },

        mounted () {

          this.initialize();

        },

        methods: {

          //初始化
          initialize(){

            let PropsNodeData = this.NodeData;

            if(PropsNodeData.data.length>0) {

              this.nodeData.push(PropsNodeData);

            }

          },
          //监听复选框发生变化的时候
          onCheckboxChange(data){
            //设置记录状态
            const recordCheckedAry = (data) =>{

              if(!data.checked){

                if(this.checkedAry.indexOf(data.nodeKey)<0){

                  this.checkedAry.push(data.nodeKey)

                }

              }else{

                if(this.checkedAry.indexOf(data.nodeKey)>-1){

                  this.checkedAry.splice(this.checkedAry.indexOf(data.nodeKey),1);

                }

              };

              if(data.childer){data.childer.forEach((item) =>{recordCheckedAry(item);})}

            };
            //设置不直接关联的选中状态
            const setRestsNodeChecked = (data) =>{

              if(data.parent.childer.every(node => !node.checked)){

                this.$set(data.parent,'indeterminate',false);

                this.$set(data.parent,'checked',false);

//                if(this.checkedAry.indexOf(data.parent.nodeKey)<0){
//
//                  this.checkedAry.push(data.parent.nodeKey)
//
//                }
//                if(data.parent.parent && data.parent.parent.childer){
//
//                  setRestsNodeChecked(data.parent)
//
//                }

              }else if(data.parent.childer.every(node => node.checked)){

                this.$set(data.parent,'indeterminate',false);

                this.$set(data.parent,'checked',true);

//                this.checkedAry.splice(this.checkedAry.indexOf(data.parent.nodeKey),1);

                if(data.parent.parent && data.parent.parent.childer){

                  setRestsNodeChecked(data.parent)

                }

              }

            };

            if(!data.indeterminate){this.setParentNodeIndeterminates(data);}else{this.$set(data,'indeterminate',!data.indeterminate);}

            if(data.childer){this.setChilderNodeCheckeds(data,data.checked)};

            if(data.parent && data.parentchilder){setRestsNodeChecked(data)}

            recordCheckedAry(data);

            console.log(data,this.checkedAry,this.nodeData);

          },
          //点击树节点时触发
          onClickNode(data){

              console.log(data,'树节点');

              let newAry = [];

              //查找器父级元素
              const findParentNode = (data) =>{

                 newAry.push(data);

                  if(data.parent){

                    findParentNode(data.parent);

                  }

              };

              //删除多余元素
              const filterAry = (Ary) =>{

                  if(Ary.length>0){

                      for(let node of Ary){

                          if(node.childer){delete node.childer};

                          if(node.parent){delete node.parent};

                      }

                  }

              };

            findParentNode(data);

//            filterAry(newAry);

            console.log( newAry,'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz');

            this.$emit('on-click-self',newAry)
          },
          //点击下拉按钮时触发
          onSelectChange(data){

            console.log(data,'下拉按钮');

            this.$emit('on-select-change',data);

          },
          //PageNo发生改变的时候
          onPageNoChange(obj){

            this.$props.pageData(obj,callBack =>{

              let renderData = this.nodeData;

              if(callBack.data.length<=0){return};

              callBack.data.forEach((node,index) =>{

                  node.parent = obj.parent;

                  node.parentIndex = obj.level-1;

                  node.nodeKey = `${obj.nodeKey}-${node.id}.${callBack.pageNo}.${index}`;

                  if(this.checkedAry.includes(node.nodeKey)){this.$set(node,'checked',!node.checked)}//根据记录状态设置初始状态

              });

              console.log(this.checkedAry,callBack.data,'111111111111111111111111111111111111111111');

              console.log(this.checkedAry.length,'111111111111111111111111111111111111111111');

              if(obj.parent){this.$set(obj.parent,'childer',callBack.data)};

              renderData.splice(obj.subscript,renderData.length-obj.subscript);//删除选中元素的所有子集

              this.setParentNodeIndeterminates(callBack.data[0]);

              setTimeout(()=>{

                renderData.push(callBack);

              },500);

            });

          },
          //设置该元素父级的选中状态
          setParentNodeIndeterminates(data){

            if(data.parent){

              this.$set(data.parent,'indeterminate',!data.parent.childer.every(node => node.checked));

              this.$set(data.parent,'checked',data.parent.childer.every(node => node.checked));

              if(data.parent.childer.every(node => !node.checked)){

                this.$set(data.parent,'indeterminate',false);

                this.$set(data.parent,'checked',false);

              }

              if(data.parent.parent){

                this.setParentNodeIndeterminates(data.parent);

              }

            }

          },
          //设置子元素的选中状态
          setChilderNodeCheckeds(data,flag){

            if(data.childer){

              data.childer.forEach((item) =>{

                this.$set(item,'checked',flag);

                this.$set(item,'indeterminate',null);

                this.setChilderNodeCheckeds(item,flag)

              })

            }

          }

        }

    }

</script>

<style scoped lang="scss">

.CbimTree{

  position: relative;

  .TreeNode{

    position: absolute;

    /*float: left;*/

  }

}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
  /* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.mask {
  width: 100%;
  height:100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
}
.cbim-tree-alertWarp{
  padding-bottom: 15px;
  /*width:  500px;*/
  min-width:840px ;
  min-height: 630px;
  position: fixed;
  top:50%;
  /*margin-top:-50%;*/
  left: 50%;
  overflow: hidden;
  font-size: 16px;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform:translate(-50%, -50%); ;
  -ms-transform:translate(-50%, -50%); ;
  -o-transform: translate(-50%, -50%);;
  transform: translate(-50%, -50%);;
  /*margin-left: -250px;*/
  /*background: #f0f0f0;*/
  z-index: 101;

}
</style>
