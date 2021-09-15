<template>
  <div class="interactiveCompanySelect">
    <template v-if="!isSupplier">
      <label v-bind="$attrs">{{ labelName }}</label>
      <el-input
        v-model="interactiveCompany.interactiveCompanyName"
        class="el-inputs"
        placeholder="请选择"
        size="small"
        clearable
        @change="changeHandler"
        :disabled="disable"
        @focus="customerTip"
      >
        <i slot="suffix" class="el-icon-search" v-show="!interactiveCompany.interactiveCompanyName"></i>
      </el-input>
    </template>
    <template v-else>
      <label v-bind="$attrs">{{ labelName }}</label>
      <el-input
        v-model="interactiveCompany.interactiveCompanyName"
        class="el-inputs"
        placeholder="请选择"
        size="small"
        clearable
        @change="changeHandler"
        :disabled="disable"
        @focus="supplierTip"
      >
        <i slot="suffix" class="el-icon-search" v-show="!interactiveCompany.interactiveCompanyName"></i>
      </el-input>
    </template>
    <!-- 选择供应商弹窗 -->
    <supplier-modal
      v-if="supplierShow"
      :tipShow="supplierShow"
      @supplierCancle="supplierCancle"
      @supplierSure="supplierSure"
    ></supplier-modal>
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
import supplierModal from "@/components/supplierSelect.vue";
import customerModal from "@/components/customerSelect.vue";
export default {
  name: "interactiveCompanySelect",
  components: { supplierModal, customerModal },
  props: {
    interactiveCompany: {
      required: true,
      type: Object
    },
    isSupplier: {
      type: Boolean,
      default: false
    },
    labelName: {
      type: String,
      default: "往来单位"
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      supplierShow: false, //客户弹窗
      customerShow: false
    };
  },
  methods: {
    //供应商弹窗打开
    supplierTip() {
      this.supplierShow = true;
    },
    //供应商弹窗关闭
    supplierCancle() {
      this.supplierShow = false;
    },
    //供应商弹窗确定获取数据
    supplierSure(e) {
      this.supplierShow = false;
      e.interactiveCompanyName = e.supplierName;
      e.interactiveCompanyCode = e.supplierCode;
      delete e["companyName"];
      delete e["companyCode"];
      this.$emit("update:interactiveCompany", e);
      this.$emit("change", e);
    },
    //客户弹窗打开
    customerTip() {
      this.customerShow = true;
    },
    //客户弹窗关闭
    customerCancle() {
      this.customerShow = false;
    },
    //客户弹窗确定获取数据
    customerSure(e) {
      this.customerShow = false;
      e.interactiveCompanyName = e.customerName;
      e.interactiveCompanyCode = e.customerCode;
      delete e["companyName"];
      delete e["companyCode"];
      this.$emit("update:interactiveCompany", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:interactiveCompany", {});
        this.$emit("change", {});
      }
    }
  }
};
</script>
