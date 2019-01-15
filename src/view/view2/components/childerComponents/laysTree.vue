<!--
 -  2018/12/27  lize
 -->
<template>
  <div>
    <el-tree
      :props="props"
      :load="loadNode"
      lazy
      show-checkbox
      @check-change="handleCheckChange">
    </el-tree>
  </div>
</template>

<script>
    export default {
        data () {
            return {
              props: {
                label: 'name',
                children: 'zones'
              },
              count: 1,
              data:{

                  count:28,
                  pageSize:10,
                  pageNo:1,
                  arr:[
                    {name:0},
                    {name:1},
                    {name:2},
                    {name:3},
                    {name:4},
                    {name:5},
                    {name:6},
                    {name:7},
                    {name:8},
                    {name:9},
                  ]

              }
            }
        },
        mounted () {

        },
        methods: {

          handleCheckChange(data, checked, indeterminate) {

            console.log(data, checked, indeterminate);

          },

          handleNodeClick(data) {

            console.log(data,'11111111111');

          },
          loadNode(node, resolve) {

            if (node.level === 0) {

              return resolve([{ name: 'region1' }, { name: 'region2' }]);

            }

            if (node.level > 3) return resolve([]);

            var hasChild;

            if (node.data.name === 'region1') {

              hasChild = true;

            } else if (node.data.name === 'region2') {

              hasChild = false;

            } else {

              hasChild = Math.random() > 0.5;

              console.log(root,node,hasChild)

            }

            setTimeout(() => {

              var data;

              if (hasChild) {

                data = [{

                  name: 'zone' + this.count++


                }, {
                  name: 'zone' + this.count++

                }];

              } else {

                data = [];

              }

              resolve(data);

            }, 500);

          }

        }
    }
</script>

<style scoped lang="scss">

</style>
