<template>
  <div id="BookList">
    <ul id="write-book-listul" class="">
      <li class="book" :class=" {book_active: index == activeBookIndex} " v-for="(item,index) in allBooks">
        <p v-on:click="goBook(item,index)">{{ item.name }}</p>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link book-setting">
           <i v-show="index === activeBookIndex" v-on:click="" class="el-icon-setting"></i>
          </span>
          <el-dropdown-menu slot="dropdown" trigger="click" >
            <el-dropdown-item command="changeName">修改名字</el-dropdown-item>
            <el-dropdown-item command="delete" divided>删除文集</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>

      <el-dialog
        title="修改文集名"
        :visible.sync="changeNameDialogVisible"
        width="30%"
        >
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
        <span slot="footer" class="dialog-footer">
  </span>
      </el-dialog>
      <el-dialog
        title=""
        :visible.sync="deleteDialogVisible"
        width="30%">
        <span>您确认要删除文集吗？</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteBook">确 定</el-button>
  </span>
      </el-dialog>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { getBooks, updateBookName, deleteBook } from '../../apis/apis';
  import cookie from '../../assets/js/cookie';

  export default {
    name: 'BookList',
    data() {
      return {
        allBooks: [], // 所有文集
        activeBookIndex: 0,
        changeNameDialogVisible: false,
        deleteDialogVisible: false,
        // 这是修改文集名字
        newBookValidateForm: {
          newBookName: '',
        },
      };
    },
    watch: {
      '$route': function (to, from) {
        console.log('route变化了')
        this.setActiveBook();
      },
      // 观察store里的books，自动更新本地books，在delete或者create的时候自动更新
      getbooks(val, oldVal) {
        this.allBooks = val;
        // 刷新的时候更新activeblog状态
        this.setActiveBook();
      },
    },
    computed: {
      // ...mapGetters 為 ES7 寫法
      ...mapGetters({
        // getBooks是vuex的获取存储的books用的
        getbooks: 'getBooks',
      }),
    },
    methods: {
      ...mapActions([
        'actionSaveBooks',
        'actionUpdateBookName',
        'actionDeleteBook',
        'actionSaveActiveBook',
      ]),
      // 删除文集
      deleteBook() {
        this.deleteDialogVisible = false;
        console.log(this.allBooks[this.activeBookIndex].id);
        // 发送deletebookapi
        deleteBook(this.allBooks[this.activeBookIndex].id, {
          params: {
            id: this.allBooks[this.activeBookIndex].id,
          },
        }).then((response) => {
          console.log(response);
          // 这里要去删除vuex里的book
          this.actionDeleteBook(response.config.params.id);
          // 这里要跳转到writer首页
          const address = '/writer/';
          this.$router.push(address);
        })
          .catch((error) => {
            console.log(error);
          });
      },
      handleCommand(command) {
        console.log(command);
        if (command === 'changeName') {
          this.newBookValidateForm.newBookName = this.allBooks[this.activeBookIndex].name;
          this.changeNameDialogVisible = true;
        } else {
          this.deleteDialogVisible = true;
        }
      },
      // 修改文集名api请求
      changeName(bookid, newname) {
        console.log(bookid, newname);
        updateBookName(bookid, {
          params: {
            name: newname,
            id: bookid,
          },
        }).then((response) => {
          console.log(response);
          // 这里要存储获取到的books数据
          this.actionUpdateBookName(response.data);
          this.allBooks[this.activeBookIndex] = this.getbooks[this.activeBookIndex];
        })
          .catch((error) => {
            console.log(error);
          });
      },
      // 修改文集名字确认
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.changeName(this.allBooks[this.activeBookIndex].id,
              this.newBookValidateForm.newBookName);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        this.$refs[formName].resetFields();
        this.changeNameDialogVisible = false;
      },
      // 修改文集名字重新设置
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.changeNameDialogVisible = false;
      },
      goBook(item, index) {
        // 意味着没有点击book就直接点击了blog文章列表
        // 要从item获取book的id然后push
        let address;
        if (!this.$route.params.bookId) {
          // 从首页直接点击book
          address = 'writer/books/' + item.id;
        } else {
          if (!this.$route.params.blogId) {
            // 从books点击books，blogid不存在
            address = item.id.toString();
          } else {
            // 从blogs点击books
            address = '/writer/books/' + item.id;
          }
        }
        this.$router.push(address);
        // 点击li之后设置activebook
        console.log(item);
        this.activeBookIndex = index;
      },
      getSidebarBooks() {
        let name = cookie.getCookie('name');
        console.log(name);
        getBooks({
          params: {
            username: name,
          },
        }).then((response) => {
          // this.allBooks = response.data.results;
          // 这里要存储获取到的books数据
          this.actionSaveBooks(response.data.results);
        })
          .catch((error) => {
          });
      },
      setActiveBook() {
        const bookid = this.$route.params.bookId;
        // 设置activebook，如果地址里bookid不存在。那么就为-1
        if (bookid) {
          let index = 0;
          for (let book of this.allBooks) {
            if (book.id.toString() === bookid) {
              this.activeBookIndex = index;
            }
            index++;
          }
        } else {
          this.activeBookIndex = 0;
        }
        this.actionSaveActiveBook(this.allBooks[this.activeBookIndex]);
      },
    },
    mounted() {
      // 这里要进行判断，是否为刷新数据，重新获取数据呢.
      if (this.getbooks.length === 0) {
        console.log('8888888888888888888');
        this.getSidebarBooks(); // 获取文集
      } else {
        console.log('gggggggggggg');
        this.allBooks = this.getbooks;
        this.setActiveBook();
      }
      // 刷新也好，从首页进入也好，必须设置activebook
    },
  };
</script>

<style>
  @import "../../assets/css/Writer/BookList.css";
</style>

