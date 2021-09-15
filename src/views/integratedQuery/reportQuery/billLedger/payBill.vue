<template>
  <div class="payBill">
    <el-col class="el-col el-col-btn auto-sibling">
      <div class="button-div">
        <el-button icon="el-icon-search" class="query-button" @click="queryData"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" @click="clearNone">重置</el-button>
      </div>
    </el-col>
    <!-- 搜索 -->
    <div class="index-div3 input-div auto-sibling">
      <!-- <p class="hide-input" v-if="show" @click="inputShow()">
        更多条件 <i class="el-icon-caret-bottom"></i>
      </p>
      <p class="hide-input" v-else @click="inputShow()">
        收起<i class="el-icon-caret-top"></i>
      </p> -->
      <div class="search-div">
        <el-col :span="5" class="el-col">
          <label>公司</label>
          <el-input
            v-model="companyName.companyName"
            class="el-inputs"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" @click="componyTip(1)">
            <i class="el-icon-search"></i>
          </span>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>部门</label>
          <el-input
            v-model="branchName.branchName"
            class="el-inputs"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" @click="departmentTip(1)">
            <i class="el-icon-search"></i>
          </span>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>应付票据类型</label>
          <el-select v-model="isInactive" placeholder="请选择" clearable>
            <el-option
              v-for="item in stateList"
              :key="item.dict_key"
              :label="item.dict_value"
              :value="item.dict_key"
            >
            </el-option>
          </el-select>
        </el-col>
      </div>
    </div>
    <div class="button-div auto-sibling">
        <el-button @click="download()" v-if="$actionFlag(`F001`)"  icon="el-icon-download">导出</el-button>
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
        v-loading="loading"
        show-summary
        :summary-method="getSummaries"
      >
        <el-table-column
          type="index"
          label="序号"
          width="55"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="companyName"
          label="公司"
          width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="receiptByName"
          label="收票部门"
          show-overflow-tooltip
        ></el-table-column>
        <!--<el-table-column
          prop="indfpOrgNameex"
          label="背书部门"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="accountYear"
          label="年度"
          show-overflow-tooltip
        ></el-table-column>
        -->
        <el-table-column
          prop="instrumentBillNo"
          label="单据编号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="orgName"
          width="180"
          label="单位名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="timelineDate"
          label="单据日期"
          show-overflow-tooltip
        >
          <template scope="scope">{{
            $timeFun(scope.row.timelineDate, 1)
          }}</template>
        </el-table-column>
        <el-table-column
          prop="currencyName"
          label="单据币别"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="billAmt"
          label="原币金额"
          show-overflow-tooltip
        >
         <template slot-scope="scope">
               <div class="content_right">
                {{$moneyFormat(scope.row,scope.column,scope.row.billAmt)}}
               </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="billAmtBase"
          label="本位币金额"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
               <div class="content_right">
                {{$moneyFormat(scope.row,scope.column,scope.row.billAmtBase)}}
               </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="billAmtRmb"
          label="人民币金额"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
               <div class="content_right">
                {{$moneyFormat(scope.row,scope.column,scope.row.billAmtRmb)}}
               </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="invoiceType"
          label="票据类型"
          show-overflow-tooltip
        >
          <template scope="scope">
            <span v-for="(item, index) in stateList" :key="index">
              <span v-if="item.dict_code == scope.row.invoiceType">
                {{ item.dict_value }}
              </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="instrumentNo"
          label="票据号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="billBalance"
          label="票据余额"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
               <div class="content_right">
                {{$moneyFormat(scope.row,scope.column,scope.row.billBalance)}}
               </div>
          </template>
        </el-table-column>
      </el-table>
      <!--分页background-->
      <el-pagination
      background
        @size-change="handleSizeChange"
        @current-change="currentChange"
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
      :isInactiveS="isInactiveS"
      :isInactiveStatus="isInactiveStatus"
      @tipsCancle="tipsCancle"
      @tipsSure="tipsSure"
    ></compony-select>
    <!-- 选择部门弹窗 -->
    <department-select
      v-if="departmentShow"
      :tipShow="departmentShow"
      :data="companyName"
      :companyId="companyId"
      :isInactiveS="isInactiveS"
      :isInactiveStatus="isInactiveStatus"
      @departmentCancle="departmentCancle"
      @departmentSure="departmentSure"
    ></department-select>
  </div>
</template>

<script>
import { mapState } from "vuex";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import billApi from "@/api/reportQuery/bill.js";
import {Loading } from "element-ui";
export default {
  name: "payBill",
  data() {
    return {
      tableData: [], //表格
      componyShow: false, //公司弹窗
      departmentShow: false, //部门弹窗
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      umTol: {}, //合计
      stateList: [], //票据类型
      isInactive: "", //票据类型
      companyName: {},
      branchName: {},
      com: "",
      come: {},
      dep: ``,
      companyId: "", //查询所属公司
      companyList: [], //公司列表
      isInactiveS: false, //状态
      isInactiveStatus: false, //控制公司里面状态
      loading: false, //表格loading
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      show: true
    };
  },
  created() {
    //获取票据类型
    this.getType();
    // 获取表格
    // this.empList();
    if(window.IsShowDefaultCompanyInfo){
        this.companyName=window.defaultCompanyInfo;
      }
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    inputShow() {
      this.show = this.$showOne(this.show);
    },
    //获取票据类型
    getType() {
      billApi
        .pSel()
        .then(res => {
          this.stateList = res.data;
        })
        .catch();
    },
    //公司弹窗打开
    componyTip(e) {
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
      this.branchName = ``;
      this.staffName = ``;
    },
    //部门弹窗打开
    departmentTip() {
      if (!Object.keys(this.companyName).length) {
        this.$openWarning("请先选择公司");
        return false;
      }
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
      this.staffName = ``;
    },
    //获取合计
    getSum() {
      let params = {
        companyId: this.companyName.companyId,
        orgId: this.branchName.branchId,
        instrumentType: this.isInactive
      };
      Object.keys(params).forEach(key => {
        if (params[key] == `` || params[key] == `undefined`) {
          delete params[key];
        }
      });
      billApi
        .pSum(params)
        .then(res => {
          this.sumTol = res.data;
        })
        .catch();
    },
    //获取表格
    empList() {
      this.loading = true;
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        companyId: this.companyName.companyId,
        orgId: this.branchName.branchId,
        instrumentType: this.isInactive
      };
      Object.keys(params).forEach(key => {
        if (params[key] == `` || params[key] == `undefined`) {
          delete params[key];
        }
      });
      billApi
        .pBill(params)
        .then(res => {
          this.loading = false;
          this.tableData = res.data;
          this.total = res.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
     //导出
    download(){
       let data = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        companyId: this.companyName.companyId,
        orgId: this.branchName.branchId,
        instrumentType: this.isInactive
      };
      Object.keys(data).forEach(key => {
        if (data[key] == `` || data[key] == `undefined`) {
          delete data[key];
        }
      });
      //使用Element loading-start 方法
      var loading2 = Loading.service({
          lock: true,
          text: "加载中...",
          background: "rgba(0, 0, 0, 0.7)"
      });
      billApi.exportFiPaymentBillReportForms(data).then(res=>{
        if(res.code=="fail"){
          this.$openWarning(res.message);
        }else{
          const blob = new Blob([res.data]);
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          const filename ="应付票据台账报表.xls";
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
        }
          loading2.close();
      }).catch(e=>{
        loading2.close();
      });
    },
    //查询
    queryData() {
      this.empList();
      this.getSum();
    },
    //清空选项
    clearNone() {
      if(window.IsShowDefaultCompanyInfo){
        this.companyName=window.defaultCompanyInfo;
      }else{
        this.companyName = {}; //公司
      }
      this.isInactive = ``;
      this.branchName = {};
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.empList();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.empList();
    },
    //ID输入校验
    handleIdRule(value) {
      let reg = /[^A-Za-z0-9]*$/;
      if (reg.test(value)) {
      }
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        let key = column.property;
        if (["billAmt","billBalance"
        ,"billAmtBase"
        ,"billAmtRmb"
        ].findIndex(it => it == key) !== -1) {
          let res=this.sumTol?parseFloat(this.sumTol[key]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'):"";
          sums[index]= this.$sumTolFormat(res);
        }  else {
          sums[index] = "";
        }
      });
      this.$nextTick(() => {
        this.$refs.multipleTable.doLayout();
      });
      return sums;
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
    componySelect,
    departmentSelect
  }
};
</script>

<style lang="scss">
.payBill {
  .el_flex {
    display: flex;
    align-items: center;
  }
  .el-date-editor.el-input {
    width: auto;
  }
  .el-input__inner {
    height: 30px;
  }
  .el-select__caret.el-input__icon {
    line-height: inherit;
  }
  .redfs {
    position: relative;
    .comicon {
      width: 100%;
      position: absolute;
      left: 0;
      cursor: pointer;
      i {
        float: right;
        line-height: inherit;
      }
    }
  }
}
</style>
