<template>
  <div>
    <el-col
      :span="5"
      v-if="matchKey === 'companyName' && checked"
      class="el-col"
    >
      <label>公司</label>
      <el-input
        v-model="companyName.companyName"
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
      v-if="matchKey === 'supplierName' && checked"
      class="el-col"
    >
      <label>供应商</label>
      <zl-select v-model="supplier_"
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
    <el-col :span="5" v-if="matchKey === 'blDate' && checked" class="el-col">
      <label class="dataTop">{{ label }} </label>
      <el-date-picker
        v-model="blDate_"
        @change="getValue"
        type="daterange"
        class="el-input2"
        size="small"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'poType' && checked" class="el-col">
      <label>合同类型</label>
      <zl-select
        v-model="poType_"
        @change="getValue"
        clearable
        size="small"
        class="el-inputs zl-select"
        placeholder="请选择"
        multiple
        collapse-tags
      >
        <zl-option
          v-for="item in poTypeList"
          :key="item.dict_code"
          :label="item.dict_value"
          :value="item.dict_key"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'sysBlNo' && checked" class="el-col">
      <label>系统单据号</label>
      <el-input
        v-model="sysBlNo_"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'invoiceCode' && checked"
      class="el-col"
    >
      <label>系统单据号</label>
      <el-input
        v-model="invoiceCode_"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'extCode' && checked" class="el-col">
      <label>外部合同号</label>
      <el-input
        v-model="extCode_"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'externalPoNo' && checked"
      class="el-col"
    >
      <label>外部合同号</label>
      <el-input
        v-model="externalPoNo_"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'fromNo' && checked" class="el-col">
      <label>来源单号</label>
      <el-input
        v-model="fromNo_"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'unwvDate' && checked">
      <label>退货日期</label>
      <el-date-picker
        v-model="unwvDate_"
        @change="getValue"
        type="daterange"
        size="small"
        class="el-input2"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'bizBlNo' && checked" class="el-col">
      <label>提单号</label>
      <el-input
        v-model="bizBlNo_"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'arrivedInfoDate' && checked"
      class="el-col"
    >
      <label class="dataTop">到单寄出日</label>
      <el-date-picker
        v-model="arrivedInfoDate_"
        @change="getValue"
        type="daterange"
        class="el-input2"
        size="small"
        range-separator="-"
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'predictArrivedDate' && checked"
      class="el-col"
    >
      <label class="dataTop">预计到港日</label>
      <el-date-picker
        v-model="predictArrivedDate_"
        @change="getValue"
        type="daterange"
        class="el-input2"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'portName' && checked" class="el-col">
      <label>卸货港</label>
      <el-input
        v-model="portName.portName"
        class="el-inputs"
        size="small"
        placeholder="请选择"
        disabled
      ></el-input>
      <span class="comicon" @click="arrivalTip"
        ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'shipName' && checked" class="el-col">
      <label>船名</label>
      <el-input
        v-model="shipName_"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'unboxLimit' && checked"
      class="el-col"
      style="margin-bottom:10px"
    >
      <label>免箱期限</label>
      <el-input
        v-model="unboxLimit_"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'wvNo' && checked" class="el-col">
      <label>入库单号</label>
      <el-input
        v-model="wvNo_"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'blStatus' && checked"
      class="el-colc"
      style="margin-bottom:10px"
    >
      <label>单据状态</label>
      <zl-select
        v-model="blStatus_"
        @change="getValue"
        placeholder="请选择"
        clearable
        size="small"
        class="el-inputs zl-select"
        multiple
        collapse-tags
      >
        <zl-option
          v-for="item in blStatusList"
          :key="item.dict_code"
          :label="item.dict_value"
          :value="item.dict_key"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'warehouseName' && checked"
      class="el-col"
    >
      <label>仓库</label>
      <el-input
        v-model="warehouseName.warehouseName"
        size="small"
        class="el-inputs"
        placeholder="请选择"
        disabled
      ></el-input>
      <span class="comicon" @click="warehouseTips"
        ><i class="el-icon-search"></i
      ></span>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'wvStatus' && checked" class="el-col">
      <label>单据状态</label>
      <zl-select
        v-model="wvStatus_"
        @change="getValue"
        clearable
        size="small"
        class="el-inputs el-select"
        placeholder="请选择"
        multiple
        collapse-tags
      >
        <zl-option
          v-for="item in blStatus"
          :key="item.value"
          :label="item.dict_value"
          :value="item.dict_key"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'invoiceStatus' && checked"
      class="el-col"
    >
      <label>单据状态</label>
      <zl-select
        v-model="invoiceStatus_"
        @change="getValue"
        clearable
        size="small"
        class="el-inputs el-select"
        placeholder="请选择"
        multiple
        collapse-tags
      >
        <zl-option
          v-for="item in blStatus"
          :key="item.value"
          :label="item.dict_value"
          :value="item.dict_key"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col
      :span="5"
      class="el-colc"
      v-if="matchKey === 'documentValue' && checked"
    >
      <label>单据状态</label>
      <zl-select
        v-model="documentValue_"
        placeholder="请选择"
        clearable
        size="small"
        class="el-inputs el-select"
        @change="getValue"
        multiple
        collapse-tags
      >
        <zl-option
          v-for="item in blStatus"
          :key="item.value"
          :label="item.dict_value"
          :value="item.dict_key"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'projectCode' && checked"
      class="el-col"
    >
      <label>项目号</label>
      <el-input
        v-model="project.projectCode"
        class="el-inputs"
        size="small"
        placeholder="请选择"
        disabled
      ></el-input>
      <span class="comicon" @click="projectTip">
        <i class="el-icon-search"></i>
      </span>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'projectName' && checked"
      class="el-col"
    >
      <label>项目名称</label>
      <el-input
        v-model="project.projectName"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'createdTime' && checked"
      class="el-col"
    >
      <label>创建日期</label>
      <el-date-picker
        v-model="createdTime_"
        @change="getValue"
        type="daterange"
        class="el-input2"
        size="small"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'WvDate' && checked" class="el-col">
      <label>{{ label }}</label>
      <el-date-picker
        v-model="WvDate_"
        @change="getValue"
        type="daterange"
        class="el-input2"
        size="small"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'wvDate' && checked" class="el-col">
      <label>{{ label }}</label>
      <el-date-picker
        v-model="wvDate_"
        @change="getValue"
        type="daterange"
        class="el-input2"
        size="small"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-col>

    <!-- <el-col :span="5"
            class="el-colc"
            style="margin-bottom:10px">
      <label>业务币别</label>
      <zl-select v-model="currencyCodeOrgin"
                 placeholder="请选择"
                 size="small"
                 class="el-inputs el-select"
                 @change="currencychange">
        <zl-option v-for="item in mainData"
                   :key="item.value"
                   :label="item.currencyName"
                   :value="item.currencyCode">
        </zl-option>
      </zl-select>
    </el-col> -->
    <el-col
      :span="5"
      v-if="matchKey === 'currencyName' && checked"
      class="el-colc"
    >
      <label class="isrequired">业务币币别</label>
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
      v-if="matchKey === 'baseCurrencyRate' && checked"
      class="el-col"
    >
      <label>本位币汇率</label>
      <el-input
        v-model="baseCurrencyRate_"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'warrantCode' && checked"
      class="el-col"
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
      v-if="matchKey === 'warrantMonth' && checked"
      class="el-col"
      style="margin-bottom:10px"
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
    <el-col :span="5" class="el-col" v-if="matchKey === 'unwvNo' && checked">
      <label>退货单号</label>
      <el-input
        v-model="unwvNo_"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'extInvoiceCode' && checked"
      class="el-col"
    >
      <label>外部发票号</label>
      <el-input
        v-model="extInvoiceCode_"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col :span="5" class="el-col" v-if="matchKey === 'erpPoNo' && checked">
      <label>采购合同号</label>
      <el-input
        v-model="erpPoNo_"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'unwvType' && checked" class="el-colc">
      <label>退货类型</label>
      <zl-select
        v-model="unwvType_"
        @change="getValue"
        placeholder="请选择"
        size="small"
        clearable
      >
        <zl-option
          v-for="item in unwvTypeList"
          :key="item.dict_code"
          :label="item.dict_value"
          :value="item.dict_key"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'invoiceType' && checked"
      class="el-col"
    >
      <label>发票类别</label>
      <zl-select
        v-model="invoiceType_"
        @change="getValue"
        size="small"
        class="el-inputs el-select"
        placeholder="请选择"
        multiple
        collapse-tags
      >
        <zl-option
          v-for="item in poType"
          :key="item.dict_code"
          :label="item.dict_value"
          :value="item.dict_key"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'createdName' && checked"
      class="el-col"
    >
      <label>创建人</label>
      <el-input
        v-model="createdName_"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'updatedName' && checked"
      class="el-col"
    >
      <label>修改人</label>
      <el-input
        v-model="updatedName_"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
        :span="5"
        v-if="matchKey === 'contractNo' && checked"
        class="el-col"
    >
      <label>采购合同号</label>
      <el-input
          v-model="contractNo_"
          @change="getValue"
          class="el-inputs"
          size="small"
          placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'changeDate' && checked"
      class="el-col"
    >
      <label>修改日期</label>
      <el-date-picker
        v-model="changeDate_"
        @change="getValue"
        type="daterange"
        size="small"
        class="el-input2"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'auditBy' && checked" class="el-col">
      <label>审核人</label>
      <el-input
        v-model="auditBy_"
        @change="getValue"
        class="el-inputs"
        size="small"
        placeholder="请输入"
      ></el-input>
    </el-col>
    <el-col :span="5" v-if="matchKey === 'tsDate' && checked" class="el-col">
      <label>审核时间</label>
      <el-date-picker
        v-model="tsDate_"
        @change="getValue"
        type="daterange"
        size="small"
        class="el-input2"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-col>
    <el-col
      :span="5"
      v-if="matchKey === 'writeoffWarrantCode' && checked"
      class="el-col"
      style="margin-bottom:10px"
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
      v-if="matchKey === 'writeoffWarrantMonth' && checked"
      class="el-col"
      style="margin-bottom:10px"
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
    <el-col :span="5" v-if="matchKey === 'unwvReverse' && checked" class="el-col">
      <label>是否退货</label>
      <zl-select
          v-model="unwvReverse_"
          @change="getValue"
          size="small"
          class="el-inputs el-select"
          placeholder="请选择"
          clearable

      >
        <zl-option

            :label="'是'"
            :value="1"
        >
        </zl-option>
        <zl-option

            :label="'否'"
            :value="0"
        >
        </zl-option>
      </zl-select>
    </el-col>
    <el-col :span="5" class="el-col"  v-if="matchKey === 'wvType' && checked">
      <label>入库单类型</label>
      <el-select v-model="wvType_"
                  size="small"
                  placeholder="请选择"
                  class="el-inputs el-select"
                  @change="getValue"
                  clearable>
        <el-option v-for="item in wvTypeList"
                    :key="item.dict_key"
                    :label="item.dict_value"
                    :value="item.dict_key">
        </el-option>
      </el-select>
    </el-col>
     <el-col
      :span="5"
      class="el-colc"
      v-if="matchKey === 'transitStatus' && checked"
    >
      <label>在途状态</label>
      <zl-select
        v-model="transitStatus_"
        placeholder="请选择"
        clearable
        size="small"
        class="el-inputs el-select"
        @change="getValue"
        multiple
        collapse-tags
      >
        <zl-option
          v-for="item in transitStatusList"
          :key="item.value"
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
import ZlOption from "@/components/zl-select/src/option";

export default {
  name: "contractSearch",
  components: {ZlOption},
  data() {
    return {
      branchName_: this.branchName,
      departmentList_:this.departmentList,
      supplierList_:this.supplierList,
      supplier_:this.supplierName,
      blDate_: this.blDate,
      poType_: this.poType,
      sysBlNo_: this.sysBlNo,
      invoiceCode_: this.invoiceCode,
      extCode_: this.extCode,
      bizBlNo_: this.bizBlNo,
      arrivedInfoDate_: this.arrivedInfoDate,
      predictArrivedDate_: this.predictArrivedDate,
      shipName_: this.shipName,
      unboxLimit_: this.unboxLimit,
      blStatus_: this.blStatus,
      wvNo_: this.wvNo,
      fromNo_: this.fromNo,
      externalPoNo_: this.externalPoNo,
      wvStatus_: this.wvStatus,
      createdTime_: this.createdTime,
      WvDate_: this.WvDate,
      baseCurrencyRate_: this.baseCurrencyRate,
      warrantCode_: this.warrantCode,
      warrantMonth_: this.warrantMonth,
      unwvNo_: this.unwvNo,
      erpPoNo_: this.erpPoNo,
      unwvDate_: this.unwvDate,
      documentValue_: this.documentValue,
      unwvType_: this.unwvType,
      invoiceType_: this.invoiceType,
      createdName_: this.createdName,
      updatedName_: this.updatedName,
      changeDate_: this.changeDate,
      auditBy_: this.auditBy,
      tsDate_: this.tsDate,
      invoiceStatus_: this.invoiceStatus,
      extInvoiceCode_: this.extInvoiceCode,
      writeoffWarrantCode_: this.writeoffWarrantCode,
      writeoffWarrantMonth_: this.writeoffWarrantMonth,
      wvDate_: this.wvDate,
      unwvReverse_: this.unwvReverse,
      contractNo_: this.contractNo,
      wvType_:this.wvType,
      transitStatus_:this.transitStatus,
    

    };
  },
  created() {},
  methods: {
    getValue(val) {
      this.$emit("changeInput", { val, key: this.matchKey });
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
     getDepartment(str){
      if(!str){
        return
      }
      // if(!this.companyName.companyId){
      //   this.$openWarning("请先选择公司");
      //   return
      // }

      let params = {
        pageNum: 1,
        rows: 200,
        companyId: this.companyName.companyId ,
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
  },
  props: {
    supplierList:{
      type: Object | Array
    },
    supplierName:{
      type: Array | Object
    },
    checked: {
      type: Boolean
    },
    matchKey: {
      type: String
    },
    companyName: {
      type: Object | String
    },
    label: {
      type: String
    },
    componyTip: {
      type: Function
    },
    branchName: {
      type: Object | String
    },
    departmentTip: {
      type: Function
    },
    supplierTip: {
      type: Function
    },
    blDate: {
      type: Object | String
    },
    poType: {
      type: Object | Array
    },
    poTypeList: {
      type: Array
    },
    sysBlNo: {
      type: Number | String
    },
    invoiceCode: {
      type: Number | String
    },
    extCode: {
      type: Number | String
    },
    bizBlNo: {
      type: Number | String
    },
    arrivedInfoDate: {
      type: Object | String
    },
    predictArrivedDate: {
      type: Object | String
    },
    portName: {
      type: Object | String
    },
    arrivalTip: {
      type: Function
    },
    shipName: {
      type: String | Number
    },
    unboxLimit: {
      type: String | Number
    },
    blStatus: {
      type: Object | Array
    },
    blStatusList: {
      type: Array
    },
    wvNo: {
      type: String | Number
    },
    fromNo: {
      type: String | Number
    },
    externalPoNo: {
      type: String | Number
    },
    warehouseName: {
      type: Object | String
    },
    warehouseTips: {
      type: Function
    },
    wvStatus: {
      type: Array | Object
    },
    projectTip: {
      type: Function
    },
    project: {
      type: Object | String
    },
    createdTime: {
      type: Object | String
    },
    WvDate: {
      type: Object | String
    },
    currency: {
      type: Object | String
    },
    coinTip: {
      type: Function
    },
    baseCurrencyRate: {
      type: Number | String
    },
    warrantCode: {
      type: Number | String
    },
    warrantMonth: {
      type: Number | String
    },
    unwvNo: {
      type: Number | String
    },
    erpPoNo: {
      type: Number | String
    },
    unwvDate: {
      type: Object | String
    },
    documentValue: {
      type: Array | Object
    },
    unwvTypeList: {
      type: Array
    },
    invoiceType: {
      type: Array | Object
    },
    createdName: {
      type: Number | String
    },
    updatedName: {
      type: Number | String
    },
    changeDate: {
      type: Object | String
    },
    auditBy: {
      type: Number | String
    },
    tsDate: {
      type: Object | String
    },
    invoiceStatus: {
      type: Object | Array
    },
    extInvoiceCode: {
      type: Number | String
    },
    writeoffWarrantCode: {
      type: Number | String
    },
    writeoffWarrantMonth: {
      type: Object | String
    },
    wvDate: {
      type: Object | String
    },
    departmentList:{
      type: Object | Array
    },
    unwvReverse:{
      type:Number | String
    },
    unwvType:{
      type:Number | String
    },
    contractNo:{
      type:Number | String
    },
    wvType:{
      type:Number | String
    },
    wvTypeList:{
      type:Object | Array
    },
    transitStatus:{
      type:Object | Array
    },
    transitStatusList:{
      type:Object | Array
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
    blDate(value) {
      this.blDate_ = value;
    },
    poType(value) {
      this.poType_ = value;
    },
    createdTime(value) {
      this.createdTime_ = value;
    },
    baseCurrencyRate (value) {
      this.baseCurrencyRate_ = value;
    },

    sysBlNo(value) {
      this.sysBlNo_ = value;
    },
    invoiceCode(value) {
      this.invoiceCode_ = value;
    },
    extCode(value) {
      this.extCode_ = value;
    },
    bizBlNo(value) {
      this.bizBlNo_ = value;
    },
    arrivedInfoDate(value) {
      this.arrivedInfoDate_ = value;
    },
    predictArrivedDate(value) {
      this.predictArrivedDate_ = value;
    },
    shipName(value) {
      this.shipName_ = value;
    },
    unboxLimit(value) {
      this.unboxLimit_ = value;
    },
    blStatus(value) {
      this.blStatus_ = value;
    },
    wvNo(value) {
      this.wvNo_ = value;
    },
    fromNo(value) {
      this.fromNo_ = value;
    },
    externalPoNo(value) {
      this.externalPoNo_ = value;
    },
    warrantMonth(value) {
      this.warrantMonth_ = value;
    },
    unwvNo(value) {
      this.unwvNo_ = value;
    },
    erpPoNo(value) {
      this.erpPoNo_ = value;
    },
    unwvDate(value) {
      this.unwvDate_ = value;
    },
    documentValue(value) {
      this.documentValue_ = value;
    },
    unwvType(value) {
      this.unwvType_ = value;
    },
    invoiceType(value) {
      this.invoiceType_ = value;
    },
    createdName(value) {
      this.createdName_ = value;
    },
    updatedName(value) {
      this.updatedName_ = value;
    },
    changeDate(value) {
      this.changeDate_ = value;
    },
    auditBy(value) {
      this.auditBy_ = value;
    },
    tsDate(value) {
      this.tsDate_ = value;
    },
    invoiceStatus(value) {
      this.invoiceStatus_ = value;
    },
    extInvoiceCode(value) {
      this.extInvoiceCode_ = value;
    },
    writeoffWarrantCode(value) {
      this.writeoffWarrantCode_ = value;
    },
    warrantCode(value) {
      this.warrantCode_ = value;
    },
    writeoffWarrantMonth(value) {
      this.writeoffWarrantMonth_ = value;
    },
    wvDate(value) {
      this.wvDate_ = value;
    },
    WvDate(value) {
      this.WvDate_ = value;
    },
    wvStatus(value) {
      this.wvStatus_ = value;
    },
    unwvReverse(value) {
      this.unwvReverse_ = value;
    },
    contractNo(value) {
      this.contractNo_ = value;
    },
    wvType(value){
      this.wvType_=value;
    },
    transitStatus(value){
      this.transitStatus_=value;
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
