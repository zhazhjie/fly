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
import Empty from './empty.vue';
import Number from './number.vue';
import InputNumber from './input-number';
import DatePicker from './date-picker';
import AreaPicker from './area-picker';
import Carousel from './carousel';
import CarouselItem from './carousel/carousel-item';
import Sort from './sort';
import Rate from './rate';
import NumberKeyboard from './number-keyboard';
import Skeleton from './skeleton';
import ImgClip from './img-clip';
import Input2 from './input-2';
import Picker from './picker';
import InfiniteLoad from './infinite-load';
import PayBox from './pay-box';
import Title from './title';
import View from './view';
import Upload from './upload';
import Loading1 from './loading/loading-1';
import Loading2 from './loading/loading-2';
import Loading3 from './loading/loading-3';
import './msg';
import './loading';
import '../css/common.scss';
import "../css/animate.scss";

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
  Vue.component(Empty.name, Empty);
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
  Vue.component(ImgClip.name, ImgClip);
  Vue.component(Input2.name, Input2);
  Vue.component(Picker.name, Picker);
  Vue.component(InfiniteLoad.name, InfiniteLoad);
  Vue.component(PayBox.name, PayBox);
  Vue.component(Title.name, Title);
  Vue.component(View.name, View);
  Vue.component(Upload.name, Upload);
  Vue.component(Loading1.name, Loading1);
  Vue.component(Loading2.name, Loading2);
  Vue.component(Loading3.name, Loading3);
};

export default flyUI;
