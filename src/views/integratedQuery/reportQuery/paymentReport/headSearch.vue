<template>
  <div class="index-div3 input-div" id="input-div">
    <p class="hide-input" v-if="show" @click="inputShow()">
      更多条件
      <i class="el-icon-caret-bottom"></i>
    </p>
    <p class="hide-input" v-else @click="inputShow()">
      收起
      <i class="el-icon-caret-top"></i>
    </p>
    <div class="search-div">
      <!--公司选择-->
      <compony-select class="el-col el-col-5" :companyName.sync="companyName"></compony-select>
      <!--部门选择-->
      <department-select
        class="el-col el-col-5"
        :branchName.sync="branchName"
        :companyName="companyName"
      ></department-select>
      <!--供应商选择-->
      <supplier-select :customer="customer" class="el-col el-col-5" :supplier.sync="supplier"></supplier-select>
      <!-- 发票类型 -->
      <invoice-type-select :labelName="'发票类型'"  :invoiceType.sync="invoiceType"></invoice-type-select>
      <!-- 发票状态 -->
      <invoiceStatus-select :labelName="'发票状态'" :isSales="false" :invoiceStatus.sync="invoiceStatus"></invoiceStatus-select>
      <!-- <el-col :span="5" class="el-col">
        <label>采购合同号</label>
        <el-input v-model="poNo" class="el-inputs" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>外部合同号</label>
        <el-input v-model="extCode" class="el-inputs" placeholder="请输入"></el-input>
      </el-col> -->
      <!-- 币别选择 -->
      <!-- <coin-select :coin.sync="coin" :labelName="'业务币别'" class="el-col el-col-5"></coin-select> -->
      <el-col :span="5" class="el-col">
        <label>开票日期</label>
        <el-date-picker
          style="width:70%"
          class="el-input-date"
          size="mini"
          v-model="invoiceDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>创建日期</label>
        <el-date-picker
          style="width:70%"
          class="el-input-date"
          size="mini"
          v-model="createDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col class="el-col el-col-btn"></el-col>
    </div>
  </div>
</template>
<script>
import componySelect from "@/views/fundsManage/conponents/componySelect";
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect2";
import supplierSelect from "@/views/fundsManage/conponents/supplierSelect2";
import coinSelect from "@/views/fundsManage/conponents/coinSelect";;
import invoiceTypeSelect from "@/views/integratedQuery/conponents/invoiceTypeSelect";
import invoiceStatusSelect from "@/views/integratedQuery/conponents/invoiceStatusSelect";
export default {
  name: "headSearch",
  components: {
    componySelect,
    departmentSelect,
    supplierSelect,
    invoiceTypeSelect,
    invoiceStatusSelect,
    coinSelect,
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: {}, //部门
      customer: {}, //客户
      supplier: {}, //供应商
      invoiceType: "", //发票类型
      invoiceStatus:"",//发票状态
      poNo: "", //采购合同号
      extCode: "", //外部合同号
      coin: {}, //币种
      invoiceDate:"",//开票日期
      createDate: "", //创建日期
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      show: true
    };
  },
  created(){
     if(window.IsShowDefaultCompanyInfo){
        this.companyName=window.defaultCompanyInfo;
      }
  },
  methods: {
    inputShow() {
      this.show = this.$showOne(this.show);
      this.$parent.$forceUpdate()
    },
    clearNone() {
       if(window.IsShowDefaultCompanyInfo){
        this.companyName=window.defaultCompanyInfo;
      }else{
        this.companyName = {}; //公司
      }
      this.branchName = {}; //部门
      this.supplier = {}; //供应商
      this.invoiceType = ""; // 发票类型
      this.invoiceStatus = ""; // 发票状态
      this.poNo = ""; //采购合同号
      this.extCode = ""; //外部合同号
      this.coin = {}; //币种
      this.invoiceDate = ""; //开票日期
      this.createDate = ""; //创建日期
    },
    postData() {
      let params = {
        companyCode: this.companyName.companyCode, //公司
        companyId: this.companyName.companyId, //公司Id
        orgCode: this.branchName.branchCode, //部门
        orgId: this.branchName.branchId, //部门Id
        supplierCode: this.supplier.supplierCode, //供应商
        supplierId: this.supplier.supplierId, //供应商id
        invoiceType: this.invoiceType, // 发票类型
        invoiceStatus: this.invoiceStatus, // 发票状态
        poNo: this.poNo, //采购合同号
        extCode: this.extCode, //外部合同号
        currencyCode: this.coin.currencyCode, //币种
      };
      if (this.invoiceDate) {
        params.fromInvoiceDate = this.invoiceDate[0];
        params.toInvoiceDate = this.invoiceDate[1];
      } else {
        params.fromInvoiceDate = "";
        params.toInvoiceDate = "";
      }
      if (this.createDate) {
        params.fromCreatedDate = this.createDate[0];
        params. toCreatedDate = this.createDate[1];
      } else {
        params.fromCreatedDate = "";
        params.toCreatedDate = "";
      }
      this.$emit("getSearchs", params);
    }
  },
  mounted() {}
};
</script>
