<template>
  <div id="BlogList">
    <ul class="list_display" >
      <li :class="{article_active: index === activeBlogIndex}" v-for="(article, index) in getActiveBook.blogs">
        <div @click="goBlog(article,index)" class="new_article_list_item">
          <div class="new_article_list_item_icon">
            <i class="el-icon-document" id="new_article_icon"></i>
            <span id="wordnumber">{{  article.add_time }}</span>
          </div>
          <div class="new_article_list_item_main">
            <p id="new_article_list_item_title">{{  article.title  }}</p>
            <p id="new_article_list_item_content">{{  article.blog_brief }}</p>
          </div>
          <div class="new_article_list_item_gear" v-if="index === activeBlogIndex">

            <el-dropdown v-on:command="handleCommand">
          <span class="el-dropdown-link">
           <i class="el-icon-setting"></i>
          </span>
              <el-dropdown-menu slot="dropdown" trigger="click" >
                <el-popover
                  placement="left-start"
                  width="200"
                  trigger="click">
                  <el-table
                    :data="changeBoookList"
                    @row-click="handleChangeBook"
                    style="width: 100%">
                    <el-table-column
                      label="文集"
                      prop="name"
                      width="200">
                    </el-table-column>
                  </el-table>
                  <el-dropdown-item command="changeBelongBook" slot="reference">移动文章</el-dropdown-item>
                </el-popover>
                <el-dropdown-item command="delete" divided>删除文章</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </div>
        </div>
      </li>

      <el-dialog
        title=""
        :visible.sync="deleteDialogVisible"
        width="30%">
        <span>您确认要删除文章吗？</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteBlog">确 定</el-button>
  </span>
      </el-dialog>

    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { deleteBlog, updateBlog } from '../../apis/apis';

  export default {
    name: 'WriterBookList',
    data() {
      return {
        activeBlogIndex: 0,
        deleteDialogVisible: false,
        changeBoookList: [],
      };
    },
    watch: {
      '$route': function (to, from) {
        this.setActiveBlog();
      },
    },
    computed: {
      ...mapGetters({
        getBooks: 'getBooks',
        getActiveBook: 'getActiveBook',
        getActiveBlog: 'getActiveBlog',
        // getCurrentArticleIndex: 'getCurrentArticleIndex'
      }),
    },
    methods: {
      ...mapActions([
        'actionSaveActiveBlog',
        'actionDeleteBlog',
        'actionUpdateBlog',
        'actionSaveActiveBook',
      ]),
      handleChangeBook(row) {
        console.log(row)
        console.log(row.id);
        console.log(this.getActiveBlog.id);
        console.log(typeof row.id);
        console.log(typeof this.getActiveBlog.id);
        // updateBlog这个api可以使用。都是一样的patch
        updateBlog({
          id: this.getActiveBlog.id,
          book: row.id,
        }).then((response) => {
          console.log(response);
          // 更新store之前先获取要跳转的网址
          let address;
          address = '/writer/books/' + this.$route.params.bookId;
          // 需要保存，更新blog信息
          const Data = {
            data: response.data,
            attribute: 'book',
            newbook: response.data.book,
            oldbook: Number(this.$route.params.bookId),
          };
          Data.data.book = Number(this.$route.params.bookId);
          this.actionUpdateBlog(Data);
          // 需要跳转网址
          this.$router.push(address);
          // this.actionSaveActiveBook(this.allBooks[this.activeBookIndex]);
        })
          .catch((error) => {
            console.log(error);
          });
      },
      deleteBlog() {
        console.log('deleteblog');
        this.deleteDialogVisible = false;
        console.log(this.getActiveBlog.id);
        // 发送deletebookapi
        deleteBlog(this.getActiveBlog.id, {
          params: {
            id: this.getActiveBlog.id,
          },
        }).then((response) => {
          console.log(response);
          // 这里要去删除vuex里的book
          this.actionDeleteBlog(response.config.params.id);
          // 这里要跳转到writer首页
          const address = '/writer/books/' + this.$route.params.bookId;
          this.$router.push(address);
          this.actionSaveActiveBlog(this.getActiveBook.blogs[0]);
        })
          .catch((error) => {
            console.log(error);
          });
      },
      setActiveBlog() {
        const blogid = this.$route.params.blogId;
        // 设置activebook，如果地址里bookid不存在。那么就为-1
        if (blogid) {
          let index = 0;
          for (let blog of this.getActiveBook.blogs) {
            if (blog.id.toString() === blogid) {
              this.activeBlogIndex = index;
              // 保存 blog
              this.actionSaveActiveBlog(blog);
            }
            index++;
          }
        } else {
          this.activeBlogIndex = 0;
          // 如果变换book后，book为空，那么就activeblog也为空，要不然自动把第一个blog放进active里
          if (this.getActiveBook.blogs[0]) {
            this.actionSaveActiveBlog(this.getActiveBook.blogs[0]);
          } else {
            this.actionSaveActiveBlog();
          }
        }
        // this.actionSaveActiveBook(this.allBooks[this.activeBookIndex]);
      },
      goBlog(item, index) {
        // 意味着没有点击book就直接点击了blog文章列表
        // 要从item获取book的id然后push
        let address;
        if (!this.$route.params.bookId) {
          // 从首页点击了blog
          address = 'writer/books/' + item.book + '/blogs/' + item.id;
        } else {
          if (this.$route.params.blogId) {
            // 从blog里点击了blog
            address = item.id.toString();
          }else {
            // 从book里，点击了blog
            address = item.book + '/blogs/' + item.id;
          }
        }
        this.$router.push(address);
        // this.actionSaveActiveBlog(this.item);
      },
      handleCommand(command) {
        if (command === 'changeBelongBook') {
          // 修改所属的book
          this.changeBoookList = this.getBooks;
          // 这里需要删除掉现有的book，可以用filter
          this.changeBoookList = this.changeBoookList.filter((book) => {
            return book.id !== this.getActiveBook.id;
          });
          console.log('changebook');
          console.log(this.changeBoookList);
        } else {
          // 删除blog
          this.deleteDialogVisible = true;
        }
      },
    },
  };
</script>

<style>
  @import "../../assets/css/Writer/BlogList.css";
</style>

