<template>
  <!-- 公司列表 -->
  <div class="agreeSelect" v-if="tipShow">
    <el-dialog
      :visible.sync="tipShow"
      title="选择列表"
      :show-close="false"
      :before-close="tipsCancle"
      width="1150px"
      class="popup_box"
    >
      <div class="index">
        <!-- 搜索 -->
        <div class="button-div">
          <el-button
            class="query-button"
            icon=" el-icon-search"
            @click="queryData"
            >查询</el-button
          >
          <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
        </div>
        <div class="input-div">
          <!-- <p class="hide-input" v-if="show" @click="inputShow()">
            更多条件 <i class="el-icon-caret-bottom"></i>
          </p>
          <p class="hide-input" v-else @click="inputShow()">
            收起<i class="el-icon-caret-top"></i>
          </p> -->
          <el-form @keyup.enter.native="queryData">
          <div class="dialog-search-div">
            <el-col :span="5" class="el-col">
              <label>协议号</label>
              <el-input
                v-model="fwContractNo"
                class="el-inputs"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>外部合同号</label
              ><el-input
                v-model="extCode"
                class="el-inputs"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <!-- <el-col :span="5" class="el-col">
              <label>公司简称</label><el-input v-model="companyShort" class="el-inputs" placeholder="请输入"></el-input>
            </el-col> -->
            <el-col :span="5" class="el-col">
              <label>状态</label>
              <el-select v-model="contractStatus" placeholder="请选择" disabled>
                <el-option
                  v-for="item in isInaType"
                  :key="item.dict_code"
                  :label="item.dict_value"
                  :value="item.dict_code"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>所属公司</label
              ><el-input
                v-model="companyName.companyName"
                class="el-inputs"
                disabled
              ></el-input>
            </el-col>
          </div>
          </el-form>
        </div>
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
              prop="contractNo"
              label="协议号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="extCode"
              label="外部合同号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="custName" label="客户" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="supplierName"
              label="供应商"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="isInactive" label="状态">
              <template slot-scope="scope">
                <div>
                  已生效
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="companyName"
              label="所属公司"
              show-overflow-tooltip
            >
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
export default {
  name: "agreeSelect",
  data() {
    return {
      tableData: [], //表格
      tableAssign: "", //表格深拷贝数据
      selectioned: null, //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      fwContractNo: ``,
      companyCode: ``, //公司代码
      companyShort: ``, //公司简称
      isInactive: 0, //状态
      extCode: ``, //外部合同号
      contractStatus: "10130015", //协议状态
      isInaType: [],
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
    contractCat: {},
    companyName: {
      type: Object,
      required: false
    }
  },
  created() {
    //获取表格
    this.conList();
    this.htzt();
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
    inputShow() {
      this.show = this.$dialogShowOne(this.show);
    },
    //获取合同状态
    htzt() {
      Compony.htzt()
        .then(res => {
          this.isInaType = res.data;
        })
        .catch();
    },
    //选择数据
    radiochange(e) {
      this.getData = e;
    },
    //关闭
    tipsCancle() {
      this.$emit("agreeCancle");
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //确定
    tipsSure() {
      this.$emit("agreeSure", this.getData);
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //获取表格
    conList() {
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        companyName: this.companyName.companyName,
        companyId: this.companyName.companyId,
        contractNo: this.fwContractNo,
        extCode: this.extCode,
        contractStatus: 10130015,
        contractCat: this.contractCat
      };
      Object.keys(params).forEach(key => {
        if (params[key] == `` || params[key] == `undefined`) {
          delete params[key];
        }
      });
      Compony.fwList(params)
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
      this.extCode = ``;
      this.fwContractNo = ``;
    },
    //翻页
    currentChange(e) {
      this.radio = false;
      this.getData = ``;
      this.pageNum = e;
      this.conList();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.radio = false;
      this.getData = ``;
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

<style lang="scss">
.agreeSelect {
  .el_flex {
    display: flex;
    align-items: center;
  }
  .el-date-editor.el-input {
    width: auto;
  }
}
</style>
