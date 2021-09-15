<template>
  <div id="customerCredit">
    <!--查询条件-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-search" class="query-button" @click="query">查询</el-button>
      <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
    </div>
    <div class="input-div auto-sibling">
      <p class="hide-input" v-if="queryArea" @click="queryAreaShow()">更多条件<i class="el-icon-caret-bottom"></i></p>
      <p class="hide-input" v-else @click="queryAreaShow()">收起<i class="el-icon-caret-top"></i></p>
      <div class="search-div">
        <el-col :span="5" class="el-col">
          <label>公司</label>
          <el-input v-model="companyInfo.companyName" class="el-inputs" placeholder="请选择" disabled></el-input>
          <span class="moreIcon" @click="companyPopup"><i class="el-icon-search"></i></span>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>部门</label>
          <el-select  v-model="branchInfo"
                  class="el-inputs"
                  placeholder="请选择"
                  multiple
                  filterable
                  remote
                  :remote-method="getDepartment"
                  collapse-tags
                  value-key="branchId"
            >
            <el-option
                v-for="item in departmentList"
                :key="item.branchId"
                :label="item.branchName"
                :value="item">
            </el-option>
          </el-select>
          <span class="comicon" @click="branchPopup" style="width: 10%;z-index: 2"
            ><i class="el-icon-search"></i
          ></span>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>申请单号</label>
          <el-input v-model="applyCode" class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>申请日期</label>
          <el-date-picker v-model="applyDate" type="daterange" class="el-selects" size="mini" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-col>
        <!-- <el-col :span="5" class="el-col">
          <label>客户代码</label>
          <el-input v-model="custCode" class="el-inputs"></el-input>
        </el-col> -->
        <el-col :span="5" class="el-col">
          <label>客户</label>
         <!-- <el-input v-model="customerInfo.customerName" class="el-inputs" placeholder="请选择" disabled></el-input>
          <span class="moreIcon" @click="customerPopup"><i class="el-icon-search"></i></span> -->
          <el-select
            v-model="customerInfo"
            class="el-inputs"
            placeholder="请选择"
            multiple
            filterable
            remote
            :remote-method="getCustomer"
            collapse-tags
            value-key="customerId"
          >
            <el-option
                v-for="item in customerList"
                :key="item.customerId"
                :label="item.customerName"
                :value="item">
            </el-option>
          </el-select>
          <span class="comicon" @click="customerPopup" style="width: 10%;z-index: 2"
            ><i class="el-icon-search"></i
          ></span>
        </el-col>
        <el-col :span="5" class="el-col">
          <label class="text_too_long">是否受额度管控</label>
          <el-select v-model="isControlled" class="el-selects" placeholder="请选择">
            <el-option v-for="(item, index) in isControlledDic" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>授信有效期</label>
          <el-date-picker v-model="creditTime" type="daterange" class="el-selects" size="mini" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>审批信用额度</label>
          <el-input v-model="creditAmt" class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>额度账期</label>
          <el-input v-model="creditNo" class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>业务币种</label>
          <el-select v-model="currencyCode" class="el-selects" placeholder="请选择" filterable multiple collapse-tags>
            <el-option v-for="(item, index) in currencyDic" :key="index" :label="item.currencyShort" :value="item.currencyCode"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>状态</label>
          <el-select v-model="auditStatus" class="el-selects" placeholder="请选择" multiple collapse-tags>
            <el-option v-for="(item, index) in auditStatusDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
          </el-select>
        </el-col>
      </div>
    </div>
    <!--列表信息-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-folder-add" v-if="$actionFlag(`F001`)" @click="addData">创建</el-button>
      <el-button icon="el-icon-edit" v-if="$actionFlag(`F002`)" @click="updateData">修改</el-button>
      <el-button icon="el-icon-delete" v-if="$actionFlag(`F003`)" @click="deleteData">删除</el-button>
      <el-button icon="el-icon-data-line" v-if="$actionFlag(`F004`)" @click="goDetail">查看</el-button>
      <el-button icon="el-icon-finished" v-if="$actionFlag(`F005`)" @click="submitData">提交</el-button>
      <el-button icon="el-icon-receiving" v-if="$actionFlag(`F006`)" @click="checkData">审核</el-button>
      <el-button icon="el-icon-download" v-if="$actionFlag(`F007`)">导出</el-button>
      <el-button icon="el-icon-data-analysis" class="credit-btn" v-if="$actionFlag(`F008`)" @click="creditQuery">信用额度查看</el-button>
    </div>
    <div class="el-table-div" v-auto>
      <el-table
        class="el-table"
        border
        center
        height="calc(100% - 35px)"
        :data="creditData"
        v-loading="loading"
        ref="multipleTable"
        @selection-change="handleChange"
        @select-all="singleSelect"
        @select="singleSelect"
         :cell-class-name="cell"
        show-summary
        :summary-method="getSummaries"
        @row-click="singleSelectRow">
        <el-table-column type="selection" width="55" fixed></el-table-column>
        <el-table-column type="index" label="序号" width="60" fixed></el-table-column>
        <el-table-column prop="companyName" label="公司" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="orgName" label="部门" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="applyCode" label="申请单号" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column label="申请日期" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.applyDate | time2Date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="custCode" label="客户代码" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="custName" label="客户名称" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column label="是否受额度管控" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.isControlled == 0 ? "是" : "否"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="creditAmt" label="信用额度"   :formatter="$moneyFormat" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column label="授信有效期" min-width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-show="scope.row.creditBegintime">{{scope.row.creditBegintime | time2Date}} ~ {{scope.row.creditEndtime | time2Date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="creditNo" label="额度账期" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="auditStatusStr" label="状态" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createdName" label="创建人" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" min-width="160" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.createdTime | time}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updatedName" label="修改人" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="修改时间" min-width="160" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.updatedTime | time}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pageArea"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="currentChange"
        @size-change="currentSize"
        :current-page="page"
        :page-sizes="[100,200,300,500]"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
    <!--审核弹窗-->
    <el-dialog title="审核" :visible.sync="checkDialog" :show-close="false" :before-close="checkCancel" width="350px">
      <div class="input-div" style="margin:15px 0 15px -15px;border:none">
        <el-col class="el-col" style="width:85%">
          <label>审核</label>
          <el-select v-model="passOrReject" class="el-selects" placeholder="请选择">
            <el-option v-for="(item, index) in passOrRejectDic" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </div>
      <div style="text-align:center">
        <el-button icon="el-icon-check" size="mini" type="primary" @click="checkSure">确定</el-button>
        <el-button icon="el-icon-close" size="mini" @click="checkCancel">取消</el-button>
      </div>
    </el-dialog>
    <!--公司弹窗-->
    <company-select v-if="companyShow" :tipShow="companyShow" @tipsCancle="companyCancel" @tipsSure="companySure"></company-select>
    <!--部门弹窗-->
    <branch-select v-if="branchShow" :tipShow="branchShow" :data="companyInfo" @departmentCancle="branchCancel" @departmentSure="branchSure"></branch-select>
    <!--客户弹窗-->
    <customer-select v-if="customerShow" :tipShow="customerShow" :filterQuery="parentFilter" @customerCancle="customerCancel" @customerSure="customerSure"></customer-select>
  </div>
</template>
<script>
import Compony from "@/api/comdepartment/componySelect";
import PopupApi from "@/api/component";
import { mapState } from "vuex";
import { creditStatusObj } from "@/api/dictionary";
import CreditApi from "@/api/creditData/credit";
import companySelect from "@/components/componySelect";
import branchSelect from "@/components/departmentSelect2";
import customerSelect from "@/components/customerSelect2";
export default {
  name: "customerCredit",
  data() {
    return {
      departmentList:[],
      customerList:[],
      passOrReject: "",
      passOrRejectDic: [
        {value: "1", label: "通过"},
        {value: "-1", label: "驳回"}
      ],
      checkDialog: false, //是否显示审核弹窗
      //查询条件
      queryArea: true, //是否显示查询区域
      companyInfo: "",
      companyShow: false, //是否显示公司弹窗
      branchInfo: [],
      branchShow: false, //是否显示部门弹窗
      applyCode: "",
      applyDate: [],
      custCode: "",
      customerInfo: [],
      customerShow: false, //是否显示客户弹窗
      parentFilter: {
        isSubsidiary: 0 //只过滤出母公司客户
      },
      isControlled: "",
      isControlledDic: [
        {value: "", label: "全部"},
        {value: "0", label: "是"},
        {value: "1", label: "否"}
      ],
      creditTime: [],
      creditAmt: "",
      creditNo: "",
      currencyCode: [],
      currencyDic: [], //业务币种字典
      auditStatus: [],
      auditStatusDic: [], //审核状态字典
      //列表字段
      creditData: [],
      loading: true,
      selectedIndex: null, //列表选中下标
      page: 1,
      pageSize: 100,
      total: 0,
      sumTol:{},
      navColor: {
        button: {
          backgroundColor: ""
        }
      }
    };
  },
  created() {
    let data=this.$getQueryData(this);
    this.departmentList = data.branchInfo;
    this.customerList = data.customerInfo;
    this.currencyCode= data.currencyCodeList;
   this.auditStatus= data.auditStatusList;
    if(data.applyDateStart){

      this.applyDate[0]=data.applyDateStart?data.applyDateStart:"";
      this.applyDate[1]=data.applyDateEnd?data.applyDateEnd:"";
    }
    if(data.creditBegintime){

      this.creditTime[0]=data.creditBegintime?data.creditBegintime:"";
      this.creditTime[1]=data.creditEndtime?data.creditEndtime:"";
    }
    //业务币种下拉列表
    this.currencySelect();
    //审核状态字典
    this.auditStatusData();
    //获取信用额度列表
    this.query();
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor = "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    cell({row, column, rowIndex, columnIndex}) {
    //第八列添加 red 类
        if(column.property=="creditAmt"){
        return 'rightTd'
        }else{
        return "";
        }
    },
    //部门远程搜索
     getDepartment(str){
      if(!str){
        return
      }
      // if(!this.companyInfo.companyId){
      //   this.$openWarning("请先选择公司");
      //   return
      // }
      let params = {
        pageNum: 1,
        rows: 200,
        companyId: this.companyInfo.companyId ,
        branchName: str,
        branchCode: '',
        isCollected:0
      };
      Compony.brnchList2(params)
          .then(res => {
            this.departmentList = res.data.list;
          })
          .catch(() => {
          });
    },
    //客户远程搜索
    getCustomer(str){
      if(!str){
        return
      }
      let params = {
        pageNum: 1,
        rows: 200,
        customerName: str,
        isCollected:0
      };
      PopupApi.customerSelect2(params)
          .then(res => {
            this.customerList =  res.data.list;
          })
          .catch(() => {
          });

    },
    //获取信用额度列表
    customerCreditList() {
       if(typeof this.branchInfo==="string" && this.branchInfo.length===0){
         this.branchInfo = [];
       }
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        companyCode: this.companyInfo.companyCode,
        bbBranchBaseList: this.branchInfo,
        applyCode: this.applyCode,
        applyDateStart: this.applyDate == null ? "" : this.applyDate[0],
        applyDateEnd: this.applyDate == null ? "" : this.applyDate[1],
       // custCode: this.custCode,
        bbCustomerBaseList: this.customerInfo,
        isControlled: this.isControlled,
        creditBegintime: this.creditTime == null ? "" : this.creditTime[0],
        creditEndtime: this.creditTime == null ? "" : this.creditTime[1],
        creditAmt: this.creditAmt,
        creditNo: this.creditNo,
        currencyCodeList: this.currencyCode,
        auditStatusList: this.auditStatus
      };
      let data=params;
      data.companyInfo=this.companyInfo;
      data.branchInfo=this.branchInfo;
      data.customerInfo=this.customerInfo;
      this.$setQueryData(this,data);
      delete data.customerInfo;
      delete data.branchInfo;
      params = this.$queryFilter(params);
      this.loading = true;
      CreditApi.customerCreditList(params).then(res => {
        this.loading = false;
        this.creditData = res.data.list;
        this.total = res.data.total;
        this.creditData.forEach(item => {
          creditStatusObj.forEach(item1 => {
            if (item.auditStatus == item1.dict_code) item.auditStatusStr = item1.dict_value;
          });
        });
      }).catch(() => {
        this.loading = false;
      });
    },
      //获取总计
    getSum() {
       if(typeof this.branchInfo==="string" && this.branchInfo.length===0){
         this.branchInfo = [];
       }
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        companyCode: this.companyInfo.companyCode,
        bbBranchBaseList: this.branchInfo,
        applyCode: this.applyCode,
        applyDateStart: this.applyDate == null ? "" : this.applyDate[0],
        applyDateEnd: this.applyDate == null ? "" : this.applyDate[1],
       // custCode: this.custCode,
        bbCustomerBaseList: this.customerInfo,
        isControlled: this.isControlled,
        creditBegintime: this.creditTime == null ? "" : this.creditTime[0],
        creditEndtime: this.creditTime == null ? "" : this.creditTime[1],
        creditAmt: this.creditAmt,
        creditNo: this.creditNo,
        currencyCodeList: this.currencyCode,
        auditStatusList: this.auditStatus
      };
      CreditApi
        .getCmCustCreditListSumV2(params)
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
        if (["creditAmt"].findIndex((it) => it == key) !== -1) {
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
    //业务币种下拉列表
    currencySelect() {
      CreditApi.currencySelect().then(res => {
        this.currencyDic = res.data;
      }).catch();
    },
    //审核状态字典
    auditStatusData() {
      CreditApi.dicQuery({
        dictNo: 1030
      }).then(res => {
        this.auditStatusDic = res.data;
        // this.auditStatusDic.unshift({
        //   dict_value: "全部",
        //   dict_code: ""
        // });
      }).catch();
    },
    //创建
    addData() {
      this.$router.push({name: "customerCreditEdit"});
    },
    //修改
    updateData() {
      if (this.selectedIndex == null) {
        this.$openWarning("请选择要操作的数据");
        return false;
      }
      let row = this.creditData[this.selectedIndex];
      if (row.auditStatus != "10300005" && row.auditStatus != "10300020") {
        this.$openWarning("该状态的单据不可修改");
        return false;
      }
      this.$router.push({name: "customerCreditEdit", query: {id: row.custCreditId}});
    },
    //删除
    deleteData() {
      if (this.selectedIndex == null) {
        this.$openWarning("请选择要操作的数据");
        return false;
      }
      let row = this.creditData[this.selectedIndex];
      if (row.auditStatus != "10300005" && row.auditStatus != "10300020") {
        this.$openWarning("该状态的单据不可删除");
        return false;
      }
      this.$confirm("是否确定删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          id: row.custCreditId,
          status: row.auditStatus * 1,
          version: row.version
        };
        CreditApi.customerCreditDelete(params).then(res => {
          this.$openSuccess(res.message);
          this.page = 1;
          this.query();
        }).catch();
      });
    },
    //查看
    goDetail() {
      if (this.selectedIndex == null) {
        this.$openWarning("请选择要操作的数据");
        return false;
      }
      let row = this.creditData[this.selectedIndex];
      this.$router.push({name: "customerCreditDetail", query: {id: row.custCreditId}});
    },
    //提交
    submitData() {
      if (this.selectedIndex == null) {
        this.$openWarning("请选择要操作的数据");
        return false;
      }
      let row = this.creditData[this.selectedIndex];
      if (row.auditStatus != "10300005" && row.auditStatus != "10300020") {
        this.$openWarning("该状态的单据不可提交");
        return false;
      }
      this.$confirm("是否确定提交？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        CreditApi.customerCreditSubmit(row).then(res => {
          this.$openSuccess(res.message);
          this.page = 1;
          this.query();
        }).catch();
      });
    },
    //审核
    checkData() {
      if (this.selectedIndex == null) {
        this.$openWarning("请选择要操作的数据");
        return false;
      }
      let row = this.creditData[this.selectedIndex];
      if (row.auditStatus == "10300010") {
        this.checkDialog = true;
      } else {
        this.$openWarning("该状态的单据不可审核");
      }
    },
    //取消审核
    checkCancel() {
      this.checkDialog = false;
      this.passOrReject = "";
    },
    //确定审核
    checkSure() {
      if (this.passOrReject == "") {
        this.$openWarning("请选择是否通过审核");
        return false;
      }
      let row = this.creditData[this.selectedIndex];
      if (this.passOrReject == "1") {
        CreditApi.customerCreditPass(row).then(res => {
          this.$openSuccess(res.message);
          this.page = 1;
          this.query();
          this.checkDialog = false;
          this.passOrReject = "";
        }).catch();
      } else if (this.passOrReject == "-1") {
        CreditApi.customerCreditReject(row).then(res => {
          this.$openSuccess(res.message);
          this.page = 1;
          this.query();
          this.checkDialog = false;
          this.passOrReject = "";
        }).catch();
      }
    },
    //信用额度查看
    creditQuery() {
      if (this.selectedIndex == null) {
        this.$openWarning("请选择要操作的数据");
        return false;
      }
      let row = this.creditData[this.selectedIndex];
      if (row.companyCode == null || row.orgCode == null || row.custCode == null) {
        this.$openWarning("该条数据公司、部门、客户信息不完整");
        return false;
      }
      sessionStorage.setItem("customerCredit", JSON.stringify({
        companyCode: row.companyCode,
        companyName: row.companyName,
        branchCode: row.orgCode,
        branchName: row.orgName,
        customerCode: row.custCode,
        customerName: row.custName
      }));
      this.$router.push({name: "customerCreditQueryButton"});
    },
    //查询
    query() {
      this.page = 1;
      this.customerCreditList();
      this.getSum();
    },
    //重置
    reset() {
      this.companyInfo = "";
      this.branchInfo = [];
      this.applyCode = "";
      this.applyDate = [];
      this.custCode = "";
      this.customerInfo = [];
      this.isControlled = "";
      this.creditTime = [];
      this.creditAmt = "";
      this.creditNo = "";
      this.currencyCode = [];
      this.auditStatus = [];
    },
    //是否显示查询区域
    queryAreaShow() {
      this.queryArea = this.$showOne(this.queryArea);
    },
    //公司弹窗
    companyPopup() {
      this.companyShow = true;
    },
    //公司弹窗关闭
    companyCancel() {
      this.companyShow = false;
    },
    //公司弹窗确定并传值
    companySure(e) {
      this.companyShow = false;
      this.companyInfo = e;
      this.branchInfo = "";
    },
    //部门弹窗
    branchPopup() {
      // if (this.companyInfo == "") {
      //   this.$openWarning("请先选择公司");
      //   return false;
      // }
      this.branchShow = true;
    },
    //部门弹窗关闭
    branchCancel() {
      this.branchShow = false;
    },
    //部门弹窗确定并传值
    branchSure(e) {
      this.branchShow = false;
      this.branchInfo = e;
      this.departmentList = e;
    },
    //客户弹窗
    customerPopup() {
      this.customerShow = true;
    },
    //客户弹窗关闭
    customerCancel() {
      this.customerShow = false;
    },
    //客户弹窗确定并传值
    customerSure(e) {
      this.customerShow = false;
      this.customerInfo = e;
      this.customerList = e;
    },
    //列表单选
    handleChange(e) {
      if (e.length === 0) {
        this.selectedIndex = null;
      }
    },
    singleSelect(selection, row) {
      this.$refs.multipleTable.clearSelection();
      if (selection.length === 0) {
        return;
      }
      if (row) {
        this.$refs.multipleTable.toggleRowSelection(row, true);
        this.selectedIndex = this.creditData.indexOf(row);
      }
    },
    singleSelectRow(e) {
      this.$refs.multipleTable.toggleRowSelection(e);
      this.selectedIndex = this.creditData.indexOf(e);
    },
    //翻页
    currentChange(e) {
      this.page = e;
      this.customerCreditList();
    },
    //单页数量
    currentSize(e) {
      this.page = 1;
      this.pageSize = e;
      this.customerCreditList();
    }
  },
  computed: {
    ...mapState({
      themecolor: "themecolor"
    })
  },
  watch: {
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      }
    }
  },
  components: {
    companySelect,
    branchSelect,
    customerSelect
  }
};
</script>
<style lang="scss">
#customerCredit {
  .credit-btn {
    width: auto;
    padding: 0 10px;
  }
  .el-col {
    position: relative;
    .moreIcon {
      width: 65%;
      height: 24px;
      position: absolute;
      top: 0;
      right: 0;
      padding: 4px 5px;
      cursor: pointer;
    }
  }
  .el-col:nth-child(4n-1) {
    margin-left: 10px;
  }
  .is-disabled {
    .el-input__inner {
      color: #666;
      cursor: pointer;
    }
  }
  // .el-col-5 {
  //   height: 32px;
  // }
  label {
    display: inline-block;
    width: 35%;
    vertical-align: middle;
  }
  .el-inputs,
  .el-selects {
    width: 65% !important;
    .el-input__inner {
      width: 100%;
    }
    .el-select__tags {
      .el-tag--light {
        height: auto !important;
        line-height: normal !important;
      }
    }
  }
  .text_too_long {
    position: absolute;
    width: 38%;
    line-height: 24px;
    margin-left: -38%;
  }
  .pageArea {
    margin: 10px 0 0 20px;
  }
}
</style>
