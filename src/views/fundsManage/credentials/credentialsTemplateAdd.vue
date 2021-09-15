<template>
  <div class="invoiceDetails">
    <el-divider></el-divider>
    <div class="button-div">
      <el-button class="query-button"
                 icon="el-icon-suitcase"
                 v-if="!isDisabled"
                 @click="subFun">保存</el-button>
      <el-button @click="goBack"
                 icon="el-icon-close">取消</el-button>
    </div>
    <div class="index-div3">
      <el-col :span="5"
              class="el-col">
        <label>模板编号</label>
        <el-input v-model="formData.templateCode"
                  class="el-inputs"
                  size="small"
                  placeholder="自动生成"
                  disabled></el-input>
      </el-col>
      <el-col :span="5"
              class="el-col el-col-required">
        <label class="isrequired"><span class="must-full">*</span>模板名称</label>
        <el-input v-model="formData.templateName"
                  class="el-inputs"
                  :class="errorKey.includes('templateName') ? 'inputRed' : ''"
                  size="small"
                  :disabled="isDisabled"
                  placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="5"
              class="el-col el-col-required">
        <label><span class="must-full">*</span>公司</label>
        <el-input v-model="companyData.companyName"
        :class="errorKey.includes('companyName') ? 'inputRed' : ''"
                  class="el-inputs"
                  placeholder="请选择"
                  disabled></el-input>
        <span class="comicon"
              @click="componyTip"><i class="el-icon-search"></i></span>
      </el-col>
      <el-col :span="5"
              class="el-colc">
        <label>模板状态</label>
        <el-select v-model="formData.templateStatus"
                   :disabled="isDisabled"
                   placeholder="请选择"
                   size="small">
          <el-option v-for="item in templateStatusList"
                     :key="item.dict_key"
                     :label="item.dict_value"
                     :value="item.dict_key">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5"
              class="el-colc el-col-required">
        <label><span class="must-full">*</span>业务类型</label>
        <el-select v-model="formData.bizType"
        :class="errorKey.includes('bizType') ? 'inputRed' : ''"
                   filterable
                   :disabled="isDisabled"
                   clearable
                   placeholder="请选择"
                   size="small">
          <el-option v-for="item in bizTypeList"
                     :key="item.dict_key"
                     :label="item.dict_value"
                     :value="item.dict_key">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5"
              class="el-colc">
        <label>借方合并</label>
        <el-select v-model="formData.switcherDebtsideMerge"
                   :disabled="isDisabled"
                   placeholder="请选择"
                   size="small">
          <el-option v-for="item in binaryList"
                     :key="item.dict_key"
                     :label="item.dict_value"
                     :value="item.dict_key">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5"
              class="el-colc">
        <label>贷方合并</label>
        <el-select v-model="formData.switcherCreditsideMerge"
                   :disabled="isDisabled"
                   placeholder="请选择"
                   size="small">
          <el-option v-for="item in binaryList"
                     :key="item.dict_key"
                     :label="item.dict_value"
                     :value="item.dict_key">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5"
              class="el-colc">
        <label>发票类型</label>
        <el-select v-model="formData.invoiceType"
                   :disabled="isDisabled"
                   placeholder="请选择"
                   size="small">
          <el-option v-for="item in invoiceTypeList"
                     :key="item.dict_key"
                     :label="item.dict_value"
                     :value="item.dict_key">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5"
              class="el-colc el-col-required">
        <label><span class="must-full">*</span>业务类别</label>
        <el-select v-model="formData.bizBirthplace"
        :class="errorKey.includes('bizBirthplace') ? 'inputRed' : ''"
                   :disabled="isDisabled"
                   placeholder="请选择"
                   size="small">
          <el-option v-for="item in bizBirthplaceList"
                     :key="item.dict_key"
                     :label="item.dict_value"
                     :value="item.dict_key">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5"
              class="el-colc">
        <label>收款类别</label>
        <el-select v-model="formData.fiPayeeCategory"
                   filterable
                   :disabled="isDisabled"
                   clearable
                   placeholder="请选择"
                   size="small">
          <el-option v-for="item in fiPayeeCategoryList"
                     :key="item.dict_key"
                     :label="item.dict_value"
                     :value="item.dict_key">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5"
              class="el-colc">
        <label>关联客户</label>
        <el-select v-model="formData.switcherCust"
                   placeholder="请选择"
                   :disabled="isDisabled"
                   size="small">
          <el-option v-for="item in binaryList"
                     :key="item.dict_key"
                     :label="item.dict_value"
                     :value="item.dict_key">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5"
              class="el-colc">
        <label>收款方式</label>
        <el-select v-model="formData.fiPayeeType"
                   clearable
                   :disabled="isDisabled"
                   filterable
                   placeholder="请选择"
                   size="small">
          <el-option v-for="item in fiPayeeTypeList"
                     :key="item.dict_key"
                     :label="item.dict_value"
                     :value="item.dict_key">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5"
              class="el-colc">
        <label>票据状态</label>
        <el-select v-model="formData.fiBillStatus"
                   placeholder="请选择"
                   :disabled="isDisabled"
                   size="small">
          <el-option v-for="item in fiBillStatusList"
                     :key="item.dict_key"
                     :label="item.dict_value"
                     :value="item.dict_key">
          </el-option>
        </el-select>
      </el-col>
      <!-- <el-col :span="5"
              class="el-colc">
        <label>币别</label>
        <el-input v-model="currencyData.currencyName"
                  class="el-inputs"
                  placeholder="请选择"
                  disabled></el-input>
        <span class="comicon"
              v-if="isCurrencyClearable"
              @click="coinTip"><i class="el-icon-search"></i></span>
        <span class="comicon"
              v-else
              @click="clearCurrencyName"><i class="el-icon-circle-close"></i></span>
      </el-col> -->
      <el-col :span="5"
              class="el-colc">
        <label>关联供应商</label>
        <el-select v-model="formData.switcherSupplier"
                   :disabled="isDisabled"
                   placeholder="请选择"
                   size="small">
          <el-option v-for="item in binaryList"
                     :key="item.dict_key"
                     :label="item.dict_value"
                     :value="item.dict_key">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5"
              class="el-colc">
        <label>付款票据</label>
        <el-select v-model="formData.fiPayType"
                   filterable
                   clearable
                   :disabled="isDisabled"
                   placeholder="请选择"
                   size="small">
          <el-option v-for="item in fiPayTypeList"
                     :key="item.dict_key"
                     :label="item.dict_value"
                     :value="item.dict_key">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5"
              class="el-colc">
        <label>调拨类型</label>
        <el-select v-model="formData.diaoboleixing"
                   :disabled="isDisabled"
                   placeholder="请选择"
                   size="small">
          <el-option v-for="item in diaoboleixingList"
                     :key="item.dict_key"
                     :label="item.dict_value"
                     :value="item.dict_key">
          </el-option>
        </el-select>
      </el-col>
      <div class="remark-style">
        <label>备注 </label>
        <el-input type="textarea"
                  autosize
                  :disabled="isDisabled"
                  v-model="formData.remark"
                  size="small"
                  class="el-textarea"
                  placeholder="请输入内容"
                  resize="none"></el-input>
        <div class="empty-class"></div>
      </div>
    </div>
    <div class="button-div">
      <el-button class="addBut"
                 :disabled="isDisabled"
                 @click="addRow"
                 icon="el-icon-plus">新增行</el-button>
      <el-button class="addBut"
                 :disabled="isDisabled"
                 @click="deleRow"
                 icon="el-icon-minus">删除行</el-button>
    </div>
    <div class="el-table-div">
      <el-table border
                center
                show-summary
                :data="tableData"
                class="el-table"
                max-height="650"
                tooltip-effect="dark"
                style="width: 100%"
                ref="table"
                @select="handleTableDataSelect"
                @select-all="handleTableDataSelectAll"
                @row-click="handleTableDataclick"
                @row-dblclick="handleTableDataDblclick"
                v-loading="loading"
                :summary-method="getSummaries">
        <el-table-column type="selection"
                         width="55"
                         align="center"
                         show-overflow-tooltip></el-table-column>
        <el-table-column label="科目代码"
                         prop="accountCode"
                         width="200"
                         align="center"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input v-model="scope.row.accountCode"
                        placeholder="请选择"
                        style="width:80%"
                        disabled>
                <i style="cursor:pointer;line-height:27px"
                   @click="handleAccountCodeClick"
                   slot="suffix"
                   class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
            <div v-else
                 class="fixedHeight">
              <el-popover placement="top-start"
                          width="200"
                          trigger="hover"
                          :content="scope.row.accountCode">
                <span slot="reference"> {{ scope.row.accountCode }}</span>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="accountName"
                         label="科目名称"
                         width="200"
                         show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="recordDirection"
                         label="借贷方向"
                         width="90"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select v-model="scope.row.recordDirection"
                         placeholder="请选择"
                         size="small">
                <el-option v-for="item in recordDirectionList"
                           :key="item.dict_key"
                           :label="item.dict_value"
                           :value="item.dict_key">
                </el-option>
              </el-select>
            </div>
            <div v-else
                 class="fixedHeight">
              <span v-for="item in recordDirectionList"
                    :key="item.dict_key"
                    v-show="item.dict_key==scope.row.recordDirection">
                {{item.dict_value}}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="plusMinus"
                         label="金额正负"
                         width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select v-model="scope.row.plusMinus"
                         placeholder="请选择"
                         size="small">
                <el-option v-for="item in plusMinusList"
                           :key="item.dict_key"
                           :label="item.dict_value"
                           :value="item.dict_key">
                </el-option>
              </el-select>
            </div>
            <div v-else
                 class="fixedHeight">
              <span v-for="item in plusMinusList"
                    :key="item.dict_key"
                    v-show="item.dict_key==scope.row.plusMinus">
                {{item.dict_value}}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="recordAmt"
                         label="借贷金额"
                         width="150"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select v-model="scope.row.recordAmt"
                         placeholder="请选择"
                         clearable
                         filterable
                         size="small">
                <el-option v-for="item in amtList"
                           :key="item.dict_key"
                           :label="item.dict_value"
                           :value="item.dict_key">
                </el-option>
              </el-select>
            </div>
            <div v-else
                 class="fixedHeight">
              <span v-for="item in amtList"
                    :key="item.dict_key"
                    v-show="item.dict_key==scope.row.recordAmt">
                {{item.dict_value}}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="orginAmt"
                         label="原币金额"
                         width="150"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select v-model="scope.row.orginAmt"
                         placeholder="请选择"
                         clearable
                         filterable
                         size="small">
                <el-option v-for="item in amtList"
                           :key="item.dict_key"
                           :label="item.dict_value"
                           :value="item.dict_key">
                </el-option>
              </el-select>
            </div>
            <div v-else
                 class="fixedHeight">
              <span v-for="item in amtList"
                    :key="item.dict_key"
                    v-show="item.dict_key==scope.row.orginAmt">
                {{item.dict_value}}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="contractType"
                         label="合同类型"
                         width="200"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select v-model="scope.row.contractType"
                         placeholder="请选择"
                         size="small">
                <el-option v-for="item in contractTypeList"
                           :key="item.dict_key"
                           :label="item.dict_value"
                           :value="item.dict_key">
                </el-option>
              </el-select>
            </div>
            <div v-else
                 class="fixedHeight">
              <span v-for="item in contractTypeList"
                    :key="item.dict_key"
                    v-show="item.dict_key==scope.row.contractType">
                {{item.dict_value}}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="fiCrashContent"
                         label="款项内容"
                         width="400"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select v-model="scope.row.fiCrashContent"
                         clearable
                         filterable
                         placeholder="请选择"
                         size="small">
                <el-option v-for="item in fiCrashContentList"
                           :key="item.dict_key"
                           :label="item.dict_value"
                           :value="item.dict_key">
                </el-option>
              </el-select>
            </div>
            <div v-else
                 class="fixedHeight">
              <span v-for="item in fiCrashContentList"
                    :key="item.dict_key"
                    v-show="item.dict_key==scope.row.fiCrashContent">
                {{item.dict_value}}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="switcherCustOrSupplier"
                         label="是否关联供应商/客户"
                         width="160"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select v-model="scope.row.switcherCustOrSupplier"
                         clearable
                         filterable
                         placeholder="请选择"
                         size="small">
                <el-option v-for="item in switcherCustOrSupplierList"
                           :key="item.dict_key"
                           :label="item.dict_value"
                           :value="item.dict_key">
                </el-option>
              </el-select>
            </div>
            <div v-else
                 class="fixedHeight">
              <span v-for="item in switcherCustOrSupplierList"
                    :key="item.dict_key"
                    v-show="item.dict_key==scope.row.switcherCustOrSupplier">
                {{item.dict_value}}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="summary"
                         label="摘要"
                         width="400"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select v-model="scope.row.summary"
                         clearable
                         filterable
                         placeholder="请选择"
                         size="small">
                <el-option v-for="item in summaryList"
                           :key="item.dict_key"
                           :label="item.dict_value"
                           :value="item.dict_key">
                </el-option>
              </el-select>
            </div>
            <div v-else
                 class="fixedHeight">
              <span v-for="item in summaryList"
                    :key="item.dict_key"
                    v-show="item.dict_key==scope.row.summary">
                {{item.dict_value}}
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 选择公司弹窗 -->
    <compony-select v-if="componyShow"
                    :tipShow="componyShow"
                    @tipsCancle="tipsCancle"
                    @tipsSure="tipsSure">
    </compony-select>
    <!-- 选择币种弹窗 -->
    <coin-select v-if="coinShow"
                 :tipShow="coinShow"
                 @coinCancle="coinCancle"
                 @coinSure="coinSure"></coin-select>
    <!--税金科目弹窗-->
    <subject-frame v-if="subjectShow"
                   :tipShow='subjectShow'
                   @subjectCancle="subjectCancle"
                   @subjectSure="subjectSure"></subject-frame>
  </div>
</template>
<script>
import componySelect from "@/components/componySelect.vue"; //公司弹窗
import coinSelect from "@/components/coinSelect.vue"; //业务币种
import subjectFrame from "@//components/subjectFrame.vue";//科目组件
import { getDicList, insertWarrantTemplateInfo, updateWarrantTemplateInfo, queryWarrantTemplateData } from "@/api/credentials/credentials"

export default {
  name: "credentialsTemplateAdd",
  data () {
    return {
      loading: false,
      activeName2: "first", //标签页
      companyData: {},//公司弹窗数据
      componyShow: false,
      currencyData: {},//币别弹窗数据
      coinShow: false,
      formData: {
        templateCode: '',//模板编号-自动生成
        templateName: '',//模板名称
        templateStatus: '',//模板状态
        bizType: '',//业务类型
        contractType: '',//合同类型
        switcherDebtsideMerge: '',//是否 借方金额合并
        switcherCreditsideMerge: '',//是否 贷方金额合并
        invoiceType: '',//发票类型
        bizBirthplace: '',//业务类别
        fiPayeeCategory: '',//收款类别
        switcherCust: '',//是否 关联客户
        fiPayeeType: '',//收款方式
        fiBillStatus: '',//票据状态
        switcherSupplier: '',//是否 关联供应商
        fiPayType: '',//付款票据
        diaoboleixing: '',//调拨类型
      },
      templateStatusList: [{
        dict_key: 0,
        dict_value: '启用'
      },
      {
        dict_key: 1,
        dict_value: '禁用'
      }],//模板状态列表
      binaryList: [{
        dict_key: 1,
        dict_value: '是',
      },
      {
        dict_key: 0,
        dict_value: '否',
      }],//是否列表
      plusMinusList: [{
        dict_key: 1,
        dict_value: '1',
      }, {
        dict_key: -1,
        dict_value: '-1',
      }],//金额正负
      bizTypeList: [],//业务类型列表
      recordDirectionList: [],//借贷方向列表
      amtList: [],//借贷方向列表
      summaryList: [],//借贷方向列表
      contractTypeList: [],//合同类型列表
      invoiceTypeList: [],//发票类型列表
      bizBirthplaceList: [],//业务类别列表
      fiCrashContentList: [],//款项内容列表
      fiPayeeCategoryList: [],//收款类别列表
      fiPayeeTypeList: [],//收款方式列表
      fiBillStatusList: [],//票据状态列表
      fiPayTypeList: [],//付款方式列表
      diaoboleixingList: [],//调拨类型列表
      tableData: [],//模板明细
      selectedList: [],//选中明细数据
      selectedIndex: '',//选中索引
      tempTableData: [],//删除暂存
      isCurrencyClearable: true,//币别可清空
      subjectShow: false,//税金科目
      accountData: {},//税金科目
      isDisabled: false,//是否允许修改
      switcherCustOrSupplierList:[{
        dict_key: 0,
        dict_value: '非关联'
      },
      {
        dict_key: 1,
        dict_value: '关联'
      }],
      errorKey:[]
    };
  },
  mounted () {
    this.getBasicInfo()
    const url = window.location.href;
    if (url.indexOf("templateId=") != -1) {
      const templateId = url.split("templateId=")[1];
      this.getEditData(templateId)
      if (url.indexOf('isDisabled=') != -1) {
        this.isDisabled = true
      }
    }
  },
  methods: {
    getBasicInfo () {
      //发票类型
      getDicList({ dictNo: 1106 }).then(res => {
        this.invoiceTypeList = res.data;
      });
      //业务类别
      getDicList({ dictNo: 1118 }).then((res) => {
        this.bizBirthplaceList = res.data
      }).catch((err) => { });
      //业务类型
      getDicList({ dictNo: 1104 }).then((res) => {
        this.bizTypeList = res.data
      }).catch((err) => { });
      //业务类型
      getDicList({ dictNo: 1014 }).then((res) => {
        this.contractTypeList = res.data
      }).catch((err) => { });
      //款项内容
      getDicList({ dictNo: 1107 }).then((res) => {
        this.fiCrashContentList = res.data
      }).catch((err) => { });
      //收款方式
      getDicList({ dictNo: 1109 }).then((res) => {
        this.fiPayeeTypeList = res.data
      }).catch((err) => { });
      //票据状态    
      getDicList({ dictNo: 1111 }).then((res) => {
        this.fiBillStatusList = res.data
      }).catch((err) => { });
      //付款票据
      getDicList({ dictNo: 1110 }).then((res) => {
        this.fiPayTypeList = res.data
      }).catch((err) => { });
      //借贷方向
      getDicList({ dictNo: 1116 }).then((res) => {
        this.recordDirectionList = res.data
      }).catch((err) => { });
      //金额
      getDicList({ dictNo: 1114 }).then((res) => {
        this.amtList = res.data
      }).catch((err) => { });
      //摘要    summary
      getDicList({ dictNo: 1115 }).then((res) => {
        this.summaryList = res.data
      }).catch((err) => { });
      //调拨类型
      //   getDicList({ dictNo: 1112 }).then((res) => {
      // this.fiPayTypeList = res.data
      //   }).catch((err) => { });
      //收款类别
      getDicList({ dictNo: 1108 }).then((res) => {
        this.fiPayeeCategoryList = res.data
      }).catch((err) => { });
    },
    getEditData (templateId) {
      queryWarrantTemplateData({ templateId }).then((res) => {
        this.companyData.companyName = res.data.odWarrantTemplate.companyName
        this.currencyData.currencyName = res.data.odWarrantTemplate.fiCurrencyCode
        if (res.data.odWarrantTemplate.fiCurrencyCode) {
          this.isCurrencyClearable = false
        }
        this.formData = res.data.odWarrantTemplate
        this.tableData = res.data.odWarrantTemplateDetailList
      }).catch((err) => { });
    },
    subFun () {
      this.errorKey=[];
      if (this.formData.templateName == '') {
         this.errorKey.push('templateName');
      }
      if (!Object.keys(this.companyData).length) {
        this.errorKey.push('companyName');
      }
      if (this.formData.bizType == '') {
        this.errorKey.push('bizType');
        //this.$openWarning('请选择业务类型')
      } 
      if (this.formData.bizBirthplace == '') {
        this.errorKey.push('bizBirthplace');
        //this.$openWarning('请选择业务类别')
      } 
      if(this.errorKey.length > 0) {
        this.$openWarning(`必填信息请填完整`);
      }else {
        let odWarrantTemplateForm = {
          odWarrantTemplate: {
            ...this.formData,
            companyCode: this.companyData.companyCode,
            companyName: this.companyData.companyName,
            companyId: this.companyData.companyId,
            fiCurrencyCode: this.currencyData.currencyCode,
          },
          //   fiCurrencyName:this.currencyData.currencyName,
          odWarrantTemplateDetails: this.tableData.concat(this.tempTableData)
        }
        const url = window.location.href;
        if (url.indexOf("templateId=") != -1) {
          updateWarrantTemplateInfo(odWarrantTemplateForm).then((res) => {
            this.$openSuccess("保存成功");
            this.$router.push({
              name: 'credentialsTemplate'
            });
          }).catch((err) => { });
        } else {
          insertWarrantTemplateInfo(odWarrantTemplateForm).then((res) => {
            this.$openSuccess("保存成功");
            this.$router.push({
              name: 'credentialsTemplate'
            });
          }).catch((err) => { });
        }
      }
    },
    goBack () {
      this.$router.push({
        name: 'credentialsTemplate'
      })
    },
    addRow () {
      this.tableData.map(item => {
        item.edit = false
      })
      let row = {
        accountCode: '',
        accountName: '',
        // recordDirection: '',
        plusMinus: '',
        recordAmt: '',
        orginAmt: '',
        summary: '',
        edit: true
      }
      this.tableData.push(row)
      this.selectedIndex = this.tableData.length - 1
    },
    deleRow () {
      this.$confirm("是否确定删除选中数据?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.selectedList.map((item, index) => {
          this.tableData.splice(this.tableData.indexOf(item), 1)
          item.isInactive = 1
        })
        this.tempTableData = this.selectedList
        this.$openSuccess('删除成功，保存后生效')
      }).catch(() => { });
    },
    handleTableDataSelect (selection, row) {
      this.selectedList = selection
      if (selection.length == 1) {
        this.selectedIndex = this.tableData.indexOf(row)
      }
    },
    handleTableDataSelectAll (selection) {
      this.selectedList = selection
    },
    handleTableDataclick (row, column, event) {
      this.$refs.table.toggleRowSelection(row, true);
      this.selectedList.push(row)
    },
    handleTableDataDblclick (row, column, event) {
      this.tableData.map(item => {
        item.edit = false
      })
      this.$refs.table.clearSelection();
      this.$refs.table.toggleRowSelection(row, true);
      if (!this.isDisabled) {
        this.selectedList = [row]
        this.selectedIndex = this.tableData.indexOf(row)
        this.tableData[this.selectedIndex].edit = true
      }
    },
    //税金科目打开
    handleAccountCodeClick () {
      this.subjectShow = true;
    },
    //税金科目确认
    subjectSure (e) {
      if (e) {
        this.accountData = e
        this.tableData[this.selectedIndex].accountName = this.accountData.nameL1
        this.tableData[this.selectedIndex].accountCode = this.accountData.number
        // this.accountData.accountName = this.accountData.nameL1
        // this.accountData.accountCode = this.accountData.number
      }
      this.subjectShow = false;
    },
    //税金科目取消
    subjectCancle () {
      this.subjectShow = false;
    },
    //公司弹窗确定获取数据
    tipsSure (e) {
      this.componyShow = false;
      this.companyData = e;
    },
    //公司弹窗打开
    componyTip () {
      if (!this.isDisabled) {
        this.componyShow = true;
      }
    },
    //公司弹窗关闭
    tipsCancle () {
      this.componyShow = false;
    },
    //币别清空
    clearCurrencyName () {
      this.currencyData = {}
      this.isCurrencyClearable = true
    },
    //币种弹窗打开
    coinTip () {
      this.coinShow = true;
    },
    //币种弹窗关闭
    coinCancle () {
      this.coinShow = false;
    },
    //币种弹窗确定获取数据
    coinSure (e) {
      this.coinShow = false;
      this.currencyData = e;
      this.isCurrencyClearable = false
    },
    getSummaries (param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        } else if (
          index === 11 ||
          index === 12 ||
          index === 17 ||
          index === 18 ||
          index === 20 ||
          index === 22 ||
          index === 23 ||
          index === 24
        ) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                let res = (prev * 100000 + curr * 100000) / 100000;
                if (
                  index === 17 ||
                  index === 18 ||
                  index === 20 ||
                  index === 22 ||
                  index === 23 ||
                  index === 24
                ) {
                  if (index === 17 || index === 11 || index === 12) {
                    this.totalSum = res;
                  }
                  return res.toFixed(2);
                }
                return this.$sumTolFormat(res);
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = "";
          }
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
  },
  created () {
  },
  computed: {
  },
  watch: {},
  components: {
    componySelect,
    coinSelect,
    subjectFrame
  }
};
</script>
<style lang="scss">
// .index .index-div3  .el-col-required .el-input.is-disabled .el-input__inner{
//       background-color: #d9e8fd !important;
// }
.index .index-div3 .el-col .inputRed .el-input__inner, .index .index-div3 .input-div .inputRed .el-input__inner{
  border-color: #ee2e37a8 !important;
}
.index .index-div3 .el-col .inputRed .el-input .el-input__inner{
border-color: #ee2e37a8 !important;
}
</style>
<style lang="scss" scoped>

.remark-style {
  display: flex;
  padding-top: 10px;
  justify-content: space-around;
  width: 100%;
  label {
    width: 6.89%;
    text-align: right;
    line-height: 31px;
    padding-right: 9px;
  }
  .empty-class {
    width: 3.8%;
  }
}
.fixedHeight {
  height: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
