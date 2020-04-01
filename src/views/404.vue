/**
 * @author: zhazhjie
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-09-30 16:00:45
 * @version: 1.0
 */

<template>
  <section id="not-found" class="child-route">
  	<div class="wrap">
  		<div class="font16 gray">OOPS！您访问的页面不存在...</div>
  		<!-- <i class="icon">&#xe61f;</i> -->
      <img class="img" src="@/img/404.png">
  		<f-button class='btn' color='blue' @click='routeBack'>返回</f-button>
  	</div>
  </section>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  components: {

  },
  methods: {

  },
  computed: {

  },
  mounted(){

  }
}
</script>

<style scoped>
.wrap{
	background: #fff;
	height: 100vh;
	text-align: center;
  padding: 0.15rem;
	@apply --flex-center;
}
.icon{
	font-size: 2.5rem;
}
.wrap .btn{
	width: 1rem;
}
.img{
  width: 100%;
  margin: 0.2rem 0;
}
</style>
