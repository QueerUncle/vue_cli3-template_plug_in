<!--
 -  2019/1/10  lize
 -->
<template>
  <div>
    <div style="overflow: hidden;margin-bottom: 40px;">
      <ul style="overflow: hidden">
        <li style="height: 40px;line-height: 40px" v-for="(i,index) in checkedList">
          <span>{{i.name}}</span>
          <span>{{i.list | edc}}</span>
          <span  @click = "asdasdasd(i,index)" style="margin-left:8px;cursor: pointer ">X</span>
        </li>
      </ul>
      <p v-if="checkedList.length>0" @click = "clear" style="cursor: pointer">清除筛选</p>
    </div>
    <div v-for="(i,index) in arr" style="overflow: hidden">
      <div style="float:left;">{{i.name}}</div>
      <div style="float: left" v-for="(k,p) in i.list">
          <Checkbox @on-change="checkAllGroupChange" v-model="k.checked">{{k.name}}</Checkbox>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {

              arr:[

                  {
                      name:'1',
                      list:[
                        {
                            name:"1-1",
                            checked:false,
                        },
                        {
                          name:"1-2",
                          checked:false,

                        },
                        {
                          name:"1-3",
                          checked:false,

                        },
                        {
                          name:"1-4",
                          checked:false,

                        },

                      ]
                  },
                  {
                    name:'2',
                    list:[
                      {
                        name:"2-1",
                        checked:false,
                      },
                      {
                        name:"2-2",
                        checked:false,
                      },
                      {
                        name:"2-3",
                        checked:false,
                      },
                      {
                        name:"2-4",
                        checked:false,
                      },

                    ]
                  },
                  {
                    name:'3',
                    list:[
                      {
                        name:"3-1",
                        checked:false,
                      },
                      {
                        name:"3-2",
                        checked:false,
                      },
                      {
                        name:"3-3",
                        checked:false,
                      },
                      {
                        name:"3-4",
                        checked:false,
                      },

                    ]
                  },
                  {
                    name:'4',
                    list:[
                      {
                        name:"4-1",
                        checked:false,
                      },
                      {
                        name:"4-2",
                        checked:false,
                      },
                      {
                        name:"4-3",
                        checked:false,
                      },
                      {
                        name:"4-4",
                        checked:false,
                      },

                    ]
                  },
                  {
                    name:'5',
                    list:[
                      {
                        name:"5-1",
                        checked:false,
                      },
                      {
                        name:"5-2",
                        checked:false,
                      },
                      {
                        name:"5-3",
                        checked:false,
                      },
                      {
                        name:"5-4",
                        checked:false,
                      },

                    ]
                  },

                ],

              checkedList:[],

            }
        },
        filters:{

          edc(ary){

            let str = null;

            for(let j of ary){

              if(j!=ary.length-1){

                str+=`${j.name},`


              }else{

                str+=j.name


              }


            }

            return str;

          },

        },
        methods: {
          checkAllGroupChange(){

            let data = JSON.parse(JSON.stringify(this.arr));

            data.forEach((i,v) =>{

              let edc  = i.list.filter( item => item.checked);

              i.list = edc;

            });

            this.checkedList = data.filter(item => item.list.length>0);

          },
          asdasdasd(data,index){

            this.arr.forEach((i,v) =>{

                if(i.name == data.name){

                  i.list.forEach((p,l) =>{

                      p.checked = false;

                  })


                }

            });

            this.checkedList.splice(index,1);

          },
          clear(){

            this.arr.forEach((i,v) =>{

                i.list.forEach((k,y) =>{

                    k.checked = false;

                })

            });

            this.checkedList = [];

          }

        }

    }
</script>

<style scoped lang="scss">

</style>
