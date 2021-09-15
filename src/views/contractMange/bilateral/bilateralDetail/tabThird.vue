<template>
  <div class="tabThird content-div2 contract_css_link third_css">
    <el-form disabled>
      <!-- 搜索 -->
      <div class="input-div input-div-bor">
        <el-divider content-position="left">客户合同基本信息</el-divider>
        <div>
          <el-col :span="5" class="el-col">
            <label><span class="must-full">*</span>销售合同号</label>
            <el-input
              class="el-inputs"
              disabled
              v-model="custContractNo"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label><span class="must-full">*</span>客户</label>
            <el-input
              v-model="custName.customerName"
              class="el-inputs"
              placeholder=""
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label class="">保证金是否有</label>
            <el-checkbox v-model="isGuarded" class="a_chech"></el-checkbox>
            <!-- <el-select v-model="isGuarded" placeholder="">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select> -->
          </el-col>
          <el-col :span="5" class="el-col">
            <label>保证金</label>
            <el-input
              v-model="guardAmt"
              type="number"
              class="el-inputs"
              :disabled="isGuarded != 1"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label class="">保证金收款时间</label>
            <el-date-picker
              v-model="guardReceiveTime"
              type="date"
              :disabled="isGuarded != 1"
              placeholder=""
            >
            </el-date-picker>
          </el-col>
          <el-col :span="5" class="el-col">
            <label class="">保证金释放方式</label>
            <el-select v-model="guardReuseType" placeholder="">
              <el-option
                v-for="item in bzjsffsList"
                :key="item.dict_code"
                :label="item.dict_value"
                :value="item.dict_code"
                :disabled="isGuarded != 1"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-col">
            <label class="">收保证金方式</label>
            <el-select v-model="receiptGuardWay" placeholder="">
              <el-option
                v-for="item in sbzjList"
                :key="item.dict_code"
                :label="item.dict_value"
                :value="item.dict_code"
                :disabled="isGuarded != 1"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>贸易国别</label>
            <el-input
              v-model="tradeCountryName"
              class="el-inputs"
              placeholder=""
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>是否赊销</label>
            <el-select v-model="isSellOnCredit" placeholder="">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label>回款方式</label>
            <el-select v-model="remitType" placeholder="">
              <el-option
                v-for="item in hkfsList"
                :key="item.dict_code"
                :label="item.dict_value"
                :value="item.dict_code"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-col">
            <label class="">回款周期(天)</label>
            <el-input v-model="remitPeriod" class="el-inputs"></el-input>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label><span class="must-full">*</span>业务币种</label>
            <el-input
              v-model="currency.currencyName"
              class="el-inputs"
              placeholder=""
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label><span class="must-full">*</span>本位币汇率</label>
            <el-input
              v-model="currencyRate"
              type="number"
              class="el-inputs"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label class="">价差(元/吨)</label>
            <el-input
              v-model="priceDiff"
              type="number"
              class="el-inputs"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>特别约定</label>
            <el-input
              v-model="specRemark"
              class="el-inputs"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label class="">质量验收标准</label>
            <el-input
              v-model="qualityStandard"
              class="el-inputs"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label class="">数量验收标准</label>
            <el-select v-model="quantityStandard" placeholder="">
              <el-option
                v-for="item in slysList"
                :key="item.dict_code"
                :label="item.dict_value"
                :value="item.dict_code"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label><span class="must-full">*</span>溢短比%</label>
            <el-input
              v-model="overShortageRate"
              type="number"
              class="el-inputs"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label>保险费率</label>
            <el-input
              v-model="premiumRate"
              type="number"
              class="el-inputs"
              placeholder="请输入"
              v-input-filter:num8
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label>实现利润</label>
            <el-input
              v-model="profitAmt "
              type="number"
              class="el-inputs"
              placeholder="请输入"
              v-input-filter:num8
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label>利润率</label>
            <el-input
              disabled
              v-model="profitRate"
              type="number"
              class="el-inputs"
              placeholder=""
              v-input-filter:num2
            ></el-input>
          </el-col>
          <el-col :span="24" class="el-col-textarea">
            <label style="width:9.16%">备注</label>
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
      <!-- 交货地点 -->
      <div class="input-div input-div-bor bortop0">
        <div class="flex_center"></div>
        <div class="">
          <el-table
            border
            center
            :data="tableDatajh"
            class="el-table"
            ref="multipleTable"
            @selection-change="jhhandleChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <!-- <el-table-column
            label="序号"
            prop="rowNo"
            width="55"
            show-overflow-tooltip
          >
          </el-table-column> -->
            <el-table-column
              label="序号"
              type="index"
              width="55"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="address"
              label="交货地点"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="detailAddress"
              label="详细地址"
            ></el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 交货地点 -->
      <!-- 搜索 -->
      <div class="input-div input-div-bor">
        <el-divider content-position="left">核算利息</el-divider>
        <div>
          <el-col :span="5" class="el-col">
            <label class="">含税月息利率</label>
            <el-input
              v-model="vatProfileRate"
              type="number"
              class="el-inputs"
              placeholder=""
              @input="changeOrg"
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label class="">含税逾期利率</label>
            <el-input
              v-model="vatPredictRate"
              type="number"
              class="el-inputs"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label class="">含税代理费率</label>
            <el-input
              v-model="vatProxyRate"
              type="number"
              class="el-inputs"
              placeholder=""
              @input="changeOrg"
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>含税代理费</label>
            <el-input
              v-model="vatProxyAmt"
              type="number"
              class="el-inputs"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label class="">不含税月息利率</label>
            <el-input
              v-model="extaxProfileRate"
              type="number"
              class="el-inputs"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label class="">不含税逾期利率</label>
            <el-input
              v-model="extaxPredictRate"
              type="number"
              class="el-inputs"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label class="">不含税代理费率</label>
            <el-input
              v-model="extaxProxyRate"
              type="number"
              class="el-inputs"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label class="">不含税代理费</label>
            <el-input
              v-model="extaxProxyAmt"
              type="number"
              class="el-inputs"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label>结算汇率</label>
            <el-input
              v-model="settleCurrencyRate"
              type="number"
              class="el-inputs"
              placeholder=""
              @input="changeOrg"
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label class="">计息放货天数</label>
            <el-input
              v-model="calcDays"
              type="number"
              class="el-inputs"
              placeholder=""
              @input="changeOrg"
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label>计息天数</label>
            <el-input
              v-model="clacProfileDays"
              type="number"
              class="el-inputs"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label>保证金比率</label>
            <el-input
              v-model="insuranceRate"
              type="number"
              class="el-inputs"
              placeholder=""
              @input="changeOrg"
            ></el-input>
          </el-col>
        </div>
      </div>
      <!-- 搜索 -->
      <!-- 商品销售信息 -->
      <div class="input-div input-div-bor bortop0">
        <!-- <div class="flex_center" v-if="$route.query.id && tableData.length">
        <div class="button-div">
          <el-button icon="el-icon-minus" @click="setUp(selectioned, tableData, 5)">删除</el-button>
        </div>
      </div> -->
        <el-divider content-position="left">商品销售信息</el-divider>
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
            >
            </el-table-column>
            <el-table-column
              prop="goodsCode"
              label="物料号"
              width="150px"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="物料名称"
              width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsCategoryName"
              label="物料种类"
              width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="goodsSpec"
              label="物料规格"
              width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="itemUnitName"
              label="基础单位"
              width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="itemQty"
              label="数量"
              width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="secUnitName"
              label="第二单位"
              width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="secQty"
              label="第二数量"
              width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="originPrice"
              label="销售含税单价"
            ></el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="unOriginPrice"
              label="销售不含税单价"
            ></el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="originAmt"
              label="销售含税金额"
            ></el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="unOriginAmt"
              label="销售不含税金额"
            ></el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="taxRate"
              label="增值税率%"
            ></el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="taxAmt"
              label="增值税额"
            ></el-table-column>
            <el-table-column
              width="150"
              show-overflow-tooltip
              prop="remark"
              label="备注"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 商品销售信息 -->
      <!-- 预计杂费 -->
      <div class="input-div input-div-bor bortop0">
        <el-divider content-position="left">预计杂费</el-divider>
        <div class="flex_br">
          <el-col :span="5" class="el-col" style="margin-bottom:7px">
            <label>杂费承担</label>
            <el-select v-model="feeChargerType" placeholder="">
              <el-option
                v-for="item in zfcdList"
                :key="item.dict_code"
                :label="item.dict_value"
                :value="item.dict_code"
              >
              </el-option>
            </el-select>
          </el-col>
        </div>
        <div class="">
          <el-table
            border
            center
            show-summary
            :data="tableDatazf"
            class="el-table"
            ref="multipleTable"
            @selection-change="zfhandleChange"
            :summary-method="getSummariesFk"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <!-- <el-table-column
            label="序号"
            prop="rowNo"
            width="55"
            show-overflow-tooltip
          > -->
            <!-- </el-table-column> -->
            <el-table-column
              label="序号"
              type="index"
              width="55"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="feeName"
              label="费用名称"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="feeAmt"
              label="金额"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="feeTaxRate"
              label="税率（%）"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="payee"
              label="收款方"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="shareRate"
              label="销售合同承担"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="settleType"
              label="结算方式"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="remark2"
              label="合作协议"
            ></el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 预计杂费 -->
      <!-- 搜索 -->
      <div class="input-div input-div-bor">
        <el-divider content-position="left">物流信息</el-divider>
        <div>
          <el-col :span="5" class="el-col">
            <label class="">最迟交期</label>
            <el-date-picker
              v-model="form.deliveryCutoffDate"
              type="date"
              placeholder=""
            >
            </el-date-picker>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>价格条款</label>
            <el-select v-model="form.priceTem" placeholder="">
              <el-option
                v-for="item in jgtkList"
                :key="item.dict_code"
                :label="item.dict_value"
                :value="item.dict_code"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label>运输方式</label>
            <el-select v-model="form.transMode" placeholder="">
              <el-option
                v-for="item in ysfsList"
                :key="item.dict_code"
                :label="item.dict_value"
                :value="item.dict_code"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>装卸时间</label>
            <el-select v-model="form.loadType" placeholder="">
              <el-option
                v-for="item in zxsjList"
                :key="item.dict_code"
                :label="item.dict_value"
                :value="item.dict_code"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>船运方式</label>
            <el-select v-model="form.shipMode" placeholder="">
              <el-option
                v-for="item in cyfsList"
                :key="item.dict_code"
                :label="item.dict_value"
                :value="item.dict_code"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-col texcen">
            <!-- <el-radio v-model="form.radio" label="isTransfered">转船</el-radio>
            <el-radio v-model="form.radio" label="isBatched">分批</el-radio> -->
            <el-checkbox v-model="isTransfered">转船</el-checkbox>
            <el-checkbox v-model="isBatched">分批</el-checkbox>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>装货港</label>
            <el-input
              v-model="form.loadingPort"
              class="el-inputs"
              placeholder=""
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>卸货港</label>
            <el-input
              v-model="form.unloadingPort"
              class="el-inputs"
              placeholder=""
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label>目的地</label>
            <el-input
              v-model="form.destination"
              class="el-inputs"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>船名</label>
            <el-input
              v-model="form.shipName"
              class="el-inputs"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-colc">
            <label>船舶识别号</label>
            <el-input
              v-model="form.shipCode"
              class="el-inputs"
              placeholder=""
            ></el-input>
          </el-col>
        </div>
      </div>
      <!-- 搜索 -->
      <!-- 物流信息 -->
      <div class="input-div input-div-bor bortop0">
        <div class="flex_center"></div>
        <div class="">
          <el-table
            border
            center
            :data="tableDataYsxx"
            class="el-table"
            ref="multipleTable"
            @selection-change="ysxxhandleChange"
          >
            <el-table-column
              v-if="$route.query.id"
              type="selection"
              width="55"
              show-overflow-tooltip
            >
            </el-table-column>
            <!-- <el-table-column
            label="序号"
            prop="rowno"
            width="55"
            show-overflow-tooltip
          >
          </el-table-column> -->
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
                <div v-for="item in ysfsList" :key="item.dict_code">
                  <span v-if="item.dict_code == scope.row.leaveTransferMode">{{
                    item.dict_value
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="transferTarget"
              label="目的地"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="transferPlanMan"
              label="运输安排人（供应商安排/仓储物流中心安排）"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="transferExcutor"
              label="承运人（车队/船队）"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="transferNote"
              label="备注"
            ></el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 物流信息 -->
      <!-- 收款方式 -->
      <div class="input-div input-div-bor bortop0">
        <el-divider content-position="left">收款方式</el-divider>
        <div class="martop_10"></div>
        <div class="">
          <el-table
            border
            center
            :data="tableDataFkfs"
            class="el-table"
            ref="multipleTable"
            @selection-change="fkfshandleChange"
            :summary-method="getSummaries"
            show-summary
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <!-- <el-table-column
            label="序号"
            prop="rowNo"
            width="55"
            show-overflow-tooltip
          >
          </el-table-column> -->
            <el-table-column
              label="序号"
              type="index"
              width="55"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="payeeType"
              label="收款类型"
            >
              <template slot-scope="scope">
                <div v-for="item in fklxList" :key="item.dict_code">
                  <span v-if="item.dict_code == scope.row.payeeType">{{
                    item.dict_value
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="payeeWay"
              label="收款方式"
            >
              <template slot-scope="scope">
                <div v-for="item in fkfsList" :key="item.dict_code">
                  <span v-if="item.dict_code == scope.row.payeeWay">{{
                    item.dict_value
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="creditType"
              label="信用证类型"
            >
              <template slot-scope="scope">
                <div v-for="item in xyzlxList" :key="item.dict_code">
                  <span v-if="item.dict_code == scope.row.creditType">{{
                    item.dict_value
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="day"
              label="天数"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="rate"
              label="*比例%"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="vatAmt"
              label="含税金额"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="prePaymentDate"
              label="预付款日期"
              width="170"
            >
              <template slot-scope="scope">
                <div>
                  {{ $timeFun(scope.row.prePaymentDate, true) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="remark"
              label="备注"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </el-form>
    <!-- 选择国家弹窗 -->
    <country-select
      v-if="countryShow"
      :tipShow="countryShow"
      @countryCancle="countryCancle"
      @countrySure="countrySure"
    ></country-select>
    <!-- 选择国家弹窗 -->
    <!-- 选择币种弹窗 -->
    <coin-select
      v-if="coinShow"
      :tipShow="coinShow"
      @coinCancle="coinCancle"
      @coinSure="coinSure"
    ></coin-select>
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
import countrySelect from "@/components/countrySelect.vue";
import coinSelect from "@/components/coinSelect.vue";
import ArrSelect from "@/components/ArrivalPort.vue";
import Count from "@/assets/js/calculation";

import Amange from "@/api/contractMange/amange";
import "@/assets/css/contract.scss";
export default {
  name: "tabThird",
  data() {
    return {
      arrShow: false, //港口
      coinShow: false, //币种弹窗
      currency: {}, //币种
      countryShow: false, //国家弹窗
      companyName: {}, //公司
      country: {}, //国家
      custName: {}, //客户信息
      custId: ``, //客户
      isGuarded: 0, //保证金是否有
      guardAmt: ``, //保证金
      guardReceiveTime: ``, //保证金收款<br/>时间
      guardReuseType: ``, //保证金释放<br/>方式
      bzjsffsList: [], //保证金释放方式
      receiptGuardWay: ``, //收保证金方式
      sbzjList: [], //收保证金方式
      tradeCountry: ``, //贸易国别
      tradeCountryName: ``, //贸易国别
      isSellOnCredit: ``, //是否赊销
      remitType: ``, //回款方式
      hkfsList: [], //回款方式
      remitPeriod: ``, //回款周期
      currencyCode: ``, //业务币种
      currencyRate: `1`, //本位币汇率
      priceDiff: ``, //价差
      specRemark: ``, //特别约定
      qualityStandard: ``, //质量验收标准
      quantityStandard: ``, //数量验收标准
      slysList: [], //数量验收标准
      overShortageRate: ``, //溢短比%
      remark: ``, //备注
      tableDatajh: [], //交货表格
      selectjh: [], //交货表格选中项
      premiumRate: ``, //保险费率
      profitAmt: ``, //实现利润
      profitRate: ``, //利润率
      //
      tableDatazf: [], //杂费表格
      selectzf: [], //杂费表格选中项
      feeChargerType: ``, //杂费承担
      zfcdList: [], //杂费承担
      //核算利息
      vatProfileRate: ``, //含税月息利率
      vatPredictRate: ``, //含税逾期利率
      vatProxyRate: ``, //含税代理费率
      vatProxyAmt: ``, //含税代理费
      extaxProfileRate: ``, //不含税月息<br/>利率
      extaxPredictRate: ``, //不含税逾期<br/>利率
      extaxProxyRate: ``, //不含税代理<br/>费率
      extaxProxyAmt: ``, //不含税代理费
      settleCurrencyRate: ``, //结算汇率
      calcDays: ``, //计息放货天数
      clacProfileDays: ``, //计息天数
      insuranceRate: ``, //保证金比率
      //
      fklxList: [], //收款类型
      fkfsList: [], //收款方式
      xyzlxList: [], //信用证
      tableDataFkfs: [], //收款方式表格
      selecFkfs: [], //收款方式表格选中项
      //运输信息
      form: {},
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
      tableDataYsxx: [], //运输信息
      selectYsxx: [], //运输表格选中项
      tableDataHtts: [], //客厅条款表格
      selecHttk: [], //合同条款表格选中项
      tableData: [], //物料表格
      selectioned: [], //物料选中
      orgList: [], //业务币含税金额列表
      custContractNo: ``, //销售合同号
      custContractId: ``, //销售合同ID
      psContractId: ``, //双边合同id
      psContractNo: ``, //双边合同号
      //
      loading: true, //表格loading
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
  components: {
    countrySelect,
    coinSelect,
    ArrSelect
  },
  created() {
    //价格条款
    this.jgtk();
    this.bzjsffs();
    this.sbzj();
    this.hkfs();
    this.slys();
    //收款类型
    this.fklx();
    //收款方式
    this.fkfs();
    //信用证类型
    this.xyzlx();
    this.zfcd();
    this.ysfs();
    //装卸时间
    this.zxsj();
    //船运方式
    this.cyfs();
    //获取信息
    this.$route.query.id && this.getDetail();
  },
  mounted() {
    this.$root.Bus.$on("custName", e => {
      this.custName = e;
    });
    this.$root.Bus.$on("ysxxData", e => {
      if (this.$route.query.id) return false;
      this.tableDataYsxx = e;
    });
    this.$root.Bus.$on("form", e => {
      this.form = e;
    });
    this.$root.Bus.$on("companyName", e => {
      this.companyName = e;
      this.currency && this.pariList();
    });
    this.$root.Bus.$on("matterList", e => {
      let a = JSON.stringify(e);
      this.tableData = JSON.parse(a);
    });
    this.$root.Bus.$on("matterListIndex", e => {
      this.selectioned = [];
      this.$refs.wlTable.clearSelection();
      for (let item of e) {
        this.selectioned.push(this.tableData[item]);
      }
      this.firstDele(this.selectioned, this.tableData);
    });
    this.$root.Bus.$on("orgList", e => {
      let a = JSON.stringify(e);
      this.orgList = JSON.parse(a);
      if (!e.length) this.changeOrg();
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
      Amange.getKxx(params)
        .then(res => {
          let red = res.data;
          this.custContractId = red.custContractId;
          this.custContractNo = red.custContractNo;
          this.psContractId = red.psContractId;
          this.psContractNo = red.psContractNo;
          this.custName.customerId = red.custId; //客户
          this.custName.customerCode = red.custCode; //客户
          this.custName.customerName = red.custName; //客户
          this.isGuarded = red.isGuarded ? true : false; //保证金是否有
          this.guardAmt = red.guardAmt; //保证金
          this.guardReceiveTime = red.guardReceiveTime; //保证金收款时间
          this.guardReuseType =
            red.guardReuseType && red.guardReuseType.toString(); //保证金释放方式
          this.receiptGuardWay =
            red.receiptGuardWay && red.receiptGuardWay.toString(); //收保证金方式
          this.tradeCountry = red.tradeCountry; //贸易国别
          this.tradeCountryName = red.tradeCountryName; //贸易国别
          this.isSellOnCredit =
            red.isSellOnCredit && red.isSellOnCredit.toString(); //是否赊销
          this.remitType = red.remitType && red.remitType.toString(); //回款方式
          this.remitPeriod = red.remitPeriod; //回款周期
          this.currency.currencyCode = red.currencyCode; //业务币种
          this.companyName.functionalCurrencyId = red.functionalCurrencyId; //本位币种
          this.currencyRate = red.currencyRate; //本位币汇率
          this.priceDiff = red.priceDiff; //价差
          this.specRemark = red.specRemark; //特别约定
          this.qualityStandard = red.qualityStandard; //质量验收标准
          this.quantityStandard = red.quantityStandard; //数量验收标准
          this.overShortageRate = red.overShortageRate; //一断臂3
          this.premiumRate = red.premiumRate; //保险费率
          this.profitAmt = red.profitAmt; //实现利润
          this.profitRate = red.profitRate; //利润率
          this.remark = red.remark; //备注
          //
          this.vatProfileRate = red.vatProfileRate; //含税月息利率
          this.vatPredictRate = red.vatPredictRate; //含税逾期利率
          this.vatProxyRate = red.vatProxyRate; //含税代理费率
          this.vatProxyAmt = red.vatProxyAmt; //含税代理费
          this.extaxProfileRate = red.extaxProfileRate; //不含税月息利率
          this.extaxPredictRate = red.extaxPredictRate; //不含税逾期利率
          this.extaxProxyRate = red.extaxProxyRate; //不含税代理费率
          this.extaxProxyAmt = red.extaxProxyAmt; //不含税代理费
          this.settleCurrencyRate = red.settleCurrencyRate; //结算汇率
          this.calcDays = red.calcDays; //计息放货天数
          this.clacProfileDays = red.clacProfileDays; //计息天数
          this.insuranceRate = red.insuranceRate; //保证金比率
          this.feeChargerType =
            red.feeChargerType && red.feeChargerType.toString(); //杂费承担方
          //查询币种
          Amange.getCur({ currencyCode: red.currencyCode })
            .then(qul => {
              this.currency.currencyName =
                qul.data.length && qul.data[0].currencyName; //业务币种
              this.$forceUpdate();
            })
            .catch();
        })
        .catch();
      //运输信息
      Amange.getKys(params)
        .then(res => {
          let red = res.data;
          this.form.deliveryCutoffDate = red.deliveryCutoffDate; //v最迟交货日期
          this.form.priceTem = red.priceTem && red.priceTem.toString(); //价格条款
          this.form.transMode = red.transMode && red.transMode.toString(); //运输方式
          this.form.loadType = red.loadType && red.loadType.toString(); //装卸时间
          this.form.shipMode = red.shipMode && red.shipMode.toString(); //船运方式
          // this.form.radio = red.isTransfered == `1` ? `isTransfered` : `isBatched`; //是否转船
          this.isTransfered = red.isTransfered ? true : false;
          this.isBatched = red.isBatched ? true : false;
          this.form.loadingPort = red.loadingPort; //装货港
          this.form.unloadingPort = red.unloadingPort; //卸货港
          this.form.destination = red.destination; //目的地
          this.form.shipName = red.shipName; //船名
          this.form.shipCode = red.shipCode; //船舶识别号
        })
        .catch();
      //交货列表
      Amange.getKjh(params)
        .then(res => {
          this.tableDatajh = res.data;
        })
        .catch();
      //杂费列表
      Amange.getKzf(params)
        .then(res => {
          this.tableDatazf = res.data;
        })
        .catch();
      //物料列表
      Amange.getKwl(params)
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
      //手款方式
      Amange.getKsk(params)
        .then(res => {
          let red = res.data;
          for (const item of red) {
            item.payeeType = item.payeeType && item.payeeType.toString();
            item.payeeWay = item.payeeWay && item.payeeWay.toString();
            item.creditType = item.creditType && item.creditType.toString();
          }
          this.tableDataFkfs = red;
        })
        .catch();
      //运输路径列表
      Amange.getKlj(params)
        .then(res => {
          this.tableDataYsxx = res.data;
        })
        .catch();
      //合同条款列表
      Amange.getKtk(params)
        .then(res => {
          this.tableDataHtts = res.data;
        })
        .catch();
    },
    to() {
      if (this.isGuarded == ``) {
        this.$openWarning(`请选择保证金是否有`);
        return false;
      }
      if (!Object.keys(this.currency).length) {
        this.$openWarning(`请选择业务币种`);
        return false;
      }
      if (this.currencyRate == ``) {
        this.$openWarning(`本位币汇率为空`);
        return false;
      }
      if (this.vatProfileRate == ``) {
        this.$openWarning(`请输入含税月息利率`);
        return false;
      }
      if (this.vatPredictRate == ``) {
        this.$openWarning(`请输入含税逾期利率`);
        return false;
      }
      if (this.vatProxyRate == ``) {
        this.$openWarning(`请输入含税代理费率`);
        return false;
      }
      if (this.extaxProfileRate == ``) {
        this.$openWarning(`请输入不含税月息利率`);
        return false;
      }
      if (this.extaxPredictRate == ``) {
        this.$openWarning(`请输入不含税逾期利率`);
        return false;
      }
      if (this.extaxProxyRate == ``) {
        this.$openWarning(`请输入不含税代理费率`);
        return false;
      }
      if (this.overShortageRate == ``) {
        this.$openWarning(`请输入溢短比`);
        return false;
      }
      let data = {
        //双边合同销售合同基本信息
        odPsContractSo: {
          custId: this.custName.customerId, //客户
          custCode: this.custName.customerCode, //客户编码
          custName: this.custName.customerName, //客户编码
          isGuarded: this.isGuarded, //保证金是否有
          guardAmt: this.guardAmt, //保证金
          guardReceiveTime: this.guardReceiveTime, //保证金收款时间
          guardReuseType: this.guardReuseType, //保证金释放方式
          receiptGuardWay: this.receiptGuardWay, //收保证金方式
          tradeCountryName: this.tradeCountryName, //贸易国别
          tradeCountry: this.tradeCountry, //贸易国别
          isSellOnCredit: this.isSellOnCredit, //是否赊销
          remitType: this.remitType, //回款方式
          remitPeriod: this.remitPeriod, //回款周期
          currencyCode: this.currency.currencyCode, //业务币种
          functionalCurrencyId: this.companyName.functionalCurrencyId, //本位币种
          currencyRate: this.currencyRate, //本位币汇率
          priceDiff: this.priceDiff, //价差
          specRemark: this.specRemark, //特别约定
          qualityStandard: this.qualityStandard, //质量验收标准
          quantityStandard: this.quantityStandard, //数量验收标准
          overShortageRate: this.overShortageRate, //一断臂
          remark: this.custExtNo, //备注
          //
          vatProfileRate: this.vatProfileRate, //含税月息利率
          vatPredictRate: this.vatPredictRate, //含税逾期利率
          vatProxyRate: this.vatProxyRate, //含税代理费率
          vatProxyAmt: this.vatProxyAmt, //含税代理费
          extaxProfileRate: this.extaxProfileRate, //不含税月息利率
          extaxPredictRate: this.extaxPredictRate, //不含税逾期利率
          extaxProxyRate: this.extaxProxyRate, //不含税代理费率
          extaxProxyAmt: this.extaxProxyAmt, //不含税代理费
          settleCurrencyRate: this.settleCurrencyRate, //结算汇率
          calcDays: this.calcDays, //计息放货天数
          clacProfileDays: this.clacProfileDays, //计息天数
          insuranceRate: this.insuranceRate, //保证金比率
          feeChargerType: this.feeChargerType //杂费承担方
        },
        //销售合同交货地
        odPsContractSoAddressList: this.tableDatajh,
        //双边销售合同预计杂费
        odPsSoContractFeeList: this.tableDatazf,
        //销售合同物料明细
        odPsSoContractItemsList: this.tableData,
        //双边销售收款方式
        odPsSoContractPayeeList: this.tableDataFkfs,
        //双边销售合同条款
        odPsSoContractTermList: this.tableDataHtts,
        //销售合同运输信息
        odPsSoContractTransferInfo: {
          deliveryCutoffDate: this.form.deliveryCutoffDate, //最迟交货日期
          priceTem: this.form.priceTem, //价格条款
          transMode: this.form.transMode, //运输方式
          loadType: this.form.loadType, //装卸时间
          shipMode: this.form.shipMode, //船运方式
          isTransfered: this.form.radio == "isTransfered" ? 1 : 0, //是否转船
          isBatched: this.form.radio == "isBatched" ? 1 : 0, //是否分批
          loadingPort: this.form.loadingPort, //装货港
          unloadingPort: this.form.unloadingPort, //卸货港
          destination: this.form.destination, //目的地
          shipName: this.form.shipName, //船名
          shipCode: this.form.shipCode //船舶识别号
        },
        odPsSoCtiPathsList: this.tableDataYsxx
      };
      if (this.$route.query.id) {
        data.odPsContractSo.custContractNo = this.custContractNo;
        data.odPsContractSo.custContractId = this.custContractId;

        data.odPsContractSo.psContractNo = this.psContractNo;
        data.odPsContractSo.psContractId = this.psContractId;

        data.odPsSoContractTransferInfo.custContractId = this.custContractId;
      }
      this.$emit("get", data, 3);
    },
    //自动获取销售含税单价
    changeOrg() {
      this.tableData.forEach((item, index) => {
        item.originPrice = this.$unitPrice(
          this.orgList[index].originAmt,
          this.vatProxyRate,
          this.insuranceRate,
          this.vatProfileRate,
          this.calcDays,
          this.tableData[index].taxRate,
          this.settleCurrencyRate,
          this.tableData[index].itemQty
        );
        this.$set(this.tableData, index, item);
      });
    },
    //采购含税单价变动
    originPriceCh(e, index) {
      let row = e;
      // //销售不含税单价
      // row.unOriginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      // //销售含税金额
      // row.originAmt = this.$orginAmt(row.originPrice, row.itemQty);

      //采购不含税单价
      row.unOriginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //采购含税金额
      row.originAmt = this.$orginAmt(row.originPrice, row.itemQty);
      //采购不含税金额
      row.unOriginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmt, row.unOriginAmt);
      this.$set(this.tableData, index, row);
    },
    //销售含税金额变动
    originAmtCh(e, index) {
      let row = e;
      // //销售不含税金额
      // row.unOriginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      // //增值税额
      // row.taxAmt = this.$taxAmt(row.originAmt, row.unOriginAmt);
      // //销售含税单价
      // if (row.itemQty != 0)
      //   row.originPrice = this.$orginPrice(row.originAmt, row.itemQty);

      //采购含税单价
      row.originPrice = this.$orginPrice(row.originAmt, row.itemQty);
      //采购不含税单价
      row.unOriginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //采购不含税金额
      row.unOriginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmt, row.unOriginAmt);
      this.$set(this.tableData, index, row);
    },
    //税率变动
    taxRateCh(e, index) {
      let row = e;
      // //销售不含税单价
      // row.unOriginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      // //销售不含税金额
      // row.unAriginAmt = this.$unorginAmt(row.originAmt, row.taxRate);

      //采购不含税金额
      row.unOriginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmt, row.unOriginAmt);
      this.$set(this.tableData, index, row);
    },
    //税额变动
    taxAmtCh(e, index) {
      let row = e;
      // //销售不含税金额
      // row.unOriginAmt = this.$unorginAmtCh(this.tableData, row.taxAmt);

      //采购不含税金额  采购不含税金额=采购含税金额-税额
      row.unOriginAmt = this.$unorginAmtCh(row.originAmt, row.taxAmt);
      this.$set(this.tableData, index, row);
    },
    //销售不含税金额改变
    unOriginAmtCh() {
      // this.extaxProxyAmt = this.$extaxProxyAmt(
      //   this.extaxProxyRate,
      //   this.tableData
      // );
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
    //获取v收款类型
    fklx() {
      Amange.fklx()
        .then(res => {
          this.fklxList = res.data;
        })
        .catch();
    },
    //获取价格条款
    jgtk() {
      Amange.jgtk()
        .then(res => {
          this.jgtkList = res.data;
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
    //获取收款方式
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
    //保证金释放方式
    bzjsffs() {
      Amange.bzjsffs()
        .then(res => {
          this.bzjsffsList = res.data;
        })
        .catch();
    },
    //收保证金方式
    sbzj() {
      Amange.sbzj()
        .then(res => {
          this.sbzjList = res.data;
        })
        .catch();
    },
    //回款方式c
    hkfs() {
      Amange.hkfs()
        .then(res => {
          this.hkfsList = res.data;
        })
        .catch();
    },
    //数量验收标准
    slys() {
      Amange.slys()
        .then(res => {
          this.slysList = res.data;
        })
        .catch();
    },
    //杂费承担方
    zfcd() {
      Amange.zfcd()
        .then(res => {
          this.zfcdList = res.data;
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
      this.pariList();
    },
    //汇率查询
    pariList() {
      let params = {
        formCurrencyId: this.currency.currencyId,
        toCurrencyId: this.companyName.functionalCurrencyId
      };
      Amange.pariList(params)
        .then(res => {
          if (res.data.length >= 1) {
            this.currencyRate = res.data.parities;
          } else {
            this.currencyRate = `1`;
          }
        })
        .catch();
    },
    //来自基本信息页物料同步删除
    firstDele(e, list) {
      let idSav = []; //修改数据
      let idNo = []; //新建数据
      let params = {};
      for (const item of e) {
        item.contractDetailId && idSav.push(item.contractDetailId);
        params.contractDetailIdList = idSav.join(`,`);
      }
      if (idSav.length) {
        Amange.delKwl(params)
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
                item.addressId && idSav.push(item.addressId);
                params.addressIdList = idSav.join(`,`);
                break;
              case 1:
                item.feeId && idSav.push(item.feeId);
                params.feeIdList = idSav.join(`,`);
                break;
              case 2:
                item.pcpId && idSav.push(item.pcpId);
                params.pcpIdList = idSav.join(`,`);
                break;
              case 3:
                item.payeeId && idSav.push(item.payeeId);
                params.payeeIdList = idSav.join(`,`);
                break;
              case 4:
                item.ptRowid && idSav.push(item.ptRowid);
                params.ptRowidList = idSav.join(`,`);
                break;
              case 5:
                item.contractDetailId && idSav.push(item.contractDetailId);
                params.contractDetailIdList = idSav.join(`,`);
                break;
              default:
                break;
            }
          }
          if (idSav.length)
            switch (key) {
              case 0:
                Amange.delKjh(params)
                  .then(res => {
                    this.deleIndex(e, list);
                    this.$openSuccess(res.message);
                  })
                  .catch();
                break;
              case 1:
                Amange.delKzf(params)
                  .then(res => {
                    this.deleIndex(e, list);
                    this.$openSuccess(res.message);
                  })
                  .catch();
                break;
              case 2:
                Amange.delys(params)
                  .then(res => {
                    this.deleIndex(e, list);
                    this.$openSuccess(res.message);
                  })
                  .catch();
                break;
              case 3:
                Amange.delKsk(params)
                  .then(res => {
                    this.deleIndex(e, list);
                    this.$openSuccess(res.message);
                  })
                  .catch();
                break;
              case 4:
                Amange.delKtk(params)
                  .then(res => {
                    this.deleIndex(e, list);
                    this.$openSuccess(res.message);
                  })
                  .catch();
                break;
              case 5:
                Amange.delKwl(params)
                  .then(res => {
                    this.deleIndex(e, list);
                    this.$openSuccess(res.message);
                  })
                  .catch();
                break;
              default:
                break;
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
            item.addressId == get.addressId &&
            item.pcpId == get.pcpId &&
            item.feeId == get.feeId &&
            item.ptRowid == get.ptRowid &&
            item.contractDetailId == get.contractDetailId &&
            item.payeeId == get.payeeId
          );
        });
        list.splice(del, 1);
      }
      this.selectjh = [];
      this.selectzf = [];
      this.selectioned = [];
      this.selectYsxx = [];
      this.selecFkfs = [];
      this.selecHttk = [];
    },
    //交货表格选择
    jhhandleChange(e) {
      this.selectjh = e;
    },
    ///交货创建数据
    jhaddList() {
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        rowNo: (this.tableDatajh.length + 1) * 10,
        address: ``,
        detailAddress: ``
      };
      let newTbale = [];
      newTbale.push(data);
      this.tableDatajh = [...this.tableDatajh, ...newTbale];
    },
    //收款方式表格选择
    fkfshandleChange(e) {
      this.selecFkfs = e;
    },
    ///收款方式创建数据
    fkfsaddList() {
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        rowNo: (this.tableDataFkfs.length + 1) * 10,
        payeeWay: ``, //收款方式
        payeeType: ``, //收款类型
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
    //杂费表格选择
    zfhandleChange(e) {
      this.selectzf = e;
    },
    ///杂费创建数据
    zfaddList() {
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        rowNo: (this.tableDatazf.length + 1) * 10,
        feeName: ``, //费用名称
        feeAmt: ``, //金额
        feeTaxRate: ``, //税率（
        payee: ``, //收款方
        settleType: ``, //结算方式
        shareRate: ``, //销售合同承担
        remark2: `` //合作协议
      };
      let newTbale = [];
      newTbale.push(data);
      this.tableDatazf = [...this.tableDatazf, ...newTbale];
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
      newTbale.push(data);
      this.tableDataHtts = [...this.tableDataHtts, ...newTbale];
    },
    //运输表格选择
    ysxxhandleChange(e) {
      this.selectYsxx = e;
    },
    //物料表格选择
    wlmxhandleChange(e) {
      this.selectioned = e;
    },
    //保存数据
    addSub() {},
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
                return this.$toFixed(res, 2);
              } else {
                return this.$toFixed(prev, 2);
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
    getSummariesFk(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        } else if (index === 3 || index === 4) {
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
          index === 7 ||
          index === 9 ||
          index === 12 ||
          index === 13 ||
          index === 15
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
    }
  }
};
</script>

<style lang="scss">
</style>
