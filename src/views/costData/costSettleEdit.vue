<template>
  <div id="costSettleEdit">
    <!--操作按钮-->
    <div class="button-div">
      <el-button icon="el-icon-suitcase" @click="save">保存</el-button>
      <el-button icon="el-icon-close" @click="goBack">取消</el-button>
    </div>
    <el-tabs class="el-tabs" type="card" v-model="currTab">
      <el-tab-pane label="结算信息" name="settle">
        <div class="input-div">
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span> 公司</label>
              <el-input v-model="baseInfo.companyName" :class="errorKey.includes('companyName') ? 'inputRed' : ''" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span> 部门</label>
              <el-input v-model="baseInfo.orgName" :class="errorKey.includes('orgName') ? 'inputRed' : ''" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span style="color:red">*</span>业务员</label>
              <el-input v-model="staffName.empName" :class="errorKey.includes('staffName') ? 'inputRed' : ''" class="el-inputs" placeholder="请选择" disabled>
              </el-input>
              <span class="moreIcon" @click="staffTip"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span> 供应商</label>
              <el-input v-model="baseInfo.supplierName" :class="errorKey.includes('supplierName') ? 'inputRed' : ''" class="el-inputs" :placeholder="baseInfo.isPrefetch ? '' : '请选择'" disabled></el-input>
              <span class="moreIcon" v-if="!baseInfo.isPrefetch" @click="supplierPopup"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>费用编号</label>
              <el-input v-model="baseInfo.erpCostsCode" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label class="text_too_long_add"><span class="must-full">*</span> 外部费用编号</label>
              <el-input v-model="baseInfo.fiCostsCode" class="el-inputs" :class="errorKey.includes('fiCostsCode') ? 'inputRed' : ''"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>状态</label>
              <el-select v-model="baseInfo.costsStatus" class="el-selects" disabled>
                <el-option v-for="(item, index) in settleStatusDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>款项类别</label>
              <el-select v-model="baseInfo.billCategory" class="el-selects" disabled>
                <el-option v-for="(item, index) in billCategoryDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>费用环节</label>
              <el-select v-model="baseInfo.bizOccurrence" class="el-selects" disabled>
                <el-option v-for="(item, index) in costLinkDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label class="text_too_long"><span class="must-full">*</span> 业务币币种</label>
              <el-input v-model="baseInfo.currencyCode" :class="errorKey.includes('currencyCode') ? 'inputRed' : ''" class="el-inputs" :placeholder="baseInfo.isPrefetch ? '' : '请选择'" disabled></el-input>
              <span class="moreIcon" v-if="!baseInfo.isPrefetch" @click="coinPopup"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label class="text_too_long"><span class="must-full">*</span> 本位币汇率</label>
              <el-input v-model="baseInfo.currencyRate" class="el-inputs" :class="errorKey.includes('currencyRate') ? 'inputRed' : ''" @input="changeRate"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>费用总金额</label>
              <el-input v-model="baseInfo.costsAmtVat" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>税额</label>
              <el-input v-model="baseInfo.taxAmt" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>过账日期</label>
              <el-date-picker v-model="baseInfo.postDate" type="date" class="el-selects" placeholder="过账日期" :picker-options="limitTime"></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>附件数量</label>
                <el-input  class="el-inputs" v-model="baseInfo.attachmentCount" :class="errorKey.includes('attachmentCount') ? 'inputRed' : ''" size="small"></el-input>     
            </el-col>
            <el-col :span="5" class="el-col">
                <label>进项税科目</label>
                <el-input v-model="baseInfo.taxAccountName.nameL2" class="el-inputs" size="small" disabled></el-input>
                <span class='comicon2' @click="accountTips"><i class="el-icon-search" ></i></span>
            </el-col>
            <el-col :span="20" class="el-col el-full">
              <label>备注</label>
              <el-input v-model="baseInfo.remark" class="el-inputs"></el-input>
            </el-col>
        </div>
        <el-tabs class="el-tabs" type="card" v-model="currSubTab" :before-leave="jumpToShare">
          <el-tab-pane label="费用信息" name="cost">
            <div class="button-div" style="margin-bottom:5px">
              <el-button icon="el-icon-plus" size="mini" @click="addCost">增加行</el-button>
              <el-button icon="el-icon-minus" size="mini" @click="deleteCost">删除行</el-button>
            </div>
            <el-table
              class="el-table edit-info noContent"
              border
              center
              :data="costList"
              max-height="330"
              :row-class-name="setCostIndex"
              @row-dblclick="costDblclick"
              @row-click="costSelectRow">
              <el-table-column width="70" >
                <template scope="scope">
                  <el-radio :label="scope.$index" v-model="costIndex">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column type="index" label="序号" width="60" ></el-table-column>
              <el-table-column label="费用名称" min-width="180" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div v-if="scope.row.canEdit">
                    <span class="moreIcon" v-if="!baseInfo.isPrefetch" @click="costPopup"><i class="el-icon-search"></i></span>
                    <el-input v-model="scope.row.costName" :placeholder="baseInfo.isPrefetch ? '' : '请选择'" disabled></el-input>
                  </div>
                  <div v-else>{{scope.row.costName}}</div>
                </template>
              </el-table-column>
              <el-table-column label="摊销维度" min-width="120" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div v-if="scope.row.canEdit">
                    <el-select v-model="scope.row.shareDim" disabled>
                      <el-option v-for="(item, index) in amortizeDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
                    </el-select>
                  </div>
                  <div v-else>{{scope.row.shareDimStr}}</div>
                </template>
              </el-table-column>
              <el-table-column label="费用金额" min-width="150" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div v-if="scope.row.canEdit">
                    <el-input v-model="scope.row.costAmtVat" @input="updateSettleAmt(scope.row,scope.$index)" @change="changeAmt(scope.row)"></el-input>
                  </div>
                  <div v-else>{{scope.row.costAmtVat}}</div>
                </template>
              </el-table-column>
              <el-table-column label="预提金额" min-width="150" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div v-if="scope.row.canEdit">
                    <el-input v-model="scope.row.prefetchAmt" disabled></el-input>
                  </div>
                  <div v-else>{{scope.row.prefetchAmt}}</div>
                </template>
              </el-table-column>
              <el-table-column label="业务币">
                <el-table-column label="费用金额（不含税）" min-width="150" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <div v-if="scope.row.canEdit">
                      <el-input v-model="scope.row.costAmt"  @input="updateTaxAmt(scope.row, -1,scope.$index)" @change="changeAmt(scope.row)"></el-input>
                    </div>
                    <div v-else>{{scope.row.costAmt}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="税额" min-width="150" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <div v-if="scope.row.canEdit">
                      <el-input v-model="scope.row.taxAmt" @input="updateTaxAmt(scope.row, 1,scope.$index)" @change="changeAmt(scope.row)"></el-input>
                    </div>
                    <div v-else>{{scope.row.taxAmt}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="费用金额（含税）" min-width="150" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <div v-if="scope.row.canEdit">
                      <el-input v-model="scope.row.costAmtVat" @input="updateSettleAmt(scope.row,scope.$index)" @change="changeAmt(scope.row)"></el-input>
                    </div>
                    <div v-else>{{scope.row.costAmtVat}}</div>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="本位币">
                <el-table-column prop="costAmtBase" label="费用金额（不含税）" min-width="150" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="taxAmtBase" label="税额" min-width="150" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="costAmtVatBase" label="费用金额（含税）" min-width="150" show-overflow-tooltip>
                </el-table-column>
              </el-table-column>
              <el-table-column label="备注" min-width="200" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div v-if="scope.row.canEdit">
                    <el-input v-model="scope.row.remark"></el-input>
                  </div>
                  <div v-else>{{scope.row.remark}}</div>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="分摊信息" name="share">
            <div class="button-div" style="margin-bottom:5px">
              <el-button icon="el-icon-plus" size="mini" v-if="!baseInfo.isPrefetch" @click="addShare">增加行</el-button>
              <el-button icon="el-icon-minus" size="mini" v-if="!baseInfo.isPrefetch" @click="deleteShare">删除行</el-button>
              <el-button icon="el-icon-aim" size="mini" :disabled="canAutoShare" @click="autoShare">自动分摊</el-button>
            </div>
            <!--摊销维度：批次-->
            <el-table
              class="el-table edit-info"
              border
              center
              show-summary
              :summary-method="getTotalSettleAmt"
              :data="costIndex == null ? [] : costList[costIndex].shareList"
              v-if="costIndex == null ? false : costList[costIndex].shareDim == '10640005'"
              ref="multipleShare"
              @selection-change="shareChange"
              @select-all="shareSelect"
              @select="shareSelect"
              max-height="330"
              @row-click="shareSelectRow">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="dim2ContractCode" label="合同号" min-width="150" show-overflow-tooltip :key="1"></el-table-column>
              <el-table-column prop="dim2ExtContractCode" label="外部合同号" min-width="150" show-overflow-tooltip :key="2"></el-table-column>
              <el-table-column prop="dim3ContractRowno" label="合同行号" min-width="100" show-overflow-tooltip :key="3"></el-table-column>
              <el-table-column prop="dim3WvNo" label="入库单号" min-width="150" show-overflow-tooltip v-if="costLinkType == 1" :key="4"></el-table-column>
              <el-table-column prop="dim3DoNo" label="出库单号" min-width="150" show-overflow-tooltip v-if="costLinkType == 2" :key="5"></el-table-column>
              <el-table-column prop="dim3GoodsCode" label="物料号" min-width="150" show-overflow-tooltip :key="6"></el-table-column>
              <el-table-column prop="dim3GoodsName" label="物料名称" min-width="180" show-overflow-tooltip :key="7"></el-table-column>
              <el-table-column prop="dim3GoodsCat" label="物料大类" min-width="150" show-overflow-tooltip :key="8"></el-table-column>
              <el-table-column prop="dim3GoodsSpec" label="物料规格" min-width="180" show-overflow-tooltip :key="9"></el-table-column>
              <el-table-column prop="dim4BatchCode" label="批次号" min-width="150" show-overflow-tooltip :key="10"></el-table-column>
              <el-table-column label="数量" min-width="150" show-overflow-tooltip :key="11">
                <template slot-scope="scope">
                  <span>{{$toFixed(scope.row.dim4BatchQty, 4)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="dim3GoodsUnit" label="基础单位" min-width="100" show-overflow-tooltip :key="12"></el-table-column>
              <el-table-column prop="prefetchAmt" label="预提金额" min-width="150" show-overflow-tooltip v-if="baseInfo.isPrefetch" :key="13"></el-table-column>
              <el-table-column prop="settledAmt" label="结算金额" min-width="150" show-overflow-tooltip :key="14">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.settledAmt" :oninput="scope.row.settledAmt = $filterPriceNum(scope.row.settledAmt, 2)"></el-input>
                </template>
              </el-table-column>
            </el-table>
            <!--摊销维度：合同-->
            <el-table
              class="el-table edit-info"
              border
              center
              show-summary
              :summary-method="getTotalSettleAmt"
              :data="costIndex == null ? [] : costList[costIndex].shareList"
              v-if="costIndex == null ? false : costList[costIndex].shareDim == '10640010'"
              ref="multipleShare"
              @selection-change="shareChange"
              @select-all="shareSelect"
              @select="shareSelect"
              max-height="330"
              @row-click="shareSelectRow">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="dim2ContractCode" label="合同号" min-width="150" show-overflow-tooltip :key="15"></el-table-column>
              <el-table-column prop="dim2ExtContractCode" label="外部合同号" min-width="150" show-overflow-tooltip :key="16"></el-table-column>
              <el-table-column prop="dimAmt" label="合同金额" min-width="150" show-overflow-tooltip :key="17"></el-table-column>
              <el-table-column prop="prefetchAmt" label="预提金额" min-width="150" show-overflow-tooltip v-if="baseInfo.isPrefetch" :key="18"></el-table-column>
              <el-table-column prop="settledAmt" label="结算金额" min-width="150" show-overflow-tooltip :key="19">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.settledAmt" :oninput="scope.row.settledAmt = $filterPriceNum(scope.row.settledAmt, 2)"></el-input>
                </template>
              </el-table-column>
            </el-table>
            <!--摊销维度：项目-->
            <el-table
              class="el-table edit-info"
              border
              center
              show-summary
              :summary-method="getTotalSettleAmt"
              :data="costIndex == null ? [] : costList[costIndex].shareList"
              v-if="costIndex == null ? false : costList[costIndex].shareDim == '10640015'"
              ref="multipleShare"
              @selection-change="shareChange"
              @select-all="shareSelect"
              @select="shareSelect"
              max-height="330"
              @row-click="shareSelectRow">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" label="序号" width="60"></el-table-column>
              <el-table-column prop="dim1ProjectCode" label="项目号" min-width="100" show-overflow-tooltip :key="20"></el-table-column>
              <el-table-column prop="dim1PorjectName" label="项目名称" min-width="180" show-overflow-tooltip :key="21"></el-table-column>
              <el-table-column prop="prefetchAmt" label="预提金额" min-width="150" show-overflow-tooltip v-if="baseInfo.isPrefetch" :key="22"></el-table-column>
              <el-table-column prop="settledAmt" label="结算金额" min-width="150" show-overflow-tooltip :key="23">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.settledAmt" :oninput="scope.row.settledAmt = $filterPriceNum(scope.row.settledAmt, 2)"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
         <!--进项税科目-->
        <subject-frame v-if="subjectShow" :longNumber="22210101" :tipShow='subjectShow' @subjectCancle="subjectCancle" @subjectSure="subjectSure"></subject-frame>
      </el-tab-pane>
      <el-tab-pane label="系统信息" name="system">
        <div class="input-div">
          <el-row>
            <el-col :span="5" class="el-col">
              <label>创建人</label>
              <el-input v-model="baseInfo.createdName" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>创建时间</label>
              <el-date-picker v-model="baseInfo.createdTime" type="date" class="el-selects" placeholder="创建时间" disabled></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>修改人</label>
              <el-input v-model="baseInfo.updatedName" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>修改时间</label>
              <el-date-picker v-model="baseInfo.updatedTime" type="date" class="el-selects" placeholder="修改时间" disabled></el-date-picker>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="el-col">
              <label>审核人</label>
              <el-input v-model="baseInfo.auditBy" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>审核时间</label>
              <el-date-picker v-model="baseInfo.auditDate" type="date" class="el-selects" placeholder="审核时间" disabled></el-date-picker>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 选择员工弹窗 -->
    <staff-select v-if="staffShow" :tipShow="staffShow" :data="staffsName" @staffCancle="staffCancle"
      @staffSure="staffSure">
    </staff-select>
    <!--供应商弹窗-->
    <supplier-select v-if="supplierShow" :tipShow="supplierShow" @supplierCancle="supplierCancel" @supplierSure="supplierSure"></supplier-select>
    <!--货币弹窗-->
    <coin-select v-if="coinShow" :tipShow="coinShow" @coinCancle="coinCancel" @coinSure="coinSure"></coin-select>
    <!--费用名称弹窗-->
    <cost-select v-if="costShow" :isShow="costShow" :costLink="costLinkType" :isProjectNull="isProjectNull" @callback="costCallback"></cost-select>
    <!--预提结算弹窗-->
    <prefetch-settle v-if="prefetchShow" :isShow="prefetchShow" :baseQuery="baseInfo" :selectedItem="costDetailId" @callback="prefetchCallback"></prefetch-settle>
    <!--采购环节弹窗-->
    <purchase-link v-if="purchaseShow" :isShow="purchaseShow" :baseQuery="baseInfo" :selectedItem="costList[costIndex]" @callback="purchaseCallback"></purchase-link>
    <!--销售环节弹窗-->
    <sales-link v-if="salesShow" :isShow="salesShow" :baseQuery="baseInfo" :selectedItem="costList[costIndex]" @callback="salesCallback"></sales-link>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { amortizeObj } from "@/api/dictionary";
import CostApi from "@/api/costData/cost";
import supplierSelect from "@/components/supplierSelect";
import coinSelect from "@/components/coinSelect";
import costSelect from "@/components/costSelect";
import prefetchSettle from "./components/prefetchSettle";
import purchaseLink from "./components/purchaseLink";
import salesLink from "./components/salesLink";
import subjectFrame from "@/components/subjectFrame.vue"; //科目组件
import staffSelect from "@/components/staffSelect.vue";
export default {
  name: "costSettleEdit",
  data() {
    return {
      errorKey: [],
      staffShow: false,
      staffsName: {}, //员工
      staffName: ``, //员工
      currTab: "settle",
      currSubTab: "cost",
      costLinkType: null, //费用环节：采购环节1，销售环节2
      isProjectNull: null, //摊销维度：可选项目0，不可选项目1
      baseCurrencyCode: "", //本位币币种
      costDetailId: [], //创建时选中的预提单费用信息列
      //创建时选中的单据，费用信息增加行时还需要用到
      baseSelect: {
        stockInOutCode: [],
        contractCode: [],
        projectCode: []
      },
      baseInfo: {
        isPrefetch: "", //预提结算1，无预提结算0
        //结算信息
        companyId: "",
        companyCode: "",
        companyName: "",
        orgId: "",
        orgCode: "",
        orgName: "",
        supplierId: "",
        supplierCode: "",
        supplierName: "",
        erpCostsCode: "",
        fiCostsCode: "",
        costsStatus: "",
        billCategory: "",
        bizOccurrence: "",
        currencyCode: "",
        currencyRate: "",
        costsAmtVat: null,
        taxAmt: null,
        postDate: "",
        remark: "",
        //系统信息
        createdName: "",
        createdTime: "",
        updatedName: "",
        updatedTime: "",
        attachmentCount: "", //附件数量
        taxAccountName: {} //科目名称
      },
      supplierShow: false, //是否显示供应商弹窗
      settleStatusDic: [], //状态字典
      billCategoryDic: [], //款项类别字典
      costLinkDic: [], //费用环节字典
      coinShow: false, //是否显示货币弹窗
      limitTime: {},
      //费用信息
      costList: [],
      costIndex: null, //费用信息列表选中下标
      costShow: false, //是否显示费用名称弹窗
      amortizeDic: [], //摊销维度字典
      prefetchShow: false, //是否显示预提结算弹窗
      //分摊信息
      shareIndex: null, //分摊信息列表选中下标
      purchaseShow: false, //是否显示采购环节弹窗
      salesShow: false, //是否显示销售环节弹窗
      canAutoShare: false, //能否进行自动分摊
      subjectShow: false, //进项税科目
      navColor: {
        button: {
          backgroundColor: ""
        }
      }
    };
  },
  created() {
    //状态字典
    this.settleStatusData();
    //款项类别字典
    this.billCategoryData();
    //费用环节字典
    this.costLinkData();
    //摊销维度字典
    this.amortizeData();
    if (this.$route.query.id) {
      //修改、复制凭证
      if (this.$route.query.type == "10600005") {
        //采购环节
        this.costLinkType = 1;
      } else if (this.$route.query.type == "10600010") {
        //销售环节
        this.costLinkType = 2;
      }
      this.isProjectNull = 0;
      //获取费用结算详情
      this.costSettleDetail();
    } else {
      //创建
      let bindingInfo = JSON.parse(sessionStorage.getItem("costSettle"));
      this.baseInfo.isPrefetch = bindingInfo.isPrefetch;
      this.costLinkType = bindingInfo.type;
      this.isProjectNull = bindingInfo.isProjectNull;
      this.baseInfo.companyId = bindingInfo.companyId;
      this.baseInfo.companyCode = bindingInfo.companyCode;
      this.baseInfo.companyName = bindingInfo.companyName;
      this.baseInfo.orgId = bindingInfo.branchId;
      this.baseInfo.orgCode = bindingInfo.branchCode;
      this.baseInfo.orgName = bindingInfo.branchName;
      this.baseInfo.supplierId = bindingInfo.supplierId;
      this.baseInfo.supplierCode = bindingInfo.supplierCode;
      this.baseInfo.supplierName = bindingInfo.supplierName;
      this.baseInfo.currencyCode = bindingInfo.currencyCode;
      this.costDetailId = bindingInfo.costDetailId;
      this.baseSelect.stockInOutCode = bindingInfo.stockInOutCode;
      this.baseSelect.contractCode = bindingInfo.contractCode;
      this.baseSelect.projectCode = bindingInfo.projectCode;
      this.getLimitTime(this.baseInfo.companyId); //根据公司查询过账日期选择范围
      if (this.baseInfo.isPrefetch) {
        //预提结算
        this.getBaseCurrency(this.baseInfo.companyCode, 1); //根据公司查询本位币币种
        //根据创建时选中的预提单费用信息列获取费用信息和分摊信息
        this.getCostDetail(this.costDetailId, 0);
      } else {
        //无预提结算
        this.addCost(); //创建时默认添加一行费用信息
        this.getBaseCurrency(this.baseInfo.companyCode); //根据公司查询本位币币种
      }
    }
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    //员工弹窗打开
    staffTip() {
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
    //获取费用结算详情
    costSettleDetail() {
      //费用结算主数据
      CostApi.costSettleGet({
        settleId: this.$route.query.id
      })
        .then(res => {
          Object.assign(this.baseInfo, res.data);
          this.staffName = {
            empName: this.baseInfo.bizPersonName,
            empCode: this.baseInfo.bizPersonCode
          };
          this.baseInfo.costsStatus = this.baseInfo.costsStatus + "";
          this.baseInfo.billCategory = this.baseInfo.billCategory + "";
          this.baseInfo.bizOccurrence = this.baseInfo.bizOccurrence + "";
          this.baseInfo.taxAccountName = {};
          if (res.data.taxAccountCode && res.data.taxAccountName) {
            this.baseInfo.taxAccountName.nameL2 =
              res.data.taxAccountCode + " " + res.data.taxAccountName; //科目名称
          } else {
            this.baseInfo.taxAccountName.nameL2 = "";
          }
          this.getBaseCurrency(this.baseInfo.companyCode); //根据公司查询本位币币种
          this.getLimitTime(this.baseInfo.companyId); //根据公司查询过账日期选择范围
        })
        .catch();
      //费用结算费用信息和分摊信息
      CostApi.costSettleCostGet({
        settleId: this.$route.query.id
      })
        .then(res => {
          this.costList = res.data;
          let n1 = 0;
          let n2 = 0;
          let n3 = 0;
          this.costList.forEach(item => {
            amortizeObj.forEach(item1 => {
              if (item.shareDim == item1.dict_code)
                item.shareDimStr = item1.dict_value;
            });
            item.settleAmtShared = null;
            item.shareList.forEach(subItem => {
              item.settleAmtShared += subItem.settledAmt;
            });
            //预提结算
            this.costDetailId.push(item.docCode);
            //无预提结算
            item.stockInOutCode = [];
            item.contractCode = [];
            item.projectCode = [];
            if (item.shareDim == "10640005") {
              //批次
              n1++;
              item.shareList.forEach(subItem => {
                if (this.costLinkType == 1) {
                  //采购环节
                  item.stockInOutCode.push(subItem.dim3WvNo);
                  if (n1 <= 1) {
                    this.baseSelect.stockInOutCode.push(subItem.dim3WvNo);
                  }
                } else if (this.costLinkType == 2) {
                  //销售环节
                  item.stockInOutCode.push(subItem.dim3DoNo);
                  if (n1 <= 1) {
                    this.baseSelect.stockInOutCode.push(subItem.dim3DoNo);
                  }
                }
              });
              //数组去重
              item.stockInOutCode = Array.from(new Set(item.stockInOutCode));
              if (n1 <= 1) {
                this.baseSelect.stockInOutCode = Array.from(
                  new Set(this.baseSelect.stockInOutCode)
                );
              }
            } else if (item.shareDim == "10640010") {
              //合同
              n2++;
              item.shareList.forEach(subItem => {
                item.contractCode.push(subItem.dim2ContractCode);
                if (n2 <= 1) {
                  this.baseSelect.contractCode.push(subItem.dim2ContractCode);
                }
              });
            } else if (item.shareDim == "10640015") {
              //项目
              n3++;
              item.shareList.forEach(subItem => {
                item.projectCode.push(subItem.dim1ProjectCode);
                if (n3 <= 1) {
                  this.baseSelect.projectCode.push(subItem.dim1ProjectCode);
                }
              });
            }
            //    //计算本位币金额
            // item.taxAmtBase= this.$bbzzse(item.taxAmt,this.baseInfo.currencyRate)//税额
            // item.costAmtVatBase= this.$bbhsje(item.costAmtVat, this.baseInfo.currencyRate); //含税
            // item.costAmtBase= this.$tybbnhsje(item.costAmtVatBase,item.taxAmtBase);//不含税
          });
        })
        .catch();
    },
    //状态字典
    settleStatusData() {
      CostApi.dicQuery({
        dictNo: 1065
      })
        .then(res => {
          this.settleStatusDic = res.data;
          if (!this.$route.query.id) {
            this.baseInfo.costsStatus = this.settleStatusDic[0].dict_code;
          }
        })
        .catch();
    },
    //款项类别字典
    billCategoryData() {
      CostApi.dicQuery({
        dictNo: 1093
      })
        .then(res => {
          this.billCategoryDic = res.data;
          if (!this.$route.query.id) {
            this.baseInfo.billCategory = this.billCategoryDic[0].dict_code;
          }
        })
        .catch();
    },
    //费用环节字典
    costLinkData() {
      CostApi.dicQuery({
        dictNo: 1060
      })
        .then(res => {
          this.costLinkDic = res.data;
          if (!this.$route.query.id) {
            this.baseInfo.bizOccurrence = this.costLinkDic[
              this.costLinkType - 1
            ].dict_code;
          }
        })
        .catch();
    },
    //摊销维度字典
    amortizeData() {
      CostApi.dicQuery({
        dictNo: 1064
      })
        .then(res => {
          this.amortizeDic = res.data;
        })
        .catch();
    },
    //根据公司查询本位币币种
    getBaseCurrency(companyCode, type) {
      CostApi.baseCurrencyQuery({
        companyCode: companyCode
      })
        .then(res => {
          this.baseCurrencyCode = res.data.currencyCode;
          if (type == 1) {
            this.getCurrencyRate(this.baseInfo.currencyCode); //获取本位币汇率
          }
        })
        .catch();
    },
    //根据公司查询过账日期选择范围
    getLimitTime(companyId) {
      CostApi.limitTimeQuery({
        companyId: companyId
      })
        .then(res => {
          if (res.code == "success") {
            this.limitTime = {
              disabledDate(time) {
                return (
                  time.getTime() < res.data.begindate ||
                  time.getTime() > res.data.enddate
                );
              }
            };
          }
        })
        .catch();
    },
    //根据创建时选中的预提单费用信息列获取费用信息和分摊信息
    getCostDetail(costDetailId, type) {
      CostApi.costSettleFromPrefetch(costDetailId)
        .then(res => {
          let addCostList = [];
          res.data.forEach(item => {
            item.shareList.forEach(subItem => {
              // subItem.baseCurrencyPrefetchAmt=null;
              // subItem.baseCurrencyPrefetchSumAmt=null;
              //subItem.prefetchAmtUntax=null;
              subItem.itemsId=null;
              subItem.detailId=null;
              subItem.settledAmt = null; //若无该字段，自动分摊按钮失效$set
            });
            amortizeObj.forEach(item1 => {
              if (item.shareDim == item1.dict_code)
                item.shareDimStr = item1.dict_value;
            });
            addCostList.push({
              docCode: item.itemsId, //费用预提单中的费用信息id
              costName: item.costName,
              shareDim: item.shareDim,
              shareDimStr: item.shareDimStr,
              prefetchAmt: item.prefetchAmt,
              costAmt: "",
              taxAmt: "",
              costAmtVat: "",
              remark: "",
              shareList: item.shareList, //分摊信息
              canEdit: false
            });
          });
          if (type == 0) {
            //新建预提结算单
            addCostList[0].canEdit = true;
            this.baseInfo.costDocNo = res.data[0].prefetchCode;
            this.costList = addCostList;
          } else if (type == 1) {
            //增加费用信息行
            this.costDetailId.push(...costDetailId);
            this.costList.push(...addCostList);
          }
        })
        .catch();
    },
    //保存
    save() {
      this.errorKey = [];
      if (this.baseInfo.companyName == "") {
        this.errorKey.push('companyName');
      }
      if (this.baseInfo.orgName == "") {
        this.errorKey.push('orgName');
      }
      if (this.staffName === "") {
        this.errorKey.push('staffName');
      }
      if (
        this.baseInfo.supplierName == "" ||
        this.baseInfo.supplierName == undefined
      ) {
        this.errorKey.push('supplierName');
      }
      if (this.baseInfo.fiCostsCode == "") {
        this.errorKey.push('fiCostsCode');
      }
      if (
        this.baseInfo.currencyCode == "" ||
        this.baseInfo.currencyCode == undefined
      ) {
        this.errorKey.push('currencyCode');
      }
      if (
        this.baseInfo.currencyRate === "" ||
        this.baseInfo.currencyRate == null
      ) {
        this.errorKey.push('currencyRate');
      }
      if (
        this.baseInfo.attachmentCount == "" ||
        this.baseInfo.attachmentCount == null
      ) {
        this.errorKey.push('attachmentCount');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning("请将必填项补充完整！");
        return false;
      }
      if (this.costList.length < 1) {
        this.$openWarning("请添加至少一条费用信息");
        return false;
      }
      var taxAccountName = "";
      var taxAccountCode = "";
      if (this.baseInfo.taxAccountName.nameL2) {
        let nameL2 = this.baseInfo.taxAccountName.nameL2;
        taxAccountCode = nameL2.substring(0, nameL2.indexOf(" "));
        taxAccountName = nameL2.substring(nameL2.indexOf(" "));
      }
      this.baseInfo.taxAccountName = taxAccountName;
      this.baseInfo.taxAccountCode = taxAccountCode;
      let isOK = true;
      let message = "";
      this.costList.forEach(item => {
        if (item.costName == "") {
          message = "费用名称不能为空";
          isOK = false;
          return false;
        }
        if (item.costAmtVat === "" || item.costAmtVat == null) {
          message = "费用信息中的费用金额不能为空";
          isOK = false;
          return false;
        }
        if (item.taxAmt === "" || item.taxAmt == null) {
          message = "业务币税额不能为空";
          isOK = false;
          return false;
        }
        if (item.shareList.length < 1) {
          message = "每条费用信息至少添加一条分摊信息";
          isOK = false;
          return false;
        }
        let subIsOK = true;
        item.shareList.forEach(subItem => {
          if (subItem.settledAmt === "" || subItem.settledAmt == null) {
            message = "分摊信息中的结算金额不能为空";
            isOK = false;
            subIsOK = false;
            return false;
          }
        });
        if (!subIsOK) {
          return false;
        }
        if (item.settleAmtShared != item.costAmtVat) {
          message = "费用金额未完全分摊，无法保存";
          isOK = false;
          return false;
        }
      });
      if (!isOK) {
        this.$openWarning(message);
        return false;
      }
      this.$confirm("是否确定保存？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      }).then(() => {
        let params = this.baseInfo;
        params.bizPersonName = this.staffName.empName;
        params.bizPersonCode = this.staffName.empCode;
        params.list = this.costList;
        if (this.$route.query.id && !this.$route.query.isCopy) {
          CostApi.costSettleUpdate(params)
            .then(res => {
              if (res.code == "success") {
                this.$openSuccess(res.message);
                this.$router.push({ name: "costSettle" });
              } else {
                this.$openWarning(res.message);
              }
            })
            .catch();
        } else {
          CostApi.costSettleInsert(params)
            .then(res => {
              if (res.code == "success") {
                this.$openSuccess(res.message);
                this.$router.push({ name: "costSettle" });
              } else {
                this.$openWarning(res.message);
              }
            })
            .catch();
        }
      });
    },
    //取消
    goBack() {
      if (
        this.$route.query.id &&
        !this.$route.query.isCopy &&
        this.costList.length > 0
      ) {
        //修改后存在至少一条费用信息
        let isOK = true;
        let message = "";
        this.costList.forEach(item => {
          if (item.settleAmtShared != item.costAmtVat) {
            message = "费用金额未完全分摊，请重新保存";
            isOK = false;
            return false;
          }
        });
        if (!isOK) {
          this.$openWarning(message);
          return false;
        }
      }
      this.$router.push({ name: "costSettle" });
    },
    //供应商弹窗
    supplierPopup() {
      this.supplierShow = true;
    },
    //供应商弹窗关闭
    supplierCancel() {
      this.supplierShow = false;
    },
    //供应商弹窗确定并传值
    supplierSure(e) {
      this.supplierShow = false;
      this.baseInfo.supplierId = e.supplierId;
      this.baseInfo.supplierCode = e.supplierCode;
      this.baseInfo.supplierName = e.supplierName;
    },
    //货币弹窗
    coinPopup() {
      this.coinShow = true;
    },
    //货币弹窗关闭
    coinCancel() {
      this.coinShow = false;
    },
    //货币弹窗确定并传值
    coinSure(e) {
      this.coinShow = false;
      this.baseInfo.currencyCode = e.currencyCode;
      this.getCurrencyRate(this.baseInfo.currencyCode); //获取本位币汇率
    },
    //获取本位币汇率
    getCurrencyRate(currencyCode) {
      CostApi.rateQuery({
        formCurrencyCode: currencyCode,
        toCurrencyCode: this.baseCurrencyCode
      })
        .then(res => {
          if (res.code == "success") {
            this.baseInfo.currencyRate = res.data.parities;
          } else {
            this.$openWarning(res.message);
          }
          this.changeRate();
        })
        .catch();
    },
    //费用名称弹窗
    costPopup() {
      this.costShow = true;
    },
    //费用名称弹窗回调
    costCallback(res) {
      if (res) {
        this.costList[this.costIndex].costName = res.costsName;
        this.costList[this.costIndex].costCategoryCode = res.costCategoryCode;
        if (this.costList[this.costIndex].shareDim != res.shareDim) {
          this.costList[this.costIndex].shareDim = res.shareDim + "";
          this.costList.forEach(item => {
            this.amortizeDic.forEach(item1 => {
              if (item.shareDim == item1.dict_code)
                item.shareDimStr = item1.dict_value;
            });
          });
          this.costList[this.costIndex].stockInOutCode = JSON.parse(
            JSON.stringify(this.baseSelect.stockInOutCode)
          );
          this.costList[this.costIndex].contractCode = JSON.parse(
            JSON.stringify(this.baseSelect.contractCode)
          );
          this.costList[this.costIndex].projectCode = JSON.parse(
            JSON.stringify(this.baseSelect.projectCode)
          );
          this.costSettleShareList(this.costList[this.costIndex], 0);
        }
      }
      this.costShow = false;
    },
    //增加费用信息行
    addCost() {
      if (this.baseInfo.isPrefetch) {
        //预提结算
        this.prefetchShow = true;
      } else {
        //无预提结算
        this.costList.forEach(item => {
          item.canEdit = false;
        });
        let newCost = {
          costName: "",
          shareDim: "",
          costAmtVat: "",
          prefetchAmt: "0",
          costAmt: "",
          taxAmt: "",
          remark: "",
          stockInOutCode: [],
          contractCode: [],
          projectCode: [],
          shareList: [], //分摊信息
          canEdit: true
        };
        this.costList.unshift(newCost);
        this.costIndex = 0;
      }
    },
    //预提结算弹窗回调
    prefetchCallback(res) {
      if (res) {
        this.getCostDetail(res.costDetailId, 1);
      }
      this.prefetchShow = false;
    },
    //删除费用信息行
    deleteCost() {
      if (this.costIndex == null) {
        this.$openWarning("请选择要删除的数据");
        return false;
      }
      this.$confirm("是否确定删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let row = this.costList[this.costIndex];
        if (row.version || row.version == 0) {
          CostApi.costDeleteAnother(row)
            .then(res => {
              if (res.code == "success") {
                this.$openSuccess(res.message);
                this.costList.splice(this.costIndex, 1);
                this.costIndex = null;
                if (this.baseInfo.isPrefetch) {
                  //预提结算
                  this.costDetailId.splice(this.costIndex, 1);
                }
                this.baseInfo.costsAmtVat = null;
                this.baseInfo.taxAmt = null;
                this.costList.forEach(item => {
                  if (item.costAmtVat != "") {
                    this.baseInfo.costsAmtVat += parseFloat(item.costAmtVat);
                  }
                  if (item.taxAmt != "") {
                    this.baseInfo.taxAmt += parseFloat(item.taxAmt);
                  }
                });
              } else {
                this.$openWarning(res.message);
              }
            })
            .catch();
        } else {
          this.costList.splice(this.costIndex, 1);
          this.costIndex = null;
          if (this.baseInfo.isPrefetch) {
            //预提结算
            this.costDetailId.splice(this.costIndex, 1);
          }
          this.baseInfo.costsAmtVat = null;
          this.baseInfo.taxAmt = null;
          this.costList.forEach(item => {
            if (item.costAmtVat != "") {
              this.baseInfo.costsAmtVat += parseFloat(item.costAmtVat);
            }
            if (item.taxAmt != "") {
              this.baseInfo.taxAmt += parseFloat(item.taxAmt);
            }
          });
        }
      });
    },
    //费用信息列表单选
    setCostIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },
    costSelectRow(e) {
      this.costIndex = e.index;
    },
    //费用信息列表双击编辑行
    costDblclick(e) {
      this.costList.forEach(item => {
        item.canEdit = e == item ? true : false;
      });
      this.$set(this.costList, this.costList.indexOf(e), e);
    },
    //监听费用信息行中费用金额的变化
    updateSettleAmt(row, costIndex) {
      if (row.taxAmt) {
        this.costList[costIndex].costAmt = (
          row.costAmtVat - row.taxAmt
        ).toFixed(2);
      }
      //计算本位币金额
      row.taxAmtBase = this.$bbzzse(row.taxAmt, this.baseInfo.currencyRate); //税额
      row.costAmtVatBase = this.$bbhsje(
        row.costAmtVat,
        this.baseInfo.currencyRate
      ); //含税
      row.costAmtBase = this.$tybbnhsje(row.costAmtVatBase, row.taxAmtBase); //不含税
      this.baseInfo.costsAmtVat = null;
      this.costList.forEach(item => {
        if (item.costAmtVat != "") {
          this.baseInfo.costsAmtVat += parseFloat(item.costAmtVat);
        }
      });
      this.costList[costIndex].costAmtVat = this.$filterPriceNum(
        row.costAmtVat,
        2
      );
      this.$set(this.costList, costIndex, row);
    },
    //改变汇率
    changeRate() {
      this.baseInfo.prefetchAmt = 0;
      this.baseInfo.taxAmt = 0;
      this.costList.forEach((item, index) => {
        if (item.prefetchAmt != "") {
          this.baseInfo.prefetchAmt += parseFloat(item.prefetchAmt);
        }
        if (item.taxAmt != "") {
          this.baseInfo.taxAmt += parseFloat(item.taxAmt);
        }
        //计算本位币金额
        item.taxAmtBase = this.$bbzzse(item.taxAmt, this.baseInfo.currencyRate); //税额
        item.costAmtVatBase = this.$bbhsje(
          item.costAmtVat,
          this.baseInfo.currencyRate
        ); //含税
        item.costAmtBase = this.$tybbnhsje(
          item.costAmtVatBase,
          item.taxAmtBase
        ); //不含税
        this.baseInfo.currencyRate = this.$filterPriceNum(
          this.baseInfo.currencyRate,
          8
        );
        this.$set(this.costList, index, item);
      });
    },
    //监听费用信息行中税额的变化
    updateTaxAmt(row, type, index) {
      if (type > 0) {
        //修改了税额

        if (row.costAmtVat) {
          this.costList[index].costAmt = (row.costAmtVat - row.taxAmt).toFixed(
            2
          );
        }
        if (!row.taxAmt) {
          this.costList[index].costAmt = "";
        }
        this.costList[index].taxAmt = this.$filterPriceNum(row.taxAmt, 2);
      } else {
        //修改了费用金额（不含税）

        if (row.costAmtVat) {
          this.costList[index].taxAmt = (row.costAmtVat - row.costAmt).toFixed(
            2
          );
        }
        if (!row.costAmt) {
          this.costList[index].taxAmt = "";
        }
        this.costList[index].costAmt = this.$filterPriceNum(row.costAmt, 2);
      }
      //计算本位币金额
      row.taxAmtBase = this.$bbzzse(row.taxAmt, this.baseInfo.currencyRate); //税额
      row.costAmtVatBase = this.$bbhsje(
        row.costAmtVat,
        this.baseInfo.currencyRate
      ); //含税
      row.costAmtBase = this.$tybbnhsje(row.costAmtVatBase, row.taxAmtBase); //不含税
      this.baseInfo.taxAmt = null;
      this.costList.forEach(item => {
        if (item.taxAmt != "") {
          this.baseInfo.taxAmt += parseFloat(item.taxAmt);
        }
      });
      this.$set(this.costList, index, row);
    },
    //费用信息行中金额相关的数据变化
    changeAmt(row) {
      if (!row.costAmtVat && row.costAmt > 0 && row.taxAmt) {
        this.costList[this.costIndex].costAmtVat = (
          parseFloat(row.costAmt) + parseFloat(row.taxAmt)
        ).toFixed(2);
        this.baseInfo.costsAmtVat = null;
        this.costList.forEach(item => {
          if (item.costAmtVat != "") {
            this.baseInfo.costsAmtVat += parseFloat(item.costAmtVat);
          }
        });
      }
      if (!row.taxAmt && row.costAmtVat && row.costAmt > 0) {
        this.costList[this.costIndex].taxAmt = (
          row.costAmtVat - row.costAmt
        ).toFixed(2);
        this.baseInfo.taxAmt = null;
        this.costList.forEach(item => {
          if (item.taxAmt != "") {
            this.baseInfo.taxAmt += parseFloat(item.taxAmt);
          }
        });
      }
      //计算本位币金额
      row.taxAmtBase = this.$bbzzse(row.taxAmt, this.baseInfo.currencyRate); //税额
      row.costAmtVatBase = this.$bbhsje(
        row.costAmtVat,
        this.baseInfo.currencyRate
      ); //含税
      row.costAmtBase = this.$tybbnhsje(row.costAmtVatBase, row.taxAmtBase); //不含税
    },
    //切换到分摊信息
    jumpToShare(curr, old) {
      if (curr == "share") {
        if (this.costIndex == null) {
          this.$openWarning("请选择要查看的费用信息");
          return false;
        }
        let row = this.costList[this.costIndex];
        if (row.costName == "") {
          this.$openWarning("请选择费用名称");
          return false;
        }
        if (row.shareDim == "") {
          this.$openWarning("该条费用信息的摊销维度为空");
          return false;
        }
        if (this.baseInfo.currencyCode == "") {
          this.$openWarning("请选择业务币币种");
          return false;
        }
        if (
          this.baseInfo.currencyRate === "" ||
          this.baseInfo.currencyRate == null
        ) {
          this.$openWarning("请填写本位币汇率");
          return false;
        }
        if (row.costAmtVat === "" || row.costAmtVat == null) {
          this.$openWarning("请填写费用金额");
          return false;
        }
        if (row.taxAmt === "" || row.taxAmt == null) {
          this.$openWarning("请填写业务币税额");
          return false;
        }
        this.canAutoShare = row.shareDim == "10640015" ? true : false; //摊销维度为项目时置灰自动分摊按钮
      }
    },
    //根据摊销维度获取分摊信息
    costSettleShareList(row, type) {
      let params = {
        shareDim: row.shareDim,
        nos: row.stockInOutCode.join(","),
        contractNos: row.contractCode.join(","),
        projectNos: row.projectCode.join(",")
      };
      if (type == 1) {
        params.nos = row.newStockInOutCode.join(",");
        params.contractNos = row.newContractCode.join(",");
        params.projectNos = row.newProjectCode.join(",");
      }
      if (this.costLinkType == 1) {
        //采购环节
        CostApi.costPrefetchPurchaseList(params)
          .then(res => {
            res.data.forEach(item => {
              item.settledAmt = null; //若无该字段，自动分摊按钮失效$set
            });
            if (type == 0) {
              //创建新的分摊信息
              this.costList[this.costIndex].shareList = res.data;
            } else if (type == 1) {
              //增加分摊信息行
              this.costList[this.costIndex].shareList.push(...res.data);
            }
            if (row.shareDim == "10640010") {
              //合同
              this.costList[this.costIndex].contractCode = [];
              this.costList[this.costIndex].shareList.forEach(item => {
                this.costList[this.costIndex].contractCode.push(
                  item.dim2ContractCode
                );
              });
            } else if (row.shareDim == "10640015") {
              //项目
              this.costList[this.costIndex].projectCode = [];
              this.costList[this.costIndex].shareList.forEach(item => {
                this.costList[this.costIndex].projectCode.push(
                  item.dim1ProjectCode
                );
              });
            }
          })
          .catch();
      } else if (this.costLinkType == 2) {
        //销售环节
        CostApi.costPrefetchSalesList(params)
          .then(res => {
            res.data.forEach(item => {
              item.settledAmt = null; //若无该字段，自动分摊按钮失效$set
            });
            if (type == 0) {
              //创建新的分摊信息
              this.costList[this.costIndex].shareList = res.data;
            } else if (type == 1) {
              //增加分摊信息行
              this.costList[this.costIndex].shareList.push(...res.data);
            }
            if (row.shareDim == "10640010") {
              //合同
              this.costList[this.costIndex].contractCode = [];
              this.costList[this.costIndex].shareList.forEach(item => {
                this.costList[this.costIndex].contractCode.push(
                  item.dim2ContractCode
                );
              });
            } else if (row.shareDim == "10640015") {
              //项目
              this.costList[this.costIndex].projectCode = [];
              this.costList[this.costIndex].shareList.forEach(item => {
                this.costList[this.costIndex].projectCode.push(
                  item.dim1ProjectCode
                );
              });
            }
          })
          .catch();
      }
    },
    //增加分摊信息行
    addShare() {
      if (this.costLinkType == 1) {
        //采购环节
        this.purchaseShow = true;
      } else if (this.costLinkType == 2) {
        //销售环节
        this.salesShow = true;
      }
    },
    //采购环节弹窗回调
    purchaseCallback(res) {
      if (res) {
        this.costList[this.costIndex].stockInOutCode.push(
          ...res.stockInOutCode
        );
        this.costList[this.costIndex].newStockInOutCode = res.stockInOutCode;
        this.costList[this.costIndex].newContractCode = res.contractCode;
        this.costList[this.costIndex].newProjectCode = res.projectCode;
        this.costSettleShareList(this.costList[this.costIndex], 1);
      }
      this.purchaseShow = false;
    },
    //销售环节弹窗回调
    salesCallback(res) {
      if (res) {
        this.costList[this.costIndex].stockInOutCode.push(
          ...res.stockInOutCode
        );
        this.costList[this.costIndex].newStockInOutCode = res.stockInOutCode;
        this.costList[this.costIndex].newContractCode = res.contractCode;
        this.costList[this.costIndex].newProjectCode = res.projectCode;
        this.costSettleShareList(this.costList[this.costIndex], 1);
      }
      this.salesShow = false;
    },
    //删除分摊信息行
    deleteShare() {
      if (this.shareIndex == null) {
        this.$openWarning("请选择要删除的数据");
        return false;
      }
      this.$confirm("是否确定删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let row = this.costList[this.costIndex].shareList[this.shareIndex];
        if (row.version || row.version == 0) {
          CostApi.shareDeleteAnother(row)
            .then(res => {
              if (res.code == "success") {
                this.$openSuccess(res.message);
                this.costList[this.costIndex].shareList.splice(
                  this.shareIndex,
                  1
                );
                if (this.costList[this.costIndex].shareDim == "10640005") {
                  //批次
                  let isAllDelete = true;
                  this.costList[this.costIndex].shareList.forEach(item => {
                    if (this.costLinkType == 1) {
                      //采购环节
                      if (item.dim3WvNo == row.dim3WvNo) {
                        isAllDelete = false;
                        return false;
                      }
                    } else if (this.costLinkType == 2) {
                      //销售环节
                      if (item.dim3DoNo == row.dim3DoNo) {
                        isAllDelete = false;
                        return false;
                      }
                    }
                  });
                  if (isAllDelete) {
                    this.costList[this.costIndex].stockInOutCode.splice(
                      this.shareIndex,
                      1
                    );
                  }
                } else if (
                  this.costList[this.costIndex].shareDim == "10640010"
                ) {
                  //合同
                  this.costList[this.costIndex].contractCode.splice(
                    this.shareIndex,
                    1
                  );
                } else if (
                  this.costList[this.costIndex].shareDim == "10640015"
                ) {
                  //项目
                  this.costList[this.costIndex].projectCode.splice(
                    this.shareIndex,
                    1
                  );
                }
              } else {
                this.$openWarning(res.message);
              }
            })
            .catch();
        } else {
          this.costList[this.costIndex].shareList.splice(this.shareIndex, 1);
          if (this.costList[this.costIndex].shareDim == "10640005") {
            //批次
            let isAllDelete = true;
            this.costList[this.costIndex].shareList.forEach(item => {
              if (this.costLinkType == 1) {
                //采购环节
                if (item.dim3WvNo == row.dim3WvNo) {
                  isAllDelete = false;
                  return false;
                }
              } else if (this.costLinkType == 2) {
                //销售环节
                if (item.dim3DoNo == row.dim3DoNo) {
                  isAllDelete = false;
                  return false;
                }
              }
            });
            if (isAllDelete) {
              this.costList[this.costIndex].stockInOutCode.splice(
                this.shareIndex,
                1
              );
            }
          } else if (this.costList[this.costIndex].shareDim == "10640010") {
            //合同
            this.costList[this.costIndex].contractCode.splice(
              this.shareIndex,
              1
            );
          } else if (this.costList[this.costIndex].shareDim == "10640015") {
            //项目
            this.costList[this.costIndex].projectCode.splice(
              this.shareIndex,
              1
            );
          }
        }
      });
    },
    //自动分摊
    autoShare() {
      let totalMoney = 0;
      this.costList[this.costIndex].shareList.forEach(item => {
        if (item.dimAmt == null) {
          item.dimAmt = 0;
        } else {
          totalMoney += item.dimAmt;
        }
      });
      let sumMoney = 0;
      this.costList[this.costIndex].shareList.forEach((item, key) => {
        if (key < this.costList[this.costIndex].shareList.length - 1) {
          if (totalMoney > 0) {
            item.settledAmt =
              Math.round(
                (item.dimAmt / totalMoney) *
                  this.costList[this.costIndex].costAmtVat *
                  100
              ) / 100;
          } else {
            item.settledAmt =
              Math.round(
                (this.costList[this.costIndex].costAmtVat /
                  this.costList[this.costIndex].shareList.length) *
                  100
              ) / 100;
          }
          sumMoney += item.settledAmt;
        } else {
          item.settledAmt =
            Math.round(
              (this.costList[this.costIndex].costAmtVat - sumMoney) * 100
            ) / 100;
        }
      });
    },
    //累积分摊信息中的结算金额
    getTotalSettleAmt(array) {
      const { columns, data } = array;
      const sumNums = [];
      columns.forEach((column, key) => {
        if (key === 0) {
          sumNums[key] = "合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (column.property == "settledAmt") {
          sumNums[key] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sumNums[key] = Math.round(sumNums[key] * 100) / 100;
          this.costList[this.costIndex].settleAmtShared = sumNums[key];
        } else {
          sumNums[key] = "";
        }
      });
      return sumNums;
    },
    //分摊信息列表单选
    shareChange(e) {
      if (e.length === 0) {
        this.shareIndex = null;
      }
    },
    shareSelect(selection, row) {
      this.$refs.multipleShare.clearSelection();
      if (selection.length === 0) {
        return;
      }
      if (row) {
        this.$refs.multipleShare.toggleRowSelection(row, true);
        this.shareIndex = this.costList[this.costIndex].shareList.indexOf(row);
      }
    },
    shareSelectRow(e) {
      this.$refs.multipleShare.clearSelection();
      this.$refs.multipleShare.toggleRowSelection(e, true);
      this.shareIndex = this.costList[this.costIndex].shareList.indexOf(e);
    },
    //进项税科目
    accountTips() {
      this.subjectShow = true;
    },
    subjectSure(e) {
      if (e) {
        this.baseInfo.taxAccountName = e;
      }
      this.subjectShow = false;
    },
    subjectCancle() {
      this.subjectShow = false;
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
  },
  components: {
    supplierSelect,
    coinSelect,
    costSelect,
    prefetchSettle,
    purchaseLink,
    salesLink,
    subjectFrame,
    staffSelect
  }
};
</script>
<style lang="scss">
#costSettleEdit {
  .input-div {
    padding: 10px 0 10px 0;
    .el-col .comicon2 {
      right: 0px;
      top: 14px;
    }
  }
  .el-tabs .el-tabs__nav {
    border: 1px solid #e4e7ed;
    border-bottom: none;
  }
  .el-row {
    margin-left: 10px;
  }
  .el-col {
    position: relative;
    margin: 0;
    padding: 10px 0 0px 10px;
    .moreIcon {
      width: 70%;
      height: 24px;
      position: absolute;
      top: 10px;
      right: 0;
      padding: 4px 5px;
      cursor: default;
    }
  }
  .is-disabled {
    .el-input__inner {
      color: #666;
      cursor: default;
    }
    .el-input__icon {
      cursor: default;
    }
  }
  label {
    display: inline-block;
    width: 30%;
    vertical-align: middle;
  }
  .el-inputs,
  .el-selects {
    width: 70%;
    .el-input__inner {
      width: 100%;
    }
  }
  .el-col-20 {
    width: 96%;
  }
  .el-full {
    label {
      width: 7.25%;
    }
    .el-inputs {
      width: 92.75% !important;
      .el-input__inner {
        width: 100%;
      }
    }
  }
  .text_too_long {
    position: absolute;
    width: 35%;
    line-height: 24px;
    margin-left: -35%;
  }
  .text_too_long_add {
    position: absolute;
    width: 40%;
    line-height: 24px;
    margin-left: -40%;
  }
  .edit-info {
    .el-table__header th {
      background-color: #78aef9;
    }
    .moreIcon {
      width: 100%;
      height: 24px;
      text-align: right;
      padding: 0 20px;
      position: absolute;
      top: 10px;
      left: 0;
      cursor: pointer;
      z-index: 1;
    }
    .el-input__inner {
      height: 24px;
      margin: 8px 0;
    }
    .el-table__footer {
      height: 30px;
      td {
        font-weight: bold;
      }
    }
  }
  .noContent label::after {
    content: none !important;
  }
}
</style>
