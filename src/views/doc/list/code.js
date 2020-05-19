/**
 * @author: zzj
 * @date: 2020-04-02 09:55:40
 * @version: 1.0
 */
export const base =
  `
<f-list :eof="eof" :loading="loading" :data-length="dataLength" @loadMore="loadMore" @refresh="refresh">
  <div>内容</div>
</f-list>
  `;
export const ext =
  `
this.$confirm("弹出").then(()=>{
  //点击确定后
});

this.$confirm({content:"弹出",loading:true}).then(({hideLoading,done})=>{
  //点击确定后会有loading
  //手动调用hideLoading或done取消
});
  `;
