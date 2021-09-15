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
      <el-button
        class="query-button"
        v-if="$actionFlag('F001')"
        @click="addPayment"
        icon="el-icon-folder-add"
      >新增</el-button>
      <el-button @click="setReceivableBill(1)" v-if="$actionFlag('F002')" icon="el-icon-edit">修改</el-button>
      <el-button @click="delFiGatheringBill" v-if="$actionFlag('F003')" icon="el-icon-delete">删除</el-button>
      <el-button
        @click="setReceivableBill(2)"
        v-if="$actionFlag('F004')"
        icon="el-icon-data-line"
      >查看</el-button>
      <el-button @click="setReceivableBill(3)" v-if="$actionFlag('F005')" icon="el-icon-wallet">内部贴现</el-button>
      <el-button @click="setReceivableBill(4)" v-if="$actionFlag('F006')" icon="el-icon-coin">贴现</el-button>
      <el-button @click="setReceivableBill(5)" v-if="$actionFlag('F007')" icon="el-icon-sold-out">托收</el-button>
      <el-button @click="setReceivableBill(6)" v-if="$actionFlag('F008')" icon="el-icon-money">质押/赎回</el-button>
      <el-button 
      icon="el-icon-thumb" 
      @click="goTree"
      v-if="$actionFlag('F009')"
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
            <span v-if="item.key==='invoiceArrivedDate'">{{ scope.row.invoiceArrivedDate | time2Date  }}</span>
            <span v-if="item.key==='invoiceDate'">{{  scope.row.invoiceDate | time2Date }}</span>
            <span v-if="item.key==='instrumentType'">{{ invoiceTypeObj[scope.row.instrumentType]  }}</span>
            <span v-if="item.key==='instrumentProp'">{{ invoicePropertiesObj[scope.row.instrumentProp]}}</span>
            <span v-if="item.key==='instrumentStatus'">{{ instrumentStatusObj[scope.row.instrumentStatus]}}</span>
            <span v-if="item.key==='instrumentAmt'">{{ scope.row.instrumentAmt | $moneyFormat}}</span>
            <span v-if="item.key==='isBig'">{{  scope.row.isBig?"小票":"大票"  }}</span>
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
  getfiGatheringBillList,
  delFiGatheringBill,
  fiGatheringBillListSumV2
} from "@/api/billManage/receivableBills";
import {
  invoiceTypeObj,
  invoicePropertiesObj,
  instrumentStatusObj
} from "../../dictionary";
import { selectedRow } from "@/mixins/selectedRow.js";
import editSearchItem from "@/components/editSearchItem";
import {getFilter, setFilter} from "@/mixins/editCondition";

const AllSearch = [
  {key: 'company', label: '公司名称', checked: true,otherKey:"companyInfo"},
  {key: 'branch', label: '收票部门', checked: true,otherKey:"branchInfo"},
  {key: 'customer', label: '客户名称', checked: true},
  {key: 'instrumentNo', label: '票据号', checked: true},
  {key: 'instrumentBillNo', label: '票据台账号', checked: true},
  {key: 'coin', label: '币别', checked: true},
  {key: 'instrumentType', label: '票据类型', checked: true},
  {key: 'invoiceArrivedDate', label: '收票日期', checked: true},
  {key: 'invoiceDate', label: '开票日期', checked: true},
  {key: 'instrumentYeildDate', label: '到期日期', checked: true},
  {key: 'isBig', label: '大票小票', checked: true},
  {key: 'instrumentProp', label: '票据性质', checked: true},
  {key: 'instrumentStatus', label: '票据状态', checked: true},
  {key: 'invoiceBank', label: '出票人银行', checked: true},
  {key: 'receiptCompany', label: '受票人', checked: true},
  {key: 'receiptByBank', label: '受票人银行', checked: true},
  {key: 'acceptorInfo', label: '承兑人信息', checked: true},
  {key: 'acceptorAccount', label: '承兑人账号', checked: true},
  {key: 'createDate', label: '创建日期', checked: true},
  {key: 'creator', label: '创建人', checked: true},
  {key: 'warrantCode', label: '凭证号', checked: true},
  {key: 'warrantMonth', label: '期间', checked: true},
]; //全部选项标签
const ALLHeader = [
  { key: "companyName",label: "公司",tooltip: true, checked: true,width:170 },
  { key: "orgName",label: "部门",tooltip: true, checked: true,width:170 },
  { key: "instrumentBillNo",label: "票据台账编号",tooltip: true, checked: true,width:170 },
  { key: "instrumentNo",label: "票据号",tooltip: true, checked: true,width:100,sortable:true },
  { key: "currencyCode",label: "币别",tooltip: true, checked: true,width:90 },
  { key: "instrumentAmt",label: "票据金额",tooltip: true, checked: true,width:100,sortable:true},
  { key: "invoiceArrivedDate",label: "收票日期",tooltip: true, checked: true,width:100,temp:true,sortable:true},
  { key: "invoiceDate",label: "开票日期",tooltip: true, checked: true,width:100,temp:true,sortable:true},
  { key: "instrumentType",label: "票据类型",tooltip: true, checked: true,width:100,temp:true},
  { key: "instrumentProp",label: "票据性质",tooltip: true, checked: true,temp:true},
  { key: "instrumentStatus",label: "票据状态",tooltip: true, checked: true,temp:true},
  { key: "isBig",label: "大票小票",tooltip: true, checked: true,temp:true},
  { key: "warrantCode",label: "凭证号",tooltip: true, checked: true},
  { key: "warrantMonth",label: "期间",tooltip: true, checked: true},
]; //所有表头
export default {
  name: "receivableBIlls",
  mixins: [selectedRow,getFilter,setFilter],
  components: { headSearch, writeOffReasonSelect,editSearchItem },
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
      instrumentStatusObj,
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
  created() {
    this.getFilter();
  },
  watch:{
    // '$route'(){
    //   this.getData();
    // },
  },
  methods: {
    //查看生命树
    goTree(){
        if (this.selectionedArray.length === 1) {
        sessionStorage.setItem("bizCode", this.selectionedArray[0].instrumentBillNo);
        sessionStorage.setItem("bizType", "GATHERING_BILL");  
        this.$router.push({
          path:"/index/home/tree",
          query:{
            bizCode:this.selectionedArray[0].instrumentBillNo,
            bizType:"GATHERING_BILL"
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
          bizType:"GATHERING_BILL"
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
        this.setFilter({filterJson:JSON.stringify(this.headerList),listJson:JSON.stringify(this.searchList)})

      });
    },
    showEditPage(key) {
      this.editKey = key;
      this.editPage = true;
      this.editList = this[key];
    },
      cell({row, column, rowIndex, columnIndex}) {
          if(column.property=="instrumentAmt" ){
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
      this.loading = true;
      let params = {
        pageNum: this.page.pageNum,
        rows: this.page.pageSize,
        ...this.searchOptions
      };
      this.loading = true;
      getfiGatheringBillList(params).then(res => {
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
      fiGatheringBillListSumV2(params)
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
          ["instrumentAmt"].findIndex((it) => it == key) !== -1
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
        name: "receivableBillDetail",
        params: { id: 0, editFlag: 1, type: 1 }
      });
    },
    setReceivableBill(type) {
      //type 1 修改 0 删除 2查看 3内部贴现 4贴现 5托收 6质押/赎回
      let forbirdTipsObj = {
        1: "当前状态不允许修改",
        0: "当前状态不允许删除",
        3: "当前状态不允许内部贴现",
        4: "当前状态不允许贴现",
        5: "当前状态不允许托收 ",
        6: "当前状态不允许质押/赎回"
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
        //   if (
        //     this.instrumentStatusObj[this.selectioned.instrumentStatus] !=
        //     "登记"
        //   ) {
        //     this.$message({ message: forbirdTipsObj[type], type: "warning" });
        //     return;
        //   }
        //   //1、只有【登记】状态下，可进行删除，否则进行提示：当前状态不允许删除；
        //   this.delFiGatheringBill();
        //   break;
        case 1:
          //只有【登记】状态下，可进行修改，否则进行提示：当前状态不允许修改；
          if (
            this.instrumentStatusObj[this.selectioned.instrumentStatus] !=
            "登记"
          ) {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.$router.push({
            name: "receivableBillDetail",
            params: {
              id: this.selectioned.receivableId,
              instrumentBillNo: this.selectioned.instrumentBillNo,
              editFlag: 1,
              type: 1
            }
          });
          break;
        case 2:
          //任何状态都能查询
          this.$router.push({
            name: "receivableBillDetail",
            params: {
              id: this.selectioned.receivableId,
              instrumentBillNo: this.selectioned.instrumentBillNo,
              editFlag: 0,
              type: 2
            }
          });
          break;
        case 3:
          //状态为【认领】【赎回】的应收票据可进行内部贴现
          if (
            ["内部贴现", "认领", "赎回"].findIndex(
              it =>
                it ===
                this.instrumentStatusObj[this.selectioned.instrumentStatus]
            ) === -1
          ) {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.$router.push({
            name: "receivableBillDetail",
            params: {
              id: this.selectioned.receivableId,
              instrumentBillNo: this.selectioned.instrumentBillNo,
              editFlag: 0,
              type: 3
            }
          });
          break;
        case 4:
          //状态为【认领】【赎回】【内部贴现】的应收票据可进行内部贴现，状态更新为内部贴现
          if (
            ["认领", "赎回", "贴现", "内部贴现"].findIndex(
              it =>
                it ===
                this.instrumentStatusObj[this.selectioned.instrumentStatus]
            ) === -1
          ) {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.$router.push({
            name: "receivableBillDetail",
            params: {
              id: this.selectioned.receivableId,
              instrumentBillNo: this.selectioned.instrumentBillNo,
              editFlag: 0,
              type: 4
            }
          });
          break;
        case 5:
          //状态为【认领】【赎回】【内部贴现】的应收票据可进行托收，状态更新为托收
          if (
            ["托收", "认领", "赎回", "内部贴现"].findIndex(
              it =>
                it ===
                this.instrumentStatusObj[this.selectioned.instrumentStatus]
            ) === -1
          ) {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.$router.push({
            name: "receivableBillDetail",
            params: {
              id: this.selectioned.receivableId,
              instrumentBillNo: this.selectioned.instrumentBillNo,
              editFlag: 0,
              type: 5
            }
          });
          break;
        case 6:
          //状态为【认领】【赎回】【内部贴现】的应收票据可进行质押/赎回，状态更新为质押/赎回
          if (
            ["认领", "质押", "赎回"].findIndex(
              it =>
                it ===
                this.instrumentStatusObj[this.selectioned.instrumentStatus]
            ) === -1
          ) {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.$router.push({
            name: "receivableBillDetail",
            params: {
              id: this.selectioned.receivableId,
              instrumentBillNo: this.selectioned.instrumentBillNo,
              editFlag: 0,
              type: 6
            }
          });
          break;
        default:
          break;
      }
    },
    delFiGatheringBill() {
      if (this.selectionedArray.length === 0) {
        this.$message({ message: "未选择票据", type: "warning" });
        return;
      }
      if (
        !this.selectionedArray.every(
          item => this.instrumentStatusObj[item.instrumentStatus] === "登记"
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
            figatheringBillForms: this.selectionedArray
          };
          delFiGatheringBill(params).then(res => {
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
