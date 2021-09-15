<template>
  <div class="payeeCompanySelect">
    <template v-if="isSupplier">
      <label v-bind="$attrs">{{ labelName }}</label>
      <el-input
        v-model="payeeCompany.payeeCompanyName"
        class="el-inputs"
        placeholder="请选择"
        size="small"
        clearable
        @change="changeHandler"
        :disabled="disable"
        @focus="supplierTip"
      >
        <i slot="suffix" class="el-icon-search" v-show="!payeeCompany.payeeCompanyName"></i>
      </el-input>
    </template>
    <template v-else>
      <label>{{ labelName }}</label>
      <el-input
        v-model="payeeCompany.payeeCompanyName"
        class="el-inputs"
        placeholder="请选择"
        size="small"
        clearable
        @change="changeHandler"
        :disabled="disable"
        @focus="customerTip"
      >
        <i slot="suffix" class="el-icon-search" v-show="!payeeCompany.payeeCompanyName"></i>
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
  name: "payeeCompanySelect",
  components: { supplierModal, customerModal },
  props: {
    payeeCompany: {
      required: true,
      type: Object
    },
    paymentType: {
      required: true,
      type: String | Number,
      default: ""
    },
    labelName: {
      type: String,
      default: "收款单位"
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
      e.payeeCompanyName = e.supplierName;
      e.payeeCompanyCode = e.supplierCode;
      delete e["companyName"];
      delete e["companyCode"];
      this.$emit("update:payeeCompany", e);
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
      e.payeeCompanyName = e.customerName;
      e.payeeCompanyCode = e.customerCode;
      delete e["companyName"];
      delete e["companyCode"];
      this.$emit("update:payeeCompany", e);
      this.$emit("change", e);
    },
    changeHandler(e) {
      if (!e) {
        this.$emit("update:payeeCompany", {});
        this.$emit("change", {});
      }
    }
  },
  computed: {
    isSupplier() {
      // 10500015: "R 客户退款 ",
      // 10500025: "D 客户保证金（环能专用） ",
      // 10500040: "Q 退回往来款（其他应收款-单位往来） ",
      return [10500015, 10500025, 10500040].findIndex(
        item => item == this.paymentType
      ) != -1
        ? false
        : true;
    }
  }
};
</script>
