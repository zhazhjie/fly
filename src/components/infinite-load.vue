<template>
  <div>
    <slot/>
    <slot name="empty">
      <f-empty v-if='!dataLength&&!loading'>{{emptyText}}</f-empty>
    </slot>
    <div class="load-more" ref="end">
      <f-loading-2 v-show='loading&&!!dataLength'/>
      <div class="font12 gray" v-show='eof&&dataLength'>- END -</div>
    </div>
    <transition name='fade'>
      <f-loading-1 :show-flag='loading&&!dataLength'/>
    </transition>
  </div>
</template>

<script>
  import FLoading1 from "./loading/loading-1";
  import FLoading2 from "./loading/loading-2";

  export default {
    name: "f-infinite-load",
    components: {FLoading2, FLoading1},
    props: {
      loading: {
        type: Boolean,
        default: false,
        required: true
      },
      eof: {
        type: Boolean,
        default: false
      },
      dataLength: {
        type: Number,
        default: 0
      },
      emptyText: {
        type: String,
        default: '-暂无数据-'
      },
      scrollFlag: {
        type: Boolean,
        default: false
      },
      bodyScroll: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        initFlag: false
      }
    },
    methods: {
      init() {
        let intersectionObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.loading && !this.eof && this.initFlag) {
              this.$emit("loadMore");
            }
            this.initFlag = true;
          });
        });
        intersectionObserver.observe(this.$refs.end);
      },
    },
    mounted() {
      this.init();
    },
  }
</script>

<style scoped>
  .load-more {
    text-align: center;
    height: 0.5rem;
    line-height: 0.5rem;
  }
</style>
