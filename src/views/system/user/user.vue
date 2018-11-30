<template>
  <div>
    <div class="searchStyle">
      <Form ref="formInline" :model="formInline" inline label-position="right" :label-width="100">
        <FormItem prop="user" label="用户名">
          <Input type="text" v-model="formInline.user" placeholder="Username"></Input>
        </FormItem>
        <FormItem prop="password" label="密码">
          <Input type="password" v-model="formInline.password" placeholder="Password"></Input>
        </FormItem>
        <FormItem prop="country" label="国家">
          <Select v-model="formInline.country" placeholder="国家" style="width:169px">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem prop="province" label="身份">
          <Select v-model="formInline.province" placeholder="身份" style="width:169px">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem prop="city" label="城市">
          <Select v-model="formInline.city" placeholder="城市" style="width:169px">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem prop="city1" label="城市">
          <Select v-model="formInline.city1" placeholder="城市" style="width:169px">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem prop="city2" label="城市">
          <Select v-model="formInline.city2" placeholder="城市" style="width:169px">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">查询</Button>
          <Button @click="handleReset('formInline')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </div>

    <div class="operationStyle">
      <Button>新增</Button>
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
        ruleInline: {
          user: [{
            required: true,
            message: 'Please fill in the user name',
            trigger: 'blur'
          }],
          password: [{
              required: true,
              message: 'Please fill in the password.',
              trigger: 'blur'
            },
            {
              type: 'string',
              min: 6,
              message: 'The password length cannot be less than 6 bits',
              trigger: 'blur'
            }
          ]
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
            title: 'Name',
            key: 'name',
            sortable: 'custom'
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address'
          }
        ],
        data1: [{
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }, {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
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