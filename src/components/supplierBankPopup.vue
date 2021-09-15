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
      <div class="index">
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
            <el-table-column prop="countryName" label="国家" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bankCode" label="银行编码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bankName" label="银行名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bankAccount" label="银行账号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bankAddress" label="银行地址" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isMakeInvoice" label="是否是开票银行" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>
                  {{scope.row.isMakeInvoice===0?'否':"是"}}
                </span>
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
  name: "supplierBankPopup",
  data() {
    return {
      tableData: [], //表格
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      radio: false, //单选状态
      getData: ``, //单选数据
      loading: true, //表格loading
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerClose: {},
      show: true
    };
  },
  props: {
    tipShow: {
      type: Boolean
    },
    supplierId: {
      type: String
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
      if (this.getData == ``) {
        this.$openWarning("请选择要添加的数据");
        return;
      }
      this.$emit("tipsSure", this.getData);
      this.radio = false;
      this.getData = ``;
    },
    //获取表格
    conList() {
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        supplierId: this.supplierId
      };
      api
        .supplierBankPopup(params)
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
    //单行点击
    rowClick(e) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e, true);
      this.radio = this.tableData.indexOf(e);
      this.getData = e;
    }
  }
};
</script>

<style lang="scss">
</style>
