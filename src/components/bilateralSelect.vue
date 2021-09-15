<!--双边合同-->
<template>
  <div class="departmentSelect" v-if="tipShow">
    <!-- 搜索 -->
    <el-dialog
      :visible.sync="tipShow"
      title="选择列表"
      :show-close="false"
      :before-close="tipsCancleo"
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
        <div class="index-div3 input-div auto-sibling">
          <p class="hide-input" v-if="show" @click="inputShow()">
            更多条件 <i class="el-icon-caret-bottom"></i>
          </p>
          <p class="hide-input" v-else @click="inputShow()">
            收起<i class="el-icon-caret-top"></i>
          </p>
          <div class="search-div">
            <el-col :span="5" class="el-col">
              <label>公司</label>
              <el-input
                v-model="companyName.companyName"
                class="el-inputs"
                placeholder="请选择"
                disabled
              ></el-input>
              <span class="comicon" @click="componyTip">
                <i class="el-icon-search"></i>
              </span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>部门</label>
              <el-input
                v-model="branchName.branchName"
                class="el-inputs"
                placeholder="请选择"
                disabled
              ></el-input>
              <span class="comicon" @click="departmentTip">
                <i class="el-icon-search"></i>
              </span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>双边合同号</label>
              <el-input
                v-model="contractNo"
                class="el-inputs"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>外部合同号</label>
              <el-input
                v-model="extCode"
                class="el-inputs"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-colc">
              <label>签订日期</label>
              <el-date-picker
                v-model="signTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>有效日期</label>
              <el-date-picker
                v-model="contractEndDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>创建日期</label>
              <el-date-picker
                v-model="createdTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-col>
          </div>
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
            <el-table-column
              type="index"
              label="序号"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="contractNo"
              label="双边合同号"
              width="100px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="contractStatus"
              label="状态"
              show-overflow-tooltip
            >
              <template scope="scope">
                <span v-for="(item, index) in isInaType" :key="index">
                  <span v-if="item.dict_code == scope.row.contractStatus">
                    {{ item.dict_value }}
                  </span>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="signTime"
              label="签订日期"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="custName"
              label="销售客户"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="supplierName"
              label="供应商"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="extCode"
              label="外部合同号"
              width="100px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="orgName"
              label="部门"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="companyName"
              label="公司"
              show-overflow-tooltip
            ></el-table-column>
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
        <el-button type="primary" @click="tipsSureo()" icon="el-icon-check"
          >确 定</el-button
        >
        <el-button @click="tipsCancleo()" icon="el-icon-close">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 选择公司弹窗 -->
    <compony-select
      v-if="componyShow"
      :tipShow="componyShow"
      :ztz="ztz"
      @tipsCancle="tipsCancle"
      @tipsSure="tipsSure"
    ></compony-select>
    <!-- 选择部门弹窗 -->
    <department-select
      v-if="departmentShow"
      :tipShow="departmentShow"
      :departztz="departztz"
      :data="companyName"
      @departmentCancle="departmentCancle"
      @departmentSure="departmentSure"
    ></department-select>
    <!-- 选择员工弹窗 -->
    <staff-select
      v-if="staffShow"
      :tipShow="staffShow"
      :data="branchName"
      @staffCancle="staffCancle"
      @staffSure="staffSure"
    ></staff-select>
    <!-- 选择项目弹窗 -->
    <project-select
      v-if="projectShow"
      :tipShow="projectShow"
      @projectCancle="projectCancle"
      @projectSure="projectSure"
    ></project-select>
    <!-- 选择人员信息弹窗 -->
    <man-select
      v-if="manShow"
      :tipShow="manShow"
      @manCancle="manCancle"
      @manSure="manSure"
    ></man-select>
  </div>
</template>

<script>
import { mapState } from "vuex";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import staffSelect from "@/components/staffSelect.vue";
import projectSelect from "@/components/projectSelect.vue";
import manSelect from "@/components/manSelect.vue";

import Amange from "@/api/contractMange/amange";
export default {
  name: "bilateralContracts",
  data() {
    return {
      departztz: 0,
      ztz: 0,
      dialogVisible: false,
      textarea: ``,
      componyShow: false, //银行弹窗
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      projectShow: false, //员工弹窗
      manShow: false, //人员弹窗
      tableData: [], //表格
      selectioned: [], //表格选中项
      index: null, //选中index
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      isInactive: ``, //1禁用 0启用
      contractStatus: ``, //合同状态
      isInaType: [], //合同状态列表
      companyName: ``, //公司
      branchName: ``, //部门
      staffName: ``, //员工
      projectName: ``, //项目
      manName: ``, //人员
      contractNo: ``, //双边合同号
      extCode: ``, //外部合同号
      signTime: ``, //签订日期
      contractEndDate: ``, //有效日期
      createdTime: ``, //创建时间
      loading: true, //表格loading
      radio: false, //单选状态
      getData: ``, //单选数据
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
    //获取合同状态
    this.htzt();
    //获取表格
    this.getList();
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
    inputShow() {
      this.show = this.$showOne(this.show);
    },
    //获取合同状态
    htzt() {
      Amange.htzt()
        .then(res => {
          this.isInaType = res.data;
        })
        .catch();
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
      this.companyName = e;
      this.branchName = ``;
      this.staffName = ``;
    },
    //部门弹窗打开
    departmentTip() {
      // if (this.companyName == ``) {
      //   this.$openWarning("请先选择公司");
      //   return false;
      // }
      this.departmentShow = true;
    },
    //部门弹窗关闭
    departmentCancle() {
      this.departmentShow = false;
    },
    //部门弹窗确定获取数据
    departmentSure(e) {
      this.departmentShow = false;
      this.branchName = e;
      this.staffName = ``;
    },
    //部门弹窗打开
    manTip() {
      this.manShow = true;
    },
    //部门弹窗关闭
    manCancle() {
      this.manShow = false;
    },
    //部门弹窗确定获取数据
    manSure(e) {
      this.manShow = false;
      this.manName = e;
    },
    //员工弹窗打开
    staffTip() {
      // if (this.companyName == `` || this.branchName == ``) {
      //   this.$openWarning("请先选择公司和部门");
      //   return false;
      // }
      this.staffShow = true;
    },
    //员工弹窗关闭
    staffCancle() {
      this.staffShow = false;
    },
    //员工弹窗确定获取数据
    staffSure(e) {
      this.staffShow = false;
      this.staffName = e;
    },
    //项目弹窗打开
    projectTip() {
      this.projectShow = true;
    },
    //项目弹窗关闭
    projectCancle() {
      this.projectShow = false;
    },
    //项目弹窗确定获取数据
    projectSure(e) {
      this.projectShow = false;
      this.projectName = e;
    },
    //获取表格
    getList() {
      this.loading = true;
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        companyCode: this.companyName.companyCode,
        orgCode: this.branchName.branchCode,
        bizPersion: this.staffName.empName,
        contractNo: this.contractNo,
        extCode: this.extCode,
        projectCode: this.projectName.projectCode,
        projectName: this.projectName.projectName,
        signTime: this.signTime,
        contractEndDate: this.contractEndDate,
        createdTime: this.createdTime,
        contractStatus: this.contractStatus
      };
      Object.keys(params).forEach(key => {
        if (params[key] == `` || params[key] == `undefined`) {
          delete params[key];
        }
      });
      Amange.getList(params)
        .then(res => {
          this.loading = false;
          this.total = res.total;
          for (const item of res.data) {
            item.signTime = this.$timeFun(item.signTime, 1);
          }
          this.tableData = res.data;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //查询
    queryData() {
      this.getList();
    },
    //清空选项
    clearNone() {
      this.companyName = "";
      this.branchName = "";
      this.staffName = "";
      this.contractNo = "";
      this.extCode = "";
      this.projectName = "";
      this.signTime = "";
      this.contractEndDate = "";
      this.createdTime = "";
      this.contractStatus = "";
    },
    //翻页
    currentChange(e) {
      this.radio = false;
      this.getData = ``;
      this.pageNum = e;
      this.getList();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.radio = false;
      this.getData = ``;
      this.pageSize = e;
      this.getList();
    },
    //关闭
    tipsCancleo() {
      this.$emit("htCancle");
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //确定
    tipsSureo() {
      this.$emit("htSure", this.getData);
      this.radio = false;
      this.getData = ``;
      this.clearNone();
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
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    projectSelect,
    manSelect
  }
};
</script>

<style lang="scss">
.bilateralContracts {
  /* margin-left: 19px;
  width: 97%; */
  .el_flex {
    display: flex;
    align-items: center;
  }

  .el-date-editor.el-input {
    width: auto;
  }
  .widauto {
    width: auto !important;
  }
  .el-col {
    position: relative;
    .comicon {
      width: 170px;
      height: 20px;
      position: absolute;
      right: 5px;
      top: 4px;
      cursor: pointer;
    }
  }
  .el-dropdown-link {
    color: #3e3f42;
  }
  .el-dropdown {
    /* color: #31478f; */
    font-size: 12px;
    &:hover {
      color: #fff;
    }
  }
  textarea {
    width: 100%;
  }
}
</style>
