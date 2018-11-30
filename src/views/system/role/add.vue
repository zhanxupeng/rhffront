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
              <FormItem label="名字" prop="name">
                <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="邮箱" prop="mail">
                <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="城市" prop="city">
                <Select v-model="formValidate.city" placeholder="Select your city">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="性别" prop="gender">
                <RadioGroup v-model="formValidate.gender">
                  <Radio label="male">Male</Radio>
                  <Radio label="female">Female</Radio>
                </RadioGroup>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="爱好" prop="interest">
                <CheckboxGroup v-model="formValidate.interest">
                  <Checkbox label="Eat"></Checkbox>
                  <Checkbox label="Sleep"></Checkbox>
                  <Checkbox label="Run"></Checkbox>
                  <Checkbox label="Movie"></Checkbox>
                </CheckboxGroup>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="描述" prop="desc">
                <Input
                  v-model="formValidate.desc"
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder="Enter something..."
                ></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="名字">
                <Input placeholder="Enter your name"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="名字">
                <Input placeholder="Enter your name"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="名字">
                <Input placeholder="Enter your name"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="名字">
                <Input placeholder="Enter your name"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="名字">
                <Input placeholder="Enter your name"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="名字">
                <Input placeholder="Enter your name"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="名字">
                <Input placeholder="Enter your name"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="名字">
                <Input placeholder="Enter your name"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="名字">
                <Input placeholder="Enter your name"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="名字">
                <Input placeholder="Enter your name"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="名字">
                <Input placeholder="Enter your name"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="名字">
                <Input placeholder="Enter your name"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="名字">
                <Input placeholder="Enter your name"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="名字">
                <Input placeholder="Enter your name"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="名字">
                <Input placeholder="Enter your name"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="名字">
                <Input placeholder="Enter your name"></Input>
              </FormItem>
            </li>
            <li class="add-page-item">
              <FormItem label="名字">
                <Input placeholder="Enter your name"></Input>
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
      menuTitle: "",
      title: "新增",
      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Incorrect email format",
            trigger: "blur"
          }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        gender: [
          {
            required: true,
            message: "Please select gender",
            trigger: "change"
          }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted(){
    this.menuTitle=this.$root.$data.menuTitle
  },
  methods: {
    turnBack() {
      this.$router.push({
        name: "roleList"
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
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