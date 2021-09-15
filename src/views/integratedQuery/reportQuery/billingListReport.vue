<template>
<!-----------------开票清单----------------------->
  <div id="billingListReport">
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
         <!--客户-->
         <customer-select
          :customerNameList="customerNameList"
          :customerInfo.sync="customerInfo"
         class="el-col el-col-5"></customer-select>
         <!--员工-->
        <emp-select
          :staffNameList="staffNameList"
          :staffName.sync="staffName"
         class="el-col el-col-5"></emp-select>
        <el-col :span="5" class="el-col">
          <label>开票日期</label>
          <el-date-picker
              v-model="invoiceDate"
              type="daterange"
              class="el-inputs el-input2"
              size="mini"
              :clearable="false"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>外部合同号</label>
          <el-input v-model="extContractNo" class="el-inputs"></el-input>
        </el-col>
         <el-col :span="5" class="el-col">
          <label>物料名称</label>
          <el-input v-model="matterInfo.skuName" class="el-inputs" placeholder="请选择" disabled></el-input>
          <span class="moreIcon" @click="matterPopup"><i class="el-icon-search"></i></span>
        </el-col>
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
        ref="billingTable"
         :cell-class-name="cell"
            show-summary
        :summary-method="getSummaries"
       >
        <!-- <el-table-column type="selection" width="55" ></el-table-column> -->
        <el-table-column type="index" label="序号" width="60" ></el-table-column>
        <el-table-column prop="companyName" label="公司" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="deptName" label="部门" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="invoiceCode" label="开票申请单据编号" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="invoiceDate" label="开票日期" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="extInvoiceCode" label="发票外部编号" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="outDoNo" label="出库单号" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="custName" label="客户" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="contractNo" label="合同号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="extContractNo" label="外部合同号" width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="warehouseName"  width="180" label="仓库"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="goodsName"   label="物料名称" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodsSpec"  width="160" label="规格材质"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="batchCode"   label="批次号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="fstUnitQty"  width="100" label="开票第1单位数量"  show-overflow-tooltip>
             <template slot-scope="scope">
                    <div class="content_right">
                <span>{{$numberToFixed(scope.row.fstUnitQty,3)}}</span>
                    </div>
            </template>
        </el-table-column>
        <el-table-column prop="itemUnit"   label="基础单位" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="price"  width="100" label="开票单价"  show-overflow-tooltip>
             <template slot-scope="scope">
              <div class="content_right">
                <span> {{$numberToFixed(scope.row.price,6)}}</span>
              </div>
            </template>
        </el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="taxAmt"   label="开票含税金额" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="noTaxAmt"  width="120" label="开票不含税金额"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="costPrice"   label="成本单价" width="100" show-overflow-tooltip>
           <template slot-scope="scope">
              <div class="content_right">
                <span> {{$numberToFixed(scope.row.costPrice,6)}}</span>
              </div>
            </template>
        </el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="costAmt"  width="100" label="成本总额"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="soType"   label="销售类型" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
              <div>
                <span
                    v-show="scope.row.soType == it.dict_code"
                    v-for="it in soTypeList"
                    :key="it.dict_code"
                  >{{ it.dict_value }}</span>
              </div>
            </template>
        </el-table-column>
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
import warehouseSelect from "@/components/warehouseSelect.vue";
import departmentSelect from "@/views/integratedQuery/conponents/departmentSelect";
import {invoiceSalesList,dicQuery,invoiceSalesExport,invoiceSalesSum} from "@/api/integratedQuery.js";
import empSelect from "@/views/integratedQuery/conponents/empSelect";
import customerSelect from "@/views/integratedQuery/conponents/customerListSelect";
import {Loading } from "element-ui";
export default {
  name: "billingListReport",
  data() {
    return {
      //查询条件
      queryArea: true, //是否显示查询区域
      companyInfo:{},
      companyShow: false, //是否显示公司弹窗
      departmentList:[],
      departmentData:[],
      matterInfo: "",
      matterShow: false, //是否显示物料号弹窗
      //列表字段
      costPrefetchData: [],
      loading: false,
      selected: [], //列表选中行
      page: 1,
      pageSize: 100,
      total: 0,
      sumTol: {},//总计
      customerNameList:[],
      customerInfo:[],
      staffNameList:[],
      staffName:[],
      extContractNo:'',
      invoiceDate:[],
      soTypeList:[],

    };
  },
  created() {
    this.getSoTypeList();
    if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      }
  },
  methods: {
     cell({row, column, rowIndex, columnIndex}) {
    //第八列添加 red 类
        if(column.property=="taxAmt" || column.property=="noTaxAmt" || column.property=="costAmt"){
        return 'rightTd'
        }else{
        return "";
        }
    },
    //费用环节字典
    getSoTypeList() {
      dicQuery({
        dictNo: 1015
      }).then(res => {
        this.soTypeList = res.data;
        
      }).catch();
    },
    //获取费用预提列表
    initData() {
      this.costPrefetchData=[];
      let branchIdStr=this.analysisStr(this.departmentData,1);
      let empIdStr=this.analysisStr(this.staffName,2);
      let custIdStr=this.analysisStr(this.customerInfo,3);
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyId: this.companyInfo.companyId,
        deptId:branchIdStr,
        custId:custIdStr,
        bizPersonId:empIdStr,
        invoiceDateStart:this.invoiceDate.length?this.invoiceDate[0]:"",
        invoiceDateEnd:this.invoiceDate.length?this.invoiceDate[1]:"",
        extContractNo:this.extContractNo,
        goodsCode:this.matterInfo.skuCode
      };
      params = this.$queryFilter(params);
      this.loading = true;
      invoiceSalesList(params).then(res => {
        this.loading = false;    
        this.costPrefetchData=res.data.list;
        this.total = res.data.total;
      }).catch(() => {
        this.loading = false;
      });
    },
    download(){
      let branchIdStr=this.analysisStr(this.departmentData,1);
      let empIdStr=this.analysisStr(this.staffName,2);
      let custIdStr=this.analysisStr(this.customerInfo,3);
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyId: this.companyInfo.companyId,
        deptId:branchIdStr,
        custId:custIdStr,
        bizPersonId:empIdStr,
        invoiceDateStart:this.invoiceDate.length?this.invoiceDate[0]:"",
        invoiceDateEnd:this.invoiceDate.length?this.invoiceDate[1]:"",
        extContractNo:this.extContractNo,
        goodsCode:this.matterInfo.skuCode
      };
      params = this.$queryFilter(params);
       //使用Element loading-start 方法
      var loading2 = Loading.service({
          lock: true,
          text: "加载中...",
          background: "rgba(0, 0, 0, 0.7)"
      });
      invoiceSalesExport(params).then(res=>{
        if(res.code=="fail"){
          this.$openWarning(res.message);
        }else{
          const blob = new Blob([res.data]);
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          const filename ="开票清单报表.xls";
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
            str=str?(str+","+e.empId):e.empId;
          }else{
            str=str?(str+","+e.customerId):e.customerId;
          }
        });
      }
      return str;
    },
     //获取总计
    getSum() {
      let branchIdStr=this.analysisStr(this.departmentData,1);
      let empIdStr=this.analysisStr(this.staffName,2);
      let custIdStr=this.analysisStr(this.customerInfo,3);
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyId: this.companyInfo.companyId,
        deptId:branchIdStr,
        custId:custIdStr,
        bizPersonId:empIdStr,
        invoiceDateStart:this.invoiceDate.length?this.invoiceDate[0]:"",
        invoiceDateEnd:this.invoiceDate.length?this.invoiceDate[1]:"",
        extContractNo:this.extContractNo,
        goodsCode:this.matterInfo.skuCode
      };
      params = this.$queryFilter(params);
        invoiceSalesSum(params).then(res => {
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
            if (["costAmt","fstUnitQty","taxAmt","noTaxAmt"].findIndex(it => it == key) !== -1) {
                sums[index] = this.sumTol?this.$sumTolFormat(this.sumTol[key]):"";
            } else {
                sums[index] = "";
            }
        });
        this.$nextTick(() => {
            this.$refs.billingTable.doLayout();
        });
        return sums;

    },
    //查询
    query() {
      this.page = 1;
      this.initData();
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
      this.customerInfo=[];
      this.staffName=[];
      this.extContractNo='';
      this.invoiceDate=[];
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
    },
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
      this.$refs.billingTable.toggleRowSelection(e);
    },
    //翻页
    currentChange(e) {
      this.page = e;
      this.initData();
    },
    //单页数量
    currentSize(e) {
      this.page = 1;
      this.pageSize = e;
      this.initData();
    }
  },
  components: {
    companySelect,
    departmentSelect,
    matterSelect,
    empSelect,
    customerSelect
  }
};
</script>
<style lang="scss">
#billingListReport {
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