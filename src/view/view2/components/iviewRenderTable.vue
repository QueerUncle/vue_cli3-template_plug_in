<!--
 -  2019/1/8  lize
 -->
<template>
  <div>

    <Table border :columns="columns7" :data="data6"></Table>

    <pop :flag = flag :data = data @close = "close"></pop>

  </div>
</template>

<script>
    export default {
        data () {
            return {

              flag:false,
              data:null,

              columns7: [
                {
                  title: 'Name',
                  key: 'name',
                  render: (h, params) => {
                    return h('div', [
                      h('Icon', {
                        props: {
                          type: 'person'
                        }
                      }),
                      h('strong', params.row.name)
                    ]);
                  }
                },
                {
                  title: 'Age',
                  key: 'ages',//对应数据中要渲染的字段名称 (没有render,默认匹配数据中的对应key的字段)
//                  render: (h, params) => {
//                    //改变数据渲染的值，例如：默认为ages,现在改为age
//                    return h('span',params.row.age)
//
//                  }

                },
                {
                  title: 'Address',
                  key: 'address'
                },
                {
                  title: 'Action',
                  key: 'action',
                  width: 200,
                  align: 'center',
                  render: (h, params) => {
                    return h('div', [
                      h('Button', {
                        props: {
                          type: 'primary',
                          size: 'small'
                        },
                        style: {
                          marginRight: '5px'
                        },
                        on: {
                          click: () => {
                            this.show(params.index)
                          }
                        }
                      }, 'View'),
                      h('Button', {
                        props: {
                          type: 'error',
                          size: 'small'
                        },
                        on: {
                          click: () => {
                            this.remove(params.index)
                          }
                        }
                      }, 'Delete'),
                      h('Button', {
                        props: {
                          type: 'error',
                          size: 'small'
                        },
                        class:['asd','wsx'],
                        style: {
                          marginLeft: '5px',
                        },
                        on: {
                          click: () => {
                            this.edit(params)
                          }
                        }
                      }, '修改')
                    ]);
                  }
                }
              ],
              data6: [
                {
                  name: 'John Brown',
                  age: 18,
                  ages: 180,
                  address: 'New York No. 1 Lake Park'
                },
                {
                  name: 'Jim Green',
                  age: 24,
                  ages: 240,
                  address: 'London No. 1 Lake Park'
                },
                {
                  name: 'Joe Black',
                  age: 30,
                  ages: 300,
                  address: 'Sydney No. 1 Lake Park'
                },
                {
                  name: 'Jon Snow',
                  age: 26,
                  ages: 260,
                  address: 'Ottawa No. 2 Lake Park'
                }
              ],
              count:0
            }
        },
        components:{

            pop: () => import('./childerComponents/Pop.vue')

        },
        mounted () {

        },
        methods: {

          show (index) {

            this.$Modal.info({

              title: 'User Info',

              content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`

            })

          },
          remove (index) {

            this.data6.splice(index, 1);

          },
          test(params){

            console.log(params);

            let obj = {

                name: 'Joe Black'+this.count,

                age: this.count++,

                ages: this.count++,

                address: 'Sydney No. 1 Lake Park'+this.count

              };

            this.data6.splice(params.index+1,0,obj);

            this.count++;

          },

          edit(params){

              this.data = params;

              this.flag = true;

          },
          close(t,p,d){


              if(t){

                p.row.name = d;

              }

              this.flag = false;

          }

        }
    }
</script>

<style scoped lang="scss">

/deep/ .asd{
  font-size: 20px!important;
  &:hover{
    color:#0000cc!important;
  }
}



</style>
