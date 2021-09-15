<template>
  <div id="otherware" class="content-div">
    <div class="button-div button-div-query auto-sibling">
      <el-button class="query-button" @click="queryData" icon="el-icon-search"
        >查询</el-button
      >
      <el-button @click="clearmsg" icon="el-icon-refresh">重置</el-button>
      <el-button @click="showEditPage('searchList')" icon="el-icon-setting" style="float:right"
        >自定义
      </el-button>
    </div>
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
            :tradeType="tradeType"
            :mytypearr="mytypearr"
            :moveType="moveType"
            :ydtypearr="ydtypearr"
            :rkdtypearr="rkdtypearr"
            :creattime="creattime"
            :createdName="createdName"
            :warrantCode="warrantCode"
            :warrantMonth="warrantMonth"
            :staffName="staffName"
            :staffTip="staffTip"
            :odoCode="odoCode"
            :odoType="odoType"
            :fhtypearr="fhtypearr"
            :odoStatus="odoStatus"
            :departmentList="departmentList"
            :staffNameList="staffNameList"
            @changeInput="changeData"
        />
      </div>
      </el-form>
    </div>
    <div class="button-div auto-sibling">
      <el-button
        @click="creatcom('creat')"
        icon="el-icon-folder-add"
        v-if="$actionFlag(`F001`)"
        >创建</el-button
      >
      <el-button
        @click="creatcom('edit')"
        icon="el-icon-edit"
        v-if="$actionFlag(`F002`)"
        >修改</el-button
      >
      <el-button
        @click="delitemsg('del')"
        icon="el-icon-delete"
        v-if="$actionFlag(`F003`)"
        >删除</el-button
      >
      <el-button
        @click="creatcom('look')"
        icon="el-icon-data-line"
        v-if="$actionFlag(`F004`)"
        >查看</el-button
      >
      <el-button
        icon="el-icon-finished"
        @click="delitemsg('submission')"
        v-if="$actionFlag(`F005`)"
        >提交</el-button
      >
      <el-button
        icon="el-icon-receiving"
        @click="delitemsg('review')"
        v-if="$actionFlag(`F006`)"
        >审核</el-button
      >
      <el-button icon="el-icon-download" v-if="$actionFlag(`F007`)"  @click="exportTable"
        >导出</el-button
      >
       <el-button @click="showEditPage('headerList')" icon="el-icon-setting" style="float:right"
        >自定义
      </el-button>
    </div>
    <!-- 表格 -->
    <div class="el-table-div" v-auto>
      <el-table
        border
        center
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
           <span v-if="item.key === 'stockoutQty'">{{ $numberToFixed(scope.row.stockoutQty, 3) }}</span>
           <span v-if="item.key === 'stockoutAmt'">{{ scope.row.stockoutAmt | $moneyFormat }}</span>
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
          :page-sizes="[100, 200, 300, 500]"
          :page-size="rows"
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
      <!--选择仓库-->
      <warehouse-select
        v-if="warehouseShow"
        :tipShow="warehouseShow"
        @warehouseCancle="warehouseCancle"
        @warehouseSure="warehouseSure"
      >
      </warehouse-select>
    </div>
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
          <label>出库日期</label>
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
import componySelect from "@/components/componySelect.vue"; //公司组件
import departmentSelect from "@/components/departmentSelect2.vue"; //部门组件
import staffSelect from "@/components/staffSelect2.vue"; //业务员组件
import warehouseSelect from "@/components/warehouseSelect.vue"; //仓库组件
import { log } from "util";
import { service, serviceJson } from "../../axios/index.js";
import {
  warelist,
  getMylx,
  getMylxs,
  reduceMsg,
  subMission,
  getTimes,
  toExamine,
  reJect,
  getCktime,
  odOhOdoListSumV2
} from "@/api/stockBranch/otheroutlets.js";
import contractSearch from "@/views/stockBranch/component/contractSearch";
import editSearchItem from "@/components/editSearchItem";
import { getFilter, setFilter } from "@/mixins/editCondition";
import { exportData } from "@/mixins/export.js";

const AllSearch = [
  { key: "companyName", label: "公司", checked: true },
  { key: "branchName", label: "部门", checked: true },
  { key: "staffName", label: "业务员", checked: true },
  { key: "warehouseName", label: "仓库", checked: true },
  { key: "odoCode", label: "出库单号", checked: true },
  { key: "odoType", label: "放货类型", checked: true },
  { key: "tradeType", label: "贸易类型", checked: true },
  { key: "moveType", label: "移动类型", checked: true },
  { key: "odoStatus", label: "出库单状态", checked: true },
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
    label: "部门",
    tooltip: true,
    key: "orgName",
    checked: true,
  },
  {
    label: "业务员",
    tooltip: true,
    key: "bizPersonName",
    checked: true,
  },
  {
    label: "出库单号",
    tooltip: true,
    key: "odoCode",
    checked: true,
    width: "150",
    sortable: true,
  },
  {
    label: "出库单状态",
    tooltip: true,
    key: "odoStatus",
    checked: true,
  },
  {
    label: "移动类型",
    tooltip: true,
    key: "moveType",
    checked: true,
  },
  {
    label: "出库数量",
    tooltip: true,
    key: "stockoutQty",
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
    label: "出库金额",
    tooltip: true,
    key: "stockoutAmt",
    checked: true,
    width: "120",
    temp:true,
    sortable: true,
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
  props: {},
  data() {
    return {
      branchNameStr: [],
      staffNameList: [],
      departmentList: [],
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
      name: "otherOutlets",
      staffsName: {},
      loading: true,
      total: 0, //条数
      pageNum: 1, //页码数
      rows: 100, //每页条数
      componyShow: false, //公司弹窗
      company: {}, //公司
      branchName: [], //部门
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      staffName: [], //员工
      warehouseShow: false, //仓库弹窗
      warehouse: "", //仓库
      createdName: ``, //创建人
      odoCode: "", //入库单号
      showOrHide: true,
      odoType: "", //放货类型
      fhtypearr: [], //放货类型下拉数据
      tradeType: [], //贸易类型
      mytypearr: [], //贸易类型下拉数据
      moveType: [], //移动类型
      ydtypearr: [], //移动类型下拉数据
      odoStatus: [], //出库单状态
      rkdtypearr: [], //入库单状态下拉数据
      creattime: [], //创建时间
      reducemsg: [], //选中数据
      navColor: {
        button: {
          backgroundColor: "",
        },
      },
      tableData: [],
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
      this.odoStatus = this.$route.params.status
        .split(",")
        .map((item) => Number(item));
      this.getUserlist();
    }
    let data = this.$getQueryData(this);
    this.departmentList = data.branchName;
    this.staffNameList = data.staffName;
    this.creattime[0] = data.beginTime ? data.beginTime : "";
    this.creattime[1] = data.endTime ? data.endTime : "";
    this.odoStatus = data.odoStatusList;
    this.tradeType = data.tradeTypeList;
    this.moveType = data.moveTypeList;
    this.getFilter();
  },
  mounted() {
    this.getMylxs();
    this.getfhlx();
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
          var beginTime = this.creattime[0] + "T00:00:00.000Z";
          var endTime = this.creattime[1] + "T23:59:59.000Z";
        }
      }
      let data = {
        sort: this.sort,
        rows: this.rows,
        pageNum: this.pageNum,
        companyCode: this.company.companyCode,
        odoType: this.odoType,
        orgCode: this.branchName.branchCode,
        bizPersonCode: this.staffName.empCode,
        bizPersonName: this.staffName.empName,
        odoCode: this.odoCode,
        warehouseCode: this.warehouse.warehouseCode, //仓库弹框
        tradeTypeList: this.tradeType,
        moveTypeList: this.moveType,
        odoStatusList: this.odoStatus,
        createdName: this.createdName,
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        beginTime: beginTime ? beginTime : "",
        endTime: endTime ? endTime : "",
      };
      let params = data;
      params.company = this.company;
      params.branchName = this.branchName;
      params.departmentList = this.departmentList;
      params.warehouse = this.warehouse;
      params.staffName = this.staffName;
      params.staffNameList = this.staffNameList;
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
        column.property == "stockoutQty" ||
        column.property == "stockoutAmt" || column.property == "secQty"
      ) {
        return "rightTd";
      } else {
        return "";
      }
    },
    getUserlist() {
      //加载表格数据
      if (this.creattime && this.creattime.length) {
        if (this.creattime[0] && this.creattime[1]) {
          var beginTime = this.creattime[0] + "T00:00:00.000Z";
          var endTime = this.creattime[1] + "T23:59:59.000Z";
        }
      }
      let data = {
        sort: this.sort,
        rows: this.rows,
        pageNum: this.pageNum,
        companyCode: this.company.companyCode,
        odoType: this.odoType,
        bbBranchBaseList: this.branchName,
        bbEmployeeList: this.staffName,
        odoCode: this.odoCode,
        warehouseCode: this.warehouse.warehouseCode, //仓库弹框
        tradeTypeList: this.tradeType,
        moveTypeList: this.moveType,
        odoStatusList: this.odoStatus,
        createdName: this.createdName,
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        beginTime: beginTime ? beginTime : "",
        endTime: endTime ? endTime : "",
      };
      let params = data;
      params.company = this.company;
      params.branchName = this.branchName;
      params.departmentList = this.departmentList;
      params.warehouse = this.warehouse;
      params.staffName = this.staffName;
      params.staffNameList = this.staffNameList;
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
            this.rkdtypearr.forEach((k) => {
              if (i.odoStatus === parseInt(k.dict_code)) {
                i.odoStatus = k.dict_value;
              }
            });
            this.ydtypearr.forEach((j) => {
              if (i.moveType === parseInt(j.dict_code)) {
                i.moveType = j.dict_value;
              }
            });
          });
        }
      });
    },
    //获取总计
    getSum() {
      //加载表格数据
      //加载表格数据
      if (this.creattime && this.creattime.length) {
        if (this.creattime[0] && this.creattime[1]) {
          var beginTime = this.creattime[0] + "T00:00:00.000Z";
          var endTime = this.creattime[1] + "T23:59:59.000Z";
        }
      }
      let data = {
        sort: this.sort,
        rows: this.rows,
        pageNum: this.pageNum,
        companyCode: this.company.companyCode,
        odoType: this.odoType,
        bbBranchBaseList: this.branchName,
        bbEmployeeList: this.staffName,
        odoCode: this.odoCode,
        warehouseCode: this.warehouse.warehouseCode, //仓库弹框
        tradeTypeList: this.tradeType,
        moveTypeList: this.moveType,
        odoStatusList: this.odoStatus,
        createdName: this.createdName,
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        beginTime: beginTime ? beginTime : "",
        endTime: endTime ? endTime : "",
      };
     odOhOdoListSumV2(data)
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
        if (["stockoutQty", "stockoutAmt","secQty"].findIndex((it) => it == key) !== -1) {
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
    getMylxs() {
      //获取贸易类型数据
      getMylx({
        dictNo: 1041,
      }).then((res) => {
        this.mytypearr = res.data;
      });
    },
    getmoremsg() {
      axios
        .all([
          getMylx({
            //移动类型
            dictNo: 1039,
            bizCategory: 1,
          }),
          getMylxs({
            //出库单状态
            dictNo: 1088,
          }),
        ])
        .then(
          axios.spread((allGetMylx, allGetMylxs) => {
            this.ydtypearr = allGetMylx.data;
            this.rkdtypearr = allGetMylxs.data;
            this.queryData();
          })
        );
    },
    getfhlx() {
      //获取放货类型
      getMylx({
        dictNo: 1028,
      }).then((res) => {
        this.fhtypearr = res.data;
      });
    },

    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.company = e;
      this.branchName = [];
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
    warehouseTips() {
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
      // this.warehouseCode=e.warehouseCode;
    },
    //放货类型选择
    changefhtype() {},
    changeState() {
      //贸易类型选择
    },
    changeydlx() {
      //移动类型选择
    },
    changerkd() {
      //入库单选择
    },
    inputShow() {
      this.showOrHide = this.$showOne(this.showOrHide);
    },
    handleSelectionChange(val) {
      //表格选中数据
      this.reducemsg = val;
    },
    handleSizeChange(val) {
      //每页条数
      this.rows = val;
      this.getUserlist();
    },
    handleCurrentChange(val) {
      //当前页码数
      this.pageNum = val;
      this.getUserlist();
    },
    creatlook(row) {
      let data = "look";
      this.$router.push({
        path: "/index/stockBranch/otherOutcreat",
        query: {
          data: data,
          msgid: row.odoId,
          msgcode: row.odoCode,
          version: row.version,
        },
      });
    },
    creatcom(type) {
      if (type === "look" || type === "edit") {
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
        let kbarr = [];
        kbreducemsg.forEach((i) => {
          this.rkdtypearr.forEach((k) => {
            if (i.odoStatus === k.dict_value) {
              i.odoStatus = k.dict_code;
              kbarr.push(i.odoStatus);
            }
          });
          this.ydtypearr.forEach((j) => {
            if (i.moveType === j.dict_value) {
              i.moveType = j.dict_code;
            }
          });
        });
        if (type === "edit") {
          if (
            kbarr.indexOf("10880010") != -1 ||
            kbarr.indexOf("10880015") != -1
          ) {
            this.$openWarning("只有保存和已驳回状态可以修改");
            return;
          }
        }
        this.$router.push({
          path: "/index/stockBranch/otherOutcreat",
          query: {
            data: type,
            msgid: this.reducemsg[0].odoId,
            msgcode: this.reducemsg[0].odoCode,
            version: this.reducemsg[0].version,
          },
        });
      } else {
        this.$router.push({
          path: "/index/stockBranch/otherOutcreat",
          query: {
            data: type,
          },
        });
      }
    },
    delitemsg(type) {
      //删除数据 del删除 review审核 submission提交
      if (this.reducemsg.length === 0) {
        this.$openWarning("请先选择一条数据");
        return;
      }
      let kbreducemsg = JSON.parse(JSON.stringify(this.reducemsg));
      let kbarr = [];
      kbreducemsg.forEach((i) => {
        this.rkdtypearr.forEach((k) => {
          if (i.odoStatus === k.dict_value) {
            i.odoStatus = k.dict_code;
            kbarr.push(i.odoStatus);
          }
        });
        this.ydtypearr.forEach((j) => {
          if (i.moveType === j.dict_value) {
            i.moveType = j.dict_code;
          }
        });
      });
      if (type === "del") {
        if (
          kbarr.indexOf("10880010") != -1 ||
          kbarr.indexOf("10800015") != -1
        ) {
          this.$openWarning("只有保存和已驳回状态可以删除");
          return;
        } else {
          this.$confirm("是否确定删除继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            reduceMsg({ odOhOdos: kbreducemsg }).then((res) => {
              if (res.code === "success") {
                this.$openSuccess(res.message);
                this.queryData();
              }
            });
          });
        }
      } else if (type === "review") {
        if (
          kbarr.indexOf("10880005") != -1 ||
          kbarr.indexOf("10880015") != -1 ||
          kbarr.indexOf("10880020") != -1
        ) {
          this.$openWarning("只有审核中状态可以审核");
          return;
        }
        if (kbreducemsg.length > 1) {
          this.examineOne = false; //是否是多条
        } else {
          //this.examineDate=this.selectioned[0].undoDate;//默认当前数据的出库日期
          this.examineOne = true; //是否是多条
        }
        this.examineShow = true; //审核弹窗
      } else {
        if(kbreducemsg.length>1){
          this.$openWarning("请选择单条数据提交");
          return;
        }
        if (
          kbarr.indexOf("10880010") != -1 ||
          kbarr.indexOf("10880015") != -1
        ) {
          this.$openWarning("只有保存和已驳回状态可以提交");
          return;
        } else {
          subMission({ odOhOdos: kbreducemsg }).then((res) => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.queryData();
            }
          });
        }
      }
    },
    //审核下拉选中的值
    examineSelect(e) {
      if (e === "pass" && this.examineOne) {
        getCktime({ odoId: this.reducemsg[0].odoId }).then((res) => {
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
        this.rkdtypearr.forEach((k) => {
          if (i.odoStatus === k.dict_value) {
            i.odoStatus = k.dict_code;
          }
        });
        this.ydtypearr.forEach((j) => {
          if (i.moveType === j.dict_value) {
            i.moveType = j.dict_code;
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
        toExamine({ odOhOdos: kbreducemsg }).then((res) => {
          if (res.code === "success") {
            this.$openSuccess(res.message);
            this.examineShow = false;
            this.queryData();
            this.examineValue = ""; ////审核选中的值
            this.examineDate = ""; //审核中的出库日期
          }
        });
      } else if (this.examineValue === "reject") {
        reJect({ odOhOdos: kbreducemsg }).then((res) => {
          if (res.code === "success") {
            this.$openSuccess(res.message);
            this.examineShow = false;
            this.queryData();
            this.examineValue = ""; ////审核选中的值
            this.rejectReason = "";
          }
        });
      }
    },
    clearmsg() {
      //重置
      (this.branchNameStr = []), (this.company = {});
      this.branchName = this.staffName = [];
      (this.staffNameList = []),
        (this.departmentList = []),
        (this.odoCode = this.comdm = this.creattime = this.createdName = this.odoType = this.warehouse =
          "");
      this.odoStatus = [];
      this.moveType = [];
      this.tradeType = [];
      this.warrantCode = ""; //凭证号
      this.warrantMonth = ""; //期间
    },
    rowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    contractSearch,
    editSearchItem,
    warehouseSelect,
  },
};
</script>

<style lang="scss">
#otherware {
  .el-date-editor.el-input {
    width: auto;
  }
  // .el-range-editor .el-range-input {
  //   width: 70%;
  // }
}
</style>
