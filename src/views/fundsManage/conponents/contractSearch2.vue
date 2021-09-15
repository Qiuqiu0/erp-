<template>
  <div>
    <el-col :span="5" class="el-col" v-if="matchKey==='companyName' && checked">
      <label>公司</label>
      <el-input
          v-model="company.companyName"
          class="el-inputs"
          placeholder="请选择"
          disabled
      ></el-input>
      <span class="comicon" @click="componyTip"
      ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='branchName' && checked">
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
    <el-col :span="5" class="el-col" v-if="matchKey==='customerName' && checked">
      <label>客户</label>
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
      <span class="comicon" @click="customerPopup" style="width: 10%;z-index: 2"
        ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='lcReceiveCode' && checked">
      <label>信用证号</label>
      <el-input
          v-model="lcReceiveCode_"
          @change="getValue"
          class="el-inputs"
          placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='lcAmt' && checked">
      <label>信用证金额</label>
      <el-input
          v-model="lcAmt_"
          @change="getValue"
          class="el-inputs"
          placeholder="请输入"
      ></el-input>
    </el-col>
    <coin-select :coin.sync="coin_" class="el-col el-col-5" @change="getValue" v-if="matchKey==='coin' && checked"></coin-select>
    <el-col :span="5" class="el-col" v-if="matchKey==='lcStatus' && checked">
      <label>信用证状态</label>
      <zl-select
          clearable
          v-model="lcStatus_"
          @change="getValue"
          placeholder="请选择"
          class="el-select"
          multiple
          collapse-tags
      >
        <zl-option
            v-for="item in fhtypearr"
            :key="item.dict_code"
            :label="item.dict_value"
            :value="item.dict_code"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-colc" v-if="matchKey==='lcReceiveDate' && checked">
      <label>收证日期</label>
      <el-date-picker
          v-model="lcReceiveDate_"
          @change="getValue"
          class="el-input2"
          type="daterange"
          size="mini"

          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='lcProperty' && checked">
      <label>信用证属性</label>
      <zl-select
          clearable
          v-model="lcProperty_"
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
            :value="item.dict_code"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='lcType' && checked">
      <label>信用证性质</label>
      <zl-select
          clearable
          v-model="lcType_"
          placeholder="请选择"
          class="el-select"
          @change="getValue"
      >
        <zl-option
            v-for="item in typearr"
            :key="item.dict_code"
            :label="item.dict_value"
            :value="item.dict_code"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col"  v-if="matchKey==='lcDueType' && checked">
      <label>信用证类别</label>
      <zl-select
          clearable
          v-model="lcDueType_"
          placeholder="请选择"
          class="el-select"
          @change="getValue"
      >
        <zl-option
            v-for="item in typeStatus"
            :key="item.dict_code"
            :label="item.dict_value"
            :value="item.dict_code"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-colc" v-if="matchKey==='lcIssueDate' && checked">
      <label>开证日期</label>
      <el-date-picker
          v-model="lcIssueDate_"
          @change="getValue"
          class="el-input2"
          type="daterange"
          size="mini"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='effectiveDate' && checked">
      <label>有效期限</label>
      <el-date-picker
          class="el-input2"
          v-model="effectiveDate_"
          type="daterange"
          size="mini"
          @change="getValue"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='deadlineLoaddate' && checked">
      <label>装运期限</label>
      <el-date-picker
          class="el-input2"
          v-model="deadlineLoaddate_"
          @change="getValue"
          type="daterange"
          size="mini"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='createdBy' && checked">
      <label>创建人</label>
      <el-input
          v-model="createdBy_"
          @change="getValue"
          class="el-inputs"
          placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='createdTime' && checked">
      <label>创建日期</label>
      <el-date-picker
          v-model="createdTime_"
          @change="getValue"
          class="el-input2"
          type="daterange"
          size="mini"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='warrantCode' && checked">
      <label>凭证号</label>
      <el-input v-model="warrantCode_"
                @change="getValue"
                class="el-inputs"
                size="small"
                placeholder="请输入"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='warrantMonth' && checked">
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
    <el-col :span="5" class="el-col" v-if="matchKey==='writeoffWarrantCode' && checked">
      <label>冲销凭证号</label>
      <el-input v-model="writeoffWarrantCode_"
                @change="getValue"
                class="el-inputs"
                size="small"
                placeholder="请输入"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='writeoffWarrantMonth' && checked">
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
    <el-col :span="5" class="el-col" v-if="matchKey==='applyCode' && checked">
      <label>申请单号</label>
      <el-input
          v-model="applyCode_"
          @change="getValue"
          class="el-inputs"
          placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='lcNo' && checked">
      <label>信用证号</label>
      <el-input
          v-model="lcNo_"
          @change="getValue"
          class="el-inputs"
          placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='supplierInfo' && checked">
      <label>供应商代码</label>
     <!--<el-input v-model="supplierInfo.supplierName"  class="el-inputs" placeholder="请选择" @change="getValue" disabled></el-input>
      <span class="comicon" @click="supplierPopup"><i class="el-icon-search"></i></span>-->
      <zl-select  v-model="supplierInfo_"
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
      <span class="comicon" @click="supplierPopup" style="width: 10%;z-index: 2"
        ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col :span="5" class="el-col " v-if="matchKey==='applyDate' && checked">
      <label>申请日期</label>
      <el-date-picker
          class="el-input2"
          v-model="applyDate_"
          @change="getValue"
          type="daterange"
          size="mini"

          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col"  v-if="matchKey==='deadTime' && checked">
      <label>最迟装期</label>
      <el-date-picker
          class="el-input2"
          v-model="deadTime_"
          @change="getValue"
          type="daterange"
          size="mini"

          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']">
      </el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='predictPaydate' && checked">
      <label>预计付款日</label>
      <el-date-picker
          class="el-input2"
          v-model="predictPaydate_"
          @change="getValue"
          type="daterange"
          size="mini"

          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey==='cgSelect' && checked">
      <label>外部合同号</label>
      <el-input
          v-model="cgSelect.extNo"
          class="el-inputs"
          placeholder="请选择"
          disabled
      ></el-input>
      <span class="comicon" @click="addList"
      ><i class="el-icon-search"></i
      ></span>
    </el-col>
  </div>
</template>

<script>
import Compony from "@/api/comdepartment/componySelect";
import PopupApi from "@/api/component";
import coinSelect from "@/views/fundsManage/conponents/coinSelect"; //币别
export default {
  name: "contractSearch",
  components: {
    coinSelect
  },
  data() {
    return {
      supplierList_:this.supplierList,
      departmentList_:this.departmentList,
      customerList_:this.customerList,
      customer_:this.customerName,
      branchName_:this.branchName,
      supplierInfo_:this.supplierInfo,
      lcReceiveCode_: this.lcReceiveCode,
      lcAmt_: this.lcAmt,
      coin_: this.coin,
      lcStatus_: this.lcStatus,
      lcReceiveDate_: this.lcReceiveDate,
      lcProperty_: this.lcProperty,
      lcType_: this.lcType,
      lcDueType_: this.lcDueType,
      lcIssueDate_: this.lcIssueDate,
      effectiveDate_: this.effectiveDate,
      deadlineLoaddate_: this.deadlineLoaddate,
      createdBy_: this.createdBy,
      createdTime_: this.createdTime,
      warrantCode_: this.warrantCode,
      warrantMonth_: this.warrantMonth,
      writeoffWarrantCode_: this.writeoffWarrantCode,
      writeoffWarrantMonth_: this.writeoffWarrantMonth,
      applyCode_: this.applyCode,
      lcNo_: this.lcNo,
      applyDate_: this.applyDate,
      deadTime_: this.deadTime,
      predictPaydate_: this.predictPaydate
    };
  },
  created() {},
  methods: {
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
    getDepartment(str){
      if(!str){
        return
      }
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
    getValue(val) {
      this.$emit("changeInput", {
        val,
        key: this.otherKey ? this.otherKey : this.matchKey
      });
    }
  },
  props: {
    supplierList:{
      type: Array | Object
    },
    departmentList:{
      type: Array | Object
    },
    customerList:{
      type:Array | Object
    },
    otherKey: {
      type: String
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
      type: String | Object
    },
    componyTip: {
      type: Function
    },
    branchName: {
      type: Array | Object
    },
    departmentTip: {
      type: Function
    },
    customerName: {
      type: Array | Object
    },
    customerPopup: {
      type: Function
    },
    lcReceiveCode: {
      type: String | Number
    },
    lcAmt: {
      type: String | Number
    },
    coin: {
      type: Object | String
    },
    lcStatus: {
      type: Array | Object
    },
    fhtypearr: {
      type: Array
    },
    lcReceiveDate: {
      type: Object | String
    },
    lcProperty: {
      type: Array | Object
    },
    mytypearr: {
      type: Array
    },
    lcType: {
      type: Number | String
    },
    typearr: {
      type: Array
    },
    lcDueType: {
      type: Number | String
    },
    typeStatus: {
      type: Array
    },
    lcIssueDate: {
      type: Object | String
    },
    effectiveDate: {
      type: Object | String
    },
    deadlineLoaddate: {
      type: Object | String
    },
    createdBy: {
      type: Number | String
    },
    createdTime: {
      type: Object | String
    },
    warrantCode: {
      type: Number | String
    },
    warrantMonth: {
      type: Number | String
    },
    writeoffWarrantCode: {
      type: Number | String
    },
    writeoffWarrantMonth: {
      type: Number | String
    },
    applyCode: {
      type: Number | String
    },
    lcNo: {
      type: Number | String
    },
    supplierInfo: {
      type: Object | Array
    },
    supplierPopup: {
      type: Function
    },
    applyDate: {
      type: Object | String
    },
    deadTime: {
      type: Object | String
    },
    predictPaydate: {
      type: Object | String
    },
    cgSelect: {
      type: Object | String
    },
    addList: {
      type: Function
    }
  },
  watch: {
    supplierList(val){
      this.supplierList_ = val;
    },
    departmentList(value) {
      this.departmentList_ = value;
    },
    customerList(value) {
      this.customerList_ = value;
    },
    supplierInfo(val){
      this.supplierInfo_ = val;
    },
    customerName(val){
      this.customer_ = val;
    },
    branchName(val){
      this.branchName_ = val;
    },
    lcProperty(val) {
      this.lcProperty_ = val;
    },
    lcStatus(val) {
      this.lcStatus_ = val;
    },
    applyCode(val) {
      this.applyCode_ = val;
    },
    lcNo(val) {
      this.lcNo_ = val;
    },
    coin(val) {
      this.coin_ = val;
    },
    applyDate(val) {
      this.applyDate_ = val;
    },
    lcIssueDate(val) {
      this.lcIssueDate_ = val;
    },
    deadTime(val) {
      this.deadTime_ = val;
    },
    effectiveDate(val) {
      this.effectiveDate_ = val;
    },
    predictPaydate(val) {
      this.predictPaydate_ = val;
    },
    createdTime(val) {
      this.createdTime_ = val;
    },
    lcType(val) {
      this.lcType_ = val;
    },
    lcDueType(val) {
      this.lcDueType_ = val;
    },
    createdBy(val) {
      this.createdBy_ = val;
    },
    lcReceiveCode(val) {
      this.lcReceiveCode_ = val;
    },
    lcAmt(val) {
      this.lcAmt_ = val;
    },
    lcReceiveDate(val) {
      this.lcReceiveDate_ = val;
    },
    deadlineLoaddate(val) {
      this.deadlineLoaddate_ = val;
    },
    warrantCode(val) {
      this.warrantCode_ = val;
    },
    warrantMonth(val) {
      this.warrantMonth_ = val;
    },
    writeoffWarrantCode(val) {
      this.writeoffWarrantCode_ = val;
    },
    writeoffWarrantMonth(val) {
      this.writeoffWarrantMonth_ = val;
    }
  }
};
</script>

<style scoped lang="scss">
.input-div .el-col:last-child {
  margin-bottom: 0px;
}
/deep/ .el-select__tags {
  .el-tag--light {
    height: auto;
    line-height: normal;
  }
}
</style>
