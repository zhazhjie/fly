<template>
  <transition name="slide-down">
    <div class="number-keyboard" ref="keyboard" v-show="showFlag">
      <table class="num-list">
        <tr>
          <td v-for="item in [1,2,3]" @touchstart @click="handleInput(item)">{{ item }}</td>
          <td width="25%" rowspan="2" class="opt-btn delete-btn" @touchstart @click="handleDelete">删除</td>
        </tr>
        <tr>
          <td v-for="item in [4,5,6]" @touchstart @click="handleInput(item)">{{ item }}</td>
        </tr>
        <tr>
          <td v-for="item in [7,8,9]" @touchstart @click="handleInput(item)">{{ item }}</td>
          <td width="25%" rowspan="2" class="opt-btn complete-btn" @touchstart @click="handleSubmit">{{ submitText }}
          </td>
        </tr>
        <tr>
          <td :colspan="pointFlag?2:3" @touchstart @click="handleInput(0)">0</td>
          <td v-if="pointFlag" @touchstart @click="handleInput('.')">.</td>
        </tr>
      </table>
      <div class="modal" @click="done"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "f-number-keyboard",
  props: {
    showFlag: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    },
    maxLength: {
      type: Number,
    },
    submitText: {
      type: String,
      default: "完成"
    },
    beforeClose: {
      type: Function,
    },
    pointFlag: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  watch: {
    showFlag(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.keyboard.focus();
        });
      }
    }
  },
  methods: {
    done() {
      this.$emit("update:showFlag", false);
    },
    handleBlur() {
      if (this.beforeClose) {
        this.beforeClose(this.done);
      } else {
        this.done();
      }
    },
    handleInput(num) {
      if (this.maxLength && this.value.length >= this.maxLength) return;
      this.$emit("input", this.value + num);
    },
    handleDelete() {
      if (this.value.length) {
        this.$emit("input", this.value.slice(0, -1));
      }
    },
    handleSubmit() {
      this.$emit("update:showFlag", false);
      this.$emit("submit", this.value);
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import "../style/number-keyboard";
</style>
