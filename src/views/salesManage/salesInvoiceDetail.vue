<template>
    <div id="salesInvoiceDetail">
        <div class="button-div">
            <el-button  @click="cancel()" v-if="pageType==3" icon="el-icon-back">返回</el-button>
            <!-- <el-button  @click="handleToExamine" v-if="$actionFlag(`F007`) && pageType==3" icon="el-icon-receiving">审核</el-button> -->
            <el-button  @click="examineSure" class="query-button" icon="el-icon-money" v-if="pageType==4">过账</el-button>
            <el-button  @click="cancel()" icon="el-icon-close" v-if="pageType==4">取消</el-button>
        </div>
        <el-tabs class="el-tabs" v-model="activeName" type="card" @tab-click="handleClick" >
            <el-tab-pane  label="基础信息" name="one">
                <div class="index-div3 index-div index-div4"> 
                    <el-col :span="5" class="el-col">
                        <label>公司</label>
                        <el-input v-model="basicData.companyName" class="el-inputs" size="small" disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>部门</label>
                        <el-input v-model="basicData.branchName" size="small" class="el-inputs"   disabled></el-input>
                      
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>业务员</label>
                        <el-input v-model="basicData.bizPersonName" size="small" class="el-inputs"   disabled></el-input>   
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>发票单据号</label>
                        <el-input   size="small" v-model="basicData.invoiceCode"  class="el-inputs" disabled></el-input>
                    </el-col>
                     <el-col :span="5" class="el-col">
                        <label>客户</label>
                        <el-input  class="el-inputs" v-model="basicData.customerName" size="small"  disabled></el-input>
                      
                    </el-col>
                     <el-col :span="5" class="el-col">
                        <label>开票日期</label>
                        <el-date-picker
                            class="el-input2"
                            v-model="basicData.invoiceDate"
                            type="date"
                            size="small"
                             disabled
                        >
                        </el-date-picker>
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required" v-if="pageType==4" >
                        <label>记账日期</label>
                        <el-date-picker
                            class="el-input2"
                            v-model="basicData.accountDay"
                            type="date"
                            size="small"
                             :disabled="isDisabled"
                        >
                        </el-date-picker>
                    </el-col>
                     <el-col :span="5" v-else class="el-col" >
                        <label>记账日期</label>
                        <el-date-picker
                            class="el-input2"
                            v-model="basicData.accountDay"
                            type="date"
                            size="small"
                             :disabled="isDisabled"
                        >
                        </el-date-picker>
                    </el-col>
                    <el-col :span="5" class="el-colc">
                        <label>销售类型</label>
                        <el-select clearable  size="small" class="el-select"  v-model="basicData.soType" disabled>
                        <el-option v-for="item in basicData.soTypeList"
                                    :key="item.dict_code"  
                                    :label="item.dict_value"
                                    :value="item.dict_code"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>业务币种</label>
                        <el-input  class="el-inputs" v-model="basicData.currencyName" size="small" disabled></el-input>
                   
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>本位币汇率</label>
                        <el-input  class="el-inputs" v-model="basicData.baseCurrencyRate"  size="small" disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>人民币汇率</label>
                        <el-input  class="el-inputs" v-model="basicData.rmbCurrencyRate"   size="small" disabled></el-input>
                    </el-col>
                   <el-col :span="5" class="el-colc">
                        <label>发票类型</label>
                        <el-select clearable  size="small" class="el-select"  v-model="basicData.invoiceType" disabled>
                        <el-option v-for="item in basicData.invoiceTypeList"
                                    :key="item.dict_code"  
                                    :label="item.dict_value"
                                    :value="item.dict_code"
                            ></el-option>
                        </el-select>
                    </el-col>
                     <el-col :span="5" class="el-col el-col-required" v-if="pageType==4">
                        <label>发票外部编号</label>
                        <el-input class="el-inputs" v-model="basicData.extInvoiceCode" size="small"  :disabled="isDisabled"></el-input>
                       
                    </el-col>
                    <el-col v-else :span="5" class="el-col">
                        <label>发票外部编号</label>
                        <el-input class="el-inputs" v-model="basicData.extInvoiceCode" size="small"  :disabled="isDisabled"></el-input>
                       
                    </el-col>
                     <el-col :span="5" class="el-colc">
                        <label>发票状态</label>
                        <el-select clearable  size="small" class="el-select"  v-model="basicData.invoiceStatus" disabled >
                        <el-option v-for="item in basicData.invoiceStatusList"
                                    :key="item.dict_code"  
                                    :label="item.dict_value"
                                    :value="item.dict_code"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>开票数量</label>
                        <el-input  class="el-inputs" v-model="basicData.invoiceQty" size="small" disabled ></el-input>
                        
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>开票金额</label>
                        <el-input  class="el-inputs" v-model="basicData.invoiceAmtVat" size="small" disabled></el-input>
                       
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>开票人民币金额</label>
                        <el-input  class="el-inputs" v-model="basicData.payAmtTotalRmb" size="small" disabled></el-input>     
                    </el-col>
                    <el-col :span="5" class="el-col el-col-required" v-if="pageType==4" >
                        <label>附件数量</label>
                        <el-input  class="el-inputs" v-model="basicData.attachmentCount" size="small" :disabled="isDisabled"></el-input>     
                    </el-col>
                     <el-col :span="5" v-else class="el-col">
                        <label>附件数量</label>
                        <el-input  class="el-inputs" v-model="basicData.attachmentCount" size="small" disabled></el-input>     
                    </el-col>
                    <el-col :span="5" class="el-col  el-col-required" v-if="pageType==4">
                        <label>税金科目</label>
                        <el-input v-model="basicData.accountName.nameL2" class="el-inputs" size="small" disabled></el-input>
                        <span v-if="pageType==4" class='comicon' @click="accountTips"><i class="el-icon-search" ></i></span>
                        
                    </el-col>
                     <el-col :span="5" v-else class="el-col">
                        <label>税金科目</label>
                        <el-input v-model="basicData.accountName.nameL2" class="el-inputs" size="small" disabled></el-input>  
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
                    <el-col :span="24" class="el-col checkbox-col">
                        <label style="width:8.4%">发票种类：</label>
                        <el-checkbox style="width:10%"  v-model="basicData.isVatSpecialInvoice" disabled>增值税专用发票</el-checkbox>
                        <el-checkbox style="width:22%" v-model="basicData.isVatNormalInvoice" disabled>增值税普通发票</el-checkbox>
                        <el-checkbox style="width:21%" v-model="basicData.isProformaInvoice" disabled>形式发票</el-checkbox>
                    </el-col>
                    <el-col :span="24">
                        <label style="width:7.4%;vertical-align: 8px;">备注</label>
                        <el-input
                            type="textarea"
                            autosize
                            rows="2"
                            v-model="basicData.remark"
                            size="small"
                            class="el-textarea"
                            
                            disabled
                            >
                        </el-input>
                    </el-col>
                
                </div>
                 <!-- 表格 -->
                <div class="el-table-div">
                      <!-- 表格 -->
                    <el-table border center  
                        ref="table" 
                        :data="basicData.tableData" 
                        tooltip-effect="dark"
                        max-height="320"
                        :summary-method="getSummaries"
                        show-summary
                        class="el-table" v-loading="loading">
                        <!-- <el-table-column type="selection" width="45" align="center"></el-table-column>  -->
                        <el-table-column prop="invoiceRowNo"  width="50" label="行号">   
                        </el-table-column>
                        <el-table-column prop="soContractNo" label="销售合同号" width="120px" :show-overflow-tooltip="true" >
                        </el-table-column>
                        <el-table-column prop="soExtNo" label="外部合同号" width="120px" :show-overflow-tooltip="true" >
                        </el-table-column>
                        <el-table-column prop="soContractRowno" label="销售合同行号" width="120px" :show-overflow-tooltip="true" >
                        </el-table-column>
                        <el-table-column prop="doNo" v-if="type==1" label="销售出库单号" width="130px" :show-overflow-tooltip="true">
                        </el-table-column>
                         <el-table-column v-else prop="undoCode" label="退货单号" width="130px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column v-if="type==1" prop="doRowno" label="销售出库单行号" width="130px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column v-else prop="undoRowno" label="退货单行号" width="130px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="goodsCode" label="物料编号" width="120px" :show-overflow-tooltip="true" > 
                        </el-table-column>
                        <el-table-column prop="goodsName" label="物料名称" :show-overflow-tooltip="true" >
                        </el-table-column>
                        <el-table-column prop="goodsCatName" label="物料大类" :show-overflow-tooltip="true" >
                        </el-table-column>
                        <el-table-column prop="goodsSpec" label="物料规格" width="100px"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="invoiceGoodsName" label="物料名称(开票)" width="120px"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="invoiceGoodsCat"  label="物料大类(开票)" width="120px"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="invoiceGoodsSpec" label="物料规格(开票)" width="120px"  :show-overflow-tooltip="true">
                        </el-table-column>
                         <el-table-column prop="itemQty" label="数量" width="100px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <!-- <el-table-column prop="batchCode" label="批次号" width="178px"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="packageCode" label="捆包号" :show-overflow-tooltip="true" >
                        </el-table-column> -->
                        <!-- <el-table-column prop="unInvoiceQty" label="未开票数量" :show-overflow-tooltip="true" >
                        </el-table-column> -->
                         <el-table-column prop="invoiceQty" label="开票数量" :show-overflow-tooltip="true" >
                        </el-table-column>
                        <el-table-column prop="originPrice" label="单价" :show-overflow-tooltip="true" >
                        </el-table-column>
                        <el-table-column prop="taxRate"  label="增值税率%" width="110px" :show-overflow-tooltip="true" >
                        </el-table-column>
                        <el-table-column prop="originAmt" label="业务币含税金额" width="178px">
                        </el-table-column>
                        <el-table-column prop="originNoAmt" label="业务币不含税金额"   width="120px">
                        </el-table-column>
                        <el-table-column  prop="originTaxAmt" label="业务币税额"  width="178px">
                             <template slot-scope="scope">
                                <div v-if='pageType==4'>
                                    <el-input  type="number" v-model="scope.row.originTaxAmt"  @input="taxAmtCh(scope.row,scope.$index)"  size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.originTaxAmt}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="baseAmt" label="本币含税金额" width="100px" :show-overflow-tooltip="true" >
                        </el-table-column>
                        <el-table-column prop="baseNoAmt" label="本币不含税金额" width="110px" :show-overflow-tooltip="true" >
                        </el-table-column>
                        <el-table-column prop="baseTaxAmt" label="本币税额" width="100px" :show-overflow-tooltip="true" >
                             <template slot-scope="scope">
                                <div v-if='pageType==4'>
                                    <el-input  type="number" v-model="scope.row.baseTaxAmt" @input="baseTaxAmtCal(scope.row,scope.$index)"  size="mini" class="el-inputs" placeholder="请输入"></el-input>
                                </div>
                                <div v-else>
                                    {{scope.row.baseTaxAmt}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="costAmt" label="成本总额" width="110px" :show-overflow-tooltip="true" >
                        </el-table-column>
                         <el-table-column prop="remark" label="备注" width="120px"  :show-overflow-tooltip="true">
                        </el-table-column>
                    </el-table>
                
                </div>
                 <!--审核弹窗 开始-->
                <el-dialog :visible.sync="examineShow" :close-on-click-modal="false"  :show-close="false"  title="审核" width="400px" class="popup_box">
                    <div class="examine-dialog">
                        <el-col :span="24" class="el-col">
                            <label><span class="must-full">*</span>审核</label>
                            <el-select clearable  size="small" class="el-select" @change="examineSelect"  v-model="examineValue"  placeholder="请选择" >
                                <el-option v-for="item in examineList"
                                        :key="item.value"  
                                        :label="item.label"
                                        :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-col>
                        <el-col v-if="examineValue=='pass'" :span="24" class="el-col">
                            <label><span class="must-full">*</span>记账日期</label>
                            <el-date-picker
                                class="el-input2"
                                style="width:178px;"
                                v-model="examineDate"
                                type="date"
                                size="small"
                                @change="changeDate"
                                placeholder="请选择日期"
                                :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-col>
                        <el-col v-if="examineValue=='pass'" :span="24"  class="el-col">
                            <label><span class="must-full">*</span>税金科目</label>
                            <el-input v-model="accountName.nameL2" class="el-input2" size="small" disabled></el-input>
                            <span class='comicon' @click="accountTips"><i class="el-icon-search" ></i></span>
                        </el-col>
                        <el-col v-if="examineValue=='reject'" :span="24" class="el-col">
                            <label style="vertical-align:top">驳回原因</label>
                            <el-input
                                type="textarea"
                                autosize
                                v-model="rejectReason"
                                size="small"
                                class="el-textarea"
                                placeholder="请输入内容"
                                >
                            </el-input>
                        </el-col>
                    </div>
                    <div class="button-div2">
                        <el-button  @click="examineSure" icon="el-icon-check" :disabled="examineStatus">确定</el-button>
                        <el-button  @click="examineCancle" icon="el-icon-close">取消</el-button>
                    </div> 
                </el-dialog>
                <!--审核弹窗 结束-->
            </el-tab-pane>
            <!--系统信息-->
            <el-tab-pane  label="系统信息" name="third" style=" background:#fff;">
                <div class="index-div3" style="padding-bottom:10px">
                    <el-col :span="5" class="el-col" style="margin-left:-0.5%">
                        <label>创建人</label>
                        <el-input v-model="systemData.createdName" class="el-inputs" size="small"  disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>创建时间</label>
                        <el-input v-model="systemData.createdTime" size="small" class="el-inputs"   disabled></el-input>
        
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>修改人</label>
                        <el-input v-model="systemData.updatedName" size="small" class="el-inputs"  disabled></el-input>
                        
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>修改时间</label>
                        <el-input v-model="systemData.updatedTime" size="small" class="el-inputs"  disabled></el-input>
                        
                    </el-col>
                    <el-col :span="5" class="el-col" style="margin-left:-5px">
                        <label>审核人</label>
                        <el-input v-model="systemData.auditBy" size="small" class="el-inputs"  disabled></el-input>
                        
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>审核时间</label>
                        <el-input v-model="systemData.auditDate" size="small" class="el-inputs"  disabled></el-input>  
                    </el-col>
                </div>
            </el-tab-pane>
             <el-tab-pane label="流程详情"
                   name="lcxq">
                <div class="input-div input-div-bor bortop0">
                    <v-exmineStatus :id="invoiceId"></v-exmineStatus>
                </div>
            </el-tab-pane>
        </el-tabs>
          <!--税金科目-->
        <subject-frame v-if="subjectShow" :longNumber="22210102" :tipShow='subjectShow' @subjectCancle="subjectCancle" @subjectSure="subjectSure"></subject-frame>
    </div>
</template>
<script>
import { mapState } from "vuex";
import sApi from "@/api/salesManage/salesManage";
import calculation from "@/assets/js/calculation";
import subjectFrame from "@//components/subjectFrame.vue";//科目组件
import ExmineStatus from '@/components/exmineStatus'
export default {
    name:"salesInvoiceDetail",
    data(){
        return{
            //基本信息
            basicData:{
                companyName:'',//公司名
                branchName:'',//部门
                bizPersonName:'',
                currencyName:'', //业务币别
                currencyCode:'',
                customerName:'',//客户
                soTypeList:[],//销售类型列表
                soType:'',//销售类型
                invoiceType:'',//发票类型
                invoiceTypeList:[],//发票类型列表
                invoiceStatusList:[],//状态列表
                invoiceStatus:'',//发票状态 默认保存
                extInvoiceCode:'',//发票外部编号
                baseCurrencyRate:'',//本位币汇率
                invoiceQty:'',//开票数量
                invoiceAmtVat:'',//开票金额
                remark:'',//备注  
                invoiceDate:'',//发票时间
                accountDay:'',//记账日期
                doNo:'',//出库单号
                invoiceCode:'',//发票单据号
                invoiceQty:'',//成本总金额
                tableData:[],//商品明细列表数据
                payAmtTotalRmb:'',//开票人民币金额
                rmbCurrencyRate:'',//人民币汇率
                attachmentCount:'',//附件数量
                accountName:{},//科目名称,
                isVatSpecialInvoice:'',//增值税专用发票、、
                isVatNormalInvoice:'',//增值税普通发票
                isProformaInvoice:'',//形式发票
            },
             //系统信息
            systemData:{
                createdTime:'',//创建时间
                createdName:'',//创建人
                updatedName:'',//修改人
                updatedTime:'',//修改时间
                auditBy:'',//审核人
                auditDate:'',//审核时间
            },
            activeName:"one",//切换tabs
            type:'',//页面类型，1，标准发票，2退单发票
            loading:false,
            invoiceType:'',//发票类型
            examineShow:false,//审核弹窗
            examineValue:'',//审核选中的值
            examineList:[
                {value:"pass",label:"通过"},
                {value:"reject",label:"驳回"},
             ],
             examineDate:'',//审核弹窗里的出库日期
             rejectReason:'',//驳回原因
             pickerOptions:{},//时间范围
             unDate:'',//冲销日期
             unReason:'',//冲销原因
             writeOffShow:false,//冲销原因
             writeOffFlag:false,//判断冲销日期是否在范围内
             examineStatus:true,//审核值是否选择
             subjectShow:false,//税金科目
             accountName:{},//税金科目
             pageType:"",//3，查看，4过账
             isDisabled:"",
            warrantCode:'',//凭证号 
            warrantMonth:'', //期间 
            writeoffWarrantCode:'',//冲销凭证号
            writeoffWarrantMonth:'',//冲销期间
            invoiceId:''
        }
    },
    created(){
        this.getSoTypeList(); //销售类型
        this.getInvoiceTypeList();//发票类型
        this.getInvoiceStatusList();//发票状态
        this.initData();
        this.invoiceType=this.$route.query.invoiceType;
        this.pageType=this.$route.query.type;
        if(this.pageType==3){
            this.isDisabled=true;
        }else{
            this.isDisabled=false;
        }
        if(this.invoiceType=="10700005"){
            this.type=1;
        }else{
            this.type=2;
        }
        this.invoiceId=localStorage.getItem("invoiceId");
    },
    methods:{
         //销售出库单列表
        initData(){
            this.loading=true;
            let data={
               id:localStorage.getItem("invoiceId")
            }
            sApi.checkSaleInvoicer(data).then(res=>{
                if(res.code="success"){
                    let data=res.data;
                    this.basicData.companyName=data.companyName;//公司名
                    this.basicData.companyId=data.companyId;
                    this.basicData.branchName=data.orgName;//部门
                    this.basicData.bizPersonName=data.bizPersonName;
                    this.basicData.currencyCode=data.currencyCode;//币种
                    this.selectCurrencyName();
                    this.basicData.baseCurrencyRate=data.baseCurrencyRate;//本位币汇率
                    this.basicData.rmbCurrencyRate=data.rmbCurrencyRate;//人民币汇率
                    this.basicData.remark=data.remark;//原因
                    this.basicData.soType=`${data.soType}`;//销售类型类型
                    this.basicData.invoiceType=""+data.invoiceType;//类型
                    this.basicData.invoiceStatus=""+data.invoiceStatus;//状态
                    this.basicData.invoiceCode=data.invoiceCode;//发票单据号
                    this.basicData.extInvoiceCode=data.extInvoiceCode;//发票外部编号
                    this.basicData.invoiceDate=this.$timeFun(data.invoiceDate,true);//发票日期
                    this.basicData.accountDay=this.$timeFun(data.accountDay,true);//记账日期
                    this.basicData.customerName=data.custName;//客户
                    this.basicData.invoiceQty=data.invoiceQty;//总数量
                    this.basicData.invoiceAmtVat=data.invoiceAmtVat;//开票金额
                    this.basicData.payAmtTotalRmb=data.payAmtTotalRmb;
                    this.basicData.attachmentCount=data.attachmentCount;//附件数量
                    if(data.accountCode!="null" && data.accountName!="null"){
                        this.basicData.accountName.nameL2=data.accountCode+" "+data.accountName;//科目名称
                    }
                    this.basicData.version=data.version;//版本号
                    this.basicData.invoiceCode=data.invoiceCode;
                    this.basicData.invoiceId=data.invoiceId;
                    this.warrantCode=data.warrantCode;//凭证号 
                    this.warrantMonth=data.warrantMonth; //期间 
                    this.writeoffWarrantCode=data.writeoffWarrantCode;//冲销凭证号
                    this.writeoffWarrantMonth=data.writeoffWarrantMonth;//冲销期间
                    this.basicData.isVatSpecialInvoice=data.isVatSpecialInvoice==1?true:false;//增值税专用发票、、
                    this.basicData.isVatNormalInvoice=data.isVatNormalInvoice==1?true:false;//增值税普通发票
                    this.basicData.isProformaInvoice=data.isProformaInvoice==1?true:false;//形式发票
                    this.systemData.createdName=data.createdName;//创建人
                    this.systemData.createdTime=this.$timeFun(data.createdTime,true);//创建时间
                    this.systemData.updatedName=data.updatedName;//创建人
                    this.systemData.updatedTime=this.$timeFun(data.updatedTime,true);//创建时间
                    this.systemData.auditBy=data.auditBy;//审核人
                    this.systemData.auditDate=this.$timeFun(data.auditDate,true);//审核时间

                    let list=data.invoiceItemsList;
                    if(list.length){
                        let that=this;
                        list.forEach((element,index) => {
                             //销售不含税金额
                            element.originNoAmt =  this.$unorginAmtCh(element.originAmt, element.originTaxAmt);
                                  //本币不含税金额 baseNoAmt
                            element.baseNoAmt = this.$tybbnhsje(element.baseAmt,element.baseTaxAmt);
                           // element.originTaxAmt = this.$originTaxAmt(element.originAmt, element.originNoAmt);    
                        });
                    }
                    this.basicData.tableData=list;
                    this.loading=false;

                }else{
                    this.$message({
                        duration: 1000,
                        showClose: true,
                        message: res.message,
                        type: 'error'
                    });
                    this.loading=false;
                }
            }).catch();
        },
           //根据业务币别code查询名称
        selectCurrencyName(){
            let data={
                currencyCode:this.basicData.currencyCode
            }
            sApi.selectCurrencyName(data).then(res => {
                if(res.code=="success"){
                    if(res.data!=null){
                        this.basicData.currencyName =res.data.currencyName;
                    }
                }
            }).catch();
        },
         //tab切换
        handleClick(tab, event) {
            console.log(tab, event);
        },
        //业务币税额变动
        taxAmtCh(e, index) {
            let currencyRate=this.basicData.baseCurrencyRate;
            let row = e;
            if(this.basicData.tableData.length){
                this.basicData.tableData[index].originTaxAmt=this.$filterPriceNum(row.originTaxAmt,2);
            }
            //销售不含税金额  销售不含税金额=销售含税金额-税额
            row.originNoAmt = this.$unorginAmtCh(row.originAmt, row.originTaxAmt);
            //销售不含税单价 销售不含税金额=销售不含税金额 / 发票数量
            row.originNoPrice = this.$unPrice(row.originNoAmt, row.invoiceQty);
            //本币计算 对应业务币*汇率
           
            //本币不含税单价 baseNoPrice
            row.baseNoPrice = this.$bbnhsdj(row.originNoPrice,currencyRate);
              //本币增值税额 baseTaxAmt
            row.baseTaxAmt = this.$bbzzse(row.originTaxAmt, currencyRate);
              //本币不含税金额 baseNoAmt
            row.baseNoAmt = this.$tybbnhsje(row.baseAmt,row.baseTaxAmt);
            this.$set(this.basicData.tableData, index, row);
        },
        baseTaxAmtCal(e,index){
            let currencyRate=this.basicData.baseCurrencyRate;
              //本币增值税额 baseTaxAmt
            e.originTaxAmt = this.$calculationAmount(e.baseTaxAmt, currencyRate,"div");
            e.baseNoAmt = this.$tybbnhsje(e.baseAmt,e.baseTaxAmt);
            this.$set(this.basicData.tableData, index, e);
        },
        //获取销售类型
        getSoTypeList(){
            let data={
                dictNo:1015
            }
           sApi.selectDoStatusList(data).then(res => {
				this.basicData.soTypeList = res.data;
            }).catch(); 
        },
        //获取状态
        getInvoiceStatusList(){
            let data={
                dictNo:1071
            }
           sApi.selectDoStatusList(data).then(res => {
				this.basicData.invoiceStatusList = res.data;
            }).catch(); 
        },
        //获取发票类型
        getInvoiceTypeList(){
            let data={
                dictNo:1070
            }
           sApi.selectDoStatusList(data).then(res => {
				this.basicData.invoiceTypeList= res.data;
            }).catch(); 
        },
       
        //返回
        cancel(){
            this.$router.push({  
                    path:'/index/salesManage/salesInvoice', //跳转的路径    
            })
        },
         //税金科目
        accountTips(){
            this.subjectShow=true;
        },
        subjectSure(e){
            if(e){
                this.basicData.accountName=e;
                // let nameL2=this.accountName.nameL2;
                // this.accountName.accountCode=nameL2.substring(0,nameL2.indexOf(' '));
            }
            // if(this.examineValue && this.basicData.accountDay && this.basicData.accountName){
            //     this.examineStatus=false;
            // }else{
            //     this.examineStatus=true;
            // }
            this.subjectShow=false;
        },
        subjectCancle(){
            this.subjectShow=false;
        },
               //审核
        handleToExamine(){//1通过 2驳回 
            this.examineValue='';//通过，驳回
            this.rejectReason='';//驳回原因
            this.examineDate='';//日期
            this.accountName={};//税金科目
            if(this.basicData.companyId){
                this.accountPeriod(this.basicData.companyId,1);
            }
            this.examineDate=this.basicData.accountDay;//默认当前数据的出库日期
            //税金科目
            if(JSON.stringify(this.basicData.accountName)!=="{}"){
                this.accountName.nameL2=this.basicData.accountName;
                this.accountName.accountCode=this.basicData.accountName.substring(0,this.basicData.accountName.indexOf(" "));
            }
            this.examineStatus=true;
            this.examineShow=true;//审核弹窗
        },
        //月结
        accountPeriod(companyId,type){
            let data={
                companyId:companyId
            }; 
            sApi.getAccountPeriodByCompany(data).then(res =>{
                if(res.code=="success"){
                    this.$nextTick(() => {
                        if(type==2){
                            let d = new Date(this.unDate);
                            let t = d.getTime(d) // 方法1
                            if(res.data.begindate <t && t< res.data.enddate){
                                this.writeOffFlag=true;
                            }else{
                                this.writeOffFlag=false;
                            }
                        }
                       this.pickerOptions={
                            disabledDate(time) {
                                return  res.data.enddate < time.getTime() || time.getTime() < res.data.begindate;
                            }
                        } 
                    })
                }else{
                    this.$openWarning(res.message);
                }    
            }).catch();
        },
        //审核下拉选中的值
        examineSelect(e){
            this.examineValue=e;//审核选中的值
            if(this.examineValue && this.basicData.accountDay && this.basicData.accountName){
                this.examineStatus=false;
            }else{
                this.examineStatus=true;
            }
        },
        //改变记账日期
        changeDate(val){
            this.basicData.accountDay=val;
            if(this.examineValue && this.basicData.accountDay && this.basicData.accountName){
                this.examineStatus=false;
            }else{
                this.examineStatus=true;
            }
        },
        //取消
        examineCancle(){
            this.examineShow=false;//审核弹窗
            this.examineValue='';////审核选中的值
            this.examineDate='';//审核中的出库日期
            this.accountName={};//税金科目
            this.examineStatus=true;
        },
        //确定
        examineSure(){
            // if(this.examineValue=="pass"  && !this.examineDate){
            //     this.$openWarning("请选择记账日期");
            //     return;
            // }else if(this.examineValue=="pass" && JSON.stringify(this.accountName)=="{}"){
            //     this.$openWarning("请选择税金科目");
            //     return;
            // }else if(this.examineValue=="reject"){
            //     this.basicData.auditInfo=this.rejectReason;
            // }
            // this.basicData.operationType=this.examineValue;
            // if(this.basicData.operationType=="pass"){
            //     this.basicData.accountDay=this.examineDate;
            //     this.basicData.accountCode=this.accountName.accountCode;
            //     let nameL2=this.accountName.nameL2;
            //     this.basicData.accountName=nameL2.substring(nameL2.indexOf(' '));
            // }
            // delete this.basicData.invoiceStatusList;
            // delete this.basicData.invoiceTypeList;
            // delete this.basicData.soTypeList;
            // delete this.basicData.tableData;
            // let data=[];
            // data.push(this.basicData);
            if(!this.basicData.accountDay){
                this.$openWarning("记账日期不能为空");
                return;
            }
            if(JSON.stringify(this.basicData.accountName)=="{}"){
                this.$openWarning("税金科目不能为空");
                return;
            }
            var accountName="";
            var accountCode="";
            if(this.basicData.accountName.nameL2){
                let nameL2=this.basicData.accountName.nameL2;
                accountCode=nameL2.substring(0,nameL2.indexOf(' '));
                accountName=nameL2.substring(nameL2.indexOf(' '));    
            } 
            let obj={
                accountName:accountName,
                accountCode:accountCode,
                invoiceId:localStorage.getItem("invoiceId"),
                version:this.basicData.version,
                invoiceItemsList:this.basicData.tableData,
                accountDay:this.basicData.accountDay,
                invoiceType:this.basicData.invoiceType,
                operationType:"pass",
                extInvoiceCode:this.basicData.extInvoiceCode,
                attachmentCount:parseInt(this.basicData.attachmentCount),//附件数量
            }
            let data=[];
            data.push(obj);
            sApi.operateSaleInvoiceStatus(data).then(res =>{
                if(res.code=="success"){
                    this.$openSuccess(res.message);
                    this.cancel();
                }else{
                    this.$openWarning(res.message);
                }    
            }).catch();
        },
          //合计,表格合计
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                sums[index] = "合计";
                return;
                } else if (
                column.property == "itemQty" ||
                column.property == "invoiceQty" ||
                column.property == "unInvoiceQty" ||
                column.property == "costAmt" ||
                column.property == "originAmt" ||
                column.property == "originNoAmt" ||
                column.property == "originTaxAmt" ||
                column.property == "baseAmt" ||
                column.property == "baseNoAmt" ||
                column.property == "baseTaxAmt" ||
                column.property=="originTaxAmt"
                ) {
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return calculation.accAdd(prev, curr);
                    } else {
                        return prev;
                    }
                    }, 0);
                } else {
                    sums[index] = "";
                }
                } else {
                sums[index] = "-";
                }
            });
            return sums;
        },
      
    },
   components: {
        subjectFrame,
        'v-exmineStatus': ExmineStatus
  }
}
</script>
<style>
   .el-select .el-input__inner,.el-input .el-input__inner{
        font-size: 12px !important;
    }
     .el-select:hover .el-input__inner{
        border-color: #97999e !important;
    }
    .el-input--small .el-input__inner{
            border-color: #97999e !important;
        }
     .index .index-div4 .checkbox-col  .el-checkbox__inner{
        vertical-align:3px;
    }
    .index .index-div4 .el-checkbox__label{
        font-size: 12px;
    }
    .index .index-div4 .checkbox-col label::after{
        content:"" !important;
    } 
</style>
<style lang="scss" scoped>
  .index .index-div4 .el-col-5{
    width:24% !important;
} 
.index .index-div3{
    padding-left:0;
}
.index .index-div{
    label{
        width: 36%;
    }
}
.index .index-div .el-input,.index .index-div .el-select{
    width: 64%;
}
.index .examine-dialog .el-col .el-input__icon{
    line-height: 30px;
}
.index .el-button.is-disabled, .index .el-button.is-disabled:focus, .index .el-button.is-disabled:hover{
    color: #c0c4cc;
    cursor: not-allowed;
    background-color: #fff;
    border:1px solid  #ebeef5;
}
.index .examine-dialog .el-col{
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
