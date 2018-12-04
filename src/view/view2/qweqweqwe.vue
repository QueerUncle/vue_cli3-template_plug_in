<template>
  <Tabs :value="TabPaneValue" class="preparesTree">
    <TabPane label="同步内容" name="Sync">
      <div class="tree">
        <Tree :data="SyncData" ref="SyncTree" :render="renderContent"></Tree>
      </div>
    </TabPane>
    <TabPane label="专题内容" name="Thematic">
      <div class="tree">
        <Tree :data="ThematicData" ref="ThematicTree" :render="renderContent" class="Thematic"></Tree>
        <!-- <Tree :data="ThematicData" @on-select-change="OnSelectChange" ref="ThematicTree"></Tree> -->
      </div>
    </TabPane>
  </Tabs>
</template>

<script type="text/ecmascript-6">
  import { Tabs, TabPane, Tree } from "iView";

  export default {
    name: "PreparesTree",
    data() {
      return {
        SelectClass: "ivu-tree-title ivu-tree-title-selected",
        DefineClass: "ivu-tree-title"
      };
    },
    props: ["SyncData", "ThematicData", "TabPaneValue"],
    components: {
      Tabs: Tabs,
      TabPane: TabPane,
      Tree: Tree
    },
    methods: {
      OnSelectChange(data) {
        // let choicesAll = this.$refs.SyncTree.getCheckedNodes; //方法的运用 getSelectedNodes也是如此用法
        // let getSelectedNodes = this.$refs.SyncTree.getSelectedNodes; //方法的运用 getSelectedNodes也是如此用法

        // console.log(choicesAll);
        // console.log(getSelectedNodes);
        // console.log(data);
        // if(data[0].children){
        //   data[0].selected = false;
        //   data[0].expand = !data[0].expand;
        //   return;
        // }
        this.$emit("OnSelectChange", data);
      },
      renderContent(h, { root, node, data }) {
        if (node.node.PrepareTag) {
          if(node.node.IsSelect) {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%"
                },
                on: {
                  click: () => {
                    this.OnSelect(node);
                    // this.$emit("OnSelectChange", node);
                  }
                }
              },
              [
                h(
                  "span",
                  {
                    class: ["ivu-tree-title", "ivu-tree-title-selected"],
                    on: {
                      click: event => {
                        var dom = document.getElementsByClassName(
                          "ivu-tree-title-selected"
                        );
                        dom[0].className = this.DefineClass;
                        if(event.target.className == 'ivu-tree-title'){
                          event.target.className = this.SelectClass;
                        }else{
                          event.target.parentNode.className = this.SelectClass;
                        }
                      }
                    }
                  },
                  [
                    h(
                      "span",
                      {
                        style: {
                          marginRight: "4px"
                        }
                      },
                      data.title
                    ),
                    h("img", {
                      attrs: {
                        src: "/static/images/bc_tag.png"
                      },
                      style: {
                        position: 'relative',
                        top: '-1px'
                      }
                    })
                  ]
                )
              ]
            );
          }else{
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%"
                },
                on: {
                  click: () => {
                    this.OnSelect(node);
                    // this.$emit("OnSelectChange", node);
                  }
                }
              },
              [
                h(
                  "span",
                  {
                    class: ["ivu-tree-title"],
                    on: {
                      click: event => {
                        var dom = document.getElementsByClassName(
                          "ivu-tree-title-selected"
                        );
                        dom[0].className = this.DefineClass;
                        if(event.target.className == 'ivu-tree-title'){
                          event.target.className = this.SelectClass;
                        }else{
                          event.target.parentNode.className = this.SelectClass;
                        }
                      }
                    }
                  },
                  [
                    h(
                      "span",
                      {
                        style: {
                          marginRight: "4px"
                        }
                      },
                      data.title
                    ),
                    h("img", {
                      attrs: {
                        src: "/static/images/bc_tag.png"
                      },
                      style: {
                        position: 'relative',
                        top: '-1px'
                      }
                    })
                  ]
                )
              ]
            );
          }
        }else if(node.node.IsSelect) {
          return h(
            "span",
            {
              style: {
                display: "inline-block",
                width: "100%"
              },
              on: {
                click: () => {
                  this.OnSelect(node);
                  // this.$emit("OnSelectChange", node);
                }
              }
            },
            [
              h(
                "span",
                {
                  class: ["ivu-tree-title", "ivu-tree-title-selected"],
                  on: {
                    click: event => {
                      var dom = document.getElementsByClassName(
                        "ivu-tree-title-selected"
                      );
                      dom[0].className = this.DefineClass;
                      if(event.target.className == 'ivu-tree-title'){
                        event.target.className = this.SelectClass;
                      }else{
                        event.target.parentNode.className = this.SelectClass;
                      }
                    }
                  }
                },
                [
                  h(
                    "span",
                    {
                      style: {
                        marginRight: "4px"
                      }
                    },
                    data.title
                  )
                ]
              )
            ]
          );
        }else {
          return h(
            "span",
            {
              style: {
                display: "inline-block",
                width: "100%"
              },
              on: {
                click: () => {
                  this.OnSelect(node);
                  // this.$emit("OnSelectChange", node);
                }
              }
            },
            [
              h(
                "span",
                {
                  class: ["ivu-tree-title"],
                  on: {
                    click: () => {
                      var dom = document.getElementsByClassName(
                        "ivu-tree-title-selected"
                      );
                      dom[0].className = this.DefineClass;
                      if(event.target.className == 'ivu-tree-title'){
                        event.target.className = this.SelectClass;
                      }else{
                        event.target.parentNode.className = this.SelectClass;
                      }
                    }
                  }
                },
                [h("span", data.title)]
              )
            ]
          );
        }
      },
      OnSelect(data) {
        this.$emit("OnSelectChange", data);
      }
    },
    mounted() {}
  };
</script>

<style lang="scss" scoped="" type="text/css">
  .preparesTree {
    float: left;
    margin-left: 24px;
    height: 440px;
    width: 222px;
    border: 1px solid #e8e8e8;
  .tree {
    width: 222px;
    height: 400px;
    padding: 10px 34px 0 14px;
  // border: 1px solid #e8e8e8;
    border-top: 0px;
    overflow: auto;
  }
  }
  .user-defined-tree {
    background-color: #333;
  }
</style>
