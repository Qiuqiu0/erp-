<template>
<!-- 人员信息列表 -->
  <div class="manSelect" v-if="tipShow">
    <el-dialog :visible.sync="tipShow" title="选择列表" :show-close=false :before-close="tipsCancle" width="1100px" class="popup_box">
      <div class="index">
         <div class="button-div">
            <el-button class="query-button"  icon="el-icon-search"   @click="queryData">查询</el-button>
            <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
          </div>
				<!-- 搜索 -->
        <div class="input-div">
          <div>
            <el-col :span="5" class="el-col">
              <label>业务员</label><el-input v-model="empName" class="el-inputs" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>所属公司</label><el-input v-model="empName" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>所属部门</label><el-input v-model="empName" class="el-inputs" disabled></el-input>
            </el-col>
          </div>
        </div>
        <!-- 表格 -->
        <el-divider></el-divider>
          <div class="el-table-div">
            <el-table border center :data="tableData" class="el-table" ref="multipleTable"
            @row-click="rowClick"
            :row-class-name="tableRowClassName"
            v-loading="loading">
            <el-table-column width="55" label="">
                <template scope="scope">
                    <el-radio :label="scope.$index" v-model="radio" @change="radiochange(scope.row)">
                        &nbsp;
                    </el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="empName" label="业务员" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="companyName" label="所属公司" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="branchName" label="所属部门" show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <!--分页background-->
            <el-pagination
            background
              @size-change="handleSizeChange" @current-change="currentChange"
                :current-page="pageNum" :page-sizes="[100, 200, 300,500]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
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
import { mapState } from "vuex";
import Compony from "@/api/comdepartment/componySelect";
export default {
  name: "manSelect",
  data() {
    return {
      tableData: [], //表格
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      empName: ``, //员工名称
      branchName: ``, //部门名称
      isInactive: ``, //状态
      radio: false, //单选状态
      getData: ``, //单选数据
      stateList: [{ value: 0, label: "启用" }, { value: 1, label: "禁用" }], //状态列表
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
      this.$emit("manCancle");
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //确定
    tipsSure() {
      this.$emit("manSure", this.getData);
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //获取表格
    conList() {
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        isInactive:0
        // companyId: this.data.companyId,
        // branchName: this.data.branchName,
        // empName: this.empName,
        // isInactive: this.isInactive
      };
      Compony.empList(params)
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
      this.empName = ``;
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
    tableRowClassName({row, rowIndex}) {
      row.index = rowIndex;
    },
    //单行点击
    rowClick(e) {
      this.radio = e.index;
      this.getData = e;
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
</style>
