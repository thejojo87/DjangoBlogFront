<template>
  <div id="Register">
    <div class="c-box bg-box" >
      <div class="login-box clearfix"style="margin-top:10px">
        <div class="fr form-box">
          <h2>帐号注册</h2>
          <el-form :model="registerForm" :rules="this.rules" ref="registerForm">
            <el-form-item label="账号" prop="name" :label-width="registerFormLabelWidth">
              <el-input v-model="registerForm.name" ></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password" :label-width="registerFormLabelWidth">
              <el-input type="password" v-model="registerForm.password" ></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="passwordConfirm" :label-width="registerFormLabelWidth">
              <el-input type="password" v-model="registerForm.passwordConfirm" ></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email" :label-width="registerFormLabelWidth">
              <el-input v-model="registerForm.email" ></el-input>
            </el-form-item>

            <el-form-item label="手机号码" prop="mobile" :label-width="registerFormLabelWidth">
              <el-input v-model="registerForm.mobile" ></el-input>
            </el-form-item>

            <el-form-item label="性别" :label-width="registerFormLabelWidth" >
              <el-radio-group v-model="registerForm.gender">
                <el-radio  label="male" >男</el-radio>
                <el-radio  label="female">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <div class="dialog-footer">
              <el-button @click="resetForm('registerForm')">重 置</el-button>
              <el-button type="primary" @click="submitForm('registerForm')">确 定</el-button>
            </div>
          </el-form>


        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { register } from '../../apis/apis';
  import cookie from '../../assets/js/cookie';

  export default {
    data() {
      return {
        // 注册表label宽度
        registerFormLabelWidth: '120px',
        // 注册表
        registerForm: {
          name: '',
          password: '',
          passwordConfirm: '',
          email: '',
          mobile: '',
          gender: 'male',
        },
        rules: {
          name: [
            { required: true, message: '请输入注册账号', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
          ],
          passwordConfirm: [
            { validator: this.validatePass2, trigger: 'blur' },
            { required: true, message: '请输入重复密码' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' },
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的11位手机号码' },
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
    name: 'Register',
    computed: {
    },
    methods: {
      // 验证password是否一致
      validatePass2(rule, value, callback) {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('数据完全合法');
            // console.log(this.$refs[formName]);
            // console.log(this.registerForm.gender);
            // 开始注册
            this.submitRegister(formName);
          }
        });
      },
      submitRegister(formName) {
        console.log('开始注册');
        const that = this;
        register({
          username: this.registerForm.name,
          password: this.registerForm.password,
          mobile: this.registerForm.mobile,
          gender: this.registerForm.gender,
          email: this.registerForm.email,
        }).then((response) => {
          console.log('register函数回来了');
          console.log(response);
          // 本地存储用户信息
          cookie.setCookie('name', response.data.username, 7);
          cookie.setCookie('token', response.data.token, 7);
          // 存储在store
          // 更新store数据
          that.$store.dispatch('actionSetInfo');
          // 跳转到首页页面
          this.$router.push({ name: 'Home' });
        })
          .catch((error) => {
            console.log(error);
            let errormessage = '';
            errormessage += error.response.data.username?error.response.data.username[0]:'';
            errormessage += error.response.data.mobile?error.response.data.mobile[0]:'';
            errormessage += error.response.data.email?error.response.data.email[0]:'';
            console.log(errormessage);
            this.$alert(errormessage, '出错了，请修改后重新提交', {
              confirmButtonText: '确定',
            });
          });
      },
    },
  };
</script>

<style>
  @import "../../assets/css/Register.css";
</style>

