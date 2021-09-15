<template>
  <div id="credentials">
    <!-- 按钮 -->
    <div class="button-div">
      <el-button icon="el-icon-search"
                 @click="queryList">查询</el-button>
      <el-button icon="el-icon-refresh"
                 @click="clearNone">重置</el-button>
      <!-- <el-button icon="el-icon-suitcase">凭证推送</el-button>
      <el-button icon="el-icon-receiving">凭证重生成</el-button>
      <el-button icon="el-icon-money">凭证（金蝶）撤回</el-button>
      <el-button icon="el-icon-download">导出</el-button> -->
    </div>
    <el-divider></el-divider>
    <!-- 标签页 -->
    <div class="input-div">
      <!-- 基本信息 -->
      <p class="hide-input" v-if="queryArea" @click="queryAreaShow()">更多条件<i class="el-icon-caret-bottom"></i></p>
      <p class="hide-input" v-else @click="queryAreaShow()">收起<i class="el-icon-caret-top"></i></p>
      <div class="search-div">
        <el-col :span="5"
                class="el-col">
          <label>公司</label>
          <el-input v-model="companyData.companyName"
                    class="el-inputs"
                    placeholder="请选择"
                    disabled></el-input>
          <span class="comicon"
                @click="componyTip"><i class="el-icon-search"></i></span>
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label> 部门</label>
          <!-- <el-input v-model="departmentData.branchName"
                    class="el-inputs"
                    placeholder="请选择"
                    disabled>
          </el-input>
          <span class="comicon"
                @click="departmentTip"><i class="el-icon-search"></i></span> -->
         <el-select  v-model="departmentData"
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
      <span class="comicon" @click="departmentTip" style="width: 10%;z-index: 2"
        ><i class="el-icon-search"></i
      ></span>       
        </el-col>
        <el-col :span="5"
                class="el-colc">
          <label>过账日期</label>
          <el-date-picker v-model="warrantPostDateArr"
                          type="daterange"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
        <el-col :span="5"
                class="el-colc">
          <label>财务审核日期</label>
          <el-date-picker v-model="financialPostingArr"
                          type="daterange"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
        <el-col :span="5"
                class="el-colc">
          <label>推送日期</label>
          <el-date-picker v-model="sendDateArr"
                          type="daterange"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label> 业务类别</label>
          <el-select clearable
                     v-model="credentials.bizCategoryCodeList"
                     placeholder="请选择"
                     class="el-select"
                     multiple
                     collapse-tags
                     >
            <el-option v-for="item in bizCategoryCodeList"
                       :key="item.dict_key"
                       :label="item.dict_value"
                       :value="item.dict_key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label> 业务类型</label>
          <el-select clearable
                     filterable
                     v-model="credentials.bizTypeCodeList"
                     placeholder="请选择"
                     class="el-select"
                     multiple
                     collapse-tags
                     >
            <el-option v-for="item in bizTypeCodeList"
                       :key="item.dict_key"
                       :label="item.dict_value"
                       :value="item.dict_key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label> 过账状态</label>
          <el-select clearable
                     v-model="credentials.warrantStatusList"
                     placeholder="请选择"
                     class="el-select"
                     multiple
                     collapse-tags
                     >
            <el-option v-for="item in warrantStatusList"
                       :key="item.dict_key"
                       :label="item.dict_value"
                       :value="item.dict_key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5"
                class="el-colc">
          <label>审核日期</label>
          <el-date-picker v-model="bizAuditDateArr"
                          type="daterange"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label>单据号</label>
           <el-input v-model="docNoStart"
                    class="el-inputs"
                    placeholder="请输入"
                    >
          </el-input>
          <!-- <el-select clearable
                     filterable
                     v-model="docNoArr[0]"
                     placeholder="请选择"
                     class="el-select">
            <el-option v-for="item in docNoList"
                       :key="item"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select> -->
        </el-col>
        <!-- <el-col :span="5"
                class="el-col">
          <label style="height:20px">至</label>
          <el-input v-model="docNoEnd"
                    class="el-inputs"
                    placeholder="请输入"
                    >
          </el-input>
          <el-select clearable
                     filterable
                     v-model="docNoArr[1]"
                     placeholder="请选择"
                     class="el-select">
            <el-option v-for="item in docNoList"
                       :key="item"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select> 
        </el-col> -->
        <el-col :span="5"
                class="el-col">
          <label>凭证号</label>
          <el-input v-model="sapNoStart"
                    class="el-inputs"
                    placeholder="请输入"
                    >
          </el-input>
          <!-- <el-select clearable
                     filterable
                     v-model="sapNoArr[0]"
                     placeholder="请选择"
                     class="el-select">
            <el-option v-for="item in sapNoList"
                       :key="item"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select> -->
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label style="height:20px">至</label>
          <el-input v-model="sapNoEnd"
                    class="el-inputs"
                    placeholder="请输入"
                    >
          </el-input>
          <!-- <el-select clearable
                     filterable
                     v-model="sapNoArr[1]"
                     placeholder="请选择"
                     class="el-select">
            <el-option v-for="item in sapNoList"
                       :key="item"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select> -->
        </el-col>
      </div>
    </div>
    <div class="button-div">
      <el-button icon="el-icon-suitcase"
                  @click="handleCredentialsPush" v-if="$actionFlag(`F001`)" :disabled="btuDisabled">凭证推送</el-button>
      <!-- v-if="$actionFlag(`F001`)" -->
      <!-- <el-button icon="el-icon-receiving"
                  @click="handleCredentialsReborn" v-if="$actionFlag(`F002`)" :disabled="btuDisabled">凭证重生成</el-button> -->
      <!-- v-if="$actionFlag(`F002`)" -->
      <el-button icon="el-icon-money"
                  @click="handleCredentialsPull" v-if="$actionFlag(`F003`)"  :disabled="btuDisabled">凭证（用友）撤回</el-button>
      <!-- v-if="$actionFlag(`F003`)" -->
      <el-button icon="el-icon-download"
                  @click="handleCredentialsExport" v-if="$actionFlag(`F004`)" :disabled="btuDisabled">导出</el-button>
      <!-- v-if="$actionFlag(`F004`)" -->
        <el-button icon="el-icon-download"
                  @click="voidVoucher"  v-if="$actionFlag(`F005`)" :disabled="btuDisabled">凭证作废</el-button>
    </div>
        <el-tabs v-model="activeName"
                 type="card">
          <el-tab-pane label="凭证信息"
                       name="first">
            <!-- 表格 -->
            <div class="el-table-div">
              <el-table ref="multipleTable"
                        center
                        max-height="370"
                        border
                        :data="tableData"
                        class="el-table"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @row-dblclick="creatlook"
                        @select-all="handleTableDataSelect"
                        @row-click="handleTableDataRowClick"
                        @selection-change="handleChange" 
                        v-loading="loading">
                <el-table-column type="selection"
                                 width="55"> </el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="130px"
                                 prop="docNo"
                                 label="单据号"> </el-table-column>
                <el-table-column width="90px"
                                 show-overflow-tooltip
                                 prop="bizCategoryCode"
                                 label="业务类别">
                  <template slot-scope="scope">
                    <span v-for="item in bizCategoryCodeList"
                          :key="item.dict_key"
                          v-show="item.dict_key==scope.row.bizCategoryCode">
                      {{item.dict_value}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column width="300px"
                                 show-overflow-tooltip
                                 prop="bizTypeCode"
                                 label="业务类型">
                  <template slot-scope="scope">
                    <span v-for="item in bizTypeCodeList"
                          :key="item.dict_key"
                          v-show="item.dict_key==scope.row.bizTypeCode">
                      {{item.dict_value}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="130px"
                                 prop="orgName"
                                 label="部门"> </el-table-column>
                <el-table-column width="150px"
                                 show-overflow-tooltip
                                 prop="sendDate"
                                 label="凭证推送日期">
                  <template slot-scope="scope">
                    {{scope.row.sendDate|time2Date}}
                  </template>
                </el-table-column>
                
                <el-table-column width="150px"
                                 show-overflow-tooltip
                                 prop="financialPostingDate"
                                 label="财务过账日期">
                  <template slot-scope="scope">
                    {{scope.row.financialPostingDate|time2Date}}
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip
                                 prop="bizAuditDate"
                                 width="150"
                                 label="业务审核日期">
                  <template slot-scope="scope">
                    {{scope.row.bizAuditDate|time2Date}}
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip
                                 prop="warrantPostCode"
                                 label="凭证号"> </el-table-column>
                <el-table-column show-overflow-tooltip
                                 prop="warrantPostDate"
                                 label="业务过账日期">
                  <template slot-scope="scope">
                    {{scope.row.warrantPostDate|time2Date}}
                  </template></el-table-column>
                <el-table-column show-overflow-tooltip
                                 prop="warrantStatus"
                                 label="过账状态">
                  <template slot-scope="scope">
                    <span v-for="item in warrantStatusList"
                          :key="item.dict_key"
                          v-show="item.dict_key==scope.row.warrantStatus">
                      {{item.dict_value}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column width="100px"
                                 show-overflow-tooltip
                                 prop="bizPersonName"
                                 label="业务员"> </el-table-column>
                <el-table-column width="120px"
                                 show-overflow-tooltip
                                 prop="sendEReason"
                                 label="失败原因"> </el-table-column>
                <!-- <el-table-column show-overflow-tooltip
                           prop="lcPropertyS"
                           label="信用证属性"> </el-table-column> -->
              </el-table>
              <!-- 分页 -->
              <div>
                <el-pagination background @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="pageNum"
                               :page-sizes="[100, 200, 300,500]"
                               :page-size="pageSize"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="total">
                </el-pagination>
              </div>
              <!-- 选择公司弹窗 -->
              <compony-select v-if="componyShow"
                              :tipShow="componyShow"
                              @tipsCancle="tipsCancle"
                              @tipsSure="tipsSure">
              </compony-select>
              <!-- 选择部门弹窗 -->
              <department-select v-if="departmentShow"
                                 :tipShow="departmentShow"
                                 :data="{}"
                                 @departmentCancle="departmentCancle"
                                 @departmentSure="departmentSure">
              </department-select>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeName"
                 type="card">
          <el-tab-pane label="明细"
                       name="first">
            <!-- 表格 -->
            <div class="el-table-div">
              <el-table ref="detailTable"
                        border
                        center
                        :data="detailTableData"
                        max-height="370"
                        class="el-table"
                        tooltip-effect="dark"
                        empty-text="点击凭证信息行以查询"
                        @selection-change="handleSelectionChange"
                        v-loading="detailLoading"
                         :cell-class-name="cell">
                <el-table-column prop="rowno"
                                 label="行号"
                                 width="50"> </el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120px"
                                 prop="accountCode"
                                 label="科目编码"> </el-table-column>
                <el-table-column width="220px"
                                 show-overflow-tooltip
                                 prop="accountName"
                                 label="科目全称"> </el-table-column>
                <el-table-column width="80px"
                                 show-overflow-tooltip
                                 prop="recordDirection"
                                 label="借贷方向">
                  <template slot-scope="scope">
                    <span v-for="item in recordDirectionList"
                          :key="item.dict_key"
                          v-show="item.dict_key==scope.row.recordDirection">
                      {{item.dict_value}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column width="80px"
                                 show-overflow-tooltip
                                 prop="currencyName"
                                 label="币别"> </el-table-column>
                <el-table-column show-overflow-tooltip
                                 prop="orginAmt"
                                 :formatter="$moneyFormat"
                                 width="120"
                                 label="原币金额">
                </el-table-column>
                <el-table-column show-overflow-tooltip
                                 prop="recordAmt"
                                  :formatter="$moneyFormat"
                                 width="120"
                                 label="借贷金额"> </el-table-column>
                <el-table-column show-overflow-tooltip
                                 prop="summary"
                                 label="摘要"> </el-table-column>
                <el-table-column show-overflow-tooltip
                                 prop="orgName"
                                 label="部门"> </el-table-column>
                <el-table-column width="80px"
                                 show-overflow-tooltip
                                 prop="warehouseName"
                                 label="仓库"> </el-table-column>
                <el-table-column width="120px"
                                 show-overflow-tooltip
                                 prop="taxRate"
                                 label="税率"> 
                                  <template slot-scope="scope">
                                    <span>{{$numberToFixed(scope.row.taxRate, 4)}}</span>
                                  </template>
                </el-table-column>
                <el-table-column width="120px"
                                 show-overflow-tooltip
                                 prop="goodsName"
                                 label="物料档案"> </el-table-column>
                <el-table-column width="120px"
                                 show-overflow-tooltip
                                 prop="bankName"
                                 label="银行档案"> </el-table-column>
                <el-table-column width="120px"
                                 show-overflow-tooltip
                                 prop="goodsCategory"
                                 label="商品大类"> </el-table-column>
                <el-table-column width="120px"
                                 show-overflow-tooltip
                                 prop="custName"
                                 label="客户"> </el-table-column>
                <el-table-column width="120px"
                                 show-overflow-tooltip
                                 prop="supplierName"
                                 label="供应商"> </el-table-column>
                <el-table-column width="120px"
                                 show-overflow-tooltip
                                 prop="bankAccount"
                                 label="银行账户"> </el-table-column>
                <!-- <el-table-column show-overflow-tooltip
                           prop="lcPropertyS"
                           label="信用证属性"> </el-table-column> -->
              </el-table>
              <!-- 分页 -->
              <div>
                <el-pagination background @size-change="handleDetailSizeChange"
                               @current-change="handleDetailCurrentChange"
                               :current-page="detailPageNum"
                               :page-sizes="[100, 200, 300,500]"
                               :page-size="detailPageSize"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="detailTotal">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="examineShow"
      :show-close="false"
      title="选择财务过账日期"
      width="400px"
      class="popup_box"
    >
      <div class="examine-dialog">
        <el-col>
          <label>财务过账日期</label>
          <el-date-picker
            class="el-input2"
            size="small"
            v-model="gmDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="请选择日期"
          >
          </el-date-picker>
        </el-col>
      </div>
      <div class="button-div2">
        <el-button @click="examineSure" icon="el-icon-check">确定</el-button>
        <el-button @click="examineCancle" icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
    <el-divider></el-divider>
  </div>
</template>

<script>
import {
  selectWarrantList,
  selectWarrantDetailList,
  getDicList,
  selectDocNoList,
  importVoucher,
  importVoucherYY,
  deleteVoucher,
  deleteVoucherYY,
  doOutputExportExcel,
  credentialsReborn,
  getexamineDate,
  invalidOdWarrant
} from "@/api/credentials/credentials";
import Compony from "@/api/comdepartment/componySelect";
import PopupApi from "@/api/component";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect2.vue";
import { Message, Loading } from "element-ui";
export default {
  props: {},
  name: "credentials",
  data() {
    return {
      departmentList:[],
      examineShow: false,
      examineIndex: "",
      gmDate: "",
      loading: false,
      detailLoading: false,
      companyData: {}, //公司数据
      componyShow: false, //公司弹窗
      departmentData: [], //部门
      departmentShow: false, //部门弹窗
      staffData: {}, //员工
      staffShow: false, //员工弹窗
      credentials: {
        // bizCategoryCode: '',
        // warrantStatus: '',
      },
      warrantPostDateArr: [], //业务过账日期数组
      financialPostingArr: [],
      sendDateArr: [], //凭证推送日期数组
      bizAuditDateArr: [], //业务审核日期数组
      docNoArr: [], //单据号数组
      sapNoArr: [], //凭证号数组
      bizCategoryCodeList: [], //业务类别列表
      bizTypeCodeList: [], //业务类型列表
      warrantStatusList: [], //过账状态列表
      docNoList: [], //单据号列表
      sapNoList: [], //凭证号列表
      activeName: "first", //tab切换
      tableData: [], //凭证表格
      detailTableData: [], //凭证明细表格
      recordDirectionList: [], //借贷方向列表
      total: 0, //条数
      pageSize: 100, //页码数
      pageNum: 1, //每页条数
      detailTotal: 0,
      detailPageSize: 100,
      detailPageNum: 1,
      selectedItem: [], //选中item
      btuDisabled: false, //点击按钮处理时，按钮置灰
      docNoStart: "",
      //docNoEnd: "",
      sapNoStart: "",
      queryArea:true,
      sapNoEnd: ""
    };
  },
  created() {

  },
  mounted() {
    this.initData();
    this.getCredentials();
  },
  watch: {},
  methods: {
    //是否显示查询区域
    queryAreaShow() {
      this.queryArea = this.$showOne(this.queryArea);
    },
     getDepartment(str){
      if(!str){
        return
      }
      let params = {
        pageNum: 1,
        rows: 200,
        companyId: this.companyData.companyId ,
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
    cell({ row, column, rowIndex, columnIndex }) {
      if (
        column.property == "recordAmt" ||
        column.property == "orginAmt" ||
        column.property == "taxRate"
      ) {
        return "rightTd";
      } else {
        return "";
      }
    },
    initData() {
      //业务类别
      getDicList({ dictNo: 1118 })
        .then(res => {
          this.bizCategoryCodeList = res.data;
        })
        .catch(err => {});
      //业务类型
      getDicList({ dictNo: 1104 })
        .then(res => {
          this.bizTypeCodeList = res.data;
        })
        .catch(err => {});
      //过账状态
      getDicList({ dictNo: 1119 })
        .then(res => {
          this.warrantStatusList = res.data;
        })
        .catch(err => {});
      //借贷方向列表
      getDicList({ dictNo: 1116 })
        .then(res => {
          this.recordDirectionList = res.data;
        })
        .catch(err => {});
      //单据号
      selectDocNoList({ codiction: 1 })
        .then(res => {
          this.docNoList = res.data;
        })
        .catch(err => {});
      //凭证号
      selectDocNoList({ codiction: 2 })
        .then(res => {
          this.sapNoList = res.data;
        })
        .catch(err => {});
    },
    getCredentials() {
      this.loading = true;
      selectWarrantList({
        pageNum: this.pageNum,
        rows: this.pageSize
      })
        .then(res => {
          this.tableData = res.data;
          this.total = res.total;
          this.loading = false;
        })
        .catch(err => {});
    },
    queryList() {
      if (this.docNoStart) {
        var docNoStart = this.docNoStart;
      }
      // if(this.docNoEnd){
      //   var docNoEnd=this.docNoEnd;
      // }
      if (this.sapNoStart) {
        var sapNoStart = this.sapNoStart;
      }
      if (this.sapNoEnd) {
        var sapNoEnd = this.sapNoEnd;
      }
      if (this.sendDateArr) {
        if (this.sendDateArr[0] && this.sendDateArr[1]) {
          var warrantPostStartDate = this.sendDateArr[0] + "T00:00:00.000Z";
          var warrantPostEndDate = this.sendDateArr[1] + "T23:59:59.000Z";
        }
      }
      if (this.warrantPostDateArr) {
        if (this.warrantPostDateArr[0] && this.warrantPostDateArr[1]) {
          var bizPostStartDate = this.warrantPostDateArr[0] + "T00:00:00.000Z";
          var bizPostEndDate = this.warrantPostDateArr[1] + "T23:59:59.000Z";
        }
      }
      if (this.financialPostingArr) {
        if (this.financialPostingArr[0] && this.financialPostingArr[1]) {
          var financialPostingStartDate =
            this.financialPostingArr[0] + "T00:00:00.000Z";
          var financialPostingEndDate =
            this.financialPostingArr[1] + "T23:59:59.000Z";
        }
      }
      let bizAuditStartDates = '';
      let bizAuditEndDates = '';
      if(this.bizAuditDateArr && this.bizAuditDateArr.length > 0){
        bizAuditStartDates = this.bizAuditDateArr[0];
        bizAuditEndDates = this.bizAuditDateArr[1];
      }
      let odWarrantForm = {
        // companyCode: this.companyData.companyCode,
        companyId: this.companyData.companyId,
        bbBranchBaseList: this.departmentData,
        bizPostStartDate: bizPostStartDate,
        bizPostEndDate: bizPostEndDate,
        financialPostingStartDate: financialPostingStartDate,
        financialPostingEndDate: financialPostingEndDate,
        warrantPostStartDate: warrantPostStartDate,
        warrantPostEndDate: warrantPostEndDate,
        bizAuditStartDate: bizAuditStartDates,
        bizAuditEndDate: bizAuditEndDates,
        docNoStart: docNoStart,
        //docNoEnd: docNoEnd,
        sapNoStart: sapNoStart,
        sapNoEnd: sapNoEnd,
        ...this.credentials,
        pageNum: this.pageNum,
        rows: this.pageSize
      };
      this.loading = true;
      this.detailTableData = [];
      this.selectedItem = [];
      selectWarrantList(odWarrantForm)
        .then(res => {
          this.tableData = res.data;
          this.total = res.total;
          this.loading = false;
        })
        .catch(err => {});
    },
    clearNone() {
      this.companyData = {};
      this.departmentData = [];
      this.warrantPostDateArr = [];
      this.financialPostingArr = [];
      this.sendDateArr = [];
      this.bizAuditDateArr = [];
      this.docNoArr = [];
      this.sapNoArr = [];
      this.docNoStart = "";
      // this.docNoEnd="";
      this.sapNoStart = "";
      this.sapNoEnd = "";
      for (const key in this.credentials) {
        if (this.credentials.hasOwnProperty(key)) {
          this.credentials[key] = [];
        }
      }
    },
    handleTableDataRowClick(row, column, event) {
      //获取选中行
      this.selectedItem = [];
      this.$refs.multipleTable.toggleRowSelection(row);
      this.selectedItem.push(row); //改成多选
      this.selectedItem.forEach((it, index) => {
        if (it.warrantId == row.warrantId) {
          this.selectedItem.splice(index, 1);
        }
      });
      console.log(this.selectedItem);
      //请求明细
      this.detailLoading = true;
      selectWarrantDetailList({ warrantId: row.warrantId })
        .then(res => {
          this.detailTableData = res.data;
          this.detailTableData.map((item, index) => {
            item.rowNo = index + 1;
          });
          this.detailTotal = res.total;
          this.detailLoading = false;
        })
        .catch(err => {});
    },
    //过滤器
    time2Date(value) {
      if (value == null || value == "") {
        return "";
      } else {
        let date = new Date(value); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + ".";
        let M =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return Y + M;
      }
    },
    //凭证推送
    handleCredentialsPush() {
      if (this.selectedItem.length) {
        let flag = false;
        this.selectedItem.forEach(item => {
          if (
            item.warrantStatus != 11191001 &&
            item.warrantStatus != 11191003
          ) {
            flag = true;
            return;
          }
        });
        //未过账、过账失败可用
        if (!flag) {
          //使用Element loading-start 方法
          var loading = Loading.service({
            lock: true,
            text: "处理中...",
            background: "rgba(0, 0, 0, 0.7)"
          });
          let data = [];
          this.selectedItem.forEach(it => {
            data.push(it.warrantId);
          });
          //this.btuDisabled=true;//按钮是否可以点击
          importVoucherYY(data)
            .then(res => {
              loading.close();
              if (res.code == "success") {
                this.$openSuccess("推送成功");
                this.queryList();
                // this.btuDisabled=false;//按钮是否可以点击
              } else {
                this.$openWarning("推送失败");
                //this.btuDisabled=false;//按钮是否可以点击
              }
            })
            .catch(err => {
              loading.close();
              //this.btuDisabled=false;//按钮是否可以点击
            });
        } else {
          this.$openWarning('仅"未过账"、"过账失败"状态可凭证推送');
          this.btuDisabled = false; //按钮是否可以点击
        }
      } else {
        this.$openWarning("请选择数据");
        this.btuDisabled = false; //按钮是否可以点击
      }
    },
    //凭证撤回
    handleCredentialsPull() {
      if (this.selectedItem.length) {
        let flag = false;
        this.selectedItem.forEach(item => {
          if (item.warrantStatus != "11191002") {
            flag = true;
            return;
          }
        });
        //已过账可用
        if (!flag) {
          let forms = [];
          this.selectedItem.forEach(it => {
            let obj = {
              companyNumber: it.companyCode,
              //period: this.time2Date(it.warrantPostDate),
              voucherNumber: it.warrantPostCode,
              fexp: it.referenceInfo
            };
            if (it.financialPostingDate) {
              //财务过账日期
              obj.period = this.time2Date(it.financialPostingDate);
            } else {
              //业务过账日期
              obj.period = this.time2Date(it.warrantPostDate);
            }
            forms.push(obj);
          });
          this.btuDisabled = true; //按钮是否可以点击
          deleteVoucherYY(forms)
            .then(res => {
              if (res.code == "success") {
                this.$openSuccess("撤回成功");
                this.queryList();
                this.btuDisabled = false; //按钮是否可以点击
              } else {
                this.$openWarning(res.message);
                this.btuDisabled = false; //按钮是否可以点击
              }
              //   this.$openSuccess(res.message)
            })
            .catch(err => {
              this.btuDisabled = false; //按钮是否可以点击
            });
        } else {
          this.$openWarning('仅"已过账"状态可凭证撤回');
          this.btuDisabled = false;
        }
      } else {
        this.$openWarning("请选择数据");
        this.btuDisabled = false;
      }
    },
    //导出
    handleCredentialsExport() {
      if (this.sendDateArr) {
        if (this.sendDateArr[0] && this.sendDateArr[1]) {
          var warrantPostStartDate = this.sendDateArr[0] + "T00:00:00.000Z";
          var warrantPostEndDate = this.sendDateArr[1] + "T23:59:59.000Z";
        }
      }
      if (this.warrantPostDateArr) {
        if (this.warrantPostDateArr[0] && this.warrantPostDateArr[1]) {
          var bizPostStartDate = this.warrantPostDateArr[0] + "T00:00:00.000Z";
          var bizPostEndDate = this.warrantPostDateArr[1] + "T23:59:59.000Z";
        }
      }
      if (this.financialPostingArr) {
        if (this.financialPostingArr[0] && this.financialPostingArr[1]) {
          var financialPostingStartDate =
            this.financialPostingArr[0] + "T00:00:00.000Z";
          var financialPostingEndDate =
            this.financialPostingArr[1] + "T23:59:59.000Z";
        }
      }
      console.log("this.selectedItem :", this.selectedItem);
      let jsonPrams = JSON.stringify({
        companyCode: this.companyData.companyCode,
        bbBranchBaseList: this.departmentData,
        bizPostStartDate: bizPostStartDate,
        bizPostEndDate: bizPostEndDate,
        financialPostingStartDate: financialPostingStartDate,
        financialPostingEndDate: financialPostingEndDate,
        warrantPostStartDate: warrantPostStartDate,
        warrantPostEndDate: warrantPostEndDate,
        bizAuditStartDate: this.bizAuditDateArr[0],
        bizAuditEndDate: this.bizAuditDateArr[1],
        docNoStart: this.docNoStart,
        //docNoEnd: this.docNoEnd,
        sapNoStart: this.sapNoStart,
        sapNoEnd: this.sapNoEnd,
        ...this.credentials,
        pageNum: this.pageNum,
        rows: this.pageSize
      });
      doOutputExportExcel({ jsonPrams })
        .then(res => {
          const blob = new Blob([res.data]);
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          const filename = "导出文件.xls";
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
          this.$openSuccess("导出成功");
          //   this.queryList()
        })
        .catch(err => {
          this.$openWarning(err.message);
        });
    },
    //凭证重生成
    handleCredentialsReborn() {
      if (this.selectedItem.length == 1) {
        //未过账、过账失败可用
        if (
          this.selectedItem[0].warrantStatus == 11191001 ||
          this.selectedItem[0].warrantStatus == 11191003
        ) {
          this.btuDisabled = true; //按钮是否可以点击
          let url = "/" + this.selectedItem[0].callBackPath;
          credentialsReborn(url, {
            id: this.selectedItem[0].warrantId,
            code: this.selectedItem[0].docNo,
            biz: this.selectedItem[0].bizTypeCode
          })
            .then(res => {
              //   this.$openSuccess(res.message)
              this.$openSuccess("重生成成功");
              this.queryList();
              this.btuDisabled = false; //按钮是否可以点击
            })
            .catch(err => {
              this.btuDisabled = false; //按钮是否可以点击
            });
        } else {
          this.$openWarning('仅"未过账"、"过账失败"状态可凭证重生成');
          this.btuDisabled = false; //按钮是否可以点击
        }
      } else if (this.selectedItem.length > 1) {
        this.$openWarning("此选项不能批量操作");
        this.btuDisabled = false; //按钮是否可以点击
      } else {
        this.$openWarning("请选择数据");
        this.btuDisabled = false; //按钮是否可以点击
      }
    },
    //凭证作废
    voidVoucher() {
      if (this.selectedItem.length == 0) {
        this.$openWarning("未选择数据");
        return;
      } else if (this.selectedItem.length > 1) {
        this.$openWarning("只能单条操作");
        return;
      } else {
        if (this.selectedItem[0].warrantStatus != 11191001) {
          this.$openWarning("当前状态不可作废");
          return;
        }
      }
      this.$confirm("是否确认作废?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let odWarrantList = [
            {
              warrantId: this.selectedItem[0].warrantId,
              version: this.selectedItem[0].version
            }
          ];
          invalidOdWarrant(odWarrantList).then(res => {
            if (res.code == "success") {
              this.$openSuccess(res.message);
            } else {
              this.$openWarning(res.message);
            }
          });
        })
        .catch();
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.companyData = e;
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
      // if (this.companyData.companyName == undefined) {
      //   this.$openWarning("请先选择公司");
      // } else {
      this.departmentShow = true;
      //}
    },
    //部门弹窗关闭
    departmentCancle() {
      this.departmentShow = false;
    },
    //部门弹窗确定获取数据
    departmentSure(e) {
      this.departmentShow = false;
      this.departmentData = e;
      this.departmentList = e;
    },
    handleSizeChange(val) {
      //每页条数
      this.pageSize = val;
      this.queryList();
    },
    handleCurrentChange(val) {
      //当前页码数
      this.pageNum = val;
      this.queryList();
    },
    handleDetailSizeChange(val) {
      //每页条数
      this.detailPageSize = val;
    },
    handleDetailCurrentChange(val) {
      //当前页码数
      this.detailPageNum = val;
    },
    handleTableDataSelect(selection, row) {
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectedItem.push(row);
        this.selectedIndex = this.tableData.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    creatlook(e) {
      let index = this.tableData.indexOf(e);
      this.examineIndex = index;
      this.examineShow = true;
      console.log(index);
    },
    examineSure() {
      this.tableData[this.examineIndex].financialPostingDate = this.gmDate;
      this.examineShow = false;
      this.gmDate = "";
      getexamineDate(this.tableData[this.examineIndex]).then(res => {
        if (res.code == "success") {
          this.$openSuccess(res.message);
          this.queryList();
        }
      });
    },
    examineCancle() {
      this.examineShow = false;
      this.gmDate = "";
    },
    //表格选择(主表)
    handleChange(e) {
      this.selectedItem = e;
    },
    handleSelectionChange(val) {
      //表格选中数据
      console.log(val);
    }
  },
  components: {
    componySelect,
    departmentSelect
  }
};
</script>

<style lang="scss">
.el-input__icon {
  line-height: 22px !important;
}
.cdInformation {
  height: 40px;
  line-height: 40px;
  width: 100px;
  text-align: center;
  font-size: 20px;
}
#credentials {
  .el-range-input {
    font-size: 12px;
  }
  .el-date-editor{
  width: 70%;
}
}
.el-select__tags {
  .el-tag--light {
    height: auto !important;
    line-height: normal !important;
  }
}

</style>
