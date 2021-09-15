<template>
  <div class="input-div">
    <el-col :span="5" class="el-col">
      <label>公司</label>
      <el-input
        v-model="credit.companyName"
        size="small"
        class="el-inputs"
        placeholder="请选择"
        disabled
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col">
      <label>部门</label>
      <el-input v-model="credit.orgName" size="small" class="el-inputs" placeholder="请选择" disabled></el-input>
    </el-col>
    <el-col :span="5" class="el-col">
      <label>收款单号</label>
      <el-input
        v-model="credit.gatheringNo"
        size="small"
        class="el-inputs"
        placeholder="请输入"
        disabled
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col">
      <label>收款单行号</label>
      <el-input v-model="credit.no" size="small" class="el-inputs" placeholder="请输入" disabled></el-input>
    </el-col>
    <el-col :span="5" class="el-col">
      <label>收款日期</label>
      <el-date-picker
        class="el-inputs"
        size="mini"
        v-model="credit.payeeDate"
        disabled
        type="date"
        placeholder="选择日期"
      ></el-date-picker>
    </el-col>
    <!--收款类别选择-->
    <payee-category-select :payeeCategory.sync="credit.payeeCategory" disable></payee-category-select>
    <el-col :span="5" class="el-col">
      <label>付款单位</label>
      <el-input
        v-model="credit.payCompanyName"
        class="el-inputs"
        size="small"
        placeholder="请输入"
        disabled
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col">
      <label>业务币别</label>
      <el-input
        v-model="credit.currencyCode"
        class="el-inputs"
        size="small"
        placeholder="请输入"
        disabled
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col">
      <label>收款金额(业务币)</label>
      <el-input
        v-model="credit.payeeAmtOrigin"
        class="el-inputs"
        size="small"
        placeholder="请输入"
        disabled
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col">
      <label>汇率(本位币)</label>
      <el-input
        v-model="credit.currentcyRateBase"
        class="el-inputs"
        size="small"
        placeholder="请输入"
        disabled
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col">
      <label>收款金额(本位币)</label>
      <el-input
        v-model="credit.payeeAmtBase"
        class="el-inputs"
        size="small"
        placeholder="请输入"
        disabled
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col">
      <label>汇率(人民币)</label>
      <el-input
        v-model="credit.currencyRateRmb"
        class="el-inputs"
        size="small"
        placeholder="请输入"
        disabled
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col">
      <label>外币扣费(业务币)</label>
      <el-input
        v-model="credit.fcFeeOrigin"
        class="el-inputs"
        size="small"
        placeholder="请输入"
        disabled
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col">
      <label>本币扣费</label>
      <el-input v-model="credit.bcFee" class="el-inputs" size="small" placeholder="请输入" disabled></el-input>
    </el-col>
    <!-- 收款方式 -->
    <payee-type-select :payeeType.sync="credit.payeeType" disable></payee-type-select>
    <!-- 认领状态选择 -->
    <shared-status-select :sharedStatus.sync="credit.sharedStatus" disable></shared-status-select>
    <el-col class="el-col el-col-btn"></el-col>
  </div>
</template>
<script>
import payeeCategorySelect from "@/views/fundsManage/conponents/payeeCategorySelect2";
import payeeStatusSelect from "@/views/fundsManage/conponents/payeeStatusSelect";
import payeeTypeSelect from "@/views/fundsManage/conponents/payeeTypeSelect2";
import sharedStatusSelect from "@/views/fundsManage/conponents/sharedStatusSelect2";
import zzexpectSelect from "@/views/fundsManage/conponents/zzexpectSelect";
import payeeLabelSelect from "@/views/fundsManage/conponents/payeeLabelSelect";
export default {
  name: "topTabFirstRead",
  props: {
    credit: {
      type: Object,
      required: true
    },
    isConfirmed: {
      type: Number,
      default: 0
    }
  },
  components: {
    payeeCategorySelect,
    payeeStatusSelect,
    payeeTypeSelect,
    sharedStatusSelect,
    zzexpectSelect,
    payeeLabelSelect
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
/deep/ .el-col{
  .el-inputs,.el-select{
      width: 60%;
    }
  label{
    width:36%;
  }
}
.input-div{
  padding-left: 0;
}
</style>