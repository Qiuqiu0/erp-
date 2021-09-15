<!--付款申请单弹窗-->
<template>
  <el-container id="demandPaymentModal">
    <el-dialog
      title="单据信息"
      :visible.sync="tipShow"
      append-to-body
      :close-on-click-modal="false"
      :show-close="false"
      :before-close="cancel"
      width="1150px"
    >
      <div class="index">
        <div class="button-div">
          <el-button class="query-button" @click="queryData" icon="el-icon-search">查询</el-button>
          <el-button @click="resetData" icon="el-icon-refresh">重置</el-button>
        </div>
        <div class="input-div index-div2">
          <p class="hide-input" v-if="show" @click="inputShow()">
            更多条件
            <i class="el-icon-caret-bottom"></i>
          </p>
          <p class="hide-input" v-else @click="inputShow()">
            收起
            <i class="el-icon-caret-top"></i>
          </p>
          <div class="dialog-search-div">
            <compony-select :companyName.sync="companyName" class="el-col el-col-5"></compony-select>
            <department-select
              class="el-col el-col-5"
              :branchName.sync="branchName"
              :companyName="companyName"
              :labelName="'部门名称'"
            ></department-select>
            <!--供应商选择-->
            <supplier-select
              v-show="!searchOptions.payeeCompanyCode"
              class="el-col el-col-5"
              :supplier.sync="supplier"
            ></supplier-select>
            <el-col :span="5" class="el-col">
              <label>申请单号</label>
              <el-input v-model="payApplyCode" class="el-inputs" size="small" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>外部合同号</label>
              <el-input v-model="blNo" class="el-inputs" size="small" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="6" class="el-col">
              <label>创建日期</label>
              <el-date-picker
                class="el-inputs"
                style="width: 70%;"
                size="mini"
                v-model="createDate"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
          </div>
        </div>
        <div>
          <el-table
            class="el-table"
            border
            center
            :data="supplierList"
            :row-class-name="setRowIndex"
            @row-click="selectRow"
            v-loading="loading"
          >
            <el-table-column type="index" label="行号"></el-table-column>
            <el-table-column width="55" label="选择">
              <template scope="scope">
                <el-radio :label="scope.$index" v-model="radioIndex">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="payApplyCode" label="付款申请单号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="applyAmt" label="申请金额(本位币)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="currencyCode" label="币别" show-overflow-tooltip></el-table-column>
            <el-table-column prop="payeeName" show-overflow-tooltip label="收款单位"></el-table-column>
            <el-table-column prop="createdName" label="创建人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createdTime" label="创建时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.createdTime | time }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="updatedName" label="修改人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updatedTime" label="修改日" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.updatedTime | time }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="currentChange"
            @size-change="currentSize"
            :current-page="pageNum"
            :page-sizes="[100, 200, 300,500]"
            :page-size="pageSize"
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <div slot="footer" class="button-div2">
        <el-button type="primary" @click="confirm" icon="el-icon-check">确 定</el-button>
        <el-button @click="cancel" icon="el-icon-close">取 消</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import componySelect from "@/views/fundsManage/conponents/componySelect";
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect2";
import supplierSelect from "@/views/fundsManage/conponents/supplierSelect2";
import { getPaymentApplylistExt } from "@/api/paymentManage/demandForPayment";
export default {
  name: "demandPaymentModal",
  components: {
    componySelect,
    departmentSelect,
    supplierSelect
  },
  data() {
    return {
      show: true, //是否显示查询区域
      companyName: {}, //公司
      branchName: {}, //部门
      supplier:{}, //供应商
      payApplyCode: "", //付款申请单号
      blNo: "", //外部合同号
      createDate: "", //创建日期
      supplierList: [],
      radioIndex: null,
      radioRow: "",
      loading: false,
      pageNum: 1,
      pageSize:100,
      total: 0
    };
  },
  props: {
    tipShow: {
      type: Boolean
    },
    searchOptions: {
      type: Object,
      default: Object
    },
    applyStatusList:{
      type:Array
    }
  },
  created() {
    this.queryData();
  },
  mounted() {},
  methods: {
    //获取供应商信息列表
    queryData() {
      // let params = {
      //   companyCode: this.companyName.companyCode, //公司
      //   orgCode: this.branchName.branchCode, //部门
      //   payApplyCode: this.payApplyCode, //付款申请单号
      //   blNo: this.blNo, //业务单据编号
      //   applyStatus: 10460015 //只有审核状态下的付款申请单可选择
      // };
      let params =
        JSON.stringify(this.searchOptions) != "{}"
          ? this.searchOptions
          : {
              companyCode: this.companyName.companyCode,
              orgCode: this.branchName.orgCode,
              payeeCompanyCode:this.supplier.supplierCode
            };
      params.blNo = this.blNo;
      params.payApplyCode = this.payApplyCode;
      params.applyStatusList = this.applyStatusList;
      params.pageNum = this.pageNum;
      params.rows = this.pageSize;
      params.closeStatus=0;
      if (this.createDate) {
        params.startCreatedDate = this.createDate[0];
        params.endCreatedDate = this.createDate[1];
      } else {
        params.startCreatedDate = "";
        params.endCreatedDate = "";
      }
      this.radioIndex = null;
      this.radioRow = "";
      this.loading = true;
      getPaymentApplylistExt({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...params
      }).then(res => {
        this.supplierList = res.data;
        this.total = res.total;
        this.loading = false;
      });
    },
    //重置
    resetData() {
      this.companyName = {}; //公司
      this.branchName = {}; //部门
      this.payApplyCode = ""; //付款申请单号
      this.blNo = ""; //业务单据编号
      this.createDate = ""; //创建日期
    },
    //是否显示查询区域
    inputShow() {
      this.show = this.$dialogShowOne(this.show);
    },
    //初始化数据
    initData() {
      this.supplierCode = "";
      this.supplierName = "";
      this.radioIndex = null;
      this.radioRow = "";
      this.pageNum = 1;
      this.pageSize = 5;
    },
    //列表单选
    setRowIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },
    selectRow(row) {
      this.radioIndex = row.index;
      this.radioRow = row;
    },
    //翻页
    currentChange(val) {
      this.pageNum = val;
      this.queryData();
    },
    //单页数量
    currentSize(val) {
      this.pageSize = val;
      this.queryData();
    },
    //确定
    confirm() {
      if (this.radioRow.length == 0) {
        this.$openWarning("请选择要添加的数据");
        return;
      }
      this.$emit("demandPaymentSure", this.radioRow);
      this.initData();
    },
    //取消
    cancel() {
      this.$emit("demandPaymentCancle", false);
      this.initData();
    }
  },
  computed: {}
};
</script>
<style lang="scss">
.el-range-editor--mini .el-range__icon {
  line-height: 20px !important;
}
</style>
