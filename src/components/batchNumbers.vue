<template>
  <!-- 批次号(非明细) -->
  <div class="departmentSelect" v-if="tipShow">
    <el-dialog
      :visible.sync="tipShow"
      title="选择列表"
      :show-close="false"
      :before-close="tipsCancle"
      width="1100px"
      class="popup_box"
    >
      <div class="index">
        <div class="button-div">
          <el-button
            class="query-button"
            icon="el-icon-search"
            @click="queryData"
            >查询
          </el-button>
          <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
        </div>
        <!-- 搜索 -->
        <div class="input-div">
          <div>
            <el-col :span="6" class="el-col">
              <label>物料编码</label>
              <el-input
                v-model="data.skuCode"
                class="el-inputs"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="6" class="el-col">
              <label>批次号</label>
              <el-input v-model="batchCode" class="el-inputs"></el-input>
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
            v-loading="loading"
            @row-click='rowClick'
            :row-class-name="tableRowClassName"
          >
            <el-table-column width="55" label="">
              <template scope="scope">
                <el-radio
                  :label="scope.$index"
                  v-model="radio"
                  @change="radiochange(scope.row)"
                >
                  &nbsp;
                </el-radio>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="batchInvTime"
              label="入库日期"
              show-overflow-tooltip
            >
            </el-table-column> -->
            <el-table-column
              prop="batchCode"
              label="批次"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="packageCode"
              label="捆包号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="invPrice"
              label="成本单价"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="warehouseName"
              label="仓库"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="invQtyS"
              label="库存数量"
              width="100"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
          <!--分页background-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[100, 200, 300,500]"
            :page-size="rows"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
      <slot></slot>
      <div class="button-div2">
        <el-button type="primary" @click="tipsSure()" icon="el-icon-check"
          >确 定</el-button
        >
        <el-button @click="tipsCancle()" icon="el-icon-close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { service, serviceJson } from "@/axios/index.js";
import { batchNumbers } from "@/api/stockBranch/otherware.js";
export default {
  data() {
    return {
      tableData: [], //表格
      batchCode: "", //批次号
      tableAssign: "", //表格深拷贝数据
      selectioned: null, //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      page: null, //总页数
      pageNum: 1, //页码数
      rows: 100, //每页条数
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
    data: {
      type: Object
    }
  },
  created() {
    //获取表格
    this.conList();
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
    //选择数据
    radiochange(e) {
      this.getData = e;
    },
    //关闭
    tipsCancle() {
      this.$emit("batchnumberCancle");
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //确定
    tipsSure() {
      console.log(this.getData);
      this.$emit("batchnumberSure", this.getData);
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //获取表格
    conList() {
      console.log(this.data.skuCode);
      batchNumbers({
        skuCode: this.data.skuCode,
        pageNum: this.pageNum,
        pageSize: this.rows,
        batchCode: this.batchCode,
        warehouseCode: this.data.warehouseCode,
        companyCode:this.data.companyCode,
        orgCode:this.data.branchCode,
      }).then(res => {
        if (res.code === "success") {
          console.log(res);
          console.log(res.data);
          this.tableData = res.data;
          this.loading = false;
          this.total = res.total;
          this.tableData.forEach(i => {
            i.batchInvTime = this.$timeFun(i.batchInvTime, true);
          });
        }
      });
    },
    //查询
    queryData() {
      this.conList();
    },
    //清空选项
    clearNone() {},
    //翻页
    handleCurrentChange(val) {
      this.radio = false;
      this.getData = ``;
      this.pageNum = val;
      this.conList();
    },
    //更改每页条数
    handleSizeChange(val) {
      this.radio = false;
      this.getData = ``;
      this.rows = val;
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
  }
};
</script>

<style lang="scss"></style>
