<template>
  <!-- 公司列表 -->
  <div class="fiSettleApplyPopup" v-if="tipShow">
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
              v-show="!searchOptions.custCode && !searchOptions.supplierCode"
              class="el-col el-col-5"
              :branchName.sync="branchName"
              :companyName="companyName"
            ></department-select>
            <!-- 类型 -->
            <salesType-select :salesType.sync="salesType"></salesType-select>
            <coin-select
              v-show="!searchOptions.currencyCode"
              class="el-col el-col-5"
              :coin.sync="coin"
              :labelName="'锁汇币种'"
            ></coin-select>
            <el-col :span="5" class="el-col">
              <label>申请单据编号</label>
              <el-input v-model="settleApplyCode" class="el-inputs" size="small" placeholder="请输入"></el-input>
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
            <el-table-column prop="settleApplyCode" label="申请单据编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="companyName" show-overflow-tooltip label="公司"></el-table-column>
            <el-table-column prop="orgName" show-overflow-tooltip label="部门"></el-table-column>
            <el-table-column prop="salesType" show-overflow-tooltip label="类型">
              <template slot-scope="scope">
                <span>{{ scope.row.salesType===10720005?'购汇':'结汇' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="lockCurrencyCode" show-overflow-tooltip label="锁汇币别"></el-table-column>
            <el-table-column prop="lockAmt" show-overflow-tooltip label="锁汇金额"></el-table-column>
            <el-table-column prop="createdName" show-overflow-tooltip label="创建人"></el-table-column>
            <el-table-column prop="createdTime" show-overflow-tooltip label="创建时间">
              <template slot-scope="scope">
                <span>{{ scope.row.createdTime | time }}</span>
              </template>
            </el-table-column>
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
import salesTypeSelect from "@/views/fundsManage/conponents/salesTypeSelect";
import coinSelect from "@/views/fundsManage/conponents/coinSelect";
import { mapState } from "vuex";
import { getFiSettleApplyList } from "@/api/fiSettleManage/fiSettleApplyList";
export default {
  name: "fiSettleApplyPopup",
  components: {
    componySelect,
    departmentSelect,
    coinSelect,
    salesTypeSelect
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: {}, //部门
      coin: {}, //锁汇币种
      tableData: [], //表格
      selectioned: [], //表格选中项
      index: null, //选中index
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      salesType: "", //类型
      settleApplyCode: "", //申请单据编号
      createDate: "", //创建日期
      loading: false, //表格loading
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
  created() {
    //获取表格
    this.conList();
  },
  methods: {
    inputShow() {
      this.show = this.$dialogShowOne(this.show);
    },
    selectRow(row) {
      this.isRadio && this.$refs.multipleTable.clearSelection(); //单选的时候触发
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
      // companyCode: ``, //公司代码
      // companyName: ``, //公司名称
      // companyShort: ``, //公司简称
      let params =
        JSON.stringify(this.searchOptions) != "{}"
          ? this.searchOptions
          : {
              companyCode: this.companyName.companyCode,
              orgCode: this.branchName.orgCode,
              lockCurrencyCode: this.coin.currencyCode
            };
      params.pageNum = this.pageNum;
      params.rows = this.pageSize;
      params.salesType = this.salesType;
      params.settleApplyCode = this.settleApplyCode;
      params.salesStatus = 10730015; //已审核状态
      if (this.createDate) {
        params.createdTimeBegin = this.createDate[0];
        params.createdTimeEnd = this.createDate[1];
      } else {
        params.createdTimeBegin = "";
        params.createdTimeEnd = "";
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
      getFiSettleApplyList(postdata)
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
      this.settleApplyCode = "";
      this.salesType = "";
      this.companyName = {};
      this.branchName = {};
      this.coin = {};
      this.createDate = "";
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
  //companyId orgId  lockCurrencyCode
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
      .map(item => item["lockCurrencyCode"])
      .every(item => item === firstObj["lockCurrencyCode"])
  ) {
    this.$message({ message: "锁汇币种不一致,不能一起添加", type: "warning" });
    return false;
  }
  return true;
}
</script>
