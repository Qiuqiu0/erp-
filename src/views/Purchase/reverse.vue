<template>
  <div class="reverse content-div">
    <div class="button-div auto-sibling">
      <el-button
        class="query-button"
        icon="el-icon-search"
        @click="queryData"
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
      <el-form @keyup.enter.native="tableDataList">
      <div class="search-div">
        <contract-search
          v-for="item in searchList"
          :label="item.label"
          :key="item.key"
          :checked="item.checked"
          :matchKey="item.key"
          :companyName="company"
          :branchName="branchName"
          :unwvNo="unwvNo"
          :wvNo="wvNo"
          :supplierName="supplierName"
          :externalPoNo="externalPoNo"
          :project="project"
          :createdTime="createdTime"
          :unwvDate="unwvDate"
          :currency="currency"
          :baseCurrencyRate="baseCurrencyRate"
          :warrantCode="warrantCode"
          :warrantMonth="warrantMonth"
          :blStatus="blStatus"
          :erpPoNo="erpPoNo"
          :unwvType ="unwvType"
          :unwvTypeList="unwvTypeList"
          :componyTip="componyTip"
          :coinTip="coinTip"
          :projectTip="projectTip"
          :departmentTip="departmentTip"
          :supplierTip="supplierTip"
          :documentValue="documentValue"
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
      <!-- 选择项目弹窗 -->
      <project-select
        v-if="projectShow"
        :tipShow="projectShow"
        @projectCancle="projectCancle"
        @projectSure="projectSure"
      ></project-select>
      <!-- 创建弹窗 -->
      <reverse-Add
        v-if="reverseShow"
        :tipShow="reverseShow"
        @reverseCancle="reverseCancle"
        @reverseSure="reverseSure"
      ></reverse-Add>

      <!--审核弹窗 开始-->
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
            <label>退货日期</label>
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
            >确定</el-button
          >
          <el-button @click="examineCancle" icon="el-icon-close"
            >取消</el-button
          >
        </div>
      </el-dialog>
      <!--审核弹窗 结束-->
    </div>
    <!--   自定义搜索选项-->
    <edit-search-item
      v-if="editPage"
      :list="editList"
      :title="editKey==='searchList'?'自定义搜索条件':'自定义表格排序'"
      :editPage="editPage"
      @editCancel="editCancel"
      @editSure="editSure"
    ></edit-search-item>
    <!-- 表格 -->
    <!--按钮样式-->
    <div class="button-div auto-sibling">
      <el-button
        class="query-button"
        @click="creact()"
        v-if="$actionFlag(`F001`)"
        icon="el-icon-folder-add"
        >创建</el-button
      >
      <el-button
        @click="reverseChange()"
        v-if="$actionFlag(`F002`)"
        icon="el-icon-edit"
        >修改</el-button
      >
      <el-button
        @click="delectReverse(0)"
        v-if="$actionFlag(`F003`)"
        icon="el-icon-delete"
        >删除</el-button
      >
      <el-button
        @click="reverseSee(1)"
        v-if="$actionFlag(`F004`)"
        icon="el-icon-data-line"
        >查看</el-button
      >
      <el-button
        @click="addSub"
        v-if="$actionFlag(`F005`)"
        icon="el-icon-finished"
        >提交</el-button
      >
      <el-button
        @click="toExamine"
        v-if="$actionFlag(`F008`)"
        icon="el-icon-receiving"
        >审核</el-button
      >
      <el-button
        @click="exportTable"
        v-if="$actionFlag(`F007`)"
        icon="el-icon-download"
        >导出</el-button
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
        @row-click="rowClick"
        @sort-change="tableSortChange"
        :cell-class-name="cell"
        show-summary
        :summary-method="getSummaries"
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
            <span v-if="item.key === 'unwvStatus'">
              <span v-if="scope.row.unwvStatus == 10800005">已保存</span>
              <span v-else-if="scope.row.unwvStatus == 10800010">审核中</span>
              <span v-else-if="scope.row.unwvStatus == 10800015">已审核</span>
              <span v-else-if="scope.row.unwvStatus == 10800020">已驳回</span>
            </span>
             <span v-if="item.key === 'originAmtVatS'">{{ scope.row.originAmtVatS| $moneyFormat }}</span>
            <span v-if="item.key === 'unwvQtyS'">{{ $numberToFixed(scope.row.unwvQtyS, 3) }}</span>
            <span v-if="item.key === 'secUnwvQtyS'">{{ $numberToFixed(scope.row.secUnwvQtyS, 3) }}</span>
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
    <!-- 选择币种弹窗 -->
    <coin-select
      v-if="coinShow"
      :tipShow="coinShow"
      @coinCancle="coinCancle"
      @coinSure="coinSure"
    ></coin-select>
  </div>
</template>
<script>
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect2.vue";
import supplierSelect from "@/components/supplierSelect2.vue";
import projectSelect from "@/components/projectSelect.vue";
import reverseAdd from "./reverseAdd.vue";
import coinSelect from "@/components/coinSelect.vue"; //币别
import apiReverse from "@/api/reverseInvoice/reverseInvoice";
import api from "@/api/ladingBill/ladingBill";
import contractSearch from "@/views/Purchase/component/contractSearch";
import editSearchItem from "@/components/editSearchItem";
import {getFilter, setFilter} from "@/mixins/editCondition";
import {exportData} from "@/mixins/export";


const AllSearch = [
  { key: "companyName", label: "公司", checked: true },
  { key: "branchName", label: "部门", checked: true },
  { key: "supplierName", label: "供应商", checked: true },
  { key: "erpPoNo", label: "采购合同号", checked: true },
  { key: "externalPoNo", label: "外部合同号", checked: true },
  { key: "unwvNo", label: "退货单号", checked: true },
  { key: "wvNo", label: "入库单号", checked: true },
  { key: "projectCode", label: "项目号", checked: true },
  { key: "projectName", label: "项目名称", checked: true },
  { key: "createdTime", label: "创建日期", checked: true },
  { key: "unwvDate", label: "退货日期", checked: true },
  { key: "currencyName", label: "业务币币别", checked: true },
  { key: "baseCurrencyRate", label: "本位币汇率", checked: true },
  { key: "documentValue", label: "单据状态", checked: true },
  { key: "unwvType", label: "退货类型", checked: true },
  { key: "warrantCode", label: "凭证号", checked: true },
  { key: "warrantMonth", label: "期间", checked: true },
]; //全部选项标签
const ALLHeader = [
  {
    label: "退货单号",
    tooltip: true,
    key: "unwvNo",
    checked: true,
    width: "170",
    sortable: true,
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
    label: "单据状态",
    tooltip: true,
    key: "unwvStatus",
    checked: true,
    temp: true,
  },
  {
    label: "退货类型",
    tooltip: true,
    key: "unwvTypeName",
    checked: true,
    width: "170",
  },
  {
    label: "仓库",
    tooltip: true,
    key: "unwvWarehouseName",
    checked: true,
    width: "130",
  },
  {
    label: "供应商",
    tooltip: true,
    key: "supplierName",
    checked: true,
    width: "170",
  },
  {
    label: "退货数量",
    tooltip: true,
    key: "unwvQtyS",
    checked: true,
    width: "120",
    temp: true,
    sortable: true,
  },
  {
    label: "第二单位退货数量",
    tooltip: true,
    key: "secUnwvQtyS",
    checked: true,
    temp: true,
    width: "170",
    sortable: true,
  },
  {
    label: "退货总金额",
    tooltip: true,
    key: "originAmtVatS",
    checked: true,
    temp: true,
    width: "140",
    sortable: true,
  },
  {
    label: "凭证号",
    tooltip: true,
    key: "warrantCode",
    checked: true,
  },
  { label: "期间", tooltip: true, key: "warrantMonth", checked: true },
  {
    label: "创建人",
    tooltip: true,
    key: "createdName",
    checked: true,
    width: "100",
  },
  {
    label: "创建时间",
    tooltip: true,
    key: "createdTime",
    checked: true,
    width: "100",
    sortable: true,
  },
  {
    label: "修改人",
    tooltip: true,
    key: "updatedName",
    checked: true,
    width: "100",
  },
  {
    label: "修改时间",
    tooltip: true,
    key: "updatedTime",
    checked: true,
    width: "100",
  },
]; //所有表头
export default {
  name: "reverse",
  data() {
    return {
      supplierList: [],
      branchNameStr: [],
      departmentList: [],
      sort: "",
      fixHead: [
        { type: "selection", key: "selection",width:"60", checked: true },
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
      company: ``, //公司名称
      branchName: [], //部门名称
      supplierName: [], //供应商
      externalPoNo: "", //外部合同号
      erpPoNo: "", //采购合同号
      wvNo: "", //入库单号
      unwvNo: "", //退货单号
      baseCurrencyRate: "", //本位币汇率
      project: {}, //项目号
      createdTime: "", //创建日期
      unwvDate: "", //退货日期
      documentValue: [], //单据状态
      currency: {},
      currencyCode: "", //业务币币别
      isContract: "", //退货类型
      // poType: [], //单据状态
      coinStatus: "", //业务币币别
      blStatus: "", //单据状态
      supplierShow: false, //供应商显示
      projectShow: false, //项目显示
      departmentShow: false, //部门显示
      componyShow: false, //公司显示
      reverseShow: false, //创建显示
      loading: false, //表格loading
      tableData: [], //列表数据
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目,
      dialogVisible: false, //审核
      Examine: "",
      isAllowedConfirm: true,
      selectioned: [],
      examineShow: false, //审核弹窗
      examineOne: true, //审核单条还是多条
      examineValue: "", //审核选中的值
      examineList: [
        { value: "1", label: "通过" },
        { value: "2", label: "驳回" },
      ],
      examineDate: "", //审核弹窗里的出库日期
      auditInfo: "", //驳回原因
      pickerOptions: {}, //时间范围
      coinShow: false,
      unwvType: "", //退货类型
      unwvTypeList: [],
      warrantCode: "", //凭证号
      warrantMonth: "", //期间
    };
  },
  mixins:[getFilter,setFilter,exportData],
  watch:{
    // '$route'(){
    //   this.queryData();
    // },
  },
  created() {
    if (this.$route.params.status) {
      this.documentValue = this.$route.params.status
        .split(",")
        .map((item) => Number(item));
      this.tableDataList();
    }
    // data.supplierName = this.supplierName;
    //   data.supplierList = this.supplierList;
    //   data.company = this.company;
    //   data.branchName = this.branchName;
    //   data.departmentList = this.departmentList;
    let data = this.$getQueryData(this);
    this.departmentList = data.branchName;
    this.supplierList = data.supplierName;
    this.documentValue=data.unwvStatusList;
    this.unwvType=data.unwvTypeList;
    if (data.createdStartTime) {
      this.createdTime[0] = data.createdStartTime;
      this.createdTime[1] = data.createdEndTime;
    }
    if (data.unwvStartDate) {
      this.unwvDate[0] = data.unwvStartDate;
      this.unwvDate[1] = data.unwvEndDate;
    }

    this.getUnwvType();
    this.blStatusList();
    this.selectMainList();
    this.getFilter();
    this.queryData();
  },
  methods: {
    queryData(){
      this.tableDataList();
      this.getSum();
    },
    //查看生命树
    goTree(){
        if (this.selectioned.length === 1) {
        sessionStorage.setItem("bizCode", this.selectioned[0].unwvNo);
        sessionStorage.setItem("bizType", "OD_UNWV");
        this.$router.push({
          path:"/index/home/tree",
          query:{
            bizCode:this.selectioned[0].unwvNo,
            bizType:"OD_UNWV"
          }
        });
        let obj = {
        url: "treeModel",
        baseUrl: "",
        label: "生命树",
        moduleCode: "",
        params: {},
        query: {
          bizCode:this.selectioned[0].unwvNo,
          bizType:"OD_UNWV"
        },
      };
      this.$store.commit("tabsListAdd", obj);
      } else {
        this.$openWarning("请选择一条合同查看生命树");
      }
    },
    exportTable(){
      if (this.createdTime) {
        var createdStartDate = this.createdTime[0];
        var createdEndDate = this.createdTime[1];
      }
      if (this.unwvDate) {
        var unwvStartDate = this.unwvDate[0];
        var unwvEndDate = this.unwvDate[1];
      }
      if (this.documentValue) {
        var unwvStatus = this.documentValue;
      }
      if (this.erpPoNo) {
        var erpPoNo = this.erpPoNo;
      }
      if (this.externalPoNo) {
        var externalPoNo = this.externalPoNo;
      }
      if (this.unwvNo) {
        var unwvNo = this.unwvNo;
      }
      if (this.currency.currencyName) {
        var currencyCode = this.currency.currencyCode;
      }
      if (this.baseCurrencyRate) {
        var baseCurrencyRate = this.baseCurrencyRate;
      }
      if (this.wvNo) {
        var wvNo = this.wvNo;
      }
      let params = {
        baseCurrencyRate: baseCurrencyRate, //本位币汇率
        externalPoNo: externalPoNo, //外部合同号
        unwvStartDate: unwvStartDate,
        unwvEndDate: unwvEndDate, //退货日期
        erpPoNo: erpPoNo, //采购合同号
        unwvNo: unwvNo, //退货单号
        sort: this.sort,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        bbSupplierBaseList: this.supplierName, //供应商
        companyCode: this.company.companyCode, //公司
        createdStartTime: createdStartDate,
        createdEndTime: createdEndDate, //创建时间
        bbBranchBaseList: this.branchName, //部门
        projectCode: this.project.projectCode, //项目号
        projectName: this.project.projectName, //项目名称
        currencyCode: currencyCode, //业务币币别
        unwvStatusList: unwvStatus, //单据状态
        wvNo: wvNo,
        unwvType: this.unwvType, //退货类型
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth //期间
      };
      let data = params;
      data.currency = this.currency;
      data.supplierName = this.supplierName;
      data.supplierList = this.supplierList;
      data.company = this.company;
      data.branchName = this.branchName;
      data.departmentList = this.departmentList;
      data.project = this.project;
      const fixHead = JSON.parse(JSON.stringify(this.fixHead));
      fixHead.splice(0,2);
      const exportFieldList = [];
      fixHead.concat(this.headerList).forEach((item) => {
        if (item.checked) {
          const { key, label, otherKey } = item;
          exportFieldList.push({ key: otherKey ? otherKey : key, label })

        }
      });
      this.exportData({ ...data, exportFieldList });
    },
    tableSortChange(column){
      const {prop,order} = column;
      if (order === "descending") {
        this.sort = `${prop} desc`;
      } else {
        this.sort = `${prop} asc`;
      }
      this.tableDataList();
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
    //退货类型
    getUnwvType() {
      let data = {
        dictNo: 1158,
      };
      apiReverse.select(data).then((res) => {
        this.unwvTypeList = res.data;
        this.tableDataList();
      });
    },
    inputShow() {
      this.show = this.$showOne(this.show);
    },
    //币种弹窗打开
    coinTip(aa) {
      this.coinShow = true;
    },
    //币种弹窗关闭
    coinCancle() {
      this.coinShow = false;
    },
    //币种弹窗确定获取数据
    coinSure(e) {
      this.coinShow = false;
      this.currency = e;
    },
    //单据状态
    blStatusList() {
      let params = {
        dictNo: "1080",
      };
      api
        .select(params)
        .then((res) => {
          if (res.code == "success") {
            this.blStatus = res.data;
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: "保存失败",
              type: "error",
            });
          }
        })
        .catch();
    },
    //审核下拉选中的值
    examineSelect(e) {
      this.examineValue = e; //审核选中的值
      this.isAllowedConfirm = false;
    },
    //取消
    examineCancle() {
      this.examineShow = false; //审核弹窗
      this.examineValue = ""; ////审核选中的值
      this.examineDate = ""; //审核中的出库日期
    },
    //业务币主数据下拉
    selectMainList() {
      api
        .listSimple()
        .then((res) => {
          if (res.code == "success") {
            this.coinStatus = res.data;
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: "保存失败",
              type: "error",
            });
          }
        })
        .catch();
    },
    //查询列表接口
    tableDataList() {
      if (this.createdTime) {
        var createdStartDate = this.createdTime[0];
        var createdEndDate = this.createdTime[1];
      }
      if (this.unwvDate) {
        var unwvStartDate = this.unwvDate[0];
        var unwvEndDate = this.unwvDate[1];
      }
      if (this.documentValue) {
        var unwvStatus = this.documentValue;
      }
      if (this.erpPoNo) {
        var erpPoNo = this.erpPoNo;
      }
      if (this.externalPoNo) {
        var externalPoNo = this.externalPoNo;
      }
      if (this.unwvNo) {
        var unwvNo = this.unwvNo;
      }
      if (this.currency.currencyName) {
        var currencyCode = this.currency.currencyCode;
      }
      if (this.baseCurrencyRate) {
        var baseCurrencyRate = this.baseCurrencyRate;
      }
      if (this.wvNo) {
        var wvNo = this.wvNo;
      }
      let params = {
        baseCurrencyRate: baseCurrencyRate, //本位币汇率
        externalPoNo: externalPoNo, //外部合同号
        unwvStartDate: unwvStartDate,
        unwvEndDate: unwvEndDate, //退货日期
        erpPoNo: erpPoNo, //采购合同号
        unwvNo: unwvNo, //退货单号
        sort: this.sort,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        bbSupplierBaseList: this.supplierName, //供应商
        companyCode: this.company.companyCode, //公司
        createdStartTime: createdStartDate,
        createdEndTime: createdEndDate, //创建时间
        bbBranchBaseList: this.branchName, //部门
        projectCode: this.project.projectCode, //项目号
        projectName: this.project.projectName, //项目名称
        currencyCode: currencyCode, //业务币币别
        unwvStatusList: unwvStatus, //单据状态
        wvNo: wvNo,
        unwvType: this.unwvType, //退货类型
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
      };
      let data = params;
      data.currency = this.currency;
      data.supplierName = this.supplierName;
      data.supplierList = this.supplierList;
      data.company = this.company;
      data.branchName = this.branchName;
      data.departmentList = this.departmentList;
      data.project = this.project;
      this.$setQueryData(this, data);
      apiReverse
        .odUnwvList(params)
        .then((res) => {
          if (res.code == "success") {
            this.tableData = res.data;
            this.tableData.forEach((item) => {
              item.updatedTime = this.$timeFun(item.updatedTime, 1);
              item.createdTime = this.$timeFun(item.createdTime, 1);
              item.unwvType = item.unwvType + "";
              this.unwvTypeList.forEach((item2) => {
                if (item.unwvType == item2.dict_code) {
                  item.unwvTypeName = item2.dict_value;
                }
              });
            });
            this.total = res.total;
            this.loading = false;
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: "保存失败",
              type: "error",
            });
          }
        })
        .catch();
    },
     //获取总计
    getSum() {
       if (this.createdTime) {
        var createdStartDate = this.createdTime[0];
        var createdEndDate = this.createdTime[1];
      }
      if (this.unwvDate) {
        var unwvStartDate = this.unwvDate[0];
        var unwvEndDate = this.unwvDate[1];
      }
      if (this.documentValue) {
        var unwvStatus = this.documentValue;
      }
      if (this.erpPoNo) {
        var erpPoNo = this.erpPoNo;
      }
      if (this.externalPoNo) {
        var externalPoNo = this.externalPoNo;
      }
      if (this.unwvNo) {
        var unwvNo = this.unwvNo;
      }
      if (this.currency.currencyName) {
        var currencyCode = this.currency.currencyCode;
      }
      if (this.baseCurrencyRate) {
        var baseCurrencyRate = this.baseCurrencyRate;
      }
      if (this.wvNo) {
        var wvNo = this.wvNo;
      }
      let params = {
        baseCurrencyRate: baseCurrencyRate, //本位币汇率
        externalPoNo: externalPoNo, //外部合同号
        unwvStartDate: unwvStartDate,
        unwvEndDate: unwvEndDate, //退货日期
        erpPoNo: erpPoNo, //采购合同号
        unwvNo: unwvNo, //退货单号
        sort: this.sort,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        bbSupplierBaseList: this.supplierName, //供应商
        companyCode: this.company.companyCode, //公司
        createdStartTime: createdStartDate,
        createdEndTime: createdEndDate, //创建时间
        bbBranchBaseList: this.branchName, //部门
        projectCode: this.project.projectCode, //项目号
        projectName: this.project.projectName, //项目名称
        currencyCode: currencyCode, //业务币币别
        unwvStatusList: unwvStatus, //单据状态
        wvNo: wvNo,
        unwvType: this.unwvType, //退货类型
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
      };
      api
        .odUnwvListSumV2(params)
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
        if (["unwvQtyS", "secUnwvQtyS","originAmtVatS"].findIndex((it) => it == key) !== -1) {
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
     cell({ row, column, rowIndex, columnIndex }) {
      //第八列添加 red 类
      if (
        column.property == "unwvQtyS" ||
        column.property == "secUnwvQtyS" ||
        column.property == "originAmtVatS"
      ) {
        return "rightTd";
      } else {
        return "";
      }
    },
    //创建
    creact() {
      this.reverseShow = true;
    },
    //修改
    reverseChange() {
      if (this.selectioned == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning",
        });
        return;
      } else if (this.selectioned.length > 1) {
        this.$openWarning("不能批量操作");
        return;
      }
      if (this.selectioned[0].unwvStatus == 10800010) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "审核中状态不能修改",
          type: "warning",
        });
        return;
      }
      if (this.selectioned[0].unwvStatus == 10800015) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已审核状态不能修改",
          type: "warning",
        });
        return;
      }
      // localStorage.setItem("unwvId", this.selectioned[0].unwvId);
      this.$router.push({
        //核心语句
        path: "/index/Purchase/reversehousingDetails", //跳转的路径
        query: { unwvId: this.selectioned[0].unwvId },
      });
    },
    //删除
    delectReverse(type) {
      if (this.selectioned == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning",
        });
        return;
      }
      if (this.selectioned[0].unwvStatus == 10800010) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "审核中状态不能删除",
          type: "warning",
        });
        return;
      }
      if (this.selectioned[0].unwvStatus == 10800015) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已审核状态不能删除",
          type: "warning",
        });
        return;
      }
      let tips = "";
      if (type == 0) {
        tips = "删除";
      }
      this.$confirm("是否确定" + tips + "?", tips + "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = [];
          for (var i = 0; i < this.selectioned.length; i++) {
            let params = {};
            (params.unwvId = this.selectioned[i].unwvId),
              (params.version = this.selectioned[i].version),
              data.push(params);
          }
          apiReverse
            .deleteOdUnwv(data)
            .then((res) => {
              if (res.code == "success") {
                this.$message({
                  duration: 1000,
                  showClose: true,
                  message: res.data,
                  type: "success",
                });
                this.queryData();
              } else {
                this.$message({
                  duration: 1000,
                  showClose: true,
                  message: "调用失败",
                  type: "error",
                });
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
    //查看
    reverseSee(type) {
      if (this.selectioned == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning",
        });
        return;
      } else if (this.selectioned.length > 1) {
        this.$openWarning("不能批量操作");
        return;
      }
      this.$router.push({
        //核心语句
        path: "/index/Purchase/reversehousingDetails", //跳转的路径
        query: { type: 1, unwvId: this.selectioned[0].unwvId },
      });
    },
    //提交
    addSub() {
      if (this.selectioned == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning",
        });
        return false;
      } else if (this.selectioned.length > 1) {
        this.$openWarning("不能批量操作");
        return;
      }
      if (this.selectioned[0].unwvStatus == 10800010) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "审核中状态不能提交",
          type: "warning",
        });
        return;
      }
      if (this.selectioned[0].unwvStatus == 10800015) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已审核状态不能提交",
          type: "warning",
        });
        return;
      }
      let params = {
        unwvId: this.selectioned[0].unwvId,
        version: this.selectioned[0].version,
      };
      apiReverse
        .submitApprove(params)
        .then((res) => {
          if (res.code == "success") {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.data,
              type: "success",
            });
            this.queryData();
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: "调用失败",
              type: "error",
            });
          }
        })
        .catch();
    },
    //确定
    examineSure() {
      if (this.examineValue == "1" && this.examineOne && !this.examineDate) {
        this.$openWarning("请选择退货日期");
        return;
      } else if (
        this.examineValue == "1" &&
        this.examineOne &&
        this.examineDate
      ) {
        this.selectioned[0].unwvDate = this.examineDate;
      } else if (this.examineValue == "2") {
        if (this.auditInfo) {
          var auditInfo = this.auditInfo;
        }
      } else {
        this.examineDate = "";
      }
      var list = [];
      for (let i = 0; i < this.selectioned.length; i++) {
        let params = {};
        (params.unwvId = this.selectioned[i].unwvId),
          (params.version = this.selectioned[i].version),
          (params.approveStatus = this.examineValue),
          (params.auditInfo = auditInfo),
          (params.unwvDate = this.selectioned[0].unwvDate);
        list.push(params);
      }
      console.log("we", list);
      apiReverse
        .ApproveUnwv(list)
        .then((res) => {
          this.examineShow = false;
          if (res.code == "success") {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.data,
              type: "success",
            });
            this.queryData();
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: "调用失败",
              type: "error",
            });
          }
        })
        .catch();
    },
    //审核(入库单)
    toExamine() {
      if (this.selectioned.length == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning",
        });
        return false;
      }
      console.log("212", this.selectioned.length);
      if (this.selectioned[0].unwvStatus == 10800005) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已保存状态不能审核",
          type: "warning",
        });
        return;
      }
      if (this.selectioned[0].unwvStatus == 10800015) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已审核状态不能审核",
          type: "warning",
        });
        return;
      }
      if (this.selectioned[0].unwvStatus == 10800020) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已驳回状态不能审核",
          type: "warning",
        });
        return;
      }
      if (this.selectioned.length > 1) {
        this.examineOne = false; //是否是多条
      } else {
        this.accountPeriod(this.selectioned[0].companyId);
        this.examineDate = this.selectioned[0].unwvDate; //默认当前数据的出库日期
        this.examineOne = true; //是否是多条
      }
      this.examineShow = true;
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
            if (this.selectioned.length == 1) {
              this.examineDate = "";
              if (
                this.selectioned[0].unwvDate >= res.data.begindate &&
                this.selectioned[0].unwvDate <= res.data.enddate
              ) {
                this.examineDate = this.selectioned[0].unwvDate;
              }
            }
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
    setUp() {},
    //业务币币别
    // handlemoney(val) {
    //   this.currencyCode = val;
    // },
    // //退货类型
    // handlepoType(val){
    //   this.isContract = val
    // },
    //单据状态
    handlestatus(val) {
      this.documentValue = val;
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
    },
    //部门弹窗打开
    departmentTip() {
      // if (this.company == ``) {
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
      this.supplierName = e;
      this.supplierList = e;
    },
    //项目弹窗打开
    projectTip() {
      this.projectShow = true;
    },
    //项目弹窗关闭
    projectCancle() {
      this.projectShow = false;
    },
    //项目弹窗确定获取数据
    projectSure(e) {
      this.projectShow = false;
      this.project = e;
      this.$root.Bus.$emit("projectName", e);
    },
    //创建确定
    reverseSure() {
      this.reverseShow = false;
    },
    //创建取消
    reverseCancle() {
      this.reverseShow = false;
    },
    // //选择框
    // dialogCheck(selection, row) {
    //   this.$refs.multipleTable.clearSelection();
    //   if (selection.length === 0) {
    //     // 判断selection是否有值存在
    //     return;
    //   }
    //   if (row) {
    //     this.selectioned = row;
    //     this.index = this.tableData.indexOf(row);
    //     this.$refs.multipleTable.toggleRowSelection(row, true);
    //   }
    // },
    //表格选择
    handleChange(e) {
      this.selectioned = e;
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.pariList();
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.tableDataList();
    },
    //重置
    clearNone() {
      this.wvNo = "";
      this.erpPoNo  = "";
      this.createdTime  = [];
      this.baseCurrencyRate  = "";
      this.unwvType  = "";
      this.warrantCode = "";
      (this.supplierList = []),
        (this.departmentList = []),
        (this.baseCurrencyRate = ""), //本位币汇率
        (this.externalPoNo = ""), //外部合同号
        (this.unwvDate = []), //退货日期
        (this.erpPoNo = ""), //采购合同号
        (this.unwvNo = ""), //退货单号
        (this.supplierName = []), //供应商
        (this.company = ``), //公司
        (this.createdTime = []), //创建时间
        (this.branchCode = ""), //部门
        (this.branchName = []);
      (this.project = {}), //项目号
        (this.currency = {}), //业务币币别
        (this.documentValue = []), //单据状态
        (this.warrantCode = ""); //凭证号
      this.warrantMonth = ""; //期间
     this.queryData();
    },
    rowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
  },
  components: {
    componySelect,
    departmentSelect,
    supplierSelect,
    projectSelect,
    reverseAdd,
    contractSearch,
    editSearchItem,
    coinSelect,
  },
};
</script>
<style scoped lang="scss">
.index .el-button.is-disabled,
.index .el-button.is-disabled:focus,
.index .el-button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-color: #fff;
  border: 1px solid #ebeef5;
}
// .reverse {
//  .el-dropdown{font-size: 12px;margin-right: 10px}
//      .el-dropdown-link {
//         cursor: pointer;
//         color: #409EFF;
//     }
//     .el-icon-arrow-down {
//         font-size: 12px;
//     }
//    .index-div3{
//         width: 100%;
//         overflow: hidden;
//         background: #ffffff;
//         text-align: left;
//         margin-bottom: 10px;
//         position: relative;
//         min-height: 14px;
//         .el-col-5{
//             width: 24%; position: relative; margin-top: 10px;//margin-left: 25px;
//         }
//        .el-col .el-inputs, .input-div .el-col .el-input__inner{
//             font-size: 12px !important;
//             height: 32px;
//         }
//         .el-col .el-select .el-input .el-input__inner{
//             font-size: 12px !important;
//             border-color: #97999e !important;
//         }
//         .el-input,.el-select{
//             width: 65%;
//             font-size: 12px;
//             .el-input__inner{
//                 font-size: 12px !important;
//                 width: 100%;
//                 border-color: #97999e !important;
//             }
//         }
//           //时间选择器
//         .el-input2{
//             height: 32px;
//             width: 65%;
//              border-color: #97999e !important;
//         }
//         label{
//             display: inline-block;
//             width:34%;
//             text-align: right;

//         }
//         .el-col{
//             .comicon {
//                 width:65%;
//                 height: 20px;
//                 position: absolute;
//                 right: 6px;
//                 top: 7px;
//                 cursor: pointer;
//                 text-align: right;
//                 padding-right: 15px;
//             }
//             .el-col:last-child{
//                 margin-right: 0;
//             }
//         }

//         .hide-input{
//             position: absolute;
//             bottom: 0;
//             left: 0;
//             height: 20px;
//             width: 100%;
//             cursor: pointer;
//             .el-icon-d-caret{
//                 position: absolute;
//                 bottom: 0;
//                 left: 49.5%;
//                 font-size: 14px;
//                 color: #666;
//             }
//             .el-icon-d-caret:before{color: #999;}
//         }
//         .el-col-btn{
//             margin: 10px;
//             width:100%;
//             position: relative;
//             margin-left:0px !important;
//             .button-div{
//                 margin: 0px auto;
//                 text-align: center;
//             }
//         }

//     }
// }
</style>
