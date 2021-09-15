<template>
    <div>
        <div class="button-div">
            <el-button  class="query-button" icon="el-icon-suitcase" @click="saveSaleOutboundOrder()">保存</el-button>
            <el-button  @click="cancel()" icon="el-icon-close">取消</el-button>
        </div>
        <div class="input-div"> 
            <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>公司</label>
                <el-input v-model="companyName.companyName" class="el-inputs" :class="errorKey.includes('companyName') ? 'inputRed' : ''" size="small"  disabled></el-input>
                 <span v-if="type==1"  class="comicon" @click="componyTip()"
                    ><i class="el-icon-search"></i
                ></span>
            </el-col>
            <el-col :span="5" class="el-col el-col-required">
                <label><span class="must-full">*</span>会计月</label>
                <el-date-picker
                        type="month"
                        size="small"
                        :class="errorKey.includes('accountingMonth') ? 'inputRed' : ''"
                        v-model="accountingMonth"
                        value-format="yyyy-MM"
                        :disabled="this.type==2"
                        >
                </el-date-picker>   
            </el-col>
        </div>
        <!-- 表格 -->
        <div class="button-div">
            <el-button class="addBut" icon="el-icon-plus"  @click="addRow">添加行</el-button>
            <el-button class="addBut" @click="deleteRow()" icon="el-icon-minus" >删除行</el-button>
            <el-button class="addBut"   @click="getMonthCashS">获取上月月末现款占用</el-button>
        </div>
        <div class="el-table-div">
                <!-- 表格 -->
            <el-table border center  
                ref="table" 
                :data="tableData" 
                tooltip-effect="dark"
               @selection-change="handleChange"
                @row-dblclick="costDblclick"
                max-height="320"
                class="el-table">
                <el-table-column type="selection" width="80" align="center"></el-table-column> 
                <el-table-column prop="orgCode" label="部门代码" width="120px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="orgName" label="部门名称" width="180px" :show-overflow-tooltip="true"> 
                </el-table-column>
                <el-table-column prop="monthCashS"  label="月初现款占用" width="120px" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="preMonthCashE" label="上月月末现款占用" width="140px"  :show-overflow-tooltip="true"> 
                </el-table-column>
                <el-table-column prop="editCash" label="现款占用调整项"   :show-overflow-tooltip="true"> 
                    <template slot-scope="scope">
                        <div v-if='scope.row.edit'>
                            <label><span class="must-full">*</span></label>
                            <el-input type='number' v-model="scope.row.editCash"   size="mini" class="el-inputs" placeholder="请输入" 
                            @input="calculationCash(scope.row,scope.$index,1)"></el-input>
                        </div>
                        <div v-else>
                            {{scope.row.editCash}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="monthAcceptS" label="月初承兑资金占用" width="140px" :show-overflow-tooltip="true"> 
                </el-table-column>
                 <el-table-column prop="preMonthAcceptE" label="上月月末承兑占用" width="140px" :show-overflow-tooltip="true"> 
                </el-table-column>
                <el-table-column prop="editAccept" label="承兑占用调整项" :show-overflow-tooltip="true"> 
                    <template slot-scope="scope">
                        <div v-if='scope.row.edit'>
                             <label><span class="must-full">*</span></label>
                            <el-input type='number' v-model="scope.row.editAccept"   size="mini" class="el-inputs"
                             placeholder="请输入"  @input="calculationCash(scope.row,scope.$index,2)"></el-input>
                        </div>
                        <div v-else>
                            {{scope.row.editAccept}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  label="备注"  :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                    <div v-if='scope.row.edit'>
                        <el-input v-model="scope.row.remark" size="mini" class="el-inputs" placeholder="请输入"></el-input>
                    </div>
                    <div v-else>
                        {{scope.row.remark}}
                    </div>
                    </template>
                </el-table-column>
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
import {
  savePreMonthFiCashTakeUpList,
  selectPreMonthFiCashTakeUpList,
  deleteFiCashTakeUpList,
  selectFiCashTakeUpList
} from "@/api/fundPlansManage/definitionOfFundPlan";
import Count from "@/assets/js/calculation";
export default {
    name:'cashOccupyManageEdit',
    data(){
        return{
            companyName:{},
            companyId:"",
            componyShow:false,
            branchShow:false,
            tableData:[],
            selectIndex:0,
            errorKey:[],
            accountingMonth:'',
            selected:[],
            type:''
        }
    },
    mounted(){
        this.type=this.$route.query.type;
        if(this.type==2){
            this.selecteDataInfo();
        }
    },
    methods:{
        selecteDataInfo(){
            let data=JSON.parse(sessionStorage.getItem("queryData"));
            selectFiCashTakeUpList(data).then(res=>{
                let dataInfo=res.data;
                this.companyName.companyId=dataInfo[0].companyId;
                this.companyName.companyCode=dataInfo[0].companyCode;
                this.companyName.companyName=dataInfo[0].companyName;
                this.accountingMonth=dataInfo[0].accountingMonth;
                this.tableData=dataInfo;
            })
        },
        saveSaleOutboundOrder(){
            this.errorKey = [];
            if (JSON.stringify(this.companyName) === "{}") {
                this.errorKey.push('staffName');
            }
            if (this.accountingMonth=="") {
                this.errorKey.push('accountingMonth');
            }
            if(this.errorKey.length > 0) {
                this.$openWarning("请将必填项补充完整！");
                return false;
            }
            for(let i=0;i<this.tableData.length;i++){
                let item=this.tableData[i];
                if(item.editCash==='' || item.editAccept===''){
                    this.$openWarning("请将表格数据填写完整！");
                    return;
                }
            }
            let list=this.tableData;
            list.forEach(e=>{
                e.companyId=this.companyName.companyId;
                e.companyName=this.companyName.companyName;
                e.companyCode=this.companyName.companyCode;
                e.accountingMonth=this.accountingMonth;
            })
            savePreMonthFiCashTakeUpList(list).then(res=>{
                if(res.code=="success"){
                    this.$openSuccess(res.message);
                    this.cancel();
                }else{
                    this.$openWarning(res.message)
                }
            })
        },
        cancel(){
            this.$router.push({
                //核心语句
                path:"/index/fundsManage/occupyManage/cashOccupyManageIndex", //跳转的路径
            });
        },
        deleteRow(){
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
                let list=[];
                this.selected.forEach((e,index)=>{
                    if(e.id){
                        list.push(e);
                    }
                })
                deleteFiCashTakeUpList(list).then(res => {
                    if(res.code=="success"){
                        this.$openSuccess("删除成功");
                        this.selected.forEach(e=>{
                            this.tableData.forEach((item,index)=> {
                              if(e.id==item.id){
                                    this.tableData.splice(index,1);
                                }
                             });
                        })
                    this.$set(this.tableData,this.selectIndex,this.tableData[this.selectIndex]);
                    // 删除完数据之后清除勾选框
                    this.$refs.table.clearSelection();
                    }else{
                        this.$openWarning(res.message);
                    }    
                }).catch();
            }).catch(); 
            
        },
        //获取上月月末现款
        getMonthCashS(){
            if(this.tableData.length==0 || 
            !Object.keys(this.companyName).length ||
            !this.accountingMonth){
                this.$openWarning("请选择必填信息并添加行");
                return;
            }
            let orgIdList=[];
            this.tableData.forEach(it=>{
                orgIdList.push(it.orgId);
            });
            let data={
                companyId:this.companyName.companyId,
                orgIdList:orgIdList.join(","),
                accountingMonth:this.accountingMonth
            }
            selectPreMonthFiCashTakeUpList(data).then(res=>{
               if(res.code=="success"){
                   let list=res.data;
                    this.tableData.forEach(it=>{
                        it.edit=false;
                        list.forEach(e=>{     
                           if(e.orgId==it.orgId && !it.preMonthCashE && !it.preMonthAcceptE){
                               it.preMonthCashE=e.preMonthCashE;
                               it.preMonthAcceptE=e.preMonthAcceptE;
                           }
                       })
                   });
                   this.tableData[this.selectIndex].edit=true;
                   this.$set(this.tableData,this.selectIndex,this.tableData[this.selectIndex]);
                }else{
                    this.$openWarning(res.message)
                }
            })

        },
        calculationCash(row,index,type){
            //月初现款占用=上月月末现款占用+现款占用调整项
            if(type==1){
                row.monthCashS=Count.accAdd(row.preMonthCashE,row.editCash);
            }else{
                 //月初承兑资金占用=上月月末承兑占用+承兑占用调整项
                row.monthAcceptS=Count.accAdd(row.preMonthAcceptE,row.editAccept);
            }
            this.$set(this.tableData,index,row);
           
           
        },
        //部门弹窗
        addRow() {
            if(Object.keys(this.companyName).length){
                this.branchShow = true;
            }else{
                this.$openWarning("请选择公司");
            }
            
        },
        //部门弹窗关闭
        branchCancel() {
            this.branchShow = false;
        },
        //部门弹窗确定并传值
        branchSure(e) {
            let list=e;
            list.forEach(e=>{
                let flag=true;
                this.tableData.forEach(it=>{
                    if(e.branchId==it.orgId){
                        flag=false;
                    }
                });
                if(flag){
                    let obj=new Object();
                    obj.orgId=e.branchId;
                    obj.orgCode=e.branchCode;
                    obj.orgName=e.branchName;
                    obj.edit=false;
                    this.tableData.push(obj);
                }
               
            })
            this.branchShow = false;
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
        costDblclick(e) {
            this.tableData.forEach(item => {
                item.edit = false;
                if(item.orgId!=e.orgId){
                    this.selected.push(item);
                }
            });
            this.selectIndex=this.tableData.indexOf(e);
            this.tableData[this.selectIndex].edit=true;
            this.$refs.table.toggleRowSelection(e, true);
            this.$set(this.tableData,this.selectIndex, e);
        },
        //列表多选
        handleChange(e) {
            this.selected = e;
        },
        selectedRow(e) {
            this.$refs.table.toggleRowSelection(e);
        },
 
    },
    components:{
        componySelect,
        branchSelect
    }
}
</script>
<style lang="scss" >
// .index .el-col-required .el-input.is-disabled .el-input__inner{
//     background-color: #d9e8fd !important;
// }
</style>