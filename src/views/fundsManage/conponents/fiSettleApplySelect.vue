<template>
  <div>
    <label v-bind="$attrs">{{ labelName }}</label>
    <el-input
      class="el-inputs"
      v-model="settleApply.settleApplyCode"
      size="small"
      placeholder="请选择"
      clearable
      @change="changeHandler"
      :disabled="disable"
      @focus="fiSettleApplyTip"
    >
      <i slot="suffix" class="el-icon-search" v-show="!settleApply.settleApplyCode"></i>
    </el-input>
    <!-- 选择申请单据弹窗 -->
    <fi-settle-apply-popup
      :searchOptions="searchOptions"
      v-if="fiSettleApplyShow"
      :tipShow="fiSettleApplyShow"
      :isRadio="true"
      @tipsCancle="tipsCancle"
      @tipsSure="tipsSure"
    ></fi-settle-apply-popup>
  </div>
</template>
<script>
import fiSettleApplyPopup from "@/components/fiSettleApplyPopup.vue";
export default {
  name: "fiGatheringBillSelect",
  components: { fiSettleApplyPopup },
  props: {
    settleApply: {
      required: true,
      type: Object
    },
    labelName: {
      type: String,
      default: "申请单据编号"
    },
    searchOptions: {
      type: Object,
      default: Object
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fiSettleApplyShow: false 
    };
  },
  methods: {
    //公司弹窗打开
    fiSettleApplyTip() {
      this.fiSettleApplyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.fiSettleApplyShow = false;
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.fiSettleApplyShow = false;
      this.$emit("update:settleApply", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:settleApply", {});
        this.$emit("change", {});
      }
    }
  }
};
</script>
