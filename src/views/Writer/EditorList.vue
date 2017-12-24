<template>
  <div id="EditorList" ref="editor">
    <div  id="newEditor" v-if="getActiveBlog">
      <div id="newEditBarTitle">
        <el-input v-model="title" placeholder="请输入文章标题"></el-input>
        <el-input v-model="brief" placeholder="请输入文章简介"></el-input>
        <!--<input-->
          <!--v-if="getActiveBlog.title"-->
          <!--@input=""-->
          <!--class="note_name mousetrap" name="note_name" type="text" id="note_title" :value="getActiveBlog.title" >-->
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

  export default {
    name: 'EditorList',
    data() {
      return {
        title: '',
        brief: '',
        editor: null,
      };
    },
    watch: {
      getActiveBlog(val, oldVal) {
        if (!val) {
        } else {
          this.title = this.getActiveBlog.title;
          this.brief = this.getActiveBlog.blog_brief;
          this.initEditor();
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
        // 'actionSaveBooks',
        // 'actionUpdateBookName',
        // 'actionDeleteBook',
        // 'actionSaveActiveBook',
      ]),
      createEditor() {
        console.log('新建一个editor')
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
      },
      initEditor () {
        console.log('editor初始化了')
//        this.editor.session.setValue()
//        this.editSession.setValue()
        // 这里要不要加个判断？
        this.editor.getSession().setValue(this.getActiveBlog.blog_main)
        this.editor.clearSelection()
      },
    },
    created() {
      console.log('aaa');
    },
    updated () {
      console.log(this.editor === null)
      console.log(this.editor)
      this.$nextTick(() => {
        this.createEditor();
        // 这是为了刷新
        this.initEditor();
      });
    },
    mounted() {
      console.log('8888888');
    },
  };
</script>

<style>
  @import "../../assets/css/Writer/EditorList.css";
</style>

