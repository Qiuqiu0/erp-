<template>
  <div id="otherware">
    <!-- 按钮 -->
    <!-- <el-divider></el-divider> -->
    <!-- input -->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-search" class="query-button" @click="query"> 查询</el-button>
      <el-button icon="el-icon-refresh" @click="clearmsg">重置</el-button>
      <el-button @click="showEditPage('searchList')" icon="el-icon-setting" style="float:right">
        自定义
      </el-button>
    </div>
    <div class="index-div3 auto-sibling">
      <div v-if="$checkedNum(searchList) > 4">
        <p class="hide-input" v-if="show" @click="inputShow()">更多条件<i class="el-icon-caret-bottom"></i></p>
        <p class="hide-input" v-else @click="inputShow()">收起<i class="el-icon-caret-top"></i></p>
      </div>
      <el-form @keyup.enter.native="getUserlist">
      <div class="search-div">
        <contract-search
            v-for="item in searchList"
            :label="item.label"
            :key="item.key"
            :checked="item.checked"
            :matchKey="item.key"
            :otherKey="item.otherKey"
            :company="companyInfo"
            :componyTip="componyTip"
            :branchName="branchInfo"
            :departmentTip="departmentTip"
            :coin="coin"
            :lcStatus="lcStatus"
            :fhtypearr="fhtypearr"
            :lcProperty="lcProperty"
            :mytypearr="mytypearr"
            :lcType="lcType"
            :typearr="typearr"
            :lcDueType="lcDueType"
            :typeStatus="typeStatus"
            :lcIssueDate="lcIssueDate"
            :effectiveDate="effectiveDate"
            :createdBy="createdBy"
            :createdTime="createdTime"
            :applyCode="applyCode"
            :lcNo="lcNo"
            :supplierInfo="supplierInfo"
            :supplierPopup="supplierPopup"
            :applyDate="applyDate"
            :deadTime="deadTime"
            :predictPaydate="predictPaydate"
            :cgSelect="cgSelect"
            :addList="addList"
            @changeInput="changeData"
            :departmentList="departmentList"
            :supplierList="supplierList"
        />
      </div>
      </el-form>
    </div>
    <!-- <el-divider></el-divider> -->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-folder-add" v-if="$actionFlag(`F001`)" @click="creatcom('creat')">创建</el-button>
      <el-button icon="el-icon-delete" v-if="$actionFlag(`F002`)" @click="delitemsg">删除</el-button>
      <el-button icon="el-icon-edit" v-if="$actionFlag(`F003`)" @click="creatcom('edit')">修改</el-button>
      <el-button icon="el-icon-data-line" v-if="$actionFlag(`F004`)" @click="creatcom('look')">查看</el-button>
      <el-button icon="el-icon-finished" v-if="$actionFlag(`F005`)" @click="creatcom('submit')">提交</el-button>
      <el-button icon="el-icon-receiving" v-if="$actionFlag(`F006`)" @click="creatcom('examine')">审核</el-button>
      <el-button icon="el-icon-document-checked" v-if="$actionFlag(`F007`)" @click="creatcom('openLetter')">开证</el-button>
      <el-button icon="el-icon-wallet" v-if="$actionFlag(`F008`)" @click="creatcom('honour')">承兑</el-button>
      <el-button icon="el-icon-money" v-if="$actionFlag(`F009`)" @click="creatcom('payMoney')">付款</el-button>
      <el-button icon="el-icon-tickets" v-if="$actionFlag(`F010`)" @click="creatcom('settle')">结清</el-button>
      <el-button icon="el-icon-document-delete" v-if="$actionFlag(`F011`)" @click="creatcom('disSettle')">取消结清</el-button>
      <el-button icon="el-icon-edit-outline" v-if="$actionFlag(`F012`)" @click="creatcom('openChange')">开证变更</el-button>
      <el-button 
      icon="el-icon-thumb" 
      @click="goTree"
      v-if="$actionFlag(`F013`)"
      >生命树</el-button>
      <el-button @click="showEditPage('headerList')" icon="el-icon-setting" style="float:right">
        自定义
      </el-button>
    </div>
    <!-- 表格 -->
    <div class="el-table-div" v-auto>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width: 100%"
        height="calc(100% - 35px)"
        @selection-change="handleSelectionChange"
        @row-click="rowClick"
        v-loading="loading"
         :cell-class-name="cell"
          show-summary
        :summary-method="getSummaries"
        @sort-change="tableSortChange"

      >
        <el-table-column
            :key="item.key"
            :prop="item.key"
            :type="item.type"
            :label="item.label"
            :width="item.width"
            :show-overflow-tooltip="item.tooltip"
            v-for="item in fixHead"
            :sortable="item.sortable"

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
            :sortable="item.sortable"

        >
          <template scope="scope" v-if="item.temp">
            <span v-if="item.key === 'lcAmt'">{{ scope.row.lcAmt | $moneyFormat }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div>
        <el-pagination
        background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[100, 200, 300,500]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
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
        <!-- 选择部门弹窗 -->
        <department-select
          v-if="departmentShow"
          :tipShow="departmentShow"
          :data="companyInfo"
          @departmentCancle="departmentCancle"
          @departmentSure="departmentSure"
        >
        </department-select>
        <!-- 选择员工弹窗 -->
        <staff-select
          v-if="staffShow"
          :tipShow="staffShow"
          :data="branchInfo"
          @staffCancle="staffCancle"
          @staffSure="staffSure"
        >
        </staff-select>
        <!--供应商弹窗-->
        <supplier-select
          v-if="supplierShow"
          :tipShow="supplierShow"
          @supplierCancle="supplierCancel"
          @supplierSure="supplierSure">
        </supplier-select>
        <!-- 选择合同弹窗 -->
        <cg-select
          v-if="cgShow"
          :tipShow="cgShow"
          @cgCancle="cgCancle"
          @cgSure="cgSure"
        ></cg-select>
        <!-- 选择创建弹窗 -->
        <open-select
          v-if="establish"
          :tipShow="establish"
          :paymentWay = "10210020"
          @establishClose="establishClose"
          @establishTrue="establishTrue"
        ></open-select>
    </div>
    <!-- 提交弹窗 -->
    <el-dialog title="提交弹窗" :visible.sync="submit" width="25%">
      <div style="height:100px;line-height:100px;text-align: center;">
        <label>确认提交选中信用证信息记录</label>
      </div>
      <div class="button-div2">
        <el-button icon="el-icon-check" @click="shenhe(0)">确定</el-button>
        <el-button icon="el-icon-close" type="primary" @click="shenhe(1)">取消</el-button>
      </div>
    </el-dialog>
    <!-- 审核弹窗 -->
    <el-dialog title="审核弹窗" :visible.sync="examine" width="25%">
      <div style="height:100px;line-height:100px;text-align: center;">
        <el-radio v-model="examStatus" label="1">审批</el-radio>
        <el-radio v-model="examStatus" label="0">驳回</el-radio>
      </div>
      <div class="button-div2">
        <el-button icon="el-icon-check" @click="writeOffShowS(0)">确定</el-button>
        <el-button icon="el-icon-close" type="primary" @click="writeOffShowS(1)">取消</el-button>
      </div>
    </el-dialog>
    <!-- 结清弹窗 -->
    <el-dialog title="结清弹窗" :visible.sync="settle" width="25%">
      <div style="height:100px;line-height:100px;text-align: center;">
        <label>是否结清</label>
      </div>
      <div class="button-div2">
        <el-button icon="el-icon-check" @click="squareUp(0)">确定</el-button>
        <el-button icon="el-icon-close" type="primary" @click="squareUp(1)">取消</el-button>
      </div>
    </el-dialog>
    <!-- 取消结清弹窗 -->
    <el-dialog title="取消结清弹窗" :visible.sync="disSettle" width="25%">
      <div style="height:100px;line-height:100px;text-align: center;">
        <label>是否取消结清</label>
      </div>
      <div class="button-div2">
        <el-button icon="el-icon-check" @click="disSettleUp(0)">确定</el-button>
        <el-button icon="el-icon-close" type="primary" @click="disSettleUp(1)">取消</el-button>
      </div>
    </el-dialog>
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
import componySelect from "@/components/componySelect.vue"; //公司组件
import departmentSelect from "@/components/departmentSelect2.vue"; //部门组件
import staffSelect from "@/components/staffSelect2.vue"; //业务员组件
import coinSelect from "@/views/fundsManage/conponents/coinSelect"; //币别
import cgSelect from "@/components/cgSelect.vue"; //合同
import supplierSelect from "@/components/supplierSelect2"; //供应商
import openSelect from "@/views/fundsManage/letterManage/establish/openSelect"; //创建
import { log } from "util";
// import { service, serviceJson } from "../../axios/index.js";
import {
  letterReceipt,
  letterStatus,
  filcissue,
  reduceMsg,
  submit,
  chargeFiLcReceive,
  examine,
  settle,
  disSettle,
  getFiLcIssueListSumV2
} from "@/api/letterManage/openLetter";
import editSearchItem from "@/components/editSearchItem";
import contractSearch from "@/views/fundsManage/conponents/contractSearch2";

import {getFilter, setFilter} from "@/mixins/editCondition";

const AllSearch = [
  { key: "companyName", label: "公司", checked: true, otherKey: "companyInfo" },
  { key: "branchName", label: "部门", checked: true, otherKey: "branchInfo" },
  { key: "cgSelect", label: "外部合同号", checked: true },
  { key: "applyCode", label: "申请单号", checked: true },
  { key: "lcNo", label: "信用证号", checked: true },
  { key: "supplierInfo", label: "供应商代码", checked: true },
  { key: "coin", label: "币种", checked: true },
  { key: "lcStatus", label: "信用证状态", checked: true },
  { key: "applyDate", label: "申请日期", checked: true },
  { key: "lcIssueDate", label: "开证日期", checked: true },
  { key: "deadTime", label: "最迟装期", checked: true },
  { key: "lcDueType", label: "信用证性质", checked: true },
  { key: "lcType", label: "信用证类别", checked: true },
  { key: "lcProperty", label: "信用证属性", checked: true },
  { key: "effectiveDate", label: "有效期限", checked: true },
  { key: "predictPaydate", label: "预计付款日", checked: true },
  { key: "createdBy", label: "创建人", checked: true },
  { key: "createdTime", label: "创建日期", checked: true }
]; //全部选项标签
const ALLHeader = [
  { key: "applyCode", label: "申请单号", checked: true, sortable: true,width: 170 },
  {
    key: "companyName",
    label: "公司",
    tooltip: true,
    checked: true,
    width: 170
  },
  {
    key: "orgName",
    label: "部门",
    tooltip: true,
    checked: true,
    width: 170
  },
  {
    key: "supplierName",
    label: "供应商",
    tooltip: true,
    checked: true,
    width: 170
  },
  { key: "lcNo", label: "信用证号", tooltip: true, checked: true },
  {
    key: "lcAmt",
    label: "开证金额",
    tooltip: true,
    checked: true,
    temp:true,
    sortable: true,
    width: 150
  },
  { key: "currencyCode", label: "币别", tooltip: true, checked: true },
  { key: "lcStatusName", label: "信用证状态", tooltip: true, checked: true },
  {
    key: "extNo",
    label: "外部合同号",
    tooltip: true,
    checked: true,
    width: 170
  },
  { key: "lcPropertyS", label: "信用证属性", tooltip: true, checked: true,width: 150 }
]; //所有表头
export default {
  props: {},
  data() {
    return {
      supplierList: [],
      departmentList: [],
      sort: "",
      fixHead: [
        { type: "selection", key: "selection", checked: true, width: 60 },
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
      loading: true,
      total: 0, //条数
      pageSize: 100, //页码数
      pageNum: 1, //每页条数
      cgShow: false, //采购合同显示
      componyShow: false, //银行弹窗
      companyInfo: {}, //公司
      branchInfo: [], //部门
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      connection: false, //客户弹窗
      staffName: {}, //员工
      supplierInfo: [],
      supplierShow: false, //是否显示供应商弹窗
      ckrkdh: "", //入库单号
      coin: {}, //币种
      cgSelect: {},
      show: true,
      lcProperty: [], //信用证属性
      lcType: "", //信用证性质
      lcDueType: "", //信用证类别
      fhtypearr: [], //信用证状态
      typeStatus: [], //信用证类别
      lcStatus: [], //信用证状态
      mytypearr: [], //信用证属性
      typearr: [], //信用证性质
      createdTime: [], //创建时间
      createdBy: "", //创建日期
      reducemsg: [], //选中数据
      predictPaydate: [], //预计付款日
      effectiveDate: [], //有效日期
      lcIssueDate: [], //开证日期
      deadTime: [], //最迟装期
      applyCode: "", //申请单号
      lcNo: "", //信用证号
      applyDate: [], //申请日期
      tableData: [],
      establish: false, //创建
      submit: false, //提交弹窗
      examine: false, //审核弹窗
      examStatus: "1", //审核驳回状态
      list: {},
      settle: false, //结清弹窗
      disSettle: false,//取消结清弹窗
      sumTol:{}
    };
  },
  computed: {
    ...mapState({
      themecolor: "themecolor"
    })
  },
  mixins:[getFilter,setFilter],

  created() {
    let data = this.$getQueryData(this);
    this.departmentList = data.branchInfo;
    this.supplierList = data.supplierInfo;
    this.lcStatus= data.lcStatusList;
    this.lcProperty= data.lcPropertyList;
    if (data.fromApplyDate) {
      this.applyDate[0] = data.fromApplyDate;
      this.applyDate[1] = data.toApplyDate;
    }
    if (data.fromIssueDate) {
      this.lcIssueDate[0] = data.fromIssueDate;
      this.lcIssueDate[1] = data.toIssueDate;
    }
    if (data.fromDeadTime) {
      this.deadTime[0] = data.fromDeadTime;
      this.deadTime[1] = data.toDeadTime;
    }
    if (data.fromEffectiveDate) {
      this.effectiveDate[0] = data.fromEffectiveDate;
      this.effectiveDate[1] = data.toEffectiveDate;
    }
    if (data.fromPredictDate) {
      this.predictPaydate[0] = data.fromPredictDate;
      this.predictPaydate[1] = data.toPredictDate;
    }
    if (data.fromCreateDate) {
      this.createdTime[0] = data.fromCreateDate;
      this.createdTime[1] = data.toCreateDate;
    }
    this.getFilter();

  },
  mounted() {
    this.getMylxs();
    this.getrkdzt();
    this.getydlx();
    this.getfhlx();
    // this.getUserlist();
  },
  watch: {
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      }
    },
    value2(val) {
      let that = this;
      if (val > that.value3) {
        that.value3 = "";
      }
      this.pickerClose = {
        disabledDate(time) {
          return time.getTime() < that.value2;
        }
      };
    },
    '$route'(){
      this.query();
    },
  },
  methods: {
    query(){
      this.getUserlist();
      this.getSum();
    },
    //查看生命树
    goTree(){
        if (this.reducemsg.length === 1) {
        sessionStorage.setItem("bizCode", this.reducemsg[0].applyCode);
        sessionStorage.setItem("bizType", "IC_ISSUE");
        this.$router.push({
          path:"/index/home/tree",
          query:{
            bizCode:this.reducemsg[0].applyCode,
            bizType:"IC_ISSUE"
          }
        });
        let obj = {
        url: "treeModel",
        baseUrl: "",
        label: "生命树",
        moduleCode: "",
        params: {},
        query: {
          bizCode:this.reducemsg[0].applyCode,
          bizType:"IC_ISSUE"
        },
      };
      this.$store.commit("tabsListAdd", obj);
      } else {
        this.$openWarning("请选择一条合同查看生命树");
      }
    },
    tableSortChange(column) {
      const { prop, order } = column;
      if (order === "descending") {
        this.sort = `${prop} desc`;
      } else {
        this.sort = `${prop} asc`;
      }
      this.query();
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
        this.setFilter({filterJson:JSON.stringify(this.headerList),listJson:JSON.stringify(this.searchList)})

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
      if (column.property == "lcAmt") {
        return "rightTd";
      } else {
        return "";
      }
    },
    rowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    getUserlist() {
      if(!this.applyDate){
        this.applyDate = [];
      }
      if(!this.lcIssueDate){
        this.lcIssueDate = [];
      }
      if(!this.deadTime){
        this.deadTime = [];
      }
      if(!this.effectiveDate){
        this.effectiveDate = [];
      }
      if(!this.predictPaydate){
        this.predictPaydate = [];
      }
      if(!this.createdTime){
        this.createdTime = [];
      }
      //加载表格数据
      let data = {
        sort: this.sort,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        companyCode: this.companyInfo.companyCode,
        bbBranchBaseList: this.branchInfo,
        applyCode: this.applyCode,
        lcNo: this.lcNo,
        bbSupplierBaseList: this.supplierInfo,
        currencyCode: this.coin.currencyCode,
        lcStatusList: this.lcStatus,
        fromApplyDate: this.applyDate.length === 0 ? "" : this.applyDate[0],
        toApplyDate: this.applyDate.length === 0 ? "" : this.applyDate[1],
        fromIssueDate: this.lcIssueDate.length === 0 ? "" : this.lcIssueDate[0],
        toIssueDate: this.lcIssueDate.length === 0 ? "" : this.lcIssueDate[1],
        fromDeadTime: this.deadTime.length === 0 ? "" : this.deadTime[0],
        toDeadTime: this.deadTime.length === 0 ? "" : this.deadTime[1],
        lcPropertyList: this.lcProperty,
        lcType: this.lcType,
        lcDueType: this.lcDueType,
        fromEffectiveDate:
          this.effectiveDate.length === 0 ? "" : this.effectiveDate[0],
        toEffectiveDate:
          this.effectiveDate.length === 0 ? "" : this.effectiveDate[1],
        fromPredictDate:
          this.predictPaydate.length === 0 ? "" : this.predictPaydate[0],
        toPredictDate:
          this.predictPaydate.length === 0 ? "" : this.predictPaydate[1],
        extNo: this.cgSelect.extNo,
        createdBy: this.createdBy,
        fromCreateDate:
          this.createdTime.length === 0 ? "" : this.createdTime[0],
        toCreateDate: this.createdTime.length === 0 ? "" : this.createdTime[1]
      };
      let params = data;
      params.companyInfo = this.companyInfo; //公司
      params.branchInfo = this.branchInfo; //部门
      params.coin = this.coin; //币种
      params.cgSelect = this.cgSelect;
      params.supplierInfo = this.supplierInfo;
      this.$setQueryData(this, params);
      filcissue(data).then(res => {
        if (res.code === "success") {
          this.loading = false;
          this.total = res.data.total;
          // this.pageSize = res.data.pageSize;
          // this.pageNum = res.data.pageNum;
          this.tableData = res.data.list;
          this.tableData.forEach(i => {
            this.fhtypearr.map(k => {
              if (i.lcStatus == parseInt(k.dict_code)) {
                i.lcStatusName = k.dict_value;
                return i.lcStatusName;
              }
            });
            this.mytypearr.map(k => {
              if (i.lcProperty == parseInt(k.dict_code)) {
                i.lcPropertyS = k.dict_value;
                return i.lcPropertyS;
              }
            });
          });
        }
      });
    },
        //获取总计
    getSum() {
       if(!this.applyDate){
        this.applyDate = [];
      }
      if(!this.lcIssueDate){
        this.lcIssueDate = [];
      }
      if(!this.deadTime){
        this.deadTime = [];
      }
      if(!this.effectiveDate){
        this.effectiveDate = [];
      }
      if(!this.predictPaydate){
        this.predictPaydate = [];
      }
      if(!this.createdTime){
        this.createdTime = [];
      }
      //加载表格数据
      let data = {
        sort: this.sort,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        companyCode: this.companyInfo.companyCode,
        bbBranchBaseList: this.branchInfo,
        applyCode: this.applyCode,
        lcNo: this.lcNo,
        bbSupplierBaseList: this.supplierInfo,
        currencyCode: this.coin.currencyCode,
        lcStatusList: this.lcStatus,
        fromApplyDate: this.applyDate.length === 0 ? "" : this.applyDate[0],
        toApplyDate: this.applyDate.length === 0 ? "" : this.applyDate[1],
        fromIssueDate: this.lcIssueDate.length === 0 ? "" : this.lcIssueDate[0],
        toIssueDate: this.lcIssueDate.length === 0 ? "" : this.lcIssueDate[1],
        fromDeadTime: this.deadTime.length === 0 ? "" : this.deadTime[0],
        toDeadTime: this.deadTime.length === 0 ? "" : this.deadTime[1],
        lcPropertyList: this.lcProperty,
        lcType: this.lcType,
        lcDueType: this.lcDueType,
        fromEffectiveDate:
          this.effectiveDate.length === 0 ? "" : this.effectiveDate[0],
        toEffectiveDate:
          this.effectiveDate.length === 0 ? "" : this.effectiveDate[1],
        fromPredictDate:
          this.predictPaydate.length === 0 ? "" : this.predictPaydate[0],
        toPredictDate:
          this.predictPaydate.length === 0 ? "" : this.predictPaydate[1],
        extNo: this.cgSelect.extNo,
        createdBy: this.createdBy,
        fromCreateDate:
          this.createdTime.length === 0 ? "" : this.createdTime[0],
        toCreateDate: this.createdTime.length === 0 ? "" : this.createdTime[1]
      };
      getFiLcIssueListSumV2(data)
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
        if (["lcAmt"].findIndex((it) => it == key) !== -1) {
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
    shenhe(e) {
      console.log("eeee", this.reducemsg);
      if (e == 0) {
        submit(this.reducemsg).then(res => {
          if (res.code === "success") {
            this.submit = false;
            this.query();
          }
        });
      } else {
        this.submit = false;
      }
    },
    writeOffShowS(e) {
      console.log("eeee", this.examStatus);
      this.list.fiLcIssueFormList = this.reducemsg;
      this.list.examStatus = parseInt(this.examStatus);
      if (e == 0) {
        examine(this.list).then(res => {
          if (res.code === "success") {
            this.examine = false;
            this.query();
          }
        });
      } else {
        this.examine = false;
      }
    },
    squareUp(e) {
      console.log("eeee", this.reducemsg);
      if (e == 0) {
        settle(this.reducemsg[0]).then(res => {
          if (res.code === "success") {
            this.settle = false;
            this.query();
          }
        });
      } else {
        this.settle = false;
      }
    },
    disSettleUp(e) {
      console.log("eeee", this.reducemsg);
      if (e == 0) {
        disSettle(this.reducemsg[0]).then(res => {
          if (res.code === "success") {
            this.disSettle = false;
            this.query();
          }
        });
      } else {
        this.disSettle = false;
      }
    },
    getMylxs() {
      //获取信用证属性数据
      letterStatus({
        dictNo: 1077
      }).then(res => {
        this.mytypearr = res.data;
      });
    },
    getfhlx() {
      //获取信用证状态
      letterStatus({
        dictNo: 1056
      }).then(res => {
        this.fhtypearr = res.data;
        this.getMylxs();
        this.query();
      });
    },
    getydlx() {
      //获取信用证性质
      letterStatus({
        dictNo: 1022
      }).then(res => {
        this.typearr = res.data;
      });
    },
    getrkdzt() {
      //获取信用证类别
      letterStatus({
        dictNo: 1057
      }).then(res => {
        this.typeStatus = res.data;
      });
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.companyInfo = e;
      this.branchInfo = this.staffName = "";
    },
    //公司弹窗打开
    componyTip() {
      this.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.componyShow = false;
    },
    //部门弹窗打开
    departmentTip() {
      // if (this.companyInfo == ``) {
      //   this.$openWarning("请先选择公司");
      //   return false;
      // }
      this.departmentShow = true;
    },
    //部门弹窗关闭
    departmentCancle() {
      this.departmentShow = false;
    },
    //部门弹窗确定获取数据
    departmentSure(e) {
      this.departmentShow = false;
      this.branchInfo = e;
      this.staffName = "";
      this.departmentList = e;
    },
    //员工弹窗打开
    staffTip() {
      if (this.companyInfo == `` || this.branchInfo == ``) {
        this.$openWarning("请先选择公司和部门");
        return false;
      }
      this.staffShow = true;
    },
    //客户窗口
    connectionS() {
      this.connection = true;
    },
    //员工弹窗关闭
    staffCancle() {
      this.staffShow = false;
    },
    //员工弹窗确定获取数据
    staffSure(e) {
      console.log(e);
      this.staffShow = false;
      this.staffName = e;
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
    //弹窗打开
    addList() {
      this.cgShow = true;
    },
    //弹窗关闭
    cgCancle() {
      this.cgShow = false;
    },
    //弹窗确定获取数据
    cgSure(e) {
      this.cgSelect = e;
      this.cgSelect.extNo = this.cgSelect.poNo;

      console.log("ssss", e);
      // let a = this.tableData.every(item => {
      //   return item.poNo != e.poNo;
      // });
      // if (a) this.tableData.push(e);
      this.cgShow = false;
    },
    //创建弹窗打开
    establishShow() {
      this.establish = true;
    },
    //创建弹窗关闭
    establishClose() {
      this.establish = false;
    },
    //创建弹窗确定获取数据
    establishTrue(e) {
      this.establish = false;
      // this.establishNew = e;
    },
    //放货类型选择
    changefhtype() {
      console.log(this.fhtype);
    },
    changeState() {
      //贸易类型选择
      console.log(this.mytype);
    },
    changeydlx() {
      //移动类型选择
      console.log(this.ydtype);
    },
    changerkd() {
      //入库单选择
      console.log(this.rkdtype);
    },
    inputShow() {
      this.show = this.$showOne(this.show);
    },
    handleSelectionChange(val) {
      //表格选中数据
      console.log(val);
      this.reducemsg = val;
    },
    handleSizeChange(val) {
      //每页条数
      this.pageSize = val;
      this.getUserlist();
    },
    handleCurrentChange(val) {
      //当前页码数
      this.pageNum = val;
      this.getUserlist();
    },
    creatcom(type) {
      if (type == "creat") {
        this.establishShow();
      } else if (type == "edit") {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        } else if (this.reducemsg.length > 1) {
          this.$message({
            message: "至多选中一条数据",
            type: "warning"
          });
          return;
        }
        if (
          this.reducemsg[0].lcStatus == 10560005 ||
          this.reducemsg[0].lcStatus == 10560050
        ) {
          this.$router.push({
            name: "establishment",
            params: {
              type: "edit",
              data: {},
              id: this.reducemsg[0].id,
              version: this.reducemsg[0].version
            }
          });
        } else {
          this.$message({
            message: "请选择正确数据",
            type: "warning"
          });
          return;
        }
      } else if (type == "look") {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        } else if (this.reducemsg.length > 1) {
          this.$message({
            message: "至多选中一条数据",
            type: "warning"
          });
          return;
        }
        this.$router.push({
          name: "establishment",
          params: {
            type: type,
            look: true,
            data: {},
            id: this.reducemsg[0].id,
            version: this.reducemsg[0].version
          }
        });
      } else if (type === "submit") {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        } else if (this.reducemsg.length > 1) {
          this.$message({
            message: "请选择单条数据提交",
            type: "warning"
          });
          return;
        }
        if (
          this.reducemsg[0].lcStatus == 10560005 ||
          this.reducemsg[0].lcStatus == 10560050
        ) {
          this.submit = true;
        } else {
          this.$message({
            message: "请选择正确数据",
            type: "warning"
          });
          return;
        }
      } else if (type === "examine") {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        } else if (this.reducemsg.length > 1) {
          this.$message({
            message: "至多选中一条数据",
            type: "warning"
          });
          return;
        }
        if (
          this.reducemsg[0].lcStatus == 10560010 ||
          this.reducemsg[0].lcStatus == 10560055
        ) {
          this.examine = true;
        } else {
          this.$message({
            message: "请选择正确数据",
            type: "warning"
          });
          return;
        }
      } else if (type == "openLetter") {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        } else if (this.reducemsg.length > 1) {
          this.$message({
            message: "至多选中一条数据",
            type: "warning"
          });
          return;
        }
        if (
          this.reducemsg[0].lcStatus == 10560015 ||
          this.reducemsg[0].lcStatus == 10560020 ||
          this.reducemsg[0].lcStatus == 10560060 ||
          this.reducemsg[0].lcStatus == 10560065
        ) {
          this.$router.push({
            name: "establishment",
            params: {
              data: {},
              id: this.reducemsg[0].id,
              version: this.reducemsg[0].version,
              lcStatus: this.reducemsg[0].lcStatus,
              companyId: this.reducemsg[0].companyId,
              type: type
            }
          });
        } else {
          this.$message({
            message: "请选择正确数据",
            type: "warning"
          });
          return;
        }
      } else if (type == "honour") {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        } else if (this.reducemsg.length > 1) {
          this.$message({
            message: "至多选中一条数据",
            type: "warning"
          });
          return;
        }
        if (
          this.reducemsg[0].lcStatus == 10560060 ||
          this.reducemsg[0].lcStatus == 10560040
        ) {
          this.$router.push({
            name: "establishment",
            params: {
              data: {},
              id: this.reducemsg[0].id,
              version: this.reducemsg[0].version,
              lcStatus: this.reducemsg[0].lcStatus,
              companyId: this.reducemsg[0].companyId,
              type: type
            }
          });
        } else {
          this.$message({
            message: "请选择正确数据",
            type: "warning"
          });
          return;
        }
      } else if (type == "payMoney") {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        } else if (this.reducemsg.length > 1) {
          this.$message({
            message: "至多选中一条数据",
            type: "warning"
          });
          return;
        }
        if (
          this.reducemsg[0].lcStatus == 10560025 ||
          this.reducemsg[0].lcStatus == 10560040
        ) {
          this.$router.push({
            name: "establishment",
            params: {
              data: {},
              id: this.reducemsg[0].id,
              version: this.reducemsg[0].version,
              lcStatus: this.reducemsg[0].lcStatus,
              companyId: this.reducemsg[0].companyId,
              currencyCode: this.reducemsg[0].currencyCode,
              type: type,
              payMoney: true
            }
          });
        } else {
          this.$message({
            message: "请选择正确数据",
            type: "warning"
          });
          return;
        }
      } else if (type == "settle") {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        } else if (this.reducemsg.length > 1) {
          this.$message({
            message: "至多选中一条数据",
            type: "warning"
          });
          return;
        }
        if (this.reducemsg[0].lcStatus == 10560025) {
          this.settle = true;
        } else {
          this.$message({
            message: "请选择正确数据",
            type: "warning"
          });
          return;
        }
      } else if (type == "openChange") {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        } else if (this.reducemsg.length > 1) {
          this.$message({
            message: "至多选中一条数据",
            type: "warning"
          });
          return;
        }
        if (
          this.reducemsg[0].lcStatus == 10560015 ||
          this.reducemsg[0].lcStatus == 10560020 ||
          this.reducemsg[0].lcStatus == 10560065
        ) {
          this.$router.push({
            name: "establishment",
            params: {
              type: type,
              data: {},
              id: this.reducemsg[0].id,
              version: this.reducemsg[0].version
            }
          });
        } else {
          this.$message({
            message: "开证及已审批状态才可进行开证变更",
            type: "warning"
          });
          return;
        }
      } else {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        } else if (this.reducemsg.length > 1) {
          this.$message({
            message: "至多选中一条数据",
            type: "warning"
          });
          return;
        }
        if (this.reducemsg[0].lcStatus == 10560045) {
          this.disSettle = true;
        } else {
          this.$message({
            message: "请选择正确数据",
            type: "warning"
          });
          return;
        }
      }
    },
    delitemsg() {
      //删除数据
      if (this.reducemsg.length === 0) {
        this.$message({
          message: "请先选择一条数据",
          type: "warning"
        });
        return;
      }
      if (
        this.reducemsg[0].lcStatus == 10560005 ||
        this.reducemsg[0].lcStatus == 10560050
      ) {
        this.$confirm("是否确定删除继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          reduceMsg(this.reducemsg).then(res => {
            if (res.code === "success") {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.query();
            }
          });
        });
      } else {
        this.$message({
          message: "请选择正确数据",
          type: "warning"
        });
        return;
      }
    },
    clearmsg() {
      //重置
      this.companyInfo = this.coin = {};
      this.branchInfo = this.supplierInfo = [];
      this.departmentList = this.supplierList = [];
      this.applyCode = this.lcNo = this.applyDate = this.lcIssueDate = this.deadTime = this.effectiveDate = this.lcType = this.lcDueType = this.createdBy = this.predictPaydate = this.cgSelect = this.createdTime =
        "";
      this.lcProperty = [];
      this.lcStatus = [];
      this.pageNum = 1;
      this.pageSize = 100;
    }
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    coinSelect,
    supplierSelect,
    cgSelect,
    editSearchItem,
    contractSearch,
    openSelect
  }
};
</script>

<style lang="scss" scoped>
.button-div {
  margin: 0 !important;
}
.index .index-div3 .el-col:last-child{
  margin-bottom: 0;
}
</style>
