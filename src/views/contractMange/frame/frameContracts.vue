<template>
  <div class="frameContracts content-div">
    <el-col class="el-col el-col-btn auto-sibling">
      <div class="button-div">
        <el-button class="query-button" @click="queryData" icon="el-icon-search"
          >查询
        </el-button>
        <el-button @click="clearNone" icon="el-icon-refresh">重置 </el-button>
        <el-button @click="showEditPage('searchList')" icon="el-icon-setting" style="float:right"
        >自定义
        </el-button>
      </div>
    </el-col>
    <!-- 搜索 -->

    <div class="index-div3 auto-sibling  enter" >
      <div v-if="$checkedNum(searchList) > 4">
        <p class="hide-input" v-if="show" @click="inputShow()">
          更多条件 <i class="el-icon-caret-bottom"></i>
        </p>
        <p class="hide-input" v-else @click="inputShow()">
          收起<i class="el-icon-caret-top"></i>
        </p>
      </div>

    <el-form @keyup.enter.native="queryData">
      <div class="search-div">
        <contract-search
            v-for="item in searchList"
            :pickerOptions="pickerOptions"
            :handleContractTypeChange="handleContractTypeChange"
            :isInaType="isInaType"
            :contractType="contractType"
            :company="company"
            :branchName="branchName"
            :contractNo2="contractNo2"
            :extCode="extCode"
            :customer="customer"
            :supplier="supplier"
            :staffName="staffName"
            :contractCat="contractCat"
            :projectCode="projectCode"
            :project="project"
            :signingDate="signingDate"
            :contractDateArray="contractDateArray"
            :currency="currency"
            :currencyRate="currencyRate"
            :contractStatus="contractStatus"
            :haveReceiveOrginCopy="haveReceiveOrginCopy"
            :key="item.key"
            :checked="item.checked"
            :matchKey="item.key"
            :componyTip="componyTip"
            :departmentTip="departmentTip"
            :customerTip="customerTip"
            :supplierTip="supplierTip"
            :staffTip="staffTip"
            :projectTip="projectTip"
            :coinTip="coinTip"
            :departmentList="departmentList"
            :customerList="customerList"
            :supplierList="supplierList"
            :staffNameList="staffNameList"
            @changeInput="changeData"
        />
      </div>
    </el-form>
    </div>
    <!--按钮样式-->
    <div class="button-div auto-sibling">
      <el-button
        class="query-button"
        @click="handleContractAdd"
        icon="el-icon-folder-add"
        v-if="$actionFlag(`F001`)"
        >创建
      </el-button>
      <el-button
        @click="handleContractEdit"
        icon="el-icon-edit"
        v-if="$actionFlag(`F002`)"
        >修改
      </el-button>
      <el-button
        @click="handleContractDele"
        icon="el-icon-delete"
        v-if="$actionFlag(`F003`)"
        >删除
      </el-button>
      <el-button
        @click="handleContractCheck"
        icon="el-icon-data-line"
        v-if="$actionFlag(`F004`)"
        >查看
      </el-button>
      <el-button icon="el-icon-finished">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            提交<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              icon="el-icon-c-scale-to-original"
              command="a"
              v-if="$actionFlag(`F005`)"
              >协议提交
            </el-dropdown-item>
            <el-dropdown-item
              icon="el-icon-set-up"
              command="b"
              v-if="$actionFlag(`F006`)"
              >变更提交
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-button>
      <el-button icon="el-icon-receiving">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            审核<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              icon="el-icon-c-scale-to-original"
              command="c"
              v-if="$actionFlag(`F007`)"
              >协议审核
            </el-dropdown-item>
            <el-dropdown-item
              icon="el-icon-set-up"
              command="d"
              v-if="$actionFlag(`F008`)"
              >变更审核
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-button>
      <!-- <el-button
        icon="el-icon-receiving"
      >审核</el-button> -->
      <el-button
        @click="handleContractExamine"
        icon="el-icon-data-line"
        v-if="$actionFlag(`F015`)"
        >合同开关审核
      </el-button>
      <el-button
        class="widauto"
        @click="handleContractOpen"
        icon="el-icon-check"
        v-if="$actionFlag(`F009`)"
        >合同开启
      </el-button>
      <el-button
        class="widauto"
        @click="closedTip"
        icon="el-icon-close"
        v-if="$actionFlag(`F010`)"
        >合同关闭
      </el-button>
      <el-button
        icon="el-icon-edit-outline"
        v-if="$actionFlag(`F011`)"
        @click="handleContractChange"
        >变更
      </el-button>
      <!-- <el-button icon="el-icon-set-up">提交变更</el-button> -->
      <el-button icon="el-icon-download" v-if="$actionFlag(`F012`)" @click="exportTable"
        >导出
      </el-button>

      <el-button
        icon="el-icon-download"
        v-if="$actionFlag(`F013`)"
        @click="doubleSignature"
        >双签上传</el-button
      >
      <el-button
        icon="el-icon-download"
        v-if="$actionFlag(`F014`)"
        @click="originalReceived"
        >收到原件</el-button
      >
      <el-button
      icon="el-icon-thumb"
      @click="goTree"
      v-if="$actionFlag(`F016`)"
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
        @select="handleSelectChange"
        @selection-change="handleChange"
        @row-dblclick="dblclick"
        @row-click="rowClick"
        @select-all="handleDataSelectAll"
        :cell-class-name="cell"
        @sort-change="tableSortChange"
        v-loading="loading"
      >
        <el-table-column
          :key="item.key"
          :prop="item.key"
          :type="item.type"
          :label="item.label"
          :width="item.width"
          :show-overflow-tooltip="item.tooltip"
          :sortable="item.sortable"
          v-for="item in fixHead"
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
            <span v-if="item.key === 'haveReceiveOrginCopy'">
              {{
                scope.row.haveReceiveOrginCopy == 1
                  ? "已上传"
                  : scope.row.haveReceiveOrginCopy == 2
                  ? "收到原件"
                  : "否"
              }}</span
            >
            <span v-if="item.key ==='contractAmt'"> {{ scope.row.contractAmt | $moneyFormat }}</span>
            <span v-if="item.key ==='signTime'"> {{ $timeFun(scope.row.signTime, 1) }}</span>
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
    <!-- 选择项目弹窗 -->
    <project-select
      v-if="projectShow"
      :tipShow="projectShow"
      @projectCancle="projectCancle"
      @projectSure="projectSure"
    >
    </project-select>
    <!-- 选择人员信息弹窗 -->
    <man-select
      v-if="manShow"
      :tipShow="manShow"
      @manCancle="manCancle"
      @manSure="manSure"
    >
    </man-select>
    <!-- 选择客户弹窗 -->
    <customer-select
      v-if="customerShow"
      :tipShow="customerShow"
      @customerCancle="customerCancle"
      @customerSure="customerSure"
    >
    </customer-select>
    <!-- 选择供应商弹窗 -->
    <supplier-select
      v-if="supplierShow"
      :tipShow="supplierShow"
      @supplierCancle="supplierCancle"
      @supplierSure="supplierSure"
    >
    </supplier-select>
    <!-- 选择币种弹窗 -->
    <coin-select
      v-if="coinShow"
      :tipShow="coinShow"
      @coinCancle="coinCancle"
      @coinSure="coinSure"
    ></coin-select>
    <exa-contract
      v-if="exaShow"
      :tipShow="exaShow"
      @exaCancle="exaCancle"
      :closeData="closeData"
      @exaSure="exaSure"
    ></exa-contract>
    <closed-contract
      v-if="closeShow"
      :tipShow="closeShow"
      @closedCancel="closedCancel"
      @closedSure="closedSure"
    ></closed-contract>
    <!--   自定义搜索选项-->
    <edit-search-item
      v-if="editPage"
      :list="editList"
      :title="editKey==='searchList'?'自定义搜索条件':'自定义表格排序'"
      :editPage="editPage"
      @editCancel="editCancel"
      @editSure="editSure"
    ></edit-search-item>
    <!--双签弹窗 开始-->
    <el-dialog
      :visible.sync="fileShow"
      :show-close="false"
      :close-on-click-modal="false"
      title="上传双签"
      width="900px"
      class="popup_box"
    >
      <div
        class="button-div"
        style="background:#fff;border:0;margin-top: 10px;text-align: left;"
      >
        <el-upload
          class="upload-demo"
          ref="newupload"
          action="#"
          :before-upload="beforeUpload"
          :headers="uploadList.uploadHeaders"
          :multiple="true"
          :auto-upload="false"
          :on-remove="handleRemove"
          :file-list="uploadList.fileList"
        >
          <el-button
            slot="trigger"
            style="color:#3E3F42;"
            size="small"
            icon="el-icon-paperclip"
            type="button"
            >选取文件
          </el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            class="addBut"
            icon="el-icon-upload"
            @click="submitUpload"
            >上传
          </el-button>
        </el-upload>
      </div>
      <el-table
        :data="uploadList.tableList"
        ref="table2"
        tooltip-effect="dark"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          type="index"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column prop="fileOldName" label="文件名称"> </el-table-column>
        <el-table-column label="文件类型">
          <template slot-scope="scope">
            {{ scope.row.fileType == 2 ? "双签" : "普通" }}
          </template>
        </el-table-column>
        <el-table-column label="上传时间">
          <template slot-scope="scope">
            {{ $timeFun(scope.row.createdTime, 1) }}
          </template>
        </el-table-column>
        <el-table-column prop="createdName" label="上传人"></el-table-column>
        <el-table-column label="文件操作">
          <template slot-scope="scope">
            <el-button @click="down(scope.row)" type="text" size="small"
              >下载</el-button
            >
            <el-button
              @click="delFile(scope.$index, scope.row)"
              type="text"
              size="small"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="button-div2">
        <el-button icon="el-icon-check" @click="doubleCheckContract(0)"
          >确定</el-button
        >
        <el-button
          icon="el-icon-close"
          type="primary"
          @click="doubleCheckContract(1)"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getFilter, setFilter } from "@/mixins/editCondition.js";
import { exportData } from "@/mixins/export.js";

import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect2.vue";
import staffSelect from "@/components/staffSelect2.vue";
import projectSelect from "@/components/projectSelect.vue";
import manSelect from "@/components/manSelect.vue";
import customerSelect from "@/components/customerSelect2.vue";
import supplierSelect from "@/components/supplierSelect2.vue";
import closedContract from "@/views/contractMange/closedContract.vue";
import exaContract from "@/views/contractMange/exaContract.vue";
import coinSelect from "@/components/coinSelect.vue";
import {
  getOdFwContractList,
  cancellationOdFwContract,
  approveOdFwContract,
  auditOdFwContract,
  auditOdFwContract2,
  turnOdFwContract,
  getCurrencyRate,
  getDictionary,
  doubleCheckOdFwContract,
  haveReceiveOrginCopy,
} from "@/api/contractMange/frameProtocol";
import uploadApi from "@/api/component";
import contractSearch from "@/views/contractMange/components/contractSearch";
import editSearchItem from "@/components/editSearchItem";
const AllSearch = [
  { key: "company", label: "公司", checked: true },
  { key: "branchName", label: "部门", checked: true },
  { key: "staffName", label: "业务员", checked: true },
  { key: "customer", label: "客户", checked: true },
  { key: "supplier", label: "供应商", checked: true },
  { key: "extCode", label: "外部合同号", checked: true },
  { key: "contractNo2", label: "协议编号", checked: true },
  { key: "signingDate", label: "签订日期", checked: true },
  { key: "contractCat", label: "协议类型", checked: true },
  { key: "projectCode", label: "项目号", checked: true },
  { key: "project", label: "项目名称", checked: true },
  { key: "contractDateArray", label: "有效日期", checked: true },
  { key: "currency", label: "业务币币别", checked: true },
  { key: "currencyRate", label: "本位币汇率", checked: true },
  { key: "contractStatus", label: "协议状态", checked: true },
  { key: "haveReceiveOrginCopy", label: "是否双签", checked: true },
]; //全部选项标签
const ALLHeader = [
  {
    label: "协议编号",
    tooltip: true,
    key: "contractNo",
    checked: true,
    width: "140",
    sortable: true,
  },
  { label: "外部合同号", tooltip: true, key: "extCode", checked: true,  width: "140" },
  {
    label: "状态",
    tooltip: true,
    key: "contractStatusValue",
    checked: true,
    width: "80",
    otherKey: "contractStatus",
  },
  {
    label: "是否双签",
    tooltip: true,
    key: "haveReceiveOrginCopy",
    checked: true,
    temp: true,
  },
  {
    label: "供应商",
    tooltip: true,
    key: "supplierName",
    checked: true,
    width: "140",
  },
  { label: "客户", tooltip: true, key: "custName", checked: true },
  {
    label: "协议金额",
    tooltip: true,
    key: "contractAmt",
    checked: true,
    width: "100",
    sortable: true,
    temp: true
  },
  {
    label: "签约时间",
    tooltip: true,
    key: "signTime",
    checked: true,
    width: "120",
    temp: true,
    sortable: true,
  },
  { label: "创建人", tooltip: true, key: "createdName", checked: true },
  {
    label: "创建时间",
    tooltip: true,
    key: "createdTime",
    checked: true,
    width: "120",
    temp: true,
  },
  {
    label: "公司",
    tooltip: true,
    key: "companyName",
    checked: true,
    width: "170",
  },
  { label: "部门", tooltip: true, key: "orgName", checked: true, width: "170" },
  { label: "业务员", tooltip: true, key: "bizPersonName", checked: true },
  {
    label: "合同关闭原因",
    tooltip: true,
    key: "closeReason",
    checked: true,
    width: "170",
  },
  {
    label: "审批驳回原因",
    tooltip: true,
    key: "unReason",
    checked: true,
    width: "170",
  },
  { label: "备注", tooltip: true, key: "remark", checked: true },
]; //所有表头
export default {
  name: "frameContracts",
  mixins: [getFilter, setFilter, exportData],
  data() {
    return {
      branchNameStr: [],
      staffNameList: [],
      supplierList: [],
      customerList: [],
      departmentList: [],
      sort: "",
      fixHead: [
        { type: "selection", key: "selection", checked: true },
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
      tableData: [],
      ycdxShow: false, //以采定销弹窗
      componyShow: false, //银行弹窗
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      projectShow: false, //员工弹窗
      manShow: false, //人员弹窗
      // tableData: [1, 2], //表格
      selectioned: [], //表格选中项
      selectionIdVersion: [], //选中协议Id，版本
      index: null, //选中index
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      contractStatus: [], //协议状态
      //分页数据
      // pagination: {
      //   currentPage: 1,
      //   total: 0,
      //   pageSize: 100,
      //   pageNum: 1
      // },
      total: 0, //总数目
      exaShow: false, //审核弹窗
      isInactive: "", //1禁用 0启用
      isInaType: [
        { value: 10130005, label: "草拟" },
        { value: 10130010, label: "审批中" },
        { value: 10130015, label: "已生效" },
        { value: 10130020, label: "审批后修改" },
        { value: 10130025, label: "变更审批中" },
        { value: 10130030, label: "关闭中" },
        { value: 10130035, label: "已截停" },
        { value: 10130040, label: "开启中" },
        { value: 10130045, label: "已驳回" },
        { value: 10130050, label: "已关闭" },
        { value: 10130055, label: "变更驳回" },
      ],
      warehouseCode: "", //仓库代码
      warehouseName: "", //仓库名称
      warehouseType: "", //仓库类型
      company: ``, //公司
      branchName: [], //部门
      staffName: [], //员工
      projectCode: ``, //项目号
      project: ``, //项目名称
      manName: ``, //人员
      typeList: [],
      loading: false, //表格loading
      pickerClose: {},
      navColor: {
        button: {
          backgroundColor: "", //按钮颜色
        },
      },
      show: true,
      contractNo2: "", //协议编号  手输,
      contractState: "", //协议状态
      customer: [], //客户名称
      supplier: [], //供应商名称
      customerShow: false, //客户弹窗
      supplierShow: false, //供应商弹窗
      contractType: [
        {
          value: 10890005,
          label: "采购",
        },
        {
          value: 10890010,
          label: "销售",
        },
      ],
      contractCat: "", //协议类型
      signingDate: [], // 签订日期
      contractDateArray: [], // 有效日期
      extCode: "", //外部合同号
      currency: {}, //币种
      coinShow: false, //币种弹窗
      currencyRate: "", //本位币汇率
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      elDialogControl: false,
      unReason: "",
      fileShow: false,
      uploadList: {
        tableList: [],
        fileList: [], //文件
        sysid: "ac3284d42dcdbc883c3b6598c4fa5e2", //文件上传的参数
        uploadHeaders: { "content-Type": "multipart/form-data" }, //文件上传的格式
      },
      businessId: "",
      version: "",
      haveReceiveOrginCopy: "",
      isStatus: "",
      closeShow: false,
      closeData: {}, //关闭的信息
    };
  },
  watch:{
    // '$route'(){
    //   this.queryData();
    // },
  },
  created() {
    if (this.$route.params.status) {
      this.contractStatus = this.$route.params.status
        .split(",")
        .map((item) => Number(item));
    }
    // data.branchName = this.branchName; //部门
    //   data.departmentList = this.departmentList; //部门
    //   data.customer = this.customer;
    //   data.customerList = this.customerList; //部门
    //   data.supplier = this.supplier;
    //   data.supplierList = this.supplierList; //部门
    //   data.staffName = this.staffName; //部门
    //   data.staffNameList = this.staffNameList;
    //取查询条件
    let data = this.$getQueryData(this);
    this.departmentList = data.branchName;
    this.customerList = data.customer;
    this.supplierList = data.supplier;
    this.staffNameList = data.staffName;
    if (data.signTimeEnd) {
      this.signingDate[1] = data.signTimeEnd;
      this.signingDate[0] = data.signTimeStart;
    }
    if (data.contractBeginDate) {
      this.contractDateArray[0] = data.contractBeginDate;
      this.contractDateArray[1] = data.contractEndDate;
    }
    this.editList = this[this.editKey];
    this.contractStatus = data.contractStatusList;
    this.getFilter();
  },
  mounted() {
    this.initList();
    this.initData();
  },

  methods: {
    exportTable() {
      if (this.signingDate && this.signingDate.length) {
        var signTimeEnd = this.signingDate[1];
        var signTimeStart = this.signingDate[0];
      }
      if (this.contractDateArray && this.contractDateArray.length) {
        var contractEndDate = this.contractDateArray[1];
        var contractBeginDate = this.contractDateArray[0];
      }
      let odFwContract = {
        sort: this.sort,
        companyId: this.company.companyId, //公司
        bbBranchBaseList: this.branchName, //部门
        contractNo: this.contractNo2,
        bbCustomerBaseList: this.customer, //客户id
        bbSupplierBaseList: this.supplier,
        bbEmployeeList: this.staffName.empCode, //业务员
        contractCat: this.contractCat, //协议类型
        projectCode: this.project.projectCode, //项目号
        projectName: this.project.projectName,
        signTimeEnd: signTimeEnd, //签订范围起
        signTimeStart: signTimeStart, //签订范围止
        contractBeginDate: contractBeginDate, //协议生效日范围起
        contractEndDate: contractEndDate, //协议截止日范围止
        extCode: this.extCode, //外部合同号
        contractStatusList: this.contractStatus, //协议状态 多选
        currencyRate: this.currencyRate, //本位币汇率
        currencyCode: this.currency.currencyCode,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        haveReceiveOrginCopy: this.haveReceiveOrginCopy,
      };
      let data = odFwContract;
      data.company = this.company; //公司
      data.branchName = this.branchName; //部门
      data.departmentList = this.departmentList; //部门
      data.customerList = this.customerList; //部门
      data.supplierList = this.supplierList; //部门
      data.staffName = this.staffName; //部门
      data.project = this.project; //部门
      data.customer = this.customer;
      data.supplier = this.supplier;
      data.currency = this.currency;
      data.contractNo2=this.contractNo2;
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
    //双签
    doubleSignature() {
      if (this.selectioned.length == 1) {
        let data = this.selectioned[0];
        if (data.haveReceiveOrginCopy != 2) {
          this.businessId = data.contractId;
          this.version = data.version;
          this.uploadList.tableList = [];
          this.fileShow = true;
          this.getFileDetail();
        } else {
          this.$openWarning("仅'未收到原件'状态可操作");
        }
      } else {
        this.$openWarning("请选择一条数据操作");
      }
    },
    //查询附件
    getFileDetail() {
      if (this.businessId) {
        let params = {
          businessId: this.businessId,
          fileType: 2,
        };
        uploadApi
          .selectSysSystemAccessoryList(params)
          .then((res) => {
            this.uploadList.tableList = res.data;
          })
          .catch();
      }
    },
    //文件上传
    beforeUpload(file) {
      var that = this;
      let _this = this.uploadList;
      let formdata = new FormData();
      formdata.append("file", file); //传文件
      uploadApi.uploadFile(formdata).then((res) => {
        if (res.code == "success") {
          this.uploadList.fileList = [];
          let fileData = res.data;
          let obj = {
            fileOldName: fileData.oldFilename,
            fileNewName: fileData.newFilename,
            fileType: 2, //文件类型 1
            fileSuffix: fileData.fileExt, //文件扩展名
            // fileAbsolutePath:"",//文件绝对路径
            // fileRelativePaths:"",//文件相对路径
            fileServerAddress: fileData.filePath, //文件服务器地址
            createdTime: this.$nowDate(),
            isInactive: 0, //启用，禁用
            createdName: sessionStorage.getItem("userName") || "admin",
            businessId: this.businessId,
          };
          this.uploadList.tableList.unshift(obj);
        }
      });
      return false;
    },
    //双签
    doubleCheckContract(type) {
      if (type == 1 || this.uploadList.tableList.length == 0) {
        this.fileShow = false;
        return;
      }
      let data = {
        contractId: this.businessId,
        version: this.version,
        sysSystemAccessoryList: this.uploadList.tableList,
      };
      doubleCheckOdFwContract(data)
        .then((res) => {
          if (res.code == "success") {
            this.$openSuccess(res.message);
            this.fileShow = false;
            this.initData();
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
    //收到原件
    originalReceived() {
      var list = [];
      this.selectioned.forEach((item) => {
        if (item.haveReceiveOrginCopy == 1) {
          list.push(item);
        }
      });
      if (list.length == 0) {
        return;
      }
      haveReceiveOrginCopy(list)
        .then((res) => {
          if (res.code == "success") {
            this.$openSuccess(res.message);
            this.initData();
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
    //确定上传
    submitUpload() {
      //确定上传
      this.$refs.newupload.submit();
    },
    //下载
    down(e) {
      window.open(e.fileServerAddress);
    },
    //附件删除
    delFile(index, row) {
      this.$confirm("是否确定删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //没有保存
          if (row.accessoryId) {
            let data = {
              contractId: this.businessId,
              contractVersion: this.version,
              accessoryId: row.accessoryId,
              version: row.version,
              contractType: 1, //框架
            };
            uploadApi
              .deleteDoubleCheckAccessory(data)
              .then((res) => {
                if (res.code == "success") {
                  this.$openSuccess(res.message);
                  this.uploadList.tableList.splice(index, 1);
                  this.initData();
                } else {
                  this.$openWarning(res.message);
                }
              })
              .catch();
          } else {
            this.uploadList.tableList.splice(index, 1);
            this.$openSuccess("删除成功");
          }
        })
        .catch();
    },
    //移除
    handleRemove(file, fileList) {
      //  console.log(file, fileList);
    },
    cell({ row, column, rowIndex, columnIndex }) {
      //第八列添加 red 类
      if (column.property == "contractAmt") {
        return "rightTd";
      } else {
        return "";
      }
    },
    initList() {
      const isInaType = new FormData();
      isInaType.append("dictNo", 1013);
      getDictionary(isInaType).then((res) => {
        this.isInaType = res.data;
      });
    },
    inputShow() {
      this.show = this.$showOne(this.show);
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
      this.branchName = [];
      this.staffName = [];
      if (this.currency) {
        getCurrencyRate({
          formCurrencyId: this.currency.currencyId,
          toCurrencyId: e.functionalCurrencyId,
        })
          .then((res) => {
            this.currencyRate = res.data.parities;
          })
          .catch(() => {});
      }
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
      let branchNameStr = [];
      e.forEach((item) => {
        branchNameStr.push(item.branchName);
      });
      this.branchName = e;
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
    //员工弹窗打开
    staffTip() {
      if (this.company == `` || this.branchName.length === 0) {
        this.$openWarning("请先选择公司和部门");
        return false;
      }
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
      this.projectCode = e.projectCode;
    },
    //客户弹窗打开
    customerTip() {
      this.customerShow = true;
    },
    //客户弹窗关闭
    customerCancle() {
      this.customerShow = false;
    },
    //客户弹窗确定获取数据
    customerSure(e) {
      this.customerShow = false;
      this.customer = e;
      this.customerList = e;
      this.supplier = [];
    },
    //供应商弹窗打开
    supplierTip() {
      this.supplierShow = true;
    },
    //供应商弹窗关闭
    supplierCancle() {
      this.supplierShow = false;
    },
    //供应商弹窗确定获取数据
    supplierSure(e) {
      this.supplierShow = false;
      this.supplier = e;
      this.supplierList = e;
      this.customer = [];
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
      if (this.company) {
        getCurrencyRate({
          formCurrencyId: e.currencyId,
          toCurrencyId: this.company.functionalCurrencyId,
        })
          .then((res) => {
            this.currencyRate = res.data.parities;
          })
          .catch(() => {});
      }
    },
    //协议类型对应客户&供应商
    handleContractTypeChange() {
      switch (this.contractCat) {
        case 10140005:
        case 10140010:
          if (this.supplier == "") {
            this.$openWarning("请先选择供应商");
            this.contractCat = "";
            return;
          }
          break;
        case 10150005:
        case 10150010:
          if (this.customer == "") {
            this.$openWarning("请先选择客户");
            this.contractCat = "";
            return;
          }
          break;
        default:
          break;
      }
    },
    //获取表格
    initData() {
      // contractDateArray
      this.loading = true;
      if (this.signingDate && this.signingDate.length) {
        var signTimeEnd = this.signingDate[1];
        var signTimeStart = this.signingDate[0];
      }
      if (this.contractDateArray && this.contractDateArray.length) {
        var contractEndDate = this.contractDateArray[1];
        var contractBeginDate = this.contractDateArray[0];
      }
      let odFwContract = {
        sort: this.sort,
        companyId: this.company.companyId, //公司
        bbBranchBaseList: this.branchName, //部门
        contractNo: this.contractNo2,
        bbCustomerBaseList: this.customer, //客户id
        bbSupplierBaseList: this.supplier,
        bbEmployeeList: this.staffName, //业务员
        contractCat: this.contractCat, //协议类型
        projectCode: this.project.projectCode, //项目号
        projectName: this.project.projectName,
        signTimeEnd: signTimeEnd, //签订范围起
        signTimeStart: signTimeStart, //签订范围止
        contractBeginDate: contractBeginDate, //协议生效日范围起
        contractEndDate: contractEndDate, //协议截止日范围止
        extCode: this.extCode, //外部合同号
        contractStatusList: this.contractStatus, //协议状态 多选
        currencyRate: this.currencyRate, //本位币汇率
        currencyCode: this.currency.currencyCode,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        haveReceiveOrginCopy: this.haveReceiveOrginCopy,
      };
      let data = odFwContract;
      data.company = this.company; //公司
      data.branchName = this.branchName; //部门
      data.departmentList = this.departmentList; //部门
      data.customer = this.customer;
      data.customerList = this.customerList; //部门
      data.supplier = this.supplier;
      data.supplierList = this.supplierList; //部门
      data.staffName = this.staffName; //部门
      data.staffNameList = this.staffNameList;
      data.project = this.project; //部门
      data.currency = this.currency;
      this.$setQueryData(this, data);
      Object.keys(odFwContract).forEach((key) => {
        if (odFwContract[key] == `` || odFwContract[key] == `undefined`) {
          delete odFwContract[key];
        }
      });
      getOdFwContractList(odFwContract)
        .then((res) => {
          let tempData = res.data;
          tempData.forEach((el) => {
            switch (el.contractStatus) {
              case 10130005:
                el.contractStatusValue = "草拟";
                break;
              case 10130010:
                el.contractStatusValue = "审批中";
                break;
              case 10130015:
                el.contractStatusValue = "已生效";
                break;
              case 10130020:
                el.contractStatusValue = "审批后修改";
                break;
              case 10130025:
                el.contractStatusValue = "变更审批中";
                break;
              case 10130030:
                el.contractStatusValue = "关闭中";
                break;
              case 10130035:
                el.contractStatusValue = "已截停";
                break;
              case 10130040:
                el.contractStatusValue = "开启中";
                break;
              case 10130045:
                el.contractStatusValue = "已驳回";
                break;
              case 10130050:
                el.contractStatusValue = "已关闭";
                break;
              case 10130055:
                el.contractStatusValue = "变更驳回";
                break;
              default:
                break;
            }
          });
          this.tableData = tempData;
          this.total = res.total;
          this.loading = false;
        })
        .catch(() => {});
    },
    //查询
    queryData() {
      this.initData();
    },
    //清空选项
    clearNone() {
      (this.branchNameStr = []),
        (this.staffNameList = []),
        (this.supplierList = []),
        (this.customerList = []),
        (this.departmentList = []),
        (this.company = {});
      this.branchName = [];
      this.contractNo2 = "";
      this.customer = [];
      this.supplier = [];
      this.staffName = [];
      this.contractCat = "";
      this.projectCode = "";
      this.signingDate = [];
      this.contractDateArray = [];
      this.project = "";
      this.extCode = "";
      this.currency = {};
      this.currencyRate = "";
      this.contractStatus = "";
      this.haveReceiveOrginCopy = "";
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.initData();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.initData();
    },
    //表格选择
    handleChange(selection) {
      if (selection.length === 0) {
        this.selectioned = null;
      }
      this.selectioned = selection;
      this.selectionIdVersion = [];
      selection.forEach((el) => {
        const temp = {};
        temp.contractId = el.contractId;
        temp.contractNo = el.contractNo;
        temp.version = el.version;
        this.selectionIdVersion.push(temp);
      });
    },
    handleSelectChange(selection, row) {
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (selection.length == 1) {
        this.index = this.tableData.indexOf(selection[0]);
      }
    },
    dblclick(e) {
      this.$set(this.tableData, this.tableData.indexOf(e), e);
      if (this.selectioned.length == 1) {
        this.index = this.tableData.indexOf(e[0]);
        this.handleContractCheck();
      }
    },
    rowClick(e) {
      this.$refs.multipleTable.toggleRowSelection(e);
      if (this.selectioned.length == 1) {
        this.index = this.tableData.indexOf(e[0]);
      }
    },
    handleDataSelectAll(selection) {
      this.selectioned = selection;
    },
    //提交审批
    handleCommand(e) {
      if (this.selectioned.length == 0) {
        this.$openWarning("未选择数据");
        return;
      }
      let flag = true;
      switch (e) {
        case "a":
          //协议提交 草拟、已驳回→审批中
          this.handleContractSub();
          break;
        case "b":
          //变更提交
          this.handleChangeSub();
          break;
        //协议审核
        case "c":
          this.selectioned.map((item) => {
            if (item.contractStatus != 10130010) {
              flag = false;
            }
          });
          if (flag) {
            this.isStatus = 1;
            this.exaShow = true;
          } else {
            this.$openWarning('仅"审核中"状态合同可协议审核');
          }
          break;
        //变更审核
        case "d":
          this.selectioned.map((item) => {
            if (item.contractStatus != 10130025) {
              flag = false;
            }
          });
          if (flag) {
            this.isStatus = 1;
            this.exaShow = true;
          } else {
            this.$openWarning('仅"变更审核中"状态合同可变更审核');
          }
          break;
        default:
          break;
      }
    },
    //合同审批
    handleContractExamine() {
      let flag = true;
      if (this.selectioned.length == 0) {
        this.$openWarning("未选择数据");
        return;
      } 
      // else if (this.selectioned.length > 1) {
      //   this.$openWarning("不可批量操作");
      //   return;
      // }
      // this.selectioned.map(item => {
      //   if (item.contractStatus != 10130030 && item.contractStatus != 10130040) {
      //     flag = false
      //   }
      // })
      // if (
      //   this.selectioned[0].contractStatus == 10130030 ||
      //   this.selectioned[0].contractStatus == 10130040
      // ) {
      //   this.closeData.closeType = this.selectioned[0].closeType + "";
      //   this.closeData.closeReason = this.selectioned[0].closeReason;
      //   this.isStatus = 2;
      //   this.exaShow = true;
      // } else {
      //   this.$openWarning('仅"关闭中,开启中"状态合同可合同审批');
      // }
      for (const item of this.selectioned) {
            if (
              item.contractStatus != 10130030 &&
              item.contractStatus != 10130040
            ) {
              this.$openWarning('仅"关闭中,开启中"状态合同可合同审批');
              return false;
            }
        }
        if (this.selectioned.length==1) {
          this.closeData.closeType = this.selectioned[0].closeType + "";
          this.closeData.closeReason = this.selectioned[0].closeReason;
          this.isStatus = 2;
        }else{
          this.closeData={};
        }
         this.exaShow = true;
    },
    //协议提交
    handleContractSub () {
      if(this.selectioned.length>1){
        this.$openWarning("请选择单条数据提交");
        return;
      }
      let flag = true
      this.selectioned.map(item => {
        if (
          item.contractStatus != 10130005 &&
          item.contractStatus != 10130045
        ) {
          flag = false;
        }
      });
      if (flag) {
        this.$confirm("即将协议提交选中合同，是否继续？", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
          closeOnClickModal: false,
        }).then(() => {
          approveOdFwContract({
            odFwContractList: this.selectionIdVersion,
            approveType: 1,
          })
            .then((res) => {
              this.$openSuccess("提交成功");
              this.initData();
            })
            .catch((err) => {
              this.$openWarning(err.message);
            })
            .catch(() => {});
        });
      } else {
        this.$openWarning('仅"草拟"、"已驳回"状态合同可协议提交');
      }
    },
    //变更提交
    handleChangeSub () {
      if(this.selectioned.length>1){
        this.$openWarning("请选择单条数据提交");
        return;
      }
      let flag = true
      this.selectioned.map(item => {
        if (
          item.contractStatus != 10130020 &&
          item.contractStatus != 10130055
        ) {
          flag = false;
        }
      });
      if (flag) {
        this.$confirm("即将变更提交选中合同，是否继续？", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
          closeOnClickModal: false,
        })
          .then(() => {
            approveOdFwContract({
              odFwContractList: this.selectionIdVersion,
              approveType: 2,
            })
              .then((res) => {
                this.$openSuccess("变更提交成功");
                this.initData();
              })
              .catch((err) => {
                this.$openWarning(err.message);
              });
          })
          .catch(() => {});
      } else {
        this.$openWarning('仅"审批后修改"，"变更驳回"状态合同可变更提交');
      }
    },
    //审核弹窗打开
    exaTip() {
      this.exaShow = true;
    },
    //审核弹窗关闭
    exaCancle() {
      this.exaShow = false;
    },
    //审核弹窗确定获取数据
    exaSure(e, pas) {
      switch (pas) {
        //驳回
        case "0":
          this.handleContractReviewDeny(e);
          break;
        //通过
        case "1":
          this.handleContractReviewPass();
          break;
        default:
          break;
      }
      this.exaShow = false;
    },
    //审核通过
    handleContractReviewPass() {
      let path = "";
      if (this.isStatus == 1) {
        path = auditOdFwContract;
      } else {
        path = auditOdFwContract2;
      }
      path({
        odFwContractList: this.selectionIdVersion,
        isPass: 1,
      })
        .then((res) => {
          this.$openSuccess("审核成功");
          this.initData();
        })
        .catch((err) => {
          this.$openWarning(err.message);
        });
    },
    //审核驳回
    handleContractReviewDeny(unReason) {
      let path = "";
      if (this.isStatus == 1) {
        path = auditOdFwContract;
      } else {
        path = auditOdFwContract2;
      }
      path({
        odFwContractList: this.selectionIdVersion,
        isPass: 0,
        unReason,
      })
        .then((res) => {
          this.$openSuccess("驳回成功");
          this.initData();
        })
        .catch((err) => {
          this.$openWarning(err.message);
        });
    },

    //合同关闭
    closedTip() {
      let flag = false;
      if (this.selectioned.length < 1) {
        this.$openWarning("请选择合同");
      } else {
        this.selectioned.map((item) => {
          if (
            item.contractStatus != 10130015 &&
            item.contractStatus != 10130040
          ) {
            flag = true;
          }
        });
      }
      if (flag) {
        this.$openWarning('仅"已生效"、"开启中"状态合同可关闭');
        return;
      }
      this.closeShow = true;
    },
    closedCancel() {
      this.closeShow = false;
    },
    //合同关闭
    closedSure(type, reason) {
      // this.$confirm('即将关闭选中合同，是否继续？', {
      //   confirmButtonText: '确认',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      //   closeOnClickModal: false
      // }).then(() => {
      turnOdFwContract({
        odFwContractList: this.selectionIdVersion,
        isOpen: 0,
        closeType: type,
        closeReason: reason,
      })
        .then((res) => {
          this.$openSuccess("关闭成功");
          this.closeShow = false;
          this.initData();
        })
        .catch((err) => {
          this.$openWarning(err.message);
        });
      //});
    },
    //合同开启
    handleContractOpen() {
      let flag = true;
      if (this.selectioned.length < 1) {
        this.$openWarning("请选择合同");
      } else {
        this.selectioned.map((item) => {
          if (
            item.contractStatus != 10130035 &&
            item.contractStatus != 10130030
          ) {
            flag = false;
            this.$openWarning('仅"已截停"、"已关闭"状态合同可开启');
          }
        });
      }
      if (flag) {
        this.$confirm("即将开启选中合同，是否继续？", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
          closeOnClickModal: false,
        }).then(() => {
          turnOdFwContract({
            odFwContractList: this.selectionIdVersion,
            isOpen: 1,
          })
            .then((res) => {
              this.$openSuccess("开启成功");
              this.initData();
            })
            .catch((err) => {
              this.$openWarning(err.message);
            });
        });
      }
    },
    //变更
    handleContractChange() {
      if (this.selectioned.length < 1) {
        this.$openWarning("请选择数据");
      } else {
        if (this.selectioned.length == 1) {
          if (
            this.selectioned[0].contractStatus == 10130015 ||
            this.selectioned[0].contractStatus == 10130020 ||
            this.selectioned[0].contractStatus == 10130055
          ) {
            this.$router.push({
              path:
                "/index/contractMange/frame/createFrame?isChange=" +
                1 +
                "&contractId=" +
                this.selectioned[0].contractId,
            });
          } else {
            this.$openWarning('仅"已生效"、"审批后修改"订单可变更');
          }
        } else {
          this.$openWarning("请逐条变更");
        }
      }
    },
    //修改
    handleContractEdit() {
      if (this.selectioned.length === 1) {
        if (
          this.selectioned[0].contractStatus == 10130005 ||
          this.selectioned[0].contractStatus == 10130045
        ) {
          this.$router.push({
            path:
              "/index/contractMange/frame/createFrame?contractId=" +
              this.selectioned[0].contractId,
          });
        } else {
          this.$openWarning('仅"草拟"、"已驳回"状态合同可修改');
        }
      } else {
        this.$openWarning("请选择一条合同修改");
      }
    },
    //查看数据
    handleContractCheck() {
      if (this.selectioned.length === 1) {
        this.$router.push({
          path:
            "/index/contractMange/frame/checkFrame",
          query:{
            contractId:this.selectioned[0].contractId
          }
        });
      } else {
        this.$openWarning("请选择一条合同查看");
      }
    },
    //查看生命树
    goTree(){
        if (this.selectioned.length === 1) {
        sessionStorage.setItem("bizCode", this.selectioned[0].contractNo);
        sessionStorage.setItem("bizType", "FW_CONTRACT");
        this.$router.push({
          path:"/index/home/tree",
          query:{
            bizCode:this.selectioned[0].contractNo,
            bizType:"FW_CONTRACT"
          }
        });
        let obj = {
        url: "treeModel",
        baseUrl: "",
        label: "生命树",
        moduleCode: "",
        params: {},
        query: {
          bizCode:this.selectioned[0].contractNo,
          bizType:"FW_CONTRACT"
        },
      };
      this.$store.commit("tabsListAdd", obj);
      } else {
        this.$openWarning("请选择一条合同查看生命树");
      }
    },
    //创建数据
    handleContractAdd() {
      this.$router.push({ path: "/index/contractMange/frame/createFrame" });
    },
    //删除
    handleContractDele() {
      let flag = true;
      this.selectioned.map((item) => {
        if (
          item.contractStatus != 10130005 &&
          item.contractStatus != 10130045
        ) {
          flag = false;
        }
      });
      if (flag) {
        this.$confirm("即将删除选中合同，是否继续？", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
          closeOnClickModal: false,
        }).then(() => {
          cancellationOdFwContract(this.selectionIdVersion).then((res) => {
            this.$openSuccess("删除成功");
            this.initData();
          });
        });
      } else {
        this.$openWarning('仅"草拟"、"已驳回"状态合同可删除');
      }
    },
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    projectSelect,
    manSelect,
    supplierSelect,
    customerSelect,
    coinSelect,
    exaContract,
    closedContract,
    editSearchItem,
    contractSearch,
  },
};
</script>

<style lang="scss">
</style>
