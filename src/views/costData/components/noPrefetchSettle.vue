<!--无预提结算弹窗-->
<template>
  <div id="noPrefetchSettle">
    <el-dialog title="无预提结算" :visible.sync="isShow" :show-close="false" :close-on-click-modal="false" :before-close="cancel" width="1100px">
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
              <el-input v-model="companyInfo.companyName" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span class="moreIcon" @click="companyPopup"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>部门</label>
              <el-input v-model="branchInfo.branchName" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span class="moreIcon" @click="branchPopup"><i class="el-icon-search"></i></span>
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
              <label>入库单号</label>
              <el-input v-model="inputCode" class="el-inputs"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>出库单号</label>
              <el-input v-model="outputCode" class="el-inputs"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>项目号</label>
              <el-input v-model="projectInfo.projectCode" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span class="moreIcon" @click="projectPopup"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>项目名称</label>
              <el-input v-model="projectInfo.projectName" class="el-inputs" disabled></el-input>
            </el-col>
          </div>
          <!--公司弹窗-->
          <company-select v-if="companyShow" :tipShow="companyShow" @tipsCancle="companyCancel" @tipsSure="companySure"></company-select>
          <!--部门弹窗-->
          <branch-select v-if="branchShow" :tipShow="branchShow" :data="companyInfo" @departmentCancle="branchCancel" @departmentSure="branchSure"></branch-select>
          <!--项目号弹窗-->
          <project-select v-if="projectShow" :tipShow="projectShow" @projectCancle="projectCancel" @projectSure="projectSure"></project-select>
        </div>
        <div>
          <el-table
            class="el-table"
            border
            center
            :data="noPrefetchList"
            v-loading="loading"
            height="450px"
            ref="multipleTable"
            style="overflow-y: auto;"
            @selection-change="handleChange"
            @row-click="selectedRow">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="contractNo" label="合同号" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="extContractNo" label="外部合同号" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="projectCode" label="项目号" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stockIn" label="入库单号" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stockOut" label="出库单号" min-width="150" show-overflow-tooltip></el-table-column>
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
import projectSelect from "@/components/projectSelect";
export default {
  name: "noPrefetchSettle",
  data() {
    return {
      queryArea: true, //是否显示查询区域
      companyInfo: "",
      companyShow: false, //是否显示公司弹窗
      branchInfo: "",
      branchShow: false, //是否显示部门弹窗
      contractCode: "",
      extContractCode: "",
      inputCode: "",
      outputCode: "",
      projectInfo: "",
      projectShow: false, //是否显示项目号弹窗
      noPrefetchList: [],
      canCreate: 0, //未选择单据0，公司或部门不一致-1，只能选择采购入库单或者销售出库单-2，确认创建1
      bingingInfo: { //费用结算单创建时所绑定的信息
        isPrefetch: 0, //预提结算1，无预提结算0
        type: "", //采购环节1，销售环节2
        isProjectNull: 0, //项目号都不为空0，项目号为空1
        companyId: "",
        companyCode: "",
        companyName: "",
        branchId: "",
        branchCode: "",
        branchName: "",
        stockInOutCode: [],
        contractCode: [],
        projectCode: []
      },
      loading: true,
      page: 1,
      pageSize: 100,
      total: 0
    };
  },
  props: {
    isShow: Boolean
  },
  created() {
    this.queryData();
  },
  mounted() {},
  methods: {
    //获取无预提结算列表
    queryData() {
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        companyCode: this.companyInfo.companyCode,
        orgCode: this.branchInfo.branchCode,
        contactNo: this.contractCode,
        extContactNo: this.extContractCode,
        stockIn: this.inputCode,
        stockOut: this.outputCode,
        projectCode: this.projectInfo.projectCode
      };
      params = this.$queryFilter(params);
      this.loading = true;
      CostApi.noPrefetchSettleList(params).then(res => {
        this.loading = false;
        if (res.code == "success") {
          this.noPrefetchList = res.data.list;
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
      this.companyInfo = "";
      this.branchInfo = "";
      this.contractCode = "";
      this.extContractCode = "";
      this.inputCode = "";
      this.outputCode = "";
      this.projectInfo = "";
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
    //项目号弹窗
    projectPopup() {
      this.projectShow = true;
    },
    //项目号弹窗关闭
    projectCancel() {
      this.projectShow = false;
    },
    //项目号弹窗确定并传值
    projectSure(e) {
      this.projectShow = false;
      this.projectInfo = e;
    },
    //列表多选
    handleChange(arr) {
      if (arr.length > 0) {
        let isAgree = true;
        let firstArr = arr[0];
        this.bingingInfo.stockInOutCode = [];
        this.bingingInfo.contractCode = [];
        this.bingingInfo.projectCode = [];
        arr.forEach(item => {
          this.bingingInfo.stockInOutCode.push(item.stockInOutCode);
          this.bingingInfo.contractCode.push(item.contractNo);
          this.bingingInfo.projectCode.push(item.projectCode);
          if (item.projectCode == "" || item.projectCode == null) {
            this.bingingInfo.isProjectNull = 1;
          } else {
            this.bingingInfo.isProjectNull = 0;
          }
          if (item.companyCode != firstArr.companyCode || item.orgCode != firstArr.orgCode) {
            this.canCreate = -1;
            isAgree = false;
          }
        });
        if (isAgree) {
          arr.forEach(item => {
            if (item.bizOccurrence != firstArr.bizOccurrence) {
              this.canCreate = -2;
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
        this.$openWarning("只能选择采购入库单或者销售出库单");
        return false;
      }
      sessionStorage.setItem("costSettle", JSON.stringify(this.bingingInfo));
      this.$emit("callback", true);
    },
    //取消
    cancel() {
      this.$emit("callback", false);
    }
  },
  computed: {},
  components: {
    companySelect,
    branchSelect,
    projectSelect
  }
};
</script>
<style lang="scss">
#noPrefetchSettle {
  .text_too_long_popup {
    position: absolute;
    width: 36%;
    margin-left: -35%;
  }
}
</style>