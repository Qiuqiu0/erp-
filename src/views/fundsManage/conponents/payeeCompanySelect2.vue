<template>
  <div class="payCompanySelect">
    <template v-if="!isSupplier">
      <label v-bind="$attrs">{{ labelName }}</label>
      <el-select
        v-model="payeeCompany.payeeCompanyName"
        class="el-inputs"
        placeholder="请选择"
        filterable
        remote
        clearable
        :remote-method="getCustomer"
        value-key="customerId"
        @change="changeHandler"
      >
        <el-option
            v-for="item in customerList_"
            :key="item.customerId"
            :label="item.customerName"
            :value="item">
        </el-option>
      </el-select>
      <span class="comicon" @click="customerTip"  style="width: 10%;z-index: 2"
        ><i slot="suffix" class="el-icon-search" v-show="!payeeCompany.payeeCompanyName"></i></span>
    </template>
    
    <template v-else>
      <label v-bind="$attrs">{{ labelName }}</label>
      <el-select  v-model="payeeCompany.payeeCompanyName"
                  @change="changeHandler"
                  class="el-inputs"
                  placeholder="请选择"
                  filterable
                  clearable
                  remote
                  :remote-method="getSupplier"
                  value-key="supplierId"
      >
        <el-option
            v-for="item in supplierList_"
            :key="item.supplierId"
            :label="item.supplierName"
            :value="item">
        </el-option>
      </el-select>
       <span class="comicon" v-show="!payeeCompany.payeeCompanyName" @click="supplierTip" style="width: 10%;z-index: 2"
        ><i slot="suffix" class="el-icon-search" v-show="!payeeCompany.payeeCompanyName"></i></span>
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
import PopupApi from "@/api/component";
import customerModal from "@/components/customerSelect.vue";
export default {
  name: "payCompanySelect",
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
      customerShow: false,
      customerList_:[],
      supplierList_:[],
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
    //供应商弹窗确定获取数据
    supplierSure(e) {
      this.supplierShow = false;
      e.payeeCompanyName = e.supplierName;
      e.payeeCompanyCode = e.supplierCode;
      delete e["companyName"];
      delete e["companyCode"];
      this.$emit("update:payeeCompany",e);
      this.$emit("change",e);
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
      }else{
        e.payeeCompanyName = e.supplierName?e.supplierName:e.customerName;
        e.payeeCompanyCode = e.supplierCode?e.supplierCode:e.customerCode;
        this.$emit("update:payeeCompany",e);
        this.$emit("change",e);
      }
    },
    
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
<style scoped lang="scss">
/deep/ .el-select__tags {
  .el-tag--light {
    height: auto;
    line-height: normal;
  }
}
</style>
