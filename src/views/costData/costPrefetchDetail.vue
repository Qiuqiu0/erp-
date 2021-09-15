<template>
  <div id="costPrefetchDetail">
    <!--操作按钮-->
    <div class="button-div">
      <el-button icon="el-icon-back" @click="goBack">返回</el-button>
    </div>
    <el-tabs class="el-tabs" type="card" v-model="currTab">
      <el-tab-pane label="预提信息" name="prefetch">
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
              <label>预提单号</label>
              <el-input v-model="baseInfo.prefetchCode" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>业务币币种</label>
              <el-input v-model="baseInfo.currencyCode" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>本位币汇率</label>
              <el-input v-model="baseInfo.baseCurrencyRate" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>预提金额</label>
              <el-input v-model="baseInfo.prefetchAmt" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>税额</label>
              <el-input v-model="baseInfo.taxAmt" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>费用环节</label>
              <el-select v-model="baseInfo.bizOccurrence" class="el-selects" disabled>
                <el-option v-for="(item, index) in costLinkDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>单据状态</label>
              <el-select v-model="baseInfo.prefetchStatus" class="el-selects" disabled>
                <el-option v-for="(item, index) in prefetchStatusDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>过账日期</label>
              <el-date-picker v-model="baseInfo.postDate" type="date" class="el-selects" placeholder="过账日期" disabled></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>附件数量</label>
              <el-input v-model="baseInfo.attachmentCount" class="el-inputs" disabled></el-input>
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
              <el-table-column prop="settledAmt" label="已结算金额" min-width="150" show-overflow-tooltip></el-table-column>
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
              :summary-method="getTotalPrefetchAmt"
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
              <el-table-column prop="prefetchAmt" label="预提金额" min-width="150" show-overflow-tooltip :key="13"></el-table-column>
            </el-table>
            <!--摊销维度：合同-->
            <el-table
              class="el-table edit-info"
              border
              center
              show-summary
              max-height="330"
              :summary-method="getTotalPrefetchAmt"
              :data="costIndex == null ? [] : costList[costIndex].shareList"
              v-if="costIndex == null ? false : costList[costIndex].shareDim == '10640010'">
              <el-table-column type="index" label="序号" width="60" ></el-table-column>
              <el-table-column prop="dim2ContractCode" label="合同号" min-width="150" show-overflow-tooltip :key="14"></el-table-column>
              <el-table-column prop="dim2ExtContractCode" label="外部合同号" min-width="150" show-overflow-tooltip :key="15"></el-table-column>
              <el-table-column prop="dimAmt" label="合同金额" min-width="150" show-overflow-tooltip :key="16"></el-table-column>
              <el-table-column prop="prefetchAmt" label="预提金额" min-width="150" show-overflow-tooltip :key="17"></el-table-column>
            </el-table>
            <!--摊销维度：项目-->
            <el-table
              class="el-table edit-info"
              border
              center
              show-summary
              :summary-method="getTotalPrefetchAmt"
              max-height="330"
              :data="costIndex == null ? [] : costList[costIndex].shareList"
              v-if="costIndex == null ? false : costList[costIndex].shareDim == '10640015'">
              <el-table-column type="index" label="序号" width="60" ></el-table-column>
              <el-table-column prop="dim1ProjectCode" label="项目号" min-width="100" show-overflow-tooltip :key="18"></el-table-column>
              <el-table-column prop="dim1PorjectName" label="项目名称" min-width="180" show-overflow-tooltip :key="19"></el-table-column>
              <el-table-column prop="prefetchAmt" label="预提金额" min-width="150" show-overflow-tooltip :key="20"></el-table-column>
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
  </div>
</template>
<script>
import { mapState } from "vuex";
import { amortizeObj } from "@/api/dictionary";
import CostApi from "@/api/costData/cost";
export default {
  name: "costPrefetchDetail",
  data() {
    return {
      currTab: "prefetch",
      currSubTab: "cost",
      costLinkType: null, //费用环节：采购环节1，销售环节2
      baseInfo: {
        //预提信息
        companyCode: "",
        companyName: "",
        orgCode: "",
        orgName: "",
        supplierCode: "",
        supplierName: "",
        bizPersonName: "",
        prefetchCode: "",
        currencyCode: "",
        baseCurrencyRate: "",
        prefetchAmt: null,
        taxAmt: null,
        bizOccurrence: "",
        prefetchStatus: "",
        postDate: "",
        //系统信息
        createdName: "",
        createdTime: "",
        updatedName: "",
        updatedTime: ""
      },
      costLinkDic: [], //费用环节字典
      prefetchStatusDic: [], //单据状态字典
      //费用信息
      costList: [],
      costIndex: null, //费用信息列表选中下标
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
    //费用环节字典
    this.costLinkData();
    //单据状态字典
    this.prefetchStatusData();
    if (this.$route.query.type == "10600005") {
      //采购环节
      this.costLinkType = 1;
    } else if (this.$route.query.type == "10600010") {
      //销售环节
      this.costLinkType = 2;
    }
    //获取费用预提详情
    this.costPrefetchDetail();
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
    //获取费用预提详情
    costPrefetchDetail() {
      //费用预提主数据
      CostApi.costPrefetchGet({
        prefetchId: this.$route.query.id
      })
        .then(res => {
          Object.assign(this.baseInfo, res.data);
          this.baseInfo.bizOccurrence = this.baseInfo.bizOccurrence + "";
          this.baseInfo.prefetchStatus = this.baseInfo.prefetchStatus + "";
          this.warrantCode = res.data.warrantCode; //凭证号
          this.warrantMonth = res.data.warrantMonth; //期间
          this.writeoffWarrantCode = res.data.writeoffWarrantCode; //冲销凭证号
          this.writeoffWarrantMonth = res.data.writeoffWarrantMonth; //冲销期间
        })
        .catch();
      //费用预提费用信息和分摊信息
      CostApi.costPrefetchCostGet({
        prefetchId: this.$route.query.id
      })
        .then(res => {
          this.costList = res.data;
          this.costList.forEach(item => {
            amortizeObj.forEach(item1 => {
              if (item.shareDim == item1.dict_code)
                item.shareDimStr = item1.dict_value;
            });
            //计算本位币金额
            // item.taxAmtBase= this.$bbzzse(item.taxAmt,this.baseInfo.baseCurrencyRate)//税额
            // item.costAmtVatBase= this.$bbhsje(item.costAmtVat, this.baseInfo.baseCurrencyRate); //含税
            // item.costAmtBase= this.$tybbnhsje(item.costAmtVatBase,item.taxAmtBase);//不含税
          });
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
    //单据状态字典
    prefetchStatusData() {
      CostApi.dicQuery({
        dictNo: 1065
      })
        .then(res => {
          this.prefetchStatusDic = res.data;
        })
        .catch();
    },
    //返回
    goBack() {
      this.$router.push({ name: "costPrefetch" });
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
    //累积分摊信息中的预提金额
    getTotalPrefetchAmt(array) {
      const { columns, data } = array;
      const sumNums = [];
      columns.forEach((column, key) => {
        if (key === 0) {
          sumNums[key] = "合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (column.property == "prefetchAmt") {
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
#costPrefetchDetail {
  .el-tabs .el-tabs__nav {
    border: 1px solid #e4e7ed;
    border-bottom: none;
  }
  .el-row {
    margin-left: 10px;
    .el-col {
      margin: 0;
      padding: 8px 0 0 10px;
    }
  }
  .input-div {
    padding-bottom: 10px;
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
}
</style>
