<template>
  <table class="table">
    <thead>
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th>类型</th>
      <th>可选值</th>
      <th>默认值</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in data">
      <td>{{item.param}}</td>
      <td>{{item.explain}}</td>
      <td>{{item.type}}</td>
      <td>{{item.optionalValue}}</td>
      <td>{{item.defaultValue}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "f-table",
    props: {
      type: String,
      data: Array,
    },
    data() {
      return {}
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .table {
    width: 100%;
    border-collapse: collapse;

    th {
      background: #f9f9f9;
      text-align: left;
    }

    td, th {
      border-bottom: $border;
      padding: 10px;
    }
  }
</style>
