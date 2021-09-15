<template>
<el-col :span="5" class="el-col">
        <label>客户</label>
        <el-select  v-model="customerName_"
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
        <el-option
            v-for="item in customerNameList_"
            :key="item.customerCode"
            :label="item.customerName"
            :value="item">
        </el-option>
        </el-select>
     <span class="comicon" @click="customerTip" style="width: 10%;z-index: 2"
        ><i class="el-icon-search"></i
      ></span> 
      <!--选择销售客户 -->
    <customer-select v-if="customerShow" :tipShow='customerShow'  @customerCancle="customerCancle" @customerSure="customerSure">
    </customer-select>
</el-col>
    

</template>
<script>
import customerSelect from "@/components/customerSelect2.vue"; //客户组件
import PopupApi from "@/api/component";
export default {
  name: "customerListSelect",
  components: {  customerSelect },
  props: {
    customerInfo:{
      required: true,
      type: Array
    },
    customerNameList:{
      type: Array
    }
  },
  data() {
    return {
      customerShow: false, //弹窗
      customerName_: this.customerInfo,
      customerNameList_:this.customerNameList
     // branchInfo:[],
    };
  },
  methods:{
    getCustomer(str) {
      if (!str) {
        return;
      }
      let params = {
        pageNum: 1,
        rows: 200,
        customerName: str,
        isCollected: 0,
      };
      PopupApi.customerSelect2(params)
        .then((res) => {
          this.customerNameList_ = res.data.list;
        })
        .catch(() => {});
    },
      //销售客户弹窗
    customerTip(){
        this.customerShow = true;
    },
      //销售客户弹窗关闭
    customerCancle() {
        this.customerShow = false;
    },
    //销售客户弹窗确定获取数据
    customerSure(e) {
        this.customerShow = false;
        this.$emit("update:customerInfo", e);
        this.$emit("change", e);
        this.customerNameList_ = e;
    },
    
    changeHandler(e) {
      if (e.length==0) {
        this.$emit("update:customerInfo", []);
        this.$emit("change", []);
      }else{
        this.$emit("update:customerInfo", e);
        this.$emit("change", e);
      }
    }
  },
  watch: {
    customerInfo(val) {
      this.customerName_ = val;
    },
    customerNameList(val){
      this.customerNameList_ = val;
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
