<!--预提结算弹窗-->
<template>
  <div id="prefetchSettle">
    <el-dialog title="预提结算" :visible.sync="isShow" :show-close="false" :close-on-click-modal="false" :before-close="cancel" width="1100px">
      <div class="index">
        <div class="button-div">
          <el-button icon="el-icon-search" @click="query">查询</el-button>
          <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
        </div>
        <div class="input-div" style="padding-left:0">
          <p class="hide-input" v-if="queryArea" @click="queryAreaShow()">更多条件<i class="el-icon-caret-bottom"></i></p>
          <p class="hide-input" v-else @click="queryAreaShow()">收起<i class="el-icon-caret-top"></i></p>
          <div class="dialog-search-div">
            <el-col :span="5" class="el-col">
              <label>公司</label>
              <el-input v-model="companyInfo.companyName" class="el-inputs" :placeholder="isNew ? '请选择' : ''" disabled></el-input>
              <span class="moreIcon" v-if="isNew" @click="companyPopup"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>部门</label>
              <el-input v-model="branchInfo.branchName" class="el-inputs" :placeholder="isNew ? '请选择' : ''" disabled></el-input>
              <span class="moreIcon" v-if="isNew" @click="branchPopup"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>合同号</label>
              <el-input v-model="contractCode" class="el-inputs"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label class="text_too_long_popup">外部合同号</label>
              <el-input v-model="extContractCode" class="el-inputs"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>预提单号</label>
              <el-input v-model="prefetchCode" class="el-inputs"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>创建日期</label>
              <el-date-picker v-model="createdTime" type="daterange" class="el-selects" size="mini" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-col>
          </div>
          <!--公司弹窗-->
          <company-select v-if="companyShow" :tipShow="companyShow" @tipsCancle="companyCancel" @tipsSure="companySure"></company-select>
          <!--部门弹窗-->
          <branch-select v-if="branchShow" :tipShow="branchShow" :data="companyInfo" @departmentCancle="branchCancel" @departmentSure="branchSure"></branch-select>
        </div>
        <div>
          <el-table
            class="el-table"
            border
            center
            :data="prefetchList"
            v-loading="loading"
            style="overflow-y: auto;"
            height="450px"
            ref="multipleTable"
            @selection-change="handleChange"
            @row-click="selectedRow">
            <el-table-column type="selection" width="55" ></el-table-column>
            <el-table-column prop="prefetchCode" label="预提单号" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="costName" label="费用名称" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="prefetchAmt" label="预提金额" min-width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="supplierName" label="供应商" min-width="180" show-overflow-tooltip></el-table-column>
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
        <div class="button-div2">
          <el-button icon="el-icon-check" type="primary" size="small" @click="confirm">确认</el-button>
          <el-button icon="el-icon-close" size="small" @click="cancel">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CostApi from "@/api/costData/cost";
import companySelect from "@/components/componySelect";
import branchSelect from "@/components/departmentSelect";
export default {
  name: "prefetchSettle",
  data() {
    return {
      queryArea: true, //是否显示查询区域
      companyInfo: "",
      companyShow: false, //是否显示公司弹窗
      branchInfo: "",
      branchShow: false, //是否显示部门弹窗
      contractCode: "",
      extContractCode: "",
      prefetchCode: "",
      createdTime: [],
      prefetchList: [],
      isNew: true, //是否是新建单据
      canCreate: 0, //未选择单据0，公司或部门不一致-1，供应商不一致-2，业务币币种不一致-3，只能选择采购预提单或者销售预提单-4，确认创建1
      bingingInfo: { //费用结算单创建时所绑定的信息
        isPrefetch: 1, //预提结算1，无预提结算0
        type: "", //采购环节1，销售环节2
        companyId: "",
        companyCode: "",
        companyName: "",
        branchId: "",
        branchCode: "",
        branchName: "",
        supplierId: "",
        supplierCode: "",
        supplierName: "",
        currencyCode: "",
        costDetailId: []
      },
      loading: true,
      page: 1,
      pageSize: 100,
      total: 0
    };
  },
  props: {
    isShow: Boolean,
    baseQuery: {
      type: Object,
      default: Object
    },
    selectedItem: {
      type: Array,
      default: () => []
    }
  },
  created() {
    if (JSON.stringify(this.baseQuery) != "{}") {
      this.isNew = false;
      this.companyInfo = {
        companyId: this.baseQuery.companyId,
        companyCode: this.baseQuery.companyCode,
        companyName: this.baseQuery.companyName
      };
      this.branchInfo = {
        branchId: this.baseQuery.orgId,
        branchCode: this.baseQuery.orgCode,
        branchName: this.baseQuery.orgName
      };
    }
    this.queryData();
  },
  mounted() {},
  methods: {
    //获取预提结算列表
    queryData() {
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        companyCode: this.companyInfo.companyCode,
        orgCode: this.branchInfo.branchCode,
        contractNo: this.contractCode,
        extContractNo: this.extContractCode,
        prefetchCode: this.prefetchCode,
        startTime: this.createdTime == null ? "" : this.createdTime[0],
        endTime: this.createdTime == null ? "" : this.createdTime[1],
        supplierCode: this.baseQuery.supplierCode,
        currencyCode: this.baseQuery.currencyCode,
        bizOccurrence: this.baseQuery.bizOccurrence,
        itemIdsList: this.selectedItem
      };
      params = this.$queryFilter(params);
      this.loading = true;
      CostApi.prefetchSettleList(params).then(res => {
        this.loading = false;
        if (res.code == "success") {
          this.prefetchList = res.data.list;
          this.total = res.data.total;
        } else {
          this.$openWarning(res.message);
        }
      }).catch(() => {
        this.loading = false;
      });
    },
    //查询
    query() {
      this.page = 1;
      this.queryData();
    },
    //重置
    reset() {
      if (this.isNew) {
        this.companyInfo = "";
        this.branchInfo = "";
      }
      this.contractCode = "";
      this.extContractCode = "";
      this.prefetchCode = "";
      this.createdTime = [];
    },
    //是否显示查询区域
    queryAreaShow() {
      this.queryArea = this.$dialogShowOne(this.queryArea);
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
    },
    //列表多选
    handleChange(arr) {
      if (arr.length > 0) {
        let isAgree = true;
        let firstArr = arr[0];
        this.bingingInfo.costDetailId = [];
        arr.forEach(item => {
          this.bingingInfo.costDetailId.push(item.itemsId);
          if (item.companyCode != firstArr.companyCode || item.orgCode != firstArr.orgCode) {
            this.canCreate = -1;
            isAgree = false;
          }
        });
        if (isAgree) {
          arr.forEach(item => {
            if (item.supplierCode != firstArr.supplierCode) {
              this.canCreate = -2;
              isAgree = false;
              return false;
            }
            if (item.currencyCode != firstArr.currencyCode) {
              this.canCreate = -3;
              isAgree = false;
              return false;
            }
            if (item.bizOccurrence != firstArr.bizOccurrence) {
              this.canCreate = -4;
              isAgree = false;
              return false;
            }
          });
          if (isAgree) {
            this.canCreate = 1;
            if (firstArr.bizOccurrence == "10600005") { //采购环节
              this.bingingInfo.type = 1;
            } else if (firstArr.bizOccurrence == "10600010") { //销售环节
              this.bingingInfo.type = 2;
            }
            this.bingingInfo.companyId = firstArr.companyId;
            this.bingingInfo.companyCode = firstArr.companyCode;
            this.bingingInfo.companyName = firstArr.companyName;
            this.bingingInfo.branchId = firstArr.orgId;
            this.bingingInfo.branchCode = firstArr.orgCode;
            this.bingingInfo.branchName = firstArr.orgName;
            this.bingingInfo.supplierId = firstArr.supplierId;
            this.bingingInfo.supplierCode = firstArr.supplierCode;
            this.bingingInfo.supplierName = firstArr.supplierName;
            this.bingingInfo.currencyCode = firstArr.currencyCode;
          }
        }
      } else {
        this.canCreate = 0;
      }
    },
    selectedRow(e) {
      this.$refs.multipleTable.toggleRowSelection(e);
    },
    //翻页
    currentChange(val) {
      this.page = val;
      this.queryData();
    },
    //单页数量
    currentSize(val) {
      this.page = 1;
      this.pageSize = val;
      this.queryData();
    },
    //确认
    confirm() {
      if (this.canCreate == 0) {
        this.$openWarning("未选择单据");
        return false;
      } else if (this.canCreate == -1) {
        this.$openWarning("公司或部门不一致");
        return false;
      } else if (this.canCreate == -2) {
        this.$openWarning("供应商不一致");
        return false;
      } else if (this.canCreate == -3) {
        this.$openWarning("业务币币种不一致");
        return false;
      } else if (this.canCreate == -4) {
        this.$openWarning("只能选择采购预提单或者销售预提单");
        return false;
      }
      if (this.isNew) {
        sessionStorage.setItem("costSettle", JSON.stringify(this.bingingInfo));
        this.$emit("callback", true);
      } else {
        this.$emit("callback", this.bingingInfo);
      }
    },
    //取消
    cancel() {
      this.$emit("callback", false);
    }
  },
  computed: {},
  components: {
    companySelect,
    branchSelect
  }
};
</script>
<style lang="scss">
#prefetchSettle {
  .el-input__icon {
    line-height: 10px !important;
  }
  .text_too_long_popup {
    position: absolute;
    width: 36%;
    margin-left: -35%;
  }
}
</style>