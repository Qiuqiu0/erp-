<template>
  <div>
    <div class="el-table-div">
      <el-table
        :data="salesmsg"
        border
        height="820px"
        style="width: 100%"
        ref="multipleTables"
      >
        <el-table-column prop="beginDate" label="起始日" show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column prop="endDate" label="到期日" show-overflow-tooltip>
        </el-table-column> -->
        <!-- <el-table-column
          prop="paymentDate"
          label="付款日期"
          show-overflow-tooltip
        >
        </el-table-column> -->
        <el-table-column prop="wvDate" label="入库日期" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="warehouseName"
          label="仓库"
          show-overflow-tooltip
        >
        </el-table-column>
        <!-- <el-table-column prop="place" label="厂地" show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column prop="goodsName" label="品名" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="goodsSpec" label="规格" show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column
          prop="goodsMaterial"
          label="材质"
          show-overflow-tooltip
        >
        </el-table-column> -->
        <!-- <el-table-column
          prop="packageCode"
          label="钢卷号"
          show-overflow-tooltip
        >
        </el-table-column> -->
        <el-table-column prop="tonQty" label="吨位" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="soQty" label="数量" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="bizType" label="业务类型" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="poUnit" label="采购单位" show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column prop="poPrice" label="采购价格" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="poAmt" label="采购金额" show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column prop="soUnit" label="销售单位" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="soPrice" label="销售价格" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="soAmt" label="销售金额" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="soDate" label="销售日期" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    salesmsg: {
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
