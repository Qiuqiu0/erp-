<template>
  <div id="otherware">
    <!-- 按钮 -->
    <!-- <el-divider></el-divider> -->
    <!-- input -->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-search" class="query-button" @click="query"> 查询</el-button>
      <el-button icon="el-icon-refresh" @click="clearmsg">重置</el-button>
      <el-button @click="showEditPage('searchList')" icon="el-icon-setting" style="float:right">
        自定义
      </el-button>
    </div>
    <div class="index-div3 auto-sibling">
      <div v-if="$checkedNum(searchList) > 4">
        <p class="hide-input" v-if="show" @click="inputShow()">更多条件<i class="el-icon-caret-bottom"></i></p>
        <p class="hide-input" v-else @click="inputShow()">收起<i class="el-icon-caret-top"></i></p>
      </div>
      <el-form @keyup.enter.native="getUserlist">
      <div class="search-div">
        <contract-search
            v-for="item in searchList"
            :label="item.label"
            :key="item.key"
            :checked="item.checked"
            :matchKey="item.key"
            :otherKey="item.otherKey"
            :company="company"
            :componyTip="componyTip"
            :branchName="branchName"
            :departmentTip="departmentTip"
            :customerName="customerName"
            :customerPopup="customerPopup"
            :lcReceiveCode="lcReceiveCode"
            :lcAmt="lcAmt"
            :coin="coin"
            :lcStatus="lcStatus"
            :fhtypearr="fhtypearr"
            :lcReceiveDate="lcReceiveDate"
            :lcProperty="lcProperty"
            :mytypearr="mytypearr"
            :lcType="lcType"
            :typearr="typearr"
            :lcDueType="lcDueType"
            :typeStatus="typeStatus"
            :lcIssueDate="lcIssueDate"
            :effectiveDate="effectiveDate"
            :deadlineLoaddate="deadlineLoaddate"
            :createdBy="createdBy"
            :createdTime="createdTime"
            :warrantCode="warrantCode"
            :warrantMonth="warrantMonth"
            :writeoffWarrantCode="writeoffWarrantCode"
            :writeoffWarrantMonth="writeoffWarrantMonth"
            @changeInput="changeData"
            :departmentList="departmentList"
            :customerList="customerList"
        />
      </div>
      </el-form>
    </div>
    <!-- <el-divider></el-divider> -->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-folder-add" v-if="$actionFlag(`F001`)"  @click="creatcom('creat')">创建</el-button>
      <el-button icon="el-icon-edit" v-if="$actionFlag(`F002`)"  @click="creatcom('edit')">修改</el-button>
      <el-button icon="el-icon-data-line" v-if="$actionFlag(`F003`)" @click="creatcom('look')">查看</el-button>
      <el-button icon="el-icon-delete" v-if="$actionFlag(`F004`)" @click="delitemsg">删除</el-button>
      <el-button icon="el-icon-attract" v-if="$actionFlag(`F005`)" @click="creatcom('claim')">认领</el-button>
      <el-button icon="el-icon-money" v-if="$actionFlag(`F009`)" @click="creatcom('claimPost')">认领过账</el-button>
      <el-button icon="el-icon-document-delete" v-if="$actionFlag(`F010`)" @click="creatcom('claimWriteOffShow')">认领冲销</el-button>
      <el-button icon="el-icon-bank-card" v-if="$actionFlag(`F006`)" @click="creatcom('collections')">收款</el-button>
      <el-button icon="el-icon-money" v-if="$actionFlag(`F007`)" @click="creatcom('post')">过账</el-button>
      <el-button icon="el-icon-document-delete" v-if="$actionFlag(`F008`)" @click="creatcom('writeOffShow')">冲销</el-button>
      <el-button 
      icon="el-icon-thumb" 
      @click="goTree"
      v-if="$actionFlag(`F011`)"
      >生命树</el-button>
      <el-button @click="showEditPage('headerList')" icon="el-icon-setting" style="float:right">
        自定义
      </el-button>
    </div>
    <!-- 表格 -->
    <div class="el-table-div" v-auto>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width: 100%"
        height="calc(100% - 35px)"
        @selection-change="handleSelectionChange"
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
            <span v-if="item.key === 'lcAmt'">{{ scope.row.lcAmt | $moneyFormat }}</span>
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
       <!-- 选择客户弹窗 -->
      <customer-select
       v-if="customerShow"
       :tipShow="customerShow"
       @customerCancle="customerCancel"
        @customerSure="customerSure">
      </customer-select>
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
    </div>
    <!-- 过账弹窗 -->
    <el-dialog title="过账" :visible.sync="post" width="25%">
      <div class="examine-dialog" v-show="postS">
        <p  style="height:100px;line-height:100px;" class="tips">
          <i class="el-icon-info"></i>
          批量过账时过账时间以过账单中过账日期为准，请事先确认，谨慎操作！
        </p>
      </div>
      <div v-show="!postS" style="height:100px;line-height:100px;">
        <label style="margin-right:20px;vertical-align: middle;">过账日期</label>
          <el-date-picker
            class="el-input-date"
            size="mini"
            v-model="postOperationDate"
            style="width:200px"
            type="date"
            placeholder="年/月/日"
            :picker-options="pickerOptions"
          ></el-date-picker>
      </div>
      <div class="button-div2">
        <el-button icon="el-icon-check" @click="shenhe(0)">确定</el-button>
        <el-button icon="el-icon-close" type="primary" @click="shenhe(1)">取消</el-button>
      </div>
    </el-dialog>
    <!-- 冲销弹窗 -->
    <el-dialog title="冲销" :visible.sync="writeOffShow" width="25%">
      <div style="height:100px;line-height:50px;">
        <label style="margin-right:20px;vertical-align: middle;" v-show="!writeOffShowUp">冲销日期</label>
          <el-date-picker
            class="el-input-date"
            size="mini"
            v-model="writeOff"
            style="width:200px"
            type="date"
            v-show="!writeOffShowUp"
            placeholder="年/月/日"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <div  v-show="writeOffShowUp" style="margin-top:20px;"></div>
          <div>
            <label style="width: 6.5%;margin-right:20px;vertical-align: middle;">冲销原因</label>
              <el-input
                style="width: 50%;"
                v-model="writeOffReason"
                class="el-inputs"
                size="small"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入内容"
              ></el-input>
          </div>
      </div>
      <div class="button-div2">
        <el-button icon="el-icon-check" @click="writeOffShowS(0)">确定</el-button>
        <el-button icon="el-icon-close" type="primary" @click="writeOffShowS(1)">取消</el-button>
      </div>
    </el-dialog>
    <!-- 认领过账弹窗 -->
    <el-dialog title="信用证认领过账" :visible.sync="claimPost" width="25%">
      <div style="height:100px;line-height:100px;">
        <label style="margin-right:20px;vertical-align: middle;">认领过账日期</label>
          <el-date-picker
            class="el-input-date"
            size="mini"
            v-model="reclaimDate"
            style="width:180px"
            type="date"
            placeholder="年/月/日"
            :picker-options="pickerOptions"
          ></el-date-picker>
      </div>
      <div class="button-div2">
        <el-button icon="el-icon-check" @click="claimPostTrue(0)">确定</el-button>
        <el-button icon="el-icon-close" type="primary" @click="claimPostTrue(1)">取消</el-button>
      </div>
    </el-dialog>
    <!-- 认领冲销弹窗 -->
    <el-dialog title="信用证认领冲销" :visible.sync="claimWriteOffShow" width="25%">
      <div style="height:100px;line-height:100px;">
        <label style="margin-right:20px;vertical-align: middle;">认领冲销日期</label>
          <el-date-picker
            class="el-input-date"
            size="mini"
            v-model="reclaimWriteoffDate"
            style="width:180px"
            type="date"
            placeholder="年/月/日"
            :picker-options="pickerOptions"
          ></el-date-picker>
      </div>
      <div class="button-div2">
        <el-button icon="el-icon-check" @click="claimWriteOffShowTrue(0)">确定</el-button>
        <el-button icon="el-icon-close" type="primary" @click="claimWriteOffShowTrue(1)">取消</el-button>
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
import axios from "axios";
import { mapState } from "vuex";
import componySelect from "@/components/componySelect.vue"; //公司组件
import customerSelect from "@/components/customerSelect2.vue"; //客户组件
import departmentSelect from "@/components/departmentSelect2.vue"; //部门组件
import staffSelect from "@/components/staffSelect2.vue"; //业务员组件
import warehouseSelect from "@/components/warehouseSelect.vue"; //仓库组件
import { log } from "util";
import coinSelect from "@/views/fundsManage/conponents/coinSelect";
// import { service, serviceJson } from "../../axios/index.js";
import {
  letterReceipt,
  letterStatus,
  selectFiLcReceiveList,
  reduceMsg,
  postingFiLcReceive,
  chargeFiLcReceive,
  getAccountPeriodByCompany,
  postClaim,
  chargeClaim,
  selectFiLcReceiveListSumV2
} from "@/api/letterManage/letterManageFirst";
import editSearchItem from "@/components/editSearchItem";
import contractSearch from "@/views/fundsManage/conponents/contractSearch2";

import {getFilter, setFilter} from "@/mixins/editCondition";

const AllSearch = [
  { key: "companyName", label: "公司", checked: true },
  { key: "branchName", label: "部门", checked: true },
  { key: "customerName", label: "客户", checked: true },
  { key: "lcReceiveCode", label: "信用证号", checked: true },
  { key: "lcAmt", label: "信用证金额", checked: true },
  { key: "coin", label: "币种", checked: true },
  { key: "lcStatus", label: "信用证状态", checked: true },
  { key: "lcReceiveDate", label: "收证日期", checked: true },
  { key: "lcProperty", label: "信用证属性", checked: true },
  { key: "lcType", label: "信用证性质", checked: true },
  { key: "lcDueType", label: "信用证类别", checked: true },
  { key: "lcIssueDate", label: "开证日期", checked: true },
  { key: "effectiveDate", label: "有效期限", checked: true },
  { key: "deadlineLoaddate", label: "装运期限", checked: true },
  { key: "createdBy", label: "创建人", checked: true },
  { key: "createdTime", label: "创建日期", checked: true },
  { key: "warrantCode", label: "凭证号", checked: true },
  { key: "warrantMonth", label: "期间", checked: true },
  { key: "writeoffWarrantCode", label: "冲销凭证号", checked: true },
  { key: "writeoffWarrantMonth", label: "冲销期间", checked: true }
]; //全部选项标签
const ALLHeader = [
  {
    key: "companyName",
    label: "公司",
    tooltip: true,
    checked: true,
    width: 170
  },
  {
    key: "orgName",
    label: "部门",
    tooltip: true,
    checked: true,
    width: 170
  },
  {
    key: "custName",
    label: "付款单位",
    tooltip: true,
    checked: true,
    width: 100
  },
  {
    key: "lcReceiveCode",
    label: "信用证号",
    tooltip: true,
    checked: true,
    width: 100,
    sortable: true
  },
  {
    key: "lcAmt",
    label: "信用证金额",
    tooltip: true,
    checked: true,
    width: 100,
    temp:true
  },
  {
    key: "currencyCode",
    label: "币别",
    tooltip: true,
    checked: true,
    width: 100
  },
  {
    key: "lcStatusName",
    label: "信用证状态",
    tooltip: true,
    checked: true,
    width: 100
  },
  {
    key: "lcReceiveDate",
    label: "收证日期",
    tooltip: true,
    checked: true,
    width: 100,
    sortable: true
  },
  {
    key: "lcIssueDate",
    label: "开证日期",
    tooltip: true,
    checked: true,
    width: 100,
    sortable: true
  },
  {
    key: "deadlineLoaddate",
    label: "装运日期",
    tooltip: true,
    checked: true,
    width: 100
  },
  {
    key: "effectiveDate",
    label: "有限期限",
    tooltip: true,
    checked: true,
    width: 100
  },
  { key: "remark", label: "备注", tooltip: true, checked: true },
  { key: "warrantCode", label: "凭证号", tooltip: true, checked: true },
  { key: "warrantMonth", label: "期间", tooltip: true, checked: true },
  {
    key: "writeoffWarrantCode",
    label: "冲销凭证号",
    tooltip: true,
    checked: true
  },
  {
    key: "writeoffWarrantMonth",
    label: "冲销期间",
    tooltip: true,
    checked: true
  },
  {
    key: "createdBy",
    label: "创建人",
    tooltip: true,
    checked: true,
    width: 100
  },
  {
    key: "createdTime",
    label: "创建时间",
    tooltip: true,
    checked: true,
    width: 100
  }
]; //所有表头
export default {
  name: "firstIndex",
  props: {},
  data() {
    return {
      branchNameStr: [],
      customerList: [],
      departmentList: [],
      // staffNameList:[],
      sort: "",
      fixHead: [
        { type: "selection", key: "selection", checked: true, width: 60 },
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
      post: false,
      postS: false,
      claimPost: false,
      claimWriteOffShow: false,
      writeOffShowUp: false,
      writeOffShow: false,
      loading: true,
      total: 0, //条数
      pageSize: 100, //页码数
      pageNum: 1, //每页条数
      componyShow: false, //银行弹窗
      company: ``, //公司
      customerName: [], //客户
      branchName: [], //部门
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      customerShow: false, //客户弹窗
      staffName: [], //员工
      createdBy: ``, //创建人
      lcReceiveCode: "", //入库单号
      writeOff: "",
      writeOffReason: "",
      show: true,
      coin: {}, //币种
      lcAmt: ``, //信用证金额
      lcProperty: [], //信用证属性
      lcType: "", //信用证性质
      lcDueType: "", //信用证类别
      fhtypearr: [], //信用证状态
      typeStatus: [], //信用证类别
      lcStatus: [], //信用证状态
      mytypearr: [], //信用证属性
      typearr: [], //信用证性质
      lcReceiveDate: [], //收证日期
      lcIssueDate: [], //开证日期
      deadlineLoaddate: [], //装运期限
      effectiveDate: [], //有效期限
      createdTime: [], //创建时间
      reducemsg: [], //选中数据
      postOperationDate: "", //过账日期,
      pickerOptions: {}, //时间范围
      tableData: [],
      reclaimDate: "", //认领过账日期
      reclaimWriteoffDate: "", //认领冲销日期
      warrantCode: "", //凭证号
      warrantMonth: "", //期间
      writeoffWarrantCode: "", //冲销凭证号
      writeoffWarrantMonth: "", //冲销期间
      sumTol:{}
    };
  },
  computed: {
    ...mapState({
      themecolor: "themecolor"
    })
  },
  mixins:[getFilter,setFilter],

  created() {
    let data = this.$getQueryData(this);
    this.customerList = data.customerName;
    this.departmentList = data.branchName;
    // this.staffNameList = data.staffName;
    this.lcStatus= data.lcStatusList;
    this.lcProperty=data.lcPropertyList;
    if (data.startLcIssueDate) {
      this.lcIssueDate[0] = data.startLcIssueDate;
      this.lcIssueDate[1] = data.endLcReceiveDate;
    }
    if (data.startLcReceiveDate) {
      this.lcReceiveDate[0] = data.startLcReceiveDate;
      this.lcReceiveDate[1] = data.endLcReceiveDate;
    }
    if (data.startEffectiveDate) {
      this.effectiveDate[0] = data.startEffectiveDate;
      this.effectiveDate[1] = data.endEffectiveDate;
    }
    if (data.startDeadLineLoaddate) {
      this.deadlineLoaddate[0] = data.startDeadLineLoaddate;
      this.deadlineLoaddate[1] = data.endDeadLineLoaddate;
    }
    if (data.startCreatedTime) {
      this.createdTime[0] = data.startCreatedTime;
      this.createdTime[1] = data.endCreatedTime;
    }

    this.getFilter();

  },
  mounted() {
    this.getMylxs();
    this.getrkdzt();
    this.getydlx();
    this.getfhlx();
    // this.getUserlist();
  },
  watch: {
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      }
    },
    value2(val) {
      let that = this;
      if (val > that.value3) {
        that.value3 = "";
      }
      this.pickerClose = {
        disabledDate(time) {
          return time.getTime() < that.value2;
        }
      };
    },
    '$route'(){
      this.getUserlist();
    }
  },
  methods: {
    query(){
      this.getUserlist();
      this.getSum();
    },
    //查看生命树
    goTree(){
        if (this.reducemsg.length === 1) {
        sessionStorage.setItem("bizCode", this.reducemsg[0].lcReceiveCode);
        sessionStorage.setItem("bizType", "LC_RECEIVE");  
        this.$router.push({
          path:"/index/home/tree",
          query:{
            bizCode:this.reducemsg[0].lcReceiveCode,
            bizType:"LC_RECEIVE"
          }
        });
        let obj = {
        url: "treeModel",
        baseUrl: "",
        label: "生命树",
        moduleCode: "",
        params: {},
        query: {
          bizCode:this.reducemsg[0].lcReceiveCode,
          bizType:"LC_RECEIVE"
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
      this.query();
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
    changeData({ val, key }) {
      this[key] = val;
    },
    cell({ row, column, rowIndex, columnIndex }) {
      if (column.property == "lcAmt") {
        return "rightTd";
      } else {
        return "";
      }
    },
    getUserlist() {
      if (this.createdTime && this.createdTime.length) {
        if (this.createdTime[0] && this.createdTime[1]) {
          var startCreatedTime = this.createdTime[0] + "T00:00:00.000Z";
          var endCreatedTime = this.createdTime[1] + "T23:59:59.000Z";
        }
      }
      if(!this.lcIssueDate){
        this.lcIssueDate = []
      }
      if(!this.lcReceiveDate){
        this.lcReceiveDate = []
      }

      if(!this.deadlineLoaddate){
        this.deadlineLoaddate = []
      }
      if(!this.effectiveDate){
        this.effectiveDate = []
      }
      let bbBranchBaseList =this.branchName;
      if(typeof  this.branchName ==="string" && this.branchName.length ===0){
        bbBranchBaseList = []
      }
      //加载表格数据
      let data = {
        sort: this.sort,
        rows: this.rows,
        pageNum: this.pageNum,
        companyCode: this.company.companyCode,
        bbCustomerBaseList: this.customerName,
        lcAmt: this.lcAmt,
        currencyCode: this.coin.currencyCode,
        currencyName: this.coin.currencyName,
        lcStatusList: this.lcStatus,
        bbBranchBaseList: bbBranchBaseList,
        lcPropertyList: this.lcProperty,
        lcType: this.lcType,
        lcDueType: this.lcDueType,
        startLcIssueDate:
          this.lcIssueDate.length === 0 ? "" : this.lcIssueDate[0],
        endLcIssueDate:
          this.lcIssueDate.length === 0 ? "" : this.lcIssueDate[1],
        startLcReceiveDate:
          this.lcReceiveDate.length === 0 ? "" : this.lcReceiveDate[0],
        endLcReceiveDate:
          this.lcReceiveDate.length === 0 ? "" : this.lcReceiveDate[1],
        startEffectiveDate:
          this.effectiveDate.length === 0 ? "" : this.effectiveDate[0],
        endEffectiveDate:
          this.effectiveDate.length === 0 ? "" : this.effectiveDate[1],
        startDeadlineLoaddate:
          this.deadlineLoaddate.length === 0 ? "" : this.deadlineLoaddate[0],
        endDeadlineLoaddate:
          this.deadlineLoaddate.length === 0 ? "" : this.deadlineLoaddate[1],
        lcReceiveCode: this.lcReceiveCode,
        createdBy: this.createdBy,
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        writeoffWarrantCode: this.writeoffWarrantCode, //冲销凭证号
        writeoffWarrantMonth: this.writeoffWarrantMonth, //冲销期间
        startCreatedTime: startCreatedTime ? startCreatedTime : "",
        endCreatedTime: endCreatedTime ? endCreatedTime : ""
      };
      let params = data;
      params.company = this.company; //公司
      params.branchName = this.branchName; //部门
      params.customerName = this.customerName;
      params.coin = this.coin; //币种
      this.$setQueryData(this, params);
      selectFiLcReceiveList(data).then(res => {
        if (res.code === "success") {
          this.loading = false;
          this.total = res.data.total;
          this.pageSize = res.data.pageSize;
          this.pageNum = res.data.pageNum;
          res.data.list.forEach(i => {
            this.fhtypearr.map(item2 => {
              if (i.lcStatus == item2.dict_code) {
                i.lcStatusName = item2.dict_value;
                return i.lcStatusName;
              }
            });
            i.createdTime = this.$timeFun(i.createdTime, true);
            i.updatedTime = this.$timeFun(i.updatedTime, true);
            i.lcReceiveDate = this.$timeFun(i.lcReceiveDate, true);
            i.lcIssueDate = this.$timeFun(i.lcIssueDate, true);
            i.deadlineLoaddate = this.$timeFun(i.deadlineLoaddate, true);
            i.effectiveDate = this.$timeFun(i.effectiveDate, true);
          });

          this.tableData = res.data.list;
        }
      });
    },
       //获取总计
    getSum() {
        if (this.createdTime && this.createdTime.length) {
        if (this.createdTime[0] && this.createdTime[1]) {
          var startCreatedTime = this.createdTime[0] + "T00:00:00.000Z";
          var endCreatedTime = this.createdTime[1] + "T23:59:59.000Z";
        }
      }
      if(!this.lcIssueDate){
        this.lcIssueDate = []
      }
      if(!this.lcReceiveDate){
        this.lcReceiveDate = []
      }

      if(!this.deadlineLoaddate){
        this.deadlineLoaddate = []
      }
      if(!this.effectiveDate){
        this.effectiveDate = []
      }
      let bbBranchBaseList =this.branchName;
      if(typeof  this.branchName ==="string" && this.branchName.length ===0){
        bbBranchBaseList = []
      }
      //加载表格数据
      let data = {
        sort: this.sort,
        rows: this.rows,
        pageNum: this.pageNum,
        companyCode: this.company.companyCode,
        bbCustomerBaseList: this.customerName,
        lcAmt: this.lcAmt,
        currencyCode: this.coin.currencyCode,
        currencyName: this.coin.currencyName,
        lcStatusList: this.lcStatus,
        bbBranchBaseList: bbBranchBaseList,
        lcPropertyList: this.lcProperty,
        lcType: this.lcType,
        lcDueType: this.lcDueType,
        startLcIssueDate:
          this.lcIssueDate.length === 0 ? "" : this.lcIssueDate[0],
        endLcIssueDate:
          this.lcIssueDate.length === 0 ? "" : this.lcIssueDate[1],
        startLcReceiveDate:
          this.lcReceiveDate.length === 0 ? "" : this.lcReceiveDate[0],
        endLcReceiveDate:
          this.lcReceiveDate.length === 0 ? "" : this.lcReceiveDate[1],
        startEffectiveDate:
          this.effectiveDate.length === 0 ? "" : this.effectiveDate[0],
        endEffectiveDate:
          this.effectiveDate.length === 0 ? "" : this.effectiveDate[1],
        startDeadlineLoaddate:
          this.deadlineLoaddate.length === 0 ? "" : this.deadlineLoaddate[0],
        endDeadlineLoaddate:
          this.deadlineLoaddate.length === 0 ? "" : this.deadlineLoaddate[1],
        lcReceiveCode: this.lcReceiveCode,
        createdBy: this.createdBy,
        warrantCode: this.warrantCode, //凭证号
        warrantMonth: this.warrantMonth, //期间
        writeoffWarrantCode: this.writeoffWarrantCode, //冲销凭证号
        writeoffWarrantMonth: this.writeoffWarrantMonth, //冲销期间
        startCreatedTime: startCreatedTime ? startCreatedTime : "",
        endCreatedTime: endCreatedTime ? endCreatedTime : ""
      };
      selectFiLcReceiveListSumV2(data)
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
        if (["lcAmt"].findIndex((it) => it == key) !== -1) {
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
    shenhe(e) {
      if (e == 0) {
        if (this.reducemsg.length > 1) {
          postingFiLcReceive(this.reducemsg).then(res => {
            if (res.code === "success") {
              this.post = false;
              this.postOperationDate = "";
              this.getUserlist();
              this.getSum();
            }
          });
        } else {
          this.reducemsg[0].postOperationDate = this.postOperationDate;
          postingFiLcReceive(this.reducemsg).then(res => {
            if (res.code === "success") {
              this.post = false;
              this.postOperationDate = "";
              this.getUserlist();
              this.getSum();
            }
          });
        }
      } else {
        this.post = false;
      }
    },
    writeOffShowS(e) {
      if (e == 0) {
        if (this.reducemsg.length > 1) {
          this.reducemsg.map(item => {
            item.writeOffReason = this.writeOffReason;
          });
          chargeFiLcReceive(this.reducemsg).then(res => {
            if (res.code === "success") {
              this.writeOff = "";
              this.writeOffReason = "";
              this.writeOffShow = false;
              this.getUserlist();
              this.getSum();
            }
          });
        } else {
          this.reducemsg[0].writeOff = this.writeOff;
          this.reducemsg[0].writeOffReason = this.writeOffReason;
          chargeFiLcReceive(this.reducemsg).then(res => {
            if (res.code === "success") {
              this.writeOff = "";
              this.writeOffReason = "";
              this.writeOffShow = false;
              this.getUserlist();
              this.getSum();
            }
          });
        }
      } else {
        this.writeOffShow = false;
      }
    },
    claimPostTrue(e) {
      if (e == 0) {
        this.reducemsg[0].reclaimDate = this.reclaimDate;
        postClaim(this.reducemsg[0]).then(res => {
          if (res.code === "success") {
            this.claimPost = false;
            this.reclaimDate = "";
            this.getUserlist();
            this.getSum();
          }
        });
      } else {
        this.claimPost = false;
      }
    },
    claimWriteOffShowTrue(e) {
      if (e == 0) {
        this.reducemsg[0].reclaimWriteoffDate = this.reclaimWriteoffDate;
        chargeClaim(this.reducemsg[0]).then(res => {
          if (res.code === "success") {
            this.claimWriteOffShow = false;
            this.reclaimWriteoffDate = "";
            this.getUserlist();
            this.getSum();
          }
        });
      } else {
        this.claimWriteOffShow = false;
      }
    },
    getMylxs() {
      //获取信用证属性数据
      letterStatus({
        dictNo: 1077
      }).then(res => {
        this.mytypearr = res.data;
      });
    },
    getfhlx() {
      //获取信用证状态
      letterStatus({
        dictNo: 1055
      }).then(res => {
        this.fhtypearr = res.data;
        this.getUserlist();
        this.getSum();
      });
    },
    getydlx() {
      //获取信用证性质
      letterStatus({
        dictNo: 1022
      }).then(res => {
        this.typearr = res.data;
      });
    },
    getrkdzt() {
      //获取信用证类别
      letterStatus({
        dictNo: 1057
      }).then(res => {
        this.typeStatus = res.data;
      });
    },

    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.company = e;
      this.branchName = this.staffName = "";
    },
    //公司弹窗打开
    componyTip() {
      this.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.componyShow = false;
    },
    //客户弹窗确定获取数据
    customerSure(e) {
      this.customerShow = false;
      this.customerName = e;
      this.customerList = e;

    },
    //客户弹窗关闭
    customerCancel() {
      this.customerShow = false;
    },
    //客户窗口
    customerPopup() {
      this.customerShow = true;
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
      this.staffName = [];
      let branchNameStr = [];
      e.forEach((item) => {
        branchNameStr.push(item.branchName);
      });
      this.departmentList = e;
      this.branchNameStr = branchNameStr;
    },
    //员工弹窗打开
    staffTip() {
      if (this.company == `` || this.branchName == ``) {
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
      // this.staffNameList = e;
    },
    //放货类型选择
    changefhtype() {
      console.log(this.fhtype);
    },
    changeState() {
      //贸易类型选择
      console.log(this.mytype);
    },
    changeydlx() {
      //移动类型选择
      console.log(this.ydtype);
    },
    changerkd() {
      //入库单选择
      console.log(this.rkdtype);
    },
    inputShow() {
      this.show = this.$showOne(this.show);
    },
    handleSelectionChange(val) {
      //表格选中数据
      console.log("ssssss", val);
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
    creatcom(type) {
      if (type === "creat") {
        this.$router.push({
          name: "creatNew",
          params: {
            data: type
          }
        });
      }
      if (type === "look") {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        } else if (this.reducemsg.length > 1) {
          this.$message({
            message: "至多选中一条数据",
            type: "warning"
          });
          return;
        }
        this.$router.push({
          name: "creatNew",
          params: {
            data: type,
            look: true,
            lcStatus: this.reducemsg[0].lcStatus,
            lcReceiveId: this.reducemsg[0].lcReceiveId,
            version: this.reducemsg[0].version
          }
        });
      } else if (type === "edit") {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        } else if (this.reducemsg.length > 1) {
          this.$message({
            message: "至多选中一条数据",
            type: "warning"
          });
          return;
        }
        if (this.reducemsg[0].lcStatus == 10550005) {
          this.$router.push({
            name: "creatNew",
            params: {
              data: type,
              lcReceiveId: this.reducemsg[0].lcReceiveId,
              version: this.reducemsg[0].version
            }
          });
        } else {
          this.$message({
            message: "请选择正确数据",
            type: "warning"
          });
          return;
        }
      } else if (type === "claim") {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        } else if (this.reducemsg.length > 1) {
          this.$message({
            message: "至多选中一条数据",
            type: "warning"
          });
          return;
        }
        if (
          this.reducemsg[0].lcStatus == 10550005 ||
          this.reducemsg[0].lcStatus == 10550010 ||
          this.reducemsg[0].lcStatus == 10550035
        ) {
          this.$router.push({
            name: "creatNew",
            params: {
              data: type,
              claim: true,
              lcReceiveId: this.reducemsg[0].lcReceiveId,
              version: this.reducemsg[0].version
            }
          });
        } else {
          this.$message({
            message: "请选择生效数据",
            type: "warning"
          });
          return;
        }
      } else if (type === "collections") {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        } else if (this.reducemsg.length > 1) {
          this.$message({
            message: "至多选中一条数据",
            type: "warning"
          });
          return;
        }
        if (
          this.reducemsg[0].lcStatus == 10550030 ||
          this.reducemsg[0].lcStatus == 10550020 ||
          this.reducemsg[0].lcStatus == 10550015
        ) {
          this.$router.push({
            name: "creatNew",
            params: {
              data: type,
              collections: true,
              claimStatus: true,
              lcReceiveId: this.reducemsg[0].lcReceiveId,
              version: this.reducemsg[0].version
            }
          });
        } else {
          this.$message({
            message: "请选择正确数据",
            type: "warning"
          });
          return;
        }
      } else if (type === "post") {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        }
        if (this.reducemsg[0].lcStatus == 10550015) {
          if (this.reducemsg.length > 1) {
            this.post = true;
            this.postS = true;
          } else {
            //获取时间范围
            let data = {
              companyId: this.reducemsg[0].companyId
            };
            getAccountPeriodByCompany(data).then(res => {
              if (res.code == "success") {
                this.$nextTick(() => {
                  this.pickerOptions = {
                    disabledDate(time) {
                      return (
                        res.data.enddate < time.getTime() ||
                        time.getTime() < res.data.begindate
                      );
                    }
                  };
                });
              }
            });
            this.post = true;
            this.postS = false;
          }
        } else {
          this.$message({
            message: "请选择正确数据",
            type: "warning"
          });
          return;
        }
      } else if (type === "writeOffShow") {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        }
        if (this.reducemsg[0].lcStatus == 10550020) {
          if (this.reducemsg.length > 1) {
            this.writeOffShow = true;
            this.writeOffShowUp = true;
          } else {
            //获取时间范围
            let data = {
              companyId: this.reducemsg[0].companyId
            };
            getAccountPeriodByCompany(data).then(res => {
              if (res.code == "success") {
                this.$nextTick(() => {
                  this.pickerOptions = {
                    disabledDate(time) {
                      return (
                        res.data.enddate < time.getTime() ||
                        time.getTime() < res.data.begindate
                      );
                    }
                  };
                });
              }
            });
            this.writeOffShow = true;
            this.writeOffShowUp = false;
          }
        } else {
          this.$message({
            message: "请选择正确数据",
            type: "warning"
          });
          return;
        }
      } else if (type === "claimPost") {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        } else if (this.reducemsg.length > 1) {
          this.$message({
            message: "至多选中一条数据",
            type: "warning"
          });
          return;
        }
        if (this.reducemsg[0].lcStatus == 10550010) {
          //获取时间范围
          let data = {
            companyId: this.reducemsg[0].companyId
          };
          getAccountPeriodByCompany(data).then(res => {
            if (res.code == "success") {
              this.$nextTick(() => {
                this.pickerOptions = {
                  disabledDate(time) {
                    return (
                      res.data.enddate < time.getTime() ||
                      time.getTime() < res.data.begindate
                    );
                  }
                };
              });
            }
          });
          this.claimPost = true;
        } else if (
          this.reducemsg[0].lcStatus == 10550010 &&
          this.reducemsg[0].claimSign == "0"
        ) {
          this.$message({
            message: "请选择完全认领数据",
            type: "warning"
          });
          return;
        } else {
          this.$message({
            message: "请选择正确数据",
            type: "warning"
          });
          return;
        }
      } else if (type === "claimWriteOffShow") {
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
        } else if (this.reducemsg.length > 1) {
          this.$message({
            message: "至多选中一条数据",
            type: "warning"
          });
          return;
        }
        if (this.reducemsg[0].lcStatus == 10550030) {
          //获取时间范围
          let data = {
            companyId: this.reducemsg[0].companyId
          };
          getAccountPeriodByCompany(data).then(res => {
            if (res.code == "success") {
              this.$nextTick(() => {
                this.pickerOptions = {
                  disabledDate(time) {
                    return (
                      res.data.enddate < time.getTime() ||
                      time.getTime() < res.data.begindate
                    );
                  }
                };
              });
            }
          });
          this.claimWriteOffShow = true;
        } else {
          this.$message({
            message: "请选择正确数据",
            type: "warning"
          });
          return;
        }
      } else {
        this.$router.push({
          name: "creatNew",
          params: {
            data: type,
            collections: false,
            claim: false
          }
        });
      }
    },
    delitemsg() {
      //删除数据
      if (this.reducemsg.length === 0) {
        this.$message({
          message: "请先选择一条数据",
          type: "warning"
        });
        return;
      }
      if (this.reducemsg[0].lcStatus == 10550005) {
        this.$confirm("是否确定删除继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          reduceMsg(this.reducemsg).then(res => {
            if (res.code === "success") {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getUserlist();
              this.getSum();
            }
          });
        });
      } else {
        this.$message({
          message: "该状态无法删除",
          type: "warning"
        });
        return;
      }
    },
    clearmsg() {
      //重置
      this.company = this.lcReceiveCode =  this.mytype = this.ydtype = this.rkdtype = this.creattime = this.creatman = this.lcAmt = this.lcReceiveDate = this.lcType = this.lcDueType = this.lcIssueDate = this.effectiveDate = this.deadlineLoaddate = this.createdBy =
        "";
      this.staffName = this.branchName = this.customerName = [];
      this.branchNameStr = [];
      this.departmentList = [];
      this.customerList = [];
      // this.staffNameList = [];
      this.lcStatus = [];
      this.lcProperty = [];
      this.createdTime = [];
      this.coin = {};
      this.rows = 10;
      this.pageNum = 1;
      this.warrantCode = ""; //凭证号
      this.warrantMonth = ""; //期间
      this.writeoffWarrantCode = ""; //冲销凭证号
      this.writeoffWarrantMonth = ""; //冲销期间
    },
    rowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    }
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    customerSelect,
    warehouseSelect,
    editSearchItem,
    contractSearch,
    coinSelect
  }
};
</script>

<style lang="scss" scoped>
.button-div {
  margin: 0 !important;
}
.time {
  width: 70% !important;
}
</style>
