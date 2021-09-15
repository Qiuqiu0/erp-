<template>
  <div class="payCompanySelect">
    <label v-bind="$attrs">{{labelName}}</label>
    <el-input
      v-model="payeeBank.bankName"
      class="el-inputs"
      placeholder="请选择"
      size="small"
      clearable
      @change="changeHandler"
      :disabled="disable"
      @focus="bankTip"
    >
      <i slot="suffix" class="el-icon-search" v-show="!payeeBank.bankName"></i>
    </el-input>
    <!-- 供应商银行弹窗 -->
    <supplier-bank-popup
      v-if="supplierBankShow"
      :supplierId="payeeId"
      :tipShow="supplierBankShow"
      @tipsCancle="supplierBankCancle"
      @tipsSure="supplierBankSure"
    ></supplier-bank-popup>
    <!-- /客户银行弹窗 -->
    <customer-bank-popup
      v-if="customerBankShow"
      :customerId="payeeId"
      :tipShow="customerBankShow"
      @tipsCancle="customerBankCancle"
      @tipsSure="customerBankSure"
    ></customer-bank-popup>
  </div>
</template>
<script>
import customerBankPopup from "@/components/customerBankPopup.vue";
import supplierBankPopup from "@/components/supplierBankPopup.vue";
export default {
  name: "payCompanySelect",
  components: { customerBankPopup, supplierBankPopup },
  props: {
    payeeBank: {
      required: true,
      type: Object,
      default: Object
    },
    payeeId: {
      required: true,
      type: String | Number
    },
    //0 供应商  1 客户
    receiverType: {
      required: true,
      required: Number,
      default: 0
    },
    labelName: {
      type: String,
      default: "收款银行"
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      supplierBankShow: false, //供应商银行弹窗
      customerBankShow: false //客户银行弹窗
    };
  },
  methods: {
    //供应商银行弹窗
    bankTip() {
      if (this.payeeId === "") {
        this.$openWarning("请先选择收款单位");
        return;
      }
      if (this.receiverType) {
        this.customerBankShow = true;
      } else {
        this.supplierBankShow = true;
      }
    },
    supplierBankCancle() {
      this.supplierBankShow = false;
    },
    supplierBankSure(e) {
      this.supplierBankShow = false;
      this.$emit("update:payeeBank", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:payeeBank", {});
        this.$emit("change", {});
      }
    },
    customerBankCancle() {
      this.customerBankShow = false;
    },
    customerBankSure(e) {
      this.customerBankShow = false;
      this.$emit("update:payeeBank", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:payeeBank", {});
        this.$emit("change", {});
      }
    }
  },
};
</script>
