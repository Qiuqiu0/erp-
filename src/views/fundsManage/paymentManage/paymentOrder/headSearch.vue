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
          :company="company"
          :branch="branch"
          :createdName="createdName"
          :createDate="createDate"
          :paymentCode="paymentCode"
          :payDate="payDate"
          :moneyContent="moneyContent"
          :payStatus="payStatus"
          :payType="payType"
          :paymentType="paymentType"
          :payeeCompany="payeeCompany"
          :applyInvoiceType="applyInvoiceType"
          :docNo="docNo"
          :payeeAmtOrigin="payeeAmtOrigin"
          :payApplyCode="payApplyCode"
          @changeInput="changeData"
          :accountYear="accountYear"
          :departmentList="departmentList"
          :isInterest="isInterest"
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
    contractSearch,
  },
  props: {
    searchList: {
      type: Array,
    },
    sort: {
      type: String,
    },
  },
  data() {
    return {
      departmentList:[],
      accountYear:'',
      company: ``, //公司
      branch: [], //部门
      paymentCode: "", //付款申请单号
      paymentType: [], //付款类别
      payeeAmtOrigin : ['',''], //付款区间
      accountingYear: "", //会计年
      payType: [], //付款方式
      payDate: [], //付款日期
      moneyContent: [], //款项内容
      payStatus: [], //付款单状态
      applyInvoiceType: [], //申请单据类型
      docNo: "", //业务单据编号
      payeeCompany: {}, //收款单位
      createdName: "", //创建人
      createDate: [], //创建日期
      navColor: {
        button: {
          backgroundColor: "", //按钮颜色
        },
      },
      show: true,
      warrantCode: "", //凭证号
      warrantMonth: "", //期间
      writeoffWarrantCode: "", //冲销凭证号
      writeoffWarrantMonth: "", //冲销期间
      payApplyCode: "",
      isInterest:''
    };
  },
  created() {
    if (this.$route.params.status) {
      this.payStatus = this.$route.params.status
        .split(",")
        .map((item) => Number(item));
      this.postData();
    }
    let data = this.$getQueryData(this);
    this.departmentList = data.branch;
    this.paymentType=data.paymentTypeList;
    this.payType=data.payTypeList;
    this.moneyContent=data.moneyContentList; //款项内容
    this.payStatus=data.payStatusList; //付款申请状态
    this.applyInvoiceType=data.applyInvoiceTypeList; //申请单据类型
    if (data.fromCreatedDate) {
      this.createDate[0] = data.fromCreatedDate ? data.fromCreatedDate : "";
      this.createDate[1] = data.toCreatedDate ? data.toCreatedDate : "";
    }
    if (data.fromPaymentDate) {
      this.payDate[0] = data.fromPaymentDate ? data.fromPaymentDate : "";
      this.payDate[1] = data.toPaymentDate ? data.toPaymentDate : "";
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
      this.accountYear = "";
      this.company = ``; //公司
      this.branch = []; //部门
      this.paymentCode = ""; //付款单号
      this.paymentType = []; //付款类别
      this.payeeAmtOrigin = ['','']; //付款区间
      this.accountingYear = ""; //会计年
      this.payType = []; //付款方式
      this.payDate = []; //付款时间
      this.moneyContent = []; //款项内容
      this.payStatus = []; //付款单状态
      this.applyInvoiceType = []; //申请单据类型
      this.docNo = ""; //业务单据编号
      this.payeeCompany = {}; //供应商
      this.createdName = ""; //创建人
      this.createDate = []; //创建日期
      this.warrantCode = ""; //凭证号
      this.warrantMonth = ""; //期间
      this.writeoffWarrantCode = ""; //冲销凭证号
      this.writeoffWarrantMonth = ""; //冲销期间
      this.payApplyCode = "";
      this.isInterest='';
    },
    postData() {
      if (this.createDate && this.createDate.length) {
        if (this.createDate[0] && this.createDate[1]) {
          var fromCreatedDate = this.createDate[0] + "T00:00:00.000Z";
          var toCreatedDate = this.createDate[1] + "T23:59:59.000Z";
        }
      }
      let params = {
        sort: this.sort,
        companyCode: this.company.companyCode, //公司
        bbBranchBaseList: this.branch, //部门
        paymentCode: this.paymentCode, //付款单号
        paymentTypeList: this.paymentType, //付款类别
        accountingYear: this.accountingYear, //会计年度
        payTypeList: this.payType, //付款方式
        moneyContentList: this.moneyContent, //款项内容
        payStatusList: this.payStatus, //付款申请状态
        applyInvoiceTypeList: this.applyInvoiceType, //申请单据类型
        docNo: this.docNo, //业务单据编号
        receiverCode: this.payeeCompany.payeeCompanyCode, //收款单位
        receiverName: this.payeeCompany.payeeCompanyName,
        createdName: this.createdName, //创建人
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        accountingYear:this.accountYear,
        writeoffWarrantCode: this.writeoffWarrantCode, //冲销凭证号
        writeoffWarrantMonth: this.writeoffWarrantMonth, //冲销期间
        fromCreatedDate: fromCreatedDate ? fromCreatedDate : "",//创建时间
        toCreatedDate: toCreatedDate ? toCreatedDate : "",
        payApplyCode: this.payApplyCode,
        isInterest:this.isInterest
      };
      if (this.payDate.length) {
        params.fromPaymentDate = this.payDate[0];
        params.toPaymentDate = this.payDate[1];
      } else {
        params.fromPaymentDate = "";
        params.toPaymentDate = "";
      }
      // if (this.createDate.length) {
      //   params.fromCreatedDate= this.createDate[0];
      //   params.toCreatedDate = this.createDate[1];
      // } else {
      //   params.fromCreatedDate = "";
      //   params.toCreatedDate = "";
      // }
      let data = params;
      data.company = this.company;
      data.branch = this.branch;
      data.payeeCompany = this.payeeCompany;
      data.payAmtTotalStart = this.payeeAmtOrigin[0];
      data.payAmtTotalEnd = this.payeeAmtOrigin[1];

      if((Number(data.payAmtTotalStart) >= Number(data.payAmtTotalEnd)) && data.payAmtTotalStart !=='' && data.payAmtTotalEnd !==''){
        this.$openWarning('请填写正确的起始金额');
        return
      }
      this.$setQueryData(this, data);
      this.$emit("getSearchs", params);
    },
  },
  mounted() {},
};
</script>
