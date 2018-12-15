<template>
  <div>
    <div class="searchStyle">
      <Form ref="formInline" :model="formInline" inline label-position="right" :label-width="100">
        <FormItem prop="name" label="用户姓名">
          <Input type="text" v-model="formInline.name" placeholder="请输入用户姓名"></Input>
        </FormItem>
        <FormItem prop="loginId" label="用户账号">
          <Input type="text" v-model="formInline.loginId" placeholder="请输入用户账号"></Input>
        </FormItem>
        <FormItem prop="userStatus" label="用户状态">
          <Select v-model="formInline.userStatus" placeholder="请输入用户状态" style="width:169px">
            <Option value="0">正常</Option>
            <Option value="1">注销</Option>
            <Option value="2">冻结</Option>
          </Select>
        </FormItem>
        <FormItem prop="lockStatus" label="锁定状态">
          <Select v-model="formInline.lockStatus" placeholder="身份" style="width:169px">
            <Option value="0">正常</Option>
            <Option value="1">锁定</Option>
          </Select>
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
      <Button>启用</Button>
      <Button>停用</Button>
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
          user: '',
          password: ''
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
            title: '用户姓名',
            key: 'name',
            sortable: 'custom'
          },
          {
            title: '用户账号',
            key: 'loginId'
          },
          {
            title: '联系电话',
            key: 'mobile'
          },
          {
            title: '邮箱',
            key: 'email'
          },
          {
            title: '用户状态',
            key: 'userStatus'
          },
          {
            title: '锁定状态',
            key: 'lockStatus'
          },
          {
            title: '备注',
            key: 'remark'
          }
        ],
        data1: [{
            name: '郑美丽',
            loginId: 'zhengby',
            mobile: '15356171125',
            email: '1098481123@qq.com',
            userStatus: '正常',
            lockStatus: '正常',
            remark: '暂无'
          },
          {
            name: '占旭鹏',
            loginId: 'zhanxp',
            mobile: '15356171125',
            email: '1098481123@qq.com',
            userStatus: '异常',
            lockStatus: '锁定',
            remark: '雪儿'
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
          name: 'userAdd'
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