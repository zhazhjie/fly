<template>
  <div class="loading">
    <ul>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "f-loading-3",
    data() {
      return {}
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style scoped>
  .loading {
    text-align: center;

    & ul {
      display: inline-flex;

      & li {
        width: 0.08rem;
        height: 0.08rem;
        background: #ddd;
        border-radius: 50%;
        margin: 0.05rem;
      }

      & li:nth-child(1) {
        animation: swing-1 1.5s linear infinite;
      }

      & li:nth-child(2) {
        animation: swing-2 1.5s linear infinite;
      }

      & li:nth-child(3) {
        animation: swing-3 1.5s linear infinite;
      }
    }
  }

  @keyframes swing-1 {
    0% {
      transform: translateY(50%);
    }
    50% {
      transform: translateY(-50%);
    }
    100% {
      transform: translateY(50%);
    }
  }

  @keyframes swing-2 {
    0% {
      transform: translateY(0);
    }
    25% {
      transform: translateY(-50%);
    }
    75% {
      transform: translateY(50%);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes swing-3 {
    0% {
      transform: translateY(-50%);
    }
    50% {
      transform: translateY(50%);
    }
    100% {
      transform: translateY(-50%);
    }
  }
</style>
