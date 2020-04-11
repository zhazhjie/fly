/**
 * @author: zzj
 * @date: 2020-04-02 09:55:40
 * @version: 1.0
 */
export const base =
  `
this.$msg.info("普通消息");
this.$msg.success("成功消息");
this.$msg.waring("警告消息");
this.$msg.error("错误消息");
this.showMsg({text:"消息",type:1});  //0普通，1成功，2警告，3错误
  `;
