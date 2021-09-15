<template>
<!---------------------------现款资金占用利息报表---------------------------->
    <div class="cashOccupation">
         <!--查询条件-->
        <div class="button-div auto-sibling">
            <el-button icon="el-icon-search" class="query-button" @click="query">查询</el-button>
            <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
        </div>
        <div class="input-div auto-sibling">
            <el-col :span="5" class="el-col el-col-required">
                <label>公司</label>
                <el-input v-model="companyInfo.companyName"
                :class="errorKey.includes('companyInfo') ? 'inputRed' : ''"
                 class="el-inputs" placeholder="请选择" disabled></el-input>
                <span class="comicon" @click="companyPopup(1)"><i class="el-icon-search"></i></span>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
                <label>部门</label>
                <el-input
                v-model="branchName.branchName"
                :class="errorKey.includes('branchName') ? 'inputRed' : ''"
                size="small"
                class="el-inputs"
                placeholder="请选择"
                disabled
                ></el-input>
                <span class="comicon" @click="departmentTip(1)"
                ><i class="el-icon-search"></i
                ></span>
          </el-col>
          <el-col :span="5" class="el-col el-col-required">
                <label>会计月份</label>
                <el-date-picker
                    style="width:31%"
                    v-model="accountingMonthBegin"
                    type="month"
                    size="mini"
                     :class="errorKey.includes('accountingMonthBegin') ? 'inputRed' : ''"
                    placeholder="开始月份"
                    clearable
                    :picker-options="startTime"
                    >
                </el-date-picker
                >-<el-date-picker
                    style="width:31%"
                    v-model="accountingMonthEnd"
                     :class="errorKey.includes('accountingMonthEnd') ? 'inputRed' : ''"
                    type="month"
                    size="mini"
                    placeholder="结束月份"
                    clearable 
                    :picker-options="endTime"
                    >
                </el-date-picker>
            </el-col>
        </div>
        <div class="input-div auto-sibling"> 
            <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>现款占用率%</label>
                <el-input v-model="occupancyRate" placeholder="请输入" :class="errorKey.includes('occupancyRate') ? 'inputRed' : ''"
                 class="el-inputs" size="small"></el-input>
            </el-col>
           <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>现款负占用利率%</label>
                <el-input v-model="occupancyRateNegative" placeholder="请输入" :class="errorKey.includes('occupancyRateNegative') ? 'inputRed' : ''"
                 class="el-inputs" size="small"></el-input>
            </el-col>
            <!-- <el-col :span="5" class="el-col">
                <label>银行承兑汇票占用费率</label>
                <el-input v-model="accountingMonth" class="el-inputs" size="small"></el-input>
            </el-col>
             <el-col :span="5" class="el-col">
                <label>银行承兑汇票倒贴费率</label>
                <el-input v-model="accountingMonth" class="el-inputs" size="small"></el-input>
            </el-col> -->
        </div>
        <!--列表信息-->
        <div class="button-div auto-sibling">
            <el-button icon="el-icon-download" v-if="$actionFlag(`F001`)" @click="download()">导出</el-button>
            <el-button icon="el-icon-folder-add" v-if="$actionFlag(`F002`)"  @click="businessAccounting">核算</el-button>
        </div>
         <div class="el-table-div" v-auto>
            <el-table
                class="el-table"
                border
                center
                height="calc(100% - 35px)"
                :data="tableData"
                v-loading="loading"
                ref="multipleTable"
                show-summary
                :summary-method="getSummaries"
                >
                <el-table-column prop="date"  label="日期" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div style="text-align:center">{{scope.row.date}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="payeeAmt" :formatter="$moneyFormat" label="当日现款收款"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="payAmt" :formatter="$moneyFormat" label="当日现款付款" show-overflow-tooltip></el-table-column>
                <el-table-column prop="cash" :formatter="$moneyFormat" label="当日现款占用" show-overflow-tooltip></el-table-column>
                <el-table-column prop="cashRate" label="现款利率"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="cashInterest" :formatter="$moneyFormat" label="现款日利息" show-overflow-tooltip></el-table-column>
                <el-table-column prop="payeeAccept" :formatter="$moneyFormat" label="当日承兑收款" show-overflow-tooltip></el-table-column>
                <el-table-column prop="payAccept" :formatter="$moneyFormat" label="当日承兑付款" show-overflow-tooltip></el-table-column>
                <el-table-column prop="accept" :formatter="$moneyFormat" label="当日承兑占用" show-overflow-tooltip></el-table-column>
                <el-table-column prop="acceptInterest" :formatter="$moneyFormat" label="承兑日利息" show-overflow-tooltip></el-table-column>
                <el-table-column prop="takeUpSum" :formatter="$moneyFormat" label="当日总资金占用"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="interestSum" :formatter="$moneyFormat" label="当日总利息"  show-overflow-tooltip></el-table-column>
            </el-table>
        </div>
        <!-- 选择公司弹窗 -->
        <compony-select
          v-if="componyShow"
          :tipShow="componyShow"
          @tipsCancle="tipsCancle"
          @tipsSure="tipsSure"
        >
        </compony-select>
         <!-- 选择部门弹窗 -->
        <department-select v-if="departmentShow" :tipShow='departmentShow' :data='companyInfo' 
        @departmentCancle="departmentCancle" @departmentSure="departmentSure">
        </department-select>
        <!-- 重核算弹窗-->
        <el-dialog
        :visible.sync="writeOffShow"
        :show-close="false"
        :close-on-click-modal="false"
        title="提示信息"
        width="400px"
        class="popup_box"
        >
        <div class="examine-dialog">
            <el-col :span="5" class="el-col">
                <label>公司</label>
                <el-input  
                v-model="companyObj.companyName"
                :class="errorKey2.includes('companyObj') ? 'inputRed' : ''"
                size="small"
                class="el-inputs"
                placeholder="请选择"
                disabled></el-input>
                <span class="comicon" @click="companyPopup(2)"><i class="el-icon-search"></i></span>
            </el-col>
             <el-col :span="5" class="el-col">
                <label>部门</label>
                <el-select  v-model="branchName_"
                        class="el-inputs"
                        placeholder="请选择"
                        multiple
                        filterable
                        remote
                        :remote-method="getDepartment"
                        collapse-tags
                        value-key="branchId"
                        :class="errorKey2.includes('branchName_') ? 'inputRed' : ''"
                >
                <el-option
                    v-for="item in departmentList_"
                    :key="item.branchId"
                    :label="item.branchName"
                    :value="item">
                </el-option>
                </el-select>
                <span class="comicon" @click="branchPopup" style="width: 10%;z-index: 2"
                    ><i class="el-icon-search"></i
                ></span>    
            </el-col>
            <el-col :span="5" class="el-col">
                <label>核算会计月</label>
                <el-date-picker
                      style="width:66%"
                        type="month"
                        size="small"
                        :class="errorKey2.includes('accountingMonth') ? 'inputRed' : ''"
                        v-model="accountingMonth"
                        value-format="yyyy-MM"
                        >
                </el-date-picker>   
            </el-col>
        </div>
        <div class="button-div2">
            <el-button @click="writeOffSure" icon="el-icon-check">确定</el-button>
            <el-button @click="writeOffCancel" icon="el-icon-close">取消</el-button>
        </div>
        </el-dialog>
          <branch-select v-if="branchShow" 
        :tipShow="branchShow" 
        :data="companyObj" 
        @departmentCancle="branchCancel" 
        @departmentSure="branchSure"></branch-select>   
    </div>
</template>
<script>
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import branchSelect from "@/components/departmentSelect2.vue";
import Compony from "@/api/comdepartment/componySelect";
import billApi from "@/api/reportQuery/bill.js";
import { Loading } from "element-ui";
import calculation from "@/assets/js/calculation";
export default {
    name:'cashOccupationInterestReport',
    data(){
        return{
           departmentShow:false,
           branchName:{},
           componyShow:false,
           companyInfo:{},
           tableData:[],
           loading:false,
           writeOffShow:false,
           accountingMonth:'',
           occupancyRateNegative:'',
           occupancyRate:'',
           errorKey:[],
           sumTol:{},
           errorKey2:[],
           companyObj:{},//公司
           branchShow:false,
          branchName_:[],
          departmentList_:[],
           accountingMonth:'',
           dataType:'',
           accountingMonthBegin:'',
           accountingMonthEnd:'',
           startTime:{
                disabledDate:time=>this.accountingMonthEnd?(time.getTime()>this.accountingMonthEnd||time.getTime()<
                new Date(this.accountingMonthEnd.getFullYear()+'-01-01').getTime()-8*3600*1000):(''||time.getTime() > Date.now()),
            },
            endTime:{
                disabledDate:time=>this.accountingMonthBegin?
                (time.getTime()<this.accountingMonthBegin||time.getTime()
                >new Date(this.accountingMonthBegin.getFullYear()+'-12-01')):(''||time.getTime()>Date.now())
            },
        }
    },
    components:{
       componySelect,
       departmentSelect,
       branchSelect
    },
    created(){
    if(window.IsShowDefaultCompanyInfo){
        this.companyInfo=window.defaultCompanyInfo;
      }
    },
    methods:{
        query(){
            this.errorKey = [];
            if (JSON.stringify(this.companyInfo) === "{}") {
                this.errorKey.push('companyInfo');
            }
            if (JSON.stringify(this.branchName) === "{}") {
                this.errorKey.push('branchName');
            }
            if(this.accountingMonthBegin==""){
                 this.errorKey.push('accountingMonthBegin');
            }
            if(this.accountingMonthEnd==""){
                 this.errorKey.push('accountingMonthEnd');
            }
            if (this.occupancyRateNegative==="") {
                this.errorKey.push('occupancyRateNegative');
            }
            if (this.occupancyRate==="") {
                this.errorKey.push('occupancyRate');
            }
            if(this.errorKey.length){
                this.$openWarning("请将查询信息填充完整！");
                return false;
            }
            this.initData();
        },
        initData(){
            this.loading=true;
            this.tableData=[];
            if(this.occupancyRate!=0){
                var occupancyRate=calculation.accDiv(this.occupancyRate,100);
            }
            if(this.occupancyRateNegative!=0){
                var occupancyRateNegative=calculation.accDiv(this.occupancyRateNegative,100);
            }
            let  accountingMonthBegin=this.$timeFun(this.accountingMonthBegin,false);
            let  accountingMonthEnd=this.$timeFun(this.accountingMonthEnd,false);
            let data={
               companyId:this.companyInfo.companyId,
               companyCode:this.companyInfo.companyCode,
               orgId:this.branchName.branchId,
               orgCode:this.branchName.branchCode,
               accountingMonthBegin:accountingMonthBegin.substring(0,7),
               accountingMonthEnd:accountingMonthEnd.substring(0,7),
               occupancyRateNegative:occupancyRateNegative,
               occupancyRate:occupancyRate,
            }
            billApi.selectFiCashTakeUpReport(data).then(res=>{
                if(res.code=="success"){
                    this.tableData=res.data.fiCashTakeUpReportVOList;
                    this.sumTol=res.data.fiCashTakeUpReportVO;
                }else{
                    this.$openWarning(res.message);
                }
                this.loading=false;
            }).catch(e=>{
                this.loading=false;
            })
        },
        download(){
            this.errorKey = [];
            if (JSON.stringify(this.companyInfo) === "{}") {
                this.errorKey.push('companyInfo');
            }
            if (JSON.stringify(this.branchName) === "{}") {
                this.errorKey.push('branchName');
            }
            if (this.occupancyRateNegative==="") {
                this.errorKey.push('occupancyRateNegative');
            }
            if (this.occupancyRate==="") {
                this.errorKey.push('occupancyRate');
            }
            if(this.errorKey.length){
                this.$openWarning("请将查询信息填充完整！");
                return false;
            }
            let  accountingMonthBegin=this.$timeFun(this.accountingMonthBegin,false);
            let  accountingMonthEnd=this.$timeFun(this.accountingMonthEnd,false);
            let data={
               companyId:this.companyInfo.companyId,
               companyCode:this.companyInfo.companyCode,
               orgId:this.branchName.branchId,
               orgCode:this.branchName.branchCode,
               accountingMonthBegin:accountingMonthBegin.substring(0,7),
               accountingMonthEnd:accountingMonthEnd.substring(0,7),
               occupancyRateNegative:this.occupancyRateNegative,
               occupancyRate:this.occupancyRate,
            }
            data = this.$queryFilter(data);
            //使用Element loading-start 方法
            var loading2 = Loading.service({
                lock: true,
                text: "加载中...",
                background: "rgba(0, 0, 0, 0.7)"
            });
            billApi.exportFiCashTakeUpReport(data).then(res=>{
                if(res.code=="fail"){
                this.$openWarning(res.message);
                }else{
                const blob = new Blob([res.data]);
                const a = document.createElement("a");
                const url = window.URL.createObjectURL(blob);
                const filename ="现款资金占用利息计算表.xls";
                a.href = url;
                a.download = filename;
                a.click();
                window.URL.revokeObjectURL(url);
                }
                loading2.close();
            }).catch(e=>{
                loading2.close();
            });
        },
            //总计
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                sums[index] = "总计";
                return;
                }
                let key = column.property;
                if (["cashInterest","interestSum","payAmt","payeeAmt","takeUpSum"].findIndex(it => it == key) !== -1) {
                    sums[index] = this.sumTol?this.$sumTolFormat(this.sumTol[key]):"";;
                } else {
                    sums[index] = "";
                }
            });
            this.$nextTick(() => {
                this.$refs.multipleTable.doLayout();
            });
            return sums;

        },
        //核算
        businessAccounting(){
            this.writeOffShow=true;
        },
        reset(){
            if(window.IsShowDefaultCompanyInfo){
                this.companyInfo=window.defaultCompanyInfo;
            }else{
                this.companyInfo = {}; //公司
            }
            this.accountingMonth='';
            this.branchName={};
        },
        writeOffCancel(){
            this.writeOffShow=false;
            this.accountingMonth='';
            this.companyObj={};
            this.branchName_=[];
            this.departmentList_=[];
        },
        writeOffSure(){
            this.errorKey2 = [];
            if (JSON.stringify(this.companyObj) === "{}") {
                this.errorKey2.push('companyObj');
            }
            if (this.branchName_.length==0) {
                this.errorKey2.push('branchName_');
            }
            if (this.accountingMonth=="") {
                this.errorKey2.push('accountingMonth');
            }
            if(this.errorKey2.length){
                this.$openWarning("请将信息填充完整！");
                return false;
            }
            let data={
                companyId:this.companyObj.companyId,
               companyCode:this.companyObj.companyCode,
               companyName:this.companyObj.companyName,
               bbBranchBaseList:this.branchName_,
               accountingMonth:this.accountingMonth,
            }
            billApi.accountingFiCashTakeUp(data).then(res=>{
                if(res.code=="success"){
                    this.$openSuccess(res.message);
                    this.writeOffCancel();
                }else{
                    this.$openWarning(res.message);
                }
            })
        },
            //公司弹窗打开
        companyPopup(type) {
            this.dataType=type;
            this.componyShow = true;
        },
        //公司弹窗关闭
        tipsCancle() {
            this.componyShow = false;
        },
        //公司弹窗确定获取数据
        tipsSure(e) {
            this.componyShow = false;
            if(this.dataType==1){
                this.companyInfo = e;
                this.branchName = {};
            }else{
                this.companyObj=e;
                this.branchName_=[];
                this.departmentList_=[];
            }
           
        },
        //部门弹窗打开
        departmentTip() {
            if (Object.keys(this.companyInfo).length) {
                this.departmentShow = true;  
            }else{
                this.$openWarning("请先选择公司");
            return false;
            }
            
          
        },
        //部门弹窗关闭
        departmentCancle() {
            this.departmentShow = false;
        },
        //部门弹窗确定获取数据
        departmentSure(e) {
            this.departmentShow = false;
            this.branchName = e;
            
        },
         getDepartment(str){
            if(!str){
                return
            }
            if(!Object.keys(this.companyObj).length){
                this.$openWarning("请先选择公司");
                return;
            }
            let params = {
                pageNum: 1,
                rows: 200,
                companyId: this.companyId ,
                branchName: str,
                branchCode: '',
                isCollected:0
            };
        Compony.brnchList2(params)
            .then(res => {
                this.departmentList_ = res.data.list;
            })
            .catch(() => {
            });
        },
        //多选部门
          //部门弹窗
        branchPopup() {
            this.branchShow = true;
        },
        //部门弹窗关闭
        branchCancel() {
            this.branchShow = false;
        },
        //部门弹窗确定并传值
        branchSure(e) {
            this.branchShow = false;
            this.branchName_=e;
            this.departmentList_ = e;
        },
    }
}
</script>
<style lang="scss">
.cashOccupation .input-div .el-col .el-inputs{
    width: 63%;
}
.cashOccupation .input-div label{
    width:36%;
}
.index .cashOccupation .examine-dialog .el-col{
    width: 100%;
    position: relative;
    .comicon {
        width: 62%;
        height: 20px;
        position: absolute;
        top: 2px;
        right: 24px;
        cursor: pointer;
        text-align: right;
    }
    label{
        width: 30%;
    }
    .el-inputs{
        width: 66%;
    }
     .inputRed {
    .el-input__inner {
      border: 2px solid;
      border-color: #ee2e37a8 !important;
    }
  }
}
// .index .cashOccupation .el-col-required .el-input__inner{
//     background-color: #d9e8fd !important;
// }
.cashOccupation .el-table .cell.el-tooltip{
    text-align: right;
}


</style>