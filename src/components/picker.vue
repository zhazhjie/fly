<template>
  <div class="picker">
    <f-popup :show-flag="showFlag" @update:showFlag="hidePopup" position="bottom">
      <div class="opt-box">
        <f-button size="mini" type="text" @click="hidePopup">取消</f-button>
        <f-button size="mini" type="text" @click="submit">确定</f-button>
      </div>
      <scroll-box>
        <scroll-list v-for="(list,index) in dataList" :key="index" :list="list" v-model="values[index]"
                     v-bind='$attrs'></scroll-list>
      </scroll-box>
    </f-popup>
  </div>
</template>

<script>
  import ScrollList from "./scroll/scrollList";
  import ScrollBox from "./scroll/scrollBox";

  export default {
    name: "f-picker",
    components: {ScrollBox, ScrollList},
    props: {
      dataList: {
        type: Array
      },
      value: {
        type: Array
      },
      showFlag: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      showFlag: function (value) {
        if (value) {
          this.values = this.value || [];
        }
      },
    },
    data() {
      return {
        values: this.value
      }
    },
    methods: {
      submit() {
        let len = this.dataList.length - this.values.length;
        if (len > 0) {
          this.values.push(...Array(len));
          this.values = this.values.map((v, i) => this.validNull(v) ? this.dataList[i][0] : v);
        }
        // console.log(this.values);
        this.$emit("input", this.values);
        this.$emit("submit", this.values);
        this.hidePopup();
      },
      hidePopup() {
        this.$emit('update:showFlag', false)
      },
      validNull(val) {
        return val === "" || val === undefined || val === null;
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .opt-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.4rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 0 0.1rem;
  }

  .picker >>> .popup.bottom {
    padding: 0;
    border-radius: 0.1rem 0.1rem 0 0;
  }

  .picker >>> .close,
  .picker >>> .popup-title {
    display: none;
  }
</style>
