<template>
  <div class="input-div">
    <el-form disabled>
      <el-col :span="5" class="el-col">
        <label>收款单号</label>
        <el-input
          v-model="gatheringDetail.gatheringNo"
          disabled
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>公司</label>
        <el-input
          v-model="gatheringDetail.companyName"
          disabled
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>会计年度</label>
        <el-date-picker
          class="el-inputs"
          disabled
          v-model="gatheringDetail.accountYear"
          align="right"
          size="small"
          type="year"
          value-format="yyyy"
          format="yyyy"
          placeholder="选择年"
        ></el-date-picker>
      </el-col>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "tabConSeventh",
  props: {
    gatheringDetail: {
      type: Object,
      default: Object
    }
  },
  data() {
    return {
      // paymentDetail: {
      //   paymentCode: "", //付款单号	varchar(64) [e描述_64]			y		付款单号
      //   companyName: "", //公司名称	varchar(128) [e描述_128]			y		公司名称
      //   companyCode: "", //公司编码	varchar(32) [e描述_32]			y		公司编码
      //   accountingYear: "" //会计年度	varchar(32) [e描述_32]			y		会计年度
      // }
    };
  }
};
</script>
