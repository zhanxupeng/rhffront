<template>
  <div>
    <div class="pageTop">
      <div class="fl">
        <a @click="turnBack">{{menuTitle}}</a>
        <span>></span>
        {{title}}
      </div>
      <div class="fr">
        <a @click="turnBack">×</a>
      </div>
    </div>

    <div class="operationStyle">
      <Button @click="add">新增</Button>
      <Button>编辑</Button>
      <Button>删除</Button>
    </div>
    <div>
      <div>
        <Table
          height="500"
          :columns="columns1"
          :data="data1"
          :loading="loading"
          @on-selection-change="selectChange"
          @on-sort-change="sortChange"
          @on-row-dblclick="onDblclick"
        >
        </Table>

      </div>
      <div class="pageStyle footer">
        <Page
          :total="total"
          show-elevator
          show-total
          show-sizer
          :page-size-opts="[10,20,50,100]"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuTitle: "",
      title: "子功能",
      menuId: "",
      columns1: [
        {
          type: "index",
          width: 70,
          title: "序号"
        },
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "代码",
          key: "code",
          sortable: "custom"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "请求地址",
          key: "url"
        },
        {
          title: "是否启用",
          key: "activeFlag"
        }
      ],
      data1: [
        {
          code: "ADD",
          name: "新增",
          url: "/websys/test/hello.do",
          activeFlag: "是"
        },
        {
          code: "EDIT",
          name: "编辑",
          url: "/websys/test/edit.do",
          activeFlag: "是"
        }
      ],
      total: 100, // 总条数
      currentPage: 1, // 当前页码
      pageSize: 50, // 每页条数
      checkedNodes: [], // 选中的数据
      sortName: "", //
      sortType: "", // ASC:顺序   DESC 倒叙
      loading: false
    };
  },
  mounted() {
    this.menuTitle = this.$root.$data.menuTitle;
    this.menuId = this.$route.query.id;
  },
  methods: {
    turnBack() {
      this.$router.push({
        name: "menuList"
      });
    },
    add() {
      this.$router.push({
        name: "menuOperationAdd"
      });
    },
    handleSubmit(name) {},
    selectChange(selection) {
      this.checkedNodes = selection;
    },
    sortChange(data) {
      if (data.order !== "normal") {
        this.sortName = data.key;
        this.sortType = data.order;
      }
      this.data1.reverse();
    },
    onDblclick(data) {
      console.log("onDblclick");
      console.log(data);
    },
    changePage(pageNum) {
      this.currentPage = pageNum;
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style lang="less">
.pageTop {
  height: 60px;
  line-height: 60px;
  padding: 0 20px 0 30px;
  border-bottom: 2px solid #f0f2f5;

  .fl {
    float: left;
  }

  span {
    color: #d8d8d8;
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #6e7680;
  }

  .fr a {
    float: right;
    font-size: 20px;
  }
}

.addPageul {
  padding: 40px 0 20px 30px;
  list-style: none;

  .ivu-select-not-found li {
    width: 340px;
  }

  .ivu-form-item-content {
    width: 350px;
  }

  .add-page-item {
    width: 520px;
    float: left;

    .ivu-input {
      font-size: 12px;
    }

    textarea.ivu-input {
      min-height: 52px;
    }
  }

  .blank-form-item {
    height: 36px;
  }
}

.submit-add {
  clear: both;
  width: 80%;
  text-align: center;
}
.operationStyle {
  margin: 0 0 10px 10px;
}

.searchStyle {
  margin: 10px 10px 0 10px;
}

.footer {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: white;
  text-align: center;
  vertical-align: middle;
}
</style>