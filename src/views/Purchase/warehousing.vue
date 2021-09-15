<template>
  <div class="warehousing  content-div">
    <div class="button-div auto-sibling">
      <el-button class="query-button" @click="queryData" icon="el-icon-search"
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
          :wvNo="wvNo"
          :fromNo="fromNo"
          :externalPoNo="externalPoNo"
          :supplierName="supplierName"
          :poType="poType"
          :warehouseName="warehouseName"
          :wvStatus="wvStatus"
          :project="project"
          :createdTime="createdTime"
          :WvDate="WvDate"
          :currency="currency"
          :baseCurrencyRate="baseCurrencyRate"
          :warrantCode="warrantCode"
          :warrantMonth="warrantMonth"
          :poTypeList="poTypeList"
          :blStatus="blStatus"
          :unwvReverse="unwvReverse"
          :warehouseTips="warehouseTips"
          :componyTip="componyTip"
          :coinTip="coinTip"
          :projectTip="projectTip"
          :departmentTip="departmentTip"
          :supplierTip="supplierTip"
          :departmentList="departmentList"
          :supplierList="supplierList"
          :transitStatus="transitStatus"
          :transitStatusList="transitStatusList"
          :wvTypeList="wvTypeList"
          :wvType="wvType"
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
      <warehousing-Add
        v-if="warehousingShow"
        :tipShow="warehousingShow"
        @warehousingCancle="warehousingCancle"
        @creatSure="creatSure"
      ></warehousing-Add>
      <!--选择仓库-->
      <warehouse-select
        v-if="warehouseShow"
        :tipShow="warehouseShow"
        @warehouseCancle="warehouseCancle"
        @warehouseSure="warehouseSure"
      >
      </warehouse-select>
      <!-- 选择项目弹窗 -->
      <project-select
        v-if="projectShow"
        :tipShow="projectShow"
        @projectCancle="projectCancle"
        @projectSure="projectSure"
      ></project-select>
      <!-- 创建进口采购-->
      <warehousingIn-Add
        v-if="warehousingInShow"
        :tipShow="warehousingInShow"
        @warehousingInCancle="warehousingInCancle"
        @warehousingInSure="warehousingInSure"
      ></warehousingIn-Add>
      <!-- 选择物料弹窗 -->
      <matter-select
        v-if="matterShow"
        :tipShow="matterShow"
        @matterCancle="matterCancle"
        @matterSure="matterSure"
      ></matter-select>
      <!-- 选择币种弹窗 -->
      <coin-select
        v-if="coinShow"
        :tipShow="coinShow"
        @coinCancle="coinCancle"
        @coinSure="coinSure"
      ></coin-select>
    </div>
    <!--按钮样式-->
    <div class="button-div auto-sibling">
      <el-dropdown
        szie="mini"
        @command="handleCommand"
        style="margin-left:10px;margin-right:10px;"
      >
        <el-button icon="el-icon-folder-add"
          >创建<i class="el-icon-arrow-down el-icon--right"></i
        ></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            command="1"
            icon="el-icon-location-outline"
            v-if="$actionFlag(`F001`)"
            >内贸采购</el-dropdown-item
          >
          <el-dropdown-item
            command="4"
            icon="el-icon-discover"
            v-if="$actionFlag(`F002`)"
            >进口采购</el-dropdown-item
          >
          <el-dropdown-item
            command="3"
            icon="el-icon-crop"
            v-if="$actionFlag(`F003`)"
            >提单采购</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        @click="ladingBillChange()"
        v-if="$actionFlag(`F004`)"
        icon="el-icon-edit"
        >修改</el-button
      >
      <el-button
        @click="setUp()"
        icon="el-icon-delete"
        v-if="$actionFlag(`F005`)"
        >删除</el-button
      >
      <el-button
        @click="ladingBillSee()"
        icon="el-icon-data-line"
        v-if="$actionFlag(`F006`)"
        >查看</el-button
      >
      <el-button
        @click="addSub(1)"
        icon="el-icon-finished"
        v-if="$actionFlag(`F007`)"
        >入库提交</el-button
      >
      <el-button
        @click="toExamine()"
        icon="el-icon-receiving"
        v-if="$actionFlag(`F012`)"
        >入库审核</el-button
      >
      <el-button
        @click="approval"
        style="width:85px"
        icon="el-icon-truck"
        v-if="$actionFlag(`F009`)"
        >供应商发货</el-button
      >
      <el-button
        @click="Confirmation"
        icon="el-icon-upload"
        v-if="$actionFlag(`F010`)"
        >入库确认</el-button
      >
      <el-button
        @click="exportTable"
        icon="el-icon-download"
        v-if="$actionFlag(`F011`)"
        >导出</el-button
      >
      <el-button
        @click="cancellationOdWv"
        v-if="$actionFlag(`F013`)"
        icon="el-icon-finished"
        >整单作废提交</el-button
      >
      <el-button
        @click="cancelExamine"
        v-if="$actionFlag(`F014`)"
        icon="el-icon-receiving"
        >整单作废审核</el-button
      >
       <el-button
        @click="transitSubmit"
         icon="el-icon-finished"
        v-if="$actionFlag(`F016`)"
        >在途单提交</el-button
      >
       <el-button
        @click="transitExamine()"
        icon="el-icon-receiving"
        v-if="$actionFlag(`F017`)"
        >在途单审核</el-button
      >
      <el-button
      icon="el-icon-thumb"
      @click="goTree"
      v-if="$actionFlag(`F015`)"
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
            <span v-if="item.key === 'poType'">
              <span v-for="(item, index) in contractType" :key="index">
                <span v-if="item.dict_code == scope.row.poType">
                  {{ item.dict_value }}
                </span>
              </span>
            </span>
            <span v-if="item.key === 'wvType'">
              <span v-if="scope.row.wvType == 10620005">在途单</span>
              <span v-else-if="scope.row.wvType == 10620010">入库单</span>
            </span>
            <span v-if="item.key === 'actReceive'">
              <span>{{ $numberToFixed(scope.row.actReceive, 3) }}</span>
            </span>
            <span v-if="item.key === 'actReceiveSec'">
              <span>{{ $numberToFixed(scope.row.actReceiveSec, 3) }}</span>
            </span>
            <span v-if="item.key === 'wvStatus'">
              <span
                v-for="item in blStatus"
                v-show="item.dict_code == scope.row.wvStatus"
                :key="item.dict_code"
                >{{ item.dict_value }}</span>
            </span>
            <span v-if="item.key === 'transitStatus'">
              <span v-for="(item, index) in transitStatusList" :key="index">
                <span v-if="item.dict_code == scope.row.transitStatus">
                  {{ item.dict_value }}
                </span>
              </span>
            </span>
            <span v-if="item.key === 'unwvReverse'">{{ scope.row.unwvReverse == 1 ? "是" : "否" }}</span>
            <span v-if="item.key === 'wvAmtS'">{{ scope.row.wvAmtS| $moneyFormat }}</span>
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
        <!-- <p v-if="!examineOne && examineValue=='1'"
           class="tips">
          <i class="el-icon-info"></i>
          批量审核时入库时间以入库单中入库日期为准，请事先确认，谨慎操作！
        </p> -->
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
          v-if="examineOne && examineValue == '1' && examineType==1"
          :span="24"
          class="el-col"
        >
          <label>入库日期</label>
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
          :disabled="isAllowedConfirm"
          icon="el-icon-check"
          >确定</el-button
        >
        <el-button @click="examineCancle" icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
    <!--审核弹窗 结束-->

    <!--作废审核开始-->
    <el-dialog
      :visible.sync="cancelExamineShow"
      :show-close="false"
      title="审核"
      width="400px"
      class="popup_box"
    >
      <div class="examine-dialog">
        <el-col :span="24" class="el-col">
          <label>审核</label>
          <el-select
            clearable
            size="small"
            class="el-select"
            @change="examineSelect2"
            v-model="cancelExamineValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in cancelExamineList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </div>
      <div class="button-div2">
        <el-button
          @click="cancellationApproveOdWv"
          :disabled="isAllowedConfirm2"
          icon="el-icon-check"
          >确定</el-button
        >
        <el-button @click="cancelExamineCancle" icon="el-icon-close"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "@/api/ladingBill/ladingBill";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect2.vue";
import supplierSelect from "@/components/supplierSelect2.vue";
import warehousingAdd from "./warehousingAdd.vue";
import warehousingInAdd from "./warehousingInAdd.vue";
import warehouseSelect from "@/components/warehouseSelect.vue";
import projectSelect from "@/components/projectSelect.vue";
import matterSelect from "@/components/matterSelect.vue";
import coinSelect from "@/components/coinSelect.vue";
import contractSearch from "@/views/Purchase/component/contractSearch";
import editSearchItem from "@/components/editSearchItem";
import { getFilter, setFilter } from "@/mixins/editCondition";
import { exportData } from "@/mixins/export.js";

const AllSearch = [
  { key: "companyName", label: "公司", checked: true },
  { key: "branchName", label: "部门", checked: true },
  { key: "supplierName", label: "供应商", checked: true },
  { key: "externalPoNo", label: "外部合同号", checked: true },
  { key: "wvNo", label: "入库单号", checked: true },
  { key: "fromNo", label: "来源单号", checked: true },
  { key: "poType", label: "合同类型", checked: true },
  { key: "warehouseName", label: "仓库", checked: true },
  { key: "wvStatus", label: "单据状态", checked: true },
  { key: "projectCode", label: "项目号", checked: true },
  { key: "projectName", label: "项目名称", checked: true },
  { key: "createdTime", label: "创建日期", checked: true },
  { key: "WvDate", label: "入库日期", checked: true },
  { key: "currencyName", label: "业务币币别", checked: true },
  { key: "baseCurrencyRate", label: "本位币汇率", checked: true },
  { key: "warrantCode", label: "凭证号", checked: true },
  { key: "warrantMonth", label: "期间", checked: true },
  { key: "unwvReverse", label: "是否退货", checked: true },
  { key: "wvType", label: "入库单类型", checked: true },
  { key: "transitStatus", label: "在途状态", checked: true },
]; //全部选项标签
const ALLHeader = [
  {
    label: "入库单号",
    tooltip: true,
    key: "wvNo",
    checked: true,
    width: "140",
    sortable: true,
  },
  {
    label: "来源单号",
    tooltip: true,
    key: "fromNo",
    checked: true,
    width: "140",
    otherKey: "erpBlNo",
  },
  {
    label: "入库单类型",
    tooltip: true,
    key: "wvType",
    checked: true,
    temp: true,
  },
  {
    label: "单据状态",
    tooltip: true,
    key: "wvStatus",
    checked: true,
    temp: true,
  },
  {
    label: "在途状态",
    tooltip: true,
    key: "transitStatus",
    checked: true,
    temp: true,
  },
  {
    label: "是否退货冲销",
    tooltip: true,
    key: "unwvReverse",
    checked: true,
    temp: true,
    width:120
  },
  { label: "供应商", tooltip: true, key: "supplierName", checked: true },
  {
    label: "部门",
    tooltip: true,
    key: "orgName",
    checked: true,
  },
  {
    label: "仓库",
    tooltip: true,
    key: "warehouseName",
    checked: true,
  },
  { label: "公司", tooltip: true, key: "companyName", checked: true },
  {
    label: "实收数量",
    tooltip: true,
    key: "actReceive",
    checked: true,
    temp: true,
    sortable: true,
    width: 120
  },
  {
    label: "第二单位实收数量",
    tooltip: true,
    key: "actReceiveSec",
    checked: true,
    temp: true,
    width: 170

  },
  {
    label: "含税金额",
    tooltip: true,
    key: "wvAmtS",
    checked: true,
    temp:true,
    sortable: true,
    width: 170
  },
  { label: "凭证号", tooltip: true, key: "warrantCode", checked: true },
  {
    label: "期间",
    tooltip: true,
    key: "warrantMonth",
    checked: true,
    sortable: true,
    width: 120
  },
  {
    label: "创建人",
    tooltip: true,
    key: "createdName",
    checked: true,
  },
]; //所有表头
export default {
  name: "warehousing",
  data() {
    return {
      unwvReverse:'',
      supplierList:[],
      branchNameStr:[],
      departmentList:[],
      sort:"",
      fixHead: [
        { type: "selection", key: "selection",width:"60", checked: true },
        {
          type: "index",
          label: "行号",
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
      companyName: ``, //公司
      supplier: ``, //供应商
      branchName: [], //部门
      portName: "", //港口
      warehouseName: {}, //仓库
      project: {}, //项目
      goodsName: "", //物料名称
      blDate: [],
      arrivedInfoDate: [],
      predictArrivedDate: [],
      componyShow: false, //公司弹窗
      supplierShow: "", //供应商弹窗
      warehousingShow: "", //新建弹框
      departmentShow: false, //部门弹窗
      ArrivalPortShow: false, //到达港口
      warehouseShow: false, //仓库
      projectShow: false, //项目
      matterShow: false, //物料名称
      poType: [], //合同类型
      fromNo: "", //系统单据号
      externalPoNo: "", //外部合同号
      bizBlNo: "", //提单号
      currency: {},
      shipName: "", //船名
      wvNo: "", //入库单号
      unboxLimit: "", //免箱期限
      supplierName: [], //供应商
      dialogTableVisible: false,
      value2: "",
      value3: "",
      poTypeList: [{ value: 0, label: "进口采贸" }],
      wvStatus: [], //单据状态
      blStatus: [{}],
      loading: false, //表格loading
      tableData: [], //表格
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目,
      coinShow: false,
      createdTime: [],
      WvDate: [],
      baseCurrencyRate: "",
      mainData: [],
      selectioned: [], //选中
      selectionedIndex: null, //选中索引
      warehousingInShow: "",
      currencyCodeOrgin: "",
      currencyName: "",
      dialogVisible: false, //审核弹窗
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
      isAllowedConfirm: true, //是否允许审核

      cancelExamineShow: false, //作废审核
      cancelExamineValue: "", //作废审核选中的值
      cancelExamineList: [
        { value: "1", label: "通过" },
        { value: "2", label: "驳回" },
      ],
      isAllowedConfirm2: false, //审核是否可以点击
      sumTol: {},
      warrantCode: "", //凭证号
      warrantMonth: "", //期间
      wvType:'',//入库单类型
      wvTypeList:[],
      transitStatus:[],
      transitStatusList:[],
      examineType:'',//1入库审核 2，在途审核
    };
  },
  mixins: [getFilter, setFilter, exportData],
  watch:{
    // '$route'(){
    //   this.tableDataList();
    // },
  },
  created() {
    if (this.$route.params.status) {
      this.wvStatus = this.$route.params.status
        .split(",")
        .map((item) => Number(item));
      this.tableDataList();
    }
    // data.branchName = this.branchName;
    //   data.departmentList = this.departmentList;
    //   data.supplierName = this.supplierName;
    //   data.supplierList = this.supplierList;
    let data = this.$getQueryData(this);
    this.departmentList = data.branchName;
    this.supplierList = data.supplierName;
    this.poType=data.poTypeList;
    this.wvStatus=data.wvStatusList;
    this.wvType=data.wvTypeList;
    this.transitStatus=data.transitStatusList;
    if (data.createdStartDate) {
      this.createdTime[0] = data.createdStartDate;
      this.createdTime[1] = data.createdEndDate;
    }
    if (data.wvStartDate) {
      this.WvDate[0] = data.wvStartDate;
      this.WvDate[1] = data.wvEndDate;
    }
    this.selectwvType();
    this.selectTransitStatus();
    this.queryData();
    this.selectList();
    this.companyList();
    this.selectMainList();
    this.getFilter();
  },
  methods: {
    //查看生命树
    goTree(){
        if (this.selectioned.length === 1) {
        sessionStorage.setItem("bizCode", this.selectioned[0].wvNo);
        sessionStorage.setItem("bizType", "OD_WV");
        this.$router.push({
          path:"/index/home/tree",
          query:{
            bizCode:this.selectioned[0].wvNo,
            bizType:"OD_WV"
          }
        });
        let obj = {
        url: "treeModel",
        baseUrl: "",
        label: "生命树",
        moduleCode: "",
        params: {},
        query: {
          bizCode:this.selectioned[0].wvNo,
          bizType:"OD_WV"
        },
      };
      this.$store.commit("tabsListAdd", obj);
      } else {
        this.$openWarning("请选择一条合同查看生命树");
      }
    },
    exportTable() {
      if (this.fromNo) {
        var fromNo = this.fromNo;
      }
      if (this.externalPoNo) {
        var externalPoNo = this.externalPoNo;
      }
      if (this.shipName) {
        var shipName = this.shipName;
      }
      if (this.unboxLimit) {
        var unboxLimit = this.unboxLimit;
      }
      if (this.createdTime) {
        var createdStartDate = this.createdTime[0];
        var createdEndDate = this.createdTime[1];
      }
      if (this.WvDate) {
        var wvStartDate = this.WvDate[0];
        var wvEndDate = this.WvDate[1];
      }
      if (this.baseCurrencyRate) {
        var baseCurrencyRate = this.baseCurrencyRate;
      }
      if (this.wvStatus) {
        var wvStatus = this.wvStatus;
      }
      // if (this.currencyCodeOrgin) {
      //   var currencyCodeOrgin = this.currencyCodeOrgin;
      // }
      if (this.poType) {
        var poType = this.poType;
      }
      let params = {
        fromNo: fromNo, //来源单号
        externalPoNo: externalPoNo, //外部合同号
        pageNum: this.pageNum,
        sort: this.sort,
        pageSize: this.pageSize,
        wvNo: this.wvNo, //入库单号
        wvStatusList: wvStatus, //单据状态
        projectCode: this.project.projectCode, //项目号
        projectName: this.project.projectName, //项目号
        companyCode: this.companyName.companyCode, //公司
        orgCode: this.branchName.branchCode, //部门
        supplierCode: this.supplier.supplierCode , //供应商
        supplierName: this.supplier.supplierName,
        warehouseCode: this.warehouseName.warehouseCode,
        createdEndDate: createdEndDate,
        createdStartDate: createdStartDate, //创建日期
        wvEndDate: wvEndDate,
        wvStartDate: wvStartDate, //入库日期
        baseCurrencyRate: baseCurrencyRate, //本位币汇率
        currencyCodeOrgin: this.currency.currencyCode, //业务类别
        poTypeList: poType, //合同类型
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        transitStatusList:this.transitStatus,
        wvType:this.wvType
      };
      let data = params;
      data.project = this.project;
      data.companyName = this.companyName;
      data.branchName = this.branchName;
      data.supplier = this.supplier;
      data.warehouseName = this.warehouseName;
      data.currency = this.currency;
      if(this.unwvReverse !== ''){
        data.unwvReverse = this.unwvReverse
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
    poTypeChange(val) {
      this.poType = val;
    },
    //审核下拉选中的值
    examineSelect(e) {
      this.examineValue = e; //审核选中的值
      this.isAllowedConfirm = false;
    },
    //审核下拉选中的值
    examineSelect2(e) {
      if (this.cancelExamineValue) {
        this.isAllowedConfirm2 = false;
      } else {
        this.isAllowedConfirm2 = true;
      }
      this.cancelExamineValue = e; //审核选中的值
    },
    //生成下拉
    handleCommand(type) {
      localStorage.removeItem("wvId"); //移除所有的缓存数据
      let url = "";
      if (type == 1) {
        this.warehousingShow = true;
        localStorage.setItem("type", type);
      } else if (type == 4) {
        this.warehousingShow = true;
        localStorage.setItem("type", type);
      } else if (type == 3) {
        this.warehousingInShow = true;
        localStorage.setItem("type", type);
      }
      this.$router.push({
        path: url, //跳转的路径
      });
    },

    queryData() {
      this.tableDataList();
      this.getSum();
    },
    //查询列表接口
    tableDataList() {
      this.loading = true;
      if (this.fromNo) {
        var fromNo = this.fromNo;
      }
      if (this.externalPoNo) {
        var externalPoNo = this.externalPoNo;
      }
      if (this.shipName) {
        var shipName = this.shipName;
      }
      if (this.unboxLimit) {
        var unboxLimit = this.unboxLimit;
      }
      if (this.createdTime) {
        var createdStartDate = this.createdTime[0];
        var createdEndDate = this.createdTime[1];
      }
      if (this.WvDate) {
        var wvStartDate = this.WvDate[0];
        var wvEndDate = this.WvDate[1];
      }
      if (this.baseCurrencyRate) {
        var baseCurrencyRate = this.baseCurrencyRate;
      }
      if (this.wvStatus) {
        var wvStatus = this.wvStatus;
      }
      // if (this.currencyCodeOrgin) {
      //   var currencyCodeOrgin = this.currencyCodeOrgin;
      // }
      if (this.poType) {
        var poType = this.poType;
      }
      let params = {
        fromNo: fromNo, //来源单号
        externalPoNo: externalPoNo, //外部合同号
        pageNum: this.pageNum,
        sort: this.sort,
        pageSize: this.pageSize,
        wvNo: this.wvNo, //入库单号
        wvStatusList: wvStatus, //单据状态
        projectCode: this.project.projectCode, //项目号
        projectName: this.project.projectName, //项目号
        companyCode: this.companyName.companyCode, //公司
        bbBranchBaseList: this.branchName, //部门
        bbSupplierBaseList: this.supplierName, //供应商
        warehouseCode: this.warehouseName.warehouseCode,
        createdEndDate: createdEndDate,
        createdStartDate: createdStartDate, //创建日期
        wvEndDate: wvEndDate,
        wvStartDate: wvStartDate, //入库日期
        baseCurrencyRate: baseCurrencyRate, //本位币汇率
        currencyCodeOrgin: this.currency.currencyCode, //业务类别
        poTypeList: poType, //合同类型
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        unwvReverse: this.unwvReverse, //是否退货
        transitStatusList:this.transitStatus,
        wvType:this.wvType
      };
      let data = params;
      data.project = this.project;
      data.companyName = this.companyName;
      data.branchName = this.branchName;
      data.departmentList = this.departmentList;
      data.supplierName = this.supplierName;
      data.supplierList = this.supplierList;
      data.warehouseName = this.warehouseName;
      data.currency = this.currency;
      if(this.unwvReverse !== ''){
        data.unwvReverse = this.unwvReverse
      }
      this.$setQueryData(this, data);
      api
        .odWvList(params)
        .then((res) => {
          if (res.code == "success") {
            this.tableData = res.data;
            this.tableData.forEach((item, index) => {
              item.predictArrivedDate = this.$timeFun(
                item.predictArrivedDate,
                1
              );
              item.createdTime = this.$timeFun(item.createdTime, 1);
              if (item.erpBlNo == null) {
                item.fromNo = item.erpPoNo;
              } else {
                item.fromNo = item.erpBlNo;
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
      if (this.fromNo) {
        var fromNo = this.fromNo;
      }
      if (this.externalPoNo) {
        var externalPoNo = this.externalPoNo;
      }
      if (this.shipName) {
        var shipName = this.shipName;
      }
      if (this.unboxLimit) {
        var unboxLimit = this.unboxLimit;
      }
      if (this.createdTime) {
        var createdStartDate = this.createdTime[0];
        var createdEndDate = this.createdTime[1];
      }
      if (this.WvDate) {
        var wvStartDate = this.WvDate[0];
        var wvEndDate = this.WvDate[1];
      }
      if (this.baseCurrencyRate) {
        var baseCurrencyRate = this.baseCurrencyRate;
      }
      if (this.wvStatus) {
        var wvStatus = this.wvStatus;
      }
      // if (this.currencyCodeOrgin) {
      //   var currencyCodeOrgin = this.currencyCodeOrgin;
      // }
      if (this.poType) {
        var poType = this.poType;
      }
      let params = {
        fromNo: fromNo, //来源单号
        externalPoNo: externalPoNo, //外部合同号
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        wvNo: this.wvNo, //入库单号
        wvStatusList: wvStatus, //单据状态
        projectCode: this.project.projectCode, //项目号
        projectName: this.project.projectName, //项目号
        companyCode: this.companyName.companyCode, //公司
        bbBranchBaseList: this.branchName, //部门
        bbSupplierBaseList: this.supplierName, //供应商
        warehouseCode: this.warehouseName.warehouseCode,
        createdEndDate: createdEndDate,
        createdStartDate: createdStartDate, //创建日期
        wvEndDate: wvEndDate,
        wvStartDate: wvStartDate, //入库日期
        baseCurrencyRate: baseCurrencyRate, //本位币汇率
        currencyCodeOrgin: this.currency.currencyCode, //业务类别
        poTypeList: poType, //合同类型
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        transitStatusList:this.transitStatus,
        wvType:this.wvType
      };
      api
        .odWvListSum(params)
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
          ["actReceive","actReceiveSec","wvAmtS"].findIndex(
            (it) => it == key
          ) !== -1
        ) {
          sums[index] = this.sumTol?this.$sumTolFormat(this.sumTol[key]):'';
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
        column.property == "actReceive" ||
        column.property == "actReceiveSec" ||
        column.property == "wvAmtS"
      ) {
        return "rightTd";
      } else {
        return "";
      }
    },
    //业务币主数据下拉
    selectMainList() {
      api
        .listSimple()
        .then((res) => {
          if (res.code == "success") {
            this.mainData = res.data;
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
        dictNo: "1048",
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
    selectTransitStatus() {
      let params = {
        dictNo: "1166",
      };
      api
        .select(params)
        .then((res) => {
          if (res.code == "success") {
            this.transitStatusList = res.data;
          }
        })
        .catch();
    },
    selectwvType(){
       api
        .select({ dictNo: 1062 })
        .then(res => {
          this.wvTypeList= res.data;
        })
        .catch(err => { });
    },
    setUp(type) {
      let flag = true;
      if (this.selectioned.length == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning",
        });
        return false;
      } else {
        this.selectioned.map((item) => {
          if (item.wvStatus == 10480005 || item.wvStatus == 10480025) {
            flag = false;
          }
        });
      }
      if (!flag) {
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
            var list = [];
            for (var i = 0; i < this.selectioned.length; i++) {
              let params = {};
              (params.wvId = this.selectioned[i].wvId),
                (params.version = this.selectioned[i].version);
              list.push(params);
            }
            api
              .deleteOdWv(list)
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
          .catch(() => {});
      } else {
        this.$openWarning('仅"已保存"、"已驳回"状态单据可删除');
      }
    },
    //提交
    addSub(type) {
      if (this.selectioned.length != 1) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "请选择单条数提交",
          type: "warning",
        });
      } else {
        if (
          (this.selectioned[0].wvStatus == 10480005 ||
            this.selectioned[0].wvStatus == 10480025) &&
          this.selectioned[0].wvType == 10620010
        ) {
          localStorage.setItem("wvId", this.selectioned[0].wvId);
          this.$router.push({
            //核心语句
            path: "/index/Purchase/warehousingDetails", //跳转的路径
            query: { type: 1 },
          });
        } else {
          this.$openWarning('仅"已保存"、"已驳回"状态的"入库单"可提交');
        }
      }
    },
    //在途提交
    transitSubmit(){
      if(this.selectioned.length==0){
        this.$openWarning("未选择数据");
        return;
      }
      let list=this.selectioned;
      for(let i=0;i<list.length;i++){
        if(list[i].wvType!=10620005 || list[i].wvStatus!=10480010
        || (list[i].transitStatus!=11660010 && list[i].transitStatus!=11660030)){
          this.$openWarning("该单据不可以操作");
          return;
        }
      }
      api.transitCommit(list).then(res=>{
        if(res.code=='success'){
          this.$openSuccess(res.message);
          this.queryData();
        }else{
          this.$openWarning(res.message);
        }
      })
    },
    // //是否关闭验证//提交
    // addSub() {
    //   if (this.selectioned==0) {
    //     this.$message({
    //       duration: 1000,
    //       showClose: true,
    //       message: "未选择数据",
    //       type: "warning"
    //     });
    //     return false;
    //   }else if(this.selectioned.length>1){
    //       this.$openWarning("不能批量操作");
    //        return;
    //     }
    //   let data = {
    //     wvId: this.selectioned[0].wvId
    //   };
    //   api
    //     .checkIsCloseableByWv(data)
    //     .then(res => {
    //       if (res.data.isCloseable == true) {
    //         let tips = "关闭";
    //         this.$confirm("是否确定" + tips + "?", tips + "提示", {
    //           confirmButtonText: "确定",
    //           cancelButtonText: "取消",
    //           type: "warning"
    //         }).then(() => {
    //           localStorage.setItem("isClosed", 1);
    //           this.mainContract();
    //         });
    //       } else {
    //         localStorage.setItem("isClosed", 0);
    //         this.mainContract();
    //       }
    //     })
    //     .catch();
    // },
    // //提交(只能对保存或驳回的发起审批)
    // mainContract() {
    //   if (this.selectioned==0) {
    //     this.$message({
    //       duration: 1000,
    //       showClose: true,
    //       message: "未选择数据",
    //       type: "warning"
    //     });
    //     return false;
    //   }else if(this.selectioned.length>1){
    //       this.$openWarning("不能批量操作");
    //        return;
    //     }
    //   if (localStorage.getItem("isClosed")) {
    //     this.isClosed = localStorage.getItem("isClosed");
    //   }
    //   let params = {
    //     wvId: this.selectioned[0].wvId,
    //     isClosed: this.isClosed
    //   };
    //   api
    //     .wvCommitApprove(params)
    //     .then(res => {
    //       if (res.code == "success") {
    //         this.$message({
    //           duration: 1000,
    //           showClose: true,
    //           message: res.data,
    //           type: "success"
    //         });
    //         this.queryData();
    //       } else {
    //         this.$message({
    //           duration: 1000,
    //           showClose: true,
    //           message: "调用失败",
    //           type: "error"
    //         });
    //       }
    //     })
    //     .catch();
    // },
    //供应商发货
    approval() {
      if (this.selectioned.length == 0) {
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
      } else if (
        this.selectioned.length == 1 &&
        this.selectioned[0].wvStatus == 10480005 &&
        this.selectioned[0].wvType == 10620005
      ) {
        localStorage.setItem("wvId", this.selectioned[0].wvId);
        this.$router.push({
          //核心语句
          path: "/index/Purchase/warehousingDetails", //跳转的路径
          query: { type: 2 },
        });
      } else {
        this.$openWarning('仅"已保存"状态下的"在途单"可供应商发货');
      }
    },
    //入库确认
    Confirmation() {
      if (this.selectioned.length == 0) {
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
      } else if (
        this.selectioned.length == 1 &&
        this.selectioned[0].wvStatus == 10480010 &&
        this.selectioned[0].wvType == 10620005
      ) {
        localStorage.setItem("wvId", this.selectioned[0].wvId);
        localStorage.setItem("version", this.selectioned[0].version);
        this.$router.push({
          path: "/index/Purchase/warehousingDetails", //跳转的路径
          query: { type: 6 },
        });
      } else {
        this.$openWarning('仅"已发货"状态下的"在途单"可入库确认');
      }
    },
    //审核(入库单)//1入库审核  2整单作废审核
    toExamine() {
      if (this.selectioned.length == 0) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "未选择数据",
          type: "warning",
        });
        return false;
      } else {
        let flag = true;
        this.selectioned.map((item) => {
          if (item.wvStatus != 10480015) {
            flag = false;
          }
        });
        if (flag) {
          this.examineType=1;
          this.accountPeriod(this.selectioned[0].companyId);
          if (this.selectioned.length == 1) {
            this.examineShow = true;
            // this.examineDate = this.selectioned[0].postDate || ""
          } else {
            this.$confirm(
              "批量审核，过账时间将取单据过账时间，如单据无该时间，则取审核时间,是否确认？",
              {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
              }
            ).then((res) => {
              this.examineShow = true;
            });
          }
          // if (this.selectioned.length > 1) {
          //   this.examineOne = false;//是否是多条
          // } else {
          //   this.accountPeriod(this.selectioned[0].companyId);
          //   this.examineDate = this.selectioned[0].postDate;//默认当前数据的出库日期
          //   this.examineOne = true;//是否是多条
          // }
          // this.examineShow = true;
        } else {
          this.$openWarning('仅"审批中"状态单据可审批');
        }
      }
    },
    //在途单审核
    transitExamine(){
      if (this.selectioned.length == 0) {
         this.$openWarning("未选择数据");
         return;
      }
      let list=this.selectioned;
      for(let i=0;i<list.length;i++){
        if(list[i].wvType!=10620005 || list[i].wvStatus!=10480010
        || list[i].transitStatus!=11660015){
          this.$openWarning("该单据不可以操作");
          return;
        }
      }
      this.examineType=2;
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
                this.selectioned[0].postDate >= res.data.begindate &&
                this.selectioned[0].postDate <= res.data.enddate
              ) {
                this.examineDate = this.selectioned[0].postDate;
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
    //重置
    clearNone() {
      this.companyName = ``;
      this.unwvReverse = ``;
      this.branchName = [];
      this.departmentList = [];
      this.supplierName = [];
      this.supplierList = [];
      this.wvNo = "";
      this.blDate = [];
      this.poType = [];
      this.fromNo = ""; //来源单号
      this.externalPoNo = "";
      this.arrivedInfoDate = [];
      this.predictArrivedDate = [];
      this.shipName = "";
      this.unboxLimit = "";
      this.wvStatus = [];
      this.project = {}; //项目号
      this.warehouseName = {}; //仓库
      this.currencyCodeOrgin = ""; //业务币币别
      this.currencyName = "";
      this.createdTime = []; //创建日期
      this.WvDate = []; //入库日期
      this.baseCurrencyRate = ""; //本位币汇率
      this.currency = {};
      this.warrantCode = ""; //凭证号
      this.warrantMonth = ""; //期间
      this.wvType='';
      this.transitStatus=[];

      this.queryData();
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
    //币种弹窗打开
    coinTip() {
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
      this.currencyCodeOrgin = e.currencyCode;
      this.currencyName = e.currencyName;
      //   if (this.companyName.functionalCurrencyId) {
      //     getCurrencyRate({
      //       formCurrencyId: e.currencyId,
      //       toCurrencyId: this.companyName.functionalCurrencyId
      //     }).then((res) => {
      //       this.currencyRate = res.data.parities;
      //     }).catch(() => { })
      //   }
    },
    //创建弹框取消
    warehousingCancle() {
      this.warehousingShow = false;
    },
    //仓库弹窗打开
    warehouseTips() {
      this.warehouseShow = true;
    },
    //仓库确认
    warehouseSure(e) {
      this.warehouseShow = false;
      this.warehouseName = e;
    },
    //仓库取消
    warehouseCancle() {
      this.warehouseShow = false;
    },
    creatSure(e) {
      this.formList = e;
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
    //物料弹框
    matterTip() {
      this.matterShow = true;
    },
    //物料取消
    matterCancle() {
      this.matterShow = false;
    },
    //物料确认
    matterSure(e) {
      this.matterShow = false;
      this.goodsName = e;
    },
    //创建进口采购
    warehousingIntip() {
      this.ArrivalPortShow = true;
    },
    //取消到达港口弹窗
    warehousingInCancle() {
      this.warehousingInShow = false;
    },
    warehousingInSure(e) {
      this.warehousingInShow = false;
      this.portName = e;
    },
    //表格选择
    handleChange(e) {
      this.selectioned = e;
    },
    handleRowDbclick(e) {
      this.tableData.forEach((item) => {
        item.edit = false;
      });
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e);
      this.ladingBillSee();
    },
    rowClick(e) {
      this.$refs.multipleTable.toggleRowSelection(e);
      if (this.selectioned.length == 1) {
        this.selectionedIndex = this.tableData.indexOf(e[0]);
      }
    },
    //确定
    examineSure() {
      let url='';
      var list = [];
      if(this.examineType==1){
        if (this.examineValue == "1" && this.examineOne && !this.examineDate) {
          this.$openWarning("请选择入库日期");
          return;
        } else if (
          this.examineValue == "1" &&
          this.examineOne &&
          this.examineDate
        ) {
          this.selectioned[0].postDate = this.examineDate;
        } else if (this.examineValue == "2") {
          if (this.auditInfo) {
            var auditInfo = this.auditInfo;
          }
        } else {
          this.examineDate = "";
        }
        for (let i = 0; i < this.selectioned.length; i++) {
          let params = {};
          (params.wvId = this.selectioned[i].wvId),
            (params.version = this.selectioned[i].version),
            (params.approveStatus = this.examineValue),
            (params.auditInfo = auditInfo),
            (params.postDate = this.selectioned[0].postDate);
          list.push(params);
        }
        url=api.wvApprove;
      }else{
        list=this.selectioned;
        list.forEach(e=>{
          e.approveStatus = this.examineValue;
          e.auditInfo=this.auditInfo;
        })
        url=api.transitApprove;
      }
      url(list)
        .then((res) => {
          this.examineShow = false;
          if (res.code == "success") {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.data,
              type: "success",
            });
            this.examineShow=false;
            this.examineValue = ""; ////审核选中的值
            this.examineDate = ""; //审核中的出库日期
            this.auditInfo="";
            this.isAllowedConfirm=true;
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
    //取消
    examineCancle() {
      this.examineShow = false; //审核弹窗
      this.examineValue = ""; ////审核选中的值
      this.examineDate = ""; //审核中的出库日期
      this.auditInfo="";
      this.isAllowedConfirm=true;
    },
    //修改
    ladingBillChange() {
      if (this.selectioned.length != 1) {
        this.$message({
          duration: 1000,
          showClose: true,
          message: "请选择单条数据修改",
          type: "warning",
        });
      } else {
        if (
          this.selectioned[0].wvStatus == 10480005 ||
          this.selectioned[0].wvStatus == 10480010 ||
          this.selectioned[0].wvStatus == 10480025
        ) {
          localStorage.setItem("wvId", this.selectioned[0].wvId);
          let type = 0;
          if (this.selectioned[0].wvStatus == 10480010) {
            type = 10;
          }
          this.$router.push({
            path: "/index/Purchase/warehousingDetails", //跳转的路径
            query: { type },
          });
        } else {
          this.$openWarning('仅"已保存"、"已发货"、"已驳回"状态单据可修改');
        }
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
      localStorage.setItem("wvId", this.selectioned[0].wvId);
      // console.log(this.selectioned[0].wvId,'vvvvvvv');
      this.$router.push({
        //核心语句
        path: "/index/Purchase/warehousingDetailsSee", //跳转的路径
        query: { type: 7 },
      });
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.clearNone();
      this.tableDataList();
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.clearNone();
      this.tableDataList();
    },
    //整单作废提交  cancellationOdWv,
    cancellationOdWv() {
      if (this.selectioned.length == 0) {
        this.$openWarning("未选择数据");
      } else if (this.selectioned.length > 1) {
        this.$openWarning("不能批量操作");
      } else {
        if (this.selectioned[0].wvStatus != "10480020") {
          this.$openWarning("只有已入库的才能作废提交");
        } else {
          let data = {
            wvId: this.selectioned[0].wvId,
            version: this.selectioned[0].version,
          };
          api.cancellationOdWv(data).then((res) => {
            if (res.code == "success") {
              this.$openSuccess(res.message);
              this.queryData();
            } else {
              this.$openWarning(res.message);
            }
          });
        }
      }
    },
    //整单作废审核
    cancelExamine() {
      if (this.selectioned.length == 0) {
        this.$openWarning("未选择数据");
      } else if (this.selectioned.length > 1) {
        this.$openWarning("不能批量操作");
      } else {
        if (this.selectioned[0].wvStatus != "10480030") {
          this.$openWarning("只有冲销审核中才能作废审核");
        } else {
          this.cancelExamineValue = "";
          this.isAllowedConfirm2 = true;
          this.cancelExamineShow = true;
        }
      }
    },
    cancellationApproveOdWv() {
      let data = {
        wvId: this.selectioned[0].wvId,
        version: this.selectioned[0].version,
        cancellationApproveStatus: this.cancelExamineValue,
      };
      api.cancellationApproveOdWv(data).then((res) => {
        if (res.code == "success") {
          this.$openSuccess(res.message);
          this.cancelExamineShow = false;
          this.queryData();
        } else {
          this.$openWarning(res.message);
        }
      });
    },
    cancelExamineCancle() {
      this.cancelExamineShow = false;
    },
  },
  components: {
    componySelect,
    departmentSelect,
    supplierSelect,
    warehouseSelect,
    projectSelect,
    matterSelect,
    warehousingAdd,
    warehousingInAdd,
    contractSearch,
    editSearchItem,
    coinSelect,
  },
};
</script>
<style lang="scss" scoped>
.index .el-button.is-disabled,
.index .el-button.is-disabled:focus,
.index .el-button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-color: #fff;
  border: 1px solid #ebeef5;
}
</style>
