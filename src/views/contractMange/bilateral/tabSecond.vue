<template>
  <div class="tabSecond content-div2 contract_css_link">
    <!-- 搜索 -->
    <div class="input-div input-div-bor">
      <el-divider content-position="left">供应商合同基本信息</el-divider>
      <div>
        <el-col :span="5" class="el-col el-col-required">
          <label><span class="must-full">*</span>采购合同号</label>
          <el-input
            class="el-inputs"
            placeholder="请输入"
            :class="errorKey.includes('supplierContractNo') ? 'inputRed' : ''"
            v-model="supplierContractNo"
            disabled
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col el-col-required">
          <label><span class="must-full">*</span>供应商</label>
          <el-input
            v-model="supplierName.supplierName"
            :class="errorKey.includes('supplierName') ? 'inputRed' : ''"
            class="el-inputs"
            placeholder="请选择"
            disabled
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc el-col-required">
          <label><span class="must-full">*</span>签订日期</label>
          <el-date-picker
            v-model="signTime"
            :class="errorKey.includes('signTime') ? 'inputRed' : ''"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
          <label class="">联系人</label>
          <el-input
            v-model="linkMan"
            class="el-inputs"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label class="">
            联系方式
          </label>
          <el-input
            v-model="mobilePhone"
            class="el-inputs"
            placeholder="请输入"
            type="number"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col el-col-required">
          <label><span class="must-full">*</span>业务币种</label>
          <el-input
            v-model="currencyName"
            :class="errorKey.includes('currency') ? 'inputRed' : ''"
            class="el-inputs"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" @click="coinTip">
            <i class="el-icon-search"></i>
          </span>
        </el-col>
        <el-col :span="5" class="el-col el-col-required">
          <label><span class="must-full">*</span>本位币汇率</label>
          <el-input
            v-model="currencyRate"
            type="number"
            :class="errorKey.includes('currencyRate') ? 'inputRed' : ''"
            v-input-filter:num8
            class="el-inputs"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc el-col-required">
          <label><span class="must-full">*</span>溢短比%</label>
          <el-input
            v-model="overShortageRate"
            type="number"
            v-input-filter:num8
            class="el-inputs"
            :class="errorKey.includes('overShortageRate') ? 'inputRed' : ''"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>贸易国别</label>
          <el-input
            v-model="tradeCountryName"
            class="el-inputs"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" v-if="tradeCountryName" @click="tradeCountryName = ``, tradeCountry = ``">
            <i class="el-icon-circle-close"></i>
          </span>
          <span class="comicon" v-else @click="countryTip">
            <i class="el-icon-search"></i>
          </span>
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
        <!-- <el-col :span="5" class="el-colc">
          <label>备注</label>
          <el-input v-model="remark" class="el-inputs"></el-input>
        </el-col> -->
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
          >
          </el-input>
        </el-col>
      </div>
    </div>
    <!-- 商品采购信息 -->
    <div class="input-div input-div-bor bortop0">
      <!-- <div class="flex_center" v-if="$route.query.id && tableData.length">
        <div class="button-div">
          <el-button icon="el-icon-minus" @click="setUp(selectioned, tableData, 0)">删除</el-button>
        </div>
      </div> -->
      <el-divider content-position="left">商品采购信息</el-divider>
      <div class="martop_10">
        <el-table
          border
          center
          show-summary
          :data="tableData"
          class="el-table"
          ref="wlTable"
          @selection-change="wlmxhandleChange"
          :summary-method="getSummariesWl"
          max-height="288"
        >
          <el-table-column
            v-if="$route.query.id"
            type="selection"
            width="55"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="行号"
            prop="rowno"
            width="55"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            width="150"
            prop="goodsCode"
            label="物料号"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            width="150"
            prop="goodsName"
            label="物料名称"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            width="150"
            prop="goodsCategoryName"
            label="物料种类"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            width="150"
            prop="goodsSpec"
            label="物料规格"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            width="150"
            prop="itemUnitName"
            label="基础单位"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            width="150"
            prop="itemQty"
            label="数量"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            width="150"
            prop="secUnitName"
            label="第二单位"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            width="150"
            prop="secQty"
            label="第二数量"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            width="150"
            prop="originPrice"
            label="采购含税单价"
          >
            <template slot-scope="scope">
              <div>
                <span class="must-full">*</span>
                <el-input
                  v-model="scope.row.originPrice"
                  @input="originPriceCh(scope.row, scope.$index)"
                  v-input-filter:num6
                  placeholder="请输入内容"
                  type="number"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            width="150"
            prop="unOriginPrice"
            label="采购不含税单价"
          >
            <template slot-scope="scope">
              <div>
                <span class="must-full">*</span>
                <el-input
                  v-model="scope.row.unOriginPrice"
                  placeholder="请输入内容"
                  disabled
                  type="number"
                  v-input-filter:num6
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            width="150"
            prop="originAmt"
            label="采购含税金额"
          >
            <template slot-scope="scope">
              <div>
                <span class="must-full">*</span>
                <el-input
                  v-model="scope.row.originAmt"
                  placeholder="请输入内容"
                  @input="originAmtCh(scope.row, scope.$index)"
                  v-input-filter:num2
                  type="number"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            width="150"
            prop="unoriginAmt"
            label="采购不含税金额"
          >
            <template slot-scope="scope">
              <div>
                <span class="must-full">*</span>
                <el-input
                  v-model="scope.row.unoriginAmt"
                  placeholder="请输入内容"
                  disabled
                  type="number"
                  v-input-filter:num2
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            width="150"
            prop="taxRate"
            label="增值税率%"
          >
            <template slot-scope="scope">
              <div>
                <span class="must-full">*</span>
                <el-input
                  min="0"
                  v-input-filter:num0
                  v-model="scope.row.taxRate"
                  @input="taxRateCh(scope.row, scope.$index)"
                  placeholder="请输入内容"
                  type="number"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            width="150"
            prop="taxAmt"
            label="增值税额"
          >
            <template slot-scope="scope">
              <div>
                <span class="must-full">*</span>
                <el-input
                  v-input-filter:num2
                  v-model="scope.row.taxAmt"
                  @input="taxAmtCh(scope.row, scope.$index)"
                  placeholder="请输入内容"
                  type="number"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            width="150"
            prop="remark"
            label="备注"
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
    <!-- 商品采购信息 -->
    <!-- 搜索 -->
    <div class="input-div input-div-bor">
      <el-divider content-position="left">运输信息</el-divider>
      <div>
        <el-col :span="5" class="el-col">
          <label class="">
            最迟交期
          </label>
          <el-date-picker
            style="width:70%;"
            v-model="form.deliveryCutoffDate"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>价格条款</label>
          <el-select v-model="form.priceTem" placeholder="请选择">
            <el-option
              v-for="item in jgtkList"
              :key="item.dict_code"
              :label="item.dict_value"
              :value="item.dict_code"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>运输方式</label>
          <el-select v-model="form.transMode" placeholder="请选择">
            <el-option
              v-for="item in ysfsList"
              :key="item.dict_code"
              :label="item.dict_value"
              :value="item.dict_code"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>装卸时间</label>
          <el-select v-model="form.loadType" placeholder="请选择">
            <el-option
              v-for="item in zxsjList"
              :key="item.dict_code"
              :label="item.dict_value"
              :value="item.dict_code"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>船运方式</label>
          <el-select v-model="form.shipMode" placeholder="请选择">
            <el-option
              v-for="item in cyfsList"
              :key="item.dict_code"
              :label="item.dict_value"
              :value="item.dict_code"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col texcen">
          <el-radio-group v-model="radio" @change="aaaa">
            <!-- <el-radio label="isTransfered">转船</el-radio>
            <el-radio label="isBatched">分批</el-radio> -->
            <el-checkbox v-model="isTransfered">转船</el-checkbox>
            <el-checkbox v-model="isBatched">分批</el-checkbox>
          </el-radio-group>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>装货港</label>
          <el-input
            v-model="form.loadingPort"
            class="el-inputs"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" @click="arrTip(1)">
            <i class="el-icon-search"></i>
          </span>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>卸货港</label>
          <el-input
            v-model="form.unloadingPort"
            class="el-inputs"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" @click="arrTip(0)">
            <i class="el-icon-search"></i>
          </span>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>目的地</label>
          <el-input
            v-model="form.destination"
            class="el-inputs"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>船名</label>
          <el-input
            v-model="form.shipName"
            class="el-inputs"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>船舶识别号</label>
          <el-input
            v-model="form.shipCode"
            class="el-inputs"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>收货地址</label>
          <el-input
            v-model="form.receiverAddress"
            class="el-inputs"
            placeholder="请输入"
          ></el-input>
        </el-col>
      </div>
    </div>
    <!-- 搜索 -->
    <!-- 运输信息 -->
    <div class="input-div input-div-bor bortop0">
      <div class="flex_center">
        <div class="button-div">
          <el-button
            icon="el-icon-plus"
            class="query-button"
            @click="ysxxaddList"
            >创建</el-button
          >
          <el-button
            icon="el-icon-minus"
            @click="setUp(selecYsxx, tableDataYsxx, 1)"
            >删除</el-button
          >
        </div>
      </div>
      <div class>
        <el-table
          border
          center
          :data="tableDataYsxx"
          class="el-table"
          ref="multipleTable"
          @selection-change="ysxxhandleChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- <el-table-column label="序号" prop="rowno" width="55" show-overflow-tooltip></el-table-column> -->
          <el-table-column
            label="序号"
            type="index"
            width="55"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="paritiesDate"
            label="出厂运输方式"
          >
            <template slot-scope="scope">
              <div>
                <el-select
                  v-model="scope.row.leaveTransferMode"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in ysfsList"
                    :key="item.dict_code"
                    :label="item.dict_value"
                    :value="item.dict_code"
                  ></el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="transferTarget"
            label="目的地"
          >
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.transferTarget"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="transferPlanMan"
            label="运输安排人（供应商安排/仓储物流中心安排）"
          >
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.transferPlanMan"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="transferExcutor"
            label="承运人（车队/船队）"
          >
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.transferExcutor"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="transferNote"
            label="备注"
          >
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.transferNote"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 商品采购信息 -->
    <!-- 付款方式 -->
    <div class="input-div input-div-bor bortop0">
      <el-divider content-position="left">付款方式</el-divider>
      <div class="martop_10">
        <div class="button-div">
          <el-button
            icon="el-icon-plus"
            class="query-button"
            @click="fkfsaddList"
            >创建</el-button
          >
          <el-button
            icon="el-icon-minus"
            @click="setUp(selecFkfs, tableDataFkfs, 2)"
            >删除</el-button
          >
        </div>
      </div>
      <div class>
        <el-table
          border
          center
          show-summary
          :data="tableDataFkfs"
          class="el-table"
          ref="multipleTable"
          @selection-change="fkfshandleChange"
          :summary-method="getSummaries"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- <el-table-column label="序号" prop="rowno" width="55" show-overflow-tooltip></el-table-column> -->
          <el-table-column
            label="序号"
            type="index"
            width="55"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="paymentType"
            label="付款类型"
          >
            <template slot-scope="scope">
              <div>
                <el-select v-model="scope.row.paymentType" placeholder="请选择">
                  <el-option
                    v-for="item in fklxList"
                    :key="item.dict_code"
                    :label="item.dict_value"
                    :value="item.dict_code"
                  ></el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="paymentWay"
            label="付款方式"
          >
            <template slot-scope="scope">
              <div>
                <el-select v-model="scope.row.paymentWay" placeholder="请选择">
                  <el-option
                    v-for="item in fkfsList"
                    :key="item.dict_code"
                    :label="item.dict_value"
                    :value="item.dict_code"
                  ></el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="creditType"
            label="信用证类型"
          >
            <template slot-scope="scope">
              <div>
                <el-select
                  v-model="scope.row.creditType"
                  placeholder="请选择"
                  :disabled="scope.row.paymentWay != `10210020`"
                >
                  <el-option
                    v-for="item in xyzlxList"
                    :key="item.dict_code"
                    :label="item.dict_value"
                    :value="item.dict_code"
                  ></el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="day" label="天数">
            <template slot-scope="scope">
              <div v-if="scope.row.creditType == 10220010">
                <el-input
                  v-model="scope.row.day"
                  v-input-filter:num2
                  placeholder="请输入内容"
                  type="number"
                ></el-input>
              </div>
              <div v-else>
                {{ scope.row.day }}
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="rate" label="*比例%">
            <template slot-scope="scope">
              <div>
                <el-input
                  type="number"
                  v-model="scope.row.rate"
                  v-input-filter:num2
                  placeholder="请输入内容"
                  @input="vatAmt(scope.row, scope.$index)"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="vatAmt" label="含税金额">
            <template slot-scope="scope">
              <div>
                <el-input
                  type="number"
                  v-model="scope.row.vatAmt"
                  v-input-filter:num2
                  placeholder="请输入内容"
                  @input="vatAmtCh(scope.row, scope.$index)"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="prePaymentDate"
            label="预付款日期"
            width="170"
          >
            <template slot-scope="scope">
              <div>
                <el-date-picker
                  v-model="scope.row.prePaymentDate"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="remark" label="备注">
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
    <!-- 付款方式 -->
    <!-- 合同条款 -->
    <div class="input-div input-div-bor bortop0">
      <el-divider content-position="left">合同条款</el-divider>
      <div class="martop_10">
        <div class="button-div">
          <el-button
            icon="el-icon-plus"
            class="query-button"
            @click="httkaddList"
            >创建</el-button
          >
          <el-button
            icon="el-icon-minus"
            @click="setUp(selecHttk, tableDataHtts, 3)"
            >删除</el-button
          >
        </div>
      </div>
      <div class>
        <el-table
          border
          center
          :data="tableDataHtts"
          class="el-table"
          ref="multipleTable"
          max-height="288"
          @selection-change="httkhandleChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- <el-table-column label="序号" prop="termRowno" width="50"></el-table-column> -->
          <el-table-column
            label="序号"
            type="index"
            width="55"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="paritiesDate"
            label="条款内容"
          >
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.termContent"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 选择币种弹窗 -->
    <coin-select
      v-if="coinShow"
      :tipShow="coinShow"
      @coinCancle="coinCancle"
      @coinSure="coinSure"
    ></coin-select>
    <!-- 选择国家弹窗 -->
    <country-select
      v-if="countryShow"
      :tipShow="countryShow"
      @countryCancle="countryCancle"
      @countrySure="countrySure"
    ></country-select>
    <!-- 选择国家弹窗 -->
    <Arr-select
      v-if="arrShow"
      :tipShow="arrShow"
      @ArrialPortCancle="ArrialPortCancle"
      @ArrialPortSure="ArrialPortSure"
    ></Arr-select>
    <!-- 合同条款 -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Amange from "@/api/contractMange/amange";

import Count from "@/assets/js/calculation";
import coinSelect from "@/components/coinSelect.vue";
import countrySelect from "@/components/countrySelect.vue";
import ArrSelect from "@/components/ArrivalPort.vue";
import "@/assets/css/contract.scss";
export default {
  name: "tabSecond",
  data() {
    return {
      arrShow: false, //港口
      coinShow: false, //币种弹窗
      countryShow: false, //国家弹窗
      companyName: {}, //公司
      country: ``, //国家
      currency: {}, //币种
      currencyName: ``,
      matterList: {}, //物料数据
      supplierName: {}, //供应商
      signTime: ``, //签订日期
      signPlace: ``, //签约地点
      mobilePhone: ``, //供应商移动电话
      linkMan: ``, //供应商联系人
      currencyRate: `1`, //本位币汇率
      overShortageRate: ``, //溢短比
      tradeCountry: ``, //贸易国别
      thList: [], //提货方式
      pickupType: ``, //提货
      tradeCountryName: ``, //
      remark: ``, //备注
      supplierExtNo: ``, //供应商外部合同号
      //运输信息
      form: {
        deliveryCutoffDate: ``, //最迟交货日期
        priceTem: ``, //价格条款
        transMode: ``, //运输方式
        loadType: ``, //装卸时间
        shipMode: ``, //船运方式
        radio: ``, //转船分批
        isTransfered: false, //是否转船
        isBatched: false, //是否分批
        loadingPort: ``, //装货港
        unloadingPort: ``, //卸货港
        destination: ``, //目的地
        shipName: ``, //船名
        shipCode: ``, //船舶识别号
        receiverAddress: `` //收货地址
      },
      deliveryCutoffDate: ``, //最迟交货日期
      priceTem: ``, //价格条款
      jgtkList: [], //条款列表
      transMode: ``, //运输方式
      ysfsList: [], //运输方式列表
      loadType: ``, //装卸时间
      zxsjList: [], //装卸时间列表
      shipMode: ``, //船运方式
      cyfsList: [], //方式列表
      radio: ``, //转船分批
      isTransfered: false, //是否转船
      isBatched: false, //是否分批
      portTypr: ``, //1装货 0卸货
      loadingPort: ``, //装货港
      unloadingPort: ``, //卸货港
      destination: ``, //目的地
      shipName: ``, //船名
      shipCode: ``, //船舶识别号
      receiverAddress: ``, //收货地址
      //表格
      tableDataYsxx: [], //运输信息表格
      selecYsxx: [], //运输信息表格选中项
      fklxList: [], //付款类型
      fkfsList: [], //付款方式
      xyzlxList: [], //信用证
      tableDataFkfs: [], //付款方式表格
      selecFkfs: [], //付款方式表格选中项
      tableDataHtts: [], //客厅条款表格
      selecHttk: [], //合同条款表格选中项
      tableData: [], //采购信息表格
      selectioned: [], //表格选中项
      rateTol: 0, //付款方式总比例
      //
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      loading: true, //表格loading
      supplierContractId: ``, //采购合同ID
      supplierContractNo: ``, //采购合同号
      psContractId: ``,
      psContractNo: ``,
      version: ``,
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
      show: true,
      errorKey: []
    };
  },
  components: {
    coinSelect,
    countrySelect,
    ArrSelect
  },
  created() {
    //价格条款
    this.jgtk();
    //运输方式
    this.ysfs();
    //装卸时间
    this.zxsj();
    //船运方式
    this.cyfs();
    //付款类型
    this.fklx();
    //付款方式
    this.fkfs();
    //信用证类型
    this.xyzlx();
    this.thfs();
    //获取信息
    this.$route.query.id && this.getDetail();
    this.$store.rate = this.currencyRate;
  },
  mounted() {
    //供应商合同号
    this.$root.Bus.$on("gyshth", e => {
      // if (this.$route.query.id) return false;
      this.supplierExtNo = e;
    });
    this.$root.Bus.$on("supplierName", e => {
      this.supplierName = e;
    });
    this.$root.Bus.$on("signTime", e => {
      this.signTime = e;
    });
    this.$root.Bus.$on("companyName", e => {
      this.companyName = e;
      this.currencyName && this.pariList();
    });
    this.$root.Bus.$on("matterList", e => {
      let a = JSON.parse(JSON.stringify(e));
      // for (const item of abd) { 增值税率
      //   if (item.taxRate == `` || typeof item.taxRate == `undefined`)
      //     item.taxRate = 0;
      // }
      a.map((item, index) => {
        if (this.tableData[index]) {
          item.contractDetailId = this.tableData[index].contractDetailId;
          item.originPrice = this.tableData[index].originPrice;
          item.unOriginPrice = this.tableData[index].unOriginPrice;
          item.originAmt = this.tableData[index].originAmt;
          item.unoriginAmt = this.tableData[index].unoriginAmt;
          item.taxAmt = this.tableData[index].taxAmt;
          item.taxRate = this.tableData[index].taxRate || item.taxRate;
        } else {
          item.originPrice = ``;
          item.unOriginPrice = ``;
          item.originAmt = ``;
          item.unoriginAmt = ``;
          item.taxAmt = ``;
          item.taxRate = ``;
        }
        return item;
      });
      this.tableData = a;
    });
    this.$root.Bus.$on("matterListIndex", e => {
      this.selectioned = [];
      // this.$refs.wlTable.clearSelection();
      for (let item of e) {
        this.selectioned.push(this.tableData[item]);
      }
      this.firstDele(this.selectioned, this.tableData);
    });
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
        psContractId: this.$route.query.id,
        pageSize: 999
      };
      //基本信息
      Amange.getGcg(params)
        .then(res => {
          let red = res.data;
          if (red.supplierExtNo) {
            this.supplierExtNo = red.supplierExtNo; //供应商外部合同号
          }
          this.psContractId = red.psContractId; //双边合同号id
          this.psContractNo = red.psContractNo; //双边合同号
          this.supplierContractId = red.supplierContractId; //采购合同号
          this.supplierContractNo = red.supplierContractNo; //采购合同号
          this.signTime = red.signTime; //签约时间
          this.linkMan = red.linkMan; //供应商联系人
          this.mobilePhone = red.mobilePhone; //供应商移动电话
          this.linkType = red.linkType; //供应商联系类型
          this.currency.currencyCode = red.currencyCode; //业务币种
          this.companyName.functionalCurrencyId = red.functionalCurrencyId; //本位币种
          this.currencyRate = red.currencyRate; //本位币汇率
          this.overShortageRate = red.overShortageRate; //溢短比例
          this.tradeCountry = red.tradeCountry; //贸易国别
          this.tradeCountryName = red.tradeCountryName; //贸易国别
          this.remark = red.remark; //备注
          this.supplierName.supplierId = red.supplierId; //供应商id
          this.pickupType = red.pickupType && red.pickupType.toString(); //提货方式
          this.supplierName.supplierName = red.supplierName; //供应商名称
          this.supplierName.supplierCode = red.supplierCode; //供应商编码
          //查询币种
          Amange.getCur({ currencyCode: red.currencyCode })
            .then(qul => {
              this.currency.currencyName =
                qul.data.length && qul.data[0].currencyName; //业务币种
              this.currencyName = qul.data.length && qul.data[0].currencyName; //业务币种
            })
            .catch();
        })
        .catch();
      //物料表
      Amange.getGwl(params)
        .then(res => {
          this.tableData = res.data.map((item, index) => {
            this.originPriceCh(item, index);
            this.originAmtCh(item, index);
            this.taxRateCh(item, index);
            this.taxAmtCh(item, index);
            return item;
          });
        })
        .catch();
      //运输信息
      Amange.getGys(params)
        .then(res => {
          let red = res.data;
          this.form = red;
          // this.radio = red.isTransfered == 1 ? "isTransfered" : "isBatched"; //是否转船
          // this.form.radio = red.isTransfered == 1 ? "isTransfered" : "isBatched"; //是否转船
          this.isTransfered = red.isTransfered ? true : false;
          this.isBatched = red.isBatched ? true : false;
          this.form.priceTem =
            this.form.priceTem && this.form.priceTem.toString(); //价格条款
          this.form.transMode =
            this.form.transMode && this.form.transMode.toString(); //运输方式
          this.form.loadType =
            this.form.loadType && this.form.loadType.toString(); //装卸时间
          this.form.shipMode =
            this.form.shipMode && this.form.shipMode.toString(); //船运方式
        })
        .catch();
      //运输路径
      Amange.getGlj(params)
        .then(res => {
          let red = res.data;
          this.tableDataYsxx = red;
        })
        .catch();
      //付款方式
      Amange.getGfk(params)
        .then(res => {
          this.tableDataFkfs = res.data.map(item => {
            item.paymentType = item.paymentType && item.paymentType.toString();
            item.paymentWay = item.paymentWay && item.paymentWay.toString();
            item.creditType = item.creditType && item.creditType.toString();
            return item;
          });
        })
        .catch();
      //合同条款
      Amange.getGht(params)
        .then(res => {
          let red = res.data;
          this.tableDataHtts = red;
        })
        .catch();
    },
    //获取提货方式
    thfs() {
      Amange.thfs()
        .then(res => {
          this.thList = res.data;
        })
        .catch();
    },
    to() {
      this.rateTol = 0;
      this.errorKey = [];
      if (this.signTime == ``) {
        this.errorKey.push('signTime');
      }
      if (!Object.keys(this.currency).length) {
        this.errorKey.push('currency');
      }
      if (this.currencyRate == ``) {
        this.errorKey.push('currencyRate');
      }
      for (const item of this.tableDataFkfs) {
        this.rateTol = Count.accAdd(this.rateTol, item.rate);
      }
      if (this.overShortageRate == ``) {
        this.errorKey.push('overShortageRate');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning(`请将必填项补充完整！`);
        return false;
      }
      //表格校验
      for (const item of this.tableData) {
        if (item.originPrice === ``) {
          this.$openWarning(`请输入供应商业务采购含税单价`);
          return false;
        }
        if (item.originAmt === ``) {
          this.$openWarning(`请输入供应商业务采购含税金额`);
          return false;
        }
        if (item.taxRate === ``) {
          this.$openWarning(`请输入供应商业务增值税率`);
          return false;
        }
        if (item.taxAmt === ``) {
          this.$openWarning(`请输入供应商业务增值税额`);
          return false;
        }
      }
      if (this.rateTol != 100) {
        this.$openWarning(`付款方式总比例需保持100%`);
        return false;
      }
      let data = {
        //供应商合同基本信息
        odPsContractPo: {
          signTime: this.signTime, //签约时间
          supplierId: this.supplierName.supplierId, //供应商id
          supplierExtNo: this.supplierExtNo,
          linkMan: this.linkMan, //供应商联系人
          mobilePhone: this.mobilePhone, // 供应商移动电话
          linkType: ``, //供应商联系类型
          currencyCode: this.currency.currencyCode, //业务币种
          functionalCurrencyId: this.companyName.functionalCurrencyId, //本位币种
          currencyRate: this.currencyRate, //本位币汇率
          overShortageRate: this.overShortageRate, //溢短比例
          tradeCountryName: this.tradeCountryName, //贸易国别
          tradeCountry: this.tradeCountry, //贸易国别
          remark: this.remark, //备注
          pickupType: this.pickupType, //提货方式
          supplierName: this.supplierName.supplierName, //供应商名称
          supplierCode: this.supplierName.supplierCode //供应商编码
        },
        //供应商合同运输信息
        odPsContractTransferInfo: {
          deliveryCutoffDate: this.form.deliveryCutoffDate, //最迟交货日期
          priceTem: this.form.priceTem, //价格条款
          transMode: this.form.transMode, //运输方式
          loadType: this.form.loadType, //装卸时间
          shipMode: this.form.shipMode, //船运方式
          // isTransfered: this.form.radio == "isTransfered" ? 1 : 0, //是否转船
          // isBatched: this.form.radio == "isBatched" ? 1 : 0, //是否分批
          isTransfered: this.isTransfered ? 1 : 0, // this.radio == "isTransfered" ? 1 : 0, //是否转船
          isBatched: this.isBatched ? 1 : 0, //this.radio == "isBatched" ? 1 : 0, //是否分批
          loadingPort: this.form.loadingPort, //装货港
          unloadingPort: this.form.unloadingPort, //卸货港
          destination: this.form.destination, //目的地
          shipName: this.form.shipName, //船名
          shipCode: this.form.shipCode, //船舶识别号
          receiverAddress: this.form.receiverAddress //收货地址
        },
        odPsContractTermList: this.tableDataHtts, //供应商合同条款
        odPsCtiPathsList: this.tableDataYsxx, //供应商合同运输路径
        odPsContractPoItemsList: this.tableData, //供应商合同采购物料明细
        odPsContractPaymentList: this.tableDataFkfs //付款方式
      };
      if (this.$route.query.id) {
        data.odPsContractPo.supplierContractNo = this.supplierContractNo;
        data.odPsContractPo.supplierContractId = this.supplierContractId;
        data.odPsContractTransferInfo.supplierContractId = this.supplierContractId;
        data.odPsContractPo.supplierExtNo = this.supplierExtNo;
        data.odPsContractPo.psContractId = this.psContractId;
        data.odPsContractPo.psContractNo = this.psContractNo;

        for (let item of this.tableDataHtts) {
          item.supplierContractId = this.supplierContractId;
          item.psContractId = this.psContractId;
        }
        for (let item of this.tableDataYsxx) {
          item.supplierContractId = this.supplierContractId;
          item.psContractId = this.psContractId;
        }
        for (let item of this.tableData) {
          item.supplierContractId = this.supplierContractId;
          item.psContractId = this.psContractId;
        }
        for (let item of this.tableDataFkfs) {
          item.supplierContractId = this.supplierContractId;
          item.psContractId = this.psContractId;
        }
      }
      this.$emit("get", data, 2);
    },
    //采购含税单价变动
    originPriceCh(e, index) {
      let row = e;
      //采购不含税单价
      row.unOriginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //采购含税金额
      row.originAmt = this.$orginAmt(row.originPrice, row.itemQty);
      //采购不含税金额
      row.unoriginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmt, row.unoriginAmt);
      this.$set(this.tableData, index, row);
      this.$forceUpdate();
    },
    //采购含税金额变动
    originAmtCh(e, index) {
      let row = e;
      //采购含税单价
      row.originPrice = this.$orginPrice(row.originAmt, row.itemQty);
      //采购不含税单价
      row.unOriginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //采购不含税金额
      row.unoriginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmt, row.unoriginAmt);
      //采购含税单价
      // if (row.itemQty != 0) {
      //   row.originPrice = this.$orginPrice(row.originAmt, row.itemQty);
      // }
    },
    //税率变动
    taxRateCh(e, index) {
      let row = e;
      //采购不含税金额
      row.unoriginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //采购不含税单价
      row.unOriginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmt, row.unoriginAmt);
      this.$set(this.tableData, index, row);
    },
    //税额变动
    taxAmtCh(e, index) {
      let row = e;
      //采购不含税金额  采购不含税金额=采购含税金额-税额
      row.unoriginAmt = this.$unorginAmtCh(row.originAmt, row.taxAmt);
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
    //获取价格条款
    jgtk() {
      Amange.jgtk()
        .then(res => {
          this.jgtkList = res.data;
        })
        .catch();
    },
    //获取运输方式
    ysfs() {
      Amange.ysfs()
        .then(res => {
          this.ysfsList = res.data;
        })
        .catch();
    },
    //获取装卸时间
    zxsj() {
      Amange.zxsj()
        .then(res => {
          this.zxsjList = res.data;
        })
        .catch();
    },
    //获取船运方式
    cyfs() {
      Amange.cyfs()
        .then(res => {
          this.cyfsList = res.data;
        })
        .catch();
    },
    //获取v付款类型方式
    fklx() {
      Amange.fklx()
        .then(res => {
          this.fklxList = res.data;
        })
        .catch();
    },
    //获取付款方式方式
    fkfs() {
      Amange.fkfs()
        .then(res => {
          this.fkfsList = res.data;
        })
        .catch();
    },
    //信用证类型方式
    xyzlx() {
      Amange.xyzlx()
        .then(res => {
          this.xyzlxList = res.data;
        })
        .catch();
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
    //港口弹窗打开
    arrTip(e) {
      this.portTypr = e;
      this.arrShow = true;
    },
    //港口弹窗关闭
    ArrialPortCancle() {
      this.arrShow = false;
    },
    //港口弹窗确定获取数据
    ArrialPortSure(e) {
      this.arrShow = false;
      if (this.portTypr == 1) {
        this.form.loadingPort = e.portName;
      } else {
        this.form.unloadingPort = e.portName;
      }
    },
    aaaa(e) {
      this.radio = e;
      this.form.radio = e;
      this.$forceUpdate();
    },
    //汇率查询
    pariList() {
      let params = {
        formCurrencyId: this.currency.currencyId,
        toCurrencyId: this.companyName.functionalCurrencyId
      };
      Amange.pariList(params)
        .then(res => {
          this.currencyRate = res.data.parities;
        })
        .catch();
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
      this.$root.Bus.$emit("country", e);
    },
    //来自基本信息页物料同步删除
    firstDele(e, list) {
      let idSav = []; //修改数据
      let idNo = []; //新建数据
      let params = {};
      for (const item of e) {
        item.contractDetailId && idSav.push(item.contractDetailId);
        params.contractDetailIdList = idSav.join(`,`);
        params.psContractId = this.$store.state.contraDelData.sbCon.contractId;
        params.version = this.$store.state.contraDelData.sbCon.version;
      }
      if (idSav.length) {
        Amange.delGWl(params)
          .then(res => {
            // this.deleIndex(e, list);
            // this.$openSuccess(res.message);
          })
          .catch();
      }
      this.deleIndex(e, list);
    },
    //数据操作  1修改 0删除 3启用4禁用
    setUp(e, list, key) {
      if (!e.length) {
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
          let params = {};
          for (const item of e) {
            switch (key) {
              case 0:
                item.contractDetailId && idSav.push(item.contractDetailId);
                params.contractDetailIdList = idSav.join(`,`);
                params.psContractId = this.$store.state.contraDelData.sbCon.contractId;
                params.version = this.$store.state.contraDelData.sbCon.version;
                break;
              case 1:
                item.pcpId && idSav.push(item.pcpId);
                params.pcpIdList = idSav.join(`,`);
                params.psContractId = this.$store.state.contraDelData.sbCon.contractId;
                params.version = this.$store.state.contraDelData.sbCon.version;
                break;
              case 2:
                item.paymentId && idSav.push(item.paymentId);
                params.paymentIdList = idSav.join(`,`);
                params.psContractId = this.$store.state.contraDelData.sbCon.contractId;
                params.version = this.$store.state.contraDelData.sbCon.version;
                break;
              case 3:
                item.ptRowid && idSav.push(item.ptRowid);
                params.ptRowidList = idSav.join(`,`);
                params.psContractId = this.$store.state.contraDelData.sbCon.contractId;
                params.version = this.$store.state.contraDelData.sbCon.version;
                break;
              default:
                break;
            }
          }
          if (idSav.length) {
            switch (key) {
              case 0:
                Amange.delGWl(params)
                  .then(res => {
                    this.deleIndex(e, list);
                    this.$openSuccess(res.message);
                  })
                  .catch();
                break;
              case 1:
                Amange.delGYS(params)
                  .then(res => {
                    this.deleIndex(e, list);
                    this.$openSuccess(res.message);
                  })
                  .catch();
                break;
              case 2:
                Amange.delGFK(params)
                  .then(res => {
                    this.deleIndex(e, list);
                    this.$openSuccess(res.message);
                  })
                  .catch();
                break;
              case 3:
                Amange.delGHT(params)
                  .then(res => {
                    this.deleIndex(e, list);
                    this.$openSuccess(res.message);
                  })
                  .catch();
                break;
              default:
                break;
            }
          } else {
            this.deleIndex(e, list);
          }
        })
        .catch();
    },
    //删除方法
    deleIndex(e, list) {
      for (const get of e) {
        let del = list.findIndex(item => {
          return (
            item.one == get.one &&
            item.contractDetailId == get.contractDetailId &&
            item.pcpId == get.pcpId &&
            item.ptRowid == get.ptRowid
          );
        });
        list.splice(del, 1);
      }
      this.selectioned = [];
      this.selecYsxx = [];
      this.selecFkfs = [];
      this.selecHttk = [];
    },
    //物料表格选择
    wlmxhandleChange(e) {
      this.selectioned = e;
    },
    //运输信息表格选择
    ysxxhandleChange(e) {
      this.selecYsxx = e;
    },
    ///运输信息创建数据
    ysxxaddList() {
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        rowno: (this.tableDataYsxx.length + 1) * 10,
        leaveTransferMode: ``, //出厂运输方式
        transferTarget: ``, //目的地
        transferPlanMan: ``, //运输安排人（供应商安排
        transferExcutor: ``, //承运人（车队
        transferNote: `` //备注
      };
      let newTbale = [];
      newTbale.push(data);
      this.tableDataYsxx = [...this.tableDataYsxx, ...newTbale];
    },
    //付款方式表格选择
    fkfshandleChange(e) {
      this.selecFkfs = e;
    },
    ///付款方式创建数据
    fkfsaddList() {
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        rowno: (this.tableDataFkfs.length + 1) * 10,
        paymentWay: ``, //付款方式
        paymentType: ``, //付款类型
        creditType: ``, //信用证类型
        day: ``, //
        rate: ``, //
        vatAmt: ``, //含税金额
        prePaymentDate: ``, //预付款日期
        remark: ``
      };
      let newTbale = [];
      newTbale.push(data);
      this.tableDataFkfs = [...this.tableDataFkfs, ...newTbale];
    },
    //合同条款表格选择
    httkhandleChange(e) {
      this.selecHttk = e;
    },
    ///合同条款创建数据
    httkaddList() {
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        termRowno: (this.tableDataHtts.length + 1) * 10,
        termContent: ``
      };
      let newTbale = [];
      newTbale.unshift(data);
      this.tableDataHtts = [...this.tableDataHtts, ...newTbale];
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        } else if (index === 6 || index === 7) {
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
          } else {
            sums[index] = "N/A";
          }
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    getSummariesWl(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        } else if (
          index === 6 ||
          index === 8 ||
          index === 11 ||
          index === 12 ||
          index === 14
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
    },
    tableDataYsxx: {
      handler(e) {
        this.$root.Bus.$emit("ysxxData", e);
      },
      deep: true
    },
    form: {
      handler(e) {
        if (this.$route.query.id) {
          return false;
        }
        this.$root.Bus.$emit("form", e);
      },
      deep: true
    },
    tableData: {
      handler(e) {
        this.$root.Bus.$emit("orgList", e);
        let that = this;
        this.tableDataFkfs.forEach((item, index) => {
          that.vatAmt(item, index);
        });
      },
      deep: true
    },
    currencyRate: {
      handler(e) {
        this.$store.rate = e;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
