<template>
  <div>
    <div class="pageTop">
      <div class="fl">
        <a @click="turnBack">{{menuTitle}}</a>
        <span>></span>
        <a @click="turnBackFirst">{{firstTitle}}</a>
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
              <FormItem
                label="操作代码"
                prop="code"
              >
                <Input
                  v-model="formValidate.code"
                  placeholder="请输入操作代码"
                ></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem
                label="操作名称"
                prop="name"
              >
                <Input
                  v-model="formValidate.name"
                  placeholder="请输入操作名称"
                ></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem
                label="请求地址"
                prop="url"
              >
                <Input
                  v-model="formValidate.url"
                  placeholder="请输入请求地址"
                ></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem
                label="是否启用"
                prop="activeFlag"
              >
                <Select v-model="formValidate.activeFlag">
                  <Option
                    value="1"
                    key="1"
                  >是</Option>
                  <Option
                    value="0"
                    key="0"
                  >否</Option>
                </Select>
              </FormItem>
            </li>
          </ul>
        </Scroll>

        <div class="submit-add">
          <FormItem>
            <Button
              type="primary"
              @click="handleSubmit('formValidate')"
            >保存</Button>
            <Button
              @click="handleReset('formValidate')"
              style="margin-left: 8px"
            >重置</Button>
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
      menuTitle: "",
      firstTitle: "子功能",
      title: "新增",
      menuId: "",
      id: null,
      version:null,
      formValidate: {
        name: "",
        code: "",
        url: "",
        activeFlag: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "操作名称不能为空",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "操作代码不能为空",
            trigger: "blur"
          }
        ],
        url: [
          {
            required: true,
            message: "请求地址不能为空",
            trigger: "blur"
          }
        ],
        activeFlag: []
      }
    };
  },
  mounted() {
    this.menuTitle = this.$root.$data.menuTitle;
    this.menuId = this.$route.query.menuId;
    this.id = this.$route.query.id;
    if (this.id) {
      this.title = "编辑";
      this.getDetail();
    }
  },
  methods: {
    turnBack() {
      this.$router.push({
        name: "menuList"
      });
    },
    turnBackFirst() {
      this.$router.push({
        name: "menuOperationList"
      });
    },
    getDetail() {
      let request = {
        urid: this.id
      };
      this.API.menuOperation.getById(request).then(res => {
        if (res.code === "0") {
          let data = res.data;
          this.id = data.urid;
          this.version = data.version;
          this.menuId = data.menuId;
          this.formValidate = {
            name: data.name,
            code: data.code,
            url: data.url,
            activeFlag: data.activeFlag
          };
        }
      });
    },
    handleSubmit(name) {
      let that = this;
      that.$refs[name].validate(valid => {
        if (valid) {
          let request = {
            ...that.formValidate,
            urid: that.id,
            version: that.version,
            menuId: that.menuId
          };

          if (that.id) {
            that.API.menuOperation.edit(request).then(res => {
              if (res.code === "0") {
                that.$Message.success(res.info);
                that.$router.push({
                  name: "menuOperationList"
                });
              }
            });
          } else {
            that.API.menuOperation.add(request).then(res => {
              if (res.code === "0") {
                that.$Message.success(res.info);
                that.$router.push({
                  name: "menuOperationList"
                });
              }
            });
          }
        } else {
          that.$Message.error(res.info);
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
</style>
