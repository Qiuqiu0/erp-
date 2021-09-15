<template>
  <div class="tabFirst">
    <!-- 搜索 -->
    <div class="input-div input-div-bor">
      <!-- <div class="table_title">基本信息</div> -->
      <div id="loadingTarget">
        <el-col :span="5"
                class="el-col el-col-required">
          <label class="isrequired"><span class="must-full">*</span>公司</label>
          <el-input v-model="companyName.companyName"
                    class="el-inputs"
                    :class="errorKey.includes('companyName') ? 'inputRed' : ''"
                    placeholder="请选择"
                    required
                    disabled></el-input>
          <span class="comicon"
                @click="componyTip"><i class="el-icon-search"></i></span>
        </el-col>
        <el-col :span="5"
                class="el-col el-col-required">
          <label class="isrequired"><span class="must-full">*</span>部门</label>
          <el-input v-model="branchName.branchName"
                    class="el-inputs"
                    :class="errorKey.includes('branchName') ? 'inputRed' : ''"
                    placeholder="请选择"
                    disabled></el-input>
          <span class="comicon"
                @click="departmentTip"><i class="el-icon-search"></i></span>
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label>协议编号</label>
          <el-input v-model="contractNo"
                    class="el-inputs"
                    placeholder="保存后自动生成"
                    disabled></el-input>
          <!-- <span
            class='comicon'
            @click="contractTip"
          ><i class="el-icon-search"></i></span> -->
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label>协议状态</label>
          <el-select v-model="contractStatus"
                     placeholder="请选择"
                     disabled>
            <el-option v-for="item in isInaType"
                       :key="item.dict_key"
                       :label="item.dict_value"
                       :value="item.dict_key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5"
                class="el-col el-col-required">
          <label class="isrequired"><span class="must-full">*</span>业务员</label>
          <el-input v-model="staffName.empName"
                    class="el-inputs"
                    :class="errorKey.includes('staffName') ? 'inputRed' : ''"
                    placeholder="请选择"
                    disabled></el-input>
          <span class="comicon"
                @click="staffTip"><i class="el-icon-search"></i></span>
        </el-col>
        <el-col :span="5"
                class="el-col  el-col-required">
          <label class="isrequired"><span class="must-full">*</span>协议类型</label>
          <el-select v-model="contractCat"
                     placeholder="请选择"
                    :class="errorKey.includes('contractCat') ? 'inputRed' : ''"
                     @change="handleContractTypeChange">
            <el-option v-for="item in contractType"
                       :key="item.dict_key"
                       :label="item.dict_value"
                       :value="item.dict_key">
            </el-option>
          </el-select>
          <!-- <el-input
            v-model="staffName.staffName"
            class="el-inputs"
            placeholder="请选择"
            disabled
          ></el-input>
          <span
            class='comicon'
            @click="staffTip"
          ><i class="el-icon-search"></i></span> -->
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label class="isrequired">客户</label>
          <el-input v-model="customerName.customerName"
                    class="el-inputs"
                    :class="errorKey.includes('supplierName') ? 'inputRed' : ''"
                    placeholder="请选择"
                    disabled></el-input>
          <span class="comicon"
                @click="customerTip"><i class="el-icon-search"></i></span>
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label class="isrequired">供应商</label>
          <el-input v-model="supplierName.supplierName"
                    class="el-inputs"
                    :class="errorKey.includes('supplierName') ? 'inputRed' : ''"
                    placeholder="请选择"
                    disabled></el-input>
          <span class="comicon"
                @click="supplierTip"><i class="el-icon-search"></i></span>
        </el-col>

        <el-col :span="5"
                class="el-col">
          <label>项目号</label>
          <el-input v-model="projectCode"
                    class="el-inputs"
                    placeholder="请选择"
                    disabled></el-input>
          <span class="comicon" v-if="projectCode" @click="clearProjectName">
            <i class="el-icon-circle-close"></i>
          </span>
          <span v-else class="comicon"
                @click="projectTip"><i class="el-icon-search"></i></span>
          <!-- <el-input
            v-model="projectCode"
            class="el-inputs"
            placeholder="请选择"
          ></el-input> -->
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label>项目名称</label>
          <el-input v-model="projectName"
                    class="el-inputs"
                    placeholder="请选择"
                    disabled></el-input>
        </el-col>
        <el-col :span="5"
                class="el-col el-col-required">
          <label class="isrequired"><span class="must-full">*</span>签订日期</label>
          <el-date-picker v-model="signingDate"
                          style="width:70%;"
                          type="date"
                          :class="errorKey.includes('signingDate') ? 'inputRed' : ''"
                          value-format="timestamp"
                          placeholder="选择日期">
          </el-date-picker>
          <!-- <el-input
            v-model="projectCode"
            class="el-inputs"
            placeholder="请选择"
          ></el-input> -->
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label>有效日期</label>
          <!-- <el-date-picker
            v-model="contractDataArray"
            type="daterange"
            align="right"
            value-format="timestamp"
            unlink-panels
            size="mini"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker> -->
          <el-date-picker v-model="contractEndDate"
                          style="width:70%;"
                          :class="errorKey.includes('contractEndDate') ? 'inputRed' : ''"
                          type="date"
                          value-format="timestamp"
                          placeholder="选择日期">
          </el-date-picker>
        </el-col>
        <el-col :span="5"
                class="el-col el-col-required">
          <label class="isrequired"><span class="must-full">*</span>外部合同</label>
          <el-input v-model="extCode"
                    class="el-inputs"
                    :class="errorKey.includes('extCode') ? 'inputRed' : ''"
                    placeholder="请输入"></el-input>
        </el-col>
        <el-col :span="5"
                class="el-colc el-col-required">
          <label class="isrequired"><span class="must-full">*</span>业务币别</label>
          <el-input v-model="currency.currencyName"
                    class="el-inputs"
                    :class="errorKey.includes('currency') ? 'inputRed' : ''"
                    placeholder="请选择"
                    disabled></el-input>
          <span class="comicon"
                @click="coinTip"><i class="el-icon-search"></i></span>
        </el-col>
        <el-col :span="5"
                class="el-col el-col-required">
          <label class="isrequired"><span class="must-full">*</span>本位汇率</label>
          <el-input v-model="currencyRate"
                    class="el-inputs"
                    :class="errorKey.includes('currencyRate') ? 'inputRed' : ''"
                    placeholder="请输入"></el-input>
          <!-- <el-date-picker
            v-model="contractEndDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker> -->
        </el-col>
        <el-col :span="5"
                class="el-colc">
          <label>签约地点</label>
          <el-input v-model="signPlace"
                    class="el-inputs"
                    placeholder="请输入"></el-input>
          <!-- <el-select
            v-model="isInactive"
            placeholder="请选择"
          >
            <el-option
              v-for="item in isInaType"
              :key="item.dict_key"
              :label="item.dict_value"
              :value="item.dict_key"
            >
            </el-option>
          </el-select> -->
        </el-col>
        <el-col :span="5"
                class="el-col el-col-required">
          <label class="isrequired"><span class="must-full">*</span>付款类型</label>
          <el-select v-model="payType"
                    :class="errorKey.includes('payType') ? 'inputRed' : ''"
                     placeholder="请选择">
            <el-option v-for="item in payTypeList"
                       :key="item.dict_key"
                       :label="item.dict_value"
                       :value="item.dict_key">
            </el-option>
          </el-select>
          <!-- <el-input
            v-model="payType"
            class="el-inputs"
            disabled
          ></el-input> -->
        </el-col>
        <el-col :span="5"
                class="el-col  el-col-required">
          <label class="isrequired"><span class="must-full">*</span>付款方式</label>
          <el-select v-model="payment"
                    :class="errorKey.includes('payment') ? 'inputRed' : ''"
                     placeholder="请选择">
            <el-option v-for="item in paymentList"
                       :key="item.dict_key"
                       :label="item.dict_value"
                       :value="item.dict_key">
            </el-option>
          </el-select>
          <!-- <el-input
            v-model="projectName"
            class="el-inputs"
            disabled
          ></el-input> -->
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label class="isrequired">票期</label>
          <el-input v-model="usance"
                    :class="errorKey.includes('usance') ? 'inputRed' : ''"
                    class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5"
                class="el-col">
          <label>协议金额</label>
          <el-input v-model="contractAmt"
                    class="el-inputs"
                    disabled></el-input>
        </el-col>
        <div class="remark-style">
          <label>备注 :</label>
          <el-input type="textarea"
                    autosize
                    v-model="remark"
                    size="small"
                    placeholder="请输入内容"
                    resize="none"></el-input>
          <div class="empty-class"></div>
        </div>
      </div>
    </div>
    <!-- 商品信息 -->
    <div class="input-div input-div-bor bortop0">
      <el-divider></el-divider>
      <!-- <div class="table_title">商品信息</div> -->
      <div>
        <div class="button-div">
          <el-button class="query-button"
                     @click="addList"
                     icon="el-icon-plus">创建</el-button>
          <el-button @click="deleFun"
                     icon="el-icon-minus">删除</el-button>
          <!-- <el-button @click="setUp(0)"
                     class="olbutton"
                     icon="el-icon-upload2">模板导入</el-button> -->
        </div>
      </div>
      <div class="">
        <el-table border
                  center
                  show-summary
                  :data="tableData"
                  :summary-method="getSummaries"
                  class="el-table"
                  ref="multipleTable"
                  max-height="370"
                  @selection-change="handleChange"
                  @row-dblclick="dblclick"
                  @row-click="rowClick"
                  @select-all="dialogCheck"
                  @select="dialogCheck">
          <el-table-column type="selection"
                           width="55"> </el-table-column>
          <el-table-column prop="rowno"
                           label="行号"> </el-table-column>
          <el-table-column prop="paritiesDate"
                           label="物料号"
                           class="matterNo"
                           width="150px">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-input v-model="scope.row.goodsCode"
                          placeholder="请选择"
                          style="width:80%"
                          disabled>
                  <i v-if="scope.row.MatterNoIconControl"
                     style="cursor:pointer;line-height:27px"
                     @click="matterTip"
                     slot="suffix"
                     class="el-input__icon el-icon-search"></i>
                  <i v-else
                     style="cursor:pointer;line-height:27px"
                     @click="showSearchIcon"
                     slot="suffix"
                     class="el-input__icon el-icon-circle-close"></i>
                </el-input>
              </div>
              <div v-else
                   class="fixedHeight">
                <el-popover placement="top-start"
                            width="200"
                            trigger="hover"
                            :content="scope.row.goodsCode">
                  <span slot="reference"> {{ scope.row.goodsCode }}</span>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="paritiesDate"
                           label="物料名称"
                           width="150px">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <span class="must-full">*</span>
                <el-input v-model="scope.row.goodsName"
                          class="must-full-brother"
                          @change="handleMatterSelect"
                          placeholder="请输入内容"
                          :disabled="scope.row.matterNoControl"></el-input>
              </div>
              <div v-else
                   class="fixedHeight">
                <el-popover placement="top-start"
                            width="200"
                            trigger="hover"
                            :content="scope.row.goodsName">
                  <span slot="reference"> {{ scope.row.goodsName }}</span>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="goodsCategoryName"
                           label="物料大类"
                           width="150px">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <span class="must-full">*</span>
                <el-input v-model="scope.row.goodsCategoryName"
                          class="must-full-brother"
                          @change="handleMatterSelect"
                          placeholder="请输入内容"
                          :disabled="scope.row.matterNoControl"></el-input>
              </div>
              <div v-else
                   class="fixedHeight">
                <el-popover placement="top-start"
                            width="200"
                            trigger="hover"
                            :content="scope.row.goodsCategoryName">
                  <span slot="reference">
                    {{ scope.row.goodsCategoryName }}</span>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="goodsSpec"
                           label="物料规格"
                           width="150px">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <span class="must-full">*</span>
                <el-input v-model="scope.row.goodsSpec"
                          class="must-full-brother"
                          @change="handleMatterSelect"
                          placeholder="请输入内容"
                          :disabled="scope.row.matterNoControl"></el-input>
              </div>
              <div v-else
                   class="fixedHeight">
                <el-popover placement="top-start"
                            width="200"
                            trigger="hover"
                            :content="scope.row.goodsSpec">
                  <span slot="reference"> {{ scope.row.goodsSpec }}</span>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="parities"
                           label="基础单位"
                           width="120px">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <span class="must-full">*</span>
                <el-select v-model="scope.row.itemUnit"
                           class="must-full-brother"
                           @change="handleUnitChange(scope)"
                           placeholder="请选择"
                           :disabled="scope.row.matterNoControl">
                  <el-option v-for="item in unitList"
                             :key="item.unitCode"
                             :label="item.unitName"
                             :value="item.unitName"></el-option>
                </el-select>
                <!-- <el-input
                  v-model="scope.row.itemUnit"
                  placeholder="请输入内容"
                ></el-input> -->
              </div>
              <div v-else
                   class="fixedHeight">
                <el-popover placement="top-start"
                            width="200"
                            trigger="hover"
                            :content="scope.row.itemUnit">
                  <span slot="reference"> {{ scope.row.itemUnit }}</span>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="itemQty"
                           label="数量"
                           width="100px">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <span class="must-full">*</span>
                <el-input v-model="scope.row.itemQty"
                          placeholder="请输入"
                          class="must-full-brother"
                          type="test"
                          @input="handleItemQtyChange(scope)"></el-input>
              </div>
              <div v-else
                   class="fixedHeight">
                <span slot="reference"> {{ scope.row.itemQty }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="originPrice"
                           label="业务币含税单价"
                           width="120px">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <span class="must-full">*</span>
                <el-input v-model="scope.row.originPrice"
                          placeholder="请输入"
                          class="must-full-brother"
                          type="text"
                          @input="handleOriginPriceChange(scope)"></el-input>
              </div>
              <div v-else
                   class="fixedHeight">
                <span slot="reference"> {{ scope.row.originPrice }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="unorginPrice"
                           label="业务币不含税单价"
                           width="120px">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                {{ scope.row.unorginPrice }}
              </div>
              <div v-else
                   class="fixedHeight">
                <span slot="reference"> {{ scope.row.unorginPrice }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="originAmt"
                           label="业务币含税金额"
                           width="120px">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <div>
                  <span class="must-full">*</span>
                  <el-input v-model="scope.row.originAmt"
                            class="must-full-brother"
                            @input="handleOriginAmtChange(scope)"
                            placeholder="请输入内容"></el-input>
                </div>
              </div>
              <div v-else
                   class="fixedHeight">
                <span slot="reference">{{ scope.row.originAmt }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="unorginAmt"
                           label="业务币不含税金额"
                           width="120px">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                {{ scope.row.unorginAmt }}
              </div>
              <div v-else
                   class="fixedHeight">
                <span slot="reference"> {{ scope.row.unorginAmt }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="taxRate"
                           label="增值税率%"
                           width="100px">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <span class="must-full">*</span>
                <el-input v-model="scope.row.taxRate"
                          placeholder="请输入内容"
                          class="must-full-brother"
                          @input="handleTaxRateChange(scope)"></el-input>
              </div>
              <div v-else
                   class="fixedHeight">
                <span slot="reference"> {{ scope.row.taxRate }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="taxAmt"
                           label="增值税额"
                           width="100px">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <span class="must-full">*</span>
                <el-input v-model="scope.row.taxAmt"
                          @input="handleTaxAmtChange(scope)"
                          class="must-full-brother"
                          placeholder="请输入内容"></el-input>
              </div>
              <div v-else
                   class="fixedHeight">
                <span slot="reference">{{ scope.row.taxAmt }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="secUnit"
                           label="第二单位">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-select v-model="scope.row.secUnit"
                           disabled
                           placeholder="请选择">
                  <el-option v-for="item in unitList"
                             :key="item.unitCode"
                             :label="item.unitName"
                             :value="item.unitName"></el-option>
                </el-select>
                <!-- <el-input
                  v-model="scope.row.secUnit"
                  placeholder="请输入内容"
                ></el-input> -->
              </div>
              <div v-else
                   class="fixedHeight">
                <span slot="reference"> {{ scope.row.secUnit }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="secQty"
                           label="第二数量">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-input v-model="scope.row.secQty"
                          placeholder="请输入内容"
                          @input="handleSecQtyChange(scope)"
                          type="text"></el-input>
              </div>
              <div v-else
                   class="fixedHeight">
                <span slot="reference"> {{ scope.row.secQty }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark"
                           label="备注">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-input v-model="scope.row.remark"
                          placeholder="请输入内容"></el-input>
              </div>
              <div v-else
                   class="fixedHeight">
                <span slot="reference"> {{ scope.row.remark }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 选择公司弹窗 -->
    <compony-select v-if="companyShow"
                    :tipShow="companyShow"
                    :ztz="ztz"
                    @tipsCancle="tipsCancle"
                    @tipsSure="tipsSure">
    </compony-select>
    <!-- 选择部门弹窗 -->
    <department-select v-if="departmentShow"
                       :tipShow="departmentShow"
                       :data="companyName"
                       @departmentCancle="departmentCancle"
                       @departmentSure="departmentSure">
    </department-select>
    <!-- 选择员工弹窗 -->
    <staff-select v-if="staffShow"
                  :tipShow="staffShow"
                  :data="branchName"
                  @staffCancle="staffCancle"
                  @staffSure="staffSure">
    </staff-select>
    <!-- 选择协议编号 -->
    <agree-select v-if="contractShow"
                  :tipShow="contractShow"
                  @agreeCancle="contractCancle"
                  @agreeSure="contractSure">
    </agree-select>
    <!-- 选择项目弹窗 -->
    <project-select v-if="projectShow"
                    :tipShow="projectShow"
                    @projectCancle="projectCancle"
                    @projectSure="projectSure">
    </project-select>
    <!-- 选择客户弹窗 -->
    <customer-select v-if="customerShow"
                     :tipShow="customerShow"
                     @customerCancle="customerCancle"
                     @customerSure="customerSure">
    </customer-select>
    <!-- 选择币种弹窗 -->
    <coin-select v-if="coinShow"
                 :tipShow="coinShow"
                 @coinCancle="coinCancle"
                 @coinSure="coinSure"></coin-select>
    <!-- 选择供应商弹窗 -->
    <supplier-select v-if="supplierShow"
                     :tipShow="supplierShow"
                     @supplierCancle="supplierCancle"
                     @supplierSure="supplierSure">
    </supplier-select>
    <!-- 选择物料号 -->
    <matter-select v-if="matterShow"
                   :tipShow="matterShow"
                   @matterCancle="matterCancle"
                   @matterSure="matterSure"></matter-select>
  </div>
</template>

<script>
import { mapState } from "vuex";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import staffSelect from "@/components/staffSelect.vue";
import projectSelect from "@/components/projectSelect.vue";
import agreeSelect from "@/components/agreeSelect";
import coinSelect from "@/components/coinSelect.vue";
import customerSelect from "@/components/customerSelect.vue";
import supplierSelect from "@/components/supplierSelect.vue";
import matterSelect from "@/components/matterSelect.vue";
import { list as coinList } from "@/api/contractMange/frameProtocol";
import Compony from "@/api/comdepartment/componySelect";
import {
  getOdFwContractItemsList,
  getOdFwContract,
  deleteOdFwContractItems,
  getGdGoodsUnitListByIsInactive,
  getDictionary,
  getCurrencyRate
} from "@/api/contractMange/frameProtocol";
import Count from "@/assets/js/calculation";

export default {
  name: "tabFirst",
  data() {
    return {
      contractAmt: "",
      companyShow: false, //公司弹窗
      companyName: {}, //公司
      departmentShow: false, //部门弹窗
      branchName: {}, //部门
      contractShow: false, //协议编号弹窗
      contractNo: "", //协议编号  手输
      isInaType: [],
      contractStatus: 10130005, //协议状态  创建固定为草拟
      staffShow: false, //员工弹窗
      currency: {},
      coinShow: false,
      staffName: {}, //员工
      customerShow: false, //客户弹窗
      supplierShow: false, //供应商弹窗
      contractType: [],
      contractCat: "", //协议类型
      projectShow: false, //项目弹窗
      projectCode: ``, //项目号
      projectName: ``, //项目名称
      customerName: {}, //客户名称
      supplierName: {}, //供应商名称
      ztz: 0,
      typeList: [],
      signingDate: ``, // 签订日期
      contractDataArray: [], // 0 协议生效日  1 协议到期日
      contractEndDate: ``, // 有效日期
      createDate: ``, // 创建日期
      extCode: ``, //外部合同号
      currencyCode: "", //币种
      currencyList: [], //业务币列表
      unitList: [], //单位列表
      currencyRate: `1`, //本位币汇率
      signPlace: ``, //签约地点
      payType: "", //付款类型
      payTypeList: [],
      payment: "", //付款方式
      paymentList: [],
      usance: "", //票期
      matterShow: false, //物料弹窗
      goodsListIndex: "", //当前选中商品信息索引
      isInactive: ``, //
      activeName2: "first", //标签页
      tableData: [], //通讯表格
      selectioned: [], //表格选中项
      index: null, //选中index
      newTable: [], //新建数据
      linkList: [],
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      warehouseLinkList: [], //联系人
      warehouseId: "",
      version: "",
      loading: true, //表格loading
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      show: true,
      modifyData: {}, //修改数据
      MatterNoIconControl: true, //物料号icon控制
      remark: "", //备注
      customerControl: false,
      supplierControl: false,
      isChangeContract: false, //是否为变更订单
      isChange: null,
      tempTableData: [], //变更暂存
      errorKey: []
    };
  },
  created() {
    //list数据获取
    this.initList();
  },
  mounted() {
    
  },
  methods: {
     clearProjectName(){
      this.projectCode="";
      this.projectName="";
    },
    initList() {
      //字典
      this.initDictionary();
      //币种列表
      coinList({})
        .then(res => {
          this.currencyList = res.data;
        })
        .catch(() => {});
      //单位列表
      getGdGoodsUnitListByIsInactive({
        pageNum: 1,
        pageSize: 1000
      })
        .then(res => {
          this.unitList = res.data;
        })
        .catch(() => {});
      let url = window.location.href;
      if (url.indexOf("contractId=") != -1) {
        let contractId = url.split("contractId=")[1];
        const subForm = new FormData();
        subForm.append("contractId", contractId);
        getOdFwContract(subForm)
          .then(res => {
            this.modifyData = res.data;
            this.getModifyData(this.modifyData);
            if (url.indexOf("isChange=") != -1) {
              this.isChangeContract = true;
              this.isChange = 1;
            }
          })
          .catch(() => {});
        let odFwContractItems = {
          contractId: contractId
        };
        //物料表
        getOdFwContractItemsList(odFwContractItems)
          .then(res => {
            this.tableData = res.data;
            this.tableData.forEach((el, index) => {
              el.firstUnitName = el.itemUnit;
              el.secUnitName = el.secUnit;
             // el.rowno = (index + 1) * 10;
              if (el.goodsCode != "") {
                el.matterNoControl = true;
              } else {
                el.MatterNoIconControl = true;
              }
                //采购不含税单价
            el.unorginPrice = this.$unorginPrice(el.originPrice,el.taxRate);
             //采购不含税金额
            el.unorginAmt = this.$unorginAmt(el.originAmt,el.taxRate);
              // this.handleoriginAmtCalc(el);
              // this.handleUnorginPriceCalc(el);
              // this.handleUnorginAmtCalc(el);
            });
          })
          .catch(() => {});
      }
    },
    initDictionary() {
      const payType = new FormData();
      payType.append("dictNo", 1020);
      getDictionary(payType).then(res => {
        this.payTypeList = res.data;
      });
      const payment = new FormData();
      payment.append("dictNo", 1021);
      getDictionary(payment).then(res => {
        this.paymentList = res.data;
      });
      const isInaType = new FormData();
      isInaType.append("dictNo", 1013);
      getDictionary(isInaType).then(res => {
        this.isInaType = res.data;
      });
      const contractType = new FormData();
      contractType.append("dictNo", 1089);
      getDictionary(contractType).then(res => {
        this.contractType = res.data;
      });
    },
    getModifyData(modifyData) {
      if (modifyData) {
        this.companyName.companyName = modifyData.companyName;
        this.branchName.branchName = modifyData.orgName;
        this.contractNo = modifyData.contractNo;
        this.contractStatus = modifyData.contractStatus;
        this.customerName.customerName = modifyData.custName;
        this.supplierName.supplierName = modifyData.supplierName;
        this.staffName.empName = modifyData.bizPersonName;
        this.contractCat = modifyData.contractCat;
        if (this.contractCat == 10890005) {
          this.customerControl = true;
          this.supplierControl = false;
          this.customerName.customerName = "";
          this.customerName = "";
        } else {
            this.customerControl = false;
            this.supplierControl = true;
            this.supplierName.supplierName = "";
            this.supplierName = "";
        }
        this.projectCode = modifyData.projectCode;
        this.projectName = modifyData.projectName;
        this.signingDate = modifyData.signTime;
        // this.contractDataArray.push(modifyData.contractBeginDate);
        this.contractEndDate = modifyData.contractEndDate;
        this.extCode = modifyData.extCode;
        this.currency.currencyCode = modifyData.currencyCode;
        let params = {
          pageNum: this.pageNum,
          rows: this.pageSize,
          currencyCode: modifyData.currencyCode
        };
        Compony.currenList(params).then(res => {
          this.currency.currencyName = res.data[0].currencyName;
          this.$forceUpdate();
        });
        this.currencyRate = modifyData.currencyRate;
        this.signPlace = modifyData.signPlace;
        this.payType = modifyData.payType;
        this.payment = modifyData.payWay;
        this.usance = modifyData.usance;
        this.taxAmt = modifyData.taxAmt;
        this.taxRate = modifyData.taxRate;
        this.remark = modifyData.remark;
        // this.tableData.map((item, index) => {
        //   item.rowno = (index + 1) * 10;
        // });
      }
    },
    //公司弹窗打开
    componyTip() {
      this.companyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.companyShow = false;
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.companyShow = false;
      this.companyName = e;
      this.branchName = "";
      this.staffName = "";
      if (this.currency.currencyId) {
        getCurrencyRate({
          formCurrencyId: this.currency.currencyId,
          toCurrencyId: e.functionalCurrencyId
        })
          .then(res => {
            this.currencyRate = res.data.parities;
          })
          .catch(() => {});
      }
    },
    //部门弹窗打开
    departmentTip() {
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
      this.staffName = "";
    },
    //员工弹窗打开
    staffTip() {
      if (this.companyName == `` || this.branchName == ``) {
        this.$openWarning("请先选择公司和部门");
        return false;
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
    },
    //协议弹窗确定获取数据
    contractSure(e) {
      this.contractShow = false;
      // eslint-disable-next-line no-console
      console.log("e", e);
    },
    //协议弹窗关闭
    contractCancle() {
      this.contractShow = false;
    },
    //协议弹窗打开
    contractTip() {
      this.contractShow = true;
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
      this.projectName = e.projectName;
      this.projectCode = e.projectCode;
    },
    //客户弹窗打开
    customerTip() {
      if (this.contractCat) {
        if (this.supplierControl) {
          this.customerShow = true;
        } else {
          this.$openWarning("客户不可用，请选择供应商");
        }
      } else {
        this.$openWarning("请先选择协议类型");
      }
    },
    //客户弹窗关闭
    customerCancle() {
      this.customerShow = false;
    },
    //客户弹窗确定获取数据
    customerSure(e) {
      this.customerShow = false;
      this.customerName = e;
      this.supplierName = "";
      this.contractCat = 10890010;
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
      if (this.companyName.functionalCurrencyId) {
        getCurrencyRate({
          formCurrencyId: e.currencyId,
          toCurrencyId: this.companyName.functionalCurrencyId
        })
          .then(res => {
            this.currencyRate = res.data.parities;
          })
          .catch(() => {});
      }
      // this.currencyName = e.currencyName;
      // this.$root.Bus.$emit("currency", e);
    },
    //供应商弹窗打开
    supplierTip() {
      if (this.contractCat) {
        if (this.customerControl) {
          this.supplierShow = true;
        } else {
          this.$openWarning("供应商不可用，请选择客户");
        }
      } else {
        this.$openWarning("请先选择协议类型");
      }
    },
    //供应商弹窗关闭
    supplierCancle() {
      this.supplierShow = false;
    },
    //供应商弹窗确定获取数据
    supplierSure(e) {
      this.supplierShow = false;
      this.supplierName = e;
      this.customerName = "";
      this.contractCat = 10890005;
    },
    //物料弹窗打开
    matterTip() {
      this.matterShow = true;
    },
    //物料弹窗关闭
    matterCancle() {
      this.matterShow = false;
      // this.tableData[this.goodsListIndex].goodsCode = "";
    },
    //物料弹窗确定获取数据
    matterSure(e) {
      if (e) {
        let tempMatter = {
          goodsId: e.skuId, //物料ID
          goodsCode: e.skuCode, //物料Code
          goodsName: e.skuName, //物料名称
          goodsCat: e.categoryCode, //物料大类
          goodsCategoryName: e.categoryShowName,
          goodsSpec: e.propertyInfo, //物料规格
          itemUnit: e.firstUnitName,
          secUnit: e.secUnitName,
          taxRate: e.vatRate
        };
        Object.assign(this.tableData[this.goodsListIndex], tempMatter);
        this.tableData[this.goodsListIndex].matterNoControl = true;
        this.tableData[this.goodsListIndex].MatterNoIconControl = false;
      }
      this.matterShow = false;
      // this.rowClick();
    },
    showSearchIcon() {
      this.tableData[this.goodsListIndex].goodsCode = "";
      this.tableData[this.goodsListIndex].matterNoControl = false;
      this.tableData[this.goodsListIndex].MatterNoIconControl = true;
    },
    handleUnitChange(scope) {},
    // 获取标签
    handleClick(tab, event) {
      // eslint-disable-next-line no-console
      console.log(tab, event);
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        } else if (
          index === 7 ||
          index === 10 ||
          index === 11 ||
          index === 13
        ) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                let tot = (prev * 100000 + curr * 100000) / 100000;
                if (index === 11 || index === 13) {
                  return tot.toFixed(2);
                } else if (index === 9) {
                  return tot.toFixed(6);
                }
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += "";
          } else {
            sums[index] = "";
          }
        }
      });

      return sums;
    },
    //删除方法
    deleFun() {
      let index = this.goodsListIndex;
      if (this.selectioned.length == 0) {
        this.$openWarning(`请选中数据`);
      } else {
        this.$confirm("是否删除选中数据？", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
          closeOnClickModal: false
        }).then(() => {
          if (!this.isChangeContract) {
            //非框架变更
            let contractDetailIdList = [];
            this.selectioned.map((item, index) => {
              if (item.contractDetailId) {
                contractDetailIdList.push(item.contractDetailId);
              }
              // this.tableData.splice(this.tableData[this.tableData.indexOf(item)], 1)
            });
            for (const el of this.selectioned) {
              this.tableData = this.tableData.filter(item => item !== el);
            }
            if (contractDetailIdList.length > 0) {
              deleteOdFwContractItems({
                contractId: this.modifyData.contractId,
                version: this.modifyData.version,
                contractDetailIdList
              }).then(res => {
                this.$openSuccess("删除成功");
              });
            } else {
              this.$openSuccess("删除成功");
            }
            this.tableData.map((item, index) => {
              item.rowno = (index + 1) * 10;
            });
          } else {
            //框架变更    非调接口删除
            this.selectioned.map((item, index) => {
              this.tableData.splice(this.tableData.indexOf(item), 1);
              item.isInactive = 2;
            });
            this.tempTableData = this.selectioned;
            this.$openSuccess("删除成功，变更后生效");
          }
        });
      }
    },
    //表格选择
    handleChange(e) {
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    //表格单选
    dialogCheck(selection, row) {
      // this.$refs.multipleTable.clearSelection();
      this.selectioned = selection;
      if (row) {
        this.index = this.tableData.indexOf(row);
        this.goodsListIndex = this.tableData.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //单行双击
    dblclick(e) {
      let index = this.tableData.indexOf(e);
      this.goodsListIndex = index;
      this.tableData.forEach(item => {
        item.edit = false;
      });
      this.tableData[index].edit = true;
      this.selectioned = e;
      this.index = this.tableData.indexOf(e);
      this.goodsListIndex = this.tableData.indexOf(e);
      this.$set(this.tableData, this.tableData.indexOf(e), e);
    },
    //单行点击
    rowClick(e) {
      // this.$refs.multipleTable.clearSelection();
      // this.$refs.multipleTable.toggleRowSelection(e, true);
      this.selectioned = e;
      this.index = this.tableData.indexOf(e);
      this.goodsListIndex = this.tableData.indexOf(e);
    },
    //创建数据
    addList() {
      this.tableData.forEach(item => {
        item.edit = false;
      });
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        linkMan: "",
        fixedTelephone: "",
        MatterNoIconControl: true,
        mobilePhone: "",
        eamil: "",
        fax: "",
        linkType: "",
        rowno:(this.tableData.length+1)*10
      };
      let url = window.location.href;
      if (url.indexOf("contractId=") != -1) {
        let contractId = url.split("contractId=")[1];
        data.contractId = contractId;
      }
      if (this.isChangeContract) {
        let maxList = [];
        for (const item of this.tableData) {
          maxList.push(item.rowno);
        }
        let max = Math.max(...maxList);
        data.rowno = Count.accAdd(max, 10); 
        
      }
      this.newTable.unshift(data);
      let newTable = [];
      newTable.unshift(data);
      this.tableData = newTable.concat(this.tableData);
      // this.tableData.map((item, index) => {
      //   item.rowno = (index + 1) * 10;
      // });
    },
    //
    goBack() {
      this.$router.push({ name: "framecontract" });
    },
    //协议类型对应客户&供应商
    handleContractTypeChange() {
      console.log("object :", this.contractCat);
      switch (this.contractCat) {
        case 10890005:
          // case 10890015:
          // this.$openWarning('请先选择供应商');
          // this.contractCat = '';
          // return;
          this.customerControl = true;
          this.supplierControl = false;
          this.customerName.customerName = "";
          this.customerName = "";
          break;
        case 10890010:
          // this.$openWarning('请先选择客户');
          // this.contractCat = '';
          // return;
          this.customerControl = false;
          this.supplierControl = true;
          this.supplierName.supplierName = "";
          this.supplierName = "";
          break;
        default:
          break;
      }
    },
    to() {
      this.errorKey = [];
      if (!Object.keys(this.companyName).length) {
        // this.$openWarning(`请选择公司`);
        this.errorKey.push('companyName');
      }
      if (!Object.keys(this.branchName).length) {
        // this.$openWarning(`请选择部门`);
        this.errorKey.push('branchName');
      }
      if (!(this.customerName != "" || this.supplierName != "")) {
        // this.$openWarning(`请选择客户或供应商`);
        this.errorKey.push('supplierName');
      }
      if (!Object.keys(this.staffName).length) {
        // this.$openWarning(`请选择业务员`);
        this.errorKey.push('staffName');
      }
      if (this.contractCat == ``) {
        // this.$openWarning(`请选择协议类型`);
        this.errorKey.push('contractCat');
      }
      if (this.signingDate == ``) {
        // this.$openWarning(`请选择签订日期`);
        this.errorKey.push('signingDate');
      }
      if (this.extCode == ``) {
        // this.$openWarning(`请输入外部合同号`);
        this.errorKey.push('extCode');
      }
      if (!Object.keys(this.currency).length) {
        // this.$openWarning(`请选择业务币币别`);
        this.errorKey.push('currency');
      }
      if (this.currencyRate == ``) {
        // this.$openWarning(`请输入本位币汇率`);
        this.errorKey.push('currencyRate');
      }
      if (this.payType == ``) {
        // this.$openWarning(`请选择付款类型`);
        this.errorKey.push('payType');
      }
      if (this.payment == ``) {
        // this.$openWarning(`请选择付款方式`);
        this.errorKey.push('payment');
      }
      if (this.usance == `` && (this.payment == 10210005 || this.payment == 10210010)) {
        // this.$openWarning(`请输入票期`);
        this.errorKey.push('usance');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning(`请将必填项补充完整！`);
        return false
      }
      this.errorKey =  '';
      let flag = false;
      this.tableData.map(item => {
        if (
          item.goodsCategoryName == "" ||
          item.goodsName == "" ||
          item.goodsSpec == "" ||
          item.itemUnit == "" ||
          item.itemQty == "" ||
          item.originPrice == "" ||
          item.originAmt == "" ||
          item.taxRate == "" ||
          item.taxAmt == ""
        ) {
          flag = true;
        }
      });
      if (flag) {
        this.$openWarning("物料数据未填写完整");
        return false;
      }
      let tempInfo = {};
      if (this.supplierName.supplierName == null) {
        tempInfo.custId = this.customerName.customerId; //客户id
        tempInfo.custName = this.customerName.customerName; //客户名称
        tempInfo.custCode = this.customerName.customerCode; //客户编码
        tempInfo.supplierId = "";
        tempInfo.supplierName = "";
        tempInfo.supplierCode = "";
      } else if (this.customerName.customerName == null) {
        tempInfo.supplierId = this.supplierName.supplierId;
        tempInfo.supplierName = this.supplierName.supplierName;
        tempInfo.supplierCode = this.supplierName.supplierCode;
        tempInfo.custId = ""; //客户id
        tempInfo.custName = ""; //客户名称
        tempInfo.custCode = ""; //客户编码
      }
      let data = {
        odFwContract: {
          ...tempInfo,
          companyId: this.companyName.companyId, //公司
          companyName: this.companyName.companyName, //公司
          companyCode: this.companyName.companyCode, //公司
          orgId: this.branchName.branchId, //部门
          orgName: this.branchName.branchName, //部门
          orgCode: this.branchName.branchCode, //部门
          contractStatus: this.contractStatus, //协议状态--草拟
          bizPersonName: this.staffName.empName, //业务员
          bizPersonCode: this.staffName.empCode, //业务员
          contractCat: this.contractCat, //协议类型
          projectCode: this.projectCode, //项目号
          projectName: this.projectName, //项目名称
          signTime: this.signingDate, //签订日期
          contractBeginDate: this.signingDate, //协议生效日
          contractEndDate: this.contractEndDate, //协议到期日
          extCode: this.extCode, //外部合同号
          currencyCode: this.currency.currencyCode, //业务币币别
          currencyName: this.currency.currencyName, //业务币币别
          currencyRate: this.currencyRate, //本位币汇率
          signPlace: this.signPlace, //签约地点
          payType: this.payType, //付款类型
          payWay: this.payment, //付款方式
          usance: this.usance, //票期
          contractAmt: this.contractAmt, //协议金额
          remark: this.remark //备注
        },
        odFwContractItemsList: this.tableData
      };
      if (this.modifyData.contractId) {
        data.odFwContract.contractId = this.modifyData.contractId;
        data.odFwContract.version = this.modifyData.version;
      }
      return data;
      // this.$emit("get", data, 1);
    },
    //变更提交
    changeTo() {
      let tempInfo = {};
      if (this.supplierName.supplierName == null) {
        tempInfo.custId = this.customerName.customerId; //客户id
        tempInfo.custName = this.customerName.customerName; //客户名称
        tempInfo.custCode = this.customerName.customerCode; //客户编码
        tempInfo.supplierId = "";
        tempInfo.supplierName = "";
        tempInfo.supplierCode = "";
      } else if (this.customerName.customerName == null) {
        tempInfo.supplierId = this.supplierName.supplierId;
        tempInfo.supplierName = this.supplierName.supplierName;
        tempInfo.supplierCode = this.supplierName.supplierCode;
        tempInfo.custId = ""; //客户id
        tempInfo.custName = ""; //客户名称
        tempInfo.custCode = ""; //客户编码
      }
      let data = {
        odFwContract: {
          ...tempInfo,
          companyId: this.companyName.companyId, //公司
          companyName: this.companyName.companyName, //公司
          companyCode: this.companyName.companyCode, //公司
          orgId: this.branchName.branchId, //部门
          orgName: this.branchName.branchName, //部门
          orgCode: this.branchName.branchCode, //部门
          contractStatus: 10130020, //协议状态--变更→审批后修改
          bizPersonName: this.staffName.empName, //业务员
          bizPersonCode: this.staffName.empCode, //业务员
          contractCat: this.contractCat, //协议类型
          projectCode: this.projectCode, //项目号
          projectName: this.projectName, //项目名称
          signTime: this.signingDate, //签订日期
          contractBeginDate: this.signingDate, //协议生效日
          contractEndDate: this.contractEndDate, //协议到期日
          extCode: this.extCode, //外部合同号
          currencyCode: this.currency.currencyCode, //业务币币别
          currencyName: this.currency.currencyName, //业务币币别
          currencyRate: this.currencyRate, //本位币汇率
          signPlace: this.signPlace, //签约地点
          payType: this.payType, //付款类型
          payWay: this.payment, //付款方式
          usance: this.usance, //票期
          contractAmt: this.contractAmt, //协议金额
          remark: this.remark //备注
        },
        odFwContractItemsList: this.tableData.concat(this.tempTableData) //页面删除
      };
      if (this.modifyData.contractId) {
        data.odFwContract.contractId = this.modifyData.contractId;
        data.odFwContract.version = this.modifyData.version;
      }
      return data;
    },
    //手动添加物料
    handleMatterSelect() {
      this.tableData[this.goodsListIndex].goodsCode = "";
      this.tableData[this.goodsListIndex].matterNameControl = true;
    },
    //控制数量
    handleItemQtyChange(scope) {
      let value = scope.row.itemQty;
      value = value
        .replace(/[^\d^\.]+/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^0[^.]/, "")
        .replace(/^\./, "");
      value = value.replace(/\.\d{5}/, "." + Math.floor((value % 1) * 10000));
      scope.row.itemQty = value;
      this.qtyChange(scope.row, scope.$index);
      this.handleoriginAmtCalc(scope.row);
    },
    //控制单价
    handleOriginPriceChange(scope) {
      let value = scope.row.originPrice;
      value = value
        .replace(/[^\d^\.]+/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^0[^.]/, "")
        .replace(/^\./, "");
      value = value.replace(/\.\d{7}/, "." + Math.floor((value % 1) * 1000000));
      scope.row.originPrice = value;
      this.originPriceCh(scope.row, scope.$index);
      this.handleoriginAmtCalc(scope.row);
    },
    //控制含税金额
    handleOriginAmtChange(scope) {
      let value = scope.row.originAmt;
      value = value
        .replace(/[^\d^\.]+/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^0[^.]/, "")
        .replace(/^\./, "");
      value = value.replace(/\.\d{3}/, "." + Math.floor((value % 1) * 100));
      scope.row.originAmt = value;
      this.originAmtCh(scope.row, scope.$index);
      this.handleoriginAmtCalc(scope.row);
    },
    //控制税率
    handleTaxRateChange(scope) {
      let value = scope.row.taxRate;
      value = value.replace(/[^\d]+/g, "");
      scope.row.taxRate = value;
      this.taxRateCh(scope.row, scope.$index);
    },
    //控制税额
    handleTaxAmtChange(scope) {
      let value = scope.row.taxAmt;
      value = value
        .replace(/[^\d^\.]+/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^0[^.]/, "")
        .replace(/^\./, "");
      value = value.replace(/\.\d{7}/, "." + Math.floor((value % 1) * 1000000));
      scope.row.taxAmt = value;
      this.taxAmtCh(scope.row, scope.$index);
    },
    //控制第二数量
    handleSecQtyChange(scope) {
      let value = scope.row.secQty;
      value = value
        .replace(/[^\d^\.]+/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^0[^.]/, "")
        .replace(/^\./, "");
      value = value.replace(/\.\d{5}/, "." + Math.floor((value % 1) * 10000));
      scope.row.secQty = value;
    },
    //物料校验
    qtyChange(row, index) {
      this.originPriceCh(row, index);
      // this.originAmtCh(row, index);
      // this.taxRateCh(row, index);
      // this.taxAmtCh(row, index);
      row.baseNoAmt = row.originAmt * this.currencyRate;
    },
    //采购含税单价变动
    originPriceCh(e, index) {
      let row = e;
      //采购不含税单价
      row.unorginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //采购含税金额
      row.originAmt = this.$orginAmt(row.originPrice, row.itemQty);
      //采购不含税金额
      row.unorginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmt, row.unorginAmt);

      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, this.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(row.unorginPrice, this.currencyRate);
      //本币含税金额 baseAmt
      row.baseAmt = this.$bbhsje(row.originAmt, this.currencyRate);
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$bbnhsje(row.unorginAmt, this.currencyRate);
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, this.currencyRate);
      this.$set(this.tableData, index, row);
    },
    //采购含税金额变动
    originAmtCh(e, index) {
      //总计业务币含税金额
      // let tol = 0;
      // for (const item of this.tableData) {
      //   tol = Count.accAdd(tol, item.originAmt);
      // }
      // this.contractAmtVat = tol;

      let row = e;
      //采购含税单价
      row.originPrice = this.$orginPrice(row.originAmt, row.itemQty);
      //采购不含税单价
      row.unorginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //采购不含税金额
      row.unorginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmt, row.unorginAmt);

      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      row.basePrice = this.$bbhsdj(row.originPrice, this.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(row.unorginPrice, this.currencyRate);
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$bbnhsje(row.unorginAmt, this.currencyRate);
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, this.currencyRate);
      this.$set(this.tableData, index, row);
    },
    //税率变动
    taxRateCh(e, index) {
      let row = e;
      //采购不含税金额
      row.unorginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //采购不含税单价
      row.unorginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //增值税额
      row.taxAmt = this.$taxAmt(row.originAmt, row.unorginAmt);

      //本币计算 对应业务币*汇率
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$bbnhsje(row.unorginAmt, this.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(row.unorginPrice, this.currencyRate);
      //本币增值税额 baseTax
      row.baseTax = this.$bbzzse(row.taxAmt, this.currencyRate);
      this.$set(this.tableData, index, row);
    },
    //业务币税额变动
    taxAmtCh(e, index) {
      let row = e;
      //采购不含税金额  采购不含税金额=采购含税金额-税额
      row.unorginAmt = this.$unorginAmtCh(row.originAmt, row.taxAmt);
      //采购不含税单价 采购不含税金额=采购不含税金额 / 数量
      row.unorginPrice = this.$unPrice(row.unorginAmt, row.itemQty);

      //本币计算 对应业务币*汇率
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$bbnhsje(row.unorginAmt, this.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(row.unorginPrice, this.currencyRate);
      this.$set(this.tableData, index, row);
    },
    //物料含税单价校验
    handleOriginPriceRule(originPrice) {
      originPrice = originPrice.replace(/[\u4e00-\u9fa5]+/g, ""); //验证非汉字
      originPrice = originPrice.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
      originPrice = originPrice.replace(/^\./g, ""); //验证第一个字符是数字而不是
      originPrice = originPrice
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", "."); //只保留第一个小数点, 清除多余的
      // eslint-disable-next-line no-useless-escape
      originPrice = originPrice.replace(/^(\-)*(\d+)\.(\d{6}).*$/, "$1$2.$3"); //只能输入6个小数
      this.tableData[this.goodsListIndex].originPrice = originPrice;
    },
    //价格计算
    handleoriginAmtCalc(row) {
      let sum = 0;
      this.tableData.map(item => {
        if (item.originAmt) {
          sum += item.originAmt;
        }
      });
      this.contractAmt = sum;
    },
    handleUnorginPriceCalc(row) {
      row.unorginPrice = this.$unorginPrice(row.originPrice, row.taxRate / 100);
      row.unorginPrice = Math.round(row.unorginPrice * 1000000) / 1000000;
      setTimeout(() => {
        row.taxAmt = Math.round((row.originAmt - row.unorginAmt) * 100) / 100;
      }, 10);
    },
    handleUnorginAmtCalc(row) {
      row.unorginAmt = this.$unorginAmt(row.originAmt, row.taxRate / 100);
      row.unorginAmt = Math.round(row.unorginAmt * 100) / 100;
    },
    handleContractCatClear() {
      this.contractCat = "";
    }
  },
  computed: {
   
    // contractAmt: {
    //   get() {
    //     let sum = 0;
    //     this.tableData.map(item => {
    //       if (item.originAmt) {
    //         sum += item.originAmt;
    //       }
    //     });
    //     return sum;
    //   },
    //   set() {}
    // }
  },
 
  components: {
    agreeSelect,
    componySelect,
    departmentSelect,
    staffSelect,
    projectSelect,
    customerSelect,
    supplierSelect,
    matterSelect,
    coinSelect
  }
};
</script>
<style lang="scss" scoped>
.must-full-brother {
  width: 90% !important;
}

.remark-style {
  display: flex;
  padding-top: 10px;
  justify-content: space-around;
  width: 100%;
  label {
    width: 7.9%;
    text-align: right;
    line-height: 31px;
    padding-right: 9px;
  }
  .empty-class {
    width: 4.4%;
  }
}
.tabFirst {
  .input-div {
    padding-bottom: 25px;
  }
}
/* .isrequired::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
} */
</style>
<style lang="scss">
.remark-style {
  .el-textarea__inner {
    border-color: #000 !important;
  }
  
}
.tabFirst {
  .el_flex {
    display: flex;
    align-items: center;
  }

  .el-date-editor.el-input {
    width: auto;
  }

  .table_title {
    font-weight: bold;
    font-size: 16px;
    margin: 5px 0;
  }
  .bcakfff {
    background: #ffffff;
    padding: 10px 0px;
  }
  .formBox {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    .lablel {
      width: 103px;
      text-align: right;
      font-size: 12px;
      padding-right: 20px;
    }
    .labelInput {
      width: 200px;
    }
    .el-input__inner {
      height: 30px;
      width: 200px;
    }
    .el-input__icon {
      line-height: 30px;
    }
    .el-select .el-input__inner {
      width: 200px;
    }
  }
  .flex_center {
    display: flex;
    margin-bottom: 0;
    .table_title {
      margin-bottom: 0;
      margin-right: 10px;
    }
    .button-div {
      margin: 0;
    }
  }
  .el-tabs__item {
    width: auto !important;
  }
  header {
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 5px;
  }
  .el-col {
    position: relative;
    .comicon {
      width: 170px;
      height: 20px;
      position: absolute;
      right: 6px;
      top: 4px !important;
      cursor: pointer;
    }
    .absoLab {
      position: absolute;
      left: -4px;
    }
    .absdfzx {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .input-div-bor {
    border-bottom: 0;
    margin-bottom: 0;
    padding: 10px;
  }
  .bortop0 {
    border-top: 0;
  }

  .el-tabs__header {
    margin-bottom: 0;
  }
  .olbutton {
    width: auto !important;
  }
}
.fixedHeight {
  height: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.el-table label::after {
  content: "";
}
</style>
