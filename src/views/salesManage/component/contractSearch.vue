<template>
  <div>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'companyName' && checked"
    >
      <label>公司</label>
      <el-input
        v-model="company.companyName"
        class="el-inputs"
        size="small"
        placeholder="请选择"
        disabled
      ></el-input>
      <span class="comicon" @click="componyTip"
        ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'branch' && checked"
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
    <el-col :span="5" class="el-col" v-if="matchKey === 'staffName' && checked">
      <label>业务员</label>
      <zl-select  v-model="staffName_"
                  @change="getValue"
                  class="el-inputs"
                  placeholder="请选择"
                  multiple
                  filterable
                  remote
                  :disabled="!(this.company.companyId && this.branch.length >0)"
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
      class="el-col"
      v-if="matchKey === 'extContractCode' && checked"
    >
      <label>外部合同号</label>
      <el-input
        size="small"
        v-model="extContractCode_"
        class="el-inputs"
        placeholder="请输入"
        @change="getValue"
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'doNo' && checked">
      <label>{{label}}</label>
      <el-input
        size="small"
        v-model="doNo_"
        class="el-inputs"
        placeholder="请输入"
        @change="getValue"
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'soContractNo' && checked">
      <label>{{label}}</label>
      <el-input
        size="small"
        v-model="soContractNo_"
        class="el-inputs"
        placeholder="请输入"
        @change="getValue"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'warehouseName' && checked"
    >
      <label>仓库</label>
      <el-input
        v-model="warehouse.warehouseName"
        size="small"
        class="el-inputs"
        placeholder="请选择"
        disabled
      ></el-input>
      <span class="comicon" @click="warehouseTips"
        ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'doDate' && checked">
      <label>出库日期</label>
      <el-date-picker
        class="el-inputs el-input2"
        v-model="doDate_"
        @change="getValue"
        type="daterange"
        size="mini"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
      >
      </el-date-picker>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'customer' && checked"
    >
      <label>销售客户</label>
      <zl-select
        v-model="customer_"
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
      <span class="comicon" @click="customerTips" style="width: 10%;z-index: 2"
        ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'signReceivedDate' && checked"
    >
      <label>签收日期</label>
      <el-date-picker
        class="el-inputs el-input2"
        v-model="signReceivedDate_"
        @change="getValue"
        type="daterange"
        size="mini"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" class="el-colc" v-if="matchKey === 'doType' && checked">
      <label>放货类型</label>
      <zl-select
        clearable
        size="small"
        class="el-inputs el-select"
        v-model="doType_"
        placeholder="请选择"
        @change="getValue"
      >
        <zl-option
          v-for="item in doTypeList"
          :key="item.dict_code"
          :label="item.dict_value"
          :value="item.dict_key"
        ></zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'reciver' && checked">
      <label>收件人</label>
      <el-input
        class="el-inputs"
        v-model="reciver_"
        size="small"
        placeholder="请输入"
        @change="getValue"
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-colc" v-if="matchKey === 'doStatus' && checked">
      <label>单据状态</label>
      <zl-select
        clearable
        size="small"
        class="el-inputs el-select"
        v-model="doStatus_"
        placeholder="请选择"
        @change="getValue"
        multiple
        collapse-tags
      >
        <zl-option
          v-for="item in doStatusList"
          :key="item.dict_code"
          :label="item.dict_value"
          :value="item.dict_key"
        ></zl-option>
      </zl-select>
    </el-col>
    <el-col
      :span="5"
      class="el-colc"
      v-if="matchKey === 'contractType' && checked"
    >
      <label>销售类型</label>
      <zl-select
        clearable
        size="small"
        class="el-inputs el-select"
        v-model="contractType_"
        placeholder="请选择"
        @change="getValue"
        multiple
        collapse-tags
      >
        <zl-option
          v-for="item in contractTypeList"
          :key="item.dict_code"
          :label="item.dict_value"
          :value="item.dict_key"
        ></zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-colc" v-if="matchKey === 'soType' && checked">
      <label>销售类型</label>
      <zl-select
        clearable
        size="small"
        class="el-inputs el-select"
        v-model="soType_"
        placeholder="请选择"
        @change="getValue"
      >
        <zl-option
          v-for="item in contractTypeList"
          :key="item.dict_code"
          :label="item.dict_value"
          :value="item.dict_key"
        ></zl-option>
      </zl-select>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'createdTime' && checked"
    >
      <label>创建时间</label>
      <el-date-picker
        style="width:70%"
        v-model="createdTime_"
        @change="getValue"
        type="daterange"
        class="el-inputs el-input2"
        size="mini"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        clearable
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'creattime' && checked">
      <label>创建时间</label>
      <el-date-picker
        style="width:70%"
        v-model="creattime_"
        @change="getValue"
        type="daterange"
        class="el-inputs el-input2"
        size="mini"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'createdName' && checked"
    >
      <label>创建人</label>
      <el-input
        size="small"
        v-model="createdName_"
        class="el-inputs"
        placeholder="请输入"
        @change="getValue"
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'createdBy' && checked">
      <label>创建人</label>
      <el-input
        size="small"
        v-model="createdBy_"
        class="el-inputs"
        placeholder="请输入"
        @change="getValue"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'isSentConfirm' && checked"
    >
      <label>是否确认实发</label>
      <zl-select
        clearable
        size="small"
        class="el-inputs el-select"
        v-model="isSentConfirm_"
        placeholder="请选择"
        @change="getValue"
      >
        <zl-option label="否" value="0"></zl-option>
        <zl-option label="是" value="1"></zl-option>
      </zl-select>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'warrantCode' && checked"
    >
      <label>凭证号</label>
      <el-input
        v-model="warrantCode_"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'warrantMonth' && checked"
    >
      <label>期间</label>
      <el-date-picker
        type="month"
        size="small"
        v-model="warrantMonth_"
        @change="getValue"
        placeholder="请选择"
        value-format="yyyy-MM"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'undoCode' && checked">
      <label>退货单号</label>
      <el-input
        size="small"
        v-model="undoCode_"
        class="el-inputs"
        placeholder="请输入"
        @change="getValue"
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'undoDate' && checked">
      <label>退货日期</label>
      <el-date-picker
        class="el-input2"
        v-model="undoDate_"
        @change="getValue"
        type="daterange"
        size="mini"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
      >
      </el-date-picker>
    </el-col>
    <el-col
      :span="5"
      class="el-colc"
      v-if="matchKey === 'undoStatus' && checked"
    >
      <label>状态</label>
      <zl-select
        clearable
        size="small"
        class="el-select"
        v-model="undoStatus_"
        placeholder="请选择"
        @change="getValue"
        multiple
        collapse-tags
      >
        <zl-option
          v-for="item in undoStatusList"
          :key="item.dict_code"
          :label="item.dict_value"
          :value="item.dict_key"
        ></zl-option>
      </zl-select>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'invoiceCode' && checked"
    >
      <label>发票单据号</label>
      <el-input
        size="small"
        v-model="invoiceCode_"
        class="el-inputs"
        placeholder="请输入"
        @change="getValue"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'invoiceDate' && checked"
    >
      <label>开票日期</label>
      <el-date-picker
        class="el-input2"
        v-model="invoiceDate_"
        @change="getValue"
        type="daterange"
        size="mini"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
      >
      </el-date-picker>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'currencyName' && checked"
    >
      <label>业务币种</label>
      <el-input
        v-model="currencyName.currencyName"
        size="small"
        class="el-inputs"
        placeholder="请选择"
        disabled
      ></el-input>
      <span class="comicon" @click="coinTips"
        ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'baseCurrencyRate' && checked"
    >
      <label>本位币汇率</label>
      <el-input
        size="small"
        v-model="baseCurrencyRate_"
        class="el-inputs"
        placeholder="请输入"
        @change="getValue"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      class="el-colc"
      v-if="matchKey === 'invoiceType' && checked"
    >
      <label>发票类型</label>
      <zl-select
        clearable
        size="small"
        class="el-inputs el-select"
        v-model="invoiceType_"
        placeholder="请选择"
        @change="getValue"
      >
        <zl-option
          v-for="item in invoiceTypeList"
          :key="item.dict_code"
          :label="item.dict_value"
          :value="item.dict_key"
        ></zl-option>
      </zl-select>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'extInvoiceCode' && checked"
    >
      <label>发票外部编号</label>
      <el-input
        size="small"
        v-model="extInvoiceCode_"
        class="el-inputs"
        placeholder="请输入"
        @change="getValue"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      class="el-colc"
      v-if="matchKey === 'invoiceStatus' && checked"
    >
      <label>发票状态</label>
      <zl-select
        clearable
        size="small"
        class="el-inputs el-select"
        v-model="invoiceStatus_"
        placeholder="请选择"
        @change="getValue"
        multiple
        collapse-tags
      >
        <zl-option
          v-for="item in invoiceStatusList"
          :key="item.dict_code"
          :label="item.dict_value"
          :value="item.dict_key"
        ></zl-option>
      </zl-select>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'invoiceQty' && checked"
    >
      <label>开票数量</label>
      <el-input
        size="small"
        v-model="invoiceQty_"
        class="el-inputs"
        placeholder="请输入"
        @change="getValue"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      style="margin-bottom:10px"
      v-if="matchKey === 'writeoffWarrantCode' && checked"
    >
      <label>冲销凭证号</label>
      <el-input
        v-model="writeoffWarrantCode_"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      style="margin-bottom:10px"
      v-if="matchKey === 'writeoffWarrantMonth' && checked"
    >
      <label>冲销期间</label>
      <el-date-picker
        type="month"
        size="small"
        v-model="writeoffWarrantMonth_"
        @change="getValue"
        placeholder="请选择"
        value-format="yyyy-MM"
      >
      </el-date-picker>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'contractNoPs' && checked"
    >
      <label>ERP合同号</label>
      <el-input
        v-model="contractNoPs_"
        @change="getValue"
        class="el-inputs"
        placeholder="请输入"
        clearable
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'extSoNo' && checked">
      <label>外部合同号</label>
      <el-input
        v-model="extSoNo_"
        @change="getValue"
        class="el-inputs"
        placeholder="请输入"
        clearable
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'dockSoNo' && checked">
      <label>码单号</label>
      <el-input
          v-model="dockSoNo_"
          @change="getValue"
          class="el-inputs"
          placeholder="请输入"
          clearable
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'contractCode' && checked">
      <label>销售合同号</label>
      <el-input
          v-model="contractCode_"
          @change="getValue"
          class="el-inputs"
          placeholder="请输入"
          clearable
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-colc" v-if="matchKey === 'setttime' && checked">
      <label>结算日期</label>
      <el-date-picker
        style="width:70%"
        v-model="setttime_"
        @change="getValue"
        type="daterange"
        size="mini"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
        clearable
      >
      </el-date-picker>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'supplierName' && checked"
    >
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
    <el-col :span="5" class="el-col" v-if="matchKey === 'status' && checked">
      <label>单据状态</label>
      <zl-select
        clearable
        v-model="status_"
        placeholder="请选择"
        class="el-select"
        @change="getValue"
        multiple
        collapse-tags
      >
        <zl-option
          v-for="item in mytypearr"
          :key="item.dict_code"
          :label="item.dict_value"
          :value="item.dict_key"
        >
        </zl-option>
      </zl-select>
    </el-col>
  </div>
</template>

<script>
import Compony from "@/api/comdepartment/componySelect";
import PopupApi from "@/api/component";
export default {
  name: "contractSearch",
  data() {
    return {
      extContractCode_: this.extContractCode,
      doNo_: this.doNo,
      soContractNo_: this.soContractNo,
      doDate_: this.doDate,
      signReceivedDate_: this.signReceivedDate,
      doType_: this.doType,
      reciver_: this.reciver,
      doStatus_: this.doStatus,
      contractType_: this.contractType,
      createdTime_: this.createdTime,
      creattime_: this.creattime,
      createdName_: this.createdName,
      isSentConfirm_: this.isSentConfirm,
      warrantCode_: this.warrantCode,
      warrantMonth_: this.warrantMonth,
      undoCode_: this.undoCode,
      undoDate_: this.undoDate_,
      undoStatus_: this.undoStatus,
      invoiceCode_: this.invoiceCode,
      invoiceDate_: this.invoiceDate,
      soType_: this.soType,
      baseCurrencyRate_: this.baseCurrencyRate,
      invoiceType_: this.invoiceType,
      extInvoiceCode_: this.extInvoiceCode,
      invoiceStatus_: this.invoiceStatus,
      invoiceQty_: this.invoiceQty,
      writeoffWarrantCode_: this.writeoffWarrantCode,
      writeoffWarrantMonth_: this.writeoffWarrantMonth,
      contractNoPs_: this.contractNoPs,
      extSoNo_: this.extSoNo,
      setttime_: this.setttime,
      status_: this.status,
      createdBy_: this.createdBy,
      dockSoNo_: this.dockSoNo,
      contractCode_: this.contractCode,
      branchName_: this.branch,
      departmentList_:this.departmentList,
      customer_:this.customer,
      customerList_:this.customerList,
      supplierList_:this.supplierList,
      supplier_:this.supplier,
      staffName_:this.staffName,
      staffNameList_:this.staffNameList,
    };
  },
  created() {},
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
    getSupplier(str){
      if(!str){
        return
      }
      PopupApi.supplierSelect2({
        page: 1,
        pageSize: 200,
        supplierName: str,
      //  isInactive: 0,
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
       // isInactive:0,
        isCollected:0
      };
      Compony.empList2(params)
          .then(res => {
            this.staffNameList_ = res.data.list;
          })
          .catch(() => {
          });
    }
  },
  props: {
    supplier: {
      type: Object | Array
    },
    supplierList:{
      type:Array | Object
    },
    customer: {
      type: Object | Array
    },
    customerList:{
      type:Array | Object
    },
    staffName: {
      type: Object | Array
    },
    staffNameList:{
      type:Array | Object
    },
    branch: {
      type: Object | Array
    },
    departmentList:{
      type: Array | Object
    },
    checked: {
      type: Boolean
    },
    matchKey: {
      type: String
    },
    label: {
      type: String
    },
    company: {
      type: Object | String
    },
    componyTip: {
      type: Function
    },
    departmentTip: {
      type: Function
    },
    staffTip: {
      type: Function
    },
    extContractCode: {
      type: String | Number
    },
    doNo: {
      type: String | Number
    },
    soContractNo: {
      type: String | Number
    },
    warehouse: {
      type: Object | String
    },
    warehouseTips: {
      type: Function
    },
    doDate: {
      type: Object | String
    },
    customerTips: {
      type: Function
    },
    signReceivedDate: {
      type: Object | String
    },
    doType: {
      type: String | Number
    },
    doTypeList: {
      type: Array
    },
    reciver: {
      type: String | Number
    },
    doStatus: {
      type: Object | Array
    },
    doStatusList: {
      type: Array
    },
    contractType: {
      type: Object | Array
    },
    contractTypeList: {
      type: Array
    },
    createdTime: {
      type: Object | Array
    },
    creattime: {
      type: Object | Array
    },
    createdName: {
      type: String | Number
    },
    isSentConfirm: {
      type: String | Number
    },
    warrantCode: {
      type: String | Number
    },
    warrantMonth: {
      type: Object | String
    },
    undoCode: {
      type: String | Number
    },
    undoDate: {
      type: String | Number
    },
    undoStatus: {
      type: Array | Object
    },
    undoStatusList: {
      type: Array
    },
    invoiceCode: {
      type: String | Number
    },
    invoiceDate: {
      type: Object | Number
    },
    soType: {
      type: String | Number
    },
    currencyName: {
      type: Object | String
    },
    coinTips: {
      type: Function
    },
    baseCurrencyRate: {
      type: String | Number
    },
    invoiceType: {
      type: String | Number
    },
    invoiceTypeList: {
      type: Array
    },
    extInvoiceCode: {
      type: String | Number
    },
    invoiceStatus: {
      type: Object | Array
    },
    invoiceStatusList: {
      type: Array
    },
    invoiceQty: {
      type: String | Number
    },
    writeoffWarrantCode: {
      type: String | Number
    },
    writeoffWarrantMonth: {
      type: String | Number
    },
    contractNoPs: {
      type: String | Number
    },
    extSoNo: {
      type: String | Number
    },
    setttime: {
      type: Object | Array
    },
    supplierTip: {
      type: Function
    },
    status: {
      type: Object | Array
    },
    mytypearr: {
      type: Array
    },
    createdBy: {
      type: String | Number
    },
    contractCode: {
      type: String | Number
    },
    dockSoNo: {
      type: String | Number
    }
  },
  watch: {
    branch(value) {
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

    extContractCode(val) {
      this.extContractCode_ = val;
    },
    doNo(val) {
      this.doNo_ = val;
    },
    soContractNo(val) {
      this.soContractNo_ = val;
    },
    doDate(val) {
      this.doDate_ = val;
    },
    signReceivedDate(val) {
      this.signReceivedDate_ = val;
    },
    doType(val) {
      this.doType_ = val;
    },
    reciver(val) {
      this.reciver_ = val;
    },
    doStatus(val) {
      this.doStatus_ = val;
    },
    contractType(val) {
      this.contractType_ = val;
    },
    createdTime(val) {
      this.createdTime_ = val;
    },
    createdName(val) {
      this.createdName_ = val;
    },
    isSentConfirm(val) {
      this.isSentConfirm_ = val;
    },
    warrantCode(val) {
      this.warrantCode_ = val;
    },
    warrantMonth(val) {
      this.warrantMonth_ = val;
    },
    undoCode(val) {
      this.undoCode_ = val;
    },
    undoDate(val) {
      this.undoDate_ = val;
    },
    undoStatus(val) {
      this.undoStatus_ = val;
    },
    invoiceCode(val) {
      this.invoiceCode_ = val;
    },
    invoiceDate(val) {
      this.invoiceDate_ = val;
    },
    soType(val) {
      this.soType_ = val;
    },
    baseCurrencyRate(val) {
      this.baseCurrencyRate_ = val;
    },
    invoiceType(val) {
      this.invoiceType_ = val;
    },
    extInvoiceCode(val) {
      this.extInvoiceCode_ = val;
    },
    invoiceStatus(val) {
      this.invoiceStatus_ = val;
    },
    invoiceQty(val) {
      this.invoiceQty_ = val;
    },
    writeoffWarrantCode(val) {
      this.writeoffWarrantCode_ = val;
    },
    writeoffWarrantMonth(val) {
      this.writeoffWarrantMonth_ = val;
    },
    contractNoPs(val) {
      this.contractNoPs_ = val;
    },
    extSoNo(val) {
      this.extSoNo_ = val;
    },
    setttime(val) {
      this.setttime_ = val;
    },
    status(val) {
      this.status_ = val;
    },
    createdBy(val) {
      this.createdBy_ = val;
    },
    creattime(val) {
      this.creattime_ = val;
    },
    contractCode(val) {
      this.contractCode_ = val;
    },
    dockSoNo(val) {
      this.dockSoNo_ = val;
    }
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
