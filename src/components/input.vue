<template>
  <div class="input-wrapper">
    <div class="prefix" v-if="$slots.prefix" ref="prefix">
      <slot name="prefix"></slot>
    </div>
    <textarea
      ref="textarea"
      v-if="type==='textarea'"
      class="input textarea"
      :placeholder="placeholder"
      :class="[color]"
      @click="emitClick"
      @focus="emitFocus"
      @blur="emitBlur"
      @input="emitInput"
      @change="emitChange"
      @keyup="emitKeyup"
      @keydown="emitKeydown"
      :disabled="disabled"
      :readonly="readonly"
      :value="value"
      :rows="rows">
    </textarea>
    <input
      ref="input"
      v-else
      class="input"
      :style="style"
      :type="realType"
      :placeholder="placeholder"
      :class="[getSize,color,{round}]"
      @click="emitClick"
      @focus="emitFocus"
      @blur="emitBlur"
      @input="emitInput"
      @change="emitChange"
      @keyup="emitKeyup"
      @keydown="emitKeydown"
      :disabled="disabled"
      :readonly="readonly"
      :value="value"/>
    <div class="suffix" ref="suffix" v-if="clearable||$slots.suffix">
      <i class="icon-common clear-btn" v-if="clearable" v-show="value" @click="handleClear">&#xe712;</i>
      <span v-if="$slots.suffix">
        <slot name="suffix"></slot>
      </span>
    </div>
  </div>
</template>

<script>
import {mixins} from "./mixins";
import {Validate} from "js-utils/validate";

export default {
  name: "f-input",
  mixins: [mixins],
  props: {
    value: {
      // type: [String, Number, Object]
    },
    type: {
      type: String,
      default: "text"
    },
    size: {
      type: String,
      default: "small"
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: 5
    },
    clearable: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
    },
    maxLength: {
      type: Number,
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    fractionDigits: {
      type: Number,
      validator: function (value) {
        return value >= 0;
      }
    },
    rules: {
      type: Array,
    }
  },
  data() {
    return {
      isFocus: false,
      prevValue: "",
      style: {
        paddingLeft: null,
        paddingRight: null,
      }
    }
  },
  computed: {
    realType() {
      return (this.fractionDigits === void 0 || Validate.isIOS()) ? this.type : "tel";
    }
  },
  methods: {
    focus() {
      this.$refs[this.type === "textarea" ? "textarea" : "input"].focus();
    },
    blur() {
      this.$refs[this.type === "textarea" ? "textarea" : "input"].blur();
    },
    emitClick(e) {
      this.$emit("click", e);
    },
    emitFocus(e) {
      this.isFocus = true;
      this.$emit("focus", e);
    },
    emitBlur(e) {
      this.isFocus = false;
      this.$emit("blur", e);
    },
    emitKeyup(e) {
      this.$emit("keyup", e);
    },
    emitKeydown(e) {
      this.key = e.key;
      this.$emit("keydown", e);
    },
    emitInput(e) {
      let {value = "", validity = {}} = e.target;
      if (this.fractionDigits !== void 0) {
        let match;
        if (this.fractionDigits === 0) {
          match = value.match(new RegExp(`[1-9]+\\d*|0`, 'g'));
        } else {
          match = value.match(new RegExp(`([1-9]\\d*\\.?|0\\.)\\d{0,${this.fractionDigits}}|0`, 'g'));
        }
        // console.log(match, this.prevValue);
        let [val = ""] = match || [];
        let {badInput} = validity;
        if (!badInput) {
          e.target.value = val;
          this.prevValue = val;
        } else {
          e.target.value = this.prevValue;
        }
      }
      if (this.maxLength && value.length > this.maxLength) {
        e.target.value = value.slice(0, -1);
      } else {
        this.$emit("input", e.target.value);
      }
    },
    emitChange(e) {
      this.$emit("change", e.target.value);
    },
    handleClear() {
      this.$emit("input", "");
      this.focus();
    },
    init() {
      this.$nextTick(() => {
        if (this.$refs.prefix) {
          let prefixWidth = this.$refs.prefix.offsetWidth;
          this.style.paddingLeft = prefixWidth + "px";
        }
        if (this.$refs.suffix) {
          let suffixWidth = this.$refs.suffix.offsetWidth;
          this.style.paddingRight = suffixWidth + "px";
        }
        if (this.autofocus) {
          this.focus();
        }
      });
    },
  },
  mounted() {
    this.init();
  }
}
</script>

<style lang="scss" scoped>
@import "../style/input";
</style>
