<template>
  <div class="area-picker">
    <f-popup :show-flag="showFlag" @update:showFlag="hidePopup" position="bottom">
      <div class="opt-box">
        <f-button size="mini" type="text" @click="hidePopup">取消</f-button>
        <f-button size="mini" type="text" @click="submit">确定</f-button>
      </div>
      <scroll-box>
        <scroll-list :list="provinceList" v-model="result.province" v-bind='$attrs'></scroll-list>
        <scroll-list :list="cityList" v-model="result.city" v-bind='$attrs'></scroll-list>
        <scroll-list :list="areaList" v-model="result.area" v-bind='$attrs' v-if="requireArea"></scroll-list>
      </scroll-box>
    </f-popup>
  </div>
</template>

<script>
  import scrollList from "../scroll/scrollList";
  import elPopup from "../popup";
  // import {province as provinceList, city as cityList, area as areaList} from "./areaData";
  import scrollBox from "../scroll/scrollBox";

  export default {
    name: "f-area-picker",
    components: {scrollBox, scrollList, elPopup},
    props: {
      provinceList: {
        type: Array,
        default: () => ([])
      },
      cityList: {
        type: Array,
        default: () => ([])
      },
      areaList: {
        type: Array,
        default: () => ([])
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
          return {value: 'value', text: 'text'}
        }
      },
      requireArea: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        // provinceList: provinceList,
        // cityList: [],
        // areaList: [],
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
        this.setFilterList(cityList, "city", this.value[1], province.value);
        // this.setFilterList(areaList, "area", "", this.result.city ? this.result.city.value : "");
      },
      "result.city": function (city) {
        this.setFilterList(areaList, "area", this.value[2], city ? city.value : "");
      },
      showFlag: function (value) {
        if (value && !this.initFlag) {
          this.initFlag = true;
          this.init();
        }
      },
    },
    methods: {
      submit() {
        let result = [];
        for (let key in this.result) {
          result.push(this.result[key]);
        }
        console.log(result);
        this.$emit("input", result);
        this.$emit("change", result);
        this.hidePopup();
      },
      hidePopup() {
        this.$emit('update:showFlag', false);
      },
      isObj(item) {
        return Object.prototype.toString.call(item) === '[object Object]';
      },
      getValue(item, textFlag) {
        return this.isObj(item) ? item[this.defaultProps[textFlag ? 'text' : 'value']] : item;
      },
      setFilterList(list, key, value, parentId) {
        let result = [];
        let hasValue = false;
        list.forEach(v => {
          if (v.parentId === parentId) {
            if (v.value === value) {
              this.result[key] = v;
              hasValue = true;
            }
            result.push(v);
          }
        });
        this[key + "List"] = result;
        if (!hasValue) {
          this.result[key] = result[0];
        }
        // console.log(key,value)
      },
      init() {
        if (this.showFlag) {
          this.setFilterList(provinceList, "province", this.value[0], 0);
          // this.setFilterList(cityList,"city",this.value[1],this.result.province.value);
          // this.setFilterList(areaList,"area",this.value[2],this.result.city?this.result.city.value:"");
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
