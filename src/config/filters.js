/**
 * @author: zzj
 * @date: 2020-03-12 10:32:53
 * @version: 1.0
 */
import Vue from 'vue'
import {Formatter} from "js-utils/formatter";

Vue.filter('formatAmount', Formatter.amount);
Vue.filter('formatPhone', Formatter.phone);
