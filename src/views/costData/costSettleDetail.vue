<template>
  <div id="costSettleDetail">
    <!--操作按钮-->
    <div class="button-div">
      <el-button icon="el-icon-back" @click="goBack">返回</el-button>
       <el-button  @click="checkData" v-if="$actionFlag(`F007`) && baseInfo.costsStatus==10650010" icon="el-icon-receiving">审核</el-button>
    </div>
    <el-tabs class="el-tabs" type="card" v-model="currTab">
      <el-tab-pane label="结算信息" name="settle">
        <div class="input-div">
            <el-col :span="5" class="el-col">
              <label>公司</label>
              <el-input v-model="baseInfo.companyName" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>部门</label>
              <el-input v-model="baseInfo.orgName" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>业务员</label>
              <el-input v-model="baseInfo.bizPersonName" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>供应商</label>
              <el-input v-model="baseInfo.supplierName" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>费用编号</label>
              <el-input v-model="baseInfo.erpCostsCode" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label class="text_too_long">外部费用编号</label>
              <el-input v-model="baseInfo.fiCostsCode" class="el-inputs" disabled></el-input>
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
            <el-col :span="5" class="el-col">
              <label>业务币币种</label>
              <el-input v-model="baseInfo.currencyCode" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>本位币汇率</label>
              <el-input v-model="baseInfo.currencyRate" class="el-inputs" disabled></el-input>
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
              <el-date-picker v-model="baseInfo.postDate" type="date" class="el-selects" placeholder="过账日期" disabled></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
                <label>附件数量</label>
                <el-input  class="el-inputs" v-model="baseInfo.attachmentCount" size="small" disabled></el-input>     
            </el-col>
            <el-col :span="5" class="el-col">
                <label>进项税科目</label>
                <el-input v-model="baseInfo.taxAccountName" class="el-inputs" size="small" disabled></el-input>
            </el-col>
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
            <el-col :span="20" class="el-col el-full">
              <label>备注</label>
              <el-input v-model="baseInfo.remark" class="el-inputs" disabled></el-input>
            </el-col>
        </div>
        <el-tabs class="el-tabs" type="card" v-model="currSubTab" :before-leave="jumpToShare">
          <el-tab-pane label="费用信息" name="cost">
            <el-table
              class="el-table edit-info noContent"
              border
              center
              :data="costList"
              :row-class-name="setCostIndex"
              max-height="330"
              @row-click="costSelectRow">
              <el-table-column width="70" >
                <template scope="scope">
                  <el-radio :label="scope.$index" v-model="costIndex">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column type="index" label="序号" width="60" ></el-table-column>
              <el-table-column prop="costName" label="费用名称" min-width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="shareDimStr" label="摊销维度" min-width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="costAmtVat" label="费用金额" min-width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="prefetchAmt" label="预提金额" min-width="150" show-overflow-tooltip></el-table-column>
              <el-table-column label="业务币">
                <el-table-column prop="costAmt" label="费用金额（不含税）" min-width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="taxAmt" label="税额" min-width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="costAmtVat" label="费用金额（含税）" min-width="150" show-overflow-tooltip></el-table-column>
              </el-table-column>
              <el-table-column label="本位币">
                <el-table-column prop="costAmtBase" label="费用金额（不含税）" min-width="150" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="taxAmtBase" label="税额" min-width="150" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="costAmtVatBase" label="费用金额（含税）" min-width="150" show-overflow-tooltip>
                </el-table-column>
              </el-table-column>
              <el-table-column prop="remark" label="备注" min-width="200" show-overflow-tooltip></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="分摊信息" name="share">
            <!--摊销维度：批次-->
            <el-table
              class="el-table edit-info"
              border
              center
              show-summary
              :summary-method="getTotalSettleAmt"
              max-height="330"
              :data="costIndex == null ? [] : costList[costIndex].shareList"
              v-if="costIndex == null ? false : costList[costIndex].shareDim == '10640005'">
              <el-table-column type="index" label="序号" width="60" ></el-table-column>
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
              <el-table-column prop="settledAmt" label="结算金额" min-width="150" show-overflow-tooltip :key="14"></el-table-column>
            </el-table>
            <!--摊销维度：合同-->
            <el-table
              class="el-table edit-info"
              border
              center
              show-summary
              :summary-method="getTotalSettleAmt"
              max-height="330"
              :data="costIndex == null ? [] : costList[costIndex].shareList"
              v-if="costIndex == null ? false : costList[costIndex].shareDim == '10640010'">
              <el-table-column type="index" label="序号" width="60" ></el-table-column>
              <el-table-column prop="dim2ContractCode" label="合同号" min-width="150" show-overflow-tooltip :key="15"></el-table-column>
              <el-table-column prop="dim2ExtContractCode" label="外部合同号" min-width="150" show-overflow-tooltip :key="16"></el-table-column>
              <el-table-column prop="dimAmt" label="合同金额" min-width="150" show-overflow-tooltip :key="17"></el-table-column>
              <el-table-column prop="prefetchAmt" label="预提金额" min-width="150" show-overflow-tooltip v-if="baseInfo.isPrefetch" :key="18"></el-table-column>
              <el-table-column prop="settledAmt" label="结算金额" min-width="150" show-overflow-tooltip :key="19"></el-table-column>
            </el-table>
            <!--摊销维度：项目-->
            <el-table
              class="el-table edit-info"
              border
              center
              show-summary
              :summary-method="getTotalSettleAmt"
              max-height="330"
              :data="costIndex == null ? [] : costList[costIndex].shareList"
              v-if="costIndex == null ? false : costList[costIndex].shareDim == '10640015'">
              <el-table-column type="index" label="序号" width="60" ></el-table-column>
              <el-table-column prop="dim1ProjectCode" label="项目号" min-width="100" show-overflow-tooltip :key="20"></el-table-column>
              <el-table-column prop="dim1PorjectName" label="项目名称" min-width="180" show-overflow-tooltip :key="21"></el-table-column>
              <el-table-column prop="prefetchAmt" label="预提金额" min-width="150" show-overflow-tooltip v-if="baseInfo.isPrefetch" :key="22"></el-table-column>
              <el-table-column prop="settledAmt" label="结算金额" min-width="150" show-overflow-tooltip :key="23"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
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
    <!--审核弹窗-->
    <el-dialog title="审核" :visible.sync="checkDialog" :show-close="false" :before-close="checkCancel" width="350px">
      <div class="examine-dialog">
        <el-col :span="24" class="el-col">
          <label><span class="must-full">*</span>审核</label>
          <el-select v-model="checkResult" class="el-selects" placeholder="请选择">
            <el-option v-for="(item, index) in checkResultDic" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="24" class="el-col" v-if="checkResult == 1">
          <label><span class="must-full">*</span>过账日期</label>
          <el-date-picker v-model="postTime" type="date" class="el-selects" placeholder="过账日期" :picker-options="postLimitTime"></el-date-picker>
        </el-col>
        <el-col :span="24" class="el-col" v-if="checkResult == 1">
            <label><span class="must-full">*</span>进项税科目</label>
            <el-input v-model="taxAccountName.nameL2" class="el-inputs" size="small" disabled></el-input>
            <span class='comicon2' @click="accountTips"><i class="el-icon-search" ></i></span>
        </el-col>
      </div>
      <div class="button-div2">
        <el-button icon="el-icon-check"  @click="checkSure">确定</el-button>
        <el-button icon="el-icon-close"  @click="checkCancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { amortizeObj } from "@/api/dictionary";
import CostApi from "@/api/costData/cost";
import subjectFrame from "@//components/subjectFrame.vue"; //科目组件
export default {
  name: "costSettleDetail",
  data() {
    return {
      currTab: "settle",
      currSubTab: "cost",
      costLinkType: null, //费用环节：采购环节1，销售环节2
      baseInfo: {
        isPrefetch: "", //预提结算1，无预提结算0
        //结算信息
        companyCode: "",
        companyName: "",
        orgCode: "",
        orgName: "",
        bizPersonName: "",
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
        taxAccountName: "", //进项税科目
        attachmentCount: "" //附件数量
      },
      settleStatusDic: [], //状态字典
      billCategoryDic: [], //款项类别字典
      costLinkDic: [], //费用环节字典
      //费用信息
      costList: [],
      costIndex: null, //费用信息列表选中下标
      //审核
      checkResultDic: [
        { value: "1", label: "通过" },
        { value: "0", label: "驳回" }
      ],
      checkResult: "",
      postTime: "", //进账时间
      postLimitTime: {},
      checkDialog: false, //是否显示审核弹窗
      subjectShow: false, //进项税科目弹窗
      taxAccountName: {}, //进项税科目
      reverseReason: "", //拒绝原因
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      warrantCode: "", //凭证号
      warrantMonth: "", //期间
      writeoffWarrantCode: "", //冲销凭证号
      writeoffWarrantMonth: "" //冲销期间
    };
  },
  created() {
    //状态字典
    this.settleStatusData();
    //款项类别字典
    this.billCategoryData();
    //费用环节字典
    this.costLinkData();
    if (this.$route.query.type == "10600005") {
      //采购环节
      this.costLinkType = 1;
    } else if (this.$route.query.type == "10600010") {
      //销售环节
      this.costLinkType = 2;
    }
    //获取费用结算详情
    this.costSettleDetail();
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
    //获取费用结算详情
    costSettleDetail() {
      //费用结算主数据
      CostApi.costSettleGet({
        settleId: this.$route.query.id
      })
        .then(res => {
          Object.assign(this.baseInfo, res.data);
          this.baseInfo.costsStatus = this.baseInfo.costsStatus + "";
          this.baseInfo.billCategory = this.baseInfo.billCategory + "";
          this.baseInfo.bizOccurrence = this.baseInfo.bizOccurrence + "";
          this.warrantCode = res.data.warrantCode; //凭证号
          this.warrantMonth = res.data.warrantMonth; //期间
          this.writeoffWarrantCode = res.data.writeoffWarrantCode; //冲销凭证号
          this.writeoffWarrantMonth = res.data.writeoffWarrantMonth; //冲销期间
          if (res.data.taxAccountCode && res.data.taxAccountName) {
            this.baseInfo.taxAccountName =
              this.baseInfo.taxAccountCode + " " + this.baseInfo.taxAccountName; //科目名称
          } else {
            this.baseInfo.taxAccountName = "";
          }
        })
        .catch();
      //费用结算费用信息和分摊信息
      CostApi.costSettleCostGet({
        settleId: this.$route.query.id
      })
        .then(res => {
          this.costList = res.data;
          this.costList.forEach((item, index) => {
            amortizeObj.forEach(item1 => {
              if (item.shareDim == item1.dict_code)
                item.shareDimStr = item1.dict_value;
            });
            //计算本位币金额
            // item.taxAmtBase= this.$bbzzse(item.taxAmt,this.baseInfo.currencyRate)//税额
            // item.costAmtVatBase= this.$bbhsje(item.costAmtVat, this.baseInfo.currencyRate); //含税
            // item.costAmtBase= this.$tybbnhsje(item.costAmtVatBase,item.taxAmtBase);//不含税
            this.$set(this.costList, index, item);
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
        })
        .catch();
    },
    //返回
    goBack() {
      this.$router.push({ name: "costSettle" });
    },
    //费用信息列表单选
    setCostIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },
    costSelectRow(e) {
      this.costIndex = e.index;
    },
    //切换到分摊信息
    jumpToShare(curr, old) {
      if (curr == "share") {
        if (this.costIndex == null) {
          this.$openWarning("请选择要查看的费用信息");
          return false;
        }
      }
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
        } else {
          sumNums[key] = "";
        }
      });
      return sumNums;
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
    },
    //审核
    checkData() {
      let row = this.baseInfo;
      this.checkDialog = true;
      this.postTime = row.postDate;
      if (row.taxAccountName && row.taxAccountCode) {
        this.taxAccountName.nameL2 = row.taxAccountName;
        this.taxAccountName.taxAccountCode = row.taxAccountCode;
      }
      CostApi.limitTimeQuery({
        companyId: row.companyId
      })
        .then(res => {
          if (res.code == "success") {
            this.postLimitTime = {
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
    //取消审核
    checkCancel() {
      this.checkDialog = false;
      this.checkResult = "";
      this.postTime = "";
      this.taxAccountName = {};
    },
    //确定审核
    checkSure() {
      if (this.checkResult === "") {
        this.$openWarning("请选择是否通过审核");
        return false;
      }
      if (
        this.checkResult == "1" &&
        (this.postTime == "" || this.postTime == null)
      ) {
        this.$openWarning("请选择过账日期");
        return false;
      }
      if (
        this.checkResult == "1" &&
        (this.taxAccountName == "" ||
          JSON.stringify(this.taxAccountName) == "{}")
      ) {
        this.$openWarning("请选择进项税科目");
        return false;
      }
      let params = [];
      params.push({
        costId: this.baseInfo.costId,
        costStatus: this.baseInfo.costsStatus,
        version: this.baseInfo.version
      });
      let nameL2 = this.taxAccountName.nameL2;
      let taxAccountCode = nameL2.substring(0, nameL2.indexOf(" "));
      let taxAccountName = nameL2.substring(nameL2.indexOf(" "));
      CostApi.costSettleCheck({
        list: params,
        postDate: this.postTime,
        type: this.checkResult,
        taxAccountCode: taxAccountCode,
        taxAccountName: taxAccountName
      })
        .then(res => {
          this.$openSuccess(res.message);
          this.goBack();
        })
        .catch();
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
    subjectFrame
  }
};
</script>
<style lang="scss">
#costSettleDetail {
  .input-div {
    padding: 10px 0 10px 0;
  }
  .el-tabs .el-tabs__nav {
    border: 1px solid #e4e7ed;
    border-bottom: none;
  }
  .el-row {
    margin-left: 10px;
    .el-col {
      margin: 0;
      padding: 10px 0 0px 0px;
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
  .edit-info {
    .el-table__header th {
      background-color: #78aef9;
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
  .index .dialog-search-div {
    height: 42px;
  }
}
.index .examine-dialog .el-col {
  width: 93%;
  position: relative;
}
.examine-dialog .el-col .comicon {
  width: 70%;
  height: 20px;
  position: absolute;
  right: 13px;
  top: 2px;
  cursor: pointer;
  text-align: right;
  padding-right: 6px;
}
</style>
