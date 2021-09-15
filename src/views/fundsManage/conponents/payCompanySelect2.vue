<template>
  <div class="payCompanySelect">
    <template v-if="!isSupplier">
      <label v-bind="$attrs">{{ labelName }}</label>
     <!-- <el-input 
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
      </el-input> -->
      <!--客户 -->
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
    </template>
    <template v-else>
      <label v-bind="$attrs">{{ labelName }}</label>
      <!--<el-input
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
      </el-input> -->
      <!-- 供应商-->
      <zl-select  v-model="supplier_"
                  @change="changeHandler2"
                  class="el-inputs"
                  placeholder="请选择"
                  multiple
                  filterable
                  remote
                  :remote-method="getSupplier"
                  collapse-tags
                  value-key="supplierId"
      >
        <zl-option
            v-for="item in supplierList_"
            :key="item.supplierId"
            :label="item.supplierName"
            :value="item">
        </zl-option>
      </zl-select>
       <span class="comicon" @click="supplierTip" style="width: 10%;z-index: 2"
        ><i class="el-icon-search"></i
      ></span>
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
import supplierModal from "@/components/supplierSelect2.vue";
import PopupApi from "@/api/component";
import customerModal from "@/components/customerSelect2.vue";
export default {
  name: "payCompanySelect",
  components: { supplierModal, customerModal },
  props: {
    customer: {
      required: true,
      type: Array
    },
    customerList: {
      type:Array
    },
    supplierList: {
      type: Array,
      default: Array
    },
    supplier: {
      required: true,
      type: Array | Object
    },
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
      customerShow: false,
      customerList_:this.customerList,
      customer_:this.customer,
      supplier_:this.supplier,
      supplierList_:this.supplierList,
    };
  },
  methods: {
    //客户远程搜索
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
    //供应商远程搜索
    getSupplier(str){
      if(!str){
        return
      }
      PopupApi.supplierSelect2({
        page: 1,
        pageSize: 200,
        supplierName: str,
       // isInactive: 0,
        isCollected:0
      }).then(res => {
        if (res.code == "success") {
          this.supplierList_ = res.data.list;
        } else {
          this.$openWarning(res.message);
        }
      })
    },
    //供应商弹窗打开
    supplierTip() {
      this.supplierShow = true;
    },
    //供应商弹窗关闭
    supplierCancle() {
      this.supplierShow = false;
    },
    //处理供应商弹窗数据
     supplierArray(arr){
      let codeArr = [];
      arr.forEach(item=>{
        codeArr.push(item.supplierCode)
      })
      return codeArr;
    },
    //供应商弹窗确定获取数据
    supplierSure(e) {
      this.supplierShow = false;
      e.payCompanyName = e.supplierName;
      e.payCompanyCode = this.supplierArray(e);
      // delete e["companyName"];
      // delete e["companyCode"];
      this.$emit("update:payCompany", e.payCompanyCode);
      this.$emit("update:supplier",e);
      this.$emit("change", e.payCompanyCode);
      this.supplierList_ = e;
    },
    changeHandler2(e) {
      this.supplierShow = false;
      e.payCompanyName = e.supplierName;
      e.payCompanyCode = this.supplierArray(e);
      if (e.length == 0) {
        this.$emit("update:supplier", []);
        this.$emit("change", []);
      }else{
       this.$emit("change", e.payCompanyCode);
      }
    },
    //客户弹窗确定数据处理
    customerArray(arr){
      let codeArr = [];
      arr.forEach(item=>{
        codeArr.push(item.customerCode)
      })
      return codeArr;
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
      e.payCompanyCode = this.customerArray(e);
      // delete e["companyName"];
      // delete e["companyCode"];
      this.$emit("update:payCompany", e.payCompanyCode);
      this.$emit("update:customer",e);
      this.$emit("change", e.payCompanyCode);
      this.customerList_ = e;
    },
    changeHandler(e) {
      e.payCompanyName = e.customerName;
      e.payCompanyCode = this.customerArray(e);
      if (e.length == 0) {
        this.$emit("update:customer", []);
        this.$emit("change", []);
      } else {
        this.$emit("change", e.payCompanyCode);
      }
    }
  },
  watch:{
    customer(val){
      this.customer_ = val;
    }, 
    customerList(val){
      this.customerList_ = val;
    },
    supplier(val){
      this.supplier_ = val;
    },
    supplierList(val){
      this.supplierList_ = val;
    },
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
<style scoped lang="scss">
/deep/ .el-select__tags {
  .el-tag--light {
    height: auto;
    line-height: normal;
  }
}
</style>
