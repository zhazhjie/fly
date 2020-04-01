/**
 * @author: zzj
 * @date: 2020-03-30 11:02:58
 * @version: 1.0
 */
export const mixins = {
  computed: {
    getSize() {
      return this.size || this.$fly && this.$fly.size || "small";
    },
  }
};
