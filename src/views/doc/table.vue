<template>
  <table class="table">
    <thead>
    <tr>
      <th v-for="item in columns">{{item.label}}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in data">
      <td v-for="column in columns">{{item[column.field]}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "f-table",
    props: {
      type: {
        type: String,
        default: "prop"
      },
      data: Array,
    },
    computed: {
      columns() {
        switch (this.type) {
          case "prop":
            return [
              {label: "参数", field: "param"},
              {label: "说明", field: "explain"},
              {label: "类型", field: "type"},
              {label: "可选值", field: "optionalValue"},
              {label: "默认值", field: "defaultValue"},
            ];
          case "event":
            return [
              {label: "事件名称", field: "event"},
              {label: "说明", field: "param"},
            ]
        }
      }
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
