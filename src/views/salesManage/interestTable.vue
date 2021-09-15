<template>
  <div>
    <div class="el-table-div">
      <el-table
        :data="interestable"
        border
        height="820px"
        style="width: 100%"
        ref="multipleTables"
      >
        <el-table-column prop="dateStr" label="日期" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="paymentAmt" label="付款" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="receiptAmt" label="收款" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="receiptDesc"
          label="收款用途"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="holdAmt" label="占用金额" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="dayProfit"
          label="当日利息"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    interestable: {
      type: Array
    }
  },
  data() {
    return {
      // interestable: []
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
};
</script>

<style scoped lang="scss"></style>
