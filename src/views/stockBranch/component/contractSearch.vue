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
      v-if="matchKey === 'branchName' && checked"
    >
      <label>{{ label }}</label>
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
      <span class="comicon" @click="departmentTip('come')" style="width: 10%;z-index: 2"
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
                  :disabled="!(this.company.companyId && (this.branch.length > 0|| this.branchNames.length > 0))"
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
    <el-col :span="5" class="el-col" v-if="matchKey === 'grnCode' && checked">
      <label>入库单号</label>
      <el-input
        v-model="grnCode_"
        @change="getValue"
        class="el-inputs"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      class="el-col"
      v-if="matchKey === 'warehouseName' && checked"
    >
      <label>{{ label }}</label>
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
    <el-col :span="5" class="el-col" v-if="matchKey === 'tradeType' && checked">
      <label>贸易类型</label>
      <zl-select
        clearable
        v-model="tradeType_"
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
    <el-col :span="5" class="el-col" v-if="matchKey === 'moveType' && checked">
      <label>移动类型</label>
      <zl-select
        clearable
        v-model="moveType_"
        placeholder="请选择"
        class="el-select"
        @change="getValue"
        multiple
        collapse-tags
      >
        <zl-option
          v-for="item in ydtypearr"
          :key="item.dict_code"
          :label="item.dict_value"
          :value="item.dict_code"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'grnStatus' && checked">
      <label>入库单状态</label>
      <zl-select
        clearable
        v-model="grnStatus_"
        placeholder="请选择"
        class="el-select"
        @change="getValue"
        multiple
        collapse-tags
      >
        <zl-option
          v-for="item in rkdtypearr"
          :key="item.dict_code"
          :label="item.dict_value"
          :value="item.dict_code"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col
      :span="5"
      class="el-colc"
      v-if="matchKey === 'creattime' && checked"
    >
      <label>创建时间</label>
      <el-date-picker
        style="width:70%"
        value-format="yyyy-MM-dd"
        v-model="creattime_"
        @change="getValue"
        type="daterange"
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
        v-model="createdName_"
        @change="getValue"
        class="el-inputs"
        placeholder="请输入"
      ></el-input>
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
        style="width:70%"
        type="month"
        size="small"
        v-model="warrantMonth_"
        @change="getValue"
        placeholder="请选择"
        value-format="yyyy-MM"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col"  v-if="matchKey === 'odoCode' && checked">
      <label>出库单号</label>
      <el-input
          v-model="odoCode_"
          @change="getValue"
          class="el-inputs"
          placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'odoType' && checked">
      <label>放货类型</label>
      <zl-select
          clearable
          v-model="odoType_"
          @change="getValue"
          placeholder="请选择"
          class="el-select"
      >
        <zl-option
            v-for="item in fhtypearr"
            :key="item.dict_code"
            :label="item.dict_value"
            :value="item.dict_key"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'odoStatus' && checked">
      <label>出库单状态</label>
      <zl-select
          clearable
          v-model="odoStatus_"
          @change="getValue"
          placeholder="请选择"
          class="el-select"
          multiple
          collapse-tags
      >
        <zl-option
            v-for="item in rkdtypearr"
            :key="item.dict_code"
            :label="item.dict_value"
            :value="item.dict_key"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'itCode' && checked">
      <label>调拨单号</label>
      <el-input
          v-model="itCode_"
          @change="getValue"
          class="el-inputs"
          placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'itStatus' && checked">
      <label>调拨单状态</label>
      <zl-select
          clearable
          v-model="itStatus_"
          @change="getValue"
          placeholder="请选择"
          class="el-select"
          multiple
          collapse-tags
      >
        <zl-option
            v-for="item in dbdtypearr"
            :key="item.dict_code"
            :label="item.dict_value"
            :value="item.dict_key"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col " v-if="matchKey === 'branchNames' && checked">
      <label>调出部门</label>
      <zl-select  v-model="branchNames_"
                  @change="getValue"
                  class="el-inputs"
                  placeholder="请选择"
                  multiple
                  filterable
                  remote
                  :remote-method="getDepartments"
                  collapse-tags
                  value-key="branchId"
      >
        <zl-option
            v-for="item in departmentLists_"
            :key="item.branchId"
            :label="item.branchName"
            :value="item">
        </zl-option>
      </zl-select>
      <span class="comicon" @click="departmentTip('out')" style="width: 10%;z-index: 2"
        ><i class="el-icon-search"></i
      ></span>
    </el-col>

    <el-col :span="5" class="el-col" v-if="matchKey === 'warehouseNames' && checked">
      <label>调出仓库</label>
      <el-input
          v-model="warehouseNames.warehouseName"
          size="small"
          class="el-inputs"
          placeholder="请选择"
          disabled
      >
      </el-input>
      <span class="comicon" @click="warehouseTips('out')"
      ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'itMoveType' && checked">
      <label>调拨单类型</label>
      <zl-select
          clearable
          v-model="itMoveType_"
          @change="getValue"
          placeholder="请选择"
          class="el-select"
      >
        <zl-option
            v-for="item in dbtypearr"
            :key="item.dict_code"
            :label="item.dict_value"
            :value="item.dict_key"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'skuCode' && checked">
      <label>物料编号</label>
      <el-input
          v-model="mattermsg.skuCode"
          class="el-inputs"
          placeholder="请输入"
          disabled
      ></el-input>
      <span class="comicon" @click="matterTips"
      ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'skuName' && checked">
      <label>物料名称</label>
      <el-input
          v-model="mattermsg.skuName"
          @change="getValue"
          class="el-inputs"
          placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'creditGroupName' && checked">
      <label>客户</label>
      <el-input
          v-model="creditGroupInfo.creditGroupName"
          class="el-inputs"
          placeholder="请选择"
          disabled
      ></el-input>
      <span class="comicon" @click="creditGroupPopup">
            <i class="el-icon-search"></i>
          </span>
    </el-col>
    <el-col :span="5" class="el-colc" v-if="matchKey === 'outtime' && checked">
      <label>发货日期</label>
      <el-date-picker
          style="width:70%"
          value-format="yyyy-MM-dd"
          v-model="outtime_"
          @change="getValue"
          type="daterange"
          size="mini"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'dockStatus' && checked">
      <label>状态</label>
      <zl-select
          v-model="dockStatus_"
          @change="getValue"
          placeholder="请选择"
          class="el-select"
          clearable
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
      grnCode_: this.grnCode,
      tradeType_: this.tradeType,
      moveType_: this.moveType,
      grnStatus_: this.grnStatus,
      creattime_: this.creattime,
      createdName_: this.createdName,
      warrantCode_: this.warrantCode,
      warrantMonth_: this.warrantMonth,
      odoCode_: this.odoCode,
      odoType_: this.odoType,
      odoStatus_: this.odoStatus,
      itCode_: this.itCode,
      itStatus_: this.itStatus,
      itMoveType_: this.itMoveType,
      outtime_: this.outtime,
      dockStatus_: this.dockStatus,

      branchName_: this.branch,
      departmentList_:this.departmentList,
      branchNames_: this.branchNames,
      departmentLists_:this.departmentLists,
      staffName_:this.staffName,
      staffNameList_:this.staffNameList,
    };
  },
  created() {},
  methods: {
    getValue(val) {
      this.$emit("changeInput", { val, key: this.matchKey });
    },
     getDepartments(str){
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
            this.departmentLists_ = res.data.list;
          })
          .catch(() => {
          });
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
        //isInactive:0,
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
    departmentLists:{
      type: Array | Object
    },
    departmentList:{
      type: Array | Object
    },
    staffNameList:{
      type:Array | Object
    },
    payload:{
      type:String
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
    staffName: {
      type: Object | Array
    },
    staffTip: {
      type: Function
    },
    grnCode: {
      type: Number | String
    },
    warehouse: {
      type: Object | String
    },
    warehouseTips: {
      type: Function
    },
    tradeType: {
      type: Array | Object
    },
    mytypearr: {
      type: Array
    },
    moveType: {
      type: Array | Object
    },
    ydtypearr: {
      type: Array
    },
    grnStatus: {
      type: Array | Object
    },
    rkdtypearr: {
      type: Array
    },
    creattime: {
      type: Object | String
    },
    createdName: {
      type: Number | String
    },
    warrantCode: {
      type: Number | String
    },
    warrantMonth: {
      type: Object | String
    },

    odoCode:{
      type: Number | String
    },
    odoType:{
      type: Number | String
    },
    fhtypearr:{
      type: Array
    },
    odoStatus:{
      type: Array | Object
    },

    itCode:{
      type: Number | String
    },
    itStatus:{
      type: Array | Object
    },
    dbdtypearr:{
      type: Array
    },
    branchNames:{
      type:Object | Array
    },
    branch:{
      type:Object | Array
    },
    warehouseNames:{
      type:Object | String
    },
    itMoveType:{
      type: Number | String
    },
    dbtypearr:{
      type:Array
    },


    mattermsg:{
      type: Object | String
    },
    matterTips:{
      type:Function
    },
    creditGroupInfo:{
      type:Object | String
    },
    creditGroupPopup:{
      type:Function
    },
    outtime:{
      type:Object | String
    },
    dockStatus:{
      type: Number | String
    }

  },
  watch: {
    branchNames(value){
      this.branchNames_ = value;
    },
    departmentLists(value) {
      this.departmentLists_ = value;
    },
    branch(value) {
      this.branchName_ = value;
    },
    departmentList(value) {
      this.departmentList_ = value;
    },
    staffName(value) {
      this.staffName_ = value;
    },
    staffNameList(value) {
      this.staffNameList_ = value;
    },

    grnCode(val){
      this.grnCode_=val
    },
    tradeType(val){
      this.tradeType_=val
    },
    moveType(val){
      this.moveType_=val
    },
    grnStatus(val){
      this.grnStatus_=val
    },
    creattime(val){
      this.creattime_=val
    },
    createdName(val){
      this.createdName_=val
    },
    warrantCode(val){
      this.warrantCode_=val
    },
    warrantMonth(val){
      this.warrantMonth_=val
    },
    odoCode(val){
      this.odoCode_=val
    },
    odoType(val){
      this.odoType_=val
    },
    odoStatus(val){
      this.odoStatus_=val
    },
    itCode(val){
      this.itCode_=val
    },
    itStatus(val){
      this.itStatus_=val
    },
    itMoveType(val){
      this.itMoveType_=val
    },
    outtime(val){
      this.outtime_=val
    },
    dockStatus(val){
      this.dockStatus_=val
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
