<template>
  <div class="supplierBankSelect">
    <label v-bind="$attrs">{{labelName}}</label>
    <el-input
      v-model="supplierBank.bankName"
      class="el-inputs"
      placeholder="请选择"
      size="small"
      clearable
      @change="changeHandler"
      :disabled="disable"
      @focus="supplierBankTip"
    >
      <i slot="suffix" class="el-icon-search" v-show="!supplierBank.bankName"></i>
    </el-input>
    <!-- 选择币别 -->
    <supplier-bank-popup
      v-if="supplierBankShow"
      :supplierId="supplierId"
      :tipShow="supplierBankShow"
      @tipsCancle="supplierBankCancle"
      @tipsSure="supplierBankSure"
    ></supplier-bank-popup>
  </div>
</template>
<script>
import supplierBankPopup from "@/components/supplierBankPopup.vue";
export default {
  name: "supplierBankSelect",
  components: { supplierBankPopup },
  props: {
    supplierBank: {
      required: true,
      type: Object
    },
    labelName: {
      type: String,
      default: "银行选择"
    },
    tipsTitle:{
      type: String,
      default: "供应商"
    },
    supplierId: {
      required: true,
      type: String,
      default: ""
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      supplierBankShow: false //公司银行弹窗
    };
  },
  methods: {
    supplierBankTip() {
      if (this.supplierId === "") {
        this.$openWarning(`请先选择${this.tipsTitle}`);
        return;
      }
      this.supplierBankShow = true;
    },
    supplierBankCancle() {
      this.supplierBankShow = false;
    },
    supplierBankSure(e) {
      this.supplierBankShow = false;
      this.$emit("update:supplierBank", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:supplierBank", {});
        this.$emit("change", {});
      }
    }
  }
};
</script>
