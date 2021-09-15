<template>
  <!-- 公司列表 -->
  <div class="fiPaymentBillPopup" v-if="tipShow">
    <el-dialog
      :visible.sync="tipShow"
      title="选择列表"
      :show-close="false"
      :before-close="tipsCancle"
      append-to-body
      width="1100px"
      class="popup_box"
    >
      <div class="index">
        <div class="button-div">
          <el-button class="query-button" @click="queryData" icon="el-icon-search">查询</el-button>
          <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
        </div>
        <!-- 搜索 -->
        <div class="input-div">
          <div>
            <el-col :span="5" class="el-col">
              <label>票据号</label>
              <el-input v-model="instrumentNo" class="el-inputs" size="small" placeholder="请输入"></el-input>
            </el-col>
            <!-- 票据类型 -->
            <invoice-type-select :invoiceType.sync="invoiceType" :disable="disableInvoiceType" ></invoice-type-select>
            <!--公司选择-->
            <compony-select
              v-show="!searchOptions.companyCode"
              class="el-col el-col-5"
              :companyName.sync="companyName"
              :labelName="'公司'"
            ></compony-select>
            <!--供应商选择-->
            <supplier-select
              v-show="!searchOptions.receiptByCode"
              class="el-col el-col-5"
              :supplier.sync="supplier"
            ></supplier-select>
          </div>
        </div>
        <!-- 表格 -->
        <el-divider></el-divider>
        <div class="el-table-div">
          <el-table
            border
            center
            :data="tableData"
            class="el-table"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            :row-class-name="setRowIndex"
            @row-click="selectRow"
            v-loading="loading"
          >
            <el-table-column type="selection" v-if="!isRadio" width="55"></el-table-column>
            <el-table-column width="55" v-if="isRadio">
              <template scope="scope">
                <el-radio
                  :label="scope.$index"
                  @change="radioChangeHandle"
                  v-model="radioIndex"
                >&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="companyName" label="公司" show-overflow-tooltip></el-table-column>
            <el-table-column prop="receiptByName" label="供应商" show-overflow-tooltip></el-table-column>
            <el-table-column prop="instrumentBillNo" label="票据台账编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="instrumentNo" label="票据号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="currencyCode" label="币别" show-overflow-tooltip></el-table-column>
            <el-table-column prop="billAmt" label="票据金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bankMarginRatio" label="保证金比率" show-overflow-tooltip></el-table-column>
          </el-table>
          <!--分页background-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="currentChange"
            :current-page="pageNum"
            :page-sizes="[100, 200, 300,500]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <slot></slot>
      <div class="button-div2">
        <el-button @click="tipsSure()" icon="el-icon-check" type="primary">确 定</el-button>
        <el-button @click="tipsCancle()" icon="el-icon-close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import componySelect from "@/views/fundsManage/conponents/componySelect";
import supplierSelect from "@/views/fundsManage/conponents/supplierSelect";
import invoiceTypeSelect from "@/views/fundsManage/conponents/invoiceTypeSelect";
import api from "@/api/component";
export default {
  name: "fiPaymentBillPopup",
  components: {
    componySelect,
    supplierSelect,
    invoiceTypeSelect
  },
  data() {
    return {
      companyName: {}, //公司
      customer: {}, //客户
      supplier: {}, //供应商
      tableData: [], //表格
      selectioned: [], //表格选中项
      index: null, //选中index
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      instrumentNo: "", //票据号
      invoiceType: "", //票据类型
      createDate: "", //创建日期
      loading: false, //表格loading
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      show: true,
      radioIndex: ""
    };
  },
  props: {
    tipShow: {
      type: Boolean
    },
    isRadio: {
      type: Boolean,
      default: false
    },
    searchOptions: {
      type: Object,
      default: Object
    }
  },
  mounted() {
    //获取表格
    this.conList();
  },
  methods: {
    //选择数据
    handleSelectionChange(val) {
      this.selectioned = val;
    },
    selectRow(row) {
      this.isRadio&&this.$refs.multipleTable.clearSelection();//单选的时候触发
      this.$refs.multipleTable.toggleRowSelection(row, true);
      this.radioIndex = row.index;
    },
    //列表单选
    setRowIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },
    //单选选择数据
    radioChangeHandle(index) {
      this.selectioned = [this.tableData[index]];
    },
    //关闭
    tipsCancle() {
      this.$emit("tipsCancle");
      this.selectioned = [];
      this.clearNone();
    },
    //确定
    tipsSure() {
      if (this.selectioned.length > 1) {
        if (!validatasSelectioned.call(this, this.selectioned)) return;
        this.$emit("tipsSure", this.selectioned);
      } else if (this.selectioned.length == 0) {
        this.$message({ message: "未选择单据", type: "warning" });
      } else {
        this.$emit("tipsSure", this.selectioned[0]);
      }
      this.selectioned = [];
      this.clearNone();
    },
    //获取表格
    conList() {
      // receiptByName: "", //供应商名称
      // receiptByCode: "", //供应商代码
      // companyCode: ``, //公司代码
      let params =
        JSON.stringify(this.searchOptions) != "{}"
          ? this.searchOptions
          : {
              companyCode: this.companyName.companyCode,
              receiptByCode: this.supplier.supplierCode,
              currencyCode: this.coin.currencyCode,
              invoiceType: this.invoiceType
            };
      params.pageNum = this.pageNum;
      params.rows = this.pageSize;
      params.instrumentNo = this.instrumentNo;
      let postdata = {};
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          if (params[key]) {
            postdata[key] = params[key];
          } else {
            continue;
          }
        }
      }
      this.loading = true;
      api
        .fiPaymentBillPopup(postdata)
        .then(res => {
          this.loading = false;
          this.tableData = res.data;
          this.total = res.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //查询
    queryData() {
      this.conList();
    },
    //清空选项
    clearNone() {
      this.instrumentNo = "";
      this.instrumentType = "";
      this.companyName = {};
      this.supplier = {};
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.conList();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.conList();
    },
    //表格选择
    handleChange(e) {
      if (e.length === 0) {
        this.selectioned = null;
      }
    }
  },
  watch: {
    searchOptions: {
      handler(val) {
        if (JSON.stringify(val) != "{}") {
          this.invoiceType = val.invoiceType ?val.invoiceType : "";
          this.disableInvoiceType = val.invoiceType ? true : false;
        }
      },
      immediate: true
    }
  }
};
function validatasSelectioned(array, keys) {
  //companyId orgId custId supplierId originCurrencyCode
  let firstObj = array[0];
  if (
    !array
      .map(item => item["companyId"])
      .every(item => item === firstObj["companyId"])
  ) {
    this.$message({ message: "公司不一致,不能一起添加", type: "warning" });
    return false;
  }
  if (
    !array
      .map(item => item["receiptByCode"])
      .every(item => item === firstObj["receiptByCode"])
  ) {
    this.$message({ message: "供应商不一致，不能一起添加", type: "warning" });
    return false;
  }
  return true;
}
</script>
