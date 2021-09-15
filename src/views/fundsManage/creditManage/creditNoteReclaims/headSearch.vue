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
          :payeeType="payeeType"
          :customer="customer"
          :coin="coin"
          :supplier="supplier"
          :createdName="createdName"
          :createDate="createDate"
          :isConfirmed="isConfirmed"
          :sharedStatus="sharedStatus"
          :payCompany="payCompany"
          :crashContent="crashContent"
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
      supplierList:[],
      company: ``, //公司
      branch: [], //部门
      payCompany: {}, //付款单位
      accountYear: "", //会计年
      gatheringNo: "", //收款单号
      creditDate: [], //收款日期
      payeeCategory: [], //收款类别
      sharedStatus: [], //认领状态
      payeeType: [], //收款方式
      customer: [], //客户
      supplier: [], //供应商
      crashContent: [], //款项内容
      coin: {}, //币种
      creditOdrs: "", //收款号
      instrumentNo: "", //票据号
      createdName: "", //创建人
      createDate: [], //创建日期
      isConfirmed: "", //是否认领
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      show: true
    };
  },
  created() {
    let data = this.$getQueryData(this);
    this.payCompany = [];
    this.departmentList = data.branch;
    this.customerList = data.customer;
    this.supplierList = data.supplier;
    this.payeeCategory= data.payeeCategoryList; //收款类别
    this.sharedStatus= data.sharedStatusList; //认领状态
    this.payeeType= data.payeeTypeList;//收款方式
    this.payCompany= data.payCompanyCodeList;
    this.crashContent= data.crashContentList; //款项内容
    if (data.startCreateDate) {
      this.createDate[0] = data.startCreatedDate;
      this.createDate[1] = data.endCreateDate;
    }

    if (data.startPayeeDate) {
      this.creditDate[0] = data.startPayeeDate;
      this.creditDate[1] = data.endPayeeDate;
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
      this.customer = [],
      this.supplier = [], //供应商
      this.customerList = [],
      this.supplierList = [],
      this.company = ``; //公司
      this.branch = []; //部门
      this.accountYear = ""; //会计年
      this.gatheringNo = ""; //收款单号
      this.creditDate = []; //收款日期
      this.payeeCategory = []; //收款类别
      this.sharedStatus = []; //认领状态
      this.payeeType = []; //收款方式
      this.payCompany = []; //付款单位
      this.crashContent = []; //款项内容
      this.coin = {}; //币种
      this.instrumentNo = ""; //票据号
      this.createdName = ""; //创建人
      this.createDate = []; //创建日期
      this.isConfirmed = ""; //是否认领
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
        accountYear: this.accountYear, //会计年度
        gatheringNo: this.gatheringNo, //收款单号
        payeeCategoryList: this.payeeCategory, //收款类别
        sharedStatusList: this.sharedStatus, //认领状态
        payeeTypeList: this.payeeType, //收款方式
        payCompanyCodeList:this.payCompany,
        // payCompanyCode: this.payCompany.customerCode
        //   (?) this.payCompany.customerCode
        //   : this.payCompany.supplierCode, //客户
        // bbCustomerBaseList:this.customer,//客户
        // bbSupplierBaseList:this.supplier,//供应商
        // bbSupplierBaseList:[this.payCompany],
        crashContentList: this.crashContent, //款项内容
        currencyCode: this.coin.currencyCode, //币种
        instrumentNo: this.instrumentNo, //票据号
        createdName: this.createdName, //创建人
        isConfirmed: this.isConfirmed, //是否认领
        startCreateDate: startCreatedDate ? startCreatedDate : "",
        endCreateDate: endCreatedDate ? endCreatedDate : ""
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
      data.company = this.company; //公司
      data.branch = this.branch; //部门
      data.payCompany = this.payCompany; //付款单位
      data.customer = this.customer; //客户
      data.supplier = this.supplier; //供应商
      data.coin = this.coin; //币种
      this.$setQueryData(this, data);
      this.$emit("getSearchs", params);
    },
    payeeCategorychangeHanlder() {
      this.payCompany = {};
    }
  },
  mounted() {}
};
</script>
