<template>
    <div id="settlementSheet" class="content-div">
        <div class="button-div button-div-query auto-sibling">
            <el-button class="query-button" @click="getUserlist" icon="el-icon-search">查询</el-button>
            <el-button @click="clearmsg" icon="el-icon-refresh">重置</el-button>
        </div>
        <div class="input-div auto-sibling">
            <p class="hide-input" v-if="showOrHide" @click="inputShow()">
                更多条件 <i class="el-icon-caret-bottom"></i>
            </p>
            <p class="hide-input" v-else @click="inputShow()">
                收起<i class="el-icon-caret-top"></i>
            </p>
            <div class="search-div">
                <el-col :span="5" class="el-col">
                    <label>公司</label>
                    <el-input v-model="companyName.companyName" class="el-inputs" placeholder="请选择" disabled></el-input>
                    <span class="comicon" @click="componyTip"><i class="el-icon-search"></i></span>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>部门</label>
                   <!-- <el-input v-model="branchName.branchName" class="el-inputs" placeholder="请选择"></el-input>
                    <span class="comicon" @click="departmentTip"><i class="el-icon-search"></i></span> -->
                    <el-select  v-model="branchName"
                        class="el-inputs"
                        placeholder="请选择"
                        multiple
                        filterable
                        remote
                        :remote-method="getDepartment"
                        collapse-tags
                        value-key="branchId"
                        >
                            <el-option
                                v-for="item in departmentList"
                                :key="item.branchId"
                                :label="item.branchName"
                                :value="item">
                            </el-option>
                    </el-select>
                    <span class="comicon" @click="departmentTip" style="width: 10%;z-index: 2"
                        ><i class="el-icon-search"></i
                    ></span>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>期间</label>
                    <el-date-picker 
                    style="width:70%"
                    value-format="yyyy-MM" v-model="accountingMonth" type="monthrange" size="mini"
                        start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>仓库</label>
                    <el-input v-model="warehouseName.warehouseName" size="small" class="el-inputs" placeholder="请选择"
                        disabled></el-input>
                    <span class="comicon" @click="warehouseTips"><i class="el-icon-search"></i></span>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>物料编号</label>
                    <el-input v-model="mattermsg.skuCode" class="el-inputs" placeholder="请输入" disabled></el-input>
                    <span class="comicon" @click="matterTips"><i class="el-icon-search"></i></span>
                </el-col>
                <el-col :span="5" class="el-col">
                    <label>批次号</label>
                    <el-input v-model="batchCode" size="small" class="el-inputs" placeholder="请输入"></el-input>
                </el-col>
            </div>
        </div>
        <div class="button-div auto-sibling">
            <el-button icon="el-icon-download" v-if="$actionFlag(`F001`)"  @click="exportExcel">导出</el-button>
        </div>
        <!-- 表格 -->
        <div class="el-table-div" v-auto>
            <el-table border center ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                height="calc(100% - 35px)" @selection-change="handleSelectionChange" @row-click="rowClick" 
                    v-loading="loading"
                 :cell-class-name="cell">
                <el-table-column type="selection" width="55" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="accountingMonth" width="120" label="会计月" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="companyName" width="140" label="公司名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="orgName" label="部门名称" width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="supplierName" label="供应商" width="140" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="postDate" label="过账日期" width="120" show-overflow-tooltip>
                    <template slot-scope="scope">
                            <span>{{scope.row.postDate | time2Date}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="warehouseName" label="仓库名称" width="140" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="skuCode" label="物料编号" width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="skuName" label="品名" width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="batchCode" label="批次编号" width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="propertyInfo" label="规格型号" width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="firstUnitName" label="第一单位" width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="invQtyS" label="第一单位结存数量" width="120" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="content_right">
                        <span>{{$numberToFixed(scope.row.invQtyS, 3)}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="单价" width="120" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="content_right">
                            <span>{{$unitProfitFormat({},{},scope.row.price)}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  label="结存金额" width="120" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="content_right">
                            <span>{{$moneyFormat({},{},scope.row.invAmt)}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="secUnitName" label="第二单位" width="120" show-overflow-tooltip>
                </el-table-column>
                 <el-table-column prop="secUnitQty" label="第二单位结存数量" width="120" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="content_right">
                        <span>{{$numberToFixed(scope.row.secUnitQty, 3)}}</span>
                        </div>
                    </template>
                </el-table-column>
                 <el-table-column prop="wvNo" label="入库单号" width="120" show-overflow-tooltip>
                </el-table-column>
                 <el-table-column prop="postDate" label="入库时间" width="120" show-overflow-tooltip>
                      <template slot-scope="scope">
                            <span>{{scope.row.postDate | time2Date}}</span>
                        </template>
                </el-table-column>
                 <el-table-column prop="extPoNo" label="外部采购合同号" width="120" show-overflow-tooltip>
                </el-table-column>
                 <el-table-column prop="erpPoNo" label="系统采购合同号" width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="bizPersonName" label="业务员" width="120" show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div>
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="pageNum" :page-sizes="[100, 200, 300,500]" :page-size="rows"
                    layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
            <!-- 选择公司弹窗 -->
            <compony-select v-if="componyShow" :tipShow="componyShow" @tipsCancle="tipsCancle" @tipsSure="tipsSure">
            </compony-select>
            <!-- 选择部门弹窗 -->
            <department-select v-if="departmentShow" :tipShow="departmentShow" :data="companyName"
                @departmentCancle="departmentCancle" @departmentSure="departmentSure">
            </department-select>
            <!-- 选择供应商弹窗 -->
            <supplier-select v-if="supplierShow" :tipShow="supplierShow" @supplierCancle="supplierCancle"
                @supplierSure="supplierSure">
            </supplier-select>
              <!--选择仓库-->
            <warehouse-select v-if="warehouseShow" :tipShow="warehouseShow" @warehouseCancle="warehouseCancle"
                @warehouseSure="warehouseSure">
            </warehouse-select>
             <!--选择物料号-->
             <matter-select v-if="matterShow" :tipShow="matterShow" @matterCancle="matterCancle"
                 @matterSure="matterSure">
             </matter-select>
      </div>
    </div>
</template>

<script>
    import axios from "axios";
    import {
        mapState
    } from "vuex";
    import Compony from "@/api/comdepartment/componySelect";
    import componySelect from "@/components/componySelect.vue"; //公司组件
    import departmentSelect from "@/components/departmentSelect2.vue"; //部门组件
    import supplierSelect from "@/components/supplierSelect.vue"; //供应商组件
    import warehouseSelect from "@/components/warehouseSelect.vue"; //仓库组件
    import matterSelect from "@/components/matterSelect.vue"; //物料组件
    import {
        service,
        serviceJson
    } from "../../../axios/index.js";
    import { getMonthstock,exportOdInventoryMonList } from "@/api/monthStock/monthstock.js";
    export default {
        name: "monthStock",
        props: {},
        data() {
            return {
                departmentList:[],
                loading: true,
                total: 0, //条数
                pageNum: 1, //页码数
                rows: 100, //每页条数
                componyShow: false, //公司弹窗
                companyName: ``, //公司
                branchName: [], //部门
                departmentShow: false, //部门弹窗
                supplierName: "", //供应商名称
                supplierShow: false, //供应商弹窗
                warehouseShow: false, //仓库弹窗
                warehouseName: "", //仓库
                accountingMonth:[],//期间
                batchCode:"",//批次
                showOrHide: true,
                reducemsg: [], //选中数据
                tableData: [],
                matterShow: false, //物料弹窗
                mattermsg: "", //物料弹窗数据
            };
        },
        computed: {},
        created() {},
        mounted() {
             this.getUserlist();
        },
        watch: {},
        methods: {
            getDepartment(str) {
            if (!str) {
                return;
            }
            // if (!this.company.companyId) {
            //   this.$openWarning("请先选择公司");
            //   return;
            // }
            let params = {
                pageNum: 1,
                rows: 200,
                companyId: this.companyName.companyId,
                branchName: str,
                branchCode: "",
                isCollected: 0,
            };
            Compony.brnchList2(params)
                .then((res) => {
                this.departmentList = res.data.list;
                })
                .catch(() => {});
            },
            cell({row, column, rowIndex, columnIndex}) {
                if(column.property=="reservedQtyS" || column.property=="outInvQtyS"
                || column.property=="batchInvQtyS" || column.property=="invQtyS"
                || column.property=="batchInvAmt"){
                    return 'rightTd'
                }else{
                    return "";
                }
            },
            rowClick(row){
                this.$refs.multipleTable.toggleRowSelection(row);
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
                this.mattermsg = e;
                this.skuName = e.skuName;
            },
            getUserlist() {//加载表格数据
                if (this.accountingMonth) {
                    var accountingMonthBegin = this.accountingMonth[0];
                    var accountingMonthEnd = this.accountingMonth[1];
                }
                if(this.batchCode){
                    var batchCode=this.batchCode;
                }
                getMonthstock({
                    rows: this.rows,
                    pageNum: this.pageNum,
                    companyId: this.companyName.companyId,
                    bbBranchBaseList: this.branchName,
                    accountingMonthBegin,//期间（到月份）
                    accountingMonthEnd,
                    batchCode:batchCode,
                    warehouseCode:this.warehouseName.warehouseCode,
                    skuCode:this.mattermsg.skuCode,
                }).then(res => {
                    if (res.code === "success") {
                        console.log(res);
                        this.loading = false;
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                        // this.tableData.forEach(i => {
                        //     i.createdTime = this.$timeFun(i.createdTime, true);
                        //     i.balanceDate = this.$timeFun(i.balanceDate, true);
                        // });
                    }
                });
            },
            exportExcel(){
                this.$confirm("为避免导出数据过多影响其它业务功能，请尽量利用查询条件筛选有效数据后再导出！", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    if (this.accountingMonth) {
                        var accountingMonthBegin = this.accountingMonth[0];
                        var accountingMonthEnd = this.accountingMonth[1];
                    }
                    if(this.batchCode){
                        var batchCode=this.batchCode;
                    }
                    let data = {
                        companyId: this.companyName.companyId,
                        bbBranchBaseList: this.branchName,
                        accountingMonthBegin,//期间（到月份）
                        accountingMonthEnd,
                        batchCode:batchCode,
                        warehouseCode:this.warehouseName.warehouseCode,
                        skuCode:this.mattermsg.skuCode,
                    };
                    exportOdInventoryMonList(data).then(res=>{
                        const blob = new Blob([res.data]);
                        const a = document.createElement("a");
                        const url = window.URL.createObjectURL(blob);
                        const filename ="月结库存明细.xls";
                        a.href = url;
                        a.download = filename;
                        a.click();
                        window.URL.revokeObjectURL(url);
                
                    }).catch();
                }).catch();
            },
            tipsSure(e) {//公司弹窗确定获取数据
                this.componyShow = false;
                this.companyName = e;
                this.branchName = [];
            },
            componyTip() { //公司弹窗打开
                this.componyShow = true;
            },
            tipsCancle() { //公司弹窗关闭
                this.componyShow = false;
            },
            departmentTip() {//部门弹窗打开
                // if (this.companyName == ``) {
                //     this.$openWarning("请先选择公司");
                //     return false;
                // }
                this.departmentShow = true;
            },
            departmentCancle() {//部门弹窗关闭
                this.departmentShow = false;
            },
            departmentSure(e) {//部门弹窗确定获取数据
                this.departmentShow = false;
                this.branchName = e;
                this.departmentList = e;
            },
            supplierTip() {//供应商弹窗打开
                this.supplierShow = true;
            },
            supplierCancle() {//供应商弹窗关闭
                this.supplierShow = false;
            },
            supplierSure(e) { //供应商弹窗确定获取数据
                this.supplierShow = false;
                this.supplierName = e;
            },
            warehouseTips() {//仓库弹窗
            this.warehouseShow = true;
            },
            warehouseCancle() { //仓库弹窗关闭
            this.warehouseShow = false;
            },
            warehouseSure(e) { //仓库弹窗确定获取数据
            this.warehouseShow = false;
            this.warehouseName = e;
            },
            inputShow() {
                this.showOrHide = this.$showOne(this.showOrHide);
            },
            handleSelectionChange(val) {//表格选中数据
                this.reducemsg = val;
            },
            handleSizeChange(val) {//每页条数
                this.rows = val;
                this.getUserlist();
            },
            handleCurrentChange(val) {//当前页码数            
                this.pageNum = val;
                this.getUserlist();
            },
            clearmsg() {//重置
                this.companyName = this.warehouseName = this.batchCode = this.mattermsg= "";
                this.accountingMonth=[]; 
                this.branchName = [];
            }
        },
        components: {
            componySelect,
            departmentSelect,
            supplierSelect,
            warehouseSelect,
            matterSelect
        }
    };
</script>

<style scoped lang="scss">
     #settlementSheet {
        .el-date-editor.el-input {
            width: auto;
        }
     
    } 
     /deep/ .el-select__tags {
        .el-tag--light {
            height: auto;
            line-height: normal;
            }
        } 
    
</style>