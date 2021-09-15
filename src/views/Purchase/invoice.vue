<template>
  <div class="invoice content-div">
    <div class="button-div auto-sibling">
      <el-button class="query-button" icon="el-icon-search" @click="queryData"
        >查询</el-button
      >
      <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
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
      <el-form @keyup.enter.native="searchFun">
      <div class="search-div">
        <contract-search
          v-for="item in searchList"
          :label="item.label"
          :key="item.key"
          :checked="item.checked"
          :matchKey="item.key"
          :companyName="company"
          :branchName="branchName"
          :supplierName="supplierName"
          :invoiceType="invoiceType"
          :createdName="createdName"
          :blDate="blDate"
          :wvNo="wvNo"
          :updatedName="updatedName"
          :changeDate="changeDate"
          :auditBy="auditBy"
          :tsDate="tsDate"
          :invoiceCode="invoiceCode"
          :wvDate="wvDate"
          :externalPoNo="externalPoNo"
          :invoiceStatus="invoiceStatus"
          :erpPoNo="erpPoNo"
          :extInvoiceCode="extInvoiceCode"
          :warrantCode="warrantCode"
          :warrantMonth="warrantMonth"
          :writeoffWarrantCode="writeoffWarrantCode"
          :writeoffWarrantMonth="writeoffWarrantMonth"
          :blStatus="blStatus"
          :poType="poType"
          :componyTip="componyTip"
          :departmentTip="departmentTip"
          :supplierTip="supplierTip"
          :departmentList="departmentList"
          :supplierList="supplierList"
          @changeInput="changeData"
        />
      </div>
      </el-form>
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
      <!-- 选择供应商弹窗 -->
      <supplier-Select
        v-if="supplierShow"
        :tipShow="supplierShow"
        @supplierCancle="supplierCancle"
        @supplierSure="supplierSure"
      ></supplier-Select>
      <!-- 创建弹窗 -->
      <invoice-Add
        ref="invoiceAdd"
        v-if="invoiceShow"
        :tipShows="invoiceShow"
        :createForm="createForm"
        @invoiceCancle="invoiceCancle"
        @invoiceSure="invoiceSure"
      ></invoice-Add>
      <!-- 冲销窗口 -->
      <!-- <el-dialog title="提示"
                 :visible.sync="reverseShow"
                 width="50%">
        <div class="reverseBox">
          <label><span class="must-full">*</span> 冲销原因</label>
          <el-input v-model="unReason"
                    class="el-input2"
                    size="small"
                    placeholder="请输入"
                    type="textarea"></el-input>
          <label><span class="must-full">*</span> 冲销日期</label>
          <el-date-picker v-model="unDate"
                          type="date"
                          size="small"
                          class="el-input2">
          </el-date-picker>
        </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="reverseCancel">取 消</el-button>
          <el-button type="primary"
                     @click="reversePoInvoice">确 定</el-button>
        </span>
      </el-dialog> -->
      <!--冲销弹窗-->
      <el-dialog
        title="冲销"
        :visible.sync="reverseShow"
        :show-close="false"
        :before-close="reverseCancel"
        width="350px"
      >
        <div class="input-div" style="margin:15px 0;border:none">
          <el-col class="el-col" style="width:85%">
            <label class="text_too_long"
              ><span class="must-full">*</span> 冲销原因</label
            >
            <el-input v-model="unReason" class="el-inputs"></el-input>
          </el-col>
          <el-col class="el-col" style="width:85%">
            <label class="text_too_long"
              ><span class="must-full">*</span> 冲销日期</label
            >
            <el-date-picker
              v-model="unDate"
              type="date"
              class="el-selects"
              placeholder="冲销日期"
              :picker-options="reverseLimitTime"
            ></el-date-picker>
          </el-col>
        </div>
        <div style="text-align:center">
          <el-button
            icon="el-icon-check"
            size="mini"
            type="primary"
            @click="reversePoInvoice"
            >确认</el-button
          >
          <el-button icon="el-icon-close" size="mini" @click="reverseCancel"
            >取消</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!--按钮样式-->
    <div class="button-div auto-sibling">
      <el-dropdown
        szie="mini"
        @command="createInvoice"
        style="margin-left:10px;margin-right:10px;"
      >
        <el-button icon="el-icon-folder-add"
          >创建<i class="el-icon-arrow-down el-icon--right"></i
        ></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            command="1"
            icon="el-icon-warning-outline"
            v-if="$actionFlag(`F001`)"
            >红字发票</el-dropdown-item
          >
          <el-dropdown-item
            command="0"
            icon="el-icon-circle-check"
            v-if="$actionFlag(`F002`)"
            >蓝字发票</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        @click="reverseChange()"
        icon="el-icon-edit"
        v-if="$actionFlag(`F003`)"
        >修改</el-button
      >
      <el-button
        @click="delectReverse()"
        icon="el-icon-delete"
        v-if="$actionFlag(`F004`)"
        >删除</el-button
      >
      <el-button
        @click="reverseSee()"
        icon="el-icon-data-line"
        v-if="$actionFlag(`F005`)"
        >查看</el-button
      >
      <el-button
        @click="addSub"
        icon="el-icon-finished"
        v-if="$actionFlag(`F006`)"
        >提交</el-button
      >
      <el-button
        @click="isAllowExam"
        icon="el-icon-receiving"
        v-if="$actionFlag(`F007`)"
        >审核</el-button
      >
      <el-button
        @click="setUp()"
        icon="el-icon-document-delete"
        v-if="$actionFlag(`F008`)"
        >冲销</el-button
      >
      <el-button 
      icon="el-icon-thumb" 
      @click="goTree"
      v-if="$actionFlag(`F009`)"
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
        :data="tableData"
        class="el-table"
        ref="multipleTable"
        height="calc(100% - 35px)"
        @selection-change="handleChange"
        @row-dblclick="dblclick"
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
            <span v-if="item.key === 'poType'">
              <span v-for="(item, index) in contractType" :key="index">
                <span v-if="item.dict_code == scope.row.poType">
                  {{ item.dict_value }}
                </span>
              </span>
            </span>
            <span v-if="item.key === 'invoiceType'">
              <span
                v-show="scope.row.invoiceType == item.dict_code"
                v-for="item in poType"
                :key="item.dict_code"
                >{{ item.dict_value }}</span
              ></span>
            <span v-if="item.key === 'invoiceDate'">
              <span>{{ scope.row.invoiceDate | time }}</span>
            </span>
            <span v-if="item.key === 'invoiceStatus'">
              <span
                v-show="scope.row.invoiceStatus == item.dict_code"
                v-for="item in blStatus"
                :key="item.dict_code"
                >{{ item.dict_value }}</span
              >

            </span>
            <span v-if="item.key === 'createdTime'">{{ scope.row.createdTime | time }}</span>
            <span v-if="item.key === 'updatedTime'">{{ scope.row.updatedTime | time }}</span>
            <span v-if="item.key === 'auditDate'">{{ scope.row.auditDate | time }}</span>
            <span v-if="item.key === 'baseAmt'">{{ scope.row.baseAmt  | $moneyFormat }}</span>
            <span v-if="item.key === 'baseAmtExt'">{{ scope.row.baseAmtExt  | $moneyFormat }}</span>
            <span v-if="item.key === 'baseTaxAmt'">{{ scope.row.baseTaxAmt | $moneyFormat }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!--分页background-->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="currentChange"
        :current-page="pageNum"
        :page-sizes="[100, 200, 300, 500]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 审核弹窗 -->
    <el-dialog
      :visible.sync="examineShow"
      :show-close="false"
      title="审核"
      width="400px"
      class="popup_box"
    >
      <div class="examine-dialog">
        <p v-if="!examineOne && examineValue == '1'" class="tips">
          <i class="el-icon-info"></i>
          批量审核时入库时间以入库单中入库日期为准，请事先确认，谨慎操作！
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
          v-if="examineOne && examineValue == '1'"
          :span="24"
          class="el-col"
        >
          <label>过账日期</label>
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
        <el-col
          v-if="examineOne && examineValue == '1'"
          :span="24"
          class="el-col"
        >
          <label><span class="must-full">*</span>税金科目</label>
          <el-input
            v-model="accountData.accountName"
            class="el-inputs2"
            style="width:178px;"
            disabled
            size="small"
          >
            <i
              slot="suffix"
              style="cursor: pointer;"
              @click="accountTips"
              class="el-icon-search"
            ></i>
          </el-input>
        </el-col>
        <el-col v-if="examineValue == '2'" :span="24" class="el-col">
          <label style="vertical-align:top">驳回原因</label>
          <el-input
            type="textarea"
            autosize
            v-model="auditInfo"
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
          :disabled="isAllowedConfirm"
          v-if="$actionFlag(`F007`)"
          >确定</el-button
        >
        <el-button @click="examineCancle" icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
    <!--税金科目弹窗-->
    <subject-frame
      v-if="subjectShow"
      :tipShow="subjectShow"
      :longNumber="22210101"
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
</template>
<script>
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect2.vue";
import supplierSelect from "@/components/supplierSelect2.vue";
import invoiceAdd from "./invoiceAdd.vue";
import subjectFrame from "@//components/subjectFrame.vue"; //科目组件
import api from "@/api/ladingBill/ladingBill";
import CostApi from "@/api/costData/cost";
import {
  odPoInvoiceList,
  getInvoiceStatusList,
  deleteOdPoInvoice,
  submitApprove,
  approvePoInvoice,
  reversePoInvoice,
  odPoInvoiceListSumV2
} from "@/api/Purchase/invoice";
import contractSearch from "@/views/Purchase/component/contractSearch";
import editSearchItem from "@/components/editSearchItem";
import { getFilter, setFilter } from "@/mixins/editCondition";
import {exportData} from "@/mixins/export";

const AllSearch = [
  { key: "companyName", label: "公司", checked: true },
  { key: "branchName", label: "部门", checked: true },
  { key: "supplierName", label: "供应商", checked: true },
  { key: "externalPoNo", label: "外部合同号", checked: true },
  { key: "erpPoNo", label: "采购合同号", checked: true },
  { key: "invoiceType", label: "发票类别", checked: true },
  { key: "createdName", label: "创建人", checked: true },
  { key: "blDate", label: "创建日期", checked: true },
  { key: "updatedName", label: "修改人", checked: true },
  { key: "changeDate", label: "修改日期", checked: true },
  { key: "auditBy", label: "审核人", checked: true },
  { key: "tsDate", label: "审核时间", checked: true },
  { key: "invoiceCode", label: "系统单据号", checked: true },
  { key: "wvNo", label: "入库单号", checked: true },
  { key: "wvDate", label: "发票日期", checked: true },
  { key: "invoiceStatus", label: "单据状态", checked: true },
  { key: "extInvoiceCode", label: "外部发票号", checked: true },
  { key: "warrantCode", label: "凭证号", checked: true },
  { key: "warrantMonth", label: "期间", checked: true },
  { key: "writeoffWarrantCode", label: "冲销凭证号", checked: true },
  { key: "writeoffWarrantMonth", label: "冲销期间", checked: true },
]; //全部选项标签
const ALLHeader = [
  {
    label: "系统单据号",
    tooltip: true,
    key: "invoiceCode",
    checked: true,
    width: "120",
    sortable: true,
  },
  {
    label: "外部发票号",
    tooltip: true,
    key: "extInvoiceCode",
    checked: true,
    width: "120",
  },
  {
    label: "发票类别",
    tooltip: true,
    key: "invoiceType",
    checked: true,
    temp: true,
  },
  {
    label: "公司",
    tooltip: true,
    key: "companyName",
    checked: true,
    width: "120",
  },
  {
    label: "部门",
    tooltip: true,
    key: "orgName",
    checked: true,
    width: "120",
  },
  {
    label: "供应商",
    tooltip: true,
    key: "supplierName",
    checked: true,
    width: 200,
  },
  {
    label: "发票日期",
    tooltip: true,
    key: "invoiceDate",
    checked: true,
    temp: true,
    sortable: true,
  },
  {
    label: "状态",
    tooltip: true,
    key: "invoiceStatus",
    checked: true,
    temp: true,
  },
  {
    label: "发票含税金额",
    tooltip: true,
    key: "baseAmt",
    checked: true,
    width: 120,
    temp: true
  },
  {
    label: "发票不含税金额",
    tooltip: true,
    key: "baseAmtExt",
    checked: true,
    width: 120,
    temp: true
  },
  {
    label: "增值税额",
    tooltip: true,
    key: "baseTaxAmt",
    checked: true,
    width: 120,
    temp: true
  },
  { label: "凭证号", tooltip: true, key: "warrantCode", checked: true },
  {
    label: "期间",
    tooltip: true,
    key: "warrantMonth",
    checked: true,
    temp: true,
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
    width: "80",
  },
  {
    label: "创建时间",
    tooltip: true,
    key: "createdTime",
    checked: true,
    width: "150",
  },
  {
    label: "修改人",
    tooltip: true,
    key: "updatedName",
    checked: true,
    width: "80",
  },
  {
    label: "修改时间",
    tooltip: true,
    key: "updatedTime",
    checked: true,
    temp: true,
    width: "150",
  },
  {
    label: "审核人",
    tooltip: true,
    key: "auditBy",
    checked: true,
    width: "80",
  },
  {
    label: "审核时间",
    tooltip: true,
    key: "auditDate",
    checked: true,
    temp: true,
    width: "100",
  },
  { label: "备注", tooltip: true, key: "remark", checked: true },
]; //所有表头
export default {
  name: "invoice",
  data() {
    return {
      supplierList: [],
      branchNameStr: [],
      departmentList: [],
      sort: "",
      fixHead: [
        { type: "selection", key: "selection", checked: true },
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
      show: true,
      ztz: 0,
      company: {}, //公司名称
      branchName: [], //部门名称
      supplierName: [], //供应商
      erpPoNo: "", //采购合同号
      invoiceCode: "", //系统单据号
      createdName: "", //创建人
      updatedName: "", //修改人
      auditBy: "", //审核人
      externalPoNo: "", //外部合同号
      extInvoiceCode: "", //外部发票号
      blDate: [], //创建日期
      wvDate: [], //发票日期
      tsDate: [], //审核时间
      changeDate: [], //修改日期
      invoiceStatus: [], //单据状态
      cumentValue: "", //业务币币别
      invoiceType: [], //发票类型
      poType: [], //发票状态
      blStatus: "", //单据状态
      supplierShow: "", //供应商显示
      projectShow: "", //项目显示
      departmentShow: "", //部门显示
      componyShow: "", //公司显示
      loading: false, //表格loading
      tableData: [], //列表数据
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      examineShow: false, //审核弹窗
      isAllowedConfirm: true, //是否允许审核
      examineOne: true, //审核单条还是多条
      examineValue: "", //审核选中的值
      wvNo: "",
      reverseLimitTime: {}, //冲销时间
      examineList: [
        { value: "1", label: "通过" },
        { value: "2", label: "驳回" },
      ],
      examineDate: "", //审核弹窗里的出库日期
      auditInfo: "", //驳回原因
      shuijinkemu: "", //税金科目
      pickerOptions: {}, //时间范围
      total: 0, //总数目,
      invoiceShow: false,
      selectedIndex: null,
      selectioned: [],
      createForm: {
        isBilled: 0,
      },
      dialogVisible: false,
      reverseApproeShow: false,
      accountDay: "", //过账日期
      reverseShow: false, //冲销窗口
      unDate: null, //冲销日期
      unReason: "", //冲销原因
      subjectShow: false, //税金科目
      accountData: {}, //税金科目
      warrantCode: "", //凭证号
      warrantMonth: "", //期间
      writeoffWarrantCode: "", //冲销凭证号
      writeoffWarrantMonth: "", //冲销期间
      sumTol:{}
    };
  },
  mixins: [getFilter, setFilter,exportData],
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
      this.searchFun();
    }
    // data.branchName = this.branchName;
    //   data.departmentList = this.departmentList;
    //   data.supplier = this.supplierName;
    //   data.supplierList = this.supplierList;
    let data = this.$getQueryData(this);
    this.departmentList = data.branchName;
    this.supplierList = data.supplierName;
    this.invoiceStatus=data.invoiceStatusList;
    this.invoiceType=data.invoiceStatusList;
    if (data.updatedStartTime) {
      this.changeDate[0] = data.updatedStartTime;
      this.changeDate[1] = data.updatedEndTime;
    }
    if (data.createdStartTime) {
      this.blDate[0] = data.createdStartTime;
      this.blDate[1] = data.createdEndTime;
    }
    if (data.auditStartDate) {
      this.tsDate[0] = data.auditStartDate;
      this.tsDate[1] = data.auditEndDate;
    }
    if (data.invoiceStartDate) {
      this.wvDate[0] = data.invoiceStartDate;
      this.wvDate[1] = data.invoiceEndDate;
    }
    // this.tableData()
    this.initData();
    this.getFilter();
  },
  // activated () {
  //   this.clearNone();
  //   this.searchFun();
  // },
  methods: {
    queryData(){
      this.searchFun();
      this.getSum();
    },
    //查看生命树
    goTree(){
        if (this.selectioned.length === 1) {
        sessionStorage.setItem("bizCode", this.selectioned[0].invoiceCode);
        sessionStorage.setItem("bizType", "PO_INVOICE"); 
        this.$router.push({
          path:"/index/home/tree",
          query:{
            bizCode:this.selectioned[0].invoiceCode,
            bizType:"PO_INVOICE"
          }
        });
        let obj = {
        url: "treeModel",
        baseUrl: "",
        label: "生命树",
        moduleCode: "",
        params: {},
        query: {
          bizCode:this.selectioned[0].invoiceCode,
          bizType:"PO_INVOICE"
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

    cell({row, column, rowIndex, columnIndex}) {
    //第八列添加 red 类
        if(column.property=="baseAmt"  || column.property=="baseAmtExt" || column.property=="baseTaxAmt"){
        return 'rightTd'
        }else{
        return "";
        }
    },
    initData () {
      getInvoiceStatusList({ dictNo: 1070 }).then(res => {
        this.poType = res.data;
      });
      getInvoiceStatusList({ dictNo: 1081 }).then((res) => {
        this.blStatus = res.data;
      });
      this.queryData();
    },
    //查询数据
    searchFun() {
      if (this.changeDate && this.changeDate.length) {
        var updatedStartTime = this.changeDate[0];
        var updatedEndTime = this.changeDate[1];
      }
      if (this.blDate && this.blDate.length) {
        var createdStartTime = this.blDate[0];
        var createdEndTime = this.blDate[1];
      }
      if (this.tsDate && this.tsDate.length) {
        var auditStartDate = this.tsDate[0];
        var auditEndDate = this.tsDate[1];
      }
      if (this.wvDate && this.wvDate.length) {
        var invoiceStartDate = this.wvDate[0];
        var invoiceEndDate = this.wvDate[1];
      }
      this.loading = true;
      let subForm = {
        updatedStartTime: updatedStartTime,
        updatedEndTime: updatedEndTime,
        createdStartTime: createdStartTime,
        createdEndTime: createdEndTime,
        auditStartDate: auditStartDate,
        auditEndDate: auditEndDate,
        invoiceStartDate: invoiceStartDate,
        invoiceEndDate: invoiceEndDate,
        erpPoNo: this.erpPoNo,
        sort: this.sort,
        externalPoNo: this.externalPoNo,
        companyCode: this.company.companyCode,
        bbBranchBaseList: this.branchName,
        bbSupplierBaseList: this.supplierName,
        createdName: this.createdName,
        invoiceStatusList: this.invoiceStatus,
        invoiceTypeList: this.invoiceType,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        wvNo: this.wvNo,
        invoiceCode: this.invoiceCode,
        extInvoiceCode: this.extInvoiceCode,
        auditBy: this.auditBy,
        updatedName: this.updatedName,
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        writeoffWarrantCode: this.writeoffWarrantCode, //冲销凭证号
        writeoffWarrantMonth: this.writeoffWarrantMonth, //冲销期间
      };
      let data = subForm;
      data.company = this.company;
      data.branchName = this.branchName;
      data.supplierName = this.supplierName;
      this.$setQueryData(this, data);
      delete data.supplierName;
      odPoInvoiceList(subForm)
        .then((res) => {
          this.tableData = res.data;
          this.total = res.total;
          this.loading = false;
        })
        .catch((err) => {});
    },
     //获取总计
    getSum() {
      if (this.changeDate && this.changeDate.length) {
        var updatedStartTime = this.changeDate[0];
        var updatedEndTime = this.changeDate[1];
      }
      if (this.blDate && this.blDate.length) {
        var createdStartTime = this.blDate[0];
        var createdEndTime = this.blDate[1];
      }
      if (this.tsDate && this.tsDate.length) {
        var auditStartDate = this.tsDate[0];
        var auditEndDate = this.tsDate[1];
      }
      if (this.wvDate && this.wvDate.length) {
        var invoiceStartDate = this.wvDate[0];
        var invoiceEndDate = this.wvDate[1];
      }
      this.loading = true;
      let subForm = {
        updatedStartTime: updatedStartTime,
        updatedEndTime: updatedEndTime,
        createdStartTime: createdStartTime,
        createdEndTime: createdEndTime,
        auditStartDate: auditStartDate,
        auditEndDate: auditEndDate,
        invoiceStartDate: invoiceStartDate,
        invoiceEndDate: invoiceEndDate,
        erpPoNo: this.erpPoNo,
        sort: this.sort,
        externalPoNo: this.externalPoNo,
        companyCode: this.company.companyCode,
        bbBranchBaseList: this.branchName,
        bbSupplierBaseList: this.supplierName,
        createdName: this.createdName,
        invoiceStatusList: this.invoiceStatus,
        invoiceTypeList: this.invoiceType,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        wvNo: this.wvNo,
        invoiceCode: this.invoiceCode,
        extInvoiceCode: this.extInvoiceCode,
        auditBy: this.auditBy,
        updatedName: this.updatedName,
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        writeoffWarrantCode: this.writeoffWarrantCode, //冲销凭证号
        writeoffWarrantMonth: this.writeoffWarrantMonth, //冲销期间
      };
      odPoInvoiceListSumV2(subForm)
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
        }
        let key = column.property;
        if (
          ["baseAmt", "baseAmtExt", "baseTaxAmt"].findIndex(
            (it) => it == key
          ) !== -1
        ) {
          sums[index] =this.sumTol? this.$sumTolFormat(this.sumTol[key]):'';
        } else {
          sums[index] = "";
        }
      });
      this.$nextTick(() => {
        this.$refs.multipleTable.doLayout();
      });
      return sums;
    },
    inputShow() {
      this.show = this.$showOne(this.show);
    },
    //创建
    createInvoice(type) {
      // localStorage.removeItem("wvId");//移除所有的缓存数据
      let url = "";
      this.createForm.isBilled = 0;
      if (type == 1) {
        //红字
        localStorage.setItem("type", type);
        this.invoiceShow = true;
      } else if (type == 0) {
        //蓝字
        localStorage.setItem("type", type);
        this.invoiceShow = true;
      }
      this.$router.push({
        //核心语句
        path: url, //跳转的路径
        // query: { type: 2 }
      });
    },
    //创建确定
    invoiceSure(e) {
      this.invoiceShow = false;
      this.tableData = e[1];
    },
    //创建取消
    invoiceCancle() {
      this.invoiceShow = false;
    },
    //删除
    delectReverse() {
      if (this.selectioned.length == 0) {
        this.$openWarning("请选择数据");
      } else {
        if (
          this.selectioned[0].invoiceStatus == 10810005 ||
          this.selectioned[0].invoiceStatus == 10810025
        ) {
          this.$confirm("确定删除吗？", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            deleteOdPoInvoice(this.selectioned)
              .then((res) => {
                this.$openSuccess(res.data);
                this.queryData();
              })
              .catch(() => {});
          });
        } else {
          this.$openWarning('仅"保存"、"已驳回"状态发票可删除');
        }
      }
    },
    //查看
    reverseSee() {
      if (this.selectioned == null || this.selectioned.length != 1) {
        this.$openWarning("请选择一条数据查看");
      } else {
        this.$router.push({
          name: "invoiceCheck",
          params: {
            checkItem: this.selectioned[0],
          },
        });
      }
    },
    //提交
    addSub() {
      if (this.selectioned == null || this.selectioned.length < 1) {
        this.$openWarning("请选择数据");
      } else {
        let flag = true;
        this.selectioned.map((item, index) => {
          if (
            item.invoiceStatus != 10810005 &&
            item.invoiceStatus != 10810025
          ) {
            flag = false;
          }
        });
        if (flag) {
          this.$confirm("确定提交吗？", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            submitApprove(this.selectioned)
              .then((res) => {
                this.$openSuccess(res.data);
                this.queryData();
              })
              .catch(() => {});
          });
        } else {
          this.$openWarning('仅"保存"、"已驳回"状态发票可提交');
        }
      }
    },
    //冲销
    setUp() {
      let flag = true;
      this.selectioned.map((item) => {
        if (item.invoiceStatus != 10810015) {
          flag = false;
        }
      });

      if (flag) {
        CostApi.limitTimeQuery({
          companyId: this.selectioned[0].companyId,
        })
          .then((res) => {
            this.reverseLimitTime = {
              disabledDate(time) {
                return (
                  time.getTime() < res.data.begindate ||
                  time.getTime() > res.data.enddate
                );
              },
            };
          })
          .catch((err) => {});
        this.reverseShow = true;
      } else {
        this.$openWarning('仅"已审核"状态发票可冲销');
      }
    },
    //取消冲销
    reverseCancel() {
      this.reverseShow = false;
      this.unReason = "";
      this.unDate = "";
    },
    reversePoInvoice() {
      if (this.unReason == "") {
        this.$openWarning("请填写冲销原因");
      } else if (this.unDate == null) {
        this.$openWarning("请填写冲销日期");
      } else {
        this.selectioned.map((item) => {
          item.unDate = this.unDate;
          item.unReason = this.unReason;
        });
        reversePoInvoice(this.selectioned)
          .then((res) => {
            this.reverseShow = false;
            this.unDate = "";
            this.$openSuccess("冲销成功");
            this.queryData();
          })
          .catch(() => {});
      }
    },
    //税金科目打开
    accountTips() {
      this.subjectShow = true;
    },
    //税金科目确认
    subjectSure(e) {
      if (e) {
        this.accountData = e;
        this.accountData.accountName = this.accountData.nameL1;
        this.accountData.accountCode = this.accountData.number;
        // let nameL1 = this.accountData.nameL1;
        // this.accountData.accountCode = nameL1.substring(0, nameL1.indexOf(' '));
      }
      this.subjectShow = false;
    },
    //税金科目取消
    subjectCancle() {
      this.subjectShow = false;
    },
    //修改
    reverseChange() {
      if (this.selectioned == null || this.selectioned.length != 1) {
        this.$openWarning("请选择一条数据修改");
      } else {
        if (
          this.selectioned[0].invoiceStatus == 10810005 ||
          this.selectioned[0].invoiceStatus == 10810025
        ) {
          this.$router.push({
            name: "invoiceDetails",
            params: { modifyData: this.selectioned[0] },
          });
        } else {
          this.$openWarning('仅"保存"、"已驳回"状态发票可修改');
        }
      }
    },
    isAllowExam() {
      if (this.selectioned == null || this.selectioned.length == 0) {
        this.$openWarning("请选择数据");
      } else {
        // this./////
        let flag = true;
        this.selectioned.map((item, index) => {
          if (item.invoiceStatus != 10810010) {
            flag = false;
          }
        });
        if (flag) {
          this.accountPeriod(this.selectioned[0].companyId);
          if (this.selectioned.length == 1) {
            this.accountData.accountName = this.selectioned[0].accountName;
            this.accountData.accountCode = this.selectioned[0].accountCode; //单条审核时取选中条的信息
            this.examineDate = this.selectioned[0].accountDay;
            this.examineShow = true;
          } else {
            this.$confirm(
              "批量审核，过账时间将取单据过账时间，如单据无该时间，则取审核时间,是否确认？",
              {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
              }
            ).then((res) => {
              this.accountData.accountName = "";
              this.accountData.accountCode = "";
              this.examineDate = "";
              this.examineShow = true;
            });
          }
        } else {
          this.$openWarning('仅"审核中"状态发票可审核');
        }
      }
    },
    //月结
    accountPeriod(companyId) {
      let data = {
        companyId: companyId,
      };
      api
        .getAccountPeriodByCompany(data)
        .then((res) => {
          if (res.code == "success") {
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
        })
        .catch();
    },
    // 审核
    examineSure() {
      if (this.examineValue == "1" && this.examineOne && !this.examineDate) {
        this.examineShow = true;
        this.$openWarning("请选择入库日期");
        return;
      } else if (
        this.examineValue == "1" &&
        this.examineOne &&
        this.examineDate
      ) {
        this.selectioned[0].accountDay = this.examineDate;
        // this.selectioned[0].accountDay = this.accountDay;
      } else if (this.examineValue == "2") {
        //
      } else {
        this.examineDate = "";
      }
      if (
        this.examineValue == "1" &&
        (this.accountData.accountName == null ||
          this.accountData.accountName == "")
      ) {
        this.examineShow = true;
        this.$openWarning("请选择税金科目");
        return;
      }
      this.selectioned.map((item, index) => {
        if (this.examineValue == 1) {
          //通过
          (item.approveStatus = 1),
            (item.accountDay = this.examineDate),
            (item.accountName = this.accountData.accountName),
            (item.accountCode = this.accountData.accountCode);
        } else {
          //驳回
          (item.approveStatus = 2),
            (item.auditInfo = this.auditInfo),
            (item.accountName = this.accountData.accountName),
            (item.accountCode = this.accountData.accountCode);
        }
      });
      approvePoInvoice(this.selectioned)
        .then((res) => {
          this.$openSuccess("操作成功！");
          this.examineShow = false;
          this.examineValue = "";
          this.examineDate = "";
          this.auditInfo = "";
          this.shuijinkemu = "";
          this.accountData = {};
          this.queryData();
        })
        .catch(() => {});
    },
    //取消
    examineCancle() {
      this.examineShow = false; //审核弹窗
      this.examineValue = ""; ////审核选中的值
      this.examineDate = ""; //审核中的出库日期
      this.shuijinkemu = "";
    },
    //审核下拉选中的值
    examineSelect(e) {
      this.isAllowedConfirm = false;
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
      this.createForm.companyName = e.companyName;
      this.createForm.companyCode = e.companyCode;
      this.company = e;
      this.branchName = [];
    },
    //部门弹窗打开
    departmentTip() {
      // if (this.company.companyName == undefined) {
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
      this.createForm.branchName = e.branchName;
      this.createForm.branchCode = e.branchCode;
      this.branchName = e;
      let branchNameStr = [];
      e.forEach((item) => {
        branchNameStr.push(item.branchName);
      });
      this.departmentList = e;
      this.branchNameStr = branchNameStr;
    },
    //部门弹窗打开
    manTip() {
      this.manShow = true;
    },
    //部门弹窗关闭
    manCancle() {
      this.manShow = false;
    },
    //部门弹窗确定获取数据
    manSure(e) {
      this.manShow = false;
      this.manName = e;
    },
    //供应商弹窗打开
    supplierTip() {
      this.supplierShow = true;
    },
    //供应商弹窗关闭
    supplierCancle() {
      this.supplierShow = false;
    },
    //供应商确认获取数据
    supplierSure(e) {
      this.supplierShow = false;
      this.createForm.supplierCode = e.supplierCode;
      this.createForm.supplierName = e.supplierName;
      this.supplierName = e;
      this.supplierList = e;
    },
    //单行双击
    dblclick(e) {
      this.$set(this.tableData, this.tableData.indexOf(e), e);
      if (this.selectioned.length == 1) {
        this.selectedIndex = this.tableData.indexOf(e[0]);
        this.reverseSee();
      }
    },
    //单行点击
    rowClick(e) {
      this.$refs.multipleTable.toggleRowSelection(e);
      if (this.selectioned.length == 1) {
        this.selectedIndex = this.tableData.indexOf(e[0]);
      }
    },
    //表格选择
    handleChange(e) {
      if (e.length === 0) {
        this.selectioned = null;
      } else {
        this.selectioned = e;
      }
    },
    handleDataSelect(selection, row) {
      this.selectioned = selection;
      if (selection.length == 1) {
        this.selectedIndex = this.tableData.indexOf(selection[0]);
      } else if (selection.length == 0) {
        this.selectioned = [];
      }
    },
    handleDataSelectAll(selection) {
      this.selectioned = selection;
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.clearNone();
      this.searchFun();
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.clearNone();
      this.searchFun();
    },
    //重置
    clearNone() {
      this.company = {};
      this.branchName = [];
      this.departmentList = [];
      this.supplierName = [];
      this.supplierList = [];
      this.invoiceType = [];
      this.createdName = "";
      this.wvNo = "";
      this.blDate = [];
      this.updatedName = "";
      this.changeDate = [];
      this.warrantCode = "";
      this.auditBy = "";
      this.tsDate = [];
      this.invoiceCode = "";
      this.wvDate = [];
      this.externalPoNo = "";
      this.invoiceStatus = [];
      this.erpPoNo = "";
      this.extInvoiceCode = "";
      this.warrantCode = ""; //凭证号
      this.warrantMonth = ""; //期间
      this.writeoffWarrantCode = ""; //冲销凭证号
      this.writeoffWarrantMonth = ""; //冲销期间
    },
  },
  components: {
    componySelect,
    departmentSelect,
    supplierSelect,
    invoiceAdd,
    contractSearch,
    editSearchItem,
    subjectFrame,
  },
};
</script>
<style scoped lang="scss">
.reverseBox {
  padding: 10px;
  height: 150px;
  .el-input2 {
    width: auto;
  }
  label {
    margin-left: 10px;
    width: auto;
  }
}
.index .el-button.is-disabled,
.index .el-button.is-disabled:focus,
.index .el-button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-color: #fff;
  border: 1px solid #ebeef5;
}
</style>
