<template>
  <div id="settlementSheet" class="content-div">
    <div class="button-div button-div-query auto-sibling">
      <el-button class="query-button" @click="getUserlist" icon="el-icon-search"
        >查询</el-button
      >
      <el-button @click="clearmsg" icon="el-icon-refresh">重置</el-button>
      <el-button @click="showEditPage('searchList')" icon="el-icon-setting" style="float:right"
        >自定义
      </el-button>
    </div>
    <div class="input-div auto-sibling">
      <div v-if="$checkedNum(searchList) > 4">
        <p class="hide-input" v-if="showOrHide" @click="inputShow()">
          更多条件 <i class="el-icon-caret-bottom"></i>
        </p>
        <p class="hide-input" v-else @click="inputShow()">
          收起<i class="el-icon-caret-top"></i>
        </p>
      </div>
      <el-form @keyup.enter.native="getUserlist">
      <div class="search-div">
        <contract-search
          v-for="item in searchList"
          :label="item.label"
          :key="item.key"
          :checked="item.checked"
          :matchKey="item.key"
          :company="company"
          :componyTip="componyTip"
          :branch="branch"
          :departmentTip="departmentTip"
          :contractNoPs="contractNoPs"
          :customer="customer"
          :customerTips="customerTips"
          :extSoNo="extSoNo"
          :setttime="setttime"
          :staffName="staffName"
          :staffTip="staffTip"
          :supplier="supplier"
          :supplierTip="supplierTip"
          :status="status"
          :mytypearr="mytypearr"
          :createdBy="createdBy"
          :creattime="creattime"
          :departmentList="departmentList"
          :customerList="customerList"
          :supplierList="supplierList"
          :staffNameList="staffNameList"
          @changeInput="changeData"
        />
      </div>
      </el-form>
    </div>
    <div class="button-div auto-sibling">
      <el-button
        @click="creatcom('creat')"
        icon="el-icon-folder-add"
        v-if="$actionFlag(`F001`)"
        >创建</el-button
      >
      <el-button
        @click="creatcom('edit')"
        icon="el-icon-edit"
        v-if="$actionFlag(`F002`)"
        >修改</el-button
      >
      <el-button
        @click="creatcom('del')"
        icon="el-icon-delete"
        v-if="$actionFlag(`F003`)"
        >删除</el-button
      >
      <el-button
        @click="creatcom('look')"
        icon="el-icon-data-line"
        v-if="$actionFlag(`F004`)"
        >查看</el-button
      >
      <el-button
        icon="el-icon-finished"
        @click="creatcom('submission')"
        v-if="$actionFlag(`F005`)"
        >提交</el-button
      >
      <el-button
        icon="el-icon-receiving"
        @click="creatcom('review')"
        v-if="$actionFlag(`F006`)"
        >审核</el-button
      >
      <el-button icon="el-icon-download" v-if="$actionFlag(`F007`)" @click="exportTable"
        >导出</el-button
      >
      <el-button @click="showEditPage('headerList')" icon="el-icon-setting" style="float:right"
        >自定义
      </el-button>
    </div>
    <!-- 表格 -->
    <div class="el-table-div" v-auto>
      <el-table
        border
        center
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="calc(100% - 35px)"
        @selection-change="handleSelectionChange"
        @row-click="rowClick"
        v-loading="loading"
        :cell-class-name="cell"
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
           <span v-if="item.key === 'balanceQty'">{{ $numberToFixed(scope.row.balanceQty, 3) }}</span>
           <span v-if="item.key === 'goodsAmtOrigin'">{{ scope.row.goodsAmtOrigin | $moneyFormat }}</span>
           <span v-if="item.key === 'taxSumAmt'">{{ scope.row.taxSumAmt  | $moneyFormat }}</span>
           <span v-if="item.key === 'feeSum'">{{ scope.row.goodsAmtOrigin | $moneyFormat }}</span>
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
          :page-sizes="[100, 200, 300, 500]"
          :page-size="rows"
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
        :data="company"
        @departmentCancle="departmentCancle"
        @departmentSure="departmentSure"
      >
      </department-select>
      <!-- 选择员工弹窗 -->
      <staff-select
        v-if="staffShow"
        :tipShow="staffShow"
        :data="{companyName:company.companyName,branchName:branchNameStr.join(';') || ''}"
        @staffCancle="staffCancle"
        @staffSure="staffSure"
      >
      </staff-select>
      <!-- 选择客户弹窗 -->
      <customer-select
        v-if="customerShow"
        :tipShow="customerShow"
        @customerCancle="customerCancle"
        @customerSure="customerSure"
      >
      </customer-select>
      <!-- 选择供应商弹窗 -->
      <supplier-select
        v-if="supplierShow"
        :tipShow="supplierShow"
        @supplierCancle="supplierCancle"
        @supplierSure="supplierSure"
      >
      </supplier-select>
    </div>
    <!--审核弹窗 开始-->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="examineShow"
      :show-close="false"
      title="审核"
      width="400px"
      class="popup_box"
    >
      <div class="examine-dialog">
        <p v-if="!examineOne && examineValue == 'pass'" class="tips">
          <i class="el-icon-info"></i>
          批量审核时过账时间以退货单中退货时间为准，请事先确认，谨慎操作！
        </p>
        <el-col :span="24" class="el-col">
          <label>审核</label>
          <el-select
            clearable
            size="small"
            class="el-select"
            @change="examineSelect"
            v-model="examineValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in examineList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col
          v-if="examineOne && examineValue == 'pass'"
          :span="24"
          class="el-col"
        >
          <label>入库日期</label>
          <el-date-picker
            class="el-input2"
            style="width:178px;"
            size="small"
            v-model="examineDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="请选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-col>
        <el-col v-if="examineValue == 'reject'" :span="24" class="el-col">
          <label style="vertical-align:top">驳回原因</label>
          <el-input
            type="textarea"
            autosize
            v-model="rejectReason"
            size="small"
            class="el-textarea"
            placeholder="请输入内容"
          >
          </el-input>
        </el-col>
      </div>
      <div class="button-div2">
        <el-button @click="examineSure" icon="el-icon-check">确定</el-button>
        <el-button @click="examineCancle" icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
    <!--审核弹窗 结束-->
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
import customerSelect from "@/components/customerSelect2.vue"; //客户
import supplierSelect from "@/components/supplierSelect2.vue"; //供应商组件
import { log } from "util";
import { service, serviceJson } from "../../axios/index.js";
import {
  warelist,
  reduceMsg,
  getDjzt,
  subMission,
  toExamine,
  getTimes,
} from "@/api/salesManage/settlement.js";
import contractSearch from "@/views/salesManage/component/contractSearch";
import editSearchItem from "@/components/editSearchItem";
import { getFilter, setFilter } from "@/mixins/editCondition";
import { exportData } from "@/mixins/export.js";

const AllSearch = [
  { key: "companyName", label: "公司", checked: true },
  { key: "branch", label: "部门", checked: true },
  { key: "staffName", label: "业务员", checked: true },
  { key: "supplierName", label: "供应商", checked: true },
  { key: "extSoNo", label: "外部合同号", checked: true },
  { key: "contractNoPs", label: "ERP合同号", checked: true },
  { key: "setttime", label: "结算日期", checked: true },
  { key: "customer", label: "销售客户", checked: true },
  { key: "status", label: "单据状态", checked: true },
  { key: "creattime", label: "创建时间", checked: true },
  { key: "createdBy", label: "创建人", checked: true },
]; //全部选项标签
const ALLHeader = [
  {
    label: "公司",
    tooltip: true,
    key: "companyName",
    checked: true,
    width: "170",
  },
  {
    label: "部门",
    tooltip: true,
    key: "orgName",
    checked: true,
  },
  {
    label: "业务员",
    tooltip: true,
    key: "bizPersonName",
    checked: true,
  },
  {
    label: "ERP合同号",
    tooltip: true,
    key: "contractNoPs",
    checked: true,
    width: "150",
  },
  {
    label: "外部合同号",
    tooltip: true,
    key: "extSoNo",
    checked: true,
  },
  {
    label: "供应商",
    tooltip: true,
    key: "supplierName",
    checked: true,
    width: "170",
  },
  {
    label: "销售客户",
    tooltip: true,
    key: "custName",
    checked: true,
    width: "170",
  },
  {
    label: "单据状态",
    tooltip: true,
    key: "status",
    checked: true,
  },
  {
    label: "结算数量",
    tooltip: true,
    key: "balanceQty",
    checked: true,
    temp: true,
  },
  {
    label: "货款总计",
    tooltip: true,
    key: "goodsAmtOrigin",
    checked: true,
    width: "120",
    temp: true
  },
  {
    label: "税款合计",
    tooltip: true,
    key: "taxSumAmt",
    checked: true,
    width: "120",
    temp: true
  },
  {
    label: "费用合计",
    tooltip: true,
    key: "feeSum",
    checked: true,
    temp: true
  },
  {
    label: "结算日期",
    tooltip: true,
    key: "balanceDate",
    checked: true,
    width: "100",
  },
  {
    label: "创建人",
    tooltip: true,
    key: "createdName",
    checked: true,
  },
  {
    label: "创建时间",
    tooltip: true,
    key: "createdTime",
    checked: true,
  },
]; //所有表头
export default {
  name: "settlementSheet",
  props: {},
  data() {
    return {
      branchNameStr: [],
      staffNameList: [],
      supplierList: [],
      customerList: [],
      departmentList: [],
      fixHead: [
        {
          type: "selection",
          key: "selection",
          checked: true,
          width: "55",
        },
        {
          type: "index",
          label: "序号",
          tooltip: true,
          key: "index",
          checked: true,
          width: "50",
        },

      ],
      editPage: false,
      searchList: AllSearch,
      headerList: ALLHeader,
      editKey: "",
      editList: [],
      staffsName: {},
      loading: true,
      total: 0, //条数
      pageNum: 1, //页码数
      rows: 100, //每页条数
      componyShow: false, //公司弹窗
      company: {}, //公司
      branch: [], //部门
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      staffName: [], //员工
      customer: [], //客户
      customerShow: false, //客户弹窗
      supplier: [], //供应商名称
      supplierShow: false, //供应商弹窗
      createdBy: ``, //创建人
      contractNoPs: "", //ERP合同号
      extSoNo: "", //外部合同号
      showOrHide: true,
      status: [], //单据状态
      mytypearr: [], //单据状态下拉数据
      setttime: [], //结算时间
      creattime: [], //创建时间
      reducemsg: [], //选中数据
      navColor: {
        button: {
          backgroundColor: "",
        },
      },
      tableData: [],
      examineShow: false, //审核弹窗
      examineOne: true, //审核单条还是多条
      examineValue: "", //审核选中的值
      examineList: [
        { value: "pass", label: "通过" },
        { value: "reject", label: "驳回" },
      ],
      examineDate: "", //审核弹窗里的出库日期
      rejectReason: "", //驳回原因
      pickerOptions: "", //选择的时间范围
    };
  },
  computed: {
    ...mapState({
      themecolor: "themecolor",
    }),
  },
  mixins: [getFilter, setFilter, exportData],

  created() {
    if (this.$route.params.status) {
      this.status = this.$route.params.status
        .split(",")
        .map((item) => Number(item));
      this.getUserlist();
    }
    // params.branch = this.branch;
    //   params.departmentList = this.departmentList;
    //   params.staffName = this.staffName;
    //   params.staffNameList = this.staffNameList;
    //   params.customer = this.customer;
    //   params.customerList = this.customerList;
    //   params.supplier = this.supplier;
    //   params.supplierList = this.supplierList;
    //取查询条件
    let data = this.$getQueryData(this);
    this.departmentList = data.branch;
    this.staffNameList = data.staffName;
    this.customerList = data.customer;
    this.supplierList = data.supplier;
    if (data.fromBalanceDate) {
      this.setttime[0] = data.fromBalanceDate;
      this.setttime[1] = data.toBalanceDate;
    }
    if (data.fromCreatedDate) {
      this.creattime[0] = data.fromCreatedDate;
      this.creattime[1] = data.toCreatedDate;
    }
    this.getFilter();
  },
  mounted() {
    this.getMylxs();
  },
  watch: {
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      },
    },
    value2(val) {
      let that = this;
      if (val > that.value3) {
        that.value3 = "";
      }
      this.pickerClose = {
        disabledDate(time) {
          return time.getTime() < that.value2;
        },
      };
    },
  },
  methods: {
    exportTable() {
      if(!this.setttime){
        this.setttime = []
      }
      if(!this.creattime){
        this.creattime = []
      }
      let data = {
        rows: this.rows,
        pageNum: this.pageNum,
        companyCode: this.company.companyCode,
        orgCode: this.branch.branchCode,
        bizPersonCode: this.staffName.empCode,
        bizPersonName: this.staffName.empName,
        contractNoPs: this.contractNoPs, //erp合同号
        extSoNo: this.extSoNo, //外部合同号
        fromBalanceDate: this.setttime.length === 0 ? "" : this.setttime[0], //结算时间
        toBalanceDate: this.setttime.length === 0 ? "" : this.setttime[1],
        custCode: this.customer.customerCode, //客户
        supplierCode: this.supplier.supplierCode, //供应商
        statusList: this.status, //单据状态
        fromCreatedDate: this.creattime.length === 0 ? "" : this.creattime[0], //创建时间
        toCreatedDate: this.creattime.length === 0 ? "" : this.creattime[1],
        createdBy: this.createdBy, //创建人
      };
      let params = data;
      params.company = this.company;
      params.branch = this.branch;
      params.departmentList = this.departmentList;
      params.staffName = this.staffName;
      params.staffNameList = this.staffNameList;
      params.customer = this.customer;
      params.customerList = this.customerList;
      params.supplier = this.supplier;
      params.supplierList = this.supplierList;
      const fixHead = JSON.parse(JSON.stringify(this.fixHead));
      fixHead.splice(0, 2);
      const exportFieldList = [];
      fixHead.concat(this.headerList).forEach((item) => {
        if (item.checked) {
          const { key, label, otherKey } = item;
          exportFieldList.push({ key: otherKey ? otherKey : key, label })

        }
      });
      this.exportData({ ...data, exportFieldList });
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
      if (
        column.property == "balanceQty" ||
        column.property == "goodsAmtOrigin" ||
        column.property == "taxSumAmt" ||
        column.property == "feeSum"
      ) {
        return "rightTd";
      } else {
        return "";
      }
    },
    getUserlist() {
      let fromBalanceDates = '';
      let toBalanceDates = '';
      let fromCreatedDates = '';
      let toCreatedDates = '';
      if(this.setttime && this.setttime.length > 0){
          fromBalanceDates = this.setttime[0];
          toBalanceDates = this.setttime[1];
      }else{
          fromBalanceDates = '';
          toBalanceDates = '';
      }
      if(this.creattime && this.creattime.length > 0){
          fromCreatedDates = this.creattime[0];
          toCreatedDates = this.creattime[1];
      }else{
          fromCreatedDates = '';
          fromCreatedDates = '';
      }
      let data = {
        rows: this.rows,
        pageNum: this.pageNum,
        companyCode: this.company.companyCode,
        bbBranchBaseList: this.branch,
        bbEmployeeList: this.staffName,
        contractNoPs: this.contractNoPs, //erp合同号
        extSoNo: this.extSoNo, //外部合同号
        fromBalanceDate: fromBalanceDates, //结算时间
        toBalanceDate: toBalanceDates,
        bbCustomerBaseList: this.customer, //客户
        bbSupplierBaseList: this.supplier, //供应商
        statusList: this.status, //单据状态
        fromCreatedDate: fromCreatedDates, //创建时间
        toCreatedDate: toCreatedDates,
        createdBy: this.createdBy, //创建人
      };
      let params = data;
      params.company = this.company;
      params.branch = this.branch;
      params.departmentList = this.departmentList;
      params.staffName = this.staffName;
      params.staffNameList = this.staffNameList;
      params.customer = this.customer;
      params.customerList = this.customerList;
      params.supplier = this.supplier;
      params.supplierList = this.supplierList;
      this.$setQueryData(this, params);
      //加载表格数据
      warelist(data).then((res) => {
        if (res.code === "success") {
          this.loading = false;
          this.tableData = res.data;
          this.total = res.total;
          this.tableData.forEach((i) => {
            i.createdTime = this.$timeFun(i.createdTime, true);
            i.balanceDate = this.$timeFun(i.balanceDate, true);
            this.mytypearr.forEach((j) => {
              if (i.status === j.dict_key) {
                i.status = j.dict_value;
              }
            });
          });
        }
      });
    },
    getMylxs() {
      //获取贸易类型数据
      getDjzt({
        dictNo: 1085,
      }).then((res) => {
        this.mytypearr = res.data;
        this.getUserlist();
      });
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.company = e;
      this.branch = [];
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
      // if (JSON.stringify(this.company) === "{}" || this.company == ``) {
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
      this.branch = e;
      let branchNameStr = [];
      e.forEach((item) => {
        branchNameStr.push(item.branchName);
      });
      this.departmentList = e;
      this.branchNameStr = branchNameStr;
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
      this.staffNameList = e;
    },
    //客户弹窗打开
    customerTips() {
      this.customerShow = true;
    },
    //客户弹窗关闭
    customerCancle() {
      this.customerShow = false;
    },
    //客户弹窗确定获取数据
    customerSure(e) {
      this.customerShow = false;
      this.customer = e;
      this.customerList = e;
      this.supplier = [];
    },
    //供应商弹窗打开
    supplierTip() {
      this.supplierShow = true;
    },
    //供应商弹窗关闭
    supplierCancle() {
      this.supplierShow = false;
    },
    //供应商弹窗确定获取数据
    supplierSure(e) {
      this.supplierShow = false;
      this.supplier = e;
      this.supplierList = e;
      this.customer = [];
    },
    changeState() {
      //贸易类型选择
      console.log(this.status);
    },
    inputShow() {
      this.showOrHide = this.$showOne(this.showOrHide);
    },
    handleSelectionChange(val) {
      //表格选中数据
      console.log(val);
      this.reducemsg = val;
    },
    handleSizeChange(val) {
      //每页条数
      this.rows = val;
      this.getUserlist();
    },
    handleCurrentChange(val) {
      //当前页码数
      this.pageNum = val;
      this.getUserlist();
    },
    creatcom(type) {
      //creat 创建 edit 修改 look 查看 del 删除 submission 提交 review 审核
      console.log(type);
      if (
        type === "look" ||
        type === "edit" ||
        type === "submission" ||
        type === "review"
      ) {
        if (this.reducemsg.length === 0) {
          this.$openWarning("请先选择一条数据");
          return;
        } else if (this.reducemsg.length > 1) {
          this.$openWarning("至多选择一条数据");
          return;
        }
      }
      if (type === "del") {
        if (this.reducemsg.length === 0) {
          this.$openWarning("请先选择一条数据");
          return;
        }
      }
      switch (type) {
        case "creat":
          this.$router.push({
            path: "/index/salesManage/settlementCreat",
            query: {
              data: type,
            },
          });
          return;
        case "edit":
          this.delitemsg(type);
          return;
        case "look":
          this.$router.push({
            path: "/index/salesManage/settlementCreat",
            query: {
              data: type,
              msgid: this.reducemsg[0].settleId,
              version: this.reducemsg[0].version,
            },
          });
          return;
        case "del":
          console.log("del");
          this.delitemsg(type);
          return;
        case "submission":
          console.log("submission");
          this.delitemsg(type);
          return;
        case "review":
          console.log("review");
          this.delitemsg(type);
          return;
      }
    },
    delitemsg(type) {
      //删除数据 del删除 review审核 submission提交
      if (this.reducemsg.length === 0) {
        this.$openWarning("请先选择一条数据");
        return;
      }
      let kbreducemsg = JSON.parse(JSON.stringify(this.reducemsg));
      let kbarr = [];
      kbreducemsg.forEach((i) => {
        this.mytypearr.forEach((j) => {
          if (i.status === j.dict_value) {
            i.status = j.dict_code;
          }
        });
        kbarr.push(i.status);
      });
      if (type === "del") {
        if (
          kbarr.indexOf("10850010") != -1 ||
          kbarr.indexOf("10850020") != -1 ||
          kbarr.indexOf("10850025") != -1 ||
          kbarr.indexOf("10850030") != -1 ||
          kbarr.indexOf("10850035") != -1 ||
          kbarr.indexOf("10850040") != -1
        ) {
          this.$openWarning("只有保存和已驳回状态可以删除");
          return;
        } else {
          this.$confirm("是否确定删除继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            reduceMsg(kbreducemsg).then((res) => {
              if (res.code === "success") {
                this.$openSuccess(res.message);
                this.getUserlist();
              }
            });
          });
        }
      } else if (type === "review") {
        console.log(kbreducemsg);
        if (kbarr[0] != "10850010") {
          this.$openWarning("只有审核中状态可以审核");
          return;
        }
        if (kbreducemsg.length > 1) {
          this.examineOne = false; //是否是多条
        } else {
          //this.examineDate=this.selectioned[0].undoDate;//默认当前数据的出库日期
          this.examineOne = true; //是否是多条
        }
        this.examineShow = true; //审核弹窗
      } else if (type === "submission") {
        if (kbarr[0] == "10850005" || kbarr[0] == "10850015") {
          console.log(kbreducemsg[0].settleId);
          console.log(kbreducemsg[0].version);
          subMission({
            settleId: kbreducemsg[0].settleId,
            version: kbreducemsg[0].version,
            status: kbarr[0],
          }).then((res) => {
            console.log(res);
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.getUserlist();
            }
          });
        } else {
          this.$openWarning("只有保存和已驳回状态可以提交");
          return;
        }
      } else {
        if (kbarr[0] == "10850005" || kbarr[0] == "10850015") {
          this.$router.push({
            path: "/index/salesManage/settlementCreat",
            query: {
              data: type,
              msgid: this.reducemsg[0].settleId,
              version: this.reducemsg[0].version,
            },
          });
        } else {
          this.$openWarning("只有保存和已驳回状态可以修改");
          return;
        }
      }
    },
    //审核下拉选中的值
    examineSelect(e) {
      console.log(e);
      if (e === "pass" && this.examineOne) {
        console.log(this.reducemsg[0].companyId);
        getTimes({ companyId: this.reducemsg[0].companyId }).then((res) => {
          if (res.code == "success") {
            console.log(res);
            this.$nextTick(() => {
              this.pickerOptions = {
                disabledDate(time) {
                  return (
                    res.data.enddate < time.getTime() ||
                    time.getTime() < res.data.begindate
                  );
                },
              };
            });
          } else {
            this.$openWarning(res.message);
          }
        });
      }
      this.examineValue = e; //审核选中的值
    },
    //取消
    examineCancle() {
      this.examineShow = false; //审核弹窗
      this.examineValue = ""; ////审核选中的值
      this.examineDate = ""; //审核中的出库日期
    },
    //确定
    examineSure() {
      if (this.examineValue == "") {
        this.$openWarning("请选择审核类型");
        return;
      }
      if (this.examineValue == "pass" && this.examineOne && !this.examineDate) {
        this.$openWarning("请选择出库日期");
        return;
      }
      console.log(this.examineValue);
      console.log(this.examineDate);
      let kbreducemsg = JSON.parse(JSON.stringify(this.reducemsg));
      this.mytypearr.forEach((j) => {
        if (kbreducemsg[0].status === j.dict_value) {
          kbreducemsg[0].status = j.dict_code;
        }
      });
      if (kbreducemsg.length === 1) {
        kbreducemsg[0].auditDate = this.examineDate;
      } else {
        kbreducemsg.forEach((i) => {
          i.auditInfo = this.rejectReason;
        });
      }
      if (this.examineValue === "pass") {
        console.log("通过");
        console.log(kbreducemsg);
        toExamine({
          version: kbreducemsg[0].version,
          settleId: kbreducemsg[0].settleId,
          examineStatus: 0,
          status: kbreducemsg[0].status,
        }).then((res) => {
          console.log(res);
          if (res.code === "success") {
            this.examineShow = false;
            this.$openSuccess(res.message);
            this.getUserlist();
            this.examineValue = ""; ////审核选中的值
            this.examineDate = ""; //审核中的出库日期
          }
        });
      } else if (this.examineValue === "reject") {
        toExamine({
          version: kbreducemsg[0].version,
          settleId: kbreducemsg[0].settleId,
          examineStatus: 1,
          status: kbreducemsg[0].status,
        }).then((res) => {
          if (res.code === "success") {
            this.examineShow = false;
            this.$openSuccess(res.message);
            this.getUserlist();
            this.examineValue = ""; ////审核选中的值
            this.rejectReason = "";
          }
        });
      }
    },
    clearmsg() {
      //重置
      this.company = this.contractNoPs = this.extSoNo = this.createdBy = "";
      this.branch = [];
      this.staffName = [];
      this.customer = [];
      this.supplier = [];
      (this.branchNameStr = []),
        (this.staffNameList = []),
        (this.supplierList = []),
        (this.customerList = []),
        (this.departmentList = []),
        (this.status = []);
      this.setttime = this.creattime = [];
    },
    rowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    supplierSelect,
    contractSearch,
    editSearchItem,
    customerSelect,
  },
};
</script>

<style lang="scss">
#settlementSheet {
  .el-date-editor.el-input {
    width: auto;
  }
  // .el-range-editor .el-range-input {
  //   width: 70%;
  // }
}
</style>
