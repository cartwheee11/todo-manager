<template>
  <dialog class="nes-container is-rounded nes-dialog" id="dialog">
    <form method="dialog">
      <!-- <p class="title">Dialog</p> -->
      <p>{{text}}</p>
      <!-- <menu class="dialog-menu"> -->
        <button class="nes-btn">{{cancelText}}</button> <button @click="$emit('confirm')" class="nes-btn is-primary">{{confirmText}}</button>
      <!-- </menu> -->
    </form>
  </dialog>
</template>

<script>
export default{
  name: "DialogElement",
  props: {
    text: {
      type: String,
      required: false,
      default: 'Подтвердить действие?'
    },

    cancelText: {
      type: String,
      required: false,
      default: 'Отменить'
    },

    confirmText: {
      type: String,
      required: false,
      default: 'Подтвердить'
    }
  },

  data() {
    return {  
      
    }
  }
}
</script>

<style scoped>
#dialog {
  max-width: 500px;
  margin:  0 auto;
  position: fixed;
  /* top: 1000px; */
  top: 100px;
}
</style>