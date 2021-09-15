<template>
  <div class="payCompanySelect">
    <template v-if="!isSupplier">
      <label v-bind="$attrs">{{ labelName }}</label>
      <el-input
        v-model="payCompany.payCompanyName"
        class="el-inputs"
        placeholder="请选择"
        size="small"
        clearable
        @change="changeHandler"
        :disabled="disable"
        @focus="customerTip"
      >
        <i slot="suffix" class="el-icon-search" v-show="!payCompany.payCompanyName"></i>
      </el-input>
    </template>
    <template v-else>
      <label v-bind="$attrs">{{ labelName }}</label>
      <el-input
        v-model="payCompany.payCompanyName"
        class="el-inputs"
        placeholder="请选择"
        size="small"
        clearable
        @change="changeHandler"
        :disabled="disable"
        @focus="supplierTip"
      >
        <i slot="suffix" class="el-icon-search" v-show="!payCompany.payCompanyName"></i>
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
  name: "payCompanySelect",
  components: { supplierModal, customerModal },
  props: {
    payCompany: {
      required: true,
      type: Object | String
    },
    payeeCategory: {
      required: true,
      type: String | Number,
      default: ""
    },
    labelName: {
      type: String,
      default: "付款单位"
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
      e.payCompanyName = e.supplierName;
      e.payCompanyCode = e.supplierCode;
      delete e["companyName"];
      delete e["companyCode"];
      this.$emit("update:payCompany", e);
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
      e.payCompanyName = e.customerName;
      e.payCompanyCode = e.customerCode;
      delete e["companyName"];
      delete e["companyCode"];
      this.$emit("update:payCompany", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:payCompany", {});
        this.$emit("change", {});
      }
    }
  },
  computed: {
    isSupplier() {
      // 10320015: "R:供应商退款",
      // 10320035: "T:收到往来款（其他应付款-单位往来)"
      return [10320015, 10320035].findIndex(
        item => item == this.payeeCategory
      ) != -1
        ? true
        : false;
    }
  }
};
</script>
