/**
 * @author: zzj
 * @date: 2020-04-02 09:55:40
 * @version: 1.0
 */
export const base =
  `
<f-carousel>
  <f-carousel-item v-for="item in 4" :key="item">
    <div class="item" :style="{background:item%2===0?'#ccc':'#eee'}">{{item}}</div>
  </f-carousel-item>
</f-carousel>
  `;
