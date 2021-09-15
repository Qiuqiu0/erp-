<template>
<!-----------------销售合同提货情况表----------------------->
  <div id="salesContractArrivalReport">
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
        <el-col :span="5" class="el-col">
          <label>签订日期</label>
          <el-date-picker
              v-model="signTime"
              :clearable="false"
              type="daterange"
              class="el-inputs el-input2"
              size="mini"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
          <!--客户-->
         <customer-select
          :customerNameList="customerNameList"
          :customerInfo.sync="customerInfo"
         class="el-col el-col-5"></customer-select>
        <el-col :span="5" class="el-col">
          <label>外部合同号</label>
          <el-input v-model="extCode" class="el-inputs"></el-input>
        </el-col>
         <el-col :span="5" class="el-col">
          <label>物料名称</label>
          <el-input v-model="matterInfo.skuName" class="el-inputs" placeholder="请选择" disabled></el-input>
          <span class="moreIcon" @click="matterPopup"><i class="el-icon-search"></i></span>
        </el-col>
         <!--供应商-->
         <!-- <supplier-select
          :supplierList="supplierList"
          :supplierInfo.sync="supplierInfo"
         class="el-col el-col-5"></supplier-select> -->
        <el-col :span="5" class="el-col">
          <label>出库日期</label>
          <el-date-picker
              v-model="doDate"
              type="daterange"
              :clearable="false"
              class="el-inputs el-input2"
              size="mini"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
          <!--员工-->
        <emp-select
          :staffNameList="staffNameList"
          :staffName.sync="staffName"
         class="el-col el-col-5"></emp-select>
         <el-col :span="5" class="el-col">
          <label>合同状态</label>
          <el-select
            v-model="contractStatusData"
            class="el-inputs"
            placeholder="请选择"
            multiple
            collapse-tags
          >
            <el-option
              v-for="item in contractStatusList"
              :key="item.dict_code"
              :label="item.dict_value"
              :value="item.dict_code"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>合同类型</label>
          <el-select
            v-model="contractTypeData"
            class="el-inputs"
            placeholder="请选择"
            multiple
            collapse-tags
          >
            <el-option
              v-for="item in contractTypeList"
              :key="item.dict_code"
              :label="item.dict_value"
              :value="item.dict_code"
            >
            </el-option>
          </el-select>
        </el-col>
      </div>
    </div>
    <!--列表信息-->
    <div class="button-div auto-sibling">
     <el-button  @click="download()" v-if="$actionFlag(`F001`)"   icon="el-icon-download">导出</el-button>
    </div>
    <div class="el-table-div" v-auto>
      <el-table
        class="el-table"
        border
        center
        height="calc(100% - 35px)"
        :data="costPrefetchData"
        v-loading="loading"
        ref="expandTable"
         show-summary
        :summary-method="getSummaries"
         :cell-class-name="cell"
       >
        <!-- <el-table-column type="selection" width="55" ></el-table-column> -->
        <el-table-column type="index" label="序号" width="60" ></el-table-column>
        <el-table-column prop="companyName" label="公司" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="orgName" label="部门" width="180" show-overflow-tooltip></el-table-column>
         <el-table-column prop="custName" label="销售客户" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="soContractNo" label="销售合同号" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="extCode" label="外部合同号" min-width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="contractStatus" label="合同状态" min-width="160" show-overflow-tooltip>
        </el-table-column>
       <el-table-column prop="contractCat" label="合同类型" min-width="160" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="itemQty" label="合同数量" min-width="160" show-overflow-tooltip>
           <template slot-scope="scope">
                    <div class="content_right">
                <span>{{$numberToFixed(scope.row.itemQty,3)}}</span>
                    </div>
            </template>
        </el-table-column>
        <el-table-column prop="itemUnit" label="单位" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="contractTypeName" label="销售类型" width="120" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="supplierName" label="供应商" width="120" show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="doDate" label="出库日期" width="120" show-overflow-tooltip>
          <template slot-scope="scope">    
                <span>{{scope.row.doDate | time2Date }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="doNo"  width="100" label="出库单号"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="doStatusName"   label="状态" width="100" show-overflow-tooltip></el-table-column>
       <el-table-column prop="goodsCategoryName"   label="商品大类" width="100" show-overflow-tooltip></el-table-column>
       <el-table-column prop="goodsName"   label="物料名称" width="160" show-overflow-tooltip></el-table-column>
       <el-table-column prop="warehouseName"   label="仓库" width="160" show-overflow-tooltip></el-table-column>
       <el-table-column prop="stockoutPrice"   label="成本单价" width="160" show-overflow-tooltip>
         <template slot-scope="scope">
              <div class="content_right">
                <span> {{$numberToFixed(scope.row.stockoutPrice,6)}}</span>
              </div>
            </template>
       </el-table-column>
       <el-table-column  :formatter="$moneyFormat" prop="stockoutAmt"   label="成本金额" width="160" show-overflow-tooltip></el-table-column>
       <el-table-column prop="currencyCode"   label="币种" width="100" show-overflow-tooltip></el-table-column>
       <el-table-column  label="发货单">
           <el-table-column prop="itemQtyDo"   label="出库第1单位数量" width="160" show-overflow-tooltip>
             <template slot-scope="scope">
                    <div class="content_right">
                <span>{{$numberToFixed(scope.row.itemQtyDo,3)}}</span>
                    </div>
            </template>
           </el-table-column>
            <el-table-column prop="itemUnit"   label="单位" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="secQty"   label="出库第2单位数量" width="160" show-overflow-tooltip>
                <template slot-scope="scope">
                      <div class="content_right">
                  <span>{{$numberToFixed(scope.row.secQty,3)}}</span>
                      </div>
              </template>
            </el-table-column>
            <el-table-column prop="secUnit"   label="单位" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="originPrice"   label="含税单价" width="160" show-overflow-tooltip>
                <template slot-scope="scope">
                <div class="content_right">
                  <span> {{$unitProfitFormat(scope.row,scope.column,scope.row.originPrice)}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="currencyCode"   label="币种" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="$moneyFormat" prop="originAmt"   label="含税金额" width="160" show-overflow-tooltip></el-table-column>
       </el-table-column>
      <el-table-column  label="已生成销售发票(含草拟)">
           <el-table-column prop="invoiceQty"   label="出库第1单位数量" width="160" show-overflow-tooltip>
             <template slot-scope="scope">
                    <div class="content_right">
                <span>{{$numberToFixed(scope.row.invoiceQty,3)}}</span>
                    </div>
            </template>
           </el-table-column>
            <el-table-column prop="itemUnit"   label="单位" width="100" show-overflow-tooltip></el-table-column>
             <el-table-column :formatter="$moneyFormat" prop="originAmtVat"   label="含税金额" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="currencyCode"   label="币种" width="100" show-overflow-tooltip></el-table-column>
           
       </el-table-column>
       <el-table-column  label="待开票">
           <el-table-column prop="makeOutInvoiceQty"   label="出库第1单位数量" width="160" show-overflow-tooltip>
             <template slot-scope="scope">
                    <div class="content_right">
                <span>{{$numberToFixed(scope.row.makeOutInvoiceQty,3)}}</span>
                    </div>
            </template>
           </el-table-column>
            <el-table-column prop="itemUnit"   label="单位" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="$moneyFormat" prop="makeOutInvoiceAmt"   label="含税金额" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="currencyCode"   label="币种" width="100" show-overflow-tooltip></el-table-column>
            
       </el-table-column>
        <el-table-column prop="notPickUpQty"   label="合同未提货数量" width="160" show-overflow-tooltip>
          <template slot-scope="scope">
                    <div class="content_right">
                <span>{{$numberToFixed(scope.row.notPickUpQty,3)}}</span>
                    </div>
            </template>
        </el-table-column>
        <el-table-column prop="itemUnit"   label="单位" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bizPersonName"   label="业务员" width="100" show-overflow-tooltip></el-table-column>
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
import {odSoContractList,
      dicQuery,
      selectOdSoContractSum,exportOdSoContract} from "@/api/integratedQuery.js";
import empSelect from "@/views/integratedQuery/conponents/empSelect";
import supplierSelect from "@/views/integratedQuery/conponents/supplierListSelect";
import customerSelect from "@/views/integratedQuery/conponents/customerListSelect";
import {Loading } from "element-ui";
export default {
  name: "salesContractArrivalReport",
  data() {
    return {
      //查询条件
      queryArea: true, //是否显示查询区域
      companyInfo: "",
      companyShow: false, //是否显示公司弹窗
      //列表字段
      costPrefetchData: [],
      loading: false,
      selected: [], //列表选中行
      page: 1,
      pageSize: 100,
      total: 0,
      matterShow:false,
      matterInfo:"",
     departmentList:[],
     departmentData:[],
     staffNameList:[],
     staffName:[],
     supplierList:[],
     supplierInfo:[],
     customerNameList:[],
     customerInfo:[],
     signTime:[],
     doDate:[],
     extCode:"",
     sumTol:{},
      contractStatusData:[],
      contractStatusList:[],
      contractTypeData:[],
      contractTypeList:[],
    };
  },
  created(){
     this.getContractStatusList();
    this.getContractTypeList();
     if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      }
  },
  methods: {
     getContractStatusList() {
      dicQuery({
        dictNo: 1013
      })
        .then(res => {
          this.contractStatusList = res.data;
        })
        .catch();
    },
    getContractTypeList() {
      dicQuery({
        dictNo: 1015
      })
        .then(res => {
          this.contractTypeList = res.data;
        })
        .catch();
    },
     cell({row, column, rowIndex, columnIndex}) {
    //第八列添加 red 类
        if(column.property=="makeOutInvoiceAmt" || column.property=="originAmtVat" 
        || column.property=="originAmt" || column.property=="stockoutAmt"){
        return 'rightTd'
        }else{
        return "";
        }
    },
    //获取费用预提列表
    costPrefetchList() {
      this.costPrefetchData=[];
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyCode:this.companyInfo.companyCode,
        bbBranchBaseList:this.departmentData,
        signTimeBegin:this.signTime.length?this.signTime[0]:"",
        signTimeEnd:this.signTime.length?this.signTime[1]:"",
        bbCustomerBaseList:this.customerInfo,
        extCode:this.extCode,
        getSkuModulVOList:this.matterInfo?[this.matterInfo]:[],
        //bbSupplierBaseList:this.supplierInfo,
        doDateBegin:this.doDate.length?this.doDate[0]:'',
        doDateEnd:this.doDate.length?this.doDate[1]:'',
        bbEmployeeList:this.staffName,
          contractCatList:this.contractTypeData,
        contractStatusList:this.contractStatusData

      };
      params = this.$queryFilter(params);
      this.loading = true;
     odSoContractList(params).then(res => {
        this.loading = false;    
        this.costPrefetchData=res.data;//去掉最后一条
        this.total = res.total;
      }).catch(() => {
        this.loading = false;
      });
    },
    download(){
         let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyCode:this.companyInfo.companyCode,
        bbBranchBaseList:this.departmentData,
        signTimeBegin:this.signTime.length?this.signTime[0]:"",
        signTimeEnd:this.signTime.length?this.signTime[1]:"",
        bbCustomerBaseList:this.customerInfo,
        extCode:this.extCode,
        getSkuModulVOList:this.matterInfo?[this.matterInfo]:[],
        //bbSupplierBaseList:this.supplierInfo,
        doDateBegin:this.doDate.length?this.doDate[0]:'',
        doDateEnd:this.doDate.length?this.doDate[1]:'',
        bbEmployeeList:this.staffName,
          contractCatList:this.contractTypeData,
        contractStatusList:this.contractStatusData

      };
      params = this.$queryFilter(params);
       //使用Element loading-start 方法
      var loading2 = Loading.service({
          lock: true,
          text: "加载中...",
          background: "rgba(0, 0, 0, 0.7)"
      });
      exportOdSoContract(params).then(res=>{
        if(res.code=="fail"){
          this.$openWarning(res.message);
        }else{
          const blob = new Blob([res.data]);
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          const filename ="销售合同提货情况表.xls";
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
        let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyCode:this.companyInfo.companyCode,
        bbBranchBaseList:this.departmentData,
        signTimeBegin:this.signTime.length?this.signTime[0]:"",
        signTimeEnd:this.signTime.length?this.signTime[1]:"",
        bbCustomerBaseList:this.customerInfo,
        extCode:this.extCode,
        getSkuModulVOList:this.matterInfo?[this.matterInfo]:[],
        //bbSupplierBaseList:this.supplierInfo,
        doDateBegin:this.doDate.length?this.doDate[0]:'',
        doDateEnd:this.doDate.length?this.doDate[1]:'',
        bbEmployeeList:this.staffName,
        contractCatList:this.contractTypeData,
        contractStatusList:this.contractStatusData

      };
      params = this.$queryFilter(params);
        selectOdSoContractSum(params).then(res => {
          if(res.data.length){
            this.sumTol = res.data[0];
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
            if (["stockoutAmt","itemQtyDo","secQty",  
             "originAmt", "invoiceQty" ,"originAmtVat",
             "makeOutInvoiceQty", "makeOutInvoiceAmt", 
             "notPickUpQty",
             ].findIndex(it => it == key) !== -1) {
                sums[index] =this.sumTol?this.$sumTolFormat(this.sumTol[key]):"";
            } else {
                sums[index] = "";
            }
        });
        this.$nextTick(() => {
            this.$refs.expandTable.doLayout();
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
     this.signTime=[];
     this.doDate=[];
     this.extCode="";
     this.contractTypeData=[];
      this.contractStatusData=[];
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
      this.$refs.expandTable.toggleRowSelection(e);
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
    supplierSelect,
    empSelect,
    departmentSelect,
    customerSelect
    
  }
};
</script>
<style lang="scss">
#salesContractArrivalReport {
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