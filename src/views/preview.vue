/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-02-27 09:17:42
* @version: 1.0
*/

<template>
  <f-view title="预览" id="index">
    <f-list :loading="loading" :eof="eof" @refresh="refresh" @loadMore="loadMore" :data-length="1">
      <div class="content">
        <div class="item-title">按钮</div>
        <f-button>按钮</f-button>
        <f-button type="plain">按钮</f-button>
        <f-button round>按钮</f-button>
        <f-button type="text">按钮</f-button>
        <p style="height: .1rem"></p>
        <f-button color="green">按钮</f-button>
        <f-button color="blue">按钮</f-button>
        <f-button color="orange">按钮</f-button>
        <f-button color="#999">按钮</f-button>
        <div class="item-title">下拉选择框</div>
        <f-select :list="[1,2,3]" v-model="selectVal"></f-select>
        <div class="item-title">复选框</div>
        <f-checkbox :label="1" v-model="checkboxVal">1</f-checkbox>
        <f-checkbox :label="2" v-model="checkboxVal">2</f-checkbox>
        <f-checkbox :label="3" v-model="checkboxVal" disabled>3</f-checkbox>
        <div class="item-title">单选框</div>
        <f-radio :label="1" v-model="radioVal">1</f-radio>
        <f-radio :label="2" v-model="radioVal">2</f-radio>
        <f-radio :label="3" v-model="radioVal" disabled>3</f-radio>
        <div class="item-title">开关</div>
        <f-switch v-model="switchVal">{{switchVal}}</f-switch>
        <f-switch v-model="switchVal" disabled>{{switchVal}}</f-switch>
        <div class="item-title">输入框</div>
        <f-input placeholder="请输入"></f-input>
        <div class="item-title">输入框2</div>
        <f-input-2 placeholder="请输入"></f-input-2>
        <div class="item-title">加减</div>
        <f-number v-model="numVal"></f-number>
        <div class="item-title">数字小键盘</div>
        <f-input placeholder="点击弹出小键盘" readonly v-model="keyboardVal" @focus="keyboardFlag=true"></f-input>
        <f-number-keyboard :show-flag.sync="keyboardFlag" v-model="keyboardVal">数字小键盘</f-number-keyboard>
        <div class="item-title">评分</div>
        <f-rate v-model="score"></f-rate>
        <div class="item-title">消息提示</div>
        <f-button @click="showMsg({text:'这是一段消息',type:Math.round(Math.random()*3)})">消息提示</f-button>
        <div class="item-title">全局加载</div>
        <f-button @click="handleShowLoading">全局加载</f-button>
        <div class="item-title">弹出层</div>
        <f-button @click="popupFlag=true">弹出层</f-button>
        <f-popup :show-flag.sync="popupFlag">
          <div>弹出层</div>
        </f-popup>
        <div class="item-title">弹出层扩展-确认框</div>
        <f-button @click="$confirm('666')">确认框</f-button>
        <div class="item-title">对话框</div>
        <f-button @click="dialogFlag=true">对话框</f-button>
        <f-dialog :width="300" :height="250" reset :show-flag.sync="dialogFlag">
          <p>按住头部可拖拽、右下角放大缩小、可最大化</p>
        </f-dialog>
        <div class="item-title">加载中</div>
        <f-spin></f-spin>
        <div class="item-title">拾取器</div>
        <f-button @click="pickerFlag=true">拾取器</f-button>
        <f-picker :show-flag.sync="pickerFlag" :data-list="[[1,2,3,4,5],['一','二','三','四','五']]"
                  v-model="pickerValues"></f-picker>
        <div class="item-title">时间选择器</div>
        <f-button @click="datePickerFlag=true">时间选择器</f-button>
        <f-date-picker :show-flag.sync="datePickerFlag"></f-date-picker>
        <div class="item-title">地区选择器</div>
        <f-button @click="areaPickerFlag=true">地区选择器</f-button>
        <f-area-picker :show-flag.sync="areaPickerFlag"></f-area-picker>
        <div class="item-title">轮播图</div>
        <f-carousel>
          <f-carousel-item v-for="(item,index) in 4" :key="index">
            <div class="item" :style="{background:item%2===0?'#ccc':'#eee'}">{{item}}</div>
          </f-carousel-item>
        </f-carousel>
        <div class="item-title">图片预览</div>
        <img src="../img/404.png" style="width: 1rem;" v-img-preview>
        <div class="item-title">图片裁切</div>
        <input type="file" @change="handleSelectFile"></input>
        <img style="max-width: 100%" v-if="imgData" :src="imgData">
        <f-img-clip :img="imgData" :show-flag.sync="imgClipFlag" @submitClip="e=>imgData=e"></f-img-clip>
        <div class="item-title">上拉加载</div>
        <ul class="data-list">
          <li v-for="item in dataList">{{item}}</li>
        </ul>
      </div>
    </f-list>
  </f-view>
</template>

<script>
  import fUpload from "../components/upload";
  import {fileToDataURL} from "js-utils";
  import FView from "../components/view";

  export default {
    components: {FView, fUpload},
    data() {
      return {
        selectVal: 1,
        checkboxVal: [1],
        radioVal: 1,
        numVal: 1,
        switchVal: true,
        popupFlag: false,
        dialogFlag: false,
        datePickerFlag: false,
        areaPickerFlag: false,
        imgList: [],
        imgClipFlag: false,
        imgData: "",
        score: 2,
        loading: false,
        eof: false,
        dataList: [],
        params: {
          curPage: 1,
          pageSize: 10
        },
        keyboardVal: "",
        keyboardFlag: false,
        pickerValues: [],
        pickerFlag: false
      }
    },
    methods: {
      handleShowLoading() {
        this.showLoading();
        setTimeout(() => {
          this.hideLoading();
        }, 1000)
      },
      handleSelectFile(e) {
        let file = e.target.files[0];
        fileToDataURL(file, data => {
          this.imgData = data;
          this.imgClipFlag = true;
        })
      },
      refresh() {
        this.loading = true;
        this.params.curPage = 1;
        setTimeout(() => {
          this.dataList = [];
          this.loading = false;
        }, 1000)
      },
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let arr = Array.apply(null, {length: 10}).map((v, i) => this.params.curPage * this.params.pageSize + i);
          this.dataList.push(...arr);
          this.loading = false;
          this.params.curPage++;
        }, 1000)
      }
    },
    computed: {},
    mounted() {

    }
  }
</script>

<style scoped>

  #index {
    /*height: 100vh;*/
    background: #fff;
  }

  .content {
    padding: 0.15rem;
  }

  .item-title {
    height: 0.4rem;
    line-height: 0.4rem;
    display: flex;
    align-items: center;
    /* margin-bottom: .1rem; */
    color: rgb(191, 203, 217);
  }

  .item-title::before {
    width: 0.2rem;
    content: '';
    height: 0.01rem;
    border-bottom: 1px dashed #dcdfe6;
    margin-right: 0.1rem;
  }

  .item-title::after {
    flex: 1;
    content: '';
    height: 0.01rem;
    border-bottom: 1px dashed #dcdfe6;
    margin-left: 0.1rem;
  }

  .data-list li {
    height: 0.4rem;
    line-height: 0.4rem;
    padding: 0 0.15rem;
  }

  .data-list li:nth-child(even) {
    background: #eee;
  }

  .item {
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background: #eee;
  }
</style>
