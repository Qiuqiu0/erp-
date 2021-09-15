<template>
  <div class="jktradeContract content-div">
    <el-col class="el-col el-col-btn auto-sibling">
      <div class="button-div">
        <el-button icon="el-icon-search" class="query-button" @click="queryData"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" @click="clearNone">重置</el-button>
        <el-button @click="showEditPage('searchList')" icon="el-icon-setting" style="float:right"
        >自定义
        </el-button>
      </div>
    </el-col>
    <!-- 搜索 -->
    <div class="index-div3 input-div auto-sibling">
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
          :isInaType="isInaType"
          :contractType="contractType"
          :company="company"
          :branchName="branchName"
          :fwContractNo="fwContractNo"
          :extCode="extCode"
          :supplier="supplier"
          :staffName="staffName"
          :project="project"
          :signTime="signTime"
          :contractDate="contractDate"
          :contractStatus="contractStatus"
          :haveReceiveOrginCopy="haveReceiveOrginCopy"
          :key="item.key"
          :checked="item.checked"
          :matchKey="item.key"
          :label="item.label"
          :componyTip="componyTip"
          :departmentTip="departmentTip"
          :supplierTip="supplierTip"
          :staffTip="staffTip"
          :projectTip="projectTip"
          :agreeTip="agreeTip"
          :departmentList="departmentList"
          :customerList="customerList"
          :supplierList="supplierList"
          :staffNameList="staffNameList"
          :poNo="poNo"
          @changeInput="changeData"
        />
      </div>
      </el-form>
    </div>
    <!--按钮样式-->
    <div class="button-div auto-sibling">
      <el-button
        icon="el-icon-folder-add"
        v-if="$actionFlag(`F001`)"
        class="query-button"
        @click="addList"
        >创建</el-button
      >
      <el-button
        icon="el-icon-edit"
        v-if="$actionFlag(`F002`)"
        @click="setUp(1)"
        >修改</el-button
      >
      <el-button
        icon="el-icon-delete"
        v-if="$actionFlag(`F003`)"
        @click="setUp(2)"
        >删除</el-button
      >
      <el-button
        icon="el-icon-data-line"
        v-if="$actionFlag(`F004`)"
        @click="setUp(0)"
        >查看</el-button
      >
      <el-button icon="el-icon-finished">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            提交
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item icon="el-icon-thumb" command="0">用印审批</el-dropdown-item> -->
            <el-dropdown-item
              icon="el-icon-set-up"
              v-if="$actionFlag(`F005`)"
              command="1"
              >合同审批</el-dropdown-item
            >
            <el-dropdown-item
              icon="el-icon-set-up"
              v-if="$actionFlag(`F006`)"
              command="2"
              >变更审批</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-button>
      <el-button
        icon="el-icon-receiving"
        v-if="$actionFlag(`F007`)"
        @click="setUp(3)"
        >审核</el-button
      >
      <el-button
        @click="setUp(8)"
        icon="el-icon-receiving"
        v-if="$actionFlag(`F016`)"
        >合同开关审核</el-button
      >
      <el-button
        icon="el-icon-close"
        v-if="$actionFlag(`F008`)"
        @click="closedTip"
        class="widauto"
        >合同关闭</el-button
      >
      <el-button
        icon="el-icon-check"
        v-if="$actionFlag(`F009`)"
        @click="setUp(5)"
        class="widauto"
        >合同开启</el-button
      >
      <!-- <el-button icon="el-icon-copy-document" v-if="$actionFlag(`F010`)" @click="setUp(7, 1)" class="widauto">合同拆分</el-button> -->
      <el-button
        icon="el-icon-edit-outline"
        v-if="$actionFlag(`F011`)"
        @click="setChange"
        >变更</el-button
      >
      <el-button
        icon="el-icon-download"
        @click="exportTable"
        v-if="$actionFlag(`F012`)"
        >导出</el-button>
      <el-button
        icon="el-icon-guide"
        v-if="$actionFlag(`F013`)"
        @click="ycdx"
        class="widauto"
        >以销定采</el-button
      >
      <!-- <el-button @click="setUp(3)">禁用</el-button>
      <el-button @click="setUp(4)">启用</el-button>-->
      <el-button
        icon="el-icon-download"
        v-if="$actionFlag(`F014`)"
        @click="doubleSignature"
        >双签上传</el-button
      >
      <el-button
        icon="el-icon-download"
        v-if="$actionFlag(`F015`)"
        @click="originalReceived"
        >收到原件</el-button
      >
      <el-button icon="el-icon-thumb" v-if="$actionFlag(`F017`)" @click="goTree">生命树</el-button>
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
        @row-dblclick="dblclick"
        @row-click="rowClick"
        v-loading="loading"
        :cell-class-name="cell"
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
            <span v-if="item.key === 'haveReceiveOrginCopy'">
              {{
                scope.row.haveReceiveOrginCopy == 1
                  ? "已上传"
                  : scope.row.haveReceiveOrginCopy == 2
                  ? "收到原件"
                  : "否"
              }}</span
            >
            <span v-if="item.key === 'contractStatus'"
              ><span v-for="(item, index) in isInaType" :key="index">
                <span v-if="item.dict_code == scope.row.contractStatus">
                  {{ item.dict_value }}
                </span>
              </span>
            </span>
            <span v-if="item.key === 'signTime'">
              {{ $timeFun(scope.row.signTime, 1) }}</span
            >
            <span v-if="item.key === 'contractEndDate'">
              {{ $timeFun(scope.row.contractEndDate, 1) }}</span
            >
            <span v-if="item.key === 'contractAmtVat'">
              {{ scope.row.contractAmtVat | $moneyFormat }}</span
            >
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
    <!-- 选择公司弹窗 -->
    <compony-select
      v-if="componyShow"
      :tipShow="componyShow"
      @tipsCancle="tipsCancle"
      @tipsSure="tipsSure"
    ></compony-select>
    <!-- 选择部门弹窗 -->
    <department-select
      v-if="departmentShow"
      :tipShow="departmentShow"
      :data="company"
      @departmentCancle="departmentCancle"
      @departmentSure="departmentSure"
    ></department-select>
    <!-- 选择员工弹窗 -->
    <staff-select
      v-if="staffShow"
      :tipShow="staffShow"
      :data="branchName"
      @staffCancle="staffCancle"
      @staffSure="staffSure"
    ></staff-select>
    <!-- 选择项目弹窗 -->
    <project-select
      v-if="projectShow"
      :tipShow="projectShow"
      @projectCancle="projectCancle"
      @projectSure="projectSure"
    ></project-select>
    <!-- 选择人员信息弹窗 -->
    <man-select
      v-if="manShow"
      :tipShow="manShow"
      @manCancle="manCancle"
      @manSure="manSure"
    ></man-select>
    <!-- 选择客户弹窗 -->
    <customer-select
      v-if="customerShow"
      :tipShow="customerShow"
      @customerCancle="customerCancle"
      @customerSure="customerSure"
    ></customer-select>
    <!-- 选择供应商弹窗 -->
    <supplier-select
      v-if="supplierShow"
      :tipShow="supplierShow"
      @supplierCancle="supplierCancle"
      @supplierSure="supplierSure"
    ></supplier-select>
    <!-- 选择框架弹窗 -->
    <agree-select
      v-if="agreeShow"
      :tipShow="agreeShow"
      :companyName="company"
      @agreeCancle="agreeCancle"
      @agreeSure="agreeSure"
    ></agree-select>
    <!-- 以采定销弹窗 -->
    <ycdx-pop
      v-if="ycdxShow"
      :tipShow="ycdxShow"
      @ycdxCancle="ycdxCancle"
      @ycdxSure="ycdxSure"
    ></ycdx-pop>
    <!-- 审核弹窗 -->
    <!-- <el-dialog title="审核" :visible.sync="dialogVisible" width="50%">
      <div>
        <textarea name id cols="30" rows="10" v-model="textarea" placeholder="请输入不通过原因"></textarea>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button icon="el-icon-search"  @click="shenhe(0)">驳回</el-button>
        <el-button icon="el-icon-search"  type="primary" @click="shenhe(1)">通过</el-button>
      </span>
    </el-dialog> -->
    <exa-contract
      v-if="exaShow"
      :tipShow="exaShow"
      @exaCancle="exaCancle"
      @exaSure="exaSure"
      :closeData="closeData"
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
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px;"
            size="small"
            class="addBut"
            icon="el-icon-upload"
            @click="submitUpload"
            >上传</el-button
          >
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
        <el-table-column prop="createdName" label="上传人"> </el-table-column>
        <el-table-column label="文件操作">
          <template slot-scope="scope">
            <el-button @click="down(scope.row)" type="text" size="small"
              >下载</el-button
            >
            <el-button
              @click="delFile(scope.$index, scope.row)"
              type="text"
              size="small"
              >删除</el-button
            >
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
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect2.vue";
import staffSelect from "@/components/staffSelect2.vue";
import projectSelect from "@/components/projectSelect.vue";
import manSelect from "@/components/manSelect.vue";
import customerSelect from "@/components/customerSelect2.vue";
import supplierSelect from "@/components/supplierSelect2.vue";
import agreeSelect from "@/components/agreeSelect.vue";
import exaContract from "@/views/contractMange/exaContract.vue";
import closedContract from "@/views/contractMange/closedContract.vue";
import ycdxPop from "@/views/contractMange/jktrade/ycdxPop.vue";
import contractSearch from "@/views/contractMange/components/contractSearch2";
import editSearchItem from "@/components/editSearchItem";
import Cmange from "@/api/contractMange/cmange";
import uploadApi from "@/api/component";
import { getFilter, setFilter } from "@/mixins/editCondition";
import { exportData } from "@/mixins/export.js";

const AllSearch = [
  { key: "company", label: "公司", checked: true },
  { key: "branchName", label: "部门", checked: true },
  { key: "staffName", label: "业务员", checked: true },
  { key: "supplier", label: "供应商", checked: true },
  { key: "extCode", label: "外部合同号", checked: true },
  { key: "poNo", label: "采购合同号", checked: true },
  { key: "signTime", label: "签订日期", checked: true },
  { key: "contractStatus", label: "合同状态", checked: true },
  { key: "fwContractNo", label: "框架协议号", checked: true },
  { key: "projectCode", label: "项目号", checked: true },
  { key: "project", label: "项目名称", checked: true },
  { key: "contractDate", label: "有效日期", checked: true },
  { key: "haveReceiveOrginCopy", label: "是否双签", checked: true },
]; //全部选项标签
const ALLHeader = [
  {
    label: "合同类型",
    tooltip: true,
    key: "poType",
    checked: true,
    temp: true,
  },
  {
    label: "采购合同号",
    tooltip: true,
    key: "poNo",
    checked: true,
    width: "170",
    sortable: true,
  },
  {
    label: "外部合同号",
    tooltip: true,
    key: "extCode",
    checked: true,
    width: "170",
  },
  {
    label: "状态",
    tooltip: true,
    key: "contractStatus",
    checked: true,
    width: "170",
    temp: true,
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
    width: "170",
  },
  {
    label: "业务币含税金额",
    tooltip: true,
    key: "contractAmtVat",
    checked: true,
    width: "120",
    sortable: true,
    temp:true
  },
  {
    label: "签订日期",
    tooltip: true,
    key: "signTime",
    checked: true,
    width: "170",
    temp: true,
    sortable: true,
  },
  {
    label: "有效日期",
    tooltip: true,
    key: "contractEndDate",
    checked: true,
    width: "170",
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
  {
    label: "业务员",
    tooltip: true,
    key: "bizPersonName",
    checked: true,
    width: "170",
  },
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
  name: "jktradeContract",
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
        },

      ],
      editPage: false,
      searchList: AllSearch,
      headerList: ALLHeader,
      editKey: "",
      editList: [],
      dialogVisible: false,
      textarea: ``,
      exaShow: false, //审核弹窗
      ycdxShow: false, //以采定销弹窗
      componyShow: false, //银行弹窗
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      projectShow: false, //项目弹窗
      coinShow: false, //币种弹窗
      manShow: false, //人员弹窗
      customerShow: false, //客户弹窗
      supplierShow: false, //供应商弹窗
      agreeShow: false, //框架协议弹窗
      supplier: [], //供应商
      tableData: [], //表格
      selectioned: [], //表格选中项
      index: null, //选中index
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      company: {}, //公司
      branchName: [], //部门
      staffName: [], //员工
      project: {}, //项目
      custName: [], //客户
      manName: ``, //人员
      poNo: ``, //采购合同号
      fwContractNo:'', //框架协议号
      isInaType: [], //合同状态
      contractType: [], //合同类型
      extCode: ``, //外部合同号
      signTime: [], //签订日期
      contractDate: [], //有效日期
      poType: ``, //合同类型
      contractStatus: [], //合同状态
      loading: true, //表格loading
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      pickerClose: {},
      navColor: {
        button: {
          backgroundColor: "", //按钮颜色
        },
      },
      show: true,
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
      isStatus: "", //1审核，2审批
      closeShow: false,
      closeData: {}, //关闭的信息
    };
  },
  mixins: [getFilter, setFilter,exportData],
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
      this.queryData();
    }
    // data.branchName = this.branchName; //部门
    //   data.staffName = this.staffName; //部门
    //   data.project = this.project; //部门
    //   data.supplier = this.supplier;
    //   data.contractNo = this.contractNo;
    //取查询条件
    let data = this.$getQueryData(this);
    this.departmentList = data.branchName;
    this.staffNameList = data.staffName;
    this.supplierList = data.supplier;
    this.contractStatus=data.contractStatusList;
    if (data.contractBeginDate) {
      this.contractDate[0] = data.contractBeginDate;
      this.contractDate[1] = data.contractEndDate;
    }
    if (data.signTimeBegin) {
      this.signTime[0] = data.signTimeBegin;
      this.signTime[1] = data.signTimeEnd;
    }
    this.htlx();
    this.htzt();
    this.getFilter();

  },
  mounted() {},
  methods: {
    //查看生命树
    goTree(){
        if (this.selectioned.length === 1) {
        sessionStorage.setItem("bizCode", this.selectioned[0].poNo);
        sessionStorage.setItem("bizType", "PO_CONTRACT");
        this.$router.push({
          path:"/index/home/tree",
          query:{
            bizCode:this.selectioned[0].poNo,
            bizType:"PO_CONTRACT"
          }
        });
        let obj = {
        url: "treeModel",
        baseUrl: "",
        label: "生命树",
        moduleCode: "",
        params: {},
        query: {
          bizCode:this.selectioned[0].poNo,
          bizType:"PO_CONTRACT"
        },
      };
      this.$store.commit("tabsListAdd", obj);
      } else {
        this.$openWarning("请选择一条合同查看生命树");
      }
    },
    tableSortChange(column) {
      const { prop, order } = column;
      if (order === "descending") {
        this.sort = `${prop} desc`;
      } else {
        this.sort = `${prop} asc`;
      }
      this.List();
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
          this.businessId = data.poId;
          this.version = data.version;
          this.fileShow = true;
          this.uploadList.tableList = [];
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
              contractType: 2, //采购
            };
            uploadApi
              .deleteDoubleCheckAccessory(data)
              .then((res) => {
                if (res.code == "success") {
                  this.$openSuccess(res.message);
                  this.uploadList.tableList.splice(index, 1);
                  this.List();
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
      Cmange.doubleCheckOdPoContract(data)
        .then((res) => {
          if (res.code == "success") {
            this.$openSuccess(res.message);
            this.fileShow = false;
            this.List();
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
      Cmange.haveReceiveOrginCopy(list)
        .then((res) => {
          if (res.code == "success") {
            this.$openSuccess(res.message);
            this.List();
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
    //移除
    handleRemove(file, fileList) {
      //  console.log(file, fileList);
    },
    inputShow() {
      this.show = this.$showOne(this.show);
    },
    cell({ row, column, rowIndex, columnIndex }) {
      //第八列添加 red 类
      if (column.property == "contractAmtVat") {
        return "rightTd";
      } else {
        return "";
      }
    },
    //获取合同类型
    htlx() {
      let data = {
        dictNo: 1014,
        bizCategory: 0,
      };
      Cmange.selectDic(data)
        .then((res) => {
          this.contractType = res.data;
          this.List();
        })
        .catch();
    },
    //获取合同类型
    htzt() {
      Cmange.htzt()
        .then((res) => {
          this.isInaType = res.data;
        })
        .catch();
    },
    //协议弹窗打开
    agreeTip() {
      this.agreeShow = true;
    },
    //协议弹窗关闭
    agreeCancle() {
      this.agreeShow = false;
    },
    //协议弹窗确定获取数据
    agreeSure(e) {
      this.agreeShow = false;
      this.fwContractNo = e.contractNo;
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
      this.branchName = ``;
      this.staffName = ``;
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
      this.branchNameStr = branchNameStr;
      this.departmentList = e;
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
      // if (this.company == `` || this.branchName == ``) {
      //   this.$openWarning("请先选择公司和部门");
      //   return false;
      // }
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
    },
    //以采定销打开
    ycdxTip() {
      this.ycdxShow = true;
    },
    //以采定销关闭
    ycdxCancle() {
      this.ycdxShow = false;
    },
    //以采定销确定获取数据
    // ycdxSure(e) {
    //   this.ycdxShow = false;
    // },
    ycdxSure(e, h) {
      //e 合同表
      //h 明细表
      if (e.length && h.length) {
        this.$router.push({
          name: `createJktrade`,
          params: { first: h, eight: e },
        });
      }
      this.ycdxShow = false;
    },
    //获取表格
    List() {
      let poTypeList = [];
      this.contractType.forEach((item) => {
        poTypeList.push(item.dict_key);
      });
      this.loading = true;
      let params = {
        sort: this.sort,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        poNo: this.poNo,
        companyCode: this.company.companyCode,
        companyId: this.company.companyId,
        companyName: this.company.companyName,
        bbBranchBaseList: this.branchName,
        bbEmployeeList: this.staffName,
        extCode: this.extCode,
        fwContractNo: this.fwContractNo,
        projectCode: this.project.projectCode,
        projectName: this.project.projectName,
        signTimeBegin: this.signTime[0],
        signTimeEnd: this.signTime[1],
        contractBeginDate: this.contractDate && this.contractDate[0],
        contractEndDate: this.contractDate && this.contractDate[1],
        poType: 10140010,
        poTypeList: poTypeList,
        contractStatusList: this.contractStatus,
        bbSupplierBaseList: this.supplier,
        haveReceiveOrginCopy: this.haveReceiveOrginCopy,
      };
      let data = params;
      data.company = this.company; //公司
      data.branchName = this.branchName; //部门
      data.staffName = this.staffName; //部门
      data.project = this.project; //部门
      data.supplier = this.supplier;
      //data.fwContractNo = this.fwContractNo;
      this.$setQueryData(this, data);
      Object.keys(params).forEach((key) => {
        if (params[key] == `` || params[key] == `undefined`) {
          delete params[key];
        }
      });
      Cmange.List(params)
        .then((res) => {
          this.tableData = res.data;
          this.total = res.total;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
     exportTable() {
       let poTypeList = [];
      this.contractType.forEach((item) => {
        poTypeList.push(item.dict_key);
      });
      let params = {
        sort: this.sort,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        poNo: this.poNo,
        companyCode: this.company.companyCode,
        companyId: this.company.companyId,
        companyName: this.company.companyName,
        bbBranchBaseList: this.branchName,
        bbEmployeeList: this.staffName,
        extCode: this.extCode,
        fwContractNo: this.fwContractNo,
        projectCode: this.project.projectCode,
        projectName: this.project.projectName,
        signTimeBegin: this.signTime[0],
        signTimeEnd: this.signTime[1],
        contractBeginDate: this.contractDate && this.contractDate[0],
        contractEndDate: this.contractDate && this.contractDate[1],
        poType: 10140010,
        poTypeList: poTypeList,
        contractStatusList: this.contractStatus,
        bbSupplierBaseList: this.supplier,
        haveReceiveOrginCopy: this.haveReceiveOrginCopy,
      };
     let data = params;
      data.company = this.company; //公司
      data.branchName = this.branchName; //部门
      data.staffName = this.staffName; //部门
      data.project = this.project; //部门
      data.supplier = this.supplier;
     // data.fwContractNo = this.fwContractNo;
      Object.keys(params).forEach((key) => {
        if (params[key] == `` || params[key] == `undefined`) {
          delete params[key];
        }
      });
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
    //查询
    queryData() {
      this.List();
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
      this.staffName = [];
      this.poNo = ``;
      this.custName = [];
      this.extCode = ``;
      this.project = {};
      this.signTime = [];
      this.contractDate = [];
      this.contractStatus = [];
      this.fwContractNo ="";
      this.supplier = [];
      this.haveReceiveOrginCopy = "";
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.List();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.List();
    },
    //表格选择
    handleChange(e) {
      this.selectioned = e;
    },
    //单行双击
    dblclick(e) {
      this.$router.push({
        path: "/index/contractMange/jktrade/jkDetail",
        query: { id: e.poId },
      });
      this.selectioned = e;
      this.index = this.tableData.indexOf(e);
      this.$set(this.tableData, this.tableData.indexOf(e), e);
    },
    //单行点击
    rowClick(e) {
      this.$refs.multipleTable.toggleRowSelection(e);
      // this.selectioned.push(e);
      this.index = this.tableData.indexOf(e);
    },
    //创建
    addList() {
      this.$router.push({
        path: "/index/contractMange/jktrade/createJktrade",
      });
    },
    ycdx() {
      this.ycdxShow = true;
    },
    //数据操作  0查看 1修改 2删除 3审核 4关闭 5开启 7拆分
    setUp(e, children) {
      if (!this.selectioned.length) {
        this.$openWarning("未选择数据");
        return false;
      }
      //合同拆分
      if (children == 1) {
        if (this.selectioned[0].contractStatus != 10130015) {
          this.$openWarning(`只有已生效状态可修改`);
          return false;
        }
        this.$router.push({
          path: `/index/contractMange/jktrade/createJktrade`,
          query: { id: this.selectioned[0].poId, children: 1 },
        });
        return false;
      }
      if (e == 1) {
        if (
          this.selectioned[0].contractStatus != 10130005 &&
          this.selectioned[0].contractStatus != 10130045
        ) {
          this.$openWarning(`只有草拟、已驳回状态可修改`);
          return false;
        }
        this.$router.push({
          path: `/index/contractMange/jktrade/createJktrade`,
          query: { id: this.selectioned[0].poId },
        });
      } else if (e == 0) {
        this.$router.push({
          path: `/index/contractMange/jktrade/jkDetail`,
          query: { id: this.selectioned[0].poId },
        });
      } else if (e == 8) {
        if (this.selectioned.length == 0) {
          this.$openWarning("未选择数据");
          return;
        } 
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
      } else {
        let title = `是否确定删除`;
        if (e == 3) {
          title = `是否确定审核`;
          // this.dialogVisible = true;
          for (const item of this.selectioned) {
            if (
              item.contractStatus != 10130010 &&
              item.contractStatus != 10130025
            ) {
              this.$openWarning(`只有审批中,变更审批中状态可操作`);
              return false;
            }
          }
          this.isStatus = 1;
          this.exaShow = true;
          return false;
        } else if (e == 4) {
          title = `是否确定关闭合同`;
        } else if (e == 5) {
          title = `是否确定开启合同`;
        }
        this.$confirm(title, {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
          closeOnClickModal: false,
        })
          .then(() => {
            let params = this.selectioned;
            let guanbi = {
              odPoContractList: this.selectioned,
              isOpen: 0,
            };
            let kaiqi = {
              odPoContractList: this.selectioned,
              isOpen: 1,
            };
            switch (e) {
              case 2:
                //清除草拟和驳回
                for (const item of this.selectioned) {
                  if (
                    item.contractStatus != 10130005 &&
                    item.contractStatus != 10130045
                  ) {
                    this.$openWarning(`只有草拟、已驳回状态可修改`);
                    return false;
                  }
                }
                Cmange.delCon(params)
                  .then((res) => {
                    this.$openSuccess(res.message);
                    this.List();
                  })
                  .catch();
                break;
              case 4:
                // for (const item of this.selectioned) {
                //   if (item.contractStatus != 10130015) {
                //     this.$openWarning(`只有已生效状态可关闭`);
                //     return false;
                //   }
                // }
                // Cmange.turnCon(guanbi)
                //   .then(res => {
                //     this.$openSuccess(res.message);
                //     this.List();
                //   })
                //   .catch();
                break;
              case 5:
                for (const item of this.selectioned) {
                  if (
                    item.contractStatus != 10130035 &&
                    item.contractStatus != 10130050
                  ) {
                    this.$openWarning(`只有已截停、已关闭状态可开启`);
                    return false;
                  }
                }
                Cmange.turnCon(kaiqi)
                  .then((res) => {
                    this.$openSuccess(res.message);
                    this.List();
                  })
                  .catch();
                break;
              default:
                break;
            }
          })
          .catch();
      }
    },
    //变更
    setChange() {
      if (!this.selectioned.length) {
        this.$openWarning("未选择数据");
        return false;
      }
      for (const item of this.selectioned) {
        if (
          item.contractStatus != 10130015 &&
          item.contractStatus != 10130020 &&
          item.contractStatus != 10130055
        ) {
          this.$openWarning(`只有已生效/审批后修改状态可变更`);
          return false;
        }
      }
      this.$router.push({
        path: `/index/contractMange/jktrade/createJktrade`,
        query: { id: this.selectioned[0].poId, change: true },
      });
    },
    // 审核
    shenhe(e, pas, type) {
      if (!this.selectioned.length) {
        this.$openWarning("未选择数据");
        return false;
      }
      let params = {
        odPoContractList: this.selectioned,
        isPass: pas,
        auditInfo: e,
      };
      let path = "";
      if (type == 1) {
        path = Cmange.audCon;
      } else {
        path = Cmange.audCon2;
      }
      path(params)
        .then((res) => {
          this.dialogVisible = false;
          this.textarea = ``;
          this.$openSuccess("操作成功");
          this.List();
        })
        .catch((err) => {
          //this.$openWarning(err.message);
        });
    },
    //提交审批
    handleCommand(e) {
      if (!this.selectioned.length) {
        this.$openWarning("未选择数据");
        return false;
      }
      if(this.selectioned.length>1){
        this.$openWarning("请选择单条数据提交");
        return;
      }
      for (const item of this.selectioned) {
        if (e != 2) {
          if (
            item.contractStatus != 10130005 &&
            item.contractStatus != 10130045
          ) {
            this.$openWarning(`只有草拟、已驳回状态可合同审批`);
            return false;
          }
        } else {
          if (
            item.contractStatus != 10130020 &&
            item.contractStatus != 10130055
          ) {
            this.$openWarning(`只有"审批后修改","变更驳回"可变更审批`);
            return false;
          }
        }
      }
      let title = "是否确定审批";
      this.$confirm(title, {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false,
      })
        .then(() => {
          let params = {
            odPoContractList: this.selectioned,
            approveType: e,
          };
          Cmange.appCon(params)
            .then((res) => {
              this.$openSuccess(res.message);
              this.List();
            })
            .catch();
        })
        .catch();
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
      this.shenhe(e, pas, this.isStatus);
      this.exaShow = false;
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
    closedSure(type, reason) {
      let data = {
        odPoContractList: this.selectioned,
        isOpen: 0,
        closeType: type,
        closeReason: reason,
      };
      Cmange.turnCon(data)
        .then((res) => {
          this.closeShow = false;
          this.$openSuccess(res.message);
          this.List();
        })
        .catch();
    },
    closedCancel() {
      this.closeShow = false;
    },
    //删除方法
    deleIndex(e) {
      let del = this.tableData.findIndex((item) => {
        return item.warehouseId == e.warehouseId;
      });
      this.tableData.splice(del, 1);
    },
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    projectSelect,
    manSelect,
    ycdxPop,
    customerSelect,
    supplierSelect,
    agreeSelect,
    exaContract,
    closedContract,
    editSearchItem,
    contractSearch,
  },
};
</script>

<style lang="scss">
.jktradeContract {
  .el-dropdown-link {
    color: #3e3f42;
  }
  .el_flex {
    display: flex;
    align-items: center;
  }

  .el-date-editor.el-input {
    width: auto;
  }
  .widauto {
    width: auto !important;
  }
  .el-col {
    position: relative;
    .comicon {
      width: 170px;
      height: 20px;
      position: absolute;
      right: 5px;
      top: 4px;
      cursor: pointer;
    }
  }
  .el-dropdown {
    color: #31478f;
    font-size: 12px;
    &:hover {
      color: #ffffff;
    }
  }
  textarea {
    width: 100%;
  }
}
</style>
