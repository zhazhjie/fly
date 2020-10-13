/**
 * @author: zzj
 * @date: 2020-05-09 08:58:40
 * @version: 1.0
 */
import {Validate} from "js-utils/validate";

export const mixins = {
  methods: {
    changeNum(isAdd, e) {
      if (this.disabled) return;
      let value;
      if (isAdd) {
        value = this.value >= this.maxValue ? this.maxValue : (+this.value).add(this.step);
        this.$emit('add', {value, e});
      } else {
        value = this.value <= this.minValue ? this.minValue : (+this.value).subtract(this.step);
        this.$emit('subtract', {value, e});
      }
      this.$emit('input', value);
    },
    setValue(e) {
      let value = +e.target.value;
      if (!Validate.isEmpty(e.target.value) && value >= this.minValue && value <= this.maxValue) {
        let fold = value.divide(this.step);
        if (fold % 1 === 0) {
          this.$emit('input', value);
        } else {
          e.target.value = this.value;
        }
      } else {
        e.target.value = this.value;
      }
    }
  }
};
