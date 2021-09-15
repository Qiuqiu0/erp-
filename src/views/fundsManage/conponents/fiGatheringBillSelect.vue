<template>
  <div>
    <label v-bind="$attrs">
      <span v-show="needBills"  class="must-full">*</span>
      {{ labelName }}</label>
    <el-input
      class="el-inputs"
      v-model="bill.instrumentBillNo"
      size="small"
      placeholder="请选择"
      clearable
      @change="changeHandler"
      :disabled="disable||unSelect"
      @focus="billTip"
    >
      <i slot="suffix" class="el-icon-search" v-show="!bill.instrumentBillNo"></i>
    </el-input>
    <!-- 选择应收票据弹窗 -->
    <fi-gathering-bill-popup
      :searchOptions="searchOptions"
      :instrumentStatus="instrumentStatus"
      v-if="billShow"
      :tipShow="billShow"
      :isRadio="true"
      @tipsCancle="tipsCancle"
      @tipsSure="tipsSure"
    ></fi-gathering-bill-popup>
  </div>
</template>
<script>
import fiGatheringBillPopup from "@/components/fiGatheringBillPopup.vue";
export default {
  name: "fiGatheringBillSelect",
  components: { fiGatheringBillPopup },
  props: {
    bill: {
      required: true,
      type: Object
    },
    labelName: {
      type: String,
      default: "公司"
    },
    searchOptions: {
      type: Object,
      default: Object
    },
    instrumentStatus:{
      type: Number | String,
    },
    payeeType: {
      type: Number | String,
      default: 0
    },
    disable: {
      type: Boolean,
      default: false
    },
    needBills:{
      type: Boolean,
      default: true 
    }
  },
  data() {
    return {
      billShow: false //公司弹窗
    };
  },
  computed: {
    unSelect() {
      return [10310010, 10310020, 10310120].findIndex(
        item => item === this.payeeType
      ) === -1
        ? true
        : false;
    }
  },
  methods: {
    //公司弹窗打开
    billTip(event) {
      if (
        this.searchOptions.companyCode == undefined ||
        this.searchOptions.payCompanyCode == undefined ||
        this.searchOptions.currencyCode == undefined
      ) {
        this.$message({
          message: "请先确认公司付款单位及币别",
          type: "error"
        });
        event.target.blur();
        return;
      }
      this.billShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.billShow = false;
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.billShow = false;
      this.$emit("update:bill", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:bill", {});
        this.$emit("change", {});
      }
    }
  },
  watch: {
    //   10310010: "B:银行承兑汇票",   10310020: "D:商业承兑汇票",   10310120: "3:应收款链"
    searchOptions(val) {
      let Obj = { 10310010: 10870005, 10310020: 10870010, 10310120: 10870015 };
      val.instrumentType=Obj[this.payeeType]
    }
  }
};
</script>
