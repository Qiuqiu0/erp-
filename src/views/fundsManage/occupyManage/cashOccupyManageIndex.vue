<!--月初现款占用管理-->
<template>
    <div class="cashOccupyManageIndex">
        <!--查询条件-->
        <div class="button-div auto-sibling">
            <el-button icon="el-icon-search" class="query-button" @click="initData">查询</el-button>
            <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
        </div>
        <div class="input-div auto-sibling">
            <el-col :span="5" class="el-col">
                <label>公司名称</label>
                <el-input
                    v-model="companyName.companyName"
                    class="el-inputs"
                    placeholder="请选择"
                    disabled
                ></el-input>
                <span class="comicon" @click="componyTip()"
                    ><i class="el-icon-search"></i
                ></span>
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
                <label>会计年月</label>
                <el-date-picker
                        type="month"
                        size="small"
                        v-model="accountingMonth"
                        value-format="yyyy-MM"
                        >
                </el-date-picker>   
            </el-col>
        </div>
        <!--列表信息-->
        <div class="button-div auto-sibling">
            <el-button icon="el-icon-folder-add" v-if="$actionFlag(`F001`)"  @click="handleEdit(1)">新增</el-button>
            <el-button icon="el-icon-edit" v-if="$actionFlag(`F002`)"   @click="handleEdit(2)">修改</el-button>
            <el-button icon="el-icon-delete" v-if="$actionFlag(`F003`)"  @click="deleteData">删除</el-button>
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
                @selection-change="handleChange"
                @row-click="selectedRow">
                <el-table-column type="selection"	width="55" fixed></el-table-column>
                <el-table-column prop="companyCode" label="公司代码" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="companyName" label="公司名称" min-width="180" show-overflow-tooltip></el-table-column>
                <el-table-column prop="orgCode" label="部门代码" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="orgName" label="部门名称" min-width="180" show-overflow-tooltip></el-table-column>
                <el-table-column prop="accountingMonth" label="会计年月" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="monthCashS" label="月初现款占用" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="monthAcceptS" label="月初承兑资金占用" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createdName" label="创建人" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column label="创建时间" min-width="160" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.createdTime | time2Date}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="updatedName" label="修改人" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column label="修改时间" min-width="160" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.updatedTime | time2Date}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="pageArea"
                background
                layout="total, sizes, prev, pager, next, jumper"
                @current-change="currentChange"
                @size-change="currentSize"
                :current-page="pageNum"
                :page-sizes="[100, 200, 300,500]"
                :page-size="pageSize"
                :total="total">
            </el-pagination>
        </div>
        <!-- 选择公司弹窗 -->
        <compony-select
          v-if="componyShow"
          :tipShow="componyShow"
          @tipsCancle="tipsCancle"
          @tipsSure="tipsSure"
        >
        </compony-select>
        <branch-select v-if="branchShow" 
        :tipShow="branchShow" 
        :data="companyName" 
        @departmentCancle="branchCancel" 
        @departmentSure="branchSure"></branch-select>   
    </div>
</template>
<script>
import componySelect from "@/components/componySelect.vue"; //公司组件
import branchSelect from "@/components/departmentSelect2.vue";
import Compony from "@/api/comdepartment/componySelect";
import {
  selectFiCashTakeUpList,
  deleteFiCashTakeUpList
} from "@/api/fundPlansManage/definitionOfFundPlan";
export default {
    name:'cashOccupyManageIndex',
    components:{
        componySelect,
        branchSelect
    },
    data(){
        return{
            loading: false,
            selected: [], //列表选中行
            pageNum: 1,
            pageSize: 100,
            total: 0,
            tableData:[],
            componyShow:false,
            companyName:{},
            companyId:'',
            branchShow:false,
            departmentList_:[],
            branchName_:[],
            accountingMonth:''
        }
    },
    mounted(){
        this.initData();
    },
    methods:{
        initData(){
            let data={
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                bbBranchBaseList:this.branchName_,
                companyId:this.companyName.companyId,
                accountingMonth:this.accountingMonth
            }
            selectFiCashTakeUpList(data).then(res=>{
                this.tableData=res.data;
                this.total=res.total;
            })
            
        },
        deleteData(){
             //基础数据
            if (this.selected.length==0) {
                //判断商品明细是否选中
               this.$openWarning("请选择数据");
                return;
            }
            this.$confirm("是否确定删除?", "删除提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                deleteFiCashTakeUpList(this.selected).then(res => {
                    if(res.code=="success"){
                        this.$openSuccess("删除成功");
                        this.initData();
                    }else{
                        this.$openWarning(res.message);
                    }    
                }).catch();
            }).catch(); 
        },
        reset(){
            this.companyName={};
            this.branchName_=[];
            this.accountingMonth='';
        },
        handleEdit(type){
            if(type==2){
               if (this.selected.length==0) {
                    //判断商品明细是否选中
                    this.$openWarning("请选择数据");
                    return;
                }else if(this.selected.length>1){
                    this.$openWarning("只能单条操作");
                    return;
                }
              let data={
                  companyId:this.selected[0].companyId,
                  companyCode:this.selected[0].companyCode,
                  companyName:this.selected[0].companyName,
                  accountingMonth:this.selected[0].accountingMonth
              }
              sessionStorage.setItem("queryData",JSON.stringify(data));
            }
            this.$router.push({
                //核心语句
                path:"/index/fundsManage/occupyManage/cashOccupyManageEdit", //跳转的路径
                query: {
                    type: type,
                },
            });
        },
        //列表多选
        handleChange(e) {
            this.selected = e;
        },
        selectedRow(e) {
            this.$refs.multipleTable.toggleRowSelection(e);
        },
        //翻页
        currentChange(e) {
            this.page = e;
            this.initData();
        },
        //单页数量
        currentSize(e) {
            this.page = 1;
            this.pageSize = e;
            this.initData();
        },
        //公司弹窗确定获取数据
        tipsSure(e) {
            this.companyName=e;
            this.companyId=e.companyId;
            this.componyShow = false;
        },
        //公司弹窗打开
        componyTip(e) {
            this.componyShow = true;
        },
        //公司弹窗关闭
        tipsCancle() {
            this.componyShow = false;
        },
        getDepartment(str){
            if(!str){
                return
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