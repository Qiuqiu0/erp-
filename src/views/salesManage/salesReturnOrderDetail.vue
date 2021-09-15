<template>
    <div id="salesReturnOrderDetail">
        <div class="button-div">
            <el-button  @click="cancel()" icon="el-icon-back">返回</el-button>
        </div>
        <el-tabs class="el-tabs" v-model="activeName" type="card" @tab-click="handleClick" >
            <el-tab-pane  label="抬头数据" name="one">
                <div class="index-div3 index-div">
                    
                    <el-col :span="5" class="el-col">
                        <label><span class="must-full">*</span>公司</label>
                        <el-input v-model="basicData.companyName" class="el-inputs" size="small" disabled></el-input>
                       
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label><span class="must-full">*</span>部门</label>
                        <el-input v-model="basicData.branchName" size="small" class="el-inputs"   disabled></el-input>
                       
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label><span class="must-full">*</span>业务员</label>
                        <el-input v-model="basicData.staffName" size="small" class="el-inputs"  disabled></el-input>
                      
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label><span class="must-full">*</span>退货单号</label>
                        <el-input  size="small" v-model="basicData.undoCode"  class="el-inputs" disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label><span class="must-full">*</span>销售出库单号</label>
                        <el-input  size="small" v-model="basicData.doNo" class="el-inputs" disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-colc">
                        <label><span class="must-full">*</span>退货类型</label>
                        <el-select clearable  size="small" class="el-select"  v-model="basicData.undoType" disabled>
                        <el-option v-for="item in basicData.undoTypeList"
                                    :key="item.dict_code"  
                                    :label="item.dict_value"
                                    :value="item.dict_code"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label><span class="must-full">*</span>仓库</label>
                        <el-input v-model="basicData.warehouseName" size="small" class="el-inputs"  disabled></el-input>
                        
                    </el-col>
                     <el-col :span="5" class="el-col">
                        <label><span class="must-full">*</span>销售客户</label>
                        <el-input  class="el-inputs" v-model="basicData.customerName" size="small"  disabled></el-input>
                      
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label><span class="must-full">*</span>业务币种</label>
                        <el-input  class="el-inputs" v-model="basicData.currencyName" size="small"  disabled></el-input>
                       
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label><span class="must-full">*</span>本位币汇率</label>
                        <el-input  class="el-inputs" v-model="basicData.baseCurrencyRate"  size="small" disabled></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label><span class="must-full">*</span>人民币汇率</label>
                        <el-input  class="el-inputs" v-model="basicData.rmbCurrencyRate" size="small" disabled></el-input>
                    </el-col>
                     <el-col :span="5" class="el-colc">
                        <label><span class="must-full">*</span>状态</label>
                        <el-select clearable  size="small" class="el-select"  v-model="basicData.undoStatus" disabled >
                        <el-option v-for="item in basicData.undoStatusList"
                                    :key="item.dict_code"  
                                    :label="item.dict_value"
                                    :value="item.dict_code"
                            ></el-option>
                        </el-select>
                    </el-col>
                     <el-col :span="5" class="el-col">
                        <label>销售合同号</label>
                        <el-input  class="el-inputs" v-model="basicData.contractCode" size="small" disabled></el-input>  
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>外部合同号</label>
                        <el-input  class="el-inputs" v-model="basicData.extContractCode" size="small" disabled></el-input>  
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>成本总额</label>
                        <el-input  class="el-inputs" v-model="basicData.sumCostAmt" size="small" disabled></el-input>
                       
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>业务币总金额</label>
                        <el-input  class="el-inputs" v-model="basicData.sumAmt" size="small" disabled ></el-input>
                        
                    </el-col>
                     <el-col :span="5" class="el-col">
                        <label>人民币总金额</label>
                        <el-input  class="el-inputs" v-model="basicData.payAmtTotalRmb" size="small" disabled ></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>总数量</label>
                        <el-input  class="el-inputs" v-model="basicData.sumQty" size="small" disabled ></el-input>
                        
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>退货日期</label>
                        <el-date-picker
                            class="el-input2"
                            v-model="basicData.undoDate"
                            type="date"
                            size="small"
                            disabled
                        >
                        </el-date-picker>
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
                    <el-col :span="24" class="el-col-textarea">
                        <label>退货原因</label>
                        <el-input
                            type="textarea"
                            autosize
                            rows="2"
                            v-model="basicData.unReason"
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
                        class="el-table" v-loading="loading">
                        <el-table-column type="selection" width="45" align="center"></el-table-column> 
                        <el-table-column prop="rowno" width="50" label="序号">
                            
                        </el-table-column>
                        <el-table-column prop="soContractCode" label="销售合同号" width="100px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="soExtNo" label="外部合同号" width="100px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="soContractRowno" label="销售合同行号" width="100px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="doNo" label="销售出库单号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="doRowno" label="销售出库单行号" width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="goodsCode" label="物料号"  width="120px" :show-overflow-tooltip="true"> 
                        </el-table-column>
                        <el-table-column prop="goodsName" label="物料名称" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="goodsCategoryName" label="物料大类" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="goodsSpec" label="物料规格" width="100px"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="batchCode" label="批次号" width="120px"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="packageCode" label="捆包号" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="itemUnitName" label="基础单位" :show-overflow-tooltip="true">
                        </el-table-column>  
                        <el-table-column prop="itemQty" label="退货数量" width="120px" :show-overflow-tooltip="true">
                             
                        </el-table-column>
                       
                        <el-table-column prop="secUnitName" label="第二单位" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="secQty" label="第二数量" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="originPrice" label="单价" :show-overflow-tooltip="true">
                           
                        </el-table-column>
                        
                        <el-table-column  prop="taxRate" label="增值税率%" width="110px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column  prop="originAmt"  label="业务币含税金额"  width="110px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="originNoAmt" label="业务币不含税金额"   width="120px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="taxAmt" label="业务币税额"  width="100px" :show-overflow-tooltip="true"> 
                        </el-table-column>
                        <el-table-column prop="baseAmt" label="本币含税金额" width="100px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="baseNoAmt" label="本币不含税金额" width="110px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="baseTax" label="本币税额" width="100px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="costPrice" label="成本单价" width="100px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="stockoutAmt" label="成本金额" width="110px" :show-overflow-tooltip="true">
                        </el-table-column>
                         <el-table-column prop="remark"  label="备注" width="120px"  :show-overflow-tooltip="true">
                        </el-table-column>
                    </el-table>
                
                </div>
               
            </el-tab-pane>
             <!--打印及附件-->
            <el-tab-pane label="打印及附件" name="third">
                <div class="el-table-div">
                <el-table
                    :data="uploadList.tableList"
                    ref="table2"
                    tooltip-effect="dark"
                    border
                    stripe
                    style="width: 100%"
                >
                    <el-table-column
                    label="序号"
                    type="index"
                    width="60"
                    align="center"
                    ></el-table-column>
                    <el-table-column prop="fileOldName" label="文件名称">
                    </el-table-column>
                    <el-table-column prop="createdTime" label="上传时间">
                    </el-table-column>
                    <el-table-column prop="createdName" label="上传人"> </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="text"
                            style="height: 26px;padding: 0;width:40px;"
                            @click="download(scope.row)">下载</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </div>
            </el-tab-pane>
            <!--系统信息-->
            <el-tab-pane  label="系统信息" name="fourth" style=" background:#fff;">
               
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
                </div>
            </el-tab-pane>
            <el-tab-pane label="流程详情"
                   name="lcxq">
                <div class="input-div input-div-bor bortop0">
                    <v-exmineStatus :id="undoId"></v-exmineStatus>
                </div>
            </el-tab-pane>
        </el-tabs>
       
    </div>
</template>
<script>
import { mapState } from "vuex";
import sApi from "@/api/salesManage/salesManage";
import calculation from "@/assets/js/calculation";
import ExmineStatus from '@/components/exmineStatus';
import uploadApi from "@/api/component";
export default {
    name:"salesReturnOrderDetail",
    data(){
        return{
            //基本信息
            basicData:{
                companyName:'',//公司名    
                branchName:'',//部门             
                staffName:'',//业务员              
                currencyCode:'',//业务币别代码
                currencyName:'',
                customerName:'',//客户            
                warehouseName:'',//仓库
                undoStatus:'',//状态 //创建的时候默认为保存
                undoStatusList:[],
                baseCurrencyRate:'',//本位币汇率
                rmbCurrencyRate:'',//人民币汇率
                undoType:'',//退货类型  
                undoTypeList:[],//退货类型下拉列表
                unReason:'',//原因  
                undoDate:'',//退货时间
                doNo:'',//出库单号
                undoCode:'',//退货单号
                sumCostAmt:'',//成本总金额
                sumQty:'',//总数量
                sumAmt:'',//业务币总金额
                contractCode:'',//销售合同号
                extContractCode:'',//外部合同号
                tableData:[],//商品明细列表数据
                payAmtTotalRmb:'',//r人民币总金额
               
            },
             //系统信息
            systemData:{
                createdTime:'',//创建时间
                createdName:'',//创建人
                updatedName:'',//修改人
                updatedTime:'',//修改时间
            },
            activeName:"one",//切换tabs
            loading:false,
            undoId:"",
            uploadList:{//附件上传
                tableList:[],
            },
            warrantMonth:"",
            warrantCode:""
        }
    },
    created(){
      this.getUndoStatus();//状态
        this.getUndoType();//退货类型
        this.initData();//获取销售出库单
        this.undoId=localStorage.getItem("undoId")
    },
    methods:{
        //销售出库单列表
        initData(){
            this.loading=true;
            let data={
               undoId:localStorage.getItem("undoId")
            }
            sApi.checkSaleUndoOrder(data).then(res=>{
                if(res.code="success"){
                    let data=res.data;
                    this.basicData.companyName=data.companyName;//公司名
                    this.basicData.branchName=data.orgName;//部门
                    this.basicData.staffName=data.bizPersonName;//员工
                    this.basicData.currencyCode=data.currencyCode;//币种
                    this.selectCurrencyName();
                    this.basicData.rmbCurrencyRate=data.rmbCurrencyRate;//人民币汇率
                    this.basicData.baseCurrencyRate=data.baseCurrencyRate;//本位币汇率
                    this.basicData.unReason=data.unReason;//原因
                    this.basicData.undoType=""+data.undoType;//类型
                    this.basicData.undoStatus=""+data.undoStatus;//状态
                    this.basicData.undoCode=data.undoCode;//退货单号
                    this.basicData.undoDate=this.$timeFun(data.undoDate,true);//退货时间
                    this.basicData.customerName=data.custName;//客户
                    this.basicData.warehouseName=data.warehouseName;//仓库
                    if(data.itemsList.length){
                        this.basicData.doNo=data.itemsList[0].doNo;//出库单号
                    }
                    this.basicData.sumCostAmt=data.sumCostAmt;//成本总金额
                    this.basicData.extContractCode=data.extContractCode;//外部合同号
                    this.basicData.contractCode=data.contractCode;//合同号
                    this.basicData.sumQty=data.sumQty;//总数量
                    this.basicData.sumAmt=data.sumAmt;//业务币总金额
                    this.basicData.payAmtTotalRmb=data.payAmtTotalRmb;//人民币总金额
                    this.systemData.createdName=data.createdName;//创建人
                    this.systemData.createdTime=this.$timeFun(data.createdTime,true);//创建时间
                    this.systemData.updatedName=data.updatedName;//创建人
                    this.systemData.updatedTime=this.$timeFun(data.updatedTime,true);//创建时间
                    this.warrantCode= data.warrantCode;//凭证号 
                    this.warrantMonth= data.warrantMonth; //期间 
                    let list=data.itemsList;
                    let that=this;
                    list.forEach(element => {
                         //销售不含税金额
                         //销售不含税金额
                        element.originNoAmt =  this.$unorginAmtCh(element.originAmt, element.taxAmt);
                            //本币不含税金额 baseNoAmt
                        element.baseNoAmt = this.$tybbnhsje(element.baseAmt,element.baseTax);
                       //业务币
                       // element.taxAmt = this.$taxAmt(element.originAmt, element.originNoAmt); 
                        element.costPrice=this.$orginPrice(element.stockoutAmt,element.itemQty);//计算成本单价
                    });
                    this.basicData.tableData=list;
                    this.loading=false;
                    this.selectFileList(data.undoId);

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
         //查询附件
    selectFileList(id){
       let data = {
        businessId:id
      };
      uploadApi.selectFileList(data)
        .then(res => {
          if (res.code == "success") {
            this.uploadList.tableList=res.data;
            this.uploadList.tableList.forEach(element => {
               element.createdTime=this.$timeFun(element.createdTime, true);
            });
          } else {
            this.$openWarning(res.message);
          }
        }).catch();
    },

    //预览
    download(row){
     window.open(row.fileServerAddress);
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
        //状态1058
         getUndoStatus(){
            let data={
                dictNo:1058
            }
           sApi.selectDoStatusList(data).then(res => {
				        this.basicData.undoStatusList = res.data;
            }).catch(); 
        },
        //获取退货类型
        getUndoType(){
            let data={
                dictNo:1059
            }
           sApi.selectDoStatusList(data).then(res => {
				      this.basicData.undoTypeList = res.data;
            }).catch(); 
        },
      
        //取消
        cancel(){
            this.$router.push({  
                path:'/index/salesManage/salesReturnOrder', //跳转的路径
                 
            })
        },
        //tab切换
        handleClick(tab, event) {
            console.log(tab, event);
        },
       //分页
        handleSizeChange(val) {
            this.salesIssueData.pageSize = val;
            this.initSalesIssueData();
        },
        handleCurrentChange(val) {
            this.salesIssueData.pageNum = val;
            this.initSalesIssueData();
        },
    },
    components: {
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
    textarea{
            border-color: #97999e !important;
        }
     .el-icon-search:before{
          font-size: 16px;
        }
             
</style>
<style lang="scss" scoped>
  .index .index-div{
      label{
          width: 34%;
      }
  }
.index .index-div .el-input,.index .index-div .el-select{
    width: 66%;
}
.index .index-div .el-col-textarea{
      label{
        width:7.31%;
      }
    }
</style>
