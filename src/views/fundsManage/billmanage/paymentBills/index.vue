<template>
  <div class="paymentBills">
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
      <el-button class="query-button" v-if="$actionFlag('F001')" @click="addPayment" icon="el-icon-folder-add">新增</el-button>
      <el-button @click="setPayment(1)" v-if="$actionFlag('F002')" icon="el-icon-edit">修改</el-button>
      <el-button @click="delFiPaymentBill" v-if="$actionFlag('F003')" icon="el-icon-delete">删除</el-button>
      <el-button @click="setPayment(2)" v-if="$actionFlag('F004')" icon="el-icon-data-line">查看</el-button>
      <el-button @click="setPayment(3)" v-if="$actionFlag('F005')" icon="el-icon-money">过账</el-button>
      <el-button @click="setPayment(4)" v-if="$actionFlag('F006')" icon="el-icon-document-delete">冲销</el-button>
      <el-button 
      icon="el-icon-thumb" 
      @click="goTree"
      v-if="$actionFlag('F007')"
      >生命树</el-button>
      <el-button @click="showEditPage('headerList')" icon="el-icon-setting" style="float:right">
        自定义
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
            <span v-if="item.key==='invoiceType'">{{ invoiceTypeObj[scope.row.invoiceType]  }}</span>
            <span v-if="item.key==='invoiceProperties'">{{  invoicePropertiesObj[scope.row.invoiceProperties] }}</span>
            <span v-if="item.key==='signDate'">{{ scope.row.signDate | time2Date }}</span>
            <span v-if="item.key==='timelineDate'">{{ scope.row.timelineDate | time2Date}}</span>
            <span v-if="item.key==='billStatus'">{{ billStatusObj[scope.row.billStatus]}}</span>
            <span v-if="item.key==='createdTime'">{{  scope.row.createdTime | time }}</span>
            <span v-if="item.key==='billAmt'">{{  scope.row.billAmt | $moneyFormat }}</span>
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
import writeOffReasonSelect from "@/views/fundsManage/conponents/writeOffReasonSelect";
import { mapMutations } from "vuex";
import {
  getfiPaymentBillList,
  delFiPaymentBill,
  fiPaymentBillListSumV2
} from "@/api/billManage/paymentBIlls";
import {
  invoiceTypeObj,
  invoicePropertiesObj,
  billStatusObj
} from "../../dictionary";
import {selectedRow} from "@/mixins/selectedRow.js"
import editSearchItem from "@/components/editSearchItem";
import {getFilter, setFilter} from "@/mixins/editCondition";

const AllSearch = [
  {key: 'company', label: '公司', checked: true,otherKey:"companyName"},
  {key: 'branch', label: '部门', checked: true,otherKey:"branchName"},
  {key: 'invoiceCompany', label: '出票人', checked: true},
  {key: 'instrumentBillNo', label: '票据编号', checked: true},
  {key: 'instrumentNo', label: '票据号', checked: true},
  {key: 'invoiceType', label: '票据类型', checked: true},
  {key: 'invoiceProperties', label: '票据性质', checked: true},
  {key: 'invoiceBank', label: '出票人银行', checked: true},
  {key: 'billStatus', label: '票据状态', checked: true},
  {key: 'payBank', label: '付款银行', checked: true},
  {key: 'receiptCompany', label: '受票人', checked: true},
  {key: 'receiptByBank', label: '受票人银行', checked: true},
  {key: 'timelineDate', label: '到期日期', checked: true},
  {key: 'signDate', label: '签发日期', checked: true},
  {key: 'isBig', label: '大票小票', checked: true},
  {key: 'cashCode', label: '现金流量码', checked: true},
  {key: 'payDate', label: '付款日期', checked: true},
  {key: 'coin', label: '币种', checked: true},
  {key: 'creator', label: '创建人', checked: true},
  {key: 'createDate', label: '创建日期', checked: true},
  {key: 'warrantCode', label: '凭证号', checked: true},
  {key: 'warrantMonth', label: '期间', checked: true},
  {key: 'writeoffWarrantCode', label: '冲销凭证号', checked: true},
  {key: 'writeoffWarrantMonth', label: '冲销期间', checked: true},
]; //全部选项标签
const ALLHeader = [
  { key: "instrumentBillNo",label: "票据台账编号",tooltip: true, checked: true,width:170 ,sortable:true},
  { key: "instrumentNo",label: "票据号",tooltip: true, checked: true,width:100 },
  { key: "companyName",label: "公司",tooltip: true, checked: true,width:170 },
  { key: "orgName",label: "部门",tooltip: true, checked: true,width:170 },
  { key: "applyStatus",label: "状态",tooltip: true, checked: true,width:100,temp:true},
  { key: "invoiceType",label: "票据类型",tooltip: true, checked: true,width:100,temp:true},
  { key: "invoiceProperties",label: "票据性质",tooltip: true, checked: true,temp:true},
  { key: "signDate",label: "签发日期",tooltip: true, checked: true,temp:true,width:140,sortable:true},
  { key: "timelineDate",label: "到期日期",tooltip: true, checked: true,temp:true,width:140,sortable:true},
  { key: "billAmt",label: "票据金额",tooltip: true, checked: true,width:100,sortable:true},
  { key: "billStatus",label: "票据状态",tooltip: true, checked: true,temp:true},
  { key: "invoiceByName",label: "出票人",tooltip: true, checked: true,width:170},
  { key: "invoiceBankName",label: "出票人银行",tooltip: true, checked: true,width:100},
  { key: "warrantCode",label: "凭证号",tooltip: true, checked: true},
  { key: "warrantMonth",label: "期间",tooltip: true, checked: true},
  { key: "writeoffWarrantCode",label: "冲销凭证号",tooltip: true, checked: true},
  { key: "writeoffWarrantMonth",label: "冲销期间",tooltip: true, checked: true},
  { key: "createdName",label: "创建人",tooltip: true, checked: true},
  { key: "createdTime",label: "创建时间",tooltip: true, checked: true,width:140,temp:true},
]; //所有表头
export default {
  name: "paymentBills",
  mixins: [selectedRow,getFilter,setFilter],
  components: { headSearch, writeOffReasonSelect,editSearchItem },
  created() {
    this.getFilter();
  },
  watch:{
    '$route'(){
      this.getData()
    },
  },
  data() {
    return {
      sort:"",
      fixHead: [
        { type: "selection", key: "selection", checked: true,width:60 },
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
      invoiceTypeObj,
      invoicePropertiesObj,
      billStatusObj,
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      page: {
        pageSize: 100,
        pageNum: 1,
        total: 0
      },
      selectioned: "", //选中
      selectionedArray: [],
      loading: false,
      tableData: [],
      sumTol:{}
    };
  },
  methods: {
    //查看生命树
    goTree(){
        if (this.selectionedArray.length === 1) {
        sessionStorage.setItem("bizCode", this.selectionedArray[0].instrumentBillNo);
        sessionStorage.setItem("bizType", "PAYMENT_BILL");  
        this.$router.push({
          path:"/index/home/tree",
          query:{
            bizCode:this.selectionedArray[0].instrumentBillNo,
            bizType:"PAYMENT_BILL"
          }
        });
        let obj = {
        url: "treeModel",
        baseUrl: "",
        label: "生命树",
        moduleCode: "",
        params: {},
        query: {
          bizCode:this.selectionedArray[0].instrumentBillNo,
          bizType:"PAYMENT_BILL"
        },
      };
      this.$store.commit("tabsListAdd", obj);
      } else {
        this.$openWarning("请选择一条合同查看生命树");
      }
    },
    tableSortChange(column){
      const {prop,order} = column;
      if (order === "descending") {
        this.sort = `${prop} desc`;
      } else {
        this.sort = `${prop} asc`;
      }
      this.getData()
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
      cell({row, column, rowIndex, columnIndex}) {
          if(column.property=="billAmt" ){
              return 'rightTd'
          }else{
              return "";
          }
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
        ...this.searchOptions
      };
      this.loading = true;
      getfiPaymentBillList(params).then(res => {
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
        ...this.searchOptions
      };
      fiPaymentBillListSumV2(params)
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
          ["billAmt"].findIndex((it) => it == key) !== -1
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
      this.$router.push({
        name: "paymentBIllDetail",
        params: { id: 0, editFlag: 1, type: 1 }
      });
    },
    setPayment(type) {
      //type 1 修改 0 删除 2查看 3过账 4冲销
      let forbirdTipsObj = {
        1: "当前状态不允许修改",
        0: "当前状态不允许删除",
        3: "当前状态不允许过账",
        4: "当前状态不允许冲销"
      };
      if (this.selectionedArray.length === 0) {
        this.$message({ message: "未选择票据", type: "warning" });
        return;
      } else if (this.selectionedArray.length > 1) {
        this.$message({ message: "最多选择一条票据", type: "warning" });
        return;
      } else {
        this.selectioned = this.selectionedArray[0];
      }
      switch (type) {
        // case 0:
        //   if (this.billStatusObj[this.selectioned.billStatus] != "登记") {
        //     this.$message({ message: forbirdTipsObj[type], type: "warning" });
        //     return;
        //   }
        //   //1、只有【登记】状态下，可进行删除，否则进行提示：当前状态不允许删除；
        //   this.delFiPaymentBill();
        //   break;
        case 1:
          //只有【登记】状态下，可进行修改，否则进行提示：当前状态不允许修改；
          if (this.billStatusObj[this.selectioned.billStatus] != "登记") {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.$router.push({
            name: "paymentBIllDetail",
            params: { id: this.selectioned.id, editFlag: 1, type: 1 }
          });
          break;
        case 2:
          //任何状态都能查询
          this.$router.push({
            name: "paymentBIllDetail",
            params: { id: this.selectioned.id, editFlag: 0, type: 2 }
          });
          break;
        case 3:
          //只有【认领】状态下，可进行过账，否则进行提示：登记状态下才可以过账；
          if (this.billStatusObj[this.selectioned.billStatus] != "认领") {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.$router.push({
            name: "paymentBIllDetail",
            params: { id: this.selectioned.id, editFlag: 0, type: 3 }
          });
          break;
        case 4:
          //只有在【付款过账】状态下，可进行【冲销】；否则进行提示：过账状态下才可以冲销
          if (this.billStatusObj[this.selectioned.billStatus] != "付款过账") {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.$router.push({
            name: "paymentBIllDetail",
            params: { id: this.selectioned.id, editFlag: 0, type: 4 }
          });
          break;
        default:
          break;
      }
    },

    delFiPaymentBill() {
      if (this.selectionedArray.length === 0) {
        this.$message({ message: "未选择票据", type: "warning" });
        return;
      }
      if (
        !this.selectionedArray.every(
          item => this.billStatusObj[item.billStatus] === "登记"
        )
      ) {
        this.$message({
          message: "只有登记状态的票据可删除,请重新选择",
          type: "warning"
        });
        return;
      }
      this.$confirm("是否确定删除该票据?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            fiPaymentBillForms:this.selectionedArray
          };
          delFiPaymentBill(params).then(res => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.queryData();
              this.getSum();
            }
          });
        })
        .catch(() => {});
    },
    selectedRow(row){
       this.$refs.multipleTable.toggleRowSelection(row);
    }
  },
  // mounted() {
  //   this.queryData();
  //   this.getSum();
  // },
  // activated() {
  //   this.queryData();
  // }
};
</script>
<style lang="scss">
.paymentBills {
  .input-div .el-col .el-input__icon {
    line-height: 20px;
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
