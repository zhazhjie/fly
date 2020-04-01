<template>
  <div class="upload" @click="emitUpload">
    <slot>
      <span class="gray add-icon" v-if="!loading">+</span>
    </slot>
    <div class="loading-wrapper" v-if="loading">
      <f-spin></f-spin>
      <!--<div class="gray">上传中...</div>-->
    </div>
    <input ref="file" type="file" accept="image/*" style="display: none" @change="uploadFile"></input>
    <!--<div class="font10 gray">微信分身请用拍照上传</div>-->
    <img-clip :width="maxWidth" :height="maxHeight" :show-flag.sync="showFlag" :img="imgData" @submitClip="submitClip"></img-clip>
  </div>
</template>

<script>
  import {upload} from "../api/base";
  import {fileToDataURL, compressImg} from "js-utils";
  import ImgClip from "./imgClip/index";

  export default {
    name: "f-upload",
    components: {ImgClip},
    props: {
      maxWidth: {
        type: Number,
        default: 500
      },
      maxHeight: {
        type: Number,
        default: 1000
      },
      imgUrl: {
        type: String,
        default: ""
      },
      disabled: {
        type: Boolean,
        default: false
      },
      clip:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        loading: false,
        imgData:"",
        showFlag:false
      }
    },
    methods: {
      emitUpload() {
        if (this.disabled || this.loading) return;
        this.$refs.file.click();
      },
      submitClip(data){
        this.upload(data);
      },
      uploadFile(e) {
        let file = e.target.files[0];
        if (file.size > 5.5 * 1024 * 1024) {
          return this.showMsg({text: '图片大小不能大于5M', type: 2});
        }
        if (!/(jpg|jpeg|png)/i.test(file.type)) {
          return this.showMsg({text: '图片格式必须为jpg/jpeg/png', type: 2});
        }
        if(this.clip){
          return fileToDataURL(file,data=>{
            this.imgData=data;
            this.showFlag=true;
          })
        }
        let data = {
          file: file,
          maxWidth: this.maxWidth,
          maxHeight: this.maxHeight
        };
        compressImg(data).then(imgData => {
          this.upload(imgData);
        })
          .catch(err => this.$msg.warning('上传失败！'))
      },
      upload(data){
        this.loading = true;
        upload({file: data}).then(res => {
          this.showMsg({text: '上传成功！', type: 1});
          this.$emit("success", res.data);
          this.loading = false;
        })
          .catch(err => this.loading = false)
      }
    },
    mounted() {
      // console.log(this)
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
