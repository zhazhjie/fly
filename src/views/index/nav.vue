<template>
  <nav class="nav">
    <ul>
      <li :class="path===item.path?'active':''" v-for="item in navList" @click="routeTo(item.path)">{{item.title}}</li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: "f-nav",
    data() {
      return {
        path: "",
        navList: [
          {
            title: "快速上手",
            path: "/"
          },
          {
            title: "Button 按钮",
            path: "/button"
          },
          {
            title: "Radio 单选框",
            path: "/radio"
          },
          {
            title: "Checkbox 多选框",
            path: "/checkbox"
          },
          {
            title: "Switch 开关",
            path: "/switch"
          },
          {
            title: "Select 下拉选择",
            path: "/select"
          },
          {
            title: "Input 输入框",
            path: "/input"
          },
          {
            title: "Picker 拾取器",
            path: "/picker"
          },
          {
            title: "DatePicker 日期选择器",
            path: "/datePicker"
          },
          {
            title: "AreaPicker 区域选择器",
            path: "/areaPicker"
          },
          {
            title: "Carousel 轮播图",
            path: "/carousel"
          },
          {
            title: "ImgClip 图片裁剪",
            path: "/imgClip"
          },
          {
            title: "Loading 加载",
            path: "/loading"
          },
          {
            title: "Msg 消息提示",
            path: "/msg"
          },
          {
            title: "Popup 弹出层",
            path: "/popup"
          },
          {
            title: "Dialog 对话框",
            path: "/dialog"
          },
          {
            title: "InfiniteLoad 无限加载",
            path: "/infiniteLoad"
          },
          {
            title: "List 列表",
            path: "/list"
          },
          {
            title: "Number 加减",
            path: "/number"
          },
          {
            title: "NumberKeyboard 数字小键盘",
            path: "/numberKeyboard"
          },
          {
            title: "Rate 评分",
            path: "/rate"
          },
          {
            title: "Sort 排序",
            path: "/sort"
          },
          {
            title: "Skeleton 骨架",
            path: "/skeleton"
          },
          {
            title: "PayBox 支付选择框",
            path: "/payBox"
          },
          {
            title: "Title 标题",
            path: "/title"
          },
          {
            title: "View 页面",
            path: "/view"
          },
          {
            title: "Upload 上传",
            path: "/upload"
          },
          {
            title: "NotData 无数据",
            path: "/notData"
          },
        ]
      }
    },
    watch: {
      "$route": "getPath"
    },
    methods: {
      getPath() {
        this.path = this.$route.path;
      }
    },
    mounted() {
      this.getPath();
    }
  }
</script>

<style lang="scss" scoped>
  .nav {
    height: calc(100vh - 50px);
    background: #fff;
    width: 220px;
    overflow: auto;
    position: fixed;
    top: 50px;
    left: 0;
    z-index: 2;

    ul {
      padding: 10px 0;
      li {
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        cursor: pointer;

        &:hover {
          color: $primary;
        }

        &.active {
          color: $primary;
        }
      }
    }
  }
</style>
