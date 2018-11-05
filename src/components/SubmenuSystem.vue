<template>
  <Submenu :name="item.subMenuName">

    <template slot="title">
      <Icon type="ios-filing" v-if="item.type"/>
      {{item.subMenuTitle}}
    </template>
    <template v-for="menuItem in item.itemList">
      <MenuItem :name="menuItem.name">{{menuItem.label}} </MenuItem>
    </template>
    <template v-if="item.children !== undefined && item.children !== null">
      <submenu-system :item="item.children"></submenu-system>
    </template>

  </Submenu>
</template>
<script>
  export default {
      name:'SubmenuSystem',
    props: {
      item: {
        default: {}
      }
    }
  }
</script>
<style lang="less">

</style>