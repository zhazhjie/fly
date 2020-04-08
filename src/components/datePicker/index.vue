<template>
  <div class="date-picker">
    <!--<f-input-->
    <!--readonly-->
    <!--clearable-->
    <!--v-model="formatValue"-->
    <!--@click="showFlag=true"-->
    <!--:placeholder="placeholder">-->
    <!--</el-input>-->
    <f-popup :show-flag="showFlag" @update:showFlag="hidePopup" position="bottom">
      <div class="opt-box">
        <f-button size="mini" type="text" @click="hidePopup">取消</f-button>
        <!--<div>-->
        <!--<f-select-->
        <!--style="width: 1rem;margin-right: 0.05rem"-->
        <!--:list="typeList"-->
        <!--v-model="curType">-->
        <!--</el-select>-->
        <!--<f-checkbox :value="isRange" @input="handleIsRange">范围</el-checkbox>-->
        <!--</div>-->
        <f-button size="mini" round plain @click="changeType" v-if="quickSelect">
          <span>{{curType==="date"?"按日选择":"按月选择"}}</span>
          <i class="cut-btn">&#xe607;</i>
        </f-button>
        <f-button size="mini" type="text" @click="submit">确定</f-button>
      </div>
      <div class="cur-time" v-if="isRange">
        <span
          class="cur-time-item"
          :class="activeTime==='startTime'?'active':''"
          @click="handleChangeActiveTime('startTime')">
          {{formatDate(startTime)}}
        </span>
        <span>至</span>
        <span
          class="cur-time-item"
          :class="activeTime==='endTime'?'active':''"
          @click="handleChangeActiveTime('endTime')">
          {{formatDate(endTime)}}
        </span>
      </div>
      <div class="cur-time" v-else>
        <span class="cur-time-item active">{{formatDate(startTime)}}</span>
      </div>
      <scroll-box>
        <scroll-list :list="yearRange" suffix="年" v-model="time.year" v-if="isRequire.year"></scroll-list>
        <scroll-list :list="monthRange" suffix="月" v-model="time.month" v-if="isRequire.month"></scroll-list>
        <scroll-list :list="dateRange" suffix="日" v-model="time.date" v-if="isRequire.date"></scroll-list>
        <scroll-list :list="hourRange" suffix="时" v-model="time.hour" v-if="isRequire.hour"></scroll-list>
        <scroll-list :list="minuteRange" suffix="分" v-model="time.minute" v-if="isRequire.minute"></scroll-list>
        <scroll-list :list="secondRange" suffix="秒" v-model="time.second" v-if="isRequire.second"></scroll-list>
      </scroll-box>
    </f-popup>
  </div>
</template>

<script>
  import scrollList from "../scroll/scrollList";
  import fPopup from "../popup";
  import fInput from "../input";
  import fSelect from "../select";
  import scrollBox from "../scroll/scrollBox";

  const timeType = ["date", "year", "month", "datetime", "time", "minute", "hour"];
  export default {
    name: "f-date-picker",
    components: {scrollBox, scrollList, fPopup, fInput, fSelect},
    props: {
      //可选值：date,year,month,datetime,time,minute,hour
      type: {
        type: String,
        default: "date"
      },
      format: {
        type: String,
      },
      maxTime: {
        type: [Date, String],
        default: () => {
          let date = new Date();
          date.setFullYear(date.getFullYear() + 10);
          return date;
        }
      },
      minTime: {
        type: [Date, String],
        default: () => {
          let date = new Date();
          date.setFullYear(date.getFullYear() - 10);
          return date;
        }
      },
      value: {
        type: [Date, String, Array],
        default: () => new Date()
      },
      placeholder: {
        type: String,
      },
      showFlag: {
        type: Boolean,
        default: false
      },
      range: {
        type: Boolean,
        default: false
      },
      yearStep: {
        type: Number,
        default: 1
      },
      monthStep: {
        type: Number,
        default: 1
      },
      dateStep: {
        type: Number,
        default: 1
      },
      hourStep: {
        type: Number,
        default: 1
      },
      minuteStep: {
        type: Number,
        default: 1
      },
      secondStep: {
        type: Number,
        default: 1
      },
      quickSelect: {
        type: Boolean,
        default: false
      },
      limitCurMonth: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        curType: "",
        isRange: false,
        time: {
          year: 0,
          month: 0,
          date: 0,
          hour: 0,
          minute: 0,
          second: 0
        },
        baseMonth: 12,
        baseDate: 31,
        baseHour: 24,
        baseMinute: 60,
        baseSecond: 60,
        yearRange: [],
        monthRange: [],
        dateRange: [],
        hourRange: [],
        minuteRange: [],
        secondRange: [],
        maxTimeObj: null,
        minTimeObj: null,
        startTime: null,
        endTime: null,
        activeTime: "startTime",
        typeList: [
          {text: "按日选择", value: "date"},
          {text: "按月选择", value: "month"},
          {text: "按年选择", value: "year"}
        ]
      }
    },
    watch: {
      showFlag: function (value) {
        this.initTime();
      },
      time: {
        handler: function (val, oldVal) {
          let {year, month = 1, date = 1, hour = 0, minute = 0, second = 0} = val;
          this[this.activeTime] = new Date(year, month - 1, date, hour, minute, second);
          if (this.startTime > this.endTime) {
            if (this.activeTime === "startTime") {
              this.endTime = this.startTime;
            } else {
              this.startTime = this.endTime;
            }
          } else if (this.limitCurMonth) {
            if (this.activeTime === "startTime") {
              this.endTime = this.startTime;
            }
          }
        },
        deep: true
      },
      "time.year": function (val, oldVal) {
        let condition = this.resetCondition("year");
        condition = oldVal === this.baseTime.maxYear || oldVal === this.baseTime.minYear || condition;
        if (condition || this.baseTime.curMonth === 2) {
          if (condition) this.setMonth();
          this.setDate();
          if (condition) {
            this.setHour();
            this.setMinute();
            this.setSecond();
          }
        }
      },
      "time.month": function () {
        this.setDate();
        if (this.resetCondition("month")) {
          this.setHour();
          this.setMinute();
          this.setSecond();
        }
      },
      "time.date": function () {
        if (this.resetCondition("date")) {
          this.setHour();
          this.setMinute();
          this.setSecond();
        }
      },
      "time.hour": function () {
        if (this.resetCondition("hour")) {
          this.setMinute();
          this.setSecond();
        }
      },
      "time.minute": function () {
        if (this.resetCondition("minute")) {
          this.setSecond();
        }
      },
      type: function () {
        this.curType = timeType.includes(this.type) ? this.type : "date";
        if (!this.initFlag) return;
        if (!this.monthRange.length) {
          this.setMonth();
        }
        if (!this.dateRange.length) {
          this.setDate();
        }
      },
      range: function () {
        this.isRange = this.range;
        if (!this.initFlag) return;
        if (this.isRange && !this.endTime) {
          this.endTime = this.startTime;
        }
      }
    },
    computed: {
      defaultFormat() {
        if (this.format) return this.format;
        switch (this.curType) {
          case "date":
            return "yyyy-MM-dd";
          case "month":
            return "yyyy-MM";
          case "year":
            return "yyyy";
          case "datetime":
            return "yyyy-MM-dd hh:mm:ss";
          case "time":
            return "hh:mm:ss";
          case "minute":
            return "hh:mm";
          case "hour":
            return "hh";
        }
      },
      curTime() {
        return this[this.activeTime];
      },
      baseTime() {
        let minTime = this.minTimeObj;
        let maxTime = this.maxTimeObj;
        let curTime = this.time;
        return {
          minYear: minTime.getFullYear(),
          maxYear: maxTime.getFullYear(),
          curYear: curTime.year,
          minMonth: minTime.getMonth() + 1,
          maxMonth: maxTime.getMonth() + 1,
          curMonth: curTime.month,
          minDate: minTime.getDate(),
          maxDate: maxTime.getDate(),
          curDate: curTime.curDate,
          minHour: minTime.getHours(),
          maxHour: maxTime.getHours(),
          curHour: curTime.hour,
          minMinute: minTime.getMinutes(),
          maxMinute: maxTime.getMinutes(),
          curMinute: curTime.minute,
          minSecond: minTime.getSeconds(),
          maxSecond: maxTime.getSeconds(),
          curSecond: curTime.second
        }
      },
      isRequire() {
        let year, month, date, hour, minute, second;
        switch (this.curType) {
          case "date":
            year = month = date = true;
            break;
          case "month":
            year = month = true;
            break;
          case "year":
            year = true;
            break;
          case "datetime":
            year = month = date = hour = minute = second = true;
            break;
          case "time":
            hour = minute = second = true;
            break;
          case "minute":
            hour = minute = true;
            break;
          case "hour":
            hour = true;
            break;
        }
        return {
          year, month, date, hour, minute, second
        }
      },
      isLeapYear() {
        let curYear = this.baseTime.curYear;
        return (curYear % 4 === 0 && curYear % 100 !== 0) || curYear % 400 === 0;
      },
      compare() {
        let {minYear, maxYear, curYear, minMonth, maxMonth, curMonth, minDate, maxDate, curDate, minHour, maxHour, curHour, minMinute, maxMinute, curMinute} = this.baseTime;
        let sameMinYear = minYear === curYear;
        let sameMaxYear = maxYear === curYear;
        let sameMinMonth = minMonth === curMonth && sameMinYear;
        let sameMaxMonth = maxMonth === curMonth && sameMaxYear;
        let sameMinDate = minDate === curDate && sameMinMonth;
        let sameMaxDate = maxDate === curDate && sameMaxMonth;
        let sameMinHour = minHour === curHour && sameMinDate;
        let sameMaxHour = maxHour === curHour && sameMaxDate;
        let sameMinMinute = minMinute === curMinute && sameMinHour;
        let sameMaxMinute = maxMinute === curMinute && sameMaxHour;
        return {
          sameMinYear,
          sameMaxYear,
          sameMinMonth,
          sameMaxMonth,
          sameMinDate,
          sameMaxDate,
          sameMinHour,
          sameMaxHour,
          sameMinMinute,
          sameMaxMinute,
          sameYear: sameMinYear && sameMaxYear,
          sameMonth: sameMinMonth && sameMaxMonth,
          sameDate: sameMinDate && sameMaxDate,
          sameHour: sameMinHour && sameMaxHour,
          sameMinute: sameMinMinute && sameMaxMinute
        }
      },
    },
    methods: {
      submit() {
        let startTime = this.formatDate(this.startTime);
        if (this.isRange) {
          let endTime = this.formatDate(this.endTime);
          let result = [startTime, endTime];
          this.$emit("input", result);
          this.$emit("submit", result);
          // console.log(result);
        } else {
          this.$emit("input", startTime);
          this.$emit("submit", startTime);
          // console.log(startTime);
        }
        this.hidePopup();
      },
      hidePopup() {
        this.$emit('update:showFlag', false);
      },
      handleIsRange(value) {
        this.$emit("input", "");
        this.isRange = value;
        if (this.isRange && !this.endTime) {
          this.endTime = this.getDateObj();
        }
      },
      changeType() {
        this.$emit("input", "");
        this.curType = this.curType === "date" ? "month" : "date";
        this.isRange = this.curType === "date";
        if(this.curType === "month") this.handleChangeActiveTime("startTime");
        // if (this.isRange && !this.endTime) {
        //   this.endTime = this.getDateObj();
        // }
        // if (!this.dateRange.length) {
        //   this.setDate();
        // }
      },
      toString(value) {
        return Object.prototype.toString.call(value);
      },
      getDateObj(value) {
        if (this.toString(value) === "[object Date]") {
          return value;
        } else if (this.toString(value) === "[object String]" && value !== "") {
          let arr = value.split(/[-/ :]/);
          let d = new Date();
          let year = d.getFullYear();
          let month = d.getMonth();
          let date = d.getDate();
          switch (this.curType) {
            case "date":
              return new Date(arr[0], arr[1] - 1, arr[2]);
            case "month":
              return new Date(arr[0], arr[1] - 1, 1);
            case "year":
              return new Date(arr[0], 0, 1);
            case "datetime":
              return new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
            case "time":
              return new Date(year, month, date, arr[0], arr[1], arr[2]);
            case "minute":
              return new Date(year, month, date, arr[0], arr[1], 0);
            case "hour":
              return new Date(year, month, date, arr[0], 0, 0);
          }
        } else {
          return new Date();
        }
      },
      resetCondition(time) {
        let key = time.substr(0, 1).toUpperCase() + time.substr(1);
        if (this.compare["sameMin" + key] || this.compare["sameMax" + key] || this[time + "Range"].length < this["base" + key]) {
          return true;
        }
      },
      setCurTime(activeTime) {
        this.time.year = activeTime.getFullYear();
        this.time.month = activeTime.getMonth() + 1;
        this.time.date = activeTime.getDate();
        this.time.hour = activeTime.getHours();
        this.time.minute = activeTime.getMinutes();
        this.time.second = activeTime.getSeconds();
      },
      handleChangeActiveTime(activeTime) {
        this.activeTime = activeTime;
        this.setCurTime(this[activeTime]);
        if (this.limitCurMonth) {
          this.setYear();
          this.setMonth();
          this.$nextTick(() => {
            this.$refs.year.setScrollTop();
            this.$refs.month.setScrollTop();
          });
        }
      },
      initTime() {
        if (!this.showFlag) return;
        this.curType = timeType.includes(this.type) ? this.type : "date";
        if (this.range) {
          if (!(Array.isArray(this.value) || this.value === "")) {
            throw Error("Value must be an array or empty string when props[range] is true.");
          }
          this.startTime = this.getDateObj(this.value[0]);
          this.endTime = this.getDateObj(this.value[1]);
        } else {
          this.startTime = this.getDateObj(this.value);
        }
        this.minTimeObj = this.getDateObj(this.minTime);
        this.maxTimeObj = this.getDateObj(this.maxTime);
        this.isRange = this.range;
        this.setYear();
        this.setCurTime(this.curTime);
        this.setMonth();
        this.setDate();
        this.setHour();
        this.setMinute();
        this.setSecond();
      },
      generateTimeRange(minVal, maxVal, step = 1) {
        let list = [];
        for (let i = minVal; i <= maxVal; i += step) {
          list.push(i);
        }
        return list;
      },
      setTimeRange(time, preTime, start = 1) {
        if (!this.isRequire[time]) return;
        let key = time.substr(0, 1).toUpperCase() + time.substr(1);
        let preKey = preTime.substr(0, 1).toUpperCase() + preTime.substr(1);
        let min = this.baseTime["min" + key];
        let max = this.baseTime["max" + key];
        let result = [];
        switch (true) {
          case this.compare["same" + preKey]:
            result = this.generateTimeRange(min, max, this[time + "Step"]);
            break;
          case this.compare["sameMin" + preKey]:
            result = this.generateTimeRange(min, this["base" + key], this[time + "Step"]);
            break;
          case this.compare["sameMax" + preKey]:
            result = this.generateTimeRange(start, max, this[time + "Step"]);
            break;
          default:
            result = this.generateTimeRange(start, this["base" + key], this[time + "Step"]);
        }
        this[time + "Range"] = result;
      },
      setYear() {
        if (this.limitCurMonth && this.activeTime === "endTime") {
          return this.yearRange = [this.baseTime.curYear];
        }
        this.yearRange = this.generateTimeRange(this.minTimeObj.getFullYear(), this.maxTimeObj.getFullYear(), this.yearStep);
      },
      setMonth() {
        if (this.limitCurMonth && this.activeTime === "endTime") {
          return this.monthRange = [this.baseTime.curMonth];
        }
        this.setTimeRange("month", "year");
      },
      setDate() {
        if (!this.isRequire.date) return;
        let {curMonth} = this.baseTime;
        if (curMonth === 2) {
          if (this.isLeapYear) {
            this.baseDate = 29;
          } else {
            this.baseDate = 28;
          }
        } else if ((curMonth <= 7 && curMonth % 2 !== 0) || (curMonth > 7 && curMonth % 2 === 0)) {
          this.baseDate = 31;
        } else {
          this.baseDate = 30;
        }
        this.setTimeRange("date", "month");
      },
      setHour() {
        this.setTimeRange("hour", "date", 0);
      },
      setMinute() {
        this.setTimeRange("minute", "hour", 0);
      },
      setSecond() {
        this.setTimeRange("second", "minute", 0);
      },
      formatDate(date) {
        if (!date) return "";
        let fmt = this.defaultFormat;
        let o = {
          "M+": date.getMonth() + 1,                 //月份
          "d+": date.getDate(),                    //日
          "h+": date.getHours(),                   //小时
          "m+": date.getMinutes(),                 //分
          "s+": date.getSeconds(),                 //秒
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度
          "S": date.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      },
    },
    mounted() {
      this.initTime();
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

  .cut-btn {
    font-family: "iconfont-common";
    margin-left: 0.05rem;
  }

  .cur-time {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.15rem 0 0.05rem;
  }

  .cur-time-item {
    color: $gray;
    border-bottom: 1px solid $gray;
    height: 0.45rem;
    line-height: 0.45rem;
    padding: 0 0.05rem;
    font-size: 0.15rem;
    margin: 0 0.1rem;
  }

  .active {
    color: $primary;
    border-bottom: 1px solid $primary;
  }
</style>
<style>
  .date-picker {
    display: inline-block;
  }

  .date-picker .popup.bottom {
    padding: 0;
    border-radius: 0.1rem 0.1rem 0 0;
  }

  .date-picker .close,
  .date-picker .popup-title {
    display: none;
  }
</style>
