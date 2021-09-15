<template>
  <div id="supplierDetail">
    <!--操作按钮-->
    <div class="button-div">
      <el-button icon="el-icon-back" @click="goBack">返回</el-button>
    </div>
    <el-divider></el-divider>
    <!--头部信息-->
    <div class="input-div">
      <el-row>
        <el-col :span="5" class="el-col">
          <label>公司</label>
          <el-input v-model="baseInfo.bbSupplierBranchList[0].companyName" class="el-inputs" disabled></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>部门</label>
          <el-input v-model="baseInfo.bbSupplierBranchList[0].orgName" class="el-inputs" disabled></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>供应商状态</label>
          <el-select v-model="baseInfo.isInactive" class="el-selects" disabled>
            <el-option v-for="(item, index) in isInactiveDic" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>供应商类型</label>
          <el-select v-model="baseInfo.supplierType" class="el-selects" disabled>
            <el-option v-for="(item, index) in supplierTypeDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <el-tabs class="el-tabs" type="card" v-model="currTab">
      <!--基础信息-->
      <el-tab-pane label="基础信息" name="firstOne">
        <div class="input-div">
          <el-row>
            <el-col :span="10" class="el-col el-long">
              <label>供应商代码</label>
              <el-input v-model="baseInfo.supplierCode" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>国家</label>
              <el-select v-model="baseInfo.countryId" class="el-selects" disabled>
                <el-option v-for="(item, index) in countryDic" :key="index" :label="item.regionName" :value="item.regionId"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>省份</label>
              <el-select v-model="baseInfo.provinceId" class="el-selects" disabled>
                <el-option v-for="(item, index) in provinceDic" :key="index" :label="item.regionName" :value="item.regionId"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" class="el-col el-long">
              <label>供应商名称</label>
              <el-input v-model="baseInfo.supplierName" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>城市</label>
              <el-select v-model="baseInfo.cityId" class="el-selects" disabled>
                <el-option v-for="(item, index) in cityDic" :key="index" :label="item.regionName" :value="item.regionId"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>区县</label>
              <el-select v-model="baseInfo.countyId" class="el-selects" disabled>
                <el-option v-for="(item, index) in countyDic" :key="index" :label="item.regionName" :value="item.regionId"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" class="el-col el-long">
              <label>注册地址</label>
              <el-input v-model="baseInfo.address" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>业务员</label>
              <el-input v-model="baseInfo.salesman" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col checkbox">
              <label>是否上市公司</label>
              <el-checkbox v-model="isListed" disabled></el-checkbox>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" class="el-col el-long">
              <label>联系地址</label>
              <el-input v-model="baseInfo.linkAddress" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>注册资本</label>
              <el-input v-model="baseInfo.registerMoney" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>法人</label>
              <el-input v-model="baseInfo.legalPerson" class="el-inputs" disabled></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="el-col">
              <label>公司类型</label>
              <el-select v-model="baseInfo.companyType" class="el-selects" disabled>
                <el-option v-for="(item, index) in companyTypeDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>成立日期</label>
              <el-date-picker v-model="baseInfo.setupDate" type="date" class="el-selects" placeholder="选择日期" disabled></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>营业期限</label>
              <el-date-picker v-model="baseInfo.businessTerm" type="date" class="el-selects" placeholder="选择日期" disabled></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>邮政编码</label>
              <el-input v-model="baseInfo.zipCode" class="el-inputs" disabled></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="el-col">
              <label>传真</label>
              <el-input v-model="baseInfo.fax" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>行业</label>
              <el-input v-model="baseInfo.industry" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>供应商级别</label>
              <el-select v-model="baseInfo.supplierLevel" class="el-selects" disabled>
                <el-option v-for="(item, index) in supplierLevelDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="el-col checkbox">
              <label>是否为子公司</label>
              <el-checkbox v-model="isSubsidiary" disabled></el-checkbox>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>母公司</label>
              <el-input v-model="baseInfo.parentName" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>是否关联供应商</label>
              <el-select v-model="addvalue" class="el-selects" placeholder="请选择" disabled>
                 <el-option
                  v-for="item in addoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="el-col el-full">
              <label>备注</label>
              <el-input v-model="baseInfo.remark" class="el-inputs" disabled></el-input>
            </el-col>
          </el-row>
        </div>
        <div style="margin-bottom:5px">
          <span class="sub-title">通讯</span>
        </div>
        <el-table
          class="el-table"
          style="margin-bottom:15px"
          max-height="300"
          border
          center
          :data="baseInfo.bbSupplierManList">
          <el-table-column type="index" label="序号" width="55"></el-table-column>
          <el-table-column prop="linkMan" label="联系人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="linkTypeStr" label="联系人类型" show-overflow-tooltip></el-table-column>
          <el-table-column prop="fixedTelephone" label="固定电话" show-overflow-tooltip></el-table-column>
          <el-table-column prop="mobilePhone" label="移动电话" show-overflow-tooltip></el-table-column>
          <el-table-column prop="fax" label="传真" show-overflow-tooltip></el-table-column>
          <el-table-column prop="email" label="E-mail" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-tab-pane>
      <!--银行信息-->
      <el-tab-pane label="银行信息" name="secondOne">
        <el-table
          class="el-table"
          max-height="320"
          border
          center
          :data="baseInfo.bbSupplierBankList">
          <el-table-column type="index" label="序号" width="55"></el-table-column>
          <el-table-column prop="bankCode" label="银行代码" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bankName" label="银行名称" min-width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bankAccount" label="银行账号" min-width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bankAddress" label="银行地址" min-width="180" show-overflow-tooltip></el-table-column>
          <el-table-column label="是否开票银行" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-radio v-model="invoiceSingle" :label="scope.row.bankOnly" disabled>{{scope.row.isMakeInvoice == 0 ? "否" : "是"}}</el-radio>
            </template>
          </el-table-column>
          <el-table-column label="是否收款银行" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-radio v-model="collectionSingle" :label="scope.row.bankOnly" disabled>{{scope.row.isCollectionBank == 0 ? "否" : "是"}}</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" min-width="200" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-tab-pane>
      <!--开票信息-->
      <el-tab-pane label="开票信息" name="thirdOne">
        <div class="input-div">
          <el-row>
            <el-col :span="5" class="el-col">
              <label>纳税人分类</label>
              <el-select v-model="baseInfo.custTaxType" class="el-selects" disabled>
                <el-option v-for="(item, index) in custTypeDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>电话</label>
              <el-input v-model="baseInfo.custTelephone" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label class="text_too_long">纳税人识别号</label>
              <el-input v-model="baseInfo.custTaxNo" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>银行代码</label>
              <el-input v-model="baseInfo.bankCode" class="el-inputs" disabled></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="el-col">
              <label>银行账号</label>
              <el-input v-model="baseInfo.bankNumber" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>银行名称</label>
              <el-input v-model="baseInfo.bankName" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>银行地址</label>
              <el-input v-model="baseInfo.bankAddress" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>备注</label>
              <el-input v-model="baseInfo.invoiceRemark" class="el-inputs" disabled></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" class="el-col el-long">
              <label>开票地址</label>
              <el-input v-model="baseInfo.invoiceAddress" class="el-inputs"></el-input>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <!--附件-->
      <el-tab-pane label="附件" name="fourthOne">
        
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { linkTypeObj } from "@/api/dictionary";
import SupplierApi from "@/api/basicData/supplier";
export default {
  name: "supplierDetail",
  data() {
    return {
      addoptions: [{
          value: '0',
          label: '否'
        }, {
          value: '1',
          label: '是'
        }],
        addvalue: '',
      //头部信息
      currTab: "firstOne", //标签页
      baseInfo: {
        //头部信息
        bbSupplierBranchList: [{
          companyId: "",
          companyCode: "",
          companyName: "",
          orgId: "",
          orgCode: "",
          orgName: ""
        }],
        isInactive: "",
        supplierType: "",
        //基础信息
        supplierCode: "",
        countryId: "",
        countryName: "",
        provinceId: "",
        provinceName: "",
        supplierName: "",
        cityId: "",
        cityName: "",
        countyId: "",
        countyName: "",
        address: "",
        salesman: "",
        isListed: false,
        linkAddress: "",
        registerMoney: "",
        legalPerson: "",
        companyType: "",
        setupDate: "",
        businessTerm: "",
        zipCode: "",
        fax: "",
        industry: "",
        supplierLevel: "",
        isSubsidiary: false,
        parentName: "",
        remark: "",
        //通讯
        bbSupplierManList: [],
        //银行信息
        bbSupplierBankList: [],
        //开票信息
        custTaxType: "",
        custTelephone: "",
        custTaxNo: "",
        bankCode: "",
        bankNumber: "",
        bankName: "",
        bankAddress: "",
        invoiceRemark: "",
        invoiceAddress: ""
      },
      //头部信息字典
      isInactiveDic: [
        {value: "0", label: "启用"},
        {value: "1", label: "禁用"}
      ],
      supplierTypeDic: [],
      //基础信息字典
      isListed: false,
      isSubsidiary: false,
      iscustomer:false,
      countryDic: [],
      provinceDic: [],
      cityDic: [],
      countyDic: [],
      companyTypeDic: [],
      supplierLevelDic: [],
      //通讯字典
      linkIndex: null, //通讯列表选中下标
      //银行信息单选字段
      bankIndex: null, //银行信息列表选中下标
      invoiceSingle: 0,
      collectionSingle: 0,
      bankOnly: 1, //开票、收款银行选择唯一
      //开票信息字典
      custTypeDic: [],
      navColor: {
        button: {
          backgroundColor: ""
        }
      }
    };
  },
  created() {
    //供应商类型字典数据
    this.supplierTypeData();
    //省市区查询
    this.getAreaData(0);
    //公司类型字典数据
    this.companyTypeData();
    //供应商级别字典数据
    this.supplierLevelData();
    //纳税人分类字典数据
    this.custTypeData();
    //获取供应商详情
    this.supplierDetail();
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor = "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    //获取供应商详情
    supplierDetail() {
      //供应商主数据
      SupplierApi.supplierGet({
        id: this.$route.query.id
      }).then(res => {
        Object.assign(this.baseInfo, res.data);
        this.baseInfo.isInactive += ""; //供应商状态
        this.baseInfo.supplierType += ""; //供应商类型
        //获取省市区
        this.getArea(1, this.baseInfo.countryId);
        this.getArea(2, this.baseInfo.provinceId);
        this.getArea(3, this.baseInfo.cityId);
        this.isListed = this.baseInfo.isListed == 1 ? true : false; //是否上市公司
        this.isSubsidiary = this.baseInfo.isSubsidiary == 1 ? true : false; //是否为子公司
        this.addvalue = String(this.baseInfo.isSupplierRelated);
        this.baseInfo.companyType += ""; //公司类型
        if (this.baseInfo.companyType == "null") {
          this.baseInfo.companyType = "";
        }
        this.baseInfo.supplierLevel += ""; //供应商级别
        if (this.baseInfo.supplierLevel == "null") {
          this.baseInfo.supplierLevel = "";
        }
        //开票信息
        this.baseInfo.custTaxType += ""; //纳税人分类
        if (this.baseInfo.custTaxType == "null") {
          this.baseInfo.custTaxType = "";
        }
      }).catch();
      //供应商通讯数据
      SupplierApi.supplierLinkGet({
        supplierId: this.$route.query.id
      }).then(res => {
        this.baseInfo.bbSupplierManList = res.data;
        this.baseInfo.bbSupplierManList.forEach(item => {
          linkTypeObj.forEach(item1 => {
            if (item.linkType == item1.dict_code) item.linkTypeStr = item1.dict_value;
          });
        });
      }).catch();
      //供应商银行数据
      SupplierApi.supplierBankGet({
        supplierId: this.$route.query.id
      }).then(res => {
        this.baseInfo.bbSupplierBankList = res.data;
        this.baseInfo.bbSupplierBankList.forEach((item, key) => {
          item.bankOnly = this.bankOnly++;
          if (item.isMakeInvoice == 1) { //是否开票银行
            this.invoiceSingle = key + 1;
          }
          if (item.isCollectionBank == 1) { //是否收款银行
            this.collectionSingle = key + 1;
          }
        });
        if (this.invoiceSingle > 0) {
          let row = this.baseInfo.bbSupplierBankList[this.invoiceSingle - 1];
          this.baseInfo.bankCode = row.bankCode;
          this.baseInfo.bankNumber = row.bankAccount;
          this.baseInfo.bankName = row.bankName;
          this.baseInfo.bankAddress = row.bankAddress;
        }
      }).catch();
      //供应商公司部门数据
      SupplierApi.supplierBranchGet({
        supplierId: this.$route.query.id
      }).then(res => {
        if (res.data && res.data.length > 0) {
          this.baseInfo.bbSupplierBranchList = res.data;
        }
      }).catch();
    },
    //获取省市区
    getArea(e, id) {
      SupplierApi.areaList({
        regionId: id
      }).then(res => {
        switch (e) {
          case 1:
            this.provinceDic = res.data;
          break;
          case 2:
            this.cityDic = res.data;
          break;
          case 3:
            this.countyDic = res.data;
          break;
          default: break;
        }
      }).catch();
    },
    //供应商类型字典数据
    supplierTypeData() {
      SupplierApi.dicQuery({
        dictNo: 1010
      }).then(res => {
        this.supplierTypeDic = res.data;
      }).catch();
    },
    //省市区查询
    getAreaData(e) {
      SupplierApi.areaList({
        regionId: e
      }).then(res => {
        this.countryDic = res.data;
      }).catch();
    },
    //公司类型字典数据
    companyTypeData() {
      SupplierApi.dicQuery({
        dictNo: 1006
      }).then(res => {
        this.companyTypeDic = res.data;
      }).catch();
    },
    //供应商级别字典数据
    supplierLevelData() {
      SupplierApi.dicQuery({
        dictNo: 1097
      }).then(res => {
        this.supplierLevelDic = res.data;
      }).catch();
    },
    //纳税人分类字典数据
    custTypeData() {
      SupplierApi.dicQuery({
        dictNo: 1004
      }).then(res => {
        this.custTypeDic = res.data;
      }).catch();
    },
    //返回
    goBack() {
      this.$router.push({name: "supplier"});
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
#supplierDetail {
  .el-row {
    margin-left: 10px;
  }
  .el-col {
    margin: 0;
    padding: 8px 0 10px 10px;
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
  .checkbox {
    height: 42px;
    text-align: center;
    label {
      width: auto;
    }
    .el-checkbox:after {
      content: "";
    }
  }
  .el-col-10 {
    width: 48%;
  }
  .el-long {
    label {
      width: 15%;
    }
    .el-inputs {
      width: 85% !important;
      .el-input__inner {
        width: 100%;
      }
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
  .sub-title {
    padding-right: 35px;
    font-size: 18px;
    font-weight: bold;
  }
  .el-input__inner,
  .el-radio__label {
    color: #666;
    cursor: default;
  }
  .el-input__icon {
    cursor: default;
  }
  .el-checkbox__inner::after {
    border-color: #666;
  }
}
</style>