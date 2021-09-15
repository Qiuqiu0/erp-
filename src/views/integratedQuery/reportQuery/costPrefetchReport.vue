<template>
  <div id="costPrefetch">
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
          <label>预提单号</label>
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
          <label>凭证号</label>
          <el-input v-model="warrantCode" class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>批次号</label>
          <el-input v-model="batchCode" class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>账期</label>
              <el-date-picker
              style="width:70%"
              v-model="warrantMonth"
              type="monthrange"
              size="mini"
              value-format="yyyy-MM"
              :clearable="false"
              range-separator="-"
              start-placeholder="开始月份"
              end-placeholder="结束月份">
              </el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>财务过账日期</label>
          <el-date-picker v-model="postDate" type="daterange" 
          :clearable="false"
          value-format="yyyy-MM-dd" class="el-selects" size="mini" 
          start-placeholder="开始日期" end-placeholder="结束日期">
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
        :data="costPrefetchData"
        v-loading="loading"
       ref="prefetchTable"
         show-summary
        :summary-method="getSummaries"
         :cell-class-name="cell"
       >
        <!-- <el-table-column type="selection" width="55" ></el-table-column> -->
        <el-table-column type="index" label="序号" width="60" ></el-table-column>
        <el-table-column prop="prefetchCode" label="费用预提单号" min-width="150" show-overflow-tooltip></el-table-column>
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
        <el-table-column prop="batchQty"  width="100" label="数量"  show-overflow-tooltip>
             <template slot-scope="scope">
                    <div class="content_right">
                <span>{{$numberToFixed(scope.row.batchQty,3)}}</span>
                    </div>
            </template>
        </el-table-column>
        <el-table-column prop="goodsUnit"   label="单位" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="prefetchAmtUntax" label="预提金额（不含税）" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="prefetchAmt" label="预提金额（含税）" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="isWriteOff" label="是否冲销" width="100"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="warrantMonth" label="财务账期" width="120"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="warrantCode" label="凭证号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="postDate" label="财务过账日期"  width="150" show-overflow-tooltip></el-table-column>
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
import departmentSelect from "@/views/integratedQuery/conponents/departmentSelect";
import supplierSelect from "@/views/integratedQuery/conponents/supplierListSelect";
import matterSelect from "@/components/matterSelect";
import {Loading } from "element-ui";
export default {
  name: "costPrefetchReport",
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
      prefetchCode: "",
      wvNo: "",
      matterInfo: "",
      matterShow: false, //是否显示物料号弹窗
      batchCode: "",
      batchShow: false, //是否显示批次号弹窗
      //列表字段
      costPrefetchData: [],
      loading: false,
      selected: [], //列表选中行
      page: 1,
      pageSize: 100,
      total: 0,
      bizOccurrence:"",
      costLinkDic:[],
      warrantMonth:[], //期间 
      contractCode:'',//合同号
      postDate:[],
      batchCode:'',
      warrantCode:'',
      sumTol: {},//总计
      costName:'',
    };
  },
  created() {
    this.prefetchStatusData();
    this.costLinkData();
     if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      }
    //获取费用预提列表
   // this.costPrefetchList();
  
  },
  methods: {
     cell({row, column, rowIndex, columnIndex}) {
    //第八列添加 red 类
        if(column.property=="prefetchAmtUntax" || column.property=="prefetchAmt" || column.property=="batchQty"){
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
    //获取费用预提列表
    costPrefetchList() {
        this.costPrefetchData=[];
       if (this.postDate) {
         if(this.postDate[0] && this.postDate[1]){
            var postDateStart = this.postDate[0]+"T00:00:00.000Z";
            var postDateEnd = this.postDate[1]+"T23:59:59.000Z";
          }
      }
      let deptIdStr=this.analysisStr(this.departmentData,1);
      let supplierIdStr=this.analysisStr(this.supplierInfo,2);
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyId: this.companyInfo.companyId,
        deptId: deptIdStr,//this.branchInfo.branchId,
        supplierId: supplierIdStr,//this.supplierInfo.supplierId,
        postDateStart:postDateStart?postDateStart:"",
        postDateEnd: postDateEnd?postDateEnd:"",
        prefetchCode: this.prefetchCode,
        contractCode:this.contractCode,
        wvNo: this.wvNo,
        goodsCode: this.matterInfo.skuCode, 
        occurrence:this.bizOccurrence,
        warrantMonthEnd:this.warrantMonth.length?this.warrantMonth[1]:'',
        warrantMonthStart: this.warrantMonth.length?this.warrantMonth[0]:'',
        batchCode:this.batchCode,  
        warrantCode:this.warrantCode, 
        costName:this.costName
      };
      params = this.$queryFilter(params);
      this.loading = true;
      CostApi.prefetchReport(params).then(res => {
        this.loading = false;    
        // if(res.data.length>1){
        //     let items=res.data;
        //     this.sumTol=items[items.length-1];//合计取最后一条
        //     let tableData=res.data;
        //     this.costPrefetchData=tableData.splice(0,items.length-1);//去掉最后一条
        // }else{
        //     this.sumTol=res.data;
        // }  
        this.costPrefetchData=res.data;
        this.total = res.total;
      }).catch(() => {
        this.loading = false;
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
     handlePrint(){
      if (this.postDate) {
         if(this.postDate[0] && this.postDate[1]){
            var postDateStart = this.postDate[0]+"T00:00:00.000Z";
            var postDateEnd = this.postDate[1]+"T23:59:59.000Z";
          }
      }
      let deptIdStr=this.analysisStr(this.departmentData,1);
      let supplierIdStr=this.analysisStr(this.supplierInfo,2);
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyId: this.companyInfo.companyId,
        deptId: deptIdStr,//this.branchInfo.branchId,
        supplierId: supplierIdStr,//this.supplierInfo.supplierId,
        postDateStart:postDateStart?postDateStart:"",
        postDateEnd: postDateEnd?postDateEnd:"",
        prefetchCode: this.prefetchCode,
        contractCode:this.contractCode,
        wvNo: this.wvNo,
        goodsCode: this.matterInfo.skuCode, 
        occurrence:this.bizOccurrence,
        warrantMonthEnd:this.warrantMonth.length?this.warrantMonth[1]:'',
        warrantMonthStart: this.warrantMonth.length?this.warrantMonth[0]:'',
        batchCode:this.batchCode,  
        warrantCode:this.warrantCode, 
        costName:this.costName
      };
      params = this.$queryFilter(params);
       //使用Element loading-start 方法
      var loading2 = Loading.service({
          lock: true,
          text: "加载中...",
          background: "rgba(0, 0, 0, 0.7)"
      });
      CostApi.costPrefetchExport(params).then(res=>{
        if(res.code=="fail"){
          this.$openWarning(res.message);
        }else{
          const blob = new Blob([res.data]);
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          const filename ="费用预提报表.xls";
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
     //获取总计
    getSum() {
      if (this.postDate) {
         if(this.postDate[0] && this.postDate[1]){
            var postDateStart = this.postDate[0]+"T00:00:00.000Z";
            var postDateEnd = this.postDate[1]+"T23:59:59.000Z";
          }
      }
      let deptIdStr=this.analysisStr(this.departmentData,1);
      let supplierIdStr=this.analysisStr(this.supplierInfo,2);
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyId: this.companyInfo.companyId,
        deptId: deptIdStr,//this.branchInfo.branchId,
        supplierId: supplierIdStr,//this.supplierInfo.supplierId,
        postDateStart:postDateStart?postDateStart:"",
        postDateEnd: postDateEnd?postDateEnd:"",
        prefetchCode: this.prefetchCode,
        contractCode:this.contractCode,
        wvNo: this.wvNo,
        goodsCode: this.matterInfo.skuCode, 
        occurrence:this.bizOccurrence,
        warrantMonthEnd:this.warrantMonth.length?this.warrantMonth[1]:'',
        warrantMonthStart: this.warrantMonth.length?this.warrantMonth[0]:'',
        batchCode:this.batchCode,  
        warrantCode:this.warrantCode, 
        costName:this.costName
      };
      params = this.$queryFilter(params);
      CostApi.prefetchReportSum(params).then(res => {
          this.sumTol = res.data; 
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
            if (["batchQty","prefetchAmtUntax","prefetchAmt"].findIndex(it => it == key) !== -1) {
                sums[index] = this.sumTol?this.$sumTolFormat(this.sumTol[key]):"";
            } else {
                sums[index] = "";
            }
        });
        this.$nextTick(() => {
            this.$refs.prefetchTable.doLayout();
        });
        return sums;

    },
    //单据状态字典
    prefetchStatusData() {
      CostApi.dicQuery({
        dictNo: 1065
      }).then(res => {
        this.prefetchStatusDic = res.data;
      }).catch();
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
      this.departmentData = [];
      this.supplierInfo = [];
      this.postDate = [];
      this.prefetchCode = "";
      this.wvNo = "";
      this.matterInfo = "";
      this.batchCode = "";
      this.warrantMonth=''; //期间 
      this.contractCode='';
      this.bizOccurrence='';
      this.costName='';
      this.warrantCode='';
      this.warrantMonth='';
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
    //列表多选
    handleChange(e) {
      this.selected = e;
    },
    selectedRow(e) {
      this.$refs.prefetchTable.toggleRowSelection(e);
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
    departmentSelect,
    supplierSelect,
    matterSelect,
  }
};
</script>
<style lang="scss">
#costPrefetch {
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