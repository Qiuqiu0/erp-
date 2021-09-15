<template>
  <div class="index-div3 input-div" id="input-div" >
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
          :invoiceType="invoiceType"
          :invoiceProperties="invoiceProperties"
          :invoiceCompany="invoiceCompany"
          :invoiceBank="invoiceBank"
          :billStatus="billStatus"
          :payBank="payBank"
          :receiptCompany="receiptCompany"
          :receiptByBank="receiptByBank"
          :timelineDate="timelineDate"
          :signDate="signDate"
          :isBig="isBig"
          :cashCode="cashCode"
          :creator="creator"
          :company="companyName"
          :branch="branchName"
          :coin="coin"
          @changeInput="changeData"
          :departmentList="departmentList"
          :instrumentBillNo="instrumentBillNo"
          :payDate="payDate"
          :warrantCode="warrantCode"
          :warrantMonth="warrantMonth"
          :writeoffWarrantCode="writeoffWarrantCode"
          :writeoffWarrantMonth="writeoffWarrantMonth"
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
      companyName:``, //公司
      branchName: [], //部门
      coin: {}, //币别     currencyCode: "", //货币
      invoiceCompany: {}, //出票人   // invoiceBy: "", //出票人 invoiceByName:"",//出票人名
      invoiceBank: {}, //出票人银行 // invoiceBankCode: "", //出票人银行 invoiceBankName: "", 	//出票人银行名称
      payBank: {}, //付款银行   // payBank: "", //付款银行
      receiptCompany: {}, //受票人 receiptByCode: "", //受票人编码		受票人编码
      receiptByBank: {}, //受票人银行 receiptByBankCode: "", //受票人银行编码		receiptByBankName: "", //受票人银行名称
      creator: {}, //创建人
      instrumentBillNo: "", //票据台账编号
      instrumentNo: "", //票据号
      invoiceType: "", //票据类型		(dictNo=2067)
      invoiceProperties: "", //票据性质	(dictNo=3031)
      billStatus: [], //票据状态	(dictNo=4006)
      timelineDate: [], //到期日期	datetime [e时间]			y		到期日期
      signDate: [], //签发日期	datetime [e时间]			y		签发日期	f
      isBig: "", //大小票		默认值:0大小票:0大票,1小票
      cashCode: "", //现金流量代码	varchar(8) [e描述_8]			y		现金流量代码
      payDate: [], //付款日期
      createDate: [], //创建日期
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      show: true,
      warrantCode: "", //凭证号
      warrantMonth: "", //期间
      writeoffWarrantCode: "", //冲销凭证号
      writeoffWarrantMonth: "" //冲销期间
    };
  },
  created() {
    let data = this.$getQueryData(this);
    this.departmentList = data.branchName;
    this.billStatus= data.billStatusList; //票据状态	(dictNo=4006)
    if (data.createdTimeStart) {
      this.createDate[0] = data.createdTimeStart;
      this.createDate[1] = data.createdTimeEnd;
    }
    if (data.payDateStart) {
      this.payDate[0] = data.payDateStart;
      this.payDate[1] = data.payDateEnd;
    }
    if (data.timelineDateStart) {
      this.timelineDate[0] = data.timelineDateStart;
      this.timelineDate[1] = data.timelineDateEnd;
    }
    if (data.signDateStart) {
      this.signDate[0] = data.signDateStart;
      this.signDate[1] = data.signDateEnd;
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
      this.companyName = ``; //公司
      this.branchName = []; //部门
      this.coin = {}; //币别     currencyCode: "", //货币
      this.invoiceCompany = {}; //出票人   // invoiceBy: "", //出票人
      this.invoiceBank = {}; //出票人银行 // invoiceBankCode: "", //出票人银行 invoiceBankName: "", 	//出票人银行名称
      this.payBank = {}; //付款银行   // payBank: "", //付款银行
      this.receiptCompany = {}; //受票人 receiptByCode: "", //受票人编码		受票人编码
      this.receiptByBank = {}; //受票人银行 receiptByBankCode: "", //受票人银行编码		receiptByBankName: "", //受票人银行名称
      this.creator = {}; //创建人
      this.instrumentBillNo = ""; //票据台账编号
      this.instrumentNo = ""; //票据号
      this.invoiceType = ""; //票据类型		(dictNo=2067)
      this.invoiceProperties = ""; //票据性质	(dictNo=3031)
      this.billStatus = []; //票据状态	(dictNo=4006)
      this.timelineDate = []; //到期日期	datetime [e时间]			y		到期日期
      this.signDate = []; //签发日期	datetime [e时间]			y		签发日期	f
      this.isBig = ""; //大小票		默认值:0大小票:0大票,1小票
      this.cashCode = ""; //现金流量代码	varchar(8) [e描述_8]			y		现金流量代码
      this.payDate = []; //付款日期
      this.createDate = []; //创建日期
      this.warrantCode = ""; //凭证号
      this.warrantMonth = ""; //期间
      this.writeoffWarrantCode = ""; //冲销凭证号
      this.writeoffWarrantMonth = ""; //冲销期间
      this.payDate = [];
    },
    postData() {
      if (this.createDate && this.createDate.length) {
        if (this.createDate[0] && this.createDate[1]) {
          var createdTimeStart = this.createDate[0] + "T00:00:00.000Z";
          var createdTimeEnd = this.createDate[1] + "T23:59:59.000Z";
        }
      }
      let params = {
        sort: this.sort,
        companyCode: this.companyName.companyCode, //公司
        bbBranchBaseList: this.branchName, //部门
        currencyCode: this.coin.currencyCode,
        invoiceBy: this.invoiceCompany.companyCode,
        invoiceByName: this.invoiceCompany.companyName,
        invoiceBankName: this.invoiceBank.bankName,
        invoiceBankCode: this.invoiceBank.bankCode,
        payBankName: this.payBank.bankName,
        payBank: this.payBank.bankCode,
        receiptByCode: this.receiptCompany.supplierCode,
        receiptByName: this.receiptCompany.supplierName,
        receiptByBankName: this.receiptByBank.bankName,
        receiptByBankCode: this.receiptByBank.bankCode,
        instrumentBillNo: this.instrumentBillNo, //票据台账编号
        instrumentNo: this.instrumentNo, //票据号
        invoiceType: this.invoiceType, //票据类型		(dictNo=2067)
        invoiceProperties: this.invoiceProperties, //票据性质	(dictNo=3031)
        billStatusList: this.billStatus, //票据状态	(dictNo=4006)
        isBig: this.isBig, //大小票		默认值:0大小票:0大票,1小票
        cashCode: this.cashCode, //现金流量代码	varchar(8) [e描述_8]			y		现金流量代码
        createdName: this.creator.empName, //创建人
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        writeoffWarrantCode: this.writeoffWarrantCode, //冲销凭证号
        writeoffWarrantMonth: this.writeoffWarrantMonth, //冲销期间
        createdTimeStart: createdTimeStart ? createdTimeStart : "",
        createdTimeEnd: createdTimeEnd ? createdTimeEnd : ""
      };
      // payDate: "", //付款日期
      // createDate: "", //创建日期
      // timelineDate: "", //到期日期	datetime [e时间]			y		到期日期
      // signDate: "", //签发日期	datetime [e时间]			y		签发日期	f
      if (this.payDate&&this.payDate.length) {
        params.payDateStart = this.payDate[0];
        params.payDateEnd = this.payDate[1];
      } else {
        params.payDateStart = "";
        params.payDateEnd = "";
      }
      // if (this.createDate.length) {
      //   params.createdTimeStart = this.createDate[0];
      //   params.createdTimeEnd = this.createDate[1];
      // } else {
      //   params.createdTimeStart = "";
      //   params.createdTimeEnd = "";
      // }
      if (this.timelineDate && this.timelineDate.length) {
        params.timelineDateStart = this.timelineDate[0];
        params.timelineDateEnd = this.timelineDate[1];
      } else {
        params.timelineDateStart = "";
        params.timelineDateEnd = "";
      }
      if (this.signDate && this.signDate.length) {
        params.signDateStart = this.signDate[0];
        params.signDateEnd = this.signDate[1];
      } else {
        params.signDateStart = "";
        params.signDateEnd = "";
      }
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
      let data = params;
      data.companyName = this.companyName; //公司
      data.branchName = this.branchName; //部门
      data.coin = this.coin; //币别     currencyCode: "", //货币
      data.invoiceCompany = this.invoiceCompany; //出票人   // invoiceBy: "", //出票人 invoiceByName:"",//出票人名
      data.invoiceBank = this.invoiceBank; //出票人银行 // invoiceBankCode: "", //出票人银行 invoiceBankName: "", 	//出票人银行名称
      data.payBank = this.payBank; //付款银行   // payBank: "", //付款银行
      data.receiptCompany = this.receiptCompany; //受票人 receiptByCode: "", //受票人编码		受票人编码
      data.receiptByBank = this.receiptByBank; //受票人银行 receiptByBankCode: "", //受票人银行编码		receiptByBankName: "", //受票人银行名称
      data.creator = this.creator; //创建人
      this.$setQueryData(this, data);
      this.$emit("getSearchs", postdata);
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
/deep/ .input-div .el-col:last-child {
  margin-bottom: 0px !important;
}
/deep/ .index .index-div3 .el-col:last-child {
  margin-bottom: 0px !important;
}
</style>
