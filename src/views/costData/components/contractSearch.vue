<template>
  <div>
    <el-col :span="5" class="el-col" v-if="matchKey ==='bizOccurrence' && checked">
      <label>费用环节</label>
      <zl-select v-model="bizOccurrence_" class="el-selects" placeholder="请选择" clearable @change="getValue">
        <zl-option v-for="(item, index) in costLinkDic" :key="index" :label="item.dict_value" :value="item.dict_key"></zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='isInvCost' && checked">
      <label>计入成本</label>
      <zl-select v-model="isInvCost_" class="el-selects" placeholder="请选择" clearable @change="getValue">
        <zl-option v-for="(item, index) in isIncludeDic" :key="index" :label="item.label" :value="item.value"></zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='isPrefetch' && checked">
      <label>是否预提</label>
      <zl-select v-model="isPrefetch_" class="el-selects" placeholder="请选择" clearable @change="getValue">
        <zl-option v-for="(item, index) in isPrefetchDic" :key="index" :label="item.label" :value="item.value"></zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='costsName' && checked">
      <label>费用名称</label>
      <el-input v-model="costsName_" class="el-inputs" @change="getValue"></el-input>
    </el-col>

    <el-col :span="5" class="el-col" v-if="matchKey ==='companyName' && checked">
      <label>公司</label>
      <el-input v-model="company.companyName" class="el-inputs" placeholder="请选择" disabled></el-input>
      <span class="moreIcon" @click="companyPopup"><i class="el-icon-search"></i></span>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='branchName' && checked">
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
      <span class="comicon" @click="branchPopup" style="width: 10%;z-index: 2"
        ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='supplierName' && checked">
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
      <span class="comicon" @click="supplierPopup" style="width: 10%;z-index: 2"
        ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='createdTime' && checked">
      <label>创建日期</label>
      <el-date-picker @change="getValue" v-model="createdTime_" type="daterange" value-format="yyyy-MM-dd" class="el-selects" size="mini" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='prefetchCode' && checked">
      <label>预提单号</label>
      <el-input @change="getValue" v-model="prefetchCode_" class="el-inputs"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='poContractCode' && checked">
      <label>采购合同号</label>
      <el-input @change="getValue" v-model="poContractCode_" class="el-inputs"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='soContractCode' && checked">
      <label>销售合同号</label>
      <el-input @change="getValue" v-model="soContractCode_" class="el-inputs"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='projectCode' && checked">
      <label>项目号</label>
      <el-input @change="getValue" v-model="projectCode_" class="el-inputs" placeholder="请选择" disabled></el-input>
      <span class="moreIcon" @click="projectPopup"><i class="el-icon-search"></i></span>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='wvNo' && checked">
      <label>入库单号</label>
      <el-input @change="getValue" v-model="wvNo_" class="el-inputs"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='doNo' && checked">
      <label>出库单号</label>
      <el-input @change="getValue" v-model="doNo_" class="el-inputs"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='skuCode' && checked">
      <label>物料号</label>
      <el-input  v-model="matterInfo.skuCode" class="el-inputs" placeholder="请选择" disabled></el-input>
      <span class="moreIcon" @click="matterPopup"><i class="el-icon-search"></i></span>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='batchCode' && checked">
      <label>批次号</label>
      <el-input v-model="batchCode" class="el-inputs" placeholder="请选择" disabled></el-input>
      <span class="moreIcon" @click="batchPopup"><i class="el-icon-search"></i></span>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='prefetchStatus' && checked">
      <label>单据状态</label>
      <zl-select multiple collapse-tags v-model="prefetchStatus_" class="el-selects" placeholder="请选择" clearable @change="getValue">
        <zl-option v-for="(item, index) in prefetchStatusDic" :key="index" :label="item.dict_value" :value="item.dict_key"></zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='isSettled' && checked">
      <label>是否结算</label>
      <zl-select v-model="isSettled_" class="el-selects" placeholder="请选择" clearable @change="getValue">
        <zl-option v-for="(item, index) in isSettleDic" :key="index" :label="item.label" :value="item.value"></zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='warrantCode' && checked">
      <label>凭证号</label>
      <el-input v-model="warrantCode_"
                @change="getValue"
                class="el-inputs"
                size="small"
                placeholder="请输入"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='warrantMonth' && checked">
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
    <el-col :span="5" class="el-col" v-if="matchKey ==='writeoffWarrantCode' && checked">
      <label>冲销凭证号</label>
      <el-input v-model="writeoffWarrantCode_"
                @change="getValue"
                class="el-inputs"
                size="small"
                placeholder="请输入"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='costDocNo' && checked">
      <label>费用预提单号</label>
      <el-input v-model="costDocNo_"
                @change="getValue"
                class="el-inputs"
                size="small"
                placeholder="请输入"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='writeoffWarrantMonth' && checked">
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

    <el-col :span="5" class="el-col" v-if="matchKey ==='erpCostsCode' && checked">
      <label>费用编号</label>
      <el-input v-model="erpCostsCode_" @change="getValue" class="el-inputs"></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey ==='costsStatus' && checked">
      <label>状态</label>
      <zl-select multiple collapse-tags v-model="costsStatus_" @change="getValue" class="el-selects" placeholder="请选择" clearable>
        <zl-option v-for="(item, index) in costStatusDic" :key="index" :label="item.dict_value" :value="item.dict_code"></zl-option>
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
      bizOccurrence_: this.bizOccurrence,
      isInvCost_: this.isInvCost,
      isPrefetch_: this.isPrefetch,
      costsName_: this.costsName,
      createdTime_: this.createdTime,
      prefetchCode_: this.prefetchCode,
      poContractCode_: this.poContractCode,
      soContractCode_: this.soContractCode,
      projectCode_: this.projectCode,
      wvNo_: this.wvNo,
      doNo_: this.doNo,
      prefetchStatus_: this.prefetchStatus,
      isSettled_: this.isSettled,
      warrantCode_: this.warrantCode,
      warrantMonth_: this.warrantMonth,
      writeoffWarrantCode_: this.writeoffWarrantCode,
      writeoffWarrantMonth_: this.writeoffWarrantMonth,
      erpCostsCode_: this.erpCostsCode,
      costsStatus_: this.costsStatus,
      costDocNo_: this.costDocNo,
      branchName_: this.branchName,
      departmentList_: this.departmentList,
      supplierList_: this.supplierList,
      supplier_: this.supplierName,
    };
  },
  created() {},
  methods: {
    getValue(val) {
      this.$emit("changeInput", { val, key: this.matchKey });
    },
    getSupplier(str) {
      if (!str) {
        return;
      }
      PopupApi.supplierSelect2({
        page: 1,
        pageSize: 200,
        supplierName: str,
        //isInactive: 0,
        isCollected: 0,
      }).then((res) => {
        if (res.code == "success") {
          this.supplierList_ = res.data.list;
        } else {
          this.$openWarning(res.message);
        }
      });
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
  },
  props: {
    supplierPopup: {
      type: Function,
    },
    supplierName: {
      type: Object | Array,
    },
    supplierList: {
      type: Array | Object,
    },
    branchName: {
      type: Object | Array,
    },
    departmentList: {
      type: Array | Object,
    },
    checked: {
      type: Boolean,
    },
    matchKey: {
      type: String,
    },
    label: {
      type: String,
    },
    company: {
      type: Object | String,
    },
    componyTip: {
      type: Function,
    },

    bizOccurrence: {
      type: Number | String,
    },
    costLinkDic: {
      type: Array,
    },
    isInvCost: {
      type: Number | String,
    },
    isIncludeDic: {
      type: Array,
    },
    isPrefetch: {
      type: Number | String,
    },
    isPrefetchDic: {
      type: Array,
    },
    costsName: {
      type: String | Number,
    },

    companyInfo: {
      type: Object | String,
    },
    companyPopup: {
      type: Function,
    },
    branchPopup: {
      type: Function,
    },
    createdTime: {
      type: Object | String,
    },
    prefetchCode: {
      type: String | Number,
    },
    poContractCode: {
      type: String | Number,
    },
    costDocNo: {
      type: String | Number,
    },
    soContractCode: {
      type: String | Number,
    },
    projectCode: {
      type: String | Number,
    },
    projectPopup: {
      type: Function,
    },
    wvNo: {
      type: String | Number,
    },
    doNo: {
      type: String | Number,
    },
    matterInfo: {
      type: Object | String,
    },
    matterPopup: {
      type: Function,
    },
    batchCode: {
      type: String | Number,
    },
    batchPopup: {
      type: Function,
    },
    prefetchStatus: {
      type: Array | Object,
    },
    prefetchStatusDic: {
      type: Array,
    },
    isSettled: {
      type: Number | String,
    },
    isSettleDic: {
      type: Array,
    },
    warrantCode: {
      type: Number | String,
    },
    warrantMonth: {
      type: Object | String,
    },
    writeoffWarrantCode: {
      type: Number | String,
    },
    writeoffWarrantMonth: {
      type: Object | String,
    },
    erpCostsCode: {
      type: Number | String,
    },
    costsStatus: {
      type: Array | Object,
    },
    costStatusDic: {
      type: Array,
    },
  },
  watch: {
    branchName(value) {
      this.branchName_ = value;
    },
    departmentList(value) {
      this.departmentList_ = value;
    },
    supplierName(value) {
      this.supplier_ = value;
    },
    supplierList(value) {
      this.supplierList_ = value;
    },

    bizOccurrence(val) {
      this.bizOccurrence_ = val;
    },
    isInvCost(val) {
      this.isInvCost_ = val;
    },
    isPrefetch(val) {
      this.isPrefetch_ = val;
    },
    costsName(val) {
      this.costsName_ = val;
    },
    createdTime(val) {
      this.createdTime_ = val;
    },
    prefetchCode(val) {
      this.prefetchCode_ = val;
    },
    poContractCode(val) {
      this.poContractCode_ = val;
    },
    soContractCode(val) {
      this.soContractCode_ = val;
    },
    projectCode(val) {
      this.projectCode_ = val;
    },
    wvNo(val) {
      this.wvNo_ = val;
    },
    doNo(val) {
      this.doNo_ = val;
    },
    prefetchStatus(val) {
      this.prefetchStatus_ = val;
    },
    isSettled(val) {
      this.isSettled_ = val;
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
    },
    erpCostsCode(val) {
      this.erpCostsCode_ = val;
    },
    costsStatus(val) {
      this.costsStatus_ = val;
    },
    costDocNo(val) {
      this.costDocNo_ = val;
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
