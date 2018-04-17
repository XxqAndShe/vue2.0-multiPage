<template>
  <el-table :data="data" :show-summary="isTotlle" :summary-method="getSummaries" ref="multipleTable">
    <el-table-column
      v-if = "multiSelect"
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column v-for="(column, index) in columns" :key="index" :prop="column.prop" :label="column.label"></el-table-column>
  </el-table>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import notice from '../utils/notice.js'

Vue.use(ElementUI)

export default {
  name: 'layout-table',
  data () {
    return {
    }
  },
  // 接收的参数及说明
  props: {
    columns: Array, // header
    data: Array, // 表格数据
    multiSelect: {
      type: Boolean,
      default: true // 默认有选择框
    },
    isTotlle: Boolean
  },
  mounted () {
    console.log(typeof this.isTotlle)
  },
  methods: {
    getSummaries (param) {
      return notice.getSummaries(param, [1])
    }
  }
}
</script>

<style lang="less">
@import "../styles/variable.less";
</style>
