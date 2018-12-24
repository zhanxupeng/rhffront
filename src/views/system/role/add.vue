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
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="100"
        :label-position="'left'"
      >
        <Scroll :height="500">
          <ul class="addPageul">
            <li class="add-page-item">
              <FormItem label="角色编码" prop="code">
                <Input v-model="formValidate.code" placeholder="请输入角色编码"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="角色名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入角色名称"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="备注" prop="remark">
                <Input v-model="formValidate.remark" placeholder="请输入备注" type="textarea" :rows="4"></Input>
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
			id:"",
			version:null,
      menuTitle: "",
      title: "新增",
      formValidate: {
        name: "",
        code: "",
        remark: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "角色名称不能为空",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "角色编码不能为空",
            trigger: "blur"
          }
        ],
        city: []
      }
    };
  },
  mounted(){
    this.menuTitle=this.$root.$data.menuTitle;
		this.id = this.$route.query.id;
		console.info(this.$route.query.id);
		if(this.id){
			 this.title='编辑',
			 this.type=1;
			 this.getDetial();
		}
  },
  methods: {
    turnBack() {
      this.$router.push({
        name: "roleList"
      });
    },
		getDetial(){
			this.API.role.getById({ urid: this.id }).then(response =>{
				this.formValidate = {
					name:response.data.name,
					code:response.data.code,
					remark:response.data.remark
				}
				this.version = response.data.version;
			})
		},
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
					let request = {
						urid:this.id,
						version:this.version,
						name:this.formValidate.name,
						code:this.formValidate.code,
						remark:this.formValidate.remark
					}
					if(this.type==0){
						this.API.role.add(request).then(response =>{
							if(response){
								this.$Message.success("Success!");
								this.$router.push({
									name:'roleList'
								});
							}
						})
					}else{
						console.info(request);
						this.API.role.edit(request).then(response =>{
							if(response){
								this.$Message.success("Success!");
								this.$router.push({
									name:'roleList'
								});
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