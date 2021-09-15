<template>
<!-----------------库存账龄表----------------------->
  <div id="inventoryAgingReport">
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
          <label>仓库</label>
          <el-input v-model="warehouseName.warehouseName" size="small" class="el-inputs" placeholder="请选择" disabled></el-input>
          <span  class='comicon' @click="warehouseTips"><i class="el-icon-search" ></i></span>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>外部合同号</label>
          <el-input v-model="outerContractCode" class="el-inputs"></el-input>
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
          <label>批次号</label>
          <el-input v-model="batchCode" class="el-inputs"></el-input>
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
        ref="multipleTable"
         :cell-class-name="cell"
             show-summary
        :summary-method="getSummaries"
       >
        <!-- <el-table-column type="selection" width="55" ></el-table-column> -->
        <el-table-column type="index" label="序号" width="60" ></el-table-column>
        <el-table-column prop="companyName" label="公司" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="deptName" label="部门" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="warehouseName" label="仓库" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="invTime" label="入库时间" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="betweenDay" label="库龄" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="docNo" label="业务单据编号" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="contractCode" label="合同号" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="outerContractCode" label="外部合同号" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="skuName" label="物料名称" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="batchCode" label="批次号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="fstInvQty"  width="140" label="入库第1单位数量"  show-overflow-tooltip>
             <template slot-scope="scope">
                    <div class="content_right">
                <span>{{$numberToFixed(scope.row.fstInvQty,3)}}</span>
                    </div>
            </template>
        </el-table-column>
        <el-table-column prop="fstUnitName"   label="基础单位" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="secInvQty"  width="140" label="入库第2单位数量"  show-overflow-tooltip>
             <template slot-scope="scope">
                    <div class="content_right">
                <span>{{$numberToFixed(scope.row.secInvQty,3)}}</span>
                    </div>
            </template>
        </el-table-column>
        <el-table-column prop="secUnitName"   label="基础单位" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="fstOutQty"  width="140" label="出库第1单位数量"  show-overflow-tooltip>
             <template slot-scope="scope">
                    <div class="content_right">
                <span>{{$numberToFixed(scope.row.fstOutQty,3)}}</span>
                    </div>
            </template>
        </el-table-column>
        <el-table-column prop="fstUnitName"   label="基础单位" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="secOutQty"  width="140" label="出库第2单位数量"  show-overflow-tooltip>
             <template slot-scope="scope">
                    <div class="content_right">
                <span>{{$numberToFixed(scope.row.secOutQty,3)}}</span>
                    </div>
            </template>
        </el-table-column>
        <el-table-column prop="secUnitName"   label="基础单位" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="fstStoreQty"  width="140" label="库存第1单位数量"  show-overflow-tooltip>
             <template slot-scope="scope">
                    <div class="content_right">
                <span>{{$numberToFixed(scope.row.fstStoreQty,3)}}</span>
                    </div>
            </template>
        </el-table-column>
        <el-table-column prop="fstUnitName"   label="基础单位" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="secStoreQty"  width="140" label="库存第2单位数量"  show-overflow-tooltip>
             <template slot-scope="scope">
                    <div class="content_right">
                <span>{{$numberToFixed(scope.row.secStoreQty,3)}}</span>
                    </div>
            </template>
        </el-table-column>
        <el-table-column prop="secUnitName"   label="基础单位" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column  prop="costPrice" label="成本单价" min-width="140" show-overflow-tooltip>
           <template slot-scope="scope">
              <div class="content_right">
                <span> {{$numberToFixed(scope.row.costPrice,6)}}</span>
              </div>
            </template>
        </el-table-column>
        <el-table-column :formatter="$moneyFormat" prop="costAmt" label="成本金额" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="currency" label="业务币种" width="100"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="purchaseType" label="采购类型" width="120"  show-overflow-tooltip>
          <template slot-scope="scope">
              <div>
                <span
                    v-show="scope.row.purchaseType == it.dict_code"
                    v-for="it in purchaseTypeList"
                    :key="it.dict_code"
                  >{{ it.dict_value }}</span>
              </div>
            </template>
        </el-table-column>
        <el-table-column prop="oneMonthStockQty" label="30天内库存数量" width="120" show-overflow-tooltip>
          <template slot-scope="scope">
              <div class="content_right">
                <span>{{$numberToFixed(scope.row.oneMonthStockQty,3)}}</span>
              </div>
            </template>
        </el-table-column>
        <el-table-column prop="oneMonthStockAmt" :formatter="$moneyFormat" label="30天内库存金额"  width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="twoMonthStockQty" label="30-60天内库存数量"  width="150" show-overflow-tooltip>
          <template slot-scope="scope">
              <div class="content_right">
                <span>{{$numberToFixed(scope.row.twoMonthStockQty,3)}}</span>
              </div>
            </template>
        </el-table-column>
        <el-table-column prop="twoMonthStockAmt" :formatter="$moneyFormat" label="30-60天内库存金额"  width="150" show-overflow-tooltip></el-table-column>
           <el-table-column prop="threeMonthStockQty" label="60-90天内库存数量"  width="150" show-overflow-tooltip>
             <template slot-scope="scope">
              <div class="content_right">
                <span>{{$numberToFixed(scope.row.threeMonthStockQty,3)}}</span>
              </div>
            </template>
           </el-table-column>
        <el-table-column prop="threeMonthStockAmt" :formatter="$moneyFormat" label="60-90天内库存金额"  width="150" show-overflow-tooltip></el-table-column>
           <el-table-column prop="fourMonthStockQty" label="90-120天内库存数量"  width="150" show-overflow-tooltip>
             <template slot-scope="scope">
              <div class="content_right">
                <span>{{$numberToFixed(scope.row.fourMonthStockQty,3)}}</span>
              </div>
            </template>
           </el-table-column>
        <el-table-column prop="fourMonthStockAmt" :formatter="$moneyFormat" label="90-120天内库存金额"  width="150" show-overflow-tooltip></el-table-column>
           <el-table-column prop="fiveMonthStockQty" label="120-150天内库存数量"  width="150" show-overflow-tooltip>
             <template slot-scope="scope">
              <div class="content_right">
                <span>{{$numberToFixed(scope.row.fiveMonthStockQty,3)}}</span>
              </div>
            </template>
           </el-table-column>
        <el-table-column prop="fiveMonthStockAmt" :formatter="$moneyFormat" label="120-150天内库存金额"  width="150" show-overflow-tooltip></el-table-column>
         <el-table-column prop="sixMonthStockQty" label="150-180天内库存数量" width="100"  show-overflow-tooltip>
           <template slot-scope="scope">
              <div class="content_right">
                <span>{{$numberToFixed(scope.row.sixMonthStockQty,3)}}</span>
              </div>
            </template>
         </el-table-column>
        <el-table-column prop="sixMonthStockAmt" :formatter="$moneyFormat" label="150-180天内库存金额" width="120"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="thirdSeasonStockQty" label="180-270天内库存数量" width="120" show-overflow-tooltip>
          <template slot-scope="scope">
              <div class="content_right">
                <span>{{$numberToFixed(scope.row.thirdSeasonStockQty,3)}}</span>
              </div>
            </template>
        </el-table-column>
        <el-table-column prop="thirdSeasonStockAmt" :formatter="$moneyFormat" label="180-270天内库存金额"  width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="lastSeasonStockQty" label="270-360天内库存数量" width="100"  show-overflow-tooltip>
          <template slot-scope="scope">
              <div class="content_right">
                <span>{{$numberToFixed(scope.row.lastSeasonStockQty,3)}}</span>
              </div>
            </template>
        </el-table-column>
        <el-table-column prop="lastSeasonStockAmt" :formatter="$moneyFormat" label="270-360天内库存金额" width="120"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="overYearStockQty" label="360天以上库存数量" width="120" show-overflow-tooltip>
          <template slot-scope="scope">
              <div class="content_right">
                <span>{{$numberToFixed(scope.row.overYearStockQty,3)}}</span>
              </div>
            </template>
        </el-table-column>
        <el-table-column prop="overYearStockAmt" :formatter="$moneyFormat" label="360天以上库存金额"  width="150" show-overflow-tooltip></el-table-column>
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
   
     <!--选择仓库-->
    <warehouse-select
      v-if="warehouseShow"
      :tipShow="warehouseShow"
      @warehouseCancle="warehouseCancle"
      @warehouseSure="warehouseSure"
    >
    </warehouse-select>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {accountAgeList,accountAgeExport,dicQuery,accountAgeListSum} from "@/api/integratedQuery.js";
import companySelect from "@/components/componySelect";
import matterSelect from "@/components/matterSelect";
import warehouseSelect from "@/components/warehouseSelect.vue";
import {Loading } from "element-ui";
import departmentSelect from "@/views/integratedQuery/conponents/departmentSelect";
import empSelect from "@/views/integratedQuery/conponents/empSelect";
export default {
  name: "inventoryAgingReport",
  data() {
    return {
      //查询条件
      queryArea: true, //是否显示查询区域
      companyInfo:{},
      companyShow: false, //是否显示公司弹窗
      branchShow: false, //是否显示部门弹窗
      matterInfo: "",
      matterShow: false, //是否显示物料号弹窗
      batchCode: "",
      //列表字段
      costPrefetchData: [],
      loading: false,
      selected: [], //列表选中行
      page: 1,
      pageSize: 100,
      total: 0,
      sumTol: {},//总计
      staffName: {},
      staffShow:false,
      warehouseName:{},
      warehouseShow:false,
      outerContractCode:'',
      departmentData:[],
      departmentList:[],
      staffNameList:[],
      staffName:[],
      purchaseTypeList:[],

    };
  },
  created(){
    this.getPurchaseTypeList();
    if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
    }
  },
  methods: {
     cell({row, column, rowIndex, columnIndex}) {
    //第八列添加 red 类 costAmt oneMonthStockAmt
      if(column.property=="twoMonthStockAmt" || column.property=="threeMonthStockAmt" || column.property=="fourMonthStockAmt"
        || column.property=="fiveMonthStockAmt" || column.property=="sixMonthStockAmt" || column.property=="thirdSeasonStockAmt" ||
        column.property=="lastSeasonStockAmt" || column.property=="overYearStockAmt"){
        return 'rightTd'
      }else{
        return "";
       }
    },
    //费用环节字典
    getPurchaseTypeList() {
      dicQuery({
        dictNo: 1014
      }).then(res => {
        this.purchaseTypeList = res.data;
        
      }).catch();
    },
    //获取费用预提列表
    costPrefetchList() {
      let branchIdStr=this.analysisStr(this.departmentData,1);
      let empCodeStr=this.analysisStr(this.staffName,2);
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyId: this.companyInfo.companyId,
        deptId:branchIdStr,
        outerContractCode:this.outerContractCode,
        bizPersonCode:empCodeStr,
        batchCode:this.batchCode,  
        skuCode: this.matterInfo.skuCode,
        warehouseCode:this.warehouseName.warehouseCode
      };
      params = this.$queryFilter(params);
      this.loading = true;
      accountAgeList(params).then(res => {
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
       let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyId: this.companyInfo.companyId,
        deptId:branchIdStr,
        outerContractCode:this.outerContractCode,
        bizPersonCode:empCodeStr,
        batchCode:this.batchCode,  
        skuCode: this.matterInfo.skuCode,
        warehouseCode:this.warehouseName.warehouseCode
      };
      params = this.$queryFilter(params);
       //使用Element loading-start 方法
      var loading2 = Loading.service({
          lock: true,
          text: "加载中...",
          background: "rgba(0, 0, 0, 0.7)"
      });
      accountAgeExport(params).then(res=>{
        if(res.code=="fail"){
          this.$openWarning(res.message);
        }else{
          const blob = new Blob([res.data]);
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          const filename ="库存账龄报表.xls";
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
            str=str?(str+","+e.empCode):e.empCode;
          }
        });
      }
      return str;
    },
    //
             //获取总计
    getSum() {
       let branchIdStr=this.analysisStr(this.departmentData,1);
      let empCodeStr=this.analysisStr(this.staffName,2);
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyId: this.companyInfo.companyId,
        deptId:branchIdStr,
        outerContractCode:this.outerContractCode,
        bizPersonCode:empCodeStr,
        batchCode:this.batchCode,  
        skuCode: this.matterInfo.skuCode,
        warehouseCode:this.warehouseName.warehouseCode
      };
      params = this.$queryFilter(params);
        accountAgeListSum(params).then(res => {
          if(res.data){
            this.sumTol = res.data;
          }
        }).catch();
    },
    //     //总计
    getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
            if (index === 0) {
            sums[index] = "总计";
            return;
            }
            let key = column.property;
            if (["fstInvQty", "secInvQty", "fstOutQty", "secOutQty", "fstStoreQty", "secStoreQty", "costAmt",
                "oneMonthStockQty", "oneMonthStockAmt"  ,"twoMonthStockQty" ,"twoMonthStockAmt",  
                "threeMonthStockQty", "threeMonthStockAmt" , "fourMonthStockAmt", "fourMonthStockQty",
                "fiveMonthStockQty" ,
                "fiveMonthStockAmt", "sixMonthStockQty", "sixMonthStockAmt" , "thirdSeasonStockQty",
                "thirdSeasonStockAmt" ,"lastSeasonStockQty" ,"lastSeasonStockAmt", "overYearStockQty",
                "overYearStockAmt"].findIndex(it => it == key) !== -1) {
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
      this.batchCode = "";
      this.outerContractCode='';
      this.warehouseName='';
      this.staffName='';
      this.departmentData=[];
      this.staffName=[];
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
    warehouseSelect,
    matterSelect,
    departmentSelect,
    empSelect
  }
};
</script>
<style lang="scss">
#inventoryAgingReport {
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