<template>
  <!-- 公司列表 -->
  <div class="componySelect" v-if="tipShow">
    <el-dialog
      :visible.sync="tipShow"
      append-to-body
      title="选择列表"
      :show-close="false"
      :before-close="tipsCancle"
      width="1100px"
      class="popup_box "
    >
      <div class="index">
        <div class="button-div">
          <el-button
            class="query-button"
            @click="queryData"
            icon="el-icon-search"
            >查询</el-button
          >
          <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
        </div>
        <!-- 搜索 -->
        <div class="input-div">
          <el-form @keyup.enter.native="queryData">
            <div>
            <el-col :span="5" class="el-col">
              <label>公司代码</label>
              <el-input
                v-model="companyCode"
                class="el-inputs"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>公司名称</label
              ><el-input
                v-model="companyName"
                class="el-inputs"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>公司简称</label
              ><el-input
                v-model="companyShort"
                class="el-inputs"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col" v-show="!isInactiveStatus">
              <label>状态</label>
              <el-select
                v-model="isInactive"
                placeholder="请选择"
                :disabled="ztza"
              >
                <el-option
                  v-for="item in stateList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </div>
          </el-form>
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
            @row-click="rowClick"
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
            <el-table-column
              prop="companyCode"
              label="公司代码"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="companyName"
              label="公司名称"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="companyShort"
              label="公司简称"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="name" label="状态">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.isInactive ? "禁用" : "启用" }}
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
import Compony from "@/api/comdepartment/componySelect";
import { stringify } from "querystring";
export default {
  name: "componySelect",
  data() {
    return {
      ztza: false,
      tableData: [], //表格
      tableAssign: "", //表格深拷贝数据
      selectioned: null, //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      companyCode: ``, //公司代码
      companyName: ``, //公司名称
      companyShort: ``, //公司简称
      isInactive: "", //状态
      radio: false, //单选状态
      getData: ``, //单选数据
      stateList: [
        { value: 0, label: "启用" },
        { value: 1, label: "禁用" }
      ], //状态列表
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
    ztz: {
      curskin: defaultStatus
    },
    isInactiveS: {
      type: Boolean
    },
    isInactiveStatus: {
      type: Boolean
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
      this.$emit("tipsCancle");
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //确定
    tipsSure() {
      if (this.getData == ``) {
        this.$openWarning("请选择数据");
        return false;
      }
      this.$emit("tipsSure", this.getData);
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //获取表格
    conList() {
      if (this.isInactiveS == true) {
        this.isInactive = "0";
      }
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        companyName: this.companyName,
        companyCode: this.companyCode,
        companyShort: this.companyShort,
        isInactive: this.isInactive
      };
      Compony.componyList(params)
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
      this.pageNum = 1;
      this.conList();
    },
    //清空选项
    clearNone() {
      this.companyName = ``;
      this.companyCode = ``;
      this.companyShort = ``;
      this.isInactive = ``;
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.radio = false;
      this.getData = ``;
      this.conList();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.radio = false;
      this.getData = ``;
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
    },

    ztz: {
      handler(newval, oldval) {
        if (newval === 0) {
          this.isInactive = newval;
          this.ztza = true;
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss"></style>
