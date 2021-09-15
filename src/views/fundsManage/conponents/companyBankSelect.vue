<template>
  <div class="companyBankSelect">
    <label v-bind="$attrs">
      <span v-show="!needBills" class="must-full">*</span>
      {{labelName}}
    </label>
    <el-input
      v-model="companyBank.bankName"
      class="el-inputs"
      placeholder="请选择"
      size="small"
      clearable
      @change="changeHandler"
      :disabled="disable"
      @focus="companyBankTip"
      v-if="!needInput"
    >
      <i slot="suffix" class="el-icon-search" v-show="!companyBank.bankName"></i>
    </el-input>
    <el-input
      v-else
      v-model="companyBank.bankName"
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
        @click.stop="companyBankTip"
        v-show="!companyBank.bankName"
      ></i>
    </el-input>
    <!-- 选择币别 -->
    <company-bank-popup
      v-if="companyBankShow"
      :companyId="companyId"
      :tipShow="companyBankShow"
      @tipsCancle="companyBankCancle"
      @tipsSure="companyBankSure"
    ></company-bank-popup>
  </div>
</template>
<script>
import companyBankPopup from "@/components/companyBankPopup.vue";
export default {
  name: "companyBankSelect",
  components: { companyBankPopup },
  props: {
    companyBank: {
      required: true,
      type: Object
    },
    labelName: {
      type: String,
      default: "银行选择"
    },
    tipsTitle: {
      type: String,
      default: "公司"
    },
    companyId: {
      required: true,
      type: String,
      default: ""
    },
    disable: {
      type: Boolean,
      default: false
    },
    needBills: {
      type: Boolean,
      default: true
    },
    needInput: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      companyBankShow: false //公司银行弹窗
    };
  },
  methods: {
    //币别弹窗打开
    companyBankTip() {
      if (this.companyId === "") {
        this.$openWarning(`请先选择${this.tipsTitle}`);
        return;
      }
      this.companyBankShow = true;
    },
    //币别弹窗关闭
    companyBankCancle() {
      this.companyBankShow = false;
    },
    //币别弹窗确定获取数据
    companyBankSure(e) {
      this.companyBankShow = false;
      this.$emit("update:companyBank", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:companyBank", {});
        this.$emit("change", {});
      } else {
        this.$emit("change", this.companyBank);
      }
    }
  }
};
</script>
