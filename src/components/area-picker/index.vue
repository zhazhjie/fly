<template>
  <div class="area-picker">
    <f-popup :show-flag="showFlag" @update:showFlag="hidePopup" position="bottom">
      <div class="opt-box">
        <f-button size="mini" type="text" @click="hidePopup">取消</f-button>
        <f-button size="mini" type="text" @click="submit">确定</f-button>
      </div>
      <f-scroll-box>
        <f-scroll-list :list="provinceFilterList" :default-props="defaultProps" v-model="result.province"
                       v-bind='$attrs'></f-scroll-list>
        <f-scroll-list :list="cityFilterList" :default-props="defaultProps" v-model="result.city"
                       v-bind='$attrs'></f-scroll-list>
        <f-scroll-list :list="areaFilterList" :default-props="defaultProps" v-model="result.area" v-bind='$attrs'
                       v-if="requireArea"></f-scroll-list>
        <f-scroll-list :list="townFilterList" :default-props="defaultProps" v-model="result.town" v-bind='$attrs'
                       v-if="requireTown"></f-scroll-list>
      </f-scroll-box>
    </f-popup>
  </div>
</template>

<script>

	import Vue from "vue";
	import FScrollBox from "../scroll/scroll-box";
	import FScrollList from "../scroll/scroll-list";

	export default {
		name: "f-area-picker",
		components: {FScrollList, FScrollBox},
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
			townList: {
				type: Array,
				default: () => {
					let {areaConfig = {}} = Vue.prototype.$fly;
					let {townList = []} = areaConfig;
					return townList;
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
			},
			requireTown:{
				type: Boolean,
				default: false
			}
		},
		data() {
			// let {provinceList = [], cityList = [], areaList = []} = this.$fly.areaConfig || {};
			return {
				// provinceList,
				// cityList,
				// areaList,
				// provinceFilterList: this.provinceList,
				// cityFilterList: [],
				// areaFilterList: [],
				result: {
					province: "",
					city: "",
					area: "",
					town:""
				},
				initFlag: false,
			}
		},
		watch: {
			"result.province": function (province) {
				this.setResult(this.cityFilterList, "city", this.value[1]);
			},
			"result.city": function (city) {
				this.setResult(this.areaFilterList, "area", this.value[2]);
			},
			"result.area": function (area) {
				if (this.requireTown){
					this.setResult(this.townFilterList, "town", this.value[3]);
        }
			},
			showFlag: function (value) {
				if (value && !this.initFlag) {
					this.init();
				}
			},
		},
		computed: {
			provinceFilterList() {
				return this.provinceList;
			},
			cityFilterList() {
				let {province} = this.result;
				let parentId = province ? province[this.defaultProps.value] : "";
				return this.getFilterList(this.cityList, parentId);
			},
			areaFilterList() {
				let {city} = this.result;
				let parentId = city ? city[this.defaultProps.value] : "";
				return this.getFilterList(this.areaList, parentId);
			},
			townFilterList() {
				let {area} = this.result;
				let parentId = area ? area[this.defaultProps.value] : "";
				return this.getFilterList(this.townList, parentId);
			}
		},
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
			setResult(list, key, value) {
				if (!value) {
					this.result[key] = list[0];
				} else {
					let curItem = list.find(v => v[this.defaultProps.value] === value);
					this.result[key] = curItem || list[0];
				}
			},
			getFilterList(list, parentId) {
				return list.filter(v => v[this.defaultProps.parentId] === parentId);
			},
			init() {
				if (this.showFlag) {
					this.setResult(this.provinceList, "province", this.value[0]);
					this.setResult(this.cityList, "city", this.value[1]);
					this.setResult(this.areaList, "area", this.value[2]);
					if (this.requireTown){
						this.setResult(this.townList, "town", this.value[3]);
					}
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
