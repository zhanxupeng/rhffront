<template>
  <div class="login_Box">
    <div class="loginWarp">
      <div class="loginFrom">
        <div class="loginBox">
          <h3>
            <img :src="loginImg" width="206" height="40" />
          </h3>
          <Form ref="logindata" :model="logindata" :rules="rulelogin">
            <FormItem prop="name">
              <i class="icon icon-lianxiren"></i>
              <Input v-model="logindata.name" placeholder="请输入账号" :maxlength="20" @on-keyup="replaceStr('logindata.name',$event)"
                @on-keydown="KeyDown" @on-blur="ifNeetCaptcha(logindata.name)" />
            </FormItem>
            <FormItem prop="pwd">
              <i class="icon icon-mima"></i>
              <Input v-model="logindata.pwd" type="password" :maxlength="20" placeholder="请输入密码" @on-keyup="replaceStr('logindata.pwd',$event)"
                @on-keydown="KeyDown" />
            </FormItem>
            <FormItem prop="code" v-show="codeShow">
              <i class="icon icon-yanzhengma"></i>
              <Input v-model="logindata.code" :maxlength="4" placeholder="请输入验证码" @on-keydown="KeyDown">
              <span slot="append">
                <img :src="codeimg" width="60" @click="getVerify()">
              </span>
              </Input>
            </FormItem>
            <FormItem prop="remember" class="rememberBox">
              <span>
                <Checkbox v-model="logindata.remember">记住密码</Checkbox>
              </span>
            </FormItem>
            <Button type="primary" @click="login('logindata')">登录</Button>
          </Form>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import loginImg from '@/assets/img/gardpay.png'
  import {replaceMixins} from '@/utils/replaceMixins'

  export default {
    mixins: [ replaceMixins ], // 为什么这样就可以用那个方法了= =
    data() {
      return {
        codeimg: '', // 验证码图片
        codeShow: false, // 验证码显示
        loginImg: loginImg,
        logindata: {
          name: '',
          pwd: '',
          code: '',
          remember: false
        },
        rulelogin: {
          name: [{
            required: true,
            message: '用户账号不能为空',
            trigger: 'blur'
          }],
          pwd: [{
              required: true,
              message: '密码不能为空',
              trigger: 'blur'
            },
            {
              min: 8,
              max: 20,
              message: '密码长度为8-20',
              trigger: 'blur'
            }
          ],
          code: [{
              required: true,
              message: '验证码不能为空',
              trigger: 'blur'
            },
            {
              min: 4,
              message: '验证码不能少于4位',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    mounted() {
      this.getCookie()
      this.resize()
      let name_ = this.logindata.name
      if (name_) {
        this.ifNeetCaptcha(name_)
      }

      this.$cookies.set('userName', '') // 登录账号
      this.$cookies.set('userId', '') // 登录账号id
      this.$store.commit('loginStateChange', false)

      localStorage.setItem('componentName', '')
    },
    methods: {
      // 获取cookie
      getCookie() {
        console.log("cookie")
        console.log(this.$cookies)
        let name = this.$cookies.get('name')
        let pwd = this.$cookies.get('pwd')

        if (pwd) {
          this.logindata.pwd = pwd
          this.logindata.remember = true
        }
        if (name) {
          this.logindata.name = name
        }
      },
      // 登录框居中
      resize() {
        let H = document.documentElement.clientHeight
        let h = document.getElementsByClassName('loginBox')[0].clientHeight
        document.getElementsByClassName('loginBox')[0].style.marginTop = (H - h) / 2 + 'px'
      },
      // 验证是否需要验证码
      ifNeetCaptcha(id) {
        if (id) {
          let data = {
            loginId: id
          }
          this.API.userLogin.ifNeetCaptcha(data).then(res => {
            if (res.code === '0') {
              if (res.data) {
                this.codeShow = true
                this.getVerify()
              } else {
                this.codeShow = false
              }
            }
          })
        }
      },

      // 设置cookie
      setCookie() {
        if (this.logindata.remember) {
          this.$cookies.set('name', this.logindata.name)
          this.$cookies.set('pwd', this.logindata.pwd)
          // $.cookie("pwd",$.base64.encode(pwd));
        } else {
          this.$cookies.set('name', '')
          this.$cookies.set('pwd', '')
        }
      },


      // 获取验证码
      getVerify() {
        console.log("getVerify方法")
        console.log(this.API.commonAPI.correntURL)
        this.codeimg = '/api' + '/websys/userlogin/getCaptchaImage.pub?' + Math.random()
        console.log("this.codeing")
        console.log(this.codeing)
      },


      // 登录
      login(name) {
        let that = this
        let params = {}
        if (this.codeShow) {
          params = {
            captchaText: this.logindata.code
          }
        } else {
          delete(that.logindata['code'])
          delete(that.rulelogin['code'])
        }
        this.$refs[name].validate((valid) => {
          if (valid) {
            that.setCookie()
            let data = {
              loginId: this.logindata.name,
              password: this.logindata.pwd,
              ...params
            }
            that.$router.push({
              path:'/views/index'
            })
            // that.API.userLogin.login(data).then(res => {
            //   if (res.code === '0') {
            //     this.$cookies.set('userName', res.data.loginId) // 登录账号
            //     this.$cookies.set('userId', res.data.urid) // 登录账号id
            //     this.userId = res.data.urid // 登录账号id
            //     localStorage.setItem('name', '')
            //     localStorage.setItem('TabMenuLists', '')
            //     localStorage.setItem('selectMenuUrl', '')
            //     localStorage.setItem('openNames', '')
            //     localStorage.setItem('modulePerMap', '')
            //     if (res.data.needChangPassWord) {
            //       that.Modal = true
            //     } else {
            //       that.$router.push({
            //         path: '/views/index'
            //       })
            //     }
            //   } else {
            //     if (res.code === '1' || res.info === '验证码输入有误！') {
            //       that.codeShow = true
            //       that.getVerify()
            //     }
            //     // that.$Message.warning(res.info)
            //   }
            // })
          }
        })
      },


      KeyDown() {
        if (event.keyCode === 13) {
          this.login('logindata')
        }
      },
      // 修改密码成功
      modify() {
        this.Modal = false
        this.$router.push({
          path: '/'
        })
      }
    }
  }
</script>
<style lang="less">
  .login_Box {
    .loginFrom {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background: rgb(240, 243, 245);

      .loginBox {
        width: 430px;
        height: auto;
        margin: 0 auto;
        padding: 55px;
        border-radius: 8px;
        box-shadow: 0px 0px 14px 0px rgba(0, 12, 48, 0.2);
        background: #fff;

        h3 {
          text-align: center;
          font-size: 20px;
          font-weight: 600;
          color: #4C97CC;
          margin-top: 20px;
          margin-bottom: 42px;
        }

        .ivu-form-item {
          margin-bottom: 5px;
        }

        .ivu-form-item-content {
          position: relative;
          margin-top: 15px;
          color: #6E7680;

          i {
            position: absolute;
            left: 10px;
            top: 4px;
            z-index: 99;
          }

          .ivu-input {
            font-family: PingFang-SC;
            padding: 4px 7px 4px 30px;
            height: 42px;
          }
        }

        .rememberBox {
          width: 100%;
          margin: 14px 0;

          .ivu-form-item-content {
            margin-top: 3px;
          }

          .ivu-form-item-content>span {
            display: inline-block;
            width: 90px
          }
        }

        .ivu-input-group-append {
          padding: 0
        }

        .ivu-btn {
          width: 100%;
          height: 40px;
          margin-top: 10px;
          margin-bottom: 15px;
          font-size: 18px;
        }
      }
    }
  }
</style>