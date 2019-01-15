<!--
 -  2018/12/21  lize
 -->
<template>
  <div class = "muse">

    <mu-text-field v-model="value1"></mu-text-field><br/>

    <div ref = "muInput" class="mu-inputs">
      <div class="mu-text-fields mu-input-contents">
        <input tabindex="0" class="mu-text-field-inputs" @focus = "focus()" @blur = "blur">
        <div>
          <div class="mu-input-lines"></div>
          <div ref = "muInputFocusLine" class="mu-input-focus-lines"></div>
        </div>
      </div>
    </div>

    <div class = "iviewDiv">
      <Input v-model="value" placeholder="Enter something..." style="width: 300px" />
    </div>

    <button @click = "btn">点击</button>

  </div>
</template>

<script>
    export default {
        data () {
            return {
              value1:'',

              value:'',
            }
        },
        mounted () {

          console.log(this.$root,this.$parent,this.getMap,'222222222222222222222222222222222');

          console.log(this.$parent.a,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

          console.log(this);

          console.log(this.$fs,'111111111111111111111111111111');

        },
        //父元素制定传给子元素的变量
        inject:['getMap'],

        watch:{

            '$parent.a'(n,o){

                console.log(n)

            },

        },

        methods: {

          //获取焦点
          focus(){

            this.$store.commit('inputAddAndRemoveClass',{this:this,refName:'muInput',className:'mu-input__focus',flag:true});

            this.$store.commit('inputAddAndRemoveClass',{this:this,refName:'muInputFocusLine',className:'focus',flag:true});

//            this.$fs.inputAddAndRemoveClass(this,'muInput','mu-input__focus',true);

//            this.$fs.inputAddAndRemoveClass(this,'muInputFocusLine','focus',true);

//            this.$refs.muInput.classList.add("mu-input__focus");

//            this.$refs.muInputFocusLine.classList.add("focus");

          },
          //失去焦点
          blur(){

            this.$store.commit('inputAddAndRemoveClass',{this:this,refName:'muInput',className:'mu-input__focus',flag:false});

            this.$store.commit('inputAddAndRemoveClass',{this:this,refName:'muInputFocusLine',className:'focus',flag:false});

//            this.$fs.inputAddAndRemoveClass(this,'muInput','mu-input__focus',false);

//            this.$fs.inputAddAndRemoveClass(this,'muInputFocusLine','focus',false);

//            this.$refs.muInput.classList.remove("mu-input__focus");

//            this.$refs.muInputFocusLine.classList.remove("focus");

          },
          btn(){

              this.$parent.a++;

          }

        }
    }
</script>

<style scoped lang="scss">

  .mu-inputs{
    font-size: 16px;
    width: 256px;
    min-height: 48px;
    display: inline-block;
    position: relative;
    color: rgba(0,0,0,.54);
    margin-bottom: 16px;
    padding-bottom: 12px;
    padding-top: 4px;
  }
  .mu-input-contents {
    height: 100%;
    position: relative;
  }
  .mu-text-fields {
    /*display: -webkit-box;*/
    /*display: -ms-flexbox;*/
    /*display: flex;*/
    /*-webkit-box-pack: start;*/
    /*-ms-flex-pack: start;*/
    /*justify-content: flex-start;*/
    /*-webkit-box-align: center;*/
    /*-ms-flex-align: center;*/
    /*align-items: center;*/
    /*width: 100%;*/
  }
  .mu-text-field-inputs{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    border: none;
    background: none;
    border-radius: 0 0 0 0;
    -webkit-box-shadow: none;
    box-shadow: none;
    display: block;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 32px;
    font-style: inherit;
    font-variant: inherit;
    font-weight: inherit;
    font-stretch: inherit;
    font-size: inherit;
    color: rgba(0,0,0,.87);
    font-family: inherit;
    position: relative;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .mu-input-lines {
    margin: 0;
    height: 1px;
    border: none;
    background-color: rgba(0,0,0,.12);
    left: 0;
    right: 0;
    bottom: -1px;
    position: absolute;
  }
  .mu-input-focus-lines{
    /*margin: 0;*/
    height: 2px;
    border: none;
    background-color: currentColor;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    transform: scaleX(0);
    transition: transform .45s cubic-bezier(.23,1,.32,1);

  }
  .mu-input__focus {
    color: #2196f3;
  }
  .focus{

    -webkit-transform: scaleX(1)!important;

    transform: scaleX(1)!important;

  }

  .iviewDiv{

    margin-top: 20px;

  }


</style>
