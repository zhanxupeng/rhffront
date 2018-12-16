<style scoped>
  .layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
<template>
  <div class="layout">
    <Layout :style="{height: '100vh'}">
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <img v-show="!isCollapsed" :src="logoSrc" alt width="100%" height="50">
        <Menu active-name="1-2" :open-names="['1']" theme="dark" width="auto" :class="menuitemClasses" @on-select="selectMenu">
          <template v-for="item in menuList">
            <submenu-system :item="item"></submenu-system>
          </template>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
        </Header>

        <div style="margin:20px 20px 0 20px">
          <!-- <Tabs type="card" @on-tab-remove="handleTabRemove" @on-click="jumpTo" v-model="tabsName">
            <TabPane key="index" name="/views/index" label="首页" ref="indexTab"></TabPane>
            <TabPane closable v-for="item in menuLists" :key="item.id" :name="item.url" :label="item.name"></TabPane>
          </Tabs>-->
          <Tabs type="card" closable @on-tab-remove="handleTabRemove" v-model="currentTab">
            <TabPane key="default" name="/views/index" label="首页" />
            <template v-for="item in tabList">
              <TabPane :label="item.label" :name="item.name" :key="item.name"/>
            </template>
          </Tabs>
        </div>
        <Content :style="{margin: '0 20px 20px 20px', background: '#fff', minHeight: '260px'}">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  import logoimg from "./../assets/img/logo.png";
  export default {
    data() {
      return {
        isCollapsed: false,
        logoSrc: logoimg,
        menuList: [{
            subMenuName: "1",
            subMenuTitle: "系统设置",
            type: "ios-filing",
            itemList: [{
                name: "/views/system/user",
                label: "用户"
              },
              {
                name: "/views/system/role",
                label: "角色"
              },
              {
                name: "/views/system/menu",
                label: "菜单"
              }
            ],
            children: null
          },
          {
            subMenuName: "2",
            subMenuTitle: "基础资料",
            type: "ios-filing",
            itemList: [{
              name: "/views/system/calendar",
              label: "日历"
            }],
            children: null
          },
          {
            subMenuName: "3",
            subMenuTitle:"交易查询",
            type:"ios-filing",
            itemList:[{
              name:"/views/transaction/sellproduct",
              label:"销售产品"
            }],
            children:null
          }
        ],
        tabList: [],
        currentTab: "/views/index",
        mainTab:"/views/index"
      };
    },
    mounted() {
      this.$router.push({
        name: "main"
      });
    },
    watch: {
      currentTab(val) {
        console.log("currentTab")
        console.log(val)
        if(val === this.mainTab){
          this.$router.push({
            path:val
          })
          return;
        }
        
        this.$root.$data.menuTitle = this.getMenuPrefix(val)
        this.$router.push({
          path: val
        })
      }
    },
    computed: {
      rotateIcon() {
        return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
      },
      menuitemClasses() {
        return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
      }
    },
    methods: {
      getMenuPrefix(name){
        let current=this.tabList.filter(x => x.name === name)
        return current[0].label
      },
      collapsedSider() {
        this.$refs.side1.toggleCollapse();
      },
      handleTabRemove(name) {
        let removeIndex = -1
        for (let i = 0; i < this.tabList.length; i++) {
          if (this.tabList[i].name === name) {
            removeIndex = i
          }
        }
        if (removeIndex !== -1) {
          this.tabList.splice(removeIndex, 1)
        }
        console.log(this.tabList)
      },
      selectMenu(name) {
        console.log(name)
        console.log("当前的菜单")
        console.log(this.tabList)
        let filterList = this.tabList.filter(x => x.name === name)
        if (filterList.length === 0) {
          let label = this.getLabelByName(this.menuList,name)
          this.tabList.push({
            label: label,
            name: name
          })
        }
        this.currentTab = name
      },
      getLabelByName(menuList, name) {
        let hit = null
        for (let item of menuList) {
          hit = this.childrenMenu(item, name)
          if (hit !== null) {
            return hit.label
          }
        }
        return hit
      },
      childrenMenu(menu, name) {
        let hit = null
        if(menu === null){
          return hit
        }
        for (let item of menu.itemList) {
          if (item.name === name) {
            hit = item
          }
          if (hit === null) {
            hit = this.childrenMenu(menu.children, name)
          }
        }
        return hit
      }
    }
  };
</script>