<template>
  <!-- 公司列表 -->
  <div class="extOdDoPopup" v-if="tipShow">
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
          <p class="hide-input" v-if="show" @click="inputShow()">更多条件 <i class="el-icon-caret-bottom"></i></p>
            <p class="hide-input" v-else @click="inputShow()">收起<i class="el-icon-caret-top"></i></p>
          <div class="dialog-search-div">
            <el-col :span="5" class="el-col">
              <label>出库单号</label>
              <el-input v-model="doNo" class="el-inputs" size="small" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>销售合同号</label>
              <el-input v-model="contractCode" class="el-inputs" size="small" placeholder="请输入"></el-input>
            </el-col>
            <!--公司选择-->
            <compony-select
              v-show="!searchOptions.companyCode"
              class="el-col el-col-5"
              :companyName.sync="companyName"
              :labelName="'公司'"
            ></compony-select>
            <!--部门选择-->
            <department-select
              v-show="!searchOptions.orgCode"
              class="el-col el-col-5"
              :branchName.sync="branchName"
              :companyName="companyName"
            ></department-select>
            <!--客户选择-->
            <!-- 客户选择 -->
            <customer-select
              v-show="!searchOptions.custCode"
              class="el-col el-col-5"
              :customer.sync="customer"
              :supplier="supplier"
            ></customer-select>
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
            <el-table-column prop="orgName" label="部门" show-overflow-tooltip></el-table-column>
            <el-table-column prop="custName" label="客户" show-overflow-tooltip></el-table-column>
            <el-table-column prop="doNo" label="出库单号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="contractCode" label="销售合同号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="currencyCode" label="业务币别" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sumAmtVat" label="出库金额" show-overflow-tooltip></el-table-column>
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
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect";
import customerSelect from "@/views/fundsManage/conponents/customerSelect";
import api from "@/api/component";
export default {
  name: "extOdDoPopup",
  components: {
    componySelect,
    departmentSelect,
    customerSelect,
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: {}, //部门
      customer: {}, //客户
      supplier: {}, //供应商
      tableData: [], //表格
      selectioned: [], //表格选中项
      index: null, //选中index
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      doNo: "", //出库单号
      contractCode: "", //销售合同号
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
    inputShow() {
     this.show=this.$dialogShowOne(this.show);
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
    //选择数据
    handleSelectionChange(val) {
      this.selectioned = val;
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
      // custName: "", //客户名称
      // custCode: "", //客户代码
      // companyCode: ``, //公司代码
      // orgName 部门名称
      // orgCode 部门代码
      let params =
        JSON.stringify(this.searchOptions) != "{}"
          ? this.searchOptions
          : {
              companyCode: this.companyName.companyCode,
              orgCode: this.branchName.orgCode,
              custCode: this.customer.customerCode
            };
      params.pageNum = this.pageNum;
      params.rows = this.pageSize;
      params.doNo = this.doNo;
      params.contractCode = this.contractCode;
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
      api
        .extOdDoPopup(postdata)
        .then(res => {
          this.loading = false;
          this.tableData = res.data.list;
          this.total = res.data.total;
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
      this.customer = {};
    },
    //翻页
    currentChange(e) {
      this.selectioned = [];
      this.pageNum = e;
      this.conList();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.selectioned = [];
      this.pageSize = e;
      this.conList();
    },
    //表格选择
    handleChange(e) {
      if (e.length === 0) {
        this.selectioned = null;
      }
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
    !array.map(item => item["orgId"]).every(item => item === firstObj["orgId"])
  ) {
    this.$message({ message: "部门不一致,不能一起添加", type: "warning" });
    return false;
  }
  if (
    !array
      .map(item => item["custId"])
      .every(item => item === firstObj["custId"])
  ) {
    this.$message({ message: "客户不一致,不能一起添加", type: "warning" });
    return false;
  }
  return true;
}
</script>
