<template>
  <div class="input-div">
    <el-form disabled>
      <el-col :span="5" class="el-col el-col-required">
        <label required>背书日期</label>
        <el-date-picker
          size="small"
          class="el-inputs"
          v-model="paymentDetail.payDate"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>背书目的</label>
        <el-input
          v-model="paymentDetail.remark"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>付款单号</label>
        <el-input
          :value="paymentDetail.paymentCode"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>被背书人</label>
        <el-input
          :value="paymentDetail.supplierName"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>背书部门</label>
        <el-input
          :value="paymentDetail.branchName"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "tabConFourth",
  props: {
    paymentDetail: {
      type: Object,
      default: Object
    }
  },
  data() {
    return {
      // paymentDetail: {
      //   supplierName: "", //--被背书人datetime [e时间]			y		付款日期
      //   branchName: "", //背书部门
      //   paymentCode: "", //付款单号	varchar(64) [e描述_64]			y		付款单号
      //   payDate: "", //背书日期
      //   remark: "", //--目的
      // }
    };
  },
  methods: {},
  computed: {
    type() {
      return this.$store.state.route.params.type;
    }
  }
};
</script>
<style lang="scss">
// .index .el-col-required .el-input.is-disabled .el-input__inner{
//   background-color: #d9e8fd !important;
// }
</style>