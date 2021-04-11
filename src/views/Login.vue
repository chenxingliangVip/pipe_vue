<template>
  <div class="Login">
    <div class="bg"></div>
    <div style=" height: 60%;min-height: 480px;">
      <div class="header">
        <div class="imgurl">
          <img src="@/assets/img/title.png">
        </div>
        <h2>基于数字孪生的全时段<br>多用户蒸汽管网水力耦合设计管理平台</h2>
      </div>
      <div class="LoginBody Login_input">
        <el-form :model="LoginForm" ref="LoginForm" class="demo-ruleForm LoginForm">
          <el-form-item>
            <el-input v-model="LoginForm.value" placeholder="账号" class="LoginInput">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="LoginForm.password" autocomplete="off" show-password placeholder="密码"
                      @keyup.enter.native="LoginSubmit" class="LoginInput">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-checkbox class="remember" v-model="LoginForm.remember">记住用户名</el-checkbox>
          </el-form-item>
          <div class="Login-button" @click="LoginSubmit">登 录</div>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <p>Copyright 2019 © Refull All rights reserved 建议使用“Chrome / IE / 搜狗高速” 浏览器</p>
    </div>
  </div>
</template>

<script>
  import {getRoutePages} from '@/router'
  import {setToken,getToken} from '@/utils/auth' // 验权
  import LeftMenuData from '@/components/LeftMenu/LeftMenuData'
  export default {
    name: 'Login',
    data() {
      return {
        LoginForm: {
          value: '',
          password: '',
          remember: false,
          state: 0,//0管理，1设计,2经理
        },
      }
    },
    methods: {
      handleLogin() {
        let self = this;
        let param = self.LoginForm;
        let date = new Date("2021-03-01 00:00:00");
        let now = new Date();
        if((now.getTime() - date.getTime())/(1000*60*60*24) >60){
          self.$message.error('已经过期，请联系睿孚科技!');
          return;
        }
        self.$http({
          url: "/pipe/login",
          method: "post",
          params: param
        }).then(resp => {
          if (resp.success) {
            self.$store.dispatch('setLoginUserDetail', resp.result).then(res => {
              setToken(resp.result);
              if(resp.result.roleType == 1) {//管理员
                self.$router.push({path: "/User"});
              }else if(resp.result.roleType == 2) {//经理
                self.$router.push({path: "/MyProjectList"});
              }else if(resp.result.roleType == 3) {//设计员
                self.$router.push({path: "/MyProjectList"});
              }
            });
            return
          }
          self.$message.error('用户名或密码错误!');
        });
      },
      LoginSubmit() {
        if (this.LoginForm.value) {
          if (this.LoginForm.password) {
            this.handleLogin();
            return;
          }
          this.$message.error('密码不能为空!');
          return;
        } else {
          this.$message.error('用户名不能为空!');
        }
      }
    },

    beforeCreate() {
      localStorage.removeItem('userInfo')
    }
  }
</script>

<style scoped lang="scss">
  $baseColor: #1397de;
  .Login {
    background-image: url(../assets/img/pipe_logo.jpg);
    height: 100%;
    background-size: cover;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .bg {
      height: 100%;
      width: 100%;
      background: rgba(218, 218, 218, .5);
      position: absolute;
      top: 0;
      left: 0;
    }

    .header {
      width: 100%;
      // padding-top: calc(50vh - 350px);
      padding-bottom: 10px;
      position: relative;
      z-index: 11111;

      .imgurl {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 300px;
        }
      }

      h2 {
        color: #08459a;
        font-size: 34px;
        margin: 30px 0;
        font-weight: 400;
        text-align: center;
        line-height: 40px;
      }
    }

    .LoginBody {
      width: 450px;
      margin: 0 auto;
      background-color: rgb(0, 164, 222);
    //   box-shadow: 0 0 20px #bcc552;
      padding: 20px 50px;
      border-radius: 10px;
      position: relative;
      z-index: 1111;

      .Login-button {
        cursor: pointer;
        width: 80%;
        text-align: center;
        padding: 10px 0px;
        background-color: #c6e0cd;
        margin: 0 auto;
        color: rgb(0, 164, 222);
        font-size: 14px;
        border-radius: 25px;

        &:active {
          opacity: 0.8;
        }
      }
    }

    .footer {
      // color: #ffffff;
      position: fixed;
      bottom: 0px;
      width: 100%;
      padding: 10px;

      p {
        text-align: center;
      }
    }
  }
</style>
