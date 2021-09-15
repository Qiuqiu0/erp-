<template>
  <div id="otherComing">
    <!-- 按钮 -->
    <div class="button-div">
      <el-button v-show="!look" icon="el-icon-suitcase" @click="savebtn">保存</el-button>
      <el-button v-show="!look" icon="el-icon-close" @click="cancelbtn">取消</el-button>
      <el-button v-show="look" icon="el-icon-back" @click="cancelbtn">返回</el-button>
    </div>
    <el-divider></el-divider>
    <!-- 标签页 -->
    <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <!-- 基本信息 -->
        <el-tab-pane label="基本信息" name="first">
          <div class="input-div" id="yhglmsg" style="padding-bottom:30px">

              <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>公司</label>
                <el-input
                  v-model="companyName.companyName"
                  class="el-inputs"
                  :class="errorKey.includes('companyName') ? 'inputRed' : ''"
                  placeholder="请选择"
                  aria-required
                  disabled
                ></el-input>
                <span class="comicon" @click="componyTip"
                  ><i class="el-icon-search"></i
                ></span>
              </el-col>
              <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>部门</label>
                <el-input
                  v-model="branchName.branchName"
                  class="el-inputs"
                  :class="errorKey.includes('branchName') ? 'inputRed' : ''"
                  placeholder="请选择"
                  disabled
                >
                </el-input>
                <span class="comicon" @click="departmentTip"
                  ><i class="el-icon-search"></i
                ></span>
              </el-col>
              <el-col :span="5" class="el-col el-col-required">
                    <label><span class="must-full">*</span>业务员</label>
                    <el-input v-model="staffName.empName" size="small" class="el-inputs"
                    :class="errorKey.includes('staffName') ? 'inputRed' : ''"
                      placeholder="请选择" disabled></el-input>
                    <span class='comicon' @click="staffTip"><i class="el-icon-search" ></i></span>
              </el-col>
              <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>信用证号</label>
                <el-input
                  v-model="lcReceiveCode"
                  class="el-inputs"
                  :class="errorKey.includes('lcReceiveCode') ? 'inputRed' : ''"
                  placeholder="请选择"
                  :disabled="look||claim||collections"
                >
                </el-input>
              </el-col>
              <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>信用证流水号</label>
                <el-input
                  v-model="lcFlowCode"
                  class="el-inputs"
                  :class="errorKey.includes('lcFlowCode') ? 'inputRed' : ''"
                  placeholder="保存后自动生成"
                  disabled
                >
                </el-input>
              </el-col>


              <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>信用证类别</label>
                <el-select
                  clearable
                  v-model="lcDueType"
                  placeholder="请选择"
                  class="el-select"
                  :class="errorKey.includes('lcDueType') ? 'inputRed' : ''"
                  @change="changefhtype"
                  :disabled="look||claim||collections"
                >
                  <el-option
                    v-for="item in fhtypearr"
                    :key="item.dict_code"
                    :label="item.dict_value"
                    :value="item.dict_code"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>信用证金额</label>
                <el-input
                  v-model="lcAmt"
                  class="el-inputs"
                  :class="errorKey.includes('lcAmt') ? 'inputRed' : ''"
                  placeholder="请输入"
                  :disabled="look||claim||collections"
                ></el-input>
              </el-col>
              <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>币种</label>
                <el-input v-model="coin.currencyCode" class="el-inputs"
                 :class="errorKey.includes('coin') ? 'inputRed' : ''" placeholder="请选择" disabled></el-input>
                <span class="comicon" v-if="coin.currencyCode" @click="coin = {}">
                  <i class="el-icon-circle-close"></i>
                </span>
                <span class="comicon" @click="coinTip"
                  ><i class="el-icon-search"></i
                ></span>
              </el-col>
              <el-col :span="5" class="el-colc el-col-required">
                <label><span class="must-full">*</span>收证日期</label>
                <el-date-picker
                :class="errorKey.includes('lcReceiveDate') ? 'inputRed' : ''"
                    v-model="lcReceiveDate"
                    type="date"
                    placeholder="选择日期"
                    value-format="timestamp"
                    :disabled="look||claim||collections"
                >
                </el-date-picker>
              </el-col>



              <el-col :span="5" class="el-colc el-col-required">
                <label><span class="must-full">*</span>开证日期</label>
                <el-date-picker
                  class="el-input2"
                  :class="errorKey.includes('lcIssueDate') ? 'inputRed' : ''"
                    v-model="lcIssueDate"
                    type="date"
                    placeholder="选择日期"
                    value-format="timestamp"
                  :disabled="look||claim||collections"
                >
                </el-date-picker>
              </el-col>
              <el-col :span="5" class="el-colc el-col-required">
                <label><span class="must-full">*</span>装运期限</label>
                <el-date-picker
                  class="el-input2"
                  :class="errorKey.includes('deadlineLoaddate') ? 'inputRed' : ''"
                    v-model="deadlineLoaddate"
                    type="date"
                    placeholder="选择日期"
                    value-format="timestamp"
                  :disabled="look||claim||collections"
                >
                </el-date-picker>
              </el-col>
              <el-col :span="5" class="el-colc el-col-required">
                <label><span class="must-full">*</span>有效期限</label>
                <el-date-picker
                  class="el-input2"
                  :class="errorKey.includes('effectiveDate') ? 'inputRed' : ''"
                    v-model="effectiveDate"
                    type="date"
                    placeholder="选择日期"
                    value-format="timestamp"
                  :disabled="look||claim||collections"
                >
                </el-date-picker>
              </el-col>
              <el-col :span="5" class="el-col">
                <label>溢短装比例%</label>
                <el-input
                  v-model="overShortageRate"
                  class="el-inputs"
                  placeholder="请输入"
                  :disabled="look||claim||collections"
                ></el-input>
              </el-col>
              <bank-select
                :labelName="'开证行'"
                class="el-col el-col-5 el-col-required"
                :class="errorKey.includes('lcBank') ? 'inputRed' : ''"
                required
                :disable="look||claim||collections"
                :bank.sync="lcBank"
              ></bank-select>
              <bank-select
                :labelName="'付款行'"
                class="el-col el-col-5"
                :disable="look||claim||collections"
                :bank.sync="payBank"
              ></bank-select>
              <bank-select
                :labelName="'通知行'"
                class="el-col el-col-5"
                :disable="look||claim||collections"
                :bank.sync="noticeBank"
              ></bank-select>
              <el-col :span="5" class="el-col">
                <label>认领标识</label>
                <el-select
                  clearable
                  v-model="claimSign"
                  placeholder="请选择"
                  class="el-select"
                  disabled
                >
                  <el-option
                    v-for="item in trueOr"
                    :key="item.dict_code"
                    :label="item.dict_value"
                    :value="item.dict_code"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <bank-select
                :labelName="'议付行'"
                class="el-col el-col-5"
                :disable="look||claim||collections"
                :bank.sync="negotiateBank"
              ></bank-select>
              <el-col :span="5" class="el-col">
                <label>开证人</label>
                <el-input
                  v-model="lcBy"
                  class="el-inputs"
                  placeholder="请输入"
                  :disabled="look||claim||collections"
                ></el-input>
              </el-col>
              <!--付款单位选择-->
              <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>付款单位</label>
                <el-input
                  v-model="customerName.customerName"
                  class="el-inputs"
                  :class="errorKey.includes('customerName') ? 'inputRed' : ''"
                  placeholder="请选择"
                  disabled
                ></el-input>
                <span class="comicon" @click="customerPopup"
                  ><i class="el-icon-search"></i
                ></span>
              </el-col>
              <el-col :span="5" class="el-col">
                <label>价格条款</label>
                <el-select
                  clearable
                  v-model="pricingTerm"
                  placeholder="请选择"
                  class="el-select"
                  :disabled="look||claim||collections"
                >
                  <el-option
                    v-for="item in price"
                    :key="item.dict_code"
                    :label="item.dict_value"
                    :value="item.dict_code"
                  >
                  </el-option>
                </el-select>
              </el-col>



              <el-col :span="5" class="el-col">
                <label>单据状态</label>
                <el-select
                  clearable
                  v-model="lcStatus"
                  placeholder="请选择"
                  class="el-select"
                  @change="changefhtype"
                  disabled
                >
                  <el-option
                    v-for="item in xyzStatus"
                    :key="item.dict_code"
                    :label="item.dict_value"
                    :value="item.dict_code"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5" class="el-col">
                <label>信用证属性</label>
                <el-select
                  clearable
                  v-model="lcProperty"
                  placeholder="请选择"
                  class="el-select"
                  :disabled="look||claim||collections"
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
              <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>信用证性质</label>
                <el-select
                  clearable
                  v-model="lcType"
                  placeholder="请选择"
                  class="el-select"
                  :class="errorKey.includes('lcType') ? 'inputRed' : ''"
                  @change="changerkd"
                  :disabled="look||claim||collections"
                >
                  <el-option
                    v-for="item in xyzMessage"
                    :key="item.dict_code"
                    :label="item.dict_value"
                    :value="item.dict_code"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5" class="el-col">
                <label>信用证天数</label>
                <el-input
                  v-model="lcDays"
                  class="el-inputs"
                  placeholder="请输入"
                  :disabled="look||claim||collections||lcDay"
                ></el-input>
              </el-col>



              <el-col :span="5" class="el-colc">
                <label>交单截止日</label>
                <el-date-picker
                  class="el-input2"
                    v-model="deliveryDate"
                    type="date"
                    placeholder="选择日期"
                    value-format="timestamp"
                  :disabled="look||claim||collections"
                >
                </el-date-picker>
              </el-col>
              <el-col :span="5" class="el-col">
                <label>打包贷款行</label>
                <el-input
                  v-model="packageLoanBank"
                  class="el-inputs"
                  placeholder="请输入"
                  :disabled="look||claim||collections"
                ></el-input>
              </el-col>
              <el-col :span="5" class="el-colc">
                <label>打包贷款日期</label>
                <el-date-picker
                  class="el-input2"
                    v-model="packageLoanDate"
                    type="date"
                    placeholder="选择日期"
                    value-format="timestamp"
                  :disabled="look||claim||collections"
                >
                </el-date-picker>
              </el-col>
              <el-col :span="5" class="el-col">
                <label>打包贷款金额</label>
                <el-input
                  v-model="packageLoanAmt"
                  class="el-inputs"
                  placeholder="请输入"
                  :disabled="look||claim||collections"
                ></el-input>
              </el-col>
              <el-col :span="5" class="el-col">
               <label>打包到期日期</label>
                <el-date-picker
                  class="el-input2"
                    v-model="packageLoanDeadline"
                    type="date"
                    placeholder="选择日期"
                    value-format="timestamp"
                  :disabled="look||claim||collections"
                >
                </el-date-picker>
              </el-col>
              <el-col :span="5" class="el-col">
               <label>认领过账日期</label>
                <el-date-picker
                  class="el-input2"
                    v-model="reclaimDate"
                    type="date"
                    value-format="timestamp"
                  disabled
                >
                </el-date-picker>
              </el-col>
              <el-col :span="5" class="el-col">
               <label>认领冲销日期</label>
                <el-date-picker
                  class="el-input2"
                    v-model="reclaimWriteoffDate"
                    type="date"
                    value-format="timestamp"
                  disabled
                >
                </el-date-picker>
              </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label required>认领附件数量</label>
              <el-input
                v-model="attachmentCountShared"
                v-input-filter:int
                :disabled="look||claim||collections"
                type="number"
                class="el-inputs"
                :class="errorKey.includes('attachmentCountShared') ? 'inputRed' : ''"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label required>收款附件数量</label>
              <el-input
                v-model="attachmentCountReceived"
                :disabled="look||claim||collections"
                v-input-filter:int
                type="number"
                class="el-inputs"
                :class="errorKey.includes('attachmentCountReceived') ? 'inputRed' : ''"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <div v-show="look">
              <el-col :span="5" class="el-col">
                  <label>凭证号</label>
                  <el-input v-model="warrantCode"
                          class="el-inputs"
                          size="small"
                          disabled></el-input>
              </el-col>
              <el-col :span="5" class="el-col">
                  <label>期间</label>
                  <el-date-picker
                          type="month"
                          size="small"
                          v-model="warrantMonth"
                          disabled
                          value-format="yyyyMM"
                          >
                  </el-date-picker>
              </el-col>
              <el-col :span="5" class="el-col">
                  <label>冲销凭证号</label>
                  <el-input v-model="writeoffWarrantCode"
                              class="el-inputs"
                              size="small"
                              disabled></el-input>
              </el-col>
              <el-col :span="5" class="el-col">
                  <label>冲销期间</label>
                  <el-date-picker
                      type="month"
                      size="small"
                      v-model="writeoffWarrantMonth"
                      disabled
                      value-format="yyyyMM"
                      >
                  </el-date-picker>
              </el-col>
            </div>
            <el-col
              :span="20"
              class="el-col"
              style="text-align:left;padding-left:10px;padding-bottom:20px;"
            >
              <label style="width: 8.5%;text-align:right;">备注</label>
              <el-input
                style="width: 49%;"
                v-model="remark"
                class="el-inputs"
                size="small"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入内容"
                  :disabled="look||claim||collections"
              ></el-input>
            </el-col>
          </div>
        </el-tab-pane>
        <!-- 打印与附件 -->
        <!-- <el-tab-pane label="打印及附件" name="second" style="height:260px"
          >打印附件</el-tab-pane
        > -->
        <!-- 系统信息 -->
        <el-tab-pane label="系统信息" name="third" style="height:260px">
          <div class="input-div" id="xtridate">
            <el-col :span="5" class="el-col">
              <label>创建日期</label>
              <el-date-picker
                v-model="createdTime"
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
                v-model="createdBy"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>修改日期</label>
              <el-date-picker
                v-model="updatedTime"
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
                v-model="updatedBy"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-divider></el-divider>
    <!-- 选择公司弹窗 -->
    <compony-select
      v-if="componyShow"
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
        @departmentCancle="departmentCancle"
        @departmentSure="departmentSure"
      >
      </department-select>
       <!-- 选择业务员弹窗 -->
      <staff-select v-if="staffShow" :tipShow='staffShow' :data={} @staffCancle="staffCancle" @staffSure="staffSure">
      </staff-select>
    <!-- 选择客户弹窗 -->
      <customer-select
       v-if="customerShow"
       :tipShow="customerShow"
       @customerCancle="customerCancle"
        @customerSure="customerSure">
      </customer-select>
      <!-- 选择合同弹窗 -->
      <contract-Sale
        v-if="contract"
        :tipShow="contract"
        :custName= "custId"
        :payGatheringWay="10210020"
        :companyName="companyName.companyId"
        @contractClose="contractClose"
        @contractTrue="contractTrue"
      ></contract-Sale>
      <!-- 选择银行 -->
      <company-bank-popup
        v-if="companyBankShow"
        :companyId="companyName.companyId"
        :tipShow="companyBankShow"
        @tipsCancle="companyBankCancle"
        @tipsSure="companyBankSure"
      ></company-bank-popup>
      <!-- 选择科目 -->
      <subject-frame
        v-if="subject"
        :tipShow="subject"
        :longNumber ="longNumber"
        @subjectCancle="subjectCancle"
        @subjectSure="subjectSure"
      ></subject-frame>
      <!-- 选择流量 -->
      <flow-code
        v-if="flow"
        :tipShow="flow"
        @flowCancle="flowCancle"
        @flowSure="flowSure"
      ></flow-code>
      <!-- 选择币种弹窗 -->
    <coin-select v-if="coinShow" :tipShow="coinShow" @coinCancle="coinCancle" @coinSure="coinSure"></coin-select>
    <el-tabs class="el-tabs" type="card" v-model="currSubTab" :before-leave="jumpToShare" v-show="collections||look">
      <el-tab-pane label="信用证认领信息" name="cost">
        <el-table
          :data="tableData"
          class="el-table"
          border
          max-height="288"
          ref="multipleTable"
          @select-all="expandChange"
          @select="expandChange"
          @selection-change="bankChange"
        >
          <el-table-column type="selection" width="55" :disabled="look||claimStatus"> </el-table-column>
          <el-table-column type="index" label="序号" width="55" :disabled="look"> </el-table-column>
          <el-table-column prop="soContractId" label="合同号">
            <template slot-scope="scope">
              <div class="par_rela">
                <el-input v-model="scope.row.soContractId" placeholder="请选择" disabled></el-input>
                <span class="comicon2" @click="contractS(scope.$index)">
                  <i class="el-icon-search"></i>
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="extInvoiceNo" label="外销发票号">
            <template slot-scope="scope">
              <div><el-input :disabled="look||claimStatus" v-model="scope.row.extInvoiceNo" placeholder="请输入"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="contractAmtVat" label="认领金额">
            <template slot-scope="scope">
              <div><el-input :disabled="look||claimStatus" v-model="scope.row.contractAmtVat" placeholder="请输入"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="extCode" label="外部合同号" >
            <template slot-scope="scope">
              <div><el-input disabled v-model="scope.row.extCode" placeholder="请输入"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="custName" label="客户名">
            <template slot-scope="scope">
              <div><el-input disabled v-model="scope.row.custName" placeholder="请输入"></el-input>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="信用证收款" name="share">
        <div class="button-div" v-show="collections&&!look">
          <el-button  icon="el-icon-plus" @click="bankadd(2)">增加行</el-button>
          <el-button  icon="el-icon-minus" @click="bankreduce(2)">删除行</el-button>
        </div>
          <el-table
              :data="tableDataS"
              class="el-table"
              ref="multipleTableS"
              border
              max-height="288"
              @select-all="expandChange"
              @select="expandChange"
              @selection-change="bankChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column type="index" label="序号" width="55"> </el-table-column>
            <el-table-column prop="receiptCurrencyRate" label="收款汇率" width="150">
                <template slot-scope="scope">
                  <div><el-input :disabled="look||scope.row.unMark" v-model="scope.row.receiptCurrencyRate" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="netReceipt" label="收款净额" width="150">
                <template slot-scope="scope">
                  <div><el-input :disabled="look||scope.row.unMark" v-model="scope.row.netReceipt" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="netReceiptRmb" label="收款净额本位币" width="150">
                <template slot-scope="scope">
                  <div>{{ scope.row.receiptCurrencyRate*scope.row.netReceipt}}</div>
                  <!-- <div><el-input :disabled="look" v-model="scope.row.netReceiptRmb" placeholder="请输入"></el-input>
                  </div> -->
                </template>
              </el-table-column>
              <el-table-column prop="receiptBankName" label="收款银行" width="150">
              <template slot-scope="scope">
                <div class="par_rela">
                  <el-input size="mini" disabled :value="scope.row.receiptBankName" placeholder="请选择"></el-input>
                  <span class="comicon2" @click="companyBankTip(scope.$index)">
                  <i class="el-icon-search"></i></span>
                </div>
              </template>
            </el-table-column>
              <el-table-column prop="accountIdentificatio" label="银行账号" width="150">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.accountIdentificatio" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="bankAccount" label="银行科目" width="300">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.bankAccount" placeholder="请输入"></el-input>
                  <span class="comicon2" @click="getSubject(scope.$index,1)">
                    <i class="el-icon-search"></i></span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="cashFlowCode" label="现金流量代码" width="150">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.cashFlowCode" placeholder="请输入"></el-input>
                  <span class="comicon2" @click="getFlow(scope.$index,1)">
                    <i class="el-icon-search"></i></span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="currencyDeductionForeign" label="外币扣费" width="150">
                <template slot-scope="scope">
                  <div><el-input  :disabled="look||scope.row.unMark" v-model="scope.row.currencyDeductionForeign" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="deductionAccountF" label="外币扣费科目"  width="300">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.deductionAccountF" placeholder="请输入"></el-input>
                  <span class="comicon2" @click="getSubject(scope.$index,2)">
                    <i class="el-icon-search"></i></span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="incomeAccount" label="本币扣费" width="150">
                <template slot-scope="scope">
                  <div><el-input :disabled="look||scope.row.unMark" v-model="scope.row.incomeAccount" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="deductionBankAccountF" label="本币扣费科目" width="300">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.deductionBankAccountF" placeholder="请输入"></el-input>
                  <span class="comicon2" @click="getSubject(scope.$index,3)">
                    <i class="el-icon-search"></i></span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="deductionBankName" label="本币扣费银行" width="150">
                <template slot-scope="scope">
                  <div>
                    <el-input :disabled="look||scope.row.unMark" v-model="scope.row.deductionBankName" placeholder="请输入"></el-input>
                    <span class="comicon2" @click="companyBankTip(scope.$index,1)">
                    <i class="el-icon-search"></i></span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="deductionAccountIdentificati" label="本币扣费银行账号" width="150">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.deductionAccountIdentificati" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="deductionBankAccount" label="本币扣费银行科目" width="300">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.deductionBankAccount" placeholder="请输入"></el-input>
                  <span class="comicon2" @click="getSubject(scope.$index,4)">
                    <i class="el-icon-search"></i></span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="cashFlowCodeCost" label="现金流量代码（费用）" width="150">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.cashFlowCodeCost" placeholder="请输入"></el-input>
                  <span class="comicon2" @click="getFlow(scope.$index,2)">
                    <i class="el-icon-search"></i></span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="receiptDate" label="收款日期" width="150">
                <template slot-scope="scope">
                  <div><el-input :disabled="look||scope.row.unMark" v-model="scope.row.receiptDate" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="postDate" label="过账日期" width="150">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.postDate" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="exportInvoiceCode" label="外销发票号" width="150">
                <template slot-scope="scope">
                  <div><el-input :disabled="look||scope.row.unMark" v-model="scope.row.exportInvoiceCode" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="accountingCertificateCode" label="过账凭证号" width="150">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.accountingCertificateCode" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="accountingCertificateCodeCo" label="费用过账凭证号" width="150">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.accountingCertificateCodeCo" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="virtualMark" label="虚拟标识" width="150">
                <template slot-scope="scope">
                  <div><el-checkbox :disabled="look||scope.row.unMark" v-model="scope.row.virtualMark">&nbsp;</el-checkbox>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="postMark" label="过账标志" width="150">
                <template slot-scope="scope">
                  <div><el-checkbox disabled v-model="scope.row.postMark">&nbsp;</el-checkbox>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注" width="150">
                <template slot-scope="scope">
                  <div><el-input :disabled="look||scope.row.unMark" v-model="scope.row.remark" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="certStatus" label="凭证标识" width="150">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.certStatus" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="writeoffCertificateCode" label="冲销凭证号" width="150">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.writeoffCertificateCode" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="costWriteoffCertificateCod" label="费用冲销凭证号" width="150">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.costWriteoffCertificateCod" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="writeOff" label="冲销日期" width="150">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.writeOff" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="writeOffReason" label="冲销原因" width="150">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.writeOffReason" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
          </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-tabs class="el-tabs" type="card" v-model="currSubTab" v-show="claim">
      <el-tab-pane label="信用证认领信息" name="cost">
        <div class="button-div">
          <el-button  icon="el-icon-plus" @click="bankadd(1)">增加行</el-button>
          <el-button  icon="el-icon-minus" @click="bankreduce(1)">删除行</el-button>
        </div>
        <el-table
          :data="tableData"
          class="el-table"
          ref="multipleTable"
          border
          max-height="288"
          @select-all="expandChange"
          @select="expandChange"
          @selection-change="bankChange"
        >
          <el-table-column type="selection" width="55" :disabled="claimStatus"> </el-table-column>
          <el-table-column type="index" label="序号" width="55" :disabled="look"> </el-table-column>
          <el-table-column prop="soContractId" label="合同号">
            <template slot-scope="scope">
              <div class="par_rela">
                <el-input v-model="scope.row.soContractId" placeholder="请选择" disabled></el-input>
                <span class="comicon2" @click="contractS(scope.$index)">
                  <i class="el-icon-search"></i>
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="extInvoiceNo" label="外销发票号">
            <template slot-scope="scope">
              <div><el-input :disabled="claimStatus" v-model="scope.row.extInvoiceNo" placeholder="请输入"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="contractAmtVat" label="认领金额">
            <template slot-scope="scope">
              <div><el-input :disabled="claimStatus" v-model="scope.row.contractAmtVat" placeholder="请输入"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="extCode" label="外部合同号" >
            <template slot-scope="scope">
              <div><el-input disabled v-model="scope.row.extCode" placeholder="请输入"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="custName" label="客户名">
            <template slot-scope="scope">
              <div><el-input disabled v-model="scope.row.custName" placeholder="请输入"></el-input>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
// import { service, serviceJson } from "../../axios/index.js";
import {
  letterManageFirst,
  letterReceipt,
  letterStatus,
  saveFiLcReceive,
  selectFiLcReceiveById,
  selectClaimByLcReceiveId,
  delFiLcReceiveClaimById,
  selectReceiptByLcReceiveId,
  delFiLcReceiveReceiptById
} from "@/api/letterManage/letterManageFirst";
import companyBankPopup from "@/components/companyBankPopup.vue";
import componySelect from "@/components/componySelect.vue";
import bankSelect from "@/views/fundsManage/conponents/bankSelect";
import departmentSelect from "@/components/departmentSelect.vue";
import staffSelect from "@/components/staffSelect.vue";
import customerSelect from "@/components/customerSelect.vue"; //客户组件
import contractSale from "@/components/contractSale.vue"; //合同组件
import warehouseSelect from "@/components/warehouseSelect.vue"; //仓库组件
import matterSelect from "@/components/matterSelect.vue"; //物料组件
import batchNumber from "@/components/batchNumber.vue"; //批次组件
import coinSelect from "@/components/coinSelect.vue";//币别
import subjectFrame from "@/components/subjectFrame.vue";//科目
import flowCode from "@/components/flowCode.vue";//流量
export default {
  props: {
    companyId: {
      type: String
      // default: "592bff43fc65400b801ef0c131cac51a"
    }
  },
  data() {
    return {
      claimSign: "否",
      currSubTab: "",
      componyShow: false, //银行弹窗
      claim: false,
      collections: false,
      payeeBank: {}, //收款银行
      lcReceiveCode: ``, //信用证号
      lcFlowCode: ``, //信用证流水号
      types: "", //记录操作
      coinShow: false, //币种弹窗
      lcReceiveId: "", //记录数据id
      msgcode: "", //记录数据code
      version: "", //记录带过来的版本号
      departmentShow: false, //部门
      opres: true, //记录是否是新增状态
      lcStatus: "", //单据状态
      lcDueType: "", //信用证类型
      fhtypearr: [], //信用证类别
      xyzStatus: [], //信用证状态
      lcAmt: "", //信用证金额
      activeName: "first", //tab切换
      overShortageRate: "", //溢短比例
      coin: {}, //币种
      currencyCode: "",
      linkIndex: null,
      custName: "", //付款单位
      customerName:{}, //客户
      customerShow: false, //客户弹窗
      contract: false, //合同弹窗
      claimSignS: ["否", "是"], //是否认领
      companyBankShow: false,
      lcBy: ``, //开证人
      remark: "", //备注
      attachmentCountShared :"",// 附件认领数量
      attachmentCountReceived :"",// 附件收款数量
      packageLoanAmt: "", //打包贷款金额
      packageLoanDeadline: "", //打包到期日
      trueOr: [], //认领标识
      lcReceiveDate: "", //收证日期
      lcIssueDate: "", //开证日期
      effectiveDate: "", //有效期限
      deadlineLoaddate: "", //装运期限
      deliveryDate: "", //交单截止日
      packageLoanDate: "", //打包贷款日期
      packageLoanBank: "", //打包贷款行
      companyName: ``, //公司
      agreement: {},
      branchName: ``, //部门
      staffShow:false,
      staffName:{},//业务员
      lcBank:{}, //开证行
      payBank:{},//付款行
      noticeBank:{},//通知行
      negotiateBank:{},//议付行
      pricingTerm: "", //价格条款
      price: [], //价格条款
      lcProperty: "", //信用证属性
      mytypearr: [], //信用证属性
      lcType: "", //信用证性质
      xyzMessage: [], //信用证性质
      lcDays: "", //信用证天数
      createdTime: "", //创建日期
      createdBy: "", //创建人
      updatedTime: "", //修改日期
      updatedBy: "", //修改人
      tableData: [], //表格信息
      tableDataS: [], //表格信息
      bankreduces: [], //表格选择数据
      bankindex: "", //选择数据的索引
      pctkindex: "", //记录批次弹框索引
      look: false,
      soContractId: "", //合同
      selectioned: {}, //表格选中项
      index: null,
      dataS: [],
      rowIndex: "",
      lcDay: false,
      zhuangT:"",//状态
      collection:false,//收款
      custId:"",//客户id
      aa:0,//认领总金额
      claimStatus:false,//付款认领是否点击
      beiBindex:"",//本币扣非银行索引
      companyBank:"",//公司银行区分字段
      subject:false,//科目
      subjectIndex:null,//科目索引
      subjectIndex1:null,//科目索引
      subjectIndex2:null,//科目索引
      subjectIndex3:null,//科目索引
      getSubjectIndex:"",//科目区分
      flow:false,//流量
      flowSIndex:null,//流量索引
      flowIndex:null,//流量索引
      getFlowIndex:"",//流量区分
      reclaimDate:"",//认领过账日期
      reclaimWriteoffDate:"",//认领冲销日期
      longNumber:"",
       warrantCode:'',//凭证号
      warrantMonth:'',//期间
      writeoffWarrantCode:'',//冲销凭证号
      writeoffWarrantMonth:'',//冲销期间
      errorKey:[]
    };
  },
  computed: {
    route() {
      return this.$store.state.route;
    },
  },
  created() {},
  mounted() {
    this.types = this.route.params.data;
    this.claim = this.route.params.claim;
    this.zhuangT = this.route.params.lcStatus;
    this.claimStatus = this.route.params.claimStatus;
    this.collections = this.route.params.collections;
    this.lcReceiveId = this.route.params.lcReceiveId;
    this.msgcode = this.route.params.msgcode;
    this.version = this.route.params.version;
    this.look =this.route.params.look;
    this.getMylxs();
    this.getydlx();
    this.getrkdzt();
    this.getfhlx();
    this.getXyz();
    this.getXyzStatus();
    // if (this.opres) {
    //   //如果是查看和修改状态 加载数据
    //   this.getmoremsg();
    // }
    if (this.claim == true) {
      //如果是认领状态 加载数据
      this.getClaim();
      this.currSubTab = "cost"
    }
    if (this.collections == true) {
      //如果是收款状态 加载数据
      this.getCollections();
      this.currSubTab = "share"
    }
    if(this.types!="creat"){
      if ((this.zhuangT==10550025||this.zhuangT==10550020||this.zhuangT==10550015)&&this.look==true) {
        this.getClaim();
        this.getCollections();
        this.getmoremsg();
        this.currSubTab = "cost"
      }else if(this.zhuangT==10550010){
        this.getclaimInformation();
        this.getmoremsg();
        this.currSubTab = "cost"
      }else if(this.types!="look"){
        this.getmoremsg();
        this.look = false
      }
    }
  },
  watch: {},
  methods: {
    getmoremsg() {
      selectFiLcReceiveById({
        lcReceiveId: this.lcReceiveId
      }).then(res => {
        if (res.code === "success") {
          this.companyName = {
            companyName: res.data.companyName,
            companyCode: res.data.companyCode,
            companyId: res.data.companyId
          };
          this.branchName = {
            branchCode: res.data.orgCode,
            branchName: res.data.orgName
          };
          //业务员
          this.staffName={
            empName:res.data.bizPersonName,
            empCode:res.data.bizPersonCode
          }
          this.customerName = {
            customerName: res.data.custName,
            customerCode: res.data.custCode
          };
          this.coin = {
            currencyName: res.data.currencyName,
            currencyCode: res.data.currencyCode
          };
        // lcBankName: this.lcBank.bankName,
        // lcBankCode: this.lcBank.bankCode,
        // payBankName: this.payBank.bankName,
        // payBankCode: this.payBank.bankCode,
        // noticeBankName: this.noticeBank.bankName,
        // noticeBankCode: this.noticeBank.bankCode,
        // negotiateBankName: this.negotiateBank.bankName,
        // negotiateBankCode: this.negotiateBank.bankCode,
        this.lcBank={
          bankName:res.data.lcBankName,
          bankCode:res.data.lcBankCode,
        }
        this.payBank={
          bankName:res.data.payBankName,
          bankCode:res.data.payBankCode,
        }
        this.noticeBank={
          bankName:res.data.noticeBankName,
          bankCode:res.data.noticeBankCode,
        }
        this.negotiateBank={
          bankName:res.data.negotiateBankName,
          bankCode:res.data.negotiateBankCode,
        }
          if (res.data.claimSign == "0") {
            this.claimSign = "否";
          } else {
            this.claimSign = "是";
          }
          this.lcReceiveCode = res.data.lcReceiveCode;
          this.lcFlowCode = res.data.lcFlowCode;
          this.lcDays = res.data.lcDays;
          this.deliveryDate = res.data.deliveryDate;
          this.lcBy = res.data.lcBy;
          this.createdBy = res.data.createdBy;
          this.lcDueType = res.data.lcDueType;
          this.lcStatus = res.data.lcStatus;
          this.remark = res.data.remark;
          this.attachmentCountShared  = res.data.attachmentCountShared ;
          this.attachmentCountReceived  = res.data.attachmentCountReceived ;
          this.pricingTerm = res.data.pricingTerm;
          this.lcProperty = res.data.lcProperty;
          this.lcType = res.data.lcType;
          this.lcDays = res.data.lcDays;
          this.deliveryDate = res.data.deliveryDate;
          this.packageLoanBank = res.data.packageLoanBank;
          this.packageLoanDate = res.data.packageLoanDate;
          this.packageLoanAmt = res.data.packageLoanAmt;
          this.packageLoanDeadline = res.data.packageLoanDeadline;
          this.reclaimDate = res.data.reclaimDate;
          this.reclaimWriteoffDate = res.data.reclaimWriteoffDate;
          this.warrantCode=res.data.warrantCode;//凭证号
          this.warrantMonth=res.data.warrantMonth; //期间
          this.writeoffWarrantCode=res.data.writeoffWarrantCode;//冲销凭证号
          this.writeoffWarrantMonth=res.data.writeoffWarrantMonth;//冲销期间
          let _this = this;
          _this.fhtypearr.map(item2 => {
            if (this.lcDueType == item2.dict_code) {
              this.lcDueType = item2.dict_value;
              return this.lcDueType;
            }
          });

          if (res.data.pricingTerm != "") {
            this.pricingTerm = parseInt(this.pricingTerm);
            _this.price.map(item => {
              if (this.pricingTerm == item.dict_code) {
                this.pricingTerm = item.dict_value;
                return this.pricingTerm;
              }
            });
          }
          _this.xyzStatus.map(item => {
            if (this.lcStatus == item.dict_code) {
              this.lcStatus = item.dict_value;
              return this.lcStatus;
            }
          });
          _this.mytypearr.map(item => {
            if (this.lcProperty == item.dict_code) {
              this.lcProperty = item.dict_value;
              return this.lcProperty;
            }
          });
          _this.xyzMessage.map(item => {
            if (this.lcType == item.dict_code) {
              this.lcType = item.dict_value;
              return this.lcType;
            }
          });
          this.createdTime = res.data.createdTime;
          this.updatedTime = res.data.updatedTime;
          this.lcReceiveDate = res.data.lcReceiveDate;
          this.lcIssueDate = res.data.lcIssueDate;
          this.effectiveDate = res.data.effectiveDate;
          this.deadlineLoaddate = res.data.deadlineLoaddate;
          this.lcAmt = res.data.lcAmt;
          this.overShortageRate = res.data.overShortageRate;
          this.custId = res.data.custId;
        }
      });
    },
    getClaim() {
      selectClaimByLcReceiveId({
        lcReceiveId: this.lcReceiveId
      }).then(res => {
        if (res.code === "success") {
          res.data.map(item => {
            item.soContractId = item.contractNo;
            item.contractAmtVat = item.claimAmt;
            item.extCode = item.extContractNo;
            return item;
          });
          this.tableData = res.data;
        }
      });
    },
    getCollections() {
      selectReceiptByLcReceiveId({
        lcReceiveId: this.lcReceiveId
      }).then(res => {
        if (res.code === "success") {
          res.data.map(item=> {
           item.writeOff= this.$timeFun(item.writeOff, 1);
           item.postDate= this.$timeFun(item.postDate, 1);
           item.receiptDate= this.$timeFun(item.receiptDate, 1);
           if(item.virtualMark == 1){
             item.virtualMark =true;
           }else{
             item.virtualMark =false;
           }
           if(item.unMark == 1){
             item.unMark =true;
           }else if(item.unMark == 0){
             item.unMark =false;
           }
           if(item.certStatus == 1){
             item.certStatus =true;
           }else if(item.certStatus == 0){
             item.certStatus =false;
           }
           if(item.postMark == 1){
             item.postMark =true;
           }else{
             item.postMark =false;
           }
            return item;
          });
          this.tableDataS = res.data;
        }
      });
    },
    getclaimInformation() {
      this.getClaim();
      // this.claim = true;
      this.collections = false;
    },
    //切换到分摊信息
    jumpToShare(curr, old) {
      if (curr == "share") {
        this.getCollections();
        // this.collections = true;
        // this.claim = false;
      }else{
        this.getClaim();
        // this.collection = true;
        // this.collections = false;
      }
    },
    changeState() {
      //贸易类型选择
      console.log(this.mytype);
    },
    changeydlx() {
      //移动类型选择
      console.log(this.ydtype);
    },
    getMylxs() {
      //获取信用证类别
      letterStatus({
        dictNo: 1057
      }).then(res => {
        this.fhtypearr = res.data;
        if(this.types!="creat"){
          this.getmoremsg();
        }
      });
    },
    getXyzStatus() {
      //获取信用证状态
      letterStatus({
        dictNo: 1055
      }).then(res => {
        this.xyzStatus = res.data;
        if(this.types!="creat"){
          this.getmoremsg();
        }
      });
    },
    getydlx() {
      //获取价格条款
      letterStatus({
        dictNo: 1016
      }).then(res => {
        this.price = res.data;
        if(this.types!="creat"){
          this.getmoremsg();
        }
      });
    },
    getrkdzt() {
      //获取信用证属性数据
      letterStatus({
        dictNo: 1077
      }).then(res => {
        this.mytypearr = res.data;
        if(this.types!="creat"){
          this.getmoremsg();
        }
      });
    },
    getXyz() {
      //获取信用证性质数据
      letterStatus({
        dictNo: 1022
      }).then(res => {
        this.xyzMessage = res.data;
        if(this.types!="creat"){
          this.getmoremsg();
        }
      });
    },
    getfhlx() {
      //获取认领标识数据
      this.trueOr = [
        { dict_code: 0, dict_value: "否" },
        { dict_code: 1, dict_value: "是" }
      ];
    },
    //信用证类别选择
    changefhtype() {
      console.log(this.fhtype);
    },
    changerkd() {

      if (this.lcType == 10220005) {
        this.lcDay = true;
        this.lcDays = "";
      } else {
        this.lcDay = false;
      }
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.companyName = e;
      this.branchName = this.staffName = "";
    },
    //公司弹窗打开
    componyTip() {
      if (this.look||this.claim||this.collections) {
        return;
      }
      this.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.componyShow = false;
    },
    //客户弹窗确定获取数据
    customerSure(e) {
      this.customerShow = false;
      this.customerName = e;
    },

    //客户弹窗关闭
    customerCancle() {
      this.customerShow = false;
    },

    //客户窗口
    customerPopup() {
      if (this.look||this.claim||this.collections) {
        return;
      }
      this.customerShow = true;
    },
    //合同弹窗确定获取数据
    contractTrue(e) {
      console.log(e)
      this.contract = false;
      this.agreement = e;
      this.tableData[this.index].soContractId =  e.soContractNo;
      this.tableData[this.index].contractAmtVat =  e.contractAmtVat;
      this.tableData[this.index].extCode =  e.extCode;
      this.tableData[this.index].custName =  e.custName;
      // let data = {
      //   soContractId: e.soContractNo,
      //   contractAmtVat: e.contractAmtVat,
      //   extCode: e.extCode,
      //   custName: e.custName
      // };
      // this.tableData[this.index] = data;
      // this.$set(this.tableData, this.index, data);
    },
    contractS(index) {
      if (this.look||this.claimStatus) {
        return;
      }
      this.contract = true;
      this.index = index;
    },
    //合同弹窗关闭
    contractClose() {
      this.contract = false;
    },
    //币种弹窗打开
    coinTip() {
       if (this.look||this.claim||this.collections) {
        return;
      }
      this.coinShow = true;
    },
    //币种弹窗关闭
    coinCancle() {
      this.coinShow = false;
    },
    //币种弹窗确定获取数据
    coinSure(e) {
      this.coinShow = false;
      this.coin.currencyCode = e.currencyCode;
      this.currency = e;
    },
    //部门弹窗打开
    departmentTip() {
      // if (this.companyName == ``) {
      //   this.$openWarning("请先选择公司");
      //   return false;
      // }
      if (this.look||this.claim||this.collections) {
        return;
      }
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
      this.staffName = "";
    },
    //科目弹窗打开
    getSubject(index,a) {
      if (this.look||this.tableDataS[index].unMark) {
        return;
      }
      if(a==1){
        this.subject = true;
        this.subjectIndex = index
        this.getSubjectIndex = "aaa"
        this.longNumber = 1002
      }else if(a==2){
        this.subject = true;
        this.subjectIndex1 = index
        this.getSubjectIndex = "bbb"
        this.longNumber = 6603
      }else if(a==3){
        this.subject = true;
        this.subjectIndex2 = index
        this.getSubjectIndex = "ccc"
        this.longNumber = 6603
      }else if(a==4){
        this.subject = true;
        this.subjectIndex3 = index
        this.getSubjectIndex = "ddd"
        this.longNumber = 1002
      }
    },
    //科目弹窗关闭
    subjectCancle() {
      this.subject = false;
    },
    //科目弹窗确定获取数据
    subjectSure(e) {
      console.log(e)
      if(this.getSubjectIndex == "aaa"){
        this.subject = false;
        this.tableDataS[this.subjectIndex].bankAccount =  e.nameL2;
        this.$set(this.tableDataS,this.subjectIndex,this.tableDataS[this.subjectIndex])
      }else if(this.getSubjectIndex == "bbb"){
        this.subject = false;
        this.tableDataS[this.subjectIndex1].deductionAccountF =  e.nameL2;
        this.$set(this.tableDataS,this.subjectIndex1,this.tableDataS[this.subjectIndex1])
      }else if(this.getSubjectIndex == "ccc"){
        this.subject = false;
        this.tableDataS[this.subjectIndex2].deductionBankAccountF =  e.nameL2;
        this.$set(this.tableDataS,this.subjectIndex2,this.tableDataS[this.subjectIndex2])
      }else if(this.getSubjectIndex == "ddd"){
        this.subject = false;
        this.tableDataS[this.subjectIndex3].deductionBankAccount =  e.nameL2;
        this.$set(this.tableDataS,this.subjectIndex3,this.tableDataS[this.subjectIndex3])
      }
      this.$forceUpdate();
    },
    //流量弹窗打开
    getFlow(index,a) {
      if (this.look||this.tableDataS[index].unMark) {
        return;
      }
      if(a==1){
        this.flow = true;
        this.flowIndex = index
        this.getFlowIndex = "aaa"
      }else if(a==2){
        this.flow = true;
        this.flowSIndex = index
        this.getFlowIndex = "bbb"
      }
    },
    //流量弹窗关闭
    flowCancle() {
      this.flow = false;
    },
    //流量弹窗确定获取数据
    flowSure(e) {
      console.log(e)
      if(this.getFlowIndex == "aaa"){
        this.flow = false;
        this.tableDataS[this.flowIndex].cashFlowCode =  e.fnameL2;
      }else if(this.getFlowIndex == "bbb"){
        this.flow = false;
        this.tableDataS[this.flowSIndex].cashFlowCodeCost =  e.fnameL2;
        // this.$set(this.tableDataS,this.subjectIndex1,this.tableDataS[this.subjectIndex1])
      }
      this.$forceUpdate();
    },
    companyBankTip(index,a) {
      if (this.look||this.tableDataS[index].unMark) {
        return;
      }
      if (this.companyName.companyId === null) {
        this.$openWarning("请先选择公司");
        return;
      } else {
        if(a==1){
          this.companyBankShow = true;
          this.beiBindex = index;
          this.companyBank = "aa"
        }else{
          this.companyBankShow = true;
          this.index = index;
          this.companyBank = "ss"
        }
      }
    },
    companyBankCancle() {
      this.companyBankShow = false;
    },
    companyBankSure(e) {
      if(this.companyBank == "ss"){
        let data = this.tableDataS[this.index];
        data.receiptBankName = e.bankName;
        data.accountIdentificatio = e.bankAccount;
        (data.contractAmtVat = e.contractAmtVat),
        (data.extCode = e.extCode),
        (data.custName = e.custName);
        this.$set(this.tableDataS, this.index, data);
        this.companyBankShow = false;
      }else if(this.companyBank == "aa"){
        let data = this.tableDataS[this.beiBindex];
        data.deductionBankName = e.bankName;
        data.deductionAccountIdentificati = e.bankAccount;
        this.$set(this.tableDataS, this.beiBindex, data);
        this.companyBankShow = false;
      }
    },

    bankChange(e) {

      //表格选择
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    expandChange(selection, row) {
      console.log(row)
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTableS.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (this.claim == true) {
        if (row) {
          this.selectioned = row;
          this.rowIndex = this.tableData.indexOf(row);
          this.$refs.multipleTable.toggleRowSelection(row, true);
        }
      } else {
        if (row) {
          this.selectioned = row;
          this.rowIndex = this.tableDataS.indexOf(row);
          this.$refs.multipleTableS.toggleRowSelection(row, true);
        }
      }
    },
    bankadd(b) {
      //表格增加
      if (b == 2) {
        this.tableDataS.forEach(item => {
          item.edit = false;
        });
        let obj = {
          receiptCurrencyRate: " ",
          netReceipt: "",
          netReceiptRmb: "",
          receiptBankName: "",
          accountIdentificatio: "",
          bankAccount: "",
          cashFlowCode: "",
          deductionAccountF:"",
          currencyDeductionForeign: "",
          soContractId: "",
          incomeAccount: "",
          deductionBankAccountF:"",
          deductionBankName:"",
          deductionAccountIdentificati:"",
          deductionBankAccount:"",
          cashFlowCodeCost:"",
          receiptDate:"",
          postDate:"",
          exportInvoiceCode:"",
          costWriteoffCertificateCod:"",
          writeOffReason:"",
          writeOff:"",
          writeoffCertificateCode:"",
          certStatus:"",
          remark:"",
          postMark:"",
          virtualMark:false,
          edit: true
        };
        let newtable = [];
        newtable.unshift(obj);
        this.tableDataS = newtable.concat(this.tableDataS);
      } else {
        this.tableData.forEach(item => {
          item.edit = false;
        });
        let obj = {
          soContractId: " ",
          contractAmtVat: "",
          extCode: "",
          custName: "",
          edit: true
        };
        let newtable = [];
        newtable.unshift(obj);
        this.tableData = newtable.concat(this.tableData);
      }
    },
    bankreduce(a) {
      //表格删除
      if (a == 1) {
        if (this.selectioned == null) {
          this.$openWarning("未选择数据");
          return false;
        }
        if (!this.selectioned.id) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.tableData.splice(this.rowIndex, 1);
        } else {
          this.$confirm("是否确定删除继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            delFiLcReceiveClaimById([this.selectioned]).then(res => {
              if (res.code === "success") {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.tableData.splice(this.rowIndex, 1);
              }
            });
          });
        }
      } else {
        if(this.selectioned.virtualMark == true){
          this.selectioned.virtualMark =1;
        }else{
          this.selectioned.virtualMark =0;
        }
        if(this.selectioned.unMark == true){
          this.selectioned.unMark =1;
        }else{
          this.selectioned.unMark =0;
        }if(this.selectioned.postMark == true){
          this.selectioned.postMark =1;
        }else{
          this.selectioned.postMark =0;
        }
        if (this.selectioned == null) {
          this.$openWarning("未选择数据");
          return false;
        }
        if (!this.selectioned.id) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.tableDataS.splice(this.rowIndex, 1);
        } else {
          this.$confirm("是否确定删除继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            delFiLcReceiveReceiptById([this.selectioned]).then(res => {
              if (res.code === "success") {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.tableDataS.splice(this.rowIndex, 1);
              }
            });
          });
        }
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    savemsg() {
      //保存数据
      this.errorKey=[];
      if (!Object.keys(this.companyName).length){
       // this.$openWarning("公司不能为空");
       // return;
       this.errorKey.push('companyName');
      }
      if (!Object.keys(this.branchName).length) {
        // this.$openWarning("部门不能为空");
        // return false;
         this.errorKey.push('branchName');
      }
      if (JSON.stringify(this.staffName) === "{}") {
        // this.$openWarning("业务员不能为空");
        // return;
        this.errorKey.push('staffName');
      }
      if (!this.lcReceiveCode) {
        // this.$openWarning("信用证号不能为空");
        // return;
         this.errorKey.push('lcReceiveCode');
      }
      if(!this.lcFlowCode){
        this.errorKey.push('lcFlowCode');
      }
      if (!this.lcDueType) {
        // this.$openWarning("信用证类别不能为空");
        // return;
         this.errorKey.push('lcDueType');
      }
      if (!this.lcAmt) {
         this.errorKey.push('lcAmt');
      }
      if (!Object.keys(!this.customerName).length) {
         this.errorKey.push('customerName');
      }
      if (!this.lcReceiveDate) {
        this.errorKey.push('lcReceiveDate');
      }
      if (!this.lcIssueDate) {
         this.errorKey.push('lcIssueDate');
      }
      if (!this.deadlineLoaddate) {
         this.errorKey.push('deadlineLoaddate');
      }

      if (!this.effectiveDate) {
         this.errorKey.push('effectiveDate');
      }
      if (!Object.keys(!this.lcBank).length) {
       this.errorKey.push('lcBank');
      }
      if (!Object.keys(this.coin).length) {
        this.errorKey.push('coin');
      }
      // if (!this.lcStatus) {
      //   this.$openWarning("单据状态不能为空");
      //   return;
      // }
      if (!this.lcType) {
         this.errorKey.push('lcType');
      }
      if (!this.attachmentCountShared) {
         this.errorKey.push('attachmentCountShared');
      }
      if (!this.attachmentCountReceived) {
        this.errorKey.push('attachmentCountReceived');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning("必填信息请填完整");
        return false
      }
      saveFiLcReceive({
        lcDueType: this.lcDueType,
        companyCode: this.companyName.companyCode,
        companyName: this.companyName.companyName,
        companyId: this.companyName.companyId,
        bizPersonCode: this.staffName.empCode, //业务员
        bizPersonName: this.staffName.empName,
        currencyCode: this.coin.currencyCode,
        currencyName: this.coin.currencyName,
        orgCode: this.branchName.branchCode,
        orgId: this.branchName.branchId,
        lcReceiveCode: this.lcReceiveCode,
        overShortageRate: this.overShortageRate,
        lcBankName: this.lcBank.bankName,
        lcBankCode: this.lcBank.bankCode,
        payBankName: this.payBank.bankName,
        payBankCode: this.payBank.bankCode,
        noticeBankName: this.noticeBank.bankName,
        noticeBankCode: this.noticeBank.bankCode,
        negotiateBankName: this.negotiateBank.bankName,
        negotiateBankCode: this.negotiateBank.bankCode,
        lcBy: this.lcBy,
        custCode: this.customerName.customerCode,
        custName: this.customerName.customerName,
        custId: this.customerName.customerId,
        lcReceiveDate: this.lcReceiveDate,
        lcIssueDate: this.lcIssueDate,
        // claimSign: this.claimSign,
        pricingTerm: this.pricingTerm,
        lcStatus: this.lcStatus,
        lcProperty: this.lcProperty,
        lcType: this.lcType,
        lcDays: this.lcDays,
        effectiveDate: this.effectiveDate,
        deadlineLoaddate: this.deadlineLoaddate,
        lcFlowCode: this.lcFlowCode,
        deliveryDate: this.deliveryDate,
        packageLoanDeadline: this.packageLoanDeadline,
        reclaimDate: this.reclaimDate,
        reclaimWriteoffDate: this.reclaimWriteoffDate,
        packageLoanAmt: this.packageLoanAmt,
        packageLoanDate: this.packageLoanDate,
        packageLoanBank: this.packageLoanBank,
        orgName: this.branchName.branchName,
        lcAmt: this.lcAmt,
        remark: this.remark,
        attachmentCountShared : this.attachmentCountShared ,
        attachmentCountReceived : this.attachmentCountReceived
      }).then(res => {
        if (res.code === "success") {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.$router.push({
            name: "firstIndex"
          });
        }
      });
    },
    savemsgs() {
      //修改提交数据
      this.errorKey=[];
      if (!Object.keys(this.companyName).length){
       // this.$openWarning("公司不能为空");
       // return;
       this.errorKey.push('companyName');
      }
      if (!Object.keys(this.branchName).length) {
        this.errorKey.push('branchName');
      }
      if (JSON.stringify(this.staffName) === "{}") {
        this.errorKey.push('staffName');
      }
      if (!this.lcReceiveCode) {
       this.errorKey.push('lcReceiveCode');
      }
      if(!this.lcFlowCode){
        this.errorKey.push('lcFlowCode');
      }
      if (!this.lcDueType) {
       this.errorKey.push('lcDueType');
      }
      if (!this.lcAmt) {
       this.errorKey.push('lcAmt');
      }
      if (!Object.keys(this.customerName).length) {
        this.errorKey.push('customerName');
      }
      if (!this.lcReceiveDate) {
        this.errorKey.push('lcReceiveDate');
      }
      if (!this.lcIssueDate) {
        this.errorKey.push('lcIssueDate');
      }
      if (!this.deadlineLoaddate) {
        this.errorKey.push('deadlineLoaddate');
      }

      if (!this.effectiveDate) {
       this.errorKey.push('effectiveDate');
      }
      if (!Object.keys(this.lcBank).length) {
       this.errorKey.push('lcBank');
      }
      if (!Object.keys(this.coin).length) {
        this.errorKey.push('coin');
      }
      if (!this.lcStatus) {
       this.errorKey.push('lcStatus');
      }
      if (!this.lcType) {
        this.errorKey.push('lcType');
      }
      if (!this.attachmentCountShared) {
       this.errorKey.push('attachmentCountShared');
      }
      if (!this.attachmentCountReceived) {
       this.errorKey.push('attachmentCountReceived');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning("必填信息请填完整");
        return false
      }
      this.aa =0;
      for (let index = 0; index < this.tableData.length; index++) {
        this.aa += parseInt(this.tableData[index].contractAmtVat);
      console.log(parseInt(this.tableData[index].contractAmtVat))
      }
      console.log(this.aa)
      if(this.aa > this.lcAmt){
        this.$openWarning("认领总金额不能大于信用证金额");
        return;
      }
      this.fhtypearr.map(item2 => {
        if (this.lcDueType == item2.dict_value) {
          this.lcDueType = item2.dict_code;
          return this.lcDueType;
        }
      }),
        this.price.map(item => {
          if (this.pricingTerm == item.dict_value) {
            this.pricingTerm = item.dict_code;
            return this.pricingTerm;
          }
        });
      this.xyzStatus.map(item => {
        if (this.lcStatus == item.dict_value) {
          this.lcStatus = item.dict_code;
          return this.lcStatus;
        }
      });
      this.mytypearr.map(item => {
        if (this.lcProperty == item.dict_value) {
          this.lcProperty = item.dict_code;
          return this.lcProperty;
        }
      });
      this.xyzMessage.map(item => {
        if (this.lcType == item.dict_value) {
          this.lcType = item.dict_code;
          return this.lcType;
        }
      });
      if (this.claim == true) {
      this.tableData.map(item => {
        item.contractNo = item.soContractId;
        item.claimAmt = item.contractAmtVat;
        item.extContractNo = item.extCode;
        this.dataS.push(item);
      });
      this.tableDataS = [];
      } else {
        this.dataS = [];
      }
      if(this.tableDataS.length>0){
        for (let index = 0; index < this.tableDataS.length; index++) {
          if(this.tableDataS[index].currencyDeductionForeign > 0){
            if(!this.tableDataS[index].deductionAccountF){
              this.$openWarning("外币扣费科目不能为空");
              return;
            }
          }
          if(this.tableDataS[index].incomeAccount > 0){
            if(!this.tableDataS[index].deductionBankAccountF){
              this.$openWarning("本币扣费科目不能为空");
              return;
            }
          }
          this.tableDataS[index].netReceiptRmb = this.tableDataS[index].receiptCurrencyRate *this.tableDataS[index].netReceipt;
          if(this.tableDataS[index].virtualMark == true){
             this.tableDataS[index].virtualMark =1;
           }else{
             this.tableDataS[index].virtualMark =0;
           }
           if(this.tableDataS[index].unMark == true){
             this.tableDataS[index].unMark =1;
           }else{
             this.tableDataS[index].unMark =0;
           }
           if(this.tableDataS[index].postMark == true){
             this.tableDataS[index].postMark =1;
           }else{
             this.tableDataS[index].postMark =0;
           }
           if(this.tableDataS[index].certStatus == true){
             this.tableDataS[index].certStatus =1;
           }else{
             this.tableDataS[index].certStatus =0;
           }
        }
      }
      saveFiLcReceive({
        claimList: this.dataS,
        receiptList: this.tableDataS,
        lcDueType: this.lcDueType,
        companyCode: this.companyName.companyCode,
        companyName: this.companyName.companyName,
        bizPersonCode: this.staffName.empCode, //业务员
        bizPersonName: this.staffName.empName,
        currencyCode: this.coin.currencyCode,
        currencyName: this.coin.currencyName,
        orgCode: this.branchName.branchCode,
        lcReceiveCode: this.lcReceiveCode,
        overShortageRate: this.overShortageRate,
        lcBankName: this.lcBank.bankName,
        lcBankCode: this.lcBank.bankCode,
        payBankName: this.payBank.bankName,
        payBankCode: this.payBank.bankCode,
        noticeBankName: this.noticeBank.bankName,
        noticeBankCode: this.noticeBank.bankCode,
        negotiateBankName: this.negotiateBank.bankName,
        negotiateBankCode: this.negotiateBank.bankCode,
        lcBy: this.lcBy,
        custCode: this.customerName.customerCode,
        custName: this.customerName.customerName,
        custId: this.customerName.customerId,
        lcReceiveDate: this.lcReceiveDate,
        lcIssueDate: this.lcIssueDate,
        // claimSign: this.claimSign,
        pricingTerm: this.pricingTerm,
        lcStatus: this.lcStatus,
        lcProperty: this.lcProperty,
        lcType: this.lcType,
        lcDays: this.lcDays,
        effectiveDate: this.effectiveDate,
        deadlineLoaddate: this.deadlineLoaddate,
        lcFlowCode: this.lcFlowCode,
        deliveryDate: this.deliveryDate,
        packageLoanDeadline: this.packageLoanDeadline,
        reclaimDate: this.reclaimDate,
        reclaimWriteoffDate: this.reclaimWriteoffDate,
        packageLoanAmt: this.packageLoanAmt,
        packageLoanDate: this.packageLoanDate,
        packageLoanBank: this.packageLoanBank,
        orgName: this.branchName.branchName,
        lcAmt: this.lcAmt,
        remark: this.remark,
        lcReceiveId: this.lcReceiveId,
        version: this.version,
        attachmentCountShared : this.attachmentCountShared ,
        attachmentCountReceived : this.attachmentCountReceived
      }).then(res => {
        console.log(res)
        if (res.code === "success") {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.$router.push({
            name: "firstIndex"
          });
        }else {
          this.$openWarning(res.message);
        }
      })
    },
    savebtn() {
      //保存新增
      if (this.lcReceiveId === undefined) {
        console.log(123);

        this.savemsg();
      } else {
        console.log(456);

        this.savemsgs();
      }
    },
    cancelbtn() {
      //取消新增
      this.$router.push({
        name: "firstIndex"
      });
    },
    //业务员弹窗打开
    staffTip() {
        this.staffShow = true;
    },
    //业务员弹窗关闭
    staffCancle() {
        this.staffShow = false;
    },
    //业务员弹窗确定获取数据
    staffSure(e) {
        this.staffShow = false;
        this.staffName = e;
    },
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    warehouseSelect,
    matterSelect,
    batchNumber,
    coinSelect,
    customerSelect,
    contractSale,
    companyBankPopup,
    subjectFrame,
    flowCode,
    staffSelect,
    bankSelect
  }
};
</script>

<style lang="scss" scoped>
#otherComing{
  .button-div {
    margin: 0 !important;
  }
  .el-col {
    position: relative;
    height: 25px;
  }
}
// .index .el-col-required .el-input.is-disabled .el-input__inner{
//   background-color: #d9e8fd !important;
// }
/deep/ .el-col{
  .el-inputs,.el-select,.el-date-editor{
      width: 67%;
    }
  label{
    width:33%;
  }
}
.input-div{
  padding-left: 15px;
}
</style>
