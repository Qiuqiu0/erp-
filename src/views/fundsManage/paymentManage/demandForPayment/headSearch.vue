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
          :otherKey="item.otherKey"
          :createdName="createdName"
          :createDate="createDate"
          :accountingYear="accountingYear"
          :moneyContent="moneyContent"
          :payType="payType"
          :paymentType="paymentType"
          :payeeCompany="payeeCompany"
          :applyInvoiceType="applyInvoiceType"
          :payApplyCode="payApplyCode"
          :applyPayTime="applyPayTime"
          :applyStatus="applyStatus"
          :blNo="blNo"
          :closeStatus="closeStatus"
          :isBusinessPay="isBusinessPay"
          :approvalStatus="approvalStatus"
          :approvalStatusList="approvalStatusList"
          @changeInput="changeData"
          :departmentList="departmentList"
      />

      <el-col class="el-col el-col-btn"></el-col>
    </div>
    </el-form>
  </div>
</template>
<script>
import contractSearch from "@/views/fundsManage/conponents/contractSearch";
import {selectStatusList} from "@/api/paymentManage/demandForPayment";


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
      company: ``, //公司
      branch: [], //部门
      payApplyCode: "", //付款申请单号
      paymentType: [], //付款类别
      accountingYear: "", //会计年
      payType: [], //付款方式
      applyPayTime: [], //申请付款时间
      moneyContent: [], //款项内容
      applyStatus: [], //付款申请状态
      applyInvoiceType: [], //申请单据类型
      blNo: "", //业务单据编号
      payeeCompany: {}, //付款单位
      createdName: "", //创建人
      createDate:[], //创建日期
      closeStatus:"",//关闭状态
      navColor: {
        button: {
          backgroundColor: "", //按钮颜色
        },
      },
      approvalStatus:'',//认领审批状态
      approvalStatusList:[],
      isBusinessPay:"",//是否非业务单据
      show: true
    };
  },
  created() {
    if (this.$route.params.status) {
      this.applyStatus = this.$route.params.status
        .split(",")
        .map((item) => Number(item));
      this.postData();
    }
    let data = this.$getQueryData(this);
    this.departmentList = data.branch;
    this.paymentType= data.paymentTypeList; //付款类别
    this.payType= data.payTypeList; //付款方式
    this.moneyContent= data.moneyContentList; //款项内容
    this.applyStatus= data.applyStatusList; //付款申请状态
    this.applyInvoiceType= data.applyInvoiceTypeList; //申请单据类型
    if (data.startCreatedDate) {
      this.createDate[0] = data.startCreatedDate ? data.startCreatedDate : "";
      this.createDate[1] = data.endCreatedDate ? data.endCreatedDate : "";
    }
    if (data.fromApplyPayDate) {
      this.applyPayTime[0] = data.fromApplyPayDate ? data.fromApplyPayDate : "";
      this.applyPayTime[1] = data.toApplyPayDate ? data.toApplyPayDate : "";
    }
    this.selectApprovalStatus()

    this.postData();
  },
  methods: {
    selectApprovalStatus(){
      selectStatusList({ dictNo:1161}).then(res=>{
        this.approvalStatusList=res.data;
      })
    },
    changeData({ val, key }) {
      this[key] = val;
    },
    inputShow() {
      this.show = this.$showOne(this.show);
      this.$parent.$forceUpdate();
    },
    clearNone() {
      this.company = ``; //公司
      this.branch = []; //部门
      this.isBusinessPay='';
      this.payApplyCode = ""; //付款申请单号
      this.paymentType = []; //付款类别
      this.accountingYear = ""; //会计年
      this.payType = []; //付款方式
      this.applyPayTime = []; //申请付款时间
      this.moneyContent = []; //款项内容
      this.applyStatus = []; //付款申请状态
      this.applyInvoiceType = []; //申请单据类型
      this.blNo = ""; //业务单据编号
      this.payeeCompany = {}; //收款单位
      this.createdName = ""; //创建人
      this.createDate = []; //创建日期
      this.closeStatus = "";
      this.approvalStatus = "";
      this.isBusinessPay = "";
      this.approvalStatus='';
    },
    postData() {
      if (this.createDate && this.createDate.length) {
        if (this.createDate[0] && this.createDate[1]) {
          var startCreatedDate = this.createDate[0] + "T00:00:00.000Z";
          var endCreatedDate = this.createDate[1] + "T23:59:59.000Z";
        }
      }
      let params = {
        sort: this.sort,
        companyCode: this.company.companyCode, //公司
        bbBranchBaseList: this.branch, //部门
        payApplyCode: this.payApplyCode, //付款申请单号
        paymentTypeList: this.paymentType, //付款类别
        accountingYear: this.accountingYear, //会计年度
        payTypeList: this.payType, //付款方式
        moneyContentList: this.moneyContent, //款项内容
        applyStatusList: this.applyStatus, //付款申请状态
        applyInvoiceTypeList: this.applyInvoiceType, //申请单据类型
        blNo: this.blNo, //业务单据编号
        payeeCompanyCode: this.payeeCompany.payeeCompanyCode, //收款单位
        payeeName: this.payeeCompany.payeeCompanyName, //收款单位
        createdName: this.createdName, //创建人
        approvalStatus:this.approvalStatus,
        claimStatus:this.approvalStatus,
        closeStatus:parseInt(this.closeStatus),
        toCreatedDate:endCreatedDate?endCreatedDate:'',
        fromCreatedDate:startCreatedDate?startCreatedDate:'',
        isBusinessPay:this.isBusinessPay
      };
      if (this.applyPayTime && this.applyPayTime.length) {
        params.fromApplyPayDate = this.applyPayTime[0];
        params.toApplyPayDate = this.applyPayTime[1];
      } else {
        params.fromApplyPayDate = "";
        params.toApplyPayDate = "";
      }
      // if (this.createDate.length) {
      //   params.startCreatedDate = this.createDate[0];
      //   params.endCreatedDate = this.createDate[1];
      // } else {
      //   params.startCreatedDate = "";
      //   params.endCreatedDate = "";
      // }
      let data = params;
      data.company = this.company;
      data.branch = this.branch;
      data.payeeCompany = this.payeeCompany;
      this.$setQueryData(this, data);
      this.$emit("getSearchs", params);
    },
  },

  mounted() {
    this.selectApprovalStatus();
  }
};
</script>
