<template>
  <!-- 信用证列表 -->
  <div class="letterCreditPopup" v-if="tipShow">
    <el-dialog
      :visible.sync="tipShow"
      append-to-body
      title="选择列表"
      :show-close="false"
      :before-close="tipsCancle"
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
          <p class="hide-input" v-if="show" @click="inputShow()">
            更多条件
            <i class="el-icon-caret-bottom"></i>
          </p>
          <p class="hide-input" v-else @click="inputShow()">
            收起
            <i class="el-icon-caret-top"></i>
          </p>
          <div class="dialog-search-div">
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
            <!--供应商选择-->
            <supplier-select
              v-show="!searchOptions.supplierCode"
              class="el-col el-col-5"
              :supplier.sync="supplier"
            ></supplier-select>
            <coin-select
              v-show="!searchOptions.currencyCode"
              class="el-col el-col-5"
              :coin.sync="coin"
              :labelName="'业务币别'"
            ></coin-select>
            <el-col :span="5" class="el-col">
              <label>申请单号</label>
              <el-input v-model="applyCode" class="el-inputs" size="small" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>信用证号</label>
              <el-input v-model="lcNo" class="el-inputs" size="small" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="8" class="el-col">
              <label>创建日期</label>
              <el-date-picker
                class="el-inputs"
                style="width: 278px;"
                size="mini"
                v-model="createDate"
                format="yyyy 年 MM 月 dd 日"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
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
            <el-table-column prop="applyCode" label="申请单号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lcNo" label="信用证号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lcAmt" label="开证金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="currencyCode" label="业务币种" show-overflow-tooltip></el-table-column>
            <el-table-column prop="companyName" label="公司" show-overflow-tooltip></el-table-column>
            <el-table-column prop="orgName" label="部门" show-overflow-tooltip></el-table-column>
            <el-table-column prop="supplierName" label="供应商" show-overflow-tooltip></el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
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
        <el-button type="primary" @click="tipsSure()" icon="el-icon-check">确 定</el-button>
        <el-button @click="tipsCancle()" icon="el-icon-close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import componySelect from "@/views/fundsManage/conponents/componySelect";
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect";
import supplierSelect from "@/views/fundsManage/conponents/supplierSelect";
import coinSelect from "@/views/fundsManage/conponents/coinSelect";
import api from "@/api/component";
export default {
  name: "letterCreditPopup",
  components: {
    componySelect,
    departmentSelect,
    coinSelect,
    supplierSelect
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: {}, //部门
      customer: {}, //客户
      supplier: {}, //供应商
      coin: {}, //业务币种
      tableData: [], //表格
      selectioned: [], //表格选中项
      index: null, //选中index
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      applyCode: "", //申请单号
      lcNo: "", //信用证号
      createDate: "", //创建日期
      loading: true, //表格loading
      radioIndex: "",
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      show: true
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
  created() {
    //获取表格
    this.conList();
  },
  methods: {
    inputShow() {
      this.show = this.$dialogShowOne(this.show);
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
        this.$emit("tipsSure", this.selectioned);
      }
      this.selectioned = [];
      this.clearNone();
    },
    //获取表格
    conList() {
      //  applyCode: "", //申请单号
      // lcNo: "", //信用证号
      let params =
        JSON.stringify(this.searchOptions) != "{}"
          ? this.searchOptions
          : {
              pageNum: this.pageNum,
              rows: this.pageSize,
              companyCode: this.companyName.companyCode,
              orgCode: this.branchName.orgCode,
              supplierCode: this.supplier.supplierCode,
              currencyCode: this.coin.currencyCode
            };
      params.pageNum = this.pageNum;
      params.rows = this.pageSize;
      params.applyCode = this.applyCode;
      params.lcNo = this.lcNo;
      if (this.createDate) {
        params.fromCreatedTime = this.createDate[0];
        params.toCreatedTime = this.createDate[1];
      } else {
        params.fromCreatedTime = "";
        params.toCreatedTime = "";
      }
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
        .letterCreditPopup(postdata)
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
      this.applyCode='';
      this.lcNo='';
      this.companyName = {};
      this.branchName = {};
      this.supplier = {};
      this.createDate = "";
      this.coin = {};
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
  }
};
function validatasSelectioned(array, keys) {
  //companyId orgId supplierId originCurrencyCode
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
      .map(item => item["supplierId"])
      .every(item => item === firstObj["supplierId"])
  ) {
    this.$message({ message: "供应商不一致,不能一起添加", type: "warning" });
    return false;
  }
  if (
    !array
      .map(item => item["currencyCode"])
      .every(item => item === firstObj["currencyCode"])
  ) {
    this.$message({ message: "业务币种不一致,不能一起添加", type: "warning" });
    return false;
  }
  return true;
}
</script>