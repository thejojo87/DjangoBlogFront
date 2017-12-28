<template>
  <div id="EditorList" ref="editor">
    <div  id="newEditor" v-if="getActiveBlog">
      <div id="newEditBarTitle">
        <el-input :value="title" @input="editAndSaveTitle" class="note_name mousetrap" name="note_name" type="text" id="note_title" placeholder="请输入文章标题"></el-input>
        <el-input :value="brief" @input="editAndSaveBrief" placeholder="请输入文章简介"></el-input>
      </div>
      <div id="newEditToolbar" >
        <el-tooltip class="item" effect="dark" content="将图片拖到编辑区域即可上传，或直接粘贴剪贴板里的图片" placement="top-start">
        <div class="toolbarImage">
          <i class="el-icon-picture"></i>
        </div>
        </el-tooltip>

        <el-tooltip v-if="this.$router.currentRoute.name !== 'writerpreview'" class="item" effect="dark" content="切换到预览模式" placement="top-start">
        <div class="toolbarImage" v-on:click="goViewMode(true)">
          <i class="el-icon-view"></i>
        </div>
      </el-tooltip>

        <el-tooltip v-else class="item" effect="dark" content="切换到写作模式" placement="top-start">
          <div class="toolbarImage" v-on:click="goViewMode(false)">
            <i class="el-icon-document"></i>
          </div>
        </el-tooltip>


      </div>
<!--editor部分-->
      <div id="newEditMainbar"
           v-on:paste="">
      </div>
    </div>
    <div id="newEditBackground" v-else="">
      <span>博&nbsp;客</span>
    </div>
  </div>
</template>



<script>
  import { mapGetters, mapActions } from 'vuex';
  import _ from 'lodash';
  import debounce from 'debounce';
  import { updateBlog } from '../../apis/apis';

  export default {
    name: 'EditorList',
    data() {
      return {
        title: '',
        brief: '',
        editor: null,
        editSession: null,
      };
    },
    watch: {
      getActiveBlog(val, oldVal) {
        if (!val) {
        } else {
          // this.editor = null
          // this.editSession = null
          this.title = this.getActiveBlog.title;
          this.brief = this.getActiveBlog.blog_brief;
          // this.initEditor();
        }
      },
    },
    computed: {
      // ...mapGetters 為 ES7 寫法
      ...mapGetters({
        // getBooks是vuex的获取存储的books用的
        getActiveBlog: 'getActiveBlog',
        getActiveBook: 'getActiveBook',
      }),
    },
    methods: {
      ...mapActions([
        'actionUpdateBlog',
      ]),
      goViewMode(toView) {
        let address;
        if (toView) {
          address = '/writer/books/' + this.getActiveBlog.book.toString() + '/blogs/'
            + this.getActiveBlog.id.toString() + '/preview';
        }else {
          address = '/writer/books/' + this.getActiveBlog.book.toString() + '/blogs/'
            + this.getActiveBlog.id.toString();
        }
        this.$router.push(address);
      },
      updateBlog(params, attr) {
        console.log('更新blog');
        updateBlog(params).then((response) => {
          console.log(response.data);
          // 需要保存，更新blog信息
          const Data = {
            data: response.data,
            attribute: attr,
          };
          this.actionUpdateBlog(Data);
        }).catch((error) => {
          console.log(error);
        });
      },
      editAndSaveTitle: _.debounce(function (editedValue) {
        const params = {
          id: this.getActiveBlog.id,
          title: editedValue,
        };
        this.updateBlog(params, 'title');
      }, 1000),
      editAndSaveBrief: _.debounce(function (editedValue) {
        const params = {
          id: this.getActiveBlog.id,
          blog_brief: editedValue,
        };
        this.updateBlog(params, 'blog_brief');
      }, 1000),
      editAndSaveMain: _.debounce(function (editedValue) {
        const params = {
          id: this.getActiveBlog.id,
          blog_main: editedValue,
        };
        this.updateBlog(params, 'blog_main');
      }, 1000),
      /*
        * listen editor event
       */
      editorEvent() {
        this.editSession.on('change', debounce((e) => {
          const content = this.editSession.getValue();
          console.log(content);
          const params = {
            id: this.getActiveBlog.id,
            blog_main: content,
          };
          // 这个判断避免了当editor里赋值的时候触发服务器重新更新
          if (content !== this.getActiveBlog.blog_main) {
            this.updateBlog(params, 'blog_main');
          }
        }, 500));
      },
      createEditor() {
        console.log('新建一个editor')
        this.editor = window.ace.edit('newEditMainbar')
        this.editor.setTheme('ace/theme/chrome')
        this.editSession = this.editor.getSession()
//        this.editSession.reset()
        this.editSession.setMode('ace/mode/markdown')
        this.selection = this.editSession.getSelection()
        this.undoManager = this.editSession.getUndoManager()
        // editor options
//        this.editor.setOption('dragEnabled', true)
        this.editor.$blockScrolling = Infinity
        this.editor.setFontSize(20)
        this.editor.setHighlightActiveLine(true)
        // 打印的线-有必要吗？
        this.editor.setShowPrintMargin(false)
        // 不知道这是什么
//        this.editor.setShowFoldWidgets(false)
        // 自动换行
        this.editSession.setUseWrapMode(true)
        // insert content
//        this.editSession.setValue(this.getCurrentNewArticle.attributes.content)
//        this.editor.setShowFoldWidgets(false)
//        // custom markdown renderer anchor
//        this.markdownAnchor()
//
//        // custom inline style
//        this.markdownInline()
//
        // editor event
//        this.editorEvent()
//
        // editor keybindings
        this.editor.setKeyboardHandler('ace/keyboard/vim')
//        this.editorKeybindings()
        this.editor.focus();
        this.editorEvent();
        // this.editSession.on('change', function(e) {
        //   console.log('88gggggggggg8');
        //   console.log(this.editSession)
        // });
      },
      initEditor() {
        console.log('editor初始化了')
        console.log(this.$router.currentRoute)
        // 这里要不要加个判断？如果不加判断，那么value改变导致activevalue改变，导致重复刷新。
        if (this.getActiveBlog.blog_main !== this.editSession.getValue()) {
          console.log('nnn')
          this.editor.getSession().setValue(this.getActiveBlog.blog_main);
          this.editor.clearSelection();
        }
        if (this.getActiveBlog.title !== this.title) {
          this.title = this.getActiveBlog.title;
        }
        if (this.getActiveBlog.blog_brief !== this.brief) {
          this.brief = this.getActiveBlog.blog_brief;
        }
      },
    },
    created() {
      console.log('created');
      this.$nextTick(() => {
        this.createEditor();
        // 这是为了刷新,还有preview的时候需要数据
        this.initEditor();

      });
    },
    updated() {
      this.$nextTick(() => {
        if (this.editor === null){
          this.createEditor();
        }
        // this.createEditor();
        // 这是为了刷新
        this.initEditor();
      });
    },
    mounted() {
      console.log('mounted');
    },
    destroyed() {
      console.log('destroyed');
    },
  };
</script>

<style>
  @import "../../assets/css/Writer/EditorList.css";
</style>

