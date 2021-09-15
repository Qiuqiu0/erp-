<template>
  <div id="costPrefetch">
    <!--查询条件-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-search" class="query-button" @click="query">查询</el-button>
      <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      <el-button @click="showEditPage('searchList')" icon="el-icon-setting" style="float:right">
        自定义
      </el-button>
    </div>
    <div class="input-div auto-sibling">
      <div v-if="$checkedNum(searchList) > 4">
        <p class="hide-input" v-if="queryArea" @click="queryAreaShow()">更多条件<i class="el-icon-caret-bottom"></i></p>
        <p class="hide-input" v-else @click="queryAreaShow()">收起<i class="el-icon-caret-top"></i></p>
      </div>
      <el-form @keyup.enter.native="query">
      <div class="search-div">
        <contract-search
            v-for="item in searchList"
            :label="item.label"
            :key="item.key"
            :checked="item.checked"
            :matchKey="item.key"
            :bizOccurrence="bizOccurrence"
            :company="companyInfo"
            :companyPopup="companyPopup"
            :branchName="branchName"
            :branchPopup="branchPopup"
            :supplierName="supplierName"
            :supplierPopup="supplierPopup"
            :createdTime="createdTime"
            :prefetchCode="prefetchCode"
            :poContractCode="poContractCode"
            :soContractCode="soContractCode"
            :projectCode="projectCode"
            :projectPopup="projectPopup"
            :wvNo="wvNo"
            :doNo="doNo"
            :matterInfo="matterInfo"
            :matterPopup="matterPopup"
            :batchCode="batchCode"
            :batchPopup="batchPopup"
            :prefetchStatus="prefetchStatus"
            :prefetchStatusDic="prefetchStatusDic"
            :isSettled="isSettled"
            :isSettleDic="isSettleDic"
            :warrantCode="warrantCode"
            :warrantMonth="warrantMonth"
            :writeoffWarrantCode="writeoffWarrantCode"
            :writeoffWarrantMonth="writeoffWarrantMonth"
            :costLinkDic="costLinkDic"
            :supplierList="supplierList"
            :departmentList="departmentList"
            @changeInput="changeData"
        />
      </div>
      </el-form>
    </div>
    <!--列表信息-->
    <div class="button-div auto-sibling">
      <el-dropdown placement="bottom-start" @command="handleCommand">
        <el-button icon="el-icon-folder-add">创建<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-shopping-cart-full" v-if="$actionFlag(`F001`)" command="1">采购环节</el-dropdown-item>
          <el-dropdown-item icon="el-icon-money" v-if="$actionFlag(`F002`)" command="2">销售环节</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button icon="el-icon-edit" v-if="$actionFlag(`F003`)" @click="updateData">修改</el-button>
      <el-button icon="el-icon-delete" v-if="$actionFlag(`F004`)" @click="deleteData">删除</el-button>
      <el-button icon="el-icon-data-line" v-if="$actionFlag(`F005`)" @click="goDetail">查看</el-button>
      <el-button icon="el-icon-finished" v-if="$actionFlag(`F006`)" @click="submitData">提交</el-button>
      <el-button icon="el-icon-receiving" v-if="$actionFlag(`F007`)" @click="checkData">审核</el-button>
      <el-button icon="el-icon-document-delete" v-if="$actionFlag(`F008`)" @click="reverseData">冲销</el-button>
       <el-button @click="handlePrint()" v-if="$actionFlag(`F009`)" icon="el-icon-printer">打印</el-button>
      <el-button 
      icon="el-icon-thumb" 
      @click="goTree"
      v-if="$actionFlag(`F010`)"
      >生命树</el-button>
      <el-button @click="showEditPage('headerList')" icon="el-icon-setting" style="float:right"
        >自定义
      </el-button>
    </div>
     <!-- 表格 -->
    <div class="el-table-div" v-auto>
      <el-table
        border
        center
        :data="costPrefetchData"
        class="el-table"
        ref="multipleTable"
        height="calc(100% - 35px)"
        @selection-change="handleChange"
        @row-click="selectedRow"
           show-summary
        :summary-method="getSummaries"
        :cell-class-name="cell"
        v-loading="loading"
      >
        <el-table-column
          :key="item.key"
          :prop="item.key"
          :type="item.type"
          :label="item.label"
          :width="item.width"
          :show-overflow-tooltip="item.tooltip"
          v-for="item in fixHead"
        >
        </el-table-column>
        <el-table-column
          :key="item.key"
          :prop="item.key"
          :type="item.type"
          :label="item.label"
          v-if="item.checked"
          :width="item.width"
          :show-overflow-tooltip="item.tooltip"
          v-for="item in headerList"
        >
          <template scope="scope" v-if="item.temp">
            <span v-if="item.key === 'bizOccurrence'">
              <span v-for="(item, index) in costLinkDic" :key="index">
                <span v-if="item.dict_code == scope.row.bizOccurrence">
                  {{ item.dict_value }}
                </span>
              </span>
            </span>
            <span v-if="item.key === 'createdTime'">
              <span>{{scope.row.createdTime | time}}</span>
            </span>
            <span v-if="item.key === 'prefetchAmt'">
              <span>{{scope.row.prefetchAmt  | $moneyFormat}}</span>
            </span>
            <!-- <span v-if="item.key === 'contractAmt'">
              <span>{{scope.row.contractAmt  | $moneyFormat}}</span>
            </span> -->
          </template>
        </el-table-column>
      </el-table>
      <!--分页background-->
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
    <!--审核弹窗-->
    <el-dialog title="审核" :visible.sync="checkDialog" :show-close="false" :before-close="checkCancel" width="350px">
      <div class="input-div" style="margin:15px 0;border:none">
        <el-col class="el-col" style="width:85%">
          <label>审核</label>
          <el-select v-model="checkResult" class="el-selects" placeholder="请选择">
            <el-option v-for="(item, index) in checkResultDic" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col class="el-col" style="width:85%" v-if="checkResult == 1">
          <label class="text_too_long"><span class="must-full">*</span> 过账日期</label>
          <el-date-picker v-model="postTime" type="date" class="el-selects" placeholder="过账日期" :picker-options="postLimitTime"></el-date-picker>
        </el-col>
      </div>
      <div style="text-align:center">
        <el-button icon="el-icon-check" size="mini" type="primary" @click="checkSure">确定</el-button>
        <el-button icon="el-icon-close" size="mini" @click="checkCancel">取消</el-button>
      </div>
    </el-dialog>
    <!--冲销弹窗-->
    <el-dialog title="冲销" :visible.sync="reverseDialog" :show-close="false" :before-close="reverseCancel" width="350px">
      <div class="input-div" style="margin:15px 0;border:none">
        <el-col class="el-col" style="width:85%">
          <label class="text_too_long">冲销原因</label>
          <el-input v-model="reverseReason" class="el-inputs"></el-input>
        </el-col>
        <el-col class="el-col" style="width:85%">
          <label class="text_too_long"><span class="must-full">*</span> 冲销日期</label>
          <el-date-picker v-model="reverseTime" type="date" class="el-selects" placeholder="冲销日期" :picker-options="reverseLimitTime"></el-date-picker>
        </el-col>
      </div>
      <div style="text-align:center">
        <el-button icon="el-icon-check" size="mini" type="primary" @click="reverseSure">确认</el-button>
        <el-button icon="el-icon-close" size="mini" @click="reverseCancel">取消</el-button>
      </div>
    </el-dialog>
    <!--公司弹窗-->
    <company-select v-if="companyShow" :tipShow="companyShow" @tipsCancle="companyCancel" @tipsSure="companySure"></company-select>
    <!--部门弹窗-->
    <branch-select v-if="branchShow" :tipShow="branchShow" :data="companyInfo" @departmentCancle="branchCancel" @departmentSure="branchSure"></branch-select>
    <!--供应商弹窗-->
    <supplier-select v-if="supplierShow" :tipShow="supplierShow" @supplierCancle="supplierCancel" @supplierSure="supplierSure"></supplier-select>
    <!--项目号弹窗-->
    <project-select v-if="projectShow" :tipShow="projectShow" @projectCancle="projectCancel" @projectSure="projectSure"></project-select>
    <!--物料号弹窗-->
    <matter-select v-if="matterShow" :tipShow="matterShow" @matterCancle="matterCancel" @matterSure="matterSure"></matter-select>
    <!--批次号弹窗-->
    <batch-select v-if="batchShow" :tipShow="batchShow" :data="matterInfo" @batchnumberCancle="batchCancel" @batchnumberSure="batchSure"></batch-select>
    <!--采购环节弹窗-->
    <purchase-link v-if="purchaseShow" :isShow="purchaseShow" @callback="purchaseCallback"></purchase-link>
    <!--销售环节弹窗-->
    <sales-link v-if="salesShow" :isShow="salesShow" @callback="salesCallback"></sales-link>
    <!--   自定义搜索选项-->
    <edit-search-item
      v-if="editPage"
      :list="editList"
      :title="editKey==='searchList'?'自定义搜索条件':'自定义表格排序'"
        :editPage="editPage"
        @editCancel="editCancel"
        @editSure="editSure"
    ></edit-search-item>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { prefetchStatusObj } from "@/api/dictionary";
import CostApi from "@/api/costData/cost";
import companySelect from "@/components/componySelect";
import branchSelect from "@/components/departmentSelect2";
import supplierSelect from "@/components/supplierSelect2";
import projectSelect from "@/components/projectSelect";
import matterSelect from "@/components/matterSelect";
import batchSelect from "@/components/batchNumber";
import purchaseLink from "./components/purchaseLink";
import salesLink from "./components/salesLink";
import contractSearch from "@/views/costData/components/contractSearch";
import editSearchItem from "@/components/editSearchItem";
import { getFilter, setFilter } from "@/mixins/editCondition";

const AllSearch = [
  { key: "companyName", label: "公司", checked: true },
  { key: "branchName", label: "部门", checked: true },
  { key: "supplierName", label: "供应商", checked: true },
  { key: "poContractCode", label: "采购合同号", checked: true },
  { key: "soContractCode", label: "销售合同号", checked: true },
  { key: "createdTime", label: "创建日期", checked: true },
  { key: "prefetchCode", label: "预提单号", checked: true },
  { key: "projectCode", label: "项目号", checked: true },
  { key: "wvNo", label: "入库单号", checked: true },
  { key: "doNo", label: "出库单号", checked: true },
  { key: "skuCode", label: "物料号", checked: true },
  { key: "batchCode", label: "批次号", checked: true },
  { key: "prefetchStatus", label: "单据状态", checked: true },
  { key: "bizOccurrence", label: "费用环节", checked: true },
  { key: "isSettled", label: "是否结算", checked: true },
  { key: "warrantCode", label: "凭证号", checked: true },
  { key: "warrantMonth", label: "期间", checked: true },
  { key: "writeoffWarrantCode", label: "冲销凭证号", checked: true },
  { key: "writeoffWarrantMonth", label: "冲销期间", checked: true },
]; //全部选项标签
const ALLHeader = [
  {
    label: "预提单号",
    tooltip: true,
    key: "prefetchCode",
    checked: true,
    width: "150",
  },
  {
    label: "费用环节",
    tooltip: true,
    key: "bizOccurrence",
    checked: true,
    temp: true,
    width: "150",
  },
  {
    label: "单据状态",
    tooltip: true,
    key: "prefetchStatusStr",
    checked: true,
    width: "100",
  },
  {
    label: "供应商",
    tooltip: true,
    key: "supplierName",
    checked: true,
    width: "160",
  },
  {
    label: "创建日期",
    tooltip: true,
    key: "createdTime",
    checked: true,
    width: "160",
    temp: true,
  },
  {
    label: "业务币金额",
    tooltip: true,
    key: "prefetchAmt",
    checked: true,
    temp: true,
    width: "120",
  },
  // {
  //   label: "业务币级别",
  //   tooltip: true,
  //   key: "contractAmt",
  //   checked: true,
  //   temp: true,
  // },
  {
    label: "业务币币别",
    tooltip: true,
    key: "currencyCode",
    checked: true,
    width: "120",
  },
  {
    label: "制单人",
    tooltip: true,
    key: "createdName",
    checked: true,
    width: "100",
  },
  {
    label: "公司",
    tooltip: true,
    key: "companyName",
    checked: true,
    width: "180",
  },
  {
    label: "部门",
    tooltip: true,
    key: "orgName",
    checked: true,
    width: "180",
  },
  { label: "凭证号", tooltip: true, key: "warrantCode", checked: true },
  { label: "期间", tooltip: true, key: "warrantMonth", checked: true },
  {
    label: "冲销凭证号",
    tooltip: true,
    key: "writeoffWarrantCode",
    checked: true,
  },
  {
    label: "冲销期间",
    tooltip: true,
    key: "writeoffWarrantMonth",
    checked: true,
  },
]; //所有表头
export default {
  name: "costPrefetch",
  data() {
    return {
      supplierList: [],
      departmentList: [],
      fixHead: [
        { type: "selection",width:"60", key: "selection", checked: true },
        {
          type: "index",
          label: "序号",
          tooltip: true,
          key: "index",
          checked: true,
        },
      ],
      editPage: false,
      searchList: AllSearch,
      headerList: ALLHeader,
      editKey: "",
      editList: [],
      checkResult: "",
      checkResultDic: [
        { value: "1", label: "通过" },
        { value: "0", label: "驳回" },
      ],
      postTime: "",
      postLimitTime: {},
      checkDialog: false, //是否显示审核弹窗
      reverseReason: "",
      reverseTime: "",
      reverseLimitTime: {},
      reverseDialog: false, //是否显示冲销弹窗
      //查询条件
      queryArea: true, //是否显示查询区域
      companyInfo: "",
      companyShow: false, //是否显示公司弹窗
      branchName: [],
      branchShow: false, //是否显示部门弹窗
      supplierName: [],
      supplierShow: false, //是否显示供应商弹窗
      createdTime: [],
      prefetchCode: "",
      poContractCode: "",
      soContractCode: "",
      projectCode: "",
      projectShow: false, //是否显示项目号弹窗
      wvNo: "",
      doNo: "",
      matterInfo: "",
      matterShow: false, //是否显示物料号弹窗
      batchCode: "",
      batchShow: false, //是否显示批次号弹窗
      prefetchStatus: [],
      prefetchStatusDic: [],
      isSettled: "",
      isSettleDic: [{ value: 0, label: "否" }, { value: 1, label: "是" }],
      //列表字段
      purchaseShow: false, //是否显示采购环节弹窗
      salesShow: false, //是否显示销售环节弹窗
      costPrefetchData: [],
      loading: true,
      selected: [], //列表选中行
      page: 1,
      pageSize: 100,
      total: 0,
      bizOccurrence: "",
      costLinkDic: [],
      navColor: {
        button: {
          backgroundColor: "",
        },
      },
      warrantCode: "", //凭证号
      warrantMonth: "", //期间
      writeoffWarrantCode: "", //冲销凭证号
      writeoffWarrantMonth: "", //冲销期间
      sumTol:{}
    };
  },
  mixins: [getFilter, setFilter],

  created() {
    if (this.$route.params.status) {
      this.prefetchStatus = this.$route.params.status
        .split(",")
        .map((item) => Number(item));
      this.costPrefetchList();
    }
    //单据状态字典
    let data = this.$getQueryData(this);
    this.supplierList = data.supplierName;
    this.departmentList = data.branchName;
    this.prefetchStatus=data.prefetchStatusList;
    if (data.startTime) {
      this.createdTime[0] = data.startTime ? data.startTime : "";
      this.createdTime[1] = data.endTime ? data.endTime : "";
    }
    this.prefetchStatusData();
    this.costLinkData();
    //获取费用预提列表
    this.query();
    this.getFilter();
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    //查看生命树
    goTree() {
      if (this.selected.length === 1) {
        sessionStorage.setItem("bizCode", this.selected[0].prefetchCode);
        sessionStorage.setItem("bizType", "PREFETCH_COST");
        this.$router.push({
          path: "/index/home/tree",
          query: {
            bizCode: this.selected[0].prefetchCode,
            bizType: "PREFETCH_COST",
          },
        });
        let obj = {
        url: "treeModel",
        baseUrl: "",
        label: "生命树",
        moduleCode: "",
        params: {},
        query: {
          bizCode:this.selected[0].prefetchCode,
          bizType:"PREFETCH_COST"
        },
      };
      this.$store.commit("tabsListAdd", obj);
      } else {
        this.$openWarning("请选择一条合同查看生命树");
      }
    },
         //打印
    handlePrint(){
        if(this.selected.length==0){
            this.$openWarning("未选择数据");
        }else if(this.selected.length==1){
          let Logistics= this.$router.resolve({
              name: 'costPrefetchPrinting',
          })
          sessionStorage.setItem("prefetchId",this.selected[0].prefetchId);
          window.open(Logistics.href, '_blank');
        }else{
            this.$openWarning("此选项不能批量操作");
        }
    },
    editCancel(list) {
      this.editPage = false;
      this[this.editKey] = list;
    },
    editSure(list) {
      this.editPage = false;
      this[this.editKey] = []; //必须先清空 再更新 否则不触发
      this.$nextTick(() => {
        this[this.editKey] = list;
        this.setFilter({
          filterJson: JSON.stringify(this.headerList),
          listJson: JSON.stringify(this.searchList),
        });
      });
    },
    showEditPage(key) {
      this.editKey = key;
      this.editPage = true;
      this.editList = this[key];
    },
    changeData({ val, key }) {
      this[key] = val;
    },
    cell({ row, column, rowIndex, columnIndex }) {
      //第八列添加 red 类
      if (column.property == "prefetchAmt") {
        return "rightTd";
      } else {
        return "";
      }
    },
    //费用环节字典
    costLinkData() {
      CostApi.dicQuery({
        dictNo: 1060,
      })
        .then((res) => {
          this.costLinkDic = res.data;
        })
        .catch();
    },
    //获取费用预提列表
    costPrefetchList() {
      if (this.createdTime) {
        if (this.createdTime[0] && this.createdTime[1]) {
          var startTime = this.createdTime[0] + "T00:00:00.000Z";
          var endTime = this.createdTime[1] + "T23:59:59.000Z";
        }
      }
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        companyCode: this.companyInfo.companyCode,
        bbBranchBaseList: this.branchName,
        bbSupplierBaseList: this.supplierName,
        startTime: startTime ? startTime : "",
        endTime: endTime ? endTime : "",
        prefetchCode: this.prefetchCode,
        poContractCode: this.poContractCode,
        soContractCode: this.soContractCode,
        projectCode: this.projectCode,
        wvNo: this.wvNo,
        doNo: this.doNo,
        goodsCode: this.matterInfo.skuCode,
        batchCode: this.batchCode,
        prefetchStatusList: this.prefetchStatus,
        isSettled: this.isSettled,
        bizOccurrence: this.bizOccurrence,
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        writeoffWarrantCode: this.writeoffWarrantCode, //冲销凭证号
        writeoffWarrantMonth: this.writeoffWarrantMonth, //冲销期间
      };
      let data = params;
      data.companyInfo = this.companyInfo;
      data.matterInfo = this.matterInfo;
      data.branchName = this.branchName;
      data.departmentList = this.departmentList;
      data.supplierName = data.supplierName;
      data.supplierList = this.supplierList;
      this.$setQueryData(this, data);
      delete data.branchName;
      delete data.supplierName;
      params = this.$queryFilter(params);
      this.loading = true;
      CostApi.costPrefetchList(params)
        .then((res) => {
          this.loading = false;
          this.costPrefetchData = res.data.list;
          this.total = res.data.total;
          this.costPrefetchData.forEach((item) => {
            prefetchStatusObj.forEach((item1) => {
              if (item.prefetchStatus == item1.dict_code)
                item.prefetchStatusStr = item1.dict_value;
            });
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //获取总计
    getSum() {
     if (this.createdTime) {
        if (this.createdTime[0] && this.createdTime[1]) {
          var startTime = this.createdTime[0] + "T00:00:00.000Z";
          var endTime = this.createdTime[1] + "T23:59:59.000Z";
        }
      }
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        companyCode: this.companyInfo.companyCode,
        bbBranchBaseList: this.branchName,
        bbSupplierBaseList: this.supplierName,
        startTime: startTime ? startTime : "",
        endTime: endTime ? endTime : "",
        prefetchCode: this.prefetchCode,
        poContractCode: this.poContractCode,
        soContractCode: this.soContractCode,
        projectCode: this.projectCode,
        wvNo: this.wvNo,
        doNo: this.doNo,
        goodsCode: this.matterInfo.skuCode,
        batchCode: this.batchCode,
        prefetchStatusList: this.prefetchStatus,
        isSettled: this.isSettled,
        bizOccurrence: this.bizOccurrence,
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        writeoffWarrantCode: this.writeoffWarrantCode, //冲销凭证号
        writeoffWarrantMonth: this.writeoffWarrantMonth, //冲销期间
      };
    CostApi.getCostPrefetchSumV2(params)
        .then((res) => {
          this.sumTol = res.data;
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
        } else if (index === 1) {
          sums[index] = "";
          return;
        }
        let key = column.property;
        if (["prefetchAmt"].findIndex((it) => it == key) !== -1) {
          sums[index] = this.sumTol ? this.$sumTolFormat(this.sumTol[key]) : "";
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
        dictNo: 1065,
      })
        .then((res) => {
          this.prefetchStatusDic = res.data;
        })
        .catch();
    },
    //下拉创建
    handleCommand(type) {
      if (type == 1) {
        this.purchaseShow = true;
      } else if (type == 2) {
        this.salesShow = true;
      }
    },
    //采购环节弹窗回调
    purchaseCallback(res) {
      this.purchaseShow = false;
      if (res) {
        this.$router.push({ name: "costPrefetchEdit" });
      }
    },
    //销售环节弹窗回调
    salesCallback(res) {
      this.salesShow = false;
      if (res) {
        this.$router.push({ name: "costPrefetchEdit" });
      }
    },
    //修改
    updateData() {
      if (this.selected.length != 1) {
        this.$openWarning("请选择一条要修改的数据");
        return false;
      }
      let row = this.selected[0];
      if (
        row.prefetchStatus != "10650005" &&
        row.prefetchStatus != "10650025"
      ) {
        this.$openWarning("当前状态不允许修改");
        return false;
      }
      this.$router.push({
        name: "costPrefetchEdit",
        query: { id: row.prefetchId, type: row.bizOccurrence },
      });
    },
    //删除
    deleteData() {
      if (this.selected.length == 0) {
        this.$openWarning("请选择要删除的数据");
        return false;
      }
      let canDelete = true;
      this.selected.forEach((item) => {
        if (
          item.prefetchStatus != "10650005" &&
          item.prefetchStatus != "10650025"
        ) {
          canDelete = false;
          return false;
        }
      });
      if (!canDelete) {
        this.$openWarning("当前状态不允许删除");
        return false;
      }
      this.$confirm("是否确定删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        CostApi.costPrefetchDelete(this.selected)
          .then((res) => {
            this.$openSuccess(res.message);
            this.page = 1;
            this.query();
          })
          .catch();
      });
    },
    //查看
    goDetail() {
      if (this.selected.length != 1) {
        this.$openWarning("请选择一条要查看的数据");
        return false;
      }
      let row = this.selected[0];
      this.$router.push({
        name: "costPrefetchDetail",
        query: { id: row.prefetchId, type: row.bizOccurrence },
      });
    },
    //提交
    submitData() {
      if (this.selected.length == 0) {
        this.$openWarning("请选择要提交的数据");
        return false;
      }
      let canSubmit = true;
      this.selected.forEach((item) => {
        if (
          item.prefetchStatus != "10650005" &&
          item.prefetchStatus != "10650025"
        ) {
          canSubmit = false;
          return false;
        }
      });
      if (!canSubmit) {
        this.$openWarning("当前状态不允许提交");
        return false;
      }
      this.$confirm("是否确定提交？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = [];
        this.selected.forEach((item) => {
          params.push({
            prefetchId: item.prefetchId,
            prefetchStatus: item.prefetchStatus,
            version: item.version,
          });
        });
        CostApi.costPrefetchSubmit(params)
          .then((res) => {
            this.$openSuccess(res.message);
            this.page = 1;
            this.query();
          })
          .catch();
      });
    },
    //审核
    checkData() {
      if (this.selected.length == 0) {
        this.$openWarning("请选择要审核的数据");
        return false;
      }
      let canCheck = true;
      this.selected.forEach((item) => {
        if (item.prefetchStatus != "10650010") {
          canCheck = false;
          return false;
        }
      });
      if (!canCheck) {
        this.$openWarning("当前状态不允许审核");
        return false;
      }
      if (this.selected.length == 1) {
        let row = this.selected[0];
        this.checkDialog = true;
        this.postTime = row.postDate;
        CostApi.limitTimeQuery({
          companyId: row.companyId,
        })
          .then((res) => {
            if (res.code == "success") {
              this.postLimitTime = {
                disabledDate(time) {
                  return (
                    time.getTime() < res.data.begindate ||
                    time.getTime() > res.data.enddate
                  );
                },
              };
            }
          })
          .catch();
      } else {
        this.$confirm(
          "批量审核，过账时间将取单据过账时间，如单据无该时间，则取审核时间，是否确认？",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(() => {
          this.checkDialog = true;
          CostApi.limitTimeQuery({
            companyId: this.selected[0].companyId,
          })
            .then((res) => {
              if (res.code == "success") {
                this.postLimitTime = {
                  disabledDate(time) {
                    return (
                      time.getTime() < res.data.begindate ||
                      time.getTime() > res.data.enddate
                    );
                  },
                };
              }
            })
            .catch();
        });
      }
    },
    //取消审核
    checkCancel() {
      this.checkDialog = false;
      this.checkResult = "";
      this.postTime = "";
    },
    //确定审核
    checkSure() {
      if (this.checkResult === "") {
        this.$openWarning("请选择是否通过审核");
        return false;
      }
      if (
        this.checkResult == "1" &&
        (this.postTime == "" || this.postTime == null)
      ) {
        this.$openWarning("请选择过账日期");
        return false;
      }
      let params = [];
      this.selected.forEach((item) => {
        params.push({
          costId: item.prefetchId,
          costStatus: item.prefetchStatus,
          version: item.version,
        });
      });
      CostApi.costPrefetchCheck({
        list: params,
        postDate: this.postTime,
        type: this.checkResult,
      })
        .then((res) => {
          this.$openSuccess(res.message);
          this.page = 1;
          this.query();
          this.checkDialog = false;
          this.checkResult = "";
          this.postTime = "";
        })
        .catch();
    },
    //冲销
    reverseData() {
      if (this.selected.length == 0) {
        this.$openWarning("请选择要冲销的数据");
        return false;
      }
      let canReverse = true;
      this.selected.forEach((item) => {
        if (item.prefetchStatus != "10650015") {
          canReverse = false;
          return false;
        }
      });
      if (!canReverse) {
        this.$openWarning("只有“已审核”状态可以进行冲销");
        return false;
      }
      this.reverseDialog = true;
      CostApi.limitTimeQuery({
        companyId: this.selected[0].companyId,
      })
        .then((res) => {
          if (res.code == "success") {
            this.reverseLimitTime = {
              disabledDate(time) {
                return (
                  time.getTime() < res.data.begindate ||
                  time.getTime() > res.data.enddate
                );
              },
            };
          }
        })
        .catch();
    },
    //取消冲销
    reverseCancel() {
      this.reverseDialog = false;
      this.reverseReason = "";
      this.reverseTime = "";
    },
    //确定冲销
    reverseSure() {
      if (this.reverseTime == "") {
        this.$openWarning("请选择冲销日期");
        return false;
      }
      let params = [];
      this.selected.forEach((item) => {
        params.push({
          prefetchId: item.prefetchId,
          prefetchStatus: item.prefetchStatus,
          version: item.version,
        });
      });
      CostApi.costPrefetchReverse({
        list: params,
        unDate: this.reverseTime,
        unReason: this.reverseReason,
      })
        .then((res) => {
          this.$openSuccess(res.message);
          this.page = 1;
          this.query();
          this.reverseDialog = false;
          this.reverseReason = "";
          this.reverseTime = "";
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
      this.branchName = [];
      (this.departmentList = []),
        (this.supplierList = []),
        (this.supplierName = []);
      this.companyInfo = "";
      this.createdTime = [];
      this.prefetchCode = "";
      this.poContractCode = "";
      this.soContractCode = "";
      this.projectCode = "";
      this.wvNo = "";
      this.doNo = "";
      this.matterInfo = "";
      this.batchCode = "";
      this.prefetchStatus = [];
      this.isSettled = "";
      this.warrantCode = ""; //凭证号
      this.warrantMonth = ""; //期间
      this.writeoffWarrantCode = ""; //冲销凭证号
      this.writeoffWarrantMonth = ""; //冲销期间
      this.bizOccurrence = "";
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
      this.branchName = [];
    },
    //部门弹窗
    branchPopup() {
      // if (this.companyInfo == "") {
      //   this.$openWarning("请先选择公司");
      //   return false;
      // }
      this.branchShow = true;
    },
    //部门弹窗关闭
    branchCancel() {
      this.branchShow = false;
    },
    //部门弹窗确定并传值
    branchSure(e) {
      this.branchShow = false;
      this.branchName = e;
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
      this.supplierName = e;
      this.supplierList = e;
    },
    //项目号弹窗
    projectPopup() {
      this.projectShow = true;
    },
    //项目号弹窗关闭
    projectCancel() {
      this.projectShow = false;
    },
    //项目号弹窗确定并传值
    projectSure(e) {
      this.projectShow = false;
      this.projectCode = e.projectCode;
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
    //批次号弹窗
    batchPopup() {
      if (this.matterInfo == "") {
        this.$openWarning("请先选择物料号");
        return false;
      }
      this.batchShow = true;
    },
    //批次号弹窗关闭
    batchCancel() {
      this.batchShow = false;
    },
    //批次号弹窗确定并传值
    batchSure(e) {
      this.batchShow = false;
      this.batchCode = e.batchCode;
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
    },
  },
  computed: {
    ...mapState({
      themecolor: "themecolor",
    }),
  },
  watch: {
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      },
    },
    // '$route'(){
    //   this.query();
    // },
  },
  components: {
    companySelect,
    branchSelect,
    supplierSelect,
    projectSelect,
    matterSelect,
    batchSelect,
    purchaseLink,
    contractSearch,
    editSearchItem,
    salesLink,
  },
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
