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
          :accountYear="accountYear"
          :gatheringNo="gatheringNo"
          :creditDate="creditDate"
          :payeeCategory="payeeCategory"
          :payeeStatus="payeeStatus"
          :payeeType="payeeType"
          :customer="customer"
          :coin="coin"
          :supplier="supplier"
          :instrumentBillNo="instrumentBillNo"
          :createdName="createdName"
          :createDate="createDate"
          :isConfirmed="isConfirmed"
          :isInterest="isInterest"
          :warrantCode="warrantCode"
          :warrantMonth="warrantMonth"
          :writeoffWarrantCode="writeoffWarrantCode"
          :writeoffWarrantMonth="writeoffWarrantMonth"
          :payAmtTotal="payAmtTotal"
          @changeInput="changeData"
          :departmentList="departmentList"
          :customerList="customerList"
          :supplierList="supplierList"
          
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
      payAmtTotal:['',''],
      departmentList:[],
      customerList:[],
      supplierList:[],
      company: ``, //公司
      branch: [], //部门
      accountYear: "", //会计年
      gatheringNo: "", //收款单号
      creditDate: [], //收款日期
      payeeCategory: [], //收款类别
      payeeStatus: [], //收款单状态
      payeeType: [], //收款方式
      customer: [], //客户
      supplier: [], //供应商
      cashContent: "", //款项内容
      coin: {}, //币种
      creditOdrs: "", //收款号
      instrumentBillNo: "", //票据台账号
      createdName: "", //创建人
      createDate: [], //创建日期
      isConfirmed: "", //是否认领
      isInterest:'',//是否计息
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
    };
  },
  created() {
    if (this.$route.params.status) {
      this.payeeStatus = this.$route.params.status
        .split(",")
        .map((item) => Number(item));
      this.postData();
    }
    let data = this.$getQueryData(this);
    this.departmentList = data.branch;
    this.customerList = data.customer;
    this.supplierList = data.supplier;
    this.payeeCategory=data.payeeCategoryList; //收款类别
    this.payeeStatus=data.payeeStatusList;//收款单状态
    this.payeeType=data.payeeTypeList; //收款方式
    if (data.startCreatedDate) {
      this.createDate[0] = data.startCreatedDate;
      this.createDate[1] = data.endCreatedDate;
    }
    if (data.startPayeeDate) {
      this.creditDate[0] = data.startPayeeDate;
      this.creditDate[1] = data.endPayeeDate;
    }
    if (data.payeeAmtOriginStart) {
      this.payAmtTotal[0] = data.payeeAmtOriginStart;
      this.payAmtTotal[1] = data.payeeAmtOriginEnd;
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
    postData() {
      if (this.createDate && this.createDate.length) {
        if (this.createDate[0] && this.createDate[1]) {
          var startCreatedTime = this.createDate[0] + "T00:00:00.000Z";
          var endCreatedTime = this.createDate[1] + "T23:59:59.000Z";
        }
      }
      if(JSON.stringify(this.branch) === "{}"){
        this.branch = [];
      }
      let params = {
        sort: this.sort, //公司
        companyCode: this.company.companyCode, //公司
        bbBranchBaseList: this.branch, //部门
        accountYear: this.accountYear, //会计年度
        gatheringNo: this.gatheringNo, //收款单号
        payeeCategoryList: this.payeeCategory, //收款类别
        payeeStatusList: this.payeeStatus, //收款单状态
        payeeTypeList: this.payeeType, //收款方式
        // payCompanyCode: this.customer.customerCode
        //   (?) this.customer.customerCode
        //   : this.supplier.supplierCode,
        bbCustomerBaseList:this.customer,//客户
        bbSupplierBaseList:this.supplier,//供应商
        cashContent: this.cashContent, //款项内容
        currencyCode: this.coin.currencyCode, //币种
        instrumentBillNo: this.instrumentBillNo, //票据台账号
        createdName: this.createdName, //创建人
        isConfirmed: this.isConfirmed, //是否认领
        isInterest:this.isInterest,
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        writeoffWarrantCode: this.writeoffWarrantCode, //冲销凭证号
        writeoffWarrantMonth: this.writeoffWarrantMonth, //冲销期间
        startCreateDate: startCreatedTime ? startCreatedTime : "",
        endCreateDate: endCreatedTime ? endCreatedTime : "",
        payeeAmtOriginStart :this.payAmtTotal[0],
        payeeAmtOriginEnd :this.payAmtTotal[1]
      };
      if (this.creditDate.length) {
        params.startPayeeDate = this.creditDate[0];
        params.endPayeeDate = this.creditDate[1];
      } else {
        params.startPayeeDate = "";
        params.endPayeeDate = "";
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
      data.customer = this.customer;
      data.coin = this.coin;
      data.supplier = this.supplier;
      data.payeeAmtOriginStart = this.payAmtTotal[0];
      data.payeeAmtOriginEnd = this.payAmtTotal[1];
      if((Number(data.payeeAmtOriginStart) >= Number( data.payeeAmtOriginEnd)) && data.payeeAmtOriginStart !=='' && data.payeeAmtOriginEnd !==''){
        this.$openWarning('请填写正确的起始金额');
        return
      }
      this.$setQueryData(this, data);
      this.$emit("getSearchs", params);
    },
    clearNone() {
      this.payAmtTotal=['','']
      this.branch = []; //部门
      this.company = ``; //公司
      this.accountYear = ""; //会计年
      this.gatheringNo = ""; //收款单号
      this.creditDate = []; //收款日期
      this.payeeCategory = []; //收款类别
      this.payeeStatus = []; //收款单状态
      this.payeeType = []; //收款方式
      this.customer = []; //客户
      this.supplier = []; //供应商
      this.cashContent = ""; //款项内容
      this.coin = {}; //币种
      this.instrumentBillNo = ""; //票据台账号
      this.createdName = ""; //创建人
      this.createDate = []; //创建日期
      this.isConfirmed = ""; //是否认领
      this.warrantCode = ""; //凭证号
      this.warrantMonth = ""; //期间
      this.writeoffWarrantCode = ""; //冲销凭证号
      this.writeoffWarrantMonth = ""; //冲销期间
      this.isInterest='';
    },
  },
  mounted() {},
};
</script>
