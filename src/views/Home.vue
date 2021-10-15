<template>
  <main-task-manager 
    @no-notes-left="onNoNotesLeft"
    @createNote="onNoteCreate"
    @delete-note="onNoteDelete" 
    :notesFrom="parseInt((currentPage - 1) * notesInPage)" 
    :notesNumber="notesInPage"
  />
  <pagination-element @goToPage="onPagGoToPage" :pagesNumber="pagesNumber" :pagesAround="3" :currentPage="parseInt(currentPage)" />
</template>

<script>
import MainTaskManager from '../components/MainTaskManager.vue'
import PaginationElement from '../components/PaginationElement.vue'
import * as api from '@/api.js'
export default {
  name: 'home',
  components: {
    MainTaskManager,
    PaginationElement
  },
  data() {
    return {
      pagesNumber: null,
      currentPage: this.$route.params.page || 1,
      routeParams: this.$route.params,
      notesInPage: null,
    }
  },

  methods: {
    onNoNotesLeft() {
      console.log('hello')
      if(this.currentPage != 1) {
        this.$router.push('/' + (this.currentPage - 1))
      }
    },

    onNoteDelete(key) {
      console.log(key + (this.currentPage - 1) * this.notesInPage)
      api.deleteNote(key + (this.currentPage - 1) * this.notesInPage);
      this.pagesNumber = this.updatePagesNumber();
    },

    onNoteCreate() {
      this.pagesNumber = this.updatePagesNumber();
    },

    updatePagesNumber() {
      return Math.ceil(api.getNotesNumber() / parseInt(this.notesInPage));
    },

    onPagGoToPage(page) {
      this.$router.push('/' + page)
    }
  },

  mounted() {
    this.$watch(
      () => this.$route.params,
      () => {
        let routerPageParam = this.$route.params.page || 1;
        if(routerPageParam <= this.pagesNumber && routerPageParam >= 1) {
          this.currentPage = this.$route.params.page || 1;
        }
      }
    )

    this.notesInPage = 10;
    this.pagesNumber = this.updatePagesNumber();
  }
}
</script>