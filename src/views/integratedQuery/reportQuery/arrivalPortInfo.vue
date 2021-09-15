<!---到港信息-->
<template>
    <div class="arrivalPortInfo content-div">
        <div class="button-div button-div-query auto-sibling">
            <el-button class="query-button" @click="queryData()" icon="el-icon-search">查询</el-button>
			<el-button @click="resetData()" icon="el-icon-refresh">重置</el-button>
        </div>
        <div class="index-div3 auto-sibling">
            <p class="hide-input" v-if="show" @click="inputShow()">
                更多条件 <i class="el-icon-caret-bottom"></i>
            </p>
            <p class="hide-input" v-else @click="inputShow()">
                收起<i class="el-icon-caret-top"></i>
            </p>
            <div class="search-div">
               <el-col :span="5" class="el-col">
                    <label>公司</label>
                    <el-input v-model="companyName.companyName" class="el-inputs" size="small" placeholder="请选择" disabled></el-input>
                    <span class='comicon' @click="componyTip"><i class="el-icon-search" ></i></span>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>部门</label>
                    <el-input v-model="branchName.branchName" size="small" class="el-inputs"  placeholder="请选择" disabled></el-input>
                    <span class='comicon' @click="departmentTip"><i class="el-icon-search" ></i></span>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>供应商</label>
                    <el-input size="small" class="el-inputs"  placeholder="请选择" v-model="supplierName.supplierName" disabled></el-input>
                    <span class='comicon' @click="supplierTips(1)" ><i class="el-icon-search" ></i></span>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>提单日期</label>
                    <el-date-picker
                        class="el-inputs el-input2"
                        v-model="blDate"
                        type="daterange"
                        size="mini" 
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>系统提单号</label>
                    <el-input  size="small" v-model="sysBlNo" class="el-inputs" placeholder="请输入"></el-input>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>提单号</label>
                    <el-input  size="small" v-model="bizBlNo" class="el-inputs" placeholder="请输入"></el-input>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>负责货代</label>
                    <el-input size="small" class="el-inputs"  placeholder="请选择" v-model="goodsProxyCompany" disabled></el-input>
                    <span class='comicon' @click="supplierTips(2)" ><i class="el-icon-search" ></i></span>
                </el-col>
                <el-col :span="5" class="el-colc">
                    <label>单据状态</label>
                    <el-select clearable  size="small" class="el-inputs el-select"  v-model="blStatus"  placeholder="请选择" >
                        <el-option v-for="item in blStatusList"
                                    :key="item.dict_code"  
                                    :label="item.dict_value"
                                    :value="item.dict_code"
                            ></el-option>
                        </el-select>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>采购合同号</label>
                    <el-input  size="small" v-model="contractNo" class="el-inputs" placeholder="请输入"></el-input>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>外部合同号</label>
                    <el-input  size="small" v-model="extCode" class="el-inputs" placeholder="请输入"></el-input>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>物料名称</label>
                    <el-input v-model="matterName.skuName" size="small" class="el-inputs"  placeholder="请选择" disabled></el-input>
                    <span class='comicon' @click="matterTips"><i class="el-icon-search" ></i></span>
                </el-col>
                <el-col :span="5" class="el-col" style="margin-bottom:10px">
                    <label>创建时间</label>
                    <el-date-picker
                        v-model="createdTime"
                        type="daterange"
                        class="el-inputs el-input2"
                        size="mini"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-col>
            </div>
        </div>
        <div class="button-div auto-sibling">
            <el-button @click="download()" v-if="$actionFlag(`F001`)"  icon="el-icon-download">导出</el-button>
        </div>
        <!-- 表格  开始 -->
        <div class="el-table-div" v-auto>
            <el-table 
                border center 
                ref="multipleTable"
                :data="tableData" 
                height="calc(100% - 35px)"
                show-summary
                :summary-method="getSummaries"
                 class="el-table" v-loading="loading">
                <el-table-column type="index" width="50" label="序号">
                </el-table-column>
                <el-table-column prop="sysBlNo" label="系统提单号"  width="120px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="bizBlNo" label="提单号" width="100px" :show-overflow-tooltip="true">
                </el-table-column>
                 <!-- <el-table-column prop="blRowno" label="提单行号" width="100px" :show-overflow-tooltip="true">
                </el-table-column> -->
                <el-table-column prop="blStatusName" label="单据状态" width="100px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="companyName" label="公司" width="180px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="orgName" label="部门" width="160px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="supplierName" label="供应商" width="180px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="priceTemName" label="价格条款" width="100px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="shipName" label="船名" width="100px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="goodsProxyCompany" label="货代公司" width="180px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="unloadingPort" label="到达港口" width="100px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="actArrivedDate" label="实际到港日期" width="100px" :show-overflow-tooltip="true">
                </el-table-column>
                <!-- <el-table-column prop="createdName" label="创建人" width="100px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="createdTime" label="创建时间" width="100px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="updatedName" label="修改人" width="110px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="updatedTime" label="修改时间" width="110px" :show-overflow-tooltip="true">
                </el-table-column> -->
                <el-table-column prop="contractNo" label="采购合同号" width="110px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="extCode" label="外部合同号" width="110px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="goodsCat" label="物料大类" width="110px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="goodsCode" label="物料编号" width="110px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="goodsName" label="物料名称" width="110px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="goodsSpec" label="物料规格" width="140px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="itemQty" label="到货数量" width="150px" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="content_right">
                        <span>{{$numberToFixed(scope.row.itemQty, 3)}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="secQty" label="第二数量" width="150px" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="content_right">
                        <span>{{$numberToFixed(scope.row.secQty, 3)}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="itemUnitName" label="基础单位" width="110px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="remark" label="备注" width="110px" :show-overflow-tooltip="true">
                </el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pageNum" :page-sizes="[100, 200, 300,500]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
         <!-- 选择公司弹窗 -->
        <compony-select v-if="componyShow" :tipShow='componyShow' @tipsCancle="tipsCancle" @tipsSure="tipsSure">
        </compony-select>
        <!-- 选择部门弹窗 -->
        <department-select v-if="departmentShow" :tipShow='departmentShow' :data='companyName' @departmentCancle="departmentCancle" @departmentSure="departmentSure">
        </department-select>
        <!--供应商弹窗-->
        <supplier-select v-if="supplierShow" :tipShow='supplierShow'  @supplierCancle="supplierCancle" @supplierSure="supplierSure">
        </supplier-select>
        <!--选择物料号-->
        <matter-select v-if="matterShow" :tipShow='matterShow'  @matterCancle="matterCancle" @matterSure="matterSure">
        </matter-select>
    </div>
</template>
<script>
import { mapState } from "vuex";
import api from "@/api/reportQuery/bill";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import supplierSelect from "@/components/supplierSelect.vue";
import matterSelect from "@/components/matterSelect.vue";
import {Loading } from "element-ui";
export default {
    name:"arrivalPortInfo",
    data(){
        return{
            componyShow: false, //公司弹窗
            departmentShow: false, //部门弹窗
            supplierShow:false,//供应商弹窗
            matterShow: false, //物料弹窗
            supplierShow: false, //供应商
            companyName:``,//公司名
            branchName:{},//部门
            supplierName:{},//供应商
            matterName: {}, //物料名称
            supplierName: {}, //供应商名称
            sysBlNo:'',//系统提单号
            bizBlNo:'',//提单号
            goodsProxyCompany:'',//负责贷代
            contractNo:'',//采购合同号
            extCode:'',//外部合同号
            blDate:[],//提单日期
            createdTime:[],//创建时间
            blStatus:'',//单据状态
            blStatusList:[],//单据状态列表
            priceList:[],
            pageSize:100,
            pageNum:1,
            total:0,
            tableData:[],//列表
            loading:false,
            sumTol: {},//总计
            show:true,//查询条件显示隐藏
            supplierType:'',//1供应商，2货代公司
        }
    },
    created(){
        this.getBlStatusList();
        this.getPriceList();//价格条款
        if(window.IsShowDefaultCompanyInfo){
        this.companyName=window.defaultCompanyInfo;
      }
    },
    methods: {
        //列表
        initData(){
            this.loading=true;
            if(this.createdTime.length){
                var createdTime=this.createdTime[0];// - 创建时间开始
                var createdTimeEnd=this.createdTime[1];// - 创建时间结束
            }
            if(this.blDate.length){
                var blStartDate=this.blDate[0];//- 提单开始日期
                var blEndDate=this.blDate[1];//- 提单结束日期
            }
            let data={
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                blStartDate:blStartDate,
                blEndDate:blEndDate,
                blStatus:this.blStatus,
                createdTime:createdTime,
                createdTimeEnd:createdTimeEnd,
                supplierId:this.supplierName.supplierId,//供应商id
                goodsCode:this.matterName.skuCode,//物料id
                companyId:this.companyName.companyId,
                orgId:this.branchName.branchId,
                sysBlNo:this.sysBlNo,//系统提单号
                bizBlNo:this.bizBlNo,//提单号
                goodsProxyCompany:this.goodsProxyCompany,//负责贷代
                contractNo:this.contractNo,//采购合同号
                extCode:this.extCode,//外部合同号
            }
            api.queryInstrumentBillReportForms(data).then(res => {
                if(res.code=="success"){
                    let list=res.data;
                    list.forEach(ele=>{
                        ele.createdTime=this.$timeFun(ele.createdTime,true);
                        ele.updatedTime=this.$timeFun(ele.updatedTime,true);
                        ele.actArrivedDate=this.$timeFun(ele.actArrivedDate,true);
                        ele.blStatus=""+ele.blStatus;
                        this.blStatusList.forEach(s=>{
                            if(ele.blStatus==s.dict_code){
                                ele.blStatusName=s.dict_value;
                            }
                        });
                        ele.priceTem=""+ele.priceTem;//价格条款
                        this.priceList.forEach(p=>{
                            if(ele.priceTem==p.dict_code){
                                ele.priceTemName=p.dict_value;
                            }
                        });
                    })
                    this.tableData=list;
                    this.total=res.total;
                }else{
                    this.$openWarning(res.message);
                }
                this.loading=false;
            }).catch(); 
        },
         download(){
            if(this.createdTime.length){
                var createdTime=this.createdTime[0];// - 创建时间开始
                var createdTimeEnd=this.createdTime[1];// - 创建时间结束
            }
            if(this.blDate.length){
                var blStartDate=this.blDate[0];//- 提单开始日期
                var blEndDate=this.blDate[1];//- 提单结束日期
            }
            let data={
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                blStartDate:blStartDate,
                blEndDate:blEndDate,
                blStatus:this.blStatus,
                createdTime:createdTime,
                createdTimeEnd:createdTimeEnd,
                supplierId:this.supplierName.supplierId,//供应商id
                goodsCode:this.matterName.skuCode,//物料id
                companyId:this.companyName.companyId,
                orgId:this.branchName.branchId,
                sysBlNo:this.sysBlNo,//系统提单号
                bizBlNo:this.bizBlNo,//提单号
                goodsProxyCompany:this.goodsProxyCompany,//负责贷代
                contractNo:this.contractNo,//采购合同号
                extCode:this.extCode,//外部合同号
            }
                //使用Element loading-start 方法
            var loading2 = Loading.service({
                lock: true,
                text: "加载中...",
                background: "rgba(0, 0, 0, 0.7)"
            });
            api.exportOdBllReportForms(data).then(res=>{
                if(res.code=="fail"){
                    this.$openWarning(res.message);
                }else{
                    const blob = new Blob([res.data]);
                    const a = document.createElement("a");
                    const url = window.URL.createObjectURL(blob);
                    const filename ="到港信息报表.xls";
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
        inputShow() {
            this.show = this.$showOne(this.show);
        },
        //单据状态
        getBlStatusList(){
            let data={
                dictNo:1011
            }
            api.billStatus(data).then(res => {
				this.blStatusList = res.data;
            }).catch(); 
        },
        //价格条款
        getPriceList(){
            let data={
                dictNo:1016
            }
            api.billStatus(data).then(res => {
				this.priceList = res.data;
            }).catch(); 
        },
        //查询
        queryData(){
            this.initData();
            this.getSum();
        },
        //重置
        resetData(){
            if(window.IsShowDefaultCompanyInfo){
                this.companyName=window.defaultCompanyInfo;
            }else{
                this.companyName = {}; //公司
            }
            this.branchName={};//部门
            this.supplierName={};//供应商
            this.matterName={}; //物料名称
            this.supplierName={}; //供应商名称
            this.sysBlNo='';//系统提单号
            this.bizBlNo='';//提单号
            this.goodsProxyCompany='';//负责贷代
            this.contractNo='';//采购合同号
            this.extCode='';//外部合同号
            this.blStatus='';
            this.createdTime=[];
            this.blDate=[];

        },
         //分页
        handleSizeChange(val) {
            this.pageSize = val;
            this.initData();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.initData();
        },
        //获取总计
        getSum() {
            if(this.createdTime.length){
                var createdTime=this.createdTime[0];// - 创建时间开始
                var createdTimeEnd=this.createdTime[1];// - 创建时间结束
            }
            if(this.blDate.length){
                var blStartDate=this.blDate[0];//- 提单开始日期
                var blEndDate=this.blDate[1];//- 提单结束日期
            }
            let data={
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                blStartDate:blStartDate,
                blEndDate:blEndDate,
                blStatus:this.blStatus,
                createdTime:createdTime,
                createdTimeEnd:createdTimeEnd,
                supplierId:this.supplierName.supplierId,//供应商id
                goodsCode:this.matterName.skuCode,//物料id
                companyId:this.companyName.companyId,
                orgId:this.branchName.branchId,
                sysBlNo:this.sysBlNo,//系统提单号
                bizBlNo:this.bizBlNo,//提单号
                goodsProxyCompany:this.goodsProxyCompany,//负责贷代
                contractNo:this.contractNo,//采购合同号
                extCode:this.extCode,//外部合同号
            }
            api.queryFormsSums(data).then(res => {
                this.sumTol = res.data;
            }).catch();
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
                if (["itemQty","secQty"].findIndex(it => it == key) !== -1) {
                    sums[index] = this.sumTol?this.$sumTolFormat(this.sumTol[key]):"";
                } else {
                    sums[index] = "";
                }
            });
            this.$nextTick(() => {
                this.$refs.multipleTable.doLayout();
            });
            return sums;

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
            this.branchName='';//部门
        },
          //部门弹窗打开
        departmentTip() {
            // if (this.companyName == ``) {
            //     this.$openWarning('请先选择公司');
            //     return false;
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
        },
         //物料号弹窗
        matterTips() {
            this.matterShow = true;
        },
        //物料号弹窗关闭
        matterCancle() {
            this.matterShow = false;
        },
        //物料号确定获取数据
        matterSure(e) {
            this.matterShow = false;
            this.matterName = e;
        },
        //供应商弹窗
        supplierTips(type) {
            this.supplierType=type;
            this.supplierShow = true;
        },
        //供应商弹窗关闭
        supplierCancle() {
            this.supplierShow = false;
        },
        //供应商确定获取数据
        supplierSure(e) {
            this.supplierShow = false;
            if(this.supplierType==1){
                this.supplierName = e;
            }else{
                this.goodsProxyCompany=e.supplierName;
            }
            
        },
    }, 
    components: {
        componySelect,
        departmentSelect,
        supplierSelect,
        matterSelect
    }
}
</script>
