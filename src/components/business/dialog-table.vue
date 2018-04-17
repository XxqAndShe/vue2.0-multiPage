<template>
  <el-dialog title="是否确认结算以下订单？" width="700px" :visible.sync="dialogTableVisible" :close-on-click-modal="isModal" :show-close="isModal">
    <grid-table :columns='columns' :data='data' :multiSelect="multiSelect" :isTotlle="isTotlle"></grid-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="requestSettlement">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import gridTable from 'components/grid-table.vue'

Vue.use(ElementUI)

Vue.component('grid-table', gridTable)

export default {
  name: 'dialog-table',
  data () {
    return {
      multiSelect: false, // 不需要选择框
      dialogTableVisible: true,
      isTotlle: true,
      isModal: false
    }
  },
  // 接收的参数及说明
  props: {
    columns: Array, // header
    data: Array // 表格数据
  },
  mounted () {

  },
  methods: {
    // 确认结算
    requestSettlement () {
      this.$emit('confirm')
    },
    // 取消
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="less">
</style>
