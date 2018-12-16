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
        :label-position="'right'"
      >
        <Scroll :height="500">
          <ul class="addPageul">
            <li class="add-page-item">
              <FormItem
                label="菜单名称"
                prop="name"
              >
                <Input
                  v-model="formValidate.name"
                  placeholder="菜单名称"
                ></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem
                label="菜单代码"
                prop="code"
              >
                <Input
                  v-model="formValidate.code"
                  placeholder="菜单代码"
                  :disabled="type === '1'"
                ></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem
                label="图标"
                prop="icon"
              >
                <Input
                  v-model="formValidate.icon"
                  placeholder="图标"
                ></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem
                label="地址"
                prop="url"
              >
                <Input
                  v-model="formValidate.url"
                  placeholder="地址"
                ></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem
                label="父级菜单"
                prop="parentId"
              >
                <Input
                  v-model="formValidate.parentId"
                  placeholder="父级菜单"
                ></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem
                label="首路径"
                prop="indexPath"
              >
                <Input
                  v-model="formValidate.indexPath"
                  placeholder="首路径"
                ></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem
                label="排序"
                prop="orderNo"
              >
                <Input
                  v-model="formValidate.orderNo"
                  placeholder="排序"
                  :number="true"
                ></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem
                label="是否活跃"
                prop="activeFlag"
              >
                <Select
                  v-model="formValidate.activeFlag"
                  :disabled="type === '1'"
                >
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
            <li class="add-page-item">
              <FormItem
                label="是否显示"
                prop="showFlag"
              >
                <Select v-model="formValidate.showFlag">
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
      title: "新增",
      type: "0",
      id: "",
      version: null,
      formValidate: {
        name: "",
        code: "",
        icon: "",
        url: "",
        parentId: "",
        indexPath: "",
        orderNo: null,
        activeFlag: "",
        showFlag: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "菜单名称不能为空",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "菜单代码不能为空",
            trigger: "blur"
          }
        ],
        icon: [],
        url: [
          {
            required: true,
            message: "路径不能为空",
            trigger: "change"
          }
        ],
        parentId: [
          {
            required: true,
            message: "父菜单不能为空",
            trigger: "change"
          }
        ],
        indexPath: [
          {
            required: true,
            message: "首路径不能为空",
            trigger: "change"
          }
        ],
        orderNo: [
          {
            type: "number",
            required: true,
            message: "排序不能为空",
            trigger: "blur"
          }
        ],
        activeFlag: [
          {
            required: true,
            message: "激活标记不能为空",
            trigger: "change"
          }
        ],
        showFlag: [
          {
            required: true,
            message: "显示标记不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    this.menuTitle = this.$root.$data.menuTitle;
    this.id = this.$route.query.id;
    if (this.id) {
      this.title = "编辑";
      this.type = "1"; // 编辑
      this.getDetail();
    }
  },
  methods: {
    getDetail() {
      let that = this;
      that.API.menu.getById({ urid: that.id }).then(res => {
        if (res.code === "0") {
          let data = res.data;
          that.id = data.urid;
          that.version = data.version;
          that.formValidate = {
            name: data.name,
            code: data.code,
            icon: data.icon,
            url: data.url,
            parentId: data.parentId,
            indexPath: data.indexPath,
            orderNo: data.orderNo,
            activeFlag: data.activeFlag,
            showFlag: data.showFlag
          };
        }
      });
    },
    turnBack() {
      this.$router.push({
        name: "menuList"
      });
    },
    handleSubmit(name) {
      let that = this;
      that.$refs[name].validate(valid => {
        if (valid) {
          if (that.type === "0") {
            that.API.menu.add(that.formValidate).then(res => {
              if (res.code === "0") {
                that.$Message.success(res.info);
                that.$router.push({
                  name: "menuList"
                });
              }
            });
          } else {
            let request = {
              urid: that.id,
              version: that.version,
              name: that.formValidate.name,
              icon: that.formValidate.icon,
              url: that.formValidate.url,
              parentId: that.formValidate.parentId,
              indexPath: that.formValidate.indexPath,
              orderNo: that.formValidate.orderNo,
              activeFlag: that.formValidate.activeFlag,
              showFlag: that.formValidate.showFlag
            };
            that.API.menu.edit(request).then(res => {
              if (res.code === "0") {
                that.$Message.success(res.info);
                that.$router.push({
                  name: "menuList"
                });
              }
            });
          }
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