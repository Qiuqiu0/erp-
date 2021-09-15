<template>
<!-- 选择采购合同信息 -->
  <div class="cgPop" v-if="tipShow">
    <el-dialog :visible.sync="tipShow" title="选择采购合同信息" :show-close=false :before-close="cgCancle" width="1100px" class="popup_box">
      <div class="">
				<!-- 搜索 -->
        <div class="index">
          <div class="button-div">
            <el-button class="query-button" icon="el-icon-search"  @click="queryData">查询</el-button>
            <el-button @click="clearNone"  icon="el-icon-refresh">重置</el-button>
          </div>
        </div>
        <div class="input-div">
        <el-form @keyup.enter.native="queryData">
          <div>
            <el-col :span="6" class="el-col">
              <label>公司</label>
              <el-input v-model="companyName.companyName" class="el-inputs" placeholder="请选择" disabled></el-input>
            <span class='comicon' @click="componyTip"><i class="el-icon-search" ></i></span>
            </el-col>
            <el-col :span="6" class="el-col">
              <label>供应商</label>
              <el-input
                v-model="supplierName.supplierName"
                class="el-inputs"
                placeholder="请选择"
                disabled
              ></el-input>
              <span class="comicon" @click="supplierTip">
                <i class="el-icon-search"></i>
              </span>
            </el-col>
            <el-col :span="6" class="el-col">
              <label>外部合同号</label>
              <el-input
                v-model="extCode"
                class="el-inputs"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="6" class="el-col">
              <label>采购合同号</label><el-input v-model="poNo" class="el-inputs" placeholder="请输入"></el-input>
            </el-col>
          </div>
        </el-form>  
        </div>
        <!-- 穿梭框 -->
        <div class="table_div">
          <el-table border center :data="tableData" class="el-table" ref="multipleTable"
          v-loading="loading" height="300" style="width:100%" @row-click='rowClick' :row-class-name="tableRowClassName">
            <el-table-column width="55" label="">
              <template scope="scope">
                <el-radio v-model="radio" :label="scope.$index" @change="radiochange(scope.row)">
                    &nbsp;
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="poNo" label="采购合同号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="extCode" label="外部合同号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="contractAmtVat" label="合同金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sumQty" label="统计数量" show-overflow-tooltip></el-table-column>
            <el-table-column prop="supplierName" label="供应商名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="contractStatus" label="状态" show-overflow-tooltip>
              <template>
                <!-- <span v-for="(item, index) in status" :key="index">
                  <span v-if="item.dict_code == scope.row.contractStatus">{{item.dict_value}}</span>
                </span> -->
                已生效
              </template>
            </el-table-column>
            <el-table-column prop="companyName" label="公司" show-overflow-tooltip></el-table-column>
            <el-table-column prop="orgName" label="部门" show-overflow-tooltip></el-table-column>
            <el-table-column prop="contractBeginDate" label="生效日期" show-overflow-tooltip>
              <template scope="scope">
                {{$timeFun(scope.row.contractBeginDate, 1)}}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-divider></el-divider>
        <div class="el-table-div">
          <el-pagination
            @size-change="handleSizeChange" @current-change="currentChange"
              :current-page="pageNum" :page-sizes="[100, 200, 300,500]" :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
			</div>
  		<div class="button-div2">
		    <el-button type="primary" @click="cgSure()" icon="el-icon-check">确 定</el-button>
        <el-button @click="cgCancle()" icon="el-icon-close">取 消</el-button>
  		</div>
    </el-dialog>
    <!-- 选择公司弹窗 -->
    <compony-select v-if="componyShow" :tipShow='componyShow' @tipsCancle="tipsCancle" @tipsSure="tipsSure">
    </compony-select>
    <!-- 选择供应商弹窗 -->
    <supplier-select
      v-if="supplierShow"
      :tipShow="supplierShow"
      @supplierCancle="supplierCancle"
      @supplierSure="supplierSure"
    ></supplier-select>
  </div>
</template>

<script>
import { mapState } from "vuex";
import componySelect from "@/components/componySelect.vue";
import supplierSelect from "@/components/supplierSelect.vue";

import api from "@/api/component";
export default {
  name: "cgPop",
  data() {
    return {
      componyShow: false, //银行弹窗
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      projectShow: false, //项目弹窗
      supplierShow: false, //供应商弹窗
      companyName: ``, //公司
      branchName: ``, //部门
      staffName: ``, //员工
      projectName: ``, //项目
      supplierName: ``, //供应商
      extCode: ``, //外部合同号
      tableData: [], //采购表格
      tableWl: [], //物料表格
      tableXs: [], //销售表格
      tableAssign: "", //表格深拷贝数据
      selectioned: [], //物料表格选中项
      selectXs: [], //销售表格选中项
      index: null, //选中index
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      contractBeginDate: ``, //协议生效日
      contractEndDate: ``, //协议到期日
      poNo: ``, //采购合同号
      status: [], //合同状态
      rate: ``, //转换比率 一断臂
      radio: false, //单选状态
      getData: ``, //单选数据
      pickerClose: {}, //日期禁止项
      loading: true, //采购表格loading
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      show: true
    };
  },
  components: {
    componySelect,
    supplierSelect
  },
  props: {
    tipShow: {
      type: Boolean
    },
    contractStatus: {},
    supplierCode: {
      type: String
    },
    orgCode: {
      type: String
    },
    paymentWay: {
      type: Number
    }
  },
  created() {
    // this.htzt();
    //获取表格
    this.conList();
  },
  mounted() {
    let that = this;
    if (that.contractBeginDate !== "") {
      this.pickerClose = {
        disabledDate(time) {
          return time.getTime() > that.contractBeginDate;
        }
      };
    }
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    //获取合同状态
    htzt() {
      api.htzt()
        .then(res => {
          this.status = res.data;
        })
        .catch();
    },
    //选择采购合同数据
    radiochange(e) {
      this.getData = e;
    },
    //关闭
    cgCancle() {
      this.$emit('cgCancle');
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //确定
    cgSure() {
      this.$emit('cgSure',this.getData);
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //获取表格
    conList() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        paymentWay:this.paymentWay,
        companyCode: this.companyName.companyCode,
        companyName: this.companyName.companyName,
        orgCode: this.branchName.branchCode || this.orgCode,
        orgName: this.branchName.branchName,
        bizPersonCode: this.staffName.empCode,
        bizPersonName: this.staffName.empName,
        poNo: this.poNo,
        supplierCode: this.supplierName.supplierCode || this.supplierCode,
        supplierName: this.supplierName.supplierName,
        projectCode: this.projectName.projectCode,
        projectName: this.projectName.projectName,
        contractBeginDate: this.contractBeginDate,
        contractEndDate: this.contractEndDate,
        extCode: this.extCode,
        contractStatus: this.contractStatus
      };
      Object.keys(params).forEach(key => {
        if (params[key] == `` || params[key] == `undefined`) {
          delete params[key];
        }
      });
      api.odPoContractPopup(params)
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
      this.companyName = {};
      this.branchName = {};
      this.staffName = {};
      this.poNo = ``;
      this.supplierName = {};
      this.projectName = {};
      this.contractBeginDate = ``;
      this.contractEndDate = ``;
      this.extCode = ``;
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
      this.radio = false;
      this.getData = ``;
      this.pageSize = e;
      this.conList();
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
    //供应商弹窗打开
    supplierTip() {
      this.supplierShow = true;
    },
    //供应商弹窗关闭
    supplierCancle() {
      this.supplierShow = false;
    },
    //供应商弹窗确定获取数据
    supplierSure(e) {
      this.supplierShow = false;
      this.supplierName = e;
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
    },
    contractBeginDate(val) {
      let that = this;
      if (val > that.contractEndDate) {
        that.contractEndDate = "";
      }
      this.pickerClose = {
        disabledDate(time) {
          return time.getTime() < that.contractBeginDate;
        }
      };
    }
  }
};
</script>

<style lang="scss">
.cgPop {
  width: 100%;
  .el_flex {
    display: flex;
    align-items: center;
  }
  .el-date-editor.el-input {
    width: auto;
  }
  .flex_center {
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .table_div {
    /* height: 250px; */
    /* overflow: hidden; */
    /* overflow-y: auto; */
    &:last-child {
      margin-top: 25px;
    }
  }
  .flex_span {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 8%;
    height: 500px;
    float: left;
    .icon {
      font-size: 30px;
      border: 1px solid #000;
      padding: 20px 0;
      cursor: pointer;
    }
  }
  .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
  .el-select__caret {
    line-height: normal;
  }
  label {
    position: relative;
  }
}
</style>
