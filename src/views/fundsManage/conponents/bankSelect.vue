<template>
  <div class="bankSelect">
    <label v-bind="$attrs">{{ labelName }}</label>
    <el-input
      v-model="bank.bankName"
      class="el-inputs"
      size="small"
      placeholder="请选择"
      clearable
      @change="changeHandler"
      :disabled="disable"
      @focus="bankTip"
    >
      <i slot="suffix" class="el-icon-search" v-show="!bank.bankName" @click="bankTip"></i>
    </el-input>
    <bank-popup :isShow="bankShow" @callback="bankCallback"></bank-popup>
  </div>
</template>
<script>
import bankPopup from "@/components/bankPopup.vue";
export default {
  name: "bankSelect",
  props: {
    bank: {
      required: true,
      type: Object
    },
    labelName: {
      type: String,
      default: "银行"
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  components: {
    bankPopup
  },
  data() {
    return {
      bankShow: false //银行弹窗
    };
  },
  methods: {
    //银行弹窗打开
    bankTip() {
      this.bankShow = true;
    },
    //银行弹窗关闭
    bankCallback(e) {
      this.bankShow = false;
      if (e) {
        this.$emit("update:bank", e);
        this.$emit("change", e);
      }
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:bank", {});
        this.$emit("change", {});
      }
    }
  }
};
</script>