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
      <compony-select class="el-col el-col-5" :companyName.sync="companyName" ></compony-select>
      <!--部门选择-->
      <department-select
        class="el-col el-col-5"
        :branchName.sync="branchName"
        :companyName="companyName"
      ></department-select>
      <!--供应商选择-->
      <supplier-select :customer="customer" class="el-col el-col-5" :supplier.sync="supplier"></supplier-select>
      <!--销售类型选择  -->
      <poContract-type-select :labelName="'合同类型'" :poContractType.sync="poType" :data={dictNo:1014,bizCategory:0}></poContract-type-select>
      <el-col :span="5" class="el-col">
        <label>采购合同号</label>
        <el-input v-model="poNo" class="el-inputs" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>外部合同号</label>
        <el-input v-model="extCode" class="el-inputs" placeholder="请输入"></el-input>
      </el-col>
      <!-- 物料选择 -->
      <matter-select :goods.sync="goods" :labelName="'物料号'" class="el-col el-col-5"></matter-select>
      <!-- 合同状态选择 -->
      <soContract-Status-select :labelName="'单据状态'" :soContractStatus.sync="contractStatus"></soContract-Status-select>
      <!-- 贸易国别选择 -->
      <country-select :country.sync="country" :labelName="'贸易国别'" class="el-col el-col-5"></country-select>
      <!-- 港口选择 -->
      <arrivalPort-select :arrivalPort.sync="arrivalPort" :labelName="'目的港口'" class="el-col el-col-5"></arrivalPort-select>
      <!-- 币别选择 -->
      <coin-select :coin.sync="coin" :labelName="'业务币别'" class="el-col el-col-5"></coin-select>
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
import coinSelect from "@/views/fundsManage/conponents/coinSelect";
import countrySelect from "@/views/integratedQuery/conponents/countrySelect";
import matterSelect from "@/views/integratedQuery/conponents/matterSelect";
import arrivalPortSelect from "@/views/integratedQuery/conponents/arrivalPortSelect";
import poContractTypeSelect from "@/views/integratedQuery/conponents/poContractTypeSelect";
import soContractStatusSelect from "@/views/integratedQuery/conponents/soContractStatusSelect";
export default {
  name: "headSearch",
  components: {
    componySelect,
    departmentSelect,
    supplierSelect,
    poContractTypeSelect,
    soContractStatusSelect,
    coinSelect,
    countrySelect,
    matterSelect,
    arrivalPortSelect
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: {}, //部门
      customer: {}, //客户
      supplier: {}, //供应商
      poType: "", // 合同类型
      contractStatus: "", //合同状态
      poNo: "", //采购合同号
      extCode: "", //外部合同号
      goods:{},//物料号
      coin: {}, //币种
      country: '', //贸易国别
      arrivalPort:{},//目的港口
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
      this.poType = ""; // 合同类型
      this.contractStatus = ""; //合同状态
      this.poNo = ""; //采购合同号
      this.extCode = ""; //外部合同号
      this.goods = {}; //物料号
      this.coin = {}; //币种
      this.country = ''; //贸易国别
      this.arrivalPort = {}; //目的港口
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
        poType: this.poType, // 合同类型
        contractStatus: this.contractStatus, //合同状态
        poNo: this.poNo, //采购合同号
        extCode: this.extCode, //外部合同号
        goodsCode:this.goods.goodsCode, //物料号
        goodsId:this.goods.goodsId, //物料ID
        currencyCode: this.coin.currencyCode, //币种
        // tradeCountry: this.country.tradeCountry, //贸易国别id
        tradeCountryName: this.country, //贸易国别name
        unloadingPort:this.arrivalPort.portName //目的港口
      };
      if (this.createDate) {
        params.createdTimeBegin = this.createDate[0];
        params.createdTimeEnd = this.createDate[1];
      } else {
        params.createdTimeBegin = "";
        params.createdTimeEnd = "";
      }
      this.$emit("getSearchs", params);
    }
  },
  mounted() {}
};
</script>
