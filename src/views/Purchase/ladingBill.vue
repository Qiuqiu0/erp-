<template>
  <div class="ladingBill content-div">
    <div class="button-div auto-sibling">
      <el-button
        class="query-button"
        @click="query"
        icon="el-icon-search"
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
          :companyName="companyName"
          :branchName="branchName"
          :supplierName="supplierName"
          :blDate="blDate"
          :poType="poType"
          :poTypeList="poTypeList"
          :extCode="extCode"
          :bizBlNo="bizBlNo"
          :sysBlNo="sysBlNo"
          :contractNo="contractNo"
          :arrivedInfoDate="arrivedInfoDate"
          :predictArrivedDate="predictArrivedDate"
          :portName="portName"
          :shipName="shipName"
          :unboxLimit="unboxLimit"
          :blStatus="blStatus"
          :blStatusList="blStatusList"
          :componyTip="componyTip"
          :arrivalTip="arrivalTip"
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
        :data="companyName"
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
      <ladingBill-Add
        v-if="ladingBillShow"
        :tipShow="ladingBillShow"
        @ladingBillCancle="ladingBillCancle"
        @creatSure="creatSure"
      ></ladingBill-Add>
      <!-- 港口弹窗 -->
      <Arrival-Port
        v-if="ArrivalPortShow"
        :tipShow="ArrivalPortShow"
        @ArrialPortCancle="ArrialPortCancle"
        @ArrialPortSure="ArrialPortSure"
      ></Arrival-Port>
    </div>
    <!-- 表格 -->
    <!--按钮样式-->
    <div class="button-div auto-sibling">
      <el-button
        class="query-button"
        @click="addList()"
        v-if="$actionFlag(`F001`)"
        icon="el-icon-folder-add"
        >创建</el-button
      >
      <el-button
        @click="ladingBillChange(2)"
        v-if="$actionFlag(`F002`)"
        icon="el-icon-edit"
        >修改</el-button
      >
      <el-button
        @click="setUp(0)"
        v-if="$actionFlag(`F003`)"
        icon="el-icon-delete"
        >删除</el-button
      >
      <el-button
        @click="ladingBillSee(5)"
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
      <el-dropdown
        szie="mini"
        @command="handleCommand"
        style="margin-left: 10px; margin-right: 10px"
      >
        <el-button icon="el-icon-magic-stick"
          >生成<i class="el-icon-arrow-down el-icon--right"></i
        ></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            command="3"
            v-if="$actionFlag(`F006`)"
            icon="el-icon-ship"
            >生成到港</el-dropdown-item
          >
          <el-dropdown-item
            command="2"
            v-if="$actionFlag(`F007`)"
            icon="el-icon-toilet-paper"
            >生成清关</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        v-if="$actionFlag(`F008`)"
        icon="el-icon-download"
        @click="exportTable"
        >导出</el-button
      >
      <el-button
        @click="approval"
        v-if="$actionFlag(`F009`)"
        icon="el-icon-thumb"
        >用印审批</el-button
      >
      <el-button
      icon="el-icon-thumb"
      @click="goTree"
      v-if="$actionFlag(`F010`)"
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
            <span v-if="item.key === 'blStatus'">
              <span v-if="scope.row.blStatus == 10110005">已保存</span>
              <span v-else-if="scope.row.blStatus == 10110010">已到单</span>
              <span v-else-if="scope.row.blStatus == 10110013">已到港</span>
              <span v-else-if="scope.row.blStatus == 10110015">审批中</span>
              <span v-else-if="scope.row.blStatus == 10110020">已用印</span>
              <span v-else-if="scope.row.blStatus == 10110025">已清关</span>
              <span v-else-if="scope.row.blStatus == 10110030">已关闭</span>
            </span>
            <span v-if="item.key === 'arrivedQty'">{{ $numberToFixed(scope.row.arrivedQty, 3) }}</span>
            <span v-if="item.key === 'secQty'">{{ $numberToFixed(scope.row.secQty, 3) }}</span>
            <span v-if="item.key === 'originAmt'">{{ scope.row.originAmt | $moneyFormat }}</span>
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
    <!--   自定义搜索选项-->
    <edit-search-item
      v-if="editPage"
      :list="editList"
      :title="editKey==='searchList'?'自定义搜索条件':'自定义表格排序'"
      :editPage="editPage"
      @editCancel="editCancel"
      @editSure="editSure"
    ></edit-search-item>
    <!--审核弹窗 开始-->
    <el-dialog
      :visible.sync="examineShow"
      :show-close="false"
      title="审核"
      width="400px"
      class="popup_box"
    >
      <div class="examine-dialog">
        <p v-if="!examineOne && examineValue == '1'" class="tips"></p>
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
        <el-col v-if="examineValue == '2'" :span="24" class="el-col">
          <label style="vertical-align: top">驳回原因</label>
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
          :disabled="isAllowedConfirm"
          icon="el-icon-check"
          >确定</el-button
        >
        <el-button @click="examineCancle" icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
    <!--审核弹窗 结束-->
  </div>
</template>
<script>
import api from "@/api/ladingBill/ladingBill";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect2.vue";
import supplierSelect from "@/components/supplierSelect2.vue";
import ladingBillAdd from "./ladingBillAdd.vue";
import ArrivalPort from "@/components/ArrivalPort.vue";
import contractSearch from "@/views/Purchase/component/contractSearch";
import editSearchItem from "@/components/editSearchItem";
import { getFilter, setFilter } from "@/mixins/editCondition";
import { exportData } from "@/mixins/export.js";

const AllSearch = [
  { key: "companyName", label: "公司", checked: true },
  { key: "branchName", label: "部门", checked: true },
  { key: "supplierName", label: "供应商", checked: true },
  { key: "extCode", label: "外部合同号", checked: true },
  { key: "blDate", label: "提单日期", checked: true },
  { key: "poType", label: "合同类型", checked: true },
  { key: "sysBlNo", label: "系统单据号", checked: true },
  { key: "contractNo", label: "采购合同号", checked: true },
  { key: "bizBlNo", label: "提单号", checked: true },
  { key: "arrivedInfoDate", label: "到单寄出日", checked: true },
  { key: "predictArrivedDate", label: "预计到港日", checked: true },
  { key: "portName", label: "卸货港", checked: true },
  { key: "shipName", label: "船名", checked: true },
  { key: "unboxLimit", label: "免箱期限", checked: true },
  { key: "blStatus", label: "单据状态", checked: true },
]; //全部选项标签
const ALLHeader = [
  {
    label: "系统提单号",
    tooltip: true,
    key: "sysBlNo",
    checked: true,
    width: "140",
    sortable: true,
  },
  { label: "外部合同号", tooltip: true, key: "extCode", checked: true },
  {
    label: "提单号",
    tooltip: true,
    key: "bizBlNo",
    checked: true,
    width: "100",
  },
  {
    label: "单据状态",
    tooltip: true,
    key: "blStatus",
    checked: true,
    temp: true,
  },
  {
    label: "公司",
    tooltip: true,
    key: "companyName",
    checked: true,
    width: "170",
  },
  { label: "部门", tooltip: true, key: "orgName", checked: true },
  {
    label: "供应商",
    tooltip: true,
    key: "supplierName",
    checked: true,
  },
  {
    label: "到货数量",
    tooltip: true,
    key: "arrivedQty",
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
    temp: true,
    width: "100",
    sortable: true,
  },
  {
    label: "业务币含税金额",
    tooltip: true,
    key: "originAmt",
    checked: true,
    temp: true,
    width: "140",
    sortable: true,
  },
  {
    label: "卸货港",
    tooltip: true,
    key: "arrivedPort",
    checked: true,
    width: "170",
  },
  {
    label: "预计到港期",
    tooltip: true,
    key: "predictArrivedDate",
    checked: true,
    width: "170",
    sortable: true,
  },
  {
    label: "制单日期",
    tooltip: true,
    key: "createdTime",
    checked: true,
    width: "170",
  },
]; //所有表头
export default {
  name: "ladingBill",
  data() {
    return {
      supplierList: [],
      branchNameStr: [],
      departmentList: [],
      sort: "",
      fixHead: [
        { type: "selection", key: "selection",width: "60", checked: true },
        {
          type: "index",
          label: "序号",
          tooltip: true,
          key: "index",
          checked: true,
        }

      ],
      editPage: false,
      searchList: AllSearch,
      headerList: ALLHeader,
      editKey: "",
      editList: [],
      show: true,
      companyName: ``, //公司
      branchName: [], //部门
      portName: [], //港口
      blDate: [],
      contractNo:'',
      arrivedInfoDate: [],
      predictArrivedDate: [],
      componyShow: false, //公司弹窗
      supplierShow: "", //供应商弹窗
      ladingBillShow: "", //新建弹框
      departmentShow: false, //部门弹窗
      ArrivalPortShow: false, //到达港口
      poType: [], //合同类型
      sysBlNo: "", //系统单据号
      extCode: "", //外部合同号
      bizBlNo: "", //提单号
      shipName: "", //船名
      unboxLimit: "", //免箱期限
      supplierName: [], //供应商
      dialogTableVisible: false,
      value2: "",
      value3: "",
      isAllowedConfirm: true, //审核是否确认
      poTypeList: [{ value: 0, label: "进口采贸" }],
      blStatus: [], //单据状态
      blStatusList: [],
      loading: false, //表格loading
      tableData: [], //表格
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      selectioned: [],
      Examine: "", //审核
      postDate: "", //审核日期
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
      sumTol: {}, //总计
    };
  },
  mixins: [getFilter, setFilter, exportData],
  watch:{
    '$route'(){
      this.query();
    },
  },
  created() {
    if (this.$route.params.status) {
      this.blStatus = this.$route.params.status
        .split(",")
        .map((item) => Number(item));
      this.tableDataList();
    }
    // data.branchName = this.branchName;
    //   data.departmentList = this.departmentList;
    //   data.supplierName = this.supplierName;
    //   data.supplierList = this.supplierList;
    //取查询条件
    let data = this.$getQueryData(this);
    this.departmentList = data.branchName;
    this.supplierList = data.supplierName;
    this.poType=data.poTypeList;
    this.blStatus=data.blStatusList;
    if (data.blStartDate) {
      this.blDate[0] = data.blStartDate;
      this.blDate[1] = data.blEndDate;
    }
    if (data.arrivedInfoStartDate) {
      this.arrivedInfoDate[0] = data.arrivedInfoStartDate;
      this.arrivedInfoDate[1] = data.arrivedInfoEndDate;
    }
    if (data.predictArrivedStartDate) {
      this.predictArrivedDate[0] = data.predictArrivedStartDate;
      this.predictArrivedDate[1] = data.predictArrivedEndDate;
    }
    this.selectList();
    this.query();
    this.getFilter();
  },
  mounted() {
    this.companyList();
  },
  methods: {
    query(){
      this.tableDataList();
      this.getSum();
    },
    //查看生命树
    goTree(){
        if (this.selectioned.length === 1) {
        sessionStorage.setItem("bizCode", this.selectioned[0].sysBlNo);
        sessionStorage.setItem("bizType", "OD_BL");
        this.$router.push({
          path:"/index/home/tree",
          query:{
            bizCode:this.selectioned[0].sysBlNo,
            bizType:"OD_BL"
          }
        });
         let obj = {
        url: "treeModel",
        baseUrl: "",
        label: "生命树",
        moduleCode: "",
        params: {},
        query: {
          bizCode:this.selectioned[0].sysBlNo,
          bizType:"OD_BL"
        },
      };
      this.$store.commit("tabsListAdd", obj);
      } else {
        this.$openWarning("请选择一条合同查看生命树");
      }
    },
    exportTable() {
      if (this.blDate) {
        var blStartDate = this.blDate[0];
        var blEndDate = this.blDate[1];
      }
      if (this.arrivedInfoDate) {
        var arrivedInfoStartDate = this.arrivedInfoDate[0];
        var arrivedInfoEndDate = this.arrivedInfoDate[1];
      }
      if (this.predictArrivedDate) {
        var predictArrivedStartDate = this.predictArrivedDate[0];
        var predictArrivedEndDate = this.predictArrivedDate[1];
      }
      if (this.sysBlNo) {
        var sysBlNo = this.sysBlNo;
      }
      if (this.extCode) {
        var extCode = this.extCode;
      }
      if (this.bizBlNo) {
        var bizBlNo = this.bizBlNo;
      }
      if (this.shipName) {
        var shipName = this.shipName;
      }
      if (this.unboxLimit) {
        var unboxLimit = this.unboxLimit;
      }
      // if(this.portName.arrivedPort){
      //   var arrivedPort = this.portName.portName
      // }
      if (this.portName.portName) {
        var arrivedPort = this.portName.portName;
      }
      if (this.poType) {
        var poType = this.poType;
      }
      let params = {
        sysBlNo: sysBlNo,
        extCode: extCode,
        bizBlNo: bizBlNo,
        shipName: shipName,
        unboxLimit: unboxLimit,
        pageNum: this.pageNum,
        sort: this.sort,
        pageSize: this.pageSize,
        blStatusList: this.blStatus,
        companyCode: this.companyName.companyCode,
        blStartDate: blStartDate,
        blEndDate: blEndDate,
        arrivedInfoStartDate: arrivedInfoStartDate,
        arrivedInfoEndDate: arrivedInfoEndDate,
        predictArrivedStartDate: predictArrivedStartDate,
        predictArrivedEndDate: predictArrivedEndDate,
        poTypeList: poType,
        arrivedPort: arrivedPort,
        orgCode: this.branchName.branchCode,
        supplierId: this.supplierName.supplierId,
        contractNo: this.contractNo,
      };
      let data = params;
      data.companyName = this.companyName;
      data.branchName = this.branchName;
      data.supplierName = this.supplierName;
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
    inputShow() {
      this.show = this.$showOne(this.show);
    },
    // handleChange(val) {
    //   this.blStatus = val;
    // },
    //生成下拉
    handleCommand(type) {
      //1生成到港2生成清单
      // localStorage.removeItem("id"); //移除所有的缓存数据
      if (this.selectioned.length == 0) {
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
      if (this.selectioned[0].blStatus != 10110010 && type == 3) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "该状态不能生成到港",
          type: "warning",
        });
        return false;
      }
      if (this.selectioned[0].blStatus != 10110020 && type == 2) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "该状态不能生成清关",
          type: "warning",
        });
        return false;
      }
      localStorage.setItem("id", this.selectioned[0].blId);
      let url = "";
      if (type == 3) {
        url = "/index/Purchase/ladingBillEstablish";
      } else if (type == 2) {
        url = "/index/Purchase/ladingBillEstablish";
      }
      this.$router.push({
        //核心语句
        path: url, //跳转的路径
        query: { type: 2 },
      });
    },
    //审核下拉选中的值
    examineSelect(e) {
      this.isAllowedConfirm = false;
      this.examineValue = e; //审核选中的值
    },
    //查询列表接口
    tableDataList() {
      if (this.blDate) {
        var blStartDate = this.blDate[0];
        var blEndDate = this.blDate[1];
      }
      if (this.arrivedInfoDate) {
        var arrivedInfoStartDate = this.arrivedInfoDate[0];
        var arrivedInfoEndDate = this.arrivedInfoDate[1];
      }
      if (this.predictArrivedDate) {
        var predictArrivedStartDate = this.predictArrivedDate[0];
        var predictArrivedEndDate = this.predictArrivedDate[1];
      }
      if (this.sysBlNo) {
        var sysBlNo = this.sysBlNo;
      }
      if (this.extCode) {
        var extCode = this.extCode;
      }
      if (this.bizBlNo) {
        var bizBlNo = this.bizBlNo;
      }
      if (this.shipName) {
        var shipName = this.shipName;
      }
      if (this.unboxLimit) {
        var unboxLimit = this.unboxLimit;
      }
      // if(this.portName.arrivedPort){
      //   var arrivedPort = this.portName.portName
      // }
      if (this.portName.portName) {
        var arrivedPort = this.portName.portName;
      }
      if (this.poType) {
        var poType = this.poType;
      }
      let params = {
        sysBlNo: sysBlNo,
        extCode: extCode,
        bizBlNo: bizBlNo,
        shipName: shipName,
        unboxLimit: unboxLimit,
        pageNum: this.pageNum,
        sort: this.sort,
        pageSize: this.pageSize,
        blStatusList: this.blStatus,
        companyCode: this.companyName.companyCode,
        blStartDate: blStartDate,
        blEndDate: blEndDate,
        arrivedInfoStartDate: arrivedInfoStartDate,
        arrivedInfoEndDate: arrivedInfoEndDate,
        predictArrivedStartDate: predictArrivedStartDate,
        predictArrivedEndDate: predictArrivedEndDate,
        poTypeList: poType,
        arrivedPort: arrivedPort,
        bbBranchBaseList: this.branchName,
        bbSupplierBaseList: this.supplierName,
        contractNo: this.contractNo,
      };
      let data = params;
      data.companyName = this.companyName;
      data.branchName = this.branchName;
      data.departmentList = this.departmentList;
      data.supplierName = this.supplierName;
      data.supplierList = this.supplierList;
      data.portName=this.portName;
      this.$setQueryData(this, data);
      api
        .odBlList(params)
        .then((res) => {
          if (res.code == "success") {
            this.tableData = res.data;
            this.tableData.forEach((item) => {
              item.predictArrivedDate = this.$timeFun(
                item.predictArrivedDate,
                1
              );
              item.createdTime = this.$timeFun(item.createdTime, 1);
              if (item.unloadPort == null) {
                //到单时取运输信息卸货港//到港时取业务进程卸货港
                item.unloadPort = item.unloadingPort;
              }
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
       if (this.blDate) {
        var blStartDate = this.blDate[0];
        var blEndDate = this.blDate[1];
      }
      if (this.arrivedInfoDate) {
        var arrivedInfoStartDate = this.arrivedInfoDate[0];
        var arrivedInfoEndDate = this.arrivedInfoDate[1];
      }
      if (this.predictArrivedDate) {
        var predictArrivedStartDate = this.predictArrivedDate[0];
        var predictArrivedEndDate = this.predictArrivedDate[1];
      }
      if (this.sysBlNo) {
        var sysBlNo = this.sysBlNo;
      }
      if (this.extCode) {
        var extCode = this.extCode;
      }
      if (this.bizBlNo) {
        var bizBlNo = this.bizBlNo;
      }
      if (this.shipName) {
        var shipName = this.shipName;
      }
      if (this.unboxLimit) {
        var unboxLimit = this.unboxLimit;
      }
      // if(this.portName.arrivedPort){
      //   var arrivedPort = this.portName.portName
      // }
      if (this.portName.portName) {
        var arrivedPort = this.portName.portName;
      }
      if (this.poType) {
        var poType = this.poType;
      }
      let params = {
        sysBlNo: sysBlNo,
        extCode: extCode,
        bizBlNo: bizBlNo,
        shipName: shipName,
        unboxLimit: unboxLimit,
        pageNum: this.pageNum,
        sort: this.sort,
        pageSize: this.pageSize,
        blStatusList: this.blStatus,
        companyCode: this.companyName.companyCode,
        blStartDate: blStartDate,
        blEndDate: blEndDate,
        arrivedInfoStartDate: arrivedInfoStartDate,
        arrivedInfoEndDate: arrivedInfoEndDate,
        predictArrivedStartDate: predictArrivedStartDate,
        predictArrivedEndDate: predictArrivedEndDate,
        poTypeList: poType,
        arrivedPort: arrivedPort,
        bbBranchBaseList: this.branchName,
        bbSupplierBaseList: this.supplierName,
        contractNo: this.contractNo,
      };
      api
        .odBlListSumV2(params)
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
        if (["arrivedQty", "secQty","originAmt"].findIndex((it) => it == key) !== -1) {
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
        column.property == "arrivedQty" ||
        column.property == "secQty" ||
        column.property == "originAmt"
      ) {
        return "rightTd";
      } else {
        return "";
      }
    },
    //合同下拉
    companyList() {
      let params = {
        dictNo: "1014",
      };
      api
        .select(params)
        .then((res) => {
          if (res.code == "success") {
            this.poTypeList = res.data;
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
    //单据状态下拉
    selectList() {
      let params = {
        dictNo: "1011",
      };
      api
        .select(params)
        .then((res) => {
          if (res.code == "success") {
            this.blStatusList = res.data;
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
    //新建
    addList() {
      this.ladingBillShow = true;
      localStorage.removeItem("id"); //移除所有的缓存数据
    },
    //type==0删除
    setUp(type) {
      if (this.selectioned.length == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning",
        });
        return false;
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
            (params.blId = this.selectioned[i].blId),
              (params.version = this.selectioned[i].version),
              data.push(params);
          }
          api
            .deleteOdBl(data)
            .then((res) => {
              if (res.code == "success") {
                this.$message({
                  duration: 1000,
                  showClose: true,
                  message: res.data,
                  type: "success",
                });
                this.query();
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
    //提交(只能对已到港的发起审批)
    addSub() {
      if (this.selectioned.length == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning",
        });
        return false;
      }
      // else if(this.selectioned.length>1){
      //     this.$openWarning("不能批量操作");
      //      return;
      //   }
      if (this.selectioned[0].blStatus == 10110005) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已保存状态不能提交",
          type: "warning",
        });
        return false;
      }
      if (this.selectioned[0].blStatus == 10110010) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已到单状态不能提交",
          type: "warning",
        });
        return false;
      }
      if (this.selectioned[0].blStatus == 10110015) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "审批中状态不能提交",
          type: "warning",
        });
        return false;
      }
      if (this.selectioned[0].blStatus == 10110020) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已用印状态不能提交",
          type: "warning",
        });
        return false;
      }
      if (this.selectioned[0].blStatus == 10110025) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已清关状态不能提交",
          type: "warning",
        });
        return false;
      }
      if (this.selectioned[0].blStatus == 10110030) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已关闭状态不能提交",
          type: "warning",
        });
        return false;
      }
      let data = [];
      this.selectioned.forEach((item, index) => {
        data.push(item.blId);
      });
      let blId = data.join(",");
      console.log("213", blId);
      let params = {
        blId: blId,
      };
      api
        .sealApprove(params)
        .then((res) => {
          if (res.code == "success") {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.data,
              type: "success",
            });
            this.query();
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
    //用印审批
    approval() {
      if (this.selectioned.length == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning",
        });
        return false;
      }
      if (this.selectioned[0].blStatus == 10110005) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已保存状态不能用印审批",
          type: "warning",
        });
        return false;
      }
      if (this.selectioned[0].blStatus == 10110010) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已到单状态不能用印审批",
          type: "warning",
        });
        return false;
      }
      if (this.selectioned[0].blStatus == 10110013) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已到港状态不能用印审批",
          type: "warning",
        });
        return false;
      }
      if (this.selectioned[0].blStatus == 10110020) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已用印状态不能用印审批",
          type: "warning",
        });
        return false;
      }
      if (this.selectioned[0].blStatus == 10110025) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已清关状态不能用印审批",
          type: "warning",
        });
        return false;
      }
      if (this.selectioned[0].blStatus == 10110030) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已关闭状态不能用印审批",
          type: "warning",
        });
        return false;
      }
      console.log("2121", this.selectioned);
      if (this.selectioned.length > 1) {
        this.examineOne = false; //是否是多条
      } else {
        this.accountPeriod(this.selectioned[0].companyId);
        this.examineDate = this.selectioned[0].blDate; //默认当前数据的出库日期
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
    //确定
    examineSure() {
      if (this.examineValue == "1" && this.examineOne && !this.examineDate) {
        this.$openWarning("请选择提单日期");
        return;
      } else if (
        this.examineValue == "1" &&
        this.examineOne &&
        this.examineDate
      ) {
        this.selectioned[0].blDate = this.examineDate;
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
        (params.blId = this.selectioned[i].blId),
          (params.version = this.selectioned[i].version),
          (params.approveStatus = this.examineValue),
          (params.auditInfo = auditInfo),
          (params.blDate = this.selectioned[0].blDate);
        list.push(params);
      }
      api
        .executeApprove(list)
        .then((res) => {
          this.examineShow = false;
          if (res.code == "success") {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.data,
              type: "success",
            });
            this.query();
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
    //取消
    examineCancle() {
      this.examineShow = false; //审核弹窗
      this.examineValue = ""; ////审核选中的值
      this.examineDate = ""; //审核中的出库日期
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
      this.companyName = e;
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
    //部门弹窗打开
    departmentTip() {
      // if (this.companyName == ``) {
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
    //创建弹框取消
    ladingBillCancle() {
      this.ladingBillShow = false;
    },
    creatSure(e) {
      console.log("www", e);
      this.formList = e;
    },
    //到达港口
    arrivalTip() {
      this.ArrivalPortShow = true;
    },
    //取消到达港口弹窗
    ArrialPortCancle() {
      this.ArrivalPortShow = false;
    },
    ArrialPortSure(e) {
      this.ArrivalPortShow = false;
      this.portName = e;
      console.log(e);
    },
    //表格选择
    handleChange(e) {
      this.selectioned = e;
      // if (e.length === 0) {
      //   this.selectioned = null;
      // }
    },
    //修改
    ladingBillChange(type) {
      if (this.selectioned.length == 0) {
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
      if (this.selectioned[0].blStatus == 10110020) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已用印状态不能修改",
          type: "warning",
        });
        return;
      }
      if (this.selectioned[0].blStatus == 10110015) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "审批中状态不能修改",
          type: "warning",
        });
        return;
      }
      if (this.selectioned[0].blStatus == 10110030) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "已关闭状态不能修改",
          type: "warning",
        });
        return;
      }
      localStorage.setItem("contractNo", this.selectioned[0].contractNo);
      localStorage.setItem("id", this.selectioned[0].blId);
      this.$router.push({
        //核心语句
        path: "/index/Purchase/ladingBillEstablish", //跳转的路径
      });
      if (
        this.selectioned[0].blStatus == 10110013 ||
        this.selectioned[0].blStatus == 10110025
      ) {
        this.$router.push({
          //核心语句
          path: "/index/Purchase/ladingBillEstablish", //跳转的路径
          query: { type: 2 },
        });
        localStorage.setItem("type", 2);
      }
    },
    //查看
    ladingBillSee(type) {
      if (this.selectioned.length == 0) {
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
      localStorage.setItem("id", this.selectioned[0].blId);
      this.$router.push({
        //核心语句
        path: "/index/Purchase/laddingBillEstablishSee", //跳转的路径
        query: { type: 5,id:this.selectioned[0].blId },
      });
    },
    //重置
    clearNone() {
      this.companyName = "";
      this.branchName = [];
      this.supplierName = [];
      this.supplierList = [];
      this.blDate = [];
      this.poType = [];
      this.blStatus = [];
      this.sysBlNo = "";
      this.extCode = "";
      this.arrivedInfoDate = [];
      this.predictArrivedDate = [];
      this.shipName = "";
      this.unboxLimit = "";
      this.bizBlNo = ""; //提单号
      this.portName.portName = ""; //到达港口
      this.contractNo = ""; //到达港口
      this.query();
      this.departmentList = [];
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.tableDataList();
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.tableDataList();
    },
    rowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
  },
  components: {
    componySelect,
    departmentSelect,
    supplierSelect,
    ladingBillAdd,
    contractSearch,
    editSearchItem,
    ArrivalPort,
  },
};
</script>
<style scoped lang="scss">
.dataTop {
  vertical-align: top;
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
