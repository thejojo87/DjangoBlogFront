<template>
  <div id="EditorList" ref="editor">
    <div  id="newEditor" v-if="getActiveBlog">
      <div id="newEditBarTitle">
        <el-input :value="title" @input="editAndSaveTitle" class="note_name mousetrap" name="note_name" type="text" id="note_title" placeholder="请输入文章标题"></el-input>
        <el-input :value="brief" @input="editAndSaveBrief" placeholder="请输入文章简介"></el-input>
      </div>
      <div id="newEditToolbar" >
        <div class="toolbarImage">
          <i class="el-icon-picture"></i>
        </div>
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
          console.log('zzzzzzzzzzzzzzzzzzzzzz')
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
      }),
    },
    methods: {
      ...mapActions([
        'actionUpdateBlog',
      ]),
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
          this.updateBlog(params, 'blog_main');
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
//        this.editor.session.setValue()
//        this.editSession.setValue()
        // 这里要不要加个判断？如果不加判断，那么value改变导致activevalue改变，导致重复刷新。
        if (this.getActiveBlog.blog_main !== this.editSession.getValue()) {
          console.log('nnn')
          this.editor.getSession().setValue(this.getActiveBlog.blog_main);
          this.editor.clearSelection();
        }
      },
    },
    created() {
      console.log('created');
      this.$nextTick(() => {
        this.createEditor();
        // 这是为了刷新
        // this.initEditor();

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

