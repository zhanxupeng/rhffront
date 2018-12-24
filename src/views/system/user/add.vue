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

    <div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" :label-position="'left'">
        <Scroll :height="500">
          <ul class="addPageul">
            <li class="add-page-item">
              <FormItem label="用户账号" prop="loginId">
                <Input v-model="formValidate.loginId" placeholder="请输入用户账号"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="用户密码" prop="password">
                <Input v-model="formValidate.password" placeholder="请输入用户密码" type="password"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="用户姓名" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入用户姓名"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="联系电话" prop="mobile">
                <Input v-model="formValidate.mobile" placeholder="请输入联系电话"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="邮箱" prop="email">
                <Input v-model="formValidate.email" placeholder="请输入邮箱"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="备注" prop="remark">
                <Input v-model="formValidate.remark" placeholder="请输入备注"></Input>
              </FormItem>
            </li>
          </ul>
        </Scroll>
        <div class="submit-add">
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
				type:0,
				id:'',
				version:null,
        menuTitle: "",
        title: "新增",
        formValidate: {
          loginId: "",
          password: "",
          name: "",
          mobile: "",
          email: "",
          remark: ""
        },
        ruleValidate: {
          loginId: [{
            required: true,
            message: "用户账号不能为空",
            trigger: "blur"
          }],
          password: [{
              required: true,
              message: "用户密码不能为空",
              trigger: "blur"
            },
            {
              type: "string",
              min: 6,
              max: 20,
              message: "用户密码必须在介于6~20位",
              trigger: "blur"
            }
          ],
          name: [{
            required: true,
            message: "用户姓名不能为空",
            trigger: "blur"
          }],
          mobile: [

          ],
          email: [{
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur"
          }],
          remark: [

          ]
        }
      };
    },
    mounted() {
      this.menuTitle = this.$root.$data.menuTitle;
			this.id = this.$route.query.id;
			console.info(this.id);
			if(this.id){
				this.title = '编辑';
				this.type = 1;
				this.getDetial();
			}
    },
    methods: {
      turnBack() {
        this.$router.push({
          name: "userList"
        });
      },
      handleSubmit(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
						if(this.type==0){
							this.API.user.add(this.formValidate).then(response => {
								if(response){
									this.$Message.success("Success!");
									this.$router.push({
										name:"userList"
									})
								}
							})
							
						}else{
							let request = {
								urid:this.id,
								loginId:this.formValidate.loginId,
								password:this.formValidate.password,
								name:this.formValidate.name,
								mobile:this.formValidate.mobile,
								email:this.formValidate.email,
								remark:this.formValidate.remark,
								version:this.version
							}
							this.API.user.edit(request).then(response =>{
								if(response){
									this.$Message.success("Success!");
									this.$router.push({
										name:"userList"
									})
								}
							})
						}
						
          } else {
            this.$Message.error("Fail!");
          }
        });
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
			getDetial(){
				console.info(this.id);
				  let that = this;
				  this.API.user.getById({ urid : that.id }).then(response =>{
						that.formValidate = {
							loginId:response.data.loginId,
							password:response.data.password,
							name:response.data.name,
							mobile:response.data.mobile,
							email:response.data.email,
							remark:response.data.remark,
						}
						that.version = response.data.version;
				})
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
</style>