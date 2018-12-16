<template>
  <div>
    <div class="pageTop">
      <div class="fl">
        <a @click="turnBack">{{menuTitle}}</a>
        <span>></span>
        <a @click="turnBackFirst">{{firstTitle}}</a>
        {{title}}
      </div>
      <div class="fr">
        <a @click="turnBack">×</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuTitle: "",
      firstTitle:"子功能",
      title: "新增",
      menuId: ""
    };
  },
  mounted(){
    this.menuTitle = this.$root.$data.menuTitle;
  },
  methods: {
    turnBack() {
      this.$router.push({
        name: "menuList"
      });
    },
    turnBackFirst() {
      this.$router.push({
        name: "menuOperationList"
      });
    }
  }
};
</script>
<style lang="less">
</style>
