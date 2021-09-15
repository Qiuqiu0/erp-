<template>
  <div id="deliveryOfGoodsReport" class="content-div">
    <!--查询条件-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-search" class="query-button" @click="query">查询</el-button>
      <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
    </div>
    <div class="index-div3 auto-sibling">
        <!-- <p class="hide-input" v-if="show" @click="inputShow()">
            更多条件 <i class="el-icon-caret-bottom"></i>
        </p>
        <p class="hide-input" v-else @click="inputShow()">
            收起<i class="el-icon-caret-top"></i>
        </p> -->
        <div class="search-div">
            <el-col :span="5" class="el-col">
              <label>公司</label>
              <el-input v-model="companyName.companyName" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span class="comicon" @click="componyTip"><i class="el-icon-search"></i></span>
            </el-col>
            <department-select 
              :companyInfo="companyName"
              :departmentList="departmentList"
              :branchInfo.sync="departmentData"
            class="el-col el-col-5"></department-select>
            <!-- <el-col :span="5" class="el-col">
              <label>业务员</label>
              <el-input v-model="staffName.empName" size="small" class="el-inputs"  placeholder="请选择" disabled></el-input>
              <span class='comicon' @click="staffTip"><i class="el-icon-search" ></i></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>销售客户</label>
              <el-input v-model="customerName.customerName" size="small" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span class='comicon' @click="customerTips(0)"><i class="el-icon-search" ></i></span>
          </el-col>
          <el-col :span="5" class="el-col">
              <label>出库单号</label>
              <el-input v-model="doNo" class="el-inputs"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>仓库名称</label>
              <el-input v-model="warehouseName.warehouseName" size="small" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span  class='comicon' @click="warehouseTips"><i class="el-icon-search" ></i></span>
            </el-col> -->
            <el-col :span="5" class="el-col">
              <label>商品</label>
              <el-input v-model="matterName.skuName" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span class="comicon" @click="matterTips"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>批次号</label>
              <el-input v-model="batchCode" class="el-inputs" placeholder="请输入"></el-input>
            </el-col>
            <!-- <el-col :span="5" class="el-col">
              <label>出库时间</label>
              <el-date-picker
                  v-model="doDate"
                  type="daterange"
                  class="el-inputs el-input2"
                  size="mini"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
              </el-date-picker>
          </el-col>
          <el-col :span="5" class="el-colc">
              <label>单据状态</label>
              <el-select clearable  size="small" class="el-inputs el-select"  v-model="doStatus"  placeholder="请选择" >
                  <el-option v-for="item in doStatusList"
                              :key="item.dict_code"  
                              :label="item.dict_value"
                              :value="item.dict_code"
                      ></el-option>
                  </el-select>
          </el-col>
          <el-col :span="5" class="el-colc">
              <label>销售类型</label>
              <el-select clearable  size="small" class="el-inputs el-select"   v-model="contractType"  placeholder="请选择" >
              <el-option v-for="item in contractTypeList"
                          :key="item.dict_code"
                          :label="item.dict_value"
                          :value="item.dict_code"
                  ></el-option>
              </el-select>
          </el-col>
          <el-col :span="5" class="el-col">
              <label>业务币别</label>
              <el-input
                  class="el-inputs"
                  v-model="coinName.currencyName"
                  size="small"
                  placeholder="请选择"
                  disabled
              ></el-input>
              <span class="comicon" @click="coinTips()"
                  ><i class="el-icon-search"></i
              ></span>
              </el-col> -->
        </div>
    </div>
    <div class="button-div auto-sibling">
        <el-button @click="download()"  v-if="$actionFlag(`F001`)" icon="el-icon-download">导出</el-button>
    </div>
    <!--查询结果-->
    <div class="el-table-div" v-auto>
      <el-table
        class="el-table"
        border
        center
        height="calc(100% - 35px)"
        :data="reportData"
        v-loading="loading"
         show-summary
        :summary-method="getSummaries"
        ref="expandTable">
        <el-table-column prop="orgName" label="部门" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodsName" label="物料名称" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="batchCode" label="批次号" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="statisticsQty" label="出库数量" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="content_right">
                <span>{{$numberToFixed(scope.row.statisticsQty, 3)}}</span>
            </div>
            </template>
        </el-table-column>
        <el-table-column  prop="deliveryCost" label="出库金额（不含税）" 
        min-width="140" show-overflow-tooltip>
           <template slot-scope="scope">
                  <div class="content_right">
                {{$moneyFormat(scope.row,scope.column,scope.row.deliveryCost)}}
                  </div>
            </template>
        </el-table-column>
        <el-table-column prop="doStatusName" label="单据状态" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="outWarehouseUninvoicedQty" label="已出库未开票数量" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="content_right">
                <span>{{$numberToFixed(scope.row.outWarehouseUninvoicedQty, 3)}}</span>
            </div>
            </template>
        </el-table-column>
        <el-table-column prop="outWarehouseUninvoicedAmt" label="已出库未开票金额（不含税）" min-width="180" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="content_right">
                  <span>{{$moneyFormat({},{},scope.row.outWarehouseUninvoicedAmt)}}</span>
              </div>
              </template>
        </el-table-column>
        <el-table-column prop="itemUnit" label="单位" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column width="120" label="销售单价（含税）" prop="basePrice" show-overflow-tooltip>
            <template slot-scope="scope">
                  <div class="content_right">
                {{$numberToFixed(scope.row.basePrice,6)}}
                  </div>
            </template>
        </el-table-column>
        <el-table-column prop="taxRate" label="税率" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column width="140" label="销售单价（不含税）" prop="basePriceNoTax" show-overflow-tooltip>
            <template slot-scope="scope">
                  <div class="content_right">
                {{$numberToFixed(scope.row.basePriceNoTax,6)}}
                  </div>
            </template>
        </el-table-column>
        <el-table-column prop="foreCast"  label="已出库未开票毛利预测" min-width="180" show-overflow-tooltip>
           <template slot-scope="scope">
              <div class="content_right">
                  <span v-if="scope.row.foreCast>0">{{$moneyFormat({},{},scope.row.foreCast)}}</span>
                  <span v-else style="color:red">{{$moneyFormat({},{},scope.row.foreCast)}}</span>
              </div>
              </template>
        </el-table-column>    
        <el-table-column prop="abaWarning" label="ABA预警" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="supplierName" label="供应商" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="custName" label="客户" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="warehouseName" label="仓库" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column label="出库时间" min-width="160" show-overflow-tooltip>
            <template slot-scope="scope">
                <span>{{scope.row.doDate | time2Date}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="warrantPostCode" label="出库财务凭证号" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="doNo" label="出库单号" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodsCode" label="物料号" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="currencyCode" label="业务币别" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bizPersonName" label="业务员" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="erpPoNo" label="系统采购合同号" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="extPoNo" label="外部采购合同号" min-width="180" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination
        class="pageArea"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="currentChange"
        @size-change="currentSize"
        :current-page="pageNum"
        :page-sizes="[100, 200, 300,500]"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
   <!-- 选择公司弹窗 -->
        <compony-select
          v-if="componyShow"
          :tipShow="componyShow"
          @tipsCancle="tipsCancle"
          @tipsSure="tipsSure"
        >
        </compony-select>
        <staff-select
          v-if="staffShow"
          :tipShow="staffShow"
          :data="{}"
          @staffCancle="staffCancle"
          @staffSure="staffSure"
        >
        </staff-select>
        <!--选择业务币别 -->
        <coin-select
          v-if="coinShow"
          :tipShow="coinShow"
          @coinCancle="coinCancle"
          @coinSure="coinSure"
        >
        </coin-select>
        <!--选择销售客户 -->
        <customer-select
          v-if="customerShow"
          :tipShow="customerShow"
          @customerCancle="customerCancle"
          @customerSure="customerSure"
        >
        </customer-select>
        <!--选择仓库-->
        <warehouse-select
          v-if="warehouseShow"
          :tipShow="warehouseShow"
          @warehouseCancle="warehouseCancle"
          @warehouseSure="warehouseSure"
        >
        </warehouse-select>
        <!--选择物料号-->
        <matter-select
          v-if="matterShow"
          :tipShow="matterShow"
          @matterCancle="matterCancle"
          @matterSure="matterSure"
        >
        </matter-select>
  </div>
</template>
<script>
import { mapState } from "vuex";
import sApi from "@/api/salesManage/salesManage";
import rApi from "@/api/reportQuery/bill";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/views/integratedQuery/conponents/departmentSelect";
import staffSelect from "@/components/staffSelect.vue";
import coinSelect from "@/components/coinSelect.vue";
import customerSelect from "@/components/customerSelect.vue";
import warehouseSelect from "@/components/warehouseSelect.vue";
import matterSelect from "@/components/matterSelect.vue";
import {Loading } from "element-ui";
export default {
  name: "deliveryOfGoodsReport",
  data() {
    return {
        componyShow: false, //公司弹窗
        staffShow: false, //员工弹窗
        coinShow: false, //业务币弹窗
        customerShow: false, //客户弹窗
        warehouseShow: false, //仓库弹窗
        matterShow: false, //物料弹窗
        companyName: {}, //公司名
        departmentList:[],
        departmentData:[],//部门
        staffName: {}, //业务员
        coinName: {}, //业务币别
        customerName: {}, //客户
        warehouseName: {}, //仓库
        matterName: {}, //物料名称
        contractType: "", //销售类型
        contractTypeList: [], //销售类型下拉数据
        doStatus: "", //单据状态 
        doStatusList: [],
        doDate:[], //出库日期
        doNo: "", //出库单号
        batchCode:"",
        pageSize:100,
        pageNum:1,
        total:0,
        reportData:[],
        loading:false,
         show:true,//查询条件显示隐藏
         sumTol:{},
    };
  },
  created() {
      this.getDoStatusList();
      this.getContractTypeList();
       if(window.IsShowDefaultCompanyInfo){
        this.companyName=window.defaultCompanyInfo;
      }
  },
  methods: {
     inputShow() {
            this.show = this.$showOne(this.show);
        },
    query(){
        this.goodsInTransitList();
        this.getSum();
    },
    goodsInTransitList(){
        this.loading=true;
        let data={
             pageNum:this.pageNum,
            pageSize:this.pageSize,
            companyCode:this.companyName.companyCode,
           // orgCode:this.branchName.branchCode,
            bbBranchBaseList:this.departmentData,
            batchCode:this.batchCode,
            gdGoodsBaseSkuList:Object.keys(this.matterName).length?[this.matterName]:[],
            // bizPersonCode:this.staffName.empCode,
            // custCode:this.customerName.customerCode,
            // currencyCode:this.coinName.currencyCode,
            // batchCode:batchCode,
            // doNo:doNo,
            // skuCode:this.matterName.skuCode,
            // warehouseCode:this.warehouseName.warehouseCode,
            // doStatus:doStatus,
            // contractType:contractType,
            // doDateBegin:doDateBegin,
            // doDateEnd:doDateEnd
        }
        rApi.getGoodsInTransitList(data).then(res=>{
            if(res.code=="success"){
                this.reportData=res.data;
                this.total = res.total;
            }else{
                this.$openWarning(res.message);
            }
            this.loading=false;
        }).catch();
    },
     //导出
    download(){
        let data={
             pageNum:this.pageNum,
            pageSize:this.pageSize,
            companyCode:this.companyName.companyCode,
           // orgCode:this.branchName.branchCode,
            bbBranchBaseList:this.departmentData,
            batchCode:this.batchCode,
            gdGoodsBaseSkuList:Object.keys(this.matterName).length?[this.matterName]:[],
        }
         //使用Element loading-start 方法
        var loading2 = Loading.service({
            lock: true,
            text: "加载中...",
            background: "rgba(0, 0, 0, 0.7)"
        });
        rApi.exportGoodsInTransitList(data).then(res=>{
          if(res.code=="fail"){
            this.$openWarning(res.message);
          }else{
            const blob = new Blob([res.data]);
            const a = document.createElement("a");
            const url = window.URL.createObjectURL(blob);
            const filename ="发出商品报表.xls";
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
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        companyCode:this.companyName.companyCode,
        // orgCode:this.branchName.branchCode,
        bbBranchBaseList:this.departmentData,
        batchCode:this.batchCode,
        gdGoodsBaseSkuList:Object.keys(this.matterName).length?[this.matterName]:[],
      };
      params = this.$queryFilter(params);
      rApi.getGoodsInTransitSum(params)
        .then(res => {
          if (res.data) {
            this.sumTol = res.data;
          }
        })
        .catch();
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
        if (
          [
            "statisticsQty",
            "deliveryCost",
            "outWarehouseUninvoicedQty",
            "outWarehouseUninvoicedAmt",
            "foreCast",   
          ].findIndex(it => it == key) !== -1
        ) {
          sums[index] = this.sumTol?this.$sumTolFormat(this.sumTol[key]):"";;
        } else {
          sums[index] = "";
        }
      });
      this.$nextTick(() => {
        this.$refs.expandTable.doLayout();
      });
      return sums;
    },
    reset(){
        if(window.IsShowDefaultCompanyInfo){
        this.companyName=window.defaultCompanyInfo;
      }else{
        this.companyName = {}; //公司
      }
        this.departmentData=[];//部门
        // this.staffName={}; //业务员
        // this.coinName={}; //业务币别
        // this.customerName={}; //客户
        // this.warehouseName={}; //仓库
        this.matterName={}; //物料名称
        // this.contractType=""; //销售类型
        // this.doStatus="";//单据状态 
        // this.doDate=[]; //出库日期
        // this.doNo="";//出库单号
        this.batchCode="";
    },
     //获取单据状态
    getDoStatusList() {
      let data = {
        dictNo: 1045
      };
      sApi
        .selectDoStatusList(data)
        .then(res => {
          this.doStatusList = res.data;
        })
        .catch();
    },
    //获取销售类型
    getContractTypeList() {
      let data = {
        dictNo: 1015
      };
      sApi
        .selectDoStatusList(data)
        .then(res => {
          this.contractTypeList = res.data;
        })
        .catch();
    },
     //公司弹窗打开
    componyTip() {
      this.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.componyShow = false;
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.companyName = e;
    },
    //员工弹窗打开
    staffTip() {
      this.staffShow = true;
    },
    //员工弹窗关闭
    staffCancle() {
      this.staffShow = false;
    },
    //员工弹窗确定获取数据
    staffSure(e) {
      this.staffShow = false;
      this.staffName = e;
    },
    //业务币别弹窗
    coinTips(type) {
        this.coinShow = true;
    },
    //业务币别弹窗关闭
    coinCancle(type) {
        this.coinShow = false;
    },
    //业务币别弹窗确定获取数据
    coinSure(e) {
        this.coinShow = false;
        this.coinName = e;
    },
    //销售客户弹窗
    customerTips() {
      this.customerShow = true;
    },
    //销售客户弹窗关闭
    customerCancle() {
      this.customerShow = false;
    },
    //销售客户弹窗确定获取数据
    customerSure(e) {
      this.customerShow = false;
      this.customerName = e;
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
    //物料号弹窗
    matterTips() {
      this.matterShow = true;
    },
    //物料号弹窗关闭
    matterCancle() {
      this.matterShow = false;
    },
    //物料号确定获取数据
    matterSure(e) {
      console.log(e);
      this.matterShow = false;
      this.matterName = e;
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.goodsInTransitList();
    },
    //单页数量
    currentSize(e) {
      this.pageNum = 1;
      this.pageSize = e;
      this.goodsInTransitList();
    },
   
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    coinSelect,
    customerSelect,
    warehouseSelect,
    matterSelect,
  }
};
</script>
<style lang="scss">
#deliveryOfGoodsReport {
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
  .input-div .el-col:last-child {
    margin-bottom: 0;
  }
  .pageArea {
    margin: 10px 0 0 20px;
  }
}
</style>