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
      this.showLoading();
      let file;
      if (typeof this.img === "string") {
        file = dataURLtoFile(this.img, "");
      } else {
        file = this.img;
      }
      this.crop.load(file);
      this.crop.show();
      this.hideLoading();
    },
    initCrop() {
      let {innerWidth} = window;
      let width = innerWidth * 0.9;
      let height = width / (this.width / this.height);
      this.crop = new Crop({
        confirmText: "裁剪",
        border: {
          width,
          height
        }
      });
      this.crop.on('cancle', crop => {
        crop.hide();
        this.$emit('update:showFlag', false);
      })
      this.crop.on('cancel', crop => {
        crop.hide();
        this.$emit('update:showFlag', false);
      })
      this.crop.on('confirm', crop => {
        crop.hide();
        let file = crop.get({
          width: this.width,
          height: this.height,
          type: this.fileType
        })
        this.$emit('update:showFlag', false);
        this.$emit('submitClip', file);
      })
    }
  },
  mounted() {
    this.initCrop();
  },
}
</script>

<style lang="scss">
.crop__handle {
  position: fixed !important;
}
</style>

