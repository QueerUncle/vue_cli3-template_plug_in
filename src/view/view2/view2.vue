<!--
 -  2018/10/17  lize
 -->
<template>
  <div>
    <h1>ivew2</h1>
    <a href="index.html">index</a>
    &nbsp;
    &nbsp;
    &nbsp;
    &nbsp;
    <a href="ccc.html">ccc</a>
    &nbsp;
    &nbsp;
    &nbsp;
    &nbsp;
    <a href="view1.html">view1</a>

    <Tree :data="data5" :render="renderContent" ref = "threeTwo" @on-select-change = "onSelectChangeTwo"></Tree>

    <Tree :data="data1" ref = "treeOne" @on-select-change = "onSelectChange"></Tree>

  </div>

  </template>

<script>
    export default {
        data () {
            return {

              data5: [
                {
                  title: 'parent 1',
                  expand: true,
                  render: (h, { root, node, data }) => {
                    return h('span', {
                      style: {
                        display: 'inline-block',
                        width: '100%'
                      }
                    }, [
                      h('span', [
                        h('Icon', {
                          props: {
                            type: 'ios-folder-outline'
                          },
                          style: {
                            marginRight: '8px'
                          }
                        }),
                        h('span',{

                          style:{

                            cursor:'pointer',

                          },

                          on:{

                            click:() =>{

                              console.log('asdasdasd')





                            }

                          }

                        }, data.title)
                      ]),
                      h('span', {
                        style: {
                          display: 'inline-block',
                          float: 'right',
                          marginRight: '32px'
                        }
                      }, [
                        h('Button', {
                          props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-add',
                            type: 'primary'
                          }),
                          style: {
                            width: '64px'
                          },
                          on: {
                            click: () => { this.append(data) }
                          }
                        })
                      ])
                    ]);
                  },
                  children: [
                    {
                      title: 'child 1-1',
                      expand: true,
                      children: [
                        {
                          title: 'leaf 1-1-1',
                          expand: true
                        },
                        {
                          title: 'leaf 1-1-2',
                          expand: true
                        }
                      ]
                    },
                    {
                      title: 'child 1-2',
                      expand: true,
                      children: [
                        {
                          title: 'leaf 1-2-1',
                          expand: true,
                          children:[

                            {
                              title:'leaf 1-2-1-1',
                              expand: true,
                            }

                          ]
                        },
                        {
                          title: 'leaf 1-2-2',
                          expand: true,
                          children:[

                            {
                              title:'leaf 1-2-2-1',
                              expand: true,
                            }

                          ]
                        }
                      ]
                    }
                  ]
                }
              ],
              buttonProps: {
                type: 'default',
                size: 'small',
              },
              data1: [
                {
                  title: 'parent 1',
                  expand: true,
                  children: [
                    {
                      title: 'parent 1-1',
                      expand: true,
                      children: [
                        {
                          title: 'leaf 1-1-1'
                        },
                        {
                          title: 'leaf 1-1-2'
                        }
                      ]
                    },
                    {
                      title: 'parent 1-2',
                      expand: true,
                      children: [
                        {
                          title: 'leaf 1-2-1'
                        },
                        {
                          title: 'leaf 1-2-1'
                        }
                      ]
                    }
                  ]
                }
              ]

            }
        },
        mounted () {

        },
        methods: {
          renderContent (h, { root, node, data }) {
            return h('span', {
              style: {
                display: 'inline-block',
                width: '100%'
              }
            }, [
              h('span', [
                h('Icon', {
                  props: {
                    type: 'ios-paper-outline'
                  },
                  style: {
                    marginRight: '8px'
                  }
                }),
                h('span', {

                  style:{

                    cursor:'pointer',

                  },

                  on:{

                    click:() => {

                     let asd = this.queryAllParent(root,node,[]);

                     console.log(asd)

                    }

                  }


                },data.title)
              ]),
              h('span', {
                style: {
                  display: 'inline-block',
                  float: 'right',
                  marginRight: '32px'
                }
              }, [
                h('Button', {
                  props: Object.assign({}, this.buttonProps, {
                    icon: 'ios-add'
                  }),
                  style: {
                    marginRight: '8px'
                  },
                  on: {
                    click: () => { this.append(data) }
                  }
                }),
                h('Button', {
                  props: Object.assign({}, this.buttonProps, {
                    icon: 'ios-remove'
                  }),
                  on: {
                    click: () => { this.remove(root, node, data) }
                  }
                })
              ])
            ]);
          },
          append (data) {
            const children = data.children || [];
            children.push({
              title: 'appended node',
              expand: true
            });
            this.$set(data, 'children', children);
          },
          remove (root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
          },
          onCheckChange(data){

            console.log(data);  //当复选框选中时则会打印出选中的内容

            let choicesAll=this.$refs.treeOne.getCheckedNodes; //方法的运用 getSelectedNodes也是如此用法

            console.log(choicesAll);

          },
          onSelectChange(data){

            console.log(data)

            let asd = this.$refs.treeOne.getSelectedNodes();

            console.log(asd,'asdasdasd')

          },
          onSelectChangeTwo(data){

            console.log(data,'我是自定义的data')

          },
          zxcv(root,node,arr){

              for(let i = 0; i<root.length;i++){

                if(root.nodeKey == node.parent){

                  arr.push(root[i]);

                  return arr;

                }

                if(root[i].parent!=undefined){

                  arr.push(root[root[i].parent])

                }

              }

              return arr;

          },
          //获取自己及自己的所有父元素。
          queryAllParent(root,node,arr){

            let target = root[node.nodeKey];

            let parent = root[node.parent];

            arr.push(target);

            if(parent.parent != undefined){

              return this.queryAllParent(root,parent,arr)

            }else{

              arr.push(root[0]);

              return arr;

            }

          }
        }
    }
</script>

<style scoped lang="scss">

</style>
