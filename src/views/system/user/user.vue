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
      <Button @click="edit">编辑</Button>
      <Button @click="del">删除</Button>
      <Button @click="active(0)">启用</Button>
      <Button @click="active(1)">停用</Button>
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
        data1: [],
        total: 100, // 总条数
        currentPage: 1, // 当前页码
        pageSize: 50, // 每页条数
        checkedNodes: [], // 选中的数据
        sortName: '', //
        sortType: '', // ASC:顺序   DESC 倒叙
        loading: false,
      }
    },
		mounted() {
			this.getData();
		},
    methods: {
			getData(){
				this.API.user.getAll().then(response => {
          this.data1 = response.data;
      })
			},
      add() {
        this.$router.push({
          name: 'userAdd'
        })
      },
			edit(){
				let that = this;
				if(that.checkedNodes.length != 1){
					that.$Message.warning("请选择一条操作记录");
				}else{
					this.$router.push({
						name:'userAdd',
						query:{
							id:that.checkedNodes[0].urid
						}
					})
				}
				
			},
			del(){
				let that = this;
				if(that.checkedNodes.length==0){
					that.$Message.warning("至少选择一条操作记录")
				}else{
					let request = that.checkedNodes.map(x =>{
							return{
								urid:x.urid,
								version:x.version
							};
					});
					this.$Modal.confirm({
						title: "消息",
						content: "是否确认删除?",
						onOk() {
							that.API.user.del(request).then(res => {
									that.$Message.success(res.info);
									that.getData();
							});
						}
					});
				}
				
			},
      handleSubmit() {
				let request = {
					name:this.formInline.name,
					loginId:this.formInline.loginId,
					userStatus:this.formInline.lockStatus
				}
				console.info(request);
				this.API.user.getBySomething(request).then(response =>{
					this.data1 = response.data;
				})
      },
			active(num){
				var msg;
				if(num==0){
					msg = '启用';
				}else{
					msg = '停用';
				}
				let that = this;
				if(that.checkedNodes.length != 1){
					this.$Message.warning('请选择一条操作记录');
				}else{
					let that = this;
					let request = that.checkedNodes.map(x =>{
						return{
							urid : x.urid,
							version : x.version,
							userStatus:num
						};
					});
					this.API.user.getById(request[0]).then(response =>{
						 console.info(response);
							if(response.data.userStatus==num){
								this.$Message.warning('该用户已' + msg);
							}else{
								this.$Modal.confirm({
									title:"消息",
									content:"确认" + msg + "该用户？",
									onOk() {
										that.API.user.edit(request[0]).then(res => {
												that.$Message.success(res.info);
												that.getData();
										});
									}
								})
							}
					})
				}
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
				this.getData();
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