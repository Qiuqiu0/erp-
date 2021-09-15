<!--客户应收款报表查询-->
<template>
  <div id="customerReceivablesReport">
    <!--查询条件-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-search" class="query-button" @click="query"
        >查询</el-button
      >
      <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
    </div>
    <div class="input-div auto-sibling">
     
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
        <!--客户-->
         <customer-select
          :customerNameList="customerNameList"
          :customerInfo.sync="customerInfo"
         class="el-col el-col-5"></customer-select>
        <!--员工-->
        <!-- <emp-select
            :staffNameList="staffNameList"
            :staffName.sync="staffName"
            class="el-col el-col-5"
        ></emp-select> -->

    </div>
    <!--列表信息-->
    <div class="button-div auto-sibling">
      <el-button @click="download()" v-if="$actionFlag(`F001`)" icon="el-icon-download">导出</el-button>
    </div>
    <div  class="el-table-div" v-auto>
      <el-table
        class="el-table"
        border
        center
        height="calc(100% - 35px)"
        :data="costPrefetchData"
        v-loading="loading"
        ref="multipleTable"
        :cell-class-name="cell"
      >
        <!-- <el-table-column type="selection" width="55" ></el-table-column> -->
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column
          prop="companyName"
          label="公司"
          min-width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="orgName"
          label="部门"
          width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="custName"
          label="客户名称"
          min-width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="creditAmt"
          label="已批赊销额度"
          min-width="160"
          :formatter="$moneyFormat"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="depositReceivedAmt"
          label="已收预收款金额"
          :formatter="$moneyFormat"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="marginAmt"
          label="已收保证金"
          :formatter="$moneyFormat"
          min-width="140"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="shipmentAmt"
          label="已发货金额"
          min-width="140"
          :formatter="$moneyFormat"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="accountsReceivableAmt"
          label="应收款金额"
          :formatter="$moneyFormat"
          width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="remainingCreditAmt"
          label="剩余赊销额度"
          :formatter="$moneyFormat"
          width="160"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="creditNo"
          label="额度账期"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
        width="120"
          prop="avgGathingDays"
          label="实际平均账期"
          show-overflow-tooltip
        >
        </el-table-column>
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
import companySelect from "@/components/componySelect";
import departmentSelect from "@/views/integratedQuery/conponents/departmentSelect";
import {
  customerAccountsGathering,
  dicQuery,
  exportCustomerAccountsGatheringList
} from "@/api/integratedQuery.js";
import empSelect from "@/views/integratedQuery/conponents/empSelect";
import customerSelect from "@/views/integratedQuery/conponents/customerListSelect";
import { Loading } from "element-ui";
export default {
  name: "customerReceivablesReport",
  data() {
    return {
      //查询条件
      companyInfo: "",
      companyShow: false, //是否显示公司弹窗
      departmentData: [],
      departmentList: [],
      //列表字段
      costPrefetchData: [],
      loading: false,
      selected: [], //列表选中行
      page: 1,
      pageSize: 100,
      total: 0,
      sumTol: {}, //总计
      staffName: [],
      staffNameList: [],
      customerNameList:[],
     customerInfo:[],
      contractType:[] 
    };
  },
  created() {
     if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      }
  },
  methods: {
    cell({ row, column, rowIndex, columnIndex }) {
      //第八列添加 red 类
      if (
        column.property == "creditAmt" ||
        column.property == "depositReceivedAmt" || 
        column.property == "shipmentAmt" || 
        column.property == "accountsReceivableAmt" ||
        column.property == "remainingCreditAmt" ||
        column.property == "marginAmt"
      ) {
        return "rightTd";
      } else {
        return "";
      }
    },
    //获取费用预提列表
    costPrefetchList() {
      this.costPrefetchData = [];
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyCode: this.companyInfo.companyCode,
        bbBranchBaseList: this.departmentData,
        bbCustomerBaseList: this.customerInfo,
       // bbEmployeeList: this.staffName,
      };
      params = this.$queryFilter(params);
      this.loading = true;
      customerAccountsGathering(params)
        .then(res => {
          this.loading = false;
          this.costPrefetchData = res.data;
          this.total = res.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    download() {
       let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        companyCode: this.companyInfo.companyCode,
        bbBranchBaseList: this.departmentData,
        bbCustomerBaseList: this.customerInfo,
      };
      //使用Element loading-start 方法
      var loading2 = Loading.service({
        lock: true,
        text: "加载中...",
        background: "rgba(0, 0, 0, 0.7)"
      });
      exportCustomerAccountsGatheringList(params)
        .then(res => {
          if (res.code == "fail") {
            this.$openWarning(res.message);
          } else {
            const blob = new Blob([res.data]);
            const a = document.createElement("a");
            const url = window.URL.createObjectURL(blob);
            const filename = "客户应收款报表.xls";
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
    //查询
    query() {
      this.page = 1;
      this.costPrefetchList();
    },
    //重置
    reset() {
       if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      }else{
        this.companyInfo = {}; //公司
      }
      this.departmentData = [];
      this.staffName = [];
      this.customerInfo = [];
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
    empSelect,
    departmentSelect,
    customerSelect,
  }
};
</script>
<style lang="scss">
#customerReceivablesReport {
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
.index .el-table .content_right {
  text-align: right;
}
</style>
