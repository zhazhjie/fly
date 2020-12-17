<template>
  <span></span>
</template>

<script>
import Crop from "xcrop";
import {dataURLtoFile} from "js-utils";

export default {
  name: "f-img-clip",
  props: {
    img: {
      type: [File, String],
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
      let file;
      if (typeof this.img === "string") {
        file = dataURLtoFile(this.img,"");
      } else {
        file = this.img;
      }
      this.crop.load(file);
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

