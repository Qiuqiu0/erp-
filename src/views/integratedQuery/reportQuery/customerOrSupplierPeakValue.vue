<!--客商额度峰值查询-->
<template>
  <div id="supplierCredit">
    <!--查询条件-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-search" class="query-button" @click="query">查询</el-button>
      <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
    </div>
    <div class="input-div auto-sibling">
      <p class="hide-input" v-if="queryArea" @click="queryAreaShow()">更多条件<i class="el-icon-caret-bottom"></i></p>
      <p class="hide-input" v-else @click="queryAreaShow()">收起<i class="el-icon-caret-top"></i></p>
      <div class="search-div">
        <el-col :span="5" class="el-col">
          <label>公司</label>
          <el-input v-model="companyInfo.companyName" class="el-inputs" placeholder="请选择" disabled></el-input>
          <span class="comicon" @click="companyPopup"><i class="el-icon-search"></i></span>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>部门</label>
          <el-select  v-model="branchInfo"
                  class="el-inputs"
                  placeholder="请选择"
                  multiple
                  filterable
                  remote
                  :remote-method="getDepartment"
                  collapse-tags
                  value-key="branchId"
            >
            <el-option
                v-for="item in departmentList"
                :key="item.branchId"
                :label="item.branchName"
                :value="item">
            </el-option>
          </el-select>
          <span class="comicon" @click="branchPopup" style="width: 10%;z-index: 2"
            ><i class="el-icon-search"></i
          ></span>
        </el-col>
         <el-col :span="5" class="el-col">
          <label>客户</label>
          <el-select
            v-model="customerInfo"
            class="el-inputs"
            placeholder="请选择"
            multiple
            filterable
            remote
            :remote-method="getCustomer"
            collapse-tags
            value-key="customerId"
          >
            <el-option
                v-for="item in customerList"
                :key="item.customerId"
                :label="item.customerName"
                :value="item">
            </el-option>
          </el-select>
          <span class="comicon" @click="customerPopup" style="width: 10%;z-index: 2"
            ><i class="el-icon-search"></i
          ></span>
        </el-col>
         <el-col :span="5" class="el-col">
            <label>供应商</label>
            <el-select  v-model="supplierInfo"
                    class="el-inputs"
                    placeholder="请选择"
                    multiple
                    filterable
                    remote
                    :remote-method="getSupplier"
                    collapse-tags
                    value-key="supplierId"
          >
          <el-option
              v-for="item in supplierList"
              :key="item.supplierId"
              :label="item.supplierName"
              :value="item">
          </el-option>
          </el-select>
          <span class="comicon" @click="supplierPopup" style="width: 10%;z-index: 2"
            ><i class="el-icon-search"></i
          ></span>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>申请日期</label>
          <el-date-picker 
          style="width:70%"
          v-model="applyTime" 
            :clearable="false" 
            type="daterange"
            class="el-selects"
            size="mini"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"></el-date-picker>
        </el-col>
      </div>
    </div>
    <!--列表信息-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-download" v-if="$actionFlag(`F001`)" @click="download">导出</el-button>
    </div>
    <div class="el-table-div" v-auto>
      <el-table
        class="el-table"
        border
        center
        height="calc(100% - 35px)"
        :data="creditData"
        v-loading="loading"
        ref="multipleTable"
        :cell-class-name="cell"
       >
        <el-table-column type="index" label="序号" width="60" fixed></el-table-column>
        <el-table-column prop="dayStr"  label="日期"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="orgName" label="部门名称" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="custName" label="客商名称" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="creditAmt" label="已审批额度金额" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="occurAmt" label="当日额度占用" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="leftAmt" label="当日可用额度"  show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination
        class="pageArea"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="currentChange"
        @size-change="currentSize"
        :current-page="pageNum"
        :page-sizes="[100,200,300,500]"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
      <!--公司弹窗-->
    <company-select v-if="companyShow" :tipShow="companyShow" @tipsCancle="companyCancel" @tipsSure="companySure"></company-select>
     <!--部门弹窗-->
    <branch-select v-if="branchShow" :tipShow="branchShow" :data="companyInfo" @departmentCancle="branchCancel" @departmentSure="branchSure"></branch-select>
    <!--供应商弹窗-->
    <supplier-select v-if="supplierShow" :tipShow="supplierShow" :filterQuery="parentFilter" @supplierCancle="supplierCancel" @supplierSure="supplierSure"></supplier-select>
     <!--客户弹窗-->
    <customer-select v-if="customerShow" :tipShow="customerShow" :filterQuery="parentFilter" @customerCancle="customerCancel" @customerSure="customerSure"></customer-select>
  </div>
</template>
<script>
import companySelect from "@/components/componySelect";
import PopupApi from "@/api/component";
import billApi from "@/api/reportQuery/bill.js";
import Compony from "@/api/comdepartment/componySelect";
import branchSelect from "@/components/departmentSelect2";
import customerSelect from "@/components/customerSelect2";
import supplierSelect from "@/components/supplierSelect2";
import { Loading } from "element-ui";
export default {
  name: "customerOrSupplierPeakValue",
  data() {
    return {
        companyShow:false,
        companyInfo:{},
        queryArea:true,
        pageNum:1,
        pageSize:100,
        total:0,
        loading:false,
        supplierShow:false,
        supplierList:[],
        supplierInfo:[],
        customerShow:false,
        customerList:[],
        customerInfo:[],
        departmentList:[],
        branchShow:false,//公司
        branchInfo:[],
        creditData:[],//列表数据
        applyTime:[],//申请时间
        parentFilter: {
          isSubsidiary: 0 //只过滤出母公司供应商
        },

    }
  },
  created(){
     if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      }
  },
  methods:{
     cell({row, column, rowIndex, columnIndex}) {
    //第八列添加 red 类
        if(column.property=="creditAmt" || column.property=="occurAmt" || 
        column.property=="leftAmt"){
        return 'rightTd'
        }else{
        return "";
        }
    },
    
    initData(){
      let data={
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        startDateStr:this.applyTime.length?this.applyTime[0]:'',
        endDateStr:this.applyTime.length?this.applyTime[1]:'',
        companyCode:this.companyCode,
        bbSupplierBaseList:this.supplierInfo,
        bbCustomerBaseList:this.customerInfo,
        bbBranchBaseList:this.branchInfo,
      }
      billApi.creditDailyReport(data).then(res=>{
        this.creditData=res.data.list;
        this.total=res.data.total;
      })
    },
    download(){
        let data={
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        startDateStr:this.applyTime.length?this.applyTime[0]:'',
        endDateStr:this.applyTime.length?this.applyTime[1]:'',
        companyCode:this.companyCode,
        bbSupplierBaseList:this.supplierInfo,
        bbCustomerBaseList:this.customerInfo,
        bbBranchBaseList:this.branchInfo,
      }
        data = this.$queryFilter(data);
        //使用Element loading-start 方法
        var loading2 = Loading.service({
            lock: true,
            text: "加载中...",
            background: "rgba(0, 0, 0, 0.7)"
        });
        billApi.creditDailyExport(data).then(res=>{
            if(res.code=="fail"){
            this.$openWarning(res.message);
            }else{
            const blob = new Blob([res.data]);
            const a = document.createElement("a");
            const url = window.URL.createObjectURL(blob);
            const filename ="客商额度巅峰值报表.xls";
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
            }
            loading2.close();
        }).catch(e=>{
            loading2.close();
        });
    },
    //查询
    query() {
      this.page = 1;
      this.initData();
    },
    //重置
    reset() {
      this.supplierInfo=[];
      this.customerInfo=[];
      this.branchInfo=[];
      this.applyTime=[];//申请时间
      if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      }else{
        this.companyInfo = {}; //公司
      }
    },
    //部门远程搜索
     getDepartment(str){
      if(!str){
        return
      }
      let params = {
        pageNum: 1,
        rows: 200,
        companyId: this.companyInfo.companyId ,
        branchName: str,
        branchCode: '',
        isCollected:0
      };
      Compony.brnchList2(params)
          .then(res => {
            this.departmentList = res.data.list;
          })
          .catch(() => {
          });
    },
    //供应商远程搜索
    getSupplier(str){
      if(!str){
        return
      }
      PopupApi.supplierSelect2({
        page: 1,
        pageSize: 200,
        supplierName: str,
        //isInactive: 0,
        isCollected:0
      }).then(res => {
        if (res.code == "success") {
          this.supplierList = res.data.list;
        } else {
          this.$openWarning(res.message);
        }
      })
    },
     //客户远程搜索
    getCustomer(str){
      if(!str){
        return
      }
      let params = {
        pageNum: 1,
        rows: 200,
        customerName: str,
        isCollected:0
      };
      PopupApi.customerSelect2(params)
          .then(res => {
            this.customerList =  res.data.list;
          })
          .catch(() => {
          });

    },
    //是否显示查询区域
    queryAreaShow() {
      this.queryArea = this.$showOne(this.queryArea);
    },
      //翻页
    currentChange(e) {
      this.page = e;
      //this.supplierCreditList();
    },
    //单页数量
    currentSize(e) {
      this.page = 1;
      this.pageSize = e;
     // this.supplierCreditList();
    },
    //公司弹窗
    companyPopup() {
      this.companyShow = true;
    },
    //公司弹窗关闭
    companyCancel() {
      this.companyShow = false;
    },
    //公司弹窗确定并传值
    companySure(e) {
      this.companyShow = false;
      this.companyInfo = e;
    },
    //部门弹窗
    branchPopup() {
      this.branchShow = true;
    },
    //部门弹窗关闭
    branchCancel() {
      this.branchShow = false;
    },
    //部门弹窗确定并传值
    branchSure(e) {
      this.branchShow = false;
      this.branchInfo = e;
      this.departmentList = e;
    },
     //供应商弹窗
    supplierPopup() {
      this.supplierShow = true;
    },
    //供应商弹窗关闭
    supplierCancel() {
      this.supplierShow = false;
    },
    //供应商弹窗确定并传值
    supplierSure(e) {
      this.supplierShow = false;
      this.supplierInfo = e;
      this.supplierList = e;
    },
    //客户弹窗
    customerPopup() {
      this.customerShow = true;
    },
    //客户弹窗关闭
    customerCancel() {
      this.customerShow = false;
    },
    //客户弹窗确定并传值
    customerSure(e) {
      this.customerShow = false;
      this.customerInfo = e;
      this.customerList = e;
    },
  },
  components:{
    companySelect,
    branchSelect,
    customerSelect,
    supplierSelect

  }
 
};
</script>


