<template>
  <div>
    <div class="searchStyle">
      <Form ref="formInline" :model="formInline" inline label-position="right" :label-width="100">
        <FormItem prop="name" label="角色名称">
          <Input type="text" v-model="formInline.name" placeholder="请输入角色名称"></Input>
        </FormItem>
        <FormItem prop="code" label="角色编号">
          <Input type="text" v-model="formInline.code" placeholder="请输入角色编号"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">查询</Button>
          <Button @click="handleReset('formInline')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </div>

    <div class="operationStyle">
      <Button @click="add">新增</Button>
      <Button>编辑</Button>
      <Button>删除</Button>
      <Button>分配用户</Button>
      <Button>分配权限</Button>
      <Button>导出</Button>
      <Button>导出全部</Button>
      <Button>字段配置</Button>
    </div>
    <div>
      <div>
        <Table height="500" :columns="columns1" :data="data1" :loading="loading" @on-selection-change="selectChange"
          @on-sort-change="sortChange" @on-row-dblclick="onDblclick">
        </Table>

      </div>
      <div class="pageStyle footer">
        <Page :total="total" show-elevator show-total show-sizer :page-size-opts="[10,20,50,100]" @on-change="changePage"
          @on-page-size-change="changePageSize" />
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {

        formInline: {
          name: '',
          code: ''
        },

        columns1: [{
            type: 'index',
            width: 70,
            title: '序号'
          },
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '角色名称',
            key: 'name',
            sortable: 'custom'
          },
          {
            title: '角色编号',
            key: 'code'
          },
          {
            title: '备注',
            key: 'remark'
          }
        ],
        data1: [{
            name: '系统管理员',
            code: 'R06',
            remark: '负责系统基本运维与系统参数设置的系统运维管理专员'
          },
          {
            name: '超级管理员',
            code: 'R99',
            address: '系统最大权限'
          }
        ],
        total: 100, // 总条数
        currentPage: 1, // 当前页码
        pageSize: 50, // 每页条数
        checkedNodes: [], // 选中的数据
        sortName: '', //
        sortType: '', // ASC:顺序   DESC 倒叙
        loading: false,
      }
    },
    methods: {
      add() {
        this.$router.push({
          name: 'roleAdd'
        })
      },
      handleSubmit(name) {

      },
      selectChange(selection) {
        this.checkedNodes = selection
      },
      sortChange(data) {
        if (data.order !== 'normal') {
          this.sortName = data.key
          this.sortType = data.order
        }
        this.data1.reverse()
      },
      onDblclick(data) {
        console.log('onDblclick')
        console.log(data)
      },
      changePage(pageNum) {
        this.currentPage = pageNum
      },
      changePageSize(pageSize) {
        this.pageSize = pageSize
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
<style lang="less">
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