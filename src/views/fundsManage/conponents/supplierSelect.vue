<template>
  <div class="supplierSelect">
    <label v-bind="$attrs">{{ labelName }}</label>
  <!--  <el-input
      v-model="supplier.supplierName"
      class="el-inputs"
      placeholder="请选择"
      size="small"
      clearable
      @change="changeHandler"
      :disabled="!!customer.customerCode||disable"
      @focus="supplierTip"
    >
      <i slot="suffix" class="el-icon-search" v-show="!supplier.supplierName"></i>
    </el-input> -->
    <zl-select  v-model="supplier_"
                  @change="changeHandler"
                  class="el-inputs"
                  placeholder="请选择"
                  multiple
                  filterable
                  remote
                  :disabled="customer.length > 0 || supplierFlag || disable"
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
import Compony from "@/api/comdepartment/componySelect";
import PopupApi from "@/api/component";
import supplierModal from "@/components/supplierSelect2.vue";
export default {
  name: "supplierSelect",
  components: { supplierModal },
  props: {
    customer: {
      type: Array,
      default: Array
    },
    supplierList: {
      type: Array,
      default: Array
    },
    supplier: {
      required: true,
      type: Array | Object
    },
    labelName: {
      type: String,
      default: "供应商"
    },
    disable: {
      type: Boolean,
      default: false
    },
    supplierFlag: {
      type:Boolean
    }
  },
  data() {
    return {
      supplier_:this.supplier,
      supplierList_:this.supplierList,
      supplierShow: false,//客户弹窗
      supplierFlag_:this.supplierFlag
    };
  },
  watch:{
    supplier(val){
      this.supplier_ = val;
    },
    supplierList(val){
      this.supplierList_ = val;
    },
    supplierFlag(val){
      this.supplierFlag_ = val;
    }
  },
  methods: {
    //远程搜索
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
      if (this.customer.length > 0) {
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
      this.supplierList_ = e;
    },
    changeHandler(e) {
      if (e.length == 0) {
        this.$emit("update:supplier", []);
        this.$emit("change", []);
        this.$emit("disables",false);
      }else{
      this.$emit("change", e);
       this.$emit("update:supplier",e);
       this.$emit("update:customer",[]);
       this.$emit("disables",true);

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
