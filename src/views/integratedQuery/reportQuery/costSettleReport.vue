<template>
  <div id="costSettle">
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
          <span class="moreIcon" @click="companyPopup"><i class="el-icon-search"></i></span>
        </el-col>
        <department-select 
          :companyInfo="companyInfo"
          :departmentList="departmentList"
          :branchInfo.sync="departmentData"
         class="el-col el-col-5"></department-select>
         <!--供应商-->
         <supplier-select
          :supplierList="supplierList"
          :supplierInfo.sync="supplierInfo"
         class="el-col el-col-5"></supplier-select>
         <el-col :span="5" class="el-col">
          <label>物料名称</label>
          <el-input v-model="matterInfo.skuName" class="el-inputs" placeholder="请选择" disabled></el-input>
          <span class="moreIcon" @click="matterPopup"><i class="el-icon-search"></i></span>
        </el-col>
         <el-col :span="5" class="el-col">
          <label>费用环节</label>
          <el-select clearable v-model="bizOccurrence" class="el-selects">
            <el-option v-for="(item, index) in costLinkDic" :key="index" :label="item.dict_value" :value="item.dict_key"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>费用名称</label>
          <el-input v-model="costName" class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>费用结算单号</label>
          <el-input v-model="settleCode" class="el-inputs"></el-input>
        </el-col> 
        <el-col :span="5" class="el-col">
          <label>费用预提单号</label>
          <el-input v-model="prefetchCode" class="el-inputs"></el-input>
        </el-col>  
        <el-col :span="5" class="el-col">
          <label>合同号</label>
          <el-input v-model="contractCode" class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>入库单号</label>
          <el-input v-model="wvNo" class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>结算凭证号</label>
          <el-input v-model="warrantCode" class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>预提凭证号</label>
          <el-input v-model="prefetchWarrantCode" class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>批次号</label>
          <el-input v-model="batchCode" class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
            <label>结算财务账期</label>
            <el-date-picker
              style="width:70%"
              v-model="warrantMonth"
              type="monthrange"
              size="mini"
              value-format="yyyy-MM"
              range-separator="-"
              start-placeholder="开始月份"
              end-placeholder="结束月份">
              </el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
            <label>预提财务账期</label>
            <el-date-picker
              style="width:70%"
              v-model="prefetchWarrantMonth"
              type="monthrange"
              size="mini"
              value-format="yyyy-MM"
              range-separator="-"
              start-placeholder="开始月份"
              end-placeholder="结束月份">
              </el-date-picker>
        </el-col>
      </div>
    </div>
    <!--列表信息-->
    <div class="button-div auto-sibling">
      <el-button @click="handlePrint()" v-if="$actionFlag(`F001`)"   icon="el-icon-download">导出</el-button>
    </div>
    <div class="el-table-div" v-auto>
      <el-table
        class="el-table"
        border
        center
        height="calc(100% - 35px)"
        :data="costSettleData"
        v-loading="loading"
        ref="multipleTable"
         show-summary
        :summary-method="getSummaries"
        :cell-class-name="cell">
        <el-table-column type="selection" width="55" ></el-table-column>
        <el-table-column type="index" label="序号" width="60" ></el-table-column>
        <el-table-column prop="settleCode" label="费用结算单号" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column  label="费用环节" min-width="100" show-overflow-tooltip>
            <template scope="scope">
            <span v-for="(item, index) in costLinkDic" :key="index">
              <span v-if="item.dict_code == scope.row.occurrence">
                {{ item.dict_value }}
              </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="deptName" label="部门" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="supplierName" label="供应商" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="costName" label="费用名称" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="contractCode" label="合同号" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="wvNo" label="入库单号" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodsName" label="物料名称" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="batchCode" label="批次号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="batchQty"   width="100" label="数量"  show-overflow-tooltip>
             <template slot-scope="scope">
                    <div class="content_right">
                <span>{{$numberToFixed(scope.row.batchQty,3)}}</span>
                    </div>
            </template>
        </el-table-column>
        <el-table-column prop="goodsUnit"   label="单位" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="settledAmt" label="结算金额" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="taxAmt"   label="税额" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="settledAmtUnTax" label="不含税金额" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="unAmt" label="冲销金额(不含税)" min-width="130" show-overflow-tooltip></el-table-column>
        <el-table-column prop="warrantMonth" label="结算财务账期" width="120"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="warrantCode" label="结算凭证号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="prefetchCode" label="费用预提单号" min-width="150" show-overflow-tooltip></el-table-column>
         <el-table-column :formatter="$moneyFormat" prop="prefetchAmtUnTax" label="费用预提金额（不含税）" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="prefetchAmt" label="费用预提金额（含税）" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="prefetchWarrantMonth" label="预提财务账期"  width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="prefetchWarrantCode" label="预提凭证号"  width="150" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination
        class="pageArea"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="currentChange"
        @size-change="currentSize"
        :current-page="page"
        :page-sizes="[100,200,300,500]"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
    <!--公司弹窗-->
    <company-select v-if="companyShow" :tipShow="companyShow" @tipsCancle="companyCancel" @tipsSure="companySure"></company-select>
         <!--物料号弹窗-->
    <matter-select v-if="matterShow" :tipShow="matterShow" @matterCancle="matterCancel" @matterSure="matterSure"></matter-select>
  </div>
</template>
<script>
import CostApi from "@/api/costData/cost";
import companySelect from "@/components/componySelect";
import departmentSelect from "@/views/integratedQuery/conponents/departmentSelect";
import supplierSelect from "@/views/integratedQuery/conponents/supplierListSelect";
import matterSelect from "@/components/matterSelect";
import {Loading } from "element-ui";
export default {
  name: "costSettleReport",
  data() {
    return {
      //查询条件
      queryArea: true, //是否显示查询区域
      companyInfo: "",
      companyShow: false, //是否显示公司弹窗
      departmentData:[],
      departmentList:[],
      supplierInfo:[],
      supplierList:[],
      matterInfo:"",
      matterShow:false,
      loading: false,
      selected: [], //列表选中行
      costLinkDic:[],
      page: 1,
      pageSize: 100,
      total: 0,
      bizOccurrence:"",
      costName:'',
      warrantCode:'',//凭证号
      prefetchWarrantCode:'',
      warrantMonth:[],//期间 
      prefetchWarrantMonth:[],//预提账期
      prefetchCode:'',//预提单号
      settleCode:'',//结算单号
      batchCode:'',//批次号
      wvNo:'',
      contractCode:'',
      sumTol:{},
      costSettleData:[],
    };
  },
  created() {
    //状态字典
    this.$getQueryData(this);
    this.costStatusData();
    this.costLinkData();
     if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      }
    //获取费用结算列表
   // this.costSettleList();
  },
  methods: {
     cell({row, column, rowIndex, columnIndex}) {
    //第八列添加 red 类
        if(column.property=="settledAmt" || column.property=="taxAmt" || column.property=="prefetchAmtUntax"
        || column.property=="prefetchAmt" || column.property=="settledAmtUnTax"
        || column.property=="unAmt" ||  column.property=="batchQty"){
        return 'rightTd'
        }else{
        return "";
        }
    },
     //费用环节字典
    costLinkData() {
      CostApi.dicQuery({
        dictNo: 1060
      }).then(res => {
        this.costLinkDic = res.data;
        
      }).catch();
    },
    //获取费用结算列表
    costSettleList() {
      this.costSettleData=[];
      let deptIdStr=this.analysisStr(this.departmentData,1);
      let supplierIdStr=this.analysisStr(this.supplierInfo,2);
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyId: this.companyInfo.companyId,
        deptId:deptIdStr, //this.branchInfo.branchId,
        supplierId:supplierIdStr, //this.supplierInfo.supplierId,
        occurrence:this.bizOccurrence,
        goodsCode: this.matterInfo.skuCode, 
        costName:this.costName,
        warrantCode:this.warrantCode,//凭证号
        prefetchWarrantCode:this.prefetchWarrantCode,
        warrantMonthEnd:this.warrantMonth.length?this.warrantMonth[1]:'',
        warrantMonthStart:this.warrantMonth.length?this.warrantMonth[0]:'',//期间 
        prefetchWarrantMonthEnd:this.prefetchWarrantMonth.length?this.warrantMonth[1]:'',
        prefetchWarrantMonthStart:this.prefetchWarrantMonth.length?this.warrantMonth[0]:'',
        prefetchCode:this.prefetchCode,//预提单号
        settleCode:this.settleCode,//结算单号
        batchCode:this.batchCode,//批次号
        wvNo:this.wvNo,
        contractCode:this.contractCode, 
      };
      params = this.$queryFilter(params);
      this.loading = true;
      CostApi.settleReport(params).then(res => {
        this.loading = false;
        this.costSettleData=res.data;
        this.total = res.total;
      }).catch(() => {
        this.loading = false;
      });
    },
    handlePrint(){
      let deptIdStr=this.analysisStr(this.departmentData,1);
      let supplierIdStr=this.analysisStr(this.supplierInfo,2);
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyId: this.companyInfo.companyId,
        deptId:deptIdStr, //this.branchInfo.branchId,
        supplierId:supplierIdStr, //this.supplierInfo.supplierId,
        occurrence:this.bizOccurrence,
        goodsCode: this.matterInfo.skuCode, 
        costName:this.costName,
        warrantCode:this.warrantCode,//凭证号
        prefetchWarrantCode:this.prefetchWarrantCode,
        warrantMonthEnd:this.warrantMonth.length?this.warrantMonth[1]:'',
        warrantMonthStart:this.warrantMonth.length?this.warrantMonth[0]:'',//期间 
        prefetchWarrantMonthEnd:this.prefetchWarrantMonth.length?this.warrantMonth[1]:'',
        prefetchWarrantMonthStart:this.prefetchWarrantMonth.length?this.warrantMonth[0]:'',
        prefetchCode:this.prefetchCode,//预提单号
        settleCode:this.settleCode,//结算单号
        batchCode:this.batchCode,//批次号
        wvNo:this.wvNo,
        contractCode:this.contractCode, 
      };
      params = this.$queryFilter(params);
       //使用Element loading-start 方法
      var loading2 = Loading.service({
          lock: true,
          text: "加载中...",
          background: "rgba(0, 0, 0, 0.7)"
      });
      CostApi.costSettleExport(params).then(res=>{
        if(res.code=="fail"){
          this.$openWarning(res.message);
        }else{
          const blob = new Blob([res.data]);
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          const filename ="费用结算报表.xls";
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
    analysisStr(list,type){
      let str='';
      if(list.length){
        list.forEach(e=>{
          if(type==1){
            str=str?(str+","+e.branchId):e.branchId;
          }else{
            str=str?(str+","+e.supplierId):e.supplierId;
          }
        });
      }
      return str;
    },
    //获取总计
    getSum() {
      let deptIdStr=this.analysisStr(this.departmentData,1);
      let supplierIdStr=this.analysisStr(this.supplierInfo,2);
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyId: this.companyInfo.companyId,
        deptId:deptIdStr, //this.branchInfo.branchId,
        supplierId:supplierIdStr, //this.supplierInfo.supplierId,
        occurrence:this.bizOccurrence,
        goodsCode: this.matterInfo.skuCode, 
        costName:this.costName,
        warrantCode:this.warrantCode,//凭证号
        prefetchWarrantCode:this.prefetchWarrantCode,
        warrantMonthEnd:this.warrantMonth.length?this.warrantMonth[1]:'',
        warrantMonthStart:this.warrantMonth.length?this.warrantMonth[0]:'',//期间 
        prefetchWarrantMonthEnd:this.prefetchWarrantMonth.length?this.warrantMonth[1]:'',
        prefetchWarrantMonthStart:this.prefetchWarrantMonth.length?this.warrantMonth[0]:'',
        prefetchCode:this.prefetchCode,//预提单号
        settleCode:this.settleCode,//结算单号
        batchCode:this.batchCode,//批次号
        wvNo:this.wvNo,
        contractCode:this.contractCode, 
      };
      params = this.$queryFilter(params);
      CostApi.settleReportSum(params).then(res => {
          if(res.data){
            this.sumTol = res.data;
          }
        }).catch();
    },
       //总计
    getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
            if (index === 0) {
            sums[index] = "总计";
            return;
            }
            let key = column.property;
            if (["batchQty", "settledAmt","taxAmt","settledAmtUnTax","unAmt"].findIndex(it => it == key) !== -1) {
                sums[index] = this.sumTol?this.$sumTolFormat(this.sumTol[key]):"";;
            } else {
                sums[index] = "";
            }
        });
        this.$nextTick(() => {
            this.$refs.multipleTable.doLayout();
        });
        return sums;

    },
    //状态字典
    costStatusData() {
      CostApi.dicQuery({
        dictNo: 1065
      }).then(res => {
        this.costStatusDic = res.data;
      }).catch();
    },
    //查询
    query() {
      this.page = 1;
      this.costSettleList();
      this.getSum();
    },
    //重置
    reset() {
       if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      }else{
        this.companyInfo = {}; //公司
      }
      this.departmentData = [];
      this.supplierInfo =[];
      this.matterInfo="";
      this.bizOccurrence= "";
      this.costName= "";
      this.warrantCode= "";//凭证号
      this.prefetchWarrantCode= "";
      this.warrantMonth= "";//期间 
      this.prefetchWarrantMonth= "";//预提账期
      this.prefetchCode= "";//预提单号
      this.settleCode= "";//结算单号
      this.batchCode= "";//批次号
      this.wvNo= "";
      this.contractCode= "";
    },
    //是否显示查询区域
    queryAreaShow() {
      this.queryArea = this.$showOne(this.queryArea);
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
      this.branchInfo = "";
    },
    //列表多选
    handleChange(e) {
      this.selected = e;
    },
    selectedRow(e) {
      this.$refs.multipleTable.toggleRowSelection(e);
    },
    //翻页
    currentChange(e) {
      this.page = e;
      this.costSettleList();
    },
    //单页数量
    currentSize(e) {
      this.page = 1;
      this.pageSize = e;
      this.costSettleList();
    },
   //物料号弹窗
    matterPopup() {
      this.matterShow = true;
    },
    //物料号弹窗关闭
    matterCancel() {
      this.matterShow = false;
    },
    //物料号弹窗确定并传值
    matterSure(e) {
      this.matterShow = false;
      this.matterInfo = e;
      this.batchCode = "";
    },
  },
  components: {
    companySelect,
    departmentSelect,
    supplierSelect,
    matterSelect

  }
};
</script>
<style lang="scss">
#costSettle {
  .el-dropdown {
    vertical-align: middle;
    margin-right: 10px;
  }
  .el-col {
    position: relative;
    .moreIcon {
      width: 70%;
      height: 24px;
      position: absolute;
      top: 0;
      right: 0;
      padding: 4px 5px;
      cursor: pointer;
    }
  }
  .is-disabled {
    .el-input__inner {
      color: #666;
      cursor: pointer;
    }
  }
  // .el-col-5 {
  //   height: 32px;
  // }
  label {
    display: inline-block;
    width: 30%;
    vertical-align: middle;
  }
  .el-inputs,
  .el-selects {
    width: 70%;
    .el-input__inner {
      width: 100%;
    }
  }
  .text_too_long {
    position: absolute;
    width: 45%;
    margin-left: -45%;
  }
  .el-input__icon {
    line-height: 10px !important;
  }
  .pageArea {
    margin: 10px 0 0 20px;
  }
}
.index .examine-dialog .el-col{
    width: 93%;
    position: relative;
}
.examine-dialog .el-col .comicon {
    width: 70%;
    height: 20px;
    position: absolute;
    right: 13px;
    top: 2px;
    cursor: pointer;
    text-align: right;
    padding-right: 6px;
}
</style>