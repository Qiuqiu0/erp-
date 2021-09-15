<template>
  <!-- 公司列表 -->
  <div class="paySelect" v-if="tipShow">
    <el-dialog :visible.sync="tipShow" append-to-body  title="付款信息录入页面" :show-close="false" :before-close="payClose"  width="1400px" class="popup_box">
      <div class="index">
        <div class="button-div">
          <el-button class="query-button" @click="payTrue"  icon="el-icon-check">保存</el-button >
          <el-button @click="payClose" icon="el-icon-close">取消</el-button>
        </div>
        <div class="input-div" id="xtridate">
            <el-col :span="5" class="el-col">
              <label>承兑行号</label>
              <el-input
                v-model="acceptanceRowNo"
                class="el-inputs"
                placeholder="请选择"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label><span class="must-full">*</span>开户银行</label>
              <el-input v-model="companyName.bankName" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span class="comicon" @click="companyBankTip"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label><span class="must-full">*</span>账户标识</label>
              <el-input
                v-model="companyName.accountIdentificatio"
                class="el-inputs"
                placeholder="请选择"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>银行账号</label>
              <el-input
                v-model="companyName.bankAccount"
                class="el-inputs"
                disabled
                placeholder="请选择"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>银行科目</label>
              <el-input
                v-model="accountDesc"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
              <span class="comicon" @click="getSubject(1)">
                <i class="el-icon-search"></i>
              </span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>币种</label>
              <el-input v-model="currencyCode" class="el-inputs" placeholder="请选择" disabled></el-input>
              <span class="comicon" v-if="currencyCode" @click="currencyCode = ''">
                  <i class="el-icon-circle-close"></i>
                </span>
              <span class="comicon" @click="coinTip"
                ><i class="el-icon-search"></i
              ></span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label><span class="must-full">*</span>付款标志</label>
              <el-select
                clearable
                v-model="payAccountIdentificatio"
                placeholder="请选择"
                class="el-select"
              >
                <el-option
                  v-for="item in payAccountIdentificatioS"
                  :key="item.dict_code"
                  :label="item.dict_value"
                  :value="item.dict_code"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label><span class="must-full">*</span>付款金额</label>
              <el-input
                v-model="payAmt"
                class="el-inputs"
                placeholder="请输入"
                @input="changefhtype"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label><span class="must-full">*</span>本位币汇率</label>
              <el-input
                v-model="baseCurrencyRate"
                class="el-inputs"
                @input="changefhtype"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>付款金额本位币</label>
              <el-input
                v-model="payAmtBase"
                class="el-inputs"
                placeholder="请输入"
                @input="changefhtype"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label><span class="must-full">*</span>付款日期</label>
              <el-date-picker
                size="mini"
                v-model="payDate"
                type="date"
                placeholder="选择日期"
                value-format="timestamp"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>过账日期</label>
              <el-date-picker
                size="mini"
                v-model="postDate"
                type="date"
                placeholder="选择日期"
                value-format="timestamp"
                disabled
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>过账凭证号</label>
              <el-input
                v-model="postCertCode"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>冲销日期</label>
              <el-date-picker
                size="mini"
                v-model="writeOffDate"
                type="date"
                placeholder="选择日期"
                value-format="timestamp"
                disabled
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>冲销原因</label>
              <el-input
                v-model="writeOffReason"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>冲销凭证号</label>
              <el-input
                v-model="unCertCode"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
            <!-- <el-col :span="5" class="el-col">
              <label>短期借款科目</label>
              <el-input
                v-model="shortBorrowAccount"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
              <span class="comicon" @click="getSubject()">
                <i class="el-icon-search"></i>
              </span>
            </el-col> -->
            <el-col :span="5" class="el-col">
              <label>押汇利息</label>
              <el-input
                v-model="draftProfile"
                @input="draftProfile = $filterPriceNum(draftProfile,2)"
                class="el-inputs"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>还款日期</label>
              <el-date-picker
                size="mini"
                v-model="returnDate"
                type="date"
                placeholder="选择日期"
                value-format="timestamp"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>现金流量码</label>
              <el-input
                v-model="cashCode"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
              <span class="comicon" @click="getFlow()">
                <i class="el-icon-search"></i>
              </span>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>会计年度</label>
              <el-input
                v-model="accountYear"
                class="el-inputs"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-col>
            <el-col :span="5" class="el-col" style="text-align:left">
              <label>虚拟标识</label>
              <el-checkbox v-model="virtualMark">&nbsp;</el-checkbox>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>付款状态</label>
              <el-select
                clearable
                v-model="payStatus"
                placeholder="请选择"
                class="el-select"
                disabled
              >
                <el-option
                  v-for="item in payStatusS"
                  :key="item.dict_code"
                  :label="item.dict_value"
                  :value="item.dict_code"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label required>附件数量</label>
              <el-input
                v-model="attachmentCount"
                v-input-filter:int
                type="number"
                class="el-inputs"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-col>
            <el-col
              :span="20"
              class="el-col"
              style="text-align:left;padding-left:10px;padding-bottom:20px;"
            >
              <label style="width: 8%;text-align:right;">备注</label>
              <el-input
                style="width: 48%;"
                v-model="remark"
                class="el-inputs"
                size="small"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
          </div>
      </div>
      <!-- 选择银行 -->
    <company-bank-popup
      v-if="companyBankShow"
      :companyId="companyId"
      :tipShow="companyBankShow"
      @tipsCancle="companyBankCancle"
      @tipsSure="companyBankSure"
    ></company-bank-popup>
    <!-- 银行科目 -->
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
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  letterStatus,
  parities
} from "@/api/letterManage/openLetter";
import companyBankPopup from "@/components/companyBankPopup.vue";
import coinSelect from "@/components/coinSelect.vue";//币别
import subjectFrame from "@/components/subjectFrame.vue";//科目
import flowCode from "@/components/flowCode.vue";//流量
export default {
  name: "paySelect",
  data() {
    return {
      remark: "", //备注
      companyName: {}, //公司
      coinShow: false, //币别
      companyBankShow: false, //银行
      acceptanceRowNo: "", //承兑行号
      accountDesc:"",//科目描述
      payAccountIdentificatio:"",//付款标志
      payAccountIdentificatioS:[],//付款标志下拉数据
      virtualMark: false,//虚拟标识
      currencyCode:"",//币别
      payAmt:"",//付款金额
      baseCurrencyRate:"",//本位币汇率
      payAmtBase:0,//付款金额本位币
      payDate:"",//付款日期
      postDate:"",//过账日期
      postCertCode:"",//过账凭证号
      writeOffDate:"",//冲销日期
      writeOffReason:"",//冲销原因
      unCertCode:"",//冲销凭证号
      shortBorrowAccount:"",//短期借款科目
      draftProfile:"",//押汇利息
      returnDate:"",//还款日期
      cashCode:"",//现金流量代码
      accountYear:"",//会计年度
      payStatus:"",//付款状态
      attachmentCount:"",//附件数量
      payStatusS:[],//付款状态下拉数据
      table: {}, //表格
      customerId: "", //客户
      createdTime: [], //创建时间
      extCode: "", //外部合同号
      selectioned: null, //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      companyCode: ``, //公司代码
      companyType: ``, //公司类型
      show: true,
      subject:false,//科目
      flow:false,//流量
      flowList:{},//流量数据
      cashFlowCode:"",//流量code
      cashFlowName:"",//流量name
      accountCode:"",//科目code
      accountName:"",//科目name
      subjectIndex:"",//科目区分
      longNumber:""
    };
  },
  props: {
    tipShow: {
      type: Boolean
    },
    companyId: {
      type: String
    },
    list: {
      type: Object
    },
    data: {
      type: Array
    },
    suoYin: {
      type: Number
    },
    currencyCodeID:{
      type: String
    }
  },
  created() {},
  mounted() {
    this.getrkdzt();
    this.getMylxs();
    console.log(this.data);
    console.log(this.list);
    console.log(this.suoYin);
    if(this.data.length>0){
      this.acceptanceRowNo = this.data[this.suoYin].acceptanceRowNo;
      this.remark = this.data[this.suoYin].remark,
      this.companyName.bankCode = this.data[this.suoYin].bankCode,
      this.companyName.bankName = this.data[this.suoYin].bankName,
      this.companyName.bankAccount = this.data[this.suoYin].bankAccount;
      this.companyName.accountIdentificatio = this.data[this.suoYin].accountIdentificatio;
      this.payAccountIdentificatio = this.data[this.suoYin].payAccountIdentificatio;
      if(this.data[this.suoYin].virtualMark==1){
        this.virtualMark =true
      }else{
        this.virtualMark=false
      }
      if(this.data[this.suoYin].shortBorrowAccount){
      this.shortBorrowAccount = this.data[this.suoYin].shortBorrowAccount+" "+this.data[this.suoYin].shortBorrowAccountName
      }else{
        this.shortBorrowAccount= ""
      }
      if(this.data[this.suoYin].accountDesc){
      this.accountDesc = this.data[this.suoYin].accountCode+" "+this.data[this.suoYin].accountDesc
      }else{
        this.accountDesc= ""
      }
      if(this.data[this.suoYin].cashCode){
        this.cashCode =this.data[this.suoYin].cashCode+" "+this.data[this.suoYin].cashName
      }else{
        this.cashCode= ""
      }
      this.currencyCode = this.data[this.suoYin].currencyCode;
      this.payAmt = this.data[this.suoYin].payAmt;
      this.baseCurrencyRate = this.data[this.suoYin].baseCurrencyRate;
      this.payAmtBase = this.data[this.suoYin].payAmtBase;
      this.payDate = this.data[this.suoYin].payDate;
      this.postDate = this.data[this.suoYin].postDate;
      this.postCertCode = this.data[this.suoYin].postCertCode;
      this.writeOffDate = this.data[this.suoYin].writeOffDate;
      this.writeOffReason = this.data[this.suoYin].writeOffReason;
      this.unCertCode = this.data[this.suoYin].unCertCode;
      this.draftProfile = this.data[this.suoYin].draftProfile;
      this.returnDate = this.data[this.suoYin].returnDate;
      this.accountYear = this.data[this.suoYin].accountYear;
      this.payStatus = this.data[this.suoYin].payStatus;
      // if(this.data[this.suoYin].payStatus==10670005){
      //   this.payStatus = "已保存"
      // }else if(this.data[this.suoYin].payStatus==10670010){
      //   this.payStatus = "已过账"
      // }else if(this.data[this.suoYin].payStatus==10670015){
      //   this.payStatus = "已冲销";
      // }
    }
    if(this.list.itemsRowNo){
      this.acceptanceRowNo = this.list.itemsRowNo;
      return this.acceptanceRowNo
    }
  },
  methods: {
    //选择数据
    radiochange(e) {
      this.getData = e;
      console.log("ddd", e);
    },
    changefhtype() {
      this.baseCurrencyRate = this.$filterPriceNum(this.baseCurrencyRate, 8);
      this.payAmt = this.$filterPriceNum(this.payAmt, 2);
      this.payAmtBase = this.payAmt*this.baseCurrencyRate
      this.payAmtBase = this.payAmtBase.toFixed(2);//this.$filterPriceNum(this.payAmtBase, 2);
    },
    getrkdzt() {
      //获取付款标志
      letterStatus({
        dictNo: 1094
      }).then(res => {
        this.payAccountIdentificatioS = res.data;
      });
    },
    getMylxs() {
      //获取付款状态
      letterStatus({
        dictNo: 1067
      }).then(res => {
        this.payStatusS = res.data;
      });
    },
    //币种弹窗打开
    coinTip() {
      //获取汇率
      this.coinShow = true;
    },
    //币种弹窗关闭
    coinCancle() {
      this.coinShow = false;
    },
    //币种弹窗确定获取数据
    coinSure(e) {
      this.coinShow = false;
      this.currencyCode = e.currencyCode;
      parities({companyId:this.companyId,fromCurrencyCode:this.currencyCode}).then(res => {
        this.baseCurrencyRate = res.data.parities;
      });
      // this.currency = e;
    },
    //开户银行
    companyBankTip() {
      console.log(this.companyId)
      // if (this.companyId === null) {
      //   this.$openWarning("请先选择公司");
      //   return;
      // } else {
        this.companyBankShow = true;
      // }
    },
    companyBankCancle() {
      this.companyBankShow = false;
    },
    companyBankSure(e) {
      console.log("11111", e);
      this.companyName= e;
      this.companyName.accountIdentificatio = e.accountIdentity;
      this.companyBankShow = false;
    },
    //科目弹窗打开
    getSubject(e) {
      console.log(e)
      this.subjectIndex = ""
      if(e==1){
        this.subject = true;
        this.subjectIndex = "aaa"
        this.longNumber = 1002
        
      }else{
        this.subject = true;
      }
    },
    //科目弹窗关闭
    subjectCancle() {
      this.subject = false;
    },
    //科目弹窗确定获取数据
    subjectSure(e) {
      console.log(e)
      console.log(this.subjectIndex)
      if(this.subjectIndex == "aaa"){
        this.subject = false;
        this.accountDesc =  e.nameL2;
      }else{
        this.subject = false;
        this.shortBorrowAccount =  e.nameL2;
      }
    },
    //流量弹窗打开
    getFlow() {
        this.flow = true;
    },
    //流量弹窗关闭
    flowCancle() {
      this.flow = false;
    },
    //流量弹窗确定获取数据
    flowSure(e) {
      console.log(e)
        this.flow = false;
        this.cashCode =  e.fnameL2;
    },
    inputShow() {
      this.show = this.$dialogShowOne(this.show);
    },
    //关闭
    payClose() {
      this.$emit("payClose");
      this.radio = false;
      this.getData = ``;
    },
    //确定
    payTrue() {
      if (!this.companyName.bankName) {
        this.$openWarning("开户银行不能为空");
        return;
      }
      if (!this.payAccountIdentificatio) {
        this.$openWarning("付款标志不能为空");
        return;
      }
      if (!this.payAmt) {
        this.$openWarning("付款金额不能为空");
        return;
      }
      if (!this.baseCurrencyRate) {
        this.$openWarning("本位币汇率不能为空");
        return;
      }
      if (!this.payDate) {
        this.$openWarning("付款日期不能为空");
        return;
      }
      if (this.accountDesc&&!this.cashCode) {
        this.$openWarning("现金流量码不能为空");
        return;
      }
      if (!this.attachmentCount) {
        this.$openWarning("附件数量不能为空");
        return;
      }
      if(this.suoYin ==0||this.suoYin >0){
        this.data[this.suoYin].acceptanceRowNo = this.acceptanceRowNo,
        this.data[this.suoYin].remark = this.remark,
        this.data[this.suoYin].bankCode = this.companyName.bankCode,
        this.data[this.suoYin].bankName = this.companyName.bankName,
        this.data[this.suoYin].bankAccount = this.companyName.bankAccount,
        this.data[this.suoYin].accountIdentificatio = this.companyName.accountIdentificatio,
        this.data[this.suoYin].payAccountIdentificatio = this.payAccountIdentificatio;
        this.data[this.suoYin].attachmentCount = this.attachmentCount;
        if(this.virtualMark==true){
          this.virtualMark =1
        }else{
          this.virtualMark=0
        }
        this.data[this.suoYin].virtualMark = this.virtualMark,
        this.data[this.suoYin].currencyCode = this.currencyCode,
        this.data[this.suoYin].payAmt = this.payAmt,
        this.data[this.suoYin].baseCurrencyRate = this.baseCurrencyRate,
        this.data[this.suoYin].payAmtBase = this.payAmtBase,
        this.data[this.suoYin].payDate = this.payDate,
        this.data[this.suoYin].postDate = this.postDate,
        this.data[this.suoYin].postCertCode = this.postCertCode,
        this.data[this.suoYin].writeOffDate = this.writeOffDate,
        this.data[this.suoYin].writeOffReason = this.writeOffReason,
        this.data[this.suoYin].unCertCode = this.unCertCode,
        this.data[this.suoYin].draftProfile = this.draftProfile,
        this.data[this.suoYin].returnDate = this.returnDate,
        this.data[this.suoYin].accountYear = this.accountYear;
        if(this.shortBorrowAccount){
           this.data[this.suoYin].shortBorrowAccount = this.shortBorrowAccount.trim().split(" ")[0]
           this.data[this.suoYin].shortBorrowAccountName = this.shortBorrowAccount.trim().split(" ")[1]
        }else{
          this.data[this.suoYin].shortBorrowAccount = ""
           this.data[this.suoYin].shortBorrowAccountName = ""
        }
        if(this.accountDesc){
           this.data[this.suoYin].accountCode = this.accountDesc.trim().split(" ")[0]
           this.data[this.suoYin].accountDesc = this.accountDesc.trim().split(" ")[1]
        }else{
          this.data[this.suoYin].accountCode = ""
           this.data[this.suoYin].accountDesc = ""
        }
        if(this.cashCode){
           this.data[this.suoYin].cashCode = this.cashCode.trim().split(" ")[0]
           this.data[this.suoYin].cashName = this.cashCode.trim().split(" ")[1]
        }else{
          this.data[this.suoYin].cashCode = ""
          this.data[this.suoYin].cashName = ""
        }
        if(this.payStatus){
          if(this.payStatus=="已保存"){
           this.data[this.suoYin].payStatus = 10670005
          }else if(this.payStatus=="已过账"){
            this.data[this.suoYin].payStatus = 10670010
          }else if(this.payStatus=="已冲销"){
            this.data[this.suoYin].payStatus = 10670015;
          }
        }
        this.data[this.suoYin].payStatus = this.payStatus
        this.$emit("payTrue", this.data);
      }else{
        this.table.acceptanceRowNo = this.acceptanceRowNo,
        this.table.remark = this.remark,
        this.table.bankCode = this.companyName.bankCode,
        this.table.bankName = this.companyName.bankName,
        this.table.bankAccount = this.companyName.bankAccount,
        this.table.accountIdentificatio = this.companyName.accountIdentificatio,
        this.table.payAccountIdentificatio = this.payAccountIdentificatio;
        this.table.attachmentCount = this.attachmentCount;
        if(this.virtualMark==true){
          this.virtualMark =1
        }else{
          this.virtualMark=0
        }
        this.table.virtualMark = this.virtualMark,
        this.table.currencyCode = this.currencyCode,
        this.table.payAmt = this.payAmt,
        this.table.baseCurrencyRate = this.baseCurrencyRate,
        this.table.payAmtBase = this.payAmtBase,
        this.table.payDate = this.payDate,
        this.table.postDate = this.postDate,
        this.table.postCertCode = this.postCertCode,
        this.table.writeOffDate = this.writeOffDate,
        this.table.writeOffReason = this.writeOffReason,
        this.table.unCertCode = this.unCertCode,
        this.table.draftProfile = this.draftProfile,
        this.table.returnDate = this.returnDate,
        this.table.accountYear = this.accountYear;
        console.log(this.shortBorrowAccount)
        console.log(this.cashCode)
        if(this.shortBorrowAccount){
           this.table.shortBorrowAccount = this.shortBorrowAccount.trim().split(" ")[0]
           this.table.shortBorrowAccountName = this.shortBorrowAccount.trim().split(" ")[1]
        }
        if(this.accountDesc){
           this.table.accountCode = this.accountDesc.trim().split(" ")[0]
           this.table.accountDesc = this.accountDesc.trim().split(" ")[1]
        }
        if(this.cashCode){
           this.table.cashCode = this.cashCode.trim().split(" ")[0]
           this.table.cashName = this.cashCode.trim().split(" ")[1]
        }
        if(this.payStatus){
          if(this.payStatus=="已保存"){
            this.table.payStatus = 10670005
          }else if(this.payStatus=="已过账"){
            this.table.payStatus = 10670010
          }else if(this.payStatus=="已冲销"){
            this.table.payStatus = 10670015;
          }
        }
        this.table.payStatus = this.payStatus,
        this.table.payId = this.list.id,
        this.list.accPayList = [this.table]
        this.$emit("payTrue", this.list);
      }
      
    },
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
    changefhtype() {
        this.payAmtBase = this.payAmt*this.baseCurrencyRate
    },
  },
  components: {
    companyBankPopup,
    coinSelect,
    subjectFrame,
    flowCode
  }
};
</script>

<style lang="scss">
.el-checkbox::after {
    content: none !important;
}
</style>
