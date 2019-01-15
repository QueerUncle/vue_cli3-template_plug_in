<!--
 -  2018/12/13  lize
 -->
<template>

    <div class = "contentLeft" style = 'width: 172px'>

      <Layout>

        <Sider width="172" ref="side1" hide-trigger collapsible :collapsed-width="48" v-model="isCollapsed">
          <Menu active-name="1-2" theme="dark" width="172" :class="menuitemClasses">
            <MenuItem name="1-1" @click.native="collapsedSider">
              <Icon  type="ios-navigate"></Icon>
              <span>Option 1</span>
            </MenuItem>
            <MenuItem name="1-2" @click.native="collapsedSider">
              <Icon   type="ios-search"></Icon>
              <span>Option 2</span>
            </MenuItem>
            <MenuItem name="1-3" @click.native="collapsedSider">
              <Icon  type="ios-settings"></Icon>
              <span>Option 3</span>
            </MenuItem>
          </Menu>
        </Sider>
      </Layout>






      <!--<div v-for="(item,index_first) in MenuData" class = "classChunk"  @click = "transformModality(index_first)">-->

      <!--<div class = "firstMenu" :class = "{firstActive : isCollapsed,active:index_first == active}">-->

      <!--<Icon color = "white" type="logo-windows" />-->

      <!--</div>-->

      <!--<div v-if = " isCollapsed && index_first == showMenu" class = "secondLevel" :class = "{secondActive:isCollapsed}">-->

      <!--<div class = "firstTitle" style="font-size: 14px;">-->

      <!--<span>{{item.name}}</span>-->

      <!--<Icon v-if = "isCollapsed" style = "margin:0 10px" @click.native="collapsedSider" class = "rotateIcon" type="md-menu" size="20"></Icon>-->

      <!--</div>-->

      <!--&lt;!&ndash;<ul>&ndash;&gt;-->

      <!--&lt;!&ndash;<li v-for="(i,index_second) in item.children">&ndash;&gt;-->

      <!--&lt;!&ndash;<span>{{i.name}}</span>&ndash;&gt;-->

      <!--&lt;!&ndash;&lt;!&ndash;<i></i>&ndash;&gt;&ndash;&gt;-->

      <!--&lt;!&ndash;<Icon type="ios-arrow-forward" />&ndash;&gt;-->

      <!--&lt;!&ndash;</li>&ndash;&gt;-->

      <!--&lt;!&ndash;</ul>&ndash;&gt;-->

      <!--</div>-->

      <!--<div v-if = "!isCollapsed" class = "secondLevel">-->

      <!--<div class = "firstTitle" style="font-size: 14px;">-->

      <!--<span>{{item.name}}</span>-->

      <!--</div>-->

      <!--</div>-->

      <!--</div>-->

    </div>

</template>

<script>
    export default {
        data() {
            return {

              isCollapsed:false
            }
        },
        computed: {
          rotateIcon () {
            return [
              'menu-icon',
              this.isCollapsed ? 'rotate-icon' : ''
            ];
          },
          menuitemClasses: function () {
            return [
              'menu-item',
              this.isCollapsed ? 'collapsed-menu' : ''
            ]
          }
       },
        mounted() {

        },
        methods: {

          collapsedSider () {

            console.log(1111111111)
            this.$refs.side1.toggleCollapse();
          }
        }
    }
</script>

<style scoped lang="scss">
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .menu-icon{
    transition: all .3s;
  }
  .rotate-icon{
    transform: rotate(-90deg);
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .ivu-menu-vertical .ivu-menu-item{
    padding: 14px  0px 14px 42px;
    height: 44px;
  }
  .collapsed-menu .ivu-menu-item{
    padding: 14px  0px 14px 6px!important;
    height: 44px;
  }

</style>
