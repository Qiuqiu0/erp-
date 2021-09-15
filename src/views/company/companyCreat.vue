<template>
  <div id="companyCreat" class="content-div2">
    <div class="button-div">
      <el-button @click="gotomain" v-show="inputbutton" icon="el-icon-suitcase"
        >保存</el-button
      >
      <el-button @click="gotomains" v-show="inputbutton" icon="el-icon-close"
        >取消</el-button
      >
      <el-button @click="gotomains" v-show="!inputbutton" icon="el-icon-back"
        >返回</el-button
      >
    </div>
    <!-- input -->
    <div class="input-div index-div">
      <el-col :span="5" class="el-col el-col-required">
        <label><span style="color:red">*</span>公司代码</label>
        <el-input
          v-model="comdm"
          class="el-inputs"
          :class="errorKey.includes('comdm') ? 'inputRed' : ''"
          placeholder="请输入"
          @input="handleUnitCodeRule(comdm)"
          :disabled="this.types === 'creat' ? false : true"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label><span style="color:red">*</span>公司名称</label>
        <el-input
          v-model="commc"
          class="el-inputs"
          :class="errorKey.includes('commc') ? 'inputRed' : ''"
          placeholder="请输入"
          :disabled="inputdisplay"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>公司简称</label>
        <el-input
          v-model="comjc"
          class="el-inputs"
          :placeholder="this.types==='look'?'':'请输入'"
          :disabled="inputdisplay"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>英文名称</label>
        <el-input
          v-model="companyNameEn"
          class="el-inputs"
          :placeholder="this.types==='look'?'':'请输入'"
          :disabled="inputdisplay"
        ></el-input>
      </el-col>
    </div>
    <!-- tab切换栏 -->
    <el-tabs type="card" v-model="activeName">
      <el-tab-pane label="基础信息" name="first">
        <!-- 地址信息选择 -->
        <div class="input-div index-div">
          <el-col :span="5" class="el-col el-col-required">
            <label><span style="color:red">*</span>本位币</label>
              <el-input
                v-model="currency.currencyName"
                class="el-inputs"
                :class="errorKey.includes('currency') ? 'inputRed' : ''"
                placeholder="请选择"
                disabled
              ></el-input>
              <span class="comicon" @click="coinTip"
                ><i class="el-icon-search"></i
              ></span>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>国家</label>
            <el-select
              filterable
              v-model="form.country"
              :placeholder="this.types==='look'?'':'请选择国家'"
              @change="countrychange"
              :disabled="inputdisplay"
            >
              <el-option
                v-for="item in country"
                :key="item.regionId"
                :label="item.regionName"
                :value="item.regionName"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>省份</label>
            <el-select
              filterable
              v-model="form.province"
              :placeholder="this.types==='look'?'':'请选择省份'"
              @change="provincechange"
              :disabled="inputdisplay"
            >
              <el-option
                v-for="item in province"
                :key="item.regionId"
                :label="item.regionName"
                :value="item.regionName"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>城市</label>
            <el-select
              filterable
              v-model="form.city"
              :placeholder="this.types==='look'?'':'请选择城市'"
              @change="citychange"
              :disabled="inputdisplay"
            >
              <el-option
                v-for="item in city"
                :key="item.regionId"
                :label="item.regionName"
                :value="item.regionName"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>区县</label>
            <el-select
              filterable
              v-model="form.county"
              :placeholder="this.types==='look'?'':'请选择区县'"
              @change="countychange"
              :disabled="inputdisplay"
            >
              <el-option
                v-for="item in county"
                :key="item.regionId"
                :label="item.regionName"
                :value="item.regionName"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>地址</label>
            <el-input
              v-model="form.address"
              :disabled="inputdisplay"
              class="el-inputs"
              :placeholder="this.types==='look'?'':'请输入'"
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>英文地址</label>
            <el-input
              v-model="form.englishAddress"
              :disabled="inputdisplay"
              class="el-inputs"
              :placeholder="this.types==='look'?'':'请输入'"
            ></el-input>
          </el-col>
        </div>
        <!-- 通讯表格 -->
        <div class="button-div">
          <el-button @click="teladd" v-show="inputbutton" icon="el-icon-plus"
            >增加</el-button
          >
          <el-button
            @click="telreduce"
            v-show="inputbutton"
            icon="el-icon-minus"
            >删除</el-button
          >
          <!-- </div> -->
        </div>
        <div>
          <el-table
            :data="tableData"
            border
            max-height="278"
            style="width: 100%"
            ref="multipleTable"
            @selection-change="handleChange"
            @row-dblclick="dblclick"
            @select-all="dialogCheck"
            @select="dialogCheck"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              label="联系人"
              prop="linkMan"
              show-overflow-tooltip
            >
              <template scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.linkMan"
                  placeholder="请输入内容"
                  v-if="scope.row.edit"
                ></el-input>
                <span v-else>{{ scope.row.linkMan }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="联系人类型"
              prop="linkType"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.linkType"
                  placeholder="请选择"
                  size="mini"
                  v-if="scope.row.edit"
                  clearable
                >
                  <el-option
                    v-for="item in contacts"
                    :key="item.dict_code"
                    :label="item.dict_value"
                    :value="item.dict_value"
                  >
                  </el-option>
                </el-select>
                <span v-else>{{ scope.row.linkType }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="fixedTelephone"
              label="固定电话"
              show-overflow-tooltip
            >
              <template scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.fixedTelephone"
                  placeholder="请输入内容"
                  v-if="scope.row.edit"
                ></el-input>
                <span v-else>{{ scope.row.fixedTelephone }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="mobilePhone"
              label="移动电话"
              show-overflow-tooltip
            >
              <template scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.mobilePhone"
                  placeholder="请输入内容"
                  v-if="scope.row.edit"
                ></el-input>
                <span v-else>{{ scope.row.mobilePhone }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="fax" label="传真" show-overflow-tooltip>
              <template scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.fax"
                  placeholder="请输入内容"
                  v-if="scope.row.edit"
                ></el-input>
                <span v-else>{{ scope.row.fax }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="email" label="E-mail" show-overflow-tooltip>
              <template scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.email"
                  placeholder="请输入内容"
                  v-if="scope.row.edit"
                ></el-input>
                <span v-else>{{ scope.row.email }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="银行信息" name="second">
        <div class="button-div">
          <el-button @click="bankadd" v-show="inputbutton" icon="el-icon-plus"
            >增加</el-button
          >
          <el-button
            @click="bankreduce"
            v-show="inputbutton"
            icon="el-icon-minus"
            >删除</el-button
          >
        </div>
        <!-- </div> -->
        <div>
          <el-table
            :data="bankmsg"
            border
            max-height="760"
            style="width: 100%"
            @selection-change="bankChange"
            @row-dblclick="bankclick"
            @select-all="dialogChecks"
            @select="dialogChecks"
            ref="multipleTables"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              label="国家"
              prop="countryName"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="银行编码"
              prop="bankCode"
              show-overflow-tooltip
            >
              <template scope="scope">
                <div v-if="scope.row.edit">
                  <el-input
                    size="small"
                    v-model="scope.row.bankCode"
                    disabled
                    placeholder=""
                  ></el-input>
                  <span class="comicon2" @click="alerttg(scope.$index)"
                    ><i class="el-icon-search"></i
                  ></span>
                </div>
                <span v-else>{{ scope.row.bankCode }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="银行名称"
              prop="bankName"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="银行账号"
              prop="bankAccount"
              show-overflow-tooltip
            >
              <template scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.bankAccount"
                  placeholder=""
                  v-if="scope.row.edit"
                  @change="zhchange(scope.$index)"
                ></el-input>
                <span v-else>{{ scope.row.bankAccount }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="账号标识"
              prop="accountIdentity"
              show-overflow-tooltip
            >
              <template scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.accountIdentity"
                  placeholder=""
                  v-if="scope.row.edit"
                  @change="zhchange(scope.$index)"
                ></el-input>
                <span v-else>{{ scope.row.accountIdentity }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="银行地址"
              prop="bankAddress"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column label="是否开票银行" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.isMakeInvoice"
                  @change="ismakechange(scope.$index, scope.row)"
                  placeholder="请选择"
                  size="mini"
                  v-if="scope.row.edit"
                >
                  <el-option
                    v-for="item in bankkp"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
                <span v-else>{{ scope.row.isMakeInvoice }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!-- 开票信息 -->
      <el-tab-pane label="开票信息" name="third">
        <div class="input-div index-div">
          <el-col :span="5" class="el-col">
            <label>纳税人分类</label>
            <el-select
              clearable
              v-model="invoice"
              :placeholder="this.types==='look'?'':'请选择'"
              :disabled="inputdisplay"
              class="el-select"
              size="mini"
            >
              <el-option
                v-for="item in options"
                :key="item.dict_value"
                :label="item.dict_value"
                :value="item.dict_value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>电话</label>
            <el-input
              v-model="custTelephone"
              class="el-inputs"
              :disabled="inputdisplay"
              :placeholder="this.types==='look'?'':'请输入'"
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>纳税人识别号</label>
            <el-input
              v-model="custTaxNo"
              class="el-inputs"
              :disabled="inputdisplay"
              :placeholder="this.types==='look'?'':'请输入'"
            >
            </el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>银行编码</label>
            <el-input
              v-model="banksCode"
              class="el-inputs"
              :placeholder="this.types==='look'?'':'请输入'"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>银行账号</label>
            <el-input
              v-model="banksAccount"
              class="el-inputs"
              :placeholder="this.types==='look'?'':'请输入'"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>银行名称</label>
            <el-input
              v-model="banksName"
              class="el-inputs"
              :placeholder="this.types==='look'?'':'请输入'"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>银行地址</label>
            <el-input
              v-model="banksAddr"
              class="el-inputs"
              :placeholder="this.types==='look'?'':'请输入'"
              disabled
            ></el-input>
          </el-col>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--银行信息弹窗-->
    <bankPopup :isShow="bankPopupShow" @callback="bankPopupData"></bankPopup>
    <!--审核弹窗 开始-->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="examineShow"
      :show-close="false"
      title="选择结转日期"
      width="400px"
      class="popup_box"
    >
      <div class="examine-dialog">
        <el-col>
          <label>结转日期</label>
          <el-date-picker
            value-format="yyyy-MM-dd"
            class="el-input2"
            v-model="creattime"
            type="daterange"
            size="mini"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-col>
      </div>
      <div class="button-div2">
        <el-button @click="examineSure" icon="el-icon-check">确定</el-button>
        <el-button @click="examineCancle" icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
    <!--审核弹窗 结束-->
    <!-- 选择币种弹窗 -->
    <coin-select
      v-if="coinShow"
      :tipShow="coinShow"
      @coinCancle="coinCancle"
      @coinSure="coinSure"
    ></coin-select>
  </div>
</template>

<script>
import axios from "axios";
import { service, serviceJson } from "../../axios/index.js";
import {
  getAdress,
  standardCurrency,
  taxPayer,
  creatMsg,
  getmoremsg,
  removepeople,
  removebank,
  gettablemsg,
  gettelmsg
} from "@/api/company/companycreat.js";
import bankPopup from "@/components/bankPopup";
import coinSelect from "@/components/coinSelect.vue"; //业务币种
export default {
  name: "companyCreat",
  props: [],
  data() {
    return {
      errorKey: [],
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      form: {
        country: "",
        province: "",
        city: "",
        county: "",
        address: "",
        englishAddress: ""
      },
      inputdisplay: false,
      inputbutton: false,
      msgid: "",
      examineShow: false, //结转日期弹框
      creattime: [], //创建时间
      bankPopupShow: false, //是否显示银行信息弹窗
      coinShow: false, //币种弹窗
      currency: "", //本位币
      countryId: "", //地区联动参数 国家
      provinceId: "", //地区联动参数 国家
      cityId: "", //地区联动参数 国家
      areaId: "", //地区联动参数 国家
      country: [], //选择国家
      province: [], //选择省份
      city: [], //选择城市信息
      county: [], //选择区县信息
      talindex: "", //记录通讯删除时选中表格的数据
      telreduces: [], //记录通讯表格选中信息
      bankreduces: [], //记录银行表格删除选中信息
      alertindex: "", //记录弹框修改的索引
      contacts: [], //联系人分类下拉列表
      options: [], //纳税人分类下拉列表
      invoice: "", //纳税人分类信息
      invoiceid: "", //纳税人分类id
      custTelephone: "", //电话
      custTaxNo: "", //开票人识别号
      banksCode: "", //开票银行编码
      banksAccount: "", //开票银行账号
      banksName: "", //开票银行名称
      banksAddr: "", //开票银行地址
      comdm: "",
      commc: "",
      comjc: "",
      companyNameEn: "",
      activeName: "first",
      bankindex: "", //银行记录索引
      tableData: [], //通讯表格数据
      conturymsg: {}, //地理信息
      version: "", //版本号
      bankkp: [
        {
          //是否开票
          value: 1,
          label: "是"
        },
        {
          value: 2,
          label: "否"
        }
      ],
      bankselect: "",
      bankmsg: [], //银行信息数据列表
      types: true //判断是创建查看还是编辑
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.types = this.$route.query.data;
    this.msgid = this.$route.query.msgid;
    this.inputdisplay = this.types === "look" ? true : false;
    this.inputbutton = this.types === "look" ? false : true;
    this.getcountry();
    this.getTaxpayer();
    this.getContacts();
    if (this.msgid) {
      this.getallList();
      this.getBankMsg();
    }
  },
  watch: {},
  methods: {
    handleUnitCodeRule (value) {
      value = value.replace(/[^\w^\.]+/g, '').replace('.', '')
      this.comdm = value
    },
    //币种弹窗打开
    coinTip() {
      if (this.inputdisplay) {
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
      this.currency = e;
    },
    getallList() {
      axios
        .all([
          getmoremsg({ companyId: this.msgid }),
          gettelmsg({ companyId: this.msgid })
        ])
        .then(
          axios.spread((allGetmoremsg, allGettelmsg) => {
            this.comdm = allGetmoremsg.data.companyCode;
            this.commc = allGetmoremsg.data.companyName;
            this.comjc = allGetmoremsg.data.companyShort;
            this.form.country = allGetmoremsg.data.countryName;
            this.form.province = allGetmoremsg.data.provinceName;
            this.form.city = allGetmoremsg.data.cityName;
            this.form.county = allGetmoremsg.data.countyName;
            this.countryId = allGetmoremsg.data.countryId;
            this.provinceId = allGetmoremsg.data.provinceId;
            this.cityId = allGetmoremsg.data.cityId;
            this.areaId = allGetmoremsg.data.countyId;
            if(this.countryId!=""){
              this.getprovince();
            }
            if(this.provinceId!=""){
              this.getcity();
            }
            if(this.cityId!=""){
              this.getcounty();
            }
            this.form.address = allGetmoremsg.data.address;
            this.form.englishAddress = allGetmoremsg.data.englishAddress;
            this.currency = {
              currencyCode: allGetmoremsg.data.currencyCode,
              currencyName: allGetmoremsg.data.functionalCurrencyName,
              currencyId: allGetmoremsg.data.functionalCurrencyId
            };
            this.functionalCurrencyName =
              allGetmoremsg.data.functionalCurrencyId;
            this.invoice = allGetmoremsg.data.custTaxName;
            this.custTelephone = allGetmoremsg.data.custTelephone;
            this.custTaxNo = allGetmoremsg.data.custTaxNo;
            this.banksCode = allGetmoremsg.data.banksCode;
            this.banksAccount = allGetmoremsg.data.banksAccount;
            this.banksName = allGetmoremsg.data.banksName;
            this.banksAddr = allGetmoremsg.data.banksAddr;
            this.version = allGetmoremsg.data.version;
            this.companyNameEn = allGetmoremsg.data.companyNameEn;
            allGettelmsg.data.forEach((i, k) => {
              this.contacts.forEach((j, q) => {
                if (i.linkType === parseInt(j.dict_code)) {
                  i.linkType = j.dict_value;
                }
              });
            });
            this.tableData = allGettelmsg.data;
          })
        );
    },
    getInvoice() {
      //获取开票信息
      this.bankmsg.forEach(i => {
        if (i.isMakeInvoice === "是") {
          this.banksAccount = i.bankAccount; //银行账号
          this.banksAddr = i.bankAddress;
          this.banksName = i.bankName;
          this.banksCode = i.bankCode;
        }
      });
    },
    getcreatmsg() {
      //保存数据
      let kbbankmsg = JSON.parse(JSON.stringify(this.bankmsg));
      kbbankmsg.forEach(i => {
        i.isMakeInvoice = i.isMakeInvoice === "是" ? 0 : 1;
      });
      let kbtableData = JSON.parse(JSON.stringify(this.tableData));
      kbtableData.forEach(i => {
        this.contacts.forEach(j => {
          if (i.linkType === j.dict_value) {
            i.linkType = j.dict_code;
          }
        });
      });
      this.options.forEach(i => {
        if (i.dict_value === this.invoice) {
          this.invoiceid = i.dict_code;
        }
      });
      creatMsg({
        startDate: this.creattime[0],
        endDate:this.creattime[1],
        address: this.form.address,
        englishAddress: this.form.englishAddress,
        companyNameEn: this.companyNameEn,
        companyCode: this.comdm,
        companyName: this.commc,
        companyShort: this.comjc,
        countryId: this.form.country===''?'':this.countryId,
        provinceId: this.form.province===''?'':this.provinceId,
        cityId: this.form.city===''?'':this.cityId,
        countyId: this.form.county===''?'':this.areaId,
        countryName: this.form.country,
        provinceName: this.form.province,
        cityName: this.form.city,
        countyName: this.form.county,
        linkList: kbtableData,
        functionalCurrencyId: this.currency.currencyId,
        functionalCurrencyName: this.currency.currencyName,
        currencyCode: this.currency.currencyCode,
        bankList: kbbankmsg,
        custTaxType: this.invoiceid,
        custTelephone: this.custTelephone,
        custTaxNo: this.custTaxNo,
        companyId: this.msgid,
        version: this.version
      }).then(res => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.$router.push({
            name: "companyMan"
          });
        } else {
          this.$openWarning(res.message);
        }
      });
    },
    getcountry() {
      //获取国家下拉信息
      getAdress({
        regionId: "0"
      }).then(res => {
        this.country = res.data;
      });
    },
    getprovince() {
      //获取省份下拉信息
      getAdress({
        regionId: this.countryId
      }).then(res => {
        this.province = res.data;
      });
    },
    getcity() {
      //获取城市下拉信息
      getAdress({
        regionId: this.provinceId
      }).then(res => {
        this.city = res.data;
      });
    },
    getcounty() {
      //获取区县下拉信息
      getAdress({
        regionId: this.cityId
      }).then(res => {
        this.county = res.data;
      });
    },
    countrychange(e) {
      //国家下拉选择后
      this.country.forEach(i => {
        if (i.regionName === e) {
          this.countryId = i.regionId;
        }
      });
      this.form.province = this.form.city = this.form.county = "";
      this.getprovince();
    },
    provincechange(e) {
      // 省份下拉选择后
      this.province.forEach(i => {
        if (i.regionName === e) {
          this.provinceId = i.regionId;
        }
      });
      this.form.city = this.form.county = "";
      this.getcity();
    },
    citychange(e) {
      // 城市下拉选择后
      this.city.forEach(i => {
        if (i.regionName === e) {
          this.cityId = i.regionId;
        }
      });
      this.form.county = "";
      this.getcounty();
    },
    countychange(e) {
      //区县下拉
      this.county.forEach(i => {
        if (i.regionName === e) {
          this.areaId = i.regionId;
        }
      });
    },
    getTaxpayer() {
      //获取纳税人分类下拉数据
      taxPayer({
        dictNo: 1004
      }).then(res => {
        this.options = res.data;
      });
    },
    getContacts() {
      //联系人分类下拉数据
      taxPayer({
        dictNo: 1003
      }).then(res => {
        this.contacts = res.data;
      });
    },
    gotomain() {
      //保存
      this.errorKey = [];
      if (this.comdm === "") {
        this.errorKey.push('comdm');
      }
      if (this.commc === "") {
        this.errorKey.push('commc');
      }
      if (this.currency === "") {
        this.errorKey.push('currency');
      }
      
      if(this.errorKey.length > 0) {
        this.$openWarning("请将必填项补充完整！");
        return false;
      }
      if (this.banksCode != "" && this.invoice === "") {
        this.$openWarning("请选择纳税人分类信息");
        return;
      }
      if (this.banksCode != "" && this.invoice === null) {
        this.$openWarning("请选择纳税人分类信息");
        return;
      }
      let kbbankmsg = JSON.parse(JSON.stringify(this.bankmsg));
      let bankbm = []; //记录银行编码
      let bankzh = []; //记录银行账号
      kbbankmsg.forEach(i => {
        bankbm.push(i.bankCode);
        bankzh.push(i.bankAccount);
      });
      if (bankbm.indexOf("") != -1) {
        this.$openWarning("请选择银行编码");
        return;
      }
      if (bankzh.indexOf("") != -1) {
        this.$openWarning("请填写银行账号");
        return;
      }
      if (this.types === "creat") {
        this.examineShow = true;
      } else {
        this.getcreatmsg();
      }
    },
    //取消
    examineCancle() {
      this.examineShow = false; //审核弹窗
      this.examineDate = ""; //审核中的出库日期
    },
    //确定
    examineSure() {
      if(this.creattime==null||this.creattime.length==0){
        this.$openWarning("请先选择结转日期");
        return;
      }
     let date1 =new Date(this.creattime[0]);
     let date2 =new Date(this.creattime[1]);
     if(date2.getMonth()-date1.getMonth()>1){
       this.$openWarning("相差月份不能大于2");
       return;
     }
      this.getcreatmsg();
    },
    gotomains() {
      //取消
      this.$router.push({
        name: "companyMan"
      });
    },
    getBankMsg() {
      //获取银行数据
      gettablemsg({ companyId: this.msgid }).then(res => {
        res.data.forEach(i => {
          if (i.isMakeInvoice === 0) {
            i.isMakeInvoice = "是";
          } else if (i.isMakeInvoice === 1) {
            i.isMakeInvoice = "否";
          }
        });
        this.bankmsg = res.data;
      });
    },
    //表格选择
    handleChange(e) {
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    //通讯表格单选
    dialogCheck(selection, row) {
      if (selection.length === 0) {
        // 判断selection是否有值存在
        this.telreduces = [];
        return;
      }
      this.telreduces = row;
      this.$refs.multipleTable.clearSelection();
      if (row) {
        this.selectioned = row;
        this.index = this.tableData.indexOf(row);
        this.talindex = this.index;
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //单行双击(通讯表格)
    dblclick(e) {
      if (this.inputdisplay) {
        return;
      }
      let index = this.tableData.indexOf(e);
      this.tableData.forEach(item => {
        item.edit = false;
      });
      this.tableData[index].edit = true;
      this.$set(this.tableData, index, e);
    },
    //通讯表格增加
    teladd() {
      this.tableData.forEach(item => {
        item.edit = false;
      });
      let obj = {
        linkMan: "",
        linkType: "",
        fixedTelephone: "",
        mobilePhone: "",
        fax: "",
        email: "",
        edit: true
      };
      let newtable = [];
      newtable.unshift(obj);
      this.tableData = newtable.concat(this.tableData);
    },
    //通讯表格删除
    telreduce() {
      if (this.telreduces.length === 0) {
        this.$message({
          message: "请先选择一条数据",
          type: "warning"
        });
        return;
      }
      if (this.telreduces.companyLinkId === undefined) {
        this.tableData.splice(this.talindex, 1);
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.telreduces = [];
      } else {
        this.$confirm("是否确定删除继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let kbtelreduces = JSON.parse(JSON.stringify(this.telreduces));
          this.contacts.forEach(i => {
            if (i.dict_value === kbtelreduces.linkType) {
              kbtelreduces.linkType = i.dict_code;
            }
          });
          removepeople(kbtelreduces).then(res => {
            if (res.code === "success") {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.tableData.splice(this.talindex, 1);
              this.telreduces = [];
            }
          });
        });
      }
    },
    bankChange(e) {
      //银行表格选择
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    bankclick(e) {
      //银行表格双击
      if (this.inputdisplay) {
        return;
      }
      let index = this.bankmsg.indexOf(e);
      this.bankmsg.forEach(item => {
        item.edit = false;
      });
      this.bankmsg[index].edit = true;
      this.$set(this.bankmsg, index, e);
    },
    dialogChecks(selection, row) {
      //银行表格选择
      if (selection.length === 0) {
        // 判断selection是否有值存在
        this.bankreduces = [];
        return;
      }
      this.bankreduces = row;
      this.$refs.multipleTables.clearSelection();
      if (row) {
        this.selectioned = row;
        this.index = this.bankmsg.indexOf(row);
        this.bankindex = this.index;
        this.$refs.multipleTables.toggleRowSelection(row, true);
      }
    },
    bankadd() {
      //银行增加
      this.bankmsg.forEach(item => {
        item.edit = false;
      });
      let obj = {
        countryName: "",
        bankCode: "",
        bankName: "",
        bankAccount: "",
        bankAddress: "",
        edit: true,
        isMakeInvoice: "否"
      };
      let newtable = [];
      newtable.unshift(obj);
      this.bankmsg = newtable.concat(this.bankmsg);
    },
    bankreduce() {
      //银行删除
      if (this.bankreduces.length === 0) {
        this.$message({
          message: "请先选择一条数据",
          type: "warning"
        });
        return;
      }
      if (this.bankreduces.companyBankId === undefined) {
        this.bankmsg.splice(this.bankindex, 1);
        if (this.bankreduces.isMakeInvoice === "是") {
          this.banksAccount = this.banksName = this.banksAddr = this.banksCode =
            "";
        }
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.bankreduces = [];
      } else {
        this.$confirm("是否确定删除继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let kbbankreduces = JSON.parse(JSON.stringify(this.bankreduces));
          kbbankreduces.isMakeInvoice =
            kbbankreduces.isMakeInvoice === "是" ? 0 : 1;
          removebank(kbbankreduces).then(res => {
            if (res.code === "success") {
              this.$message({
                message: res.message,
                type: "success"
              });
              if (kbbankreduces.isMakeInvoice === 0) {
                this.banksAccount = this.banksName = this.banksAddr = this.banksCode =
                  "";
              }
              this.bankmsg.splice(this.bankindex, 1);
              this.bankreduces = [];
            }
          });
        });
      }
    },
    alerttg(a) {
      //点击弹框
      this.alertindex = a;
      this.bankPopupShow = true;
    },
    bankPopupData(res) {
      //银行弹框选择数据后的回调
      this.bankmsg[this.alertindex].countryName = res.countryName;
      this.bankmsg[this.alertindex].bankCode = res.bankCode;
      this.bankmsg[this.alertindex].bankName = res.bankName;
      this.bankmsg[this.alertindex].bankAddress = res.bankAddress;
      this.bankPopupShow = false;
      this.getInvoice();
    },
    zhchange(e) {
      //银行账号发生改变
      if (this.bankmsg[e].isMakeInvoice === "是") {
        this.banksAccount = this.bankmsg[e].bankAccount;
      }
    },
    ismakechange(a, b) {
      //是否开票银行下拉改变
      let bankarr = [];
      this.bankmsg.forEach(i => {
        bankarr.push(i.isMakeInvoice);
      });
      if (bankarr.indexOf("是") === -1) {
        this.bankmsg[a].isMakeInvoice = "是";
        this.$message({
          message: "至少有一条是银行信息",
          type: "warning"
        });
        return;
      }
      this.bankselect = b.isMakeInvoice;
      this.bankmsg.forEach(i => {
        i.isMakeInvoice = "否";
      });
      b.isMakeInvoice = this.bankselect;
      this.getInvoice();
    },
  },
  components: {
    bankPopup,
    coinSelect
  }
};
</script>

<style lang="scss">
#companyCreat {
  .el-range-editor .el-range-input {
    width: 80%;
  }
  .examine-dialog {
      .el-date-editor .el-range__icon {
      margin-left: -2px !important;
    }
  }
  .moneyp {
    border-collapse: separate;
    box-sizing: border-box;
    color: rgb(144, 147, 153);
    display: inline-block;
    font-family: "微软雅黑 Bold", "微软雅黑 Regular", 微软雅黑;
    font-size: 12px;
    font-weight: 700;
    height: 36px;
    line-height: 36px;
    overflow-wrap: normal;
    overflow-x: hidden;
    overflow-y: hidden;
    padding-left: 10px;
    padding-right: 10px;
    position: relative;
    text-align: center;
    text-overflow: ellipsis;
    user-select: none;
    vertical-align: middle;
    white-space: normal;
    width: 149px;
    word-break: break-all;
    -webkit-border-horizontal-spacing: 0px;
    -webkit-border-vertical-spacing: 0px;
    -webkit-box-direction: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    margin: 0 0 0 10px;
  }
  .custom-31478F .el-form-item--mini .el-form-item__label {
    line-height: 26px;
  }
}
.el-form-item--mini .el-form-item__content {
  line-height: 26px !important;
}
.el-form-item--mini .el-form-item__label {
  line-height: 26px !important;
  padding: 0;
}
.el-form-item--mini.el-form-item {
  margin-bottom: 9px;
}
</style>
<style lang="scss" scoped>
.index .index-div {
  .el-inputs,
  .el-date-editor,
  .el-select {
    width: 66% !important;
  }
  label {
    width: 34%;
  }
}
</style>
