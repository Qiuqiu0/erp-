<template>
  <!-----------------信用证开证付汇清单----------------------->
  <div id="issuingAndPaymentList">
    <!--查询条件-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-search" class="query-button" @click="query"
        >查询</el-button
      >
      <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
    </div>
    <div class="input-div auto-sibling">
      <p class="hide-input" v-if="queryArea" @click="queryAreaShow()">
        更多条件<i class="el-icon-caret-bottom"></i>
      </p>
      <p class="hide-input" v-else @click="queryAreaShow()">
        收起<i class="el-icon-caret-top"></i>
      </p>
      <div class="search-div">
        <el-col :span="5" class="el-col">
          <label>公司</label>
          <el-input
            v-model="companyInfo.companyName"
            class="el-inputs"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="moreIcon" @click="companyPopup"
            ><i class="el-icon-search"></i
          ></span>
        </el-col>
        <department-select
          :companyInfo="companyInfo"
          :departmentList="departmentList"
          :branchInfo.sync="departmentData"
          class="el-col el-col-5"
        ></department-select>
        <el-col :span="5" class="el-col">
          <label>开证日期</label>
          <el-date-picker
            v-model="issueDate"
            type="daterange"
            class="el-inputs el-input2"
            size="mini"
            :clearable="false"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>信用证号</label>
          <el-input v-model="lcNo" class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>外部合同号</label>
          <el-input v-model="extContractCode" class="el-inputs"></el-input>
        </el-col>
      </div>
    </div>
    <!--列表信息-->
    <div class="button-div auto-sibling">
      <el-button @click="download()" v-if="$actionFlag(`F001`)"  icon="el-icon-download">导出</el-button>
    </div>
    <div class="el-table-div" v-auto>
      <el-table
        class="el-table"
        border
        center
        height="calc(100% - 35px)"
        :data="costPrefetchData"
        v-loading="loading"
        ref="multipleTable"
        :cell-class-name="cell"
        show-summary
        :summary-method="getSummaries"
      >
        <!-- <el-table-column type="selection" width="55" ></el-table-column> -->
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column
          prop="companyName"
          label="公司"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="deptName"
          label="部门"
          width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="extContractCode"
          label="外部合同号"
          min-width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="supplierName"
          label="供应商"
          min-width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="lcNo"
          label="信用证号"
          min-width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="issueDate"
          label="开证日期"
          min-width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="lcBankName"
          label="开证银行"
          min-width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="deadlineLoadDate"
          label="最迟装期"
          width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="effectiveDate"
          label="信用证效期"
          width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="lcDueType"
          width="100"
          label="信用证类型"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              <span
                v-show="scope.row.lcDueType == it.dict_code"
                v-for="it in lcDueTypeList"
                :key="it.dict_code"
                >{{ it.dict_value }}</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="lcProperty"
          label="信用证性质"
          width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              <span
                v-show="scope.row.lcProperty == it.dict_code"
                v-for="it in lcPropertyList"
                :key="it.dict_code"
                >{{ it.dict_value }}</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="currency"
          width="100"
          label="币种"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="开证">
          <el-table-column
            prop="lcAmt"
            :formatter="$moneyFormat"
            label="原币金额"
            width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="lcUSDAmt"
            :formatter="$moneyFormat"
            width="100"
            label="美元金额"
            show-overflow-tooltip
          ></el-table-column>
        </el-table-column>
        <el-table-column label="提单编号">
          <el-table-column
            prop="applyCode"
            width="100"
            show-overflow-tooltip
          ></el-table-column>
        </el-table-column>
        <el-table-column label="到单金额">
          <el-table-column
            prop="orderAmt"
            :formatter="$moneyFormat"
            label="原币金额"
            width="100"
            show-overflow-tooltip
          ></el-table-column>
        </el-table-column>
        <el-table-column
          prop="isDiscrepanced"
          width="100"
          label="是否有不符点"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ scope.row.isDiscrepanced == 1 ? "是" : "否" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="已承兑">
          <el-table-column
            prop="acceptanceAmt"
            :formatter="$moneyFormat"
            label="原币金额"
            width="100"
            show-overflow-tooltip
          ></el-table-column>
        </el-table-column>
        <el-table-column
          prop="payableDate"
          width="100"
          label="应付款日"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="付汇">
          <el-table-column
            prop="payAmt"
            :formatter="$moneyFormat"
            label="原币金额"
            width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="payUSDAmt"
            :formatter="$moneyFormat"
            label="美元金额"
            width="100"
            show-overflow-tooltip
          ></el-table-column>
        </el-table-column>
        <el-table-column
          prop="payDate"
          width="100"
          label="付款日"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="relatedPayNo"
          width="100"
          label="相关付款单号"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <el-pagination
        class="pageArea"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="currentChange"
        @size-change="currentSize"
        :current-page="page"
        :page-sizes="[100, 200, 300, 500]"
        :page-size="pageSize"
        :total="total"
      >
      </el-pagination>
    </div>
    <!--公司弹窗-->
    <company-select
      v-if="companyShow"
      :tipShow="companyShow"
      @tipsCancle="companyCancel"
      @tipsSure="companySure"
    ></company-select>
  </div>
</template>
<script>
import { mapState } from "vuex";
import CostApi from "@/api/costData/cost";
import companySelect from "@/components/componySelect";
import departmentSelect from "@/views/integratedQuery/conponents/departmentSelect";
import {
  creditCertPaymentReport,
  dicQuery,
  creditCertPaymentExport,
  creditCertPaymentReportSum
} from "@/api/integratedQuery.js";
import { Loading } from "element-ui";
export default {
  name: "issuingAndPaymentList",
  data() {
    return {
      //查询条件
      queryArea: true, //是否显示查询区域
      companyInfo: "",
      companyShow: false, //是否显示公司弹窗
      //列表字段
      costPrefetchData: [],
      loading: false,
      selected: [], //列表选中行
      page: 1,
      pageSize: 100,
      total: 0,
      departmentList: [],
      departmentData: [],
      issueDate: [],
      lcNo: "",
      extContractCode: "",
      lcDueTypeList: [],
      lcPropertyList: []
    };
  },
  created() {
    this.lcDueTypeListData();
    this.lcPropertyListData();
     if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      }
  },
  methods: {
    cell({ row, column, rowIndex, columnIndex }) {
      //第八列添加 red 类
      if (
        column.property == "payUSDAmt" ||
        column.property == "payAmt" ||
        column.property == "acceptanceAmt" ||
        column.property == "orderAmt" ||
        column.property == "lcUSDAmt" ||
        column.property == "lcAmt"
      ) {
        return "rightTd";
      } else {
        return "";
      }
    },
    lcDueTypeListData() {
      dicQuery({
        dictNo: 1022
      })
        .then(res => {
          this.lcDueTypeList = res.data;
        })
        .catch();
    },
    lcPropertyListData() {
      dicQuery({
        dictNo: 1077
      })
        .then(res => {
          this.lcPropertyList = res.data;
        })
        .catch();
    },
    //获取费用预提列表
    costPrefetchList() {
      this.costPrefetchData = [];
      let deptIdStr = "";
      this.departmentData.forEach(e => {
        deptIdStr = deptIdStr ? deptIdStr + "," + e.branchId : e.branchId;
      });
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        deptId: deptIdStr,
        companyId: this.companyInfo.companyId,
        lcNo: this.lcNo,
        extContractCode: this.extContractCode,
        issueDateStart: this.issueDate.length ? this.issueDate[0] : "",
        issueDateEnd: this.issueDate.length ? this.issueDate[1] : ""
      };
      params = this.$queryFilter(params);
      this.loading = true;
      creditCertPaymentReport(params)
        .then(res => {
          this.loading = false;
          this.costPrefetchData = res.data.list; //去掉最后一条
          this.total = res.data.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    download() {
      let deptIdStr = "";
      this.departmentData.forEach(e => {
        deptIdStr = deptIdStr ? deptIdStr + "," + e.branchId : e.branchId;
      });
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        deptId: deptIdStr,
        companyId: this.companyInfo.companyId,
        lcNo: this.lcNo,
        extContractCode: this.extContractCode,
        issueDateStart: this.issueDate.length ? this.issueDate[0] : "",
        issueDateEnd: this.issueDate.length ? this.issueDate[1] : ""
      };
      params = this.$queryFilter(params);
      //使用Element loading-start 方法
      var loading2 = Loading.service({
        lock: true,
        text: "加载中...",
        background: "rgba(0, 0, 0, 0.7)"
      });
      creditCertPaymentExport(params)
        .then(res => {
          if (res.code == "fail") {
            this.$openWarning(res.message);
          } else {
            const blob = new Blob([res.data]);
            const a = document.createElement("a");
            const url = window.URL.createObjectURL(blob);
            const filename = "信用证开证付汇清单.xls";
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
          }
          loading2.close();
        })
        .catch(e => {
          loading2.close();
        });
    },
    //
    //获取总计
    getSum() {
      let deptIdStr = "";
      this.departmentData.forEach(e => {
        deptIdStr = deptIdStr ? deptIdStr + "," + e.branchId : e.branchId;
      });
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        deptId: deptIdStr,
        companyId: this.companyInfo.companyId,
        lcNo: this.lcNo,
        extContractCode: this.extContractCode,
        issueDateStart: this.issueDate.length ? this.issueDate[0] : "",
        issueDateEnd: this.issueDate.length ? this.issueDate[1] : ""
      };
      params = this.$queryFilter(params);
      creditCertPaymentReportSum(params)
        .then(res => {
          if (res.data) {
            this.sumTol = res.data;
          }
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
          [
            "lcAmt",
            "lcUSDAmt",
            "orderAmt",
            "acceptanceAmt",
            "payAmt",
            "payUSDAmt"
          ].findIndex(it => it == key) !== -1
        ) {
          sums[index] = this.sumTol?this.$sumTolFormat(this.sumTol[key]):"";
        } else {
          sums[index] = "";
        }
      });
      this.$nextTick(() => {
        this.$refs.multipleTable.doLayout();
      });
      return sums;
    },
    //查询
    query() {
      this.page = 1;
      this.costPrefetchList();
      this.getSum();
    },
    //重置
    reset() {
       if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      }else{
        this.companyInfo = {}; //公司
      }
      this.departmentData = [];
      this.issueDate = [];
      this.lcNo = "";
      this.extContractCode = "";
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
    //列表多选
    handleChange(e) {
      this.selected = e;
    },
    selectedRow(e) {
      this.$refs.multipleTable.toggleRowSelection(e);
    },
    //翻页
    currentChange(e) {
      this.page = e;
      this.costPrefetchList();
    },
    //单页数量
    currentSize(e) {
      this.page = 1;
      this.pageSize = e;
      this.costPrefetchList();
    }
  },
  components: {
    companySelect,
    departmentSelect
  }
};
</script>
<style lang="scss">
#issuingAndPaymentList {
  .el-dropdown {
    vertical-align: middle;
    margin-right: 10px;
  }
  .el-col {
    position: relative;
    .moreIcon {
      width: 70%;
      height: 24px;
      position: absolute;
      top: 0;
      right: 0;
      padding: 4px 5px;
      cursor: pointer;
    }
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
    width: 30%;
    vertical-align: middle;
  }
  .el-inputs,
  .el-selects {
    width: 70%;
    .el-input__inner {
      width: 100%;
    }
  }
  .text_too_long {
    position: absolute;
    width: 45%;
    margin-left: -45%;
  }
  .el-input__icon {
    line-height: 10px !important;
  }
  .pageArea {
    margin: 10px 0 0 20px;
  }
}
</style>
