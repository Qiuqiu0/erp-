<template>
  <!-- 项目列表 -->
  <div class="projectSelect" v-if="tipShow">
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
          <div>
            <el-col :span="5" class="el-col">
              <label>采购合同号</label>
              <el-input v-model="contractNo" disabled class="el-inputs" placeholder="请输入"></el-input>
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
            @row-click="rowClick"
            :row-class-name="tableRowClassName"
            v-loading="loading"
          >
            <el-table-column width="55" label>
              <template scope="scope">
                <el-radio
                  :label="scope.$index"
                  v-model="radio"
                  @change="radiochange(scope.row)"
                >&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="sysBlNo" label="系统提单号" width="140px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bizBlNo" label="提单号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="companyName" label="公司" show-overflow-tooltip></el-table-column>
            <el-table-column prop="orgName" label="部门" show-overflow-tooltip></el-table-column>
            <el-table-column prop="supplierName" label="供应商" show-overflow-tooltip></el-table-column>
            <el-table-column prop="projectType" label="单据状态" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>
                  <span v-if="scope.row.blStatus == 10110005">已保存</span>
                  <span v-else-if="scope.row.blStatus == 10110010">已到单</span>
                  <span v-else-if="scope.row.blStatus == 10110013">已到港</span>
                  <span v-else-if="scope.row.blStatus == 10110015">审批中</span>
                  <span v-else-if="scope.row.blStatus == 10110020">已用印</span>
                  <span v-else-if="scope.row.blStatus == 10110025">已清关</span>
                  <span v-else-if="scope.row.blStatus == 10110030">已关闭</span>
                </div>
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
        <el-button type="primary" @click="tipsSure()" icon="el-icon-check">确 定</el-button>
        <el-button @click="tipsCancle()" icon="el-icon-close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "@/api/component";
export default {
  name: "purchaseBillPopup",
  data() {
    return {
      tableData: [], //表格
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      // contractNo: ``, //采购合同号
      radio: false, //单选状态
      getData: ``, //单选数据
      loading: true, //表格loading
      show: true
    };
  },
  props: {
    tipShow: {
      type: Boolean
    },
    contractNo:{
      require:true,
      type:String,
      default:""
    }
  },
  created() {
    //获取表格
    this.conList();
  },
  methods: {
    //选择数据
    radiochange(e) {
      this.getData = e;
    },
    //关闭
    tipsCancle() {
      this.$emit("tipsCancle");
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //确定
    tipsSure() {
      this.$emit("tipsSure", this.getData);
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //获取表格
    conList() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        blStatus: 10110025,
        contractNo: this.contractNo
      };
      api
        .purchaseBillPopup(params)
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
      // this.contractNo = ``;
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
    },
    //表格单选
    dialogCheck(selection, row) {
      this.$refs.multipleTable.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectioned = row;
        this.index = this.tableData.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
    //单行点击
    rowClick(e) {
      this.radio = e.index;
      this.getData = e;
    }
  }
};
</script>
<style lang="scss"></style>
