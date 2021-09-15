<template>
<!--收款单报表-->
<div class="receiptReport content-div">
    <div class="button-div auto-sibling">
      <el-button class="query-button" @click="queryData" icon="el-icon-search">查询</el-button>
      <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
    </div>
    <div class="index-div3 input-div auto-sibling" id="input-div">
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
      <compony-select class="el-col el-col-5" :companyName.sync="company"></compony-select>
      <!--部门选择-->
      <department-select
        class="el-col el-col-5"
        :branchName.sync="branch"
        :companyName="company"
      ></department-select>
      <el-col :span="5" class="el-col">
        <label>会计年度</label>
        <el-date-picker
          class="el-inputs"
          v-model="accountYear"
          value-format="yyyy"
          format="yyyy"
          align="right"
          size="small"
          type="year"
          placeholder="选择年"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>收款日期</label>
        <el-date-picker
          style="width:70%"
          class="el-input-date"
          size="mini"
          v-model="creditDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <!--收款类别选择-->
      <payee-category-select :payeeCategory.sync="payeeCategory"></payee-category-select>
      <!--收款单状态选择-->
      <payee-status-select :payeeStatus.sync="payeeStatus"></payee-status-select>
      <!--收款方式选择-->
      <payee-type-select :payeeType.sync="payeeType"></payee-type-select>
      <!--客户选择-->
      <customer-select :customer.sync="customer" class="el-col el-col-5" :supplier="supplier"></customer-select>
      <!--供应商选择-->
      <supplier-select :customer="customer" class="el-col el-col-5" :supplier.sync="supplier"></supplier-select>
      <!-- 款项内容选择 -->
      <!-- <cash-content-select :cashContent.sync="cashContent"></cash-content-select> -->
      <!-- 币别选择 -->
      <coin-select :coin.sync="coin" class="el-col el-col-5"></coin-select>
      <el-col :span="5" class="el-col">
        <label>票据台账号</label>
        <el-input v-model="instrumentBillNo" class="el-inputs" placeholder="请输入" size="small"></el-input>
      </el-col>
     
      <el-col :span="5" class="el-col">
        <label>是否认领</label>
        <el-select v-model="isConfirmed" placeholder="请选择" size="small">
          <el-option label="全部" value></el-option>
          <el-option label="否" :value="0"></el-option>
          <el-option label="是" :value="1"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>收款单号</label>
        <el-input v-model="gatheringNo" class="el-inputs" size="small" placeholder="请输入"></el-input>
      </el-col>
      <!-- <el-col :span="5" class="el-col">
        <label>维度汇总</label>
        <el-select v-model="selectType"  size="small">
          <el-option label="币别" :value="1"></el-option>
          <el-option label="部门" :value="2"></el-option>
          <el-option label="付款单位" :value="3"></el-option>
        </el-select>
      </el-col>   -->
    </div>
    </div>
    <!-- 表格 -->
    <div class="button-div auto-sibling">
       <el-button @click="exportExcel" v-if="$actionFlag('F001')" icon="el-icon-download">导出</el-button>
    </div>
    <div class="el-table-div" v-auto>
      <el-table
        border
        center
        height="calc(100% - 35px)"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        class="el-table"
        :cell-class-name="cell"
        show-summary
        :summary-method="getSummaries"
        v-loading="loading"
      >
        <el-table-column prop="companyName" width="170" show-overflow-tooltip label="公司"></el-table-column>
        <el-table-column prop="orgName" width="170" show-overflow-tooltip label="部门"></el-table-column>
        <el-table-column prop="accountYear" show-overflow-tooltip label="会计年度"></el-table-column>
        <el-table-column prop="gatheringNo" width="120" show-overflow-tooltip label="收款单号"></el-table-column>
        <el-table-column  width="100" show-overflow-tooltip label="收款日期">
          <template slot-scope="scope">
            <span>{{ scope.row.payeeDate | time2Date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payCompanyName" width="180" show-overflow-tooltip label="付款单位"></el-table-column>
        <el-table-column label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ statusObj[scope.row.payeeStatus] }}</span>
          </template>
        </el-table-column>
       
        <el-table-column label="是否认领">
          <template slot-scope="scope">
            <span v-if="scope.row.isConfirmed == 1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
         <el-table-column prop="currencyCode" width="90" show-overflow-tooltip label="币别"></el-table-column>
        <el-table-column prop="payeeAmtOrigin" :formatter="$moneyFormat" width="120" show-overflow-tooltip label="收款金额"></el-table-column>
        <el-table-column prop="payeeAmtBase" :formatter="$moneyFormat" width="120"  show-overflow-tooltip label="收款本位币" ></el-table-column>
        <el-table-column prop="payeeCategory" width="100"  show-overflow-tooltip label="收款类别">
          <template slot-scope="scope">
            <span>{{ payeeCategoryObj[scope.row.payeeCategory] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payeeType" width="120" show-overflow-tooltip label="收款方式">
          <template slot-scope="scope">
            <span>{{ typeObj[scope.row.payeeType] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payeeBankName" width="180" show-overflow-tooltip label="收款银行"></el-table-column>
        <el-table-column prop="cashFlowCode" width="180" show-overflow-tooltip label="现金流编码"></el-table-column>
        <el-table-column prop="currencyRateRmb" width="120" show-overflow-tooltip label="汇率（人民币）">
           <template slot-scope="scope">
            <span>{{$numberToFixed(scope.row.currencyRateRmb,4)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bizPersonName" width="120" show-overflow-tooltip label="业务员"></el-table-column>
        <el-table-column prop="postDate" width="100" show-overflow-tooltip label="过账日期">
          <template slot-scope="scope">
            <span>{{ scope.row.postDate | time2Date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="unDate" width="100" show-overflow-tooltip label="冲销日期">
          <template slot-scope="scope">
            <span>{{ scope.row.unDate | time2Date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdName" show-overflow-tooltip label="创建人"></el-table-column>
        <el-table-column prop="createdTime" width="140" show-overflow-tooltip label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | time2Date }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[100, 200, 300,500]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
</div>
</template>
<script>
import componySelect from "@/views/fundsManage/conponents/componySelect";
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect2";
import customerSelect from "@/views/fundsManage/conponents/customerSelect2";
import coinSelect from "@/views/fundsManage/conponents/coinSelect";
import payeeCategorySelect from "@/views/fundsManage/conponents/payeeCategorySelect2";
import payeeStatusSelect from "@/views/fundsManage/conponents/payeeStatusSelect2";
import payeeTypeSelect from "@/views/fundsManage/conponents/payeeTypeSelect2";
import supplierSelect from "@/views/fundsManage/conponents/supplierSelect2";
import api from "@/api/reportQuery/report";
import {
  payeeCategoryObj,
  typeObj,
  statusObj,
  payeeTypeObj,
  crashContentObj
} from "./dictionary";
import {Loading } from "element-ui";
export default {
  name: "receiptReport",
  components: {
    componySelect,
    departmentSelect,
    payeeCategorySelect,
    payeeStatusSelect,
    payeeTypeSelect,
    customerSelect,
    supplierSelect,
    coinSelect,
  },
  data() {
    return {
      company: {}, //公司
      branch: {}, //部门
      accountYear: "", //会计年
      gatheringNo: "", //收款单号
      creditDate: [], //收款日期
      payeeCategory: "", //收款类别
      payeeStatus: "", //收款单状态
      payeeType: "", //收款方式
      customer: {}, //客户
      supplier: {}, //供应商
      cashContent: "", //款项内容
      coin: {}, //币种
      creditOdrs: "", //收款号
      instrumentBillNo: "", //票据台账号
      createdName: "", //创建人
      createDate:[], //创建日期
      isConfirmed: "", //是否认领
      show: true,
       page: {
        pageSize: 100,
        pageNum: 1,
        total: 0
      },
      loading: false,
      payeeCategoryObj,
      typeObj,
      statusObj,
      payeeTypeObj,
      crashContentObj,
      tableData: [],
      selectType:1,
      sumTol: {},//总计
    };
  },
  created(){
     if(window.IsShowDefaultCompanyInfo){
        this.company=window.defaultCompanyInfo;
      }
  },
  methods: {
    inputShow() {
      this.show = this.$showOne(this.show);
    },
    clearNone() {
      if(window.IsShowDefaultCompanyInfo){
        this.company=window.defaultCompanyInfo;
      }else{
        this.company = {}; //公司
      }
      this.branch = {}; //部门
      this.accountYear = ""; //会计年
      this.gatheringNo = ""; //收款单号
      this.creditDate =[]; //收款日期
      this.payeeCategory = ""; //收款类别
      this.payeeStatus = ""; //收款单状态
      this.payeeType = ""; //收款方式
      this.customer = {}; //客户
      this.supplier = {}; //供应商
      this.cashContent = ""; //款项内容
      this.coin = {}; //币种
      this.instrumentBillNo = ""; //票据台账号
      this.createdName = ""; //创建人
      this.createDate = []; //创建日期
      this.isConfirmed = ""; //是否认领
      this.selectType=1;
    },
    queryData(){
      this.postData();
      this.getSum();
    },
    postData() {
      let params = {
         pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
        companyCode: this.company.companyCode, //公司
        orgCode: this.branch.branchCode, //部门
        accountYear: this.accountYear, //会计年度
        gatheringNo: this.gatheringNo, //收款单号
        payeeCategory: this.payeeCategory, //收款类别
        payeeStatus: this.payeeStatus, //收款单状态
        payeeType: this.payeeType, //收款方式
        payCompanyCode: this.customer.customerCode
          ? this.customer.customerCode
          : this.supplier.supplierCode, //客户
        cashContent: this.cashContent, //款项内容
        currencyCode: this.coin.currencyCode, //币种
        instrumentBillNo: this.instrumentBillNo, //票据台账号
        createdName: this.createdName, //创建人
        isConfirmed: this.isConfirmed, //是否认领
        selectType:this.selectType
      };
      if (this.creditDate.length) {
        params.startPayeeDate = this.creditDate[0];
        params.endPayeeDate = this.creditDate[1];
      } else {
        params.startPayeeDate = "";
        params.endPayeeDate = "";
      }
      if (this.createDate.length) {
        params.startCreatedDate = this.createDate[0];
        params.endCreatedDate = this.createDate[1];
      } else {
        params.startCreatedDate = "";
        params.endCreatedDate = "";
      }
      this.loading = true;
      api.selectFiGatheringList(params).then(res => {
        if (res.code === "success") {
          this.tableData = res.data;
          this.page.total = res.total;
          this.loading = false;
        }
      });
    },
      //获取总计
    getSum() {
       let params = {
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
        companyCode: this.company.companyCode, //公司
        orgCode: this.branch.branchCode, //部门
        accountYear: this.accountYear, //会计年度
        gatheringNo: this.gatheringNo, //收款单号
        payeeCategory: this.payeeCategory, //收款类别
        payeeStatus: this.payeeStatus, //收款单状态
        payeeType: this.payeeType, //收款方式
        payCompanyCode: this.customer.customerCode
          ? this.customer.customerCode
          : this.supplier.supplierCode, //客户
        cashContent: this.cashContent, //款项内容
        currencyCode: this.coin.currencyCode, //币种
        instrumentBillNo: this.instrumentBillNo, //票据台账号
        createdName: this.createdName, //创建人
        isConfirmed: this.isConfirmed,//是否认领
        selectType:this.selectType
      };
      if (this.creditDate.length) {
        params.startPayeeDate = this.creditDate[0];
        params.endPayeeDate = this.creditDate[1];
      } else {
        params.startPayeeDate = "";
        params.endPayeeDate = "";
      }
      if (this.createDate.length) {
        params.startCreatedDate = this.createDate[0];
        params.endCreatedDate = this.createDate[1];
      } else {
        params.startCreatedDate = "";
        params.endCreatedDate = "";
      }
      api.selectFiGatheringSum(params).then(res => {
            this.sumTol = res.data;
        }).catch();
    },      //总计
    getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
            if (index === 0) {
            sums[index] = "总计";
            return;
            }
            let key = column.property;
            if (["payeeAmtBase"].findIndex(it => it == key) !== -1) {
                sums[index] = this.sumTol?this.$sumTolFormat(this.sumTol[key]):"" ;
            } else {
                sums[index] = "";
            }
        });
        return sums;

    },
    cell({row, column, rowIndex, columnIndex}) {
        if(column.property=="payeeAmtOrigin" || column.property=="payeeAmtBase"
        || column.property=="currencyRateRmb"){
          return 'rightTd'
        }else{
          return "";
        }
    },
    //导出
    exportExcel(){
      this.$confirm("为避免导出数据过多影响其它业务功能，请尽量利用查询条件筛选有效数据后再导出！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
       let params = {
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
        companyCode: this.company.companyCode, //公司
        orgCode: this.branch.branchCode, //部门
        accountYear: this.accountYear, //会计年度
        gatheringNo: this.gatheringNo, //收款单号
        payeeCategory: this.payeeCategory, //收款类别
        payeeStatus: this.payeeStatus, //收款单状态
        payeeType: this.payeeType, //收款方式
        payCompanyCode: this.customer.customerCode
          ? this.customer.customerCode
          : this.supplier.supplierCode, //客户
        cashContent: this.cashContent, //款项内容
        currencyCode: this.coin.currencyCode, //币种
        instrumentBillNo: this.instrumentBillNo, //票据台账号
        createdName: this.createdName, //创建人
        isConfirmed: this.isConfirmed ,//是否认领
        selectType:this.selectType

      };
      if (this.creditDate.length) {
        params.startPayeeDate = this.creditDate[0];
        params.endPayeeDate = this.creditDate[1];
      } else {
        params.startPayeeDate = "";
        params.endPayeeDate = "";
      }
      if (this.createDate.length) {
        params.startCreatedDate = this.createDate[0];
        params.endCreatedDate = this.createDate[1];
      } else {
        params.startCreatedDate = "";
        params.endCreatedDate = "";
      }
       //使用Element loading-start 方法
      var loading2 = Loading.service({
          lock: true,
          text: "加载中...",
          background: "rgba(0, 0, 0, 0.7)"
      });
        api.exportFiGatheringList(params).then(res=>{
          if(res.code=="fail"){
            this.$openWarning(res.message);
          }else{
            const blob = new Blob([res.data]);
            const a = document.createElement("a");
            const url = window.URL.createObjectURL(blob);
            const filename ="收款报表.xls";
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
          }
           loading2.close();
        }).catch(e=>{
           loading2.close();
        });
      }).catch();
    },
   
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.postData();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.postData();
    },
  },
};
</script>
