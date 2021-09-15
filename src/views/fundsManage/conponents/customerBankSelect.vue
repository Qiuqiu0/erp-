<template>
  <div class="customerBankSelect">
    <label v-bind="$attrs">{{labelName}}</label>
    <el-input
      v-model="customerBank.bankName"
      class="el-inputs"
      placeholder="请选择"
      size="small"
      clearable
      @change="changeHandler"
      :disabled="disable"
      @focus="customerBankTip"
      v-if="!needInput"
    >
      <i slot="suffix" class="el-icon-search" v-show="!customerBank.bankName"></i>
    </el-input>
    <el-input
      v-else
      v-model="customerBank.bankName"
      class="el-inputs"
      placeholder="请选择"
      size="small"
      clearable
      @change="changeHandler"
      :disabled="disable"
      v-input-filter:special
    >
      <i
        slot="suffix"
        class="el-icon-search"
        @click.stop="customerBankTip"
        v-show="!customerBank.bankName"
      ></i>
    </el-input>
    <!-- 选择币别 -->
    <customer-bank-popup
      v-if="customerBankShow"
      :customerId="customerId"
      :tipShow="customerBankShow"
      @tipsCancle="customerBankCancle"
      @tipsSure="customerBankSure"
    ></customer-bank-popup>
  </div>
</template>
<script>
import customerBankPopup from "@/components/customerBankPopup.vue";
export default {
  name: "customerBankSelect",
  components: { customerBankPopup },
  props: {
    customerBank: {
      required: true,
      type: Object
    },
    labelName: {
      type: String,
      default: "银行选择"
    },
    customerId: {
      required: true,
      type: String,
      default: ""
    },
    tipsTitle: {
      type: String,
      default: "客户"
    },
    disable: {
      type: Boolean,
      default: false
    },
    needInput: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      customerBankShow: false //客户银行弹窗
    };
  },
  methods: {
    customerBankTip() {
      if (this.customerId === "") {
        this.$openWarning(`请先选择${this.tipsTitle}`);
        return;
      }
      this.customerBankShow = true;
    },
    customerBankCancle() {
      this.customerBankShow = false;
    },
    customerBankSure(e) {
      this.customerBankShow = false;
      this.$emit("update:customerBank", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:customerBank", {});
        this.$emit("change", {});
      } else {
        this.$emit("change", this.customerBank);
      }
    }
  }
};
</script>
