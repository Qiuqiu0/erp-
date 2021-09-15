<template>
  <div id="customerEdit">
    <!--操作按钮-->
    <div class="button-div">
      <el-button icon="el-icon-suitcase" @click="save">保存</el-button>
      <el-button icon="el-icon-close" @click="goBack">取消</el-button>
    </div>
    <el-divider></el-divider>
    <!--头部信息-->
    <div class="input-div">
      <el-row>
        <el-col :span="5" class="el-col el-col-required">
          <label><span class="must-full">*</span> 公司</label>
          <el-input v-model="baseInfo.bbCustomerBranchList[0].companyName" :class="errorKey.includes('companyId') ? 'inputRed' : ''" class="el-inputs" placeholder="请选择" disabled></el-input>
          <span class="moreIcon" v-show="!isUpdate" @click="companyPopup"><i class="el-icon-search"></i></span>
        </el-col>
        <el-col :span="5" class="el-col el-col-required">
          <label><span class="must-full">*</span> 部门</label>
          <el-input v-model="baseInfo.bbCustomerBranchList[0].orgName" :class="errorKey.includes('orgId') ? 'inputRed' : ''" class="el-inputs" placeholder="请选择" disabled></el-input>
          <span class="moreIcon" v-show="!isUpdate" @click="branchPopup"><i class="el-icon-search"></i></span>
        </el-col>
        <el-col :span="5" class="el-col el-col-required">
          <label><span class="must-full">*</span> 客户状态</label>
          <el-select v-model="baseInfo.isInactive" class="el-selects" :class="errorKey.includes('isInactive') ? 'inputRed' : ''" placeholder="请选择" :disabled="isUpdate">
            <el-option v-for="(item, index) in isInactiveDic" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col el-col-required">
          <label><span class="must-full">*</span> 客户类型</label>
          <el-select v-model="baseInfo.customerType" :class="errorKey.includes('customerType') ? 'inputRed' : ''" class="el-selects" placeholder="请选择" :disabled="isUpdate">
            <el-option v-for="(item, index) in customerTypeDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
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
              <label>客户代码</label>
              <el-input v-model="baseInfo.customerCode" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>国家</label>
              <el-select filterable v-model="baseInfo.countryId" class="el-selects" placeholder="请选择" @change="getAreaData(baseInfo.countryId, 1)">
                <el-option v-for="(item, index) in countryDic" :key="index" :label="item.regionName" :value="item.regionId"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>省份</label>
              <el-select filterable v-model="baseInfo.provinceId" class="el-selects" placeholder="请选择" @change="getAreaData(baseInfo.provinceId, 2)">
                <el-option v-for="(item, index) in provinceDic" :key="index" :label="item.regionName" :value="item.regionId"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" class="el-col el-long el-col-required">
              <label><span class="must-full">*</span> 客户名称</label>
              <el-input v-model="baseInfo.customerName" :class="errorKey.includes('customerName') ? 'inputRed' : ''" class="el-inputs"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>城市</label>
              <el-select filterable v-model="baseInfo.cityId" class="el-selects" placeholder="请选择" @change="getAreaData(baseInfo.cityId, 3)">
                <el-option v-for="(item, index) in cityDic" :key="index" :label="item.regionName" :value="item.regionId"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>区县</label>
              <el-select filterable v-model="baseInfo.countyId" class="el-selects" placeholder="请选择" @change="getCountyData">
                <el-option v-for="(item, index) in countyDic" :key="index" :label="item.regionName" :value="item.regionId"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" class="el-col el-long el-col-required">
              <label><span class="must-full">*</span> 注册地址</label>
              <el-input v-model="baseInfo.address" :class="errorKey.includes('address') ? 'inputRed' : ''" class="el-inputs" @change="changeInvoiceAddress"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>业务员</label>
              <el-input v-model="baseInfo.salesman" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span class="moreIcon" @click="staffPopup"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5" class="el-col checkbox">
              <label>是否上市公司</label>
              <el-checkbox v-model="isListed"></el-checkbox>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" class="el-col el-long">
              <label>联系地址</label>
              <el-input v-model="baseInfo.linkAddress" class="el-inputs"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>注册资本</label>
              <el-input v-model="baseInfo.registerMoney" class="el-inputs"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>法人</label>
              <el-input v-model="baseInfo.legalPerson" class="el-inputs"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="el-col">
              <label>公司类型</label>
              <el-select filterable v-model="baseInfo.companyType" class="el-selects" placeholder="请选择" clearable>
                <el-option v-for="(item, index) in companyTypeDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>成立日期</label>
              <el-date-picker v-model="baseInfo.setupDate" type="date" class="el-selects" placeholder="选择日期" :picker-options="limitTime"></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>营业期限</label>
              <el-date-picker v-model="baseInfo.businessTerm" type="date" class="el-selects" placeholder="选择日期"></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>邮政编码</label>
              <el-input v-model="baseInfo.zipCode" class="el-inputs"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="el-col">
              <label>传真</label>
              <el-input v-model="baseInfo.fax" class="el-inputs"></el-input>
            </el-col>
            <!-- <el-col :span="5" class="el-col">
              <label>账户组</label>
              <el-select v-model="baseInfo.accountGroup" class="el-selects" placeholder="请选择" clearable>
                <el-option v-for="(item, index) in accountGroupDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
              </el-select>
            </el-col> -->
            <el-col :span="5" class="el-col">
              <label>信用账户组</label>
              <el-input v-model="baseInfo.creditGroupName" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span class="moreIcon" @click="creditGroupPopup"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>行业</label>
              <el-input v-model="baseInfo.industry" class="el-inputs"></el-input>
            </el-col>
            <el-col :span="5" class="el-col checkbox">
              <label>是否为子公司</label>
              <el-checkbox v-model="isSubsidiary"></el-checkbox>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="el-col el-col-required" v-if="isMust">
              <label><span class="must-full" >*</span> 母公司</label>
              <el-input v-model="baseInfo.parentName" :class="errorKey.includes('parentId') ? 'inputRed' : ''" class="el-inputs" :placeholder="isMust ? '请选择' : ''" disabled></el-input>
              <span class="moreIcon" v-if="isMust" @click="customerPopup"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5" class="el-col" v-else>
              <label>母公司</label>
              <el-input v-model="baseInfo.parentName" class="el-inputs" :placeholder="isMust ? '请选择' : ''" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span>是否关联客户</label>
              <el-select v-model="addvalue" :class="errorKey.includes('addvalue') ? 'inputRed' : ''" class="el-selects" placeholder="请选择">
                 <el-option
                  v-for="item in addoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
              <label><span class="must-full">*</span>客户分类</label>
              <el-select
              size="small"
              class="el-select"
              v-model="baseInfo.custSideType"
              :class="errorKey.includes('custSideType') ? 'inputRed' : ''"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in custSideTypeList"
                :key="index"
                :label="item.dict_value"
                :value="item.dict_key"
              ></el-option>
            </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="el-col el-full">
              <label>备注</label>
              <el-input v-model="baseInfo.remark" class="el-inputs"></el-input>
            </el-col>
          </el-row>
        </div>
        <div class="button-div" style="margin-bottom:5px">
          <span class="sub-title">通讯</span>
          <el-button icon="el-icon-plus" size="mini" @click="addLink">增加行</el-button>
          <el-button icon="el-icon-minus" size="mini" @click="deleteLink">删除行</el-button>
        </div>
        <el-table
          class="el-table edit-info"
          style="margin-bottom:15px"
          max-height="300"
          border
          center
          :data="baseInfo.bbCustomerLinkList"
          ref="multipleLink"
          @selection-change="linkChange"
          @row-dblclick="linkDblclick"
          @select-all="linkSelect"
          @select="linkSelect"
          @row-click="linkSelectRow">
          <el-table-column type="selection"	width="55"></el-table-column>
          <el-table-column label="联系人" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.canEdit">
                <el-input v-model="scope.row.linkMan"></el-input>
              </div>
              <div v-else>{{scope.row.linkMan}}</div>
            </template>
          </el-table-column>
          <el-table-column label="联系人类型" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.canEdit">
                <el-select v-model="scope.row.linkType" placeholder="请选择" clearable @change="changeLinkTypeStr(scope.row)">
                  <el-option v-for="(item, index) in linkTypeDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
                </el-select>
              </div>
              <div v-else>{{scope.row.linkTypeStr}}</div>
            </template>
          </el-table-column>
          <el-table-column label="固定电话" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.canEdit">
                <el-input v-model="scope.row.fixedTelephone"></el-input>
              </div>
              <div v-else>{{scope.row.fixedTelephone}}</div>
            </template>
          </el-table-column>
          <el-table-column label="移动电话" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.canEdit">
                <el-input v-model="scope.row.mobilePhone"></el-input>
              </div>
              <div v-else>{{scope.row.mobilePhone}}</div>
            </template>
          </el-table-column>
          <el-table-column label="传真" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.canEdit">
                <el-input v-model="scope.row.fax"></el-input>
              </div>
              <div v-else>{{scope.row.fax}}</div>
            </template>
          </el-table-column>
          <el-table-column label="E-mail" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.canEdit">
                <el-input v-model="scope.row.email"></el-input>
              </div>
              <div v-else>{{scope.row.email}}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!--银行信息-->
      <el-tab-pane label="银行信息" name="secondOne">
        <div class="button-div" style="margin-bottom:5px">
          <el-button icon="el-icon-plus" size="mini" @click="addBank">增加行</el-button>
          <el-button icon="el-icon-minus" size="mini" @click="deleteBank">删除行</el-button>
        </div>
        <el-table
          class="el-table edit-info"
          border
          center
          max-height="320"
          :data="baseInfo.bbCustomerBankList"
          ref="multipleBank"
          @selection-change="bankChange"
          @row-dblclick="bankDblclick"
          @select-all="bankSelect"
          @select="bankSelect"
          @row-click="bankSelectRow">
          <el-table-column type="selection"	width="55"></el-table-column>
          <el-table-column prop="bankCode" label="银行代码" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bankName" label="银行名称" min-width="180" show-overflow-tooltip></el-table-column>
          <el-table-column label="银行账号" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.canEdit">
                <el-input v-model="scope.row.bankAccount" @input="updateBankNumber(scope.row)"></el-input>
              </div>
              <div v-else>{{scope.row.bankAccount}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="bankSwiftCode" label="SWIFT码" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bankAddress" label="银行地址" min-width="180" show-overflow-tooltip></el-table-column>
          <el-table-column label="是否开票银行" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span @click="invoiceRadio(scope.row)">
                <el-radio v-model="invoiceSingle" @click.native.prevent="clickInvoice(scope.row.bankOnly)" :label="scope.row.bankOnly">{{scope.row.isMakeInvoice == 0 ? "否" : "是"}}</el-radio>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="是否收款银行" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span @click="collectionRadio(scope.row)">
                <el-radio v-model="collectionSingle" @click.native.prevent="clickCollection(scope.row.bankOnly)" :label="scope.row.bankOnly">{{scope.row.isCollectionBank == 0 ? "否" : "是"}}</el-radio>
              </span>
            </template>
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
      <!--开票信息-->
      <el-tab-pane label="开票信息" name="thirdOne">
        <div class="input-div">
          <el-row>
            <el-col :span="5" class="el-col">
              <label>纳税人分类</label>
              <el-select v-model="baseInfo.custTaxType" class="el-selects" placeholder="请选择" clearable>
                <el-option v-for="(item, index) in custTypeDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>电话</label>
              <el-input v-model="baseInfo.custTelephone" class="el-inputs"></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label class="text_too_long">纳税人识别号</label>
              <el-input v-model="baseInfo.custTaxNo" class="el-inputs"></el-input>
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
              <el-input v-model="baseInfo.invoiceRemark" class="el-inputs"></el-input>
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
    <!--公司弹窗-->
    <company-select v-if="companyShow" :tipShow="companyShow" :ztz="0" @tipsCancle="companyCancel" @tipsSure="companySure"></company-select>
    <!--部门弹窗-->
    <branch-select v-if="branchShow" :tipShow="branchShow" :data="baseInfo.bbCustomerBranchList[0]" :departztz="0" @departmentCancle="branchCancel" @departmentSure="branchSure"></branch-select>
    <!--业务员弹窗-->
    <staff-select v-if="staffShow" :tipShow="staffShow" @staffCancle="staffCancel" @staffSure="staffSure"></staff-select>
    <!--信用账户组弹窗-->
    <creditGroup-select :isShow="creditGroupShow" @callback="creditGroupSelectData"></creditGroup-select>
    <!--母公司弹窗-->
    <customer-select v-if="customerShow" :tipShow="customerShow" :filterQuery="parentFilter" @customerCancle="customerCancel" @customerSure="customerSure"></customer-select>
    <!--银行信息弹窗-->
    <bankPopup :isShow="bankPopupShow" @callback="bankPopupData"></bankPopup>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { linkTypeObj } from "@/api/dictionary";
import CustomerApi from "@/api/basicData/customer";
import companySelect from "@/components/componySelect";
import branchSelect from "@/components/departmentSelect";
import staffSelect from "@/components/staffSelect";
import creditGroupSelect from "@/components/creditGroupSelect";
import customerSelect from "@/components/customerSelect";
import bankPopup from "@/components/bankPopup";
export default {
  name: "customerEdit",
  data() {
    return {
      errorKey: [],
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
      isUpdate: false,
      parentFilter: {
        isSubsidiary: 0 //只过滤出母公司客户
      },
      baseInfo: {
        //头部信息
        bbCustomerBranchList: [{
          companyId: "",
          companyCode: "",
          companyName: "",
          orgId: "",
          orgCode: "",
          orgName: ""
        }],
        isInactive: "0",
        customerType: "",
        //基础信息
        customerCode: "",
        countryId: "",
        countryName: "",
        provinceId: "",
        provinceName: "",
        customerName: "",
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
        // accountGroup: "",
        creditGroupCode: "",
        creditGroupName: "",
        industry: "",
        isSubsidiary: false,
        parentId: "",
        parentName: "",
        remark: "",
        //通讯
        bbCustomerLinkList: [],
        //银行信息
        bbCustomerBankList: [],
        //开票信息
        custTaxType: "",
        custTelephone: "",
        custTaxNo: "",
        bankCode: "",
        bankNumber: "",
        bankName: "",
        bankAddress: "",
        invoiceRemark: "",
        invoiceAddress: "",
        custSideType:'',//客户分类
      },
      //头部信息字典
      companyShow: false, //是否显示公司弹窗
      branchShow: false, //是否显示部门弹窗
      isInactiveDic: [
        {value: "0", label: "启用"},
        {value: "1", label: "禁用"}
      ],
      customerTypeDic: [],
      //基础信息字典
      isListed: false,
      isSubsidiary: false,
      iscustomer:false,
      isMust: false,
      countryDic: [],
      provinceDic: [],
      cityDic: [],
      countyDic: [],
      staffShow: false, //是否显示业务员弹窗
      companyTypeDic: [],
      accountGroupDic: [],
      creditGroupShow: false, //是否显示信用账户组弹窗
      customerShow: false, //是否显示母公司弹窗
      limitTime: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      //通讯字典
      linkIndex: null, //通讯列表选中下标
      linkTypeDic: [],
      //银行信息单选字段
      bankIndex: null, //银行信息列表选中下标
      bankPopupShow: false, //是否显示银行信息弹窗
      invoiceSingle: 0,
      invoiceOld: 0,
      collectionSingle: 0,
      collectionOld: 0,
      bankOnly: 1, //开票、收款银行选择唯一
      //开票信息字典
      custTypeDic: [],
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      custSideTypeList:[],
     
    };
  },
  created() {
    //客户类型字典数据
    this.customerTypeData();
    //客户分类字典值
    this.custSideTypeData();
    //省市区查询
    this.getAreaData(0);
    //公司类型字典数据
    this.companyTypeData();
    //账户组字典数据
    this.accountGroupData();
    //联系人类型字典数据
    this.linkTypeData();
    //纳税人分类字典数据
    this.custTypeData();
    //获取客户详情
    if (this.$route.query.id) {
      this.isUpdate = true;
      this.parentFilter.notEqual = this.$route.query.id;
      this.customerDetail();
    }
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor = "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    //获取客户详情
    customerDetail() {
      //客户主数据
      CustomerApi.customerGet({
        id: this.$route.query.id
      }).then(res => {
        Object.assign(this.baseInfo, res.data);
        this.baseInfo.isInactive += ""; //客户状态
        this.baseInfo.customerType += ""; //客户类型
        //获取省市区
        this.getArea(1, this.baseInfo.countryId);
        this.getArea(2, this.baseInfo.provinceId);
        this.getArea(3, this.baseInfo.cityId);
        this.isListed = this.baseInfo.isListed == 1 ? true : false; //是否上市公司
        this.isSubsidiary = this.baseInfo.isSubsidiary == 1 ? true : false; //是否为子公司
        this.addvalue=String(this.baseInfo.isCustomerRalated)
        this.baseInfo.companyType += ""; //公司类型
        if (this.baseInfo.companyType == "null") {
          this.baseInfo.companyType = "";
        }
        // this.baseInfo.accountGroup += ""; //账户组
        // if (this.baseInfo.accountGroup == "null") {
        //   this.baseInfo.accountGroup = "";
        // }
        //开票信息
        this.baseInfo.custTaxType += ""; //纳税人分类
        if (this.baseInfo.custTaxType == "null") {
          this.baseInfo.custTaxType = "";
        }
      }).catch();
      //客户通讯数据
      CustomerApi.customerLinkGet({
        customerId: this.$route.query.id
      }).then(res => {
        this.baseInfo.bbCustomerLinkList = res.data;
        this.baseInfo.bbCustomerLinkList.forEach(item => {
          item.linkType += ""; //联系人类型
          if (item.linkType == "null") {
            item.linkType = "";
          }
          linkTypeObj.forEach(item1 => {
            if (item.linkType == item1.dict_code) item.linkTypeStr = item1.dict_value;
          });
        });
      }).catch();
      //客户银行数据
      CustomerApi.customerBankGet({
        customerId: this.$route.query.id
      }).then(res => {
        this.baseInfo.bbCustomerBankList = res.data;
        this.baseInfo.bbCustomerBankList.forEach((item, key) => {
          item.bankOnly = this.bankOnly++;
          if (item.isMakeInvoice == 1) { //是否开票银行
            this.invoiceSingle = key + 1;
          }
          if (item.isCollectionBank == 1) { //是否收款银行
            this.collectionSingle = key + 1;
          }
        });
        if (this.invoiceSingle > 0) {
          let row = this.baseInfo.bbCustomerBankList[this.invoiceSingle - 1];
          this.baseInfo.bankCode = row.bankCode;
          this.baseInfo.bankNumber = row.bankAccount;
          this.baseInfo.bankName = row.bankName;
          this.baseInfo.bankAddress = row.bankAddress;
        }
      }).catch();
      //客户公司部门数据
      CustomerApi.customerBranchGet({
        customerId: this.$route.query.id
      }).then(res => {
        if (res.data && res.data.length > 0) {
          this.baseInfo.bbCustomerBranchList = res.data;
        }
      }).catch();
    },
    //获取省市区
    getArea(e, id) {
      CustomerApi.areaList({
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
    //客户类型字典数据
    customerTypeData() {
      CustomerApi.dicQuery({
        dictNo: 1009
      }).then(res => {
        this.customerTypeDic = res.data;
      }).catch();
    },
     //客户分类字典数据
    custSideTypeData() {
      CustomerApi.dicQuery({
        dictNo: 1168
      }).then(res => {
        this.custSideTypeList = res.data;
      }).catch();
    },
    //省市区查询
    getAreaData(e, type) {
      CustomerApi.areaList({
        regionId: e
      }).then(res => {
        switch (type) {
          case 1:
            this.provinceDic = res.data;
            this.cityDic = [];
            this.countyDic = [];
            this.baseInfo.provinceId = "";
            this.baseInfo.cityId = "";
            this.baseInfo.countyId = "";
            this.baseInfo.provinceName = "";
            this.baseInfo.cityName = "";
            this.baseInfo.countyName = "";
            let obj1 = {};
            obj1 = this.countryDic.find(item => {
              return item.regionId == e;
            });
            this.baseInfo.countryName = obj1.regionName;
          break;
          case 2:
            this.cityDic = res.data;
            this.countyDic = [];
            this.baseInfo.cityId = "";
            this.baseInfo.countyId = "";
            this.baseInfo.cityName = "";
            this.baseInfo.countyName = "";
            let obj2 = {};
            obj2 = this.provinceDic.find(item => {
              return item.regionId == e;
            });
            this.baseInfo.provinceName = obj2.regionName;
          break;
          case 3:
            this.countyDic = res.data;
            this.baseInfo.countyId = "";
            this.baseInfo.countyName = "";
            let obj3 = {};
            obj3 = this.cityDic.find(item => {
              return item.regionId == e;
            });
            this.baseInfo.cityName = obj3.regionName;
          break;
          default:
            this.countryDic = res.data;
          break;
        }
      }).catch();
    },
    //选择区县
    getCountyData(e) {
      let obj = {};
      obj = this.countyDic.find(item => {
        return item.regionId == e;
      });
      this.baseInfo.countyName = obj.regionName;
    },
    //修改注册地址时同步修改开票地址
    changeInvoiceAddress(value) {
      this.baseInfo.invoiceAddress = value;
    },
    //公司类型字典数据
    companyTypeData() {
      CustomerApi.dicQuery({
        dictNo: 1006
      }).then(res => {
        this.companyTypeDic = res.data;
      }).catch();
    },
    //账户组字典数据
    accountGroupData() {
      CustomerApi.dicQuery({
        dictNo: 1007
      }).then(res => {
        this.accountGroupDic = res.data;
      }).catch();
    },
    //联系人类型字典数据
    linkTypeData() {
      CustomerApi.dicQuery({
        dictNo: 1003
      }).then(res => {
        this.linkTypeDic = res.data;
      }).catch();
    },
    //选择联系人类型时同步修改linkTypeStr字段
    changeLinkTypeStr(row) {
      this.linkTypeDic.forEach(item => {
        if (row.linkType == item.dict_code) row.linkTypeStr = item.dict_value;
      });
    },
    //纳税人分类字典数据
    custTypeData() {
      CustomerApi.dicQuery({
        dictNo: 1004
      }).then(res => {
        this.custTypeDic = res.data;
      }).catch();
    },
    //保存
    save() {
      this.errorKey = [];
     if (this.baseInfo.bbCustomerBranchList[0].companyId == "") {
       this.errorKey.push('companyId');
      }
      if (this.baseInfo.bbCustomerBranchList[0].orgId == "") {
       this.errorKey.push('orgId');
      }
      if (this.baseInfo.customerType == "") {
       this.errorKey.push('customerType');
      }
      if (this.baseInfo.customerName == "") {
       this.errorKey.push('customerName');
      }
      if (this.baseInfo.address == "") {
       this.errorKey.push('address');
      }
      if (this.isMust && this.baseInfo.parentId == "") {
       this.errorKey.push('parentId');
      }
      if (this.addvalue == "") {
       this.errorKey.push('addvalue');
      }
      if (!this.baseInfo.custSideType) {
       this.errorKey.push('custSideType');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning('请将必填项补充完整！');
        return false;
      }


      let isOK = true;
      let message = "";
      this.baseInfo.bbCustomerLinkList.forEach(item => {
        if (item.linkMan == "") {
          message = "联系人不能为空";
          isOK = false;
          return false;
        }
        if (item.fixedTelephone == "" && item.mobilePhone == "") {
          message = "固定电话和移动电话不能同时为空";
          isOK = false;
          return false;
        }
      });
      if (isOK) {
        this.baseInfo.bbCustomerBankList.forEach(item => {
          if (item.bankAccount == "") {
            message = "银行账号不能为空";
            isOK = false;
            return false;
          }
        });
      }
      if (!isOK) {
        this.$openWarning(message);
        return false;
      }
      if (this.baseInfo.bankCode != "" && this.baseInfo.custTaxType == "") {
        this.$openWarning("纳税人分类不能为空");
        return false;
      }
      if (this.baseInfo.bankCode != "" && this.baseInfo.custTaxNo == "") {
        this.$openWarning("纳税人识别号不能为空");
        return false;
      }
      if (this.baseInfo.invoiceAddress == "") {
        this.$openWarning("开票地址不能为空");
        return false;
      }
      this.baseInfo.isListed = this.isListed == true ? 1 : 0;
      this.baseInfo.isSubsidiary = this.isSubsidiary == true ? 1 : 0;
      this.baseInfo.isCustomerRalated=this.addvalue;
      this.$confirm("是否确定保存？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      }).then(() => {
        if (this.$route.query.id) {
          CustomerApi.customerUpdate(this.baseInfo).then(res => {
            if (res.code == "success") {
              this.$openSuccess(res.message);
              this.$router.push({name: "customer"});
            } else {
              this.$openWarning(res.message);
            }
          }).catch();
        } else {
          CustomerApi.customerInsert(this.baseInfo).then(res => {
            if (res.code == "success") {
              this.$openSuccess(res.message);
              this.$router.push({name: "customer"});
            } else {
              this.$openWarning(res.message);
            }
          }).catch();
        }
      });
    },
    //取消
    goBack() {
      this.$router.push({name: "customer"});
    },
    //公司弹窗
    companyPopup() {
      this.companyShow = true;
    },
    //公司弹窗关闭
    companyCancel() {
      this.companyShow = false;
    },
    //公司弹窗确定并传值
    companySure(e) {
      this.companyShow = false;
      this.baseInfo.bbCustomerBranchList[0].companyId = e.companyId;
      this.baseInfo.bbCustomerBranchList[0].companyCode = e.companyCode;
      this.baseInfo.bbCustomerBranchList[0].companyName = e.companyName;
      this.baseInfo.bbCustomerBranchList[0].orgId = "";
      this.baseInfo.bbCustomerBranchList[0].orgCode = "";
      this.baseInfo.bbCustomerBranchList[0].orgName = "";
    },
    //部门弹窗
    branchPopup() {
      // if (this.baseInfo.bbCustomerBranchList[0].companyId == "") {
      //   this.$openWarning("请先选择公司");
      //   return false;
      // }
      this.branchShow = true;
    },
    //部门弹窗关闭
    branchCancel() {
      this.branchShow = false;
    },
    //部门弹窗确定并传值
    branchSure(e) {
      this.branchShow = false;
      this.baseInfo.bbCustomerBranchList[0].orgId = e.branchId;
      this.baseInfo.bbCustomerBranchList[0].orgCode = e.branchCode;
      this.baseInfo.bbCustomerBranchList[0].orgName = e.branchName;
    },
    //业务员弹窗
    staffPopup() {
      this.staffShow = true;
    },
    //业务员弹窗关闭
    staffCancel() {
      this.staffShow = false;
    },
    //业务员弹窗确定并传值
    staffSure(e) {
      this.staffShow = false;
      this.baseInfo.salesman = e.empName;
    },
    //信用账户组弹窗
    creditGroupPopup() {
      this.creditGroupShow = true;
    },
    //信用账户组弹窗回调
    creditGroupSelectData(res) {
      if (res) {
        this.baseInfo.creditGroupCode = res.creditGroupCode;
        this.baseInfo.creditGroupName = res.creditGroupName;
      }
      this.creditGroupShow = false;
    },
    //母公司弹窗
    customerPopup() {
      this.customerShow = true;
    },
    //母公司弹窗关闭
    customerCancel() {
      this.customerShow = false;
    },
    //母公司弹窗确定并传值
    customerSure(e) {
      this.customerShow = false;
      this.baseInfo.parentId = e.customerId;
      this.baseInfo.parentName = e.customerName;
    },
    //增加通讯行
    addLink() {
      this.baseInfo.bbCustomerLinkList.forEach(item => {
        item.canEdit = false;
      });
      let newLink = {
        linkMan: "",
        linkType:"",
        linkTypeStr: "",
        fixedTelephone: "",
        mobilePhone: "",
        fax: "",
        email: "",
        canEdit: true
      };
      this.baseInfo.bbCustomerLinkList.unshift(newLink);
      if (this.linkIndex != null) {
        this.linkIndex++;
      }
    },
    //删除通讯行
    deleteLink() {
      if (this.linkIndex == null) {
        this.$openWarning("请选择要删除的数据");
        return false;
      }
      this.$confirm("是否确定删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let row = this.baseInfo.bbCustomerLinkList[this.linkIndex];
        if (row.version || row.version == 0) {
          let params = {
            id: row.customerLinkId,
            version: row.version
          };
          CustomerApi.linkDelete(params).then(res => {
            if (res.code == "success") {
              this.$openSuccess(res.message);
              this.baseInfo.bbCustomerLinkList.splice(this.linkIndex, 1);
            } else {
              this.$openWarning(res.message);
            }
          }).catch();
        } else {
          this.baseInfo.bbCustomerLinkList.splice(this.linkIndex, 1);
        }
      });
    },
    //通讯列表单选
    linkChange(e) {
      if (e.length === 0) {
        this.linkIndex = null;
      }
    },
    linkSelect(selection, row) {
      this.$refs.multipleLink.clearSelection();
      if (selection.length === 0) {
        return;
      }
      if (row) {
        this.$refs.multipleLink.toggleRowSelection(row, true);
        this.linkIndex = this.baseInfo.bbCustomerLinkList.indexOf(row);
      }
    },
    linkSelectRow(e) {
      this.$refs.multipleLink.clearSelection();
      this.$refs.multipleLink.toggleRowSelection(e, true);
      this.linkIndex = this.baseInfo.bbCustomerLinkList.indexOf(e);
    },
    //通讯列表双击编辑行
    linkDblclick(e) {
      this.baseInfo.bbCustomerLinkList.forEach(item => {
        item.canEdit = e == item ? true : false;
      });
      this.$set(this.baseInfo.bbCustomerLinkList, this.baseInfo.bbCustomerLinkList.indexOf(e), e);
    },
    //增加银行信息行
    addBank() {
      this.bankPopupShow = true;
    },
    //银行信息弹窗回调
    bankPopupData(res) {
      if (res) {
        this.baseInfo.bbCustomerBankList.forEach(item => {
          item.canEdit = false;
        });
        let newBank = {
          bankCode: res.bankCode,
          bankName: res.bankName,
          bankAccount: "",
          bankAddress: res.bankAddress,
          isMakeInvoice: 0,
          isCollectionBank: 0,
          remark: "",
          bankOnly: this.bankOnly++,
          canEdit: true,
          bankSwiftCode:res.bankSwiftCode
        };
        this.baseInfo.bbCustomerBankList.unshift(newBank);
        if (this.bankIndex != null) {
          this.bankIndex++;
        }
      }
      this.bankPopupShow = false;
    },
    //删除银行信息行
    deleteBank() {
      if (this.bankIndex == null) {
        this.$openWarning("请选择要删除的数据");
        return false;
      }
      this.$confirm("是否确定删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let row = this.baseInfo.bbCustomerBankList[this.bankIndex];
        if (row.version || row.version == 0) {
          let params = {
            id: row.customerBankId,
            version: row.version
          };
          CustomerApi.bankDelete(params).then(res => {
            if (res.code == "success") {
              this.$openSuccess(res.message);
              this.baseInfo.bbCustomerBankList.splice(this.bankIndex, 1);
              if (row.bankOnly == this.invoiceSingle) {
                this.baseInfo.bankCode = "";
                this.baseInfo.bankNumber = "";
                this.baseInfo.bankName = "";
                this.baseInfo.bankAddress = "";
              }
            } else {
              this.$openWarning(res.message);
            }
          }).catch();
        } else {
          this.baseInfo.bbCustomerBankList.splice(this.bankIndex, 1);
          if (row.bankOnly == this.invoiceSingle) {
            this.baseInfo.bankCode = "";
            this.baseInfo.bankNumber = "";
            this.baseInfo.bankName = "";
            this.baseInfo.bankAddress = "";
          }
        }
      });
    },
    //银行信息列表单选
    bankChange(e) {
      if (e.length === 0) {
        this.bankIndex = null;
      }
    },
    bankSelect(selection, row) {
      this.$refs.multipleBank.clearSelection();
      if (selection.length === 0) {
        return;
      }
      if (row) {
        this.$refs.multipleBank.toggleRowSelection(row, true);
        this.bankIndex = this.baseInfo.bbCustomerBankList.indexOf(row);
      }
    },
    bankSelectRow(e) {
      this.$refs.multipleBank.clearSelection();
      this.$refs.multipleBank.toggleRowSelection(e, true);
      this.bankIndex = this.baseInfo.bbCustomerBankList.indexOf(e);
    },
    //银行信息列表双击编辑行
    bankDblclick(e) {
      this.baseInfo.bbCustomerBankList.forEach(item => {
        item.canEdit = e == item ? true : false;
      });
      this.$set(this.baseInfo.bbCustomerBankList, this.baseInfo.bbCustomerBankList.indexOf(e), e);
    },
    //是否开票银行单选
    clickInvoice(e) {
      this.invoiceOld = this.invoiceSingle;
      e === this.invoiceSingle ? this.invoiceSingle = 0 : this.invoiceSingle = e;
    },
    invoiceRadio(row) {
      if (row.bankOnly == this.invoiceOld) {
        this.baseInfo.bankCode = "";
        this.baseInfo.bankNumber = "";
        this.baseInfo.bankName = "";
        this.baseInfo.bankAddress = "";
        this.baseInfo.bbCustomerBankList.forEach(item => {
          item.isMakeInvoice = 0;
        });
      } else {
        this.baseInfo.bankCode = row.bankCode;
        this.baseInfo.bankNumber = row.bankAccount;
        this.baseInfo.bankName = row.bankName;
        this.baseInfo.bankAddress = row.bankAddress;
        this.baseInfo.bbCustomerBankList.forEach(item => {
          item.isMakeInvoice = row == item ? 1 : 0;
        });
      }
    },
    //是否收款银行单选
    clickCollection(e) {
      this.collectionOld = this.collectionSingle;
      e === this.collectionSingle ? this.collectionSingle = 0 : this.collectionSingle = e;
    },
    collectionRadio(row) {
      if (row.bankOnly == this.collectionOld) {
        this.baseInfo.bbCustomerBankList.forEach(item => {
          item.isCollectionBank = 0;
        });
      } else {
        this.baseInfo.bbCustomerBankList.forEach(item => {
          item.isCollectionBank = row == item ? 1 : 0;
        });
      }
    },
    //监听开票银行中银行账号的变化
    updateBankNumber(row) {
      if (row.isMakeInvoice == 1) { //是开票银行
        this.baseInfo.bankNumber = row.bankAccount;
      }
    }
  },
  computed: {
    ...mapState({
      themecolor: "themecolor"
    })
  },
  watch: {
    isSubsidiary(val) { //是否为子公司若选择是，母公司必填
      this.isMust = val;
      if (!val) {
        this.baseInfo.parentId = "";
        this.baseInfo.parentName = "";
      }
    },
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      }
    }
  },
  components: {
    companySelect,
    branchSelect,
    staffSelect,
    creditGroupSelect,
    customerSelect,
    bankPopup
  }
};
</script>
<style lang="scss">
#customerEdit {
  .el-row {
    margin-left: 10px;
  }
  .el-col {
    position: relative;
    margin: 0;
    padding: 8px 0 10px 10px;
    .moreIcon {
      width: 70%;
      height: 24px;
      position: absolute;
      top: 8px;
      right: 0;
      padding: 4px 5px;
      cursor: pointer;
    }
  }
  .is-disabled {
    .el-input__inner {
      color: #666;
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
  .edit-info .el-input__inner {
    height: 24px;
    margin: 8px 0;
  }
}
</style>