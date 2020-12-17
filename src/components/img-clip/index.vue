<template>
  <span></span>
</template>

<script>
import Crop from "xcrop";

export default {
  name: "f-img-clip",
  props: {
    file: {
      type: File,
    },
    showFlag: {
      type: Boolean,
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
  },
  components: {},
  data() {
    return {}
  },
  watch: {
    showFlag() {
      if (this.showFlag) {
        this.loadImg();
      }
    }
  },
  methods: {
    loadImg() {
      this.crop.load(this.file);

    },
    initCrop() {
      this.crop = new Crop({
        confirmText: "裁剪"
      });
      this.crop.on('cancle', crop => {
        crop.hide();
        this.$emit('cancleCrop');
      })
      this.crop.on('confirm', crop => {
        crop.hide();
        let file = crop.get({
          width: this.width,
          height: this.height,
          type: this.fileType
        })
        this.$emit('submitCrop', file);
      })
    }
  },
  mounted() {
    this.initCrop();
  },
}
</script>

<style lang="scss" scoped>

</style>

