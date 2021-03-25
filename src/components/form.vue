/**
*
* @author zzhijie
* @date 2021-03-25
*/

<template>
  <div class="form">
    <slot></slot>
  </div>
</template>

<script>
import {Validate} from "js-utils/validate";

export default {
  name: "f-form",
  props: {},
  data() {
    return {}
  },
  methods: {
    validate() {
      return new Promise((resolve, reject) => {
        let valid = this.findChild(this.$children);
        if (valid) {
          resolve();
        } else {
          reject();
        }
      });
    },
    findChild(children) {
      let length = children.length;
      for (let i = 0; i < length; i++) {
        let child = children[i];
        let {rules, value, $children} = child;
        if (rules) {
          let valid = this.validRules(rules, value);
          if (!valid) return;
        }
        if (!Validate.isEmpty($children)) {
          let valid = this.findChild($children);
          if (!valid) return;
        }
      }
      return true;
    },
    validRules(rules, value) {
      let length = rules.length;
      for (let i = 0; i < length; i++) {
        let rule = rules[i];
        let {required, validator, message} = rule;
        switch (true) {
          case required:
            if (Validate.isEmpty(value)) {
              return this.$msg.warning(message);
            }
            break;
          case !Validate.isEmpty(validator):
            let valid = validator(value);
            if (!valid) {
              return this.$msg.warning(message);
            }
            break;
        }
      }
      return true;
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>

</style>
