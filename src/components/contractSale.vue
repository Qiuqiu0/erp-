<template>
  <!-- 公司列表 -->
  <div class="contractSale" v-if="tipShow">
    <el-dialog
      :visible.sync="tipShow"
      append-to-body
      title="销售合同"
      :show-close="false"
      :before-close="contractClose"
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
              <label>销售合同号</label>
              <el-input class="el-inputs" v-model="soContractNo" size="small" placeholder="请选择"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>外部合同号</label>
              <el-input class="el-inputs" v-model="extCode" size="small" placeholder="请选择"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>公司</label>
              <el-select
                clearable
                size="small"
                class="el-select"
                v-model="companyName"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in companyList"
                  :key="item.companyId"
                  :label="item.companyName"
                  :value="item.companyId"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>客户</label>
              <el-select
                clearable
                size="small"
                class="el-select"
                v-model="custName"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in customerList"
                  :key="item.customerId"
                  :label="item.customerName"
                  :value="item.customerId"
                ></el-option>
              </el-select>
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
            <el-table-column prop="soContractNo" label="销售合同" show-overflow-tooltip></el-table-column>
            <el-table-column prop="extCode" label="外部合同号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="contractAmtVat" label="销售总金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sumQty" label="销售总数量" show-overflow-tooltip></el-table-column>
            <el-table-column prop="originCurrencyCode" label="业务币币种" show-overflow-tooltip></el-table-column>
            <el-table-column prop="custName" label="客户" show-overflow-tooltip></el-table-column>
            <el-table-column prop="contractStatus" label="状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="companyName" label="公司" show-overflow-tooltip></el-table-column>
            <el-table-column prop="orgName" label="部门" show-overflow-tooltip></el-table-column>
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
        <el-button type="primary" @click="contractTrue()" icon="el-icon-check">确 定</el-button>
        <el-button @click="contractClose()" icon="el-icon-close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api/component";
export default {
  name: "contractSale",
  data() {
    return {
      soContractNo: "", //销售合同号
      // companyName: "", //客户
      tableData: [], //表格
      customerId: "", //客户
      // custName: "", //客户
      customerList: [], //客户下拉
      companyId: "", //公司
      companyList: [], //公司下拉
      extCode: "", //外部合同号
      tableAssign: "", //表格深拷贝数据
      selectioned: null, //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      companyCode: ``, //公司代码
      // companyName: ``, //公司名称
      companyType: ``, //公司类型
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
    },
    contractStatus: {},
    custName: {
      type: String,
      required: false
    },
    companyName: {
      type: String,
      required: false
    },
    payGatheringWay: {
      type: Number,
      required: false
    }
  },
  created() {},
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }

    //获取表格
    this.conList();
    this.getCompanyList();
    this.getCustomerList();
  },
  methods: {
    //选择数据
    radiochange(e) {
      this.getData = e;
    },
    //关闭
    contractClose() {
      this.$emit("contractClose");
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //确定
    contractTrue() {
      this.$emit("contractTrue", this.getData);
      this.radio = false;
      this.getData = ``;
      this.clearNone();
    },
    //获取公司列表
    getCompanyList() {
      let data = {};
      api
        .selectBbCompanyBase(data)
        .then(res => {
          this.companyList = res.data;
        })
        .catch();
    },
    //获取客户
    getCustomerList() {
      let data = {};
      api
        .selectCustomerList(data)
        .then(res => {
          this.customerList = res.data;
        })
        .catch();
    },
    //获取表格
    conList() {
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        soContractNo: this.soContractNo,
        extCode: this.extCode,
        companyId: this.companyName,
        custId: this.custName,
        contractStatus: this.contractStatus,
        payGatheringWay:this.payGatheringWay
      };
      Object.keys(params).forEach(key => {
        if (params[key] == `` || params[key] == `undefined`) {
          delete params[key];
        }
      });
      api
        .odSoContractPopup(params)
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
      this.soContractNo = "";
      this.extCode = "";
      this.companyName = "";
      this.custName = "";
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
</style>
