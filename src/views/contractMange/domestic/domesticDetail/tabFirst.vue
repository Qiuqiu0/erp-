<template>
  <div class="tabFirst content-div2 contract_css_link">
    <!-- 搜索 -->
    <div class="input-div input-div-bor">
      <!-- <div class="table_title">基本信息</div> -->
      <div>
        <el-col :span="5" class="el-col">
          <label><span class="must-full">*</span>公司</label>
          <el-input
            v-model="companyName.companyName"
            class="el-inputs"
            placeholder=""
            disabled
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label><span class="must-full">*</span>部门</label>
          <el-input
            v-model="branchName.branchName"
            class="el-inputs"
            placeholder=""
            disabled
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label><span class="must-full">*</span>业务员</label>
          <el-input
            v-model="staffName.empName"
            class="el-inputs"
            placeholder=""
            disabled
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label><span class="must-full">*</span>销售合同号</label>
          <el-input
            v-model="soContractNo"
            class="el-inputs"
            disabled
            placeholder=""
          >
          </el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label><span class="must-full">*</span>销售客户</label>
          <el-input
            v-model="custName.customerName"
            class="el-inputs"
            placeholder=""
            disabled
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label><span class="must-full">*</span>外部合同号</label>
          <el-input
            v-model="extCode"
            class="el-inputs"
            placeholder=""
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>项目号</label>
          <el-input
            v-model="projectName.projectCode"
            class="el-inputs"
            placeholder=""
            disabled
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>项目名称</label>
          <el-input
            v-model="projectName.projectName"
            class="el-inputs"
            disabled
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label><span class="must-full">*</span>签订日期</label>
          <el-date-picker v-model="signTime" type="date" placeholder="">
          </el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>有效日期</label>
          <el-date-picker v-model="contractEndDate" type="date" placeholder="">
          </el-date-picker>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>是否赊销</label>
          <el-select v-model="isSellOnCredit" placeholder="">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in shexiao"
              :key="index"
            ></el-option>
            <!-- <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option> -->
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>签约地点</label>
          <el-input v-model="signPlace" class="el-inputs"></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label><span class="must-full">*</span>业务币种</label>
          <el-input
            v-model="currencyName"
            class="el-inputs"
            placeholder=""
            disabled
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label><span class="must-full">*</span>本位币汇率</label>
          <el-input
            v-model="currencyRate"
            class="el-inputs"
            placeholder=""
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>含税金额</label>
          <el-input
            v-model="contractAmtVat"
            class="el-inputs"
            disabled
            placeholder=""
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>统计数量</label>
          <el-input
            v-model="sumQty"
            class="el-inputs"
            disabled
            placeholder=""
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label><span class="must-full">*</span>购销方式</label>
          <el-select v-model="tradeType" placeholder="">
            <el-option
              v-for="item in gxfsList"
              :key="item.dict_code"
              :label="item.dict_value"
              :value="item.dict_code"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label><span class="must-full">*</span>合同类型</label>
          <el-select v-model="contractCat" placeholder="">
            <el-option
              v-for="item in contractType"
              :key="item.dict_code"
              :label="item.dict_value"
              :value="item.dict_code"
              disabled
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>合同状态</label>
          <el-select v-model="contractStatus" placeholder="" disabled>
            <el-option
              v-for="item in isInaType"
              :key="item.dict_code"
              :label="item.dict_value"
              :value="item.dict_code"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>框架协议号</label>
          <el-input
            v-model="fwContractNo"
            class="el-inputs"
            placeholder=""
            disabled
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label><span class="must-full">*</span>溢短比%</label>
          <el-input
            v-model="overShortageRate"
            class="el-inputs"
            placeholder=""
          ></el-input>
        </el-col>
        <el-col :span="24" class="el-col-textarea">
          <label style="width:7.16%">备注</label>
          <el-input
            type="textarea"
            autosize
            v-model="remark"
            size="small"
            class="el-textarea"
            placeholder=""
            style="width:88%"
            resize="none"
          >
          </el-input>
        </el-col>
      </div>
    </div>
    <!-- 商品信息 -->
    <div class="input-div input-div-bor bortop0">
      <!-- <div class="table_title">商品信息</div> -->
      <div class="">
        <div class="button-div">
          <el-button
            icon="el-icon-plus"
            class="query-button"
            @click="addList"
            v-if="!this.$route.query.children && isChildrenContract == 1"
            >创建</el-button
          >
          <el-button icon="el-icon-minus" @click="setUp(0)">删除</el-button>
          <!-- <el-button icon="el-icon-upload2" @click="setUp(0)" class="olbutton"
            >模板导入</el-button> -->
        </div>
      </div>
      <div class="">
        <el-table
          border
          center
          show-summary
          :data="tableData"
          class="el-table"
          ref="multipleTable"
          @selection-change="handleChange"
          :summary-method="getSummariesWl"
          max-height="288"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            label="行号"
            prop="soRowno"
            v-if="isChildrenContract == 1"
          ></el-table-column>
          <el-table-column
            label="行号"
            prop="parentSoRowno"
            v-else
          ></el-table-column>
          <el-table-column
            prop="goodsCode"
            label="物料号"
            show-overflow-tooltip
            width="150"
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
            prop="originPrice"
            label="业务币含税单价"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="unOriginPrice"
            label="业务币不含税单价"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="originAmt"
            label="业务币含税金额"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="unOriginAmt"
            label="业务币不含税金额"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="taxRate"
            label="增值税率%"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            width="150"
            show-overflow-tooltip
            prop="originTaxAmt"
            label="业务币增值税额"
          >
          </el-table-column>
          <el-table-column
            prop="baseTax"
            label="本币增值税额"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="basePrice"
            label="本币含税单价"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="unBasePrice"
            label="本币不含税单价"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="baseAmt"
            label="本币含税金额"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="unBaseAmt"
            label="本币不含税金额"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 选择公司弹窗 -->
    <compony-select
      v-if="componyShow"
      :tipShow="componyShow"
      @tipsCancle="tipsCancle"
      @tipsSure="tipsSure"
    ></compony-select>
    <!-- 选择部门弹窗 -->
    <department-select
      v-if="departmentShow"
      :tipShow="departmentShow"
      :data="companyName"
      @departmentCancle="departmentCancle"
      @departmentSure="departmentSure"
    ></department-select>
    <!-- 选择员工弹窗 -->
    <staff-select
      v-if="staffShow"
      :tipShow="staffShow"
      :data="branchName"
      @staffCancle="staffCancle"
      @staffSure="staffSure"
    ></staff-select>
    <!-- 选择项目弹窗 -->
    <project-select
      v-if="projectShow"
      :tipShow="projectShow"
      @projectCancle="projectCancle"
      @projectSure="projectSure"
    ></project-select>
    <!-- 选择客户弹窗 -->
    <customer-select
      v-if="customerShow"
      :tipShow="customerShow"
      @customerCancle="customerCancle"
      @customerSure="customerSure"
    ></customer-select>
    <!-- 选择物料弹窗 -->
    <matter-select
      v-if="matterShow"
      :tipShow="matterShow"
      @matterCancle="matterCancle"
      @matterSure="matterSure"
    ></matter-select>
    <!-- 选择币种弹窗 -->
    <coin-select
      v-if="coinShow"
      :tipShow="coinShow"
      @coinCancle="coinCancle"
      @coinSure="coinSure"
    ></coin-select>
    <!-- 选择框架弹窗 -->
    <agree-select
      v-if="agreeShow"
      :tipShow="agreeShow"
      @agreeCancle="agreeCancle"
      @agreeSure="agreeSure"
    ></agree-select>
  </div>
</template>

<script>
import { mapState } from "vuex";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import staffSelect from "@/components/staffSelect.vue";
import projectSelect from "@/components/projectSelect.vue";
import coinSelect from "@/components/coinSelect.vue";
import customerSelect from "@/components/customerSelect.vue";
import matterSelect from "@/components/matterSelect.vue";
import agreeSelect from "@/components/agreeSelect.vue";

import Count from "@/assets/js/calculation";
import Bmange from "@/api/contractMange/bmange";
import BAmange from "@/api/contractMange/bAmange";
import "@/assets/css/contract.scss";
export default {
  name: "tabFirst",
  data() {
    return {
      componyShow: false, //银行弹窗
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      projectShow: false, //项目弹窗
      coinShow: false, //币种弹窗
      manShow: false, //人员弹窗
      customerShow: false, //客户弹窗
      matterShow: false, //物料弹窗
      agreeShow: false, //框架协议弹窗
      matterName: {}, //物料
      companyName: {}, //公司
      branchName: {}, //部门
      staffName: {}, //员工
      projectName: {}, //项目
      custName: {}, //客户
      manName: {}, //人员
      currency: {}, //币种
      currencyName: ``,
      isInaType: [], //合同状态
      shexiao: [{ label: `是`, value: 1 }, { label: `否`, value: 0 }],
      contractType: [], //合同类型
      unitList: [], //单位列表
      gxfsList: [], //购销方式列表
      soContractNo: ``, //销售合同号
      extCode: ``, //外部合同号
      signPlace: ``, //签约地点
      signTime: ``, //签订日期
      contractEndDate: ``, //有效日期
      currencyRate: `1`, //本位币汇率
      tradeType: ``, //购销方式
      contractCat: `10150005`, //合同类型
      contractStatus: `10130005`, //合同状态
      fwContractNo: ``, //框架协议号
      contractAmtVat: ``, //含税金额
      sumQty: ``, //统计数量
      tolNum: ``, //已发货列表
      isSellOnCredit: ``, //是否赊账
      overShortageRate: ``, //溢短比.
      remark: ``, //备注
      createdTime: ``, //创建日期
      createdName: ``, //创建人
      tableData: [], //通讯表格
      tableDataChild: [], //表格拷贝
      tableCf: [], //表格拆分人民 未出库数量
      newTbale: [], //新建
      selectioned: [], //表格选中项
      soContractId: ``, //合同ID
      version: ``,
      tipFalse: true, //合同拆分数量判断 false<0 true>0
      loading: true, //表格loading
      isChildrenContract: 1, //手否位子合同 0子合同 1附合同
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
  created() {
    this.htlx();
    this.htzt();
    this.gxfs();
    this.getUnit();
    //获取信息
    if (this.$route.query.isChange) {
      this.getDetailHis();
    } else {
      this.getNum();
      this.getDetail();
    }
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
    if (this.$store.state.route.params.first) {
      let map = JSON.parse(
        JSON.stringify(this.$store.state.route.params.first)
      );
      this.tableData = map.map((item, index) => {
        // this.originPriceCh(item, index);
        this.originAmtCh(item, index);
        // this.taxRateCh(item, index);
        // this.taxAmtCh(item, index);
        return item;
      });
    }
  },
  methods: {
    //获取信息
    getDetail() {
      let params = {
        soContractId: this.$route.query.id,
        pageSize: 999
      };
      //基本信息
      Bmange.getXx(params)
        .then(res => {
          let red = res.data;
          // this.version = red.version;
          this.soContractId = red.soContractId; //合同ID
          this.companyName.companyId = red.companyId; //公司
          this.companyName.companyCode = red.companyCode; //公司
          this.companyName.companyName = red.companyName; //公司
          this.companyName.baseCurrencyCode = red.baseCurrencyCode; //本位币编码
          this.branchName.orgCode = red.orgId; //部门
          this.branchName.branchName = red.orgName; //部门
          this.branchName.branchCode = red.orgCode; //部门
          this.staffName.empName = red.bizPersonName; //业务员
          this.staffName.empCode = red.bizPersonCode; //业务员
          this.soContractNo = red.soContractNo; //销售合同号
          this.custName.customerId = red.custId; //客户id
          this.custName.customerName = red.custName; //客户名称
          this.custName.customerCode = red.custCode; //客户编码
          this.extCode = red.extCode; //外部合同号
          this.projectName.projectCode = red.projectCode; //项目好
          this.projectName.projectName = red.projectName; //项目名称
          this.signTime = red.signTime; //签订日期
          this.contractEndDate = red.contractEndDate; //有效日期s
          this.isSellOnCredit = red.isSellOnCredit; // && red.isSellOnCredit.toString(); //是否赊销
          this.signPlace = red.signPlace; //签约地点
          this.currency.currencyCode = red.originCurrencyCode; //业务币种
          this.currencyRate = red.currencyRate; //本位币汇率
          this.contractAmtVat = red.contractAmtVat; //含税金额
          this.sumQty = red.sumQty; //统计数量
          this.tradeType = red.tradeType && red.tradeType.toString(); //购销方式
          this.contractCat = red.contractCat && red.contractCat.toString(); //合同类型
          this.contractStatus =
            red.contractStatus && red.contractStatus.toString(); //合同状态
          this.fwContractNo = red.fwContractNo; //框架协议号
          this.overShortageRate = red.overShortageRate; //溢短比
          this.isChildrenContract = red.isChildrenContract; //手否位子合同 0子合同 1附合同
          this.remark = red.remark; //备注
          //合同拆分
          if (this.$route.query.children == 1) {
            this.extCode = ``;
            this.custName = {};
            this.signTime = ``;
            this.contractStatus = `10130005`;
          }
          //查询币种
          if (red.originCurrencyCode) {
            Bmange.getCur({ currencyCode: red.originCurrencyCode })
              .then(qul => {
                this.currency.currencyName = qul.data[0].currencyName; //业务币种
                this.currencyName = qul.data[0].currencyName; //业务币种
              })
              .catch();
          }
          this.$forceUpdate();
        })
        .catch();
      // //物料表
      Bmange.getWl(params)
        .then(res => {
          console.log(res.data, "=============");
          this.tableData = res.data.map((item, index) => {
            this.originPriceCh(item, index);
            this.originAmtCh(item, index);
            this.taxRateCh(item, index);
            this.taxAmtCh(item, index);
            return item;
          });
          if (this.$route.query.children) {
            this.tableDataChild = res.data.map((item, index) => {
              this.originPriceCh(item, index);
              this.originAmtCh(item, index);
              this.taxRateCh(item, index);
              this.taxAmtCh(item, index);
              return item;
            });
          }
        })
        .catch();
    },
    getDetailHis() {
      let params = {
        soContractIdArchive: this.$route.query.id,
        pageSize: 999
      };
      //基本信息
      BAmange.getXx(params)
        .then(res => {
          let red = res.data;
          this.version = red.version;
          this.soContractId = red.soContractId; //合同ID
          this.companyName.companyId = red.companyId; //公司
          this.companyName.companyCode = red.companyCode; //公司
          this.companyName.companyName = red.companyName; //公司
          this.companyName.baseCurrencyCode = red.baseCurrencyCode; //本位币编码
          this.branchName.orgCode = red.orgId; //部门
          this.branchName.branchName = red.orgName; //部门
          this.branchName.branchCode = red.orgCode; //部门
          this.staffName.empName = red.bizPersonName; //业务员
          this.staffName.empCode = red.bizPersonCode; //业务员
          this.soContractNo = red.soContractNo; //销售合同号
          this.custName.customerId = red.custId; //客户id
          this.custName.customerName = red.custName; //客户名称
          this.custName.customerCode = red.custCode; //客户编码
          this.extCode = red.extCode; //外部合同号
          this.projectName.projectCode = red.projectCode; //项目好
          this.projectName.projectName = red.projectName; //项目名称
          this.signTime = red.signTime; //签订日期
          this.contractEndDate = red.contractEndDate; //有效日期s
          this.isSellOnCredit = red.isSellOnCredit; // && red.isSellOnCredit.toString(); //是否赊销
          this.signPlace = red.signPlace; //签约地点
          this.currency.currencyCode = red.originCurrencyCode; //业务币种
          this.currencyRate = red.currencyRate; //本位币汇率
          this.contractAmtVat = red.contractAmtVat; //含税金额
          this.sumQty = red.sumQty; //统计数量
          this.tradeType = red.tradeType && red.tradeType.toString(); //购销方式
          this.contractCat = red.contractCat && red.contractCat.toString(); //合同类型
          this.contractStatus =
            red.contractStatus && red.contractStatus.toString(); //合同状态
          this.fwContractNo = red.fwContractNo; //框架协议号
          this.overShortageRate = red.overShortageRate; //溢短比
          this.isChildrenContract = red.isChildrenContract; //手否位子合同 0子合同 1附合同
          this.remark = red.remark; //备注
          //合同拆分
          if (this.$route.query.children == 1) {
            this.extCode = ``;
            this.custName = {};
            this.signTime = ``;
            this.contractStatus = `10130005`;
          }
          //查询币种
          if (red.originCurrencyCode) {
            Bmange.getCur({ currencyCode: red.originCurrencyCode })
              .then(qul => {
                this.currency.currencyName = qul.data[0].currencyName; //业务币种
                this.currencyName = qul.data[0].currencyName; //业务币种
              })
              .catch();
          }
          this.$forceUpdate();
        })
        .catch();
      // //物料表
      BAmange.getWl(params)
        .then(res => {
          this.tableData = res.data.map((item, index) => {
            this.originPriceCh(item, index);
            this.originAmtCh(item, index);
            this.taxRateCh(item, index);
            this.taxAmtCh(item, index);
            return item;
          });
          if (this.$route.query.children) {
            this.tableDataChild = res.data.map((item, index) => {
              this.originPriceCh(item, index);
              this.originAmtCh(item, index);
              this.taxRateCh(item, index);
              this.taxAmtCh(item, index);
              return item;
            });
          }
        })
        .catch();
    },
    to() {
      if (!Object.keys(this.companyName).length) {
        this.$openWarning(`请选择公司`);
        return false;
      }
      if (!Object.keys(this.branchName).length) {
        this.$openWarning(`请选择部门`);
        return false;
      }
      if (!Object.keys(this.staffName).length) {
        this.$openWarning(`请选择业务员`);
        return false;
      }
      if (!Object.keys(this.custName).length) {
        this.$openWarning(`请选择销售客户`);
        return false;
      }
      if (this.extCode == ``) {
        this.$openWarning(`请输入外部合同号`);
        return false;
      }
      if (!this.signTime) {
        this.$openWarning(`请选择签订日期`);
        return false;
      }
      if (!Object.keys(this.currency).length) {
        this.$openWarning(`请选择业务币种`);
        return false;
      }
      if (this.tradeType == ``) {
        this.$openWarning(`请选择购销方式`);
        return false;
      }
      if (this.contractCat == ``) {
        this.$openWarning(`请选择合同类型`);
        return false;
      }
      //合同拆分式数量对标
      if (this.$route.query.children) {
        for (const item of this.tableData) {
          this.tipFalse = this.tableCf.every(abc => {
            if (item.goodsCode == abc.goodsCode) {
              return Count.accSub(item.itemQty, abc.num) > 0;
            }
          });
        }
        if (!this.tipFalse) {
          this.$openWarning(`拆分数量不可大于合同未发生数量`);
          return false;
        }
      }
      let data = {
        odSoContract: {
          companyId: this.companyName.companyId, //公司
          companyName: this.companyName.companyName, //公司
          companyCode: this.companyName.companyCode, //公司
          baseCurrencyCode: this.companyName.baseCurrencyCode, //本位币编码
          orgId: this.branchName.branchId, //部门
          orgName: this.branchName.branchName, //部门
          orgCode: this.branchName.branchCode, //部门
          bizPersonName: this.staffName.empName, //业务员
          bizPersonCode: this.staffName.empCode, //业务员
          soContractNo: this.soContractNo, //销售合同号
          custId: this.custName.customerId, //客户id
          custName: this.custName.customerName, //客户名称
          custCode: this.custName.customerCode, //客户编码
          extCode: this.extCode, //外部合同号
          projectCode: this.projectName.projectCode, //项目好
          projectName: this.projectName.projectName, //项目名称
          signTime: this.signTime, //签订日期
          contractEndDate: this.contractEndDate, //有效日期
          isSellOnCredit: this.isSellOnCredit, //是否赊销
          signPlace: this.signPlace, //签约地点
          originCurrencyCode: this.currency.currencyCode, //业务币种
          currencyRate: this.currencyRate, //本位币汇率
          contractAmtVat: this.contractAmtVat, //含税金额
          sumQty: this.sumQty, //统计数量
          tradeType: this.tradeType, //购销方式
          contractCat: this.contractCat, //合同类型
          contractStatus: this.contractStatus, //合同状态
          fwContractNo: this.fwContractNo, //框架协议号
          overShortageRate: this.overShortageRate, //溢短比.
          remark: this.remark, //备注
          isChildrenContract: this.$route.query.children ? 0 : 1 //拆分0 新建1
        },
        odSoContractItemsList: this.tableData
      };
      if (this.$route.query.id) {
        data.odSoContract.soContractId = this.soContractId;
        data.odSoContract.version = this.version;
        for (const item of this.tableData) {
          item.soContractId = this.soContractId;
          item.soContractNo = ``;
        }
      }
      if (this.$route.query.children) {
        data.odSoContract.soContractId = ``;
        data.odSoContract.parentContractNo = this.soContractNo;
      }
      this.$emit("get", data, 1);
    },
    // 获取已发货数量
    getNum() {
      let params = {
        soContractId: this.$route.query.id
      };
      Bmange.getNum(params)
        .then(res => {
          this.tolNum = res.data;
          let obj = {};
          for (const fahuo of res.data) {
            for (const zong of this.tableDataChild) {
              if (fahuo.goodsCode == zong.goodsCode) {
                obj.goodsCode = zong.goodsCode;
                obj.num = Count.accSub(zong.goodsCode, fahuo.goodsCode);
                this.tableCf.push(obj);
              }
            }
          }
        })
        .catch();
    },
    //获取合同类型
    htlx() {
      Bmange.htlx()
        .then(res => {
          this.contractType = res.data.filter(item => {
            if (
              item.dict_value == `国内销售` ||
              item.dict_value == `配供业务` ||
              item.dict_value == `现款现货` ||
              item.dict_value==`码单销售` ||
              item.dict_value==`零售销售`
            ) {
              return item;
            }
          });
        })
        .catch();
    },
    //获取合同类型
    htzt() {
      Bmange.htzt()
        .then(res => {
          this.isInaType = res.data;
        })
        .catch();
    },
    //获取购销方式
    gxfs() {
      Bmange.gxfs()
        .then(res => {
          this.gxfsList = res.data.filter(item => {
            return item.dict_code != 10470005;
          });
        })
        .catch();
    },
    //第二单位/基本单位
    getUnit() {
      let data = {
        isInactiveList: 0
      };
      Bmange.getUnit(data)
        .then(res => {
          this.unitList = res.data;
        })
        .catch();
    },
    //查询货币
    currencyList(e) {
      let params = { id: e };
      Bmange.currency(params)
        .then(res => {
          this.companyName.baseCurrencyCode = res.data.currencyCode;
        })
        .catch();
    },
    //公司弹窗打开
    componyTip() {
      this.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
      this.componyShow = false;
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      this.componyShow = false;
      this.companyName = e;
      this.currencyList(e.functionalCurrencyId);
      this.branchName = ``;
      this.$root.Bus.$emit("companyNine", e);
      // this.staffName = ``;
    },
    //签订日期
    changeTime(e) {
      this.$root.Bus.$emit("signTime", e);
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
      this.staffName = ``;
      this.$root.Bus.$emit("branchName", e);
    },
    //员工弹窗打开
    staffTip() {
      // if (this.companyName == `` || this.branchName == ``) {
      //   this.$openWarning("请先选择公司和部门");
      //   return false;
      // }
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
      this.$root.Bus.$emit("staffName", e);
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
      this.projectName = e;
      this.$root.Bus.$emit("projectName", e);
    },
    //协议弹窗打开
    agreeTip() {
      this.agreeShow = true;
    },
    //协议弹窗关闭
    agreeCancle() {
      this.agreeShow = false;
    },
    //协议弹窗确定获取数据
    agreeSure(e) {
      this.agreeShow = false;
      this.fwContractNo = e.contractNo;
    },
    //客户弹窗打开
    customerTip() {
      this.customerShow = true;
    },
    //客户弹窗关闭
    customerCancle() {
      this.customerShow = false;
    },
    //客户弹窗确定获取数据
    customerSure(e) {
      this.customerShow = false;
      this.custName = e;
      this.$root.Bus.$emit("custName", e);
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
    //汇率查询
    pariList() {
      if (
        this.currency.currencyId == `` &&
        this.companyName.functionalCurrencyId == ``
      )
        return false;
      let params = {
        formCurrencyId: this.currency.currencyId,
        toCurrencyId: this.companyName.functionalCurrencyId
      };
      Bmange.pariList(params)
        .then(res => {
          this.currencyRate = res.data.parities;
        })
        .catch();
    },
    //总计数量
    qtyChange(id, e, index) {
      let tol = 0;
      // for (const item of this.tableData) {
      //   }
      this.tableData.map((item, index) => {
        tol = Count.accAdd(tol, item.itemQty);
        this.originPriceCh(item, index);
        // this.originAmtCh(item, index);
        // this.taxRateCh(item, index);
        // this.taxAmtCh(item, index);
      });
      if (this.$route.query.children) {
        for (const item of this.tableCf) {
          if (id == item.goodsCode) {
            if (Count.accSub(e, item.num) < 0) {
              this.tipFalse = false;
              this.$openWarning(`拆分数量不可大于合同未发生数量`);
              return false;
            }
          }
        }
      } else {
        this.tipFalse = true;
      }
      this.sumQty = tol;
    },
    //采购含税单价变动
    originPriceCh(e, index) {
      let row = e;
      //采购不含税单价
      row.unOriginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //采购含税金额
      // row.originAmt = this.$orginAmt(row.originPrice, row.itemQty);
      //采购不含税金额
      row.unOriginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //增值税额
      // row.originTaxAmt = this.$taxAmt(row.originAmt, row.unOriginAmt);

      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      // row.basePrice = this.$bbhsdj(row.originPrice, this.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(row.unOriginPrice, this.currencyRate);
      //本币含税金额 baseAmt
      // row.baseAmt = this.$bbhsje(row.originAmt, this.currencyRate);
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$bbnhsje(row.unOriginAmt, this.currencyRate);
      //本币增值税额 baseTax
      // row.baseTax = this.$bbzzse(row.originTaxAmt, this.currencyRate);
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
      // row.originPrice = this.$orginPrice(row.originAmt, row.itemQty);
      //采购不含税单价
      row.unOriginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //采购不含税金额
      row.unOriginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //增值税额
      // row.originTaxAmt = this.$taxAmt(row.originAmt, row.unOriginAmt);

      //本币计算 对应业务币*汇率
      //本币含税单价  basePrice
      // row.basePrice = this.$bbhsdj(row.originPrice, this.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(row.unOriginPrice, this.currencyRate);
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$bbnhsje(row.unOriginAmt, this.currencyRate);
      //本币含税金额 baseAmt
      // row.baseAmt = this.$bbhsje(row.originAmt, this.currencyRate);
      //本币增值税额 baseTax
      // row.baseTax = this.$bbzzse(row.originTaxAmt, this.currencyRate);
      this.$set(this.tableData, index, row);
    },
    //税率变动
    taxRateCh(e, index) {
      let row = e;
      //采购不含税金额
      row.unOriginAmt = this.$unorginAmt(row.originAmt, row.taxRate);
      //采购不含税单价
      row.unOriginPrice = this.$unorginPrice(row.originPrice, row.taxRate);
      //增值税额
      // row.originTaxAmt = this.$taxAmt(row.originAmt, row.unOriginAmt);

      //本币计算 对应业务币*汇率
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$bbnhsje(row.unOriginAmt, this.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(row.unOriginPrice, this.currencyRate);
      //本币增值税额 baseTax
      // row.baseTax = this.$bbzzse(row.originTaxAmt, this.currencyRate);
      this.$set(this.tableData, index, row);
    },
    //业务币税额变动
    taxAmtCh(e, index) {
      let row = e;
      //采购不含税金额  采购不含税金额=采购含税金额-税额
      row.unOriginAmt = this.$unorginAmtCh(row.originAmt, row.originTaxAmt);
      //采购不含税单价 采购不含税金额=采购不含税金额 / 数量
      row.unOriginPrice = this.$unPrice(row.unOriginAmt, row.itemQty);

      //本币计算 对应业务币*汇率
      //本币不含税金额 unBaseAmt
      row.unBaseAmt = this.$bbnhsje(row.unOriginAmt, this.currencyRate);
      //本币不含税单价 unBasePrice
      row.unBasePrice = this.$bbnhsdj(row.unOriginPrice, this.currencyRate);
      //本币增值税额 baseTax
      // row.baseTax = this.$bbzzse(row.originTaxAmt, this.currencyRate);
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
    //物料弹窗打开
    matterTip(index) {
      this.matterShow = true;
      this.index = index;
    },
    //物料弹窗关闭
    matterCancle() {
      this.matterShow = false;
    },
    //物料弹窗确定获取数据
    matterSure(e) {
      this.matterShow = false;
      this.matterName = e;
      let data = {
        edit: this.tableData[this.index].edit,
        one: this.tableData[this.index].one,
        soRowno: this.tableData[this.index].soRowno,
        goodsId: e.skuId,
        goodsCode: e.skuCode,
        goodsName: e.skuName,
        goodsCat: e.categoryCode,
        goodsCategoryName: e.categoryShowName,
        goodsSpec: e.propertyInfo,
        itemUnit: e.firstUnitName,
        itemUnitName: e.firstUnitName,
        itemQty: this.tableData[this.index].itemQty,
        secUnit: e.secUnitName,
        secUnitName: e.secUnitName,
        secQty: this.tableData[this.index].secQty,
        remark: this.tableData[this.index].remark
      };
      this.tableData[this.index] = data;
      this.$set(this.tableData, this.index, data);
    },
    //删除
    setUp() {
      if (!this.selectioned.length) {
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
          for (const item of this.selectioned) {
            if (item.soContractDetailId) {
              idSav.push(item.soContractDetailId);
            } else {
              idNo.push(item);
            }
          }
          let params = {
            contractDetailIdList: idSav.join(",")
          };
          idSav.length &&
            Bmange.delWl(params)
              .then(res => {
                this.$openSuccess(res.message);
              })
              .catch();
          this.deleIndex(this.selectioned, this.tableData);
        })
        .catch();
    },
    //删除方法
    deleIndex(e, list) {
      for (const get of e) {
        let del = list.findIndex(item => {
          return (
            item.one == get.one &&
            item.soContractDetailId == get.soContractDetailId
          );
        });
        list.splice(del, 1);
      }
      this.tableData.forEach((item, index) => {
        item.soRowno = (index + 1) * 10;
        this.$set(this.tableData, index, item);
      });
    },
    //表格选择
    handleChange(e) {
      this.selectioned = e;
    },
    //创建数据
    addList() {
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        soRowno: (this.tableData.length + 1) * 10,
        goodsCode: ``,
        goodsName: ``,
        goodsCat: ``,
        goodsCategoryName: ``,
        goodsSpec: ``,
        itemUnit: ``,
        itemUnitName: ``,
        itemQty: ``,
        taxRate: 0,
        secUnit: ``,
        secUnitName: ``,
        secQty: ``,
        remark: ``,
        originPrice: 0,
        unOriginPrice: 0,
        originAmt: 0,
        unOriginAmt: 0,
        originTaxAmt: 0,
        baseTax: 0,
        basePrice: 0,
        unBasePrice: 0,
        baseAmt: 0,
        unBaseAmt: 0
      };
      this.newTbale.unshift(data);
      let newTbale = [];
      newTbale.unshift(data);
      this.tableData = newTbale.concat(this.tableData);
      this.tableData.forEach((item, index) => {
        item.soRowno = (index + 1) * 10;
        this.$set(this.tableData, index, item);
      });
    },
    getSummariesWl(param) {
      const { columns, data } = param;
      let self = this;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        } else if (index === 7 || index === 9) {
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
            this.contractAmtVat = sums[12];
          } else {
            sums[index] = "N/A";
          }
        } else if (
          index === 12 ||
          index === 13 ||
          index === 15 ||
          index === 16 ||
          index === 19 ||
          index === 20
        ) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                let res = self.$calculationAmount(prev, curr, "add");
                return res;
              } else {
                return prev;
              }
            }, 0);
            this.contractAmtVat = sums[12];
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
    tableData: {
      handler(e) {
        this.$root.Bus.$emit("matterList", this.tableData);
        let tol = 0;
        for (const item of this.tableData) {
          tol = Count.accAdd(tol, item.originTaxAmt);
        }
        this.$root.Bus.$emit("originTaxAmt", tol);
      },
      deep: true
    },
    soContractNo: {
      handler() {
        this.$root.Bus.$emit("no", this.soContractNo);
      }
    },
    currencyRate: {
      handler() {
        this.$root.Bus.$emit("currencyRate", this.currencyRate);
      }
    },
    currency: {
      handler() {
        this.$root.Bus.$emit("currencyName", this.currency);
      },
      deep: true
    },
    companyName: {
      handler() {
        this.$root.Bus.$emit("company", this.currency);
      },
      deep: true
    },
    contractAmtVat: {
      handler() {
        this.$root.Bus.$emit("contractAmtVat", this.contractAmtVat);
      }
    }
  },
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    projectSelect,
    customerSelect,
    coinSelect,
    matterSelect,
    agreeSelect
  }
};
</script>

<style lang="scss">
</style>
