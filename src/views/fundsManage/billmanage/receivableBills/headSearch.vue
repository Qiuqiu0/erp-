<template>
  <div class="index-div3 input-div" id="input-div">
    <div v-if="$checkedNum(searchList) > 4">
      <p class="hide-input" v-if="show" @click="inputShow()">更多条件<i class="el-icon-caret-bottom"></i></p>
      <p class="hide-input" v-else @click="inputShow()">收起<i class="el-icon-caret-top"></i></p>
    </div>
    <el-form @keyup.enter.native="postData">
    <div class="search-div">
      <contract-search
          v-for="item in searchList"
          :label="item.label"
          :key="item.key"
          :checked="item.checked"
          :matchKey="item.key"
          :otherKey="item.otherKey"
          :createDate="createDate"
          :instrumentNo="instrumentNo"
          :invoiceCompany="invoiceCompany"
          :invoiceBank="invoiceBank"
          :receiptCompany="receiptCompany"
          :receiptByBank="receiptByBank"
          :isBig="isBig"
          :creator="creator"
          :company="companyInfo"
          :branch="branchInfo"
          :instrumentType="instrumentType"
          :invoiceArrivedDate="invoiceArrivedDate"
          :invoiceDate="invoiceDate"
          :instrumentYeildDate="instrumentYeildDate"
          :instrumentProp="instrumentProp"
          :instrumentBillNo="instrumentBillNo "
          :instrumentStatus="instrumentStatus"
          :acceptorInfo="acceptorInfo"
          :acceptorAccount="acceptorAccount"
          :warrantCode="warrantCode"
          :warrantMonth="warrantMonth"
          :coin="coin"
          :customer="customer"
          @changeInput="changeData"
          :departmentList="departmentList"
          :customerList="customerList"
      />
      <el-col class="el-col el-col-btn"></el-col>
    </div>
    </el-form>
  </div>
</template>
<script>
import contractSearch from "@/views/fundsManage/conponents/contractSearch";
export default {
  name: "headSearch",
  components: {
    contractSearch
  },
  props: {
    searchList: {
      type: Array
    },
    sort: {
      type: String
    }
  },
  data() {
    return {
      departmentList:[],
      customerList:[],
      companyInfo: ``, //公司
      branchInfo: [], //部门
      customer: [], //客户即付款单位 custId  付款单位码 payCompanyCode // 付款单位名称 payCompanyName
      coin: {}, //币别     currencyCode: "", //货币
      invoiceCompany: {}, //出票人    invoiceMan:"",//出票人名 invoiceManName
      invoiceBank: {}, //出票人银行 // invoiceBankCode: "", //出票人银行名称 invoiceBankName
      receiptCompany: {}, //收票人  receiptMan: "", //收票人名称 receiptManName
      receiptByBank: {}, //收票人银行 receiptBankCode: "", //收票人银行名称 receiptBankName
      creator: {}, //创建人 createdName: "", 创建者名称
      instrumentBillNo: "", //票据台账编号
      instrumentNo: "", //票据号
      instrumentType: "", //票据类型		(dictNo=2067)
      instrumentProp: "", //票据性质	(dictNo=3031)
      instrumentStatus: [], //票据状态	(dictNo=4006)
      invoiceDate: [], //开票日期
      invoiceArrivedDate: [], //到票日期
      instrumentYeildDate: [], //到期日期	datetime [e时间]			y		到期日期
      isBig: "", //大小票		默认值:0大小票:0大票,1小票
      invoiceBankAccount: "", //出票人银行账号				出票人银行账号
      receiptBankAccount: "", //收票人银行账号		收票人银行账号
      acceptorInfo: "", //承兑人信息			承兑人信息
      acceptorAccount: "", //承兑人账号			承兑人账号
      createDate: [], //创建日期
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      show: true,
      warrantCode: "", //凭证号
      warrantMonth: "" //期间
    };
  },
  created() {
    let data = this.$getQueryData(this);
    this.departmentList = data.branchInfo;
    this.customerList = data.customer;
    this.instrumentStatus= data.instrumentStatusList;
    if (data.createdTimeStart) {
      this.createDate[0] = data.createdTimeStart;
      this.createDate[1] = data.createdTimeEnd;
    }
    if (data.invoiceDateStart) {
      this.invoiceDate[0] = data.invoiceDateStart;
      this.invoiceDate[1] = data.invoiceDateEnd;
    }
    if (data.invoiceArrivedDateStart) {
      this.invoiceArrivedDate[0] = data.invoiceArrivedDateStart;
      this.invoiceArrivedDate[1] = data.invoiceArrivedDateEnd;
    }
    if (data.instrumentYeildDateStart) {
      this.instrumentYeildDate[0] = data.instrumentYeildDateStart;
      this.instrumentYeildDate[1] = data.instrumentYeildDateEnd;
    }
    this.postData();
  },
  methods: {
    changeData({ val, key }) {
      this[key] = val;
    },
    inputShow() {
      this.show = this.$showOne(this.show);
      this.$parent.$forceUpdate();
    },
    clearNone() {
      this.companyInfo = ``; //公司
      this.branchInfo = []; //部门
      this.customer = []; //客户 custId
      this.coin = {}; //币别     currencyCode: "", //货币
      this.invoiceCompany = {}; //出票人    invoiceMan:"",//出票人名 invoiceManName
      this.invoiceBank = {}; //出票人银行 // invoiceBankCode: "", //出票人银行名称 invoiceBankName
      this.receiptCompany = {}; //收票人  receiptMan: "", //收票人 receiptManName
      this.receiptByBank = {}; //收票人银行 receiptBankCode: "", //收票人银行 receiptBankName
      this.creator = {}; //创建人 createdName: "", 创建者名称
      this.instrumentBillNo = ""; //票据台账编号
      this.instrumentNo = ""; //票据号
      this.instrumentType = ""; //票据类型		(dictNo=2067)
      this.instrumentProp = ""; //票据性质	(dictNo=3031)
      this.instrumentStatus = []; //票据状态	(dictNo=4006)
      this.invoiceDate = []; //开票日期
      this.invoiceArrivedDate = []; //到票日期
      this.instrumentYeildDate = []; //到期日期	datetime [e时间]			y		到期日期
      this.isBig = ""; //大小票		默认值:0大小票:0大票,1小票
      this.invoiceBankAccount = ""; //出票人银行账号				出票人银行账号
      this.receiptBankAccount = ""; //收票人银行账号		收票人银行账号
      this.acceptorInfo = ""; //承兑人信息			承兑人信息
      this.acceptorAccount = ""; //承兑人账号			承兑人账号
      this.createDate = []; //创建日期
      this.warrantCode = ""; //凭证号
      this.warrantMonth = ""; //期间
    },
    postData() {
      if (this.createDate && this.createDate.length) {
        if (this.createDate[0] && this.createDate[1]) {
          var createdTimeStart = this.createDate[0] + "T00:00:00.000Z";
          var createdTimeEnd = this.createDate[1] + "T23:59:59.000Z";
        }
      }
      let bbBranchBaseList =this.branchName;
      if(typeof  this.branchName ==="string" && this.branchName.length ===0){
        bbBranchBaseList = []
      }
      let params = {
        sort: this.sort,
        companyCode: this.companyInfo.companyCode, //公司
        bbBranchBaseList, //部门
        bbCustomerBaseList: this.customer, //客户=付款单位  码 payCompanyCode // 付款单位名称 payCompanyName
        payCompanyName: this.customer.customerName, //
        currencyCode: this.coin.currencyCode, // 币别
        invoiceMan: this.invoiceCompany.companyCode, //出票人    invoiceMan:"",//出票人名 invoiceManName
        invoiceManName: this.invoiceCompany.companyName,
        invoiceBankName: this.invoiceBank.bankName, //出票人银行 invoiceBankCode 出票人银行名称 invoiceBankName
        invoiceBankCode: this.invoiceBank.bankCode,
        receiptMan: this.receiptCompany.companyCode, //收票人  receiptMan: "", //收票人名称 receiptManName
        receiptManName: this.receiptCompany.companyName,
        receiptBankName: this.receiptByBank.bankName, //收票人银行 receiptBankCode: "", //收票人银行名称 receiptBankName
        receiptBankCode: this.receiptByBank.bankCode,
        instrumentBillNo: this.instrumentBillNo, //票据台账编号
        instrumentNo: this.instrumentNo, //票据号
        instrumentType: this.instrumentType, //票据类型		(dictNo=2067)
        instrumentProp: this.instrumentProp, //票据性质	(dictNo=3031)
        instrumentStatusList: this.instrumentStatus, //票据状态	(dictNo=4006)
        isBig: this.isBig, //大小票		默认值:0大小票:0大票,1小票
        invoiceBankAccount: this.invoiceBankAccount, //出票人银行账号				出票人银行账号
        receiptBankAccount: this.receiptBankAccount, //收票人银行账号		收票人银行账号
        acceptorInfo: this.acceptorInfo, //承兑人信息			承兑人信息
        acceptorAccount: this.acceptorAccount, //承兑人账号			承兑人账号
        createdName: this.creator.empName, //创建人
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        createdTimeStart: createdTimeStart ? createdTimeStart : "",
        createdTimeEnd: createdTimeEnd ? createdTimeEnd : ""
      };
      // invoiceDate: "", //开票日期
      // invoiceArrivedDate: "", //到票日期
      // instrumentYeildDate: "", //到期日期	datetime [e时间]			y		到期日期
      // createDate: "", //创建日期
      if (this.invoiceDate && this.invoiceDate.length) {
        params.invoiceDateStart = this.invoiceDate[0];
        params.invoiceDateEnd = this.invoiceDate[1];
      } else {
        params.invoiceDateStart = "";
        params.invoiceDateEnd = "";
      }
      // if (this.createDate.length) {
      //     params.createdTimeStart = this.createDate[0];
      //     params.createdTimeEnd = this.createDate[1];
      //   } else {
      //     params.createdTimeStart = "";
      //     params.createdTimeEnd = "";
      //   }
      if (this.invoiceArrivedDate && this.invoiceArrivedDate.length) {
        params.invoiceArrivedDateStart = this.invoiceArrivedDate[0];
        params.invoiceArrivedDateEnd = this.invoiceArrivedDate[1];
      } else {
        params.invoiceArrivedDateStart = "";
        params.invoiceArrivedDateEnd = "";
      }
      if (this.instrumentYeildDate && this.instrumentYeildDate.length) {
        params.instrumentYeildDateStart = this.instrumentYeildDate[0];
        params.instrumentYeildDateEnd = this.instrumentYeildDate[1];
      } else {
        params.instrumentYeildDateStart = "";
        params.instrumentYeildDateEnd = "";
      }
      let data = params;
      data.companyInfo = this.companyInfo; //公司
      data.branchInfo = this.branchInfo; //部门
      data.customer = this.customer; //客户即付款单位 custId  付款单位码 payCompanyCode // 付款单位名称 payCompanyName
      data.coin = this.coin; //币别     currencyCode: "", //货币
      data.invoiceCompany = this.invoiceCompany; //出票人    invoiceMan:"",//出票人名 invoiceManName
      data.invoiceBank = this.invoiceBank; //出票人银行 // invoiceBankCode: "", //出票人银行名称 invoiceBankName
      data.receiptCompany = this.receiptCompany; //收票人  receiptMan: "", //收票人名称 receiptManName
      data.receiptByBank = this.receiptByBank; //收票人银行 receiptBankCode: "", //收票人银行名称 receiptBankName
      data.creator = this.creator; //创建人
      this.$setQueryData(this, data);
      let postdata = {};
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          if (params[key] !== "") {
            postdata[key] = params[key];
          } else {
            continue;
          }
        }
      }
      this.$emit("getSearchs", postdata);
    }
  },
  mounted() {}
};
</script>
