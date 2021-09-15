<template>
<!--收款单报表-->
<div class="paymentNoteReport content-div">
    <div class="button-div auto-sibling">
      <el-button class="query-button" @click="queryInfo" icon="el-icon-search">查询</el-button>
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
            <compony-select class="el-col el-col-5" :companyName.sync="company" :labelName="'公司名称'"></compony-select>
            <!--部门选择-->
            <department-select
                class="el-col el-col-5"
                :branchName.sync="branch"
                :companyName="company"
                :labelName="'部门名称'"
            ></department-select>
            <el-col :span="5" class="el-col">
                <label>会计年度</label>
                <el-date-picker
                class="el-inputs"
                v-model="accountingYear"
                value-format="yyyy"
                format="yyyy"
                align="right"
                size="small"
                type="year"
                placeholder="选择年"
                ></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
                <label>付款单号</label>
                <el-input v-model="paymentCode" class="el-inputs" size="small" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
                <label>付款日期</label>
                <el-date-picker
                style="width:70%"
                class="el-inputs"
                size="mini"
                v-model="payDate"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                ></el-date-picker>
            </el-col>
            <!-- 款项内容选择 -->
            <cash-content-select :cashContent.sync="moneyContent"></cash-content-select>
            <!--付款单状态选择-->
            <pay-status-select :payStatus.sync="payStatus"></pay-status-select>
            <!--付款方式选择-->
            <pay-type-select :payType.sync="payType"></pay-type-select>
            <!--付款类别选择-->
            <paymentType-select :paymentType.sync="paymentType"></paymentType-select>
            <!--收款单位选择-->
            <payee-company-select
                class="el-col el-col-5"
                :payeeCompany.sync="payeeCompany"
                :paymentType="paymentType"
            ></payee-company-select>
            <!-- 业务单据类型 -->
            <apply-invoice-type-select :applyInvoiceType.sync="applyInvoiceType"></apply-invoice-type-select>
            <el-col :span="5" class="el-col">
                <label>业务单据编号</label>
                <el-input v-model="docNo" class="el-inputs" placeholder="请输入" size="small"></el-input>
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
      <el-button @click="exportExcel" v-if="$actionFlag('F001')"  icon="el-icon-download">导出</el-button>
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
        v-loading="loading"
         show-summary
        :summary-method="getSummaries"
        :cell-class-name="cell"
      >
        <el-table-column prop="companyName" width="170" show-overflow-tooltip label="公司"></el-table-column>
        <el-table-column prop="orgName" width="170" show-overflow-tooltip label="部门"></el-table-column>
        <el-table-column prop="paymentCode" width="120" show-overflow-tooltip label="付款单号"></el-table-column>
        <el-table-column prop="payDate" width="100" show-overflow-tooltip label="付款日期">
          <template slot-scope="scope">
            <span>{{ scope.row.payDate | time2Date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="receiverName" width="180" show-overflow-tooltip label="收款单位">
        </el-table-column>
        <el-table-column label="付款状态" show-overflow-tooltip prop="payStatus">
          <template slot-scope="scope">
            <span>{{ payStatusObj[scope.row.payStatus] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="currencyCode" show-overflow-tooltip label="币别"></el-table-column>
        <el-table-column 
            prop="payAmtTotal" width="120" 
          :formatter="$moneyFormat" 
          show-overflow-tooltip 
          label="付款金额"></el-table-column>
        <el-table-column 
        prop="payAmtTotalBase" 
        width="120"  
        show-overflow-tooltip 
        :formatter="$moneyFormat" 
        label="付款本位币"></el-table-column>
        <el-table-column prop="paymentType" width="110" show-overflow-tooltip label="付款类别">
          <template slot-scope="scope">
            <span>{{ paymentTypeObj[scope.row.paymentType] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bizPersonName" width="120" show-overflow-tooltip label="业务员"></el-table-column>
        <el-table-column prop="payType" width="120" show-overflow-tooltip label="付款方式">
          <template slot-scope="scope">
            <span>{{ payTypeObj[scope.row.payType] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payBankName" width="180" show-overflow-tooltip label="付款银行"></el-table-column>
        <el-table-column prop="payBankCashflowCode" width="180" show-overflow-tooltip label="付款银行现金流编码"></el-table-column>
        <el-table-column prop="serviceChargeBankName" width="180" show-overflow-tooltip label="手续费银行"></el-table-column>
        <el-table-column prop="feeBankCashflowCode" width="180" show-overflow-tooltip label="费用银行现金流编码"></el-table-column>
        <el-table-column prop="rmbCurrencyRate" width="120" show-overflow-tooltip label="汇率（人民币）">
          <template slot-scope="scope">
            <span>{{$numberToFixed(scope.row.rmbCurrencyRate, 4)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="postDate" width="100" show-overflow-tooltip label="过账日期">
             <template slot-scope="scope">
            <span>{{ scope.row.postDate | time2Date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="writeoffDate" width="100" show-overflow-tooltip label="冲销日期">
             <template slot-scope="scope">
            <span>{{ scope.row.writeoffDate | time2Date }}</span>
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
import payeeCompanySelect from "@/views/fundsManage/conponents/payeeCompanySelect";
import paymentTypeSelect from "@/views/fundsManage/conponents/paymentTypeSelect2";
import payTypeSelect from "@/views/fundsManage/conponents/payTypeSelect2";
import payStatusSelect from "@/views/fundsManage/conponents/payStatusSelect2";
import applyInvoiceTypeSelect from "@/views/fundsManage/conponents/applyInvoiceTypeSelect2";
import cashContentSelect from "@/views/fundsManage/conponents/cashContentSelect2";
import demandPaymentModal from "@/views/fundsManage/conponents/demandPaymentModal";
import { mapMutations } from "vuex";
import api from "@/api/reportQuery/report";
import {
  payStatusObj,
  applyInvoiceTypeObj,
  paymentTypeObj,
  payTypeObj,
  crashContentObj
} from "./dictionary.js";
import {Loading } from "element-ui";
export default {
  name: "paymentNoteReport",
  components: {
    componySelect,
    departmentSelect,
    payeeCompanySelect,
    paymentTypeSelect,
    payTypeSelect,
    payStatusSelect,
    applyInvoiceTypeSelect,
    cashContentSelect,
    demandPaymentModal,
  },
  data() {
    return {
      company: {}, //公司
      branch: {}, //部门
      paymentCode: "", //付款申请单号
      paymentType: "", //付款类别
      accountingYear: "", //会计年
      payType: "", //付款方式
      payDate:[], //付款日期
      moneyContent: "", //款项内容
      payStatus: "", //付款单状态
      applyInvoiceType: "", //申请单据类型
      docNo: "", //业务单据编号
      payeeCompany: {}, //收款单位
      createdName: "", //创建人
      createDate: [], //创建日期
       payStatusObj,
      applyInvoiceTypeObj,
      paymentTypeObj,
      payTypeObj,
      crashContentObj,
      page: {
        pageSize: 100,
        pageNum: 1,
        total: 0
      },
      selectioned: "", //选中
      selectionedArray: [],
      loading: false,
      show: true,
      selectType:1,
      tableData:[],
      sumTol: {},//总计
    };
  },
  created(){
     if(window.IsShowDefaultCompanyInfo){
        this.company=window.defaultCompanyInfo;
      }
  },
  methods: {
       cell({row, column, rowIndex, columnIndex}) {
      //第八列添加 red 类
        if(column.property=="payAmtTotal" || column.property=="payAmtTotalBase"
        || column.property=="rmbCurrencyRate"){
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
        paymentCode: this.paymentCode, //付款单号
        paymentType: this.paymentType, //付款类别
        accountingYear: this.accountingYear, //会计年度
        payType: this.payType, //付款方式
        moneyContent: this.moneyContent, //款项内容
        payStatus: this.payStatus, //付款申请状态
        applyInvoiceType: this.applyInvoiceType, //申请单据类型
        docNo: this.docNo, //业务单据编号
        receiverCode: this.payeeCompany.payeeCompanyCode, //收款单位
        selectType:this.selectType
      };
      if (this.payDate.length) {
        params.fromPaymentDate = this.payDate[0];
        params.toPaymentDate = this.payDate[1];
      } else {
        params.fromPaymentDate = "";
        params.toPaymentDate = "";
      }
      if (this.createDate.length) {
        params.fromCreatedDate= this.createDate[0];
        params.toCreatedDate = this.createDate[1];
      } else {
        params.fromCreatedDate = "";
        params.toCreatedDate = "";
      }
      //使用Element loading-start 方法
      var loading2 = Loading.service({
          lock: true,
          text: "加载中...",
          background: "rgba(0, 0, 0, 0.7)"
      });
        api.exportFiPaymentList(params).then(res=>{
          if(res.code=="fail"){
            this.$openWarning(res.message);
          }else{
            const blob = new Blob([res.data]);
            const a = document.createElement("a");
            const url = window.URL.createObjectURL(blob);
            const filename ="付款报表.xls";
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
    //
    queryInfo(){
      this.queryData();
      this.getSum();
    },
    queryData() {
      let params = {
         pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
        companyCode: this.company.companyCode, //公司
        orgCode: this.branch.branchCode, //部门
        paymentCode: this.paymentCode, //付款单号
        paymentType: this.paymentType, //付款类别
        accountingYear: this.accountingYear, //会计年度
        payType: this.payType, //付款方式
        moneyContent: this.moneyContent, //款项内容
        payStatus: this.payStatus, //付款申请状态
        applyInvoiceType: this.applyInvoiceType, //申请单据类型
        docNo: this.docNo, //业务单据编号
        receiverCode: this.payeeCompany.payeeCompanyCode, //收款单位
         selectType:this.selectType
        
      };
      if (this.payDate.length) {
        params.fromPaymentDate = this.payDate[0];
        params.toPaymentDate = this.payDate[1];
      } else {
        params.fromPaymentDate = "";
        params.toPaymentDate = "";
      }
      if (this.createDate.length) {
        params.fromCreatedDate= this.createDate[0];
        params.toCreatedDate = this.createDate[1];
      } else {
        params.fromCreatedDate = "";
        params.toCreatedDate = "";
      }
      this.loading = true;
      api.selectFiPaymentList(params).then(res => {
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
        paymentCode: this.paymentCode, //付款单号
        paymentType: this.paymentType, //付款类别
        accountingYear: this.accountingYear, //会计年度
        payType: this.payType, //付款方式
        moneyContent: this.moneyContent, //款项内容
        payStatus: this.payStatus, //付款申请状态
        applyInvoiceType: this.applyInvoiceType, //申请单据类型
        docNo: this.docNo, //业务单据编号
        receiverCode: this.payeeCompany.payeeCompanyCode, //收款单位
         selectType:this.selectType
        
      };
      if (this.payDate.length) {
        params.fromPaymentDate = this.payDate[0];
        params.toPaymentDate = this.payDate[1];
      } else {
        params.fromPaymentDate = "";
        params.toPaymentDate = "";
      }
      if (this.createDate.length) {
        params.fromCreatedDate= this.createDate[0];
        params.toCreatedDate = this.createDate[1];
      } else {
        params.fromCreatedDate = "";
        params.toCreatedDate = "";
      }
      api.selectFiPaymentSum(params).then(res => {
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
            if (["payAmtTotalBase"].findIndex(it => it == key) !== -1) {
                sums[index] =this.sumTol?this.$sumTolFormat(this.sumTol[key]):"";
            } else {
                sums[index] = "";
            }
        });
        return sums;

    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.queryData();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.queryData();
    },
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
      this.paymentCode = ""; //付款单号
      this.paymentType = ""; //付款类别
      this.accountingYear = ""; //会计年
      this.payType = ""; //付款方式
      this.payDate = []; //付款时间
      this.moneyContent = ""; //款项内容
      this.payStatus = ""; //付款单状态
      this.applyInvoiceType = ""; //申请单据类型
      this.docNo = ""; //业务单据编号
      this.payeeCompany = {}; //供应商
      this.createdName = ""; //创建人
      this.createDate =[]; //创建日期
      this.selectType=1;
    },
  }
};
</script>

