<template>
  <div  class="wrapper" align="center">
    <div class="pag nes-container is-rounded">
      <div class="inner-container">
        <span 
          v-for="page in pagesList" 
          :key="page" 
          @click="$emit('goToPage', page)"
          :class="page == currentPage ? 'current-page nes-btn is-primary' : 'page'"
          class="pag-item">
            {{page}}
        </span>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginationElement',
  props: {
    pagesNumber: {
      type: Number,
      required: true
    },

    currentPage: {
      type: Number,
      required: true
    },

    pagesAround: {
      type: Number,
      reuired: false,
      default: 5
    }
  },

  data() {
    return {



    }
  },

  computed: {
    pagesList() {
      let pagesList = [this.currentPage];
      for(let i = this.currentPage + 1; i <= this.currentPage + this.pagesAround; i++ ) {
        if(i > this.pagesNumber) {
          break;
        }

        pagesList.push(i)
      }

      for(let i = this.currentPage - 1; i >= this.currentPage - this.pagesAround; i--) {
        if(i < 1) {
          break;
        }
        pagesList.unshift(i);
      } 
      return pagesList;
    }
  }
}
</script>

<style scoped>
  .wrapper {
    border: none;
    padding: 0;
    display: block;
    text-align: center;
    margin: 0 auto;
  }

  .pag {
    padding: 0 !important; 
    display: inline-block;
    width: auto;
    margin: 0 auto;
  }

  .page {
    vertical-align: center;
    padding: 5px 10px;
    display: inline-block;
    /* height: 50px; */
    /* border-left: 1px black solid; */
    border-right: 2px black solid;
    margin-right: -2px
    
  }

  .pag-item {
    vertical-align: center;
    height: 40px;
    padding: 5px 10px;
    display: inline-block;
    /* height: 50px; */
    /* border-left: 1px black solid; */
    /* border-right: 2px black solid; */
    /* margin-right: -2px */
    box-sizing: border-box;
  }

  .page:last-child {
    border: none;
  }
</style>