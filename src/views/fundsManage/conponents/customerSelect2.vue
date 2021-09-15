<template>
  <div class="customerSelect">
    <label v-bind="$attrs">{{ labelName }}</label>
    <el-input
      v-model="customer.customerName"
      class="el-inputs"
      placeholder="请选择"
      size="small"
      clearable
      @change="changeHandler"
      :disabled="supplier.supplierCode||disable"
      @focus="customerTip"
      v-if="!needInput"
    >
      <i slot="suffix" class="el-icon-search" v-show="!customer.customerName"></i>
    </el-input>
    <el-input
      v-else
      v-model="customer.customerName"
      class="el-inputs"
      placeholder="请选择"
      size="small"
      clearable
      @change="changeHandler"
      :disabled="supplier.supplierCode||disable"
      v-input-filter:special
    >
      <i
        slot="suffix"
        class="el-icon-search"
        @click.stop="customerTip"
        v-show="!customer.customerName"
      ></i>
    </el-input>
    <!-- 选择客户弹窗 -->
    <customer-modal
      v-if="customerShow"
      :tipShow="customerShow"
      @customerCancle="customerCancle"
      @customerSure="customerSure"
    ></customer-modal>
  </div>
</template>
<script>
import customerModal from "@/components/customerSelect.vue";
export default {
  name: "customerSelect2",
  components: { customerModal },
  props: {
    customer: {
      required: true,
      type: Object
    },
    supplier: {
      type: Object,
      default: Object
    },
    labelName: {
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
      customerShow: false //客户弹窗
    };
  },
  methods: {
    //客户弹窗打开
    customerTip() {
      if (this.supplier.supplierName) {
        this.$openWarning("客户和供应商只能选其一");
        return;
      }
      this.customerShow = true;
    },
    //客户弹窗关闭
    customerCancle() {
      this.customerShow = false;
    },
    //客户弹窗确定获取数据
    customerSure(e) {
      this.customerShow = false;
      this.$emit("update:customer", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:customer", {});
        this.$emit("change", {});
      } else {
        this.$emit("change", this.customer);
      }
    }
  }
};
</script>
