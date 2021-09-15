<template>
  <!-- 业务币种列表 -->
  <div class="coinSelect" v-if="tipShow">
    <el-dialog
      :visible.sync="tipShow"
      title="选择列表"
      append-to-body
      :show-close="false"
      :before-close="tipsCancle"
      width="1100px"
      class="popup_box"
    >
      <div class>
        <!-- 表格 -->
        <div class="el-table-div">
          <el-table
            border
            center
            :data="tableData"
            class="el-table"
            ref="multipleTable"
            v-loading="loading"
            @row-click="rowClick"
            :row-class-name="tableRowClassName"
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
            <el-table-column prop="soNo" v-if="documentType==10540015" label="销售订单号"></el-table-column>
            <el-table-column prop="poNo" v-if="documentType==10540010" label="采购订单号"></el-table-column>
            <el-table-column prop="contractNoS" v-if="documentType==10540005" label="框架协议"></el-table-column>
            <el-table-column prop="erpCostsCode" v-if="documentType==10540020" label="费用编码"></el-table-column>
            <el-table-column prop="extContractNo" label="外部合同号"></el-table-column>
            <el-table-column prop="itemApplyAmt" label="申请付款金额（业务币）"></el-table-column>
            <el-table-column prop="contractAmt" v-if="documentType!=10540020" label="合同金额"></el-table-column>
            <el-table-column prop="contractAmt" v-if="documentType==10540020" label="费用金额"></el-table-column>
            <el-table-column prop="moneyContent" label="款项内容" width="100">
              <template slot-scope="scope">
                <div>{{ crashContentObj[scope.row.moneyContent] }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="projectCode" label="项目编号"></el-table-column>
            <el-table-column prop="projectName" label="项目名称"></el-table-column>
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
      <div slot="footer" class="button-div2">
        <el-button type="primary" @click="tipsSure()">确 定</el-button>
        <el-button @click="tipsCancle()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getPaymentItemDetail } from "@/api/paymentManage/applyPaymentDetail";
import { crashContentObj } from "../dictionary";
export default {
  name: "paymentItemModal",
  data() {
    return {
      crashContentObj,
      tableData: [], //表格
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
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
    payApplyCode: {
      required: true,
      type: String,
      default: ""
    },
    documentType: {
      required: true,
      type: Number | String
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
    },
    //确定
    tipsSure() {
      this.$emit("tipsSure", this.getData);
      this.radio = false;
      this.getData = ``;
    },
    //获取表格
    conList() {
      let params = {
        payApplyCode: this.payApplyCode,
        pageNum: this.pageNum,
        rows: this.pageSize
      };
      this.loading = true;
      getPaymentItemDetail(params)
        .then(res => {
          this.loading = false;
          this.tableData = res.data;
          this.total = res.total;
        })
        .catch(() => {
          this.loading = false;
        });
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
     tableRowClassName({row, rowIndex}) {
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
