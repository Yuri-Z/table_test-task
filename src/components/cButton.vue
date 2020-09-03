<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>

<script>
  export default {
    name: "cButton",
    props: {
      type: {default: 'default'},
      round: {type: Boolean}
    },
    computed: {
      buttonClass() {
        return `c-button c-button_color_${this.type}`
      }
    }
  }
</script>

<style lang="scss">
  .c-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;

    &_color {
      &_default {
        &:hover {
          color: #409eff;
          border-color: #c6e2ff;
          background-color: #ecf5ff;
        }
      }

      &_primary {
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;

        &:hover {
          background: #66b1ff;
          border-color: #66b1ff;
          color: #fff;
        }
      }

      &_success {
        color: #fff;
        background-color: #67c23a;
        border-color: #67c23a;

        &:hover {
          background: #85ce61;
          border-color: #85ce61;
          color: #fff;
        }
      }

      &_info {
        color: #fff;
        background-color: #909399;
        border-color: #909399;

        &:hover {
          background: #a6a9ad;
          border-color: #a6a9ad;
          color: #fff;
        }
      }

      &_warning {
        color: #fff;
        background-color: #e6a23c;
        border-color: #e6a23c;

        &:hover {
          background: #ebb563;
          border-color: #ebb563;
          color: #fff;
        }
      }

      &_danger {
        color: #fff;
        background-color: #f56c6c;
        border-color: #f56c6c;

        &:hover {
          background: #f78989;
          border-color: #f78989;
          color: #fff;
        }
      }
    }


    &_shape {
      &_round {
        border-radius: 20px;
        padding: 12px 23px;
      }

      &_circle {
        border-radius: 50%;
        padding: 12px;
      }
    }
  }
</style>