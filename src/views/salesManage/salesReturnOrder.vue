<template>
  <div id="salesReturnOrder" class="salesReturnOrder">
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
          :staffName="staffName"
          :staffTip="staffTip"
          :extContractCode="extContractCode"
          :warehouse="warehouse"
          :warehouseTips="warehouseTips"
          :customer="customer"
          :customerTips="customerTips"
          :createdTime="createdTime"
          :createdName="createdName"
          :warrantCode="warrantCode"
          :warrantMonth="warrantMonth"
          :undoCode="undoCode"
          :undoDate="undoDate"
          :undoStatus="undoStatus"
          :undoStatusList="undoStatusList"
          :departmentList="departmentList"
          :customerList="customerList"
          :staffNameList="staffNameList"
          :contractCode="contractCode"
          :doNo="doNo"
          @changeInput="changeData"
        />
      </div>
      </el-form>
    </div>
    <!-- 表格 -->
    <!--按钮样式-->
    <div class="button-div auto-sibling">
      <el-button
        @click="handleDetails(1)"
        v-if="$actionFlag(`F001`)"
        icon="el-icon-folder-add"
        >创建</el-button
      >
      <el-button
        @click="handleDetails(2)"
        v-if="$actionFlag(`F002`)"
        icon="el-icon-edit"
        >修改</el-button
      >
      <el-button
        @click="deleteSaleOutboundOrder()"
        v-if="$actionFlag(`F003`)"
        icon="el-icon-delete"
        >删除</el-button
      >
      <el-button
        @click="handleDetails(3)"
        v-if="$actionFlag(`F008`)"
        icon="el-icon-data-line"
        >查看</el-button
      >
      <el-button
        @click="changeStatus('submit')"
        v-if="$actionFlag(`F005`)"
        icon="el-icon-finished"
        style="margin-right:10px;"
        >提交</el-button
      >
      <el-button
        icon="el-icon-receiving"
        v-if="$actionFlag(`F006`)"
        @click="handleToExamine"
        >审核</el-button
      >
      <el-button icon="el-icon-download" v-if="$actionFlag(`F007`)" @click="exportTable"
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
        ></el-table-column>


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
            <span v-if="item.key === 'sumAmt'">{{ scope.row.sumAmt  | $moneyFormat }}</span>
            <span v-if="item.key === 'sumCostAmt'">{{ scope.row.sumCostAmt  | $moneyFormat }}</span>
            <span v-if="item.key === 'sumQty'">{{ $numberToFixed(scope.row.sumQty, 3) }}</span>
            <span v-if="item.key === 'secQty'">{{ $numberToFixed(scope.row.secQty, 3) }}</span>
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
    <!--选择销售客户 -->
    <customer-select
      v-if="customerShow"
      :tipShow="customerShow"
      @customerCancle="customerCancle"
      @customerSure="customerSure"
    >
    </customer-select>
    <!--选择仓库-->
    <warehouse-select
      v-if="warehouseShow"
      :tipShow="warehouseShow"
      @warehouseCancle="warehouseCancle"
      @warehouseSure="warehouseSure"
    >
    </warehouse-select>
    <!--审核弹窗 开始-->
    <el-dialog
      :visible.sync="examineShow"
      :close-on-click-modal="false"
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
          <label><span class="must-full">*</span>退货日期</label>
          <el-date-picker
            class="el-input2"
            style="width:178px;"
            v-model="examineDate"
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
            placeholder="请输入"
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
import sApi from "@/api/salesManage/salesManage";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect2.vue";
import staffSelect from "@/components/staffSelect2.vue";
import warehouseSelect from "@/components/warehouseSelect.vue";
import customerSelect from "@/components/customerSelect2.vue";
import contractSearch from "@/views/salesManage/component/contractSearch";
import editSearchItem from "@/components/editSearchItem";
import { getFilter, setFilter } from "@/mixins/editCondition";
import { exportData } from "@/mixins/export.js";

const AllSearch = [
  { key: "companyName", label: "公司", checked: true },
  { key: "branch", label: "部门", checked: true },
  { key: "staffName", label: "业务员", checked: true },
  { key: "extContractCode", label: "外部合同号", checked: true },
  { key: "contractCode", label: "销售合同号", checked: true },
  { key: "doNo", label: "销售出库单号", checked: true },
  { key: "undoCode", label: "退货单号", checked: true },
  { key: "warehouseName", label: "仓库", checked: true },
  { key: "undoDate", label: "退货日期", checked: true },
  { key: "customer", label: "销售客户", checked: true },
  { key: "undoStatus", label: "状态", checked: true },
  { key: "createdTime", label: "创建时间", checked: true },
  { key: "createdName", label: "创建人", checked: true },
  { key: "warrantCode", label: "凭证号", checked: true },
  { key: "warrantMonth", label: "期间", checked: true },
]; //全部选项标签
const ALLHeader = [
  {
    label: "销售退货单号",
    tooltip: true,
    key: "undoCode",
    checked: true,
    width: "120",
    sortable: true,
  },
  {
    label: "客户",
    tooltip: true,
    key: "custName",
    checked: true,
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
    label: "业务员",
    tooltip: true,
    key: "bizPersonName",
    checked: true,
    width: "180",
  },
  {
    label: "仓库",
    tooltip: true,
    key: "warehouseName",
    checked: true,
    width: "180",
  },
  {
    label: "业务币含税金额",
    tooltip: true,
    key: "sumAmt",
    checked: true,
    width: "120",
    temp:true,
    sortable: true,
  },
  {
    label: "退货总数量",
    tooltip: true,
    key: "sumQty",
    checked: true,
    width: "120",
    temp: true,
    sortable: true,
  },
   {
    label: "第二数量",
    tooltip: true,
    key: "secQty",
    checked: true,
    width: "120",
    temp:true,
    sortable: true,
  },
  {
    label: "成本总额",
    tooltip: true,
    width: "120",
    key: "sumCostAmt",
    checked: true,
    temp: true,
    sortable: true,
  },
  {
    label: "状态",
    tooltip: true,
    key: "undoStatusName",
    checked: true,
    width: "100",
    otherKey: "undoStatus",
  },
  {
    label: "凭证号",
    tooltip: true,
    key: "warrantCode",
    checked: true,
  },
  {
    label: "期间",
    tooltip: true,
    key: "warrantMonth",
    checked: true,
  },
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
    width: "110",
    sortable: true,
  },
]; //所有表头
export default {
  name: "salesReturnOrder",
  data() {
    return {
      branchNameStr: [],
      departmentList: [],
      staffNameList: [],
      customerList: [],
      sort: "",
      fixHead: [
        {
          type: "selection",
          key: "selection",
          checked: true,
          width: "60",
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
      componyShow: false, //公司弹窗
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      warehouseShow: false, //仓库
      customerShow: false, //客户弹窗
      company: {}, //公司名
      branch: [], //部门
      staffName: [], //业务员
      companyCode: "", //公司代码
      branchCode: "", //部门代码
      staffCode: "", //业务员代码
      warehouse: {}, //c仓库名称
      warehouseCode: "", //仓库代码
      customer: [], //客户名称
      custId: "", //客户id
      undoStatusList: [], //状态列表
      undoStatus: [], //状态
      createdTime: [], //创建时间
      extContractCode: "", //外部合同号
      contractCode: "",
      doNo: "",
      undoCode: "", //退货单号
      undoDate: [], //退货日期
      createdName: "", //创建人
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
      examineStatus: true, //审核状态是否为空
      warrantCode: "", //凭证号
      warrantMonth: "", //期间
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
      this.undoStatus = this.$route.params.status
        .split(",")
        .map((item) => Number(item));
    }
    //取查询条件
    let data = this.$getQueryData(this);
    this.departmentList = data.branch;
    this.staffNameList = data.staffName;
    this.customerList = data.customer;
    this.undoStatus=data.undoStatusList;
    if (data.undoDateBegain) {
      this.undoDate[0] = data.undoDateBegain;
      this.undoDate[1] = data.undoDateEnd;
    }
    if (data.createdTimeBegain) {
      this.createdTime[0] = data.createdTimeBegain;
      this.createdTime[1] = data.createdTimeEnd;
    }

    this.getUndoStatusList();
    this.getFilter();
  },
  methods: {
    queryData(){
      this.initData();
      this.getSum();
    },
    //查看生命树
    goTree(){
        if (this.selectioned.length === 1) {
         sessionStorage.setItem("bizCode", this.selectioned[0].undoCode);
        sessionStorage.setItem("bizType", "OD_UNDO");
        this.$router.push({
          path:"/index/home/tree",
          query:{
            bizCode:this.selectioned[0].undoCode,
            bizType:"OD_UNDO"
          }
        });
        let obj = {
        url: "treeModel",
        baseUrl: "",
        label: "生命树",
        moduleCode: "",
        params: {},
        query: {
          bizCode:this.selectioned[0].undoCode,
          bizType:"OD_UNDO"
        },
      };
      this.$store.commit("tabsListAdd", obj);
      } else {
        this.$openWarning("请选择一条合同查看生命树");
      }
    },
    exportTable() {
      if (this.undoDate && this.undoDate.length) {
        var undoDateBegain = this.undoDate[0]; //出库日期
        var undoDateEnd = this.undoDate[1];
      }
      if (this.createdTime && this.createdTime.length) {
        var createdTimeBegain = this.createdTime[0]; //创建时间
        var createdTimeEnd = this.createdTime[1];
      }
      if (this.company) {
        var companyCode = this.company.companyCode; //公司
      }
      if (this.branch) {
        var branchCode = this.branch.branchCode; //部门
      }
      if (this.staffName) {
        var staffCode = this.staffName.empCode; //业务员
      }
      if (this.customer) {
        var custId = this.customer.customerId; //销售客户
      }
      if (this.warehouse) {
        var warehouseCode = this.warehouse.warehouseCode; //仓库
      }
      if (this.undoStatus) {
        var undoStatus = this.undoStatus; //状态
      }
      if (this.extContractCode) {
        var extContractCode = this.extContractCode; //退单号
      }
      if (this.undoCode) {
        var undoCode = this.undoCode; //退单号
      }
      if (this.createdName) {
        var createdName = this.createdName; //创建人
      }
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sort: this.sort,
        companyCode: companyCode, //公司
        orgCode: branchCode, //部门
        custId: custId, //销售客户
        warehouseCode: warehouseCode,
        bizPersonCode: staffCode, //业务员
        undoStatusList: undoStatus, //单据状态
        undoCode: undoCode, //退单号
        extContractCode: extContractCode, //外部合同号
        createdTimeBegain: createdTimeBegain,
        createdTimeEnd: createdTimeEnd, //创建时间
        undoDateBegain: undoDateBegain,
        undoDateEnd: undoDateEnd, //退货时间
        createdName: createdName, //创建人
        order: "desc",
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        contractCode : this.contractCode ,
        doNo: this.doNo,
      };
      let params = data;
      params.company = this.company;
      params.branch = this.branch;
      params.departmentList = this.departmentList;
      params.customer = this.customer;
      params.customerList = this.customerList;
      params.staffName = this.staffName;
      data.staffNameList = this.staffNameList;
      params.warehouse = this.warehouse;
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
      this.initData();
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
      if (column.property == "sumCostAmt" || column.property == "sumAmt" ||
      column.property == "sumQty" || column.property == "secQty") {
        return "rightTd";
      } else {
        return "";
      }
    },
    initData() {
      this.loading = true;

      if (this.undoDate && this.undoDate.length) {
        var undoDateBegain = this.undoDate[0]; //出库日期
        var undoDateEnd = this.undoDate[1];
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
      if (this.staffName) {
        var staffCode = this.staffName; //业务员
      }
      if (this.customer) {
        var custId = this.customer; //销售客户
      }
      if (this.warehouse) {
        var warehouseCode = this.warehouse.warehouseCode; //仓库
      }
      if (this.undoStatus) {
        var undoStatus = this.undoStatus; //状态
      }
      if (this.extContractCode) {
        var extContractCode = this.extContractCode; //退单号
      }
      if (this.undoCode) {
        var undoCode = this.undoCode; //退单号
      }
      if (this.createdName) {
        var createdName = this.createdName; //创建人
      }
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sort: this.sort,
        companyCode: companyCode, //公司
        bbBranchBaseList: branchCode, //部门
        bbCustomerBaseList: custId, //销售客户
        warehouseCode: warehouseCode,
        bbEmployeeList: staffCode, //业务员
        undoStatusList: undoStatus, //单据状态
        undoCode: undoCode, //退单号
        extContractCode: extContractCode, //外部合同号
        createdTimeBegain: createdTimeBegain,
        createdTimeEnd: createdTimeEnd, //创建时间
        undoDateBegain: undoDateBegain,
        undoDateEnd: undoDateEnd, //退货时间
        createdName: createdName, //创建人
        order: "desc",
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        contractCode : this.contractCode ,
        doNo: this.doNo,
      };
      let params = data;
      params.company = this.company;
      params.branch = this.branch;
      params.departmentList = this.departmentList;
      params.customer = this.customer;
      params.customerList = this.customerList;
      params.staffName = this.staffName;
      data.staffNameList = this.staffNameList;
      params.warehouse = this.warehouse;
      //存查询条件
      this.$setQueryData(this, params);
      sApi
        .selectListExtUndo(data)
        .then((res) => {
          if ((res.code = "success")) {
            let list = res.data.list;
            this.total = res.data.total;
            let _this = this;
            _this.$nextTick(() => {
              list.forEach((item) => {
                //转换列表中的销售类型，单据状态
                item.createdTime = _this.$timeFun(item.createdTime, true);
                item.undoStatus = `${item.undoStatus}`;
                _this.undoStatusList.forEach((item2) => {
                  if (item.undoStatus == item2.dict_code) {
                    item.undoStatusName = item2.dict_value;
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
    //
    //获取总计
    getSum() {
       if (this.undoDate && this.undoDate.length) {
        var undoDateBegain = this.undoDate[0]; //出库日期
        var undoDateEnd = this.undoDate[1];
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
      if (this.staffName) {
        var staffCode = this.staffName; //业务员
      }
      if (this.customer) {
        var custId = this.customer; //销售客户
      }
      if (this.warehouse) {
        var warehouseCode = this.warehouse.warehouseCode; //仓库
      }
      if (this.undoStatus) {
        var undoStatus = this.undoStatus; //状态
      }
      if (this.extContractCode) {
        var extContractCode = this.extContractCode; //退单号
      }
      if (this.undoCode) {
        var undoCode = this.undoCode; //退单号
      }
      if (this.createdName) {
        var createdName = this.createdName; //创建人
      }
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sort: this.sort,
        companyCode: companyCode, //公司
        bbBranchBaseList: branchCode, //部门
        bbCustomerBaseList: custId, //销售客户
        warehouseCode: warehouseCode,
        bbEmployeeList: staffCode, //业务员
        undoStatusList: undoStatus, //单据状态
        undoCode: undoCode, //退单号
        extContractCode: extContractCode, //外部合同号
        createdTimeBegain: createdTimeBegain,
        createdTimeEnd: createdTimeEnd, //创建时间
        undoDateBegain: undoDateBegain,
        undoDateEnd: undoDateEnd, //退货时间
        createdName: createdName, //创建人
        order: "desc",
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        contractCode : this.contractCode ,
        doNo: this.doNo,
      };
      sApi
        .selectListExtUndoSumV2(data)
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
        if (["sumCostAmt", "sumQty","secQty","sumAmt"].findIndex((it) => it == key) !== -1) {
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
    //获取状态
    getUndoStatusList() {
      let data = {
        dictNo: 1058,
      };
      sApi
        .selectDoStatusList(data)
        .then((res) => {
          this.undoStatusList = res.data;
          this.queryData();
        })
        .catch();
    },

    //重置
    resetData() {
      (this.customerList = []),
        (this.staffNameList = []),
        (this.departmentList = []),
        (this.branchNameStr = []),
        (this.company = {}); //公司
      this.companyCode = "";
      this.branch = []; //部门
      this.branchCode = "";
      this.customer = []; //销售客户
      this.custId = "";
      this.staffName = []; //业务员
      this.staffCode = "";
      (this.warehouse = {}), //仓库
        (this.warehouseCode = "");
      this.undoStatus = []; //状态
      this.extContractCode = ""; //外部合同号
      this.undoCode = ""; //退货单号
      this.createdTime = []; //创建时间
      this.undoDate = []; //退货日期
      this.createdName = ""; //创建人
      this.warrantCode = ""; //凭证号
      this.warrantMonth = ""; //期间
      this.contractCode = ""
      this.doNo = ""
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
      this.staffCode = e.empCode;
      this.staffNameList = e;
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
    //仓库弹窗
    warehouseTips() {
      console.log("ddfdfdf");
      this.warehouseShow = true;
    },
    //仓库弹窗关闭
    warehouseCancle() {
      this.warehouseShow = false;
    },
    //仓库弹窗确定获取数据
    warehouseSure(e) {
      this.warehouseShow = false;
      this.warehouse = e;
      this.warehouseCode = e.warehouseCode;
    },
    //查看
    handleDetails(type) {
      //type 1创建 2修改 3查看
      localStorage.removeItem("undoId");
      let url = "";
      if (type == 1) {
        url = "/index/salesManage/salesReturnOrderEdit";
      } else if (type == 2) {
        if (this.selectioned.length == 0) {
          //判断是否选中
          this.$openWarning("未选中数据");
          return;
        } else if (this.selectioned.length > 1) {
          this.$openWarning("此选项不能批量操作");
          return;
        } else if (
          this.selectioned[0].undoStatus != "10580005" &&
          this.selectioned[0].undoStatus != "10580025"
        ) {
          this.$openWarning("当前状态不可以修改");
          return;
        } else {
          localStorage.setItem("undoId", this.selectioned[0].undoId);
          url = "/index/salesManage/salesReturnOrderEdit";
        }
      } else {
        if (!this.selectioned.length) {
          //判断是否选中
          this.$openWarning("未选中数据");
          return;
        } else if (this.selectioned.length > 1) {
          this.$openWarning("此选项不能批量操作");
          return;
        }
        localStorage.setItem("undoId", this.selectioned[0].undoId);
        url = "/index/salesManage/salesReturnOrderDetail";
      }
      this.$router.push({
        //核心语句
        path: url, //跳转的路径
        query: {
          type: type,
        },
      });
    },
    //删除
    deleteSaleOutboundOrder() {
      if (!this.selectioned.length) {
        //判断是否选中
        this.$openWarning("未选择数据");
        return;
      } else {
        //保存、已驳回的状态可以进行删除
        var flag = false;
        this.selectioned.forEach((ele) => {
          if (ele.undoStatus != "10580005" && ele.undoStatus != "10580025") {
            flag = true;
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
              .deleteSaleUndoOrder(data)
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
    //月结
    accountPeriod(companyId) {
      let data = {
        companyId: companyId,
      };
      sApi
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
    //时间范围

    //审核
    handleToExamine(type) {
      //1通过 2驳回
      this.examineValue = ""; //通过，驳回
      this.rejectReason = ""; //驳回原因
      this.examineDate = ""; //日期
      if (this.selectioned.length == 0) {
        //判断是否选中
        this.$openWarning("未选择数据");
        return;
      }
      if (this.selectioned.length > 1) {
        this.examineOne = false; //是否是多条
      } else {
        this.accountPeriod(this.selectioned[0].companyId);
        this.examineDate = this.selectioned[0].undoDate; //默认当前数据的出库日期
        this.examineOne = true; //是否是多条
      }
      this.examineStatus = true;
      this.examineShow = true; //审核弹窗
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
      this.examineStatus = true;
    },
    //确定
    examineSure() {
      if (this.examineValue == "pass" && this.examineOne && !this.examineDate) {
        this.$openWarning("请选择退货日期");
        return;
      } else if (this.examineValue == "reject") {
        let th = this;
        th.selectioned.forEach((el) => {
          el.auditInfo = th.rejectReason;
        });
      }
      let that = this;
      this.selectioned.forEach((el) => {
        //类型 通过，驳回
        el.operationType = that.examineValue;
        if (el.operationType == "pass") {
          el.undoDate = that.examineDate;
        }
      });
      let data = this.selectioned;
      sApi
        .operateReturnStatus(data)
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
      if (this.selectioned.length == 0) {
        //判断是否选中
        this.$openWarning("未选择数据");
        return;
      }
      this.$confirm("是否确定提交?", {
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
            .operateReturnStatus(data)
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
        this.index = this.tableData.indexOf(row);
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
    staffSelect,
    warehouseSelect,
    contractSearch,
    editSearchItem,
    customerSelect,
  },
};
</script>
<style scoped>
.index .el-button.is-disabled,
.index .el-button.is-disabled:focus,
.index .el-button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-color: #fff;
  border: 1px solid #ebeef5;
}
</style>
