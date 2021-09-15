<template>
  <!-- 公司列表 -->
  <div class="odFwContractPopup" v-if="tipShow">
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
              v-show="!searchOptions.custCode && !searchOptions.supplierCode && !isDisabled"
              class="el-col el-col-5"
              :branchName.sync="branchName"
              :companyName="companyName"
            ></department-select>
            <!-- 客户选择 -->
            <customer-select
              v-show="!searchOptions.custCode && !searchOptions.supplierCode"
              class="el-col el-col-5"
              :customer.sync="customer"
              :supplier="supplier"
            ></customer-select>
            <!--供应商选择-->
            <supplier-select
              v-show="!searchOptions.supplierCode"
              class="el-col el-col-5"
              :supplier.sync="supplier"
            ></supplier-select>
            <coin-select
              class="el-col el-col-5"
              :coin.sync="coin"
              :labelName="'业务币别'"
            ></coin-select>
            <el-col :span="5" class="el-col">
              <label>协议号</label>
              <el-input v-model="contractNo" class="el-inputs" size="small" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>外部合同号</label>
              <el-input v-model="extCode" class="el-inputs" size="small" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>创建日期</label>
              <el-date-picker
                class="el-inputs"
                style="width: 70%;"
                size="mini"
                v-model="createDate"
                format="yyyy 年 MM 月 dd 日"
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
            <el-table-column prop="contractNo" label="框架协议" show-overflow-tooltip></el-table-column>
            <el-table-column prop="extCode" label="外部合同号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="contractAmt" label="合同金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="currencyCode" label="业务币种" show-overflow-tooltip></el-table-column>
            <el-table-column prop="companyName" label="公司" show-overflow-tooltip></el-table-column>
            <el-table-column prop="orgName" label="部门" show-overflow-tooltip></el-table-column>
            <el-table-column prop="custName" label="客户" show-overflow-tooltip></el-table-column>
            <el-table-column prop="supplierName" label="供应商" show-overflow-tooltip></el-table-column>
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
import { mapState } from "vuex";
import api from "@/api/component";
import { payStatusObj } from '../views/fundsManage/dictionary';
export default {
  name: "odFwContractPopup",
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
      tableData: [
        // {
        //   contractId: "1", //	合同id	varchar(32) [e描述_32]	y		y		合同id
        //   contractNo: "1", //	协议编号	varchar(32) [e描述_32]			y		协议编号
        //   projectCode: "1", //	所属项目	varchar(32) [e描述_32]			y		所属项目
        //   projectName: "1", //	项目名称	varchar(128) [e描述_128]			y		项目名称
        //   companyCode: "1", //	公司编码	varchar(32) [e描述_32]			y		公司编码
        //   orgCode: "1", //	组织编码	varchar(32) [e描述_32]			y		组织编码
        //   custId: "", //	客户id	varchar(32) [e描述_32]			y		客户id
        //   supplierId: "1", //	供应商id	varchar(32) [e描述_32]			y		供应商id
        //   extCode: "1", //	外部合同号	varchar(64) [e描述_64]			y		外部合同号
        //   bizType: "", //	业务性质	int [e字典Int8]			y		业务性质
        //   contractCat: "", //	协议类型	int [e字典Int8]			y		协议类型
        //   contractStatus: "", //	协议状态	int [e字典Int8]			y		协议状态
        //   businessType: "", //	业务类型	int [e字典Int8]			y		业务类型
        //   currencyCode: "001", //	业务币种	varchar(32) [e描述_32]			y		业务币种
        //   payType: "", //	付款类型	int [e字典Int8]			y		付款类型
        //   payWay: "", //	付款方式	int [e字典Int8]			y		付款方式
        //   usance: "", //	票期	int [e数字Int10]			y	默认值:0票期
        //   contractAmt: "100", //	合同金额	decimal(20,6) [d(20,6)小数]			y		合同金额
        //   currencyRate: 7, //	本位币汇率	decimal(20,6) [d(20,6)小数]			y		本位币汇率
        //   contractBeginDate: "", //	协议生效日	date [e日期]			y		协议生效日
        //   contractEndDate: "", //	协议到期日	date [e日期]			y		协议到期日
        //   contractDuration: "", //	协议持续期	int [e数字Int10]			y	默认值:0协议持续期（天）
        //   signTime: "", //	签约时间	date [e日期]			y		签约时间
        //   signPlace: "", //	签约地点	varchar(128) [e描述_128]			y		签约地点
        //   signRemark: "", //	签约事项说明	varchar(128) [e描述_128]			y		签约事项说明
        //   remark: "", //	备注	varchar(256) [e描述_256]			y		备注
        //   isInactive: "", //	是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        //   createdBy: "", //	创建者	varchar(32) [e描述_32]			y		创建者
        //   createdName: "", //	创建者名称	varchar(64) [e描述_64]			y		创建者名称
        //   createdTime: "", //	创建时间	datetime [e时间]			y		创建时间
        //   updatedBy: "9876543210", //	更新者	varchar(32) [e描述_32]			y		更新者
        //   updatedName: "test", //	更新者名称	varchar(64) [e描述_64]			y		更新者名称
        //   updatedTime: 1576146959000, //	更新时间	datetime [e时间]			y		更新时间
        //   version: "", //	数据版本	int [e数字Int10]			y	默认值:0数据版本
        //   companyId: "592bff43fc65400b801ef0c131cac51a", //	公司id	varchar(32) [e描述_32]			y		公司id
        //   companyName: "我的测试公司", //	公司名称	varchar(128) [e描述_128]			y		公司名称
        //   orgId: "b030603329094509977353c57f5dd7e6", //	组织id	varchar(32) [e描述_32]			y		组织id
        //   orgName: "11111", //	组织名称	varchar(128) [e描述_128]			y		组织名称
        //   supplierCode: "132", //	供应商编码	varchar(64) [e描述_64]			y		供应商编码
        //   supplierName: "ews", //	供应商名称	varchar(128) [e描述_128]			y		供应商名称
        //   custCode: "", //	客户编码	varchar(64) [e描述_64]			y		客户编码
        //   custName: "", //	客户名称	varchar(128) [e描述_128]			y		客户名称
        //   bizPersonName: "", //	业务员姓名	varchar(32) [e描述_32]			y		业务员姓名
        //   bizPersonCode: "" //	业务员编码	varchar(32) [e描述_32]			y		业务员编码
        // }
      ], //表格
      selectioned: [], //表格选中项
      index: null, //选中index
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      contractNo: "", //协议号
      extCode: "", //外部合同号
      createDate: "", //创建日期
      loading: true, //表格loading
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      show: true,
      radioIndex: "",
      isDisabled:false,
      paySelectObj:{},
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
      this.isRadio&&this.$refs.multipleTable.clearSelection();//单选的时候触发
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
      // custName: "", //客户名称
      // custCode: "", //客户代码
      // supplierName: "", //供应商名称
      // supplierCode: "", //供应商代码
      // companyCode: ``, //公司代码
      // companyName: ``, //公司名称
      // companyShort: ``, //公司简称
      let params =
        JSON.stringify(this.searchOptions) != "{}"
          ? this.searchOptions
          : {
              companyCode: this.companyName.companyCode,
              orgCode: this.branchName.orgCode,
              custCode: this.customer.customerCode,
              supplierCode: this.supplier.supplierCode,
              // currencyCode: this.coin.currencyCode
            };
      if(JSON.stringify(this.paySelectObj) != "{}"){
         params.companyCode= this.companyName.companyCode;
        params.orgCode=this.branchName.orgCode;

      }
      params.currencyCode=this.coin.currencyCode
      params.pageNum = this.pageNum;
      params.rows = this.pageSize;
      params.contractNo = this.contractNo;
      params.extCode = this.extCode;
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
          if (params[key]) {
            postdata[key] = params[key];
          } else {
            continue;
          }
        }
      }
      api
        .odFwContractPopup(postdata)
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
      this.contractNo = "";
      this.extCode = "";
      this.companyName = {};
      this.branchName = {};
      this.customer = {};
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
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      }
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
