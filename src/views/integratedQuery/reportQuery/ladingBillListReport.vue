<template>
<!-----------------提单清单----------------------->
  <div id="ladingBillListReport">
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
         <!-- <el-col :span="5" class="el-col">
          <label>签订日期</label>
          <el-date-picker
              v-model="signTime"
              type="daterange"
              class="el-inputs el-input2"
              size="mini"
              :clearable="false"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </el-col> -->
          <!--客户-->
         <customer-select
          :customerNameList="customerNameList"
          :customerInfo.sync="customerInfo"
         class="el-col el-col-5"></customer-select>
        <el-col :span="5" class="el-col">
          <label>外部合同号</label>
          <el-input v-model="extContractCode" class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>物料名称</label>
          <el-input v-model="matterInfo.skuName" class="el-inputs" placeholder="请选择" disabled></el-input>
          <span class="moreIcon" @click="matterPopup"><i class="el-icon-search"></i></span>
        </el-col>
          <!--员工-->
        <emp-select
          :staffNameList="staffNameList"
          :staffName.sync="staffName"
         class="el-col el-col-5"></emp-select>
        <el-col :span="5" class="el-col">
          <label>出库日期</label>
          <el-date-picker
              v-model="doDate"
              type="daterange"
              class="el-inputs el-input2"
              size="mini"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
         <!--供应商-->
         <supplier-select
          :supplierList="supplierList"
          :supplierInfo.sync="supplierInfo"
         class="el-col el-col-5"></supplier-select>
        
         
      </div>
    </div>
    <!--列表信息-->
    <div class="button-div auto-sibling">
      <el-button  @click="download()" v-if="$actionFlag(`F001`)"  icon="el-icon-download">导出</el-button>
    </div>
    <div class="el-table-div" v-auto>
      <el-table
        class="el-table"
        border
        center
        height="calc(100% - 35px)"
        :data="costPrefetchData"
        v-loading="loading"
       ref="multipleTable"
         :cell-class-name="cell"
             show-summary
        :summary-method="getSummaries"
       >
        <!-- <el-table-column type="selection" width="55" ></el-table-column> -->
        <el-table-column type="index" label="序号" width="60" ></el-table-column>
        <el-table-column prop="companyName" label="公司" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="deptName" label="部门" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="doDate" label="出库日期" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="doNo" label="出库单号" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="custName" label="销售客户" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="contractType" label="销售类型" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
              <div>
                <span
                    v-show="scope.row.contractType == it.dict_code"
                    v-for="it in contractTypeList"
                    :key="it.dict_code"
                  >{{ it.dict_value }}</span>
              </div>
            </template>
        </el-table-column>
        <el-table-column prop="contractCode" label="销售合同号" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="extContractCode" label="外部合同号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="warehouseName"  min-width="160" label="仓库"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="supplierName" label="供应商" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodsName"   label="物料名称" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodsSpec"  width="180" label="规格材质"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="batchCode"   label="批次号" width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="fstQty"  width="100" label="出库第1单位数量"  show-overflow-tooltip>
             <template slot-scope="scope">
                    <div class="content_right">
                <span>{{$numberToFixed(scope.row.fstQty,3)}}</span>
                    </div>
            </template>
        </el-table-column>
        <el-table-column prop="fstUnit"   label="基础单位" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="secQty"  width="100" label="出库第2单位数量"  show-overflow-tooltip>
             <template slot-scope="scope">
                    <div class="content_right">
                <span>{{$numberToFixed(scope.row.secQty,3)}}</span>
                    </div>
            </template>
        </el-table-column>
        <el-table-column prop="secUnit"   label="基础单位" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="originPrice"  width="100" label="出库单价"  show-overflow-tooltip>
           <template slot-scope="scope">
              <div class="content_right">
                <span> {{$numberToFixed(scope.row.originPrice,6)}}</span>
              </div>
            </template>
        </el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="originAmt"   label="出库含税金额" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="unTaxAmt"  width="100" label="出库不含税金额"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="costPrice"   label="成本单价" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
              <div class="content_right">
                <span> {{$numberToFixed(scope.row.costPrice,6)}}</span>
              </div>
            </template>
        </el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="costAmt"  width="100" label="成本金额"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="isInvoiced"   label="是否已开票" width="100" show-overflow-tooltip>
           <template slot-scope="scope">
              <div class="content_right">
                <span> {{scope.row.isInvoiced==1?"是":"否"}}</span>
              </div>
            </template>
        </el-table-column>
        <el-table-column  prop="invoicedQty" label="已开票数量" min-width="140" show-overflow-tooltip>
          <template slot-scope="scope">
                    <div class="content_right">
                <span>{{$numberToFixed(scope.row.invoicedQty,3)}}</span>
                    </div>
            </template>
        </el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="invoicedAmt" label="已开票金额" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column  prop="bizPersonName" label="业务员" min-width="140" show-overflow-tooltip></el-table-column>
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
    <matter-select v-if="matterShow" :tipShow="matterShow" @matterCancle="matterCancel" @matterSure="matterSure"></matter-select>
  </div>
</template>
<script>
import { mapState } from "vuex";
import CostApi from "@/api/costData/cost";
import companySelect from "@/components/componySelect";
import matterSelect from "@/components/matterSelect";
import departmentSelect from "@/views/integratedQuery/conponents/departmentSelect";
import {doListReport,dicQuery,doListExport,doListReportSum} from "@/api/integratedQuery.js";
import empSelect from "@/views/integratedQuery/conponents/empSelect";
import supplierSelect from "@/views/integratedQuery/conponents/supplierListSelect";
import customerSelect from "@/views/integratedQuery/conponents/customerListSelect";
import {Loading } from "element-ui";
export default {
  name: "ladingBillListReport",
  data() {
    return {
      //查询条件
      queryArea: true, //是否显示查询区域
      companyInfo: "",
      companyShow: false, //是否显示公司弹窗
      matterInfo: "",
      matterShow: false, //是否显示物料号弹窗
      //列表字段
      costPrefetchData: [],
      loading: false,
      selected: [], //列表选中行
      page: 1,
      pageSize: 100,
      total: 0,
      departmentList:[],
     departmentData:[],
     staffNameList:[],
     staffName:[],
     supplierList:[],
     supplierInfo:[],
     customerNameList:[],
     customerInfo:[],
     extContractCode:'',
     doDate:[],
     signTime:[],
     contractTypeList:[]
    };
  },
  created(){
    this.contractTypeListData();
     if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      }
  },
  methods: {
     cell({row, column, rowIndex, columnIndex}) {
    //第八列添加 red 类
        if(column.property=="originAmt" || column.property=="unTaxAmt" 
        || column.property=="costAmt" || column.property=="invoicedAmt"){
        return 'rightTd'
        }else{
        return "";
        }
    },
    //费用环节字典
    contractTypeListData() {
      dicQuery({
        dictNo: 1015
      }).then(res => {
        this.contractTypeList = res.data;
        
      }).catch();
    },
    //获取费用预提列表
    costPrefetchList() {
        this.costPrefetchData=[];
        let branchIdStr=this.analysisStr(this.departmentData,1);
        let empCodeStr=this.analysisStr(this.staffName,2);
        let custIdStr=this.analysisStr(this.customerInfo,3);
        let supplierIdStr=this.analysisStr(this.supplierInfo,4);
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyId:this.companyInfo.companyId,
        bizPersonCode:empCodeStr,
        deptId:branchIdStr,
        // signTimeStart:this.signTime.length?this.signTime[0]:'',
        // signTimeEnd:this.signTime.length?this.signTime[1]:'',
        custId:custIdStr,
        supplierId:supplierIdStr,
        doDateStart:this.doDate.length?this.doDate[0]:'',
        doDateEnd:this.doDate.length?this.doDate[1]:'',
        extContractCode:this.extContractCode,
        goodsCode:this.matterInfo.skuCode

      };
      params = this.$queryFilter(params);
      this.loading = true;
      doListReport(params).then(res => {
        this.loading = false;    
        this.costPrefetchData=res.data.list;
        this.total = res.data.total;
      }).catch(() => {
        this.loading = false;
      });
    },
    download(){
       let branchIdStr=this.analysisStr(this.departmentData,1);
        let empCodeStr=this.analysisStr(this.staffName,2);
        let custIdStr=this.analysisStr(this.customerInfo,3);
        let supplierIdStr=this.analysisStr(this.supplierInfo,4);
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyId:this.companyInfo.companyId,
        bizPersonCode:empCodeStr,
        deptId:branchIdStr,
        // signTimeStart:this.signTime.length?this.signTime[0]:'',
        // signTimeEnd:this.signTime.length?this.signTime[1]:'',
        custId:custIdStr,
        supplierId:supplierIdStr,
        doDateStart:this.doDate.length?this.doDate[0]:'',
        doDateEnd:this.doDate.length?this.doDate[1]:'',
        extContractCode:this.extContractCode,
        goodsCode:this.matterInfo.skuCode

      };
      params = this.$queryFilter(params);
       //使用Element loading-start 方法
      var loading2 = Loading.service({
          lock: true,
          text: "加载中...",
          background: "rgba(0, 0, 0, 0.7)"
      });
      doListExport(params).then(res=>{
        if(res.code=="fail"){
          this.$openWarning(res.message);
        }else{
          const blob = new Blob([res.data]);
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          const filename ="提单清单报表.xls";
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
          }else if(type==2){
            str=str?(str+","+e.empCode):e.empCode;
          }else if(type==3){
            str=str?(str+","+e.customerId):e.customerId;
          }else{
            str=str?(str+","+e.supplierId):e.supplierId;
          }
        });
      }
      return str;
    },
         //获取总计
    getSum() {
       let branchIdStr=this.analysisStr(this.departmentData,1);
        let empCodeStr=this.analysisStr(this.staffName,2);
        let custIdStr=this.analysisStr(this.customerInfo,3);
        let supplierIdStr=this.analysisStr(this.supplierInfo,4);
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyId:this.companyInfo.companyId,
        bizPersonCode:empCodeStr,
        deptId:branchIdStr,
        // signTimeStart:this.signTime.length?this.signTime[0]:'',
        // signTimeEnd:this.signTime.length?this.signTime[1]:'',
        custId:custIdStr,
        supplierId:supplierIdStr,
        doDateStart:this.doDate.length?this.doDate[0]:'',
        doDateEnd:this.doDate.length?this.doDate[1]:'',
        extContractCode:this.extContractCode,
        goodsCode:this.matterInfo.skuCode

      };
      params = this.$queryFilter(params);
        doListReportSum(params).then(res => {
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
            if (["fstQty","secQty","originAmt" ,"unTaxAmt" ,"costAmt" , "invoicedQty" , "invoicedAmt"].findIndex(it => it == key) !== -1) {
                sums[index] =this.sumTol?this.$sumTolFormat(this.sumTol[key]):"";
            } else {
                sums[index] = "";
            }
        });
        this.$nextTick(() => {
            this.$refs.multipleTable.doLayout();
        });
        return sums;

    },
    //查询
    query() {
      this.page = 1;
      this.costPrefetchList();
      this.getSum();
    },
    //重置
    reset() {
       if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      }else{
        this.companyInfo = {}; //公司
      }
      this.matterInfo = "";
      this.departmentData=[];
      this.staffName=[];
      this.supplierInfo=[];
      this.customerInfo=[];
      this.extContractCode='';
      this.doDate=[];
      // this.signTime=[];
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
    //仓库弹窗
    warehouseTips() {
      this.warehouseShow = true;
    },
    //仓库弹窗关闭
    warehouseCancle() {
      this.warehouseShow = false;
    },
    //仓库弹窗确定获取数据
    warehouseSure(e) {
      this.warehouseShow = false;
      this.warehouseName = e;
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
      this.costPrefetchList();
    },
    //单页数量
    currentSize(e) {
      this.page = 1;
      this.pageSize = e;
      this.costPrefetchList();
    }
  },
  components: {
    companySelect,
    matterSelect,
    empSelect,
    customerSelect,
    supplierSelect,
    departmentSelect
  }
};
</script>
<style lang="scss">
#ladingBillListReport {
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
</style>