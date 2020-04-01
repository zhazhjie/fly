/**
 * @author: zzj
 * @date: 2020-03-12 10:32:53
 * @version: 1.0
 */
import Vue from 'vue'
import {formatAmount, formatPhone} from "js-utils";

Vue.filter('formatAmount', formatAmount);
Vue.filter('formatPhone', formatPhone);
