<template>
  <div class="createFrame content-div2">
    <div class="button-div auto-sibling">
      <el-button class="query-button" icon="el-icon-search" @click="searchFun">查询</el-button>
      <el-button class="query-button" icon="el-icon-refresh" @click="resetFun">重置</el-button>
    </div>
    <!-- 搜索 -->
    <div class="input-div input-div-bor auto-sibling">
      <!-- <div class="table_title">基本信息</div> -->
      <div id="loadingTarget">
        <el-col :span="5" class="el-col">
          <label>公司</label>
          <el-input class="el-inputs" placeholder="请选择" disabled v-model="companyName"></el-input>
          <span class="comicon" @click="componyTip">
            <i class="el-icon-search"></i>
          </span>
        </el-col>
      </div>
    </div>
    <!--按钮样式-->
    <div class="button-div auto-sibling">
      <el-button class="query-button" icon="el-icon-s-check" @click="handleCompanyCarry(0)">结转</el-button>
      <!-- <el-button class="query-button"
                 icon="el-icon-time"
      @click="handleCompanyCarry(1)">提前结转</el-button>-->
      <el-button
        class="query-button"
        icon="el-icon-circle-check"
        @click="handleAccountState(0)"
      >允许上期记账</el-button>
      <el-button
        class="query-button"
        icon="el-icon-circle-close"
        @click="handleAccountState(1)"
      >禁止上期记账</el-button>
    </div>
    <!-- 商品信息 -->
    <div class="el-table-div input-div-bor bortop0" v-auto>
      <el-table
        border
        center
        :data="tableData"
        height="100%"
        class="el-table"
        empty-text="请先选择公司"
        @select-all="handleFormSelected"
        @selection-change="handleChange" 
        @row-click="rowClick"
        ref="multipleTable"
        v-loading="loading"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="companyName" label="公司" show-overflow-tooltip></el-table-column>
        <el-table-column prop="accountingMonth" label="当前期间" show-overflow-tooltip width="120px"></el-table-column>
        <el-table-column type="date" prop="balanceDate" label="结转日期" show-overflow-tooltip>
          <template scope="scope">
            <div>{{ scope.row.balanceDate|time}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="canReverseBalance" label="允许上期记账" show-overflow-tooltip>
          <template scope="scope">
            <div>{{ scope.row.canReverseBalance=="0"?"是":"否"}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="balanceBy" label="转结人" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <!-- 选择公司弹窗 -->
    <compony-select
      v-if="componyShow"
      :tipShow="componyShow"
      @tipsCancle="tipsCancle"
      @tipsSure="tipsSure"
    ></compony-select>
    <!--冲销弹窗-->
    <el-dialog
      v-if="carryShow"
      :visible.sync="carryShow"
      width="400px"
      append-to-body
      :show-close="false"
    >
      <span slot="title" class="el-dialog__title" v-if="selectioned">即将正常结转，是否继续？</span>
      <el-form :model="selectioned" :rules="rules" label-width="100px" ref="carryForm">
        <el-form-item label="结转日期" prop="balanceDate">
          <el-date-picker
            class="el-inputs"
            size="mini"
            v-model="selectioned.balanceDate"
            type="date"
            placeholder="年/月/日"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="button-div2">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-check"
          @click="submitCarry('carryForm')"
        >确定</el-button>
        <el-button size="small" icon="el-icon-close" @click="carryShow = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import componySelect from "@/components/componySelect.vue";
import {
  carryFiCompany,
  selectFiCompanyList,
  updateAccountState
} from "@/api/monthlyStatement/monthlyStatementPage";
export default {
  name:"monthlyStatementPage",
  // import引入的组件需要注入到对象中才能使用
  components: {
    componySelect
  },
  data() {
    // 这里存放数据
    return {
      componyShow: false,
      loading: false,
      carryShow: false,
      tableData: [],
      companyName: "",
      companyId: "",
      index: null, //选中数据索引
      selectedList: [], //选中数据
      selectioned: "",
      rules: {
        balanceDate: [{ required: true, message: "时间不能为空" }]
      },
      loading2:"",
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    rowClick(row){
        this.$refs.multipleTable.toggleRowSelection(row);
    },
    searchFun() {
      this.getCompany(this.companyId);
    },
    resetFun() {
      this.companyName = "";
      this.companyId = null;
      this.searchFun(this.companyId);
    },
    getCompany(companyId) {
      this.loading = true;
      selectFiCompanyList({ companyId })
        .then(res => {
          this.tableData = res.data;
          this.loading = false;
        })
        .catch(() => {});
    },
    //结转处理  0 正常结转  1 提前结转
    handleCompanyCarry(advanceCarry) {
      if (this.selectedList.length === 0) {
        this.$message({ message: "未选择单据", type: "warning" });
        return;
      } else if (this.selectedList.length > 1) {
        this.$message({ message: "最多选择一条单据", type: "warning" });
        return;
      } else {
        this.selectioned = this.selectedList[0];
        let title = "";
        switch (advanceCarry) {
          case 0:
            title = "即将正常结转，是否继续？";
            this.carryShow = true;
            break;
          case 1:
            title = "即将提前结转，是否继续？";
            break;
          default:
            break;
        }
      }
    },
    //上期记账状态处理  0 否  1 是
    handleAccountState(canReverseBalance) {
      if (this.selectedList.length == 0) {
        this.$openWarning("请先选择数据");
      } else {
        let title = "";
        switch (canReverseBalance) {
          case 0:
            title = "允许上期记账，是否继续？";
            break;
          case 1:
            title = "禁止上期记账，是否继续？";
            break;
          default:
            break;
        }
        this.$confirm(title, {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
          closeOnClickModal: false
        }).then(() => {
          this.selectedList.map(item => {
            item.canReverseBalance = canReverseBalance;
          });
          updateAccountState(this.selectedList)
            .then(res => {
              this.$openSuccess(res.message);
              this.getCompany();
            })
            .catch(() => {});
        });
      }
    },
    handleFormSelected(selection, row) {
      if (selection.length === 0) {
          // 判断selection是否有值存在
          return;
      }
      if (row) {
          this.selectedLis.push(row);
          this.index = this.tableData.indexOf(row);
          this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    // handleFormSelectAll(selection) {
    //   this.selectedList = selection;
    // },
    handleChange(e) {
      this.selectedList = e;  
    },

    //公司弹窗打开
    componyTip() {
      this.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.componyShow = false;
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.companyName = e.companyName;
      this.companyId = e.companyId;
      // this.tableData = e;
      this.getCompany(e.companyId);
      console.log("e", e);
    },
    submitCarry(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            //使用Element loading-start 方法
           const loading2 = this.$loading({
            lock: true,
            text: '处理中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.selectioned.advanceCarry = 0;//本期结转
          carryFiCompany(this.selectioned)
            .then(res => {
              this.carryShow = false;
              this.$openSuccess(res.message);
              this.getCompany();
            loading2.close();
            })
            .catch(() => {
             loading2.close();
            });
        } else {
          return false;
        }
      });
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getCompany();
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
.input-div {
  padding-left: 0px;
}
</style>
