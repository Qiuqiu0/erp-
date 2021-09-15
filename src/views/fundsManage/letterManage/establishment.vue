<template>
  <div id="otherComing">
    <!-- 按钮 -->
    <div class="button-div">
      <el-button v-show="!look" icon="el-icon-suitcase" @click="savebtn(1)">保存</el-button>
      <el-button v-show="!look" icon="el-icon-close" @click="cancelbtn">取消</el-button>
      <el-button v-show="look" icon="el-icon-back" @click="cancelbtn">返回</el-button>
      <el-button v-if="openChange"  icon="el-icon-finished" @click="savebtn(2)">提交</el-button>
      <el-button v-show="honourS"  icon="el-icon-finished" @click="cdPost">提交</el-button>
      <el-button v-show="honourS"  icon="el-icon-receiving" @click="verify">审核</el-button>
      <el-button v-show="payMoney"  icon="el-icon-money" @click="outPost()">过账</el-button>
      <el-button v-show="payMoney"  icon="el-icon-document-delete" @click="charge">冲销</el-button>
      <el-button v-show="openLetter"  icon="el-icon-money" @click="honourOutPost()">开证过账</el-button>
      <el-button v-show="openLetter"  icon="el-icon-document-delete" @click="honourCharge">开证冲销</el-button>
    </div>
    <el-divider></el-divider>
    <!-- 标签页 -->
    <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <!-- 基本信息 -->
        <el-tab-pane label="基本信息" name="first">
          <div class="input-div" id="yhglmsg">

              <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>公司</label>
                <el-input
                  v-model="newData.companyName"
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
                <label><span class="must-full">*</span>部门</label>
                <el-input
                  v-model="newData.orgName"
                  class="el-inputs"
                  :class="errorKey.includes('orgName') ? 'inputRed' : ''"
                  placeholder="请选择"
                  disabled
                >
                </el-input>
                <span class="comicon" @click="departmentTip"
                  ><i class="el-icon-search"></i
                ></span>
              </el-col>
              <el-col :span="5" class="el-col">
                <label>申请单号</label>
                <el-input
                  v-model="newData.applyCode"
                  class="el-inputs"
                  placeholder="请选择"
                  disabled
                >
                </el-input>
              </el-col>
              <el-col :span="5" class="el-colc" v-show="!look">
                <label>申请日期</label>
                <el-date-picker
                    v-model="newData.applyDate"
                    type="date"
                    placeholder="选择日期"
                    @change="aaaaaa"
                    :disabled="look||openLetter||honour"
                >
                </el-date-picker>
              </el-col>
              <el-col :span="5" class="el-colc" v-show="look">
                <label>申请日期</label>
                <el-date-picker
                    v-model="newData.applyDate"
                    type="date"
                    value-format="timestamp"
                    disabled
                >
                </el-date-picker>
              </el-col>
              <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>币种</label>
                <el-input v-model="newData.currencyCode" class="el-inputs"
                :class="errorKey.includes('currencyCode') ? 'inputRed' : ''" placeholder="请选择" disabled></el-input>
                <span class="comicon" @click="coinTip"
                  ><i class="el-icon-search"></i
                ></span>
              </el-col>
              <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>汇率</label>
                <el-input
                  v-model="newData.currencyRate"
                  class="el-inputs"
                  :class="errorKey.includes('currencyRate') ? 'inputRed' : ''"
                  @input="newData.currencyRate = $filterPriceNum(newData.currencyRate,8)"
                  placeholder="请选择"
                  :disabled="look||openLetter||honour"
                >
                </el-input>
              </el-col>
              <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>开证金额</label>
                <el-input
                  v-model="newData.lcAmt"
                  class="el-inputs"
                  :class="errorKey.includes('lcAmt') ? 'inputRed' : ''"
                  @input="newData.lcAmt = $filterPriceNum(newData.lcAmt,2)"
                  placeholder="请选择"
                  :disabled="look||openLetter||honour"
                >
                </el-input>
              </el-col>
              <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>信用证性质</label>
                <el-select
                  clearable
                  v-model="newData.lcType"
                  placeholder="请选择"
                  class="el-select"
                  :class="errorKey.includes('lcType') ? 'inputRed' : ''"
                  :disabled="look||openLetter||honour"
                >
                  <el-option
                    v-for="item in rkdtypearr"
                    :key="item.dict_code"
                    :label="item.dict_value"
                    :value="item.dict_key"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5" class="el-col el-col-required" v-show="!look">
                <label><span class="must-full">*</span>业务员</label>
                <el-input v-model="newData.bizPersonName" class="el-inputs"
                :class="errorKey.includes('bizPersonName') ? 'inputRed' : ''"  placeholder="请选择" disabled></el-input>
                <span class='comicon' @click="staffTip"><i class="el-icon-search" ></i></span>
                <span class="comicon" v-if="newData.bizPersonName" @click="newData.bizPersonName = ''">
                  <i class="el-icon-circle-close"></i>
                </span>
              </el-col>
              <el-col :span="5" class="el-col" v-show="look">
                <label>业务员</label>
                <el-input v-model="newData.bizPersonName" class="el-inputs" disabled></el-input>
                <span class='comicon' @click="staffTip"><i class="el-icon-search" ></i></span>
              </el-col>
              <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>供应商</label>
                <el-input
                  v-model="newData.supplierName"
                  class="el-inputs"
                  :class="errorKey.includes('supplierName') ? 'inputRed' : ''"
                  placeholder="请选择"
                  disabled
                ></el-input>
                <span class="comicon" @click="supplierTip">
                  <i class="el-icon-search"></i>
                </span>
              </el-col>
              <el-col :span="5" class="el-col" v-show="!look">
                <label>供应商国别</label>
                <el-input
                  v-model="newData.supplierCountry"
                  class="el-inputs"
                  placeholder="请选择"
                  disabled
                ></el-input>
                <span class="comicon" v-if="newData.supplierCountry" @click="newData.supplierCountry = ''">
                  <i class="el-icon-circle-close"></i>
                </span>
                <span class="comicon" @click="countryTip">
                  <i class="el-icon-search"></i>
                </span>
              </el-col>
              <el-col :span="5" class="el-col" v-show="look">
                <label>供应商国别</label>
                <el-input
                  v-model="newData.supplierCountry"
                  class="el-inputs"
                  disabled
                ></el-input>
                <span class="comicon" @click="countryTip">
                  <i class="el-icon-search"></i>
                </span>
              </el-col>
              <el-col :span="5" class="el-col" v-show="!look">
                <label>供应商银行</label>
                <el-input
                  v-model="newData.supplierBankName"
                  class="el-inputs"
                  placeholder="请选择"
                  disabled
                ></el-input>
                <span class="comicon" v-if="newData.supplierBankName" @click="newData.supplierBankName = ''">
                  <i class="el-icon-circle-close"></i>
                </span>
                <span class="comicon" @click="supplierBankTip(1)">
                  <i class="el-icon-search"></i>
                </span>
              </el-col>
              <el-col :span="5" class="el-col" v-show="look">
                <label>供应商银行</label>
                <el-input
                  v-model="newData.supplierBankName"
                  class="el-inputs"
                  disabled
                ></el-input>
                <span class="comicon" @click="supplierBankTip(1)">
                  <i class="el-icon-search"></i>
                </span>
              </el-col>
              <el-col :span="5" class="el-col"  v-show="!look">
                <label>外部合同号</label>
                <el-input
                  v-model="newData.extNo"
                  class="el-inputs"
                  placeholder="请输入"
                  :disabled="look||openLetter||honour"
                ></el-input>
              </el-col>
              <el-col :span="5" class="el-col"  v-show="look">
                <label>外部合同号</label>
                <el-input
                  v-model="newData.extNo"
                  class="el-inputs"
                  disabled
                ></el-input>
              </el-col>
              <el-col :span="5" class="el-col" v-show="!look">
                <label>贸易类型</label>
                <el-select
                  clearable
                  v-model="newData.tradeType"
                  placeholder="请选择"
                  class="el-select"
                  :disabled="look||openLetter||honour"
                >
                  <el-option
                    v-for="item in fhtypearr"
                    :key="item.dict_code"
                    :label="item.dict_value"
                    :value="item.dict_key"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5" class="el-col"  v-show="look">
                <label>贸易类型</label>
                <el-select
                  clearable
                  v-model="newData.tradeType"
                  class="el-select"
                  disabled
                >
                  <el-option
                    v-for="item in fhtypearr"
                    :key="item.dict_code"
                    :label="item.dict_value"
                    :value="item.dict_key"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5" class="el-col" v-show="!look">
                <label>业务性质</label>
                <el-select
                  clearable
                  v-model="newData.bizNature"
                  placeholder="请选择"
                  class="el-select"
                  :disabled="look||openLetter||honour"
                >
                  <el-option
                    v-for="item in mytypearr"
                    :key="item.dict_code"
                    :label="item.dict_value"
                    :value="item.dict_key"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5" class="el-col" v-show="look">
                <label>业务性质</label>
                <el-select
                  clearable
                  v-model="newData.bizNature"
                  class="el-select"
                  disabled
                >
                  <el-option
                    v-for="item in mytypearr"
                    :key="item.dict_code"
                    :label="item.dict_value"
                    :value="item.dict_key"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5" class="el-col" v-show="!look">
                <label style="height:20px">溢短装比例%</label>
                <el-input
                  v-model="newData.overShortageRate"
                  class="el-inputs"
                  @input="newData.overShortageRate = $filterPriceNum(newData.overShortageRate,2)"
                  placeholder="请输入"
                  :disabled="look||openLetter||honour"
                ></el-input>
              </el-col>
              <el-col :span="5" class="el-col" v-show="look">
                <label style="height:20px">溢短装比例%</label>
                <el-input
                  v-model="newData.overShortageRate"
                  class="el-inputs"
                  @input="newData.overShortageRate = $filterPriceNum(newData.overShortageRate,2)"
                  disabled
                ></el-input>
              </el-col>
              <el-col :span="5" class="el-colc el-col-required">
                <label><span class="must-full">*</span>最迟装期</label>
                <el-date-picker
                  class="el-input2"
                  :class="errorKey.includes('deadlineLoaddate') ? 'inputRed' : ''"
                    v-model="deadlineLoaddate"
                    type="date"
                    placeholder="选择日期"
                    value-format="timestamp"
                    :disabled="look||openLetter||honour"
                >
                </el-date-picker>
              </el-col>

              <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>信用证类型</label>
                <el-select
                  clearable
                  v-model="newData.lcDueType"
                  placeholder="请选择"
                  class="el-select"
                  :class="errorKey.includes('lcDueType') ? 'inputRed' : ''"
                  @change="changerkd"
                  :disabled="look||openLetter||honour"
                >
                  <el-option
                    v-for="item in ydtypearr"
                    :key="item.dict_code"
                    :label="item.dict_value"
                    :value="item.dict_key"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>信用证属性</label>
                <el-select
                  clearable
                  v-model="newData.lcProperty"
                  placeholder="请选择"
                  class="el-select"
                  :class="errorKey.includes('lcProperty') ? 'inputRed' : ''"
                  :disabled="look||openLetter||honour"
                >
                  <el-option
                    v-for="item in xyzMessage"
                    :key="item.dict_code"
                    :label="item.dict_value"
                    :value="item.dict_key"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5" class="el-col" v-show="!look">
                <label>信用证天数</label>
                <el-input
                  v-model="newData.lcDays"
                  class="el-inputs"
                  @input="newData.lcDays = newData.lcDays == 0 ? '' : (newData.lcDays + '').replace(/[^\d]/g, '') * 1"
                  placeholder="请输入"
                  :disabled="look||openLetter||honour"
                ></el-input>
              </el-col>
              <el-col :span="5" class="el-col" v-show="look">
                <label>信用证天数</label>
                <el-input
                  v-model="newData.lcDays"
                  class="el-inputs"
                  @input="newData.lcDays = newData.lcDays == 0 ? '' : (newData.lcDays + '').replace(/[^\d]/g, '') * 1"
                  disabled
                ></el-input>
              </el-col>
              <el-col :span="5" class="el-col el-col-required" v-show="!look">
                <label style="height:20px"><span class="must-full" v-show="!lcDay">*</span>信用证付款期限(天)</label>
                <el-input
                  v-model="newData.payDeadline"
                  class="el-inputs"
                  :class="errorKey.includes('payDeadline') ? 'inputRed' : ''"
                  @input="newData.payDeadline = newData.payDeadline == 0 ? '' : (newData.payDeadline + '').replace(/[^\d]/g, '') * 1"
                  placeholder="请输入"
                  :disabled="look||openLetter||honour|| newData.lcDueType == 10220005|| newData.lcDueType == '即期'"
                >
                </el-input>
              </el-col>
              <el-col :span="5" class="el-col" v-show="look">
                <label style="height:20px">信用证付款期限（天）</label>
                <el-input
                  v-model="newData.payDeadline"
                  class="el-inputs"
                  @input="newData.payDeadline = newData.payDeadline == 0 ? '' : (newData.payDeadline + '').replace(/[^\d]/g, '') * 1"
                  disabled
                >
                </el-input>
              </el-col>
              <el-col :span="5" class="el-colc el-col-required" v-show="!look">
                <label><span class="must-full">*</span>有效日期</label>
                <el-date-picker
                  class="el-input2"
                  :class="errorKey.includes('effectiveDate') ? 'inputRed' : ''"
                    v-model="newData.effectiveDate"
                    type="date"
                    placeholder="选择日期"
                    value-format="timestamp"
                    :disabled="look||openLetter||honour"
                >
                </el-date-picker>
              </el-col>
              <el-col :span="5" class="el-colc" v-show="look">
                <label>有效日期</label>
                <el-date-picker
                  class="el-input2"
                    v-model="newData.effectiveDate"
                    type="date"
                    value-format="timestamp"
                    disabled
                >
                </el-date-picker>
              </el-col>
              <el-col :span="5" class="el-col" v-show="!look">
                <label>起运港</label>
                <el-input
                  v-model="newData.sendAddress"
                  class="el-inputs"
                  placeholder="请选择"
                  disabled
                ></el-input>
                <span class="comicon" v-if="newData.sendAddress" @click="newData.sendAddress = ''">
                  <i class="el-icon-circle-close"></i>
                </span>
                <span class="comicon" @click="arrTip(0)">
                  <i class="el-icon-search"></i>
                </span>
              </el-col>
              <el-col :span="5" class="el-col" v-show="look">
                <label>起运港</label>
                <el-input
                  v-model="newData.sendAddress"
                  class="el-inputs"
                  disabled
                ></el-input>
                <span class="comicon" @click="arrTip(0)">
                  <i class="el-icon-search"></i>
                </span>
              </el-col>
              <el-col :span="5" class="el-col" v-show="!look">
                <label>目的港</label>
                <el-input
                  v-model="newData.targetAddress"
                  class="el-inputs"
                  placeholder="请选择"
                  disabled
                ></el-input>
                <span class="comicon" v-if="newData.targetAddress" @click="newData.targetAddress = ''">
                  <i class="el-icon-circle-close"></i>
                </span>
                <span class="comicon" @click="arrTip(1)">
                  <i class="el-icon-search"></i>
                </span>
              </el-col>
              <el-col :span="5" class="el-col" v-show="look">
                <label>目的港</label>
                <el-input
                  v-model="newData.targetAddress"
                  class="el-inputs"
                  disabled
                ></el-input>
                <span class="comicon" @click="arrTip(1)">
                  <i class="el-icon-search"></i>
                </span>
              </el-col>
              <el-col :span="5" class="el-col" v-show="!look">
                <label>船名</label>
                <el-input
                  v-model="newData.shipName"
                  class="el-inputs"
                  placeholder="请输入"
                  disabled
                ></el-input>
              </el-col>
              <el-col :span="5" class="el-col" v-show="look">
                <label>船名</label>
                <el-input
                  v-model="newData.shipName"
                  class="el-inputs"
                  disabled
                ></el-input>
              </el-col>
              <el-col :span="5" class="el-col">
                <label>信用证状态</label>
                <el-select
                  clearable
                  v-model="newData.lcStatus"
                  placeholder="请选择"
                  class="el-select"
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
            <el-col
              :span="20"
              class="el-col"
              style="text-align:left;padding-left:10px;padding-bottom:40px;" v-show="!look"
            >
              <label style="width: 12.5%;text-align:right;">备注</label>
              <el-input
                style="width: 45%;"
                v-model="newData.remark"
                class="el-inputs"
                size="small"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入内容"
                :disabled="look||openLetter||honour"
              ></el-input>
            </el-col>
            <el-col
              :span="20"
              class="el-col"
              style="text-align:left;padding-left:10px;padding-bottom:40px;" v-show="look"
            >
              <label style="width: 12.5%;text-align:right;">备注</label>
              <el-input
                style="width: 45%;"
                v-model="newData.remark"
                class="el-inputs"
                size="small"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                disabled
              ></el-input>
            </el-col>
          </div>
          <div>
            <el-button class="firstbutton">开证合同</el-button>
          </div>
          <div class="button-div" v-show="getLetterStatus()">
            <el-button  icon="el-icon-plus" @click="bankadd(1)">增加行</el-button>
            <el-button  icon="el-icon-minus" @click="bankreduce(1)">删除行</el-button>
          </div>
          <div>
            <el-table
              :data="bankmsg"
              border
              style="width: 100%"
              @selection-change="bankChange"
              @select-all="dialogCheck"
              @select="dialogCheck"
              ref="bankmsgTables"
              max-height="288"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column type="index" label="行号" width="55"> </el-table-column>
              <el-table-column prop="soContractId" label="外部合同号">
                <template slot-scope="scope">
                  <div class="par_rela">
                    <el-input v-model="scope.row.contractNo" placeholder="请选择" disabled></el-input>
                    <span class="comicon2" @click="addList(scope.$index)">
                      <i class="el-icon-search"></i>
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="contractAmt" label="合同金额">
                <template slot-scope="scope">
                  <div><el-input :disabled="operation||openLetter||honour" v-model="scope.row.contractAmt" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="erpPoNo" label="采购合同号" >
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.erpPoNo" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="custName" label="销售客户" v-if="!look">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.custName" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="custName" label="销售客户" v-if="look">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.custName"></el-input>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <!-- 开证 -->
        <el-tab-pane label="开证" name="second">
          <div class="input-div" id="xtridate">
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span>开证日期</label>
              <el-date-picker
                v-model="lcIssueDate"
                type="date"
                :class="errorKey.includes('lcIssueDate') ? 'inputRed' : ''"
                placeholder="选择日期"
                :editable="false"
                :disabled="honour||look||openChange||editStatus||created"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label style="height:20px">信用证到期日期</label>
              <el-date-picker
                v-model="lcExpiredDate"
                type="date"
                placeholder="选择日期"
                :disabled="honour||look||openChange||editStatus||created"
                :editable="false"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span>开证银行</label>
              <el-input
                v-model="lcBankName"
                class="el-inputs"
                :class="errorKey.includes('lcBankName') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              ></el-input>
              <span class="comicon" @click="companyBankTip('a')">
                <i class="el-icon-search"></i>
              </span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>银行账号</label>
              <el-input
                v-model="issueBankAccount"
                class="el-inputs"
                disabled
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>开证类型</label>
              <el-select
                clearable
                v-model="lcIssueType"
                placeholder="请选择"
                class="el-select"
                :disabled="honour||look||openChange||editStatus||created"
              >
                <el-option
                  v-for="item in lcIssueTypeS"
                  :key="item.dict_code"
                  :label="item.dict_value"
                  :value="item.dict_code"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label style="height:20px">银行存款科目</label>
              <el-input
                v-model="subjectList.nameL2"
                class="el-inputs"
                 :class="errorKey.includes('subjectList') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              ></el-input>
              <span class="comicon" @click="getSubject()">
                <i class="el-icon-search"></i>
              </span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label style="height:20px">现金流量代码</label>
              <el-input
                v-model="flowList.fnameL2"
                class="el-inputs"
                 :class="errorKey.includes('flowList') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              ></el-input>
              <span class="comicon" @click="getFlow(0)">
                <i class="el-icon-search"></i>
              </span>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span>信用证号</label>
              <el-input
                v-model="lcNo"
                class="el-inputs"
                :class="errorKey.includes('lcNo') ? 'inputRed' : ''"
                :disabled="honour||look||openChange||editStatus||created"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span>开证币别</label>
              <el-input v-model="lcCurrencyCode" class="el-inputs"
              :class="errorKey.includes('lcCurrencyCode') ? 'inputRed' : ''" placeholder="请选择" disabled></el-input>
              <span class="comicon" @click="coinTip(1)"
                ><i class="el-icon-search"></i
              ></span>
            </el-col>
            <coin-select :labelName="'开证币别'" :coin.sync="coin" class="el-col el-col-5" ></coin-select>
            <el-col :span="5" class="el-col">
              <label>开证金额</label>
              <el-input
                v-model="lcAmt"
                class="el-inputs"
                placeholder="请输入"
                :disabled="honour||look||openChange||editStatus||created"
                 @input="changefhtype"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>保证金币别</label>
              <el-input v-model="bankMarginCurrency" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span class="comicon" @click="coinTip(2)"
                ><i class="el-icon-search"></i
              ></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label style="height:20px">保证金比率%</label>
              <el-input
                v-model="bankMarginRate"
                class="el-inputs"
                :disabled="honour||look||openChange||editStatus||created"
                 @input="changefhtype"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>保证金金额</label>
              <el-input
                v-model="bankMarginAmt"
                class="el-inputs"
                @input="changeType"
                 :disabled="honour||look||openChange||editStatus||created"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label style="height:20px">保证金科目</label>
              <el-input
                v-model="bankMarginAccount.nameL2"
                class="el-inputs"
                 :class="errorKey.includes('bankMarginAccount') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              ></el-input>
              <span class="comicon" @click="getSubject(1)">
                <i class="el-icon-search"></i>
              </span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label style="height:20px">保证金现金流量</label>
              <el-input
                v-model="bankMarginCashFlow.fnameL2"
                class="el-inputs"
                 :class="errorKey.includes('bankMarginCashFlow') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              ></el-input>
              <span class="comicon" @click="getFlow(1)">
                <i class="el-icon-search"></i>
              </span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label style="height:20px">过账日期</label>
              <el-date-picker
                v-model="issuePostDateS"
                type="date"
                placeholder="选择日期"
                disabled
                :editable="false"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label style="height:20px">冲销日期</label>
              <el-date-picker
                v-model="issueWriteoffDateS"
                type="date"
                placeholder="选择日期"
                disabled
                :editable="false"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label required>附件数量</label>
              <el-input
                v-model="attachmentCount"
                :disabled="honour||look||openChange||editStatus||created"
                v-input-filter:int
                type="number"
                class="el-inputs"
                :class="errorKey.includes('attachmentCount') ? 'inputRed' : ''"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-col>
          </div>
        </el-tab-pane>
        <!-- 承兑付款 -->
        <el-tab-pane label="承兑付款" name="third">
          <div class="cdInformation">承兑信息</div>
          <div class="button-div"  v-show="getManyStatus()">
            <el-button  icon="el-icon-plus" @click="bankadd(2)">增加行</el-button>
            <el-button  icon="el-icon-minus" @click="bankreduce(2)">删除行</el-button>
          </div>
          <div>
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              @selection-change="bankChange"
              @select-all="dialogCheckS"
              @select="dialogChecks"
              ref="multipletableData"
              max-height="288"
            >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column   prop="itemsRowNo" label="行号" width="55" > </el-table-column>
            <el-table-column prop="acceptanceDate" label="承兑日期">
                <template slot-scope="scope">
                  <div class="par_rela">
                    <el-date-picker :disabled="payMoney||look||scope.row.vertfyStatus" v-model="scope.row.acceptanceDate" type="date" placeholder="选择日期" :editable="false"></el-date-picker>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="acceptanceAmt" label="承兑金额">
                <template slot-scope="scope">
                  <div><el-input  :disabled="payMoney||look||scope.row.vertfyStatus" v-model="scope.row.acceptanceAmt" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="accountPayableDate" label="应付汇日期">
                <template slot-scope="scope">
                  <div>
                    <el-date-picker :disabled="payMoney||look||scope.row.vertfyStatus" v-model="scope.row.accountPayableDate" type="date" placeholder="选择日期" :editable="false"></el-date-picker>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="isNotPay" label="不付款">
                <template slot-scope="scope">
                  <div>
                    <el-select :disabled="payMoney||look||scope.row.vertfyStatus" clearable v-model="scope.row.isNotPay" placeholder="请选择" class="el-select">
                      <el-option v-for="item in trueOr" :key="item.dict_code" :label="item.dict_value" :value="item.dict_code"></el-option>
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="isDiscrepanced" label="有不符点" >
                <template slot-scope="scope">
                  <div>
                    <el-select :disabled="payMoney||look||scope.row.vertfyStatus" clearable v-model="scope.row.isDiscrepanced" placeholder="请选择" class="el-select">
                      <el-option v-for="item in trueOr" :key="item.dict_code" :label="item.dict_value" :value="item.dict_code"></el-option>
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="isRefusal" label="拒付">
                <template slot-scope="scope">
                  <div>
                    <el-select :disabled="payMoney||look||scope.row.vertfyStatus" clearable v-model="scope.row.isRefusal" placeholder="请选择" class="el-select">
                      <el-option v-for="item in trueOr" :key="item.dict_code" :label="item.dict_value" :value="item.dict_code"></el-option>
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="cdStatus" label="状态">
                <template slot-scope="scope">
                  <div>
                    <el-select disabled clearable v-model="scope.row.cdStatus" placeholder="请选择" class="el-select">
                      <el-option v-for="item in cDStatus" :key="item.dict_code" :label="item.dict_value" :value="item.dict_code"></el-option>
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注">
                <template slot-scope="scope">
                  <div><el-input  :disabled="payMoney||look||scope.row.vertfyStatus" v-model="scope.row.remark" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-show="payMoney||look" class="cdInformation">付款信息</div>
          <div v-show="payMoney" class="button-div">
            <el-button  icon="el-icon-plus" @click="bankadd()">增加行</el-button>
            <el-button  icon="el-icon-minus" @click="bankreduce()">删除行</el-button>
          </div>
           <div v-show="payMoney||look">
            <el-table
              :data="cdPay"
              border
              style="width: 100%"
              @selection-change="bankChange"
              @row-dblclick="bankclick"
              @select-all="dialogChecks"
              @select="dialogChecks"
              ref="multipleTables"
              max-height="288"
            >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="itemsRowNo" label="行号" width="55" > </el-table-column>
            <el-table-column prop="acceptanceRowNo" label="承兑行项目">
                <template slot-scope="scope">
                  <div class="par_rela">
                    <el-input disabled v-model="scope.row.acceptanceRowNo" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="payAmt" label="付款金额">
                <template slot-scope="scope">
                  <div>
                    <el-input disabled v-model="scope.row.payAmt" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="bankName" label="开户银行">
                <template slot-scope="scope">
                  <div>
                    <el-input size="mini" disabled :value="scope.row.bankName" placeholder="请选择"></el-input>
                    <!-- <span class="comicon2" @click="companyBankTip(scope.$index)">
                    <i class="el-icon-search"></i></span> -->
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="bankAccount" label="开户账户" >
                <template slot-scope="scope">
                  <div>
                    <el-input size="mini" disabled :value="scope.row.bankAccount" placeholder="请选择"></el-input>
                    <!-- <span class="comicon2" @click="companyBankTip(scope.$index)">
                    <i class="el-icon-search"></i></span> -->
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="isRefusal" label="银行科目">
                <template slot-scope="scope">
                  <div>
                    <el-input size="mini" disabled :value="scope.row.accountDesc" placeholder="请选择"></el-input>
                    <!-- <span class="comicon2" @click="companyBankTip(scope.$index)">
                    <i class="el-icon-search"></i></span> -->
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="payStatus" label="付款状态">
                <template slot-scope="scope">
                  <div>
                    <el-input disabled v-model="scope.row.payStatus" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="payDate" label="付款日期">
                <template slot-scope="scope">
                  <div>
                    <el-date-picker disabled v-model="scope.row.payDate" type="date" placeholder="选择日期" :editable="false"></el-date-picker>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="baseCurrencyRate" label="本位币汇率">
                <template slot-scope="scope">
                  <div>
                    <el-input disabled v-model="scope.row.baseCurrencyRate" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="payAmtBase" label="本位币金额">
                <template slot-scope="scope">
                  <div>
                    <el-input disabled v-model="scope.row.payAmtBase" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="currencyCode" label="开证币别">
                <template slot-scope="scope">
                  <div>
                    <el-input v-model="scope.row.currencyCode" class="el-inputs" placeholder="请选择" disabled></el-input>
                    <!-- <span class="comicon2" @click="coinTip"
                      ><i class="el-icon-search"></i
                    ></span> -->
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="attachmentCount" label="附件数量">
                <template slot-scope="scope">
                  <div>
                    <el-input v-model="scope.row.attachmentCount" class="el-inputs" placeholder="请选择" disabled></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="warrantCode"
                         label="凭证号"
                         show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="warrantMonth"
                              label="期间"
                              show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="writeoffWarrantCode"
                              label="冲销凭证号"
                              show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="writeoffWarrantMonth"
                              label="冲销期间"
                              show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="remark" label="备注">
                <template slot-scope="scope">
                  <div><el-input disabled v-model="scope.row.remark" placeholder="请输入"></el-input>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <!--打印及附件-->
      <el-tab-pane label="打印及附件" name="four">
        <div class="el-table-div">
          <div class="button-div">
            <el-upload
              class="upload-demo"
              ref="newupload"
              action="#"
              :before-upload="beforeUpload"
              :headers="uploadList.uploadHeaders"
              :multiple="false"
              :auto-upload="true"
              :limit="1"
              :file-list="uploadList.fileList"
              v-show="type!='look'&& type!='honour' && type!='openLetter' && type!='payMoney'"
            >
              <el-button
                slot="trigger"
                style="color:#3E3F42;"
                size="small"
                icon="el-icon-paperclip"
                type="button"
                >申请开证附件</el-button
              >
            </el-upload>
            <el-upload
              class="upload-demo"
              ref="newupload"
              action="#"
              :before-upload="beforeUpload2"
              :headers="uploadList.uploadHeaders"
              :multiple="false"
              :auto-upload="true"
              :limit="1"
              :file-list="uploadList.fileList"
              v-show="type=='honour'"
            >
              <el-button
                slot="trigger"
                style="color:#3E3F42;"
                size="small"
                icon="el-icon-paperclip"
                type="button"
                >承兑附件</el-button
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
          >
            <!-- <el-table-column
              v-if="type != 3"
              type="selection"
              width="45"
              align="center"
            ></el-table-column> -->
            <el-table-column
              label="序号"
              type="index"
              width="60"
              align="center"
            ></el-table-column>
            <el-table-column prop="fileOldName" label="文件名称">
            </el-table-column>
            <el-table-column label="文件类型">
              <template slot-scope="scope">
                {{scope.row.fileType==1?"申请开证附件":"承兑附件"}}
              </template>
            </el-table-column>
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
                    v-if="(scope.row.fileType==1 && type!='honour'
                    &&  type!='look' && type!='openLetter'  && type!='payMoney') ||
                    (scope.row.fileType==2 && type=='honour')"
                    size="mini"
                    type="text"
                    style="height: 26px;padding: 0;width:40px;"
                    @click="delFile(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
        <!-- 系统信息 -->
        <el-tab-pane label="系统信息" name="fifth" style="height:260px">
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
        <el-tab-pane label="流程详情"
                   name="lcxq">
        <div class="input-div input-div-bor bortop0">
          <v-exmineStatus :id="idItem"></v-exmineStatus>
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
    <!-- 选择员工弹窗 -->
    <staff-select
      v-if="staffShow"
      :tipShow="staffShow"
      :data="branchName"
      @staffCancle="staffCancle"
      @staffSure="staffSure"
    >
    </staff-select>
    <!-- 选择供应商弹窗 -->
    <supplier-select
      v-if="supplierShow"
      :tipShow="supplierShow"
      @supplierCancle="supplierCancle"
      @supplierSure="supplierSure"
    ></supplier-select>
    <!-- 选择国家弹窗 -->
    <country-select
      v-if="countryShow"
      :tipShow="countryShow"
      @countryCancle="countryCancle"
      @countrySure="countrySure"
    ></country-select>
    <!-- 选择银行弹窗 -->
    <supplier-bank-popup
      v-if="supplierBankShow"
      :supplierId="newData.supplierId || companyId"
      :tipShow="supplierBankShow"
      @tipsCancle="supplierBankCancle"
      @tipsSure="supplierBankSure"
    ></supplier-bank-popup>
    <!-- 船港 -->
    <Arr-select
      v-if="arrShow"
      :tipShow="arrShow"
      @ArrialPortCancle="ArrialPortCancle"
      @ArrialPortSure="ArrialPortSure"
    ></Arr-select>
    <!-- 选择合同弹窗 -->
    <cg-select
      v-if="cgShow"
      :companyId="newData.companyId"
      :supplierCode="newData.supplierCode"
      :orgCode="newData.orgCode"
      :paymentWay = "10210020"
      :tipShow="cgShow"
      @cgCancle="cgCancle"
      @cgSure="cgSure"
    ></cg-select>
    <!-- 选择银行 -->
    <company-bank-popup
      v-if="companyBankShow"
      :companyId="companyId"
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
    <!-- 选择付款增加行弹窗 -->
    <pay-select
      v-if="pay"
      :tipShow="pay"
      :companyId="companyId"
      :currencyCodeID="currencyCodeID"
      :list ="cdMssage"
      :data ="message"
      :suoYin ="suoYin"
      @payClose="payClose"
      @payTrue="payTrue"
    ></pay-select>
    <!-- 过账弹窗 -->
    <el-dialog title="过账" :visible.sync="post" width="25%">
      <div style="height:100px;line-height:100px;">
        <label style="margin-right:20px;vertical-align: middle;"><span class="must-full">*</span>过账日期</label>
          <el-date-picker
            class="el-input-date"
            size="mini"
            v-model="postDate"
            style="width:200px"
            type="date"
            placeholder="年/月/日"
          ></el-date-picker>
      </div>
      <div class="button-div2">
        <el-button icon="el-icon-check" @click="shenhe(0)">确定</el-button>
        <el-button icon="el-icon-close" type="primary" @click="shenhe(1)">取消</el-button>
      </div>
    </el-dialog>
    <!-- 冲销弹窗 -->
    <el-dialog title="冲销" :visible.sync="writeOffShow" width="25%">
      <div style="height:100px;line-height:50px;">
        <label style="margin-right:20px;vertical-align: middle;"><span class="must-full">*</span>冲销日期</label>
          <el-date-picker
            class="el-input-date"
            size="mini"
            v-model="writeOffDate"
            style="width:200px"
            type="date"
            placeholder="年/月/日"
          ></el-date-picker>
          <div>
            <label style="width: 6.5%;margin-right:20px;vertical-align: middle;"><span class="must-full">*</span>冲销原因</label>
              <el-input
                style="width: 50%;"
                v-model="writeOffReason"
                class="el-inputs"
                size="small"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入内容"
              ></el-input>
          </div>
      </div>
      <div class="button-div2">
        <el-button icon="el-icon-check" @click="writeOffShowS(0)">确定</el-button>
        <el-button icon="el-icon-close" type="primary" @click="writeOffShowS(1)">取消</el-button>
      </div>
    </el-dialog>
    <!-- 提交弹窗 -->
    <el-dialog title="提交弹窗" :visible.sync="submit" width="25%">
      <div style="height:100px;line-height:100px;text-align: center;">
        <label>确认提交承兑信息吗</label>
      </div>
      <div class="button-div2">
        <el-button icon="el-icon-check" @click="cdInformationPost(0)">确定</el-button>
        <el-button icon="el-icon-close" type="primary" @click="cdInformationPost(1)">取消</el-button>
      </div>
    </el-dialog>
    <!-- 审核弹窗 -->
    <el-dialog title="审核弹窗" :visible.sync="examine" width="25%">
      <div style="height:100px;line-height:100px;text-align: center;">
        <el-radio v-model="examStatus" label="1">审批</el-radio>
        <el-radio v-model="examStatus" label="0">驳回</el-radio>
      </div>
      <div class="button-div2">
        <el-button icon="el-icon-check" @click="verifyTrue(0)">确定</el-button>
        <el-button icon="el-icon-close" type="primary" @click="verifyTrue(1)">取消</el-button>
      </div>
    </el-dialog>
    <!-- 开证过账弹窗 -->
    <el-dialog title="开证过账" :visible.sync="honourPost" width="25%">
      <div style="height:100px;line-height:100px;">
        <label style="margin-right:20px;vertical-align: middle;">开证过账日期</label>
          <el-date-picker
            class="el-input-date"
            size="mini"
            v-model="issuePostDate"
            style="width:180px"
            type="date"
            placeholder="年/月/日"
          ></el-date-picker>
      </div>
      <div class="button-div2">
        <el-button icon="el-icon-check" @click="honourPostTrue(0)">确定</el-button>
        <el-button icon="el-icon-close" type="primary" @click="honourPostTrue(1)">取消</el-button>
      </div>
    </el-dialog>
    <!-- 开证冲销弹窗 -->
    <el-dialog title="开证冲销" :visible.sync="honourWriteOffShow" width="25%">
      <div style="height:100px;line-height:100px;">
        <label style="margin-right:20px;vertical-align: middle;">开证冲销日期</label>
          <el-date-picker
            class="el-input-date"
            size="mini"
            v-model="issueWriteoffDate"
            style="width:180px"
            type="date"
            placeholder="年/月/日"
          ></el-date-picker>
      </div>
      <div class="button-div2">
        <el-button icon="el-icon-check" @click="honourWriteOffShowTrue(0)">确定</el-button>
        <el-button icon="el-icon-close" type="primary" @click="honourWriteOffShowTrue(1)">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
// import { service, serviceJson } from "../../axios/index.js";
import {
  letterReceipt,
  letterStatus,
  selectFiLcReceiveList,
  reduceMsg,
  postingFiLcReceive,
  writeOffAcceptancePay,
  saveFiLcReceive,
  selectFiLcReceiveById,
  selectItemList,
  update,
  delFiLcIssueItems,
  opening,
  delAcceptance,
  saveAcceptance,
  selectAcceptanceList,
  delAcceptancePay,
  saveAcceptancePay,
  selectAcceptancePayList,
  postAcceptancePay,
  selectFiLcIssueById,
  openChange,
  examAcceptance,
  submitAcceptance
} from "@/api/letterManage/openLetter";
import API from "@/api/letterManage/openLetter";
import ExmineStatus from '@/components/exmineStatus'
import companyBankPopup from "@/components/companyBankPopup.vue";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import staffSelect from "@/components/staffSelect.vue";
import ArrSelect from "@/components/ArrivalPort.vue";
import supplierBankPopup from "@/components/supplierBankPopup.vue";
import countrySelect from "@/components/countrySelect.vue";
import cgSelect from "@/components/cgSelect.vue"; //合同
import supplierSelect from "@/components/supplierSelect.vue";
import coinSelect from "@/components/coinSelect.vue";//币别
import paySelect from "@/views/fundsManage/letterManage/establish/paySelect";//创建
import subjectFrame from "@/components/subjectFrame.vue";//科目
import flowCode from "@/components/flowCode.vue";//流量
import uploadApi from "@/api/component";
export default {
  props: {},
  data() {
    return {
      idItem: [],
      writeOffShow: false,//冲销
      post: false,//过账
      claim: false,
      honourPost:false,//开证过账
      honourWriteOffShow:false,//开证冲销
      collections: false,
      types: "", //记录操作
      msgid: "", //记录数据id
      id:"",//id
      msgcode: "", //记录数据code
      version: "", //记录带过来的版本号
      operation: true, //记录是否是查看状态
      supplierName: ``, //供应商
      supplierShow: false,
      coinShow: false, //币种弹窗
      country: ``, //国家
      countryShow: false,
      supplierBank: ``, //银行
      supplierBankShow: false,
      lcIssueDate: "", //开证日期
      lcExpiredDate: "", //信息到证日期
      arrShow: false,
      suoYin:"",
      coin: {}, //币种
      cgShow: false, //采购合同
      newData: {}, //创建页面数据
      opres: true, //记录是否是新增状态
      xyzMessage: [], //信用证属性
      mytypearr: [], //业务性质下拉数据
      ydtypearr: [], //信用证类型下拉数据
      rkdtypearr: [], //信用证性质下拉数据
      fhtypearr: [], //贸易类型下拉数据
      xyzStatus: [], //信用证状态下拉
      lcIssueType: "", //开证类型
      lcIssueTypeS: [], //开证类型下拉
      lcNo: "", //信用证号
      issueBankAccount:"",//开证银行账号
      lcAmt: "", //开证金额
      bankMarginRate: "", //保证金比率
      bankMarginAmt: "", //保证金金额
      type:"",//页面状态
      activeName: "first", //tab切换
      portTypr: ``, //0起始 0目的
      look:false,//查看状态
      companyId:"",//公司id
      tableData:[],//承兑表格
      bankmsg: [], //表格信息
      trueOr: [], //承兑下拉
      tableDataS:{},//承兑信息
      payMoney:false,//付款显示
      companyBankShow: false,
      cdPay:[],//承兑付款数据
      cdPayS:{},//承兑付款信息
      pay:false,//付款新增
      postDate:"",//过账日期
      message:{},//付款明细
      cdMssage:{},//承兑明细
      writeOffDate:"",//冲销日期
      writeOffReason:"",//冲销原因
      attachmentCount:"", //附件数量
      lcCurrencyCode:"",//开证币别
      bankMarginCurrency:"",//保证金币别
      lcBankName:"",//开征银行
      lcBankCode:"",//开证银行Code
      moneyType:0,//开证币别区分
      componyShow: false, //银行弹窗
      companyName: {}, //公司
      branchName: ``, //部门
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      staffName: ``, //员工
      creattime: "",
      createdTime: "", //创建日期
      updatedTime: "", //修改日期
      createdBy: "", //创建人
      updatedBy: "", //修改人
      bankreduces: [], //表格选择数据
      bankindex: "", //选择数据的索引
      openLetter:false,//选择开证基础信息不可编辑
      honour:false,//选择承兑基础信息和开证信息不可编辑
      honourS:false,//承兑按钮展示
      heTArray:{},
      currencyCodeID:"",//本位币code
      openChange:false,//变更开证
      editStatus:false,
      created:false,
      examine: false,//审核弹窗
      examStatus: "1",//审核驳回状态
      reducemsg:[],
      list:{},
      cDStatus:[],//承兑状态下拉
      submit: false,//提交弹窗
      array:{},//承兑提交对象
      lcDay: false,
      applyDate:"",//申请日期
      deadlineLoaddate:"",//最迟装期
      cashFlow:"",//科目
      account:"",//流量
      subject:false,//科目
      subjectList:{},//科目数据
      flow:false,//流量
      flowList:{},//流量数据
      cashFlowCode:"",//流量code
      cashFlowName:"",//流量name
      accountCode:"",//科目code
      accountName:"",//科目name
      issuePostDate:"",///开证过账日期
      issueWriteoffDate:"",///开证冲销日期
      issuePostDateS:"",///开证过账日期
      issueWriteoffDateS:"",///开证冲销日期
      longNumber:"",
      bankMarginAccountIndex:"",//保证金科目索引
      bankMarginAccount:{},//保证金科目
      bankMarginCashFlowIndex:"",//保证金流量索引
      bankMarginCashFlow:{},//保证金流量
      uploadList: {
        tableList: [],
        fileList: [], //文件
        uploadHeaders: { "content-Type": "multipart/form-data" } //文件上传的格式
      },
      openChange:"",//开证变更
      errorKey:[]
    };
  },
  computed: {

  },
  // created() {},
  created() {
    console.log(openChange);
    this.newData = this.$route.params.data;
    this.lcDay = this.newData.lcDay;
    this.companyId = this.$route.params.companyId;
    if(this.newData){
      if (this.newData.tradeType) {
        this.newData.tradeType  = ""
      }
      if (this.newData.lcProperty) {
        this.newData.lcProperty  = ""
      }
      this.deadlineLoaddate = this.newData.deadlineLoaddate
      this.newData.extNo = this.newData.extCode;
      this.heTArray={
        contractNo:this.newData.extNo,
        contractAmt:this.newData.contractAmtVat,
        erpPoNo :this.newData.poNo,
        custName :this.newData.custName
      }
      this.bankmsg.push(this.heTArray);
      this.applyDate = new Date();
    }
    this.msgid = this.$route.params.msgid;
    this.type = this.$route.params.type;
    this.created = this.$route.params.created;
    this.id = this.$route.params.id;
    this.look = this.$route.params.look;
    this.status =this.$route.params.lcStatus;
    this.currencyCodeID =this.$route.params.currencyCode;
    this.payMoney =this.$route.params.payMoney;
    if(this.type =="openLetter"){
      this.activeName = "second";
      this.getmoremsg();
      this.getEdit();
      this.getSelectFiLcIssueById();
      this.openLetter = true;
    }else if(this.type =="honour"){
      this.activeName = "third";
      this.getmoremsg();
      this.getEdit();
      this.getCdInformation();
      this.getSelectFiLcIssueById();
      this.honour = true;
      this.honourS = true;
    }else if(this.type == "payMoney"){
      this.activeName = "third";
      this.getmoremsg();
      this.getEdit();
      this.getCdInformation();
      this.getSelectAcceptancePayList();
      this.getSelectFiLcIssueById();
      this.honour = true;
    }
    this.msgcode = this.$route.params.msgcode;
    this.version = this.$route.params.version;
    this.getMylxs();
    this.getydlx();
    this.getrkdzt();
    this.getcd();
    this.getfhlx();
    this.getXyz();
    this.getCDStatus();
    this.getXyzStatus();
    this.getlcIssueType();
    if(this.type=="edit"){
      this.editStatus = true;
    }
    if (this.type=="edit"||this.type=="look") {
      //如果是查看和修改状态 加载数据
      this.getmoremsg();
      this.getEdit();
      this.getSelectFiLcIssueById();
      this.getCdInformation();
      this.getSelectAcceptancePayList();
    }
    if(this.type == "honour"){
      this.getCdInformation();
    }
    if(this.type == "payMoney"){
      this.getCdInformation();
      this.getSelectAcceptancePayList();
    }
    if(this.type == "openChange"){
      this.getmoremsg();
      this.getEdit();
      this.getSelectFiLcIssueById();
      this.openChange = true;
    }
    if(this.type!="creat"){
      this.selectFileList(this.id);
    }

  },
  watch: {

  },
  methods: {
    aaaaaa(val){

    },

    //文件上传
    beforeUpload(file) {
      let formdata = new FormData();
      formdata.append("file", file); //传文件
      this.submitUpload(formdata,1);
      return false;
    },
    beforeUpload2(file) {
      let formdata = new FormData();
      formdata.append("file", file); //传文件
      this.submitUpload(formdata,2);
      return false;
    },
    //确定上传
    submitUpload(formdata,type) {
      //确定上传
       uploadApi.uploadFile(formdata).then(res=>{
         if (res.code == "success") {
          this.uploadList.fileList = [];
          let fileData = res.data;
          let obj = {
            fileOldName: fileData.oldFilename,
            fileNewName: fileData.newFilename,
            fileType:type, //文件类型 1
            fileSuffix: fileData.fileExt, //文件扩展名
            // fileAbsolutePath:"",//文件绝对路径
            // fileRelativePaths:"",//文件相对路径
            fileServerAddress: fileData.filePath, //文件服务器地址
            createdTime: this.$nowDate(),
            isInactive: 0, //启用，禁用
            createdName: sessionStorage.getItem("userName") || "admin"
          };
          this.uploadList.tableList.unshift(obj);
          this.$refs.newupload.submit();
        }
       })

    },
     //查询附件
    selectFileList(id) {
      if(!id){
        return;
      }
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
    //附件删除
    delFile(index, row) {
      this.$confirm("是否确定删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //没有保存
          if (row.accessoryId) {
            let data = {
              accessoryId: row.accessoryId,
              version: row.version
            };
            uploadApi
              .delFif(data)
              .then(res => {
                if (res.code == "success") {
                  this.$openSuccess(res.message);
                  this.uploadList.tableList.splice(index, 1);
                } else {
                  this.$openWarning(res.message);
                }
              })
              .catch();
          } else {
            this.uploadList.tableList.splice(index, 1);
            this.$openSuccess("删除成功");
          }
        })
        .catch();
    },
    //预览
    download(row) {
      window.open(row.fileServerAddress);
    },
    indexMethod(index) {
      return (index + 1) * 10;
    },
    getmoremsg() {
      selectFiLcReceiveById({
        id: this.id,
        version:this.version
      }).then(res => {
        if (res.code === "success") {
          this.newData = res.data;
          this.applyDate = this.newData.applyDate;
          this.deadlineLoaddate = this.newData.deadlineLoaddate;
          this.newData.lcStatus=""+this.newData.lcStatus;
          // if(this.newData.lcStatus==10560005){
          //   this.newData.lcStatus="保存"
          // }else if(this.newData.lcStatus==10560010){
          //   this.newData.lcStatus="审批中"
          // }else if(this.newData.lcStatus==10560015){
          //   this.newData.lcStatus="已审批"
          // }else if(this.newData.lcStatus==10560020){
          //   this.newData.lcStatus="开证"
          // }else if(this.newData.lcStatus==10560025){
          //   this.newData.lcStatus="付款"
          // }else if(this.newData.lcStatus==10560040){
          //   this.newData.lcStatus="承兑"
          // }else if(this.newData.lcStatus==10560045){
          //   this.newData.lcStatus="结清"
          // }else if(this.newData.lcStatus==10560050){
          //   this.newData.lcStatus="已驳回"
          // }else if(this.newData.lcStatus==10560055){
          //   this.newData.lcStatus="已驳回"
          // }else if(this.newData.lcStatus==10560050){
          //   this.newData.lcStatus="已驳回"
          // }
          // if (this.newData.tradeType == 10920005) {
          //   this.newData.tradeType = "内贸";
          // } else if (this.newData.tradeType == 10920010) {
          //   this.newData.tradeType = "转口贸易";
          // } else if (this.newData.tradeType == 10920015) {
          //   this.newData.tradeType = "一般贸易进口";
          // } else {
          //   this.newData.tradeType = "内采外销";
          // }
          // if (this.newData.lcProperty == 10770005) {
          //   this.newData.lcProperty = "可撤销可转让";
          // } else if (this.newData.lcProperty == 10770010) {
          //   this.newData.lcProperty = "可撤销不可转让";
          // } else if (this.newData.lcProperty == 10770015) {
          //   this.newData.lcProperty = "不可撤销可转让";
          // } else {
          //   this.newData.lcProperty = "不可撤销不可转让";
          // }
          // if (this.newData.bizNature == 10910005) {
          //   this.newData.bizNature = "自营";
          // } else {
          //   this.newData.bizNature = "代理";
          // }
          // if (this.newData.lcDueType == 10220005) {
          //   this.newData.lcDueType = "即期";
          // } else {
          //   this.newData.lcDueType = "远期";
          // }
          // if (this.newData.lcType == 10570005) {
          //   this.newData.lcType = "国内信用证";
          // } else {
          //   this.newData.lcType = "国际信用证";
          // }
        }
      })
    },
    getEdit(){
      selectItemList({
        fiLcIssueId: this.id,
      }).then(res => {
        if (res.code === "success") {
          this.bankmsg = res.data;
          let arr = [this.id];
          this.bankmsg.forEach(item => {
            arr.push(item.id);
          })
          this.idItem = arr;
        }
      })
    },
    verifyTrue(e) {

      this.list.acceptanceList=this.reducemsg;
      this.list.examStatus = parseInt(this.examStatus)
      if (e == 0) {
        examAcceptance(this.list).then(res => {
          if (res.code === "success") {
            this.examine = false;
            this.getCdInformation();
          }
        });
      } else {
        this.examine = false;
      }
    },
    cdInformationPost(e) {
      // if (this.newData.tradeType) {
      //   if (this.newData.tradeType == "内贸") {
      //     this.newData.tradeType = 10920005;
      //   } else if (this.newData.tradeType == "转口贸易") {
      //     this.newData.tradeType = 10920010;
      //   } else if (this.newData.tradeType =="一般贸易进口" ) {
      //     this.newData.tradeType = 10920015;
      //   } else {
      //     this.newData.tradeType = 10920020;
      //   }
      // }
      // this.newData.lcStatus=parseInt(this.newData.lcStatus);
      // if(this.newData.lcProperty){
      //   if (this.newData.lcProperty =="可撤销可转让" ) {
      //     this.newData.lcProperty =10770005 ;
      //   } else if (this.newData.lcProperty == "可撤销不可转让") {
      //     this.newData.lcProperty = 10770010;
      //   } else if (this.newData.lcProperty == "不可撤销可转让") {
      //     this.newData.lcProperty = 10770015;
      //   } else {
      //     this.newData.lcProperty = 10770020;
      //   }
      // }
      // if(this.newData.bizNature){
      //   if (this.newData.bizNature == "自营") {
      //     this.newData.bizNature = 10910005;
      //   } else {
      //     this.newData.bizNature = 10910010;
      //   }
      // }
      // if(this.newData.lcDueType){
      //   if (this.newData.lcDueType == "即期") {
      //     this.newData.lcDueType = 10220005;
      //   } else {
      //     this.newData.lcDueType = 10220010;
      //   }
      // }
      // if(this.newData.lcType){
      //   if (this.newData.lcType == "国内信用证") {
      //     this.newData.lcType = 10570005;
      //   } else {
      //     this.newData.lcType = 10570010;
      //   }
      // }
      this.newData.itemsList = this.bankmsg;
      this.newData.sysSystemAccessoryList=this.uploadList.tableList;
      this.newData.acceptanceList=this.reducemsg;
      if (e == 0) {
        submitAcceptance(this.newData).then(res => {
          if (res.code === "success") {
            this.submit = false;
            this.getCdInformation();
          }
        });
      } else {
        this.submit = false;
      }
    },
    getcd() {
      //获取承兑下拉数据
      this.trueOr = [
        { dict_code: 0, dict_value: "是" },
        { dict_code: 1, dict_value: "否" }
      ];
    },
    getCdInformation(){
      selectAcceptanceList({
        fiLcIssueId: this.id,
      }).then(res => {
        if (res.code === "success") {
          res.data.map((item,index) => {
            if(res.data[index].status===11010010){
              res.data[index].vertfyStatus = true
            }else{
              res.data[index].vertfyStatus = false
            }
            if(res.data[index].status==11010005){
              res.data[index].cdStatus ="保存"
            }else if(res.data[index].status==11010010){
              res.data[index].cdStatus ="已审核"
            }else if(res.data[index].status==11010015){
              res.data[index].cdStatus ="已驳回"
            }else if(res.data[index].status==11010020){
              res.data[index].cdStatus ="承兑审批中"
            }
          })
          this.tableData = res.data
        }
      })
    },
    getSelectAcceptancePayList(){
      selectAcceptancePayList({
        fiLcIssueId: this.id,
      }).then(res => {
        if (res.code === "success") {
          res.data.map((item,index) => {
            if(res.data[index].payStatus==10670005){
              res.data[index].payStatus ="已保存"
            }else if(res.data[index].payStatus==10670010){
              res.data[index].payStatus ="已过账"
            }else if(res.data[index].payStatus==10670015){
              res.data[index].payStatus ="已冲销"
            }
          })
          this.cdPay = res.data
        }
      })
    },
    getSelectFiLcIssueById(){
      selectFiLcIssueById({
        fiLcIssueId: this.id,
      }).then(res => {
        if (res.code === "success") {
          this.lcIssueDate = res.data.lcIssueDate,
          this.lcExpiredDate = res.data.lcExpiredDate,
          this.lcCurrencyCode = res.data.lcCurrencyCode,
          this.bankMarginCurrency = res.data.bankMarginCurrency,
          this.lcBankName = res.data.lcBankName;
          if(res.data.lcIssueType==10220010){
            this.lcIssueType = "远期"
          }
          if(res.data.lcIssueType==10220005){
            this.lcIssueType = "即期"
          }
          this.lcNo = res.data.lcNo,
          this.issueBankAccount = res.data.issueBankAccount,
          this.lcAmt = res.data.lcAmt,
          this.bankMarginRate = res.data.bankMarginRate,
          this.bankMarginAmt = res.data.bankMarginAmt;
          this.issuePostDateS = res.data.issuePostDate,
          this.issueWriteoffDateS = res.data.issueWriteoffDate;
          this.attachmentCount = res.data.attachmentCount;
          if(res.data.accountCode){
            this.subjectList.nameL2 = res.data.accountCode+" "+res.data.accountName
          }else{
            this.subjectList.nameL2= ""
          }
          if(res.data.cashFlowCode){
            this.flowList.fnameL2 = res.data.cashFlowCode+" "+res.data.cashFlowName
          }else{
            this.flowList.fnameL2= ""
          }
          if(res.data.bankMarginAccountCode){
            this.bankMarginAccount.nameL2 = res.data.bankMarginAccountCode+" "+res.data.bankMarginAccountName
          }else{
            this.bankMarginAccount.nameL2= ""
          }
          if(res.data.bankMarginCashFlowCode){
            this.bankMarginCashFlow.fnameL2 = res.data.bankMarginCashFlowCode+" "+res.data.bankMarginCashFlowName
          }else{
            this.bankMarginCashFlow.fnameL2= ""
          }
        }
      })
    },
    shenhe(e) {
      if (e == 0) {
        if(!this.postDate){
          this.$message({
            message: "请填写过账时间",
            type: "warning"
          });
          return;
        }
        this.bankreduces.postDate = this.postDate;
        postAcceptancePay(this.bankreduces).then(res => {
          if (res.code === "success") {
            this.post = false;
            this.postDate = "";
            this.$router.push({
              name: "establishmentIndex",
            });
          }
        });
      } else {
        this.post = false;
      }
    },
    outPost(){

      if (this.bankreduces.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
      }
      if(this.bankreduces.payStatus == "已保存"){
        this.bankreduces.payStatus =10670005
      }
      if(this.bankreduces.payStatus == 10670005) {
          this.post = true;
      }else {
        this.$message({
          message: "请选择正确数据",
          type: "warning"
        });
        return;
      }
    },
    verify(){
      if (this.reducemsg.length === 0) {
          this.$message({
            message: "至少选择一条数据",
            type: "warning"
          });
          return;
      }

      for (let index = 0; index < this.reducemsg.length; index++) {
        if(!this.reducemsg[index].id){
          this.$openWarning("请选择正确数据");
          return;
        }
        if(this.reducemsg[index].status==11010020){
          this.examine = true;
        }else{
          this.$openWarning("请选择正确数据");
          return;
        }
      }
    },
    cdPost(){
      if (this.reducemsg.length === 0) {
          this.$message({
            message: "至少选择一条数据",
            type: "warning"
          });
          return;
      }

      for (let index = 0; index < this.reducemsg.length; index++) {
        if(!this.reducemsg[index].id){
          this.$openWarning("请选择正确数据");
          return;
        }
        if(this.reducemsg[index].status==11010005||this.reducemsg[index].status==11010015){
          this.submit = true;
        }else{
          this.$openWarning("请选择正确数据");
          return;
        }
      }
    },
    writeOffShowS(e) {
      if (e == 0) {
        if(!this.writeOffDate){
          this.$message({
            message: "请填写冲销时间",
            type: "warning"
          });
          return;
        }
        if(!this.writeOffReason){
          this.$message({
            message: "请填写冲销原因",
            type: "warning"
          });
          return;
        }
        this.bankreduces.writeOffDate = this.writeOffDate;
        this.bankreduces.writeOffReason = this.writeOffReason;
        writeOffAcceptancePay(this.bankreduces).then(res => {
          if (res.code === "success") {
            this.writeOffDate = "";
            this.writeOffReason = "";
            this.writeOffShow = false;
            this.$router.push({
              name: "establishmentIndex",
            });
          }
        });
      } else {
        this.writeOffShow = false;
      }
    },
    charge(){
      if (this.bankreduces.length === 0) {
          this.$message({
            message: "请先选择一条数据",
            type: "warning"
          });
          return;
      }
      // if(this.bankreduces.payStatus){
        if(this.bankreduces.payStatus == "已过账"){
        this.bankreduces.payStatus =10670010
      }
        if(this.bankreduces.payStatus == 10670010) {
          this.writeOffShow = true;
        // }
      }else {
        this.$message({
          message: "请选择正确数据",
          type: "warning"
        });
        return;
      }
    },
    honourOutPost(){
      if(this.status==10560020){
        this.honourPost=true
      }else{
        this.$openWarning("请选择开证数据");
        return false;
      }
    },
    honourPostTrue(e) {
        if(this.subjectList.nameL2){
           this.accountCode = this.subjectList.nameL2.trim().split(" ")[0]
           this.accountName = this.subjectList.nameL2.trim().split(" ")[1]
        }
        if(this.flowList.fnameL2){
           this.cashFlowCode = this.flowList.fnameL2.trim().split(" ")[0]
           this.cashFlowName = this.flowList.fnameL2.trim().split(" ")[1]
        }
        if(this.bankMarginAccount.nameL2){
           this.bankMarginAccountCode = this.bankMarginAccount.nameL2.trim().split(" ")[0]
           this.bankMarginAccountName = this.bankMarginAccount.nameL2.trim().split(" ")[1]
        }
        if(this.bankMarginCashFlow.fnameL2){
           this.bankMarginCashFlowCode = this.bankMarginCashFlow.fnameL2.trim().split(" ")[0]
           this.bankMarginCashFlowName = this.bankMarginCashFlow.fnameL2.trim().split(" ")[1]
        }

      if(this.lcIssueType=="远期"){
        this.lcIssueType = 10220010;
      }
      if(this.lcIssueType=="即期"){
        this.lcIssueType = 10220005;
      }
      if (e == 0) {
        let data={
          id:this.id,
          version:this.version,
          lcStatus:this.status,
          accountCode:this.accountCode,
          accountName:this.accountName,
          cashFlowCode:this.cashFlowCode,
          cashFlowName:this.cashFlowName,
          bankMarginAccountCode:this.bankMarginAccountCode,
          bankMarginAccountName:this.bankMarginAccountName,
          bankMarginCashFlowCode:this.bankMarginCashFlowCode,
          bankMarginCashFlowName:this.bankMarginCashFlowName,
          lcIssueDate:this.lcIssueDate,
          lcExpiredDate:this.lcExpiredDate,
          lcCurrencyCode:this.lcCurrencyCode,
          bankMarginCurrency:this.bankMarginCurrency,
          lcBankCode	:this.lcBankCode,
          lcBankName	:this.lcBankName,
          lcIssueType:this.lcIssueType,
          lcNo:this.lcNo,
          issueBankAccount:this.issueBankAccount,
          lcAmt:this.lcAmt,
          bankMarginRate:this.bankMarginRate,
          bankMarginAmt:this.bankMarginAmt,
          issuePostDate:this.issuePostDate,
          attachmentCount:this.attachmentCount
        }
        API.openingPost(data).then(res => {
          if (res.code === "success") {
            this.honourPost = false;
            this.issuePostDate = "";
            this.$router.push({
              name: "establishmentIndex"
            });
          }
        });
      } else {
        this.honourPost = false;
      }
    },
    honourCharge(){
      if(this.status==10560060){
        this.honourWriteOffShow=true
      }else{
        this.$openWarning("请选择开证过账数据");
        return false;
      }
    },
    honourWriteOffShowTrue(e) {
      if(this.lcIssueType=="远期"){
        this.lcIssueType = 10220010
      }
      if(this.lcIssueType=="即期"){
        this.lcIssueType = 10220005
      }
      if (e == 0) {
        let data={
          id:this.id,
          version:this.version,
          lcStatus:this.status,
          accountCode:this.accountCode,
          accountName:this.accountName,
          cashFlowCode:this.cashFlowCode,
          cashFlowName:this.cashFlowName,
          bankMarginAccountCode:this.bankMarginAccountCode,
          bankMarginAccountName:this.bankMarginAccountName,
          bankMarginCashFlowCode:this.bankMarginCashFlowCode,
          bankMarginCashFlowName:this.bankMarginCashFlowName,
          lcIssueDate:this.lcIssueDate,
          lcExpiredDate:this.lcExpiredDate,
          lcCurrencyCode:this.lcCurrencyCode,
          bankMarginCurrency:this.bankMarginCurrency,
          lcBankCode	:this.lcBankCode,
          lcBankName	:this.lcBankName,
          lcIssueType:this.lcIssueType,
          lcNo:this.lcNo,
          issueBankAccount:this.issueBankAccount,
          lcAmt:this.lcAmt,
          bankMarginRate:this.bankMarginRate,
          bankMarginAmt:this.bankMarginAmt,
          issuePostDate:this.issuePostDateS,
          issueWriteoffDate:this.issueWriteoffDate
        }
        API.openingWriteOff(data).then(res => {
          if (res.code === "success") {
            this.honourWriteOffShow = false;
            this.issueWriteoffDate = "";
            this.$router.push({
              name: "establishmentIndex"
            });
          }
        });
      } else {
        this.issueWriteoffDate = "";
        this.honourWriteOffShow = false;
      }
    },
    getManyStatus(){
      if(this.payMoney==true){
        return false
      }else if(this.openLetter==true){
        return false
      }else if(this.editStatus==true){
        return false
      }else if(this.created==true){
        return false
      }else if(this.look==true){
        return false
      }else{
        return true
      }
    },
    getLetterStatus(){
      if(this.openLetter==true){
        return false
      }else if(this.honour==true){
        return false
      }else if(this.look==true){
        return false
      }else{
        return true
      }
    },
    getMylxs() {
      //获取业务性质数据
      letterStatus({
        dictNo: 1091
      }).then(res => {
        this.mytypearr = res.data;
      });
    },
    getXyzStatus() {
      //获取信用证状态
      letterStatus({
        dictNo: 1056
      }).then(res => {
        this.xyzStatus = res.data;
      });
    },
    changeState() {
      //贸易类型选择
      // console.log(this.mytype);
    },
    getXyz() {
      //获取信用证属性数据
      letterStatus({
        dictNo: 1077
      }).then(res => {
        this.xyzMessage = res.data;
      });
    },
    getCDStatus() {
      //获取信用证属性数据
      letterStatus({
        dictNo: 1101
      }).then(res => {
        this.cDStatus = res.data;
      });
    },
    getrkdzt() {
      //获取信用证性质
      letterStatus({
        dictNo: 1057
      }).then(res => {
        this.rkdtypearr = res.data;
      });
    },
    getydlx() {
      //获取信用证类型
      letterStatus({
        dictNo: 1022
      }).then(res => {
        this.ydtypearr = res.data;
      });
    },
    getlcIssueType() {
      //获取开证类型
      letterStatus({
        dictNo: 1022
      }).then(res => {
        this.lcIssueTypeS = res.data;
      });
    },
    changeydlx() {
      //移动类型选择
     // console.log(this.ydtype);
    },
    getfhlx() {
      //获取贸易类型
      letterStatus({
        dictNo: 1092
      }).then(res => {
        this.fhtypearr = res.data;
      });
    },
    //计算保证金金额
    changefhtype() {
      console.log(this.lcAmt)
      this.bankMarginRate = this.$filterPriceNum(this.bankMarginRate, 8);
      this.lcAmt = this.$filterPriceNum(this.lcAmt, 2);
      this.bankMarginAmt = this.lcAmt*this.bankMarginRate/100
      this.bankMarginAmt = this.bankMarginAmt.toFixed(2);
    },
    //计算保证金金额
    changeType() {
      console.log(this.lcAmt)
      this.bankMarginAmt = this.$filterPriceNum(this.bankMarginAmt, 2);
    },
    changerkd(val) {
      console.log(val)
      this.newData.lcDueType=val;
      if (this.newData.lcDueType == 10220005) {
        this.lcDay = true;
        this.newData.payDeadline = "";
      } else {
        this.lcDay = false;
      }
    },
    //供应商弹窗打开
    supplierTip() {
       if (this.type=="look"||this.bankmsg.length>0||this.openLetter==true||this.honour==true) {
        return;
      }
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
      this.newData.supplierName = e.supplierName;
      this.newData.supplierId = e.supplierId;
    },
    //科目弹窗打开
    getSubject(e) {
      if (this.type=="look"||this.honour==true||this.type=="edit"||this.created ==true) {
          return;
        }
      if(e==1){
        this.longNumber = 101205
        this.subject = true;
        this.bankMarginAccountIndex="aa"
      }else{
        this.longNumber = 1002
        this.subject = true;
        this.bankMarginAccountIndex=" "
      }
    },
    //科目弹窗关闭
    subjectCancle() {
      this.subject = false;
    },
    //科目弹窗确定获取数据
    subjectSure(e) {
      console.log(e)
      console.log(this.bankMarginAccountIndex)
      if(this.bankMarginAccountIndex=="aa"){
        this.subject = false;
        this.bankMarginAccount =  e;
      }else{
        this.subject = false;
        this.subjectList =  e;
      }
    },
    //流量弹窗打开
    getFlow(e) {
      if (this.type=="look"||this.honour==true||this.type=="edit"||this.created ==true) {
          return;
        }
        if(e==1){
          this.flow = true;
          this.bankMarginCashFlowIndex="aa"
        }else{
          this.flow = true;
          this.bankMarginCashFlowIndex=""
        }
    },
    //流量弹窗关闭
    flowCancle() {
      this.flow = false;
    },
    //流量弹窗确定获取数据
    flowSure(e) {
      console.log(e)
      if(this.bankMarginCashFlowIndex=="aa"){
        this.flow = false;
        this.bankMarginCashFlow =  e;
      }else{
        this.flow = false;
        this.flowList =  e;
      }
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      console.log(e)
      this.componyShow = false;
      this.companyName = e;
      this.newData.companyName = e.companyName;
      this.branchName = this.staffName = "";
    },
    //公司弹窗打开
    componyTip() {
      if (this.type=="look"||this.bankmsg.length>0||this.openLetter==true||this.honour==true) {
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
       if (this.type=="look"||this.bankmsg.length>0||this.openLetter==true||this.honour==true) {
        return;
      }
      // if (this.newData.companyName == "") {
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
      this.newData.orgName = e.oaBranchName;
    },
    //部门弹窗打开
    manTip() {
       if (this.type=="look"||this.openLetter==true||this.honour==true) {
        return;
      }
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
    //币种弹窗打开
    coinTip(aa) {
      if(aa==1||aa==2){
        if (this.type=="look" ||this.type=="payMoney"||this.honour==true||this.type=="edit"||this.created==true) {
          return;
        }
        if(aa==1){
          this.coinShow = true;
          this.moneyType =2;
        }else{
          this.coinShow = true;
          this.moneyType =3;
        }
      }else{
        if (this.type=="look" ||this.type=="payMoney"||this.openLetter==true||this.honour==true) {
          return;
        }
        this.coinShow = true;
      }
      //  if (this.type=="look" ||this.type=="payMoney") {
      //   return;
      // }
      // this.coinShow = true;
      // this.moneyType =aa;
    },
    //币种弹窗关闭
    coinCancle() {
      this.coinShow = false;
    },
    //币种弹窗确定获取数据
    coinSure(e) {
      this.coinShow = false;
      if(this.moneyType==2){
        this.lcCurrencyCode = e.currencyCode;
      }else if(this.moneyType==3){
        this.bankMarginCurrency = e.currencyCode;
      }else{
        this.newData.currencyCode = e.currencyCode;
        this.currency = e;
        API.getParitiesByCode({formCurrencyCode:this.newData.currencyCode, toCurrencyCode:this.newData.companyCurrencyCode}).then(res => {
            this.newData.currencyRate = res.data.parities;
          })
      }
    },
    //员工弹窗打开
    staffTip() {
       if (this.type=="look"||this.openLetter==true||this.honour==true) {
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
      this.newData.bizPersonName = e.empName;
    },
    //国家弹窗打开
    countryTip() {
       if (this.type=="look"||this.openLetter==true||this.honour==true) {
        return;
      }
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
      this.newData.supplierCountry = e.regionName;
    },
    //银行弹窗确定获取数据
    supplierBankTip(a) {
      if(a==1){
        if (this.type=="look"||this.honour==true) {
          return;
        }
        if (this.newData.supplierId == "") {
          this.$openWarning("请先选择供应商");
          return;
        }
        this.supplierBankShow = true;
      }
    },
    supplierBankCancle() {
      this.supplierBankShow = false;
    },
    supplierBankSure(e) {
      this.supplierBankShow = false;
      this.supplierBank = e;
      // this.lcBankName = e.bankName;
      // this.lcBankCode = e.bankCode;
      this.newData.supplierBankName = e.bankName;
    },
    //港口弹窗打开
    arrTip(e) {
       if (this.type=="look"||this.openLetter==true||this.honour==true) {
        return;
      }
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
      if (this.portTypr == 0) {
        this.newData.sendAddress = e.portName
      } else {
        this.newData.targetAddress = e.portName
      }
    },
    //弹窗打开
    addList(index) {
      if (this.type=="look"||this.openLetter==true||this.honour==true) {
        return;
      }
      this.cgShow = true;
      this.index = index;
    },
    //弹窗关闭
    cgCancle() {
      this.cgShow = false;
    },
    //弹窗确定获取数据
    cgSure(e) {
      this.cgSelect = e;
      let data = {
        contractNo: e.extCode,
        contractAmt: e.contractAmtVat,
        erpPoNo: e.poNo,
        custName: e.custName
      };
      this.bankmsg[this.index] = data;
      this.$set(this.bankmsg, this.index, data);
      this.cgShow = false;
    },
    //开户银行
    companyBankTip(index) {
      if(index=="a"){
        if (this.type=="look"||this.honour==true||this.type=="edit"||this.created ==true) {
          return;
        }
        if (this.newData.companyId == "") {
          this.$openWarning("请先选择公司");
          return;
        }
        this.companyBankShow = true;

      }else{
        if (this.type=="payMoney") {
          return;
        }
        if (this.companyId === null) {
          this.$openWarning("请先选择公司");
          return;
        } else {
          this.companyBankShow = true;
          this.index = index;
        }
      }

    },
    companyBankCancle() {
      this.companyBankShow = false;
    },
    companyBankSure(e) {
      if(this.openLetter = true){
        this.lcBankName = e.bankName;
        this.lcBankCode = e.bankCode;
        this.issueBankAccount = e.bankAccount;
        this.companyBankShow = false;
      }else{
        let data = this.tableDataS[this.index];
        data.receiptBankName = e.bankName;
        (data.contractAmt = e.contractAmtVat),
          (data.extCode = e.extCode),
          (data.custName = e.custName);
        this.$set(this.tableDataS, this.index, data);
        this.companyBankShow = false;
      }

    },
    //创建弹窗关闭
    payClose() {
      this.pay = false;
    },
    //创建弹窗确定获取数据
    payTrue(e) {
      this.pay = false;
      if(this.suoYin== 0|| this.suoYin>0){
        e[0].itemsRowNo=(this.cdPay.length+1)*10;
        this.cdPay = e;
      }else{
        e.accPayList[0].itemsRowNo=(this.cdPay.length+1)*10;
        this.cdPay.push(e.accPayList[0]);
      }
      console.log("aaac", this.cdPay);
    },
    //双击表格
    bankclick(row) {
      if(this.type=="payMoney"){
        this.message =this.cdPay;
        this.suoYin = this.cdPay.indexOf(row);
        console.log(this.suoYin)
        this.pay = true;
      }
    },
    bankChange(e) {
      //表格选择
      console.log(e);

      this.reducemsg = e;
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    // bankChangeS(val) {
    //   //表格选中数据
    //   console.log(val);
    //   this.reducemsg = val;
    // },
    dialogCheck(selection, row) {
      this.$refs.bankmsgTables.clearSelection();
      this.cdMssage =row;
      //表格选择
      if (selection.length === 0) {
        // 判断selection是否有值存在
        this.bankreduces = [];
        return;
      }
      this.bankreduces = row;
      if (row) {
          this.selectioned = row;
          this.index = this.bankmsg.indexOf(row);
          this.bankindex = this.index;
          this.$refs.bankmsgTables.toggleRowSelection(row, true);
      }
    },
    dialogCheckS(selection, row) {
      if (this.type=="payMoney") {
        this.$refs.multipletableData.clearSelection();
      }
      console.log(row)
      this.cdMssage =row;
      //表格选择
      if (selection.length === 0) {
        // 判断selection是否有值存在
        this.bankreduces = [];
        return;
      }
      this.bankreduces = row;
      if (row) {
          this.selectioned = row;
          this.index = this.tableData.indexOf(row);
          this.bankindex = this.index;
          this.$refs.multipletableData.toggleRowSelection(row, true);
      }
    },
    dialogChecks(selection, row) {
      this.$refs.multipleTables.clearSelection();
      console.log(row)
      console.log(selection)
      this.cdMssage =row;
      //表格选择
      if (selection.length === 0) {
        // 判断selection是否有值存在
        this.bankreduces = [];
        return;
      }
      this.bankreduces = row;
      if (row) {
          this.selectioned = row;
          this.index = this.cdPay.indexOf(row);
      console.log(this.index)

          this.bankindex = this.index;
          this.$refs.multipleTables.toggleRowSelection(row, true);
      }
    },
    bankadd(e) {
      //表格增加
      if (this.type=="look") {
        return;
      }
      if (e == 1) {
        this.bankmsg.forEach(item => {
          item.edit = false;
        });
        let obj = {
          contractNo: "",
          contractAmt: "",
          erpPoNo: "",
          custName: "",
          edit: true,
        };
        let newtable = [];
        newtable.unshift(obj);
        this.bankmsg = newtable.concat(this.bankmsg);
        this.bankreduces = [];
      }else if(e==2){
        this.tableData.forEach(item => {
          item.edit = false;
        });
        let obj = {
          acceptanceDate: "",
          acceptanceAmt:"",
          accountPayableDate: "",
          isNotPay: "",
          isDiscrepanced: "",
          isRefusal: "",
          remark: "",
          edit: true,
          itemsRowNo:(this.tableData.length+1)*10
        };
        let newtable = [];
        newtable.unshift(obj);
        this.tableData = newtable.concat(this.tableData);
        this.bankreduces = [];
      }else{
        console.log(this.reducemsg)
        if (this.reducemsg.length === 0) {
          this.$message({
            message: "请先选择一条承兑数据",
            type: "warning"
          });
          return;
        } else if (this.reducemsg.length > 1) {
          this.$message({
            message: "至多选中一条数据",
            type: "warning"
          });
          return;
        }else if (this.reducemsg[0].status==11010010) {
          this.suoYin = -1;
          this.pay = true;
        }else{
          this.$message({
            message: "请选择审批通过的数据",
            type: "warning"
          });
          return;
        }
      }
    },
    bankreduce(a) {
      //表格删除
      if (this.type=="look") {
        return;
      }
      if (this.bankreduces.length === 0) {
        this.$message({
          message: "请先选择一条数据",
          type: "warning"
        });
        return;
      }
      if(a==1){
        if (this.bankreduces.id === undefined) {
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
            delFiLcIssueItems({
              id: this.bankreduces.id,
              version: this.bankreduces.version,
              lcVersion: this.version,
              lcIssueId: this.id
            }).then(res => {
              if (res.code === "success") {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.bankmsg.splice(this.bankindex, 1);
                this.bankreduces = [];
              }
            });
          });
        }
      }else if(a==2){
        if (this.bankreduces.id === undefined) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.tableData.splice(this.bankindex, 1);
          this.bankreduces = [];
        } else {
          this.$confirm("是否确定删除继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            delAcceptance({
              acceptanceId: this.bankreduces.id,
              version: this.bankreduces.version,
              lcVersion: this.version,
              lcIssueId: this.id
            }).then(res => {
              if (res.code === "success") {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.tableData.splice(this.bankindex, 1);
                this.bankreduces = [];
              }
            });
          });
        }
      }else{
        console.log(this.bankreduces)
        let accVersion=""
        this.tableData.map(item =>{
          if(this.bankreduces.acceptanceId == item.id){
            accVersion = item.version
          }
        })
        if(this.bankreduces.payStatus == "已过账"||this.bankreduces.payStatus == "已冲销") {
          this.$message({
            message: "请选择正确数据",
            type: "warning"
          });
          return;
        }
        if (this.bankreduces.id === undefined) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.cdPay.splice(this.bankindex, 1);
          this.bankreduces = [];
        } else {
          this.$confirm("是否确定删除继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            delAcceptancePay({
              acceptancePayId: this.bankreduces.id,
              version: this.bankreduces.version,
              accVersion: accVersion,
              accId:this.bankreduces.acceptanceId
            }).then(res => {
              if (res.code === "success") {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.cdPay.splice(this.bankindex, 1);
                this.bankreduces = [];
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
      if (!this.newData.companyName) {
        // this.$openWarning("公司不能为空");
        // return;
         this.errorKey.push('companyName');
      }
      if (!this.newData.orgName) {
        // this.$openWarning("部门不能为空");
        // return false;
         this.errorKey.push('orgName');
      }
      if (!this.newData.bizPersonName) {
        this.errorKey.push('bizPersonName');
      }
      if (!this.newData.currencyCode) {
        this.errorKey.push('currencyCode');
      }
      if (!this.newData.lcAmt) {
        this.errorKey.push('lcAmt');
      }
      if (!this.newData.lcType) {
       this.errorKey.push('lcType');
      }
      if (!this.newData.supplierName) {
       this.errorKey.push('supplierName');
      }
      if (!this.deadlineLoaddate) {
        this.errorKey.push('deadlineLoaddate');
      }
      if (!this.newData.lcDueType) {
        this.errorKey.push('lcDueType');
      }
      if (!this.newData.lcProperty) {
        this.errorKey.push('lcProperty');
      }
      if (!this.newData.effectiveDate) {
        this.errorKey.push('effectiveDate');
      }
      if (this.newData.lcDueType == 10220010&&!this.newData.payDeadline) {
        this.errorKey.push('payDeadline');
      }
       if(this.errorKey.length > 0) {
        this.$openWarning("必填信息请填完整");
        return false
      }

      for (let index = 0; index < this.bankmsg.length; index++) {
        if(!this.bankmsg[index].contractNo){
          this.$openWarning("外部合同号不能为空");
          return;
        }
      }
      console.log(this.bankmsg)
      this.newData.applyDate = this.applyDate;
      this.newData.deadlineLoaddate = this.deadlineLoaddate;
      this.newData.itemsList = this.bankmsg;
      this.newData.sysSystemAccessoryList=this.uploadList.tableList;
      saveFiLcReceive(this.newData).then(res => {
        if (res.code === "success") {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.$router.push({
            name: "establishmentIndex"
          });
        }
      });
    },
    savemsgs(btnType) {
      this.errorKey=[];
      if(this.type =="openLetter"){
        if (this.lcIssueDate == null) {
         this.errorKey.push('lcIssueDate');
        }
        if (this.lcBankName == null) {
          this.errorKey.push('lcBankName');
        }
        if (this.lcNo == null) {
          this.errorKey.push('lcNo');
        }
        if (this.lcCurrencyCode == null) {
         this.errorKey.push('lcCurrencyCode');
        }
        if (!this.attachmentCount) {
        this.errorKey.push('attachmentCount');
      }
        // if (this.bankMarginAmt>0) {
        //   if(!this.subjectList.nameL2){
        //     this.errorKey.push('subjectList');
        //   }
        //   if(!this.flowList.fnameL2){
        //    this.errorKey.push('flowList');
        //   }
        // }
        if (this.bankMarginAmt>0) {
          if(!this.bankMarginAccount.nameL2){
            this.errorKey.push('bankMarginAccount');
          }
          if(!this.bankMarginCashFlow.fnameL2){
            this.errorKey.push('bankMarginCashFlow');
          }
        }

        if(this.errorKey.length > 0) {
          this.$openWarning("必填信息请填完整");
          return false
        }
        if(this.subjectList.nameL2){
           this.accountCode = this.subjectList.nameL2.trim().split(" ")[0]
           this.accountName = this.subjectList.nameL2.trim().split(" ")[1]
        }
        if(this.flowList.fnameL2){
           this.cashFlowCode = this.flowList.fnameL2.trim().split(" ")[0]
           this.cashFlowName = this.flowList.fnameL2.trim().split(" ")[1]
        }
        if(this.bankMarginAccount.nameL2){
           this.bankMarginAccountCode = this.bankMarginAccount.nameL2.trim().split(" ")[0]
           this.bankMarginAccountName = this.bankMarginAccount.nameL2.trim().split(" ")[1]
        }
        if(this.bankMarginCashFlow.fnameL2){
           this.bankMarginCashFlowCode = this.bankMarginCashFlow.fnameL2.trim().split(" ")[0]
           this.bankMarginCashFlowName = this.bankMarginCashFlow.fnameL2.trim().split(" ")[1]
        }
        if(this.lcIssueType=="远期"){
        this.lcIssueType = 10220010
        }
        if(this.lcIssueType=="即期"){
          this.lcIssueType = 10220005
        }
        let opType="";
        if(btnType==1){
           opType="UPD_SAVE";
        }else{
           opType="UPD_SUBMIT";
        }
        opening({
          id:this.id,
          version:this.version,
          lcStatus:this.status,
          accountCode:this.accountCode,
          accountName:this.accountName,
          cashFlowCode:this.cashFlowCode,
          cashFlowName:this.cashFlowName,
          bankMarginAccountCode:this.bankMarginAccountCode,
          bankMarginAccountName:this.bankMarginAccountName,
          bankMarginCashFlowCode:this.bankMarginCashFlowCode,
          bankMarginCashFlowName:this.bankMarginCashFlowName,
          lcIssueDate:this.lcIssueDate,
          lcExpiredDate:this.lcExpiredDate,
          lcCurrencyCode:this.lcCurrencyCode,
          bankMarginCurrency:this.bankMarginCurrency,
          lcBankCode	:this.lcBankCode,
          lcBankName	:this.lcBankName,
          lcIssueType:this.lcIssueType,
          lcNo:this.lcNo,
          issueBankAccount:this.issueBankAccount,
          lcAmt:this.lcAmt,
          bankMarginRate:this.bankMarginRate,
          bankMarginAmt:this.bankMarginAmt,
          issuePostDate:this.issuePostDateS,
          issueWriteoffDate: this.issueWriteoffDateS,
          attachmentCount:this.attachmentCount,
          opType:opType,
          sysSystemAccessoryList:this.uploadList.tableList,
        }).then(res => {
          if (res.code === "success") {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.$router.push({
              name: "establishmentIndex"
            });
          }
        });
      }else if(this.type =="honour"){
        for (let index = 0; index < this.tableData.length; index++) {
          if(!this.tableData[index].acceptanceDate){
            this.$openWarning("承兑日期不能为空");
            return;
          }
          if(!this.tableData[index].acceptanceAmt){
            this.$openWarning("承兑金额不能为空");
            return;
          }
          if(!this.tableData[index].accountPayableDate){
            this.$openWarning("应付汇日期不能为空");
            return;
          }
          if(this.tableData[index].cdStatus=="保存"){
              this.tableData[index].status =11010005
            }else if(this.tableData[index].cdStatus=="已审核"){
              this.tableData[index].status =11010010
            }else if(this.tableData[index].cdStatus==11010015){
              this.tableData[index].status ="已驳回"
            }else if(this.tableData[index].cdStatus==11010020){
              this.tableData[index].status ="承兑审批中"
            }
        }
        this.tableDataS.id = this.id;
        this.tableDataS.version = this.version;
        this.tableDataS.lcStatus = this.status;
        this.tableDataS.acceptanceList = this.tableData;
        this.tableDataS.sysSystemAccessoryList=this.uploadList.tableList;
        saveAcceptance(this.tableDataS).then(res => {
          if (res.code === "success") {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.$router.push({
              name: "establishmentIndex"
            });
          }
        });
      }else if(this.type =="payMoney"){
        console.log("sss",this.cdPay)
        console.log("sss",this.tableData)
        this.tableData.map(item => {
          let a = [];
          this.cdPay.map(item2 => {
            if(item2.payId == item.id){
              a.push(item2)
              item.accPayList = a;
            }else if(item2.acceptanceId == item.id){
              a.push(item2)
              item.accPayList = a;
            }
          });
        });
        for (let index = 0; index < this.tableData.length; index++) {
          if(!this.tableData[index].accPayList){
            this.$openWarning("请添加付款明细");
            return;
          }
          for (let val = 0; val < this.tableData[index].accPayList.length; val++) {
            if( this.tableData[index].accPayList[val].payStatus=="已保存"){
              this.tableData[index].accPayList[val].payStatus =10670005
            }else if(this.tableData[index].accPayList[val].payStatus=="已过账"){
              this.tableData[index].accPayList[val].payStatus =10670010
            }else if(this.tableData[index].accPayList[val].payStatus=="已冲销"){
              this.tableData[index].accPayList[val].payStatus =10670015
            }
          }

        }
        this.cdPayS.id = this.id;
        this.cdPayS.version = this.version;
        this.cdPayS.lcStatus = this.status;
        // this.cdPayS.accPayList = this.cdPay;
        this.cdPayS.acceptanceList = this.tableData;
        saveAcceptancePay(this.cdPayS).then(res => {
          if (res.code === "success") {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.$router.push({
              name: "establishmentIndex"
            });
          }
        });
      }else if(this.type =="openChange"){
        if (!this.newData.companyName) {
           this.errorKey.push('companyName');
        }
        if (!this.newData.orgName) {
          this.errorKey.push('orgName');
        }
        if (!this.newData.bizPersonName) {
           this.errorKey.push('bizPersonName');
        }
        if (!this.newData.currencyCode) {
          this.errorKey.push('currencyCode');
        }
        if (!this.newData.lcAmt) {
           this.errorKey.push('lcAmt');
        }
        if (!this.newData.lcType) {
          this.errorKey.push('lcType');
        }
        if (!this.newData.supplierName) {
           this.errorKey.push('supplierName');
        }
        if (!this.newData.deadlineLoaddate) {
         this.errorKey.push('deadlineLoaddate');
        }
        if (!this.newData.lcDueType) {
          this.errorKey.push('lcDueType');
        }
        if (!this.newData.lcProperty) {
          this.errorKey.push('lcProperty');
        }
        if(this.errorKey.length > 0) {
          this.$openWarning("必填信息请填完整");
          return false
        }
        for (let index = 0; index < this.bankmsg.length; index++) {
          if(!this.bankmsg[index].contractNo){
            this.$openWarning("外部合同号不能为空");
            return;
          }
        }
        //  if (this.newData.tradeType) {
        //   if (this.newData.tradeType == "内贸") {
        //     this.newData.tradeType = 10920005;
        //   } else if (this.newData.tradeType == "转口贸易") {
        //     this.newData.tradeType = 10920010;
        //   } else if (this.newData.tradeType =="一般贸易进口" ) {
        //     this.newData.tradeType = 10920015;
        //   } else {
        //     this.newData.tradeType = 10920020;
        //   }
        // }
        this.newData.lcStatus=parseInt(this.newData.lcStatus);
        // if(this.newData.lcStatus){
        //   if(this.newData.lcStatus=="保存"){
        //     this.newData.lcStatus=10560005
        //   }else if(this.newData.lcStatus=="审批中"){
        //     this.newData.lcStatus=10560010
        //   }else if(this.newData.lcStatus=="已审批"){
        //     this.newData.lcStatus=10560015
        //   }else if(this.newData.lcStatus=="开证"){
        //     this.newData.lcStatus=10560020
        //   }else if(this.newData.lcStatus=="付款"){
        //     this.newData.lcStatus=10560025
        //   }else if(this.newData.lcStatus=="承兑"){
        //     this.newData.lcStatus=10560040
        //   }else if(this.newData.lcStatus=="结清"){
        //     this.newData.lcStatus=10560045
        //   }else if(this.newData.lcStatus=="已驳回"){
        //     this.newData.lcStatus=10560050
        //   }
        // }
        // if(this.newData.lcProperty){
        //   if (this.newData.lcProperty =="可撤销可转让" ) {
        //     this.newData.lcProperty =10770005 ;
        //   } else if (this.newData.lcProperty == "可撤销不可转让") {
        //     this.newData.lcProperty = 10770010;
        //   } else if (this.newData.lcProperty == "不可撤销可转让") {
        //     this.newData.lcProperty = 10770015;
        //   } else {
        //     this.newData.lcProperty = 10770020;
        //   }
        // }
        // if(this.newData.bizNature){
        //   if (this.newData.bizNature == "自营") {
        //     this.newData.bizNature = 10910005;
        //   } else {
        //     this.newData.bizNature = 10910010;
        //   }
        // }
        // if(this.newData.lcDueType){
        //   if (this.newData.lcDueType == "即期") {
        //     this.newData.lcDueType = 10220005;
        //   } else {
        //     this.newData.lcDueType = 10220010;
        //   }
        // }
        // if(this.newData.lcType){
        //   if (this.newData.lcType == "国内信用证") {
        //     this.newData.lcType = 10570005;
        //   } else {
        //     this.newData.lcType = 10570010;
        //   }
        // }
        if(btnType==1){
           this.newData.opType="UPD_SAVE";
        }else{
           this.newData.opType="UPD_SUBMIT";
        }
        this.newData.itemsList =this.bankmsg;
        this.newData.sysSystemAccessoryList=this.uploadList.tableList;
        openChange(this.newData).then(res => {
          if (res.code === "success") {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.$router.push({
              name: "establishmentIndex"
            });
          }
        })
      }else{
        //修改提交数据
        if (!this.newData.companyName) {
          this.errorKey.push('companyName');
        }
        if (!this.newData.orgName) {
         this.errorKey.push('orgName');
        }
        if (!this.newData.bizPersonName) {
          this.errorKey.push('bizPersonName');
        }
        if (!this.newData.currencyCode) {
          this.errorKey.push('currencyCode');
        }
        if (!this.newData.lcAmt) {
          this.errorKey.push('lcAmt');
        }
        if (!this.newData.lcType) {
          this.errorKey.push('lcType');
        }
        if (!this.newData.supplierName) {
          this.errorKey.push('supplierName');
        }
        if (!this.newData.deadlineLoaddate) {
          this.errorKey.push('deadlineLoaddate');
        }
        if (!this.newData.lcDueType) {
          this.errorKey.push('lcDueType');
        }
        if (!this.newData.lcProperty) {
          this.errorKey.push('lcProperty');
        }
        if (this.newData.lcDueType == 10220010&&!this.newData.payDeadline) {
          this.errorKey.push('payDeadline');
        }
        if (!this.newData.effectiveDate) {
          this.errorKey.push('effectiveDate');
        }
        if(this.errorKey.length > 0) {
          this.$openWarning("必填信息请填完整");
          return false
        }
        for (let index = 0; index < this.bankmsg.length; index++) {
          if(!this.bankmsg[index].contractNo){
            this.$openWarning("外部合同号不能为空");
            return;
          }
        }
        console.log(this.newData.tradeType)
        //  if (this.newData.tradeType) {
        //   if (this.newData.tradeType == "内贸") {
        //     this.newData.tradeType = 10920005;
        //   } else if (this.newData.tradeType == "转口贸易") {
        //     this.newData.tradeType = 10920010;
        //   } else if (this.newData.tradeType =="一般贸易进口" ) {
        //     this.newData.tradeType = 10920015;
        //   } else if (this.newData.tradeType =="内采外销" ) {
        //     this.newData.tradeType = 10920020;
        //   }
        // }
        this.newData.lcStatus=parseInt(this.newData.lcStatus);
        // if(this.newData.lcStatus){
        //   if(this.newData.lcStatus=="保存"){
        //     this.newData.lcStatus=10560005
        //   }else if(this.newData.lcStatus=="审批中"){
        //     this.newData.lcStatus=10560010
        //   }else if(this.newData.lcStatus=="已审批"){
        //     this.newData.lcStatus=10560015
        //   }else if(this.newData.lcStatus=="开证"){
        //     this.newData.lcStatus=10560020
        //   }else if(this.newData.lcStatus=="付款"){
        //     this.newData.lcStatus=10560025
        //   }else if(this.newData.lcStatus=="承兑"){
        //     this.newData.lcStatus=10560040
        //   }else if(this.newData.lcStatus=="结清"){
        //     this.newData.lcStatus=10560045
        //   }else if(this.newData.lcStatus=="已驳回"){
        //     this.newData.lcStatus=10560050
        //   }
        // }
        // if(this.newData.lcProperty){
        //   if (this.newData.lcProperty =="可撤销可转让" ) {
        //     this.newData.lcProperty =10770005 ;
        //   } else if (this.newData.lcProperty == "可撤销不可转让") {
        //     this.newData.lcProperty = 10770010;
        //   } else if (this.newData.lcProperty == "不可撤销可转让") {
        //     this.newData.lcProperty = 10770015;
        //   } else if (this.newData.lcProperty == "不可撤销不可转让") {
        //     this.newData.lcProperty = 10770020;
        //   }
        // }
        // if(this.newData.bizNature){
        //   if (this.newData.bizNature == "自营") {
        //     this.newData.bizNature = 10910005;
        //   } else if(this.newData.bizNature == "代理") {
        //     this.newData.bizNature = 10910010;
        //   }
        // }
        // if(this.newData.lcDueType){
        //   if (this.newData.lcDueType == "即期") {
        //     this.newData.lcDueType = 10220005;
        //   } else if (this.newData.lcDueType == "远期") {
        //     this.newData.lcDueType = 10220010;
        //   }
        // }
        // if(this.newData.lcType){
        //   if (this.newData.lcType == "国内信用证") {
        //     this.newData.lcType = 10570005;
        //   } else if (this.newData.lcType == "国际信用证") {
        //     this.newData.lcType = 10570010;
        //   }
        // }

        this.newData.itemsList =this.bankmsg;
        this.newData.applyDate = this.applyDate;
        this.newData.deadlineLoaddate = this.deadlineLoaddate;
        this.newData.sysSystemAccessoryList=this.uploadList.tableList;
        update(this.newData).then(res => {
          if (res.code === "success") {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.$router.push({
              name: "establishmentIndex"
            });
          }
        });
      }
    },
    savebtn(btnType) {
      //保存新增
      console.log(this.id);
      if (this.id === undefined) {
        console.log(123);

        this.savemsg();
      } else {
        console.log(456);

        this.savemsgs(btnType);
      }
    },
    cancelbtn() {
      //取消新增
      this.$router.push({
        name: "establishmentIndex"
      });
    }
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    supplierSelect,
    coinSelect,
    countrySelect,
    supplierBankPopup,
    ArrSelect,
    cgSelect,
    companyBankPopup,
    paySelect,
    subjectFrame,
    flowCode,
    'v-exmineStatus': ExmineStatus
  }
};
</script>

<style lang="scss" scoped>
// .index .el-col-required .el-input.is-disabled .el-input__inner{
//   background-color: #d9e8fd !important;
// }

.el-input__icon{
  line-height: 22px !important;
}
.cdInformation{
  height: 40px;
  line-height: 40px;
  width: 100px;
  text-align: center;
  font-size: 20px;
}
.upload-demo{
  float: left;
  margin-right: 20px;
}
/deep/ .el-col{
  .el-inputs,.el-select,.el-date-editor{
      width: 54%;
    }
  label{
    width:46%;
  }
}
.input-div{
  padding-left: 0px;
}
</style>
