<template>
  <div class="layoutPage tree-grid-page">
    <Layout style="height: 100%;">
      <Sider
        class="tree-box"
        width='220'
        style="z-index:8;"
      >
        <Tree
          :data="queryTreeList"
          @on-select-change="treeSelectChange"
        ></Tree>
      </Sider>
      <Content class="grid-box">

        <div>
          <div class="searchStyle">
            <Form
              ref="formInline"
              :model="formInline"
              inline
              label-position="right"
              :label-width="100"
            >
              <FormItem
                prop="name"
                label="菜单名称"
              >
                <Input
                  type="text"
                  v-model="formInline.name"
                  placeholder="菜单名称"
                ></Input>
              </FormItem>
              <FormItem
                prop="code"
                label="菜单编号"
              >
                <Input
                  type="text"
                  v-model="formInline.code"
                  placeholder="菜单编号"
                ></Input>
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  @click="tableQuery"
                >查询</Button>
                <Button
                  @click="handleReset('formInline')"
                  style="margin-left: 8px"
                >重置</Button>
              </FormItem>
            </Form>
          </div>

          <div class="operationStyle">
            <Button @click="add">新增</Button>
            <Button @click="edit">编辑</Button>
            <Button @click="del">删除</Button>
            <Button @click="childrenFunction">子功能维护</Button>
            <Button @click="enable">启用</Button>
            <Button @click="disable">停用</Button>
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
      data1: [],
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
    this.getQueryTreeList();
    this.tableQuery();
  },
  methods: {
    getQueryTreeList() {
      this.API.menu.queryTree().then(res => {
        if (res.code === "0") {
          this.queryTreeList = res.data;
        }
      });
    },
    add() {
      this.$router.push({
        name: "menuAdd"
      });
    },
    edit() {
      let that = this;
      if (that.checkedNodes.length !== 1) {
        that.$Message.warning("请选择一条操作记录！");
        return;
      }

      that.$router.push({
        name: "menuAdd",
        query: {
          id: that.checkedNodes[0].urid
        }
      });
    },
    enable() {
      let that = this;
      if (that.checkedNodes.length === 0) {
        that.$Message.error("必须选择一条数据");
        return;
      }

      let other = that.checkedNodes.filter(x => x.activeFlag !== "0");
      if (other && other.length > 0) {
        that.$Message.error("停用的菜单才能启用");
        return;
      }

      let request = that.checkedNodes.map(x => {
        return {
          urid: x.urid,
          version: x.version
        };
      });

      this.$Modal.confirm({
        title: "消息",
        content: "是否确认启用?",
        onOk() {
          that.API.menu.enable(request).then(res => {
            if (res.code === "0") {
              that.$Message.success(res.info);
              that.tableQuery();
            }
          });
        }
      });
    },
    disable() {
      let that = this;
      if (that.checkedNodes.length === 0) {
        that.$Message.error("必须选择一条数据");
        return;
      }

      let other = that.checkedNodes.filter(x => x.activeFlag !== "1");
      if (other && other.length > 0) {
        that.$Message.error("启用的菜单才能停用");
        return;
      }

      let request = that.checkedNodes.map(x => {
        return {
          urid: x.urid,
          version: x.version
        };
      });

      that.$Modal.confirm({
        title: "消息",
        content: "是否确认停用?",
        onOk() {
          that.API.menu.disable(request).then(res => {
            if (res.code === "0") {
              that.$Message.success(res.info);
              that.tableQuery();
            }
          });
        }
      });
    },
    childrenFunction(){
      let that = this;
      if (that.checkedNodes.length !== 1) {
        that.$Message.warning("请选择一条操作记录！");
        return;
      }

      that.$router.push({
        name: "menuOperationList",
        query: {
          id: that.checkedNodes[0].urid
        }
      });
    },
    del() {
      let that = this;
      if (that.checkedNodes.length === 0) {
        that.$Message.error("必须选择一条数据");
        return;
      }
      console.log("that");
      console.log(that.checkedNodes);
      let request = that.checkedNodes.map(x => {
        return {
          urid: x.urid,
          version: x.version
        };
      });

      this.$Modal.confirm({
        title: "消息",
        content: "是否确认删除?",
        onOk() {
          that.API.menu.del(request).then(res => {
            if (res.code === "0") {
              that.$Message.success(res.info);
              that.tableQuery();
            }
          });
        }
      });
    },
    treeSelectChange(checked) {
      if (checked.length > 0) {
        this.formInline.parentId = checked[0].value;
        this.tableQuery();
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
          this.data1 = res.data.data;
        }
      });
    },
    selectChange(selection) {
      this.checkedNodes = selection;
    },
    sortChange(data) {
      if (data.order !== "normal") {
        this.sortName = data.key;
        this.sortType = data.order;
      }
      this.tableQuery();
    },
    onDblclick(data) {},
    changePage(pageNum) {
      this.currentPage = pageNum;
      this.tableQuery();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.tableQuery();
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.tableQuery();
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