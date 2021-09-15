<template>
  <div>
    <el-col :span="5" class="el-col" v-if="matchKey === 'poNo' && checked">
      <label>采购合同号</label>
      <el-input
        v-model="poNo_"
        class="el-inputs"
        placeholder="请输入"
        @change="getValue"
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'supplier' && checked">
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
      <span class="comicon" @click="supplierTip" style="width: 10%;z-index: 2">
        <i class="el-icon-search"></i>
      </span>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'staffName' && checked">
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
      >
        <i class="el-icon-search"></i>
      </span>
    </el-col>
    <el-col
      :span="5"
      class="el-colc"
      v-if="matchKey === 'contractStatus' && checked"
    >
      <label>合同状态</label>
      <zl-select
        v-model="contractStatus_"
        placeholder="请选择"
        @change="getValue"
        multiple
        collapse-tags
      >
        <zl-option
          v-for="item in isInaType"
          :key="item.dict_code"
          :label="item.dict_value"
          :value="item.dict_key"
        ></zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'company' && checked">
      <label>公司</label>
      <el-input
        v-model="company.companyName"
        class="el-inputs"
        placeholder="请选择"
        disabled
      ></el-input>
      <span class="comicon" @click="componyTip">
        <i class="el-icon-search"></i>
      </span>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'branchName' && checked"
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
      class="el-col"
      v-if="matchKey === 'fwContractNo' && checked"
    >
      <label>{{ label }}</label>
      <el-input
        v-model="fwContractNo"
        class="el-inputs"
        placeholder="请选择"
        disabled
      ></el-input>
      <span class="comicon" @click="agreeTip">
        <i class="el-icon-search"></i>
      </span>
    </el-col>

    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'soContractNo' && checked"
    >
      <label>销售合同号</label>
      <el-input
        @change="getValue"
        v-model="soContractNo_"
        class="el-inputs"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'contractNo2' && checked"
    >
      <label>双边合同号</label>
      <el-input
        @change="getValue"
        v-model="contractNo2_"
        class="el-inputs"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'extCode' && checked">
      <label>外部合同号</label>
      <el-input
        @change="getValue"
        v-model="extCode_"
        class="el-inputs"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'createdName' && checked"
    >
      <label>创建人</label>
      <el-input
        @change="getValue"
        v-model="createdName_"
        class="el-inputs"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'projectCode' && checked"
    >
      <label>项目号</label>
      <el-input
        v-model="project.projectCode"
        class="el-inputs"
        placeholder="请选择"
        disabled
      ></el-input>
      <span class="comicon" @click="projectTip">
        <i class="el-icon-search"></i>
      </span>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'project' && checked">
      <label>项目名称</label>
      <el-input
        v-model="project.projectName"
        class="el-inputs"
        placeholder="请选择"
        disabled
      ></el-input>
      <span class="comicon" @click="projectTip">
        <i class="el-icon-search"></i>
      </span>
    </el-col>
    <el-col :span="5" class="el-colc" v-if="matchKey === 'signTime' && checked">
      <label>签订日期</label>
      <el-date-picker
        @change="getValue"
        v-model="signTime_"
        class="el-input2"
        size="mini"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'contractDate' && checked"
    >
      <label>有效日期</label>
      <el-date-picker
        @change="getValue"
        v-model="contractDate_"
        class="el-input2"
        size="mini"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'contractEndDate' && checked"
    >
      <label>有效日期</label>
      <el-date-picker
        @change="getValue"
        v-model="contractEndDate_"
        class="el-input2"
        size="mini"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'createdTime' && checked"
    >
      <label>创建日期</label>
      <el-date-picker
        @change="getValue"
        v-model="createdTime_"
        class="el-input2"
        size="mini"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-col>
    <!-- <el-col :span="5" class="el-colc">
      <label>合同类型</label>
      <zl-select v-model="poType" placeholder="请选择">
        <zl-option
          v-for="item in contractType"
          :key="item.dict_code"
          :label="item.dict_value"
          :value="item.dict_code"
        ></zl-option>
      </zl-select>
    </el-col> -->
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
    <el-col :span="5" class="el-col" v-if="matchKey === 'cName' && checked">
      <label>销售客户</label>
      <zl-select  v-model="cName_"
                  @change="getValue"
                  class="el-inputs"
                  placeholder="请选择"
                  multiple
                  filterable
                  remote
                  :remote-method="getCname"
                  collapse-tags
                  value-key="customerId"

      >
        <zl-option
            v-for="item in cNameList_"
            :key="item.customerId"
            :label="item.customerName"
            :value="item">
        </zl-option>
      </zl-select>
      <span class="comicon" @click="customerTip" style="width: 10%;z-index: 2"
      ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'customer' && checked">
      <label>销售客户</label>
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
    <el-col :span="5" class="el-col" v-if="matchKey === 'signPlace' && checked">
      <label>签约地点</label>
      <el-input
        v-model="signPlace_"
        @change="getValue"
        class="el-inputs"
        placeholder="请输入"
      ></el-input>
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
      class="el-colc"
      v-if="matchKey === 'tradeType' && checked"
    >
      <label>购销方式</label>
      <zl-select
        v-model="tradeType_"
        placeholder="请选择"
        @change="getValue"
        multiple
        collapse-tags
      >
        <zl-option
          v-for="item in gxfsList"
          :key="item.dict_code"
          :label="item.dict_value"
          :value="item.dict_key"
        ></zl-option>
      </zl-select>
    </el-col>
    <el-col
      :span="5"
      class="el-colc"
      v-if="matchKey === 'contractCat' && checked"
    >
      <label>合同类型</label>
      <zl-select
          v-model="contractCat_"
          placeholder="请选择"
          @change="getValue"
          multiple
          collapse-tags
      >
        <zl-option
          v-for="item in contractType"
          :key="item.dict_code"
          :label="item.dict_value"
          :value="item.dict_key"
        ></zl-option>
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
      contractNo_: this.fwContractNo,
      extCode_: this.extCode,
      signTime_: this.signTime,
      contractDate_: this.contractDate,
      contractStatus_: this.contractStatus,
      haveReceiveOrginCopy_: this.haveReceiveOrginCopy,
      poNo_: this.poNo,
      createdTime_: this.createdTime,
      signPlace_: this.signPlace,
      soContractNo_: this.soContractNo,
      contractNo2_:this.contractNo2,
      tradeType_: this.tradeType,
      contractCat_: this.contractCat,
      currencyRate_: this.currencyRate,
      createdName_: this.createdName,
      contractEndDate_: this.contractEndDate,
      branchName_: this.branchName,
      departmentList_:this.departmentList,
      customer_:this.customer,
      cName_:this.cName,
      customerList_:this.customerList,
      cNameList_:this.cNameList,
      supplierList_:this.supplierList,
      supplier_:this.supplier,
      staffName_:this.staffName,
      staffNameList_:this.staffNameList,
    };
  },
  methods: {
    getValue(val) {
      this.$emit("changeInput", { val, key: this.matchKey });
    },
    getDepartment(str){
      if(!str){
        return
      }
      // if(!this.company.companyId){
      //   this.$openWarning("请先选择公司");
      //   return
      // }

      let params = {
        pageNum: 1,
        rows: 200,
        companyId: this.company.companyId ,
        branchName: str,
        branchCode: '',
        isCollected:0
      };
      Compony.brnchList2(params)
          .then(res => {
            this.departmentList_ = res.data.list;
          })
          .catch(() => {
          });

    },
    getCustomer(str){
      if(!str){
        return
      }
      let params = {
        pageNum: 1,
        rows: 200,
        customerName: str,
        isCollected:0
      };
      PopupApi.customerSelect2(params)
          .then(res => {
            this.customerList_ =  res.data.list;
          })
          .catch(() => {
          });

    },
    getCname(str){
      if(!str){
        return
      }
      let params = {
        pageNum: 1,
        rows: 200,
        customerName: str,
        isCollected:0
      };
      PopupApi.customerSelect2(params)
          .then(res => {
            this.cNameList_ =  res.data.list;
          })
          .catch(() => {
        });
    },
    getSupplier(str){
      if(!str){
        return
      }
      PopupApi.supplierSelect2({
        page: 1,
        pageSize: 200,
        supplierName: str,
        //isInactive: 0,
        isCollected:0
      }).then(res => {
        if (res.code == "success") {
          this.supplierList_ = res.data.list;
        } else {
          this.$openWarning(res.message);
        }
      })
    },
    getStaffNameList(str){
      if(!str){
        return
      }
      let params = {
        pageNum: 1,
        rows: 200,
        // companyId: this.data.companyId,
        // branchName: this.data.branchName,
        empName: str,
        isInactive:0
      };
      Compony.empList(params)
          .then(res => {
            this.staffNameList_ = res.data.list;
          })
          .catch(() => {
          });
    }
  },
  props: {
    createdName:{
      type:String | Object
    },
    signPlace:{
      type:Object | String
    },
    coinTip: {
      type: Function
    },
    label: {
      type: String
    },
    agreeTip: {
      type: Function
    },
    gxfsList: {
      type: Array
    },
    customer: {
      type: Object | String
    },
    soContractNo: {
      type: Number | String
    },
    contractNo2: {
      type: Number | String
    },
    poNo: {
      type: Number | String
    },
    checked: {
      type: Boolean
    },

    matchKey: {
      type: String
    },
    company: {
      type: Object | String
    },
    cName: {
      type: Object | String
    },
    branchName: {
      type: Object | String
    },
    fwContractNo: {
      type: Number | String
    },
    extCode: {
      type: Number | String
    },
    supplier: {
      type: Object | String
    },
    staffName: {
      type: Object | Array
    },
    currency: {
      type: Object | String
    },
    currencyRate: {
      type: Object | String
    },

    project: {
      type: Object | String
    },
    signTime: {
      type: Object | String
    },
    contractDate: {
      type: Object | String
    },
    contractEndDate: {
      type: Object | String
    },
    createdTime: {
      type: Object | String
    },
    contractStatus: {
      type: Object | Array
    },
    haveReceiveOrginCopy: {
      type: Object | String
    },
    componyTip: {
      type: Function
    },
    departmentTip: {
      type: Function
    },

    supplierTip: {
      type: Function
    },
    staffTip: {
      type: Function
    },
    projectTip: {
      type: Function
    },

    isInaType: {
      type: Array
    },
    contractType: {
      type: Array
    },
    customerTip: {
      type: Function
    },
    createdName: {
      type: String
    },
    tradeType: {
      type: Object | Array
    },
    contractCat: {
      type: Object | Array
    },
    departmentList:{
      type:Array | Object
    },
    customerList:{
      type:Array | Object
    },
    supplierList:{
      type:Array | Object
    },
    staffNameList:{
      type:Array | Object
    }
  },
  watch: {
    fwContractNo(val) {
      this.contractNo_ = val;
    },
    extCode(val) {
      this.extCode_ = val;
    },
    signTime(val) {
      this.signTime_ = val;
    },
    contractDate(val) {
      this.contractDate_ = val;
    },
    contractStatus(val) {
      this.contractStatus_ = val;
    },
    haveReceiveOrginCopy(val) {
      this.haveReceiveOrginCopy_ = val;
    },
    poNo(val) {
      this.poNo_ = val;
    },
    createdTime(val) {
      this.createdTime_ = val;
    },
    signPlace(val) {
      this.signPlace_ = val;
    },
    soContractNo(val) {
      this.soContractNo_ = val;
    },
    contractNo2(val) {
      this.contractNo2_ = val;
    },
    tradeType(val) {
      this.tradeType_ = val;
    },
    contractCat(val) {
      this.contractCat_ = val;
    },
    currencyRate(val) {
      this.currencyRate_ = val;
    },
    createdName(val) {
      this.createdName_ = val;
    },
    contractEndDate(val) {
      this.contractEndDate_ = val;
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
    cName(value){
      this.cName_ = value;
    },
    cNameList(value) {
      this.cNameList_ = value;
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

  }
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
