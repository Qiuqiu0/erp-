<template>
  <div id="settlementCreat" class="content-div2">
    <!-- 按钮 -->
    <div class="button-div button-div-query auto-sibling">
      <el-button @click="savebtn" v-show="operation" icon="el-icon-suitcase"
        >保存</el-button
      >
      <el-button @click="cancelbtn" v-show="operation" icon="el-icon-close"
        >取消</el-button
      >
      <el-button @click="cancelbtn" v-show="!operation" icon="el-icon-back"
        >返回</el-button
      >
    </div>
    <div>
      <el-tabs v-model="activeName" type="card">
        <!-- 合同内容 -->
        <el-tab-pane label="合同内容" name="first">
          <div class="index-div3">
            <el-col :span="5" class="el-col el-col-required">
              <label><span style="color:red">*</span>公司</label>
              <el-input
                v-model="companyName.companyName"
                class="el-inputs"
                :class="errorKey.includes('companyName') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              ></el-input>
              <span class="comicon" @click="componyTip"
                ><i class="el-icon-search"></i
              ></span>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span style="color:red">*</span>部门</label>
              <el-input
                v-model="branchName.branchName"
                class="el-inputs" :class="errorKey.includes('branchName') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              >
              </el-input>
              <span class="comicon" @click="departmentTip"
                ><i class="el-icon-search"></i
              ></span>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span style="color:red">*</span>业务员</label>
              <el-input
                v-model="staffName.empName"
                class="el-inputs" :class="errorKey.includes('staffName') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              >
              </el-input>
              <span class="comicon" @click="staffTip"
                ><i class="el-icon-search"></i
              ></span>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span style="color:red">*</span>ERP合同号</label>
              <el-input
                v-model="htmsg.contractNo"
                class="el-inputs" :class="errorKey.includes('htmsg') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              >
              </el-input>
              <span class="comicon" @click="htTip"
                ><i class="el-icon-search"></i
              ></span>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span style="color:red">*</span>供应商</label>
              <el-input
                v-model="htmsg.supplierName"
                class="el-inputs" :class="errorKey.includes('supplierName') ? 'inputRed' : ''"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span style="color:red">*</span>销售客户</label>
              <el-input
                v-model="htmsg.custName"
                class="el-inputs" :class="errorKey.includes('custName') ? 'inputRed' : ''"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col choosedate el-col-required">
              <label><span style="color:red">*</span>结算日期</label>
              <el-date-picker
                @change="datachange"
                v-model="outtime" :class="errorKey.includes('outtime') ? 'inputRed' : ''"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                :disabled="!operation"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>品名</label>
              <el-input
                v-model="goods"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>结算数量</label>
              <el-input
                v-model="rksl"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>单据状态</label>
              <el-select
                clearable
                v-model="mytype"
                placeholder="请选择"
                class="el-select"
                disabled
              >
                <el-option
                  v-for="item in mytypearr"
                  :key="item.dict_code"
                  :label="item.dict_value"
                  :value="item.dict_code"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="24" class="el-col-textarea">
              <label style="width:6.4%;vertical-align:8px">备注</label>
              <el-input
                v-model="rkbz"
                autosize
                size="small"
                type="textarea"
                class="el-textarea"
                placeholder="请输入"
                :disabled="!operation"
              ></el-input>
            </el-col>
          </div>
          <!-- 付款表格1 -->
          <!-- <h6 style="margin-left:20px">付款情况</h6> -->
          <div class="button-div">
            <el-button @click="bankadd" icon="el-icon-plus" v-show="operation">增加</el-button>
            <el-button @click="bankreduce" icon="el-icon-minus" v-show="operation">删除</el-button>
          </div>
          <div>
            <el-table
              :data="bankmsg"
              border
              max-height="300"
              style="width: 100%"
              show-summary
              :summary-method="getSummaries"
              @selection-change="bankChange"
              @row-dblclick="bankclick"
              @select-all="dialogChecks"
              @select="dialogChecks"
              ref="multipleTables"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column
                label="货款内容"
                prop="goodsAmtDesc"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-select
                    :filterable="true"
                    v-model="scope.row.goodsAmtDesc"
                    placeholder="请选择"
                    size="mini"
                    v-if="scope.row.edit"
                    clearable
                  >
                    <el-option
                      v-for="item in contacts"
                      :key="item.dict_code"
                      :label="item.dict_value"
                      :value="item.dict_value"
                    >
                    </el-option>
                  </el-select>
                  <span v-else>{{ scope.row.goodsAmtDesc }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="付汇日"
                prop="paymentDay"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-date-picker
                      size="mini"
                      value-format="yyyy-MM-dd"
                      style="width:100%"
                      v-model="scope.row.paymentDay"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </div>
                  <span v-else>{{ scope.row.paymentDay }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="支付币种"
                prop="paymentCurrency"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input
                      size="small"
                      v-model="scope.row.paymentCurrency"
                      disabled
                      placeholder="请选择"
                    >
                    </el-input>
                    <span class="comicon2" @click="coinTip(scope.$index)"
                      ><i class="el-icon-search"></i
                    ></span>
                  </div>
                  <span v-else>{{ scope.row.paymentCurrency }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="原币金额"
                prop="originAmt"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input
                      size="small"
                      @change="ybjechange(scope.$index)"
                      v-model="scope.row.originAmt"
                      placeholder="请输入"
                    >
                    </el-input>
                  </div>
                  <span v-else>{{ scope.row.originAmt }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="汇率"
                prop="currencyRate"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-input
                      size="small"
                      v-model="scope.row.currencyRate"
                      placeholder="请输入"
                      @change="ybjechange(scope.$index)"
                    >
                    </el-input>
                  </div>
                  <span v-else>{{ scope.row.currencyRate }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="折合人民币金额"
                prop="rmbAmt"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
          <!-- 货款内容含税 -->
          <!-- <h6 style="margin-left:20px">货款内容(含税金额)</h6> -->
          <div class="index-div3 index-div">
            <div style="padding-top:10px;">
              <el-divider content-position="left">货款内容</el-divider>
            </div>
            <el-col :span="5" class="el-col">
              <label>税款(增值税)</label>
              <el-input
                v-model="taxAmt"
                class="el-inputs"
                placeholder="请输入"
                :disabled="!operation"
                :oninput="taxAmt= $filterPriceNum( taxAmt,2)"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>税款(增值税补税)</label>
              <el-input
                v-model="taxAmtAdd"
                class="el-inputs"
                placeholder="请输入"
                :disabled="!operation"
                :oninput="taxAmtAdd= $filterPriceNum( taxAmtAdd,2)"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>税款(关税)</label>
              <el-input
                v-model="taxGateway"
                class="el-inputs"
                placeholder="请输入"
                :disabled="!operation"
                :oninput="taxGateway= $filterPriceNum( taxGateway,2)"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>税款(合计)</label>
              <el-input
                v-model="taxSumAmt"
                class="el-inputs"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>货款(内贸付款总额)</label>
              <el-input
                v-model="goodsAmtOrigin"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :oninput="goodsAmtOrigin= $filterPriceNum( goodsAmtOrigin,2)"
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>人民币金额</label>
              <el-input
                v-model="goodsAmtRmb"
                class="el-inputs"
                disabled
              ></el-input>
            </el-col>
          </div>
          <!-- 费用情况含税 -->
          <div class="index-div3 index-div">
            <div style="padding-top:10px;">
              <el-divider content-position="left">费用情况</el-divider>
            </div>
            <el-col :span="5" class="el-col">
              <label>运费(海运含税)</label>
              <el-input
                v-model="carriageSeaVat"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
                :oninput="carriageSeaVat= $filterPriceNum( carriageSeaVat,2)"
                @change="seavat('yes')"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>运费(海运不含税)</label>
              <el-input
                v-model="carriageSea"
                class="el-inputs"
                placeholder="请输入"
                clearable
                @change="seavat('no')"
                :oninput="carriageSea= $filterPriceNum( carriageSea,2)"
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>运费(汽运含税)</label>
              <el-input
                v-model="carriageCarVat"
                class="el-inputs"
                placeholder="请输入"
                clearable
                @change="carriage('yes')"
                :oninput="carriageCarVat= $filterPriceNum( carriageCarVat,2)"
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>运费(汽运不含税)</label>
              <el-input
                v-model="carriageCar"
                @change="carriage('no')"
                :oninput="carriageCar= $filterPriceNum( carriageCar,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>运费(铁运含税)</label>
              <el-input
                v-model="carriageRailwayVat"
                @change="railwayvat('yes')"
                :oninput="carriageRailwayVat= $filterPriceNum( carriageRailwayVat,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>运费(铁运不含税)</label>
              <el-input
                @change="railwayvat('no')"
                v-model="carriageRailway"
                :oninput="carriageRailway= $filterPriceNum( carriageRailway,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>港杂费(含税)</label>
              <el-input
                v-model="portOtherFeeVat"
                @change="portother('yes')"
                :oninput="portOtherFeeVat= $filterPriceNum( portOtherFeeVat,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>港杂费(不含税)</label>
              <el-input
                v-model="portOtherFee"
                @change="portother('no')"
                :oninput="portOtherFee= $filterPriceNum( portOtherFee,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>报关费(含税)</label>
              <el-input
                v-model="declareAmtVat"
                @change="declare('yes')"
                :oninput="declareAmtVat= $filterPriceNum( declareAmtVat,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>报关费(不含税)</label>
              <el-input
                v-model="declareAmt"
                @change="declare('no')"
                :oninput="declareAmt= $filterPriceNum( declareAmt,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>保险费(含税)</label>
              <el-input
                v-model="suranceFeeVat"
                @change="surance('yes')"
                :oninput="suranceFeeVat= $filterPriceNum( suranceFeeVat,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>保险费(不含税)</label>
              <el-input
                v-model="suranceFee"
                @change="surance('no')"
                :oninput="suranceFee= $filterPriceNum( suranceFee,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>银行手续费(含税)</label>
              <el-input
                v-model="bankFeeVat"
                @change="bankfe('yes')"
                :oninput="bankFeeVat= $filterPriceNum( bankFeeVat,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>银行手续费(不含税)</label>
              <el-input
                v-model="bankFee"
                @change="bankfe('no')"
                :oninput="bankFee= $filterPriceNum( bankFee,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>承兑贴息(含税)</label>
              <el-input
                @change="acceptpro('yes')"
                v-model="acceptProfitDeductVat"
                :oninput="acceptProfitDeductVat= $filterPriceNum( acceptProfitDeductVat,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>承兑贴息(不含税)</label>
              <el-input
                @change="acceptpro('no')"
                v-model="acceptProfitDeduct"
                :oninput="acceptProfitDeduct= $filterPriceNum( acceptProfitDeduct,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>代理费(含税)</label>
              <el-input
                v-model="proxyFeeVat"
                @change="proxy('yes')"
                :oninput="proxyFeeVat= $filterPriceNum( proxyFeeVat,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>代理费(不含税)</label>
              <el-input
                v-model="proxyFee"
                @change="proxy('no')"
                :oninput="proxyFee= $filterPriceNum( proxyFee,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>利息(收益含税)</label>
              <el-input
                @change="rofit('yes')"
                v-model="profitAddAmtVat"
                :oninput="profitAddAmtVat= $filterPriceNum( profitAddAmtVat,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>利息(收益不含税)</label>
              <el-input
                @change="rofit('no')"
                v-model="profitAddAmt"
                :oninput="profitAddAmt= $filterPriceNum( profitAddAmt,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>仓储费(含税)</label>
              <el-input
                @change="whfees('yes')"
                v-model="whFeeVat"
                :oninput="whFeeVat= $filterPriceNum( whFeeVat,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>仓储费(不含税)</label>
              <el-input
                v-model="whFee"
                @change="whfees('no')"
                class="el-inputs"
                placeholder="请输入"
                :oninput="whFee= $filterPriceNum( whFee,2)"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>费用合计(含税)</label>
              <el-input
                v-model="feeSumVat"
                class="el-inputs"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>费用合计(不含税)</label>
              <el-input
                v-model="feeSum"
                class="el-inputs"
                disabled
              ></el-input>
            </el-col>
          </div>
          <!-- 结算情况 -->
          <!-- <h6 style="margin-left:20px">结算情况</h6> -->
          <div class="index-div3 index-div">
            <div style="padding-top:10px;">
              <el-divider content-position="left">结算情况</el-divider>
            </div>
            <el-col :span="5" class="el-col">
              <label>开票数量</label>
              <el-input
                v-model="shouldInvoiceQty"
                class="el-inputs"
                :oninput="shouldInvoiceQty= $filterPriceNum( shouldInvoiceQty,4)"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>开票单价</label>
              <el-input
                v-model="shouldInvoicePrice"
                :oninput="shouldInvoicePrice= $filterPriceNum( shouldInvoicePrice,6)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>开票金额</label>
              <el-input
                v-model="shouldInvoiceAmt"
                class="el-inputs"
                placeholder="请输入"
                clearable
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>折让/返利比例</label>
              <el-input
                v-model="discountRate"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
                :oninput="discountRate=(discountRate + '').replace(/[^\d]/g, '') * 1"
              >
                <template slot="append">%</template>
              </el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>折让/返利金额</label>
              <el-input
                v-model="discountAmt"
                class="el-inputs"
                placeholder="请输入"
                clearable
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>最终结算开票金额</label>
              <el-input
                v-model="finalInvoiceAmt"
                class="el-inputs"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>累计已开票数量</label>
              <el-input
                v-model="invoicedQty"
                class="el-inputs"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>累计已开票金额</label>
              <el-input
                v-model="invoicedAmt"
                class="el-inputs"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>本次开票金额</label>
              <el-input
                v-model="invoiceAmt"
                class="el-inputs"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>累计已收款(含保证金)</label>
              <el-input
                v-model="receiptAmt"
                class="el-inputs"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>开票后应收金额</label>
              <el-input
                v-model="shouldReceiptAmt"
                class="el-inputs"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>客户还需补交货款</label>
              <el-input
                v-model="remainShouldPay"
                class="el-inputs"
                disabled
              ></el-input>
            </el-col>
          </div>
          <!-- 合同情况补充 -->
          <!-- <h6 style="margin-left:20px">合同情况</h6> -->
          <div class="index-div3 index-div">
            <div style="padding-top:10px;">
              <el-divider content-position="left">合同情况</el-divider>
            </div>
            <el-col :span="5" class="el-col">
              <label>客户已付保证金金额</label>
              <el-input
                v-model="payedDesposit"
                class="el-inputs"
                :oninput="payedDesposit= $filterPriceNum( payedDesposit,2)"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>客户已付货款金额</label>
              <el-input
                v-model="payedBrought"
                :oninput="payedBrought= $filterPriceNum( payedBrought,2)"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>供应商发票是否取回</label>
              <el-input
                v-model="poInvoiceFetched"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>何时取回</label>
              <el-input
                v-model="poInvoiceFetchDate"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>预付款余额是否退回</label>
              <el-input
                v-model="predictPayReturned"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>何时退回</label>
              <el-input
                v-model="predictPayReturnDate"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>供应商余额处理方式</label>
              <el-input
                v-model="supplierBalanceWay"
                class="el-inputs"
                placeholder="请输入"
                clearable
                :disabled="!operation"
              ></el-input>
            </el-col>
          </div>
        </el-tab-pane>
        <el-tab-pane label="利息贴现" name="second">
          <interst-table :interestable="interestable"></interst-table>
        </el-tab-pane>
        <el-tab-pane label="销售明细" name="third">
          <sales-details :salesmsg="salesmsg"></sales-details>
        </el-tab-pane>
        <!-- 打印与附件 -->
        <el-tab-pane label="打印及附件" name="Fourth">
          <div class="el-table-div">
          <div class="button-div">
            <el-upload
              v-show="operation"
              class="upload-demo"
              ref="newupload"
              action="#"
              :before-upload="beforeUpload"
              :headers="uploadList.uploadHeaders"
              :multiple="false"
              :auto-upload="false"
              :on-remove="handleRemove"
              :limit="1"
              :file-list="uploadList.fileList"
            >
              <el-button
                slot="trigger"
                style="color:#3E3F42;"
                size="small"
                icon="el-icon-paperclip"
                type="button"
                >选取文件</el-button
              >
              <el-button
                style="margin-left: 10px;"
                size="small"
                class="addBut"
                icon="el-icon-upload"
                @click="submitUpload"
                >上传</el-button
              >
            </el-upload>
          </div>
          <el-table
            :data="uploadList.tableList"
            ref="table2"
            tooltip-effect="dark"
            border
            stripe
            style="width: 100%"
            @select-all="dialogCheckTable"
            @select="dialogCheckTable"
            @selection-change="handleChangeTableTable"
          >
            <el-table-column
              type="selection"
              width="45"
              align="center"
            ></el-table-column>
            <el-table-column
              label="序号"
              type="index"
              width="60"
              align="center"
            ></el-table-column>
            <el-table-column prop="fileOldName" label="文件名称">
            </el-table-column>
            <!-- <el-table-column prop="fileType" label="类型"> </el-table-column>
            <el-table-column prop="fileType" label="文档类型名称">
            </el-table-column>
            <el-table-column prop="fileType" label="签章情况">
            </el-table-column> -->
            <el-table-column prop="createdTime" label="上传时间">
            </el-table-column>
            <el-table-column prop="createdName" label="上传人"> </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="text"
                    style="height: 26px;padding: 0;width:40px;"
                    @click="download(scope.row)">下载</el-button>
                    <el-button
                    v-show="operation"
                    size="mini"
                    type="text"
                    style="height: 26px;padding: 0;width:40px;"
                    @click="delFile(scope.$index,scope.row)">删除</el-button>
                    <!-- <el-button
                    size="mini"
                    type="text"
                    style="height: 26px;padding: 0;width:40px;"
                    @click="download(scope.row)">预览</el-button>
                    <el-button
                    size="mini"
                    type="text"
                    style="height: 26px;padding: 0;width:40px;"
                    @click="download(scope.row)">打印</el-button> -->
                </template>
            </el-table-column>
          </el-table>
        </div>
        </el-tab-pane>
        <!-- 系统信息 -->
        <el-tab-pane label="系统信息" name="Fifth">
          <div class="input-div " id="xtridate">
            <el-col :span="5" class="el-col">
              <label>创建日期</label>
              <el-date-picker
                v-model="creattime1"
                type="date"
                placeholder="选择日期"
                disabled
                :editable="false"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>创建人</label>
              <el-input
                v-model="creatman1"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>修改日期</label>
              <el-date-picker
                v-model="creattime2"
                type="date"
                placeholder="选择日期"
                disabled
                :editable="false"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>修改人</label>
              <el-input
                v-model="creatman2"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
          </div>
        </el-tab-pane>
        <el-tab-pane label="流程详情"
                   name="lcxq">
        <div class="input-div input-div-bor bortop0">
          <v-exmineStatus :id="$route.query.msgid"></v-exmineStatus>
        </div>
      </el-tab-pane>
      </el-tabs>
    </div>
    <el-divider></el-divider>
    <!-- 选择公司弹窗 -->
    <compony-select
      v-if="componyShow"
      :ztz="ztz"
      :tipShow="componyShow"
      @tipsCancle="tipsCancle"
      @tipsSure="tipsSure"
    >
    </compony-select>
    <!-- 选择部门弹窗 -->
    <department-select
      v-if="departmentShow"
      :tipShow="departmentShow"
      :data="companyName"
      :departztz="departztz"
      @departmentCancle="departmentCancle"
      @departmentSure="departmentSure"
    >
    </department-select>
    <!-- 选择员工弹窗 -->
    <staff-select
      v-if="staffShow"
      :tipShow="staffShow"
      :data="staffsName"
      @staffCancle="staffCancle"
      @staffSure="staffSure"
    >
    </staff-select>
    <!-- 选择币种弹窗 -->
    <coin-select
      v-if="coinShow"
      :tipShow="coinShow"
      @coinCancle="coinCancle"
      @coinSure="coinSure"
    ></coin-select>
    <!-- 选择双边合同弹窗 -->
    <bilateral-select
      v-if="htShow"
      :tipShow="htShow"
      @htCancle="htCancle"
      @htSure="htSure"
    ></bilateral-select>
  </div>
</template>

<script>
import axios from "axios";
import { service, serviceJson } from "../../axios/index.js";
import ExmineStatus from '@/components/exmineStatus'
import uploadApi from "@/api/component";
import {
  getDjzt,
  pariList,
  paymentForm,
  discountInterest,
  salesDetail,
  Settlement,
  suppleMent,
  costSituation,
  queryDetails,
  queryInformation,
  queryDiscount,
  queryMateriel,
  queryInput,
  queryBusiness,
  wareSave,
  reducemsg
} from "@/api/salesManage/settlementcreat.js";
import componySelect from "@/components/componySelect.vue"; //公司
import departmentSelect from "@/components/departmentSelect.vue"; //部门
import staffSelect from "@/components/staffSelect.vue"; //业务员
import interstTable from "@/views/salesManage/interestTable.vue"; //利息贴现
import salesDetails from "@/views/salesManage/salesDetails.vue"; //销售明细
import coinSelect from "@/components/coinSelect.vue"; //业务币种
import bilateralSelect from "@/components/bilateralSelect.vue"; //双边合同
export default {
  name: "settlementCreat",
  props: {},
  data() {
    return {
      errorKey: [],
      form: {
        englishAddress: "",
        address: ""
      },
      staffsName: {},
      departztz: 0,
      ztz: 0,
      htmsg: "",
      ywlx:[],//业务类型
      interestable: [], //利息贴现
      contacts: [], //货款内容下拉选择框
      types: "", //记录操作
      msgid: "", //记录数据id
      version: "", //记录带过来的版本号
      outtime: "", //结算日期
      goods: "", //品名
      operation: true, //记录是否是查看状态
      opres: true, //记录是否是新增状态
      //rksl: "", //结算数量
      mytype: "", //单据状态
      mytypearr: [], //单据状态下拉数据
      rkbz: "", //出库备注
      activeName: "first", //tab切换
      componyShow: false, //公司弹窗
      companyName: ``, //公司
      branchName: ``, //部门
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      staffName: ``, //员工
      coinShow: false, //币种弹窗
      coinindex: "", //记录币种索引
      taxAmt: 0, //税款（增值税）(货款内容字段开始)
      taxAmtAdd: 0, //税款（增值税补税）
      taxGateway: 0, //税款（关税）
      //taxSumAmt: 0, //税款（合计）
      goodsAmtOrigin: 0, //货款（内贸付款总额）
      goodsAmtRmb: 0, //人民币金额(货款内容字段结束)
      carriageSeaVat: 0, //运费（海运）(费用情况含税开始)
      carriageRailwayVat: 0, //运费（铁运）
      declareAmtVat: 0, //报关费
      bankFeeVat: 0, //银行手续费
      proxyFeeVat: 0, //代理费
      whFeeVat: 0, //仓储费
      carriageCarVat: 0, //运费（汽运）
      portOtherFeeVat: 0, //港杂费
      suranceFeeVat: 0, //保险费
      acceptProfitDeductVat: 0, //承兑贴息
      profitAddAmtVat: 0, //利息（收益）
      //feeSumVat: 0, //费用合计(费用情况含税结束)
      carriageSea: 0, //运费（海运）(费用情况不含税开始)
      carriageRailway: 0, //运费（铁运）
      declareAmt: 0, //报关费
      bankFee: 0, //银行手续费
      proxyFee: 0, //代理费
      whFee: 0, //仓储费
      carriageCar: 0, //运费（汽运）
      portOtherFee: 0, //港杂费
      suranceFee: 0, //保险费
      acceptProfitDeduct: 0, //承兑贴息
      profitAddAmt: 0, //利息（收益）
      //feeSum: 0, //费用合计(费用情况不含税结束)
      shouldInvoiceQty: 0, //开票数量 (结算情况字段)
      shouldInvoicePrice: 0, //开票单价
      shouldInvoiceAmt: 0, //开票金额
      discountRate: 0, //折让/返利比例
      discountAmt: 0, //折让/返利金额
      //finalInvoiceAmt: 0, //最终结算开票金额
      invoicedQty: 0, //累计已开票数量
      invoicedAmt: 0, //累计已开票金额
      //invoiceAmt: 0, //本次开票金额
      receiptAmt: 0, //累计已收款金额(含保证金)
      //shouldReceiptAmt: 0, //开票后应收金额
      //remainShouldPay: 0, //实际应支付货款（客户还需补货款）（结算情况字段结束）
      payedDesposit: 0, //客户已付保证金金额 (合同情况补充字段)
      payedBrought: 0, //客户已付货款金额
      poInvoiceFetched: "", //供应商发票是否取回
      poInvoiceFetchDate: "", //何时取回
      predictPayReturned: "", //预付款余额是否退回
      predictPayReturnDate: "", //何时退回
      supplierBalanceWay: "", //供应商余额处理方式(合同情况字段结束)
      creattime1: "", //创建日期
      creattime2: "", //修改日期
      creatman1: "", //创建人
      creatman2: "", //修改人
      bankmsg: [], //表格信息
      bankreduces: [], //表格选择数据
      bankindex: "", //选择数据的索引
      salesmsg: [], //销售明细
      htShow: false,
      uploadList: {
        tableList:[],
        fileList:[], //文件
        sysid: "ac3284d42dcdbc883c3b6598c4fa5e2", //文件上传的参数
        uploadHeaders: { "content-Type": "multipart/form-data" } //文件上传的格式
      },
    };
  },
  computed: {
     rksl:{
       get: function () {
          return  this.$toFixed(Number(this.shouldInvoiceQty)-Number(this.invoicedQty),4)
      },
        set: function (newValue) {
      }
     },
     taxSumAmt: {//税款合计
        get: function () {
          return this.$toFixed(Number(this.taxAmt) + Number(this.taxAmtAdd)+Number(this.taxGateway),2)
      },
        set: function (newValue) {
      }
    },
    feeSum: {//费用不含税
        get: function () {
          return this.$toFixed(Number(this.carriageSea)+Number(this.carriageCar)+Number(this.carriageRailway)+Number(this.portOtherFee)+Number(this.declareAmt)+Number(this.suranceFee)+Number(this.bankFee)
          +Number(this.acceptProfitDeduct)+Number(this.proxyFee)+Number(this.profitAddAmt)+Number(this.whFee),2)
      },
        set: function (newValue) {
      }
    },
    feeSumVat: {//费用含税
        get: function () {
          return this.$toFixed(Number(this.carriageSeaVat)+Number(this.carriageCarVat)+Number(this.carriageRailwayVat)+Number(this.portOtherFeeVat)+Number(this.declareAmtVat)+Number(this.suranceFeeVat)+Number(this.bankFeeVat)
          +Number(this.acceptProfitDeductVat)+Number(this.proxyFeeVat)+Number(this.profitAddAmtVat)+Number(this.whFeeVat),2)
      },
        set: function (newValue) {
      }
    },
    finalInvoiceAmt: {//最终结算开票金额
        get: function () {
          return this.$toFixed(Number(this.shouldInvoiceAmt)-Number(this.discountAmt),2)
      },
        set: function (newValue) {
      }
    },
    invoiceAmt: {//本次开票金额
        get: function () {
          return this.$toFixed(Number(this.shouldInvoiceAmt)-Number(this.invoicedAmt),2)
      },
        set: function (newValue) {
      }
    },
    shouldReceiptAmt: {//开票后应收金额
        get: function () {
          return this.$toFixed(Number(this.shouldInvoiceAmt)-Number(this.receiptAmt),2)
      },
        set: function (newValue) {
      }
    },
    remainShouldPay: {//客户还需补货款
        get: function () {
          return this.$toFixed(Number(this.finalInvoiceAmt)-Number(this.receiptAmt),2)
      },
        set: function (newValue) {
      }
    },
  },
  created() {
     this.getYwlx();
  },
  mounted() {
    this.types = this.$route.query.data;
    this.msgid = this.$route.query.msgid;
    this.version = this.$route.query.version;
    console.log(this.msgid);
    console.log(this.version);
    this.opres = this.types === "creat" ? false : true;
    this.operation = this.types === "look" ? false : true;
    if (this.opres) {
      //如果是查看和修改状态 加载数据
      this.getmoremsg();
      this.getArrmsg();
    }
    this.getMylxs();
    this.getDknr();
  },
  watch: {
    taxSumAmt(newVal, oldVal) {
      this.shouldInvoiceAmt=this.$toFixed(Number(newVal)+Number(this.goodsAmtOrigin)+Number(this.feeSumVat),2)//开票金额

    },
    goodsAmtOrigin(newVal, oldVal) {//货款(内贸付款总和)
      this.shouldInvoiceAmt=this.$toFixed(Number(newVal)+Number(this.taxSumAmt)+Number(this.feeSumVat),2)//开票金额
    },
    feeSumVat(newVal, oldVal) {
      this.shouldInvoiceAmt=this.$toFixed(Number(newVal)+Number(this.taxSumAmt)+Number(this.goodsAmtOrigin),2)//开票金额
    },
    shouldInvoiceAmt(newVal, oldVal){
      if(Number(this.shouldInvoiceQty)!=0){
        this.shouldInvoicePrice= this.$toFixed(Number(newVal)/Number(this.shouldInvoiceQty),6)//开票单价
      }
      this.discountAmt=this.$toFixed(Number(newVal)*this.discountRate/100,2)
    },
    shouldInvoiceQty(newVal, oldVal){
      if(Number(newVal)!=0){
        this.shouldInvoicePrice=this.$toFixed(this.shouldInvoiceAmt/Number(newVal),6)//开票单价
      }else{
        this.shouldInvoicePrice=0
      }
    },
    discountRate(newVal, oldVal){//折让/返利比例
      this.discountAmt=this.$toFixed(this.shouldInvoiceAmt*this.discountRate/100,2)
    }
  },
  methods: {
    whfees(data){//仓储费
      if(data=='yes'){
        if(this.whFee==0||this.whFee==''){
          this.whFee=this.whFeeVat
        }
      }else{
        if(this.whFeeVat==0||this.whFeeVat==''){
          this.whFeeVat=this.whFee
        }
      }
    },
    rofit(data){//利息
      if(data=='yes'){
        if(this.profitAddAmt==0||this.profitAddAmt==''){
          this.profitAddAmt=this.profitAddAmtVat
        }
      }else{
        if(this.profitAddAmtVat==0||this.profitAddAmtVat==''){
          this.profitAddAmtVat=this.profitAddAmt
        }
      }
    },
    proxy(data){//代理费
      if(data=='yes'){
        if(this.proxyFee==0||this.proxyFee==''){
          this.proxyFee=this.proxyFeeVat
        }
      }else{
        if(this.proxyFeeVat==0||this.proxyFeeVat==''){
          this.proxyFeeVat=this.proxyFee
        }
      }
    },
    acceptpro(data){//承兑贴息
      if(data=='yes'){
        if(this.acceptProfitDeduct==0||this.acceptProfitDeduct==''){
          this.acceptProfitDeduct=this.acceptProfitDeductVat
        }
      }else{
        if(this.acceptProfitDeductVat==0||this.acceptProfitDeductVat==''){
          this.acceptProfitDeductVat=this.acceptProfitDeduct
        }
      }
    },
    bankfe(data){//银行手续费
      if(data=='yes'){
        if(this.bankFee==0||this.bankFee==''){
          this.bankFee=this.bankFeeVat
        }
      }else{
        if(this.bankFeeVat==0||this.bankFeeVat==''){
          this.bankFeeVat=this.bankFee
        }
      }
    },
    surance(data){//保险费
      if(data=='yes'){
        if(this.suranceFee==0||this.suranceFee==''){
          this.suranceFee=this.suranceFeeVat
        }
      }else{
        if(this.suranceFeeVat==0||this.suranceFeeVat==''){
          this.suranceFeeVat=this.suranceFee
        }
      }
    },
    declare(data){//报关费
      if(data=='yes'){
        if(this.declareAmt==0||this.declareAmt==''){
          this.declareAmt=this.declareAmtVat
        }
      }else{
        if(this.declareAmtVat==0||this.declareAmtVat==''){
          this.declareAmtVat=this.declareAmt
        }
      }
    },
    portother(data){//港杂费
      if(data=='yes'){
        if(this.portOtherFee==0||this.portOtherFee==''){
          this.portOtherFee=this.portOtherFeeVat
        }
      }else{
        if(this.portOtherFeeVat==0||this.portOtherFeeVat==''){
          this.portOtherFeeVat=this.portOtherFee
        }
      }
    },
    railwayvat(data){//运费(铁运)
      if(data=='yes'){
        if(this.carriageRailway==0||this.carriageRailway==''){
          this.carriageRailway=this.carriageRailwayVat
        }
      }else{
        if(this.carriageRailwayVat==0||this.carriageRailwayVat==''){
          this.carriageRailwayVat=this.carriageRailway
        }
      }
    },
    carriage(data){//运费(汽运)
      if(data=='yes'){
        if(this.carriageCar==0||this.carriageCar==''){
          this.carriageCar=this.carriageCarVat
        }
      }else{
        if(this.carriageCarVat==0||this.carriageCarVat==''){
          this.carriageCarVat=this.carriageCar
        }
      }
    },
    seavat(data){//运费(海运)
      if(data=='yes'){
        if(this.carriageSea==0||this.carriageSea==''){
          this.carriageSea=this.carriageSeaVat
        }
      }else{
        if(this.carriageSeaVat==0||this.carriageSeaVat==''){
          this.carriageSeaVat=this.carriageSea
        }
      }
    },
    getSummaries(param) {
      //合计
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        } else if (index === 4 || index === 6) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
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
    getYwlx() {
      //获取业务类型
      getDjzt({
        dictNo: 1014
      }).then(res => {
        this.ywlx=res.data;

      });
    },
    getDknr() {
      //获取货款内容下拉数据
      getDjzt({
        dictNo: 1036
      }).then(res => {
        console.log(res);
        this.contacts = res.data;
      });
    },
    getMylxs() {
      //获取贸易类型数据
      getDjzt({
        dictNo: 1085
      }).then(res => {
        this.mytypearr = res.data;
        if (this.types === "creat") {
          this.mytype = res.data[0].dict_code;
        }
      });
    },
    getArrmsg(){//修改查看页面加载利息贴现和销售明细
    queryDetails({settleId: this.msgid}).then(res=>{
    console.log(res);
    if (res.code === "success") {
        this.salesmsg = res.data;
        this.salesmsg.forEach(i=>{
          i.beginDate = this.$timeFun(i.beginDate, true);
          i.wvDate = this.$timeFun(i.wvDate, true);
          i.soDate = this.$timeFun(i.soDate, true);
          this.ywlx.forEach(k=>{
            if(i.bizType==k.dict_code){
              i.bizType=k.dict_value
            }
          })
        })
      }
    })
    queryDiscount({settleId: this.msgid}).then(res=>{
      console.log(res);
      this.interestable=res.data;
    })
    },
    getmoremsg() {
      //加载合同内容数据
      axios
        .all([
          queryInput({ settleId: this.msgid }),
          queryInformation({ settleId: this.msgid })
        ])
        .then(
          axios.spread((allQueryInput, allQueryInformation) => {
            console.log(allQueryInput);
            console.log(allQueryInformation);
            this.companyName = {
              //公司
              companyName: allQueryInput.data.companyName,
              companyCode: allQueryInput.data.companyCode,
              companyId: allQueryInput.data.companyId,
              functionalCurrencyId: allQueryInput.data.functionalCurrencyId
            };
            this.branchName = {
              //部门
              branchCode: allQueryInput.data.orgCode,
              branchName: allQueryInput.data.orgName,
              branchId: allQueryInput.data.orgId
            };
            this.staffName = {
              //业务员
              empName: allQueryInput.data.bizPersonName,
              empCode: allQueryInput.data.bizPersonCode
            };
            this.htmsg = {
              //erp合同号
              contractNo: allQueryInput.data.contractNoPs,
              //合同id contractId:
              custName: allQueryInput.data.custName, //销售客户
              custCode: allQueryInput.data.custCode, //销售客户
              custId: allQueryInput.data.custId, //销售客户
              supplierName: allQueryInput.data.supplierName, //供应商
              supplierCode: allQueryInput.data.supplierCode,
              supplierId: allQueryInput.data.supplierId
            };
            this.outtime = this.$timeFun(
              //结算日期
              allQueryInput.data.balanceDate,
              true
            );
            this.goods = allQueryInput.data.goodsName; //品名
            this.mytype = String(allQueryInput.data.status); //单据状态
            //this.rksl = allQueryInput.data.balanceQty; //结算数量
            this.rkbz = allQueryInput.data.remark; //备注
            this.bankmsg = allQueryInformation.data;
            this.taxAmt = allQueryInput.data.taxAmt; //税款（增值税）
            this.taxAmtAdd = allQueryInput.data.taxAmt; //税款（增值税补税）
            this.taxGateway = allQueryInput.data.taxGateway; //税款（关税）
            //this.taxSumAmt= allQueryInput.data.taxSumAmt; //税款合计
            this.goodsAmtOrigin = allQueryInput.data.goodsAmtOrigin; //货款（内贸付款总额）
            this.goodsAmtRmb = allQueryInput.data.goodsAmtRmb; //人民币金额
            this.carriageSeaVat = allQueryInput.data.carriageSeaVat; //运费（海运）(含税)
            this.carriageCarVat = allQueryInput.data.carriageCarVat; //运费（汽运）(含税)
            this.carriageRailwayVat = allQueryInput.data.carriageRailwayVat; //运费（铁运）(含税)
            this.portOtherFeeVat = allQueryInput.data.portOtherFeeVat; //港杂费(含税)
            this.declareAmtVat = allQueryInput.data.declareAmtVat; //报关费(含税)
            this.suranceFeeVat = allQueryInput.data.suranceFeeVat; //保险费(含税)
            this.bankFeeVat = allQueryInput.data.bankFeeVat; //银行手续费(含税)
            this.acceptProfitDeductVat =
              allQueryInput.data.acceptProfitDeductVat; //承诺贴息(含税)
            this.proxyFeeVat = allQueryInput.data.proxyFeeVat; //代理费(含税)
            this.profitAddAmtVat = allQueryInput.data.profitAddAmtVat; //利息（收益）(含税)
            this.whFeeVat = allQueryInput.data.whFeeVat; //仓储费(含税)
            //this.feeSumVat = allQueryInput.data.feeSumVat; //费用合计(含税)
            this.carriageSea = allQueryInput.data.carriageSea; //运费（海运）(不含税)
            this.carriageCar = allQueryInput.data.carriageCar; //运费（汽运）(不含税)
            this.carriageRailway = allQueryInput.data.carriageRailway; //运费（铁运）(不含税)
            this.portOtherFee = allQueryInput.data.portOtherFee; //港杂费(不含税)
            this.declareAmt = allQueryInput.data.declareAmt; //报关费(不含税)
            this.suranceFee = allQueryInput.data.suranceFee; //保险费(不含税)
            this.bankFee = allQueryInput.data.bankFee; //银行手续费(不含税)
            this.acceptProfitDeduct = allQueryInput.data.acceptProfitDeduct; //银行手续费(不含税)
            this.proxyFee = allQueryInput.data.proxyFee; //代理费(不含税)
            this.profitAddAmt = allQueryInput.data.profitAddAmt; //利息（收益）(不含税)
            this.whFee = allQueryInput.data.whFee; //仓储费(不含税)
            //this.feeSum = allQueryInput.data.feeSum; //费用合计(不含税)
            this.shouldInvoiceQty = allQueryInput.data.shouldInvoiceQty; //开票数量 (结算情况字段)
            this.shouldInvoicePrice = allQueryInput.data.shouldInvoicePrice; //开票单价
            this.shouldInvoiceAmt = allQueryInput.data.shouldInvoiceAmt; //开票金额
            this.discountRate = allQueryInput.data.discountRate; //折让/返利比例
            this.discountAmt = allQueryInput.data.discountAmt; //折让/返利金额
            //this.finalInvoiceAmt = allQueryInput.data.finalInvoiceAmt; //最终结算开票金额
            this.invoicedQty = allQueryInput.data.invoicedQty; //累计已开票数量
            this.invoicedAmt = allQueryInput.data.invoicedAmt; //累计已开票金额
            //this.invoiceAmt = allQueryInput.data.invoiceAmt; //本次开票金额
            this.receiptAmt = allQueryInput.data.receiptAmt; //累计已收款金额(含保证金)
            //this.shouldReceiptAmt = allQueryInput.data.shouldReceiptAmt; ////开票后应收金额
            //this.remainShouldPay = allQueryInput.data.remainShouldPay; //实际应支付货款（客户还需补货款）
            this.payedDesposit = allQueryInput.data.payedDesposit; //客户已付保证金金额(合同情况补充字段)
            this.payedBrought = allQueryInput.data.payedBrought; //客户已付货款金额
            this.poInvoiceFetched = allQueryInput.data.poInvoiceFetched; //供应商发票是否取回
            this.poInvoiceFetchDate = allQueryInput.data.poInvoiceFetchDate; //何时取回
            this.predictPayReturned = allQueryInput.data.predictPayReturned; //预付款余额是否退回
            this.predictPayReturnDate = allQueryInput.data.predictPayReturnDate; //何时退回
            this.supplierBalanceWay = allQueryInput.data.supplierBalanceWay; //供应商余额处理方式
            this.creattime1 = this.$timeFun(
              allQueryInput.data.createdTime,
              true
            );
            this.creatman1 = allQueryInput.data.createdName;
            this.creattime2 = this.$timeFun(
              allQueryInput.data.updatedTime,
              true
            );
            this.creatman2 = allQueryInput.data.updatedName;
             this.selectFileList(this.msgid);
          })
        );
        this.selectFileList(this.msgid);
    },
    //查询附件
    selectFileList(id) {
      let data = {
        businessId: id
      };
      uploadApi
        .selectFileList(data)
        .then(res => {
          if (res.code == "success") {
            this.uploadList.tableList = res.data;
            this.uploadList.tableList.forEach(element => {
              element.createdTime = this.$timeFun(element.createdTime, true);
            });
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
       //文件上传
    beforeUpload(file) {
      var that = this;
      let _this = this.uploadList;
      let formdata = new FormData();
      formdata.append("file", file); //传文件
      //formdata.append('_sysid_',_this.sysid);//传其他参数
      uploadApi.uploadFile(formdata).then(function(res) {
        if (res.code == "success") {
          _this.fileList = [];
          let fileData=res.data;
          let obj = {
            fileOldName: fileData.oldFilename,
            fileNewName: fileData.newFilename,
            fileType:"", //文件类型
            fileSuffix:fileData.fileExt,//文件扩展名
            // fileAbsolutePath:"",//文件绝对路径
            // fileRelativePaths:"",//文件相对路径
            fileServerAddress: fileData.filePath,//文件服务器地址
            createdTime: that.$nowDate(),
            isInactive:0,//启用，禁用
            createdName:sessionStorage.getItem("userName") || "admin",
          };
          _this.tableList.unshift(obj);
        }
      });
      return false;
    },
    //确定上传
    submitUpload() {
      //确定上传
      this.$refs.newupload.submit();
    },
    //移除
    handleRemove(file, fileList) {
    },
     //打印及附件表格
    dialogCheckTable() {},
    //打印及附件表格
    handleChangeTableTable() {},
    //查询附件
    selectFileList(id){
       let data = {
        businessId:this.msgid
      };
      uploadApi.selectFileList(data)
        .then(res => {
          if (res.code == "success") {
            this.uploadList.tableList=res.data;
            this.uploadList.tableList.forEach(element => {
               element.createdTime=this.$timeFun(element.createdTime, true);
            });
          } else {
            this.$openWarning(res.message);
          }
        }).catch();
    },
    //附件删除
    delFile(index,row){
       this.$confirm("是否确定删除？",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
      }).then(() => {
        //没有保存
        if(row.accessoryId){
          let data = {
            accessoryId:row.accessoryId,
            version:row.version
          };
          uploadApi.delFif(data)
            .then(res => {
              if (res.code == "success") {
              this.$openSuccess(res.message);
              this.uploadList.tableList.splice(index,1);
              //this.selectFileList(row.businessId);
              } else {
                this.$openWarning(res.message);
              }
            }).catch();
          }else{
            this.uploadList.tableList.splice(index,1);
            this.$openSuccess("删除成功");
          }
      }).catch();
    },
    //预览
    download(row){
      window.open(row.fileServerAddress);
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.companyName = e;
      this.branchName = "";
      if (this.bankmsg.length > 0) {
        this.bankmsg.forEach(i => {
          if (i.currencyId === "") {
            return;
          }
          pariList({
            formCurrencyId: i.currencyId,
            toCurrencyId: this.companyName.functionalCurrencyId
          }).then(res => {
            if (res.code === "success") {
              if (res.data.length > 0) {
                i.currencyRate = res.data[0].parities;
              }
              if (res.data.length === 0) {
                i.currencyRate = 1;
              }
              if (i.originAmt != "") {
                i.rmbAmt = i.currencyRate * i.originAmt;
              }
            }
          });
        });
      }
    },
    //公司弹窗打开
    componyTip() {
      if (this.opres) {
        return;
      }
      this.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.componyShow = false;
    },
    //部门弹窗打开
    departmentTip() {
      if (this.opres) {
        return;
      }
      // if (this.companyName == ``) {
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
    },
    //部门弹窗打开
    manTip() {
      this.manShow = true;
    },
    //部门弹窗关闭
    manCancle() {
      this.manShow = false;
    },
    //部门弹窗确定获取数据
    manSure(e) {
      this.manShow = false;
      this.manName = e;
    },
    //员工弹窗打开
    staffTip() {
      if (!this.operation) {
        return;
      }
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
      console.log(e);
    },
    //币种弹窗打开
    coinTip(e) {
      // if (this.bankmsg[e].goodsAmtDesc === "") {
      //   this.$openWarning("请先选择货款内容");
      //   return;
      // }
      this.coinShow = true;
      this.coinindex = e;
    },
    //币种弹窗关闭
    coinCancle() {
      this.coinShow = false;
    },
    //币种弹窗确定获取数据
    coinSure(e) {
      //currencyCode
      //currencyId
      this.coinShow = false;
      this.bankmsg[this.coinindex].paymentCurrency = e.currencyName;
      this.bankmsg[this.coinindex].currencyId = e.currencyId; //存支付币种id
      pariList({
        formCurrencyId: e.currencyId,
        toCurrencyId: this.companyName.functionalCurrencyId
      }).then(res => {
        console.log(res);
        if (res.code === "success") {
          if (res.data.length > 0) {
            this.bankmsg[this.coinindex].currencyRate = res.data[0].parities;
          }
          if (res.data.length === 0) {
            this.bankmsg[this.coinindex].currencyRate = 1;
          }
          if (this.bankmsg[this.coinindex].originAmt != "") {
            this.bankmsg[this.coinindex].rmbAmt =
              this.bankmsg[this.coinindex].currencyRate *
              this.bankmsg[this.coinindex].originAmt;
          }
        }
      });
    },
    htTip() {
      //合同弹窗
      if (!this.operation) {
        return;
      }
      this.htShow = true;
    },
    htSure(e) {
      console.log(e);
      if (e === "") {
        this.$openWarning("请先选择一条信息");
        return;
      }
      this.htmsg = e;
      this.htShow = false;
      paymentForm({ contractNo: e.contractNo }).then(res => {
        console.log(res);
        if (res.code === "success") {
            this.bankmsg=res.data;
            this.bankmsg.forEach(i=>{
              i.paymentDay = this.$timeFun(i.paymentDay, true);
            })
        }
      });
      queryMateriel({ contractId: e.contractId }).then(res => {
        console.log(res);
        if (res.code === "success") {
          if (res.data.length > 0) {
            this.goods = res.data[0].goodsName;
          }
        }
      });
      Settlement({contractNo: e.contractNo}).then(res=>{
        console.log(res);
        if(res.code === "success"){
          this.shouldInvoiceQty=res.data.shouldInvoiceQty;
          this.invoicedQty=res.data.invoicedQty;
          this.receiptAmt=res.data.receiptAmt;
          this.invoicedAmt=res.data.invoicedAmt
        }
      })
      suppleMent({contractNo: e.contractNo}).then(res=>{
        console.log(res);
        if(res.code === "success"){
          this.payedBrought=res.data.payedBrought;
          this.payedDesposit=res.data.payedDesposit
        }
      })
      costSituation({contractNo: e.contractNo}).then(res=>{
        console.log(res);
        if(res.code === "success"){
          this.carriageRailwayVat=this.carriageRailway=res.data.carriageRailway
          this.bankFeeVat=this.bankFee=res.data.bankFee
          this.portOtherFeeVat=this.portOtherFee=res.data.portOtherFee
          this.carriageCarVat=this.carriageCar=res.data.carriageCar
          this.carriageSeaVat=this.carriageSea=res.data.carriageSea
          this.whFeeVat=this.whFee=res.data.whFee
          this.suranceFeeVat=this.suranceFee=res.data.suranceFee
          this.acceptProfitDeductVat=this.acceptProfitDeduct=res.data.acceptProfitDeduct
          this.declareAmtVat=this.declareAmt=res.data.declareAmt
          this.profitAddAmtVat=this.profitAddAmt=res.data.profitAddAmt
          this.proxyFeeVat=this.proxyFee=res.data.proxyFee
        }
      })
      queryBusiness({contractNo: e.contractNo}).then(res=>{
          console.log(res);
          this.taxAmtAdd=res.data.taxAmtAdd;
          this.taxGateway=res.data.taxGateway;
          this.taxAmt=res.data.taxAmt;
          this.goodsAmtOrigin=res.data.goodsAmtOrigin;
          this.goodsAmtRmb=res.data.goodsAmtRmb;
      })
      if (this.outtime != "") {//利息贴现加载
          discountInterest({
            contractNo: e.contractNo,
            balanceDate: this.outtime
          }).then(res => {
            console.log(res);
            if (res.code === "success") {
              this.interestable = res.data;
              if(res.data.length!=0){
                this.profitAddAmtVat=this.profitAddAmt=res.data[res.data.length-1].dayProfit
              }
            }
          });
        }
      salesDetail({ contractNo: e.contractNo }).then(res => {//销售明细加载
            console.log(res);
            if (res.code === "success") {
              this.salesmsg = res.data;
              this.salesmsg.forEach(i=>{
                i.beginDate = this.$timeFun(i.beginDate, true);
                i.wvDate = this.$timeFun(i.wvDate, true);
                i.soDate = this.$timeFun(i.soDate, true);
                this.ywlx.forEach(k=>{
                  if(i.bizType==k.dict_code){
                    i.bizType=k.dict_value
                  }
                })
              })
            }
          });
    },
    htCancle() {
      this.htShow = false;
    },
    datachange(){//结算日期发生更改加载贴现利息
      if(this.htmsg.contractNo!=undefined){
        discountInterest({
            contractNo: this.htmsg.contractNo,
            balanceDate: this.outtime
          }).then(res => {
            console.log(res);
            if (res.code === "success") {
              this.interestable = res.data;
              if(res.data.length!=0){
                this.profitAddAmtVat=this.profitAddAmt=res.data[res.data.length-1].dayProfit
              }
            }
          });
      }
    },
    ybjechange(e) {
      //原币金额汇率改变
      if (this.bankmsg[e].paymentCurrency === "") {
        this.bankmsg[e].originAmt = this.bankmsg[e].currencyRate = "";
        this.$openWarning("请先选择币种");
        return;
      }
      console.log(e);
      if (
        this.bankmsg[e].originAmt != "" &&
        this.bankmsg[e].currencyRate != ""
      ) {
        this.bankmsg[e].rmbAmt =
          this.bankmsg[e].originAmt * this.bankmsg[e].currencyRate;
      } else {
        this.bankmsg[e].rmbAmt = "";
      }
    },
    bankChange(e) {
      //表格选择
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    bankclick(e) {
      //表格双击
      if (!this.operation) {
        return;
      }
      let index = this.bankmsg.indexOf(e);
      this.bankmsg.forEach(item => {
        item.edit = false;
      });
      this.bankmsg[index].edit = true;
      this.$set(this.bankmsg, index, e);
    },
    dialogChecks(selection, row) {
      //表格选择
      if (selection.length === 0) {
        // 判断selection是否有值存在
        this.bankreduces = [];
        return;
      }
      this.bankreduces = row;
      this.$refs.multipleTables.clearSelection();
      if (row) {
        this.selectioned = row;
        this.index = this.bankmsg.indexOf(row);
        this.bankindex = this.index;
        this.$refs.multipleTables.toggleRowSelection(row, true);
      }
    },
    bankadd() {
      //表格增加
      if (!this.operation) {
        return;
      }
      if (this.companyName === "") {
        this.$openWarning("请先选择公司");
        return;
      }
      this.bankmsg.forEach(item => {
        item.edit = false;
      });
      let obj = {
        goodsAmtDesc: "",
        paymentDay: "",
        paymentCurrency: "",
        originAmt: "",
        currencyRate: "",
        rmbAmt: "",
        currencyId: "", //支付币种id
        edit: true
      };
      let newtable = [];
      newtable.unshift(obj);
      this.bankmsg = newtable.concat(this.bankmsg);
      this.bankreduces = [];
    },
    bankreduce() {
      //表格删除
      if (!this.operation) {
        return;
      }
      console.log(this.bankreduces);

      if (this.bankreduces.length === 0) {
        this.$message({
          message: "请先选择一条数据",
          type: "warning"
        });
        return;
      }
      console.log(this.bankreduces);
      let kbbankreduces=JSON.parse(JSON.stringify(this.bankreduces))
      this.contacts.forEach(j=>{
        if(j.dict_value===kbbankreduces.goodsAmtDesc){
          kbbankreduces.goodsAmtDesc=j.dict_key
        }
      })
      let arr=[];
      arr.push(kbbankreduces)
      if (this.bankreduces.settleId === undefined) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.bankmsg.splice(this.bankindex, 1);
        this.bankreduces = [];
      } else {
        this.$confirm("是否确定删除继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          reducemsg(
            arr
          ).then(res => {
            if (res.code === "success") {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.bankmsg.splice(this.bankindex, 1);
              this.bankreduces = [];
            }
          });
        });
        console.log(123);
      }
    },
    savemsg(param) {
      //保存数据
      wareSave(param).then(res => {
        if (res.code === "success") {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.$router.push({
            name: "settlementSheet"
          });
        }
      });
    },
    savebtn() {
      //保存新增
      this.errorKey = [];
      if (this.companyName === "") {
        this.errorKey.push('companyName');
      }
      if (this.branchName === "") {
        this.errorKey.push('branchName');
      }
      if (this.staffName === "") {
        this.errorKey.push('staffName');
      }
      if (this.htmsg === "") {
        this.errorKey.push('htmsg');
      }
      if (this.outtime === ""||this.outtime===null) {
        this.errorKey.push('outtime');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning("请将必填项补充完整！");
        return false;
      }
      if(this.bankmsg.length>0){
        let hknr=[];//货款内容
      let fhday=[];//付汇日
      let moneycoin=[];//支付币种
      let ybje=[];//原币金额
      let hlue=[];//汇率
      let rmbmoney=[];//折合人民币金额
      this.bankmsg.forEach(i=>{
        hknr.push(i.goodsAmtDesc);
        fhday.push(i.paymentDay);
        moneycoin.push(i.paymentCurrency);
        ybje.push(i.originAmt);
        hlue.push(i.currencyRate);
        rmbmoney.push(i.rmbAmt);
      })
      if (hknr.indexOf("") != -1) {
        this.$openWarning("货款内容不能为空");
        return;
      }
      if (fhday.indexOf("") != -1||fhday.indexOf(null)!=-1) {
        this.$openWarning("付汇日不能为空");
        return;
      }
      if (moneycoin.indexOf("") != -1) {
        this.$openWarning("支付币种不能为空");
        return;
      }
      if (ybje.indexOf("") != -1) {
        this.$openWarning("原币金额不能为空");
        return;
      }
      if (hlue.indexOf("") != -1) {
        this.$openWarning("汇率不能为空");
        return;
      }
      if (rmbmoney.indexOf("") != -1) {
        this.$openWarning("折合人民币金额不能为空");
        return;
      }
      }
      let kbbankmsg = JSON.parse(JSON.stringify(this.bankmsg));
      let param = {
        companyCode: this.companyName.companyCode,//公司
        companyName: this.companyName.companyName,
        companyId: this.companyName.companyId,
        orgCode: this.branchName.branchCode,//部门
        orgName: this.branchName.branchName,
        orgId: this.branchName.branchId,
        bizPersonName: this.staffName.empName,//业务员
        bizPersonCode: this.staffName.empCode,
        contractNoPs:this.htmsg.contractNo,//erp合同号
        supplierName:this.htmsg.supplierName,//供应商
        supplierCode:this.htmsg.supplierCode,
        supplierId:this.htmsg.supplierId,
        custName:this.htmsg.custName,//销售客户
        custCode:this.htmsg.custCode,
        custId:this.htmsg.custId,
        balanceDate: this.outtime,//结算日期
        goodsName:this.goods,//品名
        balanceQty:this.rksl,//结算数量
        //船名
        status:this.mytype,//单据状态
        remark:this.rkbz,//备注
        taxAmt:this.taxAmt,//税款（增值税）
        taxAmtAdd:this.taxAmtAdd,//税款（增值税补税）
        taxGateway:this.taxGateway,////税款（关税）
        //taxSumAmt:this.taxSumAmt,//税款合计
        goodsAmtOrigin:this.goodsAmtOrigin,//货款（内贸付款总额）
        goodsAmtRmb:this.goodsAmtRmb,//人民币金额
        carriageSeaVat:this.carriageSeaVat,//运费（海运）(含税)
        carriageCarVat:this.carriageCarVat,//运费（汽运）(含税)
        carriageRailwayVat:this.carriageRailwayVat,//运费（铁运）(含税)
        portOtherFeeVat:this.portOtherFeeVat,//港杂费(含税)
        declareAmtVat:this.declareAmtVat,//报关费(含税)
        suranceFeeVat:this.suranceFeeVat,//保险费(含税)
        bankFeeVat:this.bankFeeVat,//银行手续费(含税)
        acceptProfitDeductVat:this.acceptProfitDeductVat,//承诺贴息(含税)
        proxyFeeVat:this.proxyFeeVat, //代理费(含税)
        profitAddAmtVat:this.profitAddAmtVat,//利息（收益）(含税)
        whFeeVat:this.whFeeVat,//仓储费(含税)
        //feeSumVat:this.feeSumVat,//费用合计(含税)
        carriageSea:this.carriageSea,//运费（海运）(不含税)
        carriageCar:this.carriageCar,//运费（汽运）(不含税)
        carriageRailway:this.carriageRailway,//运费（铁运）(不含税)
        portOtherFee:this.portOtherFee, //港杂费(不含税)
        declareAmt:this.declareAmt,//报关费(不含税)
        suranceFee:this.suranceFee,//保险费(不含税)
        bankFee:this.bankFee,//银行手续费(不含税)
        acceptProfitDeduct:this.acceptProfitDeduct,//承诺贴息(不含税)
        proxyFee:this.proxyFee,//代理费(不含税)
        profitAddAmt:this.profitAddAmt,//利息（收益）(不含税)
        whFee:this.whFee,//仓储费(不含税)
        //feeSum:this.feeSum,//费用合计(不含税)
        shouldInvoiceQty:this.shouldInvoiceQty,//开票数量 (结算情况字段)
        shouldInvoicePrice:this.shouldInvoicePrice,// 开票单价
        shouldInvoiceAmt:this.shouldInvoiceAmt,//开票金额
        discountRate:this.discountRate,//折让/返利比例
        discountAmt:this.discountAmt,//折让/返利金额
        //finalInvoiceAmt:this.finalInvoiceAmt,//最终结算开票金额
        invoicedQty:this.invoicedQty,//累计已开票数量
        invoicedAmt:this.invoicedAmt,//累计已开票金额
        //invoiceAmt:this.invoiceAmt,//本次开票金额
        receiptAmt:this.receiptAmt,//累计已收款金额(含保证金
        //shouldReceiptAmt:this.shouldReceiptAmt,//开票后应收金额
        //remainShouldPay:this.remainShouldPay,//实际应支付货款（客户还需补货款）
        payedDesposit:this.payedDesposit,//客户已付保证金金额(合同情况补充字段)
        payedBrought:this.payedBrought,//客户已付货款金额
        poInvoiceFetched:this.poInvoiceFetched,//供应商发票是否取回
        poInvoiceFetchDate:this.poInvoiceFetchDate,//何时取回
        predictPayReturned:this.predictPayReturned,//预付款余额是否退回
        predictPayReturnDate:this.predictPayReturnDate,//何时退回
        supplierBalanceWay:this.supplierBalanceWay,//供应商余额处理方式
        soSettleDetailList:this.salesmsg,//销售明细
        soSettlePaymentInfoList:this.bankmsg,//付款信息
        soSettleProfitDiscountList:this.interestable,//利息贴现
        sysSystemAccessoryList:this.uploadList.tableList,//附件上传
      };
      if (this.msgid === undefined) {
        this.savemsg(param);
      } else {
        (param.settleId = this.msgid), (param.version = this.version);
        this.savemsg(param);
      }
    },
    cancelbtn() {
      //取消新增
      this.$router.push({
        name: "settlementSheet"
      });
    }
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    interstTable,
    coinSelect,
    bilateralSelect,
    salesDetails,
    'v-exmineStatus': ExmineStatus
  }
};
</script>

<style lang="scss">
#settlementCreat {
  .el-input-group__append {
    padding: 0 2px;
  }
  .el-select .el-input__inner,
  .el-input .el-input__inner {
    font-size: 12px !important;
  }
  .el-select:hover .el-input__inner {
    border-color: #97999e !important;
  }
  .el-input--small .el-input__inner {
    border-color: #97999e !important;
  }
  textarea {
    border-color: #909399 !important;
  }
  .el-input__icon {
    height: 24px;
    line-height: 24px;
  }
  .el-textarea__inner {
    width: 100% !important;
    height: 30px!important;
  }
  .el-divider__text {
    font-weight: bold;
  }
  .index-div {
    .el-inputs,
    .el-date-editor,
    .el-select {
      width: 52% !important;
    }
    label {
      width: 48%;
    }
  }
}
</style>
