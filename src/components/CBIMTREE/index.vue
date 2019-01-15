<!--
 -  2018/12/27  lize
 -->
<template>

  <div class = "CbimTree">

    <Node

      v-for="(item,index) in nodeData"

      :data = "item"

      :key = index

      :subscript = index

      class = "TreeNode"

      :style = "{ left: index*childerNodeWidth+'px', top :index*potionTop+'px' }"

      @on-checkbox-change = "onCheckboxChange"

      @on-click-node = "onClickNode"

      @on-select-change = "onSelectChange"

      @on-pageNo-change = "onPageNoChange">

    </Node>

  </div>

</template>

<script>

    export default {

        data () {

            return {

                nodeData:[], //渲染的数组

                childerNodeWidth:165, //每个node节点的告诉

                potionTop:20,

                defaultCheckedState:false,

                keyword:null,

                loadId:[],  //储存点击下拉按钮的节点;

                uncheckedAry:[],

            }

        },

        components:{

          Node:() =>import('./components/node')

        },

        props:['data','defaultChecked','loadData'],

        computed:{

            NodeData(){

                let PropsNodeData = this.$props.data; //新传进来的数据

                let defaultCheckedState = this.$props.defaultChecked == undefined || this.$props.defaultChecked == null ? this.defaultCheckedState : Boolean(this.$props.defaultChecked); //默认是否选中

                this.$Spin.hide();  //隐藏loading

                if(PropsNodeData.length>0){
                    //set判断的数据
                    PropsNodeData.forEach((i,v) =>{

                        this.$set(i,'indeterminate',null);

                        this.$set(i,'isLoadData',true);

                        this.$set(i,'checked',defaultCheckedState);

                        this.$set(i,'select',false);

                    });

                }

                return PropsNodeData;

            },

        },

        watch:{

          NodeData(n){

            let clickLoadTarget = this.loadId.length>0 ?  this.loadId[this.loadId.length-1] : "" ; //获取最后一次点击的节点

            if(n.length>0){

                this.nodeData.push(JSON.parse(JSON.stringify(n)));

                if(clickLoadTarget){

                  this.nodeData[clickLoadTarget.level-1].forEach((i,v) =>{

                    if(i.id == clickLoadTarget.id){

                      i.select = true;

                    }else{

                      i.select = false;

                    }

                  });

                }

              }else{

                for(let node of this.nodeData ){

                  node.forEach((i,v) =>{

                    if(i.id == clickLoadTarget.id){

                      i.isLoadData = false;

                    }

                  });

                }

                this.loadId.splice(-1,1);

              }

          },

        },

        mounted () {

          this.initialize();

        },

        methods: {

          //初始化
          initialize(){

            let PropsNodeData = this.NodeData;

            if(PropsNodeData.length>0) {

              this.nodeData.push(PropsNodeData);

            }

          },
          //监听复选框发生变化的时候
          onCheckboxChange(data){

            console.log(data,'复选框');

            if(data.checked){  //如果选中

                if(data.level ==1){  //如果是一级

                    if(data.select){  //如果展开

                      this.nodeData.forEach((item,index) =>{

                          if(index){

                             for(let node of item){

                               node.checked = true;

                             }

                          }


                      })

                    }

                }else{

                  if(data.select){  //如果展开

                    this.nodeData.forEach((item,index) =>{

                      if(index > data.level-1){

                        for(let node of item){

                          node.checked = true;

                          node.indeterminate = null;

                        }

                      }else if(index<data.level-1){

                          if(data.level!=2){

                            for(let node of item){

                              if(node.select){

                                node.checked = false;

                                node.indeterminate = true;

                              }

                            }

                          }else{

                            for(let node of item){

                              if(node.select){

                                node.checked = true;

                                node.indeterminate = null;

                              }

                            }

                          }

                      }

                    })

                  }else{

                    this.nodeData.forEach((item,index) =>{

                      if(index<data.level-1){

                        if(data.level!=2){

                          for(let node of item){

                            if(node.select){

                              node.checked = false;

                              node.indeterminate = true;

                            }

                          }

                        }else{

                          for(let node of item){

                            if(node.select){

                              node.checked = false;

                              node.indeterminate = true;

                            }

                          }

                        }

                      }

                    })

                  }

                }

            }else{

              if(data.level ==1){  //如果是一级

                if(data.select){  //如果展开

                  this.nodeData.forEach((item,index) =>{

                    if(index){

                      for(let node of item){

                        node.checked = false;

                      }

                    }


                  })

                }

              }else{

                if(data.select){  //如果展开

                  this.nodeData.forEach((item,index) =>{

                    if(index > data.level-1){

                      for(let node of item){

                        node.checked = false;

                        node.indeterminate = null;

                      }

                    }else if(index<data.level-1){

                      if(data.level!=2){

                        for(let node of item){

                          if(node.select){

                            node.checked = false;

                            node.indeterminate = null;

                          }

                        }

                      }else{

                          console.log("我走了这里")

                        for(let node of item){

                          if(node.select){

                            node.checked = false;

                            node.indeterminate = null;

                          }

                        }

                      }

                    }

                  })

                }else{

                  this.nodeData.forEach((item,index) =>{

                    if(index<data.level-1){

                      if(data.level!=2){

                        for(let node of item){

                          if(node.select){

                            node.checked = false;

                            node.indeterminate = null;

                          }

                        }

                      }else{

                        for(let node of item){

                          if(node.select){

                            node.checked = false;

                            node.indeterminate = null;

                          }

                        }

                      }

                    }

                  })

                }

              }

            }

            this.recordUncheckedfn(this.uncheckedAry,data.checked,data);

            this.ChangeNodeDataState(this.nodeData)

          },
          //点击树节点时触发
          onClickNode(data){

            console.log(data,'树节点');

            this.keyword = "self";

            console.log(this.nodeData,'this.nodeData');

            let parentNodeAndSelfNode = this.getParentAndSelfNode(this.nodeData);

            parentNodeAndSelfNode.push(data);

            console.log(parentNodeAndSelfNode,'this.nodeData');

          },
          //点击下拉按钮时触发
          onSelectChange(data){

            console.log(data,'下拉按钮');

            this.keyword = "select";

            this.loadId = this.editloadData(this.loadId,data);

            this.loadId.push(data);

            this.editrenderData(this.keyword);

            this.$Spin.show();

            this.$emit('on-select-change',data);

          },
          //PageNo发生改变的时候
          onPageNoChange(obj){

            console.log(obj,'分页');

            this.keyword = "page";

            this.editrenderData(this.keyword,obj);

            this.$Spin.show();

            this.$emit('on-pageNo-change',obj);

          },
          //改变全选与半选
          ChangeNodeDataState(n){

            if(n.length>0){

              for(let node = n.length-1; node>=0; node-- ){

                if(node>0){

                  let flag = false;

                  let t = 0;

                  n[node].forEach((i,v) =>{

                    if(i.checked){

                      flag = true;

                      t++;

                    }

                  });

                  n[node-1].forEach((i,v) =>{

                    this.loadId.forEach((k,y) =>{

                      if(i.id == k.id){

                        console.log(flag,t,'999999999999999999999999999999')

                        if(flag && t == n[node].length) {

                          i.indeterminate = null;

                          i.checked = true;

                        }else if(t>0){

                          i.indeterminate = true;

                          i.checked = false;

                        }

                      }

                    })

                  })

                }

              }

            }

          },
          //设置全部选中
          setChangeAry_null(){

            this.nodeData.forEach((k,y) =>{

              for(let node of k){

                node.checked = false;

              }

            });

            this.checkedAry = [];

          },
          //设置选中的数组
          setCheckedAry(Ary,type){

            let Type = type ? type : null;

            if(!Ary && typeof Ary != "Array") return ;

            if(!Type) return;

            console.log(Ary,Type,'888888888888888888888888888888888888888');

              Ary.forEach((i,v) =>{

                this.nodeData.forEach((k,y) =>{

                  for(let node of k){

                    if(node.id == i.id){

                      let flag = true;

                      let n = null;

                      for(let t = 0;t<this.checkedAry.length;t++){

                          if(this.checkedAry[t].id == i.id){

                            flag = false;

                            n = t

                          }

                      }

                      if(flag){

                        this.checkedAry.push(node);

                      }else{

                        this.checkedAry.splice(n,1);

                      }

                    }

                  }

                })

              });

            console.log(this.checkedAry,'this.checkedArythis.checkedArythis.checkedArythis.checkedArythis.checkedAry')

          },
          //获取所有选中的方法
          getChangeAry(){

            let newAry = [];

            this.nodeData.forEach((k,y) =>{

                for(let node of k){

                    if(node.checked){

                      newAry.push(node);

                    }

                }

            });


            return newAry

          },
          //改变loadData数据
          editloadData(newAry,data){

            let Ary = [];

            newAry.forEach((i,v) =>{

                if(i.level < data.level){

                  Ary.push(i);

                }

            });

            return Ary;

          },
          //改变渲染数据
          editrenderData(keyword,pageObj){

            if(!keyword) return;

            if(keyword == "select"){

              console.log("select");

              let clickLoadTarget = this.loadId.length>0 ?  this.loadId[this.loadId.length-1] : "" ; //获取最后一次点击的节点

              if(clickLoadTarget.level < this.nodeData.length ){

                this.nodeData.splice(clickLoadTarget.level,this.nodeData.length-clickLoadTarget.level);

              }

            }else if(keyword == "page"){

              console.log("page")

              this.loadId.splice(pageObj.subscript,this.loadId.length-pageObj.subscript);

              this.nodeData.splice(pageObj.subscript,this.nodeData.length-pageObj.subscript);

            }

          },
          //getParentAndSelfNode
          getParentAndSelfNode(AryNode){

            let NewAry = [];

            AryNode.forEach((item,index) =>{

                for(let node of item){

                    if(node.select){

                      NewAry.push(node);

                    }

                }

            })

            return NewAry

          },
          //记录未选中的方法
          recordUncheckedfn(UncheckedAry,flag,data){

              if(flag){

                let flag = true;

                UncheckedAry.forEach((i,v) =>{

                    if(id.id == data.id){

                        flag = false;

                    }

                });

                if(flag){

                  UncheckedAry.push(data);

                }

              }else{

                let t = null;

                UncheckedAry.forEach((i,v) =>{

                  if(id.id == data.id){

                    t = v;

                  }

                });

                if(t!=null){

                  UncheckedAry.splice(t,1);

                }

              }

              console.log(UncheckedAry,'UncheckedAryUncheckedAryUncheckedAryUncheckedAry');

          }

        }

    }

</script>

<style scoped lang="scss">

.CbimTree{

  overflow: hidden;

  position: relative;

  .TreeNode{

    position: absolute;

  }

}
</style>
