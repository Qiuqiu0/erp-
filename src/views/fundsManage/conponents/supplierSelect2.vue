<template>
  <div class="supplierSelect">
    <label v-bind="$attrs">{{ labelName }}</label>
    <el-input
      v-model="supplier.supplierName"
      class="el-inputs"
      placeholder="请选择"
      size="small"
      clearable
      @change="changeHandler"
      :disabled="customer.customerCode||disable"
      @focus="supplierTip"
    >
      <i slot="suffix" class="el-icon-search" v-show="!supplier.supplierName"></i>
    </el-input>
    <!-- 选择供应商弹窗 -->
    <supplier-modal
      v-if="supplierShow"
      :tipShow="supplierShow"
      @supplierCancle="supplierCancle"
      @supplierSure="supplierSure"
    ></supplier-modal>
  </div>
</template>
<script>
import supplierModal from "@/components/supplierSelect.vue";
export default {
  name: "supplierSelect2",
  components: { supplierModal },
  props: {
    customer: {
      type: Object,
      default: Object
    },
    supplier: {
      required: true,
      type: Object
    },
    labelName: {
      type: String,
      default: "供应商"
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      supplierShow: false //客户弹窗
    };
  },
  methods: {
    //供应商弹窗打开
    supplierTip() {
      if (this.customer.customerName) {
        this.$openWarning("客户和供应商只能选其一");
        return;
      }
      this.supplierShow = true;
    },
    //供应商弹窗关闭
    supplierCancle() {
      this.supplierShow = false;
    },
    //供应商弹窗确定获取数据
    supplierSure(e) {
      this.supplierShow = false;
      this.$emit("update:supplier", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:supplier", {});
        this.$emit("change", {});
      }
    }
  }
};
</script>