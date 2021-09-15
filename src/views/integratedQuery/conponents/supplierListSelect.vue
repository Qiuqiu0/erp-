<template>
    <el-col :span="5"  class="el-col">
      <label v-bind="$attrs">{{labelName}}</label>
      <zl-select  v-model="supplier_"
                  @change="changeHandler"
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
            v-for="(item,index) in supplierList_"
            :key="index"
            :label="item.supplierName"
            :value="item">
        </zl-option>
      </zl-select>
      <span class="comicon" @click="supplierTip" style="width: 10%;z-index: 2"
        ><i class="el-icon-search"></i
      ></span>
       <!--供应商弹窗-->
    <supplier-select v-if="supplierShow" :tipShow="supplierShow" @supplierCancle="supplierCancel" @supplierSure="supplierSure"></supplier-select>
    </el-col>
</template>
<script>
import supplierSelect from "@/components/supplierSelect2";
import PopupApi from "@/api/component";
export default {
  name: "supplierListSelect",
  components: {  supplierSelect },
  props: {
    supplierInfo:{
      required: true,
      type: Array
    },
    supplierList:{
      type: Array
    },
    labelName: {
      type: String,
      default: "供应商"
    },
  },
  data() {
    return {
      supplierShow: false, //弹窗
      supplier_: this.supplierInfo,
      supplierList_:this.supplierList
     // branchInfo:[],
    };
  },
  methods:{
     getSupplier(str) {
      if (!str) {
        return;
      }
      PopupApi.supplierSelect2({
        page: 1,
        pageSize: 200,
        supplierName: str,
       // isInactive: 0,
        isCollected: 0,
      }).then((res) => {
        if (res.code == "success") {
          this.supplierList_ = res.data.list;
        } else {
          this.$openWarning(res.message);
        }
      });
    },
     //供应商弹窗
    supplierTip() {
      this.supplierShow = true;
    },
    //供应商弹窗关闭
    supplierCancel() {
      this.supplierShow = false;
    },
    //供应商弹窗确定并传值
    supplierSure(e) {
      this.supplierShow = false;
        this.$emit("update:supplierInfo", e);
        this.$emit("change", e);
        this.supplierList_ = e;
    },
    changeHandler(e) {
      if (e.length==0) {
        this.$emit("update:supplierInfo", []);
        this.$emit("change", []);
      }else{
        this.$emit("update:supplierInfo", e);
        this.$emit("change", e);
      }
    }
  },
  watch: {
    supplierInfo(val) {
      this.supplier_ = val;
    },
    supplierList(val){
      this.supplierList_ = val;
    }
  },
}
</script>
<style scoped lang="scss">
/deep/ .el-select__tags {
  .el-tag--light {
    height: auto;
    line-height: normal;
  }
}
</style>
