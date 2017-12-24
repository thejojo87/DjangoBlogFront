<template>
  <div id="WriterBookList">
    <div class="home-wrap">
      <a v-on:click="backPage" class="go-home">
        <i class="fa fa-home" aria-hidden="true"></i>
        <span>回首页</span>
      </a>
    </div>
    <div class="new-notebook">
      <a @click="isAddBook = !isAddBook" class="el-icon-plus">
        <i class="fa fa-plus"></i> 新建文集
      </a>
    </div>

    <div class="new-notebook-input" v-if="isAddBook">
      <el-form :model="newBookValidateForm" ref="newBookValidateForm" class="demo-ruleForm">
        <el-form-item
          prop="newBookName"
          :rules="[
      { required: true, message: '文集名不能为空'},
    ]"
        >
          <el-input type="" placeholder="请输入文集名" v-model="newBookValidateForm.newBookName"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('newBookValidateForm')">提交</el-button>
          <el-button @click="resetForm('newBookValidateForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <my-booklist></my-booklist>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import BookList from '../../components/Writer/BookList';
  import { createBook, } from '../../apis/apis';

  export default {
    name: 'WriterBookList',
    data() {
      return {
        isAddBook: false,
        // newBookName: '',
        newBookValidateForm: {
          newBookName: '',
        },
      };
    },
    components: {
      'my-booklist': BookList,
    },
    computed: {},
    methods: {
      ...mapActions([
        'actionCreateBook',
        'actionSaveActiveBook',
      ]),
      goBookPage(bookid) {
        const address =  '/writer/books/' + bookid;
        this.$router.push(address);
      },
      backPage() {
        // 跳转到首页页面
        this.actionSaveActiveBook();
        this.$router.push({name: 'Home'});
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.create(this.newBookValidateForm.newBookName);
            this.resetForm('newBookValidateForm');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.isAddBook = !this.isAddBook;
      },
      create(bookname) {
        console.log('新建一个book');
        console.log(bookname);
        createBook({
          name: bookname,
        }).then((response) => {
          console.log(response.data);
          this.actionCreateBook(response.data[0]);
          this.goBookPage(response.data[0].id);
        }).catch(function (error) {
          console.log(error);
        });
      },
    },
  };
</script>

<style>
  @import "../../assets/css/Writer/WriterBookList.css";
</style>

