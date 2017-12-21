<template>
  <div id="Login">
    <div class="c-box bg-box" >
      <div class="login-box clearfix"style="margin-top:10px">
        <div class="fr form-box">
          <h2>帐号登录</h2>
          <el-form :model="loginForm" :rules="this.rules" ref="loginForm">
            <el-form-item label="账号/手机号" prop="name" :label-width="loginFormLabelWidth">
              <el-input v-model="loginForm.name" ></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password" :label-width="loginFormLabelWidth">
              <el-input type="password" v-model="loginForm.password" ></el-input>
            </el-form-item>

            <div class="dialog-footer">
              <el-button @click="resetForm('loginForm')">重 置</el-button>
              <el-button type="primary" @click="submitForm('loginForm')">确 定</el-button>
            </div>
          </el-form>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import cookie from '../../assets/js/cookie';
  import { login } from '../../apis/apis';

  export default {
    data() {
      return {
        // 注册表label宽度
        loginFormLabelWidth: '120px',
        // 注册表
        loginForm: {
          name: '',
          password: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入账号或者手机号', trigger: 'blur' },
            // { validator: this.validatePass2, message: '', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码' },
          ],
        },
        // userName: '',
        // parseWord: '',
        // autoLogin: false,
        // error: false,
        // userNameError: '',
        // parseWordError: '',
      };
    },
    name: 'Login',
    computed: {
    },
    created() {
      // 清除缓存
      cookie.delCookie('token');
      cookie.delCookie('name');
      // 重新触发store
      // 更新store数据
      this.$store.dispatch('actionSetInfo');
    },
    methods: {
      login() {
        const that = this;
        login({
          username: that.loginForm.name, // 当前登录用户名
          password: that.loginForm.password, // 密码
        }).then((response) => {
          console.log('login函数回来了');
          console.log(response);
          // 本地存储用户信息
          cookie.setCookie('name', that.loginForm.name, 7);
          cookie.setCookie('token', response.data.token, 7);
          // 存储在store
          // 更新store数据
          that.$store.dispatch('actionSetInfo');
          // 跳转到首页页面
          this.$router.push({ name: 'Home' });
        })
          .catch((error) => {
            console.log(error);
            // if("non_field_errors" in error){
            //   that.error = error.non_field_errors[0];
            // }
            // if("username" in error){
            //   that.userNameError = error.username[0];
            // }
            // if("password" in error){
            //   that.parseWordError = error.password[0];
            // }
          });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('数据完全合法');
            console.log(this.$refs[formName]);
            console.log(this.loginForm);
            // 运行后台login
            this.login();
          }
        });
      },
    },
  };
</script>

<style>
  @import "../../assets/css/Login.css";

</style>

