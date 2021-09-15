<template>
  <div class="demandForPayment">
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
      <!-- <el-button
        class="query-button"
        @click="addDemandPayment"
        >新增</el-button
      >-->
      <add-dpayment-btn
        style="float:left;padding-right:10px;"
        @getArray="getArray"
        @getType="getType"
      ></add-dpayment-btn>
      <el-button @click="setPaymentApply(1)" v-if="$actionFlag('F005')" icon="el-icon-edit">修改</el-button>
      <el-button @click="delPaymentApply" v-if="$actionFlag('F006')" icon="el-icon-delete">删除</el-button>
      <el-button @click="setPaymentApply(2)" v-if="$actionFlag('F007')" icon="el-icon-data-line">查看</el-button>
      <el-button @click="setPaymentApply(3)" v-if="$actionFlag('F008')" icon="el-icon-finished">提交</el-button>
      <el-button @click="setPaymentApply(4)" v-if="$actionFlag('F009')" icon="el-icon-receiving">审核</el-button>
      <el-button
        @click="setPaymentApply(5)"
        v-if="$actionFlag('F010')"
        icon="el-icon-bank-card"
      >快捷付款</el-button>
       <!-- <el-button @click="setPaymentApply(6)"  icon="el-icon-receiving">关闭付款申请</el-button> -->
       
      <el-button @click="showEditPage('headerList')" icon="el-icon-setting" style="float:right">
        自定义
      </el-button>
      <el-button @click="setPaymentApply(6)" v-if="$actionFlag('F011')"  icon="el-icon-receiving">关闭付款申请</el-button>
      <el-button @click="applyClaim(1)" v-if="$actionFlag('F014')" icon="el-icon-receiving">付款申请认领</el-button>
      <el-button @click="applyClaim(2)" v-if="$actionFlag('F015')" icon="el-icon-receiving">认领审批</el-button>
      <el-button 
      icon="el-icon-thumb" 
      @click="goTree"
      v-if="$actionFlag('F016')"
      >生命树</el-button>
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
            <span v-if="item.key==='applyStatus'">{{ applyStatusObj[scope.row.applyStatus] }}</span>
            <span v-if="item.key==='applyPayTime'">{{ scope.row.applyPayTime | time2Date }}</span>
            <span v-if="item.key==='closeStatus'">{{ scope.row.closeStatus==2?"已关闭":(scope.row.closeStatus==1?"审核中":"未关闭") }}</span>
            <span v-if="item.key==='paymentType'">{{ paymentTypeObj[scope.row.paymentType] }}</span>
            <span v-if="item.key==='payType'">{{ payTypeObj[scope.row.payType]}}</span>
            <span v-if="item.key==='createdTime'">{{  scope.row.createdTime | time }}</span>
            <span v-if="item.key==='applyAmt'">{{  scope.row.applyAmt  | $moneyFormat }}</span>
            <span v-if="item.key==='payedAmt'">{{  scope.row.payedAmt   | $moneyFormat }}</span>
            <span v-if="item.key==='notPayedAmt'">{{  scope.row.notPayedAmt  | $moneyFormat }}</span>
            <span v-if="item.key==='claimStatus'">{{ claimStatus[scope.row.claimStatus]}}</span>
            <span v-if="item.key==='isBusinessPay'">{{ scope.row.isBusinessPay == 1?"是":"否"  }}</span>
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
    <!--审核弹窗-->
    <el-dialog :visible.sync="checkShow" :close-on-click-modal="false" width="400px" :show-close="false">
      <div slot="title" class="el-dialog__title" style="text-align:left;font-size:18px;">审核提示</div>
      <el-form label-width="50px" :model="checkDetail" ref="checkfForm">
        <el-form-item prop="status">
          <el-radio v-model="checkDetail.status" :label="1">审核通过</el-radio>
          <el-radio v-model="checkDetail.status" :label="0">审核驳回</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="button-div2">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-check"
          @click="submitCheck('checkfForm')"
        >确定</el-button>
        <el-button size="small" icon="el-icon-close" @click="checkShow = false">取 消</el-button>
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
import addDpaymentBtn from "@/views/fundsManage/conponents/addDpaymentBtn";

import headSearch from "./headSearch";
import { mapMutations } from "vuex";
import {
  getPaymentApplylist,
  delPaymentApply,
  checkPaymentApply,
  submitPaymentApply,
  selectSumResidueLimit,
  getOdPayApplyListSumV2
} from "@/api/paymentManage/demandForPayment";
import {
  applyStatusObj,
  claimStatus,
  applyInvoiceTypeObj,
  paymentTypeObj,
  payTypeObj,
  crashContentObj,
} from "../../dictionary";
import { selectedRow } from "@/mixins/selectedRow.js";
import editSearchItem from "@/components/editSearchItem";
import { getFilter, setFilter } from "@/mixins/editCondition";

const AllSearch = [
  { key: "company", label: "公司名称", checked: true },
  { key: "branch", label: "部门名称", checked: true },
  { key: "payeeCompany", label: "收款单位", checked: true },
  { key: "payApplyCode", label: "付款申请单号", checked: true },
  { key: "paymentType", label: "付款类别", checked: true },
  { key: "accountingYear", label: "会计年度", checked: true },
  { key: "payType", label: "付款方式", checked: true },
  { key: "applyPayTime", label: "申请付款日期", checked: true },
  { key: "moneyContent", label: "款项内容", checked: true },
  { key: "applyStatus", label: "付款申请单状态", checked: true },
  { key: "applyInvoiceType", label: "业务单据", checked: true },
  { key: "blNo", label: "业务单据编号", checked: true },
  { key: "createdName", label: "创建人", checked: true },
  { key: "createDate", label: "创建日期", checked: true },
  { key: "closeStatus", label: "关闭状态", checked: true },
  { key: "isBusinessPay", label: "是否非业务付款", checked: true },
  { key: "approvalStatus", label: "认领审批状态", checked: true },
]; //全部选项标签
const ALLHeader = [
  {
    key: "applyStatus",
    label: "状态",
    tooltip: true,
    checked: true,
    temp:true
  },
  {
    key: "claimStatus",
    label: "认领状态",
    tooltip: true,
    checked: true,
    temp:true
  },
  {
    key: "isBusinessPay",
    label: "是否非业务付款",
    tooltip: true,
    checked: true,
    temp:true,
    width: 120
  },
  {
    key: "payApplyCode",
    label: "付款申请单号",
    tooltip: true,
    checked: true,
    width: 170,
  },
  {
    key: "companyName",
    label: "公司名称",
    tooltip: true,
    checked: true,
    width: 170,
  },
  {
    key: "orgName",
    label: "部门名称",
    tooltip: true,
    checked: true,
    width: 170,
  },
  { key: "accountingYear", label: "会计年度", tooltip: true, checked: true },
  { key: "payeeName", label: "收款单位", tooltip: true, checked: true },
  {
    key: "currencyCode",
    label: "币别",
    tooltip: true,
    checked: true,
    width: 90,
  },
  {
    key: "applyPayTime",
    label: "付款日期",
    tooltip: true,
    checked: true,
    width: 90,
    temp: true,
    sortable: true,
  },
  {
    key: "applyAmt",
    label: "申请金额(业务币)",
    tooltip: true,
    checked: true,
    width: 120,
    temp: true
  },
  {
    key: "payedAmt",
    label: "已付款金额(业务币)",
    tooltip: true,
    checked: true,
    width: 160,
    temp: true,
    sortable: true,
  },
  {
    key: "notPayedAmt",
    label: "未付款金额(业务币)",
    tooltip: true,
    checked: true,
    width: 160,
    temp: true
  },
  {
    key: "closeStatus",
    label: "关闭状态",
    tooltip: true,
    checked: true,
    width: 120,
    temp: true,
  },
  {
    key: "paymentType",
    label: "付款类别",
    tooltip: true,
    checked: true,
    width: 110,
    temp: true,
  },
  {
    key: "payType",
    label: "付款方式",
    tooltip: true,
    checked: true,
    temp: true,
  },
  { key: "remark", label: "备注", tooltip: true, checked: true },
  { key: "createdName", label: "创建人", tooltip: true, checked: true },
  {
    key: "createdTime",
    label: "创建时间",
    tooltip: true,
    checked: true,
    width: 140,
    temp: true,
  },
]; //所有表头
export default {
  name: "demandForPayment",
  mixins: [selectedRow, getFilter, setFilter],
  components: {
    headSearch,
    addDpaymentBtn,
    editSearchItem,
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
        }

      ],
      editPage: false,
      searchList: AllSearch,
      headerList: ALLHeader,
      editKey: "",
      editList: [],
      navColor: {
        button: {
          backgroundColor: "", //按钮颜色
        },
      },
      applyStatusObj,
      applyInvoiceTypeObj,
      paymentTypeObj,
      payTypeObj,
      crashContentObj,
      claimStatus,
      page: {
        pageSize: 100,
        pageNum: 1,
        total: 0,
      },
      selectioned: "", //选中
      selectionedArray: [],
      loading: false,
      checkShow: false, //审核窗口
      tableData: [],
      checkDetail: {
        status: 1,
      },
      sumTol:{}
    };
  },
  created() {
    this.getFilter();
  },
  watch: {
    '$route'() {
      this.queryData();
      this.getSum();
    },
  },
  methods: {
    //查看生命树
    goTree(){
        if (this.selectionedArray.length === 1) {
        sessionStorage.setItem("bizCode", this.selectionedArray[0].payApplyCode);
        sessionStorage.setItem("bizType", "FI_PAYMENT");  
        this.$router.push({
          path:"/index/home/tree",
          query:{
            bizCode:this.selectionedArray[0].payApplyCode,
            bizType:"FI_PAYMENT"
          }
        });
        let obj = {
        url: "treeModel",
        baseUrl: "",
        label: "生命树",
        moduleCode: "",
        params: {},
        query: {
          bizCode:this.selectionedArray[0].payApplyCode,
          bizType:"FI_PAYMENT"
        },
      };
      this.$store.commit("tabsListAdd", obj);
      } else {
        this.$openWarning("请选择一条合同查看生命树");
      }
    },
    selectApprovalStatus(){
      selectStatusList({ dictNo:1161}).then(res=>{
        this.approvalStatusList=res.data;
      })
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
      if (
        column.property == "applyAmt" ||
        column.property == "payedAmt" ||
        column.property == "notPayedAmt"
      ) {
        return "rightTd";
      } else {
        return "";
      }
    },
    ...mapMutations([
      "setApplyInvoiceType",
      "setApplyInvoiceArray",
      "setPaymentMain",
    ]),
    selectedRow(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    getArray(arr) {
      //获取合同或费用票据
      this.setApplyInvoiceArray(arr);
      this.addDemandPayment();
    },
    getType(type) {
      //获取申请类别
      this.setApplyInvoiceType(type);
    },
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
      getPaymentApplylist(params).then((res) => {
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
      getOdPayApplyListSumV2(params)
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
          ["applyAmt", "payedAmt","notPayedAmt"].findIndex((it) => it == key) !== -1
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
    addDemandPayment() {
      this.$router.push({
        name: "demandPaymentDetail",
        params: { editFlag: 1, id: 0 },
      });
    },
    setPaymentApply(type) {
      //type 1 修改 0 删除 2查看 3提交 4审核 5快捷付款 6关闭
      let forbirdTipsObj = {
        1: "当前状态不允许修改",
        0: "当前状态不允许删除",
        3: "当前状态不允许提交",
        4: "当前状态不允许审核",
        5: "当前状态不允许付款",
        6: "当前状态不允许关闭",
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
          //只有【保存】或【已驳回】状态下，可进行修改，否则进行提示：当前状态不允许修改
          if (
            applyStatusObj[this.selectioned.applyStatus] != "保存" &&
            applyStatusObj[this.selectioned.applyStatus] != "已驳回"
          ) {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.$router.push({
            name: "demandPaymentDetail",
            params: {
              editFlag: 1,
              id: this.selectioned.payApplyCode,
              paymentId: this.selectioned.id,
            }
          });
          break;
        case 2:
          //任何状态都能查询
          this.$router.push({
            name: "demandPaymentDetail",
            params: {
              editFlag: 0,
              id: this.selectioned.payApplyCode,
              paymentId: this.selectioned.id,
            },
          });
          break;
        case 3:
          //只有【保存】或【已驳回】状态下，可进行提交，否则进行提示：当前状态不允许提交
          if (
            applyStatusObj[this.selectioned.applyStatus] != "保存" &&
            applyStatusObj[this.selectioned.applyStatus] != "已驳回"
          ) {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.submitPaymentApply();
          break;
        case 4:
          //只有在【审批中】状态下，可进行【审核】；否则进行提示：当前状态不允许审核
          if (applyStatusObj[this.selectioned.applyStatus] != "审核中") {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.checkShow = true;
          break;
        case 5:
          //1、只有【已审核】状态下可进行快捷付款操作，否则进行提示：当前状态不允许付款；
          //并且状态为0
          if (
            (applyStatusObj[this.selectioned.applyStatus] != "已审核" &&
              applyStatusObj[this.selectioned.applyStatus] != "已付款") ||
            this.selectioned.closeStatus != 0
          ) {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          let data={
            payApplyCode:this.selectioned.payApplyCode
          }
          if(this.selectioned.isBusinessPay==1){
              let obj = {
                url: "paymentDetail",
                baseUrl: "paymentOrder",
                label: "付款单",
                moduleCode: "T0040401"
              };
              this.$store.commit("tabsListAdd", obj);
              //跳转快捷支付页面
              this.setPaymentMain(this.selectioned);
              this.$router.push({
                name: "paymentDetail",
                params: { id: 0, editFlag: 1 ,status:-1}
              });
          }else{
              selectSumResidueLimit(data).then(res=>{
              if(res.code=="success"){
                if(res.data.residueLimit>0){
                    let obj = {
                      url: "paymentDetail",
                      baseUrl: "paymentOrder",
                      label: "付款单",
                      moduleCode: "T0040401"
                    };
                    this.$store.commit("tabsListAdd", obj);
                    //跳转快捷支付页面
                    this.setPaymentMain(this.selectioned);
                    this.$router.push({
                      name: "paymentDetail",
                      params: { id: 0, editFlag: 1,status:1 }
                    });
                }else{
                  this.$openWarning("该付款申请单已经没有剩余额度，不能进行付款");
                }
              }else{
                this.$openWarning(res.message);
              }
          }).catch();
          }

          break;
        case 6:
           if (
            (applyStatusObj[this.selectioned.applyStatus] != "已审核" &&
            applyStatusObj[this.selectioned.applyStatus] != "已付款") ||
            this.selectioned.closeStatus!=0
          ) {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.$router.push({
            name: "demandPaymentDetail",
            params: {
              editFlag: 2,
              id: this.selectioned.payApplyCode,
              paymentId: this.selectioned.id,
            },
          });
          break;
        default:
          break;
      }
    },
    //付款申请认领
    applyClaim(type){
      if (this.selectionedArray.length === 0) {
        this.$message({ message: "未选择单据", type: "warning" });
        return;
      } else if (this.selectionedArray.length > 1) {
        this.$message({ message: "最多选择一条单据", type: "warning" });
        return;
      }
      if(type==1){
        if(applyStatusObj[this.selectionedArray[0].applyStatus] != "已付款" || this.selectionedArray[0].isBusinessPay!=1
        || this.selectionedArray[0].claimStatus==11610010){
          this.$message({ message: "该单据状态不可以申请认领", type: "warning" });
          return;
        }
        this.$router.push({
          name: "demandPaymentClaim",
          params: {
              createdtype:type==1?3:4,
              id: this.selectionedArray[0].payApplyCode,
              paymentId:this.selectionedArray[0].id,
          }
        });
      }else{
        if(this.selectionedArray[0].claimStatus!=11610010){
          this.$message({ message: "该单据状态不可以认领审批", type: "warning" });
          return;
        }
        this.$router.push({
            name: "demandPaymentDetail",
            params: {
              editFlag:3,
              id: this.selectionedArray[0].payApplyCode,
              paymentId:this.selectionedArray[0].id,
            }
          });
      }

    },

    delPaymentApply() {
      if (this.selectionedArray.length === 0) {
        this.$message({ message: "未选择申请单", type: "warning" });
        return;
      }
      if (
        !this.selectionedArray.every(
          (item) =>
            this.applyStatusObj[item.applyStatus] === "保存" ||
            this.applyStatusObj[item.applyStatus] === "已驳回"
        )
      ) {
        this.$message({
          message: "只有保存和状态已驳回的单据可删除,请重新选择",
          type: "warning",
        });
        return;
      }
      this.$confirm("是否确定删除该申请单?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delPaymentApply(this.selectionedArray).then((res) => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.queryData();
              this.getSum();
            }
          });
        })
        .catch(() => {});
    },
    submitPaymentApply() {
      this.$confirm("是否确定提交该申请单", "提交提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        submitPaymentApply({
          id: this.selectioned.id,
          applyStatus: this.selectioned.applyStatus,
          version: this.selectioned.version,
        }).then((res) => {
          if (res.code === "success") {
            this.$openSuccess(res.message);
            this.queryData();
            this.getSum();
          }
        });
      });
    },
    submitCheck(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          checkPaymentApply({
            id: this.selectioned.id,
            toApplyStatus: this.checkDetail.status,
            applyStatus: this.selectioned.applyStatus,
            version: this.selectioned.version,
          }).then((res) => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              (this.checkShow = false), this.queryData(),this.getSum();
            }
          });
        } else {
          return false;
        }
      });
    },
  },
  // mounted() {
  //   this.queryData();
  //   this.getSum();
  // },
  // activated() {
  //   this.queryData();
  // },
};
</script>
<style lang="scss">
.demandForPayment {
  // .input-div .el-col {
  //   height: 32px;
  // }
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
