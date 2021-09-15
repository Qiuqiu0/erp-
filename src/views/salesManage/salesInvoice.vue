<template>
  <!------------页面主体内容 开始------------>
  <div id="salesInvoice" class="salesInvoice">
    <!-----------查询，重置按钮  开始------------>
    <div class="button-div auto-sibling">
      <el-button class="query-button" @click="queryData()" icon="el-icon-search"
        >查询</el-button
      >
      <el-button @click="resetData()" icon="el-icon-refresh">重置</el-button>
      <el-button @click="showEditPage('searchList')" icon="el-icon-setting" style="float:right"
        >自定义
      </el-button>
    </div>
    <div class="index-div3 auto-sibling">
      <div v-if="$checkedNum(searchList) > 4">
        <p class="hide-input" v-if="show" @click="inputShow()">
          更多条件 <i class="el-icon-caret-bottom"></i>
        </p>
        <p class="hide-input" v-else @click="inputShow()">
          收起<i class="el-icon-caret-top"></i>
        </p>
      </div>
      <el-form @keyup.enter.native="initData">
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
          :customer="customer"
          :customerTips="customerTips"
          :createdTime="createdTime"
          :createdName="createdName"
          :warrantCode="warrantCode"
          :warrantMonth="warrantMonth"
          :invoiceCode="invoiceCode"
          :invoiceDate="invoiceDate"
          :soType="soType"
          :contractTypeList="soTypeList"
          :currencyName="currencyName"
          :coinTips="coinTips"
          :baseCurrencyRate="baseCurrencyRate"
          :invoiceType="invoiceType"
          :invoiceTypeList="invoiceTypeList"
          :extInvoiceCode="extInvoiceCode"
          :invoiceStatus="invoiceStatus"
          :invoiceStatusList="invoiceStatusList"
          :invoiceQty="invoiceQty"
          :writeoffWarrantCode="writeoffWarrantCode"
          :writeoffWarrantMonth="writeoffWarrantMonth"
          :departmentList="departmentList"
          :customerList="customerList"
          :soContractNo="soContractNo"
          :doNo="doNo"
          @changeInput="changeData"
        />
      </div>
      </el-form>
    </div>
    <!------------查询条件 结束------------>
    <!------------操作按钮 开始------------>
    <div class="button-div auto-sibling">
      <el-dropdown szie="mini" @command="handleCommand">
        <el-button icon="el-icon-folder-add"
          >创建<i class="el-icon-arrow-down el-icon--right"></i
        ></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            command="blue"
            v-if="$actionFlag(`F001`)"
            icon="el-icon-circle-check"
            >蓝字发票</el-dropdown-item
          >
          <el-dropdown-item
            command="return"
            v-if="$actionFlag(`F002`)"
            icon="el-icon-warning-outline"
            >退货发票</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        @click="handleDetails(2)"
        v-if="$actionFlag(`F003`)"
        icon="el-icon-edit"
        >修改</el-button
      >
      <el-button
        @click="deleteSaleOutboundOrder()"
        v-if="$actionFlag(`F004`)"
        icon="el-icon-delete"
        >删除</el-button
      >
      <el-button
        @click="handleDetails(3)"
        v-if="$actionFlag(`F005`)"
        icon="el-icon-data-line"
        >查看</el-button
      >
      <el-button
        @click="changeStatus('submit')"
        v-if="$actionFlag(`F006`)"
        icon="el-icon-finished"
        style="margin-right:10px;"
        >提交</el-button
      >
      <!-- <el-button @click="handleToExamine" v-if="$actionFlag(`F007`)" icon="el-icon-receiving">审核</el-button> -->
      <el-button
        @click="handleDetails(4)"
        v-if="$actionFlag(`F007`)"
        icon="el-icon-receiving"
        >过账</el-button
      >
      <el-button
        @click="writeOff()"
        v-if="$actionFlag(`F008`)"
        icon="el-icon-document-delete"
        >冲销</el-button
      >
      <el-button
        @click="invoiceApplication()"
        v-if="$actionFlag(`F009`)"
        icon="el-icon-document-delete"
        >申请开票打印</el-button
      >
      <el-button @click="showEditPage('headerList')" icon="el-icon-setting" style="float:right"
        >自定义
      </el-button>
      <el-button
          @click="exportTable"
          v-if="$actionFlag(`F007`)"
          icon="el-icon-download"
      >导出</el-button
      >
      <el-button
      icon="el-icon-thumb"
      @click="goTree"
      v-if="$actionFlag(`F010`)"
      >生命树</el-button>
    </div>
    <!------------操作按钮 结束------------>
    <!------------表格table 开始 ------------>
    <div class="el-table-div" v-auto>
      <el-table
        border
        center
        ref="multipleTable"
        :data="tableData"
        height="calc(100% - 35px)"
        tooltip-effect="dark"
        @select-all="dialogCheck"
        @selection-change="handleChange"
        @row-click="rowClick"
        :cell-class-name="cell"
        class="el-table"
        v-loading="loading"
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
            <span v-if="item.key === 'invoiceQty'">{{ $numberToFixed(scope.row.invoiceQty, 3) }}</span>
            <span v-if="item.key === 'invoiceAmtVat'">{{ scope.row.invoiceAmtVat  | $moneyFormat }}</span>
            <span v-if="item.key === 'baseAmt'">{{ scope.row.baseAmt  | $moneyFormat }}</span>
            <span v-if="item.key === 'costAmt'">{{ scope.row.costAmt | $moneyFormat }}</span>
           <!-- <span v-if="item.key === 'currencyRate'">{{ $numberToFixed(scope.row.currencyRate, 4) }}</span> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[100, 200, 300, 500]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!------------表格table 结束 ------------>
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
    <!--选择销售客户 -->
    <customer-select
      v-if="customerShow"
      :tipShow="customerShow"
      @customerCancle="customerCancle"
      @customerSure="customerSure"
    >
    </customer-select>
    <!--选择业务币别 -->
    <coin-select
      v-if="coinShow"
      :tipShow="coinShow"
      @coinCancle="coinCancle"
      @coinSure="coinSure"
    >
    </coin-select>
    <!-- 选择员工弹窗 -->
    <staff-select
      v-if="staffShow"
      :tipShow="staffShow"
      :data="{}"
      @staffCancle="staffCancle"
      @staffSure="staffSure"
    >
    </staff-select>
    <!--审核弹窗 开始-->
    <el-dialog
      :visible.sync="examineShow"
      :show-close="false"
      :close-on-click-modal="false"
      title="审核"
      width="400px"
      class="popup_box"
    >
      <div class="examine-dialog">
        <p v-if="!examineOne && examineValue == 'pass'" class="tips">
          <i class="el-icon-info"></i>
          批量审核时过账时间以发票单中记账时间为准，请事先确认，谨慎操作！
        </p>
        <el-col :span="24" class="el-col">
          <label><span class="must-full">*</span>审核</label>
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
          <label><span class="must-full">*</span>记账日期</label>
          <el-date-picker
            class="el-input2"
            style="width:178px;"
            v-model="examineDate"
            type="date"
            size="small"
            placeholder="请选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-col>
        <el-col v-if="examineValue == 'pass'" :span="24" class="el-col">
          <label><span class="must-full">*</span>税金科目</label>
          <el-input
            v-model="accountName.nameL1"
            class="el-input2"
            size="small"
            disabled
          ></el-input>
          <span class="comicon" @click="accountTips"
            ><i class="el-icon-search"></i
          ></span>
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
        <el-button
          @click="examineSure"
          icon="el-icon-check"
          :disabled="examineStatus"
          >确定</el-button
        >
        <el-button @click="examineCancle" icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
    <!--审核弹窗 结束-->
    <!--冲销 开始-->
    <el-dialog
      :visible.sync="writeOffShow"
      :show-close="false"
      :close-on-click-modal="false"
      title="冲销"
      width="400px"
      class="popup_box"
    >
      <div class="examine-dialog">
        <el-col :span="24" class="el-col">
          <label>冲销日期</label>
          <el-date-picker
            class="el-input2"
            style="width:178px;"
            v-model="unDate"
            type="date"
            size="small"
            placeholder="请选择日期"
            @change="changeDate"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="24" class="el-col">
          <label style="vertical-align:top">冲销原因</label>
          <el-input
            type="textarea"
            autosize
            v-model="unReason"
            size="small"
            class="el-textarea"
            placeholder="请输入内容"
          >
          </el-input>
        </el-col>
      </div>
      <div class="button-div2">
        <el-button @click="writeOffSure" icon="el-icon-check">确定</el-button>
        <el-button @click="writeOffCancle" icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
    <!--冲销 结束-->
    <!--税金科目-->
    <subject-frame
      v-if="subjectShow"
      :longNumber="22210102"
      :tipShow="subjectShow"
      @subjectCancle="subjectCancle"
      @subjectSure="subjectSure"
    ></subject-frame>
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
  <!------------页面主体内容 结束------------>

</template>
<script>
import { mapState } from "vuex";
import sApi from "@/api/salesManage/salesManage";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect2.vue";
import customerSelect from "@/components/customerSelect2.vue";
import coinSelect from "@/components/coinSelect.vue";
import staffSelect from "@/components/staffSelect.vue";
import subjectFrame from "@/components/subjectFrame.vue"; //科目组件
import contractSearch from "@/views/salesManage/component/contractSearch";
import editSearchItem from "@/components/editSearchItem";
import { getFilter, setFilter } from "@/mixins/editCondition";
import { exportData } from "@/mixins/export";

const AllSearch = [
  { key: "companyName", label: "公司", checked: true },
  { key: "branch", label: "部门", checked: true },
  { key: "customer", label: "销售客户", checked: true },
  { key: "extContractCode", label: "外部合同号", checked: true },
  { key: "soContractNo", label: "销售合同号", checked: true },
  { key: "invoiceCode", label: "发票单据号", checked: true },
  { key: "doNo", label: "销售出库单号", checked: true },
  { key: "invoiceDate", label: "开票日期", checked: true },
  { key: "soType", label: "销售类型", checked: true },
  { key: "currencyName", label: "业务币种", checked: true },
  { key: "baseCurrencyRate", label: "本位币汇率", checked: true },
  { key: "invoiceType", label: "发票类型", checked: true },
  { key: "extInvoiceCode", label: "发票外部编号", checked: true },
  { key: "invoiceStatus", label: "发票状态", checked: true },
  { key: "invoiceQty", label: "发票状态", checked: true },
  { key: "createdTime", label: "创建时间", checked: true },
  { key: "createdName", label: "创建人", checked: true },
  { key: "warrantCode", label: "凭证号", checked: true },
  { key: "warrantMonth", label: "期间", checked: true },
  { key: "writeoffWarrantCode", label: "冲销凭证号", checked: true },
  { key: "writeoffWarrantMonth", label: "冲销期间", checked: true },
]; //全部选项标签
const ALLHeader = [
  {
    label: "开票申请单据编号",
    tooltip: true,
    key: "invoiceCode",
    checked: true,
    width: "120",
    sortable: true,
  },
  {
    label: "发票外部编号",
    tooltip: true,
    key: "extInvoiceCode",
    checked: true,
  },
  {
    label: "发票类型",
    tooltip: true,
    key: "invoiceTypeName",
    checked: true,
    width: "100",
  },
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
    width: "170",
  },
  {
    label: "客户",
    tooltip: true,
    key: "custName",
    checked: true,
    width: "170",
  },
  {
    label: "开票日期",
    tooltip: true,
    key: "invoiceDate",
    checked: true,
    width: "100",
    sortable: true,
  },
  {
    label: "发票状态",
    tooltip: true,
    key: "invoiceStatusName",
    checked: true,
    width: "110",
  },
  {
    label: "开票数量",
    tooltip: true,
    key: "invoiceQty",
    checked: true,
    width: "120",
    temp: true,
    sortable: true,
  },
  {
    label: "开票金额",
    tooltip: true,
    key: "invoiceAmtVat",
    checked: true,
    width: "150",
    temp:true,
    sortable: true,
  },
  {
    label: "销售收入",
    tooltip: true,
    key: "baseAmt",
    checked: true,
    width: "150",
    temp:true,
  },
  {
    label: "销售成本",
    tooltip: true,
    key: "costAmt",
    checked: true,
    width: "150",
    temp:true,
  },
  {
    label: "凭证号",
    tooltip: true,
    key: "warrantCode",
    checked: true,
    width: "100",
  },
  {
    label: "期间",
    tooltip: true,
    key: "warrantMonth",
    checked: true,
  },
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
  {
    label: "创建人",
    tooltip: true,
    key: "createdName",
    checked: true,
    width: "110",
  },
  {
    label: "创建时间",
    tooltip: true,
    key: "createdTime",
    checked: true,
    width: "110",
  },
  {
    label: "修改人",
    tooltip: true,
    key: "updatedName",
    checked: true,
    width: "110",
  },
  {
    label: "修改时间",
    tooltip: true,
    key: "updatedTime",
    checked: true,
    width: "110",
  },
  {
    label: "审核人",
    tooltip: true,
    key: "auditBy",
    checked: true,
    width: "110",
  },
  {
    label: "审核时间",
    tooltip: true,
    key: "auditDate",
    checked: true,
    width: "110",
  },
]; //所有表头
export default {
  name: "salesInvoice",
  data() {
    return {
      branchNameStr: [],
      departmentList: [],
      customerList: [],
      sort: "",
      fixHead: [
        {
          type: "selection",
          key: "selection",
          checked: true,
        },
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
      componyShow: false, //公司弹窗
      departmentShow: false, //部门弹窗
      customerShow: false, //客户弹窗
      coinShow: false, //业务币弹窗
      staffShow: false, //员工弹窗
      company: {}, //公司名
      branch: [], //部门
      companyCode: "", //公司代码
      branchCode: "", //部门代码
      customer: [], //客户名称
      custId: "", //客户id
      currencyName: {}, //业务币种id
      toCurrencyCode: "", //本位币
      currencyCode: "", //业务币别代码
      invoiceStatusList: [], //状态列表
      invoiceStatus: [], //状态
      createdTime: [], //创建时间
      invoiceCode: "", //发票单据单号
      soExtNo: "", //外部合同号
      invoiceDate: [], //发票日期
      createdName: "", //创建人
      soTypeList: [], //销售类型列表
      soType: "", //销售类型
      invoiceType: "", //发票类型
      invoiceTypeList: [], //发票类型列表
      baseCurrencyRate: "", //本位币汇率
      extInvoiceCode: "", //发票外部编号
      invoiceQty: "", //开票数量
      show: true, //查询条件显示隐藏
      pageSize: 100,
      pageNum: 1,
      total: 0,
      selectioned: [], //选中
      loading: false,
      tableData: [], //列表
      version: "", //版本号
      examineShow: false, //审核弹窗
      examineOne: true, //审核单条还是多条
      examineValue: "", //审核选中的值
      examineList: [
        { value: "pass", label: "通过" },
        { value: "reject", label: "驳回" },
      ],
      examineDate: "", //审核弹窗里的出库日期
      rejectReason: "", //驳回原因
      pickerOptions: {}, //时间范围
      unDate: "", //冲销日期
      unReason: "", //冲销原因
      writeOffShow: false, //冲销原因
      writeOffFlag: false, //判断冲销日期是否在范围内
      examineStatus: true, //审核值是否选择
      subjectShow: false, //税金科目
      accountName: {}, //税金科目
      warrantCode: "", //凭证号
      warrantMonth: "", //期间
      writeoffWarrantCode: "", //冲销凭证号
      writeoffWarrantMonth: "", //冲销期间
      soContractNo: "",
      doNo: "",
      sumTol:{}
    };
  },
  mixins: [getFilter, setFilter, exportData],
  watch:{
    // '$route'(){
    //   this.queryData();
    // },
  },
  created() {
    if (this.$route.params.status) {
      this.invoiceStatus = this.$route.params.status
        .split(",")
        .map((item) => Number(item));
      this.initData();
    }
    // params.branch = this.branch;
    //   params.departmentList = this.departmentList;
    //   params.customer = this.customer;
    //   params.customerList = this.customerList;
    //   params.currencyName = this.currencyName;
    let data = this.$getQueryData(this);
    this.departmentList = data.branch;
    this.customerList = data.customer;
    if (data.invoiceDateBegain) {
      this.invoiceDate[0] = data.invoiceDateBegain;
    }
    if (data.invoiceDateEnd) {
      this.invoiceDate[1] = data.invoiceDateEnd;
    }
    if (data.createdTimeBegain) {
      this.createdTime[0] = data.createdTimeBegain;
    }
    if (data.createdTimeEnd) {
      this.createdTime[1] = data.createdTimeEnd;
    }
    this.getSoTypeList();
    this.getInvoiceTypeList();
    this.getInvoiceStatusList();
    this.getFilter();
  },
  methods: {
    queryData(){
      this.initData();
      this.getSum();
    },
    //查看生命树
    goTree() {
      if (this.selectioned.length === 1) {
        sessionStorage.setItem("bizCode", this.selectioned[0].invoiceCode);
        sessionStorage.setItem("bizType", "SO_INVOICE");
        this.$router.push({
          path: "/index/home/tree",
          query: {
            bizCode: this.selectioned[0].invoiceCode,
            bizType: "SO_INVOICE",
          },
        });
         let obj = {
        url: "treeModel",
        baseUrl: "",
        label: "生命树",
        moduleCode: "",
        params: {},
        query: {
          bizCode:this.selectioned[0].invoiceCode,
          bizType:"SO_INVOICE"
        },
      };
      this.$store.commit("tabsListAdd", obj);
      } else {
        this.$openWarning("请选择一条合同查看生命树");
      }
    },
    exportTable() {
      if (this.invoiceDate && this.invoiceDate.length) {
        var invoiceDateBegain = this.invoiceDate[0]; //发票日期
        var invoiceDateEnd = this.invoiceDate[1];
      }
      if (this.createdTime && this.createdTime.length) {
        var createdTimeBegain = this.createdTime[0]; //创建时间
        var createdTimeEnd = this.createdTime[1];
      }
      if (this.company) {
        var companyCode = this.company.companyCode; //公司
      }
      if (this.branch) {
        var branchCode = this.branch; //部门
      }
      if (this.currencyName) {
        var currencyCode = this.currencyName.currencyCode; //业务币别
      }
      if (this.customer) {
        var custId = this.customer; //销售客户
      }

      if (this.soType) {
        var soType = this.soType; //销售类型
      }
      if (this.invoiceType) {
        var invoiceType = this.invoiceType; //发票类型
      }
      if (this.invoiceStatus) {
        var invoiceStatus = this.invoiceStatus; //状态
      }
      if (this.invoiceCode) {
        var invoiceCode = this.invoiceCode; //发票单据号
      }
      if (this.soExtNo) {
        var soExtNo = this.soExtNo; //外部合同号
      }
      if (this.createdName) {
        var createdName = this.createdName; //创建人
      }
      if (this.extInvoiceCode) {
        //发票外部编号
        var extInvoiceCode = this.extInvoiceCode;
      }
      if (this.baseCurrencyRate) {
        //本位币汇率
        var baseCurrencyRate = this.baseCurrencyRate;
      }
      if (this.invoiceQty) {
        var invoiceQty = this.invoiceQty; //开票数量
      }
      let data = {
        pageNum: this.pageNum,
        sort: this.sort,
        pageSize: this.pageSize,
        companyCode: companyCode, //公司
        bbBranchBaseList: branchCode, //部门
        bbCustomerBaseList: custId, //销售客户
        soType: soType, //销售类型
        extInvoiceCode: extInvoiceCode, //发票外部编号
        currencyCode: currencyCode, //业务币别
        baseCurrencyRate: baseCurrencyRate, //本位币汇率
        invoiceStatusList: invoiceStatus, //发票状态
        invoiceType: invoiceType, //发票类型
        invoiceCode: invoiceCode, //发票单据号
        soExtNo: soExtNo, //外部合同号
        createdTimeBegain: createdTimeBegain,
        createdTimeEnd: createdTimeEnd, //创建时间
        invoiceDateBegain: invoiceDateBegain,
        invoiceDateEnd: invoiceDateEnd, //退货时间
        createdName: createdName, //创建人
        invoiceQty: invoiceQty, //开票数量
        order: "desc",
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        writeoffWarrantCode: this.writeoffWarrantCode, //冲销凭证号
        writeoffWarrantMonth: this.writeoffWarrantMonth, //冲销期间
        soContractNo: this.soContractNo,
        doNo: this.doNo,
      };
      let params = data;
      params.company = this.company;
      params.branch = this.branch;
      params.departmentList = this.departmentList;
      params.customer = this.customer;
      params.customerList = this.customerList;
      params.currencyName = this.currencyName;
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
    tableSortChange(column) {
      const { prop, order } = column;
      if (order === "descending") {
        this.sort = `${prop} desc`;
      } else {
        this.sort = `${prop} asc`;
      }
      this.queryData();
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
        column.property == "invoiceQty" ||
        column.property == "invoiceAmtVat" ||
        column.property == "costAmt"
        || column.property == "baseAmt"
      ) {
        return "rightTd";
      } else {
        return "";
      }
    },
    initData() {
      this.loading = true;
      if (this.invoiceDate && this.invoiceDate.length) {
        var invoiceDateBegain = this.invoiceDate[0]; //发票日期
        var invoiceDateEnd = this.invoiceDate[1];
      }
      if (this.createdTime && this.createdTime.length) {
        var createdTimeBegain = this.createdTime[0]; //创建时间
        var createdTimeEnd = this.createdTime[1];
      }
      if (this.company) {
        var companyCode = this.company.companyCode; //公司
      }
      if (this.branch) {
        var branchCode = this.branch; //部门
      }
      if (this.currencyName) {
        var currencyCode = this.currencyName.currencyCode; //业务币别
      }
      if (this.customer) {
        var custId = this.customer; //销售客户
      }

      if (this.soType) {
        var soType = this.soType; //销售类型
      }
      if (this.invoiceType) {
        var invoiceType = this.invoiceType; //发票类型
      }
      if (this.invoiceStatus) {
        var invoiceStatus = this.invoiceStatus; //状态
      }
      if (this.invoiceCode) {
        var invoiceCode = this.invoiceCode; //发票单据号
      }
      if (this.soExtNo) {
        var soExtNo = this.soExtNo; //外部合同号
      }
      if (this.createdName) {
        var createdName = this.createdName; //创建人
      }
      if (this.extInvoiceCode) {
        //发票外部编号
        var extInvoiceCode = this.extInvoiceCode;
      }
      if (this.baseCurrencyRate) {
        //本位币汇率
        var baseCurrencyRate = this.baseCurrencyRate;
      }
      if (this.invoiceQty) {
        var invoiceQty = this.invoiceQty; //开票数量
      }
      let data = {
        pageNum: this.pageNum,
        sort: this.sort,
        pageSize: this.pageSize,
        companyCode: companyCode, //公司
        bbBranchBaseList: branchCode, //部门
        bbCustomerBaseList: custId, //销售客户
        soType: soType, //销售类型
        extInvoiceCode: extInvoiceCode, //发票外部编号
        currencyCode: currencyCode, //业务币别
        baseCurrencyRate: baseCurrencyRate, //本位币汇率
        invoiceStatusList: invoiceStatus, //发票状态
        invoiceType: invoiceType, //发票类型
        invoiceCode: invoiceCode, //发票单据号
        soExtNo: soExtNo, //外部合同号
        createdTimeBegain: createdTimeBegain,
        createdTimeEnd: createdTimeEnd, //创建时间
        invoiceDateBegain: invoiceDateBegain,
        invoiceDateEnd: invoiceDateEnd, //退货时间
        createdName: createdName, //创建人
        invoiceQty: invoiceQty, //开票数量
        order: "desc",
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        writeoffWarrantCode: this.writeoffWarrantCode, //冲销凭证号
        writeoffWarrantMonth: this.writeoffWarrantMonth, //冲销期间
        soContractNo: this.soContractNo,
        doNo: this.doNo,
      };
      let params = data;
      params.company = this.company;
      params.branch = this.branch;
      params.departmentList = this.departmentList;
      params.customer = this.customer;
      params.customerList = this.customerList;
      params.currencyName = this.currencyName;
      //存查询条件
      this.$setQueryData(this, params);
      sApi
        .selectListExtInvoice(data)
        .then((res) => {
          if ((res.code = "success")) {
            let list = res.data.list;
            this.total = res.data.total;
            let _this = this;
            _this.$nextTick(() => {
              list.forEach((item) => {
                //转换列表中的销售类型，单据状态
                item.createdTime = _this.$timeFun(item.createdTime, true);
                item.updatedTime = _this.$timeFun(item.updatedTime, true);
                item.invoiceDate = _this.$timeFun(item.invoiceDate, true);
                item.auditDate = _this.$timeFun(item.auditDate, true);
                item.invoiceStatus = "" + item.invoiceStatus;
                _this.invoiceStatusList.forEach((item2) => {
                  if (item.invoiceStatus == item2.dict_code) {
                    item.invoiceStatusName = item2.dict_value;
                  }
                });
                _this.invoiceTypeList.forEach((item3) => {
                  if (item.invoiceType == item3.dict_code) {
                    item.invoiceTypeName = item3.dict_value;
                  }
                });
              });
            });
            this.tableData = list;
            this.loading = false;
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.message,
              type: "error",
            });
            this.loading = false;
          }
        })
        .catch();
    },

     //获取总计
    getSum() {
       if (this.invoiceDate && this.invoiceDate.length) {
        var invoiceDateBegain = this.invoiceDate[0]; //发票日期
        var invoiceDateEnd = this.invoiceDate[1];
      }
      if (this.createdTime && this.createdTime.length) {
        var createdTimeBegain = this.createdTime[0]; //创建时间
        var createdTimeEnd = this.createdTime[1];
      }
      if (this.company) {
        var companyCode = this.company.companyCode; //公司
      }
      if (this.branch) {
        var branchCode = this.branch; //部门
      }
      if (this.currencyName) {
        var currencyCode = this.currencyName.currencyCode; //业务币别
      }
      if (this.customer) {
        var custId = this.customer; //销售客户
      }

      if (this.soType) {
        var soType = this.soType; //销售类型
      }
      if (this.invoiceType) {
        var invoiceType = this.invoiceType; //发票类型
      }
      if (this.invoiceStatus) {
        var invoiceStatus = this.invoiceStatus; //状态
      }
      if (this.invoiceCode) {
        var invoiceCode = this.invoiceCode; //发票单据号
      }
      if (this.soExtNo) {
        var soExtNo = this.soExtNo; //外部合同号
      }
      if (this.createdName) {
        var createdName = this.createdName; //创建人
      }
      if (this.extInvoiceCode) {
        //发票外部编号
        var extInvoiceCode = this.extInvoiceCode;
      }
      if (this.baseCurrencyRate) {
        //本位币汇率
        var baseCurrencyRate = this.baseCurrencyRate;
      }
      if (this.invoiceQty) {
        var invoiceQty = this.invoiceQty; //开票数量
      }
      let data = {
        pageNum: this.pageNum,
        sort: this.sort,
        pageSize: this.pageSize,
        companyCode: companyCode, //公司
        bbBranchBaseList: branchCode, //部门
        bbCustomerBaseList: custId, //销售客户
        soType: soType, //销售类型
        extInvoiceCode: extInvoiceCode, //发票外部编号
        currencyCode: currencyCode, //业务币别
        baseCurrencyRate: baseCurrencyRate, //本位币汇率
        invoiceStatusList: invoiceStatus, //发票状态
        invoiceType: invoiceType, //发票类型
        invoiceCode: invoiceCode, //发票单据号
        soExtNo: soExtNo, //外部合同号
        createdTimeBegain: createdTimeBegain,
        createdTimeEnd: createdTimeEnd, //创建时间
        invoiceDateBegain: invoiceDateBegain,
        invoiceDateEnd: invoiceDateEnd, //退货时间
        createdName: createdName, //创建人
        invoiceQty: invoiceQty, //开票数量
        order: "desc",
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        writeoffWarrantCode: this.writeoffWarrantCode, //冲销凭证号
        writeoffWarrantMonth: this.writeoffWarrantMonth, //冲销期间
        soContractNo: this.soContractNo,
        doNo: this.doNo,
      };
      sApi
        .selectListExtInvoiceSumV2(data)
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
        if (["invoiceQty", "invoiceAmtVat","costAmt","baseAmt"].findIndex((it) => it == key) !== -1) {
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
    //获取销售类型
    getSoTypeList() {
      let data = {
        dictNo: 1015,
      };
      sApi
        .selectDoStatusList(data)
        .then((res) => {
          this.soTypeList = res.data;
        })
        .catch();
    },
    //获取状态
    getInvoiceStatusList() {
      let data = {
        dictNo: 1071,
      };
      sApi
        .selectDoStatusList(data)
        .then((res) => {
          this.invoiceStatusList = res.data;
          this.queryData();
        })
        .catch();
    },
    //获取发票类型
    getInvoiceTypeList() {
      let data = {
        dictNo: 1070,
        bizCategory: 0,
      };
      sApi
        .selectDoStatusList(data)
        .then((res) => {
          this.invoiceTypeList = res.data;
        })
        .catch();
    },

    //创建下拉
    handleCommand(invoiceType) {
      //1蓝字发票，2退货发票
      this.$router.push({
        //核心语句
        path: "/index/salesManage/salesInvoiceEdit", //跳转的路径
        query: {
          type: 1, //创建
          invoiceType: invoiceType, //发票类型
        },
      });
    },
    //重置
    resetData() {
      (this.departmentList = []),
        (this.customerList = []),
        (this.branchNameStr = []),
        (this.pageNum = 1);
      this.company = {}; //公司
      this.companyCode = "";
      this.branch = []; //部门
      this.branchCode = "";
      this.customer = []; //销售客户
      this.custId = "";
      this.currencyCode = "";
      this.currencyName = {}; //业务币别
      this.invoiceType = ""; //发票类型
      this.invoiceStatus = []; //发票类型
      this.soType = ""; //销售类型
      this.invoiceQty = ""; //发票数量
      this.extInvoiceCode = ""; //发票外部编号
      this.baseCurrencyRate = ""; //本位币汇率
      this.invoiceCode = ""; //发票单据号
      this.soExtNo = ""; //外部合同号
      this.createdTime = []; //创建时间
      this.invoiceDate = []; //发票日期
      this.createdName = ""; //创建人
      this.warrantCode = ""; //凭证号
      this.warrantMonth = ""; //期间
      this.writeoffWarrantCode = ""; //冲销凭证号
      this.writeoffWarrantMonth = ""; //冲销期间
      this.soContractNo = "";
      this.doNo = "";
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
      this.company = e;
      this.companyCode = e.companyCode;
      this.branch = [];
    },
    //部门弹窗打开
    departmentTip() {
      // if (JSON.stringify(this.company) === "{}") {
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
      this.branchCode = e.branchCode;
      let branchNameStr = [];
      e.forEach((item) => {
        branchNameStr.push(item.branchName);
      });
      this.departmentList = e;
      this.branchNameStr = branchNameStr;
    },
    //弹窗打开
    manTip() {
      this.manShow = true;
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
      this.customer = e;
      this.custId = e.customerId;
      this.customerList = e;
    },
    //业务币别弹窗
    coinTips() {
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
      this.currencyName = e;
      this.currencyCode = e.currencyCode;
    },
    //税金科目
    accountTips() {
      this.subjectShow = true;
    },
    subjectSure(e) {
      if (e) {
        this.accountName = e;
        let nameL1 = this.accountName.nameL1;
        this.accountName.accountCode = nameL1.substring(0, nameL1.indexOf(" "));
      }
      this.subjectShow = false;
    },
    subjectCancle() {
      this.subjectShow = false;
    },
    //查看
    handleDetails(type) {
      //2修改 3查看
      localStorage.removeItem("invoiceId");
      let url = "";
      if (this.selectioned.length == 1) {
        if (type == 2) {
          //修改
          let flag = false;
          if (
            this.selectioned[0].invoiceStatus != "10710005" &&
            this.selectioned[0].invoiceStatus != "10710020"
          ) {
            this.$openWarning("当前状态不可以修改");
            return;
          }
          url = "/index/salesManage/salesInvoiceEdit";
        } else {
          if (type == 4 && this.selectioned[0].invoiceStatus != "10710013") {
            this.$openWarning("当前状态不可以操作");
            return;
          }
          url = "/index/salesManage/salesInvoiceDetail";
        }
      } else if (this.selectioned.length > 1) {
        this.$openWarning("此选项不能批量操作");
        return;
      } else {
        this.$openWarning("未选择数据");
        return;
      }
      localStorage.setItem("invoiceId", this.selectioned[0].invoiceId);
      this.$router.push({
        //核心语句
        path: url, //跳转的路径
        query: {
          type: type,
          invoiceType: this.selectioned[0].invoiceType,
        },
      });
    },
    //删除
    deleteSaleOutboundOrder() {
      if (!this.selectioned.length) {
        //判断是否选中
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning",
        });
        return;
      } else {
        //保存、已驳回的状态可以进行删除
        //if(this.selectioned.invoiceStatus=="" || this.selectioned.invoiceStatus==""){
        var flag = false;
        this.selectioned.forEach((ele) => {
          if (
            ele.invoiceStatus != "10710005" &&
            ele.invoiceStatus != "10710020"
          ) {
            flag = true;
            return;
          }
        });
        if (flag) {
          this.$openWarning("只能删除保存和已驳回的数据");
          return;
        }
        let data = this.selectioned;
        this.$confirm("是否确定删除?", "删除提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            sApi
              .deleteSaleInvoice(data)
              .then((res) => {
                if (res.code == "success") {
                  this.$openSuccess(res.message);
                  this.queryData();
                } else {
                  this.$openWarning(res.message);
                }
              })
              .catch();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
      }
    },
    //审核
    handleToExamine() {
      //1通过 2驳回
      this.examineValue = ""; //通过，驳回
      this.rejectReason = ""; //驳回原因
      this.examineDate = ""; //日期
      this.accountName = {}; //税金科目
      if (this.selectioned.length == 0) {
        //判断是否选中
        this.$openWarning("未选择数据");
        return;
      }
      if (this.selectioned.length > 1) {
        this.examineOne = false; //是否是多条
      } else {
        this.accountPeriod(this.selectioned[0].companyId, 1);
        this.examineDate = this.selectioned[0].accountDay; //默认当前数据的出库日期
        //税金科目
        if (
          this.selectioned[0].accountCode &&
          this.selectioned[0].accountName
        ) {
          this.accountName.nameL1 =
            this.selectioned[0].accountCode +
            " " +
            this.selectioned[0].accountName;
          this.accountName.accountCode = this.selectioned[0].accountCode;
        }
        this.examineOne = true; //是否是多条
      }
      this.examineStatus = true;
      this.examineShow = true; //审核弹窗
    },
    //月结
    accountPeriod(companyId, type) {
      let data = {
        companyId: companyId,
      };
      sApi
        .getAccountPeriodByCompany(data)
        .then((res) => {
          if (res.code == "success") {
            this.$nextTick(() => {
              if (type == 2) {
                let d = new Date(this.unDate);
                let t = d.getTime(d); // 方法1
                if (res.data.begindate < t && t < res.data.enddate) {
                  this.writeOffFlag = true;
                } else {
                  this.writeOffFlag = false;
                }
              }
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
        })
        .catch();
    },
    //审核下拉选中的值
    examineSelect(e) {
      this.examineValue = e; //审核选中的值
      if (this.examineValue) {
        this.examineStatus = false;
      } else {
        this.examineStatus = true;
      }
    },
    //取消
    examineCancle() {
      this.examineShow = false; //审核弹窗
      this.examineValue = ""; ////审核选中的值
      this.examineDate = ""; //审核中的出库日期
      this.accountName = {}; //税金科目
      this.examineStatus = true;
    },
    //确定
    examineSure() {
      if (this.examineValue == "pass" && this.examineOne && !this.examineDate) {
        this.$openWarning("请选择记账日期");
        return;
      } else if (
        this.examineValue == "pass" &&
        JSON.stringify(this.accountName) == "{}"
      ) {
        this.$openWarning("请选择税金科目");
        return;
      } else if (this.examineValue == "reject") {
        let th = this;
        this.selectioned.forEach((el) => {
          el.auditInfo = th.rejectReason;
        });
      }
      let that = this;
      this.selectioned.forEach((el) => {
        el.operationType = that.examineValue;
        if (el.operationType == "pass") {
          el.accountDay = that.examineDate;
          el.accountCode = that.accountName.accountCode;
          let nameL1 = that.accountName.nameL1;
          el.accountName = nameL1.substring(nameL1.indexOf(" "));
        }
      });
      let data = this.selectioned;
      sApi
        .operateSaleInvoiceStatus(data)
        .then((res) => {
          if (res.code == "success") {
            this.$openSuccess(res.message);
            this.examineShow = false;
            this.queryData();
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
    //提交submit，通过pass，驳回reject，
    changeStatus(type) {
      if (!this.selectioned.length) {
        //判断是否选中
        this.$openWarning("未选择数据");
        return;
      }
      var flag = false;
      this.selectioned.forEach((ele) => {
        if (
          ele.invoiceStatus != "10710005" &&
          ele.invoiceStatus != "10710020"
        ) {
          flag = true;
          return;
        }
      });
      if (flag) {
        this.$openWarning("只能提交保存和已驳回状态的数据");
        return;
      }
      let tips = type == "submit" ? "是否确定提交？" : "是否确定冲销？";
      this.$confirm(tips, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.selectioned.forEach((el) => {
            el.operationType = type;
          });
          let data = this.selectioned;
          sApi
            .operateSaleInvoiceStatus(data)
            .then((res) => {
              if (res.code == "success") {
                this.$openSuccess(res.message);
                this.queryData();
              } else {
                this.$openWarning(res.message);
              }
            })
            .catch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    //开票申请
    invoiceApplication() {
      if (this.selectioned.length == 0) {
        this.$openWarning("未选择数据");
      } else if (this.selectioned.length == 1) {
        if (
          this.selectioned[0].invoiceType == 10700005 &&
          (this.selectioned[0].invoiceStatus == "10710013" ||
            this.selectioned[0].invoiceStatus == "10710015")
        ) {
          let Logistics = this.$router.resolve({
            name: "invoiceApplicationForm",
          });
          sessionStorage.setItem("invoId", this.selectioned[0].invoiceId);
          window.open(Logistics.href, "_blank");
        } else {
          this.$openWarning("已审核或者已过帐的`标准发票`才能申请开票");
        }
      } else {
        this.$openWarning("此选项不能批量操作");
      }
    },
    //writeOff
    writeOff() {
      var flag = false;
      this.selectioned.forEach((ele) => {
        if (ele.invoiceStatus != "10710015") {
          flag = true;
          return;
        }
      });
      if (flag) {
        this.$openWarning("只能冲销已过帐的数据");
        return;
      }
      this.unDate = this.$nowDate(); //默认当前日期
      this.accountPeriod(this.selectioned[0].companyId, 2);
      this.writeOffShow = true;
    },
    //改变冲销日期，去判断范围
    changeDate() {
      this.accountPeriod(this.selectioned[0].companyId, 2);
    },
    //冲销
    writeOffSure() {
      //this.accountPeriod(this.selectioned[0].companyId,2);
      if (this.unDate == "" || this.unDate == null) {
        this.$openWarning("请选择冲销日期");
        return;
      } else if (!this.writeOffFlag) {
        this.$openWarning("日期范围需要在当前期间");
        this.writeOffShow = true;
        return;
      }
      let that = this;
      this.selectioned.forEach((e) => {
        (e.unDate = that.unDate),
          (e.unReason = that.unReason),
          (e.operationType = "cancel");
      });
      let data = this.selectioned;
      sApi
        .operateSaleInvoiceStatus(data)
        .then((res) => {
          if (res.code == "success") {
            this.$openSuccess(res.message);
            this.unDate = ""; //默认当前日期
            this.unReason = "";
            this.writeOffShow = false;
            this.queryData();
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
    //冲销
    writeOffCancle() {
      this.unDate = ""; //默认当前日期
      this.unReason = "";
      this.writeOffShow = false;
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.initData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.initData();
    },
    //表格选择
    handleChange(e) {
      this.selectioned = e;
    },
    inputShow() {
      this.show = this.$showOne(this.show);
    },
    //表格单选
    dialogCheck(selection, row) {
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectioned.push(row);
        let index = this.tableData.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    rowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
  },

  components: {
    componySelect,
    departmentSelect,
    customerSelect,
    coinSelect,
    staffSelect,
    contractSearch,
    editSearchItem,
    subjectFrame,
  },
};
</script>
<style scoped>
.index .salesInvoice .index-div3 label {
  width: 32%;
}
.index .salesInvoice .index-div3 .el-input,
.index .salesInvoice .index-div3 .el-input2,
.index .salesInvoice .index-div3 .el-select {
  width: 68%;
}
.index .el-button.is-disabled,
.index .el-button.is-disabled:focus,
.index .el-button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-color: #fff;
  border: 1px solid #ebeef5;
}
.index .examine-dialog .el-col {
  position: relative;
}
.examine-dialog .el-col .comicon {
  width: 70%;
  height: 20px;
  position: absolute;
  right: 13px;
  top: 2px;
  cursor: pointer;
  text-align: right;
  padding-right: 6px;
}
</style>
