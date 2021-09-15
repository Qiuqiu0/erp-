<template>
  <div class="paymentOrder">
    <div class="button-div auto-sibling">
      <el-button class="query-button" @click="getData" icon="el-icon-search">查询</el-button>
      <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
      <el-button @click="showEditPage('searchList')" icon="el-icon-setting" style="float:right">
        自定义
      </el-button>
    </div>
    <head-search :sort="sort" @getSearchs="getSearchs" ref="headSearch" class="auto-sibling" :searchList="searchList"></head-search>
    <!-- 表格 -->
    <div class="button-div auto-sibling">
      <el-button
        class="query-button"
        v-if="$actionFlag('F001')"
        @click="addPayment"
        icon="el-icon-folder-add"
      >新增</el-button>
      <el-button @click="setPayment(1)" v-if="$actionFlag('F002')" icon="el-icon-edit">修改</el-button>
      <el-button @click="delPayment" v-if="$actionFlag('F003')" icon="el-icon-delete">删除</el-button>
      <el-button @click="setPayment(2)" v-if="$actionFlag('F004')" icon="el-icon-data-line">查看</el-button>
      <el-button @click="setPayment(3)" v-if="$actionFlag('F005')" icon="el-icon-money">过账</el-button>
       <el-button @click="batchPosting" v-if="$actionFlag('F008')" icon="el-icon-money">批量过账</el-button>
      <el-button @click="setPayment(4)" v-if="$actionFlag('F006')" icon="el-icon-document-delete">冲销</el-button>
      <el-button @click="exportTable" v-if="$actionFlag('F007')" icon="el-icon-download">导出</el-button>
      <el-button @click="changeIsInterest"  icon="el-icon-download">计息调整</el-button>
      <el-button
      icon="el-icon-thumb"
      @click="goTree"
      v-if="$actionFlag('F009')"
      >生命树</el-button>
      <el-button @click="showEditPage('headerList')" icon="el-icon-setting" style="float:right"
        >自定义
      </el-button>
    </div>
    <div class="el-table-div" v-auto>
      <el-table
        border
        center
        height="calc(100% - 35px)"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleChange"
        @row-click="selectedRow"
        class="el-table"
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
            <span v-if="item.key==='payDate'">{{ scope.row.payDate | time2Date }}</span>
            <span v-if="item.key==='payStatus'">{{ payStatusObj[scope.row.payStatus] }}</span>
            <span v-if="item.key==='paymentType'">{{ paymentTypeObj[scope.row.paymentType] }}</span>
            <span v-if="item.key==='payType'">{{ payTypeObj[scope.row.payType]}}</span>
            <span v-if="item.key==='isInterest'">{{ scope.row.isInterest == 1?'是':'否' }}</span>
            <span v-if="item.key==='rmbCurrencyRate'">{{$numberToFixed(scope.row.rmbCurrencyRate, 4)}}</span>
            <span v-if="item.key==='postDate'">{{ scope.row.postDate | time2Date }}</span>
            <span v-if="item.key==='writeoffDate'">{{ scope.row.writeoffDate | time2Date  }}</span>
            <span v-if="item.key==='createdTime'">{{  scope.row.createdTime | time2Date }}</span>
            <span v-if="item.key==='payAmtTotal'">{{  scope.row.payAmtTotal  | $moneyFormat }}</span>
            <span v-if="item.key==='serviceCharge'">{{  scope.row.serviceCharge   | $moneyFormat }}</span>
            <span v-if="item.key==='payAmtTotalBase'">{{  scope.row.payAmtTotalBase  | $moneyFormat }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[100, 200, 300,500]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
    <!-- 选择付款申请单 -->
    <demand-payment-modal
      v-if="demandPaymentShow"
      :tipShow="demandPaymentShow"
      :applyStatusList=[10460015,10460025]
      @demandPaymentCancle="demandPaymentCancle"
      @demandPaymentSure="demandPaymentSure"
    ></demand-payment-modal>
    <!--冲销弹窗-->
    <el-dialog :visible.sync="writeOffShow" width="400px" :close-on-click-modal="false" append-to-body :show-close="false">
      <div slot="title" class="el-dialog__title" v-if="selectioned">{{ selectioned.paymentCode }}</div>
      <el-form :model="writeOff" :rules="rules" label-width="100px" ref="writeOffForm">
        <el-form-item label="冲销日期" prop="date">
          <accountingDate-select
            v-if="writeOffShow"
            :companyId="selectioned.companyId"
            :accountingDate.sync="writeOff.date"
          ></accountingDate-select>
        </el-form-item>
        <el-form-item label="冲销原因" prop="region">
          <write-off-reason-select :writeOffReason.sync="writeOff.region"></write-off-reason-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="button-div2">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-check"
          @click="submitWriteOff('writeOffForm')"
        >确定</el-button>
        <el-button size="small" icon="el-icon-close" @click="writeOffShow = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 过账弹窗 -->
    <post-popup
      v-if="postPopupShow"
      :tipShow="postPopupShow"
      @tipsCancle="postPopupCancel"
      @tipsSure="postPopupSure"
      :selectioned="this.selectioned"

    ></post-popup>
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
import headSearch from "./headSearch";
import demandPaymentModal from "@/views/fundsManage/conponents/demandPaymentModal";
import writeOffReasonSelect from "@/views/fundsManage/conponents/writeOffReasonSelect";
import accountingDateSelect from "@/views/fundsManage/conponents/accountingDateSelect";
import postPopup from "@/views/fundsManage/conponents/postPopup";
import { mapMutations } from "vuex";
import {
  getPaymentOrderList,
  deletePaymentOrder,
  postPaymentOrder,
  writeOffPaymentOrder,
  exportFiPaymentList,
  selectFiPaymentSum,
  postingBatch,
  turnFiPaymentInterest
} from "@/api/paymentManage/paymentOrder";
import {
  payStatusObj,
  applyInvoiceTypeObj,
  paymentTypeObj,
  payTypeObj,
  crashContentObj,
} from "../../dictionary";
import { selectedRow } from "@/mixins/selectedRow.js";
import editSearchItem from "@/components/editSearchItem";
import {getFilter, setFilter} from "@/mixins/editCondition";
import { exportData } from "@/mixins/export.js";

const AllSearch = [
  { key: "company", label: "公司名称", checked: true },
  { key: "branch", label: "部门名称", checked: true },
  { key: "payeeCompany", label: "收款单位", checked: true },
  { key: "accountYear", label: "会计年度", checked: true },
  { key: "paymentCode", label: "付款单号", checked: true },
  { key: "payApplyCode", label: "付款申请单 ", checked: true },
  { key: "payDate", label: "付款日期", checked: true },
  { key: "moneyContent", label: "款项内容", checked: true },
  { key: "payStatus", label: "付款单状态", checked: true },
  { key: "payType", label: "付款方式", checked: true },
  { key: "paymentType", label: "付款类别", checked: true },
  { key: "applyInvoiceType", label: "业务单据", checked: true },
  { key: "docNo", label: "业务单据编号", checked: true },
  { key: "createdName", label: "创建人", checked: true },
  { key: "createDate", label: "创建日期", checked: true },
  { key: "isInterest", label: "是否计息", checked: true },
  { key: "warrantCode", label: "凭证号", checked: true },
  { key: "warrantMonth", label: "期间", checked: true },
  { key: "writeoffWarrantCode", label: "冲销凭证号", checked: true },
  { key: "writeoffWarrantMonth", label: "冲销期间", checked: true },
  { key: "payeeAmtOrigin", label: "付款区间", checked: true },
]; //全部选项标签
const ALLHeader = [
  { key: "companyName",label: "公司",tooltip: true, checked: true,width:170 },
  { key: "orgName",label: "部门",tooltip: true, checked: true,width:170 },
  { key: "paymentCode",label: "付款单号",tooltip: true, checked: true,width:120,sortable:true  },
  { key: "payDate",label: "付款日期",tooltip: true, checked: true,width:100,temp:true},
  { key: "receiverName",label: "收款单位",tooltip: true, checked: true },
  { key: "payStatus",label: "付款状态",tooltip: true, checked: true,temp:true },
  { key: "isInterest", label: "是否计息",tooltip: true, checked: true ,temp:true},
  { key: "currencyCode",label: "币别",tooltip: true, checked: true},
  { key: "payAmtTotal",label: "付款金额",tooltip: true, checked: true,width:120 ,sortable:true,temp:true},
  { key: "serviceCharge",label: "手续费",tooltip: true, checked: true,width:120 ,sortable:true ,temp:true},
  { key: "payAmtTotalBase",label: "付款本位币余额",tooltip: true, checked: true,width:120 ,temp:true},
  { key: "paymentType",label: "付款类别",tooltip: true, checked: true,temp:true ,width:110},
  { key: "bizPersonName",label: "业务员",tooltip: true, checked: true},
  { key: "payType",label: "付款方式",tooltip: true, checked: true,temp:true},
  { key: "payBankName",label: "付款银行",tooltip: true, checked: true},
  { key: "payBankCashflowCode",label: "付款银行现金流编码",tooltip: true, checked: true},
  { key: "serviceChargeBankName",label: "手续费银行",tooltip: true, checked: true},
  { key: "feeBankCashflowCode",label: "费用银行现金流编码",tooltip: true, checked: true},
  { key: "rmbCurrencyRate",label: "汇率（人民币）",tooltip: true, checked: true,temp:true},
  { key: "postDate",label: "过账日期",tooltip: true, checked: true,temp:true},
  { key: "writeoffDate",label: "冲销日期",tooltip: true, checked: true,temp:true,sortable:true },
  { key: "createdTime",label: "创建时间",tooltip: true, checked: true,width:140,temp:true},
]; //所有表头
export default {
  name: "paymentOrder",
  mixins: [selectedRow, getFilter, setFilter, exportData],
  created() {
    this.getFilter();
  },
  components: {
    headSearch,
    demandPaymentModal,
    writeOffReasonSelect,
    accountingDateSelect,
    editSearchItem,
    postPopup,
  },
  data() {
    return {
      sort: "",
      fixHead: [
        { type: "selection", key: "selection", checked: true, width: 60 },
        {
          type: "index",
          key: "index",
          label: "序号",
          tooltip: true,
          checked: true,
          width: 50,
        },
      ],
      editPage: false,
      searchList: AllSearch,
      headerList: ALLHeader,
      editKey: "",
      editList: [],
      payStatusObj,
      applyInvoiceTypeObj,
      paymentTypeObj,
      payTypeObj,
      crashContentObj,
      navColor: {
        button: {
          backgroundColor: "", //按钮颜色
        },
      },
      page: {
        pageSize: 100,
        pageNum: 1,
        total: 0,
      },
      selectioned: "", //选中
      selectionedArray: [],
      loading: false,
      demandPaymentShow: false, //付款申请单弹窗
      writeOffShow: false, //冲销弹窗
      postPopupShow: false, //过账弹窗
      tableData: [],
      writeOff: {
        date: "",
        region: "",
      },
      rules: {
        date: [{ required: true, message: "时间不能为空" }],
        region: [{ required: true, message: "原因不能为空" }],
      },
      sumTol: {},
    };
  },
  methods: {
    //计息调整
    changeIsInterest(){
      if (this.selectionedArray.length === 1) {
        let isInterest=this.selectionedArray[0].isInterest==1?"否":"是";//取相反的值
        this.$confirm("确认更新是否计息为："+isInterest+"?", "提示信息", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          turnFiPaymentInterest(this.selectionedArray[0]).then(res=>{
            if(res.code=="success"){
              this.$openSuccess(res.message);
              this.queryData();
            }else{
              this.$openWarning(res.message);
            }
          }).catch();
        }).catch();
      } else {
        this.$openWarning("请选择一条进行操作");
      }
    },
    //查看生命树
    goTree() {
      if (this.selectionedArray.length === 1) {
        sessionStorage.setItem("bizCode", this.selectionedArray[0].paymentCode);
        sessionStorage.setItem("bizType", "FI_PAYMENT");
        this.$router.push({
          path: "/index/home/tree",
          query: {
            bizCode: this.selectionedArray[0].paymentCode,
            bizType: "FI_PAYMENT",
          },
        });
        let obj = {
        url: "treeModel",
        baseUrl: "",
        label: "生命树",
        moduleCode: "",
        params: {},
        query: {
          bizCode:this.selectionedArray[0].paymentCode,
          bizType:"FI_PAYMENT"
        },
      };
      this.$store.commit("tabsListAdd", obj);
      } else {
        this.$openWarning("请选择一条合同查看生命树");
      }
    },
    exportTable() {
      let data = {
        pageNum: this.page.pageNum,
        rows: this.page.pageSize,
        ...this.searchOptions,
      };
      if (
        Number(data.payAmtTotalStart) >= Number(data.payAmtTotalEnd) &&
        data.payAmtTotalStart !== "" &&
        data.payAmtTotalEnd !== ""
      ) {
        this.$openWarning("请填写正确的起始金额");
        return;
      }
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
      this.getData();
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
    cell({ row, column, rowIndex, columnIndex }) {
      //第八列添加 red 类
      if (
        column.property == "payAmtTotal" ||
        column.property == "payAmtTotalBase"
      ) {
        return "rightTd";
      } else {
        return "";
      }
    },
    //导出
    exportExcel() {
      this.$confirm(
        "为避免导出数据过多影响其它业务功能，请尽量利用查询条件筛选有效数据后再导出！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$refs.headSearch.postData();
          let data = {
            pageNum: this.page.pageNum,
            rows: this.page.pageSize,
            ...this.searchOptions,
          };
          exportFiPaymentList(data)
            .then((res) => {
              const blob = new Blob([res.data]);
              const a = document.createElement("a");
              const url = window.URL.createObjectURL(blob);
              const filename = "付款单.xls";
              a.href = url;
              a.download = filename;
              a.click();
              window.URL.revokeObjectURL(url);
            })
            .catch();
        })
        .catch();
    },
    ...mapMutations(["setPaymentMain"]),
    getData() {
      this.$refs.headSearch.postData();
    },
    clearNone() {
      this.$refs.headSearch.clearNone();
    },
    getSearchs(e) {
      this.searchOptions = e;
      this.queryData();
      this.getSum();
    },
    queryData() {
      let params = {
        pageNum: this.page.pageNum,
        rows: this.page.pageSize,
        ...this.searchOptions,
      };
      this.loading = true;
      getPaymentOrderList(params).then((res) => {
        if (res.code === "success") {
          this.tableData = res.data;
          this.page.total = res.total;
          this.loading = false;
        }
      });
    },
    //获取总计
    getSum() {
      let params = {
        pageNum: this.page.pageNum,
        rows: this.page.pageSize,
        ...this.searchOptions,
      };
      selectFiPaymentSum(params)
        .then((res) => {
          this.sumTol = res.data || {};
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
          ["payAmtTotal", "payAmtTotalBase"].findIndex((it) => it == key) !== -1
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
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.queryData();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.queryData();
    },
    handleChange(e) {
      this.selectionedArray = e;
    },
    addPayment() {
      this.demandPaymentShow = true;
    },
    //付款申请单弹窗关闭
    demandPaymentCancle() {
      this.demandPaymentShow = false;
    },
    //付款申请单弹窗确定获取数据
    demandPaymentSure(e) {
      this.demandPaymentShow = false;
      this.$router.push({
        name: "paymentDetail",
        params: { id: 0, editFlag: 1, status: 1 },
      });
      this.setPaymentMain(e);
    },
    setPayment(type) {
      //type 1 修改 0 删除 2查看 3过账 4冲销
      let forbirdTipsObj = {
        1: "当前状态不允许修改",
        0: "当前状态不允许删除",
        3: "当前状态不允许过账",
        4: "当前状态不允许冲销",
      };
      if (this.selectionedArray.length === 0) {
        this.$message({ message: "未选择单据", type: "warning" });
        return;
      } else if (this.selectionedArray.length > 1) {
        this.$message({ message: "最多选择一条单据", type: "warning" });
        return;
      } else {
        this.selectioned = this.selectionedArray[0];
      }
      switch (type) {
        case 1:
          //只有【付款】状态下，可进行修改，否则进行提示：当前状态不允许修改
          if (this.payStatusObj[this.selectioned.payStatus] != "付款") {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.$router.push({
            name: "paymentDetail",
            params: {
              id: this.selectioned.paymentCode,
              editFlag: 1,
              paymentId: this.selectioned.id,
              status: 1,
            },
          });
          break;
        case 2:
          //任何状态都能查询
          this.$router.push({
            name: "paymentDetail",
            params: {
              id: this.selectioned.paymentCode,
              editFlag: 0,
              paymentId: this.selectioned.id,
              status: 1,
            },
          });
          break;
        case 3:
          //只有【付款】状态下，可进行过账，否则进行提示：付款状态下才可以过账；
          if (this.payStatusObj[this.selectioned.payStatus] != "付款") {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.postPopupShow = true;
          break;
        case 4:
          //只有在【付款过账】状态下，可进行【冲销】；否则进行提示：过账状态下才可以冲销
          if (this.payStatusObj[this.selectioned.payStatus] != "付款过账") {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.writeOffShow = true;
          break;
        default:
          break;
      }
    },
    submitWriteOff(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //api post
          writeOffPaymentOrder([
            {
              id: this.selectioned.id,
              payeeStatus: this.selectioned.payeeStatus,
              payType: this.selectioned.payType,
              payApplyCode: this.selectioned.payApplyCode,
              paymentCode: this.selectioned.paymentCode,
              version: this.selectioned.version,
              writeOffReason: this.writeOff.region,
              writeoffDate: this.writeOff.date,
            },
          ]).then((res) => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.writeOffShow = false;
              this.queryData();
              this.getSum();
            }
          });
        } else {
          return false;
        }
      });
    },
    postPopupCancel() {
      this.postPopupShow = false;
    },
    postPopupSure(e) {
      this.postPopupShow = false;
      postPaymentOrder([
        {
          id: this.selectioned.id,
          postDate: e.date,
          payType: this.selectioned.payType,
          paymentCode: this.selectioned.paymentCode,
          version: this.selectioned.version,
        },
      ]).then((res) => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.queryData();
          this.getSum();
        }
      });
    },
    //批量过账
    batchPosting() {
      if (this.selectionedArray.length === 0) {
        this.$message({ message: "未选择付款单", type: "warning" });
        return;
      }
      if (
        !this.selectionedArray.every(
          (item) => this.payStatusObj[item.payStatus] === "付款"
        )
      ) {
        this.$message({
          message: "只有付款状态的单据可过账,请重新选择",
          type: "warning",
        });
        return;
      }
      this.$confirm(
        "批量过账时过账时间以付款单中付款日期为准，请事先确认，谨慎操作！",
        "过账提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          postingBatch(this.selectionedArray).then((res) => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.queryData();
              this.getSum();
            }
          });
        })
        .catch(() => {});
    },
    delPayment() {
      if (this.selectionedArray.length === 0) {
        this.$message({ message: "未选择付款单", type: "warning" });
        return;
      }
      if (
        !this.selectionedArray.every(
          (item) => this.payStatusObj[item.payStatus] === "付款"
        )
      ) {
        this.$message({
          message: "只有付款状态的单据可删除,请重新选择",
          type: "warning",
        });
        return;
      }
      this.$confirm("是否确定删除该付款?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletePaymentOrder(this.selectionedArray).then((res) => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.queryData();
              this.getSum();
            }
          });
        })
        .catch(() => {});
    },
    selectedRow(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
  },
  watch: {
    writeOffShow: {
      handler(val) {
        if (val === false) {
          this.$refs["writeOffForm"].resetFields();
        }
      },
    },
    '$route'() {
      this.queryData();
    },
  },
  // mounted() {
  //   this.queryData();
  // },
  // activated() {
  //   this.queryData();
  // }
};
</script>
<style lang="scss" >
.paymentOrder {
  .input-div .el-col .el-input__icon {
    line-height: 20px;
  }
  .input-div label {
    width: 30%;
    vertical-align: middle;
  }
  .el-col {
    position: relative;
    .comicon {
      width: 170px;
      height: 20px;
      position: absolute;
      right: 6px;
      top: 7px;
      cursor: pointer;
    }
  }
}
</style>
