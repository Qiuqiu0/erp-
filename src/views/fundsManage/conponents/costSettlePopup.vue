<template>
  <!-- 公司列表 -->
  <div class="costSettlePopup" v-if="tipShow">
    <el-dialog
      :visible.sync="tipShow"
      title="选择列表"
      :show-close="false"
      :before-close="tipsCancle"
      append-to-body
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
          <p class="hide-input" v-if="show" @click="inputShow()">
            更多条件
            <i class="el-icon-caret-bottom"></i>
          </p>
          <p class="hide-input" v-else @click="inputShow()">
            收起
            <i class="el-icon-caret-top"></i>
          </p>
          <div class="dialog-search-div">
             <el-col :span="5" class="el-col" v-show="isDisabled">
              <label>公司</label>
              <el-input v-model="companyName.companyName" class="el-inputs" placeholder="请输入" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col" v-show="isDisabled">
              <label>部门</label>
              <el-input v-model="branchName.orgName" class="el-inputs" disabled></el-input>
            </el-col>
            <!--公司选择-->
            <compony-select
              v-show="!searchOptions.companyCode && !isDisabled"
              class="el-col el-col-5"
              :companyName.sync="companyName"
              :labelName="'公司'"
            ></compony-select>
            <!--部门选择-->
            <department-select
              v-show="!searchOptions.orgCode  && !isDisabled"
              class="el-col el-col-5"
              :branchName.sync="branchName"
              :companyName="companyName"
            ></department-select>
            <!--供应商选择-->
            <supplier-select
              class="el-col el-col-5"
              v-show="!searchOptions.supplierCode"
              :supplier.sync="supplier"
            ></supplier-select>
            <coin-select class="el-col el-col-5" :coin.sync="coin" :labelName="'业务币别'"></coin-select>
            <el-col :span="5" class="el-col">
              <label>费用编号</label>
              <el-input v-model="erpCostsCode" class="el-inputs" size="small" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>单据类型</label>
              <el-select v-model="billType" placeholder="请选择" class="el-inputs" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.dict_key"
                  :label="item.dict_value"
                  :value="item.dict_key"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>创建日期</label>
              <el-date-picker
                class="el-inputs"
                style="width: 70%;"
                size="mini"
                v-model="createDate"
                format="yyyy-MM-dd"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
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
            @selection-change="handleSelectionChange"
            :row-class-name="setRowIndex"
            @row-click="selectRow"
            v-loading="loading"
          >
            <el-table-column type="selection" v-if="!isRadio" width="55"></el-table-column>
            <el-table-column width="55" v-if="isRadio">
              <template scope="scope">
                <el-radio
                  :label="scope.$index"
                  @change="radioChangeHandle"
                  v-model="radioIndex"
                >&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="erpCostsCode" label="费用单据" show-overflow-tooltip></el-table-column>
            <el-table-column prop="costsAmtVat" label="费用金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="billType" label="单据类型" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.billType?"费用预提":"费用结算" }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="currencyCode" label="业务币种" show-overflow-tooltip></el-table-column>
            <el-table-column prop="companyName" label="公司" show-overflow-tooltip></el-table-column>
            <el-table-column prop="orgName" label="部门" show-overflow-tooltip></el-table-column>
            <el-table-column prop="supplierName" label="供应商" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updatedName" label="修改人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updatedTime" label="修改日期" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.updatedTime | time }}</span>
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
      <div slot="footer" class="button-div2">
        <el-button @click="tipsSure()" icon="el-icon-check" type="primary">确 定</el-button>
        <el-button @click="tipsCancle()" icon="el-icon-close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import componySelect from "@/views/fundsManage/conponents/componySelect";
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect2";
import supplierSelect from "@/views/fundsManage/conponents/supplierSelect2";
import customerSelect from "@/views/fundsManage/conponents/customerSelect2";
import coinSelect from "@/views/fundsManage/conponents/coinSelect";
import { costSettlePopup,costSettlePopup2 } from "@/api/paymentManage/applyPaymentDetail";
import { mapState } from "vuex";
import api from "@/api/component";
export default {
  name: "costSettlePopup",
  components: {
    componySelect,
    departmentSelect,
    coinSelect,
    supplierSelect,
    customerSelect
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: {}, //部门
      customer: {}, //客户
      supplier: {}, //供应商
      coin: {}, //业务币种
      tableData: [], //表格
      selectioned: [], //表格选中项
      index: null, //选中index
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      erpCostsCode: "", //费用编码
      billType: "", //单据类型
      createDate: "", //创建日期
      loading: true, //表格loading
      radioIndex: "",
      options: [
        { dict_key: 0, dict_value: "费用结算" },
        { dict_key: 1, dict_value: "费用预提" }
      ],
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      show: true,
      paySelectObj:{},
      isDisabled:false
    };
  },
  props: {
    tipShow: {
      type: Boolean
    },
    isRadio: {
      type: Boolean,
      default: false
    },
    searchOptions: {
      type: Object,
      default: Object
    },
    urlType:{
      type:String | Number
    }
  },
  created() {
    this.paySelectObj=JSON.parse(sessionStorage.getItem("paySelectObj"));
    if(this.paySelectObj){
      this.companyName.companyCode=this.paySelectObj.companyCode;
      this.branchName.orgCode=this.paySelectObj.orgCode;
       this.companyName.companyName=this.paySelectObj.companyName;
      this.branchName.orgName=this.paySelectObj.orgName;
      this.isDisabled=true;
    }else{
      this.isDisabled=false;
    }
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
    inputShow() {
      this.show = this.$dialogShowOne(this.show);
    },
    selectRow(row) {
      this.isRadio && this.$refs.multipleTable.clearSelection(); //单选的时候触发
      this.$refs.multipleTable.toggleRowSelection(row, true);
      this.radioIndex = row.index;
    },
    //列表单选
    setRowIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },
    //选择数据
    handleSelectionChange(val) {
      this.selectioned = val;
    },
    //单选选择数据
    radioChangeHandle(index) {
      this.selectioned = [this.tableData[index]];
    },
    //关闭
    tipsCancle() {
      this.$emit("tipsCancle");
      this.selectioned = [];
      this.clearNone();
    },
    //确定
    tipsSure() {
      if (this.selectioned.length > 1) {
        if (!validatasSelectioned.call(this, this.selectioned)) return;
        this.$emit("tipsSure", this.selectioned);
      } else if (this.selectioned.length == 0) {
        this.$message({ message: "未选择单据", type: "warning" });
      } else {
        this.$emit("tipsSure", this.selectioned);
      }
      this.selectioned = [];
      this.clearNone();
    },
    //获取表格
    conList() {
      let params =
        JSON.stringify(this.searchOptions) != "{}"
          ? this.searchOptions
          : {
              companyCode: this.companyName.companyCode,
              orgCode: this.branchName.orgCode,
              erpCostsCode: this.erpCostsCode,
              supplierCode: this.supplier.supplierCode
              // currencyCode: this.coin.currencyCode
            };
      if(JSON.stringify(this.paySelectObj) != "{}"){
         params.companyCode= this.companyName.companyCode;
        params.orgCode=this.branchName.orgCode;

      }
      params.currencyCode = this.coin.currencyCode;
      params.pageNum = this.pageNum;
      params.rows = this.pageSize;
      params.erpCostsCode = this.erpCostsCode;
      params.billType = this.billType;
      params.costsStatus = 10650015;
      if (this.createDate) {
        params.createdTimeBegin = this.createDate[0];
        params.createdTimeEnd = this.createDate[1];
      } else {
        params.createdTimeBegin = "";
        params.createdTimeEnd = "";
      }
      let postdata = {};
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          if (params[key] !== "") {
            postdata[key] = params[key];
          } else {
            continue;
          }
        }
      }
      this.loading = true;
      let url='';
      if(this.urlType){
        url=costSettlePopup2;
      }else{
         url=costSettlePopup;
      }
      costSettlePopup2(postdata)
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
      this.erpCostsCode = "";
      this.billType = "";
      this.companyName = {};
      this.branchName = {};
      this.supplier = {};
      this.coin = {};
      this.createDate = "";
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
    }
  },
  computed: {
    ...mapState({
      themecolor: "themecolor"
    })
  },
  watch: {
    searchOptions: {
      handler(value) {
        this.billType = value.billType;
      },
      immediate: true
    }
  }
};
function validatasSelectioned(array, keys) {
  //companyId orgId custId supplierId originCurrencyCode
  let firstObj = array[0];
  if (
    !array
      .map(item => item["companyId"])
      .every(item => item === firstObj["companyId"])
  ) {
    this.$message({ message: "公司不一致,不能一起添加", type: "warning" });
    return false;
  }
  if (
    !array.map(item => item["orgId"]).every(item => item === firstObj["orgId"])
  ) {
    this.$message({ message: "部门不一致,不能一起添加", type: "warning" });
    return false;
  }
  if (
    !array
      .map(item => item["custId"])
      .every(item => item === firstObj["custId"])
  ) {
    this.$message({ message: "客户不一致,不能一起添加", type: "warning" });
    return false;
  }
  if (
    !array
      .map(item => item["supplierId"])
      .every(item => item === firstObj["supplierId"])
  ) {
    this.$message({ message: "供应商不一致,不能一起添加", type: "warning" });
    return false;
  }
  return true;
}
</script>
