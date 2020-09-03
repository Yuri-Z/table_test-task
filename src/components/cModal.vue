<template>
  <div class="modal"
       v-if="isShown"
       @keydown.esc.passive="closeModal"
  >
    <div class="modal__background" @click="closeModal"/>
    <div class="modal__content" :style="contentStyle">
      <div class="modal__header">
        <div class="modal__header-slot">
          <slot name="header"/>
        </div>
        <div class="modal__header-close" @click="closeModal">
          <svg focusable="false" height="100%" data-icon="times" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" ><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" class=""></path></svg>
        </div>
      </div>
      <div class="modal__body">
        <slot name="body"/>
      </div>
      <div class="modal__footer">
        <slot name="footer"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cModal",
    model: {
      prop: 'isShown',
      event: 'change'
    },
    props: {
      width: {default: 'auto'},
      height: {default: 'auto'},
      isShown: {required: true, type: Boolean}
    },
    computed: {
      contentStyle() {
        return `width: ${this.width}; height: ${this.height}`
      }
    },
    methods: {
      closeModal() {
        this.$emit('change', false)
      },
      listener(event) {
        if (event.key === 'Escape') {
          this.closeModal()
        }
      }
    },
    watch: {
      isShown(newValue) {
        if (newValue) {
          document.addEventListener('keydown', this.listener)
        } else {
          document.removeEventListener('keydown', this.listener)
        }
      }
    }
  }
</script>

<style lang="scss">
  .modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &__background {
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.2);
    }
    &__content {
      position: absolute;
      background-color: #fff;
      border-radius: 5px;
      display: flex;
      flex-flow: column;
    }
    &__header {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #eee;
  
      font-size: 20px;
      display: flex;
      align-items: center;
      padding: 0 24px;
      
      &-slot {
        flex-grow: 1;
      }
      &-close {
        padding: 12px;
        height: 40px;
        flex: none;
        display: flex;
        cursor: pointer;
      }
    }
    &__body {
      flex-grow: 1;
      background-color: #fcfcfc;
      padding: 0 24px;
    }
    &__footer {
      border-top: 1px solid #eee;
      width: 100%;
      height: 60px;
      padding: 0 24px;
    }
  }
</style>