<!--
 -  2018/12/25  lize
 -->
<template>
  <div class="block">
    <p>使用 render-content</p>
    <el-tree
      :data="data4"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :load="loadNode1"
      :render-content="renderContent">
    </el-tree>
    <div style = "margin-top: 30px;">
      <lays-tree></lays-tree>
    </div>
  </div>
</template>

<script>
  let id = 1000;

    export default {
        data () {
            const data = [{
              id: 1,
              label: '一级 1',
              isLeaf: 'leaf',
              children: [{
                id: 4,
                label: '二级 1-1',
                isLeaf: 'leaf',
                children: [{
                  id: 9,
                  label: '三级 1-1-1',
                  isLeaf: 'leaf',
                }, {
                  id: 10,
                  label: '三级 1-1-2',
                  isLeaf: 'leaf',
                }]
              }]
            }, {
              id: 2,
              label: '一级 2',
              isLeaf: 'leaf',
              children: [{
                id: 5,
                label: '二级 2-1',
                isLeaf: 'leaf',
              }, {
                id: 6,
                label: '二级 2-2',
                isLeaf: 'leaf',
              }]
            }, {
              id: 3,
              label: '一级 3',
              isLeaf: 'leaf',
              children: [{
                id: 7,
                label: '二级 3-1',
                isLeaf: 'leaf',
              }, {
                id: 8,
                label: '二级 3-2',
                isLeaf: 'leaf',
              }]
            }];
            return {

              data4: JSON.parse(JSON.stringify(data))
            }
        },
        mounted () {

        },
        components:{

             laysTree: () => import('./childerComponents/laysTree')


        },
        methods: {
          loadNode1(node, resolve){

            if (node.level === 0) {
              return resolve([{ name: 'region' }]);
            }
            if (node.level > 1) return resolve([]);

            setTimeout(() => {
                const data = [{
                  name: 'leaf',
                  leaf: true
                }, {
                  name: 'zone'
                }];
              resolve(data);
            }, 500);

          },
          append(node,data,store) {

            const newChild = { id: id++, label: 'testtest', children: [] };

            if (!data.children) {

              this.$set(data, 'children', []);

            }

            data.children.push(newChild);

          },

          remove(node, data) {

            const parent = node.parent;

            const children = parent.data.children || parent.data;

            const index = children.findIndex(d => d.id === data.id);

            children.splice(index, 1);

          },

          renderContent(h, { node, data, store }) {

            console.log(node,data,store)

            return (

              <span class="custom-tree-node">

              <span>{node.label}</span>

            <span>

            <el-button size="mini" type="text" on-click={ () => this.append(node,data,store) }>Append</el-button>

            <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>

            </span>

            </span>);

          }

        }

    }
</script>

<style scoped lang="scss">
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
