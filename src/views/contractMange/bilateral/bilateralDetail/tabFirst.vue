<template>
  <div class="tabFirst content-div2 contract_css_link first_css">
    <el-form disabled>
      <!-- 搜索 -->
      <!-- 搜索 -->
      <div class="input-div input-div-bor">
        <el-divider content-position="left">基本信息</el-divider>
        <div>
          <el-col :span="5" class="el-col">
            <label><span class="must-full">*</span>公司</label>
            <el-input
              v-model="companyName.companyName"
              class="el-inputs"
              placeholder=""
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label><span class="must-full">*</span>部门</label>
            <el-input
              v-model="branchName.branchName"
              class="el-inputs"
              placeholder=""
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label><span class="must-full">*</span>业务员</label>
            <el-input
              v-model="staffName.empName"
              class="el-inputs"
              placeholder=""
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label><span class="must-full">*</span>双边合同号</label>
            <el-input
              v-model="contractNo"
              class="el-inputs"
              placeholder=""
              :disabled="$route.query.id != ``"
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>外部合同号</label>
            <el-input
              v-model="extCode"
              @change="changeEx"
              class="el-inputs"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>项目号</label>
            <el-input
              v-model="projectName.projectCode"
              class="el-inputs"
              placeholder=""
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>项目名称</label>
            <el-input
              v-model="projectName.projectName"
              class="el-inputs"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label><span class="must-full">*</span>签订日期</label>
            <el-date-picker
              v-model="signTime"
              @change="changeTime"
              type="date"
              placeholder=""
            ></el-date-picker>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>有效日期</label>
            <el-date-picker
              v-model="contractEndDate"
              type="date"
              placeholder=""
            ></el-date-picker>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label>合同状态</label>
            <el-select v-model="contractStatus" placeholder="">
              <el-option
                v-for="item in isInaType"
                :key="item.dict_code"
                :label="item.dict_value"
                :value="item.dict_code"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>签约地点</label>
            <el-input
              v-model="signPlace"
              class="el-inputs"
              placeholder=""
            ></el-input>
          </el-col>
          <!-- <el-col :span="5" class="el-col">
          <label>创建日期</label>
          <el-date-picker v-model="createdTime" type="date" placeholder=""></el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>创建人</label>
          <el-input v-model="createdName" class="el-inputs" placeholder=""></el-input>
        </el-col>-->
        </div>
      </div>
      <div class="input-div input-div-bor bortop0">
        <el-divider content-position="left">供应商</el-divider>
        <div>
          <el-col :span="5" class="el-col">
            <label><span class="must-full">*</span>供应商</label>
            <el-input
              v-model="supplierName.supplierName"
              class="el-inputs"
              placeholder=""
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label class="">
              <span class="must-full">*</span>供应商合同号
            </label>
            <el-input v-model="supplierExtNo" class="el-inputs"></el-input>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label><span class="must-full">*</span>供应商级别</label>
            <el-select v-model="supplierName.supplierLevel" placeholder="">
              <el-option
                v-for="item in supplierLevelList"
                :key="item.dict_key"
                :label="item.dict_value"
                :value="item.dict_key"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="supplierName.supplierLevel"
                      class="el-inputs"
                      disabled></el-input> -->
          </el-col>
          <el-col :span="5" class="el-colc">
            <label><span class="must-full">*</span>合同类型</label>
            <el-select v-model="supplierContractType" placeholder="">
              <el-option
                v-for="item in contractType"
                :key="item.dict_code"
                :label="item.dict_value"
                :value="item.dict_code"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-col">
            <label class="">
              授信额度
            </label>
            <el-input v-model="supplierCreditSum" class="el-inputs" disabled>
              <template slot="append">元</template>
            </el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label class="">
              已用信用额度
            </label>
            <el-input v-model="supplierCreditUsed" class="el-inputs" disabled>
              <template slot="append">元</template>
            </el-input>
          </el-col>
        </div>
      </div>
      <div class="input-div input-div-bor bortop0">
        <el-divider content-position="left">客户</el-divider>
        <div>
          <el-col :span="5" class="el-col">
            <label><span class="must-full">*</span>客户</label>
            <el-input
              v-model="custName.custName"
              class="el-inputs"
              placeholder=""
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label class=""><span class="must-full">*</span>客户合同号</label>
            <el-input
              v-model="custExtNo"
              class="el-inputs"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label><span class="must-full">*</span>合同类型</label>
            <el-select v-model="custContractType" placeholder="">
              <el-option
                v-for="item in custType"
                :key="item.dict_code"
                :label="item.dict_value"
                :value="item.dict_code"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-col">
            <label class="">授信额度</label>
            <el-input
              v-model="custCreditSum"
              class="el-inputs"
              placeholder=""
              disabled
            >
              <template slot="append">元</template>
            </el-input>
          </el-col>
          <el-col :span="5" class="el-col a20">
            <label class="">已用信用</label>
            <el-input
              v-model="custCreditUsed"
              class="el-inputs"
              placeholder=""
              disabled
            >
              <template slot="append">元</template>
            </el-input>
          </el-col>
        </div>
      </div>
      <!-- 物资明细 -->
      <!-- 物资明细 -->
      <div class="input-div input-div-bor bortop0">
        <el-divider content-position="left">物资明细</el-divider>
        <div class="martop_10"></div>
        <div class>
          <el-table
            border
            center
            show-summary
            :data="tableData"
            class="el-table"
            ref="multipleTable"
            @selection-change="handleChange"
            :summary-method="getSummaries"
            max-height="288"
          >
            <el-table-column
              type="selection"
              width="55"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="行号"
              prop="rowno"
              width="55"
            ></el-table-column>
            <el-table-column
              prop="goodsCode"
              label="物料号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="物料名称"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsCategoryName"
              label="物料种类"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsSpec"
              label="物料规格"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="itemUnitName"
              label="基础单位"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="itemQty" label="数量" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="secUnitName"
              label="第二单位"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="secQty"
              label="第二数量"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-form>
    <!-- 选择公司弹窗 -->
    <compony-select
      v-if="componyShow"
      :tipShow="componyShow"
      @tipsCancle="tipsCancle"
      @tipsSure="tipsSure"
    ></compony-select>
    <!-- 选择部门弹窗 -->
    <department-select
      v-if="departmentShow"
      :tipShow="departmentShow"
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
    <!-- 选择客户弹窗 -->
    <customer-select
      v-if="customerShow"
      :tipShow="customerShow"
      @customerCancle="customerCancle"
      @customerSure="customerSure"
    ></customer-select>
    <!-- 选择供应商弹窗 -->
    <supplier-select
      v-if="supplierShow"
      :tipShow="supplierShow"
      @supplierCancle="supplierCancle"
      @supplierSure="supplierSure"
    ></supplier-select>
    <!-- 选择物料弹窗 -->
    <matter-select
      v-if="matterShow"
      :tipShow="matterShow"
      @matterCancle="matterCancle"
      @matterSure="matterSure"
    ></matter-select>
  </div>
</template>

<script>
import { mapState } from "vuex";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import staffSelect from "@/components/staffSelect.vue";
import projectSelect from "@/components/projectSelect.vue";
import manSelect from "@/components/manSelect.vue";
import customerSelect from "@/components/customerSelect.vue";
import supplierSelect from "@/components/supplierSelect.vue";
import matterSelect from "@/components/matterSelect.vue";

import Count from "@/assets/js/calculation";
import Amange from "@/api/contractMange/amange";
import "@/assets/css/contract.scss";
export default {
  name: "tabFirst",
  data() {
    return {
      componyShow: false, //银行弹窗
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      projectShow: false, //员工弹窗
      manShow: false, //人员弹窗
      customerShow: false, //客户弹窗
      supplierShow: false, //供应商弹窗
      matterShow: false, //物料弹窗
      matterName: {}, //物料
      companyName: {}, //公司
      branchName: {}, //部门
      staffName: {}, //员工
      projectName: {}, //项目
      contractNo: ``, //双边合同号
      extCode: ``, //外部合同号
      contractStatus: ``, //合同状态选择
      isInaType: [], //合同状态
      unitList: [], //单位列表
      signTime: ``, //签订日期
      contractEndDate: ``, //有效日期
      signPlace: ``, //签约地点
      createdTime: ``, //创建时间
      createdName: ``, //创建人
      supplierName: {}, //供应商
      supplierCreditSum: ``, //供应商授信额度
      supplierExtNo: ``, //供应商合同号
      supplierCreditUsed: ``, //供应商已用额度
      supplierContractType: ``, //供应商合同类型
      contractType: [], //供应商同类型列表
      custName: {}, //客户
      custCreditSum: ``, //客户授信额度
      custExtNo: ``, //客户合同号
      custCreditUsed: ``, //客户已用额度
      custContractType: ``, //客户合同类型
      custType: [], //客户合同类型列表
      tableData: [], //通讯表格
      selectioned: [], //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 10, //页显示条数
      total: 0, //总数目
      version: "",
      loading: true, //表格loading
      contractId: ``, //双边合同ID
      supplierLevelList: [], //供应商级别list
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerClose: {},
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      show: true
    };
  },
  created() {
    //获取合同状态
    this.htzt();
    this.gyshtzt();
    this.khhtzt();
    this.getUnit();
    //获取信息
    this.$route.query.id && this.getDetail();
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
    //获取信息
    getDetail() {
      let params = {
        contractId: this.$route.query.id,
        pageSize: 999
      };
      //基本信息
      Amange.getCon(params)
        .then(res => {
          let red = res.data;
          this.version = red.version;
          this.contractId = red.contractId; //双边合同id
          this.companyName.companyId = red.companyId; //公司
          this.companyName.companyName = red.companyName; //公司
          this.companyName.companyCode = red.companyCode; //公司
          this.companyName.baseCurrencyCode = red.baseCurrencyCode; //本位币编码
          this.branchName.branchId = red.orgId; //部门
          this.branchName.branchName = red.orgName; //部门
          this.branchName.branchCode = red.orgCode; //部门
          this.staffName.empName = red.bizPersonName; //业务员
          this.staffName.empCode = red.bizPersonCode; //业务员
          this.contractNo = red.contractNo; //双边合同号
          this.extCode = red.extCode; //外部合同号
          this.projectName.projectCode = red.projectCode; //项目好
          this.projectName.projectName = red.projectName; //项目名称
          this.signTime = red.signTime; //签订日期
          this.contractEndDate = red.contractEndDate; //有效日期
          this.signPlace = red.signPlace; //签约地点
          this.contractStatus = `${red.contractStatus}`;
          //red.contractStatus && red.contractStatus.toString(); //合同状态选择
          //
          this.supplierName.supplierId = red.supplierId; //项目好
          this.supplierName.supplierName = red.supplierName; //项目名称
          this.supplierName.supplierCode = red.supplierCode; //项目好
          this.supplierName.supplierLevel = red.supplierLevel; //供应商等级
          this.supplierExtNo = red.supplierExtNo; //供应商合同号
          this.supplierContractType =
            red.supplierContractType && red.supplierContractType.toString(); //供应商合同类型
          this.supplierCreditSum = red.supplierCreditSum; //供应商授信额度
          this.supplierCreditUsed = red.supplierCreditUsed; //供应商已用额度
          //
          this.custName.customerId = red.custId; //客户id
          this.custName.custName = red.custName; //客户名称
          this.custName.custCode = red.custCode; //客户编码
          this.custExtNo = red.custExtNo; //客户合同号
          this.custContractType =
            red.custContractType && red.custContractType.toString(); //客户合同类型
          this.custCreditSum = red.custCreditSum; //客户授信额度
          this.custCreditUsed = red.custCreditUsed; //客户已用额
        })
        .catch();
      //物料表
      Amange.getWuCon(params)
        .then(res => {
          this.tableData = res.data;
        })
        .catch();
    },
    to() {
      if (!Object.keys(this.companyName).length) {
        this.$openWarning(`请选择公司`);
        return false;
      }
      if (!Object.keys(this.branchName).length) {
        this.$openWarning(`请选择部门`);
        return false;
      }
      if (!Object.keys(this.staffName).length) {
        this.$openWarning(`请选择业务员`);
        return false;
      }
      if (this.contractNo == ``) {
        this.$openWarning(`请输入双边合同号`);
        return false;
      }
      if (this.extCode == ``) {
        this.$openWarning(`请输入外部合同号`);
        return false;
      }
      if (this.signTime == ``) {
        this.$openWarning(`请选择签订日期`);
        return false;
      }
      //
      if (!Object.keys(this.supplierName).length) {
        this.$openWarning(`请选择供应商`);
        return false;
      }
      if (this.supplierExtNo == ``) {
        this.$openWarning(`请输入供应商合同号`);
        return false;
      }
      if (this.supplierContractType == `` || this.custContractType == ``) {
        this.$openWarning(`请选择合同类型`);
        return false;
      }
      //
      if (!Object.keys(this.custName).length) {
        this.$openWarning(`请选择客户`);
        return false;
      }
      if (this.custExtNo == ``) {
        this.$openWarning(`请输入客户合同号`);
        return false;
      }
      let data = {
        odPsContract: {
          companyId: this.companyName.companyId, //公司
          companyName: this.companyName.companyName, //公司
          companyCode: this.companyName.companyCode, //公司
          baseCurrencyCode: this.companyName.baseCurrencyCode, //本位币编码
          orgId: this.branchName.branchId, //部门
          orgName: this.branchName.branchName, //部门
          orgCode: this.branchName.branchCode, //部门
          bizPersonName: this.staffName.empName, //业务员
          bizPersonCode: this.staffName.empCode, //业务员
          contractNo: this.contractNo, //双边合同号
          extCode: this.extCode, //外部合同号
          projectCode: this.projectName.projectCode, //项目好
          projectName: this.projectName.projectName, //项目名称
          signTime: this.signTime, //签订日期
          contractEndDate: this.contractEndDate, //有效日期
          signPlace: this.signPlace, //签约地点
          contractStatus: this.contractStatus, //合同状态选择
          //
          supplierId: this.supplierName.supplierId, //供应商id
          supplierName: this.supplierName.supplierName, //供应商名称
          supplierCode: this.supplierName.supplierCode, //供应商编码
          supplierExtNo: this.supplierExtNo, //供应商合同号
          supplierLevel: this.supplierName.supplierLevel, //供应商等级
          supplierContractType: this.supplierContractType, //供应商合同类型
          supplierCreditSum: this.supplierCreditSum, //供应商授信额度
          supplierCreditUsed: this.supplierCreditUsed, //供应商已用额度
          //
          custId: this.custName.customerId, //客户id
          custName: this.custName.customerName, //客户名称
          custCode: this.custName.customerCode, //客户编码
          custExtNo: this.custExtNo, //客户合同号
          custContractType: this.custContractType, //客户合同类型
          custCreditSum: this.custCreditSum, //客户授信额度
          custCreditUsed: this.custCreditUsed //客户已用额度
        },
        odPsContractItemsList: this.tableData
      };
      if (this.$route.query.id) {
        data.odPsContract.contractId = this.contractId;
        data.odPsContract.version = this.version;
      }
      this.$emit("get", data, 1);
    },
    changeEx(e) {
      this.supplierExtNo = e;
      this.custExtNo = e;
    },
    //获取合同状态/供应商级别
    htzt() {
      Amange.htzt()
        .then(res => {
          this.isInaType = res.data;
        })
        .catch();
      Amange.gysjb().then(res => {
        this.supplierLevelList = res.data;
      });
    },
    //获取供应商合同类型状态
    gyshtzt() {
      Amange.gyshtzt()
        .then(res => {
          this.contractType = res.data;
        })
        .catch();
    },
    //获取客户合同类型状态
    khhtzt() {
      Amange.khhtzt()
        .then(res => {
          this.custType = res.data;
        })
        .catch();
    },
    //第二单位/基本单位
    getUnit() {
      let data = {
        isInactiveList: 0
      };
      Amange.getUnit(data)
        .then(res => {
          this.unitList = res.data;
        })
        .catch();
    },
    //查询货币
    currency(e) {
      let params = { id: e };
      Amange.currency(params)
        .then(res => {
          this.companyName.baseCurrencyCode = res.data.currencyCode;
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
      this.currency(e.functionalCurrencyId);
      this.branchName = ``;
      this.staffName = ``;
      this.$root.Bus.$emit("companyName", e);
    },
    //签订日期
    changeTime(e) {
      this.$root.Bus.$emit("signTime", e);
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
      this.$root.Bus.$emit("branchName", e);
    },
    //员工弹窗打开
    staffTip() {
      if (this.companyName == `` || this.branchName == ``) {
        this.$openWarning("请先选择公司和部门");
        return false;
      }
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
      this.$root.Bus.$emit("staffName", e);
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
      this.$root.Bus.$emit("projectName", e);
    },
    //客户弹窗打开
    customerTip() {
      this.customerShow = true;
    },
    //客户弹窗关闭
    customerCancle() {
      this.customerShow = false;
    },
    //客户弹窗确定获取数据
    customerSure(e) {
      this.customerShow = false;
      this.custName = e;
      this.$root.Bus.$emit("custName", e);
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
      this.$root.Bus.$emit("supplierName", e);
    },
    //物料弹窗打开
    matterTip(index) {
      this.matterShow = true;
      this.index = index;
    },
    //物料弹窗关闭
    matterCancle() {
      this.matterShow = false;
    },
    //物料弹窗确定获取数据
    matterSure(e) {
      this.matterShow = false;
      this.matterName = e;
      let data = {
        edit: this.tableData[this.index].edit,
        one: this.tableData[this.index].one,
        rowno: this.tableData[this.index].rowno,
        goodsId: e.skuId,
        goodsCode: e.skuCode,
        goodsName: e.skuName,
        goodsCategory: e.categoryShowName,
        goodsSpec: e.propertyInfo,
        itemUnit: e.firstUnitName,
        itemQty: this.tableData[this.index].itemQty,
        secUnit: e.secUnitName,
        secQty: this.tableData[this.index].secQty,
        remark: this.tableData[this.index].remark
      };
      this.tableData[this.index] = data;
      this.$set(this.tableData, this.index, data);
      this.setWl();
    },
    //物料明细列表加入公共变量
    setWl() {
      this.$root.Bus.$emit("matterList", this.tableData);
    },
    //数据操作  1修改 0删除 3启用4禁用
    setUp() {
      if (!this.selectioned.length) {
        this.$openWarning("未选择数据");
        return false;
      }
      this.$confirm("确定删除吗？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let idSav = []; //修改数据
          let idNo = []; //新建数据
          for (const item of this.selectioned) {
            if (item.contractDetailId) {
              idSav.push(item.contractDetailId);
            } else {
              idNo.push(item);
            }
          }
          let params = {
            contractDetailIdList: idSav.join(",")
          };
          idSav.length &&
            Amange.delWuCon(params)
              .then(res => {
                this.$openSuccess(res.message);
              })
              .catch();
          this.getIndex(this.selectioned);
          this.deleIndex(this.selectioned);
        })
        .catch();
    },
    //获取删除位置
    getIndex(e) {
      let indexList = [];
      for (const get of e) {
        let del = this.tableData.findIndex(item => {
          return (
            item.one == get.one && item.contractDetailId == get.contractDetailId
          );
        });
        indexList.push(del);
      }
      this.$root.Bus.$emit("matterListIndex", indexList);
    },
    //删除方法
    deleIndex(e) {
      for (const get of e) {
        let del = this.tableData.findIndex(item => {
          return (
            item.one == get.one && item.contractDetailId == get.contractDetailId
          );
        });
        this.tableData.splice(del, 1);
      }
      this.setWl();
    },
    //表格选择
    handleChange(e) {
      this.selectioned = e;
    },
    //创建数据
    addList() {
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        rowno: (this.tableData.length + 1) * 10,
        goodsCode: ``,
        goodsName: ``,
        goodsCategory: ``,
        goodsSpec: ``,
        itemUnit: ``,
        itemQty: ``,
        secUnit: ``,
        secQty: ``,
        remark: ``
      };
      this.newTbale.push(data);
      let newTbale = [];
      newTbale.push(data);
      this.tableData = [...this.tableData, ...newTbale];
      this.setWl();
    },
    //保存数据
    addSub() {},
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        } else if (index === 7 || index === 9) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return Count.accAdd(prev, curr);
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = "N/A";
          }
        } else {
          sums[index] = "";
        }
      });
      return sums;
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
    // tableData: {
    //   handler() {
    //     this.setWl();
    //   },
    //   deep: true
    // }
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    projectSelect,
    manSelect,
    customerSelect,
    supplierSelect,
    matterSelect
  }
};
</script>

<style lang="scss">
</style>
