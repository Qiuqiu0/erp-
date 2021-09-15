<template>
  <div class="tabFirst content-div2 contract_css_link">
    <!-- 搜索 -->
    <div class="input-div input-div-bor">
      <!-- <div class="table_title">基本信息</div> -->
      <div>
        <el-col :span="5" class="el-col">
          <label>采购合同号</label>
          <el-input
            v-model="poNo"
            class="el-inputs"
            disabled
            placeholder="保存后自动生成"
          >
          </el-input>
        </el-col>
        <el-col :span="5" class="el-col el-col-required">
          <label><span class="must-full">*</span>公司</label>
          <el-input
            v-model="companyName.companyName"
            class="el-inputs"
            :class="errorKey.includes('companyName') ? 'inputRed' : ''"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" @click="componyTip" v-if="!$route.query.id">
            <i class="el-icon-search"></i>
          </span>
        </el-col>
        <el-col :span="5" class="el-col el-col-required">
          <label><span class="must-full">*</span>部门</label>
          <el-input
            v-model="branchName.branchName"
            class="el-inputs"
            :class="errorKey.includes('branchName') ? 'inputRed' : ''"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" @click="departmentTip" v-if="!$route.query.id">
            <i class="el-icon-search"></i>
          </span>
        </el-col>
        <el-col :span="5" class="el-col el-col-required">
          <label><span class="must-full">*</span>业务员</label>
          <el-input
            v-model="staffName.empName"
            class="el-inputs"
            :class="errorKey.includes('empName') ? 'inputRed' : ''"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" @click="staffTip">
            <i class="el-icon-search"></i>
          </span>
        </el-col>
        <!-- <el-col :span="5" class="el-col">
          <label>销售客户</label>
          <el-input
            v-model="custName.customerName"
            class="el-inputs"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" @click="customerTip" v-if="!$route.query.id || $route.query.children == 1">
            <i class="el-icon-search"></i>
          </span>
        </el-col> -->
        <el-col :span="5" class="el-col">
          <label>项目号</label>
          <el-input
            v-model="projectName.projectCode"
            class="el-inputs"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" v-if="projectName.projectCode" @click="clearProjectName">
            <i class="el-icon-circle-close"></i>
          </span>
          <span class="comicon" v-else @click="projectTip">
            <i class="el-icon-search"></i>
          </span>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>项目名称</label>
          <el-input
            v-model="projectName.projectName"
            class="el-inputs"
            disabled
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>协议编号</label>
          <el-input
            v-model="fwContractNo"
            class="el-inputs"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" v-if="fwContractNo" @click="fwContractNo = ``">
            <i class="el-icon-circle-close"></i>
          </span>
          <span class="comicon" @click="agreeTip" v-else>
            <i class="el-icon-search"></i>
          </span>
        </el-col>
        <el-col :span="5" class="el-colc el-col-required">
          <label><span class="must-full">*</span>合同类型</label>
          <el-select v-model="poType" placeholder="请选择"
            :class="errorKey.includes('poType') ? 'inputRed' : ''"
            :disabled="quChange">
            <el-option
              v-for="item in contractType"
              :key="item.dict_code"
              :label="item.dict_value"
              :value="item.dict_code"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>提货方式</label>
          <el-select v-model="pickupType" placeholder="请选择">
            <el-option
              v-for="item in thList"
              :key="item.dict_code"
              :label="item.dict_value"
              :value="item.dict_code"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col el-col-required">
          <label><span class="must-full">*</span>购销方式</label>
          <el-select
            v-model="tradeType"
            placeholder="请选择"
            :disabled="ycdxType || quChange"
            :class="errorKey.includes('tradeType') ? 'inputRed' : ''"
          >
            <el-option
              v-for="item in gxfsList"
              :key="item.dict_code"
              :label="item.dict_value"
              :value="item.dict_code"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>贸易国别</label>
          <el-input
            v-model="tradeCountryName"
            class="el-inputs"
            disabled
            placeholder="请选择"
          ></el-input>
          <span class="comicon" v-if="tradeCountryName" @click="tradeCountryName = ``, tradeCountry = ``">
            <i class="el-icon-circle-close"></i>
          </span>
          <span class="comicon" v-else @click="countryTip">
            <i class="el-icon-search"></i>
          </span>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>签约地点</label>
          <el-input v-model="signPlace" class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5" class="el-col el-col-required">
          <label><span class="must-full">*</span>外部合同号</label>
          <el-input
            v-model="extCode"
            class="el-inputs"
            :class="errorKey.includes('extCode') ? 'inputRed' : ''"
            placeholder="请选择"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col el-col-required">
          <label><span class="must-full">*</span>供应商</label>
          <el-input
            v-model="supplierName.supplierName"
            class="el-inputs"
            :class="errorKey.includes('supplierName') ? 'inputRed' : ''"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" @click="supplierTip">
            <i class="el-icon-search"></i>
          </span>
        </el-col>
        <el-col :span="5" class="el-col el-col-required">
          <label><span class="must-full">*</span>业务币币别</label>
          <el-input
            v-model="currencyName"
            class="el-inputs"
            :class="errorKey.includes('currencyName') ? 'inputRed' : ''"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" @click="coinTip"
            ><i class="el-icon-search"></i
          ></span>
        </el-col>
        <el-col :span="5" class="el-col el-col-required">
          <label><span class="must-full">*</span>本位币汇率</label>
          <el-input
            v-model="currencyRate"
            @input="bwbhl"
            class="el-inputs"
            :class="errorKey.includes('currencyRate') ? 'inputRed' : ''"
            placeholder="请输入"
            type="number"
            v-input-filter:num8
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc el-col-required">
          <label><span class="must-full">*</span>签订日期</label>
          <el-date-picker
            style="width:70%;"
            v-model="signTime"
            :class="errorKey.includes('signTime') ? 'inputRed' : ''"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>有效期限</label>
          <el-date-picker
            style="width:70%;"
            v-model="contractEndDate"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerClose"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>统计数量</label>
          <el-input
            v-model="sumQty"
            class="el-inputs"
            disabled
            placeholder=""
            v-input-filter:num4
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>合同状态</label>
          <el-select v-model="contractStatus" placeholder="请选择" disabled>
            <el-option
              v-for="item in isInaType"
              :key="item.dict_code"
              :label="item.dict_value"
              :value="item.dict_code"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>含税金额</label>
          <el-input
            v-model="contractAmtVat"
            class="el-inputs"
            disabled
            placeholder=""
            v-input-filter:num2
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc el-col-required">
          <label><span class="must-full">*</span>溢短比%</label>
          <el-input
            v-model="overShortageRate"
            class="el-inputs"
            :class="errorKey.includes('overShortageRate') ? 'inputRed' : ''"
            placeholder="请输入"
            type="number"
            v-input-filter:num8
          ></el-input>
        </el-col>
        <el-col :span="24" class="el-col-textarea">
          <label style="width:7.16%">备注</label>
          <el-input
            type="textarea"
            autosize
            v-model="remark"
            size="small"
            class="el-textarea"
            placeholder="请输入内容"
            style="width:88%"
            resize="none"
          ></el-input>
        </el-col>
      </div>
    </div>
    <!-- 商品信息 -->
    <div class="input-div input-div-bor bortop0">
      <!-- <div class="table_title">商品信息</div> -->
      <div class="">
        <div class="button-div">
          <el-button icon="el-icon-plus" class="query-button" @click="addList"
            >创建</el-button
          >
          <el-button icon="el-icon-minus" @click="setUp(0)">删除</el-button>
          <!-- <el-button icon="el-icon-upload2" @click="setUp(0)" class="olbutton"
            >模板导入</el-button> -->
        </div>
      </div>
      <div class="">
        <el-table
          border
          center
          show-summary
          :data="tableData"
          class="el-table"
          ref="multipleTable"
          @selection-change="handleChange"
          :summary-method="getSummariesWl"
          max-height="288"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="行号" prop="poRowno"></el-table-column>
          <el-table-column
            prop="goodsCode"
            label="物料号"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div class="par_rela">
                <el-input
                  v-model="scope.row.goodsCode"
                  placeholder="请选择"
                  disabled
                ></el-input>
                <span
                  v-if="scope.row.goodsCode"
                  class="comicon clear"
                  @click="scope.row.goodsCode = '', scope.row.goodsCat = ``"
                >
                  <i class="el-icon-circle-close"></i>
                </span>
                <span v-else class="comicon" @click="matterTip(scope.$index)">
                  <i class="el-icon-search"></i>
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="goodsName"
            label="物料名称"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div v-if="scope.row.goodsCode == ``">
                <span class="must-full">*</span>
                <el-input
                  v-model="scope.row.goodsName"
                  placeholder="请输入"
                  :disabled="scope.row.goodsCode ? true : false"
                ></el-input>
              </div>
              <div v-else>
                {{ scope.row.goodsName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="goodsCategoryName"
            label="物料种类"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div v-if="scope.row.goodsCode == ``">
                <span class="must-full">*</span>
                <el-input
                  v-model="scope.row.goodsCategoryName"
                  placeholder="请输入"
                  :disabled="scope.row.goodsCode ? true : false"
                ></el-input>
              </div>
              <div v-else>
                {{ scope.row.goodsCategoryName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="goodsSpec"
            label="物料规格"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div v-if="scope.row.goodsCode == ``">
                <span class="must-full">*</span>
                <el-input
                  v-model="scope.row.goodsSpec"
                  placeholder="请输入"
                  :disabled="scope.row.goodsCode ? true : false"
                ></el-input>
              </div>
              <div v-else>
                {{ scope.row.goodsSpec }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="itemUnitName"
            label="基础单位"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div v-if="scope.row.goodsCode == ``">
                <span class="must-full">*</span>
                <el-select
                  v-model="scope.row.itemUnitName"
                  placeholder="请选择"
                  filterable
                  :disabled="scope.row.goodsCode ? true : false"
                >
                  <el-option
                    v-for="item in unitList"
                    :key="item.unitCode"
                    :label="item.unitName"
                    :value="item.unitName"
                  ></el-option>
                </el-select>
              </div>
              <div v-else>
                {{ scope.row.itemUnitName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="itemQty"
            label="数量"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <span class="must-full">*</span>
                <el-input
                  v-model="scope.row.itemQty"
                  placeholder="请输入"
                  @input="
                    qtyChange(
                      scope.row.goodsCode,
                      scope.row.itemQty,
                      scope.$index
                    )
                  "
                  type="number"
                  v-input-filter:num4
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="secUnitName"
            label="第二单位"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div v-if="scope.row.goodsCode == ``">
                <el-select
                  v-model="scope.row.secUnitName"
                  placeholder="请选择"
                  filterable
                  :disabled="scope.row.goodsCode ? true : false"
                >
                  <el-option
                    v-for="item in unitList"
                    :key="item.unitCode"
                    :label="item.unitName"
                    :value="item.unitName"
                  ></el-option>
                </el-select>
              </div>
              <div v-else>
                {{ scope.row.secUnitName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="secQty"
            label="第二数量"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.secQty"
                  placeholder="请输入"
                  type="number"
                  v-input-filter:num4
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="originPrice"
            label="业务币含税单价"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <span class="must-full">*</span>
                <el-input
                  type="number"
                  v-input-filter:num6
                  v-model="scope.row.originPrice"
                  placeholder="请输入内容"
                  @input="originPriceCh(scope.row, scope.$index, 1)"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="unOriginPrice"
            label="业务币不含税单价"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <span class="must-full">*</span>
                <el-input
                  type="number"
                  v-input-filter:num6
                  v-model="scope.row.unOriginPrice"
                  placeholder="请输入内容"
                  disabled
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="originAmt"
            label="业务币含税金额"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <span class="must-full">*</span>
                <el-input
                  type="number"
                  v-input-filter:num2
                  v-model="scope.row.originAmt"
                  @input="originAmtCh(scope.row, scope.$index, 1)"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="unOriginAmt"
            label="业务币不含税金额"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <span class="must-full">*</span>
                <el-input
                  type="number"
                  v-input-filter:num2
                  v-model="scope.row.unOriginAmt"
                  disabled
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="taxRate"
            label="增值税率%"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <span class="must-full">*</span>
                <el-input
                  type="number"
                  min="0"
                  v-input-filter:num0
                  v-model="scope.row.taxRate"
                  @input="taxRateCh(scope.row, scope.$index, 1)"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            show-overflow-tooltip
            prop="taxAmt"
            label="业务币增值税额"
          >
            <template slot-scope="scope">
              <div>
                <span class="must-full">*</span>
                <el-input
                  v-model="scope.row.taxAmt"
                  @input="taxAmtCh(scope.row, scope.$index)"
                  placeholder="请输入内容"
                  type="number"
                  v-input-filter:num2
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="baseTax"
            label="本币增值税额"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <span class="must-full">*</span>
                <el-input
                  type="number"
                  v-input-filter:num2
                  v-model="scope.row.baseTax"
                  disabled
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="basePrice"
            label="本币含税单价"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <span class="must-full">*</span>
                <el-input
                  type="number"
                  v-input-filter:num6
                  v-model="scope.row.basePrice"
                  disabled
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="unBasePrice"
            label="本币不含税单价"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <span class="must-full">*</span>
                <el-input
                  type="number"
                  v-input-filter:num6
                  v-model="scope.row.unBasePrice"
                  disabled
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="baseAmt"
            label="本币含税金额"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <span class="must-full">*</span>
                <el-input
                  type="number"
                  v-input-filter:num2
                  v-model="scope.row.baseAmt"
                  disabled
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="unBaseAmt"
            label="本币不含税金额"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <span class="must-full">*</span>
                <el-input
                  type="number"
                  v-input-filter:num2
                  v-model="scope.row.unBaseAmt"
                  disabled
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.remark"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 选择公司弹窗 -->
    <compony-select
      v-if="componyShow"
      :tipShow="componyShow"
      @tipsCancle="tipsCancle"
      @tipsSure="tipsSure"
      :ztz="ztz"
    ></compony-select>
    <!-- 选择部门弹窗 -->
    <department-select
      v-if="departmentShow"
      :tipShow="departmentShow"
      :data="companyName"
      @departmentCancle="departmentCancle"
      @departmentSure="departmentSure"
      :departztz="departztz"
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
    <!-- 选择物料弹窗 -->
    <matter-select
      v-if="matterShow"
      :tipShow="matterShow"
      @matterCancle="matterCancle"
      @matterSure="matterSure"
    ></matter-select>
    <!-- 选择币种弹窗 -->
    <coin-select
      v-if="coinShow"
      :tipShow="coinShow"
      @coinCancle="coinCancle"
      @coinSure="coinSure"
    ></coin-select>
    <!-- 选择框架弹窗 -->
    <agree-select
      v-if="agreeShow"
      :tipShow="agreeShow"
      @agreeCancle="agreeCancle"
      @agreeSure="agreeSure"
      contractCat="10890005"
      :companyName="companyName"
    ></agree-select>
    <!-- 选择国家弹窗 -->
    <country-select
      v-if="countryShow"
      :tipShow="countryShow"
      @countryCancle="countryCancle"
      @countrySure="countrySure"
    ></country-select>
    <!-- 选择国家弹窗 -->
    <!-- 选择供应商弹窗 -->
    <supplier-select
      v-if="supplierShow"
      :tipShow="supplierShow"
      @supplierCancle="supplierCancle"
      @supplierSure="supplierSure"
    ></supplier-select>
  </div>
</template>

<script>
import { mapState } from "vuex";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import staffSelect from "@/components/staffSelect.vue";
import projectSelect from "@/components/projectSelect.vue";
import coinSelect from "@/components/coinSelect.vue";
import customerSelect from "@/components/customerSelect.vue";
import matterSelect from "@/components/matterSelect.vue";
import agreeSelect from "@/components/agreeSelect.vue";
import countrySelect from "@/components/countrySelect.vue";
import supplierSelect from "@/components/supplierSelect.vue";

import Count from "@/assets/js/calculation";
import Cmange from "@/api/contractMange/cmange";
import "@/assets/css/contract.scss";
export default {
  name: "tabFirst",
  data() {
    return {
      departztz: 0,
      ztz: 0,
      componyShow: false, //银行弹窗
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      projectShow: false, //项目弹窗
      coinShow: false, //币种弹窗
      manShow: false, //人员弹窗
      customerShow: false, //客户弹窗
      matterShow: false, //物料弹窗
      supplierShow: false, //供应商弹窗
      agreeShow: false, //框架协议弹窗
      countryShow: false, //国家弹窗
      country: {}, //国家
      tradeCountry: ``, //贸易国别
      tradeCountryName: ``, //
      matterName: {}, //物料
      companyName: {}, //公司
      branchName: {}, //部门
      staffName: {}, //员工
      projectName: {}, //项目
      custName: {}, //客户
      manName: {}, //人员
      currency: {}, //币种
      currencyName: ``,
      isInaType: [], //合同状态
      contractType: [], //合同类型
      thList: [], //提货方式
      pickupType: ``, //提货
      unitList: [], //单位列表
      gxfsList: [], //购销方式列表
      poNo: ``, //采购合同号
      extCode: ``, //外部合同号
      signPlace: ``, //签约地点
      supplierName: {}, //供应商
      signTime: ``, //签订日期
      contractEndDate: ``, //有效日期
      currencyRate: `1`, //本位币汇率
      tradeType: ``, //购销方式
      ycdxType: false,
      poType: `10140005`, //合同类型
      contractStatus: `10130005`, //合同状态
      fwContractNo: ``, //框架协议号
      contractAmtVat: ``, //含税金额
      hanshuijine: ``, //变更合同原来含税金额
      sumQty: ``, //统计数量
      tolNum: ``, //已发货列表
      isSellOnCredit: ``, //是否赊账
      overShortageRate: ``, //溢短比.
      remark: ``, //备注
      createdTime: ``, //创建日期
      createdName: ``, //创建人
      tableData: [], //通讯表格
      tableDataChild: [], //表格拷贝
      delHis: [], // 表格变更时时删除数据
      tableCf: [], //表格拆分人民 未出库数量
      newTbale: [], //新建
      selectioned: [], //表格选中项
      poId: ``, //合同ID
      version: ``,
      tipFalse: true, //合同拆分数量判断 false<0 true>0
      loading: true, //表格loading
      pickerOptions: {},
      pickerClose: {},
      quChange: false, //是否为变更合同
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      show: true,
      errorKey: []
      // $root.Bus: this.$BusFactory(this)
    };
  },
  created() {
    this.htlx();
    this.htzt();
    this.gxfs();
    this.getUnit();
    this.thfs();
    //获取信息
    if (this.$route.query.id) {
      this.getNum();
      this.getDetail();
    }
    if (this.$route.query.change) {
      this.quChange = true;
    }
  },
  mounted() {

    if (this.$store.state.route.params.first) {
      let tol = 0;
      let map = JSON.parse(
        JSON.stringify(this.$store.state.route.params.first)
      );
      this.tableData = map.map((item, index) => {
        // this.originPriceCh(item, index);
        this.originAmtCh(item, index);
        item.taxAmt = item.originTaxAmt;
        // this.taxRateCh(item, index);
        // this.taxAmtCh(item, index);
       // item.poRowno = (index + 1) * 10;
        tol = Count.accAdd(tol, item.itemQty);
        return item;
      });
      this.tradeType = `10470010`;
      this.ycdxType = true;
      this.sumQty = tol;
    }
  },
  methods: {
    //
    clearProjectName(){
      this.projectName.projectCode="";
      this.projectName.projectName="";
      this.$set(this.projectName);
    },
    //获取信息
    getDetail() {
      let params = {
        poId: this.$route.query.id,
        pageSize: 999
      };
      //基本信息
      Cmange.getXx(params)
        .then(res => {
          let red = res.data;
          this.$store.commit(`cgDel`, { poId: red.poId, version: red.version });
          this.version = red.version;
          this.poId = red.poId; //合同ID
          this.companyName.companyId = red.companyId; //公司
          this.companyName.companyCode = red.companyCode; //公司
          this.companyName.companyName = red.companyName; //公司
          this.companyName.baseCurrencyCode = red.baseCurrencyCode; //本位币编码
          this.$root.Bus.$emit("companyNine", this.companyName);
          this.branchName.branchId = red.orgId; //部门
          this.branchName.branchName = red.orgName; //部门
          this.branchName.branchCode = red.orgCode; //部门
          this.staffName.empName = red.bizPersonName; //业务员
          this.staffName.empCode = red.bizPersonCode; //业务员
          this.poNo = red.poNo; //销售合同号
          this.custName.customerId = red.custId; //客户id
          this.custName.customerName = red.custName; //客户名称
          this.custName.customerCode = red.custCode; //客户编码
          this.extCode = red.extCode; //外部合同号
          this.projectName.projectCode = red.projectCode; //项目好
          this.projectName.projectName = red.projectName; //项目名称
          this.signTime = red.signTime; //签订日期
          this.contractEndDate = red.contractEndDate; //有效日期
          this.isSellOnCredit =
            red.isSellOnCredit && red.isSellOnCredit.toString(); //是否赊销
          this.signPlace = red.signPlace; //签约地点
          this.tradeCountryName = red.tradeCountryName; //贸易国别
          this.tradeCountry = red.tradeCountry; // 贸易国别代码
          this.supplierName.supplierName = red.supplierName; //供应商
          this.supplierName.supplierCode = red.supplierCode; //供应商
          this.supplierName.supplierId = red.supplierId; //供应商
          this.currency.currencyCode = red.currencyCode; //业务币种
          this.currencyRate = red.currencyRate; //本位币汇率
          this.contractAmtVat = red.contractAmtVat; //含税金额
          this.hanshuijine = red.contractAmtVat; //变更合同原来含税金额
          this.sumQty = red.sumQty; //统计数量
          this.tradeType = red.tradeType && red.tradeType.toString(); //购销方式
          this.poType = red.poType && red.poType.toString(); //合同类型
          this.contractStatus =
            red.contractStatus && red.contractStatus.toString(); //合同状态
          this.fwContractNo = red.fwContractNo; //框架协议号
          this.pickupType = red.pickupType && red.pickupType.toString(); //提货方式
          this.overShortageRate = red.overShortageRate; //溢短比
          this.remark = red.remark; //备注
          //合同拆分
          if (this.$route.query.children == 1) {
            this.extCode = ``;
            this.custName = {};
            this.signTime = ``;
            this.contractStatus = ``;
          }
          //查询币种
          if (red.currencyCode) {
            Cmange.getCur({ currencyCode: red.currencyCode })
              .then(qul => {
                if(qul.data.length){
                  this.currency.currencyName = qul.data[0].currencyName; //业务币种
                  this.currencyName = qul.data[0].currencyName; //业务币种
                }
              })
              .catch();
          }
        })
        .catch();
      // //物料表
      Cmange.getWl(params)
        .then(res => {
          this.tableData = res.data.map((item, index) => {
            this.originPriceCh(item, index);
            // this.originAmtCh(item, index);
            this.taxRateCh(item, index);
            this.taxAmtCh(item, index);
            return item;
          });
          if (this.$route.query.children) {
            this.tableDataChild = res.data.map((item, index) => {
              this.originPriceCh(item, index);
              // this.originAmtCh(item, index);
              this.taxRateCh(item, index);
              this.taxAmtCh(item, index);
              return item;
            });
            for (const item of this.tableData) {
              item.contractDetailId = ``;
              item.poId = ``;
              item.poNo = ``;
            }
          }
        })
        .catch();
    },
    to() {
      this.errorKey= [];
      if (!Object.keys(this.companyName).length) {
        this.errorKey.push('companyName');
      }
      if (!Object.keys(this.branchName).length) {
        this.errorKey.push('branchName');
      }
      if (!Object.keys(this.staffName).length) {
        this.errorKey.push('staffName');
      }
      if (!Object.keys(this.staffName).length) {
        this.errorKey.push('empName');
      }

      if (!Object.keys(this.supplierName).length) {
       this.errorKey.push('supplierName');
      }
      if (this.extCode == ``) {
        this.errorKey.push('extCode');
      }
      if (!this.signTime) {
        this.errorKey.push('signTime');
      }
      if (!Object.keys(this.currency).length) {
        this.errorKey.push('currencyName');
      }
      if (this.tradeType == ``) {
        this.errorKey.push('tradeType');
      }
      if (this.poType == ``) {
       this.errorKey.push('poType');
      }
      if (this.overShortageRate ===``) {
        this.errorKey.push('overShortageRate');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning(`请将必填项补充完整！`);
        return false;
      }
      //表格校验
      for (const item of this.tableData) {
        if (item.goodsName === ``) {
          this.$openWarning(`请输入物料名称`);
          return false;
        }
        if (item.goodsCategoryName === ``) {
          this.$openWarning(`请输入物料种类`);
          return false;
        }
        if (item.goodsSpec === ``) {
          this.$openWarning(`请输入物料规格`);
          return false;
        }
        if (item.itemUnitName === ``) {
          this.$openWarning(`请选择基础单位`);
          return false;
        }
        if (item.itemQty === ``) {
          this.$openWarning(`请输入数量`);
          return false;
        }
        if (item.originPrice === ``) {
          this.$openWarning(`请输入业务币含税单价`);
          return false;
        }
        if (item.originAmt === ``) {
          this.$openWarning(`请输入业务币含税金额`);
          return false;
        }
        if (item.taxRate === ``) {
          this.$openWarning(`请输入增值税率`);
          return false;
        }
        if (item.taxAmt === ``) {
          this.$openWarning(`请输入业务币增值税额`);
          return false;
        }
      }
      //合同拆分式数量对标
      if (this.$route.query.children) {
        for (const item of this.tableData) {
          this.tipFalse = this.tableCf.every(abc => {
            if (item.goodsCode == abc.goodsCode) {
              return Count.accSub(item.itemQty, abc.num) > 0;
            }
          });
        }
        if (!this.tipFalse) {
          this.$openWarning(`拆分数量不可大于合同未发生数量`);
          return false;
        }
      }
      let data = {
        odPoContract: {
          companyId: this.companyName.companyId, //公司
          companyName: this.companyName.companyName, //公司
          companyCode: this.companyName.companyCode, //公司
          baseCurrencyCode: this.companyName.baseCurrencyCode, //本位币编码
          orgId: this.branchName.branchId, //部门
          orgName: this.branchName.branchName, //部门
          orgCode: this.branchName.branchCode, //部门
          bizPersonName: this.staffName.empName, //业务员
          bizPersonCode: this.staffName.empCode, //业务员
          poNo: this.poNo, //销售合同号
          custId: this.custName.customerId, //客户id
          custName: this.custName.customerName, //客户名称
          custCode: this.custName.customerCode, //客户编码
          extCode: this.extCode, //外部合同号
          projectCode: this.projectName.projectCode, //项目好
          projectName: this.projectName.projectName, //项目名称
          signTime: this.signTime, //签订日期
          contractEndDate: this.contractEndDate, //有效日期
          isSellOnCredit: this.isSellOnCredit, //是否赊销
          signPlace: this.signPlace, //签约地点
          currencyCode: this.currency.currencyCode, //业务币种
          currencyRate: this.currencyRate, //本位币汇率
          contractAmtVat: this.contractAmtVat, //含税金额
          sumQty: this.sumQty, //统计数量
          tradeType: this.tradeType, //购销方式
          poType: this.poType, //合同类型
          tradeCountryName: this.tradeCountryName, //贸易国别
          tradeCountry: this.tradeCountry, // 贸易国别代码
          pickupType: this.pickupType, //提货方式
          contractStatus: this.$route.query.change
            ? `10130020`
            : this.contractStatus, //合同状态
          fwContractNo: this.fwContractNo, //框架协议号
          overShortageRate: this.overShortageRate, //溢短比.
          remark: this.remark, //备注
          supplierName: this.supplierName.supplierName, //供应商
          supplierCode: this.supplierName.supplierCode, //供应商
          supplierId: this.supplierName.supplierId, //供应商
          isChildrenContract: this.$route.query.children ? 0 : 1 //拆分0 新建1
        },
        odPoContractItemsList: this.tableData
      };
      if (this.$route.query.id) {
        data.odPoContract.poId = this.poId;
        data.odPoContract.version = this.version;
        for (let item of this.tableData) {
          item.poId = this.poId;
        }
      }
      if (this.$route.query.children) {
        for (const item of this.tableData) {
          item.poNo = ``;
        }
        data.odPoContract.parentContractNo = this.poId;
        if (!this.tableData.length) {
          this.$openWarning(`合同拆分时,必须要至少有一条物料明细`);
        }
      }
      //变更合同
      if (this.$route.query.change) {
        data.odPoContractItemsList = [...this.tableData, ...this.delHis];
        if (this.contractAmtVat != this.hanshuijine) {
          this.$confirm(
            `该合同预付款金额有变，请及时更新付款申请，您确定需要变更吗？`,
            {
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
            .then(() => {
              this.$emit("get", data, 1);
            })
            .catch();
        } else {
          this.$emit("get", data, 1);
        }
      } else {
        this.$emit("get", data, 1);
      }
    },
    // 获取已发货数量
    getNum() {
      let params = {
        poId: this.$route.query.id
      };
      Cmange.getNum(params)
        .then(res => {
          this.tolNum = res.data;
          let obj = {};
          for (const fahuo of res.data) {
            for (const zong of this.tableDataChild) {
              if (fahuo.goodsCode == zong.goodsCode) {
                obj.goodsCode = zong.goodsCode;
                obj.num = Count.accSub(zong.goodsCode, fahuo.goodsCode);
                this.tableCf.push(obj);
              }
            }
          }
        })
        .catch();
    },
    //获取合同类型
    htlx() {
      let data={
        dictNo:1014,
        bizCategory:1
      }
      Cmange.selectDic(data)
        .then(res => {
          this.contractType=res.data;
        })
        .catch();
    },
    //获取提货方式
    thfs() {
      Cmange.thfs()
        .then(res => {
          this.thList = res.data;
        })
        .catch();
    },
    //获取合同类型
    htzt() {
      Cmange.htzt()
        .then(res => {
          this.isInaType = res.data;
        })
        .catch();
    },
    //获取购销方式
    gxfs() {
      Cmange.gxfs()
        .then(res => {
          this.gxfsList = res.data.filter(item => {
            return item.dict_code != 10470020;
          });
        })
        .catch();
    },
    //第二单位/基本单位
    getUnit() {
      let data = {
        isInactiveList: 0
      };
      Cmange.getUnit(data)
        .then(res => {
          this.unitList = res.data;
        })
        .catch();
    },
    //查询货币
    currencyList(e) {
      let params = { id: e };
      Cmange.currency(params)
        .then(res => {
          this.companyName.baseCurrencyCode = res.data.currencyCode;
        })
        .catch();
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
      // this.currencyList(e.functionalCurrencyId);
      this.companyName.baseCurrencyCode = e.currencyCode;
      this.pariList();
      this.branchName = ``;
      this.staffName = ``;
      // this.$root.Bus.$emit("companyNine", e);
    },
    //签订日期
    changeTime(e) {
      this.$root.Bus.$emit("signTime", e);
    },
    //部门弹窗打开
    departmentTip() {
      // if (this.companyName.companyName == ``) {
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
      // if (this.companyName == `` || this.branchName == ``) {
      //   this.$openWarning("请先选择公司和部门");
      //   return false;
      // }
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
    //协议弹窗打开
    agreeTip() {
      this.agreeShow = true;
    },
    //协议弹窗关闭
    agreeCancle() {
      this.agreeShow = false;
    },
    //协议弹窗确定获取数据
    agreeSure(e) {
      this.agreeShow = false;
      this.fwContractNo = e.contractNo;
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
    //国家弹窗打开
    countryTip() {
      this.countryShow = true;
    },
    //国家弹窗关闭
    countryCancle() {
      this.countryShow = false;
    },
    //国家弹窗确定获取数据
    countrySure(e) {
      this.countryShow = false;
      this.country = e;
      this.tradeCountryName = e.regionName;
      this.tradeCountry = e.regionId;
    },
    //币种弹窗打开
    coinTip() {
      this.coinShow = true;
    },
    //币种弹窗关闭
    coinCancle() {
      this.coinShow = false;
    },
    //币种弹窗确定获取数据
    coinSure(e) {
      this.coinShow = false;
      this.currency = e;
      this.currencyName = e.currencyName;
      this.pariList();
      this.$root.Bus.$emit("currency", e);
    },
    //汇率查询
    pariList() {
      if (!this.currency.currencyCode || !this.companyName.baseCurrencyCode) {
        return false;
      }
      let params = {
        formCurrencyCode: this.currency.currencyCode,
        toCurrencyCode: this.companyName.baseCurrencyCode
      };
      Cmange.getParitiesCode(params)
        .then(res => {
          this.currencyRate = res.data.parities;
        })
        .catch();
    },
    //总计数量
    qtyChange(id, e, index) {
      let tol = 0;
      // for (const item of this.tableData) {
      //   tol = Count.accAdd(tol, item.itemQty);
      // }
      this.tableData.map((item, index) => {
        tol = Count.accAdd(tol, item.itemQty);
        this.originPriceCh(item, index, 1);
        // this.originAmtCh(item, index);
        // this.taxRateCh(item, index);
        // this.taxAmtCh(item, index);
      });
      if (this.$route.query.children) {
        for (const item of this.tableCf) {
          if (id == item.goodsCode) {
            if (Count.accSub(e, item.num) < 0) {
              this.tipFalse = false;
              this.$openWarning(`拆分数量不可大于合同未发生数量`);
              return false;
            }
          }
        }
      } else {
        this.tipFalse = true;
        this.sumQty = tol;
      }
    },
    //汇率改变
    bwbhl(e) {
      this.tableData.forEach((row, index) => {
        //本币计算 对应业务币*汇率
        //本币含税单价  basePrice
        row.basePrice = this.$bbhsdj(row.originPrice, this.currencyRate);
        //本币不含税单价 unBasePrice
        row.unBasePrice = this.$bbnhsdj(row.unOriginPrice, this.currencyRate);
        //本币含税金额 baseAmt
        row.baseAmt = this.$bbhsje(row.originAmt, this.currencyRate);
        //本币增值税额 baseTax
        row.baseTax = this.$bbzzse(row.taxAmt, this.currencyRate);
        //本币不含税金额 unBaseAmt
        row.unBaseAmt = this.$tybbnhsje(row.baseAmt, row.baseTax);
        this.$set(this.tableData, index, row);
      });
    },
    //采购含税单价变动
    originPriceCh(e, index, type) {
      let row = e;
      //采购不含税单价
      row.unOriginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //采购含税金额
      row.originAmt = this.$orginAmt(row.originPrice, row.itemQty);
      //采购不含税金额
      row.unOriginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //增值税额
      if (type == 1) {
        row.taxAmt = this.$taxAmt(row.originAmt, row.unOriginAmt);
      }

      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, this.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(row.unOriginPrice, this.currencyRate);
      //本币含税金额 baseAmt
      row.baseAmt = this.$bbhsje(row.originAmt, this.currencyRate);
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, this.currencyRate);
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$tybbnhsje(row.baseAmt, row.baseTax);
      this.$set(this.tableData, index, row);
    },
    //采购含税金额变动
    originAmtCh(e, index, type) {
      //总计业务币含税金额
      // let tol = 0;
      // for (const item of this.tableData) {
      //   tol = Count.accAdd(tol, item.originAmt);
      // }
      // this.contractAmtVat = tol;

      let row = e;
      //采购含税单价
      console.log(row.originAmt, row.itemQty)
      row.originPrice = this.$orginPrice(row.originAmt, row.itemQty);
      //采购不含税单价
      row.unOriginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //采购不含税金额
      row.unOriginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //增值税额
      if (type == 1) {
        row.taxAmt = this.$taxAmt(row.originAmt, row.unOriginAmt);
      }

      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, this.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(row.unOriginPrice, this.currencyRate);
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, this.currencyRate);
      //本币含税金额 baseAmt
      row.baseAmt = this.$bbhsje(row.originAmt, this.currencyRate);
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$tybbnhsje(row.baseAmt, row.baseTax);
      this.$set(this.tableData, index, row);
    },
    //税率变动
    taxRateCh(e, index, type) {
      let row = e;
      //采购不含税金额
      row.unOriginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //增值税额
      if (type == 1) {
        row.taxAmt = this.$taxAmt(row.originAmt, row.unOriginAmt);
      }
      //采购不含税单价
      row.unOriginPrice = this.$unorginPrice(row.originPrice, row.taxRate);

      //本币计算 对应业务币*汇率
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, this.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(row.unOriginPrice, this.currencyRate);
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$tybbnhsje(row.baseAmt, row.baseTax);
      this.$set(this.tableData, index, row);
    },
    //业务币税额变动
    taxAmtCh(e, index) {
      let row = e;
      //采购不含税金额  采购不含税金额=采购含税金额-税额
      row.unOriginAmt = this.$unorginAmtCh(row.originAmt, row.taxAmt);
      //采购不含税单价 采购不含税金额 / 数量
      row.unOriginPrice = this.$unPrice(row.unOriginAmt, row.itemQty);
      //本币计算 对应业务币*汇率
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(row.unOriginPrice, this.currencyRate);
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, this.currencyRate);
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$tybbnhsje(row.baseAmt, row.baseTax);
      this.$set(this.tableData, index, row);
    },
    //含税金额变动
    vatAmtCh(e, index) {
      let row = e;
      //比例
      row.rate = this.$rate(row.vatAmt, this.tableData);
      this.$set(this.tableDataFkfs, index, row);
    },
    //比例输入 推金额
    vatAmt(e, index) {
      let row = e;
      row.vatAmt = this.$vatAmt(row.rate, this.tableData);
      this.$set(this.tableDataFkfs, index, row);
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
      // let data = {
      //   edit: this.tableData[this.index].edit,
      //   one: this.tableData[this.index].one,
      //   poRowno: this.tableData[this.index].poRowno,
      //   goodsId: e.skuId,
      //   goodsCode: e.skuCode,
      //   goodsName: e.skuName,
      //   goodsCat: e.categoryShowName,
      //   goodsCategoryName: e.categoryShowName,
      //   goodsSpec: e.propertyInfo,
      //   itemUnit: e.firstUnitName,
      //   itemUnitName: e.firstUnitName,
      //   itemQty: this.tableData[this.index].itemQty,
      //   secUnit: e.secUnitName,
      //   secUnitName: e.secUnitName,
      //   secQty: this.tableData[this.index].secQty,
      //   remark: this.tableData[this.index].remark
      // };
      this.tableData[this.index].goodsId = e.skuId;
      this.tableData[this.index].goodsCode = e.skuCode;
      this.tableData[this.index].goodsName = e.skuName;
      this.tableData[this.index].goodsCat = e.categoryCode;
      this.tableData[this.index].goodsCategoryName = e.categoryShowName;
      this.tableData[this.index].goodsSpec = e.propertyInfo;
      this.tableData[this.index].itemUnit = e.firstUnitName;
      this.tableData[this.index].itemUnitName = e.firstUnitName;
      this.tableData[this.index].secUnit = e.secUnitName;
      this.tableData[this.index].secUnitName = e.secUnitName;
      this.tableData[this.index].taxRate = e.vatRate;
      this.$set(this.tableData, this.index, this.tableData[this.index]);
    },
    //删除
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
          let idSavItem = []; //修改数据
          let idNo = []; //新建数据
          for (const item of this.selectioned) {
            if (item.contractDetailId) {
              idSavItem.push(item);
              idSav.push(item.contractDetailId);
            } else {
              idNo.push(item);
            }
          }
          let params = {
            contractDetailIdList: idSav.join(","),
            poId: this.$store.state.contraDelData.cgCon.poId,
            version: this.$store.state.contraDelData.cgCon.version
          };
          if (!this.$route.query.change) {
            //不为变更合同时
            idSav.length &&
              Cmange.delCwl(params)
                .then(res => {
                  this.$openSuccess(res.message);
                  this.deleIndex(idSavItem, this.tableData);
                })
                .catch();
            this.deleIndex(idNo, this.tableData);
          } else {
            let tab = JSON.parse(JSON.stringify(this.tableData));
            let delFis = JSON.parse(JSON.stringify(idSavItem));
            for (const item of delFis) {
              item.itemQty = 0;
              item.originAmt = 0;
            }
            Cmange.delCwlHis(delFis)
              .then(res => {
                if (res.code == `success`) {
                  for (const item of delFis) {
                    item.isInactive = 2;
                  }
                  this.delHis = [...this.delHis, ...delFis];
                  this.deleIndex(idSavItem, this.tableData);
                } else {
                  this.$openWarning(res.message);
                }
              })
              .catch(err => {
                this.$openError(err.message);
              });
            this.deleIndex(idNo, this.tableData);
          }
        })
        .catch();
    },
    //删除方法
    deleIndex(e, list) {
      for (const get of e) {
        let del = list.findIndex(item => {
          return (
            item.one == get.one && item.contractDetailId == get.contractDetailId
          );
        });
        list.splice(del, 1);
      }
      //不为变更合同时变化
      if (!this.$route.query.change) {
        this.tableData.forEach((item, index) => {
          item.poRowno = (index + 1) * 10;
          this.$set(this.tableData, index, item);
        });
      }
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
        poRowno: (this.tableData.length + 1) * 10,
        goodsCode: ``,
        goodsName: ``,
        goodsCat: ``,
        goodsCategoryName: ``,
        goodsSpec: ``,
        itemUnit: ``,
        itemUnitName: ``,
        itemQty: ``,
        taxRate: ``,
        secUnit: ``,
        secUnitName: ``,
        secQty: ``,
        remark: ``,
        originPrice: ``,
        unOriginPrice: ``,
        originAmt: ``,
        unOriginAmt: ``,
        taxAmt: ``,
        baseTax: ``,
        basePrice: ``,
        unBasePrice: ``,
        baseAmt: ``,
        unBaseAmt: ``
      };
      if (this.$route.query.change) {
        let maxList = [];
        for (const item of this.tableData) {
          maxList.push(item.poRowno);
        }
        let max = Math.max(...maxList);
        data.poRowno = Count.accAdd(max, 10);
      }
      this.newTbale.unshift(data);
      let newTbale = [];
      newTbale.unshift(data);
      this.tableData = newTbale.concat(this.tableData);
      if (this.$route.query.change) {
        this.$forceUpdate();
      } else {
        // this.tableData.forEach((item, index) => {
        //   item.poRowno = (index + 1) * 10;
        //   this.$set(this.tableData, index, item);
        // });
      }
    },
    getSummariesWl(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        } else if (
          index === 7 ||
          index === 9 ||
          index === 12 ||
          index === 13 ||
          index === 15 ||
          index === 16 ||
          index === 19 ||
          index === 20
        ) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                let res = Count.accAdd(prev, curr); //parseFloat(prev + curr);
                return res;
              } else {
                return prev;
              }
            }, 0);
            this.contractAmtVat = sums[12];
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

  watch: {

    tableData: {
      handler(e) {
        this.$root.Bus.$emit("matterList", e);
        let vat = 0;
        let shuie = 0;
        let shul = 0;
        for (const item of this.tableData) {
          vat = Count.accAdd(vat, item.taxAmt);
          shuie = Count.accAdd(shuie, item.originAmt);
          shul = Count.accAdd(shul, item.itemQty);
        }
        //统计金额
        this.contractAmtVat = shuie;
        //统计数量
        this.sumQty = shul;
        //采购增值税
        this.$root.Bus.$emit(`taxAmt`, { a: vat, b: `内贸` });
      },
      deep: true
    },
    poNo: {
      handler() {
        this.$root.Bus.$emit("no", this.poNo);
      }
    },
    currencyRate: {
      handler() {
        this.$root.Bus.$emit("currencyRate", this.currencyRate);
        this.bwbhl();
        this.tableData.map((item, index) => {
          this.originPriceCh(item, index);
          this.originAmtCh(item, index);
          this.taxRateCh(item, index);
          this.taxAmtCh(item, index);
        });
      }
    },
    currency: {
      handler() {
        this.$root.Bus.$emit("currencyName", this.currency);
      },
      deep: true
    },
    companyName: {
      handler() {
        this.$root.Bus.$emit("company", this.currency);
        this.$root.Bus.$emit("companyNine", this.companyName);
      },
      deep: true
    },
    contractAmtVat: {
      handler() {
        //采购货价（含税）
        this.$root.Bus.$emit(`vat`, { a: this.contractAmtVat, b: `内贸` });
      }
    },
    signTime(val) {
      let that = this;
      if (val > that.contractEndDate) {
        that.contractEndDate = "";
      }
      this.pickerClose = {
        disabledDate(time) {
          return time.getTime() < that.signTime;
        }
      };
    }
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    projectSelect,
    customerSelect,
    coinSelect,
    matterSelect,
    agreeSelect,
    countrySelect,
    supplierSelect
  }
};
</script>

<style lang="scss">
.aaaaaaaaa {
  textarea {
    min-height: 24px !important;
    height: 24px !important;
  }
}
</style>
