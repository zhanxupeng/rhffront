<template>
  <div class="layoutPage tree-grid-page">
    <Layout style="height: 100%;">
      <Sider class="tree-box" width='220' style="z-index:8;">
        <Tree :data="queryTreeList" @on-select-change="treeSelectChange"></Tree>
      </Sider>
      <Content class="grid-box">

        <div>
          <div class="searchStyle">
            <Form ref="formInline" :model="formInline" inline label-position="right" :label-width="100">
              <FormItem prop="name" label="菜单名称">
                <Input type="text" v-model="formInline.name" placeholder="菜单名称"></Input>
              </FormItem>
              <FormItem prop="code" label="菜单编号">
                <Input type="text" v-model="formInline.code" placeholder="菜单编号"></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="tableQuery">查询</Button>
                <Button @click="handleReset('formInline')" style="margin-left: 8px">重置</Button>
              </FormItem>
            </Form>
          </div>

          <div class="operationStyle">
            <Button @click="add">新增</Button>
            <Button>编辑</Button>
            <Button>删除</Button>
            <Button>启用</Button>
            <Button>停用</Button>
          </div>
          <div>
            <div>
              <Table height="500" :columns="columns1" :data="data1" :loading="loading" @on-selection-change="selectChange" @on-sort-change="sortChange" @on-row-dblclick="onDblclick">
              </Table>

            </div>
            <div class="pageStyle footer">
              <Page :total="total" show-elevator show-total show-sizer :page-size-opts="[10,20,50,100]" @on-change="changePage" @on-page-size-change="changePageSize" />
            </div>
          </div>

        </div>

      </Content>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryTreeList: [],
      formInline: {
        name: "",
        code: "",
        parentId: ""
      },
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
          title: "名称",
          key: "name",
          sortable: "custom"
        },
        {
          title: "编码",
          key: "code"
        },
        {
          title: "图标",
          key: "icon"
        },
        {
          title: "路径",
          key: "url"
        },
        {
          title: "父级菜单",
          key: "parentName"
        },
        {
          title: "首路径",
          key: "indexPath"
        },
        {
          title: "是否激活",
          key: "activeFlagShow"
        },
        {
          title: "是否显示",
          key: "showFlagShow"
        },
        {
          title: "排序",
          key: "orderNo"
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
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
    this.getQueryTreeList()
    this.tableQuery()
  },
  methods: {
    getQueryTreeList() {
      this.API.menu.queryTree().then(res => {
        if (res.code === "0") {
          this.queryTreeList = res.data
        }
      });
    },
    add() {
      this.$router.push({
        name: "menuAdd"
      });
    },
    treeSelectChange(checked) {
      if (checked.length > 0) {
        this.formInline.parentId = checked[0].value
        this.tableQuery()
      }
    },
    tableQuery() {
      let request = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        sortName: this.sortName,
        sortType: this.sortType,
        entity: this.formInline
      };
      this.API.menu.query(request).then(res => {
        if (res.code === "0") {
          this.data1 = res.data.data
        }
      });
    },
    selectChange(selection) {
      this.checkedNodes = selection
    },
    sortChange(data) {
      if (data.order !== "normal") {
        this.sortName = data.key
        this.sortType = data.order
      }
      this.tableQuery()
    },
    onDblclick(data) {

    },
    changePage(pageNum) {
      this.currentPage = pageNum
      this.tableQuery()
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize
      this.tableQuery()
    },
    handleReset(name) {
      this.$refs[name].resetFields()
      this.tableQuery()
    }
  }
};
</script>
<style lang="less">
.tree-grid-page {
  .tree-box {
    .ivu-layout-sider-children {
      padding-top: 31px;
      padding-left: 10px;

      .ivu-tree-title {
        font-size: 12px;
        border-radius: 4px;
      }

      .ivu-tree-title-selected,
      .ivu-tree-title-selected:hover {
        background: #1f82fb;
        color: #fff;
      }
    }
  }

  .grid-box {
    margin-left: 10px;
    overflow: hidden;
    background-color: #fff;
  }
}

.layoutPage {
  #page-wrapper {
    padding-top: 0;
  }

  .page-inner.content-inner {
    margin-top: 0;
  }

  .ivu-layout-sider {
    background: #fff;
  }
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