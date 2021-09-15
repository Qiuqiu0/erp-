<template>
  <div class="customerSelect">
    <label v-bind="$attrs">{{ labelName }}</label>
   <!-- <el-input
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
    </el-input>-->
    <zl-select
        v-model="customer_"
        class="el-inputs"
        placeholder="请选择"
        multiple
        filterable
        remote
        :remote-method="getCustomer"
        collapse-tags
        value-key="customerId"
        :disabled="supplier.length > 0 || customerFlag_ || disable"
        @change="changeHandler"
      >
        <zl-option
            v-for="item in customerList_"
            :key="item.customerId"
            :label="item.customerName"
            :value="item">
        </zl-option>
      </zl-select>
      <span class="comicon" @click="customerTip" style="width: 10%;z-index: 2"
        ><i class="el-icon-search"></i
      ></span>
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
import Compony from "@/api/comdepartment/componySelect";
import PopupApi from "@/api/component";
import customerModal from "@/components/customerSelect2.vue";
export default {
  name: "customerSelect",
  components: { customerModal },
  props: {
    customerFlag:{
      type:Boolean,
    },
    customer: {
      required: true,
      type: Array
    },
    customerList: {
      type:Array
    },
    supplier: {
      type: Array,
      default: Array
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
      customerList_:this.customerList,
      customer_:this.customer,
      customerShow: false, //客户弹窗
      customerFlag_:this.customerFlag
    };
  },
  watch: {
    customerFlag(val){
      this.customerFlag_ = val;
    },
    customer(val){
      this.customer_ = val;
    },
    customerList(val){
      this.customerList_ = val;
    }
  },
  methods: {
    //远程搜索
     getCustomer(str){
      if(!str){
        return
      }
      let params = {
        pageNum: 1,
        rows: 200,
        customerName: str,
        isCollected:0
      };
      PopupApi.customerSelect2(params)
          .then(res => {
            this.customerList_ =  res.data.list;
          })
          .catch(() => {
          });
    },
    //客户弹窗打开
    customerTip() {
      if (this.supplier.length > 0) {
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
      this.customerList_ = e;
    },
    changeHandler(e) {
      if (e.length == 0) {
        this.$emit("update:customer", []);
        this.$emit("change", []);
        this.$emit("disableds",false);
      } else {
        this.$emit("change",e);
        this.$emit("update:customer",e);
        this.$emit("update:supplier", []);
        this.$emit("disableds",true);
      }
    }
  }
};
</script>
<style scoped lang="scss">
/deep/ .el-select__tags {
  .el-tag--light {
    height: auto;
    line-height: normal;
  }
}
</style>
