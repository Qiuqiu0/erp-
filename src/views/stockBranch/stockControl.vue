<template>
  <div id="stockcontrol" class="content-div">
    <div class="button-div button-div-query auto-sibling">
      <el-button class="query-button" @click="queryData" icon="el-icon-search"
        >查询</el-button
      >
      <el-button icon="el-icon-refresh" @click="clearmsg">重置</el-button>
      <el-button @click="showEditPage('searchList')" icon="el-icon-setting" style="float:right"
        >自定义
      </el-button>
    </div>
    <!-- input -->
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
            :branch="branchName"
            :departmentTip="departmentTip"
            :warehouse="warehouse"
            :warehouseTips="warehouseTips"
            :itCode="itCode"
            :itStatus="itStatus"
            :dbdtypearr="dbdtypearr"
            :branchNames="branchNames"
            :warehouseNames="warehouseNames"
            :itMoveType="itMoveType"
            :dbtypearr="dbtypearr"
            :payload="item.payload"
            :creattime="creattime"
            :createdName="createdName"
            :warrantCode="warrantCode"
            :warrantMonth="warrantMonth"
            :staffName="staffName"
            :staffTip="staffTip"
            :departmentList="departmentList"
            :departmentLists="departmentLists"
            :staffNameList="staffNameList"
            @changeInput="changeData"
        />
      </div>
      </el-form>
    </div>
    <div class="button-div auto-sibling">
      <el-dropdown szie="mini" @command="handleCommand">
        <el-button icon="el-icon-folder-add"
          >创建<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            command="a"
            icon="el-icon-suitcase"
            v-if="$actionFlag(`F001`)"
            >移库</el-dropdown-item
          >
          <el-dropdown-item
            command="b"
            icon="el-icon-suitcase-1"
            v-if="$actionFlag(`F002`)"
            >调拨</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        @click="creatcom('edit')"
        icon="el-icon-edit"
        v-if="$actionFlag(`F003`)"
        >修改</el-button
      >
      <el-button
        @click="delitemsg('del')"
        icon="el-icon-delete"
        v-if="$actionFlag(`F004`)"
        >删除</el-button
      >
      <el-button
        @click="creatcom('look')"
        icon="el-icon-data-line"
        v-if="$actionFlag(`F005`)"
        >查看</el-button
      >
      <el-button
        @click="delitemsg('submission')"
        icon="el-icon-finished"
        v-if="$actionFlag(`F006`)"
        >提交</el-button
      >
      <el-button
        @click="delitemsg('review')"
        icon="el-icon-receiving"
        v-if="$actionFlag(`F007`)"
        >审核</el-button
      >
      <!-- <el-button
        @click="delitemsg('writeoff')"
        icon="el-icon-document-delete"
        v-if="$actionFlag(`F008`)"
        >冲销</el-button
      > -->
      <el-button icon="el-icon-download" v-if="$actionFlag(`F009`)"  @click="exportTable"
        >导出</el-button
      >
      <el-button @click="showEditPage('headerList')" icon="el-icon-setting" style="float:right"
        >自定义
      </el-button>
    </div>
    <!-- 表格 -->
    <div class="el-table-div" v-auto>
      <el-table
        center
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="calc(100% - 35px)"
        @selection-change="handleSelectionChange"
        @row-dblclick="creatlook"
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
           <span v-if="item.key === 'itQty'">{{$numberToFixed(scope.row.itQty, 3)}}</span>
           <span v-if="item.key === 'itAmt'">{{scope.row.itAmt | $moneyFormat}}</span>
           <span v-if="item.key === 'secQty'">{{ $numberToFixed(scope.row.secQty, 3) }}</span>
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
          :page-sizes="[100, 200, 300,500]"
          :page-size="rows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 选择公司弹窗 -->
    <compony-select
      v-if="componyShow"
      :tipShow="componyShow"
      @tipsCancle="tipsCancle"
      @tipsSure="tipsSure"
    >
    </compony-select>
    <!-- 选择员工弹窗 -->
    <staff-select
      v-if="staffShow"
      :tipShow="staffShow"
      :data="{companyName:company.companyName}"
      @staffCancle="staffCancle"
      @staffSure="staffSure"
    >
    </staff-select>
    <!-- 选择部门弹窗 -->
    <department-select
      v-if="departmentShow"
      :tipShow="departmentShow"
      :data="company"
      @departmentCancle="departmentCancle"
      @departmentSure="departmentSure"
    >
    </department-select>
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
          <label>调拨日期</label>
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
import axios from "axios";
import { mapState } from "vuex";
import componySelect from "@/components/componySelect.vue";
import staffSelect from "@/components/staffSelect2.vue";
import departmentSelect from "@/components/departmentSelect2.vue"; //部门组件
import warehouseSelect from "@/components/warehouseSelect.vue"; //仓库组件
import { service, serviceJson } from "../../axios/index.js";
import {
  getMylx,
  getMylxs,
  warelist,
  reduceMsg,
  submissionMsg,
  nomissionMsg,
  writeoffMsg,
  toExamine,
  reJect,
  getTimes,
  getDbtime,
  odInvTransferListSumV2
} from "@/api/stockBranch/stockcontrol.js";
import contractSearch from "@/views/stockBranch/component/contractSearch";
import editSearchItem from "@/components/editSearchItem";
import { getFilter, setFilter } from "@/mixins/editCondition";
import { exportData } from "@/mixins/export.js";

const AllSearch = [
  { key: "companyName", label: "公司", checked: true },
  { key: "staffName", label: "业务员", checked: true },
  { key: "itCode", label: "调拨单号", checked: true },
  { key: "itStatus", label: "调拨单状态", checked: true },
  { key: "branchNames", label: "调出部门", checked: true },
  { key: "branchName", label: "调入部门", checked: true, payload: "come" },
  { key: "warehouseNames", label: "调出仓库", checked: true },
  { key: "warehouseName", label: "调入仓库", checked: true },
  { key: "creattime", label: "创建时间", checked: true },
  { key: "createdName", label: "创建人", checked: true },
  { key: "warrantCode", label: "凭证号", checked: true },
  { key: "warrantMonth", label: "期间", checked: true },
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
    label: "移出部门",
    tooltip: true,
    key: "outOrgName",
    width: "100",
    checked: true,
  },
  {
    label: "移入部门",
    tooltip: true,
    key: "inOrgName",
    checked: true,
  },
  {
    label: "业务员",
    tooltip: true,
    key: "bizPersonName",
    checked: true,
  },
  {
    label: "调拨单号",
    tooltip: true,
    key: "itCode",
    checked: true,
    width: "150",
    sortable: true,
  },
  {
    label: "调拨单状态",
    tooltip: true,
    key: "itStatus",
    checked: true,
  },
  {
    label: "调拨单类型",
    tooltip: true,
    key: "itMoveType",
    checked: true,
  },
  {
    label: "调拨数量",
    tooltip: true,
    key: "itQty",
    checked: true,
    temp: true,
    sortable: true,
  },
  {
    label: "第二数量",
    tooltip: true,
    key: "secQty",
    checked: true,
    temp: true,
    sortable: true,
  },
  {
    label: "调拨金额",
    tooltip: true,
    key: "itAmt",
    checked: true,
    width: "120",
    sortable: true,
    temp:true
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
  },
  {
    label: "创建时间",
    tooltip: true,
    key: "createdTime",
    checked: true,
    width: "100",
    temp: true,
  },
  {
    label: "修改人",
    tooltip: true,
    key: "updatedName",
    checked: true,
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
  name: "stockControl",
  props: {},
  data() {
    return {
      branchNameStr: [],
      staffNameList: [],
      departmentList: [],
      departmentLists: [],
      sort: "",
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
      radio: "", //审核状态
      dialogVisible: false,
      loading: true,
      total: 0, //条数
      pageNum: 1, //页码数
      rows: 100, //每页条数
      showOrHide: true,
      company: {}, //公司
      componyShow: false, //公司弹框
      staffName: [], //业务员
      staffShow: false, //员工弹窗
      creattime: [], //创建时间
      createdName: "", //创建人
      itCode: "", //调拨单号
      itStatus: [], //调拨单状态
      dbdtypearr: [], //调拨单状态下拉数组
      itMoveType: "", //调拨单类型
      dbtypearr: [], //调拨单类型下拉数组
      branchNames: [], //调出部门
      branchName: [], //调入部门
      warehouseShow: false, //仓库弹窗
      warehouseNames: {}, //调出仓库
      warehouse: {}, //调入仓库
      warehousetype: "", //记录是调入仓库还是调出仓库
      branchtype: "", //记录是调出部门还是调入部门
      departmentShow: false, //部门弹窗
      tableData: [],
      reducemsg: [], //选中数据
      navColor: {
        button: {
          backgroundColor: "",
        },
      },
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
      warrantCode: "",
      warrantMonth: "",
      sumTol:{}
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
      this.itStatus = this.$route.params.status
        .split(",")
        .map((item) => Number(item));
      this.getUserlist();
    }
    let data = this.$getQueryData(this);
    this.departmentList = data.branchName;
    this.departmentLists = data.branchNames;
    this.staffNameList = data.staffName;
    this.itStatus=data.itStatusList;
    if (data.createdTime) {
      this.creattime[0] = data.createdTime;
      this.creattime[1] = data.createdTimeEnd;
    }
    this.getFilter();
  },
  mounted() {
    this.getmoremsg();
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
    queryData(){
      this.getUserlist();
      this.getSum();
    },
    exportTable() {
      if (this.creattime && this.creattime.length) {
        if (this.creattime[0] && this.creattime[1]) {
          var createdTime = this.creattime[0] + "T00:00:00.000Z";
          var createdTimeEnd = this.creattime[1] + "T23:59:59.000Z";
        }
      }
      let data = {
        rows: this.rows,
        sort: this.sort,
        pageNum: this.pageNum,
        companyCode: this.company.companyCode, //公司
        outOrgCode: this.branchNames.branchCode, //调出部门
        inOrgCode: this.branchName.branchCode, //调入部门
        bizPersonCode: this.staffName.empCode,
        bizPersonName: this.staffName.empName,
        itCode: this.itCode, //调拨单号
        itStatusList: this.itStatus, //调拨单状态
        outWarehouseCode: this.warehouseNames.warehouseCode, //调出仓库
        inWarehouseCode: this.warehouse.warehouseCode, //调入仓库
        createdName: this.createdName, //创建人
        itMoveType: this.itMoveType, //调拨单类型
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        createdTime: createdTime ? createdTime : "",
        createdTimeEnd: createdTimeEnd ? createdTimeEnd : "",
      };
      let params = data;
      params.company = this.company;
      params.branchName = this.branchName;
      params.staffName = this.staffName;
      params.branchNames = this.branchNames;
      params.warehouseNames = this.warehouseNames;
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
      if (column.property == "itQty" || column.property == "itAmt" || column.property == "secQty") {
        return "rightTd";
      } else {
        return "";
      }
    },
    handleCommand(e) {
      let type = "creat";
      if (e === "a") {
        this.$router.push({
          path: "/index/stockBranch/stockControlcreat",
          query: {
            data: type,
          },
        });
      } else if (e === "b") {
        this.$router.push({
          path: "/index/stockBranch/stockControlout",
          query: {
            data: type,
          },
        });
      }
    },
    creatlook(row) {
      let data = "look";
      if (row.itMoveType === "移库") {
        this.$router.push({
          path: "/index/stockBranch/stockControlcreat",
          query: {
            data: data,
            msgid: row.itId,
            version: row.version,
          },
        });
      } else if (row.itMoveType === "调拨") {
        this.$router.push({
          path: "/index/stockBranch/stockControlout",
          query: {
            data: data,
            msgid: row.itId,
            version: row.version,
          },
        });
      }
    },
    creatcom(type) {
      //修改查看按钮
      if (this.reducemsg.length === 0) {
        this.$message({
          message: "请先选择一条数据",
          type: "warning",
        });
        return;
      } else if (this.reducemsg.length > 1) {
        this.$message({
          message: "至多选中一条数据",
          type: "warning",
        });
        return;
      }
      let kbreducemsg = JSON.parse(JSON.stringify(this.reducemsg));
      let reducearr = [];
      kbreducemsg.forEach((i) => {
        this.dbdtypearr.forEach((k) => {
          if (i.itStatus === k.dict_value) {
            i.itStatus = k.dict_code;
          }
        });
        this.dbtypearr.forEach((j) => {
          if (i.itMoveType === j.dict_value) {
            i.itMoveType = j.dict_code;
          }
        });
        reducearr.push(i.itStatus);
      });
      if (type === "edit") {
        if (
          kbreducemsg[0].itStatus === "10680015" ||
          kbreducemsg[0].itStatus === "10680010" ||
          kbreducemsg[0].itStatus === "10680020"
        ) {
          this.$message({
            message: "只有已保存或已驳回状态可以修改",
            type: "warning",
          });
          return;
        }
      }
      if (kbreducemsg[0].itMoveType === "10390040") {
        this.$router.push({
          path: "/index/stockBranch/stockControlcreat",
          query: {
            data: type,
            msgid: kbreducemsg[0].itId,
            version: kbreducemsg[0].version,
          },
        });
      } else if (kbreducemsg[0].itMoveType === "10390035") {
        this.$router.push({
          path: "/index/stockBranch/stockControlout",
          query: {
            data: type,
            msgid: kbreducemsg[0].itId,
            version: kbreducemsg[0].version,
          },
        });
      }
    },
    getUserlist() {
      //加载数据
      if (this.creattime && this.creattime.length) {
        if (this.creattime[0] && this.creattime[1]) {
          var createdTime = this.creattime[0] + "T00:00:00.000Z";
          var createdTimeEnd = this.creattime[1] + "T23:59:59.000Z";
        }
      }
      let data = {
        rows: this.rows,
        sort: this.sort,
        pageNum: this.pageNum,
        companyCode: this.company.companyCode, //公司
        outBbBranchBaseList: this.branchNames, //调出部门
        inBbBranchBaseList: this.branchName, //调入部门
        bbEmployeeList: this.staffName,
        itCode: this.itCode, //调拨单号
        itStatusList: this.itStatus, //调拨单状态
        outWarehouseCode: this.warehouseNames.warehouseCode, //调出仓库
        inWarehouseCode: this.warehouse.warehouseCode, //调入仓库
        createdName: this.createdName, //创建人
        itMoveType: this.itMoveType, //调拨单类型
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        createdTime: createdTime ? createdTime : "",
        createdTimeEnd: createdTimeEnd ? createdTimeEnd : "",
      };
      let params = data;
      params.company = this.company;
      params.branchName = this.branchName;
      params.departmentList = this.departmentList;
      params.staffName = this.staffName;
      params.staffNameList = this.staffNameList;
      params.branchNames = this.branchNames;
      params.departmentLists = this.departmentLists;
      params.warehouseNames = this.warehouseNames;
      params.warehouse = this.warehouse;
      this.$setQueryData(this, params);
      warelist(data).then((res) => {
        if (res.code === "success") {
          this.loading = false;
          this.tableData = res.data;
          this.total = res.total;
          this.tableData.forEach((i) => {
            i.createdTime = this.$timeFun(i.createdTime, true);
            i.updatedTime = this.$timeFun(i.updatedTime, true);
          });
          this.tableData.forEach((i) => {
            this.dbdtypearr.forEach((k) => {
              if (i.itStatus === parseInt(k.dict_code)) {
                i.itStatus = k.dict_value;
              }
            });
            this.dbtypearr.forEach((j) => {
              if (i.itMoveType === parseInt(j.dict_code)) {
                i.itMoveType = j.dict_value;
              }
            });
          });
        }
      });
    },
    //获取总计
    getSum() {
      //加载表格数据
      if (this.creattime && this.creattime.length) {
        if (this.creattime[0] && this.creattime[1]) {
          var createdTime = this.creattime[0] + "T00:00:00.000Z";
          var createdTimeEnd = this.creattime[1] + "T23:59:59.000Z";
        }
      }
      let data = {
        rows: this.rows,
        sort: this.sort,
        pageNum: this.pageNum,
        companyCode: this.company.companyCode, //公司
        outBbBranchBaseList: this.branchNames, //调出部门
        inBbBranchBaseList: this.branchName, //调入部门
        bbEmployeeList: this.staffName,
        itCode: this.itCode, //调拨单号
        itStatusList: this.itStatus, //调拨单状态
        outWarehouseCode: this.warehouseNames.warehouseCode, //调出仓库
        inWarehouseCode: this.warehouse.warehouseCode, //调入仓库
        createdName: this.createdName, //创建人
        itMoveType: this.itMoveType, //调拨单类型
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        createdTime: createdTime ? createdTime : "",
        createdTimeEnd: createdTimeEnd ? createdTimeEnd : "",
      };
     odInvTransferListSumV2(data)
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
        if (["itQty","itAmt" ,"secQty"].findIndex((it) => it == key) !== -1) {
          sums[index] = this.sumTol ? this.$sumTolFormat(this.sumTol[key]): "";
        } else {
          sums[index] = "";
        }
      });
      this.$nextTick(() => {
        this.$refs.multipleTable.doLayout();
      });
      return sums;
    },
    getmoremsg() {
      axios
        .all([
          getMylx({
            //获取调拨单状态
            dictNo: 1068,
          }),
          getMylxs({
            //获取调拨单类型
            dictNo: 1039,
            bizCategory: 2,
          }),
        ])
        .then(
          axios.spread((allGetMylx, allGetMylxs) => {
            this.dbdtypearr = allGetMylx.data;
            this.dbtypearr = allGetMylxs.data;
            this.queryData();
          })
        );
    },
    inputShow() {
      this.showOrHide = this.$showOne(this.showOrHide);
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.company = e;
      this.branchName = this.branchNames = [];
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
    departmentTip(e) {
      // if (this.company == ``) {
      //   this.$openWarning("请先选择公司");
      //   return false;
      // }
      this.departmentShow = true;
      this.branchtype = e;
    },
    //部门弹窗关闭
    departmentCancle() {
      this.departmentShow = false;
    },
    //部门弹窗确定获取数据
    departmentSure(e) {
      this.departmentShow = false;
      // let branchNameStr = [];
      if (this.branchtype === "come") {
        this.branchName = e;
        // e.forEach((item)=>{
        //   branchNameStr.push(item.branchName);
        // })
        this.departmentList = e;
        // this.branchNameStr = branchNameStr;
      } else {
        this.branchNames = e;
        //   e.forEach((item)=>{
        //   branchNameStr.push(item.branchName);
        // })
        this.departmentLists = e;
        // this.branchNameStr = branchNameStr;
      }
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
    //仓库弹窗
    warehouseTips(e) {
      this.warehousetype = e;
      this.warehouseShow = true;
    },
    //仓库弹窗关闭
    warehouseCancle() {
      this.warehouseShow = false;
    },
    //仓库弹窗确定获取数据
    warehouseSure(e) {
      this.warehouseShow = false;
      if (this.warehousetype === "out") {
        this.warehouseNames = e;
      } else {
        this.warehouse = e;
      }
    },
    shclick(reducearr, kbreducemsg) {
      if (
        reducearr.indexOf("10680005") != -1 ||
        reducearr.indexOf("10680010") != -1 ||
        reducearr.indexOf("10680020") != -1 ||
        reducearr.indexOf("10680025") != -1
      ) {
        this.$message({
          message: "只有提交才可以审核",
          type: "warning",
        });
        return;
      }
      if (kbreducemsg.length > 1) {
        this.examineOne = false; //是否是多条
      } else {
        //this.examineDate=this.selectioned[0].undoDate;//默认当前数据的出库日期
        this.examineOne = true; //是否是多条
      }
      this.examineShow = true; //审核弹窗
    },
    //审核下拉选中的值
    examineSelect(e) {
      if (e === "pass" && this.examineOne) {
        getDbtime({ itId: this.reducemsg[0].itId }).then((res) => {
          if (res.code === "success") {
            this.examineDate = this.$timeFun(res.data, true);
          }
        });
        getTimes({ companyId: this.reducemsg[0].companyId }).then((res) => {
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
      let kbreducemsg = JSON.parse(JSON.stringify(this.reducemsg));
      kbreducemsg.forEach((i) => {
        this.dbdtypearr.forEach((k) => {
          if (i.itStatus === k.dict_value) {
            i.itStatus = k.dict_code;
          }
        });
        this.dbtypearr.forEach((j) => {
          if (i.itMoveType === j.dict_value) {
            i.itMoveType = j.dict_code;
          }
        });
      });
      if (kbreducemsg.length === 1) {
        kbreducemsg[0].auditDate = this.examineDate;
      } else {
        kbreducemsg.forEach((i) => {
          i.auditInfo = this.rejectReason;
        });
      }
      if (this.examineValue === "pass") {
        toExamine({ odInvTransfers: kbreducemsg }).then((res) => {
          if (res.code === "success") {
            this.examineShow = false;
            this.$openSuccess(res.message);
            this.queryData();
            this.examineValue = ""; ////审核选中的值
            this.examineDate = ""; //审核中的出库日期
          }
        });
      } else if (this.examineValue === "reject") {
        reJect({ odInvTransfers: kbreducemsg }).then((res) => {
          if (res.code === "success") {
            this.examineShow = false;
            this.$openSuccess(res.message);
            this.queryData();
            this.examineValue = ""; ////审核选中的值
            this.rejectReason = "";
          }
        });
      }
    },
    delitemsg(type) {
      if (this.reducemsg.length === 0) {
        this.$message({
          message: "请先选择一条数据",
          type: "warning",
        });
        return;
      }
      let kbreducemsg = JSON.parse(JSON.stringify(this.reducemsg));
      let reducearr = [];
      kbreducemsg.forEach((i) => {
        this.dbdtypearr.forEach((k) => {
          if (i.itStatus === k.dict_value) {
            i.itStatus = k.dict_code;
          }
        });
        this.dbtypearr.forEach((j) => {
          if (i.itMoveType === j.dict_value) {
            i.itMoveType = j.dict_code;
          }
        });
        reducearr.push(i.itStatus);
      });
      switch (type) {
        case "del":
          if (
            reducearr.indexOf("10680010") != -1 ||
            reducearr.indexOf("10680015") != -1
          ) {
            this.$openWarning("已提交或已审核不能删除");
            return;
          }
          this.$confirm("是否确定删除继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            reduceMsg({ odInvTransfers: kbreducemsg }).then((res) => {
              if (res.code === "success") {
                this.$message({
                  message: res.message,
                  type: "success",
                });
                this.queryData();
              }
            });
          });
          break;
        case "submission":

          if(kbreducemsg.length>1){
            this.$openWarning("请选择单条数据提交");
            return;
          }
          if( reducearr.indexOf("10680010") != -1 ||
            reducearr.indexOf("10680015") != -1){
            this.$openWarning("已提交或已审核不能提交");
            return;
          }
          this.tjmsg(reducearr, kbreducemsg);
          break;
        case "review":
          this.shclick(reducearr, kbreducemsg);
          break;
        case "writeoff":
          this.writeoff(reducearr, kbreducemsg);
          break;
      }
    },
    tjmsg(tjarr, kbreducemsg) {
      //提交
      if (tjarr.indexOf("10680020") != -1 || tjarr.indexOf("10680010") != -1) {
        this.$message({
          message: "已审核或已冲销不能提交",
          type: "warning",
        });
        return;
      }
      submissionMsg({ odInvTransfers: kbreducemsg }).then((res) => {
        if (res.code === "success") {
          this.$message({
            message: res.message,
            type: "success",
          });
          this.queryData();
        }
      });
    },
    clearmsg() {
      //重置
      this.company = this.warehouse = this.warehouseNames = {};
      this.itCode = this.itMoveType = this.creattime = "";
      this.staffName = this.branchNames = this.branchName = [];
      (this.departmentList = []),
        (this.departmentLists = []),
        (this.branchNameStr = []),
        (this.staffNameList = []),
        (this.createdName = "");
      this.warrantCode = ""; //凭证号
      this.warrantMonth = ""; //期间
      this.itStatus = [];
    },
    writeoff(tjarr, kbreducemsg) {
      if (
        tjarr.indexOf("10680005") != -1 ||
        tjarr.indexOf("10680015") != -1 ||
        tjarr.indexOf("10680020") != -1 ||
        tjarr.indexOf("10680025") != -1
      ) {
        this.$message({
          message: "只有审核可以冲销",
          type: "warning",
        });
        return;
      }
      writeoffMsg({ odInvTransfers: kbreducemsg }).then((res) => {
        if (res.code === "success") {
          this.$message({
            message: res.message,
            type: "success",
          });
          this.queryData();
        }
      });
    },
    //创建人
    manTip() {},
    handleSelectionChange(val) {
      //表格选中数据
      this.reducemsg = val;
    },
    handleSizeChange(val) {
      this.rows = val;
      this.getUserlist();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getUserlist();
    },
    rowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
  },
  components: {
    componySelect,
    staffSelect,
    departmentSelect,
    contractSearch,
    editSearchItem,
    warehouseSelect,
  },
};
</script>

<style lang="scss">
#stockcontrol {
  .el-date-editor.el-input {
    width: auto;
  }
  // .el-range-editor .el-range-input {
  //   width: 70%;
  // }
}
</style>
