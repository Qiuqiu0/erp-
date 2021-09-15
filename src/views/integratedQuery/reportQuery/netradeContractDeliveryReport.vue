<template>
  <!-----------------内贸采购合同交货情况表----------------------->
  <div id="netradeContractDeliveryReport">
    <!--查询条件-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-search" class="query-button" @click="query"
        >查询</el-button
      >
      <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
    </div>
    <div class="input-div auto-sibling">
      <p class="hide-input" v-if="queryArea" @click="queryAreaShow()">
        更多条件<i class="el-icon-caret-bottom"></i>
      </p>
      <p class="hide-input" v-else @click="queryAreaShow()">
        收起<i class="el-icon-caret-top"></i>
      </p>
      <div class="search-div">
        <el-col :span="5" class="el-col">
          <label>公司</label>
          <el-input
            v-model="companyInfo.companyName"
            class="el-inputs"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="moreIcon" @click="companyPopup"
            ><i class="el-icon-search"></i
          ></span>
        </el-col>
        <department-select
          :companyInfo="companyInfo"
          :departmentList="departmentList"
          :branchInfo.sync="departmentData"
          class="el-col el-col-5"
        ></department-select>
        <el-col :span="5" class="el-col">
          <label>签订日期</label>
          <el-date-picker
            v-model="signTime"
            :clearable="false"
            type="daterange"
            class="el-inputs el-input2"
            size="mini"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-col>
        <!--供应商-->
        <supplier-select
          :supplierList="supplierList"
          :supplierInfo.sync="supplierInfo"
          class="el-col el-col-5"
        ></supplier-select>
        <el-col :span="5" class="el-col">
          <label>外部合同号</label>
          <el-input v-model="extCode" class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>付款方式</label>
          <el-select
            v-model="paymentWayData"
            class="el-inputs"
            placeholder="请选择"
            multiple
            collapse-tags
          >
            <el-option
              v-for="item in paymentWayList"
              :key="item.dict_code"
              :label="item.dict_value"
              :value="item.dict_code"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>物料名称</label>
          <el-input
            v-model="matterInfo.skuName"
            class="el-inputs"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="moreIcon" @click="matterPopup"
            ><i class="el-icon-search"></i
          ></span>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>业务币种</label>
          <el-input
            class="el-inputs"
            v-model="coinName.currencyCode"
            size="small"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" @click="coinTips()"
            ><i class="el-icon-search"></i
          ></span>
        </el-col>
        <!--员工-->
        <emp-select
          :staffNameList="staffNameList"
          :staffName.sync="staffName"
          class="el-col el-col-5"
        ></emp-select>
        <el-col :span="5" class="el-col">
          <label>是否展示明细</label>
          <el-select
            v-model="isShowDetail"
            :clearable="false"
            @change="changeData"
          >
            <el-option :value="0" label="否"></el-option>
            <el-option :value="1" label="是"></el-option>
          </el-select>
        </el-col>
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
      <el-button @click="download()" v-if="$actionFlag(`F001`)"  icon="el-icon-download">导出</el-button>
    </div>
    <div v-if="isShowDetail == 0" class="el-table-div" v-auto>
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
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column
          prop="companyName"
          label="公司"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="orgName"
          label="部门"
          width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="signTime"
          label="合同签订日"
          min-width="180"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.signTime | time2Date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="supplierName"
          label="供应商"
          min-width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="poNo"
          label="合同采购号"
          min-width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="extCode"
          label="外部合同号"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="contractStatus"
          label="合同状态"
          min-width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="poTypeName"
          label="合同类型"
          width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="paymentWayName"
          label="付款方式"
          width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="deliveryCutoffDate"
          label="交货期限"
          width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.deliveryCutoffDate | time2Date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sumQty"
          width="100"
          label="合同数量"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div class="content_right">
              <span>{{ $numberToFixed(scope.row.sumQty, 3) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="itemUnit"
          label="基础单位"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :formatter="$moneyFormat"
          prop="contractAmtVat"
          width="140"
          label="合同含税金额"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="currencyCode"
          label="业务币种"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="inStorageQty"
          width="120"
          label="已入库数量"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div class="content_right">
              <span>{{ $numberToFixed(scope.row.inStorageQty, 3) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="itemUnit"
          label="基础单位"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="unfilledQty"
          width="100"
          label="未交货数量"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div class="content_right">
              <span>{{ $numberToFixed(scope.row.unfilledQty, 3) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :formatter="$moneyFormat"
          prop="payedMarginAmt"
          label="已付保证金金额"
          width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :formatter="$moneyFormat"
          prop="payedGoodsAmt"
          width="140"
          label="已付货款金额"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <el-pagination
        class="pageArea"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="currentChange"
        @size-change="currentSize"
        :current-page="page"
        :page-sizes="[100, 200, 300, 500]"
        :page-size="pageSize"
        :total="total"
      >
      </el-pagination>
    </div>
    <div v-else class="el-table-div" v-auto>
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
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column
          prop="companyName"
          label="公司"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="orgName"
          label="部门"
          width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="signTime"
          label="合同签订日"
          min-width="180"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.signTime | time2Date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="supplierName"
          label="供应商"
          min-width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="poNo"
          label="合同采购号"
          min-width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="extCode"
          label="外部合同号"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="contractStatus"
          label="合同状态"
          min-width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="poTypeName"
          label="合同类型"
          width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="paymentWayName"
          label="付款方式"
          width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="deliveryCutoffDate"
          label="交货期限"
          width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.deliveryCutoffDate | time2Date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="物料名称"
          width="100"
          show-overflow-tooltip
        >
        <template slot-scope="scope">
            <span>{{ scope.row.goodsName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsSpec"
          label="规格材质"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="itemQty"
          width="140"
          label="合同第1单位数量"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div class="content_right">
              <span>{{ $numberToFixed(scope.row.itemQty, 3) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="itemUnit"
          label="基础单位"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :formatter="$moneyFormat"
          prop="contractAmtVat"
          width="140"
          label="合同含税金额"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="currencyCode"
          label="业务币种"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="inStorageQty"
          width="140"
          label="已入库第1单位数量"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div class="content_right">
              <span>{{ $numberToFixed(scope.row.inStorageQty, 3) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="itemUnit"
          label="基础单位"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="unfilledQty"
          width="100"
          label="未交货数量"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div class="content_right">
              <span>{{ $numberToFixed(scope.row.unfilledQty, 3) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :formatter="$moneyFormat"
          prop="payedMarginAmt"
          label="已付保证金金额"
          width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :formatter="$moneyFormat"
          prop="payedGoodsAmt"
          label="已付货款金额"
          width="140"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <el-pagination
        class="pageArea"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="currentChange"
        @size-change="currentSize"
        :current-page="page"
        :page-sizes="[100, 200, 300, 500]"
        :page-size="pageSize"
        :total="total"
      >
      </el-pagination>
    </div>
    <!--公司弹窗-->
    <company-select
      v-if="companyShow"
      :tipShow="companyShow"
      @tipsCancle="companyCancel"
      @tipsSure="companySure"
    ></company-select>
    <matter-select
      v-if="matterShow"
      :tipShow="matterShow"
      @matterCancle="matterCancel"
      @matterSure="matterSure"
    ></matter-select>
    <!--选择业务币别 -->
    <coin-select
      v-if="coinShow"
      :tipShow="coinShow"
      @coinCancle="coinCancle()"
      @coinSure="coinSure"
    >
    </coin-select>
  </div>
</template>
<script>
import { mapState } from "vuex";
import CostApi from "@/api/costData/cost";
import companySelect from "@/components/componySelect";
import matterSelect from "@/components/matterSelect";
import departmentSelect from "@/views/integratedQuery/conponents/departmentSelect";
import {
  odPoContractDeliveryList,
  dicQuery,
  exportOdPoContract,
  selectOdPoContractSum
} from "@/api/integratedQuery.js";
import empSelect from "@/views/integratedQuery/conponents/empSelect";
import supplierSelect from "@/views/integratedQuery/conponents/supplierListSelect";
import coinSelect from "@/components/coinSelect.vue";
import { Loading } from "element-ui";
export default {
  name: "netradeContractDeliveryReport",
  data() {
    return {
      //查询条件
      queryArea: true, //是否显示查询区域
      companyInfo: "",
      companyShow: false, //是否显示公司弹窗
      departmentData: [],
      departmentList: [],
      //列表字段
      costPrefetchData: [],
      loading: false,
      selected: [], //列表选中行
      page: 1,
      pageSize: 100,
      total: 0,
      sumTol: {}, //总计
      staffName: [],
      staffNameList: [],
      supplierInfo: [],
      supplierList: [],
      signTime: [], //签订日期
      isShowDetail: 0,
      extCode: "", //外部合同号
      paymentWayData: [],
      paymentWayList: [],
      contractStatusData:[],
      contractStatusList:[],
      contractTypeData:[],
      contractTypeList:[],
      matterInfo: {},
      matterShow: false,
      coinShow: false,
      coinName: {}
    };
  },
  created() {
    this.getPaymentWayList();
     this.getContractStatusList();
    this.getContractTypeList();
     if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      }
  },
  methods: {
    cell({ row, column, rowIndex, columnIndex }) {
      //第八列添加 red 类
      if (
        column.property == "payedGoodsAmt" ||
        column.property == "payedMarginAmt" ||
        column.property == "contractAmtVat"
      ) {
        return "rightTd";
      } else {
        return "";
      }
    },
    //费用环节字典
    getPaymentWayList() {
      dicQuery({
        dictNo: 1021
      })
        .then(res => {
          this.paymentWayList = res.data;
        })
        .catch();
    },
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
        dictNo: 1014,
      bizCategory:1
      })
        .then(res => {
          this.contractTypeList = res.data;
        })
        .catch();
    },
    //获取费用预提列表
    costPrefetchList() {
      this.costPrefetchData = [];
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyCode: this.companyInfo.companyCode,
        bbBranchBaseList: this.departmentData,
        signTimeBegin: this.signTime.length ? this.signTime[0] : "",
        signTimeEnd: this.signTime.length ? this.signTime[1] : "",
        bbSupplierBaseList: this.supplierInfo,
        extCode: this.extCode,
        paymentWayList: this.paymentWayData,
        getSkuModulVOList: Object.keys(this.matterInfo).length
          ? [this.matterInfo]
          : [],
        bbEmployeeList: this.staffName,
        isShowDetail: this.isShowDetail,
        currencyCode: this.coinName.currencyCode,
          poTypeList:this.contractTypeData,
        contractStatusList:this.contractStatusData
      };
      params = this.$queryFilter(params);
      this.loading = true;
      odPoContractDeliveryList(params)
        .then(res => {
          this.loading = false;
          this.costPrefetchData = res.data;
          this.total = res.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    download() {
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        bbBranchBaseList: this.departmentData,
        companyCode: this.companyInfo.companyCode,
        bbBranchBaseList: this.departmentData,
        signTimeBegin: this.signTime.length ? this.signTime[0] : "",
        signTimeEnd: this.signTime.length ? this.signTime[1] : "",
        bbSupplierBaseList: this.supplierInfo,
        extCode: this.extCode,
        paymentWayList: this.paymentWayData,
        getSkuModulVOList: Object.keys(this.matterInfo).length
          ? [this.matterInfo]
          : [],
        bbEmployeeList: this.staffName,
        isShowDetail: this.isShowDetail,
        currencyCode: this.coinName.currencyCode,
          poTypeList:this.contractTypeData,
        contractStatusList:this.contractStatusData
      };
      params = this.$queryFilter(params);
      //使用Element loading-start 方法
      var loading2 = Loading.service({
        lock: true,
        text: "加载中...",
        background: "rgba(0, 0, 0, 0.7)"
      });
      exportOdPoContract(params)
        .then(res => {
          if (res.code == "fail") {
            this.$openWarning(res.message);
          } else {
            const blob = new Blob([res.data]);
            const a = document.createElement("a");
            const url = window.URL.createObjectURL(blob);
            const filename = "内贸采购合同交货情况表.xls";
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
          }
          loading2.close();
        })
        .catch(e => {
          loading2.close();
        });
    },
    changeData(e) {
      this.isShowDetail = e;
      this.costPrefetchList();
      this.getSum();
    },
    //获取总计
    getSum() {
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        bbBranchBaseList: this.departmentData,
        companyCode: this.companyInfo.companyCode,
        bbBranchBaseList: this.departmentData,
        signTimeBegin: this.signTime.length ? this.signTime[0] : "",
        signTimeEnd: this.signTime.length ? this.signTime[1] : "",
        bbSupplierBaseList: this.supplierInfo,
        extCode: this.extCode,
        paymentWayList: this.paymentWayData,
        getSkuModulVOList: Object.keys(this.matterInfo).length
          ? [this.matterInfo]
          : [],
        bbEmployeeList: this.staffName,
        isShowDetail: this.isShowDetail,
        currencyCode: this.coinName.currencyCode,
        poTypeList:this.contractTypeData,
        contractStatusList:this.contractStatusData
      };
      params = this.$queryFilter(params);
      selectOdPoContractSum(params)
        .then(res => {
          if (res.data.length) {
            this.sumTol = res.data[0];
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
            "sumQty",
            "contractAmtVat",
            "inStorageQty",
            "unfilledQty",
            "unfilledQty",
            "payedMarginAmt",
            "payedGoodsAmt"
          ].findIndex(it => it == key) !== -1
        ) {
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
    //单据状态字典
    prefetchStatusData() {
      CostApi.dicQuery({
        dictNo: 1065
      })
        .then(res => {
          this.prefetchStatusDic = res.data;
        })
        .catch();
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
      this.staffName = [];
      this.paymentWayData = [];
      this.extCode = "";
      this.signTime = [];
      this.matterInfo = {};
      this.coinName = {};
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
    //业务币别弹窗
    coinTips(type) {
      //type 1 基础数据  2费用预提
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
    departmentSelect,
    supplierSelect,
    coinSelect
  }
};
</script>
<style lang="scss">
#netradeContractDeliveryReport {
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
.index .el-table .content_right {
  text-align: right;
}
</style>
