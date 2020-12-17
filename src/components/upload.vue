<template>
  <div class="upload" @click="emitUpload">
    <slot>
      <span class="gray add-icon" v-if="!loading">+</span>
    </slot>
    <div class="loading-wrapper" v-if="loading">
      <f-loading-2></f-loading-2>
      <!--<div class="gray">上传中...</div>-->
    </div>
    <input ref="file" type="file" accept="image/*" :capture="capture" style="display: none" @change="uploadFile"/>
    <!--<div class="font10 gray">微信分身请用拍照上传</div>-->
    <!--    <f-img-clip :width="maxWidth" :height="maxHeight" :show-flag.sync="showFlag" :img="imgData"-->
    <!--                @submitClip="submitClip"></f-img-clip>-->
  </div>
</template>

<script>
import {fileToDataURL, dataURLtoFile, compressImg} from "js-utils";
import Crop from 'xcrop'

export default {
  name: "f-upload",
  components: {},
  props: {
    maxWidth: {
      type: Number,
    },
    maxHeight: {
      type: Number,
    },
    imgUrl: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clip: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 5
    },
    capture: {
      type: String
    }
  },
  data() {
    return {
      fileName: "",
      loading: false,
      imgData: "",
      showFlag: false,
      uploadConfig: this.$fly.uploadConfig || {},
    }
  },
  methods: {
    uploadImg(file) {
      let fd = new FormData();
      fd.append("file", file);
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let {headers, action} = this.uploadConfig;
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            let {status, response} = xhr;
            if (status === 200) {
              resolve(JSON.parse(response));
            } else {
              reject(response);
            }
          }
        };
        xhr.open('post', action);
        if (headers) {
          for (let key in headers) {
            xhr.setRequestHeader(key, headers[key]);
          }
        }
        xhr.send(fd);
      });
    },
    emitUpload() {
      if (this.disabled || this.loading) return;
      this.$refs.file.click();
    },
    submitClip(data) {
      this.upload(dataURLtoFile(data, this.fileName));
    },
    uploadFile(e) {
      let file = e.target.files[0];
      this.fileName = file.name;
      this.fileType = file.type;
      if (file.size > this.size * 1024 * 1024) {
        return this.$msg.warning('图片大小不能大于' + this.size + 'M');
      }
      if (!/(jpg|jpeg|png)/i.test(file.type)) {
        return this.$msg.warning('图片格式必须为jpg或png');
      }
      if (this.clip) {
        this.crop.load(file);
        this.$refs.file.value = "";
        return;
      }
      if (this.maxWidth || this.maxHeight) {
        let data = {
          file: file,
          maxWidth: this.maxWidth,
          maxHeight: this.maxHeight,
          exportType: "file"
        };
        compressImg(data).then(res => {
          this.upload(res);
        });
      } else {
        this.upload(file);
      }
      this.$refs.file.value = "";
    },
    upload(data) {
      this.loading = true;
      this.uploadImg(data).then(res => {
        this.$msg.success('上传成功！');
        this.$emit("success", res.data);
        this.loading = false;
      })
        .catch(err => {
          this.$msg.error('上传失败！');
          this.loading = false;
        })
    },
    initCrop() {
      this.crop = new Crop({
        confirmText: "裁剪"
      });
      this.crop.on('cancle', crop => {
        crop.hide();
      })
      this.crop.on('confirm', crop => {
        crop.hide();
        let file = crop.get({
          width: this.maxWidth || 300,
          height: this.maxHeight || 300,
          type: this.fileType
        })
        this.upload(file);
      })
    }
  },
  mounted() {
    if (this.clip) {
      this.initCrop();
    }
  }
}
</script>

<style scoped>
.upload {
  display: inline-block;
  border: 1px dashed #ccc;
  width: 1rem;
  height: 1rem;
  border-radius: 0.05rem;
  text-align: center;
  line-height: 0.95rem;
  position: relative;
}

.upload > .gray.add-icon {
  font-size: 0.4rem;
}

.loading-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
