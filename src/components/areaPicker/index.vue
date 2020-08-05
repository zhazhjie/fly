<template>
  <div class="area-picker">
    <f-popup :show-flag="showFlag" @update:showFlag="hidePopup" position="bottom">
      <div class="opt-box">
        <f-button size="mini" type="text" @click="hidePopup">取消</f-button>
        <f-button size="mini" type="text" @click="submit">确定</f-button>
      </div>
      <scroll-box>
        <scroll-list :list="provinceFilterList" :default-props="defaultProps" v-model="result.province"
                     v-bind='$attrs'></scroll-list>
        <scroll-list :list="cityFilterList" :default-props="defaultProps" v-model="result.city"
                     v-bind='$attrs'></scroll-list>
        <scroll-list :list="areaFilterList" :default-props="defaultProps" v-model="result.area" v-bind='$attrs'
                     v-if="requireArea"></scroll-list>
      </scroll-box>
    </f-popup>
  </div>
</template>

<script>
  import scrollList from "../scroll/scrollList";
  import elPopup from "../popup";
  import scrollBox from "../scroll/scrollBox";
  import Vue from "vue";

  export default {
    name: "f-area-picker",
    components: {scrollBox, scrollList, elPopup},
    props: {
      provinceList: {
        type: Array,
        default: () => {
          let {areaConfig = {}} = Vue.prototype.$fly;
          let {provinceList = []} = areaConfig;
          return provinceList;
        }
      },
      cityList: {
        type: Array,
        default: () => {
          let {areaConfig = {}} = Vue.prototype.$fly;
          let {cityList = []} = areaConfig;
          return cityList;
        }
      },
      areaList: {
        type: Array,
        default: () => {
          let {areaConfig = {}} = Vue.prototype.$fly;
          let {areaList = []} = areaConfig;
          return areaList;
        }
      },
      showFlag: {
        type: Boolean,
        default: false
      },
      value: {
        type: Array,
        default: () => ([])
      },
      defaultProps: {
        type: Object,
        default: () => {
          return {value: 'value', text: 'text', parentId: 'parentId'}
        }
      },
      requireArea: {
        type: Boolean,
        default: true
      }
    },
    data() {
      // let {provinceList = [], cityList = [], areaList = []} = this.$fly.areaConfig || {};
      return {
        // provinceList,
        // cityList,
        // areaList,
        provinceFilterList: this.provinceList,
        cityFilterList: [],
        areaFilterList: [],
        result: {
          province: "",
          city: "",
          area: "",
        },
        initFlag: false,
      }
    },
    watch: {
      "result.province": function (province) {
        this.setFilterList(this.cityList, "city", this.value[1], province ? province[this.defaultProps.value] : "");
      },
      "result.city": function (city) {
        this.setFilterList(this.areaList, "area", this.value[2], city ? city[this.defaultProps.value] : "");
      },
      showFlag: function (value) {
        if (value && !this.initFlag) {
          this.init();
        }
      },
      provinceList() {
        this.setFilterList(this.provinceList, "province", this.value[0]);
      },
      cityList() {
        let {province} = this.result;
        this.setFilterList(this.cityList, "city", this.value[1], province ? province[this.defaultProps.value] : "");
      },
      areaList() {
        let {city} = this.result;
        this.setFilterList(this.areaList, "area", this.value[2], city ? city[this.defaultProps.value] : "");
      }
    },
    // computed: {
    //   provinceFilterList() {
    //     return this.provinceList;
    //   },
    //   cityFilterList() {
    //     let {province}=this.result;
    //     let parentId=province ? province[this.defaultProps.value] : "";
    //     return this.getFilterList(this.cityList,parentId)
    //   },
    //   areaFilterList() {
    //
    //   }
    // },
    methods: {
      submit() {
        let result = [];
        for (let key in this.result) {
          result.push(this.result[key]);
        }
        // console.log(result);
        this.$emit("input", result);
        this.$emit("submit", result);
        this.hidePopup();
      },
      hidePopup() {
        this.$emit('update:showFlag', false);
      },
      setFilterList(list, key, value, parentId) {
        let filterList = [];
        let hasValue = false;
        list.forEach(v => {
          if (v[this.defaultProps.parentId] === parentId || parentId === void 0) {
            if (v[this.defaultProps.value] === value) {
              this.result[key] = v;
              hasValue = true;
            }
            filterList.push(v);
          }
        });
        this[key + "FilterList"] = filterList;
        if (!hasValue) {
          this.result[key] = filterList[0];
        }
      },
      getFilterList(list, parentId) {
        let filterList = [];
        list.forEach(v => {
          if (v[this.defaultProps.parentId] === parentId) {
            filterList.push(v);
          }
        });
        return filterList;
      },
      init() {
        if (this.showFlag) {
          this.setFilterList(this.provinceList, "province", this.value[0]);
          this.initFlag = true;
        }
      }
    },
    mounted() {
      this.init();
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

  .area-picker >>> .popup.bottom {
    padding: 0;
    border-radius: 0.1rem 0.1rem 0 0;
  }

  .area-picker >>> .close,
  .area-picker >>> .popup-title {
    display: none;
  }
</style>
