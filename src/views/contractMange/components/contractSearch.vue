<template>
  <div>
    <el-col :span="5" v-if="matchKey === 'company' && checked" class="el-col">
      <label>公 司</label>
      <el-input
        v-model="company.companyName"
        class="el-inputs"
        placeholder="请选择"
        required
        disabled
      ></el-input>
      <span class="comicon" @click="componyTip"
        ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'branchName' && checked"
      class="el-col"
    >
      <label>部门</label>
      <zl-select  v-model="branchName_"
                  @change="getValue"
                  class="el-inputs"
                  placeholder="请选择"
                  multiple
                  filterable
                  remote
                  :remote-method="getDepartment"
                  collapse-tags
                  value-key="branchId"

      >
        <zl-option
            v-for="item in departmentList_"
            :key="item.branchId"
            :label="item.branchName"
            :value="item">
        </zl-option>
      </zl-select>
      <span class="comicon" @click="departmentTip" style="width: 10%;z-index: 2"
        ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'contractNo' && checked"
      class="el-col"
    >
      <label>协议编号</label>
      <el-input
        v-model="contractNo_"
        @change="getValue"
        class="el-inputs"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'contractNo2' && checked"
    >
      <label>协议编号</label>
      <el-input
        @change="getValue"
        v-model="contractNo2_"
        class="el-inputs"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <!-- <el-col
        :span="5"
        class="el-col"
      >
        <label>协议状态</label>
        <zl-select
          v-model="contractState"
          placeholder="请选择"
        >
          <zl-option
            v-for="item in isInaType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </zl-option>
        </zl-select>
      </el-col> -->
    <el-col :span="5" v-if="matchKey === 'extCode' && checked" class="el-col">
      <label>外部合同号</label>
      <el-input
        v-model="extCode_"
        @change="getValue"
        class="el-inputs"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'poNo' && checked">
      <label>采购合同号</label>
      <el-input
        v-model="poNo"
        class="el-inputs"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'customer' && checked" class="el-col">
      <label>客户</label>
      <zl-select  v-model="customer_"
                  @change="getValue"
                  class="el-inputs"
                  placeholder="请选择"
                  multiple
                  filterable
                  remote
                  :remote-method="getCustomer"
                  collapse-tags
                  value-key="customerId"

      >
        <zl-option
            v-for="item in customerList_"
            :key="item.customerId"
            :label="item.customerName"
            :value="item">
        </zl-option>
      </zl-select>
      <span class="comicon" @click="customerTip" style="width: 10%;z-index: 2"
        ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'supplier' && checked" class="el-col">
      <label>供应商</label>
      <zl-select  v-model="supplier_"
                  @change="getValue"
                  class="el-inputs"
                  placeholder="请选择"
                  multiple
                  filterable
                  remote
                  :remote-method="getSupplier"
                  collapse-tags
                  value-key="supplierId"
      >
        <zl-option
            v-for="item in supplierList_"
            :key="item.supplierId"
            :label="item.supplierName"
            :value="item">
        </zl-option>
      </zl-select>
      <span class="comicon" @click="supplierTip" style="width: 10%;z-index: 2"
        ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'staffName' && checked" class="el-col">
      <label>业务员</label>
      <zl-select  v-model="staffName_"
                  @change="getValue"
                  class="el-inputs"
                  placeholder="请选择"
                  multiple
                  filterable
                  remote
                  :disabled="!(this.company.companyId && this.branchName.length >0)"
                  :remote-method="getStaffNameList"
                  collapse-tags
                  value-key="empId"

      >
        <zl-option
            v-for="item in staffNameList_"
            :key="item.empId"
            :label="item.empName"
            :value="item">
        </zl-option>
      </zl-select>
      <span class="comicon" @click="staffTip" style="width: 10%;z-index: 2"
        ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'contractCat' && checked"
      class="el-col"
    >
      <label>协议类型</label>
      <zl-select
        v-model="contractCat_"
        placeholder="请选择"
        clearable
        @change="
          val => {
            getValue(val);
            handleContractTypeChange();
          }
        "
      >
        <zl-option
          v-for="item in contractType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </zl-option>
      </zl-select>
      <!-- <el-input
        v-model="staffName.staffName"
        class="el-inputs"
        placeholder="请选择"
        disabled
      ></el-input>
      <span
        class='comicon'
        @click="staffTip"
      ><i class="el-icon-search"></i></span> -->
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'projectCode' && checked"
      class="el-col"
    >
      <label>项目号</label>
      <el-input
        v-model="projectCode"
        class="el-inputs"
        placeholder="请选择"
        disabled
      ></el-input>
      <span class="comicon" @click="projectTip"
        ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'project' && checked" class="el-col">
      <label>项目名称</label>
      <el-input
        v-model="project.projectName"
        class="el-inputs"
        placeholder="请选择"
        disabled
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'signingDate' && checked"
      class="el-col"
    >
      <label>签订日期</label>
      <el-date-picker
        v-model="signingDate_"
        @change="getValue"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="-"
        value-format="timestamp"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="el-input2"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
      <!-- <el-date-picker
          v-model="signingDate"
          type="date"
          value-format="timestamp"
          placeholder="选择日期"
        >
        </el-date-picker> -->
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'contractDateArray' && checked"
      class="el-col"
    >
      <label>有效日期</label>
      <el-date-picker
        v-model="contractDateArray_"
        type="daterange"
        class="el-input2"
        align="right"
        unlink-panels
        range-separator="-"
        value-format="timestamp"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="getValue"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
      <!-- <el-date-picker
          v-model="contractEndDate"
          type="date"
          value-format="timestamp"
          placeholder="选择日期"
        >
        </el-date-picker> -->
    </el-col>
    <el-col :span="5" v-if="matchKey === 'currency' && checked" class="el-colc">
      <label>业务币币别</label>
      <el-input
        v-model="currency.currencyName"
        class="el-inputs"
        placeholder="请选择"
        disabled
      ></el-input>
      <span class="comicon" @click="coinTip"
        ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'currencyRate' && checked"
      class="el-col"
    >
      <label>本位币汇率</label>
      <el-input
        v-model="currencyRate_"
        @change="getValue"
        class="el-inputs"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'contractStatus' && checked"
      class="el-col"
    >
      <label>协议状态</label>
      <zl-select
        v-model="contractStatus_"
        @change="getValue"
        placeholder="请选择"
        multiple
        collapse-tags
      >
        <zl-option
          v-for="item in isInaType"
          :key="item.dict_key"
          :label="item.dict_value"
          :value="item.dict_key"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'haveReceiveOrginCopy' && checked">
      <label>是否双签</label>
      <zl-select
        v-model="haveReceiveOrginCopy_"
        clearable
        placeholder="请选择"
        size="small"
        @change="getValue"
      >
        <zl-option label="否" value="0"></zl-option>
        <zl-option label="已上传" value="1"></zl-option>
        <zl-option label="收到原件" value="2"></zl-option>
      </zl-select>
    </el-col>
  </div>
</template>

<script>
import Compony from "@/api/comdepartment/componySelect";
import PopupApi from "@/api/component";
import ZlOption from "@/components/zl-select/src/option";

export default {
  name: "contractSearch",
  components: {ZlOption},
  data() {
    return {
      contractNo_: this.contractNo,
      contractNo2_:this.contractNo2,
      extCode_: this.extCode,
      contractCat_: this.contractCat,
      signingDate_: this.signingDate,
      contractDateArray_: this.contractDateArray,
      contractStatus_: this.contractStatus,
      haveReceiveOrginCopy_: this.haveReceiveOrginCopy,
      currencyRate_: this.currencyRate,
      poNo_: this.poNo,
      branchName_: this.branchName,
      departmentList_: this.departmentList,
      customer_: this.customer,
      customerList_: this.customerList,
      supplierList_: this.supplierList,
      supplier_: this.supplier,
      staffName_: this.staffName,
      staffNameList_: this.staffNameList,
    };
  },
  methods: {
    getValue(val) {
      this.$emit("changeInput", { val, key: this.matchKey });
    },
    getDepartment(str) {
      if (!str) {
        return;
      }
      // if (!this.company.companyId) {
      //   this.$openWarning("请先选择公司");
      //   return;
      // }

      let params = {
        pageNum: 1,
        rows: 200,
        companyId: this.company.companyId,
        branchName: str,
        branchCode: "",
        isCollected: 0,
      };
      Compony.brnchList2(params)
        .then((res) => {
          this.departmentList_ = res.data.list;
        })
        .catch(() => {});
    },
    getCustomer(str) {
      if (!str) {
        return;
      }
      let params = {
        pageNum: 1,
        rows: 200,
        customerName: str,
        isCollected: 0,
      };
      PopupApi.customerSelect2(params)
        .then((res) => {
          this.customerList_ = res.data.list;
        })
        .catch(() => {});
    },
    getSupplier(str) {
      if (!str) {
        return;
      }
      PopupApi.supplierSelect2({
        page: 1,
        pageSize: 200,
        supplierName: str,
     //   isInactive: 0,
        isCollected: 0,
      }).then((res) => {
        if (res.code == "success") {
          this.supplierList_ = res.data.list;
        } else {
          this.$openWarning(res.message);
        }
      });
    },
    getStaffNameList(str) {
      if (!str) {
        return;
      }
      let params = {
        pageNum: 1,
        rows: 200,
        // companyId: this.data.companyId,
        // branchName: this.data.branchName,
        empName: str,
       // isInactive: 0,
        isCollected: 0,
      };
      Compony.empList2(params)
        .then((res) => {
          this.staffNameList_ = res.data.list;
        })
        .catch(() => {});
    },
  },
  props: {
    poNo: {
      type: Number | String,
    },
    checked: {
      type: Boolean,
    },
    pickerOptions: {
      type: Object,
    },
    matchKey: {
      type: String,
    },
    company: {
      type: Object | String,
    },
    branchName: {
      type: Object | String,
    },
    contractNo: {
      type: Number | String,
    },
    contractNo2: {
      type: Number | String,
    },
    extCode: {
      type: Number | String,
    },
    customer: {
      type: Object | String,
    },
    supplier: {
      type: Object | String,
    },
    staffName: {
      type: Object | String,
    },
    contractCat: {
      type: Object | Array,
    },
    projectCode: {
      type: Object | String,
    },
    project: {
      type: Object | String,
    },
    signingDate: {
      type: Object | String,
    },
    contractDateArray: {
      type: Object | String,
    },
    currency: {
      type: Object | String,
    },
    currencyRate: {
      type: Object | String,
    },
    contractStatus: {
      type: Object | Array,
    },
    haveReceiveOrginCopy: {
      type: Object | String,
    },
    componyTip: {
      type: Function,
    },
    departmentTip: {
      type: Function,
    },
    customerTip: {
      type: Function,
    },
    supplierTip: {
      type: Function,
    },
    staffTip: {
      type: Function,
    },
    projectTip: {
      type: Function,
    },
    coinTip: {
      type: Function,
    },
    handleContractTypeChange: {
      type: Function,
    },
    isInaType: {
      type: Array,
    },
    contractType: {
      type: Array,
    },
    departmentList: {
      type: Array | String,
    },
    customerList: {
      type: Array | String,
    },
    supplierList: {
      type: Array | String,
    },
    staffNameList: {
      type: Array | String,
    },
  },
  watch: {
    contractNo(value) {
      this.contractNo_ = value;
    },
    contractNo2(value) {
      this.contractNo2_ = value;
    },
    extCode(value) {
      this.extCode_ = value;
    },
    contractCat(value) {
      this.contractCat_ = value;
    },
    signingDate(value) {
      this.signingDate_ = value;
    },
    contractDateArray(value) {
      this.contractDateArray_ = value;
    },
    contractStatus(value) {
      this.contractStatus_ = value;
    },
    haveReceiveOrginCopy(value) {
      this.haveReceiveOrginCopy_ = value;
    },
    currencyRate(value) {
      this.currencyRate_ = value;
    },
    poNo(value) {
      this.poNo_ = value;
    },
    branchName(value) {
      this.branchName_ = value;
    },
    departmentList(value) {
      this.departmentList_ = value;
    },
    customerList(value) {
      this.customerList_ = value;
    },
    customer(value) {
      this.customer_ = value;
    },
    supplier(value) {
      this.supplier_ = value;
    },
    supplierList(value) {
      this.supplierList_ = value;
    },
    staffName(value) {
      this.staffName_ = value;
    },
    staffNameList(value) {
      this.staffNameList_ = value;
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-select__tags {
  .el-tag--light {
    height: auto;
    line-height: normal;
  }
}
</style>
