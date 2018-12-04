<!--
 -  2018/10/19  lize
 -->
<template>
    <div>
      <select style="width: 100px;" name="" id=""  v-model="val1">
        <option v-for="(item,index) in arr" :value = "item.id" value="">{{item.name}}</option>
      </select>
    </div>
</template>

<script>
    export default {
        data () {
            return {

                arr:[],

                readyName:'',

                val1:0,

                mas:{"status":200,"msg":"系统正常","data":{"moneytype":{"1":"供热费","2":"分户计量费","3":"运行基础费","4":"蒸汽计量费","5":"滞纳金","6":"预收费"},"paymentchannel":{"0":"全部","1":"公众号","2":"APP","3":"大厅","4":"物业"},"usertype":{"1":"住宅","2":"门市","3":"公企"},"audittype":{"0":"房屋面积变更审核","1":"房屋供暖状态审核","2":"房屋费用减免审核","3":"房屋类型变更审核","4":"批量收费审核","5":"退费审核"},"invoiceState":{"1":"已开发票","2":"未开收据","3":"已开收据"},"fromtype":{"1":"手机app","2":"微信公众号","3":"大厅端","4":"触摸屏","5":"银行代收","6":"物业代收"},"taxratio":{"0.1":"2018","0.11":"2017"},"hotstatus":{"1":"用热","2":"拆网","3":"锁闭"},"moneyway":{"1":"微信公众号","2":"支付宝","3":"银联","4":"POS","6":"现金支付","51":"微信扫码","52":"支付宝扫码"}}}

            }
        },
        mounted () {

          this.readyName = this.$props.masg;

          this.arr = this.getSelectValue(this.readyName)

        },
        watch:{

            val1(n){

                console.log(n);

                this.$emit('ddd',n);

            }

        },
        props:['masg'],
        methods: {
            getSelectValue(name){

                let newStr = name;

                let newAry = [];

                if(newStr){

                    if(this.mas.status == 200){

                        let asd = this.mas.data[newStr];

                        for(let i in asd){

                            let obj = {

                                id:i,

                                name:asd[i]

                            };

                          newAry.push(obj)

                        }

                    }

                }

                console.log(newAry);

                return newAry;

            },

        }
    }
</script>

<style scoped lang="scss">

</style>
