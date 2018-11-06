<template>
  <div>
    <div class="pageTop">
      <div class="fl">
        <a @click="turnBack">{{menuTitle}}</a>
        <span>></span>
        {{title}}
      </div>
      <div class="fr"><a @click="turnBack">×</a></div>
    </div>
        

    <div>

    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        menuTitle: '合作渠道',
        title: '新增'
      }
    },
    methods: {
      turnBack() {

      }
    }
  }
</script>
<style lang="less">
  .pageTop {
    height: 60px;
    line-height: 60px;
    padding: 0 20px 0 30px;
    border-bottom: 2px solid #F0F2F5;

    .fl {
      float: left;
    }

    span {
      color: #D8D8D8;
      display: inline-block;
      margin: 0 10px
    }

    a {
      color: #6E7680
    }

    .fr a {
      float: right;
      font-size: 20px;
    }
  }
</style>