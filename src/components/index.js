/**
 * @author: zhazhjie
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-09-20 10:25:27
 * @version: 1.0
 */
import Input from './input.vue';
import Radio from './radio.vue';
import Checkbox from './checkbox.vue';
import Switch from './switch.vue';
import Select from './select.vue';
import Button from './button.vue';
import Popup from './popup';
import List from './list.vue';
import Dialog from './dialog.vue';
import NotData from './notData.vue';
import Number from './number.vue';
import InputNumber from './inputNumber';
import DatePicker from './datePicker';
import AreaPicker from './areaPicker';
import Carousel from './carousel';
import CarouselItem from './carousel/carouselItem';
import Sort from './sort';
import Rate from './rate';
import NumberKeyboard from './numberKeyboard';
import Skeleton from './skeleton';
import ImgClip from './imgClip';
import Input2 from './input-2';
import Picker from './picker';
import './msg';
import './loading';
import '../css/common.css'

const flyUI = Object.create(null);
flyUI.install = function (Vue, options) {
  Vue.prototype.$fly = options;
  Vue.component(Input.name, Input);
  Vue.component(Radio.name, Radio);
  Vue.component(Checkbox.name, Checkbox);
  Vue.component(Switch.name, Switch);
  Vue.component(Select.name, Select);
  Vue.component(Button.name, Button);
  Vue.component(Popup.name, Popup);
  Vue.component(List.name, List);
  Vue.component(Dialog.name, Dialog);
  Vue.component(NotData.name, NotData);
  Vue.component(Number.name, Number);
  Vue.component(InputNumber.name, InputNumber);
  Vue.component(DatePicker.name, DatePicker);
  Vue.component(AreaPicker.name, AreaPicker);
  Vue.component(Carousel.name, Carousel);
  Vue.component(CarouselItem.name, CarouselItem);
  Vue.component(Sort.name, Sort);
  Vue.component(Rate.name, Rate);
  Vue.component(NumberKeyboard.name, NumberKeyboard);
  Vue.component(Skeleton.name, Skeleton);
  Vue.component(ImgClip.name,ImgClip);
  Vue.component(Input2.name,Input2);
  Vue.component(Picker.name,Picker);
};
export default flyUI;
